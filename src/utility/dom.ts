import { appWarn, baseDebug } from '$common'
import { delay, isNil } from 'es-toolkit'

const debug = baseDebug.extend('utility:dom')

const DEFAULT_POLL_TIMEOUT = 10 * 1000
const DEFAULT_POLL_INTERVAL = 200

export type PollOptions<T> = {
  interval?: number
  timeout?: number
  validate?: (value: T) => boolean
}

export async function poll<T>(fn: () => T, options?: PollOptions<T>) {
  const interval = options?.interval ?? DEFAULT_POLL_INTERVAL
  let timeout = options?.timeout ?? DEFAULT_POLL_TIMEOUT
  if (timeout === 0) timeout = Infinity
  const validate = options?.validate ?? ((val: T) => !isNil(val))

  const start = performance.now()
  let result = fn()

  while (!validate(result) && performance.now() - start < timeout) {
    await delay(interval)
    result = fn()
  }

  return result
}

export interface TryActionOptions {
  selectorPredicate?: (el: HTMLElement) => boolean
  pollInterval?: number
  pollTimeout?: number
  warnOnTimeout?: boolean
}

export async function tryAction(
  selector: string,
  action: (el: HTMLElement) => void | Promise<void>,
  moreOptions?: TryActionOptions,
) {
  const pollTimeout = moreOptions?.pollTimeout ?? DEFAULT_POLL_TIMEOUT
  const pollInterval = moreOptions?.pollInterval ?? DEFAULT_POLL_INTERVAL
  const selectorPredicate = moreOptions?.selectorPredicate
  const warnOnTimeout = moreOptions?.warnOnTimeout ?? false

  const arr = await poll(
    () => {
      let arr = Array.from(document.querySelectorAll<HTMLElement>(selector))
      if (selectorPredicate) arr = arr.filter(selectorPredicate)
      if (arr.length) return arr
    },
    {
      timeout: pollTimeout,
      interval: pollInterval,
    },
  )
  if (!arr?.length) {
    debug('tryAction: timeout for selector = `%s`', selector)
    if (warnOnTimeout) {
      appWarn('tryAction timeout, selector = `%s`', selector)
    }
    return
  }

  debug('tryAction: selector=`%s` count=%s', selector, arr.length)
  for (const el of arr) {
    await Promise.resolve(action(el))
  }
}

/**
 * 尝试移除元素
 */

export async function tryToRemove(
  selector: string,
  selectorPredicate?: (el: HTMLElement) => boolean,
  delayMs?: number,
) {
  if (typeof delayMs === 'number') await delay(delayMs)
  return tryAction(selector, (el) => el.remove(), {
    selectorPredicate,
    warnOnTimeout: false,
  })
}

/**
 * input 输入中, 用于拦截快捷键处理
 */

export function shouldDisableShortcut() {
  // if activeElement is input, disable shortcut
  const activeTagName = (document.activeElement?.tagName || '').toLowerCase()
  if (['input', 'textarea'].includes(activeTagName)) {
    return true
  }

  // if search panel is open, disable shortcut
  if (document.querySelector('.center-search__bar.is-focus')) {
    return true
  }

  return false
}

/**
 * https://youmightnotneedjquery.com/#offset
 */

export function getElementOffset(el: HTMLElement, rect?: DOMRect) {
  rect ??= el.getBoundingClientRect()
  const docElem = document.documentElement
  // 非常好理解, 当 scroll = 0 时, bounding-rect.top 即为 offset; 有 scroll 时, 还原即可.
  return {
    top: rect.top + window.scrollY - docElem.clientTop,
    left: rect.left + window.scrollX - docElem.clientLeft,
  }
}

export function nextTick(): Promise<void> {
  return new Promise((resolve) => {
    queueMicrotask(resolve)
  })
}

export function whenIdle(options?: IdleRequestOptions): Promise<void> {
  return new Promise((resolve) => {
    // safari has no requestIdleCallback
    if (typeof requestIdleCallback === 'function') {
      requestIdleCallback(() => resolve(), options)
    } else {
      setTimeout(resolve)
    }
  })
}

export let ORIGINAL_TITLE: string = ''

export function setPageTitle(title: string) {
  // backup original title on first call
  if (!ORIGINAL_TITLE) {
    ORIGINAL_TITLE = document.title
  }
  document.title = `${title} - ${ORIGINAL_TITLE}`
}

/**
 * https://www.zhangxinxu.com/wordpress/2019/10/document-readystate/
 */
export async function domReady() {
  if (document.readyState !== 'loading') {
    return
  } else {
    return new Promise<void>((resolve) => {
      document.addEventListener('DOMContentLoaded', () => {
        resolve()
      })
    })
  }
}
