import { buttonOpenCss, usePopoverBorderColor } from '$common/emotion-css'
import { useOnRefreshContext } from '$components/RecGrid/useRefresh'
import { settings, useSettingsSnapshot } from '$modules/settings'
import { defineAntMenus, type AntMenuItem } from '$utility/antd'
import { css } from '@emotion/react'
import { Button, Dropdown, Popover, Space, Tag, Transfer } from 'antd'
import type { TransferDirection } from 'antd/es/transfer'
import { delay, groupBy } from 'es-toolkit'
import type { Key } from 'react'
import { useSnapshot } from 'valtio'
import { usePopupContainer } from '../../_base'
import { dropdownMenuStyle } from '../../_shared'
import { isFavFolderDefault, isFavFolderPrivate } from '../fav-util'
import type { FavFolderBasicService } from '../service/_base'
import { favStore, type FavStore } from '../store'

export const IconForAll = IconLucideList
export const IconForPrivateFolder = IconLucideFolderLock
export const IconForPublicFolder = IconLucideFolder
export const IconForCollection = IconIonLayersOutline

export function FavUsageInfo({ extraContent }: { extraContent?: ReactNode }) {
  const { fav } = useSettingsSnapshot()
  const {
    favFolders,
    selectedFavFolder,
    favCollections,
    selectedFavCollection,
    selectedLabel,
    selectedKey,
  } = useSnapshot(favStore)
  const onRefresh = useOnRefreshContext()
  const { ref, getPopupContainer } = usePopupContainer()

  useMount(() => {
    favStore.updateList()
  })

  // 分割线设置切换, 即时生效
  useUpdateEffect(() => {
    void (async () => {
      await delay(100)
      onRefresh?.()
    })()
  }, [fav.addSeparator])

  // #region scope selection dropdown
  const scopeSelectionDropdownMenus: AntMenuItem[] = useMemo(() => {
    const collectionSubMenus: AntMenuItem[] = []
    const collectionGrouped = groupBy(favCollections, (x) => x.upper.name)
    const entries = Object.entries(collectionGrouped).map(([upName, collections]) => ({
      upName,
      collections: collections.sort((a, b) => a.title.localeCompare(b.title, 'zh-CN')),
    }))
    entries.sort((a, b) => a.upName.localeCompare(b.upName, 'zh-CN'))
    for (const { upName, collections } of entries) {
      collectionSubMenus.push(
        ...defineAntMenus([
          {
            type: 'group',
            label: `@${upName}`,
            children: collections.map((f) => {
              const key: FavStore['selectedKey'] = `fav-collection:${f.id}`
              const icon = <IconForCollection />
              const label = `${f.title} (${f.media_count})`
              return {
                key,
                icon,
                label,
                async onClick() {
                  favStore.selectedFavFolderId = undefined
                  favStore.selectedFavCollectionId = f.id
                  setScopeDropdownOpen(false)
                  await delay(100)
                  onRefresh?.()
                },
              }
            }),
          },
        ]),
      )
    }

    return defineAntMenus([
      {
        key: 'all',
        icon: <IconForAll />,
        label: '全部',
        async onClick() {
          favStore.selectedFavFolderId = undefined
          favStore.selectedFavCollectionId = undefined
          setScopeDropdownOpen(false)
          await delay(100)
          onRefresh?.()
        },
      },
      !!favFolders.length && {
        type: 'group',
        label: '收藏夹',
        children: favFolders.map((f) => {
          const isDefault = isFavFolderDefault(f.attr)
          const isPrivate = isFavFolderPrivate(f.attr)
          const key: FavStore['selectedKey'] = `fav-folder:${f.id}`
          const icon = isPrivate ? <IconForPrivateFolder /> : <IconForPublicFolder />
          const label = `${f.title} (${f.media_count})`
          return {
            key,
            icon,
            label,
            async onClick() {
              favStore.selectedFavFolderId = f.id
              favStore.selectedFavCollectionId = undefined
              setScopeDropdownOpen(false)
              await delay(100)
              onRefresh?.()
            },
          }
        }),
      },
      !!favCollections.length && {
        type: 'group',
        label: '合集',
        children: collectionSubMenus,
      },
    ])
  }, [favFolders, favCollections])
  const [scopeDropdownOpen, setScopeDropdownOpen] = useState(false)
  const dropdownButtonIcon = selectedFavFolder ? (
    isFavFolderPrivate(selectedFavFolder.attr) ? (
      <IconForPrivateFolder />
    ) : (
      <IconForPublicFolder />
    )
  ) : selectedFavCollection ? (
    <IconForCollection />
  ) : (
    <IconForAll />
  )
  const dropdownButtonLabel = selectedLabel
  const scopeSelectionDropdown = (
    <Dropdown
      open={scopeDropdownOpen}
      onOpenChange={setScopeDropdownOpen}
      placement='bottomLeft'
      getPopupContainer={getPopupContainer}
      menu={{
        items: scopeSelectionDropdownMenus,
        style: { ...dropdownMenuStyle, border: `1px solid ${usePopoverBorderColor()}` },
        selectedKeys: [selectedKey],
      }}
    >
      <Button
        className='gap-4px'
        css={[scopeDropdownOpen && buttonOpenCss]}
        icon={dropdownButtonIcon}
      >
        {dropdownButtonLabel}
      </Button>
    </Dropdown>
  )
  // #endregion

  return (
    <Space ref={ref} size={10}>
      {/* scope selction */}
      {scopeSelectionDropdown}

      {/* extra */}
      {extraContent}
    </Space>
  )
}

export function ViewingAllExcludeFolderConfig({
  allFavFolderServices,
}: {
  allFavFolderServices: FavFolderBasicService[]
}) {
  const { fav } = useSettingsSnapshot()
  const onRefresh = useOnRefreshContext()
  const { ref, getPopupContainer } = usePopupContainer()

  const [excludeFavFolderIdsChanged, setExcludeFavFolderIdsChanged] = useState(false)

  const handleChange = useMemoizedFn(
    (newTargetKeys: Key[], direction: TransferDirection, moveKeys: Key[]) => {
      setExcludeFavFolderIdsChanged(true)
      settings.fav.excludedFolderIds = newTargetKeys.map((k) => k.toString())
    },
  )

  // may contains legacy ids, so not `allFavFolderServices.length - excludeFavFolderIds.length`
  const foldersCount = useMemo(
    () =>
      allFavFolderServices.filter((x) => !fav.excludedFolderIds.includes(x.entry.id.toString()))
        .length,
    [allFavFolderServices, fav.excludedFolderIds],
  )

  const videosCount = useMemo(() => {
    return allFavFolderServices
      .filter((s) => !fav.excludedFolderIds.includes(s.entry.id.toString()))
      .reduce((count, s) => count + s.entry.media_count, 0)
  }, [allFavFolderServices, fav.excludedFolderIds])

  const onPopupOpenChange = useMemoizedFn((open: boolean) => {
    // when open
    if (open) {
      setExcludeFavFolderIdsChanged(false)
    }

    // when close
    else {
      if (excludeFavFolderIdsChanged) {
        onRefresh?.()
      }
    }
  })

  return (
    <Popover
      getTooltipContainer={getPopupContainer}
      trigger={'click'}
      placement='bottom'
      onOpenChange={onPopupOpenChange}
      getPopupContainer={(el) => el.parentElement || document.body}
      content={
        <>
          <Transfer
            dataSource={allFavFolderServices}
            rowKey={(row) => row.entry.id.toString()}
            titles={['收藏夹', '忽略']}
            targetKeys={fav.excludedFolderIds}
            onChange={handleChange}
            render={(item) => item.entry.title}
            oneWay
            style={{ marginBottom: 10 }}
          />
        </>
      }
    >
      <Tag
        ref={ref}
        color='success'
        css={css`
          cursor: pointer;
          font-size: 12px;
        `}
      >
        收藏夹({foldersCount}) 收藏({videosCount})
      </Tag>
    </Popover>
  )
}
