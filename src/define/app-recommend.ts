/* eslint-disable @typescript-eslint/no-empty-interface */

// Generated by https://quicktype.io
//
// To change quicktype's target language, run command:
//
//   "Set quicktype target language"

export interface AppRecommendJson {
  code: number
  message: string
  ttl: number
  data: Data
}

export interface Data {
  items: AppRecItem[]
  config: Config
}

export interface Config {
  column: number
  autoplay_card: number
  feed_clean_abtest: number
  home_transfer_test: number
  auto_refresh_time: number
  show_inline_danmaku: number
  toast: ToastClass
  is_back_to_homepage: boolean
  enable_rcmd_guide: boolean
  inline_sound: number
  auto_refresh_time_by_appear: number
  auto_refresh_time_by_active: number
  trigger_loadmore_left_line_num: number
  history_cache_size: number
  visible_area: number
  card_density_exp: number
}

export interface ToastClass {}

export interface AppRecItem {
  card_type: CardType
  card_goto: CardGoto
  goto: CardGoto
  param: string
  cover: string
  title: string
  uri: string
  three_point: ThreePoint
  args: Args
  idx: number
  three_point_v2: ThreePointV2[]
  track_id: TrackID
  talk_back: string
  cover_left_text_1: string
  cover_left_icon_1: number
  cover_left_1_content_description: string
  cover_left_text_2: string
  cover_left_icon_2: number
  cover_left_2_content_description: string
  badge?: string
  badge_style?: Style
  desc_button?: DescButton
  player_args?: PlayerArgs
  cover_right_text?: string
  cover_right_content_description?: string
  can_play?: number
  goto_icon?: GotoIcon
  rcmd_reason?: string
  desc?: string
  rcmd_reason_style?: Style
}

export interface Args {
  up_id?: number
  up_name?: string
  rid?: number
  rname?: string
  tid?: number
  tname?: string
  aid?: number
}

export interface Style {
  text: string
  text_color: string
  border_color: string
  text_color_night: string
  border_color_night: string
  bg_style: number
  bg_color?: string
  bg_color_night?: string
}

export enum CardGoto {
  AV = 'av',
  Bangumi = 'bangumi',
  Picture = 'picture',
}

export enum CardType {
  SmallCoverV2 = 'small_cover_v2',
}

export interface DescButton {
  text: string
  event: string
  type: number
  event_v2: string
  uri?: string
}

export interface GotoIcon {
  icon_url: string
  icon_night_url: string
  icon_width: number
  icon_height: number
}

export interface PlayerArgs {
  aid: number
  cid: number
  type: CardGoto
  duration: number
}

export interface ThreePoint {
  dislike_reasons: DislikeReason[]
  feedbacks?: DislikeReason[]
  watch_later?: number
}

export interface DislikeReason {
  id: number
  name: string
  toast: ToastEnum
}

export enum ToastEnum {
  将优化首页此类内容 = '将优化首页此类内容',
  将减少相似内容推荐 = '将减少相似内容推荐',
}

export interface ThreePointV2 {
  title: Title
  subtitle?: Subtitle
  reasons?: DislikeReason[]
  type: Type
  icon?: string
}

export enum Subtitle {
  选择后将优化首页此类内容 = '(选择后将优化首页此类内容)',
  选择后将减少相似内容推荐 = '(选择后将减少相似内容推荐)',
}

export enum Title {
  反馈 = '反馈',
  我不想看 = '我不想看',
  添加至稍后再看 = '添加至稍后再看',
}

export enum Type {
  Dislike = 'dislike',
  Feedback = 'feedback',
  WatchLater = 'watch_later',
}

export enum TrackID {
  All20ShylfAIGalaxy1011673305601416500 = 'all_20.shylf-ai-galaxy-101.1673305601416.500',
}
