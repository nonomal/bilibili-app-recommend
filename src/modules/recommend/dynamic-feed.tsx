import { IN_BILIBILI_HOMEPAGE, REQUEST_FAIL_MSG } from '$common'
import { antdBtnTextStyle, flexCenterStyle } from '$common/emotion-css'
import { useOnRefreshContext } from '$components/RecGrid/useRefresh'
import { type DynamicFeedItemExtend, type DynamicFeedJson } from '$define'
import { EApiType } from '$define/index.shared'
import { IconPark } from '$icon-park'
import { getRecentUpdateUpList } from '$modules/dynamic'
import type { DynamicPortalUp } from '$modules/dynamic/portal'
import { isWebApiSuccess, request } from '$request'
import { toast } from '$utility'
import type { ArrayItem } from '$utility/type'
import { css } from '@emotion/react'
import { useMemoizedFn, useMount } from 'ahooks'
import type { MenuProps } from 'antd'
import { Avatar, Badge, Button, Dropdown, Input, Space } from 'antd'
import delay from 'delay'
import ms from 'ms'
import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { proxy, useSnapshot } from 'valtio'
import type { IService } from './base'

export class DynamicFeedRecService implements IService {
  static PAGE_SIZE = 15

  offset: string = ''
  page = 0 // pages loaded
  hasMore = true
  upMid: number | undefined = undefined

  constructor(upMid: number | undefined) {
    this.upMid = upMid
  }

  async loadMore(signal: AbortSignal | undefined = undefined) {
    if (!this.hasMore) {
      return
    }

    const params: Record<string, number | string> = {
      timezone_offset: '-480',
      type: 'video',
      features: 'itemOpusStyle',
      page: this.page + 1, // ++this.page, starts from 1
    }
    if (this.offset) {
      params.offset = this.offset
    }
    if (this.upMid) {
      params.host_mid = this.upMid
    }

    const res = await request.get('/x/polymer/web-dynamic/v1/feed/all', {
      signal,
      params,
    })
    const json = res.data as DynamicFeedJson
    if (!isWebApiSuccess(json)) {
      toast(json.message || REQUEST_FAIL_MSG)
      return
    }

    this.page++
    this.hasMore = json.data.has_more
    this.offset = json.data.offset

    const arr = json.data.items
    const items: DynamicFeedItemExtend[] = arr
      .filter((x) => x.type === 'DYNAMIC_TYPE_AV') // 处理不了别的类型
      .map((item) => {
        return {
          ...item,
          api: EApiType.dynamic,
          uniqId: item.id_str || crypto.randomUUID(),
        }
      })
    return items
  }

  get usageInfo(): ReactNode {
    return <DynamicFeedUsageInfo />
  }
}

/**
 * view dynamic of <mid> via query
 */
const hash = location.hash
let upMidInitial: number | undefined = undefined
let upNameInitial: string | undefined = undefined
if (hash.includes('?')) {
  const queryInHash = location.hash.slice(location.hash.indexOf('?'))
  const searchParams = new URLSearchParams(queryInHash)
  if (searchParams.get('dyn-mid')) {
    upMidInitial = Number(searchParams.get('dyn-mid'))
    upNameInitial = searchParams.get('dyn-mid') ?? undefined
  }
}

export const dynamicFeedFilterStore = proxy({
  upMid: upMidInitial as number | undefined,
  upName: upNameInitial as string | undefined,
  searchText: undefined as string | undefined,
  upList: [] as DynamicPortalUp[],
  upListUpdatedAt: 0,
  get hasSelectedUp(): boolean {
    return !!(this.upName && this.upMid)
  },
})

setTimeout(() => {
  if (!IN_BILIBILI_HOMEPAGE) return

  if (!dynamicFeedFilterStore.upList.length) {
    requestIdleCallback(() => {
      updateUpList()
    })
  }
}, ms('5s'))

async function updateUpList(force = false) {
  const cacheHit =
    !force &&
    dynamicFeedFilterStore.upList.length &&
    dynamicFeedFilterStore.upListUpdatedAt &&
    dynamicFeedFilterStore.upListUpdatedAt - Date.now() < ms('5min')
  if (cacheHit) return

  const list = await getRecentUpdateUpList()
  dynamicFeedFilterStore.upList = list
  dynamicFeedFilterStore.upListUpdatedAt = Date.now()
}

type MenuItemType = ArrayItem<Exclude<MenuProps['items'], undefined>>

export function dynamicFeedFilterSelectUp(payload: Partial<typeof dynamicFeedFilterStore>) {
  Object.assign(dynamicFeedFilterStore, payload)
  // 选择了 up, 去除红点
  if (payload.upMid) {
    const item = dynamicFeedFilterStore.upList.find((x) => x.mid === payload.upMid)
    if (item) item.has_update = false
  }
}

export function DynamicFeedUsageInfo() {
  const onRefresh = useOnRefreshContext()
  const { hasSelectedUp, upName, upMid, searchText, upList } = useSnapshot(dynamicFeedFilterStore)

  // try update on mount
  useMount(() => {
    updateUpList()
  })

  const onSelect = useMemoizedFn(async (payload: Partial<typeof dynamicFeedFilterStore>) => {
    dynamicFeedFilterSelectUp(payload)
    await delay(100)
    onRefresh?.()
  })

  const onClear = useMemoizedFn(() => {
    onSelect({ upMid: undefined, upName: undefined, searchText: undefined })
  })

  const menuItems = useMemo((): MenuItemType[] => {
    const itemAll: MenuItemType = {
      key: 'all',
      icon: <Avatar size={'small'}>全</Avatar>,
      label: '全部',
      onClick: onClear,
    }

    const items: MenuItemType[] = upList.map((up) => {
      let avatar: ReactNode = <Avatar size={'small'} src={up.face} />
      if (up.has_update) {
        avatar = <Badge dot>{avatar}</Badge>
      }

      return {
        key: up.mid,
        icon: avatar,
        // label: up.uname,
        label: (
          <span
            title={up.uname}
            css={css`
              display: block;
              max-width: 130px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            `}
          >
            {up.uname}
          </span>
        ),
        onClick() {
          onSelect({ upMid: up.mid, upName: up.uname, searchText: undefined })
        },
      }
    })

    return [itemAll, ...items]
  }, [upList, upList.map((x) => !!x.has_update)])

  const flexBreak = (
    <div
      css={css`
        flex-basis: 100%;
        height: 0;
      `}
    />
  )

  return (
    <>
      {hasSelectedUp && flexBreak}
      <Space>
        <Dropdown
          placement='bottomLeft'
          menu={{
            items: menuItems,
            style: { maxHeight: '50vh', overflowY: 'scroll' },
          }}
        >
          <Button>{upName ? `UP: ${upName}` : '全部'}</Button>
        </Dropdown>

        {hasSelectedUp && (
          <Button onClick={onClear} css={[flexCenterStyle]}>
            <IconPark name='Return' size={14} style={{ marginRight: 5 }} />
            <span css={antdBtnTextStyle}>清除</span>
          </Button>
        )}

        {hasSelectedUp && (
          <Input.Search
            css={css`
              .ant-btn {
                display: inline-flex;
                align-items: center;
                justify-content: center;
              }
            `}
            placeholder='按标题过滤'
            type='text'
            name='searchText'
            allowClear
            onSearch={async (val) => {
              dynamicFeedFilterStore.searchText = val
              await delay(100)
              onRefresh?.()
            }}
          />
        )}
      </Space>
    </>
  )
}
