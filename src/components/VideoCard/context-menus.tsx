/**
 * context menus related
 */

import { appClsColorPrimary } from '$common/css-vars-export.module.scss'
import { C } from '$common/emotion-css'
import { currentGridItems, getBvidInfo } from '$components/RecGrid/unsafe-window-export'
import type { OnRefresh } from '$components/RecGrid/useRefresh'
import { videoSourceTabState } from '$components/RecHeader/tab'
import { ETab } from '$components/RecHeader/tab-enum'
import {
  isDynamic,
  isFav,
  isLive,
  isWatchlater,
  type DynamicFeedItemExtend,
  type RecItemType,
} from '$define'
import { EApiType } from '$define/index.shared'
import { UserBlacklistService } from '$modules/bilibili/me/relations/blacklist'
import { UserfollowService } from '$modules/bilibili/me/relations/follow'
import { setNicknameCache } from '$modules/bilibili/user/nickname'
import { openNewTab } from '$modules/gm'
import {
  IconForBlacklist,
  IconForCopy,
  IconForDislike,
  IconForFav,
  IconForFaved,
  IconForOpenExternalLink,
  IconForWatchlater,
} from '$modules/icon'
import {
  DF_SELECTED_KEY_ALL,
  DF_SELECTED_KEY_PREFIX_UP,
  DynamicFeedQueryKey,
  QUERY_DYNAMIC_UP_MID,
  dfStore,
} from '$modules/rec-services/dynamic-feed/store'
import { dynamicFeedFilterSelectUp } from '$modules/rec-services/dynamic-feed/usage-info'
import { formatFavCollectionUrl, formatFavFolderUrl } from '$modules/rec-services/fav/fav-url'
import { UserFavService, defaultFavFolderName } from '$modules/rec-services/fav/user-fav-service'
import { settings, updateSettingsInnerArray } from '$modules/settings'
import { antMessage, defineAntMenus, type AntMenuItem } from '$utility/antd'
import toast from '$utility/toast'
import { delay } from 'es-toolkit'
import { size } from 'polished'
import type { MouseEvent } from 'react'
import { useSnapshot } from 'valtio'
import { copyContent } from '.'
import type { watchlaterDel } from './card.service'
import { watchlaterAdd } from './card.service'
import { getFollowedStatus } from './process/filter'
import type { IVideoCardData } from './process/normalize'
import { getLinkTarget } from './use/useOpenRelated'

export function useContextMenus({
  item,
  cardData,
  tab,

  href,
  authorMid,
  authorName,
  recommendReason,
  isNormalVideo,
  onRefresh,
  watchlaterAdded,
  bvid,
  hasWatchLaterEntry,
  onToggleWatchLater,
  favFolderNames,
  avid,
  favFolderUrls,
  onMoveToFirst,
  hasDislikeEntry,
  onTriggerDislike,
  onRemoveCurrent,
  consistentOpenMenus,
  conditionalOpenMenus,
}: {
  item: RecItemType
  cardData: IVideoCardData
  tab: ETab

  href: string
  authorMid: string | undefined
  authorName: string | undefined
  recommendReason: string | undefined
  isNormalVideo: boolean
  onRefresh: OnRefresh | undefined
  watchlaterAdded: boolean
  bvid: string | undefined
  hasWatchLaterEntry: boolean
  onToggleWatchLater: (
    e?: MouseEvent,
    usingAction?: typeof watchlaterDel | typeof watchlaterAdd,
  ) => Promise<{
    success: boolean
    targetState?: boolean
  }>
  favFolderNames: string[] | undefined
  avid: string | undefined
  favFolderUrls: string[] | undefined
  onMoveToFirst: ((item: RecItemType, data: IVideoCardData) => void | Promise<void>) | undefined
  hasDislikeEntry: boolean
  onTriggerDislike: () => unknown
  onRemoveCurrent: ((item: RecItemType, data: IVideoCardData) => void | Promise<void>) | undefined
  consistentOpenMenus: AntMenuItem[]
  conditionalOpenMenus: AntMenuItem[]
}): AntMenuItem[] {
  const { enableHideSomeContents } = useSnapshot(settings.dynamicFeed.whenViewAll)

  const onCopyLink = useMemoizedFn(() => {
    let content = href
    if (href.startsWith('/')) {
      content = new URL(href, location.href).href
    }
    copyContent(content)
  })

  /**
   * blacklist
   */
  // 已关注 item.api 也为 'pc', 故使用 tab, 而不是 api 区分
  const hasBlacklistEntry =
    !!authorMid && (tab === ETab.RecommendApp || tab === ETab.RecommendPc || tab === ETab.Hot)

  const onBlacklistUp = useMemoizedFn(async () => {
    if (!authorMid) return antMessage.error('UP mid 为空!')
    const success = await UserBlacklistService.add(authorMid)
    if (success) {
      antMessage.success(`已加入黑名单: ${authorName}`)
    }
  })

  const onAddUpToFilterList = useMemoizedFn(async () => {
    if (!authorMid) return antMessage.error('UP mid 为空!')

    const content = `${authorMid}`
    if (settings.filter.byAuthor.keywords.includes(content)) {
      return toast(`已在过滤名单中: ${content}`)
    }

    updateSettingsInnerArray('filter.byAuthor.keywords', { add: [content] })
    if (authorName) setNicknameCache(authorMid, authorName)

    let toastContent = content
    if (authorName) toastContent += ` 用户名: ${authorName}`
    antMessage.success(`已加入过滤名单: ${toastContent}, 刷新后生效~`)
  })

  /**
   * unfollow
   */
  const hasUnfollowEntry =
    item.api === EApiType.Dynamic ||
    ((item.api === EApiType.App || item.api === EApiType.Pc) && getFollowedStatus(recommendReason))
  const onUnfollowUp = useMemoizedFn(async () => {
    if (!authorMid) return
    const success = await UserfollowService.unfollow(authorMid)
    if (success) {
      antMessage.success('已取消关注')
    }
  })

  /**
   * 查看 UP 的动态
   */
  const hasDynamicFeedFilterSelectUpEntry =
    (isNormalVideo || isLive(item)) && !!authorMid && !!authorName
  const onDynamicFeedFilterSelectUp = useMemoizedFn(async (newWindow?: boolean) => {
    if (!hasDynamicFeedFilterSelectUpEntry) return

    async function openInCurrentWindow() {
      dynamicFeedFilterSelectUp({
        upMid: authorMid,
        upName: authorName,
        searchText: undefined,
      })
      videoSourceTabState.value = ETab.DynamicFeed
      await delay(100)
      await onRefresh?.()
    }

    function openInNewWindow() {
      const u = `/?dyn-mid=${authorMid}`
      openNewTab(u)
    }

    // newWindow ??= tab !== ETab.DynamicFeed
    newWindow ??= true

    if (newWindow) {
      openInNewWindow()
    } else {
      openInCurrentWindow()
    }
  })

  /**
   * 「全部」动态筛选
   */

  // 不再 stick on camelCase 后, 腰不酸了, 腿不疼了~
  const hasEntry_addMidTo_dynamicFeedWhenViewAllHideIds =
    enableHideSomeContents &&
    isDynamic(item) &&
    dfStore.selectedKey === DF_SELECTED_KEY_ALL &&
    !!authorMid
  const onAddMidTo_dynamicFeedWhenViewAllHideIds = useMemoizedFn(async () => {
    if (!hasEntry_addMidTo_dynamicFeedWhenViewAllHideIds) return
    updateSettingsInnerArray('dynamicFeed.whenViewAll.hideIds', {
      add: [DF_SELECTED_KEY_PREFIX_UP + authorMid],
    })
    setNicknameCache(authorMid, authorName || '')
    antMessage.success(`在「全部」动态中隐藏【${authorName}】的动态`)
  })

  /**
   * 动态 offset & minId
   */
  const hasEntry_dynamicFeed_offsetAndMinId = !!(
    isDynamic(item) &&
    QUERY_DYNAMIC_UP_MID &&
    dfStore.viewingSomeUp &&
    authorMid
  )
  const dynamicViewStartFromHere: AntMenuItem | false = useMemo(
    () =>
      hasEntry_dynamicFeed_offsetAndMinId && {
        label: '动态: 从此项开始查看',
        key: '动态: 从此项开始查看',
        icon: <IconTablerSortDescending2 {...size(17)} />,
        onClick() {
          const u = new URL('/', location.href)
          u.searchParams.set(DynamicFeedQueryKey.Mid, authorMid)
          const currentIndexInGrid = currentGridItems.findIndex(
            (x) => x.api === EApiType.Dynamic && x.id_str === item.id_str,
          )
          const prevIdStr =
            (currentGridItems[currentIndexInGrid - 1] as DynamicFeedItemExtend | undefined)
              ?.id_str || item.id_str // 上一项的 id_str
          u.searchParams.set(DynamicFeedQueryKey.Offset, prevIdStr)
          openNewTab(u.href)
        },
      },
    [hasEntry_dynamicFeed_offsetAndMinId, item],
  )
  const dynamicViewUpdateSinceThis: AntMenuItem | false = useMemo(
    () =>
      hasEntry_dynamicFeed_offsetAndMinId && {
        icon: <IconTablerSortAscending2 {...size(17)} />,
        label: '动态: 从此项开始截止',
        key: '动态: 从此项开始截止',
        onClick() {
          const u = new URL('/', location.href)
          u.searchParams.set(DynamicFeedQueryKey.Mid, authorMid)
          u.searchParams.set(DynamicFeedQueryKey.MinId, item.id_str)
          openNewTab(u.href)
        },
      },
    [hasEntry_dynamicFeed_offsetAndMinId, item],
  )

  return useMemo(() => {
    const divider: AntMenuItem = { type: 'divider' }

    const copyMenus = defineAntMenus([
      {
        key: 'copy-link',
        label: '复制视频链接',
        icon: <IconForCopy className='size-15px' />,
        onClick: onCopyLink,
      },
      {
        test: !!bvid,
        key: 'copy-bvid',
        label: '复制 BVID',
        icon: <IconForCopy className='size-15px' />,
        onClick() {
          copyContent(bvid!)
        },
      },
      {
        test: !!bvid && settings.__internalEnableCopyBvidInfoContextMenu,
        key: 'copy-bvid-info',
        label: '复制 BVID 信息',
        icon: <IconForCopy className='size-15px' />,
        onClick() {
          copyContent(getBvidInfo(cardData))
        },
      },
    ])

    // I'm interested in this video
    const interestedMenus = defineAntMenus([
      {
        test: hasDynamicFeedFilterSelectUpEntry,
        key: 'dymamic-feed-filter-select-up',
        label: '查看 UP 的动态',
        icon: <IconParkOutlinePeopleSearch className='size-15px' />,
        onClick() {
          onDynamicFeedFilterSelectUp()
        },
      },
      {
        test: hasWatchLaterEntry,
        key: 'watchlater',
        label: watchlaterAdded ? '移除稍后再看' : '稍后再看',
        icon: watchlaterAdded ? (
          <IconMaterialSymbolsDeleteOutlineRounded {...size(15)} />
        ) : (
          <IconForWatchlater {...size(15)} />
        ),
        onClick() {
          onToggleWatchLater()
        },
      },
      {
        test: isWatchlater(item),
        key: 'add-fav',
        icon: favFolderNames?.length ? (
          <IconForFaved className={clsx('size-15px', appClsColorPrimary)} />
        ) : (
          <IconForFav className='size-15px' />
        ),
        label: favFolderNames?.length
          ? `已收藏 ${favFolderNames.map((n) => `「${n}」`).join('')}`
          : '快速收藏',
        async onClick() {
          if (!avid) return

          const hasFaved = Boolean(favFolderNames?.length)

          // 浏览收藏夹
          if (hasFaved) {
            favFolderUrls?.forEach((u) => {
              window.open(u, getLinkTarget())
            })
          }

          // 快速收藏
          else {
            const success = await UserFavService.addFav(avid)
            if (success) {
              antMessage.success(`已加入收藏夹「${defaultFavFolderName}」`)
            }
          }
        },
      },
      {
        test: isWatchlater(item) && watchlaterAdded,
        key: 'watchlater-readd',
        label: '重新添加稍候再看 (移到最前)',
        icon: <IconParkOutlineAddTwo className='size-15px' />,
        async onClick() {
          const { success } = await onToggleWatchLater(undefined, watchlaterAdd)
          if (!success) return
          onMoveToFirst?.(item, cardData)
        },
      },

      // 动态
      dynamicViewUpdateSinceThis,
      dynamicViewStartFromHere,
    ])

    // I don't like this video
    const dislikeMenus = defineAntMenus([
      {
        test: hasDislikeEntry,
        key: 'dislike',
        label: '我不想看',
        icon: <IconForDislike width={15} height={15} />,
        onClick() {
          onTriggerDislike()
        },
      },
      {
        test: hasUnfollowEntry,
        key: 'unfollow-up',
        label: '取消关注',
        icon: <IconParkOutlinePeopleMinus className='size-15px' />,
        onClick: onUnfollowUp,
      },
      {
        test: hasEntry_addMidTo_dynamicFeedWhenViewAllHideIds,
        key: 'hasEntry_addMidTo_dynamicFeedWhenViewAllHideIds',
        label: '在「全部」动态中隐藏 UP 的动态',
        icon: <IconLetsIconsViewHide {...size(15)} />,
        onClick: onAddMidTo_dynamicFeedWhenViewAllHideIds,
      },
      {
        test: hasBlacklistEntry,
        key: 'blacklist-up',
        label: '将 UP 加入黑名单',
        icon: <IconForBlacklist className='size-15' />,
        onClick: onBlacklistUp,
      },
      {
        test: hasBlacklistEntry,
        key: 'add-up-to-filterlist',
        label: '将 UP 加入过滤列表',
        icon: <IconForBlacklist className='size-15' />,
        onClick: onAddUpToFilterList,
      },
    ])

    const favMenus = !isFav(item)
      ? []
      : defineAntMenus([
          // 收藏夹
          ...(item.from === 'fav-folder'
            ? [
                {
                  key: 'open-fav-folder',
                  label: '浏览收藏夹',
                  icon: <IconForOpenExternalLink css={C.size(15)} />,
                  onClick() {
                    if (!isFav(item)) return
                    const { id } = item.folder
                    const url = formatFavFolderUrl(id)
                    window.open(url, getLinkTarget())
                  },
                },
                {
                  key: 'remove-fav',
                  label: '移除收藏',
                  icon: <IconMaterialSymbolsDeleteOutlineRounded {...size(15)} />,
                  async onClick() {
                    if (!isFav(item)) return
                    const success = await UserFavService.removeFav(
                      item.folder.id,
                      `${item.id}:${item.type}`,
                    )
                    if (success) {
                      await delay(1000)
                      onRemoveCurrent?.(item, cardData)
                    }
                  },
                },
              ]
            : []),

          // 合集
          ...(item.from === 'fav-collection'
            ? [
                {
                  key: 'open-fav-collection',
                  label: '浏览合集',
                  icon: <IconForOpenExternalLink css={C.size(15)} />,
                  onClick() {
                    if (!isFav(item)) return
                    const { id } = item.collection
                    const url = formatFavCollectionUrl(id)
                    window.open(url, getLinkTarget())
                  },
                },
              ]
            : []),
        ])

    return defineAntMenus([
      ...consistentOpenMenus,

      !!copyMenus.length && divider,
      ...copyMenus,

      !!interestedMenus.length && divider,
      ...interestedMenus,

      !!dislikeMenus.length && divider,
      ...dislikeMenus,

      !!favMenus.length && divider,
      ...favMenus,

      !!conditionalOpenMenus.length && divider,
      ...conditionalOpenMenus,
    ])
  }, [
    item,
    cardData,
    tab,
    // entries
    hasWatchLaterEntry,
    watchlaterAdded,
    hasDislikeEntry,
    hasUnfollowEntry,
    hasBlacklistEntry,
    hasDynamicFeedFilterSelectUpEntry,
    hasEntry_addMidTo_dynamicFeedWhenViewAllHideIds,
    // others
    favFolderNames,
    favFolderUrls,
    consistentOpenMenus,
    conditionalOpenMenus,
  ])
}
