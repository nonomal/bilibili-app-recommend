import { inlineFlexVerticalCenterStyle } from '$common/emotion-css'
import { CheckboxSettingItem } from '$components/ModalSettings/setting-item'
import { useSortedTabKeys } from '$components/RecHeader/tab'
import { TabConfig, TabIcon } from '$components/RecHeader/tab-config'
import { ETab, TabKeys } from '$components/RecHeader/tab-enum'
import { HelpInfo } from '$components/_base/HelpInfo'
import { AntdTooltip } from '$components/_base/antd-custom'
import { bgLv2Value, bgLv3Value } from '$components/css-vars'
import { EAppApiDevice } from '$define/index.shared'
import { getUserNickname } from '$modules/bilibili/user/nickname'
import { FollowGroupMergeTimelineService } from '$modules/rec-services/dynamic-feed/group/merge-timeline-service'
import type { FollowGroup } from '$modules/rec-services/dynamic-feed/group/types/groups'
import {
  IconForGroup,
  IconForUp,
  formatFollowGroupUrl,
  formatSpaceUrl,
} from '$modules/rec-services/dynamic-feed/shared'
import {
  DF_SELECTED_KEY_PREFIX_GROUP,
  DF_SELECTED_KEY_PREFIX_UP,
  dfStore,
} from '$modules/rec-services/dynamic-feed/store'
import {
  settings,
  updateSettings,
  updateSettingsInnerArray,
  useSettingsSnapshot,
} from '$modules/settings'
import { antMessage } from '$utility/antd'
import type { DragEndEvent } from '@dnd-kit/core'
import { DndContext, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core'
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { css } from '@emotion/react'
import { Checkbox, Col, Collapse, Empty, Radio, Space } from 'antd'
import { useSnapshot } from 'valtio'
import { TagItemDisplay } from '../EditableListSettingItem'
import styles from '../index.module.scss'
import { explainForFlag } from '../index.shared'
import { ResetPartialSettingsButton } from './_shared'

export function TabPaneRecTabsConfig() {
  const { appApiDecice, dynamicFeed } = useSettingsSnapshot()
  const sortedTabKeys = useSortedTabKeys()

  return (
    <div className={styles.tabPane}>
      <div
        css={css`
          display: grid;
          grid-template-columns: 250px 1fr;
          column-gap: 50px;
        `}
      >
        <div className={styles.settingsGroup}>
          <div className={styles.settingsGroupTitle}>
            Tab 设置
            <HelpInfo className='ml-5px mr-20px'>勾选显示, 拖动排序</HelpInfo>
            <Col flex={1} />
            <ResetPartialSettingsButton paths={['hidingTabKeys', 'customTabKeysOrder']} />
          </div>
          <VideoSourceTabOrder />
        </div>

        <div className={styles.settingsGroup}>
          <div className={styles.settingsGroupTitle}>更多设置</div>
          <div
            className={clsx(styles.settingsGroupContent)}
            css={css`
              display: flex;
              flex-direction: column;
            `}
          >
            {/* watchlater */}
            <div
              css={css`
                order: ${sortedTabKeys.indexOf(ETab.Watchlater) + 1};
              `}
            >
              <div className={styles.settingsGroupSubTitle}>
                <TabIcon tabKey={ETab.Watchlater} mr={5} mt={-1} />
                稍后再看
              </div>
              <Space size={10}>
                <CheckboxSettingItem
                  configPath='watchlaterUseShuffle'
                  label='随机顺序'
                  tooltip='不包括近期添加的「稍后再看」'
                />
                <CheckboxSettingItem
                  configPath='watchlaterAddSeparator'
                  label='添加分割线'
                  tooltip='添加「近期」「更早」分割线'
                  css={css`
                    margin-left: 20px !important;
                  `}
                />
              </Space>
            </div>

            {/* fav */}
            <div
              css={css`
                order: ${sortedTabKeys.indexOf(ETab.Fav) + 1};
              `}
            >
              <div className={styles.settingsGroupSubTitle}>
                <TabIcon tabKey={ETab.Fav} mr={5} mt={-2} />
                收藏
              </div>
              <Space size={10}>
                <CheckboxSettingItem
                  configPath='fav.addSeparator'
                  label='添加分割线'
                  tooltip='顺序显示时, 按收藏夹添加分割线'
                />
              </Space>
            </div>

            {/* dynamic-feed */}
            <div
              css={css`
                order: ${sortedTabKeys.indexOf(ETab.DynamicFeed) + 1};
              `}
            >
              <div className={styles.settingsGroupSubTitle}>
                <TabIcon tabKey={ETab.DynamicFeed} mr={5} mt={-2} />
                动态
              </div>
              <div className='flex flex-wrap  gap-x-10 gap-y-10'>
                <CheckboxSettingItem
                  configPath='dynamicFeed.followGroup.enabled'
                  label='启用分组筛选'
                  tooltip={
                    <>
                      动态 Tab 启用分组筛选 <br />
                      当分组中 UP 较少(不超过 {FollowGroupMergeTimelineService.MAX_UPMID_COUNT}),
                      会使用「拼接时间线」的形式, 速度较快, 可以获取所有动态; <br />
                      否则基于全部动态 + 分组UP过滤, 速度可能巨慢,
                      且貌似只能获取最近一个月的动态数据. <br />
                    </>
                  }
                />
                <CheckboxSettingItem
                  configPath='dynamicFeed.showLive'
                  label='在动态中显示直播'
                  tooltip={
                    <>
                      动态里显示正在直播的 UP
                      <br />
                      P.S 仅在选择「全部」时展示
                    </>
                  }
                />
                <CheckboxSettingItem
                  configPath='dynamicFeed.whenViewAll.enableHideSomeContents'
                  label='「全部」动态过滤'
                  tooltip={
                    <>
                      查看「全部」动态时 <br />
                      {explainForFlag(
                        '将添加右键菜单, 点击可添加到「全部」动态的过滤列表',
                        '关闭此功能',
                      )}
                    </>
                  }
                />

                {dynamicFeed.whenViewAll.enableHideSomeContents && (
                  <Collapse
                    size='small'
                    css={css`
                      width: 100%;
                    `}
                    items={[
                      {
                        key: '1',
                        label: '在「全部」动态中隐藏 UP/分组 的动态',
                        children: <DynamicFeedWhenViewAllHideIdsPanel />,
                      },
                    ]}
                  />
                )}
              </div>
            </div>

            {/* recommend */}
            <div
              css={css`
                order: ${sortedTabKeys.indexOf(ETab.RecommendApp) + 1};
              `}
            >
              <div className={styles.settingsGroupSubTitle}>
                <TabIcon tabKey={ETab.RecommendApp} mr={5} />
                App 推荐
              </div>
              <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                App API 设备类型
                <HelpInfo className='ml-5px mr-10px'>
                  默认 ipad, 视频有 头像/日期 等信息
                  <br />
                  可选 android, 有图文类型的推荐
                </HelpInfo>
                <Radio.Group
                  optionType='button'
                  buttonStyle='solid'
                  size='small'
                  options={[EAppApiDevice.ipad, EAppApiDevice.android]}
                  value={appApiDecice}
                  onChange={(e) => updateSettings({ appApiDecice: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function useCurrentShowingTabKeys(): ETab[] {
  const { hidingTabKeys } = useSettingsSnapshot()
  return useMemo(() => TabKeys.filter((key) => !hidingTabKeys.includes(key)), [hidingTabKeys])
}

function VideoSourceTabOrder({ className, style }: { className?: string; style?: CSSProperties }) {
  const currentShowingTabKeys = useCurrentShowingTabKeys()
  const sortedTabKeys = useSortedTabKeys()

  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragEnd = useMemoizedFn((e: DragEndEvent) => {
    const { over, active } = e
    if (!over?.id || over.id === active.id) return

    const oldIndex = sortedTabKeys.indexOf(active.id.toString())
    const newIndex = sortedTabKeys.indexOf(over.id.toString())
    // console.log('re-order:', oldIndex, newIndex)
    const newList = arrayMove(sortedTabKeys, oldIndex, newIndex)
    updateSettings({ customTabKeysOrder: newList })
  })

  return (
    <div {...{ className, style }}>
      <Checkbox.Group
        css={css`
          display: block;
          line-height: unset;
        `}
        value={currentShowingTabKeys}
        onChange={(newVal) => {
          if (!newVal.length) {
            return antMessage.error('至少选择一项!')
          }
          updateSettings({
            hidingTabKeys: TabKeys.filter((k) => !newVal.includes(k)),
          })
        }}
      >
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        >
          <SortableContext items={sortedTabKeys} strategy={verticalListSortingStrategy}>
            {sortedTabKeys.map((key) => (
              <VideoSourceTabSortableItem key={key} id={key} />
            ))}
          </SortableContext>
        </DndContext>
      </Checkbox.Group>
    </div>
  )
}

function VideoSourceTabSortableItem({ id }: { id: ETab }) {
  const { attributes, listeners, setNodeRef, transform, transition, setActivatorNodeRef } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const { label, desc } = TabConfig[id]

  return (
    <div
      key={id}
      ref={setNodeRef}
      style={style}
      {...attributes}
      css={css`
        display: flex;
        align-items: center;
        justify-content: flex-start;
        height: 35px;

        padding-left: 10px;
        padding-right: 6px;
        border: 1px solid ${bgLv2Value};
        border-radius: 6px;
        margin-top: 8px;
      `}
    >
      <Checkbox
        value={id}
        css={css`
          display: inline-flex;
          align-items: center;
          .ant-checkbox + span {
            user-select: none;
            display: inline-flex;
            align-items: center;
          }
        `}
      >
        <TabIcon tabKey={id} mr={5} />
        <AntdTooltip align={{ offset: [0, -6] }} title={desc}>
          {label}
        </AntdTooltip>
      </Checkbox>

      <div
        css={css`
          flex: 1;
        `}
      />

      <div
        {...listeners}
        ref={setActivatorNodeRef}
        css={css`
          cursor: grab;
          font-size: 0;
          padding: 3px 5px;
          border-radius: 5px;
          &:hover {
            background-color: ${bgLv3Value};
          }
        `}
      >
        <IconParkOutlineDrag className='size-18px' />
      </div>
    </div>
  )
}

function DynamicFeedWhenViewAllHideIdsPanel() {
  const { hideIds } = useSnapshot(settings.dynamicFeed.whenViewAll)

  const onDelete = useMemoizedFn((mid: string) => {
    updateSettingsInnerArray('dynamicFeed.whenViewAll.hideIds', { remove: [mid] })
  })

  const { followGroups } = useSnapshot(dfStore)
  useMount(() => {
    dfStore.updateFollowGroups()
  })

  const empty = !hideIds.length
  if (empty) {
    return (
      <div className='flex items-center justify-center'>
        <Empty />
      </div>
    )
  }

  return (
    <div className='flex flex-wrap gap-10 max-h-250px overflow-y-scroll'>
      {hideIds.map((tag) => {
        return (
          <TagItemDisplay
            tag={tag}
            onDelete={onDelete}
            renderTag={(t) => (
              <DynamicFeedWhenViewAllHideIdTag tag={t} followGroups={followGroups} />
            )}
          />
        )
      })}
    </div>
  )
}

function DynamicFeedWhenViewAllHideIdTag({
  tag,
  followGroups,
}: {
  tag: string
  followGroups?: FollowGroup[]
}) {
  let mid: string | undefined
  let followGroupId: string | undefined
  let invalid = false
  if (tag.startsWith(DF_SELECTED_KEY_PREFIX_UP)) {
    mid = tag.slice(DF_SELECTED_KEY_PREFIX_UP.length)
  } else if (tag.startsWith(DF_SELECTED_KEY_PREFIX_GROUP)) {
    followGroupId = tag.slice(DF_SELECTED_KEY_PREFIX_GROUP.length)
  } else {
    invalid = true
  }

  // mid -> nickname
  const [upNickname, setUpNickname] = useState<string | undefined>(undefined)
  useMount(async () => {
    if (!mid) return
    const nickname = await getUserNickname(mid)
    if (nickname) setUpNickname(nickname)
  })

  // followGroupId -> name
  const [followGroupName, setFollowGroupName] = useState<string | undefined>(undefined)
  useMount(async () => {
    if (!followGroupId) return
    const groupName = followGroups?.find((g) => g.tagid.toString() === followGroupId)?.name
    if (groupName) setFollowGroupName(groupName)
  })

  const label = useMemo(
    () => (mid ? upNickname || mid : followGroupId ? followGroupName || followGroupId : '无效数据'),
    [mid, upNickname, followGroupId, followGroupName],
  )

  const tooltip = useMemo(
    () => (mid ? `mid: ${mid}` : followGroupId ? `分组: ${followGroupId}` : `Tag: ${tag}`),
    [mid, followGroupId, tag],
  )

  const icon = useMemo(
    () =>
      mid ? (
        <IconForUp {...size(12)} className='mr-2' />
      ) : followGroupId ? (
        <IconForGroup {...size(16)} className='mr-2' />
      ) : undefined,
    [mid, followGroupId],
  )

  const href = useMemo(
    () =>
      mid ? formatSpaceUrl(mid) : followGroupId ? formatFollowGroupUrl(followGroupId) : undefined,
    [mid, followGroupId],
  )

  return (
    <>
      <AntdTooltip title={tooltip}>
        <span
          css={[
            inlineFlexVerticalCenterStyle,
            css`
              cursor: ${mid ? 'pointer' : 'edit'};
            `,
          ]}
        >
          {icon}
          {href ? (
            <a href={href} target='_blank'>
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
