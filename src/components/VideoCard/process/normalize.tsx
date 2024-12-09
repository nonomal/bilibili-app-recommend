import { appWarn } from '$common'
import { AntdTooltip } from '$components/_base/antd-custom'
import { colorPrimaryValue } from '$components/css-vars'
import {
  isApp,
  isDynamic,
  isFav,
  isLive,
  isPc,
  isPopularGeneral,
  isPopularWeekly,
  isRanking,
  isWatchlater,
  type AndroidAppRecItemExtend,
  type AppRecItemExtend,
  type DynamicFeedItemExtend,
  type IpadAppRecItemExtend,
  type LiveItemExtend,
  type PcRecItemExtend,
  type PopularGeneralItemExtend,
  type PopularWeeklyItemExtend,
  type RankingItemExtend,
  type RecItemType,
  type WatchLaterItemExtend,
} from '$define'
import type { EApiType } from '$define/index.shared'
import { styled } from '$libs'
import { isFavFolderPrivate } from '$modules/rec-services/fav/fav-util'
import type { FavItemExtend } from '$modules/rec-services/fav/types'
import {
  IconForCollection,
  IconForPrivateFolder,
  IconForPublicFolder,
} from '$modules/rec-services/fav/usage-info'
import {
  isBangumiRankingItem,
  isCinemaRankingItem,
} from '$modules/rec-services/hot/ranking/category'
import { ELiveStatus } from '$modules/rec-services/live/live-enum'
import { toHttps } from '$utility/url'
import {
  formatDuration,
  formatTimeStamp,
  getVideoInvalidReason,
  parseCount,
  parseDuration,
} from '$utility/video'
import { BvCode } from '@mgdn/bvid'
import dayjs from 'dayjs'
import type { ReactNode } from 'react'
import type { AppRecIconField } from '../stat-item'
import { AppRecIconMap, getField } from '../stat-item'

export const DESC_SEPARATOR = ' · '

export type StatItemType = { field: AppRecIconField; value: number | string | undefined }

export interface IVideoCardData {
  // video
  avid?: string
  bvid?: string
  goto: string
  href: string

  title: string
  titleRender?: ReactNode

  cover: string
  pubts?: number // unix timestamp
  pubdateDisplay?: string // for display
  pubdateDisplayForTitleAttr?: string
  duration?: number
  durationStr?: string
  recommendReason?: string

  // stat
  statItems: StatItemType[]
  // for filter
  play?: number
  like?: number
  coin?: number
  danmaku?: number
  favorite?: number
  bangumiFollow?: number

  // author
  authorName?: string
  authorFace?: string
  authorMid?: string

  // adpater specific
  appBadge?: string
  appBadgeDesc?: string
  rankingDesc?: string
  liveDesc?: string
}

type Getter<T> = Record<RecItemType['api'], (item: RecItemType) => T>

export function lookinto<T>(
  item: RecItemType,
  opts: {
    [EApiType.App]: (item: AppRecItemExtend) => T
    [EApiType.Pc]: (item: PcRecItemExtend) => T
    [EApiType.Dynamic]: (item: DynamicFeedItemExtend) => T
    [EApiType.Watchlater]: (item: WatchLaterItemExtend) => T
    [EApiType.Fav]: (item: FavItemExtend) => T
    [EApiType.PopularGeneral]: (item: PopularGeneralItemExtend) => T
    [EApiType.PopularWeekly]: (item: PopularWeeklyItemExtend) => T
    [EApiType.Ranking]: (item: RankingItemExtend) => T
    [EApiType.Live]: (item: LiveItemExtend) => T
  },
): T {
  if (isApp(item)) return opts.app(item)
  if (isPc(item)) return opts.pc(item)
  if (isDynamic(item)) return opts.dynamic(item)
  if (isWatchlater(item)) return opts.watchlater(item)
  if (isFav(item)) return opts.fav(item)
  if (isPopularGeneral(item)) return opts['popular-general'](item)
  if (isPopularWeekly(item)) return opts['popular-weekly'](item)
  if (isRanking(item)) return opts['ranking'](item)
  if (isLive(item)) return opts.live(item)
  throw new Error(`unknown api type`)
}

export function normalizeCardData(item: RecItemType) {
  const ret = lookinto<IVideoCardData>(item, {
    'app': apiAppAdapter,
    'pc': apiPcAdapter,
    'dynamic': apiDynamicAdapter,
    'watchlater': apiWatchLaterAdapter,
    'fav': apiFavAdapter,
    'popular-general': apiPopularGeneralAdapter,
    'popular-weekly': apiPopularWeeklyAdapter,
    'ranking': apiRankingAdapter,
    'live': apiLiveAdapter,
  })

  // handle mixed content
  if (ret.authorFace) ret.authorFace = toHttps(ret.authorFace)
  ret.cover = toHttps(ret.cover)

  return ret
}

function apiAppAdapter(item: AppRecItemExtend): IVideoCardData {
  return item.device === 'android' ? apiAndroidAppAdapter(item) : apiIpadAppAdapter(item)
}

function apiAndroidAppAdapter(item: AndroidAppRecItemExtend): IVideoCardData {
  const extractCountFor = (target: AppRecIconField) => {
    const { cover_left_icon_1, cover_left_text_1, cover_left_icon_2, cover_left_text_2 } = item
    if (cover_left_icon_1 && AppRecIconMap[cover_left_icon_1] === target) {
      return parseCount(cover_left_text_1)
    }
    if (cover_left_icon_2 && AppRecIconMap[cover_left_icon_2] === target) {
      return parseCount(cover_left_text_2)
    }
  }

  const avid = item.param
  const bvid = BvCode.av2bv(Number(item.param))

  const href = (() => {
    // valid uri
    if (item.uri.startsWith('http://') || item.uri.startsWith('https://')) {
      return item.uri
    }

    // more see https://github.com/magicdawn/bilibili-gate/issues/23#issuecomment-1533079590

    if (item.goto === 'av') {
      return `/video/${bvid}/`
    }

    if (item.goto === 'bangumi') {
      appWarn(`bangumi uri should not starts with 'bilibili://': %s`, item.uri)
      return item.uri
    }

    // goto = picture, 可能是专栏 or 动态
    // 动态的 url 是 https://t.bilibili.com, 使用 uri
    // 专栏的 url 是 bilibili://article/<id>
    if (item.goto === 'picture') {
      const id = /^bilibili:\/\/article\/(\d+)$/.exec(item.uri)?.[1]
      if (id) return `/read/cv${id}`
      return item.uri
    }

    return item.uri
  })()

  return {
    // video
    avid,
    bvid,
    goto: item.goto,
    href,
    title: item.title,
    cover: item.cover,
    pubts: undefined,
    pubdateDisplay: undefined,
    duration: item.player_args?.duration || 0,
    durationStr: formatDuration(item.player_args?.duration),
    recommendReason: item.rcmd_reason,

    // stat
    play: extractCountFor('play'),
    danmaku: extractCountFor('danmaku'),
    bangumiFollow: extractCountFor('bangumiFollow'),
    like: undefined,
    coin: undefined,
    favorite: undefined,

    // e.g 2023-09-17
    // cover_left_1_content_description: "156点赞"
    // cover_left_icon_1: 20
    // cover_left_text_1: "156"
    statItems: [
      item.cover_left_text_1 && {
        field: getField(item.cover_left_icon_1),
        value: item.cover_left_text_1,
      },
      item.cover_left_text_2 && {
        field: getField(item.cover_left_icon_2),
        value: item.cover_left_text_2,
      },
    ].filter(Boolean),

    // author
    authorName: item.args.up_name,
    authorFace: undefined,
    authorMid: String(item.args.up_id!),

    appBadge: item.badge,
    appBadgeDesc: item.desc_button?.text || item.desc || '',
  }
}
function apiIpadAppAdapter(item: IpadAppRecItemExtend): IVideoCardData {
  const extractCountFor = (target: AppRecIconField) => {
    const { cover_left_text_1, cover_left_text_2, cover_left_text_3 } = item
    const arr = [cover_left_text_1, cover_left_text_2, cover_left_text_3].filter(Boolean)
    if (target === 'play') {
      const text = arr.find((text) => /观看|播放$/.test(text))
      if (!text) return
      const rest = text.replace(/观看|播放$/, '')
      return parseCount(rest)
    }

    if (target === 'danmaku') {
      const text = arr.find((text) => /弹幕$/.test(text))
      if (!text) return
      const rest = text.replace(/弹幕$/, '')
      return parseCount(rest)
    }

    if (target === 'bangumiFollow') {
      const text = arr.find((text) => /追[剧番]$/.test(text))
      if (!text) return
      const rest = text.replace(/追[剧番]$/, '')
      return parseCount(rest)
    }
  }

  const avid = item.param
  const bvid = item.bvid || BvCode.av2bv(Number(item.param))

  const href = (() => {
    // valid uri
    if (item.uri.startsWith('http://') || item.uri.startsWith('https://')) {
      return item.uri
    }

    // more see https://github.com/magicdawn/bilibili-gate/issues/23#issuecomment-1533079590

    if (item.goto === 'av') {
      return `/video/${bvid}/`
    }

    if (item.goto === 'bangumi') {
      appWarn(`bangumi uri should not starts with 'bilibili://': %s`, item.uri)
      return item.uri
    }

    // goto = picture, 可能是专栏 or 动态
    // 动态的 url 是 https://t.bilibili.com, 使用 uri
    // 专栏的 url 是 bilibili://article/<id>
    if (item.goto === 'picture') {
      const id = /^bilibili:\/\/article\/(\d+)$/.exec(item.uri)?.[1]
      if (id) return `/read/cv${id}`
      return item.uri
    }

    return item.uri
  })()

  // stat
  const play = extractCountFor('play')
  const like = undefined
  const coin = undefined
  const danmaku = extractCountFor('danmaku')
  const favorite = undefined
  const bangumiFollow = extractCountFor('bangumiFollow')
  const statItems: StatItemType[] = [
    { field: 'play', value: play },
    typeof danmaku === 'number'
      ? { field: 'danmaku', value: danmaku }
      : { field: 'bangumiFollow', value: bangumiFollow },
  ]

  const desc = item.desc || ''
  const [descAuthorName = undefined, descDate = undefined] = desc.split(DESC_SEPARATOR)

  return {
    // video
    avid,
    bvid,
    goto: item.goto,
    href,
    title: item.title,
    cover: item.cover,
    pubts: undefined,
    pubdateDisplay: descDate,
    duration: item.player_args?.duration || 0,
    durationStr: formatDuration(item.player_args?.duration),
    recommendReason: item.bottom_rcmd_reason || item.top_rcmd_reason, // TODO: top_rcmd_reason

    // stat
    play,
    like,
    coin,
    danmaku,
    favorite,
    bangumiFollow,
    statItems,

    // author
    authorName: item.args.up_name || descAuthorName,
    authorFace: item.avatar.cover,
    authorMid: String(item.args.up_id || ''),

    appBadge: item.cover_badge,
    appBadgeDesc: item.desc,
  }
}

function apiPcAdapter(item: PcRecItemExtend): IVideoCardData {
  return {
    // video
    avid: String(item.id),
    bvid: item.bvid,
    goto: item.goto,
    href: item.goto === 'av' ? `/video/${item.bvid}/` : item.uri,
    title: item.title,
    cover: item.pic,
    pubts: item.pubdate,
    pubdateDisplay: formatTimeStamp(item.pubdate),
    duration: item.duration,
    durationStr: formatDuration(item.duration),
    recommendReason: item.rcmd_reason?.content,

    // stat
    play: item.stat.view,
    like: item.stat.like,
    coin: undefined,
    danmaku: item.stat.danmaku,
    favorite: undefined,
    statItems: [
      { field: 'play', value: item.stat.view },
      { field: 'like', value: item.stat.like },
    ] satisfies StatItemType[],

    // author
    authorName: item.owner.name,
    authorFace: item.owner.face,
    authorMid: String(item.owner.mid),
  }
}

function apiDynamicAdapter(item: DynamicFeedItemExtend): IVideoCardData {
  const v = item.modules.module_dynamic.major.archive
  const author = item.modules.module_author

  const gateTs = dayjs().subtract(2, 'days').unix()
  const pubdateDisplay = (() => {
    const ts = author.pub_ts
    if (ts > gateTs) {
      return author.pub_time
    } else {
      return formatTimeStamp(ts)
    }
  })()

  return {
    // video
    avid: v.aid,
    bvid: v.bvid,
    goto: 'av',
    href: `/video/${v.bvid}/`,
    title: v.title,
    cover: v.cover,
    pubts: author.pub_ts,
    pubdateDisplay,
    duration: parseDuration(v.duration_text) || 0,
    durationStr: v.duration_text,
    recommendReason: v.badge.text,

    // stat
    statItems: [
      { field: 'play', value: v.stat.play },
      { field: 'danmaku', value: v.stat.danmaku },
    ] satisfies StatItemType[],
    play: parseCount(v.stat.play),
    danmaku: parseCount(v.stat.danmaku),

    // author
    authorName: author.name,
    authorFace: author.face,
    authorMid: author.mid.toString(),
  }
}

function apiWatchLaterAdapter(item: WatchLaterItemExtend): IVideoCardData {
  const invalidReason = getVideoInvalidReason(item.state)
  const viewed = item.progress > 0
  const title = `${viewed ? '【已观看】· ' : ''}${item.title}`
  const titleRender: ReactNode = invalidReason ? (
    <AntdTooltip
      title={<>视频已失效, 原因: {invalidReason}</>}
      align={{ offset: [0, -5] }}
      placement='topLeft'
    >
      <del>
        {viewed ? '【已观看】· ' : ''}
        {item.title}`
      </del>
    </AntdTooltip>
  ) : undefined

  return {
    // video
    avid: String(item.aid),
    bvid: item.bvid,
    goto: 'av',
    href: `https://www.bilibili.com/list/watchlater?bvid=${item.bvid}&oid=${item.aid}`,
    title,
    titleRender,
    cover: item.pic,
    pubts: item.pubdate,
    pubdateDisplay: formatTimeStamp(item.pubdate),
    pubdateDisplayForTitleAttr: `${formatTimeStamp(item.pubdate, true)} 发布, ${formatTimeStamp(
      item.add_at,
      true,
    )} 添加稍后再看`,
    duration: item.duration,
    durationStr: formatDuration(item.duration),
    recommendReason: `${formatTimeStamp(item.add_at)} · 稍后再看`,

    // stat
    statItems: [
      { field: 'play', value: item.stat.view },
      { field: 'like', value: item.stat.like },
      // { field: 'coin', value: item.stat.coin },
      { field: 'favorite', value: item.stat.favorite },
    ] satisfies StatItemType[],
    play: item.stat.view,
    like: item.stat.like,
    danmaku: item.stat.danmaku,

    // author
    authorName: item.owner.name,
    authorFace: item.owner.face,
    authorMid: String(item.owner.mid),
  }
}

const fillWithColorPrimary = styled.createClass`
  & path {
    fill: ${colorPrimaryValue};
  }
`

function apiFavAdapter(item: FavItemExtend): IVideoCardData {
  const belongsToTitle = item.from === 'fav-folder' ? item.folder.title : item.collection.title

  const iconInTitleStyle = {
    display: 'inline-block',
    verticalAlign: 'middle',
    marginRight: 4,
    marginTop: -2,
  }
  const iconInTitle =
    item.from === 'fav-folder' ? (
      isFavFolderPrivate(item.folder.attr) ? (
        <IconForPrivateFolder
          style={iconInTitleStyle}
          {...size(15)}
          className={fillWithColorPrimary}
        />
      ) : (
        <IconForPublicFolder
          style={iconInTitleStyle}
          {...size(15)}
          className={fillWithColorPrimary}
        />
      )
    ) : (
      <IconForCollection style={iconInTitleStyle} {...size(15)} className={fillWithColorPrimary} />
    )

  return {
    // video
    avid: String(item.id),
    bvid: item.bvid,
    goto: 'av',
    href: `/video/${item.bvid}/`,
    title: `【${belongsToTitle}】· ${item.title}`,
    titleRender: (
      <>
        【{iconInTitle}
        {belongsToTitle}】· {item.title}
      </>
    ),
    cover: item.cover,
    pubts: item.pubtime,
    pubdateDisplay: formatTimeStamp(item.pubtime),
    duration: item.duration,
    durationStr: formatDuration(item.duration),
    recommendReason:
      item.from === 'fav-folder' ? `${formatTimeStamp(item.fav_time)} · 收藏` : undefined,

    // stat
    play: item.cnt_info.play,
    danmaku: item.cnt_info.danmaku,
    favorite: item.cnt_info.collect,
    statItems: [
      { field: 'play', value: item.cnt_info.play },
      { field: 'danmaku', value: item.cnt_info.danmaku },
      { field: 'favorite', value: item.cnt_info.collect },
    ] satisfies StatItemType[],

    // author
    authorName: item.upper.name,
    authorFace: item.upper.face,
    authorMid: String(item.upper.mid),
  }
}

function apiPopularGeneralAdapter(item: PopularGeneralItemExtend): IVideoCardData {
  return {
    // video
    avid: String(item.aid),
    bvid: item.bvid,
    goto: 'av',
    href: `/video/${item.bvid}/`,
    title: item.title,
    cover: item.pic,
    pubts: item.pubdate,
    pubdateDisplay: formatTimeStamp(item.pubdate),
    duration: item.duration,
    durationStr: formatDuration(item.duration),
    recommendReason: item.rcmd_reason?.content,

    // stat
    play: item.stat.view,
    like: item.stat.like,
    coin: undefined,
    danmaku: item.stat.danmaku,
    favorite: undefined,
    statItems: [
      { field: 'play', value: item.stat.view },
      { field: 'like', value: item.stat.like },
      { field: 'danmaku', value: item.stat.danmaku },
    ] satisfies StatItemType[],

    // author
    authorName: item.owner.name,
    authorFace: item.owner.face,
    authorMid: String(item.owner.mid),
  }
}

function apiPopularWeeklyAdapter(item: PopularWeeklyItemExtend): IVideoCardData {
  return {
    // video
    avid: String(item.aid),
    bvid: item.bvid,
    goto: 'av',
    href: `/video/${item.bvid}/`,
    title: item.title,
    cover: item.pic,
    pubts: item.pubdate,
    pubdateDisplay: formatTimeStamp(item.pubdate),
    duration: item.duration,
    durationStr: formatDuration(item.duration),
    recommendReason: item.rcmd_reason,

    // stat
    play: item.stat.view,
    like: item.stat.like,
    danmaku: item.stat.danmaku,
    statItems: [
      { field: 'play', value: item.stat.view },
      { field: 'like', value: item.stat.like },
      { field: 'danmaku', value: item.stat.danmaku },
    ] satisfies StatItemType[],

    // author
    authorName: item.owner.name,
    authorFace: item.owner.face,
    authorMid: String(item.owner.mid),
  }
}

function apiRankingAdapter(item: RankingItemExtend): IVideoCardData {
  if (isBangumiRankingItem(item) || isCinemaRankingItem(item)) {
    const cover = item.new_ep.cover
    const rankingDesc = item.new_ep.index_show

    return {
      // video
      avid: '',
      bvid: '',
      goto: 'bangumi',
      href: item.url,
      title: item.title,
      cover,
      pubts: undefined,
      pubdateDisplay: undefined,
      duration: 0,
      durationStr: '',

      // stat
      play: item.stat.view,
      like: item.stat.follow,
      danmaku: item.stat.danmaku,
      statItems: [
        { field: 'play', value: item.stat.view } as const,
        { field: 'bangumiFollow', value: item.stat.follow } as const,
        { field: 'danmaku', value: item.stat.danmaku } as const,
      ].filter(Boolean) satisfies StatItemType[],

      rankingDesc,
    }
  }

  // normal
  return {
    // video
    avid: String(item.aid),
    bvid: item.bvid,
    goto: 'av',
    href: `/video/${item.bvid}/`,
    title: item.title,
    cover: item.pic,
    pubts: item.pubdate,
    pubdateDisplay: formatTimeStamp(item.pubdate),
    duration: item.duration,
    durationStr: formatDuration(item.duration),
    recommendReason: undefined, // TODO: write something here

    // stat
    play: item.stat.view,
    like: item.stat.like,
    danmaku: item.stat.danmaku,
    statItems: [
      { field: 'play', value: item.stat.view } as const,
      { field: 'like', value: item.stat.like } as const,
      { field: 'danmaku', value: item.stat.danmaku } as const,
    ].filter(Boolean) satisfies StatItemType[],

    // author
    authorName: item.owner.name,
    authorFace: item.owner.face,
    authorMid: String(item.owner.mid),
  }
}

function apiLiveAdapter(item: LiveItemExtend): IVideoCardData {
  const area = `${item.area_name_v2}`
  const liveDesc =
    item.live_status === ELiveStatus.Streaming
      ? '' // 「 不需要 space padding
      : `${DESC_SEPARATOR}${formatLiveTime(item.record_live_time)} 直播过`

  function formatLiveTime(ts: number) {
    const today = dayjs().format('YYYYMMDD')
    const yesterday = dayjs().subtract(1, 'day').format('YYYYMMDD')

    const d = dayjs.unix(ts)
    if (d.format('YYYYMMDD') === today) {
      return d.format('HH:mm')
    }
    if (d.format('YYYYMMDD') === yesterday) {
      return `昨天 ${d.format('HH:mm')}`
    }
    return d.format('MM-DD HH:mm')
  }

  return {
    // video
    goto: 'live',
    href: `https://live.bilibili.com/${item.roomid}`,
    title: item.title,
    liveDesc,
    cover: item.room_cover,
    recommendReason: area,

    // stat
    statItems: [{ field: 'play', value: item.text_small } as const].filter(
      Boolean,
    ) satisfies StatItemType[],

    // author
    authorName: item.uname,
    authorFace: item.face,
    authorMid: String(item.uid),
  }
}
