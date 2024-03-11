import { IconPark, type IconName } from '$icon-park'
import { toast } from '$utility/toast'
import { type Icon } from '@icon-park/react/es/runtime'
import type { ComponentProps } from 'react'

export enum ETabType {
  RecommendApp = 'recommend-app',
  RecommendPc = 'recommend-pc',
  KeepFollowOnly = 'keep-follow-only',
  DynamicFeed = 'dynamic-feed',
  Watchlater = 'watchlater',
  Fav = 'fav',
  PopularGeneral = 'popular-general',
  PopularWeekly = 'popular-weekly',
}

type TabConfigItem = {
  key: ETabType
  icon: IconName
  iconProps?: ComponentProps<Icon>
  label: string
  desc: string
  swr?: boolean // stale while revalidate
}

export const TabConfig: TabConfigItem[] = [
  {
    key: ETabType.RecommendApp,
    icon: 'Iphone',
    label: '推荐',
    desc: '使用 Bilibili App 端推荐 API',
  },
  {
    key: ETabType.RecommendPc,
    icon: 'Computer',
    label: '推荐',
    desc: '使用新版首页顶部推荐 API',
  },
  {
    key: ETabType.KeepFollowOnly,
    icon: 'Concern',
    label: '已关注',
    desc: '推荐中只保留「已关注」,会很慢',
  },
  {
    key: ETabType.DynamicFeed,
    icon: 'Tumblr',
    iconProps: { size: 16 },
    label: '动态',
    desc: '视频投稿动态',
    swr: true,
  },
  {
    key: ETabType.Watchlater,
    icon: 'FileCabinet',
    iconProps: { size: 15 },
    label: '稍后再看',
    desc: '你添加的稍后再看; 默认随机乱序, 可在设置中关闭乱序',
    swr: true,
  },
  {
    key: ETabType.Fav,
    icon: 'Star',
    iconProps: { size: 15 },
    label: '收藏',
    desc: '你添加的收藏; 默认随机乱序, 可在设置中关闭乱序',
  },
  {
    key: ETabType.PopularGeneral,
    icon: 'Fire',
    iconProps: { size: 16 },
    label: '综合热门',
    desc: '各个领域中新奇好玩的优质内容都在这里~',
    swr: true,
  },
  {
    key: ETabType.PopularWeekly,
    icon: 'TrendTwo',
    iconProps: { size: 15 },
    label: '每周必看',
    desc: '每周五晚 18:00 更新',
  },
]

export const TabConfigMap = TabConfig.reduce((val, configItem) => {
  return { ...val, [configItem.key]: configItem }
}, {}) as Record<ETabType, TabConfigItem>

export function TabIcon({
  tabKey,
  ml,
  mr,
  mt,
  mb,
  ...props
}: {
  tabKey: ETabType
  className?: string
  style?: React.CSSProperties
  ml?: number
  mr?: number
  mt?: number
  mb?: number
}) {
  const { icon, iconProps } = TabConfigMap[tabKey]
  return (
    <IconPark
      {...props}
      {...{
        size: 18,
        ...iconProps,
      }}
      name={icon}
      style={{
        ...props.style,
        ...(ml ? { marginLeft: ml + 'px' } : {}),
        ...(mr ? { marginRight: mr + 'px' } : {}),
        ...(mt ? { marginTop: mt + 'px' } : {}),
        ...(mb ? { marginBottom: mb + 'px' } : {}),
      }}
    />
  )
}

export const TabKeys = TabConfig.map((x) => x.key)

export function toastNeedLogin() {
  return toast('你需要登录B站后使用该功能! 如已完成登录, 请刷新网页重试~')
}

function gotoLogin() {
  const href = 'https://passport.bilibili.com/login'
  location.href = href
}
