import { flexCenterStyle } from '$common/emotion-css'
import { AntdTooltip } from '$components/_base/antd-custom'
import { borderColorValue, colorPrimaryValue } from '$components/css-vars'
import { getUserNickname } from '$modules/bilibili/user/nickname'
import { formatSpaceUrl } from '$modules/rec-services/dynamic-feed/shared'
import {
  getSettingsInnerArray,
  updateSettingsInnerArray,
  useSettingsSnapshot,
  type ListSettingsPath,
} from '$modules/settings'
import { antMessage } from '$utility/antd'
import { css } from '@emotion/react'
import { Empty, Input } from 'antd'
import { uniq } from 'es-toolkit'
import { get } from 'es-toolkit/compat'
import type { ComponentPropsWithoutRef } from 'react'
import IconParkOutlineCloseSmall from '~icons/icon-park-outline/close-small'

const { Search } = Input

export function EditableListSettingItem({
  configPath,
  searchProps,
  disabled,
}: {
  configPath: ListSettingsPath
  searchProps?: ComponentProps<typeof Search>
  disabled?: boolean
}) {
  const snap = useSettingsSnapshot()
  const rawList = get(snap, configPath) as string[]
  const list = useMemo(() => uniq(rawList).toReversed(), [rawList])

  return (
    <>
      <Search
        css={css`
          margin-top: 5px;
          margin-bottom: 5px;
        `}
        enterButton='添加'
        allowClear
        disabled={disabled}
        {...searchProps}
        onSearch={(val, e) => {
          if (!val) return

          // exists check
          const set = new Set(getSettingsInnerArray(configPath))
          if (set.has(val)) {
            antMessage.warning(`${val} 已存在`)
            return
          }

          // add
          updateSettingsInnerArray(configPath, { add: [val] })

          // clear: 非受控组件, 有内部状态, 不能简单设置 input.value
          if (e?.target) {
            const el = e.target as HTMLElement
            const clearBtn = el
              .closest('.ant-input-wrapper')
              ?.querySelector<HTMLElement>('.ant-input-clear-icon')
            clearBtn?.click()
          }
        }}
      />

      <div
        css={[
          css`
            min-height: 82px;
            border-radius: 6px;
            border: 1px solid ${borderColorValue};
            margin-top: 3px;
          `,
          disabled &&
            css`
              color: var(--ant-color-text-disabled);
              background-color: var(--ant-color-bg-container-disabled);
              border-color: var(--ant-color-border);
              box-shadow: none;
              opacity: 1;
              pointer-events: none;
              cursor: not-allowed;
            `,
        ]}
      >
        {list.length ? (
          <div
            css={css`
              display: flex;
              flex-wrap: wrap;
              padding: 5px;
              gap: 5px 10px;
              align-items: flex-start;
              max-height: 250px;
              overflow-y: scroll;
              padding-right: 10px;
            `}
          >
            {list.map((t) => {
              return (
                <TagItemDisplay
                  key={t}
                  tag={t}
                  onDelete={(tag) => {
                    updateSettingsInnerArray(configPath, { remove: [tag] })
                  }}
                  renderTag={
                    configPath === 'filter.byAuthor.keywords'
                      ? (tag) => <UpTagItemDisplay tag={tag} />
                      : undefined
                  }
                />
              )
            })}
          </div>
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description='空空如也'
            css={css`
              &.ant-empty-normal {
                margin-block: 5px;
              }
            `}
          />
        )}
      </div>
    </>
  )
}

type TagItemDisplayProps = {
  tag: string
  renderTag?: (tag: string) => ReactNode
  onDelete?: (tag: string) => void
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export const TagItemDisplay = forwardRef<HTMLDivElement, TagItemDisplayProps>(
  ({ tag, renderTag, onDelete, ...restProps }, ref) => {
    return (
      <div
        {...restProps}
        ref={ref}
        css={[
          css`
            border-radius: 5px;
            padding: 2px 6px;
            position: relative;
            border: 1px solid ${borderColorValue};

            display: inline-flex;
            align-items: center;

            &:hover {
              border-color: ${colorPrimaryValue};
              color: ${colorPrimaryValue};
              .anticon {
                visibility: visible;
              }
            }
          `,
        ]}
      >
        {renderTag ? renderTag(tag) : tag}
        <IconParkOutlineCloseSmall
          onClick={() => {
            onDelete?.(tag)
          }}
          {...size(16)}
          css={css`
            margin-left: 2px;
            cursor: pointer;
            font-size: 12px;
          `}
        />
      </div>
    )
  },
)

export function UpTagItemDisplay({ tag }: { tag: string }) {
  const regMidWithRemark = /^(?<mid>\d+)\((?<remark>[\S ]+)\)$/
  const regMid = /^\d+$/

  const { mid, remark } = useMemo<{ mid?: string; remark?: string }>(() => {
    if (regMidWithRemark.test(tag)) {
      const groups = regMidWithRemark.exec(tag)?.groups
      const mid = groups?.mid
      const remark = groups?.remark
      return { mid, remark }
    } else if (regMid.test(tag)) {
      return { mid: tag }
    } else {
      return {}
    }
  }, [tag])

  const [nicknameByMid, setNicknameByMid] = useState<string | undefined>(undefined)
  useEffect(() => {
    void (async () => {
      if (!mid) return
      const nickname = await getUserNickname(mid)
      if (nickname) setNicknameByMid(nickname)
    })()
  }, [mid])

  const label = mid
    ? //
      nicknameByMid || remark || mid
    : tag

  const tooltip = (
    <>
      {!!mid && (
        <>
          mid: {mid} <br />
        </>
      )}
      {!!remark && (
        <>
          备注: {remark} <br />
          {remark === nicknameByMid && (
            <>
              P.S 备注是之前的数据, 现在你只需要填写 mid, 会自动获取昵称 <br />
            </>
          )}
        </>
      )}
      {!mid && (
        <>
          使用用户名过滤: 用户可能改名, 建议使用 mid 过滤 <br />
        </>
      )}
    </>
  )

  return (
    <>
      <AntdTooltip title={tooltip}>
        <span
          css={[
            flexCenterStyle,
            css`
              cursor: ${mid ? 'pointer' : 'edit'};
            `,
          ]}
        >
          {mid && <IconRadixIconsPerson {...size(12)} className='mr-2' />}
          {mid ? (
            <a href={formatSpaceUrl(mid)} target='_blank' style={{ color: 'inherit' }}>
              {label}
            </a>
          ) : (
            label
          )}
        </span>
      </AntdTooltip>
    </>
  )
}
