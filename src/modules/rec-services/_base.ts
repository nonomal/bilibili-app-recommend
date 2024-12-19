import { APP_CLS_TAB_BAR } from '$common'
import type { RecItemTypeOrSeparator } from '$define'

export type IService = {
  hasMore: boolean
  loadMore(abortSignal: AbortSignal): Promise<RecItemTypeOrSeparator[] | undefined>
  usageInfo?: ReactNode
}

export type ITabService = IService & {
  restore(): void
  usageInfo: ReactNode
}

export abstract class BaseTabService<T extends RecItemTypeOrSeparator = RecItemTypeOrSeparator>
  implements ITabService
{
  abstract usageInfo: ReactNode
  abstract hasMoreExceptQueue: boolean
  abstract loadMoreItems(abortSignal: AbortSignal): Promise<T[] | undefined>

  qs: QueueStrategy<T>
  constructor(qsPageSize: number) {
    this.qs = new QueueStrategy(qsPageSize)
  }

  get hasMore() {
    return !!this.qs.bufferQueue.length || this.hasMoreExceptQueue
  }

  restore(): void {
    this.qs.restore()
  }

  async loadMore(abortSignal: AbortSignal): Promise<T[] | undefined> {
    if (!this.hasMore) return
    if (this.qs.bufferQueue.length) return this.qs.sliceFromQueue()
    return this.qs.doReturnItems(await this.loadMoreItems(abortSignal))
  }
}

export class QueueStrategy<T = RecItemTypeOrSeparator> {
  // full-list = returnQueue + bufferQueue + more
  private returnQueue: T[] = []
  bufferQueue: T[] = []

  get hasCache() {
    return !!this.returnQueue.length
  }

  ps: number
  constructor(ps = 20) {
    this.ps = ps
  }

  sliceCountFromQueue(count: number) {
    if (this.bufferQueue.length) {
      const sliced = this.bufferQueue.slice(0, count) // sliced
      this.bufferQueue = this.bufferQueue.slice(count) // rest
      return this.doReturnItems(sliced) ?? []
    } else {
      return []
    }
  }

  sliceFromQueue(page = 1) {
    return this.sliceCountFromQueue(this.ps * page)
  }

  // add to returnQueue
  doReturnItems(items: T[] | undefined) {
    this.returnQueue = [...this.returnQueue, ...(items ?? [])]
    return items
  }

  // restore from returnQueue
  restore() {
    this.bufferQueue = [...this.returnQueue, ...this.bufferQueue]
    this.returnQueue = []
  }
}

export function usePopupContainer<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)
  const getPopupContainer = useCallback(() => {
    return ref.current?.closest<T>('.' + APP_CLS_TAB_BAR) || document.body
  }, [])
  return { ref, getPopupContainer }
}
