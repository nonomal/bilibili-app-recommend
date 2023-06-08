/**
 * 推荐内容, 无限滚动
 */

import { baseDebug } from '$common'
import { useModalDislikeVisible } from '$components/ModalDislike'
import { useCurrentTheme } from '$components/ModalSettings/theme'
import { useCurrentSourceTab } from '$components/RecHeader/tab'
import { VideoCard, VideoCardActions } from '$components/VideoCard'
import { getHeaderHeight } from '$header'
import { cx, generateClassName } from '$libs'
import { getIsInternalTesting } from '$platform'
import { getRecommendTimes, uniqConcat } from '$service'
import { useSettingsSnapshot } from '$settings'
import { css } from '@emotion/react'
import { useMemoizedFn, useMount } from 'ahooks'
import { RefObject, forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { internalTesting, narrowMode, videoGrid } from '../video-grid.module.less'
import { useRefresh } from './useRefresh'
import { useShortcut } from './useShortcut'

const debug = baseDebug.extend('components:RecGrid')

export const CardClassNames = {
  card: generateClassName`
    border: 2px solid transparent;

    /* global class under .card */
    .bili-video-card__info {
      padding-left: 2px;
      padding-bottom: 1px;
      margin-top: calc(var(--info-margin-top) - 1px);
    }
  `,
  cardActive: generateClassName`
    border-color: #fb7299;
    border-radius: 6px;
    overflow: hidden;
  `,
}

export type RecGridRef = {
  refresh: () => void | Promise<void>
}

export type RecGridProps = {
  shortcutEnabled: boolean
  infiteScrollUseWindow: boolean
  onScrollToTop?: () => void | Promise<void>
  className?: string
  scrollerRef?: RefObject<HTMLElement | null>
  setRefreshing: (val: boolean) => void
}

export const RecGrid = forwardRef<RecGridRef, RecGridProps>(
  (
    {
      infiteScrollUseWindow,
      shortcutEnabled,
      onScrollToTop,
      className,
      scrollerRef,
      setRefreshing: setUpperRefreshing,
    },
    ref
  ) => {
    const { useNarrowMode } = useSettingsSnapshot()
    const [hasMore, setHasMore] = useState(true)
    const tab = useCurrentSourceTab()

    const {
      refresh,
      items,
      setItems,

      refreshing,
      refreshedAt,
      getRefreshedAt,
      loadCompleteCount,
      setLoadCompleteCount,

      pcRecService,
      dynamicFeedService,
    } = useRefresh({
      tab,
      debug,
      foruse: 'RecGrid',
      onScrollToTop,
      setUpperRefreshing,
      clearActiveIndex() {
        clearActiveIndex()
      },
      triggerScroll() {
        triggerScroll()
      },
    })

    useMount(refresh)
    useImperativeHandle(ref, () => ({ refresh }), [])

    const requesting = useRef<Record<number, boolean>>({})

    /**
     * useMemoizedFn 只能确保 fetchMore 开始调用时值时最新的.
     * 拿 refreshedAt 举例, fetchMore 内部, 值 refreshedAt 不变
     * 所以需要 useGetState, 从 getRefreshedAt 取最新的值
     */
    const fetchMore = useMemoizedFn(async () => {
      if (!hasMore) return
      if (refreshing) return

      const refreshAtWhenStart = refreshedAt
      if (requesting.current[refreshAtWhenStart]) return
      requesting.current = { [refreshAtWhenStart]: true }

      let newItems = items

      try {
        if (tab === 'dynamic') {
          newItems = newItems.concat((await dynamicFeedService.next()) || [])
          setHasMore(dynamicFeedService.hasMore)
        } else {
          // fetchMore 至少 load 一项, 需要触发 InfiniteScroll.componentDidUpdate
          while (!(newItems.length > items.length)) {
            const more = await getRecommendTimes(2, tab, pcRecService)
            newItems = uniqConcat(newItems, more)
          }
        }
      } catch (e) {
        requesting.current[refreshAtWhenStart] = false
        throw e
      }

      // loadMore 发出请求了, 但稍候刷新了, setItems 时可能
      //  - 在刷新
      //  - 刷新结束了
      if (refreshAtWhenStart !== getRefreshedAt()) {
        debug(
          'fetchMore: skip update for mismatch refreshedAt, %s != %s',
          refreshAtWhenStart,
          getRefreshedAt()
        )
        return
      }

      debug('fetchMore: seq(%s) len %s -> %s', loadCompleteCount + 1, items.length, newItems.length)
      setItems(newItems)
      setLoadCompleteCount((c) => c + 1)
      triggerScroll() // check
      requesting.current[refreshAtWhenStart] = false
    })

    //
    // loadMore may need more loadMore
    // 例如大屏的初始化问题: https://greasyfork.org/zh-CN/scripts/443530-bilibili-app-recommend/discussions/182834
    //
    // react-infinite-scroll 的使用方法
    // check threshold -> detach scroll, loadMore -> loadMore 引发数据变化 -> InfiniteScroll.componentDidUpdate -> re-bind scroll event
    // 问题在于, loadMore 结束后还需要再 loadMore, 这时需要手动 scroll 一下
    // 这里模拟一下 scroll event
    //
    const triggerScroll = useMemoizedFn(() => {
      setTimeout(() => {
        const scroller = infiteScrollUseWindow ? window : scrollerRef?.current
        scroller?.dispatchEvent(new CustomEvent('scroll', { detail: { deltaY: 0 } }))
      })
    })

    // .video-grid
    const containerRef = useRef<HTMLDivElement>(null)

    const getScrollerRect = useMemoizedFn(() => {
      // use window
      if (infiteScrollUseWindow) {
        const headerHight = getHeaderHeight() + 50 // 50 RecHeader height
        return new DOMRect(0, headerHight, window.innerWidth, window.innerHeight - headerHight)
      }
      // use in a scroller
      else {
        return scrollerRef?.current?.getBoundingClientRect()
      }
    })

    // 不喜欢弹框
    const modalDislikeVisible = useModalDislikeVisible()

    const videoCardRefs = useMemo(() => {
      return new Array<VideoCardActions | undefined | null>(items.length).fill(undefined)
    }, [items.length])

    // 快捷键
    const { activeIndex, clearActiveIndex } = useShortcut({
      enabled: shortcutEnabled && !modalDislikeVisible,
      refresh,
      maxIndex: items.length - 1,
      containerRef,
      getScrollerRect,
      videoCardRefs,
      changeScrollY: infiteScrollUseWindow
        ? function ({ offset, absolute }) {
            const scroller = document.documentElement
            if (typeof offset === 'number') {
              scroller.scrollTop += offset
              return
            }
            if (typeof absolute === 'number') {
              scroller.scrollTop = absolute
              return
            }
          }
        : undefined,
    })

    const isInisInternalTesting = getIsInternalTesting()

    const { colorPrimary } = useCurrentTheme()

    return (
      <InfiniteScroll
        pageStart={0}
        hasMore={hasMore}
        loadMore={fetchMore}
        initialLoad={false}
        useWindow={infiteScrollUseWindow}
        threshold={window.innerHeight * 1} // 一屏
        style={{ minHeight: '100%' }}
        loader={
          <div
            css={css`
              text-align: center;
              line-height: 60px;
              font-size: 120%;
            `}
            key={-1}
          >
            {!refreshing && <>加载中...</>}
          </div>
        }
      >
        {/* 这里只定义列数, 宽度 100% */}
        <div
          ref={containerRef}
          className={cx(
            videoGrid,
            { [internalTesting]: isInisInternalTesting },
            { [narrowMode]: useNarrowMode },
            className
          )}
        >
          {refreshing
            ? // skeleton loading
              new Array(24).fill(undefined).map((_, index) => {
                const x = <VideoCard key={index} loading={true} className={CardClassNames.card} />
                return <VideoCard key={index} loading={true} className={CardClassNames.card} />
              })
            : // items
              items.map((item, index) => {
                const active = index === activeIndex
                return (
                  <VideoCard
                    ref={(val) => (videoCardRefs[index] = val)}
                    key={item.uniqId}
                    className={cx(CardClassNames.card, { [CardClassNames.cardActive]: active })}
                    css={[
                      active &&
                        css`
                          border-color: ${colorPrimary};
                        `,
                    ]}
                    item={item}
                    active={active}
                  />
                )
              })}
        </div>
      </InfiniteScroll>
    )
  }
)
