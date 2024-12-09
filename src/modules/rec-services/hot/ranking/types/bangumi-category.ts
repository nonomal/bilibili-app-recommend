export interface BangumiRankingJson {
  code: number
  message: string
  result: Result
}

export interface Result {
  list: BangumiRankingItem[]
  note: string
}

export interface BangumiRankingItem {
  badge: Badge
  badge_info: BadgeInfo
  badge_type: number
  copyright: Copyright
  cover: string
  enable_vt: boolean
  icon_font: IconFont
  new_ep: NewEp
  rank: number
  rating: string
  season_id: number
  ss_horizontal_cover: string
  stat: Stat
  title: string
  url: string
}

export enum Badge {
  会员专享 = '会员专享',
  会员抢先 = '会员抢先',
  独家 = '独家',
}

export interface BadgeInfo {
  bg_color: BgColor
  bg_color_night: BgColorNight
  text: Badge
}

export enum BgColor {
  Fb7299 = '#FB7299',
  The00C0Ff = '#00C0FF',
}

export enum BgColorNight {
  Bb5B76 = '#BB5B76',
  The0B91Be = '#0B91BE',
}

export enum Copyright {
  Bilibili = 'bilibili',
  Dujia = 'dujia',
}

export interface IconFont {
  name: Name
  text: string
}

export enum Name {
  PlaydataSquareLine500 = 'playdata-square-line@500',
}

export interface NewEp {
  cover: string
  index_show: string
}

export interface Stat {
  danmaku: number
  follow: number
  series_follow: number
  view: number
}
