/**
 * 获取 access_key
 */

import { settings } from '$settings'
import request from 'axios'
import { toast } from './toast'

export const appkey = '27eb53fc9058f8c3'

export const GET_ACCESS_KEY_VIA_302 = true

/**
 * 2023-08-19
 * mcbbs.net 只让他自己 iframe
 * Content-Security-Policy: frame-ancestors *.mcbbs.net
 * 故改成弹出窗口
 */

export const GET_ACCESS_KEY_VIA_POPUP_WINDOW = true

async function getAccessKey(): Promise<string | undefined> {
  const res = await request.get('https://passport.bilibili.com/login/app/third', {
    params: {
      appkey,
      api: 'https://www.mcbbs.net/template/mcbbs/image/special_photo_bg.png',
      sign: '04224646d1fea004e79606d3b038c84a',
    },
    withCredentials: true,
  })
  const json = res.data

  if (!json?.data?.has_login) {
    toast('你必须登录B站之后才能使用授权')
    return
  }

  if (!json?.data?.confirm_uri) {
    toast('无法获得授权网址')
    return
  }
  const confirm_uri = json.data.confirm_uri

  if (GET_ACCESS_KEY_VIA_302) {
    const redirectUrl = await getRedirectUrl(confirm_uri)
    return extractAccessKeyFromUrl(redirectUrl)
  }

  return await getAccessKeyByPostMessage(confirm_uri)
}

export async function auth() {
  const accessKey = await getAccessKey()
  if (!accessKey) return

  settings.accessKey = accessKey
  toast('获取成功')
  return accessKey
}

export function deleteAccessToken() {
  settings.accessKey = ''
  toast('已删除 access_key')
}

export function getRedirectUrl(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    GM.xmlHttpRequest({
      method: 'get',
      url: url,
      responseType: 'blob',
      onload(res) {
        // console.log('onload', res)
        resolve(res.finalUrl)
      },
      onreadystatechange(res) {
        // console.log('onreadystatechange', res)
      },
    })
  })
}

function extractAccessKeyFromUrl(urlWithAccessKey: string) {
  const u = new URL(urlWithAccessKey)
  const accessKey = u.searchParams.get('access_key')
  if (!accessKey) {
    toast('没有获得匹配的密钥')
    return undefined
  } else {
    return accessKey
  }
}

async function getAccessKeyByPostMessage(confirm_uri: string) {
  let timeout: ReturnType<typeof setTimeout> | undefined
  let removeEventHandler: (() => void) | undefined

  const waitCallback = new Promise<string | undefined>((resolve) => {
    const handleEvent = (e: MessageEvent) => {
      if (e.origin != 'https://www.mcbbs.net') return
      if (!e.data || typeof e.data !== 'string') {
        console.warn('received message event with invalid data')
        return
      }
      // e.data 为 redirect url
      resolve(extractAccessKeyFromUrl(e.data))
    }

    window.addEventListener('message', handleEvent)
    removeEventHandler = () => window.removeEventListener('message', handleEvent)

    timeout = setTimeout(() => {
      toast('获取授权超时')
      resolve(undefined)
    }, 10 * 1000) // 10 s
  })

  let cleanWindow: (() => void) | undefined

  if (GET_ACCESS_KEY_VIA_POPUP_WINDOW) {
    // use window.open
    const confirmWin = window.open(confirm_uri, '_blank', 'popup=true,width=800,height=600')
    cleanWindow = () => confirmWin?.close()
  } else {
    // use iframe
    const iframe = document.createElement('iframe')
    iframe.src = confirm_uri
    iframe.style.display = 'none'
    document.body.appendChild(iframe)
    cleanWindow = () => iframe.remove()
  }

  function cleanup() {
    cleanWindow?.()

    removeEventHandler?.()
    removeEventHandler = undefined

    if (timeout) {
      clearTimeout(timeout)
      timeout = undefined
    }
  }

  const result = await waitCallback
  cleanup()

  return result
}
