import { MouseEvent, useEffect, useMemo, useRef, CSSProperties } from 'react'
import { useHover, useMemoizedFn, useSafeState } from 'ahooks'
import dayjs from 'dayjs'
import cx from 'classnames'
import { RecItem } from '@define/recommend'
import { getCountStr, getDurationStr } from '@utility/video'
import { PreviewImage } from './PreviewImage'
import {
  cancelDislike,
  getVideoData,
  VideoData,
  watchLaterAdd,
  watchLaterDel,
} from './card.service'
import * as styles from './index.module.less'
import { dislikedIds, showModalDislike, useDislikedReason } from '@components/ModalDislike'
import { toast } from '@utility/toast'
import { useConfigStore } from '@settings'

const currentYear = dayjs().format('YYYY')
const getCdate = (ctime?: number) => {
  if (!ctime) return ''

  const dayCtime = dayjs.unix(ctime)
  if (dayCtime.format('YYYY') === currentYear) {
    return dayCtime.format('M-D')
  } else {
    return dayCtime.format('YY-M-D')
  }
}

const toHttps = (url: string) => url.replace(/^http:\/\//, 'https://')

interface IProps {
  style?: CSSProperties
  className?: string
  item: RecItem
  loading?: boolean
}

export function VideoCard({ style, className, item, loading }: IProps) {
  // 预览 hover state
  const videoPreviewWrapperRef = useRef(null)
  const isHovering = useHover(videoPreviewWrapperRef)

  // 稍后再看 hover state
  const watchLaterRef = useRef(null)
  const isWatchLaterHovering = useHover(watchLaterRef)

  // watchLater added
  const [watchLaterAdded, setWatchLaterAdded] = useSafeState(false)

  const { accessKey } = useConfigStore()
  const authed = Boolean(accessKey)

  const {
    param: id, // 视频 id
    title,
    cover: coverRaw,

    goto,

    play,
    like,
    coin,
    desc,
    danmaku,
    ctime,
    duration,

    // author
    name,
    face,
    mid,

    // bangumi
    favorite,
    badge,

    // 推荐理由
    rcmd_reason,
  } = item

  const cdate = useMemo(() => getCdate(ctime), [ctime])
  const cover = useMemo(() => toHttps(coverRaw), [coverRaw])

  const [videoData, videoDataChange] = useSafeState<VideoData | null>(null)
  const [isFetchingVideoData, isFetchingVideoDataChange] = useSafeState(false)

  const tryFetchVideoData = useMemoizedFn(async () => {
    // already fetched
    if (videoData) return

    // fetching
    if (isFetchingVideoData) return

    try {
      isFetchingVideoDataChange(true)
      const data = await getVideoData(id)
      videoDataChange(data)
    } finally {
      isFetchingVideoDataChange(false)
    }
  })

  useEffect(() => {
    if (isHovering) tryFetchVideoData()
  }, [isHovering])

  /**
   * 稍候再看
   */

  let requesting = false
  const onToggleWatchLater = useMemoizedFn(async (e: MouseEvent) => {
    e.preventDefault()

    if (requesting) return
    requesting = true

    const fn = watchLaterAdded ? watchLaterDel : watchLaterAdd
    let successed = false
    try {
      successed = await fn(id)
    } finally {
      requesting = false
    }

    if (successed) {
      setWatchLaterAdded((val) => !val)
    }
  })

  /**
   * 不喜欢 / 撤销不喜欢
   */
  const dislikedReason = useDislikedReason(id)
  const isDisliked = Boolean(dislikedReason)

  // 不喜欢 hover state
  const btnDislikeRef = useRef(null)
  const isBtnDislikeHovering = useHover(btnDislikeRef)

  const onTriggerDislike = useMemoizedFn((e: MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    showModalDislike(item)
  })

  const onCancelDislike = useMemoizedFn(async () => {
    if (!dislikedReason?.id) return

    let success = false
    let err: Error | null = null
    try {
      success = await cancelDislike(item, dislikedReason.id)
    } catch (e) {
      err = e
    }

    if (err) {
      console.error(err.stack || err)
      return toast('请求失败!')
    }

    toast(`撤销不喜欢: 操作${success ? '成功' : '失败'}!`)
    if (success) {
      dislikedIds.delete(id)
    }
  })

  const href = item.goto === 'av' ? `/video/av${id}` : item.uri

  const durationStr = useMemo(() => getDurationStr(duration), [duration])
  const playStr = useMemo(() => getCountStr(play), [play])
  const likeStr = useMemo(() => getCountStr(like), [like])
  const favoriteStr = useMemo(() => getCountStr(favorite), [favorite])

  const skeleton = (
    <div className={cx('bili-video-card__skeleton', { hide: !loading })}>
      <div className='bili-video-card__skeleton--cover'></div>
      <div className='bili-video-card__skeleton--info'>
        <div className='bili-video-card__skeleton--right'>
          <p className='bili-video-card__skeleton--text'></p>
          <p className='bili-video-card__skeleton--text short'></p>
          <p className='bili-video-card__skeleton--light'></p>
        </div>
      </div>
    </div>
  )

  const dislikedContent = (
    <div className={cx(styles.dislikedWrapper)}>
      <div className={styles.dislikeContentCover}>
        <div className={styles.dislikeContentCoverInner}>
          <div className='icon'></div>
          <div className={styles.dislikeReason}>{dislikedReason?.name}</div>
          <div className={styles.dislikeDesc}>将减少此类内容推荐</div>
        </div>
      </div>
      <div className={styles.dislikeContentAction}>
        <button onClick={onCancelDislike}>撤销</button>
      </div>
    </div>
  )

  return (
    <div
      style={style}
      className={cx('bili-video-card', styles.biliVideoCard, className)}
      data-report='partition_recommend.content'
    >
      {skeleton}

      {!loading && isDisliked && dislikedContent}

      {!loading && !isDisliked && (
        <div
          className='bili-video-card__wrap __scale-wrap'
          style={{ backgroundColor: isDisliked ? 'red' : 'unset' }}
        >
          <a
            href={href}
            target='_blank'
            data-mod='partition_recommend'
            data-idx='content'
            data-ext='click'
          >
            <div
              className='bili-video-card__image __scale-player-wrap'
              ref={videoPreviewWrapperRef}
            >
              <div className={cx('bili-video-card__image--wrap', styles.imageWrapper)}>
                <picture className='v-img bili-video-card__cover'>
                  <source srcSet={`${cover}@672w_378h_1c.webp`} type='image/webp' />
                  <img src={`${cover}@672w_378h_1c.webp`} alt={title} loading='lazy' />
                </picture>

                {/* <div className='v-inline-player'></div> */}

                {/* preview */}
                {isHovering && videoData?.pvideoData ? (
                  <PreviewImage
                    className={styles.previewCardWrapper}
                    item={item}
                    pvideo={videoData?.pvideoData}
                  />
                ) : null}

                {/* 稍后再看 */}
                <div
                  className={`bili-watch-later ${styles.watchLater}`}
                  style={{ display: isHovering ? 'flex' : 'none' }}
                  ref={watchLaterRef}
                  onClick={onToggleWatchLater}
                >
                  <svg className='bili-watch-later__icon'>
                    <use
                      xlinkHref={watchLaterAdded ? '#widget-watch-save' : '#widget-watch-later'}
                    />
                  </svg>
                  <span
                    className='bili-watch-later__tip'
                    style={{ display: isWatchLaterHovering ? 'block' : 'none' }}
                  >
                    {watchLaterAdded ? '移除' : '稍后再看'}
                  </span>
                </div>

                {/* 不喜欢 */}
                {authed && (
                  <div
                    ref={btnDislikeRef}
                    className={styles.btnDislike}
                    onClick={onTriggerDislike}
                    style={{ display: isHovering ? 'flex' : 'none' }}
                  >
                    <svg className={styles.btnDislikeIcon}>
                      <use xlinkHref='#widget-close'></use>
                    </svg>
                    <span
                      className={styles.btnDislikeTip}
                      style={{ display: isBtnDislikeHovering ? 'block' : 'none' }}
                    >
                      不喜欢
                    </span>
                  </div>
                )}
              </div>

              <div className='bili-video-card__mask'>
                <div className='bili-video-card__stats'>
                  <div className='bili-video-card__stats--left'>
                    {/* 播放 */}
                    <span className='bili-video-card__stats--item'>
                      <svg className='bili-video-card__stats--icon'>
                        <use xlinkHref='#widget-play-count'></use>
                      </svg>
                      <span className='bili-video-card__stats--text'>{playStr}</span>
                    </span>

                    {/* 点赞 */}
                    <span className='bili-video-card__stats--item'>
                      {goto === 'av' ? (
                        <>
                          <svg className='bili-video-card__stats--icon'>
                            <use xlinkHref='#widget-agree'></use>
                          </svg>
                          <span className='bili-video-card__stats--text'>{likeStr}</span>
                        </>
                      ) : (
                        <>
                          <svg className='bili-video-card__stats--icon'>
                            <use xlinkHref='#widget-agree'></use>
                          </svg>
                          <span className='bili-video-card__stats--text'>{favoriteStr}</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* 时长 */}
                  <span className='bili-video-card__stats__duration'>{durationStr}</span>
                </div>
              </div>
            </div>
          </a>

          <div className='bili-video-card__info __scale-disable'>
            <div className='bili-video-card__info--right'>
              <a
                href={href}
                target='_blank'
                data-mod='partition_recommend'
                data-idx='content'
                data-ext='click'
              >
                <h3 className='bili-video-card__info--tit' title={title}>
                  {title}
                </h3>
              </a>
              <p className='bili-video-card__info--bottom'>
                {goto === 'av' ? (
                  <a
                    className='bili-video-card__info--owner'
                    href={`//space.bilibili.com/${mid}`}
                    target='_blank'
                    data-mod='partition_recommend'
                    data-idx='content'
                    data-ext='click'
                  >
                    {rcmd_reason?.content ? (
                      <span className={styles.recommendReason}>{rcmd_reason.content}</span>
                    ) : (
                      <svg className='bili-video-card__info--owner__up'>
                        <use xlinkHref='#widget-up'></use>
                      </svg>
                    )}

                    <span className='bili-video-card__info--author'>{name}</span>
                    {cdate ? <span className='bili-video-card__info--date'>· {cdate}</span> : null}
                  </a>
                ) : null}

                {goto === 'bangumi' ? (
                  <a className='bili-video-card__info--owner' href={href} target='_blank'>
                    <span className={styles.badge}>{badge}</span>
                    <span className={styles.bangumiDesc}>{desc}</span>
                  </a>
                ) : null}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
