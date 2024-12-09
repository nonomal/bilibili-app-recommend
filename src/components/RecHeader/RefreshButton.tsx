import type { OnRefresh } from '$components/RecGrid/useRefresh'
import { favStore } from '$modules/rec-services/fav/store'
import { isHotTabUsingShuffle } from '$modules/rec-services/hot'
import { useSettingsSnapshot } from '$modules/settings'
import { shouldDisableShortcut } from '$utility/dom'
import { css } from '@emotion/react'
import { Button } from 'antd'
import { useAnimate } from 'framer-motion'
import type { MouseEvent, MouseEventHandler } from 'react'
import { useSnapshot } from 'valtio'
import { useCurrentUsingTab } from './tab'
import { ETab } from './tab-enum'

export type RefreshButtonActions = { click: () => void }
export type RefreshButtonProps = {
  style?: CSSProperties
  className?: string
  onRefresh?: OnRefresh
  refreshHotkeyEnabled?: boolean
  refreshing: boolean
}
export const RefreshButton = forwardRef<RefreshButtonActions, RefreshButtonProps>(function (
  { onRefresh, className = '', style, refreshHotkeyEnabled, refreshing },
  ref,
) {
  refreshHotkeyEnabled ??= true

  const [deg, setDeg] = useState(0)

  const btn = useRef<HTMLButtonElement>(null)
  const click = useMemoizedFn(() => {
    if (!btn.current) return
    if (btn.current.disabled) return
    btn.current.click()
  })

  // click from outside
  useImperativeHandle(ref, () => ({ click }), [])

  // refresh
  useKeyPress(
    'r',
    () => {
      if (shouldDisableShortcut()) return
      if (!refreshHotkeyEnabled) return
      click()
    },
    { exactMatch: true },
  )

  const tab = useCurrentUsingTab()
  const { watchlaterUseShuffle, popularWeeklyUseShuffle } = useSettingsSnapshot()
  const { usingShuffle: favUsingShuffle } = useSnapshot(favStore)
  const text =
    tab === ETab.RecommendApp ||
    tab === ETab.RecommendPc ||
    tab === ETab.KeepFollowOnly ||
    (tab === ETab.Watchlater && watchlaterUseShuffle) ||
    (tab === ETab.Fav && favUsingShuffle) ||
    (tab === ETab.Hot && isHotTabUsingShuffle(popularWeeklyUseShuffle))
      ? '换一换'
      : '刷新'

  const [scope, animate] = useAnimate()

  const onClick: MouseEventHandler = useMemoizedFn((e?: MouseEvent) => {
    animate(scope.current, { rotate: [0, 360] }, { duration: 0.5, type: 'tween' })
    return onRefresh?.()
  })

  return (
    <Button
      disabled={refreshing}
      className={className}
      style={style}
      css={css`
        gap: 0;
        &.ant-btn:not(:disabled):focus-visible {
          outline: none;
        }
      `}
      ref={btn}
      onClick={onClick}
    >
      <svg
        ref={scope}
        style={{
          width: '11px',
          height: '11px',
          marginRight: 5,
        }}
      >
        <use href='#widget-roll'></use>
      </svg>
      <span>{text}</span>
    </Button>
  )
})
