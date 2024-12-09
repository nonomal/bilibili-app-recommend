import { type ItemsSeparator } from '$define'
import { EApiType } from '$define/index.shared'
import { getSpaceAccInfo } from '$modules/bilibili/user/space-acc-info'
import { cloneDeep, countBy, orderBy, shuffle } from 'es-toolkit'
import { tryit } from 'radash'
import { proxy } from 'valtio'
import { fetchCollectionDetail } from '../collection/api'
import { type IFavInnerService } from '../index'
import { favStore } from '../store'
import type { FavItemExtend } from '../types'
import type {
  FavCollectionDetailInfo,
  FavCollectionDetailMedia,
} from '../types/collections/collection-detail'
import {
  FavItemsOrder,
  FavItemsOrderSwitcher,
  handleItemsOrder,
} from '../usage-info/fav-items-order'
import { FAV_PAGE_SIZE, FavCollectionSeparator } from './_base'

export class FavCollectionService implements IFavInnerService {
  constructor(
    public collectionId: number,
    public addSeparator: boolean,
    public itemsOrder: FavItemsOrder,
  ) {}

  get hasMore() {
    if (this.addSeparator && !this.separatorAdded) return true
    if (!this.loaded) return true
    return !!this.bufferQueue.length
  }

  /**
   * 这是个假分页... 一次返回所有
   */
  loaded = false
  bufferQueue: FavItemExtend[] = []

  private separatorAdded = false
  private get separator(): ItemsSeparator {
    return {
      api: EApiType.Separator,
      uniqId: `fav-collection-${this.collectionId}`,
      content: <FavCollectionSeparator service={this} />,
    }
  }

  // reactive state
  state = proxy({
    firstBvid: undefined as string | undefined,
    info: undefined as FavCollectionDetailInfo | undefined,
  })

  async loadMore(
    abortSignal?: AbortSignal,
  ): Promise<(FavItemExtend | ItemsSeparator)[] | undefined> {
    if (!this.hasMore) return

    if (this.addSeparator && !this.separatorAdded) {
      this.separatorAdded = true
      return [this.separator]
    }

    if (!this.loaded) {
      const data = await fetchCollectionDetail(this.collectionId, 1)
      const medias = data?.medias || []
      const info = data?.info

      // pre-process
      await tryit(() => this.loadUserAvatarFromSpaceAccInfo(medias, abortSignal))()
      let items: FavItemExtend[] = medias.map((x) => {
        return {
          ...x,
          api: EApiType.Fav as const,
          uniqId: `fav-${this.collectionId}-${x.bvid}`,
          collection: data.info,
          from: 'fav-collection' as const,
        }
      })
      items = handleItemsOrder(items, this.itemsOrder)
      this.bufferQueue = items
      this.loaded = true

      // setState
      this.state.firstBvid = items[0]?.bvid
      this.state.info = cloneDeep(info)
      favStore.selectedFavCollectionDetailInfo = cloneDeep(info)
    }

    // just for fun, shuffle every time
    if (this.itemsOrder === FavItemsOrder.Shuffle) {
      this.bufferQueue = shuffle(this.bufferQueue)
    }

    let sliced: FavItemExtend[]
    ;[sliced, this.bufferQueue] = [
      this.bufferQueue.slice(0, FAV_PAGE_SIZE),
      this.bufferQueue.slice(FAV_PAGE_SIZE),
    ]
    return sliced
  }

  // 合集返回的数据没有头像, 这里通过 space-acc-info 补全
  private async loadUserAvatarFromSpaceAccInfo(
    items: FavCollectionDetailMedia[],
    abortSignal?: AbortSignal,
  ) {
    if (!items.length) return

    const midsCount = countBy(items, (x) => x.upper.mid)
    const list = Object.entries(midsCount).map(([mid, count]) => ({ mid, count }))
    // 出现次数最多的 mid, 合集: 应该只有一个 mid; 列表: 无能为力
    const topMids = orderBy(list, [(x) => x.count], ['desc'])
      .slice(0, 3)
      .map((x) => x.mid)

    await Promise.all(
      topMids.map(async (mid) => {
        if (abortSignal?.aborted) return

        const info = await getSpaceAccInfo(mid)
        const face = info?.face
        if (face) {
          items
            .filter((x) => x.upper.mid.toString() === mid)
            .forEach((x) => {
              x.upper.face ||= face
            })
        }
      }),
    )
  }

  get extraUsageInfo() {
    return <FavItemsOrderSwitcher />
  }
}
