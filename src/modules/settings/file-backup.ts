import { APP_NAME } from '$common'
import { toastAndReload } from '$components/ModalSettings/index.shared'
import { AntdMessage, toast } from '$utility'
import dayjs from 'dayjs'
import { pick } from 'es-toolkit'
import { tryit } from 'radash'
import { allowedSettingsKeys, getSettingsSnapshot, updateSettings, type Settings } from './index'
import { set_HAS_RESTORED_SETTINGS } from './restore-flag'

let lastUrl: string | undefined
function genUrl() {
  // revoke previous created url
  tryit(() => {
    if (lastUrl) URL.revokeObjectURL(lastUrl)
    lastUrl = undefined
  })()

  const val = getSettingsSnapshot()
  const json = JSON.stringify(val, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  lastUrl = URL.createObjectURL(blob)
  return lastUrl
}

export async function exportSettings() {
  const url = genUrl()
  const filename = `${APP_NAME}-settings ${dayjs().format('YYYY-MM-DD HH:mm:ss')}.json`
  if (typeof GM_download !== 'undefined') {
    GM_download?.({ url, name: filename })
  } else {
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
  }
}

export async function importSettings() {
  const file = await chooseSingleJsonFile()
  if (!file) return

  const text = await file.text()
  if (!text) return toast('文件内容为空!')

  let settingsFromFile
  try {
    settingsFromFile = JSON.parse(text) as Partial<Settings>
  } catch (error) {
    return toast('无法解析文件内容!')
  }

  const pickedSettings = pick(settingsFromFile || {}, allowedSettingsKeys)
  const len = Object.keys(pickedSettings).length
  if (!len) {
    return toast('没有有效的设置!')
  }

  set_HAS_RESTORED_SETTINGS(true)
  updateSettings(pickedSettings)
  AntdMessage.success('导入成功!')
  return toastAndReload()
}

function chooseSingleJsonFile() {
  return chooseFile({
    accept: '.json',
    multiple: false,
  })
}

function chooseFile(options: Partial<HTMLInputElement>) {
  return new Promise<File | null>((resolve) => {
    const input = document.createElement('input')
    input.type = 'file'
    Object.assign(input, options)
    input.addEventListener('change', () => {
      resolve(input.files?.[0] || null)
    })
    input.click()
  })
}
