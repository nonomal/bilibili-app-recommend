import { C } from '$common/emotion-css'
import { CheckboxSettingItem, SwitchSettingItem } from '$components/ModalSettings/setting-item'
import { HelpInfo } from '$components/_base/HelpInfo'
import { updateSettings, useSettingsSnapshot } from '$modules/settings'
import { InputNumber, Tag } from 'antd'
import type { ComponentProps } from 'react'
import { EditableListSettingItem } from '../EditableListSettingItem'
import styles from '../index.module.scss'

export function TabPaneFilter() {
  const {
    filterEnabled,
    filterMinPlayCount,
    filterMinPlayCountEnabled,
    filterMinDuration,
    filterMinDurationEnabled,
    filterOutGotoTypePicture,
    filterByAuthorNameEnabled,
    filterByTitleEnabled,
  } = useSettingsSnapshot()

  const getExemptFollowedTooltipProps = (
    label: '视频' | '图文',
  ): Partial<ComponentProps<typeof CheckboxSettingItem>> => {
    return {
      label: '「已关注」豁免',
      tooltipProps: { color: 'rgba(0, 0, 0, 0.85)' },
      tooltip: (
        <>
          推荐中已关注用户发布的内容({label}) 不会被过滤
          <br />
          "豁免" 一词来源{' '}
          <a
            target='_blank'
            href='https://github.com/magicdawn/bilibili-app-recommend/issues/1#issuecomment-2197868587'
          >
            pilipala
          </a>
        </>
      ),
    }
  }

  return (
    <div
      className={styles.tabPane}
      css={css`
        padding-right: 15px; // for scrollbar
      `}
    >
      <div className={styles.settingsGroup}>
        <div className={styles.settingsGroupTitle}>
          内容过滤
          <HelpInfo>
            启用过滤会大幅降低加载速度, 谨慎开启! <br />
            视频/图文/影视: 仅推荐类 Tab 生效 <br />
            UP/标题: 推荐类 / 热门 等Tab 生效
          </HelpInfo>
          <SwitchSettingItem configKey='filterEnabled' css={C.ml(10)} />
        </div>

        <div className={clsx(styles.settingsGroupContent)}>
          <div
            css={css`
              display: grid;
              grid-template-columns: repeat(2, minmax(0, 1fr));
              column-gap: 15px;
              /* row-gap: 15px; */
            `}
          >
            <div className='col'>
              <div className={styles.settingsGroupSubTitle}>视频</div>
              <div className={styles.row}>
                <CheckboxSettingItem
                  disabled={!filterEnabled}
                  configKey='filterMinPlayCountEnabled'
                  label='按播放量过滤'
                  tooltip={<>不显示播放量很少的视频</>}
                />
                <InputNumber
                  size='small'
                  min={1}
                  step={1000}
                  value={filterMinPlayCount}
                  onChange={(val) => val && updateSettings({ filterMinPlayCount: val })}
                  disabled={!filterEnabled || !filterMinPlayCountEnabled}
                />
              </div>
              <div className={styles.row} style={{ marginTop: 3 }}>
                <CheckboxSettingItem
                  configKey='filterMinDurationEnabled'
                  label='按视频时长过滤'
                  tooltip={<>不显示短视频</>}
                  disabled={!filterEnabled}
                />
                <InputNumber
                  style={{ width: 150 }}
                  size='small'
                  min={1}
                  step={10}
                  addonAfter={'单位:秒'}
                  value={filterMinDuration}
                  onChange={(val) => val && updateSettings({ filterMinDuration: val })}
                  disabled={!filterEnabled || !filterMinDurationEnabled}
                />
              </div>
              <CheckboxSettingItem
                className={styles.row}
                style={{ marginTop: 3 }}
                configKey='exemptForFollowedVideo'
                disabled={!filterEnabled}
                {...getExemptFollowedTooltipProps('视频')}
              />
            </div>

            <div className='col'>
              <div className={styles.settingsGroupSubTitle}>图文</div>
              <CheckboxSettingItem
                className={styles.row}
                configKey='filterOutGotoTypePicture'
                label='过滤图文类型推荐'
                tooltip={
                  <>
                    过滤 <kbd>goto = picture</kbd> 的内容: 包括 (动态 & 专栏) 等
                  </>
                }
                disabled={!filterEnabled}
              />
              <CheckboxSettingItem
                className={styles.row}
                disabled={!filterEnabled || !filterOutGotoTypePicture}
                configKey='exemptForFollowedPicture'
                {...getExemptFollowedTooltipProps('图文')}
              />

              <div className={styles.settingsGroupSubTitle}>影视</div>
              <CheckboxSettingItem
                className={styles.row}
                configKey='filterOutGotoTypeBangumi'
                label='过滤影视类型推荐'
                tooltip={
                  <>
                    过滤 <kbd>goto = bangumi</kbd> 的内容: 包括 (番剧 / 电影 / 国创 / 纪录片) 等
                  </>
                }
                disabled={!filterEnabled}
              />
            </div>

            <div className='col'>
              <div className={styles.settingsGroupSubTitle}>
                UP
                <HelpInfo>
                  根据 UP 过滤视频
                  <br />
                  使用 mid 屏蔽时支持备注, 格式: <Tag color='success'>mid(备注)</Tag>
                  {'  '}如 <Tag color='success'>8047632(B站官方)</Tag>
                  <br />
                  作用范围: 推荐 / 热门
                  <br />
                  P.S B站官方支持黑名单, 对于不喜欢的 UP 可以直接拉黑
                  <br />
                  P.S 这里是客户端过滤, 与黑名单功能重复, 后期版本可能会删除这个功能
                </HelpInfo>
                <SwitchSettingItem
                  configKey='filterByAuthorNameEnabled'
                  disabled={!filterEnabled}
                  css={css`
                    margin-left: 10px;
                  `}
                />
              </div>
              <EditableListSettingItem
                configKey={'filterByAuthorNameKeywords'}
                searchProps={{ placeholder: '添加UP: 全名 / mid / mid(备注)' }}
                disabled={!filterEnabled || !filterByAuthorNameEnabled}
              />
            </div>

            <div className='col'>
              <div className={styles.settingsGroupSubTitle}>
                <span>标题</span>
                <HelpInfo>
                  根据标题关键词过滤视频 <br />
                  支持正则(i), 语法：/abc|\d+/ <br />
                  作用范围: 推荐 / 热门
                </HelpInfo>
                <SwitchSettingItem
                  configKey='filterByTitleEnabled'
                  disabled={!filterEnabled}
                  css={css`
                    margin-left: 10px;
                  `}
                />
              </div>
              <EditableListSettingItem
                configKey={'filterByTitleKeywords'}
                searchProps={{ placeholder: '添加过滤关键词' }}
                disabled={!filterEnabled || !filterByTitleEnabled}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
