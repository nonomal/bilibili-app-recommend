// ==UserScript==
// @name         bilibili-app-recommend
// @namespace    https://magicdawn.fun
// @version      0.24.10
// @author       magicdawn
// @description  B站首页推荐
// @license      MIT
// @icon         https://www.bilibili.com/favicon.ico
// @homepageURL  https://greasyfork.org/zh-CN/scripts/443530-bilibili-app-recommend
// @supportURL   https://github.com/magicdawn/bilibili-app-recommend/issues
// @downloadURL  https://github.com/magicdawn/bilibili-app-recommend/raw/release/bilibili-app-recommend.user.js
// @updateURL    https://github.com/magicdawn/bilibili-app-recommend/raw/release/bilibili-app-recommend.meta.js
// @match        https://www.bilibili.com/
// @match        https://www.bilibili.com/?*
// @match        https://www.bilibili.com/index.html
// @match        https://www.bilibili.com/index.html?*
// @match        https://www.bilibili.com/video/*
// @match        https://www.bilibili.com/list/watchlater?*
// @match        https://www.bilibili.com/bangumi/play/*
// @match        https://space.bilibili.com/*
// @require      https://registry.npmmirror.com/axios/0.27.2/files/dist/axios.min.js
// @require      https://registry.npmmirror.com/react/18.3.1/files/umd/react.production.min.js
// @require      https://registry.npmmirror.com/react-dom/18.3.1/files/umd/react-dom.production.min.js
// @require      https://registry.npmmirror.com/ua-parser-js/1.0.38/files/dist/ua-parser.min.js
// @require      https://registry.npmmirror.com/framer-motion/11.3.31/files/dist/framer-motion.js
// @require      https://registry.npmmirror.com/localforage/1.10.0/files/dist/localforage.min.js
// @require      https://registry.npmmirror.com/lodash/4.17.21/files/lodash.min.js
// @require      https://registry.npmmirror.com/dayjs/1.11.13/files/dayjs.min.js
// @require      https://registry.npmmirror.com/dayjs/1.11.13/files/plugin/duration.js
// @require      https://registry.npmmirror.com/@ant-design/cssinjs/1.21.1/files/dist/umd/cssinjs.min.js
// @require      https://registry.npmmirror.com/antd/5.20.3/files/dist/antd-with-locales.min.js
// @connect      app.bilibili.com
// @grant        GM.getValue
// @grant        GM.openInTab
// @grant        GM.registerMenuCommand
// @grant        GM.setClipboard
// @grant        GM.setValue
// @grant        GM.xmlHttpRequest
// @grant        GM_addStyle
// @grant        unsafeWindow
// @grant        window.focus
// @run-at       document-end
// ==/UserScript==

(n=>{if(typeof GM_addStyle=="function"){GM_addStyle(n);return}const i=document.createElement("style");i.textContent=n,document.head.append(i)})(` @charset "UTF-8";.primary-btn:disabled:active, .primary-btn:disabled:hover {
  cursor: wait;
  background-color: inherit;
}

.ant-btn {
  font-size: 13px;
  line-height: 24px;
}
.ant-btn:disabled {
  cursor: wait;
}

.ant-radio-button-wrapper-disabled {
  cursor: wait;
}

body .ant-tooltip a {
  color: #1677ff;
  transition: color 0.3s;
}
body .ant-tooltip a:visited {
  color: #1677ff;
}
body .ant-tooltip a:hover {
  color: #69b1ff;
}
body .ant-tooltip a:active {
  color: #0958d9;
}

body button:where(.ant-switch):focus, body button:where(.ant-switch):active {
  background-color: rgba(0, 0, 0, 0.25);
  outline: unset;
}

.ant-message-custom-content [role=img] {
  position: relative;
  top: -2px;
}.i-icon{display:inline-block;color:inherit;font-style:normal;line-height:0;text-align:center;text-transform:none;vertical-align:-.125em;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.i-icon-spin svg{animation:i-icon-spin 1s infinite linear}.i-icon-rtl{transform:scaleX(-1)}@keyframes i-icon-spin{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes i-icon-spin{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}._settings-group_1xm9d_1 {
  margin-bottom: 10px;
}
._settings-group_1xm9d_1 ._settings-group-title_1xm9d_4 {
  font-size: 2em;
  display: flex;
  align-items: center;
}
._settings-group_1xm9d_1 ._settings-group-sub-title_1xm9d_9 {
  font-size: 1.3em;
  display: flex;
  align-items: center;
  margin-top: 15px;
}
._settings-group_1xm9d_1 ._settings-group-content_1xm9d_15 {
  color: default;
}
._settings-group_1xm9d_1 ._settings-group-content_1xm9d_15 button:first-child {
  margin-left: 0;
}

._row_1xm9d_22 {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

._tab-pane_1xm9d_28 {
  overflow-y: scroll;
  min-height: 362px;
  max-height: max(362px, 90vh - 121px);
}._bili-video-card_77vjq_1 {
  position: relative;
}
._bili-video-card_77vjq_1 .bili-video-card__stats--item {
  margin-right: 8px;
}

._preview-card-wrapper_77vjq_8 {
  z-index: 4;
}

._disliked-wrapper_77vjq_12 {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: var(--video-card-border-radius);
  border: 1px solid #eee;
}
body.dark ._disliked-wrapper_77vjq_12 {
  border: 1px solid #333;
}
._disliked-wrapper_77vjq_12 ._dislike-content-cover_77vjq_23 {
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  aspect-ratio: 16/9;
  position: relative;
}
._disliked-wrapper_77vjq_12 ._dislike-content-cover_77vjq_23 ._dislike-content-cover-inner_77vjq_29 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--bilibili-app-recommend-bg-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
._disliked-wrapper_77vjq_12 ._dislike-content-cover_77vjq_23 ._dislike-content-cover-inner_77vjq_29 ._dislike-icon_77vjq_41 {
  margin-bottom: 5px;
}
._disliked-wrapper_77vjq_12 ._dislike-content-cover_77vjq_23 ._dislike-content-cover-inner_77vjq_29 ._dislike-reason_77vjq_44 {
  font-size: 20px;
  text-align: center;
}
._disliked-wrapper_77vjq_12 ._dislike-content-cover_77vjq_23 ._dislike-content-cover-inner_77vjq_29 ._dislike-desc_77vjq_48 {
  font-size: 16px;
  text-align: center;
}
._disliked-wrapper_77vjq_12 ._dislike-content-action_77vjq_52 {
  flex: 1;
  position: relative;
}
._disliked-wrapper_77vjq_12 ._dislike-content-action_77vjq_52 ._dislike-content-action-inner_77vjq_56 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--bilibili-app-recommend-bg-color);
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: center;
}
body.dark ._disliked-wrapper_77vjq_12 ._dislike-content-action_77vjq_52 ._dislike-content-action-inner_77vjq_56 {
  border-top: 1px solid #333;
}
._disliked-wrapper_77vjq_12 ._dislike-content-action_77vjq_52 ._dislike-content-action-inner_77vjq_56 button {
  font-size: 16px;
  color: inherit;
  display: flex;
  align-items: center;
}

body .bili-video-card__skeleton--cover, body .bili-video-card__skeleton--text, body .bili-video-card__skeleton--light, body .bili-video-card__skeleton--avatar {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.06) 25%, rgba(0, 0, 0, 0.15) 37%, rgba(0, 0, 0, 0.06) 63%);
}
body.dark .bili-video-card__skeleton--avatar {
  background-color: #444;
}
.bili-video-card__skeleton--text.tiny {
  margin-top: 4px;
  width: 15%;
}

._skeleton-active_77vjq_92 .bili-video-card__skeleton--cover,
._skeleton-active_77vjq_92 .bili-video-card__skeleton--text,
._skeleton-active_77vjq_92 .bili-video-card__skeleton--light,
._skeleton-active_77vjq_92 .bili-video-card__skeleton--avatar {
  background-size: 400% 100%;
  animation-name: _ant-skeleton-loading_77vjq_1;
  animation-duration: 2.165s;
  animation-timing-function: ease;
  animation-iteration-count: infinite;
}

@keyframes _ant-skeleton-loading_77vjq_1 {
  0% {
    background-position: 100% 50%;
  }
  61.8%, 100% {
    background-position: 0 50%;
  }
}
/**
 * \u65B0\u7248\u9996\u9875
 * \u4F7F\u7528\u7684\u662F .video-card-body \u7684\u6837\u5F0F
 * \u5728B\u7AD9\u81EA\u5DF1\u7684\u9996\u9875\u4E2D, .bili-grid > 2200px \u662F\u5206 7 \u5217, .video-card-body > 2200px \u52066\u5217
 */
._video-grid_h0qxn_7 {
  --video-card-border-radius: 6px;
  display: grid;
  position: relative;
  width: 100%;
  grid-gap: 20px 12px;
  grid-template-columns: repeat(var(--col), minmax(0, 1fr));
}

._new-card-style_h0qxn_16 {
  --video-card-border-radius: 15px;
}

/**
 * bili-feed4
 * \u53D6\u81EA .battle-feed-area .battle-feed-body
 */
._video-grid-bili-feed4_h0qxn_24 {
  grid-gap: 20px 20px;
}
._video-grid-bili-feed4_h0qxn_24 .ant-divider-horizontal.ant-divider-with-text {
  margin-bottom: -15px;
  margin-top: -15px;
}
._video-grid-bili-feed4_h0qxn_24 .ant-divider-horizontal.ant-divider-with-text:first-of-type {
  margin-top: 0;
}

@media (max-width: 1399px) {
  ._video-grid-bili-feed4_h0qxn_24 {
    --col: 4;
  }
  ._video-grid-bili-feed4_h0qxn_24._limit-one-line_h0qxn_39 > *:nth-of-type(1n + 5) {
    display: none !important;
  }
  ._video-grid-bili-feed4_h0qxn_24._limit-two-lines_h0qxn_42 > *:nth-of-type(1n + 9) {
    display: none !important;
  }
}
@media (min-width: 1400px) {
  ._video-grid-bili-feed4_h0qxn_24 {
    --col: 5;
  }
  ._video-grid-bili-feed4_h0qxn_24._limit-one-line_h0qxn_39 > *:nth-of-type(1n + 6) {
    display: none !important;
  }
  ._video-grid-bili-feed4_h0qxn_24._limit-two-lines_h0qxn_42 > *:nth-of-type(1n + 11) {
    display: none !important;
  }
}
/**
 * @container query
 */
._video-grid-container_h0qxn_60 {
  container-type: inline-size;
}
._video-grid-container_h0qxn_60._virtual-grid-enabled_h0qxn_63 .virtuoso-grid-item {
  padding-bottom: var(--row-gap);
}
._video-grid-container_h0qxn_60._virtual-grid-enabled_h0qxn_63 .virtuoso-grid-item .bili-video-card {
  margin-bottom: 0;
  height: 100%;
}

._video-grid-custom_h0qxn_71 {
  --col: 4;
  column-gap: 20px;
  row-gap: 0;
  --row-gap: clamp(20px, 1.4vw, 40px);
}
._video-grid-custom_h0qxn_71 .bili-video-card {
  margin-bottom: var(--row-gap);
}
._video-grid-custom_h0qxn_71 .ant-divider-horizontal.ant-divider-with-text {
  margin-bottom: 5px;
  margin-top: calc(10px - var(--row-gap));
}
._video-grid-custom_h0qxn_71 .ant-divider-horizontal.ant-divider-with-text:first-of-type {
  margin-top: 0;
}

@container (width >= 1276px) {
  ._video-grid_h0qxn_7._video-grid-custom_h0qxn_71 {
    --col: 5;
  }
}
@container (inline-size >= 2080px) {
  ._video-grid_h0qxn_7._video-grid-custom_h0qxn_71 {
    --col: 6;
  }
}
@container (inline-size >= 2465px) {
  ._video-grid_h0qxn_7._video-grid-custom_h0qxn_71 {
    --col: 7;
  }
}
@container (inline-size >= 2860px) {
  ._video-grid_h0qxn_7._video-grid-custom_h0qxn_71 {
    --col: 8;
  }
}
@container (inline-size >= 3265px) {
  ._video-grid_h0qxn_7._video-grid-custom_h0qxn_71 {
    --col: 9;
  }
}
@container (inline-size >= 3680px) {
  ._video-grid_h0qxn_7._video-grid-custom_h0qxn_71 {
    --col: 10;
  }
}
/**
 * \u53CC\u5217\u6A21\u5F0F
 */
._narrow-mode_h0qxn_121 {
  --col: 2 !important;
} *,::before,::after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / 0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}::backdrop{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / 0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}.\\[refresh\\:scroll\\]{refresh:scroll;}.visible{visibility:visible;}.absolute{position:absolute;}.fixed{position:fixed;}.relative{position:relative;}.sticky{position:sticky;}.static{position:static;}.grid{display:grid;}.m13{margin:13px;}.m14{margin:14px;}.m23\\.999{margin:23.999px;}.m239\\.82{margin:239.82px;}.m24{margin:24px;}.my{margin-top:4px;margin-bottom:4px;}.mb{margin-bottom:4px;}.ml{margin-left:4px;}.ml-12{margin-left:12px;}.ml-2{margin-left:2px;}.mr,.mr-4{margin-right:4px;}.mr-5{margin-right:5px;}.ms{margin-inline-start:4px;}.mt{margin-top:4px;}.mt--2{margin-top:-2px;}.mt-8{margin-top:8px;}.m-inline-4{margin-inline-start:4px;margin-inline-end:4px;}.m-inline-5{margin-inline-start:5px;margin-inline-end:5px;}.block{display:block;}.inline-block{display:inline-block;}.hidden{display:none;}.w-114px{width:114px;}.flex{display:flex;}.inline-flex{display:inline-flex;}.flex-1{flex:1 1 0%;}.flex-shrink{flex-shrink:1;}.flex-grow{flex-grow:1;}.flex-wrap{flex-wrap:wrap;}.transform{transform:translateX(var(--un-translate-x)) translateY(var(--un-translate-y)) translateZ(var(--un-translate-z)) rotate(var(--un-rotate)) rotateX(var(--un-rotate-x)) rotateY(var(--un-rotate-y)) rotateZ(var(--un-rotate-z)) skewX(var(--un-skew-x)) skewY(var(--un-skew-y)) scaleX(var(--un-scale-x)) scaleY(var(--un-scale-y)) scaleZ(var(--un-scale-z));}.items-center{align-items:center;}.justify-start{justify-content:flex-start;}.justify-center{justify-content:center;}.gap-0{gap:0;}.b,.border{border-width:1px;}.px{padding-left:4px;padding-right:4px;}.ps{padding-inline-start:4px;}.tab{-moz-tab-size:4;-o-tab-size:4;tab-size:4;}.outline{outline-style:solid;}.filter{filter:var(--un-blur) var(--un-brightness) var(--un-contrast) var(--un-drop-shadow) var(--un-grayscale) var(--un-hue-rotate) var(--un-invert) var(--un-saturate) var(--un-sepia);}.backdrop-filter{-webkit-backdrop-filter:var(--un-backdrop-blur) var(--un-backdrop-brightness) var(--un-backdrop-contrast) var(--un-backdrop-grayscale) var(--un-backdrop-hue-rotate) var(--un-backdrop-invert) var(--un-backdrop-opacity) var(--un-backdrop-saturate) var(--un-backdrop-sepia);backdrop-filter:var(--un-backdrop-blur) var(--un-backdrop-brightness) var(--un-backdrop-contrast) var(--un-backdrop-grayscale) var(--un-backdrop-hue-rotate) var(--un-backdrop-invert) var(--un-backdrop-opacity) var(--un-backdrop-saturate) var(--un-backdrop-sepia);}.transition{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;}.ease,.ease-in-out{transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);}.ease-out{transition-timing-function:cubic-bezier(0, 0, 0.2, 1);}.size-15{width:15px;height:15px;}.size-25{width:25px;height:25px;}.size-26{width:26px;height:26px;} `);

(async function (dayjs, duration, React__default, UAParser, lodash, axios, antd, cssinjs, zhCN, require$$0, localforage, framerMotion, debounce, throttle$1) {
  'use strict';

  function _interopNamespaceDefault(e) {
    const n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
    if (e) {
      for (const k in e) {
        if (k !== 'default') {
          const d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: () => e[k]
          });
        }
      }
    }
    n.default = e;
    return Object.freeze(n);
  }

  const React__default__namespace = /*#__PURE__*/_interopNamespaceDefault(React__default);

  var __defProp = Object.defineProperty;
  var __typeError = (msg) => {
    throw TypeError(msg);
  };
  var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
  var __publicField = (obj, key2, value) => __defNormalProp(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value);
  var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
  var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
  var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), member.set(obj, value), value);
  var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
  var __privateWrapper = (obj, member, setter, getter) => ({
    set _(value) {
      __privateSet(obj, member, value);
    },
    get _() {
      return __privateGet(obj, member, getter);
    }
  });
  var _a, _b, _c, _d, _size, _cache, _oldCache, _maxSize, _maxAge, _onEviction, _QuickLRU_instances, emitEvictions_fn, deleteIfExpired_fn, getOrDeleteIfExpired_fn, getItemValue_fn, peek_fn, set_fn, moveToRecent_fn, entriesAscending_fn, _e;
  const settingsGroup = "_settings-group_1xm9d_1";
  const settingsGroupTitle = "_settings-group-title_1xm9d_4";
  const settingsGroupSubTitle = "_settings-group-sub-title_1xm9d_9";
  const settingsGroupContent = "_settings-group-content_1xm9d_15";
  const row = "_row_1xm9d_22";
  const tabPane = "_tab-pane_1xm9d_28";
  const styles$1 = {
    settingsGroup,
    settingsGroupTitle,
    settingsGroupSubTitle,
    settingsGroupContent,
    row,
    tabPane
  };
  const biliVideoCard = "_bili-video-card_77vjq_1";
  const previewCardWrapper = "_preview-card-wrapper_77vjq_8";
  const dislikedWrapper = "_disliked-wrapper_77vjq_12";
  const dislikeContentCover = "_dislike-content-cover_77vjq_23";
  const dislikeContentCoverInner = "_dislike-content-cover-inner_77vjq_29";
  const dislikeIcon$1 = "_dislike-icon_77vjq_41";
  const dislikeReason = "_dislike-reason_77vjq_44";
  const dislikeDesc = "_dislike-desc_77vjq_48";
  const dislikeContentAction = "_dislike-content-action_77vjq_52";
  const dislikeContentActionInner = "_dislike-content-action-inner_77vjq_56";
  const skeletonActive = "_skeleton-active_77vjq_92";
  const antSkeletonLoading = "_ant-skeleton-loading_77vjq_1";
  const styles = {
    biliVideoCard,
    previewCardWrapper,
    dislikedWrapper,
    dislikeContentCover,
    dislikeContentCoverInner,
    dislikeIcon: dislikeIcon$1,
    dislikeReason,
    dislikeDesc,
    dislikeContentAction,
    dislikeContentActionInner,
    skeletonActive,
    antSkeletonLoading
  };
  const videoGrid = "_video-grid_h0qxn_7";
  const newCardStyle = "_new-card-style_h0qxn_16";
  const videoGridBiliFeed4 = "_video-grid-bili-feed4_h0qxn_24";
  const limitTwoLines = "_limit-two-lines_h0qxn_42";
  const videoGridContainer = "_video-grid-container_h0qxn_60";
  const videoGridCustom = "_video-grid-custom_h0qxn_71";
  const narrowMode = "_narrow-mode_h0qxn_121";
  function getDefaultExportFromCjs(x2) {
    return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
  }
  var browser = { exports: {} };
  var ms$2;
  var hasRequiredMs;
  function requireMs() {
    if (hasRequiredMs) return ms$2;
    hasRequiredMs = 1;
    var s2 = 1e3;
    var m2 = s2 * 60;
    var h2 = m2 * 60;
    var d2 = h2 * 24;
    var w2 = d2 * 7;
    var y2 = d2 * 365.25;
    ms$2 = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse2(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong2(val) : fmtShort2(val);
      }
      throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
    };
    function parse2(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match2 = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
      if (!match2) {
        return;
      }
      var n2 = parseFloat(match2[1]);
      var type = (match2[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n2 * y2;
        case "weeks":
        case "week":
        case "w":
          return n2 * w2;
        case "days":
        case "day":
        case "d":
          return n2 * d2;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n2 * h2;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n2 * m2;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n2 * s2;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n2;
        default:
          return void 0;
      }
    }
    function fmtShort2(ms2) {
      var msAbs = Math.abs(ms2);
      if (msAbs >= d2) {
        return Math.round(ms2 / d2) + "d";
      }
      if (msAbs >= h2) {
        return Math.round(ms2 / h2) + "h";
      }
      if (msAbs >= m2) {
        return Math.round(ms2 / m2) + "m";
      }
      if (msAbs >= s2) {
        return Math.round(ms2 / s2) + "s";
      }
      return ms2 + "ms";
    }
    function fmtLong2(ms2) {
      var msAbs = Math.abs(ms2);
      if (msAbs >= d2) {
        return plural2(ms2, msAbs, d2, "day");
      }
      if (msAbs >= h2) {
        return plural2(ms2, msAbs, h2, "hour");
      }
      if (msAbs >= m2) {
        return plural2(ms2, msAbs, m2, "minute");
      }
      if (msAbs >= s2) {
        return plural2(ms2, msAbs, s2, "second");
      }
      return ms2 + " ms";
    }
    function plural2(ms2, msAbs, n2, name) {
      var isPlural = msAbs >= n2 * 1.5;
      return Math.round(ms2 / n2) + " " + name + (isPlural ? "s" : "");
    }
    return ms$2;
  }
  function setup(env) {
    createDebug.debug = createDebug;
    createDebug.default = createDebug;
    createDebug.coerce = coerce;
    createDebug.disable = disable;
    createDebug.enable = enable;
    createDebug.enabled = enabled;
    createDebug.humanize = requireMs();
    createDebug.destroy = destroy;
    Object.keys(env).forEach((key2) => {
      createDebug[key2] = env[key2];
    });
    createDebug.names = [];
    createDebug.skips = [];
    createDebug.formatters = {};
    function selectColor(namespace) {
      let hash2 = 0;
      for (let i = 0; i < namespace.length; i++) {
        hash2 = (hash2 << 5) - hash2 + namespace.charCodeAt(i);
        hash2 |= 0;
      }
      return createDebug.colors[Math.abs(hash2) % createDebug.colors.length];
    }
    createDebug.selectColor = selectColor;
    function createDebug(namespace) {
      let prevTime;
      let enableOverride = null;
      let namespacesCache;
      let enabledCache;
      function debug2(...args) {
        if (!debug2.enabled) {
          return;
        }
        const self = debug2;
        const curr = Number(/* @__PURE__ */ new Date());
        const ms2 = curr - (prevTime || curr);
        self.diff = ms2;
        self.prev = prevTime;
        self.curr = curr;
        prevTime = curr;
        args[0] = createDebug.coerce(args[0]);
        if (typeof args[0] !== "string") {
          args.unshift("%O");
        }
        let index = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, (match2, format) => {
          if (match2 === "%%") {
            return "%";
          }
          index++;
          const formatter = createDebug.formatters[format];
          if (typeof formatter === "function") {
            const val = args[index];
            match2 = formatter.call(self, val);
            args.splice(index, 1);
            index--;
          }
          return match2;
        });
        createDebug.formatArgs.call(self, args);
        const logFn = self.log || createDebug.log;
        logFn.apply(self, args);
      }
      debug2.namespace = namespace;
      debug2.useColors = createDebug.useColors();
      debug2.color = createDebug.selectColor(namespace);
      debug2.extend = extend2;
      debug2.destroy = createDebug.destroy;
      Object.defineProperty(debug2, "enabled", {
        enumerable: true,
        configurable: false,
        get: () => {
          if (enableOverride !== null) {
            return enableOverride;
          }
          if (namespacesCache !== createDebug.namespaces) {
            namespacesCache = createDebug.namespaces;
            enabledCache = createDebug.enabled(namespace);
          }
          return enabledCache;
        },
        set: (v2) => {
          enableOverride = v2;
        }
      });
      if (typeof createDebug.init === "function") {
        createDebug.init(debug2);
      }
      return debug2;
    }
    function extend2(namespace, delimiter2) {
      const newDebug = createDebug(this.namespace + (typeof delimiter2 === "undefined" ? ":" : delimiter2) + namespace);
      newDebug.log = this.log;
      return newDebug;
    }
    function enable(namespaces) {
      createDebug.save(namespaces);
      createDebug.namespaces = namespaces;
      createDebug.names = [];
      createDebug.skips = [];
      let i;
      const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
      const len = split.length;
      for (i = 0; i < len; i++) {
        if (!split[i]) {
          continue;
        }
        namespaces = split[i].replace(/\*/g, ".*?");
        if (namespaces[0] === "-") {
          createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$"));
        } else {
          createDebug.names.push(new RegExp("^" + namespaces + "$"));
        }
      }
    }
    function disable() {
      const namespaces = [...createDebug.names.map(toNamespace), ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)].join(",");
      createDebug.enable("");
      return namespaces;
    }
    function enabled(name) {
      if (name[name.length - 1] === "*") {
        return true;
      }
      let i;
      let len;
      for (i = 0, len = createDebug.skips.length; i < len; i++) {
        if (createDebug.skips[i].test(name)) {
          return false;
        }
      }
      for (i = 0, len = createDebug.names.length; i < len; i++) {
        if (createDebug.names[i].test(name)) {
          return true;
        }
      }
      return false;
    }
    function toNamespace(regexp) {
      return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
    }
    function coerce(val) {
      if (val instanceof Error) {
        return val.stack || val.message;
      }
      return val;
    }
    function destroy() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    createDebug.enable(createDebug.load());
    return createDebug;
  }
  var common = setup;
  (function(module, exports) {
    var define_process_env_default = {};
    exports.formatArgs = formatArgs;
    exports.save = save2;
    exports.load = load2;
    exports.useColors = useColors2;
    exports.storage = localstorage();
    exports.destroy = /* @__PURE__ */ (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"];
    function useColors2() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      let m2;
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && (m2 = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m2[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c2 = "color: " + this.color;
      args.splice(1, 0, c2, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match2) => {
        if (match2 === "%%") {
          return;
        }
        index++;
        if (match2 === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c2);
    }
    exports.log = console.debug || console.log || (() => {
    });
    function save2(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load2() {
      let r2;
      try {
        r2 = exports.storage.getItem("debug");
      } catch (error) {
      }
      if (!r2 && typeof process !== "undefined" && "env" in process) {
        r2 = define_process_env_default.DEBUG;
      }
      return r2;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module.exports = common(exports);
    const {
      formatters
    } = module.exports;
    formatters.j = function(v2) {
      try {
        return JSON.stringify(v2);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  })(browser, browser.exports);
  var browserExports = browser.exports;
  const debugFactory = /* @__PURE__ */ getDefaultExportFromCjs(browserExports);
  const APP_NAME = "bilibili-app-recommend";
  const APP_KEY_PREFIX = "bilibili_app_recommend";
  const baseDebug = debugFactory(APP_NAME);
  const HOST_API = "https://api.bilibili.com";
  const HOST_APP = "https://app.bilibili.com";
  const TVKeyInfo = {
    appkey: "4409e2ce8ffd12b8",
    appsec: "59b43e04ad6965f34319062b478f83dd"
  };
  const APP_CLS_ROOT = `${APP_NAME}-root`;
  const APP_CLS_GRID = `${APP_NAME}-video-grid`;
  const APP_CLS_CARD = `${APP_NAME}-video-card`;
  const APP_CLS_CARD_ACTIVE = `${APP_NAME}-video-card-active`;
  const REQUEST_FAIL_MSG = "请求失败, 请重试 !!!";
  const OPERATION_FAIL_MSG = "操作失败, 请重试 !!!";
  const hostname = location.hostname;
  const pathname = location.pathname || "";
  const IN_BILIBILI = hostname.endsWith("bilibili.com");
  const IN_BILIBILI_HOMEPAGE = IN_BILIBILI && (pathname === "/" || pathname === "/index.html");
  const IN_BILIBILI_VIDEO_PLAY_PAGE = IN_BILIBILI && (pathname.startsWith("/video/") || pathname.startsWith("/list/watchlater") || pathname.startsWith("/bangumi/play/"));
  const IN_BILIBILI_SPACE_PAGE = hostname === "space.bilibili.com";
  var ETab = /* @__PURE__ */ ((ETab2) => {
    ETab2["RecommendApp"] = "recommend-app";
    ETab2["RecommendPc"] = "recommend-pc";
    ETab2["KeepFollowOnly"] = "keep-follow-only";
    ETab2["DynamicFeed"] = "dynamic-feed";
    ETab2["Watchlater"] = "watchlater";
    ETab2["Fav"] = "fav";
    ETab2["Hot"] = "hot";
    ETab2["Live"] = "live";
    return ETab2;
  })(ETab || {});
  var EHotSubTab = /* @__PURE__ */ ((EHotSubTab2) => {
    EHotSubTab2["PopularGeneral"] = "popular-general";
    EHotSubTab2["PopularWeekly"] = "popular-weekly";
    EHotSubTab2["Ranking"] = "ranking";
    return EHotSubTab2;
  })(EHotSubTab || {});
  const TabKeys = Object.values(ETab);
  var jsxRuntime = { exports: {} };
  var reactJsxRuntime_production_min = {};
  /**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var f$1 = React__default, k$1 = Symbol.for("react.element"), l$1 = Symbol.for("react.fragment"), m$3 = Object.prototype.hasOwnProperty, n$1 = f$1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p$1 = {
    key: true,
    ref: true,
    __self: true,
    __source: true
  };
  function q$1(c2, a, g2) {
    var b2, d2 = {}, e2 = null, h2 = null;
    void 0 !== g2 && (e2 = "" + g2);
    void 0 !== a.key && (e2 = "" + a.key);
    void 0 !== a.ref && (h2 = a.ref);
    for (b2 in a) m$3.call(a, b2) && !p$1.hasOwnProperty(b2) && (d2[b2] = a[b2]);
    if (c2 && c2.defaultProps) for (b2 in a = c2.defaultProps, a) void 0 === d2[b2] && (d2[b2] = a[b2]);
    return {
      $$typeof: k$1,
      type: c2,
      key: e2,
      ref: h2,
      props: d2,
      _owner: n$1.current
    };
  }
  reactJsxRuntime_production_min.Fragment = l$1;
  reactJsxRuntime_production_min.jsx = q$1;
  reactJsxRuntime_production_min.jsxs = q$1;
  {
    jsxRuntime.exports = reactJsxRuntime_production_min;
  }
  var jsxRuntimeExports = jsxRuntime.exports;
  var isDevelopment$3 = false;
  function sheetForTag(tag) {
    if (tag.sheet) {
      return tag.sheet;
    }
    for (var i = 0; i < document.styleSheets.length; i++) {
      if (document.styleSheets[i].ownerNode === tag) {
        return document.styleSheets[i];
      }
    }
    return void 0;
  }
  function createStyleElement(options) {
    var tag = document.createElement("style");
    tag.setAttribute("data-emotion", options.key);
    if (options.nonce !== void 0) {
      tag.setAttribute("nonce", options.nonce);
    }
    tag.appendChild(document.createTextNode(""));
    tag.setAttribute("data-s", "");
    return tag;
  }
  var StyleSheet = /* @__PURE__ */ function() {
    function StyleSheet2(options) {
      var _this = this;
      this._insertTag = function(tag) {
        var before;
        if (_this.tags.length === 0) {
          if (_this.insertionPoint) {
            before = _this.insertionPoint.nextSibling;
          } else if (_this.prepend) {
            before = _this.container.firstChild;
          } else {
            before = _this.before;
          }
        } else {
          before = _this.tags[_this.tags.length - 1].nextSibling;
        }
        _this.container.insertBefore(tag, before);
        _this.tags.push(tag);
      };
      this.isSpeedy = options.speedy === void 0 ? !isDevelopment$3 : options.speedy;
      this.tags = [];
      this.ctr = 0;
      this.nonce = options.nonce;
      this.key = options.key;
      this.container = options.container;
      this.prepend = options.prepend;
      this.insertionPoint = options.insertionPoint;
      this.before = null;
    }
    var _proto = StyleSheet2.prototype;
    _proto.hydrate = function hydrate(nodes) {
      nodes.forEach(this._insertTag);
    };
    _proto.insert = function insert(rule) {
      if (this.ctr % (this.isSpeedy ? 65e3 : 1) === 0) {
        this._insertTag(createStyleElement(this));
      }
      var tag = this.tags[this.tags.length - 1];
      if (this.isSpeedy) {
        var sheet = sheetForTag(tag);
        try {
          sheet.insertRule(rule, sheet.cssRules.length);
        } catch (e2) {
        }
      } else {
        tag.appendChild(document.createTextNode(rule));
      }
      this.ctr++;
    };
    _proto.flush = function flush() {
      this.tags.forEach(function(tag) {
        var _tag$parentNode;
        return (_tag$parentNode = tag.parentNode) == null ? void 0 : _tag$parentNode.removeChild(tag);
      });
      this.tags = [];
      this.ctr = 0;
    };
    return StyleSheet2;
  }();
  var MS = "-ms-";
  var MOZ = "-moz-";
  var WEBKIT = "-webkit-";
  var COMMENT = "comm";
  var RULESET = "rule";
  var DECLARATION = "decl";
  var IMPORT = "@import";
  var KEYFRAMES = "@keyframes";
  var LAYER = "@layer";
  var abs = Math.abs;
  var from = String.fromCharCode;
  var assign = Object.assign;
  function hash(value, length2) {
    return charat(value, 0) ^ 45 ? (((length2 << 2 ^ charat(value, 0)) << 2 ^ charat(value, 1)) << 2 ^ charat(value, 2)) << 2 ^ charat(value, 3) : 0;
  }
  function trim$1(value) {
    return value.trim();
  }
  function match(value, pattern) {
    return (value = pattern.exec(value)) ? value[0] : value;
  }
  function replace(value, pattern, replacement) {
    return value.replace(pattern, replacement);
  }
  function indexof(value, search) {
    return value.indexOf(search);
  }
  function charat(value, index) {
    return value.charCodeAt(index) | 0;
  }
  function substr(value, begin, end) {
    return value.slice(begin, end);
  }
  function strlen(value) {
    return value.length;
  }
  function sizeof(value) {
    return value.length;
  }
  function append(value, array) {
    return array.push(value), value;
  }
  function combine(array, callback) {
    return array.map(callback).join("");
  }
  var line = 1;
  var column = 1;
  var length = 0;
  var position = 0;
  var character = 0;
  var characters = "";
  function node(value, root2, parent, type, props, children, length2) {
    return {
      value,
      root: root2,
      parent,
      type,
      props,
      children,
      line,
      column,
      length: length2,
      return: ""
    };
  }
  function copy(root2, props) {
    return assign(node("", null, null, "", null, null, 0), root2, {
      length: -root2.length
    }, props);
  }
  function char() {
    return character;
  }
  function prev() {
    character = position > 0 ? charat(characters, --position) : 0;
    if (column--, character === 10) column = 1, line--;
    return character;
  }
  function next() {
    character = position < length ? charat(characters, position++) : 0;
    if (column++, character === 10) column = 1, line++;
    return character;
  }
  function peek() {
    return charat(characters, position);
  }
  function caret() {
    return position;
  }
  function slice(begin, end) {
    return substr(characters, begin, end);
  }
  function token(type) {
    switch (type) {
      case 0:
      case 9:
      case 10:
      case 13:
      case 32:
        return 5;
      case 33:
      case 43:
      case 44:
      case 47:
      case 62:
      case 64:
      case 126:
      case 59:
      case 123:
      case 125:
        return 4;
      case 58:
        return 3;
      case 34:
      case 39:
      case 40:
      case 91:
        return 2;
      case 41:
      case 93:
        return 1;
    }
    return 0;
  }
  function alloc(value) {
    return line = column = 1, length = strlen(characters = value), position = 0, [];
  }
  function dealloc(value) {
    return characters = "", value;
  }
  function delimit(type) {
    return trim$1(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
  }
  function whitespace(type) {
    while (character = peek()) if (character < 33) next();
    else break;
    return token(type) > 2 || token(character) > 3 ? "" : " ";
  }
  function escaping(index, count) {
    while (--count && next())
      if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97) break;
    return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32));
  }
  function delimiter(type) {
    while (next()) switch (character) {
      case type:
        return position;
      case 34:
      case 39:
        if (type !== 34 && type !== 39) delimiter(character);
        break;
      case 40:
        if (type === 41) delimiter(type);
        break;
      case 92:
        next();
        break;
    }
    return position;
  }
  function commenter(type, index) {
    while (next())
      if (type + character === 47 + 10) break;
      else if (type + character === 42 + 42 && peek() === 47) break;
    return "/*" + slice(index, position - 1) + "*" + from(type === 47 ? type : next());
  }
  function identifier(index) {
    while (!token(peek())) next();
    return slice(index, position);
  }
  function compile(value) {
    return dealloc(parse$1("", null, null, null, [""], value = alloc(value), 0, [0], value));
  }
  function parse$1(value, root2, parent, rule, rules, rulesets, pseudo, points, declarations) {
    var index = 0;
    var offset = 0;
    var length2 = pseudo;
    var atrule = 0;
    var property = 0;
    var previous = 0;
    var variable = 1;
    var scanning = 1;
    var ampersand = 1;
    var character2 = 0;
    var type = "";
    var props = rules;
    var children = rulesets;
    var reference = rule;
    var characters2 = type;
    while (scanning) switch (previous = character2, character2 = next()) {
      case 40:
        if (previous != 108 && charat(characters2, length2 - 1) == 58) {
          if (indexof(characters2 += replace(delimit(character2), "&", "&\f"), "&\f") != -1) ampersand = -1;
          break;
        }
      case 34:
      case 39:
      case 91:
        characters2 += delimit(character2);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        characters2 += whitespace(previous);
        break;
      case 92:
        characters2 += escaping(caret() - 1, 7);
        continue;
      case 47:
        switch (peek()) {
          case 42:
          case 47:
            append(comment(commenter(next(), caret()), root2, parent), declarations);
            break;
          default:
            characters2 += "/";
        }
        break;
      case 123 * variable:
        points[index++] = strlen(characters2) * ampersand;
      case 125 * variable:
      case 59:
      case 0:
        switch (character2) {
          case 0:
          case 125:
            scanning = 0;
          case 59 + offset:
            if (ampersand == -1) characters2 = replace(characters2, /\f/g, "");
            if (property > 0 && strlen(characters2) - length2) append(property > 32 ? declaration(characters2 + ";", rule, parent, length2 - 1) : declaration(replace(characters2, " ", "") + ";", rule, parent, length2 - 2), declarations);
            break;
          case 59:
            characters2 += ";";
          default:
            append(reference = ruleset(characters2, root2, parent, index, offset, rules, points, type, props = [], children = [], length2), rulesets);
            if (character2 === 123) if (offset === 0) parse$1(characters2, root2, reference, reference, props, rulesets, length2, points, children);
            else switch (atrule === 99 && charat(characters2, 3) === 110 ? 100 : atrule) {
              case 100:
              case 108:
              case 109:
              case 115:
                parse$1(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length2), children), rules, children, length2, points, rule ? props : children);
                break;
              default:
                parse$1(characters2, reference, reference, reference, [""], children, 0, points, children);
            }
        }
        index = offset = property = 0, variable = ampersand = 1, type = characters2 = "", length2 = pseudo;
        break;
      case 58:
        length2 = 1 + strlen(characters2), property = previous;
      default:
        if (variable < 1) {
          if (character2 == 123) --variable;
          else if (character2 == 125 && variable++ == 0 && prev() == 125) continue;
        }
        switch (characters2 += from(character2), character2 * variable) {
          case 38:
            ampersand = offset > 0 ? 1 : (characters2 += "\f", -1);
            break;
          case 44:
            points[index++] = (strlen(characters2) - 1) * ampersand, ampersand = 1;
            break;
          case 64:
            if (peek() === 45) characters2 += delimit(next());
            atrule = peek(), offset = length2 = strlen(type = characters2 += identifier(caret())), character2++;
            break;
          case 45:
            if (previous === 45 && strlen(characters2) == 2) variable = 0;
        }
    }
    return rulesets;
  }
  function ruleset(value, root2, parent, index, offset, rules, points, type, props, children, length2) {
    var post = offset - 1;
    var rule = offset === 0 ? rules : [""];
    var size2 = sizeof(rule);
    for (var i = 0, j = 0, k2 = 0; i < index; ++i) for (var x2 = 0, y2 = substr(value, post + 1, post = abs(j = points[i])), z2 = value; x2 < size2; ++x2) if (z2 = trim$1(j > 0 ? rule[x2] + " " + y2 : replace(y2, /&\f/g, rule[x2]))) props[k2++] = z2;
    return node(value, root2, parent, offset === 0 ? RULESET : type, props, children, length2);
  }
  function comment(value, root2, parent) {
    return node(value, root2, parent, COMMENT, from(char()), substr(value, 2, -2), 0);
  }
  function declaration(value, root2, parent, length2) {
    return node(value, root2, parent, DECLARATION, substr(value, 0, length2), substr(value, length2 + 1, -1), length2);
  }
  function serialize(children, callback) {
    var output = "";
    var length2 = sizeof(children);
    for (var i = 0; i < length2; i++) output += callback(children[i], i, children, callback) || "";
    return output;
  }
  function stringify(element, index, children, callback) {
    switch (element.type) {
      case LAYER:
        if (element.children.length) break;
      case IMPORT:
      case DECLARATION:
        return element.return = element.return || element.value;
      case COMMENT:
        return "";
      case KEYFRAMES:
        return element.return = element.value + "{" + serialize(element.children, callback) + "}";
      case RULESET:
        element.value = element.props.join(",");
    }
    return strlen(children = serialize(element.children, callback)) ? element.return = element.value + "{" + children + "}" : "";
  }
  function middleware(collection) {
    var length2 = sizeof(collection);
    return function(element, index, children, callback) {
      var output = "";
      for (var i = 0; i < length2; i++) output += collection[i](element, index, children, callback) || "";
      return output;
    };
  }
  function rulesheet(callback) {
    return function(element) {
      if (!element.root) {
        if (element = element.return) callback(element);
      }
    };
  }
  function memoize(fn) {
    var cache2 = /* @__PURE__ */ Object.create(null);
    return function(arg) {
      if (cache2[arg] === void 0) cache2[arg] = fn(arg);
      return cache2[arg];
    };
  }
  var identifierWithPointTracking = function identifierWithPointTracking2(begin, points, index) {
    var previous = 0;
    var character2 = 0;
    while (true) {
      previous = character2;
      character2 = peek();
      if (previous === 38 && character2 === 12) {
        points[index] = 1;
      }
      if (token(character2)) {
        break;
      }
      next();
    }
    return slice(begin, position);
  };
  var toRules = function toRules2(parsed2, points) {
    var index = -1;
    var character2 = 44;
    do {
      switch (token(character2)) {
        case 0:
          if (character2 === 38 && peek() === 12) {
            points[index] = 1;
          }
          parsed2[index] += identifierWithPointTracking(position - 1, points, index);
          break;
        case 2:
          parsed2[index] += delimit(character2);
          break;
        case 4:
          if (character2 === 44) {
            parsed2[++index] = peek() === 58 ? "&\f" : "";
            points[index] = parsed2[index].length;
            break;
          }
        default:
          parsed2[index] += from(character2);
      }
    } while (character2 = next());
    return parsed2;
  };
  var getRules = function getRules2(value, points) {
    return dealloc(toRules(alloc(value), points));
  };
  var fixedElements = /* @__PURE__ */ new WeakMap();
  var compat = function compat2(element) {
    if (element.type !== "rule" || !element.parent || // positive .length indicates that this rule contains pseudo
    // negative .length indicates that this rule has been already prefixed
    element.length < 1) {
      return;
    }
    var value = element.value, parent = element.parent;
    var isImplicitRule = element.column === parent.column && element.line === parent.line;
    while (parent.type !== "rule") {
      parent = parent.parent;
      if (!parent) return;
    }
    if (element.props.length === 1 && value.charCodeAt(0) !== 58 && !fixedElements.get(parent)) {
      return;
    }
    if (isImplicitRule) {
      return;
    }
    fixedElements.set(element, true);
    var points = [];
    var rules = getRules(value, points);
    var parentRules = parent.props;
    for (var i = 0, k2 = 0; i < rules.length; i++) {
      for (var j = 0; j < parentRules.length; j++, k2++) {
        element.props[k2] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
      }
    }
  };
  var removeLabel = function removeLabel2(element) {
    if (element.type === "decl") {
      var value = element.value;
      if (
        // charcode for l
        value.charCodeAt(0) === 108 && // charcode for b
        value.charCodeAt(2) === 98
      ) {
        element["return"] = "";
        element.value = "";
      }
    }
  };
  function prefix(value, length2) {
    switch (hash(value, length2)) {
      case 5103:
        return WEBKIT + "print-" + value + value;
      case 5737:
      case 4201:
      case 3177:
      case 3433:
      case 1641:
      case 4457:
      case 2921:
      case 5572:
      case 6356:
      case 5844:
      case 3191:
      case 6645:
      case 3005:
      case 6391:
      case 5879:
      case 5623:
      case 6135:
      case 4599:
      case 4855:
      case 4215:
      case 6389:
      case 5109:
      case 5365:
      case 5621:
      case 3829:
        return WEBKIT + value + value;
      case 5349:
      case 4246:
      case 4810:
      case 6968:
      case 2756:
        return WEBKIT + value + MOZ + value + MS + value + value;
      case 6828:
      case 4268:
        return WEBKIT + value + MS + value + value;
      case 6165:
        return WEBKIT + value + MS + "flex-" + value + value;
      case 5187:
        return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + "box-$1$2" + MS + "flex-$1$2") + value;
      case 5443:
        return WEBKIT + value + MS + "flex-item-" + replace(value, /flex-|-self/, "") + value;
      case 4675:
        return WEBKIT + value + MS + "flex-line-pack" + replace(value, /align-content|flex-|-self/, "") + value;
      case 5548:
        return WEBKIT + value + MS + replace(value, "shrink", "negative") + value;
      case 5292:
        return WEBKIT + value + MS + replace(value, "basis", "preferred-size") + value;
      case 6060:
        return WEBKIT + "box-" + replace(value, "-grow", "") + WEBKIT + value + MS + replace(value, "grow", "positive") + value;
      case 4554:
        return WEBKIT + replace(value, /([^-])(transform)/g, "$1" + WEBKIT + "$2") + value;
      case 6187:
        return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + "$1"), /(image-set)/, WEBKIT + "$1"), value, "") + value;
      case 5495:
      case 3959:
        return replace(value, /(image-set\([^]*)/, WEBKIT + "$1$`$1");
      case 4968:
        return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + "box-pack:$3" + MS + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + WEBKIT + value + value;
      case 4095:
      case 3583:
      case 4068:
      case 2532:
        return replace(value, /(.+)-inline(.+)/, WEBKIT + "$1$2") + value;
      case 8116:
      case 7059:
      case 5753:
      case 5535:
      case 5445:
      case 5701:
      case 4933:
      case 4677:
      case 5533:
      case 5789:
      case 5021:
      case 4765:
        if (strlen(value) - 1 - length2 > 6) switch (charat(value, length2 + 1)) {
          case 109:
            if (charat(value, length2 + 4) !== 45) break;
          case 102:
            return replace(value, /(.+:)(.+)-([^]+)/, "$1" + WEBKIT + "$2-$3$1" + MOZ + (charat(value, length2 + 3) == 108 ? "$3" : "$2-$3")) + value;
          case 115:
            return ~indexof(value, "stretch") ? prefix(replace(value, "stretch", "fill-available"), length2) + value : value;
        }
        break;
      case 4949:
        if (charat(value, length2 + 1) !== 115) break;
      case 6444:
        switch (charat(value, strlen(value) - 3 - (~indexof(value, "!important") && 10))) {
          case 107:
            return replace(value, ":", ":" + WEBKIT) + value;
          case 101:
            return replace(value, /(.+:)([^;!]+)(;|!.+)?/, "$1" + WEBKIT + (charat(value, 14) === 45 ? "inline-" : "") + "box$3$1" + WEBKIT + "$2$3$1" + MS + "$2box$3") + value;
        }
        break;
      case 5936:
        switch (charat(value, length2 + 11)) {
          case 114:
            return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb") + value;
          case 108:
            return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb-rl") + value;
          case 45:
            return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "lr") + value;
        }
        return WEBKIT + value + MS + value + value;
    }
    return value;
  }
  var prefixer = function prefixer2(element, index, children, callback) {
    if (element.length > -1) {
      if (!element["return"]) switch (element.type) {
        case DECLARATION:
          element["return"] = prefix(element.value, element.length);
          break;
        case KEYFRAMES:
          return serialize([copy(element, {
            value: replace(element.value, "@", "@" + WEBKIT)
          })], callback);
        case RULESET:
          if (element.length) return combine(element.props, function(value) {
            switch (match(value, /(::plac\w+|:read-\w+)/)) {
              case ":read-only":
              case ":read-write":
                return serialize([copy(element, {
                  props: [replace(value, /:(read-\w+)/, ":" + MOZ + "$1")]
                })], callback);
              case "::placeholder":
                return serialize([copy(element, {
                  props: [replace(value, /:(plac\w+)/, ":" + WEBKIT + "input-$1")]
                }), copy(element, {
                  props: [replace(value, /:(plac\w+)/, ":" + MOZ + "$1")]
                }), copy(element, {
                  props: [replace(value, /:(plac\w+)/, MS + "input-$1")]
                })], callback);
            }
            return "";
          });
      }
    }
  };
  var defaultStylisPlugins = [prefixer];
  var createCache = function createCache2(options) {
    var key2 = options.key;
    if (key2 === "css") {
      var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])");
      Array.prototype.forEach.call(ssrStyles, function(node2) {
        var dataEmotionAttribute = node2.getAttribute("data-emotion");
        if (dataEmotionAttribute.indexOf(" ") === -1) {
          return;
        }
        document.head.appendChild(node2);
        node2.setAttribute("data-s", "");
      });
    }
    var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;
    var inserted = {};
    var container;
    var nodesToHydrate = [];
    {
      container = options.container || document.head;
      Array.prototype.forEach.call(
        // this means we will ignore elements which don't have a space in them which
        // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
        document.querySelectorAll('style[data-emotion^="' + key2 + ' "]'),
        function(node2) {
          var attrib = node2.getAttribute("data-emotion").split(" ");
          for (var i = 1; i < attrib.length; i++) {
            inserted[attrib[i]] = true;
          }
          nodesToHydrate.push(node2);
        }
      );
    }
    var _insert;
    var omnipresentPlugins = [compat, removeLabel];
    {
      var currentSheet;
      var finalizingPlugins = [stringify, rulesheet(function(rule) {
        currentSheet.insert(rule);
      })];
      var serializer = middleware(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));
      var stylis = function stylis2(styles2) {
        return serialize(compile(styles2), serializer);
      };
      _insert = function insert(selector, serialized, sheet, shouldCache) {
        currentSheet = sheet;
        stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
        if (shouldCache) {
          cache2.inserted[serialized.name] = true;
        }
      };
    }
    var cache2 = {
      key: key2,
      sheet: new StyleSheet({
        key: key2,
        container,
        nonce: options.nonce,
        speedy: options.speedy,
        prepend: options.prepend,
        insertionPoint: options.insertionPoint
      }),
      nonce: options.nonce,
      inserted,
      registered: {},
      insert: _insert
    };
    cache2.sheet.hydrate(nodesToHydrate);
    return cache2;
  };
  var reactIs$1 = { exports: {} };
  var reactIs_production_min = {};
  /** @license React v16.13.1
   * react-is.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var b = "function" === typeof Symbol && Symbol.for, c = b ? Symbol.for("react.element") : 60103, d$2 = b ? Symbol.for("react.portal") : 60106, e = b ? Symbol.for("react.fragment") : 60107, f = b ? Symbol.for("react.strict_mode") : 60108, g = b ? Symbol.for("react.profiler") : 60114, h$1 = b ? Symbol.for("react.provider") : 60109, k = b ? Symbol.for("react.context") : 60110, l = b ? Symbol.for("react.async_mode") : 60111, m$2 = b ? Symbol.for("react.concurrent_mode") : 60111, n = b ? Symbol.for("react.forward_ref") : 60112, p = b ? Symbol.for("react.suspense") : 60113, q = b ? Symbol.for("react.suspense_list") : 60120, r$1 = b ? Symbol.for("react.memo") : 60115, t = b ? Symbol.for("react.lazy") : 60116, v = b ? Symbol.for("react.block") : 60121, w$1 = b ? Symbol.for("react.fundamental") : 60117, x = b ? Symbol.for("react.responder") : 60118, y$1 = b ? Symbol.for("react.scope") : 60119;
  function z(a) {
    if ("object" === typeof a && null !== a) {
      var u = a.$$typeof;
      switch (u) {
        case c:
          switch (a = a.type, a) {
            case l:
            case m$2:
            case e:
            case g:
            case f:
            case p:
              return a;
            default:
              switch (a = a && a.$$typeof, a) {
                case k:
                case n:
                case t:
                case r$1:
                case h$1:
                  return a;
                default:
                  return u;
              }
          }
        case d$2:
          return u;
      }
    }
  }
  function A(a) {
    return z(a) === m$2;
  }
  reactIs_production_min.AsyncMode = l;
  reactIs_production_min.ConcurrentMode = m$2;
  reactIs_production_min.ContextConsumer = k;
  reactIs_production_min.ContextProvider = h$1;
  reactIs_production_min.Element = c;
  reactIs_production_min.ForwardRef = n;
  reactIs_production_min.Fragment = e;
  reactIs_production_min.Lazy = t;
  reactIs_production_min.Memo = r$1;
  reactIs_production_min.Portal = d$2;
  reactIs_production_min.Profiler = g;
  reactIs_production_min.StrictMode = f;
  reactIs_production_min.Suspense = p;
  reactIs_production_min.isAsyncMode = function(a) {
    return A(a) || z(a) === l;
  };
  reactIs_production_min.isConcurrentMode = A;
  reactIs_production_min.isContextConsumer = function(a) {
    return z(a) === k;
  };
  reactIs_production_min.isContextProvider = function(a) {
    return z(a) === h$1;
  };
  reactIs_production_min.isElement = function(a) {
    return "object" === typeof a && null !== a && a.$$typeof === c;
  };
  reactIs_production_min.isForwardRef = function(a) {
    return z(a) === n;
  };
  reactIs_production_min.isFragment = function(a) {
    return z(a) === e;
  };
  reactIs_production_min.isLazy = function(a) {
    return z(a) === t;
  };
  reactIs_production_min.isMemo = function(a) {
    return z(a) === r$1;
  };
  reactIs_production_min.isPortal = function(a) {
    return z(a) === d$2;
  };
  reactIs_production_min.isProfiler = function(a) {
    return z(a) === g;
  };
  reactIs_production_min.isStrictMode = function(a) {
    return z(a) === f;
  };
  reactIs_production_min.isSuspense = function(a) {
    return z(a) === p;
  };
  reactIs_production_min.isValidElementType = function(a) {
    return "string" === typeof a || "function" === typeof a || a === e || a === m$2 || a === g || a === f || a === p || a === q || "object" === typeof a && null !== a && (a.$$typeof === t || a.$$typeof === r$1 || a.$$typeof === h$1 || a.$$typeof === k || a.$$typeof === n || a.$$typeof === w$1 || a.$$typeof === x || a.$$typeof === y$1 || a.$$typeof === v);
  };
  reactIs_production_min.typeOf = z;
  {
    reactIs$1.exports = reactIs_production_min;
  }
  var reactIsExports = reactIs$1.exports;
  var reactIs = reactIsExports;
  var FORWARD_REF_STATICS = {
    "$$typeof": true,
    render: true,
    defaultProps: true,
    displayName: true,
    propTypes: true
  };
  var MEMO_STATICS = {
    "$$typeof": true,
    compare: true,
    defaultProps: true,
    displayName: true,
    propTypes: true,
    type: true
  };
  var TYPE_STATICS = {};
  TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
  TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;
  var isBrowser$1 = true;
  function getRegisteredStyles(registered, registeredStyles, classNames) {
    var rawClassName = "";
    classNames.split(" ").forEach(function(className) {
      if (registered[className] !== void 0) {
        registeredStyles.push(registered[className] + ";");
      } else {
        rawClassName += className + " ";
      }
    });
    return rawClassName;
  }
  var registerStyles = function registerStyles2(cache2, serialized, isStringTag) {
    var className = cache2.key + "-" + serialized.name;
    if (
      // we only need to add the styles to the registered cache if the
      // class name could be used further down
      // the tree but if it's a string tag, we know it won't
      // so we don't have to add it to registered cache.
      // this improves memory usage since we can avoid storing the whole style string
      (isStringTag === false || // we need to always store it if we're in compat mode and
      // in node since emotion-server relies on whether a style is in
      // the registered cache to know whether a style is global or not
      // also, note that this check will be dead code eliminated in the browser
      isBrowser$1 === false) && cache2.registered[className] === void 0
    ) {
      cache2.registered[className] = serialized.styles;
    }
  };
  var insertStyles = function insertStyles2(cache2, serialized, isStringTag) {
    registerStyles(cache2, serialized, isStringTag);
    var className = cache2.key + "-" + serialized.name;
    if (cache2.inserted[serialized.name] === void 0) {
      var current = serialized;
      do {
        cache2.insert(serialized === current ? "." + className : "", current, cache2.sheet, true);
        current = current.next;
      } while (current !== void 0);
    }
  };
  function murmur2(str) {
    var h2 = 0;
    var k2, i = 0, len = str.length;
    for (; len >= 4; ++i, len -= 4) {
      k2 = str.charCodeAt(i) & 255 | (str.charCodeAt(++i) & 255) << 8 | (str.charCodeAt(++i) & 255) << 16 | (str.charCodeAt(++i) & 255) << 24;
      k2 = /* Math.imul(k, m): */
      (k2 & 65535) * 1540483477 + ((k2 >>> 16) * 59797 << 16);
      k2 ^= /* k >>> r: */
      k2 >>> 24;
      h2 = /* Math.imul(k, m): */
      (k2 & 65535) * 1540483477 + ((k2 >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
      (h2 & 65535) * 1540483477 + ((h2 >>> 16) * 59797 << 16);
    }
    switch (len) {
      case 3:
        h2 ^= (str.charCodeAt(i + 2) & 255) << 16;
      case 2:
        h2 ^= (str.charCodeAt(i + 1) & 255) << 8;
      case 1:
        h2 ^= str.charCodeAt(i) & 255;
        h2 = /* Math.imul(h, m): */
        (h2 & 65535) * 1540483477 + ((h2 >>> 16) * 59797 << 16);
    }
    h2 ^= h2 >>> 13;
    h2 = /* Math.imul(h, m): */
    (h2 & 65535) * 1540483477 + ((h2 >>> 16) * 59797 << 16);
    return ((h2 ^ h2 >>> 15) >>> 0).toString(36);
  }
  var unitlessKeys$1 = {
    animationIterationCount: 1,
    aspectRatio: 1,
    borderImageOutset: 1,
    borderImageSlice: 1,
    borderImageWidth: 1,
    boxFlex: 1,
    boxFlexGroup: 1,
    boxOrdinalGroup: 1,
    columnCount: 1,
    columns: 1,
    flex: 1,
    flexGrow: 1,
    flexPositive: 1,
    flexShrink: 1,
    flexNegative: 1,
    flexOrder: 1,
    gridRow: 1,
    gridRowEnd: 1,
    gridRowSpan: 1,
    gridRowStart: 1,
    gridColumn: 1,
    gridColumnEnd: 1,
    gridColumnSpan: 1,
    gridColumnStart: 1,
    msGridRow: 1,
    msGridRowSpan: 1,
    msGridColumn: 1,
    msGridColumnSpan: 1,
    fontWeight: 1,
    lineHeight: 1,
    opacity: 1,
    order: 1,
    orphans: 1,
    scale: 1,
    tabSize: 1,
    widows: 1,
    zIndex: 1,
    zoom: 1,
    WebkitLineClamp: 1,
    // SVG-related properties
    fillOpacity: 1,
    floodOpacity: 1,
    stopOpacity: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1,
    strokeMiterlimit: 1,
    strokeOpacity: 1,
    strokeWidth: 1
  };
  var isDevelopment$2 = false;
  var hyphenateRegex$1 = /[A-Z]|^ms/g;
  var animationRegex$1 = /_EMO_([^_]+?)_([^]*?)_EMO_/g;
  var isCustomProperty$1 = function isCustomProperty(property) {
    return property.charCodeAt(1) === 45;
  };
  var isProcessableValue$1 = function isProcessableValue(value) {
    return value != null && typeof value !== "boolean";
  };
  var processStyleName$1 = /* @__PURE__ */ memoize(function(styleName) {
    return isCustomProperty$1(styleName) ? styleName : styleName.replace(hyphenateRegex$1, "-$&").toLowerCase();
  });
  var processStyleValue$1 = function processStyleValue(key2, value) {
    switch (key2) {
      case "animation":
      case "animationName": {
        if (typeof value === "string") {
          return value.replace(animationRegex$1, function(match2, p1, p2) {
            cursor$1 = {
              name: p1,
              styles: p2,
              next: cursor$1
            };
            return p1;
          });
        }
      }
    }
    if (unitlessKeys$1[key2] !== 1 && !isCustomProperty$1(key2) && typeof value === "number" && value !== 0) {
      return value + "px";
    }
    return value;
  };
  var noComponentSelectorMessage$1 = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
  function handleInterpolation$1(mergedProps, registered, interpolation) {
    if (interpolation == null) {
      return "";
    }
    var componentSelector = interpolation;
    if (componentSelector.__emotion_styles !== void 0) {
      return componentSelector;
    }
    switch (typeof interpolation) {
      case "boolean": {
        return "";
      }
      case "object": {
        var keyframes = interpolation;
        if (keyframes.anim === 1) {
          cursor$1 = {
            name: keyframes.name,
            styles: keyframes.styles,
            next: cursor$1
          };
          return keyframes.name;
        }
        var serializedStyles = interpolation;
        if (serializedStyles.styles !== void 0) {
          var next2 = serializedStyles.next;
          if (next2 !== void 0) {
            while (next2 !== void 0) {
              cursor$1 = {
                name: next2.name,
                styles: next2.styles,
                next: cursor$1
              };
              next2 = next2.next;
            }
          }
          var styles2 = serializedStyles.styles + ";";
          return styles2;
        }
        return createStringFromObject$1(mergedProps, registered, interpolation);
      }
      case "function": {
        if (mergedProps !== void 0) {
          var previousCursor = cursor$1;
          var result = interpolation(mergedProps);
          cursor$1 = previousCursor;
          return handleInterpolation$1(mergedProps, registered, result);
        }
        break;
      }
    }
    var asString = interpolation;
    {
      return asString;
    }
  }
  function createStringFromObject$1(mergedProps, registered, obj) {
    var string = "";
    if (Array.isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
        string += handleInterpolation$1(mergedProps, registered, obj[i]) + ";";
      }
    } else {
      for (var key2 in obj) {
        var value = obj[key2];
        if (typeof value !== "object") {
          var asString = value;
          if (isProcessableValue$1(asString)) {
            string += processStyleName$1(key2) + ":" + processStyleValue$1(key2, asString) + ";";
          }
        } else {
          if (key2 === "NO_COMPONENT_SELECTOR" && isDevelopment$2) {
            throw new Error(noComponentSelectorMessage$1);
          }
          if (Array.isArray(value) && typeof value[0] === "string" && registered == null) {
            for (var _i = 0; _i < value.length; _i++) {
              if (isProcessableValue$1(value[_i])) {
                string += processStyleName$1(key2) + ":" + processStyleValue$1(key2, value[_i]) + ";";
              }
            }
          } else {
            var interpolated = handleInterpolation$1(mergedProps, registered, value);
            switch (key2) {
              case "animation":
              case "animationName": {
                string += processStyleName$1(key2) + ":" + interpolated + ";";
                break;
              }
              default: {
                string += key2 + "{" + interpolated + "}";
              }
            }
          }
        }
      }
    }
    return string;
  }
  var labelPattern$1 = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
  var cursor$1;
  function serializeStyles$1(args, registered, mergedProps) {
    if (args.length === 1 && typeof args[0] === "object" && args[0] !== null && args[0].styles !== void 0) {
      return args[0];
    }
    var stringMode = true;
    var styles2 = "";
    cursor$1 = void 0;
    var strings = args[0];
    if (strings == null || strings.raw === void 0) {
      stringMode = false;
      styles2 += handleInterpolation$1(mergedProps, registered, strings);
    } else {
      var asTemplateStringsArr = strings;
      styles2 += asTemplateStringsArr[0];
    }
    for (var i = 1; i < args.length; i++) {
      styles2 += handleInterpolation$1(mergedProps, registered, args[i]);
      if (stringMode) {
        var templateStringsArr = strings;
        styles2 += templateStringsArr[i];
      }
    }
    labelPattern$1.lastIndex = 0;
    var identifierName = "";
    var match2;
    while ((match2 = labelPattern$1.exec(styles2)) !== null) {
      identifierName += "-" + match2[1];
    }
    var name = murmur2(styles2) + identifierName;
    return {
      name,
      styles: styles2,
      next: cursor$1
    };
  }
  var syncFallback = function syncFallback2(create) {
    return create();
  };
  var useInsertionEffect = React__default__namespace["useInsertionEffect"] ? React__default__namespace["useInsertionEffect"] : false;
  var useInsertionEffectAlwaysWithSyncFallback = useInsertionEffect || syncFallback;
  var useInsertionEffectWithLayoutFallback = useInsertionEffect || React__default__namespace.useLayoutEffect;
  var isDevelopment$1 = false;
  var EmotionCacheContext = /* @__PURE__ */ React__default__namespace.createContext(
    // we're doing this to avoid preconstruct's dead code elimination in this one case
    // because this module is primarily intended for the browser and node
    // but it's also required in react native and similar environments sometimes
    // and we could have a special build just for that
    // but this is much easier and the native packages
    // might use a different theme context in the future anyway
    typeof HTMLElement !== "undefined" ? /* @__PURE__ */ createCache({
      key: "css"
    }) : null
  );
  var CacheProvider = EmotionCacheContext.Provider;
  var withEmotionCache = function withEmotionCache2(func) {
    return /* @__PURE__ */ React__default.forwardRef(function(props, ref) {
      var cache2 = React__default.useContext(EmotionCacheContext);
      return func(props, cache2, ref);
    });
  };
  var ThemeContext = /* @__PURE__ */ React__default__namespace.createContext({});
  var hasOwn = {}.hasOwnProperty;
  var typePropName = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__";
  var createEmotionProps = function createEmotionProps2(type, props) {
    var newProps = {};
    for (var key2 in props) {
      if (hasOwn.call(props, key2)) {
        newProps[key2] = props[key2];
      }
    }
    newProps[typePropName] = type;
    return newProps;
  };
  var Insertion = function Insertion2(_ref4) {
    var cache2 = _ref4.cache, serialized = _ref4.serialized, isStringTag = _ref4.isStringTag;
    registerStyles(cache2, serialized, isStringTag);
    useInsertionEffectAlwaysWithSyncFallback(function() {
      return insertStyles(cache2, serialized, isStringTag);
    });
    return null;
  };
  var Emotion = /* @__PURE__ */ withEmotionCache(
    /* <any, any> */
    function(props, cache2, ref) {
      var cssProp = props.css;
      if (typeof cssProp === "string" && cache2.registered[cssProp] !== void 0) {
        cssProp = cache2.registered[cssProp];
      }
      var WrappedComponent = props[typePropName];
      var registeredStyles = [cssProp];
      var className = "";
      if (typeof props.className === "string") {
        className = getRegisteredStyles(cache2.registered, registeredStyles, props.className);
      } else if (props.className != null) {
        className = props.className + " ";
      }
      var serialized = serializeStyles$1(registeredStyles, void 0, React__default__namespace.useContext(ThemeContext));
      className += cache2.key + "-" + serialized.name;
      var newProps = {};
      for (var key2 in props) {
        if (hasOwn.call(props, key2) && key2 !== "css" && key2 !== typePropName && !isDevelopment$1) {
          newProps[key2] = props[key2];
        }
      }
      newProps.className = className;
      if (ref) {
        newProps.ref = ref;
      }
      return /* @__PURE__ */ React__default__namespace.createElement(React__default__namespace.Fragment, null, /* @__PURE__ */ React__default__namespace.createElement(Insertion, {
        cache: cache2,
        serialized,
        isStringTag: typeof WrappedComponent === "string"
      }), /* @__PURE__ */ React__default__namespace.createElement(WrappedComponent, newProps));
    }
  );
  var Emotion$1 = Emotion;
  var Fragment = jsxRuntimeExports.Fragment;
  function jsx(type, props, key2) {
    if (!hasOwn.call(props, "css")) {
      return jsxRuntimeExports.jsx(type, props, key2);
    }
    return jsxRuntimeExports.jsx(Emotion$1, createEmotionProps(type, props), key2);
  }
  function jsxs(type, props, key2) {
    if (!hasOwn.call(props, "css")) {
      return jsxRuntimeExports.jsxs(type, props, key2);
    }
    return jsxRuntimeExports.jsxs(Emotion$1, createEmotionProps(type, props), key2);
  }
  const phThumbsDownDuotone = (props) => /* @__PURE__ */ jsx("svg", {
    viewBox: "0 0 256 256",
    width: "1.2em",
    height: "1.2em",
    ...props,
    children: /* @__PURE__ */ jsxs("g", {
      fill: "currentColor",
      children: [/* @__PURE__ */ jsx("path", {
        d: "M80 48v104H32a8 8 0 0 1-8-8V56a8 8 0 0 1 8-8Z",
        opacity: 0.2
      }), /* @__PURE__ */ jsx("path", {
        d: "m239.82 157l-12-96A24 24 0 0 0 204 40H32a16 16 0 0 0-16 16v88a16 16 0 0 0 16 16h43.06l37.78 75.58A8 8 0 0 0 120 240a40 40 0 0 0 40-40v-16h56a24 24 0 0 0 23.82-27M72 144H32V56h40Zm150 21.29a7.88 7.88 0 0 1-6 2.71h-64a8 8 0 0 0-8 8v24a24 24 0 0 1-19.29 23.54L88 150.11V56h116a8 8 0 0 1 7.94 7l12 96a7.87 7.87 0 0 1-1.94 6.29"
      })]
    })
  });
  const iconParkOutlineConfig = (props) => /* @__PURE__ */ jsx("svg", {
    viewBox: "0 0 48 48",
    width: "1.2em",
    height: "1.2em",
    ...props,
    children: /* @__PURE__ */ jsxs("g", {
      fill: "none",
      stroke: "currentColor",
      strokeLinejoin: "round",
      strokeWidth: 4,
      children: [/* @__PURE__ */ jsx("path", {
        d: "m24 4l-6 6h-8v8l-6 6l6 6v8h8l6 6l6-6h8v-8l6-6l-6-6v-8h-8z"
      }), /* @__PURE__ */ jsx("path", {
        d: "M24 30a6 6 0 1 0 0-12a6 6 0 0 0 0 12Z"
      })]
    })
  });
  const iconParkOutlinePlayTwo = (props) => /* @__PURE__ */ jsx("svg", {
    viewBox: "0 0 48 48",
    width: "1.2em",
    height: "1.2em",
    ...props,
    children: /* @__PURE__ */ jsxs("g", {
      fill: "none",
      stroke: "currentColor",
      strokeLinejoin: "round",
      strokeWidth: 4,
      children: [/* @__PURE__ */ jsx("rect", {
        width: 36,
        height: 36,
        x: 6,
        y: 6,
        strokeLinecap: "round",
        rx: 3
      }), /* @__PURE__ */ jsx("path", {
        d: "M18.5 24v-7.794l6.75 3.897L32 24l-6.75 3.897l-6.75 3.897z"
      })]
    })
  });
  const radixIconsExternalLink = (props) => /* @__PURE__ */ jsx("svg", {
    viewBox: "0 0 15 15",
    width: "1.2em",
    height: "1.2em",
    ...props,
    children: /* @__PURE__ */ jsx("path", {
      fill: "currentColor",
      fillRule: "evenodd",
      d: "M3 2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V8.5a.5.5 0 0 0-1 0V12H3V3h3.5a.5.5 0 0 0 0-1zm9.854.146a.5.5 0 0 1 .146.351V5.5a.5.5 0 0 1-1 0V3.707L6.854 8.854a.5.5 0 1 1-.708-.708L11.293 3H9.5a.5.5 0 0 1 0-1h3a.5.5 0 0 1 .354.146",
      clipRule: "evenodd"
    })
  });
  const materialSymbolsBarChart = (props) => /* @__PURE__ */ jsx("svg", {
    viewBox: "0 0 24 24",
    width: "1.2em",
    height: "1.2em",
    ...props,
    children: /* @__PURE__ */ jsx("path", {
      fill: "currentColor",
      d: "M16 20v-7h4v7zm-6 0V4h4v16zm-6 0V9h4v11z"
    })
  });
  const DislikeIcon = phThumbsDownDuotone;
  const ConfigIcon = iconParkOutlineConfig;
  const PlayerIcon = iconParkOutlinePlayTwo;
  const OpenExternalLinkIcon = radixIconsExternalLink;
  const LIVE_GIF = `data:image/gif;base64,R0lGODlhGAAYAJECAP7+/v///wAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTI2NTYzMDc2RTNDMTFFREJENEJEMzUxOTQzQjMxMkQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTI2NTYzMDg2RTNDMTFFREJENEJEMzUxOTQzQjMxMkQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBMjY1NjMwNTZFM0MxMUVEQkQ0QkQzNTE5NDNCMzEyRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBMjY1NjMwNjZFM0MxMUVEQkQ0QkQzNTE5NDNCMzEyRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAkEAAIALAAAAAAYABgAAAI5lI+py+0Po2QhTFXrRdlu031gJgqhpI0pdJ4sacJv6j6trABeTOMcfFslgp7ar4fcDVcyX+kJjToKACH5BAkEAAIALAAAAAAYABgAAAI2lI+py+0Po5xUhFDRvdls3H0T522SaJkRikKs6qptAr+kYoOzJvc37dPBgKQco3YbdpbM5qQAACH5BAkEAAIALAAAAAAYABgAAAI3lI+py+0Po5y02hhykHqLzmkGiImfCZHkkh0qmrztOSuyt8bmzfC0Z9sJa7qZLwhEwS7MpnNSAAAh+QQJBAACACwAAAAAGAAYAAACPJSPqcvtD6OctJoQ7MFYC55dYQSKHcmZo3J+qdsmJRzO7DvbMs7HSN5b/YIqBvCkGyKJixds4/NIp1RHAQAh+QQJBAACACwAAAAAGAAYAAACOpSPqcvtD6OcLwSarMVHXy54YKhJIrmhn3K25eKmJ/vGa1bnKS3rN2IzzHC94q/jE754yNVyBI1KIQUAIfkECQQAAgAsAAAAABgAGAAAAjmUj6nL7Q+jnLSaEOzBePbLSVwmjGJYopCZfmnDxmoif6xSkzeN5ozfIuF6RBfPVhQeN66Z5gmNTgoAIfkECQQAAgAsAAAAABgAGAAAAjmUj6nL7Q+jnLRaETLSMnMfdJ4Bit8YlRgKqerauOibyCen2OGK1/Pf2wB3NOGNyPLteIfk5QmNTgoAIfkECQQAAgAsAAAAABgAGAAAAjeUj6nL7Q+jnCkEWu3FRm/uHdYUCiVUnk+qSewYvd/amrWKyF2t6DbcuwmBGZgv+OHxOMyms1kAACH5BAkEAAIALAAAAAAYABgAAAI5lI+py+0PowtBLkptwlUf7n1YaIBlF5kmpI6puz5t9tLxBLsCgCpzdxPZcjQfEajbFHVJkvMJtRQAACH5BAkEAAIALAAAAAAYABgAAAI1lI+py+0Po5wpBFrtxUZv7nGdJgqheJ5QSkasJb2bmsFmSyPyaCv73avNcC1fr1gsKZdMSAEAIfkECQQAAgAsAAAAABgAGAAAAjWUj6nL7Q+jnLRaEfI1Wd8ebKDYkR4WHqcyol7Llm4KJ+0tx69cI/i+8vGGQdUpl9sol0xIAQAh+QQJBAACACwAAAAAGAAYAAACNJSPqcvtD6OctNq7QsBCa+xtV9h8DJl5p5qaCtqJsZugNvuyN43sIlzTCXkHnJHISSqXiQIAIfkECQQAAgAsAAAAABgAGAAAAjKUj6nL7Q+jnLTai3MMPLDuLeDXkZwZKqNYsqebJqva0u86yy1e6/feQ9SGL43xiEwUAAAh+QQJBAACACwAAAAAGAAYAAACM5SPqcvtD6OctNp7Q8BCa+xtzDd6JamEp5iai2qgcEvCc2K7N5LXLi3qsXCy4pCDTCoXBQAh+QQJBAACACwAAAAAGAAYAAACNJSPqcvtD6OctNoYcrhC7+txIag1mVkuY/exp5qOayLHqVK/M5J/+9Ez/IQvF7DISSqXkAIAIfkEBQQAAgAsAAAAABgAGAAAAjKUj6nL7Q+jnFSEUNG92WzcfZ21jWJYRucJranyutwig2xSey+e5nQPnMGEMeHoiExCCgA7`;
  function LiveIcon({
    active = false,
    ...props
  }) {
    if (active) {
      return /* @__PURE__ */ jsx("img", {
        ...props,
        src: LIVE_GIF
      });
    } else {
      return /* @__PURE__ */ jsx(materialSymbolsBarChart, {
        ...props
      });
    }
  }
  function WatchLaterIcon(props) {
    return /* @__PURE__ */ jsxs("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink",
      viewBox: "0 0 20 20",
      width: "20",
      height: "20",
      fill: "currentColor",
      ...props,
      children: [/* @__PURE__ */ jsx("path", {
        className: "circle",
        d: "M10 3.1248000000000005C6.20305 3.1248000000000005 3.1250083333333336 6.202841666666667 3.1250083333333336 9.999833333333335C3.1250083333333336 13.796750000000001 6.20305 16.874833333333335 10 16.874833333333335C11.898291666666667 16.874833333333335 13.615833333333333 16.106291666666667 14.860625 14.861916666666666C15.104708333333335 14.617916666666666 15.500416666666668 14.617958333333334 15.7445 14.862041666666668C15.9885 15.106166666666669 15.988416666666668 15.501916666666666 15.744333333333334 15.745958333333334C14.274750000000001 17.215041666666668 12.243041666666667 18.124833333333335 10 18.124833333333335C5.512691666666667 18.124833333333335 1.8750083333333334 14.487125 1.8750083333333334 9.999833333333335C1.8750083333333334 5.512483333333334 5.512691666666667 1.8748000000000002 10 1.8748000000000002C14.487291666666668 1.8748000000000002 18.125 5.512483333333334 18.125 9.999833333333335C18.125 10.304458333333333 18.108208333333334 10.605458333333333 18.075458333333337 10.901791666666668C18.0375 11.244916666666667 17.728625 11.492291666666667 17.385583333333333 11.454333333333334C17.0425 11.416416666666667 16.795083333333334 11.107541666666668 16.833000000000002 10.764458333333334C16.860750000000003 10.513625000000001 16.875 10.2585 16.875 9.999833333333335C16.875 6.202841666666667 13.796958333333333 3.1248000000000005 10 3.1248000000000005z",
        fill: "currentColor"
      }), /* @__PURE__ */ jsx("path", {
        d: "M15.391416666666666 9.141166666666667C15.635458333333334 8.897083333333335 16.031208333333332 8.897083333333335 16.275291666666668 9.141166666666667L17.5 10.365875L18.72475 9.141166666666667C18.968791666666668 8.897083333333335 19.364541666666668 8.897083333333335 19.608625 9.141166666666667C19.852666666666668 9.385291666666667 19.852666666666668 9.780958333333334 19.608625 10.025083333333333L18.08925 11.544416666666669C17.763833333333334 11.869833333333334 17.236208333333334 11.869833333333334 16.91075 11.544416666666669L15.391416666666666 10.025083333333333C15.147333333333334 9.780958333333334 15.147333333333334 9.385291666666667 15.391416666666666 9.141166666666667z",
        fill: "currentColor"
      }), /* @__PURE__ */ jsx("path", {
        d: "M12.499333333333334 9.278375C13.05475 9.599 13.05475 10.400666666666668 12.499333333333334 10.721291666666668L9.373916666666666 12.525791666666668C8.818541666666667 12.846416666666666 8.124274999999999 12.445583333333333 8.124274999999999 11.804291666666668L8.124274999999999 8.1954C8.124274999999999 7.554066666666667 8.818541666666667 7.153233333333334 9.373916666666666 7.473900000000001L12.499333333333334 9.278375z",
        fill: "currentColor"
      })]
    });
  }
  const parsed = UAParser();
  const isMac = ((_a = parsed.os.name) == null ? void 0 : _a.toLowerCase()) === "mac os";
  const isSafari = ((_b = parsed.browser.name) == null ? void 0 : _b.toLowerCase()) === "safari";
  const isFirefox = ((_c = parsed.browser.name) == null ? void 0 : _c.toLowerCase()) === "firefox";
  const isEdge = ((_d = parsed.browser.name) == null ? void 0 : _d.toLowerCase()) === "edge";
  function mitt(n2) {
    return { all: n2 = n2 || /* @__PURE__ */ new Map(), on: function(t2, e2) {
      var i = n2.get(t2);
      i ? i.push(e2) : n2.set(t2, [e2]);
    }, off: function(t2, e2) {
      var i = n2.get(t2);
      i && (e2 ? i.splice(i.indexOf(e2) >>> 0, 1) : n2.set(t2, []));
    }, emit: function(t2, e2) {
      var i = n2.get(t2);
      i && i.slice().map(function(n3) {
        n3(e2);
      }), (i = n2.get("*")) && i.slice().map(function(n3) {
        n3(t2, e2);
      });
    } };
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key2 in source) {
          if (Object.prototype.hasOwnProperty.call(source, key2)) {
            target[key2] = source[key2];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
  function _setPrototypeOf(o, p2) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p3) {
      o2.__proto__ = p3;
      return o2;
    };
    return _setPrototypeOf(o, p2);
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass);
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
      return o2.__proto__ || Object.getPrototypeOf(o2);
    };
    return _getPrototypeOf(o);
  }
  function _isNativeFunction(fn) {
    try {
      return Function.toString.call(fn).indexOf("[native code]") !== -1;
    } catch (e2) {
      return typeof fn === "function";
    }
  }
  function _isNativeReflectConstruct() {
    try {
      var t2 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      }));
    } catch (t3) {
    }
    return (_isNativeReflectConstruct = function _isNativeReflectConstruct2() {
      return !!t2;
    })();
  }
  function _construct(t2, e2, r2) {
    if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
    var o = [null];
    o.push.apply(o, e2);
    var p2 = new (t2.bind.apply(t2, o))();
    return r2 && _setPrototypeOf(p2, r2.prototype), p2;
  }
  function _wrapNativeSuper(Class) {
    var _cache2 = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
    _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
      if (Class2 === null || !_isNativeFunction(Class2)) return Class2;
      if (typeof Class2 !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }
      if (typeof _cache2 !== "undefined") {
        if (_cache2.has(Class2)) return _cache2.get(Class2);
        _cache2.set(Class2, Wrapper);
      }
      function Wrapper() {
        return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
      }
      Wrapper.prototype = Object.create(Class2.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class2);
    };
    return _wrapNativeSuper(Class);
  }
  var PolishedError = /* @__PURE__ */ function(_Error) {
    _inheritsLoose(PolishedError2, _Error);
    function PolishedError2(code) {
      var _this;
      {
        _this = _Error.call(this, "An error occurred. See https://github.com/styled-components/polished/blob/main/src/internalHelpers/errors.md#" + code + " for more information.") || this;
      }
      return _assertThisInitialized(_this);
    }
    return PolishedError2;
  }(/* @__PURE__ */ _wrapNativeSuper(Error));
  function colorToInt(color) {
    return Math.round(color * 255);
  }
  function convertToInt(red, green, blue) {
    return colorToInt(red) + "," + colorToInt(green) + "," + colorToInt(blue);
  }
  function hslToRgb(hue, saturation, lightness, convert) {
    if (convert === void 0) {
      convert = convertToInt;
    }
    if (saturation === 0) {
      return convert(lightness, lightness, lightness);
    }
    var huePrime = (hue % 360 + 360) % 360 / 60;
    var chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
    var secondComponent = chroma * (1 - Math.abs(huePrime % 2 - 1));
    var red = 0;
    var green = 0;
    var blue = 0;
    if (huePrime >= 0 && huePrime < 1) {
      red = chroma;
      green = secondComponent;
    } else if (huePrime >= 1 && huePrime < 2) {
      red = secondComponent;
      green = chroma;
    } else if (huePrime >= 2 && huePrime < 3) {
      green = chroma;
      blue = secondComponent;
    } else if (huePrime >= 3 && huePrime < 4) {
      green = secondComponent;
      blue = chroma;
    } else if (huePrime >= 4 && huePrime < 5) {
      red = secondComponent;
      blue = chroma;
    } else if (huePrime >= 5 && huePrime < 6) {
      red = chroma;
      blue = secondComponent;
    }
    var lightnessModification = lightness - chroma / 2;
    var finalRed = red + lightnessModification;
    var finalGreen = green + lightnessModification;
    var finalBlue = blue + lightnessModification;
    return convert(finalRed, finalGreen, finalBlue);
  }
  var namedColorMap = {
    aliceblue: "f0f8ff",
    antiquewhite: "faebd7",
    aqua: "00ffff",
    aquamarine: "7fffd4",
    azure: "f0ffff",
    beige: "f5f5dc",
    bisque: "ffe4c4",
    black: "000",
    blanchedalmond: "ffebcd",
    blue: "0000ff",
    blueviolet: "8a2be2",
    brown: "a52a2a",
    burlywood: "deb887",
    cadetblue: "5f9ea0",
    chartreuse: "7fff00",
    chocolate: "d2691e",
    coral: "ff7f50",
    cornflowerblue: "6495ed",
    cornsilk: "fff8dc",
    crimson: "dc143c",
    cyan: "00ffff",
    darkblue: "00008b",
    darkcyan: "008b8b",
    darkgoldenrod: "b8860b",
    darkgray: "a9a9a9",
    darkgreen: "006400",
    darkgrey: "a9a9a9",
    darkkhaki: "bdb76b",
    darkmagenta: "8b008b",
    darkolivegreen: "556b2f",
    darkorange: "ff8c00",
    darkorchid: "9932cc",
    darkred: "8b0000",
    darksalmon: "e9967a",
    darkseagreen: "8fbc8f",
    darkslateblue: "483d8b",
    darkslategray: "2f4f4f",
    darkslategrey: "2f4f4f",
    darkturquoise: "00ced1",
    darkviolet: "9400d3",
    deeppink: "ff1493",
    deepskyblue: "00bfff",
    dimgray: "696969",
    dimgrey: "696969",
    dodgerblue: "1e90ff",
    firebrick: "b22222",
    floralwhite: "fffaf0",
    forestgreen: "228b22",
    fuchsia: "ff00ff",
    gainsboro: "dcdcdc",
    ghostwhite: "f8f8ff",
    gold: "ffd700",
    goldenrod: "daa520",
    gray: "808080",
    green: "008000",
    greenyellow: "adff2f",
    grey: "808080",
    honeydew: "f0fff0",
    hotpink: "ff69b4",
    indianred: "cd5c5c",
    indigo: "4b0082",
    ivory: "fffff0",
    khaki: "f0e68c",
    lavender: "e6e6fa",
    lavenderblush: "fff0f5",
    lawngreen: "7cfc00",
    lemonchiffon: "fffacd",
    lightblue: "add8e6",
    lightcoral: "f08080",
    lightcyan: "e0ffff",
    lightgoldenrodyellow: "fafad2",
    lightgray: "d3d3d3",
    lightgreen: "90ee90",
    lightgrey: "d3d3d3",
    lightpink: "ffb6c1",
    lightsalmon: "ffa07a",
    lightseagreen: "20b2aa",
    lightskyblue: "87cefa",
    lightslategray: "789",
    lightslategrey: "789",
    lightsteelblue: "b0c4de",
    lightyellow: "ffffe0",
    lime: "0f0",
    limegreen: "32cd32",
    linen: "faf0e6",
    magenta: "f0f",
    maroon: "800000",
    mediumaquamarine: "66cdaa",
    mediumblue: "0000cd",
    mediumorchid: "ba55d3",
    mediumpurple: "9370db",
    mediumseagreen: "3cb371",
    mediumslateblue: "7b68ee",
    mediumspringgreen: "00fa9a",
    mediumturquoise: "48d1cc",
    mediumvioletred: "c71585",
    midnightblue: "191970",
    mintcream: "f5fffa",
    mistyrose: "ffe4e1",
    moccasin: "ffe4b5",
    navajowhite: "ffdead",
    navy: "000080",
    oldlace: "fdf5e6",
    olive: "808000",
    olivedrab: "6b8e23",
    orange: "ffa500",
    orangered: "ff4500",
    orchid: "da70d6",
    palegoldenrod: "eee8aa",
    palegreen: "98fb98",
    paleturquoise: "afeeee",
    palevioletred: "db7093",
    papayawhip: "ffefd5",
    peachpuff: "ffdab9",
    peru: "cd853f",
    pink: "ffc0cb",
    plum: "dda0dd",
    powderblue: "b0e0e6",
    purple: "800080",
    rebeccapurple: "639",
    red: "f00",
    rosybrown: "bc8f8f",
    royalblue: "4169e1",
    saddlebrown: "8b4513",
    salmon: "fa8072",
    sandybrown: "f4a460",
    seagreen: "2e8b57",
    seashell: "fff5ee",
    sienna: "a0522d",
    silver: "c0c0c0",
    skyblue: "87ceeb",
    slateblue: "6a5acd",
    slategray: "708090",
    slategrey: "708090",
    snow: "fffafa",
    springgreen: "00ff7f",
    steelblue: "4682b4",
    tan: "d2b48c",
    teal: "008080",
    thistle: "d8bfd8",
    tomato: "ff6347",
    turquoise: "40e0d0",
    violet: "ee82ee",
    wheat: "f5deb3",
    white: "fff",
    whitesmoke: "f5f5f5",
    yellow: "ff0",
    yellowgreen: "9acd32"
  };
  function nameToHex(color) {
    if (typeof color !== "string") return color;
    var normalizedColorName = color.toLowerCase();
    return namedColorMap[normalizedColorName] ? "#" + namedColorMap[normalizedColorName] : color;
  }
  var hexRegex = /^#[a-fA-F0-9]{6}$/;
  var hexRgbaRegex = /^#[a-fA-F0-9]{8}$/;
  var reducedHexRegex = /^#[a-fA-F0-9]{3}$/;
  var reducedRgbaHexRegex = /^#[a-fA-F0-9]{4}$/;
  var rgbRegex = /^rgb\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*\)$/i;
  var rgbaRegex = /^rgb(?:a)?\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i;
  var hslRegex = /^hsl\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*\)$/i;
  var hslaRegex = /^hsl(?:a)?\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i;
  function parseToRgb(color) {
    if (typeof color !== "string") {
      throw new PolishedError(3);
    }
    var normalizedColor = nameToHex(color);
    if (normalizedColor.match(hexRegex)) {
      return {
        red: parseInt("" + normalizedColor[1] + normalizedColor[2], 16),
        green: parseInt("" + normalizedColor[3] + normalizedColor[4], 16),
        blue: parseInt("" + normalizedColor[5] + normalizedColor[6], 16)
      };
    }
    if (normalizedColor.match(hexRgbaRegex)) {
      var alpha = parseFloat((parseInt("" + normalizedColor[7] + normalizedColor[8], 16) / 255).toFixed(2));
      return {
        red: parseInt("" + normalizedColor[1] + normalizedColor[2], 16),
        green: parseInt("" + normalizedColor[3] + normalizedColor[4], 16),
        blue: parseInt("" + normalizedColor[5] + normalizedColor[6], 16),
        alpha
      };
    }
    if (normalizedColor.match(reducedHexRegex)) {
      return {
        red: parseInt("" + normalizedColor[1] + normalizedColor[1], 16),
        green: parseInt("" + normalizedColor[2] + normalizedColor[2], 16),
        blue: parseInt("" + normalizedColor[3] + normalizedColor[3], 16)
      };
    }
    if (normalizedColor.match(reducedRgbaHexRegex)) {
      var _alpha = parseFloat((parseInt("" + normalizedColor[4] + normalizedColor[4], 16) / 255).toFixed(2));
      return {
        red: parseInt("" + normalizedColor[1] + normalizedColor[1], 16),
        green: parseInt("" + normalizedColor[2] + normalizedColor[2], 16),
        blue: parseInt("" + normalizedColor[3] + normalizedColor[3], 16),
        alpha: _alpha
      };
    }
    var rgbMatched = rgbRegex.exec(normalizedColor);
    if (rgbMatched) {
      return {
        red: parseInt("" + rgbMatched[1], 10),
        green: parseInt("" + rgbMatched[2], 10),
        blue: parseInt("" + rgbMatched[3], 10)
      };
    }
    var rgbaMatched = rgbaRegex.exec(normalizedColor.substring(0, 50));
    if (rgbaMatched) {
      return {
        red: parseInt("" + rgbaMatched[1], 10),
        green: parseInt("" + rgbaMatched[2], 10),
        blue: parseInt("" + rgbaMatched[3], 10),
        alpha: parseFloat("" + rgbaMatched[4]) > 1 ? parseFloat("" + rgbaMatched[4]) / 100 : parseFloat("" + rgbaMatched[4])
      };
    }
    var hslMatched = hslRegex.exec(normalizedColor);
    if (hslMatched) {
      var hue = parseInt("" + hslMatched[1], 10);
      var saturation = parseInt("" + hslMatched[2], 10) / 100;
      var lightness = parseInt("" + hslMatched[3], 10) / 100;
      var rgbColorString = "rgb(" + hslToRgb(hue, saturation, lightness) + ")";
      var hslRgbMatched = rgbRegex.exec(rgbColorString);
      if (!hslRgbMatched) {
        throw new PolishedError(4, normalizedColor, rgbColorString);
      }
      return {
        red: parseInt("" + hslRgbMatched[1], 10),
        green: parseInt("" + hslRgbMatched[2], 10),
        blue: parseInt("" + hslRgbMatched[3], 10)
      };
    }
    var hslaMatched = hslaRegex.exec(normalizedColor.substring(0, 50));
    if (hslaMatched) {
      var _hue = parseInt("" + hslaMatched[1], 10);
      var _saturation = parseInt("" + hslaMatched[2], 10) / 100;
      var _lightness = parseInt("" + hslaMatched[3], 10) / 100;
      var _rgbColorString = "rgb(" + hslToRgb(_hue, _saturation, _lightness) + ")";
      var _hslRgbMatched = rgbRegex.exec(_rgbColorString);
      if (!_hslRgbMatched) {
        throw new PolishedError(4, normalizedColor, _rgbColorString);
      }
      return {
        red: parseInt("" + _hslRgbMatched[1], 10),
        green: parseInt("" + _hslRgbMatched[2], 10),
        blue: parseInt("" + _hslRgbMatched[3], 10),
        alpha: parseFloat("" + hslaMatched[4]) > 1 ? parseFloat("" + hslaMatched[4]) / 100 : parseFloat("" + hslaMatched[4])
      };
    }
    throw new PolishedError(5);
  }
  function rgbToHsl(color) {
    var red = color.red / 255;
    var green = color.green / 255;
    var blue = color.blue / 255;
    var max2 = Math.max(red, green, blue);
    var min2 = Math.min(red, green, blue);
    var lightness = (max2 + min2) / 2;
    if (max2 === min2) {
      if (color.alpha !== void 0) {
        return {
          hue: 0,
          saturation: 0,
          lightness,
          alpha: color.alpha
        };
      } else {
        return {
          hue: 0,
          saturation: 0,
          lightness
        };
      }
    }
    var hue;
    var delta = max2 - min2;
    var saturation = lightness > 0.5 ? delta / (2 - max2 - min2) : delta / (max2 + min2);
    switch (max2) {
      case red:
        hue = (green - blue) / delta + (green < blue ? 6 : 0);
        break;
      case green:
        hue = (blue - red) / delta + 2;
        break;
      default:
        hue = (red - green) / delta + 4;
        break;
    }
    hue *= 60;
    if (color.alpha !== void 0) {
      return {
        hue,
        saturation,
        lightness,
        alpha: color.alpha
      };
    }
    return {
      hue,
      saturation,
      lightness
    };
  }
  function parseToHsl(color) {
    return rgbToHsl(parseToRgb(color));
  }
  var reduceHexValue = function reduceHexValue2(value) {
    if (value.length === 7 && value[1] === value[2] && value[3] === value[4] && value[5] === value[6]) {
      return "#" + value[1] + value[3] + value[5];
    }
    return value;
  };
  var reduceHexValue$1 = reduceHexValue;
  function numberToHex(value) {
    var hex = value.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }
  function colorToHex(color) {
    return numberToHex(Math.round(color * 255));
  }
  function convertToHex(red, green, blue) {
    return reduceHexValue$1("#" + colorToHex(red) + colorToHex(green) + colorToHex(blue));
  }
  function hslToHex(hue, saturation, lightness) {
    return hslToRgb(hue, saturation, lightness, convertToHex);
  }
  function hsl(value, saturation, lightness) {
    if (typeof value === "number" && typeof saturation === "number" && typeof lightness === "number") {
      return hslToHex(value, saturation, lightness);
    } else if (typeof value === "object" && saturation === void 0 && lightness === void 0) {
      return hslToHex(value.hue, value.saturation, value.lightness);
    }
    throw new PolishedError(1);
  }
  function hsla(value, saturation, lightness, alpha) {
    if (typeof value === "number" && typeof saturation === "number" && typeof lightness === "number" && typeof alpha === "number") {
      return "rgba(" + hslToRgb(value, saturation, lightness) + "," + alpha + ")";
    } else if (typeof value === "object" && saturation === void 0 && lightness === void 0 && alpha === void 0) {
      return value.alpha >= 1 ? hslToHex(value.hue, value.saturation, value.lightness) : "rgba(" + hslToRgb(value.hue, value.saturation, value.lightness) + "," + value.alpha + ")";
    }
    throw new PolishedError(2);
  }
  function rgb(value, green, blue) {
    if (typeof value === "number" && typeof green === "number" && typeof blue === "number") {
      return reduceHexValue$1("#" + numberToHex(value) + numberToHex(green) + numberToHex(blue));
    } else if (typeof value === "object" && green === void 0 && blue === void 0) {
      return reduceHexValue$1("#" + numberToHex(value.red) + numberToHex(value.green) + numberToHex(value.blue));
    }
    throw new PolishedError(6);
  }
  function rgba(firstValue, secondValue, thirdValue, fourthValue) {
    if (typeof firstValue === "string" && typeof secondValue === "number") {
      var rgbValue = parseToRgb(firstValue);
      return "rgba(" + rgbValue.red + "," + rgbValue.green + "," + rgbValue.blue + "," + secondValue + ")";
    } else if (typeof firstValue === "number" && typeof secondValue === "number" && typeof thirdValue === "number" && typeof fourthValue === "number") {
      return "rgba(" + firstValue + "," + secondValue + "," + thirdValue + "," + fourthValue + ")";
    } else if (typeof firstValue === "object" && secondValue === void 0 && thirdValue === void 0 && fourthValue === void 0) {
      return firstValue.alpha >= 1 ? rgb(firstValue.red, firstValue.green, firstValue.blue) : "rgba(" + firstValue.red + "," + firstValue.green + "," + firstValue.blue + "," + firstValue.alpha + ")";
    }
    throw new PolishedError(7);
  }
  var isRgb = function isRgb2(color) {
    return typeof color.red === "number" && typeof color.green === "number" && typeof color.blue === "number" && (typeof color.alpha !== "number" || typeof color.alpha === "undefined");
  };
  var isRgba = function isRgba2(color) {
    return typeof color.red === "number" && typeof color.green === "number" && typeof color.blue === "number" && typeof color.alpha === "number";
  };
  var isHsl = function isHsl2(color) {
    return typeof color.hue === "number" && typeof color.saturation === "number" && typeof color.lightness === "number" && (typeof color.alpha !== "number" || typeof color.alpha === "undefined");
  };
  var isHsla = function isHsla2(color) {
    return typeof color.hue === "number" && typeof color.saturation === "number" && typeof color.lightness === "number" && typeof color.alpha === "number";
  };
  function toColorString(color) {
    if (typeof color !== "object") throw new PolishedError(8);
    if (isRgba(color)) return rgba(color);
    if (isRgb(color)) return rgb(color);
    if (isHsla(color)) return hsla(color);
    if (isHsl(color)) return hsl(color);
    throw new PolishedError(8);
  }
  function curried(f2, length2, acc) {
    return function fn() {
      var combined = acc.concat(Array.prototype.slice.call(arguments));
      return combined.length >= length2 ? f2.apply(this, combined) : curried(f2, length2, combined);
    };
  }
  function curry(f2) {
    return curried(f2, f2.length, []);
  }
  function adjustHue(degree, color) {
    if (color === "transparent") return color;
    var hslColor = parseToHsl(color);
    return toColorString(_extends({}, hslColor, {
      hue: hslColor.hue + parseFloat(degree)
    }));
  }
  curry(adjustHue);
  function guard(lowerBoundary, upperBoundary, value) {
    return Math.max(lowerBoundary, Math.min(upperBoundary, value));
  }
  function darken(amount, color) {
    if (color === "transparent") return color;
    var hslColor = parseToHsl(color);
    return toColorString(_extends({}, hslColor, {
      lightness: guard(0, 1, hslColor.lightness - parseFloat(amount))
    }));
  }
  curry(darken);
  function desaturate(amount, color) {
    if (color === "transparent") return color;
    var hslColor = parseToHsl(color);
    return toColorString(_extends({}, hslColor, {
      saturation: guard(0, 1, hslColor.saturation - parseFloat(amount))
    }));
  }
  curry(desaturate);
  function lighten(amount, color) {
    if (color === "transparent") return color;
    var hslColor = parseToHsl(color);
    return toColorString(_extends({}, hslColor, {
      lightness: guard(0, 1, hslColor.lightness + parseFloat(amount))
    }));
  }
  curry(lighten);
  function mix(weight, color, otherColor) {
    if (color === "transparent") return otherColor;
    if (otherColor === "transparent") return color;
    if (weight === 0) return otherColor;
    var parsedColor1 = parseToRgb(color);
    var color1 = _extends({}, parsedColor1, {
      alpha: typeof parsedColor1.alpha === "number" ? parsedColor1.alpha : 1
    });
    var parsedColor2 = parseToRgb(otherColor);
    var color2 = _extends({}, parsedColor2, {
      alpha: typeof parsedColor2.alpha === "number" ? parsedColor2.alpha : 1
    });
    var alphaDelta = color1.alpha - color2.alpha;
    var x2 = parseFloat(weight) * 2 - 1;
    var y2 = x2 * alphaDelta === -1 ? x2 : x2 + alphaDelta;
    var z2 = 1 + x2 * alphaDelta;
    var weight1 = (y2 / z2 + 1) / 2;
    var weight2 = 1 - weight1;
    var mixedColor = {
      red: Math.floor(color1.red * weight1 + color2.red * weight2),
      green: Math.floor(color1.green * weight1 + color2.green * weight2),
      blue: Math.floor(color1.blue * weight1 + color2.blue * weight2),
      alpha: color1.alpha * parseFloat(weight) + color2.alpha * (1 - parseFloat(weight))
    };
    return rgba(mixedColor);
  }
  var curriedMix = curry(mix);
  var mix$1 = curriedMix;
  function opacify(amount, color) {
    if (color === "transparent") return color;
    var parsedColor = parseToRgb(color);
    var alpha = typeof parsedColor.alpha === "number" ? parsedColor.alpha : 1;
    var colorWithAlpha = _extends({}, parsedColor, {
      alpha: guard(0, 1, (alpha * 100 + parseFloat(amount) * 100) / 100)
    });
    return rgba(colorWithAlpha);
  }
  curry(opacify);
  function saturate(amount, color) {
    if (color === "transparent") return color;
    var hslColor = parseToHsl(color);
    return toColorString(_extends({}, hslColor, {
      saturation: guard(0, 1, hslColor.saturation + parseFloat(amount))
    }));
  }
  curry(saturate);
  function setHue(hue, color) {
    if (color === "transparent") return color;
    return toColorString(_extends({}, parseToHsl(color), {
      hue: parseFloat(hue)
    }));
  }
  curry(setHue);
  function setLightness(lightness, color) {
    if (color === "transparent") return color;
    return toColorString(_extends({}, parseToHsl(color), {
      lightness: parseFloat(lightness)
    }));
  }
  curry(setLightness);
  function setSaturation(saturation, color) {
    if (color === "transparent") return color;
    return toColorString(_extends({}, parseToHsl(color), {
      saturation: parseFloat(saturation)
    }));
  }
  curry(setSaturation);
  function shade(percentage, color) {
    if (color === "transparent") return color;
    return mix$1(parseFloat(percentage), "rgb(0, 0, 0)", color);
  }
  curry(shade);
  function tint(percentage, color) {
    if (color === "transparent") return color;
    return mix$1(parseFloat(percentage), "rgb(255, 255, 255)", color);
  }
  curry(tint);
  function transparentize(amount, color) {
    if (color === "transparent") return color;
    var parsedColor = parseToRgb(color);
    var alpha = typeof parsedColor.alpha === "number" ? parsedColor.alpha : 1;
    var colorWithAlpha = _extends({}, parsedColor, {
      alpha: guard(0, 1, +(alpha * 100 - parseFloat(amount) * 100).toFixed(2) / 100)
    });
    return rgba(colorWithAlpha);
  }
  curry(transparentize);
  function size(height, width) {
    if (width === void 0) {
      width = height;
    }
    return {
      height,
      width
    };
  }
  const akarIconsMiniplayer = (props) => /* @__PURE__ */ jsx("svg", {
    viewBox: "0 0 24 24",
    width: "1.2em",
    height: "1.2em",
    ...props,
    children: /* @__PURE__ */ jsxs("g", {
      fill: "none",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      children: [/* @__PURE__ */ jsx("rect", {
        width: 20,
        height: 16,
        x: 2,
        y: 4,
        rx: 2
      }), /* @__PURE__ */ jsx("rect", {
        width: 9,
        height: 7,
        x: 13,
        y: 13,
        rx: 2
      })]
    })
  });
  const eosIconsBackgroundTasks = (props) => /* @__PURE__ */ jsxs("svg", {
    viewBox: "0 0 24 24",
    width: "1.2em",
    height: "1.2em",
    ...props,
    children: [/* @__PURE__ */ jsx("path", {
      fill: "currentColor",
      d: "M6 3h8.99v1.5H6zM2.99 6h1.5v1.5h-1.5zm0-3h1.5v1.5h-1.5zm0 6.01H4.5v1.5H2.99z"
    }), /* @__PURE__ */ jsx("path", {
      fill: "currentColor",
      d: "M4.5 12h-3V1.49h15V6H18V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v9.48a2 2 0 0 0 2 2h2.5Z"
    }), /* @__PURE__ */ jsx("path", {
      fill: "currentColor",
      d: "M22 7.5H8a2 2 0 0 0-2 2V19a2 2 0 0 0 2 2h5.53v1.53H12V24h6v-1.49h-1.5V21H22a2 2 0 0 0 2-2V9.5a2 2 0 0 0-2-2m.51 12h-15V9h15Z"
    })]
  });
  const riFullscreenFill = (props) => /* @__PURE__ */ jsx("svg", {
    viewBox: "0 0 24 24",
    width: "1.2em",
    height: "1.2em",
    ...props,
    children: /* @__PURE__ */ jsx("path", {
      fill: "currentColor",
      d: "M16 3h6v6h-2V5h-4zM2 3h6v2H4v4H2zm18 16v-4h2v6h-6v-2zM4 19h4v2H2v-6h2z"
    })
  });
  const borderRadiusIdentifier = "--video-card-border-radius";
  const borderRadiusValue = `var(${borderRadiusIdentifier})`;
  const STAT_NUMBER_FALLBACK = "0";
  const PLAYER_SCREEN_MODE = "player-screen-mode";
  var PlayerScreenMode = /* @__PURE__ */ ((PlayerScreenMode2) => {
    PlayerScreenMode2["Normal"] = "normal";
    PlayerScreenMode2["Wide"] = "wide";
    PlayerScreenMode2["WebFullscreen"] = "web";
    PlayerScreenMode2["Fullscreen"] = "full";
    return PlayerScreenMode2;
  })(PlayerScreenMode || {});
  var VideoLinkOpenMode = /* @__PURE__ */ ((VideoLinkOpenMode2) => {
    VideoLinkOpenMode2["Normal"] = "Normal";
    VideoLinkOpenMode2["NormalWebFullscreen"] = "NormalWebFullscreen";
    VideoLinkOpenMode2["Popup"] = "Popup";
    VideoLinkOpenMode2["Background"] = "Background";
    VideoLinkOpenMode2["Iina"] = "Iina";
    return VideoLinkOpenMode2;
  })(VideoLinkOpenMode || {});
  const VideoLinkOpenModeKey = Object.entries(VideoLinkOpenMode).reduce((record, [key2, value]) => {
    return {
      ...record,
      [value]: `LinkOpenMode.${key2}`
    };
  }, {});
  const VideoLinkOpenModeConfig = {
    [
      "Normal"
      /* Normal */
    ]: {
      icon: /* @__PURE__ */ jsx(OpenExternalLinkIcon, {
        ...size(16)
      }),
      label: "打开",
      desc: "默认新窗口打开"
    },
    [
      "NormalWebFullscreen"
      /* NormalWebFullscreen */
    ]: {
      icon: /* @__PURE__ */ jsx(riFullscreenFill, {
        ...size(15)
      }),
      label: "打开-网页全屏",
      desc: /* @__PURE__ */ jsx(Fragment, {
        children: "默认新窗口打开, 打开后自动网页全屏"
      })
    },
    [
      "Popup"
      /* Popup */
    ]: {
      icon: /* @__PURE__ */ jsx(akarIconsMiniplayer, {
        ...size(15)
      }),
      label: "小窗打开",
      desc: /* @__PURE__ */ jsxs(Fragment, {
        children: ["当", " ", /* @__PURE__ */ jsx("a", {
          href: "https://developer.chrome.com/docs/web-platform/document-picture-in-picture",
          target: "_blank",
          children: "画中画窗口 API"
        }), " ", "可用时, 会使用画中画窗口的形式: 窗口置顶 + 播放页网页全屏.", /* @__PURE__ */ jsx("br", {}), "当该 API 不可用时, 会使用 popup window + 播放页网页全屏 的形式."]
      })
    },
    [
      "Background"
      /* Background */
    ]: {
      icon: /* @__PURE__ */ jsx(eosIconsBackgroundTasks, {
        ...size(15)
      }),
      label: "后台打开"
    },
    [
      "Iina"
      /* Iina */
    ]: {
      icon: /* @__PURE__ */ jsx(PlayerIcon, {
        ...size(15)
      }),
      label: "在 IINA 中打开",
      enabled: isMac,
      desc: /* @__PURE__ */ jsx(Fragment, {
        children: /* @__PURE__ */ jsx("a", {
          href: "https://github.com/magicdawn/bilibili-app-recommend/blob/main/notes/iina.md",
          target: "_blank",
          children: "macOS IINA 设置教程"
        })
      })
    }
  };
  const defaultEmitter = mitt();
  var EAppApiDevice = /* @__PURE__ */ ((EAppApiDevice2) => {
    EAppApiDevice2["android"] = "android";
    EAppApiDevice2["ipad"] = "ipad";
    return EAppApiDevice2;
  })(EAppApiDevice || {});
  var EApiType = /* @__PURE__ */ ((EApiType2) => {
    EApiType2["Separator"] = "separator";
    EApiType2["App"] = "app";
    EApiType2["Pc"] = "pc";
    EApiType2["Dynamic"] = "dynamic";
    EApiType2["Watchlater"] = "watchlater";
    EApiType2["Fav"] = "fav";
    EApiType2["PopularGeneral"] = "popular-general";
    EApiType2["PopularWeekly"] = "popular-weekly";
    EApiType2["Ranking"] = "ranking";
    EApiType2["Live"] = "live";
    return EApiType2;
  })(EApiType || {});
  function minmax(value, min, max) {
    if (value < min) {
      return min;
    } else if (value > max) {
      return max;
    } else {
      return value;
    }
  }
  const TRACK_MEMO_SYMBOL = Symbol();
  const GET_ORIGINAL_SYMBOL = Symbol();
  const AFFECTED_PROPERTY = "a";
  const IS_TARGET_COPIED_PROPERTY = "f";
  const PROXY_PROPERTY = "p";
  const PROXY_CACHE_PROPERTY = "c";
  const TARGET_CACHE_PROPERTY = "t";
  const NEXT_OBJECT_PROPERTY = "n";
  const CHANGED_PROPERTY = "g";
  const HAS_KEY_PROPERTY = "h";
  const ALL_OWN_KEYS_PROPERTY = "w";
  const HAS_OWN_KEY_PROPERTY = "o";
  const KEYS_PROPERTY = "k";
  let newProxy$1 = (target, handler) => new Proxy(target, handler);
  const getProto = Object.getPrototypeOf;
  const objectsToTrack = /* @__PURE__ */ new WeakMap();
  const isObjectToTrack = (obj) => obj && (objectsToTrack.has(obj) ? objectsToTrack.get(obj) : getProto(obj) === Object.prototype || getProto(obj) === Array.prototype);
  const isObject$2 = (x2) => typeof x2 === "object" && x2 !== null;
  const needsToCopyTargetObject = (obj) => Object.values(Object.getOwnPropertyDescriptors(obj)).some((descriptor) => !descriptor.configurable && !descriptor.writable);
  const copyTargetObject = (obj) => {
    if (Array.isArray(obj)) {
      return Array.from(obj);
    }
    const descriptors2 = Object.getOwnPropertyDescriptors(obj);
    Object.values(descriptors2).forEach((desc) => {
      desc.configurable = true;
    });
    return Object.create(getProto(obj), descriptors2);
  };
  const createProxyHandler = (origObj, isTargetCopied) => {
    const state = {
      [IS_TARGET_COPIED_PROPERTY]: isTargetCopied
    };
    let trackObject = false;
    const recordUsage = (type, key2) => {
      if (!trackObject) {
        let used = state[AFFECTED_PROPERTY].get(origObj);
        if (!used) {
          used = {};
          state[AFFECTED_PROPERTY].set(origObj, used);
        }
        if (type === ALL_OWN_KEYS_PROPERTY) {
          used[ALL_OWN_KEYS_PROPERTY] = true;
        } else {
          let set = used[type];
          if (!set) {
            set = /* @__PURE__ */ new Set();
            used[type] = set;
          }
          set.add(key2);
        }
      }
    };
    const recordObjectAsUsed = () => {
      trackObject = true;
      state[AFFECTED_PROPERTY].delete(origObj);
    };
    const handler = {
      get(target, key2) {
        if (key2 === GET_ORIGINAL_SYMBOL) {
          return origObj;
        }
        recordUsage(KEYS_PROPERTY, key2);
        return createProxy(Reflect.get(target, key2), state[AFFECTED_PROPERTY], state[PROXY_CACHE_PROPERTY], state[TARGET_CACHE_PROPERTY]);
      },
      has(target, key2) {
        if (key2 === TRACK_MEMO_SYMBOL) {
          recordObjectAsUsed();
          return true;
        }
        recordUsage(HAS_KEY_PROPERTY, key2);
        return Reflect.has(target, key2);
      },
      getOwnPropertyDescriptor(target, key2) {
        recordUsage(HAS_OWN_KEY_PROPERTY, key2);
        return Reflect.getOwnPropertyDescriptor(target, key2);
      },
      ownKeys(target) {
        recordUsage(ALL_OWN_KEYS_PROPERTY);
        return Reflect.ownKeys(target);
      }
    };
    if (isTargetCopied) {
      handler.set = handler.deleteProperty = () => false;
    }
    return [handler, state];
  };
  const getOriginalObject = (obj) => (
    // unwrap proxy
    obj[GET_ORIGINAL_SYMBOL] || // otherwise
    obj
  );
  const createProxy = (obj, affected, proxyCache2, targetCache2) => {
    if (!isObjectToTrack(obj)) return obj;
    let targetAndCopied = targetCache2 && targetCache2.get(obj);
    if (!targetAndCopied) {
      const target2 = getOriginalObject(obj);
      if (needsToCopyTargetObject(target2)) {
        targetAndCopied = [target2, copyTargetObject(target2)];
      } else {
        targetAndCopied = [target2];
      }
      targetCache2 === null || targetCache2 === void 0 ? void 0 : targetCache2.set(obj, targetAndCopied);
    }
    const [target, copiedTarget] = targetAndCopied;
    let handlerAndState = proxyCache2 && proxyCache2.get(target);
    if (!handlerAndState || handlerAndState[1][IS_TARGET_COPIED_PROPERTY] !== !!copiedTarget) {
      handlerAndState = createProxyHandler(target, !!copiedTarget);
      handlerAndState[1][PROXY_PROPERTY] = newProxy$1(copiedTarget || target, handlerAndState[0]);
      if (proxyCache2) {
        proxyCache2.set(target, handlerAndState);
      }
    }
    handlerAndState[1][AFFECTED_PROPERTY] = affected;
    handlerAndState[1][PROXY_CACHE_PROPERTY] = proxyCache2;
    handlerAndState[1][TARGET_CACHE_PROPERTY] = targetCache2;
    return handlerAndState[1][PROXY_PROPERTY];
  };
  const isAllOwnKeysChanged = (prevObj, nextObj) => {
    const prevKeys = Reflect.ownKeys(prevObj);
    const nextKeys = Reflect.ownKeys(nextObj);
    return prevKeys.length !== nextKeys.length || prevKeys.some((k2, i) => k2 !== nextKeys[i]);
  };
  const isChanged = (prevObj, nextObj, affected, cache2, isEqual3 = Object.is) => {
    if (isEqual3(prevObj, nextObj)) {
      return false;
    }
    if (!isObject$2(prevObj) || !isObject$2(nextObj)) return true;
    const used = affected.get(getOriginalObject(prevObj));
    if (!used) return true;
    if (cache2) {
      const hit = cache2.get(prevObj);
      if (hit && hit[NEXT_OBJECT_PROPERTY] === nextObj) {
        return hit[CHANGED_PROPERTY];
      }
      cache2.set(prevObj, {
        [NEXT_OBJECT_PROPERTY]: nextObj,
        [CHANGED_PROPERTY]: false
      });
    }
    let changed = null;
    try {
      for (const key2 of used[HAS_KEY_PROPERTY] || []) {
        changed = Reflect.has(prevObj, key2) !== Reflect.has(nextObj, key2);
        if (changed) return changed;
      }
      if (used[ALL_OWN_KEYS_PROPERTY] === true) {
        changed = isAllOwnKeysChanged(prevObj, nextObj);
        if (changed) return changed;
      } else {
        for (const key2 of used[HAS_OWN_KEY_PROPERTY] || []) {
          const hasPrev = !!Reflect.getOwnPropertyDescriptor(prevObj, key2);
          const hasNext = !!Reflect.getOwnPropertyDescriptor(nextObj, key2);
          changed = hasPrev !== hasNext;
          if (changed) return changed;
        }
      }
      for (const key2 of used[KEYS_PROPERTY] || []) {
        changed = isChanged(prevObj[key2], nextObj[key2], affected, cache2, isEqual3);
        if (changed) return changed;
      }
      if (changed === null) changed = true;
      return changed;
    } finally {
      if (cache2) {
        cache2.set(prevObj, {
          [NEXT_OBJECT_PROPERTY]: nextObj,
          [CHANGED_PROPERTY]: changed
        });
      }
    }
  };
  const getUntracked = (obj) => {
    if (isObjectToTrack(obj)) {
      return obj[GET_ORIGINAL_SYMBOL] || null;
    }
    return null;
  };
  const markToTrack = (obj, mark = true) => {
    objectsToTrack.set(obj, mark);
  };
  const affectedToPathList = (obj, affected, onlyWithValues) => {
    const list = [];
    const seen = /* @__PURE__ */ new WeakSet();
    const walk = (x2, path) => {
      var _a2, _b2, _c2;
      if (seen.has(x2)) {
        return;
      }
      if (isObject$2(x2)) {
        seen.add(x2);
      }
      const used = isObject$2(x2) && affected.get(getOriginalObject(x2));
      if (used) {
        (_a2 = used[HAS_KEY_PROPERTY]) === null || _a2 === void 0 ? void 0 : _a2.forEach((key2) => {
          const segment = `:has(${String(key2)})`;
          list.push(path ? [...path, segment] : [segment]);
        });
        if (used[ALL_OWN_KEYS_PROPERTY] === true) {
          const segment = ":ownKeys";
          list.push(path ? [...path, segment] : [segment]);
        } else {
          (_b2 = used[HAS_OWN_KEY_PROPERTY]) === null || _b2 === void 0 ? void 0 : _b2.forEach((key2) => {
            const segment = `:hasOwn(${String(key2)})`;
            list.push(path ? [...path, segment] : [segment]);
          });
        }
        (_c2 = used[KEYS_PROPERTY]) === null || _c2 === void 0 ? void 0 : _c2.forEach((key2) => {
          if ("value" in (Object.getOwnPropertyDescriptor(x2, key2) || {})) {
            walk(x2[key2], path ? [...path, key2] : [key2]);
          }
        });
      } else if (path) {
        list.push(path);
      }
    };
    walk(obj);
    return list;
  };
  const __vite_import_meta_env__$1 = { "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SSR": false };
  const isObject$1 = (x2) => typeof x2 === "object" && x2 !== null;
  const canProxyDefault = (x2) => isObject$1(x2) && !refSet.has(x2) && (Array.isArray(x2) || !(Symbol.iterator in x2)) && !(x2 instanceof WeakMap) && !(x2 instanceof WeakSet) && !(x2 instanceof Error) && !(x2 instanceof Number) && !(x2 instanceof Date) && !(x2 instanceof String) && !(x2 instanceof RegExp) && !(x2 instanceof ArrayBuffer) && !(x2 instanceof Promise);
  const createSnapshotDefault = (target, version) => {
    const cache2 = snapCache.get(target);
    if ((cache2 == null ? void 0 : cache2[0]) === version) {
      return cache2[1];
    }
    const snap = Array.isArray(target) ? [] : Object.create(Object.getPrototypeOf(target));
    markToTrack(snap, true);
    snapCache.set(target, [version, snap]);
    Reflect.ownKeys(target).forEach((key2) => {
      if (Object.getOwnPropertyDescriptor(snap, key2)) {
        return;
      }
      const value = Reflect.get(target, key2);
      const { enumerable } = Reflect.getOwnPropertyDescriptor(
        target,
        key2
      );
      const desc = {
        value,
        enumerable,
        // This is intentional to avoid copying with proxy-compare.
        // It's still non-writable, so it avoids assigning a value.
        configurable: true
      };
      if (refSet.has(value)) {
        markToTrack(value, false);
      } else if (proxyStateMap.has(value)) {
        const [target2, ensureVersion] = proxyStateMap.get(
          value
        );
        desc.value = createSnapshot(target2, ensureVersion());
      }
      Object.defineProperty(snap, key2, desc);
    });
    return Object.preventExtensions(snap);
  };
  const createHandlerDefault = (isInitializing, addPropListener, removePropListener, notifyUpdate) => ({
    deleteProperty(target, prop) {
      const prevValue = Reflect.get(target, prop);
      removePropListener(prop);
      const deleted = Reflect.deleteProperty(target, prop);
      if (deleted) {
        notifyUpdate(["delete", [prop], prevValue]);
      }
      return deleted;
    },
    set(target, prop, value, receiver) {
      const hasPrevValue = !isInitializing() && Reflect.has(target, prop);
      const prevValue = Reflect.get(target, prop, receiver);
      if (hasPrevValue && (objectIs(prevValue, value) || proxyCache.has(value) && objectIs(prevValue, proxyCache.get(value)))) {
        return true;
      }
      removePropListener(prop);
      if (isObject$1(value)) {
        value = getUntracked(value) || value;
      }
      const nextValue = !proxyStateMap.has(value) && canProxy(value) ? proxy(value) : value;
      addPropListener(prop, nextValue);
      Reflect.set(target, prop, nextValue, receiver);
      notifyUpdate(["set", [prop], value, prevValue]);
      return true;
    }
  });
  const proxyStateMap = /* @__PURE__ */ new WeakMap();
  const refSet = /* @__PURE__ */ new WeakSet();
  const snapCache = /* @__PURE__ */ new WeakMap();
  const versionHolder = [1, 1];
  const proxyCache = /* @__PURE__ */ new WeakMap();
  let objectIs = Object.is;
  let newProxy = (target, handler) => new Proxy(target, handler);
  let canProxy = canProxyDefault;
  let createSnapshot = createSnapshotDefault;
  let createHandler = createHandlerDefault;
  function proxy(baseObject = {}) {
    if (!isObject$1(baseObject)) {
      throw new Error("object required");
    }
    const found = proxyCache.get(baseObject);
    if (found) {
      return found;
    }
    let version = versionHolder[0];
    const listeners2 = /* @__PURE__ */ new Set();
    const notifyUpdate = (op, nextVersion = ++versionHolder[0]) => {
      if (version !== nextVersion) {
        version = nextVersion;
        listeners2.forEach((listener) => listener(op, nextVersion));
      }
    };
    let checkVersion = versionHolder[1];
    const ensureVersion = (nextCheckVersion = ++versionHolder[1]) => {
      if (checkVersion !== nextCheckVersion && !listeners2.size) {
        checkVersion = nextCheckVersion;
        propProxyStates.forEach(([propProxyState]) => {
          const propVersion = propProxyState[1](nextCheckVersion);
          if (propVersion > version) {
            version = propVersion;
          }
        });
      }
      return version;
    };
    const createPropListener = (prop) => (op, nextVersion) => {
      const newOp = [...op];
      newOp[1] = [prop, ...newOp[1]];
      notifyUpdate(newOp, nextVersion);
    };
    const propProxyStates = /* @__PURE__ */ new Map();
    const addPropListener = (prop, propValue) => {
      const propProxyState = !refSet.has(propValue) && proxyStateMap.get(propValue);
      if (propProxyState) {
        if ((__vite_import_meta_env__$1 ? "production" : void 0) !== "production" && propProxyStates.has(prop)) {
          throw new Error("prop listener already exists");
        }
        if (listeners2.size) {
          const remove = propProxyState[2](createPropListener(prop));
          propProxyStates.set(prop, [propProxyState, remove]);
        } else {
          propProxyStates.set(prop, [propProxyState]);
        }
      }
    };
    const removePropListener = (prop) => {
      var _a2;
      const entry = propProxyStates.get(prop);
      if (entry) {
        propProxyStates.delete(prop);
        (_a2 = entry[1]) == null ? void 0 : _a2.call(entry);
      }
    };
    const addListener = (listener) => {
      listeners2.add(listener);
      if (listeners2.size === 1) {
        propProxyStates.forEach(([propProxyState, prevRemove], prop) => {
          if ((__vite_import_meta_env__$1 ? "production" : void 0) !== "production" && prevRemove) {
            throw new Error("remove already exists");
          }
          const remove = propProxyState[2](createPropListener(prop));
          propProxyStates.set(prop, [propProxyState, remove]);
        });
      }
      const removeListener = () => {
        listeners2.delete(listener);
        if (listeners2.size === 0) {
          propProxyStates.forEach(([propProxyState, remove], prop) => {
            if (remove) {
              remove();
              propProxyStates.set(prop, [propProxyState]);
            }
          });
        }
      };
      return removeListener;
    };
    let initializing = true;
    const handler = createHandler(
      () => initializing,
      addPropListener,
      removePropListener,
      notifyUpdate
    );
    const proxyObject = newProxy(baseObject, handler);
    proxyCache.set(baseObject, proxyObject);
    const proxyState = [baseObject, ensureVersion, addListener];
    proxyStateMap.set(proxyObject, proxyState);
    Reflect.ownKeys(baseObject).forEach((key2) => {
      const desc = Object.getOwnPropertyDescriptor(
        baseObject,
        key2
      );
      if ("value" in desc && desc.writable) {
        proxyObject[key2] = baseObject[key2];
      }
    });
    initializing = false;
    return proxyObject;
  }
  function subscribe$3(proxyObject, callback, notifyInSync) {
    const proxyState = proxyStateMap.get(proxyObject);
    if ((__vite_import_meta_env__$1 ? "production" : void 0) !== "production" && !proxyState) {
      console.warn("Please use proxy object");
    }
    let promise;
    const ops = [];
    const addListener = proxyState[2];
    let isListenerActive = false;
    const listener = (op) => {
      ops.push(op);
      if (!promise) {
        promise = Promise.resolve().then(() => {
          promise = void 0;
          if (isListenerActive) {
            callback(ops.splice(0));
          }
        });
      }
    };
    const removeListener = addListener(listener);
    isListenerActive = true;
    return () => {
      isListenerActive = false;
      removeListener();
    };
  }
  function snapshot(proxyObject) {
    const proxyState = proxyStateMap.get(proxyObject);
    if ((__vite_import_meta_env__$1 ? "production" : void 0) !== "production" && !proxyState) {
      console.warn("Please use proxy object");
    }
    const [target, ensureVersion] = proxyState;
    return createSnapshot(target, ensureVersion());
  }
  const __vite_import_meta_env__ = { "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SSR": false };
  const useAffectedDebugValue = (state, affected) => {
    const pathList = React__default.useRef();
    React__default.useEffect(() => {
      pathList.current = affectedToPathList(state, affected);
    });
    React__default.useDebugValue(pathList.current);
  };
  const condUseAffectedDebugValue = useAffectedDebugValue;
  const targetCache = /* @__PURE__ */ new WeakMap();
  function useSnapshot(proxyObject, options) {
    const notifyInSync = void 0;
    const affected = React__default.useMemo(
      () => proxyObject && /* @__PURE__ */ new WeakMap(),
      [proxyObject]
    );
    const lastSnapshot = React__default.useRef();
    let inRender = true;
    const currSnapshot = React__default.useSyncExternalStore(
      React__default.useCallback(
        (callback) => {
          const unsub = subscribe$3(proxyObject, callback);
          callback();
          return unsub;
        },
        [proxyObject, notifyInSync]
      ),
      () => {
        const nextSnapshot = snapshot(proxyObject);
        try {
          if (!inRender && lastSnapshot.current && !isChanged(
            lastSnapshot.current,
            nextSnapshot,
            affected,
            /* @__PURE__ */ new WeakMap()
          )) {
            return lastSnapshot.current;
          }
        } catch (e2) {
        }
        return nextSnapshot;
      },
      () => snapshot(proxyObject)
    );
    inRender = false;
    React__default.useLayoutEffect(() => {
      lastSnapshot.current = currSnapshot;
    });
    if ((__vite_import_meta_env__ ? "production" : void 0) !== "production") {
      condUseAffectedDebugValue(currSnapshot, affected);
    }
    const proxyCache2 = React__default.useMemo(() => /* @__PURE__ */ new WeakMap(), []);
    return createProxy(currSnapshot, affected, proxyCache2, targetCache);
  }
  function subscribeKey(proxyObject, key2, callback, notifyInSync) {
    let prevValue = proxyObject[key2];
    return subscribe$3(
      proxyObject,
      () => {
        const nextValue = proxyObject[key2];
        if (!Object.is(prevValue, nextValue)) {
          callback(prevValue = nextValue);
        }
      }
    );
  }
  function proxySet(initialValues) {
    const set = proxy({
      data: Array.from(new Set(initialValues)),
      has(value) {
        return this.data.indexOf(value) !== -1;
      },
      add(value) {
        let hasProxy = false;
        if (typeof value === "object" && value !== null) {
          hasProxy = this.data.indexOf(proxy(value)) !== -1;
        }
        if (this.data.indexOf(value) === -1 && !hasProxy) {
          this.data.push(value);
        }
        return this;
      },
      delete(value) {
        const index = this.data.indexOf(value);
        if (index === -1) {
          return false;
        }
        this.data.splice(index, 1);
        return true;
      },
      clear() {
        this.data.splice(0);
      },
      get size() {
        return this.data.length;
      },
      forEach(cb) {
        this.data.forEach((value) => {
          cb(value, value, this);
        });
      },
      get [Symbol.toStringTag]() {
        return "Set";
      },
      toJSON() {
        return new Set(this.data);
      },
      [Symbol.iterator]() {
        return this.data[Symbol.iterator]();
      },
      values() {
        return this.data.values();
      },
      keys() {
        return this.data.values();
      },
      entries() {
        return new Set(this.data).entries();
      }
    });
    Object.defineProperties(set, {
      data: {
        enumerable: false
      },
      size: {
        enumerable: false
      },
      toJSON: {
        enumerable: false
      }
    });
    Object.seal(set);
    return set;
  }
  function proxyMap(entries) {
    const map = proxy({
      data: Array.from([]),
      has(key2) {
        return this.data.some((p2) => p2[0] === key2);
      },
      set(key2, value) {
        const record = this.data.find((p2) => p2[0] === key2);
        if (record) {
          record[1] = value;
        } else {
          this.data.push([key2, value]);
        }
        return this;
      },
      get(key2) {
        var _a2;
        return (_a2 = this.data.find((p2) => p2[0] === key2)) == null ? void 0 : _a2[1];
      },
      delete(key2) {
        const index = this.data.findIndex((p2) => p2[0] === key2);
        if (index === -1) {
          return false;
        }
        this.data.splice(index, 1);
        return true;
      },
      clear() {
        this.data.splice(0);
      },
      get size() {
        return this.data.length;
      },
      toJSON() {
        return new Map(this.data);
      },
      forEach(cb) {
        this.data.forEach((p2) => {
          cb(p2[1], p2[0], this);
        });
      },
      keys() {
        return this.data.map((p2) => p2[0]).values();
      },
      values() {
        return this.data.map((p2) => p2[1]).values();
      },
      entries() {
        return new Map(this.data).entries();
      },
      get [Symbol.toStringTag]() {
        return "Map";
      },
      [Symbol.iterator]() {
        return this.entries();
      }
    });
    Object.defineProperties(map, {
      data: {
        enumerable: false
      },
      size: {
        enumerable: false
      },
      toJSON: {
        enumerable: false
      }
    });
    Object.seal(map);
    return map;
  }
  function valtioFactory(computeValue) {
    const state = proxy({
      value: computeValue()
    });
    function use() {
      return useSnapshot(state).value;
    }
    function get() {
      return state.value;
    }
    function update() {
      state.value = computeValue();
    }
    const updateThrottled = lodash.throttle(update, 100, {
      leading: true,
      trailing: true
    });
    return {
      state,
      use,
      get,
      update,
      updateThrottled
    };
  }
  function subscribeOnKeys(state, keys, callback) {
    let prevVal = lodash.pick(snapshot(state), keys);
    subscribe$3(state, () => {
      const snap = snapshot(state);
      const val = lodash.pick(snap, keys);
      if (!lodash.isEqual(prevVal, val)) {
        callback(snap);
      }
      prevVal = val;
    });
  }
  async function proxyWithGmStorage(initialVaue, storageKey) {
    const allowedKeys = Object.keys(initialVaue);
    const savedValue = lodash.pick(await GM.getValue(storageKey) || {}, allowedKeys);
    const p2 = proxy({
      ...initialVaue,
      ...savedValue
    });
    setTimeout(() => {
      subscribe$3(p2, () => {
        const val = snapshot(p2);
        GM.setValue(storageKey, val);
      });
    });
    return p2;
  }
  async function proxySetWithGmStorage(storageKey) {
    const savedValue = await GM.getValue(storageKey) || [];
    const p2 = proxySet(savedValue);
    setTimeout(() => {
      subscribe$3(p2, () => {
        const val = Array.from(snapshot(p2));
        GM.setValue(storageKey, val);
      });
    });
    return p2;
  }
  const defaultHeader = () => document.querySelector(".bili-header__bar");
  function isUsingCustomHeader() {
    const el = defaultHeader();
    return Boolean(el && window.getComputedStyle(el).display === "none");
  }
  const $usingEvolevdHeader = valtioFactory(isUsingCustomHeader);
  function calcHeaderHeight() {
    if (!isUsingCustomHeader()) return 64;
    const fixed = document.body.classList.contains("fixed-navbar");
    if (!fixed) return 0;
    const heightDef = document.documentElement.style.getPropertyValue("--navbar-height");
    if (!heightDef) return 50;
    const height = Number(heightDef.replace("px", ""));
    if (isNaN(height)) return 50;
    return height;
  }
  const $headerHeight = valtioFactory(calcHeaderHeight);
  function calcHeaderWidth() {
    const paddingDef = document.documentElement.style.getPropertyValue("--navbar-bounds-padding");
    if (!paddingDef) return;
    const percent = minmax(Number(paddingDef.replace("%", "")), 2, 10);
    const width = 100 - percent * 2;
    return width;
  }
  const $headerWidth = valtioFactory(calcHeaderWidth);
  function useBackToTopRight() {
    const width = $headerWidth.use();
    const {
      styleUseCustomGrid,
      pureRecommend
    } = useSettingsSnapshot();
    if (!pureRecommend || !styleUseCustomGrid) return;
    if (!width) return;
    const rest = (1 - width / 100) / 2 * window.innerWidth + /* padding */
    10;
    const backToTopWidth = 40;
    if (rest > backToTopWidth + /** default back-top-right */
    24 + /** visual padding */
    5) {
      return;
    }
    if (rest < backToTopWidth) {
      return 0;
    }
    const right = Math.floor((rest - backToTopWidth) / 2);
    return right;
  }
  function calcEvolvedThemeColor() {
    return window.getComputedStyle(document.documentElement).getPropertyValue("--theme-color");
  }
  const $evolvedThemeColor = valtioFactory(calcEvolvedThemeColor);
  function action() {
    $usingEvolevdHeader.updateThrottled();
    $headerHeight.updateThrottled();
    $headerWidth.updateThrottled();
    $evolvedThemeColor.updateThrottled();
  }
  const ob$1 = new MutationObserver(() => action());
  ob$1.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["style"]
  });
  ob$1.observe(document.body, {
    attributes: true,
    attributeFilter: ["class"]
  });
  window.addEventListener("unload", () => {
    ob$1.disconnect();
  });
  document.body.addEventListener("click", (e2) => {
    const el = e2.target;
    const isClickOnButton = (el2) => !!(el2 == null ? void 0 : el2.matches(".be-button.ok"));
    if (!isClickOnButton(el) && !isClickOnButton(el.parentElement)) return;
    if (!el.closest(".be-popup.picker.open")) return;
    setTimeout($evolvedThemeColor.updateThrottled, 1e3);
  }, {
    capture: true,
    passive: true
  });
  const LX_THEMES = [
    {
      id: "green",
      name: "绿意盎然",
      isDark: false,
      isCustom: false,
      colorPrimary: "rgb(77, 175, 124)",
      colorTheme: "rgb(77, 175, 124)"
    },
    {
      id: "blue",
      name: "蓝田生玉",
      isDark: false,
      isCustom: false,
      colorPrimary: "rgb(52, 152, 219)",
      colorTheme: "rgb(52, 152, 219)"
    },
    {
      id: "blue_plus",
      name: "蛋雅深蓝",
      isDark: false,
      isCustom: false,
      colorPrimary: "rgb(77, 131, 175)",
      colorTheme: "rgb(77, 131, 175)"
    },
    {
      id: "orange",
      name: "橙黄橘绿",
      isDark: false,
      isCustom: false,
      colorPrimary: "rgb(245, 171, 53)",
      colorTheme: "rgb(245, 171, 53)"
    },
    {
      id: "red",
      name: "热情似火",
      isDark: false,
      isCustom: false,
      colorPrimary: "rgb(214, 69, 65)",
      colorTheme: "rgb(214, 69, 65)"
    },
    {
      id: "pink",
      name: "粉装玉琢",
      isDark: false,
      isCustom: false,
      colorPrimary: "rgb(241, 130, 141)",
      colorTheme: "rgb(241, 130, 141)"
    },
    {
      id: "purple",
      name: "重斤球紫",
      isDark: false,
      isCustom: false,
      colorPrimary: "rgb(155, 89, 182)",
      colorTheme: "rgb(155, 89, 182)"
    },
    {
      id: "grey",
      name: "灰常美丽",
      isDark: false,
      isCustom: false,
      colorPrimary: "rgb(108, 122, 137)",
      colorTheme: "rgb(108, 122, 137)"
    },
    {
      id: "ming",
      name: "青出于黑",
      isDark: false,
      isCustom: false,
      colorPrimary: "rgb(51, 110, 123)",
      colorTheme: "rgb(51, 110, 123)"
    },
    {
      id: "blue2",
      name: "清热板蓝",
      isDark: false,
      isCustom: false,
      colorPrimary: "rgb(79, 98, 208)",
      colorTheme: "rgb(79, 98, 208)"
    },
    {
      id: "black",
      name: "黑灯瞎火",
      isDark: true,
      isCustom: false,
      colorPrimary: "rgb(150, 150, 150)",
      colorTheme: "rgb(59,59,59)"
    },
    {
      id: "mid_autumn",
      name: "月里嫦娥",
      isDark: false,
      isCustom: false,
      colorPrimary: "rgb(74, 55, 82)",
      colorTheme: "rgb(74, 55, 82)"
    },
    {
      id: "naruto",
      name: "木叶之村",
      isDark: false,
      isCustom: false,
      colorPrimary: "rgb(87, 144, 167)",
      colorTheme: "rgb(87, 144, 167)"
    },
    {
      id: "china_ink",
      name: "近墨者黑",
      isDark: false,
      isCustom: false,
      colorPrimary: "rgba(47, 47, 47, 1)",
      colorTheme: "rgba(47, 47, 47, 1)"
    },
    {
      id: "happy_new_year",
      name: "新年快乐",
      isDark: false,
      isCustom: false,
      colorPrimary: "rgb(192, 57, 43)",
      colorTheme: "rgb(192, 57, 43)"
    }
  ];
  const colorPrimaryIdentifier = `--${APP_NAME}-color-primary`;
  const colorPrimaryValue = `var(${colorPrimaryIdentifier})`;
  const borderColorIdentifier = `--${APP_NAME}-border-color`;
  const borderColorValue = `var(${borderColorIdentifier})`;
  const DEFAULT_BILI_PINK_THEME = {
    id: "default-bili-pink",
    name: "B站粉",
    isDark: false,
    isCustom: false,
    colorPrimary: "#ff6699"
  };
  const COLOR_PICKER_THEME = {
    id: "color-picker",
    name: "自定义",
    isDark: false,
    isCustom: true,
    colorPrimary: "#ff6699"
  };
  function toThemes(groupName, definitionStr) {
    return definitionStr.split("\n").map((s2) => s2.trim()).filter(Boolean).map((line2) => {
      const [colorPrimary, name] = line2.split(" ").filter(Boolean);
      return {
        id: groupName + ":" + name,
        name,
        colorPrimary
      };
    });
  }
  const LongwashingGroupName = "UP长期洗涤";
  const LongwashingThemes = toThemes(LongwashingGroupName, `
  #0545b2 理想之蓝
  #f4cd00 柠檬黄
  #ef2729 石榴红
  #f89c00 鹿箭
  #233728 黛绿
  #f2b9b7 和熙粉
  #f3cc91 芝士黄
  #6b4c68 葡萄紫
  #ff7227 落日橙
  #004d62 碧海天
  #23909b 洗碧空
  #aeb400 芥丝绿
  #425a17 箬叶青

  #002fa7 克莱因蓝
  #003153 普鲁士蓝
  #01847f 马尔斯绿
  #fbd26a 申布伦黄
  #470024 勃艮第红
  #492d22 凡戴克棕
  `);
  const BIBIBILI_EVOLVED_SYNC_ID = "bilibili-evolved-sync";
  const ThemeGroups = [{
    name: "预设",
    themes: [DEFAULT_BILI_PINK_THEME, {
      id: "bilibili-blue",
      name: "B站蓝",
      colorPrimary: "#00aeec"
    }, {
      id: "app-靓紫",
      name: "靓紫",
      colorPrimary: "#8500ff"
    }, {
      id: BIBIBILI_EVOLVED_SYNC_ID,
      name: "B-Evolved",
      colorPrimary: "var(--theme-color, #f69)",
      tooltip: /* @__PURE__ */ jsxs(Fragment, {
        children: ["使用 Bilibili-Evolved 的主题色", /* @__PURE__ */ jsx("br", {}), "在 Bilibili-Evolved 设置中修改主题色后可能需要刷新页面同步"]
      })
    }, COLOR_PICKER_THEME]
  }, {
    name: "移动端",
    themes: [{
      id: "app-custom-高能红",
      name: "高能红",
      colorPrimary: "#fd453e"
    }, {
      id: "app-custom-咸蛋黄",
      name: "咸蛋黄",
      colorPrimary: "#ffc034"
    }, {
      id: "app-custom-早苗绿",
      name: "早苗绿",
      colorPrimary: "#85c255"
    }, {
      id: "app-custom-宝石蓝",
      name: "宝石蓝",
      colorPrimary: "#0095ef"
    }, {
      id: "app-custom-罗兰紫",
      name: "罗兰紫",
      colorPrimary: "#a029ac"
    }]
  }, {
    name: "LX Themes",
    themes: LX_THEMES,
    tooltip: /* @__PURE__ */ jsxs(Fragment, {
      children: ["提取自", " ", /* @__PURE__ */ jsx("a", {
        target: "_blank",
        href: "https://github.com/lyswhut/lx-music-desktop/",
        children: "lx-music-desktop"
      }), /* @__PURE__ */ jsx("br", {}), "Apache License 2.0"]
    })
  }, {
    name: LongwashingGroupName,
    themes: LongwashingThemes,
    tooltip: /* @__PURE__ */ jsxs(Fragment, {
      children: ["提取自", " ", /* @__PURE__ */ jsx("a", {
        target: "_blank",
        href: "https://www.bilibili.com/video/BV1g3411u7Lg/",
        children: "BV1g3411u7Lg"
      }), " ", "&", " ", /* @__PURE__ */ jsx("a", {
        target: "_blank",
        href: "https://www.bilibili.com/video/BV1xu411q7sU/",
        children: "BV1xu411q7sU"
      })]
    })
  }];
  const ALL_THEMES = ThemeGroups.map((x2) => x2.themes).flat();
  function useCurrentTheme() {
    let {
      theme: themeId,
      colorPickerThemeSelectedColor
    } = useSettingsSnapshot();
    themeId || (themeId = DEFAULT_BILI_PINK_THEME.id);
    return React__default.useMemo(() => {
      const theme2 = ALL_THEMES.find((t2) => t2.id === themeId) || DEFAULT_BILI_PINK_THEME;
      if (theme2.id === COLOR_PICKER_THEME.id && colorPickerThemeSelectedColor) {
        return {
          ...theme2,
          colorPrimary: colorPickerThemeSelectedColor
        };
      }
      return theme2;
    }, [themeId, colorPickerThemeSelectedColor]);
  }
  function useColorPrimaryHex() {
    const currentTheme = useCurrentTheme();
    const evolvedThemeColor = $evolvedThemeColor.use();
    let colorPrimary = currentTheme.colorPrimary;
    if (currentTheme.id === BIBIBILI_EVOLVED_SYNC_ID) {
      colorPrimary = evolvedThemeColor || DEFAULT_BILI_PINK_THEME.colorPrimary;
    }
    return colorPrimary;
  }
  var unitlessKeys = {
    animationIterationCount: 1,
    aspectRatio: 1,
    borderImageOutset: 1,
    borderImageSlice: 1,
    borderImageWidth: 1,
    boxFlex: 1,
    boxFlexGroup: 1,
    boxOrdinalGroup: 1,
    columnCount: 1,
    columns: 1,
    flex: 1,
    flexGrow: 1,
    flexPositive: 1,
    flexShrink: 1,
    flexNegative: 1,
    flexOrder: 1,
    gridRow: 1,
    gridRowEnd: 1,
    gridRowSpan: 1,
    gridRowStart: 1,
    gridColumn: 1,
    gridColumnEnd: 1,
    gridColumnSpan: 1,
    gridColumnStart: 1,
    msGridRow: 1,
    msGridRowSpan: 1,
    msGridColumn: 1,
    msGridColumnSpan: 1,
    fontWeight: 1,
    lineHeight: 1,
    opacity: 1,
    order: 1,
    orphans: 1,
    tabSize: 1,
    widows: 1,
    zIndex: 1,
    zoom: 1,
    WebkitLineClamp: 1,
    // SVG-related properties
    fillOpacity: 1,
    floodOpacity: 1,
    stopOpacity: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1,
    strokeMiterlimit: 1,
    strokeOpacity: 1,
    strokeWidth: 1
  };
  var isDevelopment = false;
  var hyphenateRegex = /[A-Z]|^ms/g;
  var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;
  var isCustomProperty2 = function isCustomProperty3(property) {
    return property.charCodeAt(1) === 45;
  };
  var isProcessableValue2 = function isProcessableValue3(value) {
    return value != null && typeof value !== "boolean";
  };
  var processStyleName = /* @__PURE__ */ memoize(function(styleName) {
    return isCustomProperty2(styleName) ? styleName : styleName.replace(hyphenateRegex, "-$&").toLowerCase();
  });
  var processStyleValue2 = function processStyleValue3(key2, value) {
    switch (key2) {
      case "animation":
      case "animationName": {
        if (typeof value === "string") {
          return value.replace(animationRegex, function(match2, p1, p2) {
            cursor = {
              name: p1,
              styles: p2,
              next: cursor
            };
            return p1;
          });
        }
      }
    }
    if (unitlessKeys[key2] !== 1 && !isCustomProperty2(key2) && typeof value === "number" && value !== 0) {
      return value + "px";
    }
    return value;
  };
  var noComponentSelectorMessage = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
  function handleInterpolation(mergedProps, registered, interpolation) {
    if (interpolation == null) {
      return "";
    }
    var componentSelector = interpolation;
    if (componentSelector.__emotion_styles !== void 0) {
      return componentSelector;
    }
    switch (typeof interpolation) {
      case "boolean": {
        return "";
      }
      case "object": {
        var keyframes = interpolation;
        if (keyframes.anim === 1) {
          cursor = {
            name: keyframes.name,
            styles: keyframes.styles,
            next: cursor
          };
          return keyframes.name;
        }
        var serializedStyles = interpolation;
        if (serializedStyles.styles !== void 0) {
          var next2 = serializedStyles.next;
          if (next2 !== void 0) {
            while (next2 !== void 0) {
              cursor = {
                name: next2.name,
                styles: next2.styles,
                next: cursor
              };
              next2 = next2.next;
            }
          }
          var styles2 = serializedStyles.styles + ";";
          return styles2;
        }
        return createStringFromObject(mergedProps, registered, interpolation);
      }
    }
    var asString = interpolation;
    if (registered == null) {
      return asString;
    }
    var cached = registered[asString];
    return cached !== void 0 ? cached : asString;
  }
  function createStringFromObject(mergedProps, registered, obj) {
    var string = "";
    if (Array.isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
        string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
      }
    } else {
      for (var key2 in obj) {
        var value = obj[key2];
        if (typeof value !== "object") {
          var asString = value;
          if (registered != null && registered[asString] !== void 0) {
            string += key2 + "{" + registered[asString] + "}";
          } else if (isProcessableValue2(asString)) {
            string += processStyleName(key2) + ":" + processStyleValue2(key2, asString) + ";";
          }
        } else {
          if (key2 === "NO_COMPONENT_SELECTOR" && isDevelopment) {
            throw new Error(noComponentSelectorMessage);
          }
          if (Array.isArray(value) && typeof value[0] === "string" && (registered == null || registered[value[0]] === void 0)) {
            for (var _i = 0; _i < value.length; _i++) {
              if (isProcessableValue2(value[_i])) {
                string += processStyleName(key2) + ":" + processStyleValue2(key2, value[_i]) + ";";
              }
            }
          } else {
            var interpolated = handleInterpolation(mergedProps, registered, value);
            switch (key2) {
              case "animation":
              case "animationName": {
                string += processStyleName(key2) + ":" + interpolated + ";";
                break;
              }
              default: {
                string += key2 + "{" + interpolated + "}";
              }
            }
          }
        }
      }
    }
    return string;
  }
  var labelPattern = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
  var cursor;
  function serializeStyles(args, registered, mergedProps) {
    if (args.length === 1 && typeof args[0] === "object" && args[0] !== null && args[0].styles !== void 0) {
      return args[0];
    }
    var stringMode = true;
    var styles2 = "";
    cursor = void 0;
    var strings = args[0];
    if (strings == null || strings.raw === void 0) {
      stringMode = false;
      styles2 += handleInterpolation(mergedProps, registered, strings);
    } else {
      var asTemplateStringsArr = strings;
      styles2 += asTemplateStringsArr[0];
    }
    for (var i = 1; i < args.length; i++) {
      styles2 += handleInterpolation(mergedProps, registered, args[i]);
      if (stringMode) {
        var templateStringsArr = strings;
        styles2 += templateStringsArr[i];
      }
    }
    labelPattern.lastIndex = 0;
    var identifierName = "";
    var match2;
    while ((match2 = labelPattern.exec(styles2)) !== null) {
      identifierName += "-" + match2[1];
    }
    var name = murmur2(styles2) + identifierName;
    return {
      name,
      styles: styles2,
      next: cursor
    };
  }
  function insertWithoutScoping(cache2, serialized) {
    if (cache2.inserted[serialized.name] === void 0) {
      return cache2.insert("", serialized, cache2.sheet, true);
    }
  }
  function merge$1(registered, css2, className) {
    var registeredStyles = [];
    var rawClassName = getRegisteredStyles(registered, registeredStyles, className);
    if (registeredStyles.length < 2) {
      return className;
    }
    return rawClassName + css2(registeredStyles);
  }
  var createEmotion = function createEmotion2(options) {
    var cache2 = createCache(options);
    cache2.sheet.speedy = function(value) {
      this.isSpeedy = value;
    };
    cache2.compat = true;
    var css2 = function css3() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      var serialized = serializeStyles(args, cache2.registered, void 0);
      insertStyles(cache2, serialized, false);
      return cache2.key + "-" + serialized.name;
    };
    var keyframes = function keyframes2() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      var serialized = serializeStyles(args, cache2.registered);
      var animation = "animation-" + serialized.name;
      insertWithoutScoping(cache2, {
        name: serialized.name,
        styles: "@keyframes " + animation + "{" + serialized.styles + "}"
      });
      return animation;
    };
    var injectGlobal = function injectGlobal2() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      var serialized = serializeStyles(args, cache2.registered);
      insertWithoutScoping(cache2, serialized);
    };
    var cx = function cx2() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      return merge$1(cache2.registered, css2, classnames(args));
    };
    return {
      css: css2,
      cx,
      injectGlobal,
      keyframes,
      hydrate: function hydrate(ids2) {
        ids2.forEach(function(key2) {
          cache2.inserted[key2] = true;
        });
      },
      flush: function flush() {
        cache2.registered = {};
        cache2.inserted = {};
        cache2.sheet.flush();
      },
      sheet: cache2.sheet,
      cache: cache2,
      getRegisteredStyles: getRegisteredStyles.bind(null, cache2.registered),
      merge: merge$1.bind(null, cache2.registered, css2)
    };
  };
  var classnames = function classnames2(args) {
    var cls = "";
    for (var i = 0; i < args.length; i++) {
      var arg = args[i];
      if (arg == null) continue;
      var toAdd = void 0;
      switch (typeof arg) {
        case "boolean":
          break;
        case "object": {
          if (Array.isArray(arg)) {
            toAdd = classnames2(arg);
          } else {
            toAdd = "";
            for (var k2 in arg) {
              if (arg[k2] && k2) {
                toAdd && (toAdd += " ");
                toAdd += k2;
              }
            }
          }
          break;
        }
        default: {
          toAdd = arg;
        }
      }
      if (toAdd) {
        cls && (cls += " ");
        cls += toAdd;
      }
    }
    return cls;
  };
  var _createEmotion = createEmotion({
    key: "css"
  }), css$1 = _createEmotion.css, cache$3 = _createEmotion.cache;
  const styled = {
    generateClassName: css$1
  };
  const toastContainer = styled.generateClassName`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 90000;
  padding: 12px 24px;
  font-size: 14px;

  min-width: 200px;
  width: max-content;
  max-width: 450px;

  color: #fff;
  background-color: #ffb243;
  background-color: ${colorPrimaryValue};
  border-radius: 6px;
  white-space: pre-wrap;
`;
  const singleLine = styled.generateClassName`
  text-align: center;
`;
  function toast(msg, duration2 = 2e3, container = document.body) {
    const div = document.createElement("div");
    div.classList.add(toastContainer, APP_CLS_ROOT);
    div.innerText = msg;
    if (!msg.includes("\n") && !msg.includes("<br")) {
      div.classList.add(singleLine);
    }
    container.appendChild(div);
    setTimeout(() => div.remove(), duration2);
  }
  function toastRequestFail() {
    return toast(REQUEST_FAIL_MSG);
  }
  const messageConfig = {
    // duration: default 3, 单位秒
    maxCount: 5,
    top: $headerHeight.get() - 4
  };
  antd.message.config(messageConfig);
  function UseApp() {
    const h2 = $headerHeight.use();
    return /* @__PURE__ */ jsx(antd.App, {
      component: false,
      message: {
        ...messageConfig,
        top: h2 - 4
      },
      children: /* @__PURE__ */ jsx(UseAppInner, {})
    });
  }
  let AntdStatic;
  let AntdMessage = antd.message;
  let AntdNotification = antd.notification;
  function UseAppInner() {
    AntdStatic = antd.App.useApp();
    AntdMessage = AntdStatic.message;
    AntdNotification = AntdStatic.notification;
    return null;
  }
  var md5$1 = { exports: {} };
  var crypt = { exports: {} };
  (function() {
    var base64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", crypt$1 = {
      // Bit-wise rotation left
      rotl: function(n2, b2) {
        return n2 << b2 | n2 >>> 32 - b2;
      },
      // Bit-wise rotation right
      rotr: function(n2, b2) {
        return n2 << 32 - b2 | n2 >>> b2;
      },
      // Swap big-endian to little-endian and vice versa
      endian: function(n2) {
        if (n2.constructor == Number) {
          return crypt$1.rotl(n2, 8) & 16711935 | crypt$1.rotl(n2, 24) & 4278255360;
        }
        for (var i = 0; i < n2.length; i++) n2[i] = crypt$1.endian(n2[i]);
        return n2;
      },
      // Generate an array of any length of random bytes
      randomBytes: function(n2) {
        for (var bytes = []; n2 > 0; n2--) bytes.push(Math.floor(Math.random() * 256));
        return bytes;
      },
      // Convert a byte array to big-endian 32-bit words
      bytesToWords: function(bytes) {
        for (var words = [], i = 0, b2 = 0; i < bytes.length; i++, b2 += 8) words[b2 >>> 5] |= bytes[i] << 24 - b2 % 32;
        return words;
      },
      // Convert big-endian 32-bit words to a byte array
      wordsToBytes: function(words) {
        for (var bytes = [], b2 = 0; b2 < words.length * 32; b2 += 8) bytes.push(words[b2 >>> 5] >>> 24 - b2 % 32 & 255);
        return bytes;
      },
      // Convert a byte array to a hex string
      bytesToHex: function(bytes) {
        for (var hex = [], i = 0; i < bytes.length; i++) {
          hex.push((bytes[i] >>> 4).toString(16));
          hex.push((bytes[i] & 15).toString(16));
        }
        return hex.join("");
      },
      // Convert a hex string to a byte array
      hexToBytes: function(hex) {
        for (var bytes = [], c2 = 0; c2 < hex.length; c2 += 2) bytes.push(parseInt(hex.substr(c2, 2), 16));
        return bytes;
      },
      // Convert a byte array to a base-64 string
      bytesToBase64: function(bytes) {
        for (var base64 = [], i = 0; i < bytes.length; i += 3) {
          var triplet = bytes[i] << 16 | bytes[i + 1] << 8 | bytes[i + 2];
          for (var j = 0; j < 4; j++) if (i * 8 + j * 6 <= bytes.length * 8) base64.push(base64map.charAt(triplet >>> 6 * (3 - j) & 63));
          else base64.push("=");
        }
        return base64.join("");
      },
      // Convert a base-64 string to a byte array
      base64ToBytes: function(base64) {
        base64 = base64.replace(/[^A-Z0-9+\/]/ig, "");
        for (var bytes = [], i = 0, imod4 = 0; i < base64.length; imod4 = ++i % 4) {
          if (imod4 == 0) continue;
          bytes.push((base64map.indexOf(base64.charAt(i - 1)) & Math.pow(2, -2 * imod4 + 8) - 1) << imod4 * 2 | base64map.indexOf(base64.charAt(i)) >>> 6 - imod4 * 2);
        }
        return bytes;
      }
    };
    crypt.exports = crypt$1;
  })();
  var cryptExports = crypt.exports;
  var charenc = {
    // UTF-8 encoding
    utf8: {
      // Convert a string to a byte array
      stringToBytes: function(str) {
        return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
      },
      // Convert a byte array to a string
      bytesToString: function(bytes) {
        return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
      }
    },
    // Binary encoding
    bin: {
      // Convert a string to a byte array
      stringToBytes: function(str) {
        for (var bytes = [], i = 0; i < str.length; i++) bytes.push(str.charCodeAt(i) & 255);
        return bytes;
      },
      // Convert a byte array to a string
      bytesToString: function(bytes) {
        for (var str = [], i = 0; i < bytes.length; i++) str.push(String.fromCharCode(bytes[i]));
        return str.join("");
      }
    }
  };
  var charenc_1 = charenc;
  /*!
   * Determine if an object is a Buffer
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   */
  var isBuffer_1 = function(obj) {
    return obj != null && (isBuffer$1(obj) || isSlowBuffer(obj) || !!obj._isBuffer);
  };
  function isBuffer$1(obj) {
    return !!obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
  }
  function isSlowBuffer(obj) {
    return typeof obj.readFloatLE === "function" && typeof obj.slice === "function" && isBuffer$1(obj.slice(0, 0));
  }
  (function() {
    var crypt2 = cryptExports, utf8 = charenc_1.utf8, isBuffer2 = isBuffer_1, bin = charenc_1.bin, md52 = function(message2, options) {
      if (message2.constructor == String) {
        if (options && options.encoding === "binary") message2 = bin.stringToBytes(message2);
        else message2 = utf8.stringToBytes(message2);
      } else if (isBuffer2(message2)) message2 = Array.prototype.slice.call(message2, 0);
      else if (!Array.isArray(message2) && message2.constructor !== Uint8Array) message2 = message2.toString();
      var m2 = crypt2.bytesToWords(message2), l2 = message2.length * 8, a = 1732584193, b2 = -271733879, c2 = -1732584194, d2 = 271733878;
      for (var i = 0; i < m2.length; i++) {
        m2[i] = (m2[i] << 8 | m2[i] >>> 24) & 16711935 | (m2[i] << 24 | m2[i] >>> 8) & 4278255360;
      }
      m2[l2 >>> 5] |= 128 << l2 % 32;
      m2[(l2 + 64 >>> 9 << 4) + 14] = l2;
      var FF = md52._ff, GG = md52._gg, HH = md52._hh, II = md52._ii;
      for (var i = 0; i < m2.length; i += 16) {
        var aa = a, bb = b2, cc = c2, dd = d2;
        a = FF(a, b2, c2, d2, m2[i + 0], 7, -680876936);
        d2 = FF(d2, a, b2, c2, m2[i + 1], 12, -389564586);
        c2 = FF(c2, d2, a, b2, m2[i + 2], 17, 606105819);
        b2 = FF(b2, c2, d2, a, m2[i + 3], 22, -1044525330);
        a = FF(a, b2, c2, d2, m2[i + 4], 7, -176418897);
        d2 = FF(d2, a, b2, c2, m2[i + 5], 12, 1200080426);
        c2 = FF(c2, d2, a, b2, m2[i + 6], 17, -1473231341);
        b2 = FF(b2, c2, d2, a, m2[i + 7], 22, -45705983);
        a = FF(a, b2, c2, d2, m2[i + 8], 7, 1770035416);
        d2 = FF(d2, a, b2, c2, m2[i + 9], 12, -1958414417);
        c2 = FF(c2, d2, a, b2, m2[i + 10], 17, -42063);
        b2 = FF(b2, c2, d2, a, m2[i + 11], 22, -1990404162);
        a = FF(a, b2, c2, d2, m2[i + 12], 7, 1804603682);
        d2 = FF(d2, a, b2, c2, m2[i + 13], 12, -40341101);
        c2 = FF(c2, d2, a, b2, m2[i + 14], 17, -1502002290);
        b2 = FF(b2, c2, d2, a, m2[i + 15], 22, 1236535329);
        a = GG(a, b2, c2, d2, m2[i + 1], 5, -165796510);
        d2 = GG(d2, a, b2, c2, m2[i + 6], 9, -1069501632);
        c2 = GG(c2, d2, a, b2, m2[i + 11], 14, 643717713);
        b2 = GG(b2, c2, d2, a, m2[i + 0], 20, -373897302);
        a = GG(a, b2, c2, d2, m2[i + 5], 5, -701558691);
        d2 = GG(d2, a, b2, c2, m2[i + 10], 9, 38016083);
        c2 = GG(c2, d2, a, b2, m2[i + 15], 14, -660478335);
        b2 = GG(b2, c2, d2, a, m2[i + 4], 20, -405537848);
        a = GG(a, b2, c2, d2, m2[i + 9], 5, 568446438);
        d2 = GG(d2, a, b2, c2, m2[i + 14], 9, -1019803690);
        c2 = GG(c2, d2, a, b2, m2[i + 3], 14, -187363961);
        b2 = GG(b2, c2, d2, a, m2[i + 8], 20, 1163531501);
        a = GG(a, b2, c2, d2, m2[i + 13], 5, -1444681467);
        d2 = GG(d2, a, b2, c2, m2[i + 2], 9, -51403784);
        c2 = GG(c2, d2, a, b2, m2[i + 7], 14, 1735328473);
        b2 = GG(b2, c2, d2, a, m2[i + 12], 20, -1926607734);
        a = HH(a, b2, c2, d2, m2[i + 5], 4, -378558);
        d2 = HH(d2, a, b2, c2, m2[i + 8], 11, -2022574463);
        c2 = HH(c2, d2, a, b2, m2[i + 11], 16, 1839030562);
        b2 = HH(b2, c2, d2, a, m2[i + 14], 23, -35309556);
        a = HH(a, b2, c2, d2, m2[i + 1], 4, -1530992060);
        d2 = HH(d2, a, b2, c2, m2[i + 4], 11, 1272893353);
        c2 = HH(c2, d2, a, b2, m2[i + 7], 16, -155497632);
        b2 = HH(b2, c2, d2, a, m2[i + 10], 23, -1094730640);
        a = HH(a, b2, c2, d2, m2[i + 13], 4, 681279174);
        d2 = HH(d2, a, b2, c2, m2[i + 0], 11, -358537222);
        c2 = HH(c2, d2, a, b2, m2[i + 3], 16, -722521979);
        b2 = HH(b2, c2, d2, a, m2[i + 6], 23, 76029189);
        a = HH(a, b2, c2, d2, m2[i + 9], 4, -640364487);
        d2 = HH(d2, a, b2, c2, m2[i + 12], 11, -421815835);
        c2 = HH(c2, d2, a, b2, m2[i + 15], 16, 530742520);
        b2 = HH(b2, c2, d2, a, m2[i + 2], 23, -995338651);
        a = II(a, b2, c2, d2, m2[i + 0], 6, -198630844);
        d2 = II(d2, a, b2, c2, m2[i + 7], 10, 1126891415);
        c2 = II(c2, d2, a, b2, m2[i + 14], 15, -1416354905);
        b2 = II(b2, c2, d2, a, m2[i + 5], 21, -57434055);
        a = II(a, b2, c2, d2, m2[i + 12], 6, 1700485571);
        d2 = II(d2, a, b2, c2, m2[i + 3], 10, -1894986606);
        c2 = II(c2, d2, a, b2, m2[i + 10], 15, -1051523);
        b2 = II(b2, c2, d2, a, m2[i + 1], 21, -2054922799);
        a = II(a, b2, c2, d2, m2[i + 8], 6, 1873313359);
        d2 = II(d2, a, b2, c2, m2[i + 15], 10, -30611744);
        c2 = II(c2, d2, a, b2, m2[i + 6], 15, -1560198380);
        b2 = II(b2, c2, d2, a, m2[i + 13], 21, 1309151649);
        a = II(a, b2, c2, d2, m2[i + 4], 6, -145523070);
        d2 = II(d2, a, b2, c2, m2[i + 11], 10, -1120210379);
        c2 = II(c2, d2, a, b2, m2[i + 2], 15, 718787259);
        b2 = II(b2, c2, d2, a, m2[i + 9], 21, -343485551);
        a = a + aa >>> 0;
        b2 = b2 + bb >>> 0;
        c2 = c2 + cc >>> 0;
        d2 = d2 + dd >>> 0;
      }
      return crypt2.endian([a, b2, c2, d2]);
    };
    md52._ff = function(a, b2, c2, d2, x2, s2, t2) {
      var n2 = a + (b2 & c2 | ~b2 & d2) + (x2 >>> 0) + t2;
      return (n2 << s2 | n2 >>> 32 - s2) + b2;
    };
    md52._gg = function(a, b2, c2, d2, x2, s2, t2) {
      var n2 = a + (b2 & d2 | c2 & ~d2) + (x2 >>> 0) + t2;
      return (n2 << s2 | n2 >>> 32 - s2) + b2;
    };
    md52._hh = function(a, b2, c2, d2, x2, s2, t2) {
      var n2 = a + (b2 ^ c2 ^ d2) + (x2 >>> 0) + t2;
      return (n2 << s2 | n2 >>> 32 - s2) + b2;
    };
    md52._ii = function(a, b2, c2, d2, x2, s2, t2) {
      var n2 = a + (c2 ^ (b2 | ~d2)) + (x2 >>> 0) + t2;
      return (n2 << s2 | n2 >>> 32 - s2) + b2;
    };
    md52._blocksize = 16;
    md52._digestsize = 16;
    md5$1.exports = function(message2, options) {
      if (message2 === void 0 || message2 === null) throw new Error("Illegal argument " + message2);
      var digestbytes = crypt2.wordsToBytes(md52(message2, options));
      return options && options.asBytes ? digestbytes : options && options.asString ? bin.bytesToString(digestbytes) : crypt2.bytesToHex(digestbytes);
    };
  })();
  var md5Exports = md5$1.exports;
  const md5 = /* @__PURE__ */ getDefaultExportFromCjs(md5Exports);
  function appSign(params, appkey2, appsec2) {
    params.appkey = appkey2;
    const searchParams2 = new URLSearchParams(params);
    searchParams2.sort();
    return md5(searchParams2.toString() + appsec2);
  }
  function parseCookie() {
    const cookies = {};
    document.cookie.split(";").map((pair) => pair.trim()).filter(Boolean).forEach((pair) => {
      const [key2, val] = pair.split("=").map((s2) => s2.trim()).filter(Boolean);
      if (!key2) return;
      cookies[key2] = val;
    });
    return cookies;
  }
  function getCsrfToken() {
    const csrfToken = parseCookie().bili_jct;
    if (!csrfToken) {
      toast("找不到 csrf token, 请检查是否登录");
      throw new Error("找不到 csrf token, 请检查是否登录");
    }
    return csrfToken;
  }
  function getUid() {
    return parseCookie().DedeUserID;
  }
  function getHasLogined() {
    const cookies = parseCookie();
    return !!cookies.DedeUserID;
  }
  const loginState = proxy({
    cookie: document.cookie,
    logined: getHasLogined()
  });
  function checkLoginStatus() {
    Object.assign(loginState, {
      cookie: document.cookie,
      logined: getHasLogined()
    });
    return loginState.logined;
  }
  function useHasLogined() {
    return useSnapshot(loginState).logined;
  }
  const createAbortError = () => {
    const error = new Error("Delay aborted");
    error.name = "AbortError";
    return error;
  };
  const clearMethods = /* @__PURE__ */ new WeakMap();
  function createDelay({
    clearTimeout: defaultClear,
    setTimeout: defaultSet
  } = {}) {
    return (milliseconds, {
      value,
      signal
    } = {}) => {
      if (signal == null ? void 0 : signal.aborted) {
        return Promise.reject(createAbortError());
      }
      let timeoutId;
      let settle3;
      let rejectFunction;
      const clear = defaultClear ?? clearTimeout;
      const signalListener = () => {
        clear(timeoutId);
        rejectFunction(createAbortError());
      };
      const cleanup = () => {
        if (signal) {
          signal.removeEventListener("abort", signalListener);
        }
      };
      const delayPromise = new Promise((resolve, reject) => {
        settle3 = () => {
          cleanup();
          resolve(value);
        };
        rejectFunction = reject;
        timeoutId = (defaultSet ?? setTimeout)(settle3, milliseconds);
      });
      if (signal) {
        signal.addEventListener("abort", signalListener, {
          once: true
        });
      }
      clearMethods.set(delayPromise, () => {
        clear(timeoutId);
        timeoutId = null;
        settle3();
      });
      return delayPromise;
    };
  }
  const delay = createDelay();
  const debug$9 = baseDebug.extend("utility:dom");
  const DEFAULT_POLL_TIMEOUT = 10 * 1e3;
  const DEFAULT_POLL_INTERVAL = 200;
  async function poll$1(fn, options) {
    const interval = (options == null ? void 0 : options.interval) ?? DEFAULT_POLL_INTERVAL;
    let timeout = (options == null ? void 0 : options.timeout) ?? DEFAULT_POLL_TIMEOUT;
    if (timeout === 0) timeout = Infinity;
    const validate = (options == null ? void 0 : options.validate) ?? ((val) => !lodash.isNil(val));
    const start = performance.now();
    let result = fn();
    while (!validate(result) && performance.now() - start < timeout) {
      await delay(interval);
      result = fn();
    }
    return result;
  }
  async function tryAction(selector, action2, moreOptions) {
    const pollTimeout = (moreOptions == null ? void 0 : moreOptions.pollTimeout) ?? DEFAULT_POLL_TIMEOUT;
    const pollInterval = (moreOptions == null ? void 0 : moreOptions.pollInterval) ?? DEFAULT_POLL_INTERVAL;
    const selectorPredicate = moreOptions == null ? void 0 : moreOptions.selectorPredicate;
    const warnOnTimeout = (moreOptions == null ? void 0 : moreOptions.warnOnTimeout) ?? false;
    const arr2 = await poll$1(() => {
      let arr22 = Array.from(document.querySelectorAll(selector));
      if (selectorPredicate) arr22 = arr22.filter(selectorPredicate);
      if (arr22.length) return arr22;
    }, {
      timeout: pollTimeout,
      interval: pollInterval
    });
    if (!(arr2 == null ? void 0 : arr2.length)) {
      debug$9("tryAction: timeout for selector = `%s`", selector);
      if (warnOnTimeout) {
        console.warn(`[${APP_NAME}]: tryAction timeout, selector = \`%s\``, selector);
      }
      return;
    }
    debug$9("tryAction: selector=`%s` count=%s", selector, arr2.length);
    for (const el of arr2) {
      await Promise.resolve(action2(el));
    }
  }
  async function tryToRemove(selector, selectorPredicate, delayMs) {
    return tryAction(selector, (el) => el.remove(), {
      selectorPredicate
    });
  }
  function shouldDisableShortcut() {
    var _a2;
    const activeTagName = (((_a2 = document.activeElement) == null ? void 0 : _a2.tagName) || "").toLowerCase();
    if (["input", "textarea"].includes(activeTagName)) {
      return true;
    }
    if (document.querySelector(".center-search__bar.is-focus")) {
      return true;
    }
    return false;
  }
  function getElementOffset(el, rect) {
    rect ?? (rect = el.getBoundingClientRect());
    const docElem = document.documentElement;
    return {
      top: rect.top + window.scrollY - docElem.clientTop,
      left: rect.left + window.scrollX - docElem.clientLeft
    };
  }
  function nextTick() {
    return new Promise((resolve) => {
      queueMicrotask(resolve);
    });
  }
  function whenIdle(options) {
    return new Promise((resolve) => {
      if (typeof requestIdleCallback === "function") {
        requestIdleCallback(() => resolve(), options);
      } else {
        setTimeout(resolve);
      }
    });
  }
  let ORIGINAL_TITLE = "";
  function setPageTitle(title) {
    if (!ORIGINAL_TITLE) {
      ORIGINAL_TITLE = document.title;
    }
    document.title = `${title} - ${ORIGINAL_TITLE}`;
  }
  const toHttps = (url) => (url || "").replace(/^http:\/\//, "https://");
  function parseDuration(d2) {
    if (!d2) return 0;
    const units = [1, 60, 360];
    const splited = d2.split(":").map((s2) => Number(s2)).reverse();
    const total = splited.reduce((total2, cur, index) => {
      return total2 + cur * units[index];
    }, 0);
    return total;
  }
  function formatDuration(d2) {
    d2 || (d2 = 0);
    return dayjs.duration(d2 || 0, "seconds").format(d2 >= 3600 ? "HH:mm:ss" : "mm:ss");
  }
  function formatCount(count) {
    if (!count) {
      if (typeof count === "number") return "0";
      else return count;
    }
    if (count <= 9999) {
      return count.toString();
    }
    const trimDotZero = (s2) => s2.replace(/\.0$/, "");
    count /= 1e4;
    if (count <= 9999) {
      const c2 = trimDotZero(count.toFixed(1));
      return `${c2}万`;
    }
    count /= 1e4;
    if (count <= 9999) {
      const c2 = trimDotZero(count.toFixed(1));
      return `${c2}亿`;
    }
    console.warn(`formatCount(count = ${count}); can not handle input`);
  }
  function parseCount(str) {
    if (!str) return void 0;
    if (str === "-") return 0;
    if (/^\d+$/.test(str)) return Number(str);
    if (/^\d+(\.\d+?)?万$/.test(str)) return Number(str.slice(0, -1)) * 1e4;
    if (/^\d+(\.\d+?)?亿$/.test(str)) return Number(str.slice(0, -1)) * 1e8;
  }
  const currentYear = dayjs().format("YYYY");
  function formatTimeStamp(unixTs, includeTime = false) {
    if (!unixTs) return "";
    const t2 = dayjs.unix(unixTs);
    const extraFormat = includeTime ? " HH:mm" : "";
    if (t2.format("YYYY") === currentYear) {
      return t2.format("M-D" + extraFormat);
    } else {
      return t2.format("YY-M-D" + extraFormat);
    }
  }
  const VideoStateMap = {
    "1": "橙色通过",
    "0": "开放浏览",
    "-1": "待审",
    "-2": "被打回",
    "-3": "网警锁定",
    "-4": "被锁定",
    "-5": "管理员锁定",
    "-6": "修复待审",
    "-7": "暂缓审核",
    "-8": "补档待审",
    "-9": "等待转码",
    "-10": "延迟审核",
    "-11": "视频源待修",
    "-12": "转储失败",
    "-13": "允许评论待审",
    "-14": "临时回收站",
    "-15": "分发中",
    "-16": "转码失败",
    "-20": "创建未提交",
    "-30": "创建已提交",
    "-40": "定时发布",
    "-100": "用户删除"
  };
  function getVideoInvalidReason(state) {
    if (typeof state === "undefined") return;
    if (state >= 0) return;
    return VideoStateMap[state];
  }
  var s = 1e3;
  var m$1 = s * 60;
  var h = m$1 * 60;
  var d$1 = h * 24;
  var w = d$1 * 7;
  var y = d$1 * 365.25;
  var ms = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === "string" && val.length > 0) {
      return parse(val);
    } else if (type === "number" && isFinite(val)) {
      return options.long ? fmtLong(val) : fmtShort(val);
    }
    throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
  };
  function parse(str) {
    str = String(str);
    if (str.length > 100) {
      return;
    }
    var match2 = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
    if (!match2) {
      return;
    }
    var n2 = parseFloat(match2[1]);
    var type = (match2[2] || "ms").toLowerCase();
    switch (type) {
      case "years":
      case "year":
      case "yrs":
      case "yr":
      case "y":
        return n2 * y;
      case "weeks":
      case "week":
      case "w":
        return n2 * w;
      case "days":
      case "day":
      case "d":
        return n2 * d$1;
      case "hours":
      case "hour":
      case "hrs":
      case "hr":
      case "h":
        return n2 * h;
      case "minutes":
      case "minute":
      case "mins":
      case "min":
      case "m":
        return n2 * m$1;
      case "seconds":
      case "second":
      case "secs":
      case "sec":
      case "s":
        return n2 * s;
      case "milliseconds":
      case "millisecond":
      case "msecs":
      case "msec":
      case "ms":
        return n2;
      default:
        return void 0;
    }
  }
  function fmtShort(ms2) {
    var msAbs = Math.abs(ms2);
    if (msAbs >= d$1) {
      return Math.round(ms2 / d$1) + "d";
    }
    if (msAbs >= h) {
      return Math.round(ms2 / h) + "h";
    }
    if (msAbs >= m$1) {
      return Math.round(ms2 / m$1) + "m";
    }
    if (msAbs >= s) {
      return Math.round(ms2 / s) + "s";
    }
    return ms2 + "ms";
  }
  function fmtLong(ms2) {
    var msAbs = Math.abs(ms2);
    if (msAbs >= d$1) {
      return plural(ms2, msAbs, d$1, "day");
    }
    if (msAbs >= h) {
      return plural(ms2, msAbs, h, "hour");
    }
    if (msAbs >= m$1) {
      return plural(ms2, msAbs, m$1, "minute");
    }
    if (msAbs >= s) {
      return plural(ms2, msAbs, s, "second");
    }
    return ms2 + " ms";
  }
  function plural(ms2, msAbs, n2, name) {
    var isPlural = msAbs >= n2 * 1.5;
    return Math.round(ms2 / n2) + " " + name + (isPlural ? "s" : "");
  }
  const ms$1 = /* @__PURE__ */ getDefaultExportFromCjs(ms);
  const mixinKeyEncTab = [46, 47, 18, 2, 53, 8, 23, 32, 15, 50, 10, 31, 58, 3, 45, 35, 27, 43, 5, 49, 33, 9, 42, 19, 29, 28, 14, 39, 12, 38, 41, 13, 37, 48, 7, 16, 24, 55, 40, 61, 26, 17, 0, 1, 60, 51, 30, 4, 22, 25, 54, 21, 56, 59, 6, 63, 57, 62, 11, 36, 20, 34, 44, 52];
  function getMixinKey(orig) {
    let temp = "";
    mixinKeyEncTab.forEach((n2) => {
      temp += orig[n2];
    });
    return temp.slice(0, 32);
  }
  async function encWbi(_params) {
    const {
      img_key,
      sub_key
    } = await getWbiKeys();
    const mixin_key = getMixinKey(img_key + sub_key);
    const wts = Math.round(Date.now() / 1e3);
    const params = {
      ..._params,
      wts
    };
    const chr_filter = /[!'()*]/g;
    const query = Object.keys(params).sort().map((key2) => {
      return `${encodeURIComponent(key2)}=${encodeURIComponent(
      // 过滤 value 中的 "!'()*" 字符
      params[key2].toString().replace(chr_filter, "")
    )}`;
    }).join("&");
    const wbi_sign = md5(query + mixin_key);
    return {
      wts,
      w_rid: wbi_sign
    };
  }
  let keysCache;
  let keysCacheTs;
  let keysCacheDate;
  async function getWbiKeys() {
    const genDate = () => dayjs().format("YYYYMMDD");
    const shouldReuse = keysCache && keysCacheTs && keysCacheDate && keysCacheDate === genDate() && Date.now() - keysCacheTs <= ms$1("6h");
    if (shouldReuse) {
      return keysCache;
    }
    const res = await axios.get("/x/web-interface/nav", {
      baseURL: HOST_API
    });
    const json = res.data;
    const img_url = json.data.wbi_img.img_url;
    const sub_url = json.data.wbi_img.sub_url;
    const keys = {
      img_key: img_url.slice(img_url.lastIndexOf("/") + 1, img_url.lastIndexOf(".")),
      sub_key: sub_url.slice(sub_url.lastIndexOf("/") + 1, sub_url.lastIndexOf("."))
    };
    keysCache = keys;
    keysCacheDate = genDate();
    keysCacheTs = Date.now();
    return keys;
  }
  let HAS_RESTORED_SETTINGS = false;
  function set_HAS_RESTORED_SETTINGS(val) {
    HAS_RESTORED_SETTINGS = val;
  }
  async function toastAndReload() {
    AntdMessage.info("即将刷新网页");
    await delay(500);
    location.reload();
  }
  var isAbsoluteURL$1 = function isAbsoluteURL(url) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
  };
  var combineURLs$1 = function combineURLs(baseURL, relativeURL) {
    return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
  };
  var isAbsoluteURL2 = isAbsoluteURL$1;
  var combineURLs2 = combineURLs$1;
  var buildFullPath = function buildFullPath2(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL2(requestedURL)) {
      return combineURLs2(baseURL, requestedURL);
    }
    return requestedURL;
  };
  const buildFullPath$1 = /* @__PURE__ */ getDefaultExportFromCjs(buildFullPath);
  var bind$1 = function bind(fn, thisArg) {
    return function wrap() {
      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }
      return fn.apply(thisArg, args);
    };
  };
  var bind2 = bind$1;
  var toString = Object.prototype.toString;
  var kindOf = /* @__PURE__ */ function(cache2) {
    return function(thing) {
      var str = toString.call(thing);
      return cache2[str] || (cache2[str] = str.slice(8, -1).toLowerCase());
    };
  }(/* @__PURE__ */ Object.create(null));
  function kindOfTest(type) {
    type = type.toLowerCase();
    return function isKindOf(thing) {
      return kindOf(thing) === type;
    };
  }
  function isArray(val) {
    return Array.isArray(val);
  }
  function isUndefined(val) {
    return typeof val === "undefined";
  }
  function isBuffer(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
  }
  var isArrayBuffer = kindOfTest("ArrayBuffer");
  function isArrayBufferView(val) {
    var result;
    if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
      result = ArrayBuffer.isView(val);
    } else {
      result = val && val.buffer && isArrayBuffer(val.buffer);
    }
    return result;
  }
  function isString$1(val) {
    return typeof val === "string";
  }
  function isNumber$1(val) {
    return typeof val === "number";
  }
  function isObject(val) {
    return val !== null && typeof val === "object";
  }
  function isPlainObject(val) {
    if (kindOf(val) !== "object") {
      return false;
    }
    var prototype2 = Object.getPrototypeOf(val);
    return prototype2 === null || prototype2 === Object.prototype;
  }
  var isDate = kindOfTest("Date");
  var isFile = kindOfTest("File");
  var isBlob = kindOfTest("Blob");
  var isFileList = kindOfTest("FileList");
  function isFunction$3(val) {
    return toString.call(val) === "[object Function]";
  }
  function isStream(val) {
    return isObject(val) && isFunction$3(val.pipe);
  }
  function isFormData(thing) {
    var pattern = "[object FormData]";
    return thing && (typeof FormData === "function" && thing instanceof FormData || toString.call(thing) === pattern || isFunction$3(thing.toString) && thing.toString() === pattern);
  }
  var isURLSearchParams = kindOfTest("URLSearchParams");
  function trim(str) {
    return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
  }
  function isStandardBrowserEnv() {
    if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
      return false;
    }
    return typeof window !== "undefined" && typeof document !== "undefined";
  }
  function forEach(obj, fn) {
    if (obj === null || typeof obj === "undefined") {
      return;
    }
    if (typeof obj !== "object") {
      obj = [obj];
    }
    if (isArray(obj)) {
      for (var i = 0, l2 = obj.length; i < l2; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      for (var key2 in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key2)) {
          fn.call(null, obj[key2], key2, obj);
        }
      }
    }
  }
  function merge() {
    var result = {};
    function assignValue(val, key2) {
      if (isPlainObject(result[key2]) && isPlainObject(val)) {
        result[key2] = merge(result[key2], val);
      } else if (isPlainObject(val)) {
        result[key2] = merge({}, val);
      } else if (isArray(val)) {
        result[key2] = val.slice();
      } else {
        result[key2] = val;
      }
    }
    for (var i = 0, l2 = arguments.length; i < l2; i++) {
      forEach(arguments[i], assignValue);
    }
    return result;
  }
  function extend(a, b2, thisArg) {
    forEach(b2, function assignValue(val, key2) {
      if (thisArg && typeof val === "function") {
        a[key2] = bind2(val, thisArg);
      } else {
        a[key2] = val;
      }
    });
    return a;
  }
  function stripBOM(content) {
    if (content.charCodeAt(0) === 65279) {
      content = content.slice(1);
    }
    return content;
  }
  function inherits(constructor, superConstructor, props, descriptors2) {
    constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
    constructor.prototype.constructor = constructor;
    props && Object.assign(constructor.prototype, props);
  }
  function toFlatObject(sourceObj, destObj, filter) {
    var props;
    var i;
    var prop;
    var merged = {};
    destObj = destObj || {};
    do {
      props = Object.getOwnPropertyNames(sourceObj);
      i = props.length;
      while (i-- > 0) {
        prop = props[i];
        if (!merged[prop]) {
          destObj[prop] = sourceObj[prop];
          merged[prop] = true;
        }
      }
      sourceObj = Object.getPrototypeOf(sourceObj);
    } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
    return destObj;
  }
  function endsWith(str, searchString, position2) {
    str = String(str);
    if (position2 === void 0 || position2 > str.length) {
      position2 = str.length;
    }
    position2 -= searchString.length;
    var lastIndex = str.indexOf(searchString, position2);
    return lastIndex !== -1 && lastIndex === position2;
  }
  function toArray(thing) {
    if (!thing) return null;
    var i = thing.length;
    if (isUndefined(i)) return null;
    var arr2 = new Array(i);
    while (i-- > 0) {
      arr2[i] = thing[i];
    }
    return arr2;
  }
  var isTypedArray = /* @__PURE__ */ function(TypedArray) {
    return function(thing) {
      return TypedArray && thing instanceof TypedArray;
    };
  }(typeof Uint8Array !== "undefined" && Object.getPrototypeOf(Uint8Array));
  var utils$3 = {
    isArray,
    isArrayBuffer,
    isBuffer,
    isFormData,
    isArrayBufferView,
    isString: isString$1,
    isNumber: isNumber$1,
    isObject,
    isPlainObject,
    isUndefined,
    isDate,
    isFile,
    isBlob,
    isFunction: isFunction$3,
    isStream,
    isURLSearchParams,
    isStandardBrowserEnv,
    forEach,
    merge,
    extend,
    trim,
    stripBOM,
    inherits,
    toFlatObject,
    kindOf,
    kindOfTest,
    endsWith,
    toArray,
    isTypedArray,
    isFileList
  };
  const utils$4 = /* @__PURE__ */ getDefaultExportFromCjs(utils$3);
  var utils$2 = utils$3;
  function AxiosError$1(message2, code, config, request2, response) {
    Error.call(this);
    this.message = message2;
    this.name = "AxiosError";
    code && (this.code = code);
    config && (this.config = config);
    request2 && (this.request = request2);
    response && (this.response = response);
  }
  utils$2.inherits(AxiosError$1, Error, {
    toJSON: function toJSON() {
      return {
        // Standard
        message: this.message,
        name: this.name,
        // Microsoft
        description: this.description,
        number: this.number,
        // Mozilla
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        // Axios
        config: this.config,
        code: this.code,
        status: this.response && this.response.status ? this.response.status : null
      };
    }
  });
  var prototype = AxiosError$1.prototype;
  var descriptors = {};
  [
    "ERR_BAD_OPTION_VALUE",
    "ERR_BAD_OPTION",
    "ECONNABORTED",
    "ETIMEDOUT",
    "ERR_NETWORK",
    "ERR_FR_TOO_MANY_REDIRECTS",
    "ERR_DEPRECATED",
    "ERR_BAD_RESPONSE",
    "ERR_BAD_REQUEST",
    "ERR_CANCELED"
    // eslint-disable-next-line func-names
  ].forEach(function(code) {
    descriptors[code] = {
      value: code
    };
  });
  Object.defineProperties(AxiosError$1, descriptors);
  Object.defineProperty(prototype, "isAxiosError", {
    value: true
  });
  AxiosError$1.from = function(error, code, config, request2, response, customProps) {
    var axiosError = Object.create(prototype);
    utils$2.toFlatObject(error, axiosError, function filter(obj) {
      return obj !== Error.prototype;
    });
    AxiosError$1.call(axiosError, error.message, code, config, request2, response);
    axiosError.name = error.name;
    customProps && Object.assign(axiosError, customProps);
    return axiosError;
  };
  var AxiosError_1 = AxiosError$1;
  var AxiosError = AxiosError_1;
  var settle = function settle2(resolve, reject, response) {
    var validateStatus = response.config.validateStatus;
    if (!response.status || !validateStatus || validateStatus(response.status)) {
      resolve(response);
    } else {
      reject(new AxiosError("Request failed with status code " + response.status, [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4], response.config, response.request, response));
    }
  };
  const settle$1 = /* @__PURE__ */ getDefaultExportFromCjs(settle);
  var utils$1 = utils$3;
  function encode(val) {
    return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  }
  var buildURL = function buildURL2(url, params, paramsSerializer) {
    if (!params) {
      return url;
    }
    var serializedParams;
    if (paramsSerializer) {
      serializedParams = paramsSerializer(params);
    } else if (utils$1.isURLSearchParams(params)) {
      serializedParams = params.toString();
    } else {
      var parts = [];
      utils$1.forEach(params, function serialize2(val, key2) {
        if (val === null || typeof val === "undefined") {
          return;
        }
        if (utils$1.isArray(val)) {
          key2 = key2 + "[]";
        } else {
          val = [val];
        }
        utils$1.forEach(val, function parseValue(v2) {
          if (utils$1.isDate(v2)) {
            v2 = v2.toISOString();
          } else if (utils$1.isObject(v2)) {
            v2 = JSON.stringify(v2);
          }
          parts.push(encode(key2) + "=" + encode(v2));
        });
      });
      serializedParams = parts.join("&");
    }
    if (serializedParams) {
      var hashmarkIndex = url.indexOf("#");
      if (hashmarkIndex !== -1) {
        url = url.slice(0, hashmarkIndex);
      }
      url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
    }
    return url;
  };
  const buildURL$1 = /* @__PURE__ */ getDefaultExportFromCjs(buildURL);
  var utils = utils$3;
  var ignoreDuplicateOf = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"];
  var parseHeaders = function parseHeaders2(headers) {
    var parsed2 = {};
    var key2;
    var val;
    var i;
    if (!headers) {
      return parsed2;
    }
    utils.forEach(headers.split("\n"), function parser(line2) {
      i = line2.indexOf(":");
      key2 = utils.trim(line2.substr(0, i)).toLowerCase();
      val = utils.trim(line2.substr(i + 1));
      if (key2) {
        if (parsed2[key2] && ignoreDuplicateOf.indexOf(key2) >= 0) {
          return;
        }
        if (key2 === "set-cookie") {
          parsed2[key2] = (parsed2[key2] ? parsed2[key2] : []).concat([val]);
        } else {
          parsed2[key2] = parsed2[key2] ? parsed2[key2] + ", " + val : val;
        }
      }
    });
    return parsed2;
  };
  const parseHeaders$1 = /* @__PURE__ */ getDefaultExportFromCjs(parseHeaders);
  function xhrAdapter(config) {
    return new Promise((resolve, reject) => {
      let requestData = config.data;
      const requestHeaders = config.headers ?? {};
      if (utils$4.isFormData(requestData)) {
        delete requestHeaders["Content-Type"];
      }
      if (config.auth) {
        const username = config.auth.username || "";
        const password = config.auth.password || "";
        requestHeaders.Authorization = "Basic " + Buffer.from(username + ":" + password).toString("base64");
      }
      const onerror = function handleError() {
        reject(new axios.AxiosError("Network Error", axios.AxiosError.ERR_NETWORK, config));
      };
      const ontimeout = function handleTimeout() {
        reject(new axios.AxiosError("timeout of " + config.timeout + "ms exceeded", axios.AxiosError.ECONNABORTED, config));
      };
      utils$4.forEach(requestHeaders, function setRequestHeader(val, key2) {
        if (typeof requestData === "undefined" && key2.toLowerCase() === "content-type") {
          delete requestHeaders[key2];
        }
      });
      if (requestData === void 0) {
        requestData = null;
      }
      const onload = function handleLoad(resp) {
        const responseHeaders = "responseHeaders" in resp ? parseHeaders$1(resp.responseHeaders) : {};
        const responseData = !config.responseType || config.responseType === "text" ? resp.responseText : resp.response;
        const response = {
          data: responseData,
          status: resp.status,
          statusText: resp.statusText,
          headers: responseHeaders,
          config,
          request: {
            // can't got real XMLHttpRequest object, only some property is available
            responseURL: resp.finalUrl,
            status: resp.status,
            statusText: resp.statusText,
            responseXML: null
          }
        };
        settle$1(resolve, reject, response);
      };
      if (config.cancelToken) {
        config.cancelToken.promise.then(function onCanceled(cancel) {
          reject(cancel);
        });
      }
      let responseType;
      if (config.responseType && config.responseType !== "json") {
        responseType = config.responseType;
      }
      const method = config.method.toUpperCase();
      if (method === "UNLINK" || method === "PURGE" || method === "LINK") {
        reject(new axios.AxiosError(`${method} is not a supported method by GM.xmlHttpRequest`));
      } else {
        GM.xmlHttpRequest({
          method,
          url: buildURL$1(buildFullPath$1(config.baseURL, config.url), config.params, config.paramsSerializer),
          headers: Object.fromEntries(Object.entries(requestHeaders).map(([key2, val]) => [key2, val.toString()])),
          responseType,
          data: requestData,
          timeout: config.timeout,
          ontimeout,
          onload,
          onerror
        });
      }
    });
  }
  const request = axios.create({
    baseURL: HOST_API,
    withCredentials: true
  });
  request.interceptors.request.use(async function(config) {
    var _a2;
    config.params || (config.params = {});
    if ((_a2 = config.url) == null ? void 0 : _a2.includes("/wbi/")) {
      config.params = {
        ...config.params,
        ...await encWbi(config.params)
      };
    }
    return config;
  });
  function isWebApiSuccess(json) {
    return (json == null ? void 0 : json.code) === 0 && ((json == null ? void 0 : json.message) === "0" || (json == null ? void 0 : json.message) === "success");
  }
  const gmrequest = axios.create({
    // @ts-ignore
    adapter: xhrAdapter
  });
  const appkey = TVKeyInfo.appkey;
  const appsec = TVKeyInfo.appsec;
  gmrequest.interceptors.request.use(function(config) {
    config.params = {
      appkey,
      access_key: settings.accessKey || "",
      ...config.params
    };
    config.params.sign = appSign(config.params, appkey, appsec);
    return config;
  });
  gmrequest.interceptors.response.use((res) => {
    if (res.config.responseType === "json" && res.data && res.data instanceof ArrayBuffer) {
      const decoder = new TextDecoder();
      const u8arr = new Uint8Array(res.data);
      const text = decoder.decode(u8arr);
      res.data = text;
      try {
        res.data = JSON.parse(text);
      } catch (e2) {
      }
    }
    return res;
  });
  async function listAll() {
    var _a2;
    const json = (await request.get("https://member.bilibili.com/x/web/draft/list")).data;
    const drafts = ((_a2 = json.artlist) == null ? void 0 : _a2.drafts) || [];
    return drafts;
  }
  async function addupdate(payload) {
    var _a2, _b2;
    const form = new URLSearchParams({
      title: "",
      banner_url: "",
      content: "",
      summary: "",
      words: "0",
      category: "15",
      tid: "0",
      reprint: "0",
      tags: "",
      image_urls: "",
      origin_image_urls: "",
      dynamic_intro: "",
      media_id: "0",
      spoiler: "0",
      original: "0",
      top_video_bvid: "",
      aid: "",
      csrf: getCsrfToken(),
      ...payload
    });
    const json = (await request.post("/x/article/creative/draft/addupdate", form)).data;
    const aid = (_b2 = (_a2 = json == null ? void 0 : json.data) == null ? void 0 : _a2.aid) == null ? void 0 : _b2.toString();
    const success = isWebApiSuccess(json);
    if (!success) {
      toast(json.message || "addupdate error");
    }
    return {
      success,
      aid
    };
  }
  async function draftView(aid) {
    var _a2;
    const json = (await request.get("/x/article/creative/draft/view", {
      params: {
        aid
      }
    })).data;
    return ((_a2 = json == null ? void 0 : json.data) == null ? void 0 : _a2.content) || "";
  }
  class BilibiliArticleDraft {
    constructor(title) {
      __publicField(this, "title");
      __publicField(this, "getData", async () => {
        const {
          title
        } = this;
        const allDrafts = await listAll();
        const draft = allDrafts.find((d2) => d2.title === title);
        if (!draft) {
          await addupdate({
            title
          });
          return;
        }
        const content = await draftView(draft.id);
        const parser = new DOMParser();
        const parsed2 = parser.parseFromString(content, "text/html");
        const text = (parsed2.body.textContent || "").trim();
        if (!text) return;
        try {
          return JSON.parse(text);
        } catch (e2) {
          return;
        }
      });
      // cache aid for setData
      // a refresh is needed after manual delete article draft by bilibili dashboard
      __publicField(this, "_aid");
      __publicField(this, "setData", async (data2) => {
        const {
          title
        } = this;
        if (!this._aid) {
          const allDrafts = await listAll();
          const draft = allDrafts.find((d2) => d2.title === title);
          if (!draft) {
            const {
              success: success2,
              aid: newDraftAid
            } = await addupdate({
              title
            });
            if (!success2) return false;
            this._aid = newDraftAid;
          } else {
            this._aid = draft.id.toString();
          }
        }
        const dataStr = JSON.stringify(data2);
        const {
          success
        } = await addupdate({
          aid: this._aid,
          title,
          content: `<p>${dataStr}</p>`,
          words: dataStr.length.toString()
        });
        return success;
      });
      this.title = title;
    }
  }
  const debug$8 = baseDebug.extend("settings");
  const articleDraft = new BilibiliArticleDraft(APP_NAME);
  const privateKeys = ["accessKey", "accessKeyExpireAt"];
  const backupOmitKeys = [
    ...privateKeys,
    // the flag
    "backupSettingsToArticleDraft",
    // 无关紧要
    "shuffleForFav",
    "addSeparatorForFav",
    "shuffleForWatchLater",
    "addSeparatorForWatchLater",
    "shuffleForPopularWeekly",
    "anonymousForPopularGeneral",
    "hideChargeOnlyDynamicFeedVideos"
  ];
  const restoreOmitKeys = [
    ...privateKeys,
    // the flag
    "backupSettingsToArticleDraft"
  ];
  let lastBackupVal;
  const setDataThrottled = lodash.throttle(articleDraft.setData, ms$1("5s"));
  async function saveToDraft(val) {
    if (!val.backupSettingsToArticleDraft) return;
    if (HAS_RESTORED_SETTINGS) return;
    const currentBackupVal = lodash.omit(val, backupOmitKeys);
    const shouldBackup = !lastBackupVal || !lodash.isEqual(lastBackupVal, currentBackupVal);
    if (!shouldBackup) return;
    try {
      await setDataThrottled(currentBackupVal);
      lastBackupVal = currentBackupVal;
      debug$8("backup to article draft complete");
    } catch (e2) {
      console.error(e2.stack || e2);
    }
  }
  const initialSettings = {
    accessKey: "",
    accessKeyExpireAt: 0,
    // 窄屏模式
    useNarrowMode: false,
    // 全屏模式
    // @history
    //  - 2024-03-18 bili-feed4 以前的内测首页现在是默认首页, 这里更名为全屏模式, 默认为 true
    pureRecommend: true,
    /**
     * app recommend
     */
    appApiDecice: EAppApiDevice.ipad,
    /**
     * 查看更多, aka ModalFeed
     */
    // 自动查看更多
    showModalFeedOnLoad: false,
    // "查看更多" 按钮
    showModalFeedEntry: false,
    // ModalFeed.全屏
    modalFeedFullScreen: false,
    /**
     * Video Card
     */
    // 自动开始预览: 按键选择
    autoPreviewWhenKeyboardSelect: false,
    // 自动开始预览: 鼠标悬浮; 不再跟随鼠标位置, 默认: 跟随鼠标
    autoPreviewWhenHover: true,
    // 自动预览: 连续式进度条 跳跃式进度条
    autoPreviewUseContinuousProgress: true,
    // 自动预览: 更新间隔
    // 跳跃式(400) 连续式(700)
    autoPreviewUpdateInterval: 700,
    // hover 延时
    useDelayForHover: false,
    // 从预览处开始播放视频
    // /video/BVID/?t=start
    startPlayFromPreviewPoint: false,
    /**
     * tab=dynamic-feed
     */
    hideChargeOnlyDynamicFeedVideos: false,
    /**
     * tab=watchlater
     */
    shuffleForWatchLater: true,
    // 打乱顺序
    addSeparatorForWatchLater: true,
    // 添加 "近期" / "更早" 分割线
    /**
     * tab=fav
     */
    shuffleForFav: true,
    // 打乱顺序
    excludeFavFolderIds: [],
    // 忽略的收藏夹
    addSeparatorForFav: true,
    // 收藏夹分割线
    /**
     * tab=popular-general
     */
    // shuffleForPopularGeneral: false, // shuffle
    anonymousForPopularGeneral: false,
    // without credentials
    /**
     * tab=popular-weekly
     */
    shuffleForPopularWeekly: false,
    // shuffle
    showPopularWeeklyOnlyOnWeekend: false,
    // only on weekend
    /**
     * 过滤器模块
     * 使用 flat config 方便使用 FlagSettingItem
     */
    filterEnabled: true,
    // 最少播放量
    filterMinPlayCountEnabled: false,
    filterMinPlayCount: 1e4,
    // 时长
    filterMinDurationEnabled: false,
    filterMinDuration: 60,
    // 60s
    // 已关注豁免
    exemptForFollowedVideo: true,
    // filter out whose goto = 'picture'
    filterOutGotoTypePicture: false,
    // 图文也是有 rcmd_reason = '已关注' 的
    // 已关注UP的推荐图文, 默认不参与过滤
    exemptForFollowedPicture: true,
    // filter out whose goto = 'bangumi'
    filterOutGotoTypeBangumi: false,
    // authorName
    filterByAuthorNameEnabled: false,
    filterByAuthorNameKeywords: [],
    // title
    filterByTitleEnabled: false,
    filterByTitleKeywords: [],
    /**
     * 外观
     */
    // video-source-tab 高度, 默认 compact
    styleUseStandardVideoSourceTab: false,
    // sticky tabbar
    styleUseStickyTabbarInPureRecommend: true,
    // custom grid | default grid
    styleUseCustomGrid: true,
    // bg1
    styleUseWhiteBackground: true,
    // 使用卡片模式
    // inspired by https://ai.taobao.com
    styleUseCardBorder: true,
    styleUseCardBorderOnlyOnHover: true,
    styleUseCardBoxShadow: false,
    /**
     * 颜色主题
     */
    theme: "",
    colorPickerThemeSelectedColor: "",
    // 自定义颜色
    /**
     * 功能
     */
    // 备份
    backupSettingsToArticleDraft: false,
    // 默认打开模式
    videoLinkOpenMode: VideoLinkOpenMode.Normal,
    /**
     * 隐藏的 tab, 使用黑名单, 功能迭代之后新增的 tab, 默认开启.
     * 如果使用白名单, 新增的 tab 会被隐藏
     */
    hidingTabKeys: [ETab.KeepFollowOnly, ETab.Live],
    customTabKeysOrder: []
  };
  const settings = proxy({
    ...initialSettings
  });
  const allowedSettingsKeys = Object.keys(initialSettings);
  function useSettingsSnapshot() {
    return useSnapshot(settings);
  }
  const nsp = APP_NAME;
  const key = `${nsp}.settings`;
  async function load() {
    const val = await GM.getValue(key);
    if (val && typeof val === "object") {
      Object.assign(settings, lodash.pick(val, allowedSettingsKeys));
    }
    subscribe$3(settings, () => {
      save();
    });
  }
  async function save() {
    const newVal = snapshot(settings);
    await GM.setValue(key, newVal);
    await saveToDraft(newVal);
  }
  function updateSettings(c2) {
    Object.assign(settings, c2);
  }
  function resetSettings() {
    return updateSettings(initialSettings);
  }
  await( load());
  if (IN_BILIBILI_HOMEPAGE && settings.accessKey && settings.accessKeyExpireAt && Date.now() >= settings.accessKeyExpireAt) {
    toast("access_key 已过期, 请重新获取 !!!");
  }
  const $darkMode = valtioFactory(() => {
    return document.body.classList.contains("dark") || document.body.classList.contains("bilibili-helper-dark-mode");
  });
  function useIsDarkMode() {
    return $darkMode.use();
  }
  const $colors = valtioFactory(() => {
    const bg = window.getComputedStyle(document.body).backgroundColor;
    const c2 = window.getComputedStyle(document.body).color;
    return {
      bg,
      c: c2
    };
  });
  function useColors() {
    return $colors.use();
  }
  setTimeout($colors.updateThrottled, 2e3);
  subscribe$3($darkMode.state, $colors.updateThrottled);
  subscribeOnKeys(settings, ["styleUseWhiteBackground"], () => setTimeout($colors.updateThrottled, 500));
  const ob = new MutationObserver(() => {
    setTimeout(() => {
      $darkMode.updateThrottled();
      setTimeout($colors.updateThrottled);
    });
  });
  ob.observe(document.body, {
    attributes: true,
    attributeFilter: ["class"]
  });
  ob.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-darkreader-scheme"]
  });
  window.addEventListener("unload", () => {
    ob.disconnect();
  });
  var Global = /* @__PURE__ */ withEmotionCache(function(props, cache2) {
    var styles2 = props.styles;
    var serialized = serializeStyles$1([styles2], void 0, React__default__namespace.useContext(ThemeContext));
    var sheetRef = React__default__namespace.useRef();
    useInsertionEffectWithLayoutFallback(function() {
      var key2 = cache2.key + "-global";
      var sheet = new cache2.sheet.constructor({
        key: key2,
        nonce: cache2.sheet.nonce,
        container: cache2.sheet.container,
        speedy: cache2.sheet.isSpeedy
      });
      var rehydrating = false;
      var node2 = document.querySelector('style[data-emotion="' + key2 + " " + serialized.name + '"]');
      if (cache2.sheet.tags.length) {
        sheet.before = cache2.sheet.tags[0];
      }
      if (node2 !== null) {
        rehydrating = true;
        node2.setAttribute("data-emotion", key2);
        sheet.hydrate([node2]);
      }
      sheetRef.current = [sheet, rehydrating];
      return function() {
        sheet.flush();
      };
    }, [cache2]);
    useInsertionEffectWithLayoutFallback(function() {
      var sheetRefCurrent = sheetRef.current;
      var sheet = sheetRefCurrent[0], rehydrating = sheetRefCurrent[1];
      if (rehydrating) {
        sheetRefCurrent[1] = false;
        return;
      }
      if (serialized.next !== void 0) {
        insertStyles(cache2, serialized.next, true);
      }
      if (sheet.tags.length) {
        var element = sheet.tags[sheet.tags.length - 1].nextElementSibling;
        sheet.before = element;
        sheet.flush();
      }
      cache2.insert("", serialized, sheet, false);
    }, [cache2, serialized.name]);
    return null;
  });
  function css() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return serializeStyles$1(args);
  }
  cache$3.compat = true;
  const USING_FONT_FAMILY = "HarmonyOS_Regular,PingFang SC,Helvetica Neue,Microsoft YaHei,sans-serif";
  function compose(...fns) {
    return function(c2) {
      return fns.reduceRight((content, fn) => fn(content), c2);
    };
  }
  function AntdApp({
    children,
    injectGlobalStyle = false,
    renderAppComponent = false,
    emotionCache = cache$3,
    styleProviderProps
  }) {
    const dark = useIsDarkMode();
    const colorPrimary = useColorPrimaryHex();
    const wrap = compose(
      // emotion cache
      (c2) => /* @__PURE__ */ jsx(CacheProvider, {
        value: emotionCache,
        children: c2
      }),
      // antd style
      (c2) => /* @__PURE__ */ jsx(cssinjs.StyleProvider, {
        ...styleProviderProps,
        children: c2
      }),
      // antd config
      (c2) => /* @__PURE__ */ jsx(antd.ConfigProvider, {
        locale: zhCN,
        button: {
          autoInsertSpace: false
        },
        theme: {
          cssVar: true,
          algorithm: dark ? antd.theme.darkAlgorithm : antd.theme.defaultAlgorithm,
          token: {
            colorPrimary,
            colorBgSpotlight: colorPrimary,
            // tooltip bg
            zIndexPopupBase: 11e3,
            // base-modal 10002
            fontFamily: USING_FONT_FAMILY
          },
          components: {
            Notification: {
              zIndexPopup: 11e3
            }
            // Message: {
            //   contentBg: colorPrimary,
            //   colorText: '#fff',
            // },
          }
        },
        children: c2
      })
    );
    return wrap(/* @__PURE__ */ jsxs(Fragment, {
      children: [renderAppComponent && /* @__PURE__ */ jsx(UseApp, {}), injectGlobalStyle && /* @__PURE__ */ jsx(GlobalStyle, {}), children]
    }));
  }
  var _ref = {
    name: "19h4ou9",
    styles: "body,.large-header,#i_cecream,.bili-header .bili-header__channel{background-color:var(--bg2);}.bili-header .bili-header__channel .channel-entry-more__link,.bili-header .bili-header__channel .channel-link{background-color:var(--bg1);}"
  };
  var _ref2 = {
    name: "ykj9m0",
    styles: "body{background-color:var(--bg1);}"
  };
  var _ref3 = {
    name: "168whrf",
    styles: "#i_cecream .bili-feed4-layout{display:none;}.desktop-download-tip{display:none!important;}"
  };
  function GlobalStyle() {
    const colorPrimary = useColorPrimaryHex();
    const {
      pureRecommend,
      styleUseCustomGrid,
      styleUseWhiteBackground
    } = useSettingsSnapshot();
    const dark = useIsDarkMode();
    const {
      c: c2,
      bg
    } = useColors();
    const backToTopRight = useBackToTopRight();
    const width = $headerWidth.use() ?? 90;
    const padding = "0 10px";
    return /* @__PURE__ */ jsxs(Fragment, {
      children: [/* @__PURE__ */ jsx(Global, {
        styles: css`
          :root {
            ${colorPrimaryIdentifier}: ${colorPrimary};
            ${borderColorIdentifier}: ${dark ? "#333" : styleUseWhiteBackground ? "#eee" : "#e5e6e7"};
            --${APP_NAME}-color: ${c2};
            --${APP_NAME}-bg-color: ${bg};
          }

          .${APP_CLS_ROOT} {
            font-family: ${USING_FONT_FAMILY};
            --back-top-right: 24px;

            .bili-video-card a:not(.disable-hover):hover{
              color: ${colorPrimaryValue} !important;
            }
          }

          @media (max-width: 1440px) {
            .${APP_CLS_ROOT} {
              --back-top-right: 16px;
            }
          }
        `
      }), pureRecommend && /* @__PURE__ */ jsx(Global, {
        styles: [
          _ref3,
          styleUseCustomGrid && /* @__PURE__ */ css("#i_cecream,.bili-feed4 .bili-header,.bili-feed4 .bili-header .bili-header__bar{max-width:unset;}.bili-feed4-layout,.bili-feed4 .bili-header .bili-header__channel{max-width:", width, "%;padding:", padding, ";}", ""),
          styleUseCustomGrid && typeof backToTopRight === "number" && /* @__PURE__ */ css(".", APP_CLS_ROOT, "{--back-top-right:", backToTopRight, "px;}", ""),
          // handle background-color
          styleUseWhiteBackground ? _ref2 : _ref,
          "",
          ""
        ]
      })]
    });
  }
  function useRefState(initialValue2) {
    const [state, setState] = React__default.useState(initialValue2);
    const ref = React__default.useRef(state);
    const setStateWraped = React__default.useCallback((payload) => {
      const nextState = typeof payload === "function" ? payload(ref.current) : payload;
      ref.current = nextState;
      setState(nextState);
    }, [setState]);
    const getState = React__default.useCallback(() => ref.current, []);
    return [state, setStateWraped, getState];
  }
  function useRefStateBox(initialValue2) {
    const [state, set, get] = useRefState(initialValue2);
    const box = React__default.useMemo(() => ({
      state,
      // use state in render, other case use `.val`
      get,
      set,
      get val() {
        return get();
      },
      set val(newValue) {
        set(newValue);
      }
    }), [get, set]);
    box.state = state;
    return box;
  }
  function useRefBox(initialValue2) {
    const ref = React__default.useRef(initialValue2);
    const get = React__default.useCallback(() => ref.current, []);
    const set = React__default.useCallback((newValue) => ref.current = newValue, []);
    return React__default.useMemo(() => ({
      get,
      set,
      get val() {
        return get();
      },
      set val(newValue) {
        set(newValue);
      }
    }), [get, set]);
  }
  var _excluded = ["size", "strokeWidth", "strokeLinecap", "strokeLinejoin", "theme", "fill", "className", "spin"];
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), true).forEach(function(key2) {
        _defineProperty(target, key2, source[key2]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key2) {
        Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
      });
    }
    return target;
  }
  function _defineProperty(obj, key2, value) {
    if (key2 in obj) {
      Object.defineProperty(obj, key2, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key2] = value;
    }
    return obj;
  }
  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key2, i;
    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key2 = sourceSymbolKeys[i];
        if (excluded.indexOf(key2) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key2)) continue;
        target[key2] = source[key2];
      }
    }
    return target;
  }
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key2, i;
    for (i = 0; i < sourceKeys.length; i++) {
      key2 = sourceKeys[i];
      if (excluded.indexOf(key2) >= 0) continue;
      target[key2] = source[key2];
    }
    return target;
  }
  var DEFAULT_ICON_CONFIGS = {
    size: "1em",
    strokeWidth: 4,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    rtl: false,
    theme: "outline",
    colors: {
      outline: {
        fill: "#333",
        background: "transparent"
      },
      filled: {
        fill: "#333",
        background: "#FFF"
      },
      twoTone: {
        fill: "#333",
        twoTone: "#2F88FF"
      },
      multiColor: {
        outStrokeColor: "#333",
        outFillColor: "#2F88FF",
        innerStrokeColor: "#FFF",
        innerFillColor: "#43CCF8"
      }
    },
    prefix: "i"
  };
  function guid() {
    return "icon-" + ((1 + Math.random()) * 4294967296 | 0).toString(16).substring(1);
  }
  function IconConverter(id, icon, config) {
    var fill = typeof icon.fill === "string" ? [icon.fill] : icon.fill || [];
    var colors = [];
    var theme2 = icon.theme || config.theme;
    switch (theme2) {
      case "outline":
        colors.push(typeof fill[0] === "string" ? fill[0] : "currentColor");
        colors.push("none");
        colors.push(typeof fill[0] === "string" ? fill[0] : "currentColor");
        colors.push("none");
        break;
      case "filled":
        colors.push(typeof fill[0] === "string" ? fill[0] : "currentColor");
        colors.push(typeof fill[0] === "string" ? fill[0] : "currentColor");
        colors.push("#FFF");
        colors.push("#FFF");
        break;
      case "two-tone":
        colors.push(typeof fill[0] === "string" ? fill[0] : "currentColor");
        colors.push(typeof fill[1] === "string" ? fill[1] : config.colors.twoTone.twoTone);
        colors.push(typeof fill[0] === "string" ? fill[0] : "currentColor");
        colors.push(typeof fill[1] === "string" ? fill[1] : config.colors.twoTone.twoTone);
        break;
      case "multi-color":
        colors.push(typeof fill[0] === "string" ? fill[0] : "currentColor");
        colors.push(typeof fill[1] === "string" ? fill[1] : config.colors.multiColor.outFillColor);
        colors.push(typeof fill[2] === "string" ? fill[2] : config.colors.multiColor.innerStrokeColor);
        colors.push(typeof fill[3] === "string" ? fill[3] : config.colors.multiColor.innerFillColor);
        break;
    }
    return {
      size: icon.size || config.size,
      strokeWidth: icon.strokeWidth || config.strokeWidth,
      strokeLinecap: icon.strokeLinecap || config.strokeLinecap,
      strokeLinejoin: icon.strokeLinejoin || config.strokeLinejoin,
      colors,
      id
    };
  }
  var IconContext = /* @__PURE__ */ React__default.createContext(DEFAULT_ICON_CONFIGS);
  IconContext.Provider;
  function IconWrapper(name, rtl, render5) {
    return function(props) {
      var size2 = props.size, strokeWidth = props.strokeWidth, strokeLinecap = props.strokeLinecap, strokeLinejoin = props.strokeLinejoin, theme2 = props.theme, fill = props.fill, className = props.className, spin = props.spin, extra = _objectWithoutProperties(props, _excluded);
      var ICON_CONFIGS = React__default.useContext(IconContext);
      var id = React__default.useMemo(guid, []);
      var svgProps = IconConverter(id, {
        size: size2,
        strokeWidth,
        strokeLinecap,
        strokeLinejoin,
        theme: theme2,
        fill
      }, ICON_CONFIGS);
      var cls = [ICON_CONFIGS.prefix + "-icon"];
      cls.push(ICON_CONFIGS.prefix + "-icon-" + name);
      if (rtl && ICON_CONFIGS.rtl) {
        cls.push(ICON_CONFIGS.prefix + "-icon-rtl");
      }
      if (spin) {
        cls.push(ICON_CONFIGS.prefix + "-icon-spin");
      }
      if (className) {
        cls.push(className);
      }
      return /* @__PURE__ */ React__default.createElement("span", _objectSpread(_objectSpread({}, extra), {}, {
        className: cls.join(" ")
      }), render5(svgProps));
    };
  }
  const _Info = IconWrapper("info", true, function(props) {
    return /* @__PURE__ */ React__default.createElement("svg", {
      width: props.size,
      height: props.size,
      viewBox: "0 0 48 48",
      fill: "none"
    }, /* @__PURE__ */ React__default.createElement("path", {
      d: "M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z",
      fill: props.colors[1],
      stroke: props.colors[0],
      strokeWidth: props.strokeWidth,
      strokeLinejoin: props.strokeLinejoin
    }), /* @__PURE__ */ React__default.createElement("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M24 11C25.3807 11 26.5 12.1193 26.5 13.5C26.5 14.8807 25.3807 16 24 16C22.6193 16 21.5 14.8807 21.5 13.5C21.5 12.1193 22.6193 11 24 11Z",
      fill: props.colors[2]
    }), /* @__PURE__ */ React__default.createElement("path", {
      d: "M24.5 34V20H23.5H22.5",
      stroke: props.colors[2],
      strokeWidth: props.strokeWidth,
      strokeLinecap: props.strokeLinecap,
      strokeLinejoin: props.strokeLinejoin
    }), /* @__PURE__ */ React__default.createElement("path", {
      d: "M21 34H28",
      stroke: props.colors[2],
      strokeWidth: props.strokeWidth,
      strokeLinecap: props.strokeLinecap,
      strokeLinejoin: props.strokeLinejoin
    }));
  });
  const _Close = IconWrapper("close", false, function(props) {
    return /* @__PURE__ */ React__default.createElement("svg", {
      width: props.size,
      height: props.size,
      viewBox: "0 0 48 48",
      fill: "none"
    }, /* @__PURE__ */ React__default.createElement("path", {
      d: "M8 8L40 40",
      stroke: props.colors[0],
      strokeWidth: props.strokeWidth,
      strokeLinecap: props.strokeLinecap,
      strokeLinejoin: props.strokeLinejoin
    }), /* @__PURE__ */ React__default.createElement("path", {
      d: "M8 40L40 8",
      stroke: props.colors[0],
      strokeWidth: props.strokeWidth,
      strokeLinecap: props.strokeLinecap,
      strokeLinejoin: props.strokeLinejoin
    }));
  });
  const flexVerticalCenterStyle = css`
  display: flex;
  align-items: center;
`;
  const inlineFlexVerticalCenterStyle = css`
  display: inline-flex;
  align-items: center;
`;
  const flexCenterStyle = css`
  ${flexVerticalCenterStyle}
  justify-content: center;
`;
  css`
  display: inline-block;

  /* 不同 zoom 表现不同 */
  /* margin-top: 1px; */

  /* 使用 line-height 在不同 zoom 下表现更好 */
  line-height: var(--ant-control-height);
`;
  const antdCustomCss = {
    button: css`
    &.ant-btn {
      > span {
        line-height: var(--ant-control-height);
      }
    }
    &.ant-btn-lg {
      > span {
        line-height: var(--ant-control-height-lg);
      }
    }
    &.ant-btn-sm {
      > span {
        line-height: var(--ant-control-height-sm);
      }
    }
  `
  };
  const C = {
    size(size2) {
      return css`
      width: ${size2}px;
      height: ${size2}px;
    `;
    },
    ml(size2) {
      return css`
      margin-left: ${size2}px;
    `;
    },
    mr(size2) {
      return css`
      margin-right: ${size2}px;
    `;
    },
    mt(size2) {
      return css`
      margin-top: ${size2}px;
    `;
    },
    mb(size2) {
      return css`
      margin-bottom: ${size2}px;
    `;
    }
  };
  css`
  line-height: 1;
  > * {
    vertical-align: top;
  }
`;
  var createUpdateEffect = function(hook) {
    return function(effect, deps) {
      var isMounted = React__default.useRef(false);
      hook(function() {
        return function() {
          isMounted.current = false;
        };
      }, []);
      hook(function() {
        if (!isMounted.current) {
          isMounted.current = true;
        } else {
          return effect();
        }
      }, deps);
    };
  };
  var __assign = function() {
    __assign = Object.assign || function __assign2(t2) {
      for (var s2, i = 1, n2 = arguments.length; i < n2; i++) {
        s2 = arguments[i];
        for (var p2 in s2) if (Object.prototype.hasOwnProperty.call(s2, p2)) t2[p2] = s2[p2];
      }
      return t2;
    };
    return __assign.apply(this, arguments);
  };
  function __rest(s2, e2) {
    var t2 = {};
    for (var p2 in s2) if (Object.prototype.hasOwnProperty.call(s2, p2) && e2.indexOf(p2) < 0)
      t2[p2] = s2[p2];
    if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p2 = Object.getOwnPropertySymbols(s2); i < p2.length; i++) {
        if (e2.indexOf(p2[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p2[i]))
          t2[p2[i]] = s2[p2[i]];
      }
    return t2;
  }
  function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e2) {
          reject(e2);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e2) {
          reject(e2);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, [])).next());
    });
  }
  function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() {
      if (t2[0] & 1) throw t2[1];
      return t2[1];
    }, trys: [], ops: [] }, f2, y2, t2, g2;
    return g2 = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g2[Symbol.iterator] = function() {
      return this;
    }), g2;
    function verb(n2) {
      return function(v2) {
        return step([n2, v2]);
      };
    }
    function step(op) {
      if (f2) throw new TypeError("Generator is already executing.");
      while (g2 && (g2 = 0, op[0] && (_ = 0)), _) try {
        if (f2 = 1, y2 && (t2 = op[0] & 2 ? y2["return"] : op[0] ? y2["throw"] || ((t2 = y2["return"]) && t2.call(y2), 0) : y2.next) && !(t2 = t2.call(y2, op[1])).done) return t2;
        if (y2 = 0, t2) op = [op[0] & 2, t2.value];
        switch (op[0]) {
          case 0:
          case 1:
            t2 = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y2 = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t2 = _.trys, t2 = t2.length > 0 && t2[t2.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t2 || op[1] > t2[0] && op[1] < t2[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t2[1]) {
              _.label = t2[1];
              t2 = op;
              break;
            }
            if (t2 && _.label < t2[2]) {
              _.label = t2[2];
              _.ops.push(op);
              break;
            }
            if (t2[2]) _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e2) {
        op = [6, e2];
        y2 = 0;
      } finally {
        f2 = t2 = 0;
      }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  }
  function __values(o) {
    var s2 = typeof Symbol === "function" && Symbol.iterator, m2 = s2 && o[s2], i = 0;
    if (m2) return m2.call(o);
    if (o && typeof o.length === "number") return {
      next: function() {
        if (o && i >= o.length) o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
    throw new TypeError(s2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
  }
  function __read(o, n2) {
    var m2 = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m2) return o;
    var i = m2.call(o), r2, ar = [], e2;
    try {
      while ((n2 === void 0 || n2-- > 0) && !(r2 = i.next()).done) ar.push(r2.value);
    } catch (error) {
      e2 = { error };
    } finally {
      try {
        if (r2 && !r2.done && (m2 = i["return"])) m2.call(i);
      } finally {
        if (e2) throw e2.error;
      }
    }
    return ar;
  }
  function __spreadArray(to, from2, pack) {
    if (arguments.length === 2) for (var i = 0, l2 = from2.length, ar; i < l2; i++) {
      if (ar || !(i in from2)) {
        if (!ar) ar = Array.prototype.slice.call(from2, 0, i);
        ar[i] = from2[i];
      }
    }
    return to.concat(ar || Array.prototype.slice.call(from2));
  }
  typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message2) {
    var e2 = new Error(message2);
    return e2.name = "SuppressedError", e2.error = error, e2.suppressed = suppressed, e2;
  };
  var isFunction$2 = function(value) {
    return typeof value === "function";
  };
  var isString = function(value) {
    return typeof value === "string";
  };
  var isNumber = function(value) {
    return typeof value === "number";
  };
  function useMemoizedFn(fn) {
    var fnRef = React__default.useRef(fn);
    fnRef.current = React__default.useMemo(function() {
      return fn;
    }, [fn]);
    var memoizedFn = React__default.useRef();
    if (!memoizedFn.current) {
      memoizedFn.current = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return fnRef.current.apply(this, args);
      };
    }
    return memoizedFn.current;
  }
  const useUpdateEffect = createUpdateEffect(React__default.useEffect);
  var useAutoRunPlugin = function(fetchInstance, _a2) {
    var manual = _a2.manual, _b2 = _a2.ready, ready = _b2 === void 0 ? true : _b2, _c2 = _a2.defaultParams, defaultParams = _c2 === void 0 ? [] : _c2, _d2 = _a2.refreshDeps, refreshDeps = _d2 === void 0 ? [] : _d2, refreshDepsAction = _a2.refreshDepsAction;
    var hasAutoRun = React__default.useRef(false);
    hasAutoRun.current = false;
    useUpdateEffect(function() {
      if (!manual && ready) {
        hasAutoRun.current = true;
        fetchInstance.run.apply(fetchInstance, __spreadArray([], __read(defaultParams), false));
      }
    }, [ready]);
    useUpdateEffect(function() {
      if (hasAutoRun.current) {
        return;
      }
      if (!manual) {
        hasAutoRun.current = true;
        if (refreshDepsAction) {
          refreshDepsAction();
        } else {
          fetchInstance.refresh();
        }
      }
    }, __spreadArray([], __read(refreshDeps), false));
    return {
      onBefore: function() {
        if (!ready) {
          return {
            stopNow: true
          };
        }
      }
    };
  };
  useAutoRunPlugin.onInit = function(_a2) {
    var _b2 = _a2.ready, ready = _b2 === void 0 ? true : _b2, manual = _a2.manual;
    return {
      loading: !manual && ready
    };
  };
  function depsAreSame(oldDeps, deps) {
    if (oldDeps === deps) return true;
    for (var i = 0; i < oldDeps.length; i++) {
      if (!Object.is(oldDeps[i], deps[i])) return false;
    }
    return true;
  }
  function useCreation(factory, deps) {
    var current = React__default.useRef({
      deps,
      obj: void 0,
      initialized: false
    }).current;
    if (current.initialized === false || !depsAreSame(current.deps, deps)) {
      current.deps = deps;
      current.obj = factory();
      current.initialized = true;
    }
    return current.obj;
  }
  function useLatest(value) {
    var ref = React__default.useRef(value);
    ref.current = value;
    return ref;
  }
  var useUnmount = function(fn) {
    var fnRef = useLatest(fn);
    React__default.useEffect(function() {
      return function() {
        fnRef.current();
      };
    }, []);
  };
  var cache$2 = /* @__PURE__ */ new Map();
  var setCache = function(key2, cacheTime, cachedData) {
    var currentCache = cache$2.get(key2);
    if (currentCache === null || currentCache === void 0 ? void 0 : currentCache.timer) {
      clearTimeout(currentCache.timer);
    }
    var timer = void 0;
    if (cacheTime > -1) {
      timer = setTimeout(function() {
        cache$2.delete(key2);
      }, cacheTime);
    }
    cache$2.set(key2, __assign(__assign({}, cachedData), {
      timer
    }));
  };
  var getCache = function(key2) {
    return cache$2.get(key2);
  };
  var cachePromise = /* @__PURE__ */ new Map();
  var getCachePromise = function(cacheKey2) {
    return cachePromise.get(cacheKey2);
  };
  var setCachePromise = function(cacheKey2, promise) {
    cachePromise.set(cacheKey2, promise);
    promise.then(function(res) {
      cachePromise.delete(cacheKey2);
      return res;
    }).catch(function() {
      cachePromise.delete(cacheKey2);
    });
  };
  var listeners$2 = {};
  var trigger = function(key2, data2) {
    if (listeners$2[key2]) {
      listeners$2[key2].forEach(function(item) {
        return item(data2);
      });
    }
  };
  var subscribe$2 = function(key2, listener) {
    if (!listeners$2[key2]) {
      listeners$2[key2] = [];
    }
    listeners$2[key2].push(listener);
    return function unsubscribe() {
      var index = listeners$2[key2].indexOf(listener);
      listeners$2[key2].splice(index, 1);
    };
  };
  var useCachePlugin = function(fetchInstance, _a2) {
    var cacheKey2 = _a2.cacheKey, _b2 = _a2.cacheTime, cacheTime = _b2 === void 0 ? 5 * 60 * 1e3 : _b2, _c2 = _a2.staleTime, staleTime = _c2 === void 0 ? 0 : _c2, customSetCache = _a2.setCache, customGetCache = _a2.getCache;
    var unSubscribeRef = React__default.useRef();
    var currentPromiseRef = React__default.useRef();
    var _setCache = function(key2, cachedData) {
      if (customSetCache) {
        customSetCache(cachedData);
      } else {
        setCache(key2, cacheTime, cachedData);
      }
      trigger(key2, cachedData.data);
    };
    var _getCache = function(key2, params) {
      if (params === void 0) {
        params = [];
      }
      if (customGetCache) {
        return customGetCache(params);
      }
      return getCache(key2);
    };
    useCreation(function() {
      if (!cacheKey2) {
        return;
      }
      var cacheData = _getCache(cacheKey2);
      if (cacheData && Object.hasOwnProperty.call(cacheData, "data")) {
        fetchInstance.state.data = cacheData.data;
        fetchInstance.state.params = cacheData.params;
        if (staleTime === -1 || (/* @__PURE__ */ new Date()).getTime() - cacheData.time <= staleTime) {
          fetchInstance.state.loading = false;
        }
      }
      unSubscribeRef.current = subscribe$2(cacheKey2, function(data2) {
        fetchInstance.setState({
          data: data2
        });
      });
    }, []);
    useUnmount(function() {
      var _a3;
      (_a3 = unSubscribeRef.current) === null || _a3 === void 0 ? void 0 : _a3.call(unSubscribeRef);
    });
    if (!cacheKey2) {
      return {};
    }
    return {
      onBefore: function(params) {
        var cacheData = _getCache(cacheKey2, params);
        if (!cacheData || !Object.hasOwnProperty.call(cacheData, "data")) {
          return {};
        }
        if (staleTime === -1 || (/* @__PURE__ */ new Date()).getTime() - cacheData.time <= staleTime) {
          return {
            loading: false,
            data: cacheData === null || cacheData === void 0 ? void 0 : cacheData.data,
            error: void 0,
            returnNow: true
          };
        } else {
          return {
            data: cacheData === null || cacheData === void 0 ? void 0 : cacheData.data,
            error: void 0
          };
        }
      },
      onRequest: function(service, args) {
        var servicePromise = getCachePromise(cacheKey2);
        if (servicePromise && servicePromise !== currentPromiseRef.current) {
          return {
            servicePromise
          };
        }
        servicePromise = service.apply(void 0, __spreadArray([], __read(args), false));
        currentPromiseRef.current = servicePromise;
        setCachePromise(cacheKey2, servicePromise);
        return {
          servicePromise
        };
      },
      onSuccess: function(data2, params) {
        var _a3;
        if (cacheKey2) {
          (_a3 = unSubscribeRef.current) === null || _a3 === void 0 ? void 0 : _a3.call(unSubscribeRef);
          _setCache(cacheKey2, {
            data: data2,
            params,
            time: (/* @__PURE__ */ new Date()).getTime()
          });
          unSubscribeRef.current = subscribe$2(cacheKey2, function(d2) {
            fetchInstance.setState({
              data: d2
            });
          });
        }
      },
      onMutate: function(data2) {
        var _a3;
        if (cacheKey2) {
          (_a3 = unSubscribeRef.current) === null || _a3 === void 0 ? void 0 : _a3.call(unSubscribeRef);
          _setCache(cacheKey2, {
            data: data2,
            params: fetchInstance.state.params,
            time: (/* @__PURE__ */ new Date()).getTime()
          });
          unSubscribeRef.current = subscribe$2(cacheKey2, function(d2) {
            fetchInstance.setState({
              data: d2
            });
          });
        }
      }
    };
  };
  var useDebouncePlugin = function(fetchInstance, _a2) {
    var debounceWait = _a2.debounceWait, debounceLeading = _a2.debounceLeading, debounceTrailing = _a2.debounceTrailing, debounceMaxWait = _a2.debounceMaxWait;
    var debouncedRef = React__default.useRef();
    var options = React__default.useMemo(function() {
      var ret = {};
      if (debounceLeading !== void 0) {
        ret.leading = debounceLeading;
      }
      if (debounceTrailing !== void 0) {
        ret.trailing = debounceTrailing;
      }
      if (debounceMaxWait !== void 0) {
        ret.maxWait = debounceMaxWait;
      }
      return ret;
    }, [debounceLeading, debounceTrailing, debounceMaxWait]);
    React__default.useEffect(function() {
      if (debounceWait) {
        var _originRunAsync_1 = fetchInstance.runAsync.bind(fetchInstance);
        debouncedRef.current = debounce(function(callback) {
          callback();
        }, debounceWait, options);
        fetchInstance.runAsync = function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          return new Promise(function(resolve, reject) {
            var _a3;
            (_a3 = debouncedRef.current) === null || _a3 === void 0 ? void 0 : _a3.call(debouncedRef, function() {
              _originRunAsync_1.apply(void 0, __spreadArray([], __read(args), false)).then(resolve).catch(reject);
            });
          });
        };
        return function() {
          var _a3;
          (_a3 = debouncedRef.current) === null || _a3 === void 0 ? void 0 : _a3.cancel();
          fetchInstance.runAsync = _originRunAsync_1;
        };
      }
    }, [debounceWait, options]);
    if (!debounceWait) {
      return {};
    }
    return {
      onCancel: function() {
        var _a3;
        (_a3 = debouncedRef.current) === null || _a3 === void 0 ? void 0 : _a3.cancel();
      }
    };
  };
  var useLoadingDelayPlugin = function(fetchInstance, _a2) {
    var loadingDelay = _a2.loadingDelay, ready = _a2.ready;
    var timerRef = React__default.useRef();
    if (!loadingDelay) {
      return {};
    }
    var cancelTimeout = function() {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
    return {
      onBefore: function() {
        cancelTimeout();
        if (ready !== false) {
          timerRef.current = setTimeout(function() {
            fetchInstance.setState({
              loading: true
            });
          }, loadingDelay);
        }
        return {
          loading: false
        };
      },
      onFinally: function() {
        cancelTimeout();
      },
      onCancel: function() {
        cancelTimeout();
      }
    };
  };
  var isBrowser = !!(typeof window !== "undefined" && window.document && window.document.createElement);
  function isDocumentVisible() {
    if (isBrowser) {
      return document.visibilityState !== "hidden";
    }
    return true;
  }
  var listeners$1 = [];
  function subscribe$1(listener) {
    listeners$1.push(listener);
    return function unsubscribe() {
      var index = listeners$1.indexOf(listener);
      listeners$1.splice(index, 1);
    };
  }
  if (isBrowser) {
    var revalidate$1 = function() {
      if (!isDocumentVisible()) return;
      for (var i = 0; i < listeners$1.length; i++) {
        var listener = listeners$1[i];
        listener();
      }
    };
    window.addEventListener("visibilitychange", revalidate$1, false);
  }
  var usePollingPlugin = function(fetchInstance, _a2) {
    var pollingInterval = _a2.pollingInterval, _b2 = _a2.pollingWhenHidden, pollingWhenHidden = _b2 === void 0 ? true : _b2, _c2 = _a2.pollingErrorRetryCount, pollingErrorRetryCount = _c2 === void 0 ? -1 : _c2;
    var timerRef = React__default.useRef();
    var unsubscribeRef = React__default.useRef();
    var countRef = React__default.useRef(0);
    var stopPolling = function() {
      var _a3;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      (_a3 = unsubscribeRef.current) === null || _a3 === void 0 ? void 0 : _a3.call(unsubscribeRef);
    };
    useUpdateEffect(function() {
      if (!pollingInterval) {
        stopPolling();
      }
    }, [pollingInterval]);
    if (!pollingInterval) {
      return {};
    }
    return {
      onBefore: function() {
        stopPolling();
      },
      onError: function() {
        countRef.current += 1;
      },
      onSuccess: function() {
        countRef.current = 0;
      },
      onFinally: function() {
        if (pollingErrorRetryCount === -1 || // When an error occurs, the request is not repeated after pollingErrorRetryCount retries
        pollingErrorRetryCount !== -1 && countRef.current <= pollingErrorRetryCount) {
          timerRef.current = setTimeout(function() {
            if (!pollingWhenHidden && !isDocumentVisible()) {
              unsubscribeRef.current = subscribe$1(function() {
                fetchInstance.refresh();
              });
            } else {
              fetchInstance.refresh();
            }
          }, pollingInterval);
        } else {
          countRef.current = 0;
        }
      },
      onCancel: function() {
        stopPolling();
      }
    };
  };
  function limit(fn, timespan) {
    var pending = false;
    return function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      if (pending) return;
      pending = true;
      fn.apply(void 0, __spreadArray([], __read(args), false));
      setTimeout(function() {
        pending = false;
      }, timespan);
    };
  }
  function isOnline() {
    if (isBrowser && typeof navigator.onLine !== "undefined") {
      return navigator.onLine;
    }
    return true;
  }
  var listeners = [];
  function subscribe(listener) {
    listeners.push(listener);
    return function unsubscribe() {
      var index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }
  if (isBrowser) {
    var revalidate = function() {
      if (!isDocumentVisible() || !isOnline()) return;
      for (var i = 0; i < listeners.length; i++) {
        var listener = listeners[i];
        listener();
      }
    };
    window.addEventListener("visibilitychange", revalidate, false);
    window.addEventListener("focus", revalidate, false);
  }
  var useRefreshOnWindowFocusPlugin = function(fetchInstance, _a2) {
    var refreshOnWindowFocus = _a2.refreshOnWindowFocus, _b2 = _a2.focusTimespan, focusTimespan = _b2 === void 0 ? 5e3 : _b2;
    var unsubscribeRef = React__default.useRef();
    var stopSubscribe = function() {
      var _a3;
      (_a3 = unsubscribeRef.current) === null || _a3 === void 0 ? void 0 : _a3.call(unsubscribeRef);
    };
    React__default.useEffect(function() {
      if (refreshOnWindowFocus) {
        var limitRefresh_1 = limit(fetchInstance.refresh.bind(fetchInstance), focusTimespan);
        unsubscribeRef.current = subscribe(function() {
          limitRefresh_1();
        });
      }
      return function() {
        stopSubscribe();
      };
    }, [refreshOnWindowFocus, focusTimespan]);
    useUnmount(function() {
      stopSubscribe();
    });
    return {};
  };
  var useRetryPlugin = function(fetchInstance, _a2) {
    var retryInterval = _a2.retryInterval, retryCount = _a2.retryCount;
    var timerRef = React__default.useRef();
    var countRef = React__default.useRef(0);
    var triggerByRetry = React__default.useRef(false);
    if (!retryCount) {
      return {};
    }
    return {
      onBefore: function() {
        if (!triggerByRetry.current) {
          countRef.current = 0;
        }
        triggerByRetry.current = false;
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      },
      onSuccess: function() {
        countRef.current = 0;
      },
      onError: function() {
        countRef.current += 1;
        if (retryCount === -1 || countRef.current <= retryCount) {
          var timeout = retryInterval !== null && retryInterval !== void 0 ? retryInterval : Math.min(1e3 * Math.pow(2, countRef.current), 3e4);
          timerRef.current = setTimeout(function() {
            triggerByRetry.current = true;
            fetchInstance.refresh();
          }, timeout);
        } else {
          countRef.current = 0;
        }
      },
      onCancel: function() {
        countRef.current = 0;
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      }
    };
  };
  var useThrottlePlugin = function(fetchInstance, _a2) {
    var throttleWait = _a2.throttleWait, throttleLeading = _a2.throttleLeading, throttleTrailing = _a2.throttleTrailing;
    var throttledRef = React__default.useRef();
    var options = {};
    if (throttleLeading !== void 0) {
      options.leading = throttleLeading;
    }
    if (throttleTrailing !== void 0) {
      options.trailing = throttleTrailing;
    }
    React__default.useEffect(function() {
      if (throttleWait) {
        var _originRunAsync_1 = fetchInstance.runAsync.bind(fetchInstance);
        throttledRef.current = throttle$1(function(callback) {
          callback();
        }, throttleWait, options);
        fetchInstance.runAsync = function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          return new Promise(function(resolve, reject) {
            var _a3;
            (_a3 = throttledRef.current) === null || _a3 === void 0 ? void 0 : _a3.call(throttledRef, function() {
              _originRunAsync_1.apply(void 0, __spreadArray([], __read(args), false)).then(resolve).catch(reject);
            });
          });
        };
        return function() {
          var _a3;
          fetchInstance.runAsync = _originRunAsync_1;
          (_a3 = throttledRef.current) === null || _a3 === void 0 ? void 0 : _a3.cancel();
        };
      }
    }, [throttleWait, throttleLeading, throttleTrailing]);
    if (!throttleWait) {
      return {};
    }
    return {
      onCancel: function() {
        var _a3;
        (_a3 = throttledRef.current) === null || _a3 === void 0 ? void 0 : _a3.cancel();
      }
    };
  };
  var useMount = function(fn) {
    React__default.useEffect(function() {
      fn === null || fn === void 0 ? void 0 : fn();
    }, []);
  };
  var useUpdate = function() {
    var _a2 = __read(React__default.useState({}), 2), setState = _a2[1];
    return React__default.useCallback(function() {
      return setState({});
    }, []);
  };
  var Fetch = (
    /** @class */
    function() {
      function Fetch2(serviceRef, options, subscribe2, initState2) {
        if (initState2 === void 0) {
          initState2 = {};
        }
        this.serviceRef = serviceRef;
        this.options = options;
        this.subscribe = subscribe2;
        this.initState = initState2;
        this.count = 0;
        this.state = {
          loading: false,
          params: void 0,
          data: void 0,
          error: void 0
        };
        this.state = __assign(__assign(__assign({}, this.state), {
          loading: !options.manual
        }), initState2);
      }
      Fetch2.prototype.setState = function(s2) {
        if (s2 === void 0) {
          s2 = {};
        }
        this.state = __assign(__assign({}, this.state), s2);
        this.subscribe();
      };
      Fetch2.prototype.runPluginHandler = function(event) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
          rest[_i - 1] = arguments[_i];
        }
        var r2 = this.pluginImpls.map(function(i) {
          var _a2;
          return (_a2 = i[event]) === null || _a2 === void 0 ? void 0 : _a2.call.apply(_a2, __spreadArray([i], __read(rest), false));
        }).filter(Boolean);
        return Object.assign.apply(Object, __spreadArray([{}], __read(r2), false));
      };
      Fetch2.prototype.runAsync = function() {
        var _a2, _b2, _c2, _d2, _e2, _f, _g, _h, _j, _k;
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          params[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function() {
          var currentCount, _l, _m, stopNow, _o, returnNow, state, servicePromise, res, error_1;
          var _p;
          return __generator(this, function(_q) {
            switch (_q.label) {
              case 0:
                this.count += 1;
                currentCount = this.count;
                _l = this.runPluginHandler("onBefore", params), _m = _l.stopNow, stopNow = _m === void 0 ? false : _m, _o = _l.returnNow, returnNow = _o === void 0 ? false : _o, state = __rest(_l, ["stopNow", "returnNow"]);
                if (stopNow) {
                  return [2, new Promise(function() {
                  })];
                }
                this.setState(__assign({
                  loading: true,
                  params
                }, state));
                if (returnNow) {
                  return [2, Promise.resolve(state.data)];
                }
                (_b2 = (_a2 = this.options).onBefore) === null || _b2 === void 0 ? void 0 : _b2.call(_a2, params);
                _q.label = 1;
              case 1:
                _q.trys.push([1, 3, , 4]);
                servicePromise = this.runPluginHandler("onRequest", this.serviceRef.current, params).servicePromise;
                if (!servicePromise) {
                  servicePromise = (_p = this.serviceRef).current.apply(_p, __spreadArray([], __read(params), false));
                }
                return [4, servicePromise];
              case 2:
                res = _q.sent();
                if (currentCount !== this.count) {
                  return [2, new Promise(function() {
                  })];
                }
                this.setState({
                  data: res,
                  error: void 0,
                  loading: false
                });
                (_d2 = (_c2 = this.options).onSuccess) === null || _d2 === void 0 ? void 0 : _d2.call(_c2, res, params);
                this.runPluginHandler("onSuccess", res, params);
                (_f = (_e2 = this.options).onFinally) === null || _f === void 0 ? void 0 : _f.call(_e2, params, res, void 0);
                if (currentCount === this.count) {
                  this.runPluginHandler("onFinally", params, res, void 0);
                }
                return [2, res];
              case 3:
                error_1 = _q.sent();
                if (currentCount !== this.count) {
                  return [2, new Promise(function() {
                  })];
                }
                this.setState({
                  error: error_1,
                  loading: false
                });
                (_h = (_g = this.options).onError) === null || _h === void 0 ? void 0 : _h.call(_g, error_1, params);
                this.runPluginHandler("onError", error_1, params);
                (_k = (_j = this.options).onFinally) === null || _k === void 0 ? void 0 : _k.call(_j, params, void 0, error_1);
                if (currentCount === this.count) {
                  this.runPluginHandler("onFinally", params, void 0, error_1);
                }
                throw error_1;
              case 4:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      };
      Fetch2.prototype.run = function() {
        var _this = this;
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          params[_i] = arguments[_i];
        }
        this.runAsync.apply(this, __spreadArray([], __read(params), false)).catch(function(error) {
          if (!_this.options.onError) {
            console.error(error);
          }
        });
      };
      Fetch2.prototype.cancel = function() {
        this.count += 1;
        this.setState({
          loading: false
        });
        this.runPluginHandler("onCancel");
      };
      Fetch2.prototype.refresh = function() {
        this.run.apply(this, __spreadArray([], __read(this.state.params || []), false));
      };
      Fetch2.prototype.refreshAsync = function() {
        return this.runAsync.apply(this, __spreadArray([], __read(this.state.params || []), false));
      };
      Fetch2.prototype.mutate = function(data2) {
        var targetData = isFunction$2(data2) ? data2(this.state.data) : data2;
        this.runPluginHandler("onMutate", targetData);
        this.setState({
          data: targetData
        });
      };
      return Fetch2;
    }()
  );
  function useRequestImplement(service, options, plugins) {
    if (options === void 0) {
      options = {};
    }
    if (plugins === void 0) {
      plugins = [];
    }
    var _a2 = options.manual, manual = _a2 === void 0 ? false : _a2, _b2 = options.ready, ready = _b2 === void 0 ? true : _b2, rest = __rest(options, ["manual", "ready"]);
    var fetchOptions = __assign({
      manual,
      ready
    }, rest);
    var serviceRef = useLatest(service);
    var update = useUpdate();
    var fetchInstance = useCreation(function() {
      var initState2 = plugins.map(function(p2) {
        var _a3;
        return (_a3 = p2 === null || p2 === void 0 ? void 0 : p2.onInit) === null || _a3 === void 0 ? void 0 : _a3.call(p2, fetchOptions);
      }).filter(Boolean);
      return new Fetch(serviceRef, fetchOptions, update, Object.assign.apply(Object, __spreadArray([{}], __read(initState2), false)));
    }, []);
    fetchInstance.options = fetchOptions;
    fetchInstance.pluginImpls = plugins.map(function(p2) {
      return p2(fetchInstance, fetchOptions);
    });
    useMount(function() {
      if (!manual && ready) {
        var params = fetchInstance.state.params || options.defaultParams || [];
        fetchInstance.run.apply(fetchInstance, __spreadArray([], __read(params), false));
      }
    });
    useUnmount(function() {
      fetchInstance.cancel();
    });
    return {
      loading: fetchInstance.state.loading,
      data: fetchInstance.state.data,
      error: fetchInstance.state.error,
      params: fetchInstance.state.params || [],
      cancel: useMemoizedFn(fetchInstance.cancel.bind(fetchInstance)),
      refresh: useMemoizedFn(fetchInstance.refresh.bind(fetchInstance)),
      refreshAsync: useMemoizedFn(fetchInstance.refreshAsync.bind(fetchInstance)),
      run: useMemoizedFn(fetchInstance.run.bind(fetchInstance)),
      runAsync: useMemoizedFn(fetchInstance.runAsync.bind(fetchInstance)),
      mutate: useMemoizedFn(fetchInstance.mutate.bind(fetchInstance))
    };
  }
  function useRequest(service, options, plugins) {
    return useRequestImplement(service, options, __spreadArray(__spreadArray([], __read([]), false), [useDebouncePlugin, useLoadingDelayPlugin, usePollingPlugin, useRefreshOnWindowFocusPlugin, useThrottlePlugin, useAutoRunPlugin, useCachePlugin, useRetryPlugin], false));
  }
  function useToggle(defaultValue2, reverseValue) {
    if (defaultValue2 === void 0) {
      defaultValue2 = false;
    }
    var _a2 = __read(React__default.useState(defaultValue2), 2), state = _a2[0], setState = _a2[1];
    var actions = React__default.useMemo(function() {
      var reverseValueOrigin = !defaultValue2;
      var toggle = function() {
        return setState(function(s2) {
          return s2 === defaultValue2 ? reverseValueOrigin : defaultValue2;
        });
      };
      var set = function(value) {
        return setState(value);
      };
      var setLeft = function() {
        return setState(defaultValue2);
      };
      var setRight = function() {
        return setState(reverseValueOrigin);
      };
      return {
        toggle,
        set,
        setLeft,
        setRight
      };
    }, []);
    return [state, actions];
  }
  function useBoolean(defaultValue2) {
    var _a2 = __read(useToggle(!!defaultValue2), 2), state = _a2[0], _b2 = _a2[1], toggle = _b2.toggle, set = _b2.set;
    var actions = React__default.useMemo(function() {
      var setTrue = function() {
        return set(true);
      };
      var setFalse = function() {
        return set(false);
      };
      return {
        toggle,
        set: function(v2) {
          return set(!!v2);
        },
        setTrue,
        setFalse
      };
    }, []);
    return [state, actions];
  }
  function getTargetElement(target, defaultElement) {
    if (!isBrowser) {
      return void 0;
    }
    if (!target) {
      return defaultElement;
    }
    var targetElement;
    if (isFunction$2(target)) {
      targetElement = target();
    } else if ("current" in target) {
      targetElement = target.current;
    } else {
      targetElement = target;
    }
    return targetElement;
  }
  var createEffectWithTarget = function(useEffectType) {
    var useEffectWithTarget2 = function(effect, deps, target) {
      var hasInitRef = React__default.useRef(false);
      var lastElementRef = React__default.useRef([]);
      var lastDepsRef = React__default.useRef([]);
      var unLoadRef = React__default.useRef();
      useEffectType(function() {
        var _a2;
        var targets = Array.isArray(target) ? target : [target];
        var els = targets.map(function(item) {
          return getTargetElement(item);
        });
        if (!hasInitRef.current) {
          hasInitRef.current = true;
          lastElementRef.current = els;
          lastDepsRef.current = deps;
          unLoadRef.current = effect();
          return;
        }
        if (els.length !== lastElementRef.current.length || !depsAreSame(lastElementRef.current, els) || !depsAreSame(lastDepsRef.current, deps)) {
          (_a2 = unLoadRef.current) === null || _a2 === void 0 ? void 0 : _a2.call(unLoadRef);
          lastElementRef.current = els;
          lastDepsRef.current = deps;
          unLoadRef.current = effect();
        }
      });
      useUnmount(function() {
        var _a2;
        (_a2 = unLoadRef.current) === null || _a2 === void 0 ? void 0 : _a2.call(unLoadRef);
        hasInitRef.current = false;
      });
    };
    return useEffectWithTarget2;
  };
  var useEffectWithTarget = createEffectWithTarget(React__default.useEffect);
  var hasElementType = typeof Element !== "undefined";
  var hasMap = typeof Map === "function";
  var hasSet = typeof Set === "function";
  var hasArrayBuffer = typeof ArrayBuffer === "function" && !!ArrayBuffer.isView;
  function equal(a, b2) {
    if (a === b2) return true;
    if (a && b2 && typeof a == "object" && typeof b2 == "object") {
      if (a.constructor !== b2.constructor) return false;
      var length2, i, keys;
      if (Array.isArray(a)) {
        length2 = a.length;
        if (length2 != b2.length) return false;
        for (i = length2; i-- !== 0; ) if (!equal(a[i], b2[i])) return false;
        return true;
      }
      var it;
      if (hasMap && a instanceof Map && b2 instanceof Map) {
        if (a.size !== b2.size) return false;
        it = a.entries();
        while (!(i = it.next()).done) if (!b2.has(i.value[0])) return false;
        it = a.entries();
        while (!(i = it.next()).done) if (!equal(i.value[1], b2.get(i.value[0]))) return false;
        return true;
      }
      if (hasSet && a instanceof Set && b2 instanceof Set) {
        if (a.size !== b2.size) return false;
        it = a.entries();
        while (!(i = it.next()).done) if (!b2.has(i.value[0])) return false;
        return true;
      }
      if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b2)) {
        length2 = a.length;
        if (length2 != b2.length) return false;
        for (i = length2; i-- !== 0; ) if (a[i] !== b2[i]) return false;
        return true;
      }
      if (a.constructor === RegExp) return a.source === b2.source && a.flags === b2.flags;
      if (a.valueOf !== Object.prototype.valueOf && typeof a.valueOf === "function" && typeof b2.valueOf === "function") return a.valueOf() === b2.valueOf();
      if (a.toString !== Object.prototype.toString && typeof a.toString === "function" && typeof b2.toString === "function") return a.toString() === b2.toString();
      keys = Object.keys(a);
      length2 = keys.length;
      if (length2 !== Object.keys(b2).length) return false;
      for (i = length2; i-- !== 0; ) if (!Object.prototype.hasOwnProperty.call(b2, keys[i])) return false;
      if (hasElementType && a instanceof Element) return false;
      for (i = length2; i-- !== 0; ) {
        if ((keys[i] === "_owner" || keys[i] === "__v" || keys[i] === "__o") && a.$$typeof) {
          continue;
        }
        if (!equal(a[keys[i]], b2[keys[i]])) return false;
      }
      return true;
    }
    return a !== a && b2 !== b2;
  }
  var reactFastCompare = function isEqual(a, b2) {
    try {
      return equal(a, b2);
    } catch (error) {
      if ((error.message || "").match(/stack|recursion/i)) {
        console.warn("react-fast-compare cannot handle circular refs");
        return false;
      }
      throw error;
    }
  };
  const isEqual2 = /* @__PURE__ */ getDefaultExportFromCjs(reactFastCompare);
  var depsEqual = function(aDeps, bDeps) {
    if (aDeps === void 0) {
      aDeps = [];
    }
    if (bDeps === void 0) {
      bDeps = [];
    }
    return isEqual2(aDeps, bDeps);
  };
  function useEventListener(eventName, handler, options) {
    if (options === void 0) {
      options = {};
    }
    var _a2 = options.enable, enable = _a2 === void 0 ? true : _a2;
    var handlerRef = useLatest(handler);
    useEffectWithTarget(function() {
      if (!enable) {
        return;
      }
      var targetElement = getTargetElement(options.target, window);
      if (!(targetElement === null || targetElement === void 0 ? void 0 : targetElement.addEventListener)) {
        return;
      }
      var eventListener = function(event) {
        return handlerRef.current(event);
      };
      targetElement.addEventListener(eventName, eventListener, {
        capture: options.capture,
        once: options.once,
        passive: options.passive
      });
      return function() {
        targetElement.removeEventListener(eventName, eventListener, {
          capture: options.capture
        });
      };
    }, [eventName, options.capture, options.once, options.passive, enable], options.target);
  }
  const useHover = function(target, options) {
    var _a2 = {}, onEnter = _a2.onEnter, onLeave = _a2.onLeave, onChange = _a2.onChange;
    var _b2 = __read(useBoolean(false), 2), state = _b2[0], _c2 = _b2[1], setTrue = _c2.setTrue, setFalse = _c2.setFalse;
    useEventListener("mouseenter", function() {
      onEnter === null || onEnter === void 0 ? void 0 : onEnter();
      setTrue();
      onChange === null || onChange === void 0 ? void 0 : onChange(true);
    }, {
      target
    });
    useEventListener("mouseleave", function() {
      onLeave === null || onLeave === void 0 ? void 0 : onLeave();
      setFalse();
      onChange === null || onChange === void 0 ? void 0 : onChange(false);
    }, {
      target
    });
    return state;
  };
  var useDeepCompareEffectWithTarget = function(effect, deps, target) {
    var ref = React__default.useRef();
    var signalRef = React__default.useRef(0);
    if (!depsEqual(deps, ref.current)) {
      signalRef.current += 1;
    }
    ref.current = deps;
    useEffectWithTarget(effect, [signalRef.current], target);
  };
  var isAppleDevice = /(mac|iphone|ipod|ipad)/i.test(typeof navigator !== "undefined" ? navigator === null || navigator === void 0 ? void 0 : navigator.platform : "");
  var aliasKeyCodeMap = {
    "0": 48,
    "1": 49,
    "2": 50,
    "3": 51,
    "4": 52,
    "5": 53,
    "6": 54,
    "7": 55,
    "8": 56,
    "9": 57,
    backspace: 8,
    tab: 9,
    enter: 13,
    shift: 16,
    ctrl: 17,
    alt: 18,
    pausebreak: 19,
    capslock: 20,
    esc: 27,
    space: 32,
    pageup: 33,
    pagedown: 34,
    end: 35,
    home: 36,
    leftarrow: 37,
    uparrow: 38,
    rightarrow: 39,
    downarrow: 40,
    insert: 45,
    delete: 46,
    a: 65,
    b: 66,
    c: 67,
    d: 68,
    e: 69,
    f: 70,
    g: 71,
    h: 72,
    i: 73,
    j: 74,
    k: 75,
    l: 76,
    m: 77,
    n: 78,
    o: 79,
    p: 80,
    q: 81,
    r: 82,
    s: 83,
    t: 84,
    u: 85,
    v: 86,
    w: 87,
    x: 88,
    y: 89,
    z: 90,
    leftwindowkey: 91,
    rightwindowkey: 92,
    meta: isAppleDevice ? [91, 93] : [91, 92],
    selectkey: 93,
    numpad0: 96,
    numpad1: 97,
    numpad2: 98,
    numpad3: 99,
    numpad4: 100,
    numpad5: 101,
    numpad6: 102,
    numpad7: 103,
    numpad8: 104,
    numpad9: 105,
    multiply: 106,
    add: 107,
    subtract: 109,
    decimalpoint: 110,
    divide: 111,
    f1: 112,
    f2: 113,
    f3: 114,
    f4: 115,
    f5: 116,
    f6: 117,
    f7: 118,
    f8: 119,
    f9: 120,
    f10: 121,
    f11: 122,
    f12: 123,
    numlock: 144,
    scrolllock: 145,
    semicolon: 186,
    equalsign: 187,
    comma: 188,
    dash: 189,
    period: 190,
    forwardslash: 191,
    graveaccent: 192,
    openbracket: 219,
    backslash: 220,
    closebracket: 221,
    singlequote: 222
  };
  var modifierKey = {
    ctrl: function(event) {
      return event.ctrlKey;
    },
    shift: function(event) {
      return event.shiftKey;
    },
    alt: function(event) {
      return event.altKey;
    },
    meta: function(event) {
      if (event.type === "keyup") {
        return aliasKeyCodeMap.meta.includes(event.keyCode);
      }
      return event.metaKey;
    }
  };
  function isValidKeyType(value) {
    return isString(value) || isNumber(value);
  }
  function countKeyByEvent(event) {
    var countOfModifier = Object.keys(modifierKey).reduce(function(total, key2) {
      if (modifierKey[key2](event)) {
        return total + 1;
      }
      return total;
    }, 0);
    return [16, 17, 18, 91, 92].includes(event.keyCode) ? countOfModifier : countOfModifier + 1;
  }
  function genFilterKey(event, keyFilter, exactMatch) {
    var e_1, _a2;
    if (!event.key) {
      return false;
    }
    if (isNumber(keyFilter)) {
      return event.keyCode === keyFilter ? keyFilter : false;
    }
    var genArr = keyFilter.split(".");
    var genLen = 0;
    try {
      for (var genArr_1 = __values(genArr), genArr_1_1 = genArr_1.next(); !genArr_1_1.done; genArr_1_1 = genArr_1.next()) {
        var key2 = genArr_1_1.value;
        var genModifier = modifierKey[key2];
        var aliasKeyCode = aliasKeyCodeMap[key2.toLowerCase()];
        if (genModifier && genModifier(event) || aliasKeyCode && aliasKeyCode === event.keyCode) {
          genLen++;
        }
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (genArr_1_1 && !genArr_1_1.done && (_a2 = genArr_1.return)) _a2.call(genArr_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
    if (exactMatch) {
      return genLen === genArr.length && countKeyByEvent(event) === genArr.length ? keyFilter : false;
    }
    return genLen === genArr.length ? keyFilter : false;
  }
  function genKeyFormatter(keyFilter, exactMatch) {
    if (isFunction$2(keyFilter)) {
      return keyFilter;
    }
    if (isValidKeyType(keyFilter)) {
      return function(event) {
        return genFilterKey(event, keyFilter, exactMatch);
      };
    }
    if (Array.isArray(keyFilter)) {
      return function(event) {
        return keyFilter.find(function(item) {
          return genFilterKey(event, item, exactMatch);
        });
      };
    }
    return function() {
      return Boolean(keyFilter);
    };
  }
  var defaultEvents = ["keydown"];
  function useKeyPress(keyFilter, eventHandler, option) {
    var _a2 = option || {}, _b2 = _a2.events, events2 = _b2 === void 0 ? defaultEvents : _b2, target = _a2.target, _c2 = _a2.exactMatch, exactMatch = _c2 === void 0 ? false : _c2, _d2 = _a2.useCapture, useCapture = _d2 === void 0 ? false : _d2;
    var eventHandlerRef = useLatest(eventHandler);
    var keyFilterRef = useLatest(keyFilter);
    useDeepCompareEffectWithTarget(function() {
      var e_2, _a3;
      var _b3;
      var el = getTargetElement(target, window);
      if (!el) {
        return;
      }
      var callbackHandler = function(event) {
        var _a4;
        var genGuard = genKeyFormatter(keyFilterRef.current, exactMatch);
        var keyGuard = genGuard(event);
        var firedKey = isValidKeyType(keyGuard) ? keyGuard : event.key;
        if (keyGuard) {
          return (_a4 = eventHandlerRef.current) === null || _a4 === void 0 ? void 0 : _a4.call(eventHandlerRef, event, firedKey);
        }
      };
      try {
        for (var events_1 = __values(events2), events_1_1 = events_1.next(); !events_1_1.done; events_1_1 = events_1.next()) {
          var eventName = events_1_1.value;
          (_b3 = el === null || el === void 0 ? void 0 : el.addEventListener) === null || _b3 === void 0 ? void 0 : _b3.call(el, eventName, callbackHandler, useCapture);
        }
      } catch (e_2_1) {
        e_2 = {
          error: e_2_1
        };
      } finally {
        try {
          if (events_1_1 && !events_1_1.done && (_a3 = events_1.return)) _a3.call(events_1);
        } finally {
          if (e_2) throw e_2.error;
        }
      }
      return function() {
        var e_3, _a4;
        var _b4;
        try {
          for (var events_2 = __values(events2), events_2_1 = events_2.next(); !events_2_1.done; events_2_1 = events_2.next()) {
            var eventName2 = events_2_1.value;
            (_b4 = el === null || el === void 0 ? void 0 : el.removeEventListener) === null || _b4 === void 0 ? void 0 : _b4.call(el, eventName2, callbackHandler, useCapture);
          }
        } catch (e_3_1) {
          e_3 = {
            error: e_3_1
          };
        } finally {
          try {
            if (events_2_1 && !events_2_1.done && (_a4 = events_2.return)) _a4.call(events_2);
          } finally {
            if (e_3) throw e_3.error;
          }
        }
      };
    }, [events2], target);
  }
  function useLockFn(fn) {
    var _this = this;
    var lockRef = React__default.useRef(false);
    return React__default.useCallback(function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return __awaiter(_this, void 0, void 0, function() {
        var ret, e_1;
        return __generator(this, function(_a2) {
          switch (_a2.label) {
            case 0:
              if (lockRef.current) return [
                2
                /*return*/
              ];
              lockRef.current = true;
              _a2.label = 1;
            case 1:
              _a2.trys.push([1, 3, 4, 5]);
              return [4, fn.apply(void 0, __spreadArray([], __read(args), false))];
            case 2:
              ret = _a2.sent();
              return [2, ret];
            case 3:
              e_1 = _a2.sent();
              throw e_1;
            case 4:
              lockRef.current = false;
              return [
                7
                /*endfinally*/
              ];
            case 5:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    }, [fn]);
  }
  function useRafState(initialState) {
    var ref = React__default.useRef(0);
    var _a2 = __read(React__default.useState(initialState), 2), state = _a2[0], setState = _a2[1];
    var setRafState = React__default.useCallback(function(value) {
      cancelAnimationFrame(ref.current);
      ref.current = requestAnimationFrame(function() {
        setState(value);
      });
    }, []);
    useUnmount(function() {
      cancelAnimationFrame(ref.current);
    });
    return [state, setRafState];
  }
  var initState = {
    screenX: NaN,
    screenY: NaN,
    clientX: NaN,
    clientY: NaN,
    pageX: NaN,
    pageY: NaN,
    elementX: NaN,
    elementY: NaN,
    elementH: NaN,
    elementW: NaN,
    elementPosX: NaN,
    elementPosY: NaN
  };
  const useMouse = function(target) {
    var _a2 = __read(useRafState(initState), 2), state = _a2[0], setState = _a2[1];
    useEventListener("mousemove", function(event) {
      var screenX = event.screenX, screenY = event.screenY, clientX = event.clientX, clientY = event.clientY, pageX = event.pageX, pageY = event.pageY;
      var newState = {
        screenX,
        screenY,
        clientX,
        clientY,
        pageX,
        pageY,
        elementX: NaN,
        elementY: NaN,
        elementH: NaN,
        elementW: NaN,
        elementPosX: NaN,
        elementPosY: NaN
      };
      var targetElement = getTargetElement(target);
      if (targetElement) {
        var _a3 = targetElement.getBoundingClientRect(), left = _a3.left, top_1 = _a3.top, width = _a3.width, height = _a3.height;
        newState.elementPosX = left + window.pageXOffset;
        newState.elementPosY = top_1 + window.pageYOffset;
        newState.elementX = pageX - newState.elementPosX;
        newState.elementY = pageY - newState.elementPosY;
        newState.elementW = width;
        newState.elementH = height;
      }
      setState(newState);
    }, {
      target: function() {
        return document;
      }
    });
    return state;
  };
  var defaultShouldUpdate = function(a, b2) {
    return !Object.is(a, b2);
  };
  function usePrevious$1(state, shouldUpdate) {
    if (shouldUpdate === void 0) {
      shouldUpdate = defaultShouldUpdate;
    }
    var prevRef = React__default.useRef();
    var curRef = React__default.useRef();
    if (shouldUpdate(curRef.current, state)) {
      prevRef.current = curRef.current;
      curRef.current = state;
    }
    return prevRef.current;
  }
  var useUnmountedRef = function() {
    var unmountedRef = React__default.useRef(false);
    React__default.useEffect(function() {
      unmountedRef.current = false;
      return function() {
        unmountedRef.current = true;
      };
    }, []);
    return unmountedRef;
  };
  const useUpdateLayoutEffect = createUpdateEffect(React__default.useLayoutEffect);
  const BaseModalStyle = {
    modalMask: css`
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10002;

    // make .model center
    display: flex;
    align-items: center;
    justify-content: center;
  `,
    modal: css`
    width: 500px;
    max-height: calc(90vh - 50px);

    background-color: #fff;
    border-radius: 10px;
    padding: 0 15px 15px 15px;

    display: flex;
    flex-direction: column;
    overflow: hidden;
  `,
    modalHeader: css`
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: none;
    display: flex;
    align-items: center;
  `,
    modalBody: css`
    padding-top: 0;
    flex-grow: 1;
    overflow-y: scroll;
  `,
    modalTitle: css`
    font-size: 1.5rem;
    margin-bottom: 0;
    line-height: 1.5;
    display: flex;
    align-items: center;
  `,
    btnClose: css`
    margin-left: 10px;

    svg {
      width: 10px;
      height: 10px;
      margin-right: 3px;
      margin-top: -1px;
    }

    :global(body.dark) & {
      color: #eee !important;
      background-color: #333 !important;
      border-color: transparent !important;
      height: auto;
      padding: 8px 12px;
      line-height: 16px;
      font-size: 13px;
    }
  `
  };
  let showedCount = 0;
  const modalShowCheck = () => {
    showedCount++;
    document.body.style.overflow = "hidden";
  };
  const modalHideCheck = () => {
    showedCount--;
    if (showedCount < 0) showedCount = 0;
    if (showedCount === 0) {
      document.body.style.overflow = "";
    }
  };
  function BaseModal({
    show,
    onHide: onHide2,
    children,
    clsModalMask,
    cssModalMask,
    clsModal,
    cssModal,
    width,
    hideWhenMaskOnClick = false,
    hideWhenEsc = false
  }) {
    React__default.useLayoutEffect(() => {
      if (show) {
        modalShowCheck();
      } else {
        modalHideCheck();
      }
    }, [show]);
    const wrapperRef = React__default.useRef(null);
    const isDarkMode = useIsDarkMode();
    const {
      bg,
      c: c2
    } = React__default.useMemo(() => {
      const bg2 = window.getComputedStyle(document.body).backgroundColor;
      const c22 = window.getComputedStyle(document.body).color;
      return {
        bg: bg2,
        c: c22
      };
    }, [isDarkMode]);
    const wrapperStyle = React__default.useMemo(() => {
      return isDarkMode ? {
        "--bg": bg,
        "--c": c2,
        "backgroundColor": bg,
        "color": c2
      } : (
        // 白色不用特殊处理
        {}
      );
    }, [bg, c2, isDarkMode]);
    const containerId = React__default.useId();
    const container = React__default.useMemo(() => {
      const div = document.createElement("div");
      div.classList.add(APP_CLS_ROOT);
      div.setAttribute("data-id", "base-modal-" + containerId);
      document.body.appendChild(div);
      return div;
    }, []);
    const onMaskClick = useMemoizedFn((e2) => {
      var _a2;
      const target = e2.target;
      if ((_a2 = wrapperRef.current) == null ? void 0 : _a2.contains(target)) return;
      if (target.closest('.ant-tooltip-inner[role="tooltip"]')) return;
      if (target.closest('.ant-popover-inner[role="tooltip"]')) return;
      if (target.closest(".ant-select-dropdown")) return;
      if (hideWhenMaskOnClick) {
        onHide2();
      }
    });
    useKeyPress("esc", (e2) => {
      if (!show) return;
      if (hideWhenEsc) {
        e2.preventDefault();
        e2.stopImmediatePropagation();
        setTimeout(onHide2);
      }
    });
    if (!show) {
      return null;
    }
    return require$$0.createPortal(/* @__PURE__ */ jsx("div", {
      className: clsModalMask,
      css: [BaseModalStyle.modalMask, cssModalMask, "", ""],
      onClick: onMaskClick,
      children: /* @__PURE__ */ jsx("div", {
        style: {
          ...wrapperStyle,
          width
        },
        className: clsModal,
        css: [BaseModalStyle.modal, cssModal, "", ""],
        ref: wrapperRef,
        children
      })
    }), container);
  }
  const ModalClose = (props) => {
    return /* @__PURE__ */ jsx(_Close, {
      ...props,
      css: css`
        ${C.size(18)};
        ${C.ml(10)};
        cursor: pointer;
      `
    });
  };
  var createRoot;
  var m = require$$0;
  {
    createRoot = m.createRoot;
    m.hydrateRoot;
  }
  function supportAvif() {
    return new Promise((resolve, reject) => {
      const avif = new Image();
      avif.src = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=";
      avif.onload = () => resolve(true);
      avif.onerror = (err) => resolve(false);
    });
  }
  const shouldUseAvif = !isSafari && await( supportAvif());
  function getAvatarSrc(avatar) {
    const suffix = shouldUseAvif ? ".avif" : ".webp";
    return `${avatar}@96w_96h_1c_1s_!web-avatar${suffix}`;
  }
  function preloadImg(src2) {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src2;
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  }
  class QuickLRU extends Map {
    constructor(options = {}) {
      super();
      __privateAdd(this, _QuickLRU_instances);
      __privateAdd(this, _size, 0);
      __privateAdd(this, _cache, /* @__PURE__ */ new Map());
      __privateAdd(this, _oldCache, /* @__PURE__ */ new Map());
      __privateAdd(this, _maxSize);
      __privateAdd(this, _maxAge);
      __privateAdd(this, _onEviction);
      if (!(options.maxSize && options.maxSize > 0)) {
        throw new TypeError("`maxSize` must be a number greater than 0");
      }
      if (typeof options.maxAge === "number" && options.maxAge === 0) {
        throw new TypeError("`maxAge` must be a number greater than 0");
      }
      __privateSet(this, _maxSize, options.maxSize);
      __privateSet(this, _maxAge, options.maxAge || Number.POSITIVE_INFINITY);
      __privateSet(this, _onEviction, options.onEviction);
    }
    // For tests.
    get __oldCache() {
      return __privateGet(this, _oldCache);
    }
    get(key2) {
      if (__privateGet(this, _cache).has(key2)) {
        const item = __privateGet(this, _cache).get(key2);
        return __privateMethod(this, _QuickLRU_instances, getItemValue_fn).call(this, key2, item);
      }
      if (__privateGet(this, _oldCache).has(key2)) {
        const item = __privateGet(this, _oldCache).get(key2);
        if (__privateMethod(this, _QuickLRU_instances, deleteIfExpired_fn).call(this, key2, item) === false) {
          __privateMethod(this, _QuickLRU_instances, moveToRecent_fn).call(this, key2, item);
          return item.value;
        }
      }
    }
    set(key2, value, {
      maxAge = __privateGet(this, _maxAge)
    } = {}) {
      const expiry = typeof maxAge === "number" && maxAge !== Number.POSITIVE_INFINITY ? Date.now() + maxAge : void 0;
      if (__privateGet(this, _cache).has(key2)) {
        __privateGet(this, _cache).set(key2, {
          value,
          expiry
        });
      } else {
        __privateMethod(this, _QuickLRU_instances, set_fn).call(this, key2, {
          value,
          expiry
        });
      }
      return this;
    }
    has(key2) {
      if (__privateGet(this, _cache).has(key2)) {
        return !__privateMethod(this, _QuickLRU_instances, deleteIfExpired_fn).call(this, key2, __privateGet(this, _cache).get(key2));
      }
      if (__privateGet(this, _oldCache).has(key2)) {
        return !__privateMethod(this, _QuickLRU_instances, deleteIfExpired_fn).call(this, key2, __privateGet(this, _oldCache).get(key2));
      }
      return false;
    }
    peek(key2) {
      if (__privateGet(this, _cache).has(key2)) {
        return __privateMethod(this, _QuickLRU_instances, peek_fn).call(this, key2, __privateGet(this, _cache));
      }
      if (__privateGet(this, _oldCache).has(key2)) {
        return __privateMethod(this, _QuickLRU_instances, peek_fn).call(this, key2, __privateGet(this, _oldCache));
      }
    }
    delete(key2) {
      const deleted = __privateGet(this, _cache).delete(key2);
      if (deleted) {
        __privateWrapper(this, _size)._--;
      }
      return __privateGet(this, _oldCache).delete(key2) || deleted;
    }
    clear() {
      __privateGet(this, _cache).clear();
      __privateGet(this, _oldCache).clear();
      __privateSet(this, _size, 0);
    }
    resize(newSize) {
      if (!(newSize && newSize > 0)) {
        throw new TypeError("`maxSize` must be a number greater than 0");
      }
      const items = [...__privateMethod(this, _QuickLRU_instances, entriesAscending_fn).call(this)];
      const removeCount = items.length - newSize;
      if (removeCount < 0) {
        __privateSet(this, _cache, new Map(items));
        __privateSet(this, _oldCache, /* @__PURE__ */ new Map());
        __privateSet(this, _size, items.length);
      } else {
        if (removeCount > 0) {
          __privateMethod(this, _QuickLRU_instances, emitEvictions_fn).call(this, items.slice(0, removeCount));
        }
        __privateSet(this, _oldCache, new Map(items.slice(removeCount)));
        __privateSet(this, _cache, /* @__PURE__ */ new Map());
        __privateSet(this, _size, 0);
      }
      __privateSet(this, _maxSize, newSize);
    }
    *keys() {
      for (const [key2] of this) {
        yield key2;
      }
    }
    *values() {
      for (const [, value] of this) {
        yield value;
      }
    }
    *[Symbol.iterator]() {
      for (const item of __privateGet(this, _cache)) {
        const [key2, value] = item;
        const deleted = __privateMethod(this, _QuickLRU_instances, deleteIfExpired_fn).call(this, key2, value);
        if (deleted === false) {
          yield [key2, value.value];
        }
      }
      for (const item of __privateGet(this, _oldCache)) {
        const [key2, value] = item;
        if (!__privateGet(this, _cache).has(key2)) {
          const deleted = __privateMethod(this, _QuickLRU_instances, deleteIfExpired_fn).call(this, key2, value);
          if (deleted === false) {
            yield [key2, value.value];
          }
        }
      }
    }
    *entriesDescending() {
      let items = [...__privateGet(this, _cache)];
      for (let i = items.length - 1; i >= 0; --i) {
        const item = items[i];
        const [key2, value] = item;
        const deleted = __privateMethod(this, _QuickLRU_instances, deleteIfExpired_fn).call(this, key2, value);
        if (deleted === false) {
          yield [key2, value.value];
        }
      }
      items = [...__privateGet(this, _oldCache)];
      for (let i = items.length - 1; i >= 0; --i) {
        const item = items[i];
        const [key2, value] = item;
        if (!__privateGet(this, _cache).has(key2)) {
          const deleted = __privateMethod(this, _QuickLRU_instances, deleteIfExpired_fn).call(this, key2, value);
          if (deleted === false) {
            yield [key2, value.value];
          }
        }
      }
    }
    *entriesAscending() {
      for (const [key2, value] of __privateMethod(this, _QuickLRU_instances, entriesAscending_fn).call(this)) {
        yield [key2, value.value];
      }
    }
    get size() {
      if (!__privateGet(this, _size)) {
        return __privateGet(this, _oldCache).size;
      }
      let oldCacheSize = 0;
      for (const key2 of __privateGet(this, _oldCache).keys()) {
        if (!__privateGet(this, _cache).has(key2)) {
          oldCacheSize++;
        }
      }
      return Math.min(__privateGet(this, _size) + oldCacheSize, __privateGet(this, _maxSize));
    }
    get maxSize() {
      return __privateGet(this, _maxSize);
    }
    entries() {
      return this.entriesAscending();
    }
    forEach(callbackFunction, thisArgument = this) {
      for (const [key2, value] of this.entriesAscending()) {
        callbackFunction.call(thisArgument, value, key2, this);
      }
    }
    get [Symbol.toStringTag]() {
      return JSON.stringify([...this.entriesAscending()]);
    }
  }
  _size = new WeakMap();
  _cache = new WeakMap();
  _oldCache = new WeakMap();
  _maxSize = new WeakMap();
  _maxAge = new WeakMap();
  _onEviction = new WeakMap();
  _QuickLRU_instances = new WeakSet();
  emitEvictions_fn = function(cache2) {
    if (typeof __privateGet(this, _onEviction) !== "function") {
      return;
    }
    for (const [key2, item] of cache2) {
      __privateGet(this, _onEviction).call(this, key2, item.value);
    }
  };
  deleteIfExpired_fn = function(key2, item) {
    if (typeof item.expiry === "number" && item.expiry <= Date.now()) {
      if (typeof __privateGet(this, _onEviction) === "function") {
        __privateGet(this, _onEviction).call(this, key2, item.value);
      }
      return this.delete(key2);
    }
    return false;
  };
  getOrDeleteIfExpired_fn = function(key2, item) {
    const deleted = __privateMethod(this, _QuickLRU_instances, deleteIfExpired_fn).call(this, key2, item);
    if (deleted === false) {
      return item.value;
    }
  };
  getItemValue_fn = function(key2, item) {
    return item.expiry ? __privateMethod(this, _QuickLRU_instances, getOrDeleteIfExpired_fn).call(this, key2, item) : item.value;
  };
  peek_fn = function(key2, cache2) {
    const item = cache2.get(key2);
    return __privateMethod(this, _QuickLRU_instances, getItemValue_fn).call(this, key2, item);
  };
  set_fn = function(key2, value) {
    __privateGet(this, _cache).set(key2, value);
    __privateWrapper(this, _size)._++;
    if (__privateGet(this, _size) >= __privateGet(this, _maxSize)) {
      __privateSet(this, _size, 0);
      __privateMethod(this, _QuickLRU_instances, emitEvictions_fn).call(this, __privateGet(this, _oldCache));
      __privateSet(this, _oldCache, __privateGet(this, _cache));
      __privateSet(this, _cache, /* @__PURE__ */ new Map());
    }
  };
  moveToRecent_fn = function(key2, item) {
    __privateGet(this, _oldCache).delete(key2);
    __privateMethod(this, _QuickLRU_instances, set_fn).call(this, key2, item);
  };
  entriesAscending_fn = function* () {
    for (const item of __privateGet(this, _oldCache)) {
      const [key2, value] = item;
      if (!__privateGet(this, _cache).has(key2)) {
        const deleted = __privateMethod(this, _QuickLRU_instances, deleteIfExpired_fn).call(this, key2, value);
        if (deleted === false) {
          yield item;
        }
      }
    }
    for (const item of __privateGet(this, _cache)) {
      const [key2, value] = item;
      const deleted = __privateMethod(this, _QuickLRU_instances, deleteIfExpired_fn).call(this, key2, value);
      if (deleted === false) {
        yield item;
      }
    }
  };
  async function videoshot(bvid) {
    const res = await request.get("/x/player/videoshot", {
      params: {
        bvid,
        index: "1"
      }
    });
    const json = res.data;
    if (!isWebApiSuccess(json)) {
      console.warn("[%s] videoshot error for %s: %o", APP_NAME, bvid, json);
    }
    if (!isVideoshotDataValid(json.data)) {
      console.warn("[%s] videoshot data invalid bvid=%s: %o", APP_NAME, bvid, json.data);
    }
    return json;
  }
  function isVideoshotDataValid(videoshotData) {
    var _a2, _b2;
    return !!(((_a2 = videoshotData == null ? void 0 : videoshotData.image) == null ? void 0 : _a2.length) && ((_b2 = videoshotData == null ? void 0 : videoshotData.index) == null ? void 0 : _b2.length));
  }
  function isVideoshotJsonCacheable(json) {
    const success = isWebApiSuccess(json);
    if (!success) {
      return true;
    } else {
      return isVideoshotDataValid(json.data);
    }
  }
  const cache$1 = new QuickLRU({
    maxSize: 1e4
  });
  async function fetchVideoData(bvid) {
    if (cache$1.has(bvid)) {
      const cached = cache$1.get(bvid);
      if (cached) return cached;
    }
    const videoshotJson = await videoshot(bvid);
    const videoshotData = videoshotJson.data;
    const cacheable = isVideoshotJsonCacheable(videoshotJson);
    if (cacheable) {
      cache$1.set(bvid, {
        videoshotJson
      });
    }
    if (settings.autoPreviewWhenHover) {
      const imgs = (videoshotData == null ? void 0 : videoshotData.image) || [];
      await preloadImg(imgs[0]);
      (async () => {
        for (const src2 of imgs.slice(1)) {
          await preloadImg(src2);
        }
      })();
    }
    return {
      videoshotJson
    };
  }
  function watchLaterFactory(action2) {
    return async function watchLaterOp(avid) {
      const form = new URLSearchParams({
        aid: avid,
        csrf: getCsrfToken()
      });
      const res = await request.post("/x/v2/history/toview/" + action2, form);
      const json = res.data;
      const success = isWebApiSuccess(json);
      if (!success) {
        toast((json == null ? void 0 : json.message) || "出错了");
      }
      return success;
    };
  }
  const watchLaterAdd = watchLaterFactory("add");
  const watchLaterDel = watchLaterFactory("del");
  const dislikeFactory = (type) => {
    const pathname2 = {
      dislike: "/x/feed/dislike",
      cancel: "/x/feed/dislike/cancel"
    }[type];
    return async function(item, reasonId) {
      const res = await gmrequest.get(HOST_APP + pathname2, {
        params: {
          goto: item.goto,
          id: item.param,
          // mid: item.mid,
          // rid: item.tid,
          // tag_id: item.tag?.tag_id,
          reason_id: reasonId,
          // other stuffs
          build: "1",
          mobi_app: "android",
          idx: (Date.now() / 1e3).toFixed(0)
        }
      });
      const json = res.data;
      const success = isWebApiSuccess(json);
      return success;
    };
  };
  const dislike = dislikeFactory("dislike");
  const cancelDislike = dislikeFactory("cancel");
  function r(e2) {
    var t2, f2, n2 = "";
    if ("string" == typeof e2 || "number" == typeof e2) n2 += e2;
    else if ("object" == typeof e2) if (Array.isArray(e2)) {
      var o = e2.length;
      for (t2 = 0; t2 < o; t2++) e2[t2] && (f2 = r(e2[t2])) && (n2 && (n2 += " "), n2 += f2);
    } else for (f2 in e2) e2[f2] && (n2 && (n2 += " "), n2 += f2);
    return n2;
  }
  function clsx() {
    for (var e2, t2, f2 = 0, n2 = "", o = arguments.length; f2 < o; f2++) (e2 = arguments[f2]) && (t2 = r(e2)) && (n2 && (n2 += " "), n2 += t2);
    return n2;
  }
  const dislikedIds = proxyMap();
  function useDislikedIds() {
    return useSnapshot(dislikedIds);
  }
  function useDislikedReason(id) {
    const map = useDislikedIds();
    if (!id) return void 0;
    return map.get(id);
  }
  function delDislikeId(id) {
    dislikedIds.delete(id);
  }
  function ModalDislike({
    show,
    onHide: onHide2,
    item
  }) {
    const [isRequesting, setIsRequesting] = React__default.useState(false);
    const onDislike = useMemoizedFn(async (reason) => {
      if (!item) return;
      let success = false;
      let err;
      try {
        setIsRequesting(true);
        success = await dislike(item, reason.id);
      } catch (e2) {
        err = e2;
      } finally {
        setIsRequesting(false);
      }
      if (err) {
        console.error(err.stack || err);
        return toastRequestFail();
      }
      success ? AntdMessage.success("已标记不想看") : AntdMessage.error(OPERATION_FAIL_MSG);
      if (success) {
        dislikedIds.set(item.param, {
          ...reason
        });
        onHide2();
      }
    });
    const reasons = React__default.useMemo(() => {
      var _a2;
      return ((_a2 = item == null ? void 0 : item.three_point) == null ? void 0 : _a2.dislike_reasons) || [];
    }, [item]);
    const modalBodyRef = React__default.useRef(null);
    const keyPressEnabled = () => !!show && !!item;
    const KEYS = ["1", "2", "3", "4", "5", "6"];
    useKeyPress(KEYS, (e2) => {
      var _a2;
      if (!keyPressEnabled()) return;
      if (!KEYS.includes(e2.key)) return;
      const index = Number(e2.key) - 1;
      setActiveIndex(index);
      const btn = (_a2 = modalBodyRef.current) == null ? void 0 : _a2.querySelectorAll(".reason")[index];
      btn == null ? void 0 : btn.click();
    });
    const [activeIndex, setActiveIndex] = React__default.useState(reasons.length - 1);
    useUpdateLayoutEffect(() => {
      setActiveIndex(reasons.length - 1);
    }, [reasons]);
    const increaseIndex = (by) => {
      return () => {
        if (!keyPressEnabled()) return;
        const newIndex = activeIndex + by;
        if (newIndex < 0 || newIndex > reasons.length - 1) return;
        setActiveIndex(newIndex);
      };
    };
    useKeyPress("leftarrow", increaseIndex(-1), {
      exactMatch: true
    });
    useKeyPress("rightarrow", increaseIndex(1), {
      exactMatch: true
    });
    useKeyPress("uparrow", increaseIndex(-2), {
      exactMatch: true
    });
    useKeyPress("downarrow", increaseIndex(2), {
      exactMatch: true
    });
    useKeyPress("enter", (e2) => {
      var _a2;
      if (!keyPressEnabled()) return;
      if (activeIndex < 0 || activeIndex > reasons.length - 1) return;
      e2.preventDefault();
      e2.stopImmediatePropagation();
      const btn = (_a2 = modalBodyRef.current) == null ? void 0 : _a2.querySelector(".reason.active");
      btn == null ? void 0 : btn.click();
    }, {
      exactMatch: true
    });
    const activeReasonName = React__default.useMemo(() => {
      var _a2;
      return ((_a2 = reasons[activeIndex]) == null ? void 0 : _a2.name) || "";
    }, [reasons, activeIndex]);
    return /* @__PURE__ */ jsxs(BaseModal, {
      show,
      onHide: onHide2,
      hideWhenMaskOnClick: true,
      hideWhenEsc: true,
      width: 500,
      children: [/* @__PURE__ */ jsxs("div", {
        css: BaseModalStyle.modalHeader,
        children: [/* @__PURE__ */ jsxs("div", {
          css: BaseModalStyle.modalTitle,
          children: [/* @__PURE__ */ jsx(DislikeIcon, {
            className: "size-25"
          }), /* @__PURE__ */ jsx("span", {
            className: "m-inline-5",
            children: "我不想看"
          }), /* @__PURE__ */ jsx("span", {
            css: css`
              font-size: 60%;
              margin-top: 7px;
            `,
            children: "(选择后将减少相似内容推荐)"
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "flex-1"
        }), /* @__PURE__ */ jsx(ModalClose, {
          onClick: onHide2
        })]
      }), /* @__PURE__ */ jsxs("div", {
        css: BaseModalStyle.modalBody,
        ref: modalBodyRef,
        children: [/* @__PURE__ */ jsx("div", {
          className: "reason-list",
          css: css`
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
          `,
          children: reasons.map((reason, index) => {
            const active = index === activeIndex;
            return /* @__PURE__ */ jsxs("button", {
              className: clsx("reason", {
                active
              }),
              css: [S$7.reason, active && S$7.reasonActive, "", ""],
              "data-id": reason.id,
              onClick: () => {
                setActiveIndex(index);
                onDislike(reason);
              },
              disabled: isRequesting,
              children: [/* @__PURE__ */ jsx("span", {
                className: "reason-no",
                css: css`
                    position: absolute;
                    left: 6px;

                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    top: ${(32 - 20) / 2}px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    background-color: ${colorPrimaryValue};
                    color: #fff;
                  `,
                children: index + 1
              }), reason.name]
            }, reason.id);
          })
        }), /* @__PURE__ */ jsxs("div", {
          className: "tips-container",
          css: css`
            margin-top: 20px;
          `,
          children: [/* @__PURE__ */ jsxs("div", {
            className: "tips",
            css: S$7.tips,
            children: [/* @__PURE__ */ jsx(_Info, {
              className: "mr-5 size-15"
            }), "使用删除键打开弹窗, 数字键选择, Esc 关闭"]
          }), activeReasonName && /* @__PURE__ */ jsxs("div", {
            className: "tips",
            css: S$7.tips,
            children: [/* @__PURE__ */ jsx(_Info, {
              className: "mr-5 size-15"
            }), "已选择「", activeReasonName, "」, 回车键提交"]
          })]
        })]
      })]
    });
  }
  const S$7 = {
    reason: css`
    color: inherit;
    width: 48%;
    text-align: center;
    line-height: 20px;
    position: relative;

    border-radius: 4px;
    border: 2px solid #eee;

    /* https://github.com/emotion-js/emotion/issues/2836 */
    * :where(body.dark) & {
      border-color: #333;
    }

    padding-top: 5px;
    padding-bottom: 5px;
    margin-top: 5px;
    margin-bottom: 5px;
  `,
    reasonActive: css`
    /* to increase specificity */
    &.active {
      border-color: ${colorPrimaryValue};
    }
  `,
    tips: css`
    display: flex;
    align-items: center;
  `
  };
  const currentProps = {
    show: false,
    onHide,
    item: null
  };
  const modalDislikeVisibleState = proxy({
    value: currentProps.show
  });
  const useModalDislikeVisible = function() {
    return useSnapshot(modalDislikeVisibleState).value;
  };
  function onHide() {
    setTimeout(() => {
      updateProps({
        show: false,
        item: null
      });
    });
  }
  function updateProps(newProps) {
    Object.assign(currentProps, newProps);
    modalDislikeVisibleState.value = currentProps.show;
    getRoot().render(/* @__PURE__ */ jsx(ModalDislike, {
      ...currentProps,
      onHide
    }));
  }
  let _root;
  function getRoot() {
    _root || (_root = (() => {
      const container = document.createElement("div");
      container.classList.add("show-dislike-container", APP_CLS_ROOT);
      document.body.appendChild(container);
      return createRoot(container);
    })());
    return _root;
  }
  function showModalDislike(item) {
    if ((item == null ? void 0 : item.param) && dislikedIds.has(item.param)) return;
    updateProps({
      show: true,
      item
    });
  }
  function AntdTooltip(props) {
    return /* @__PURE__ */ jsx(antd.Tooltip, {
      ...props,
      overlayStyle: {
        width: "max-content",
        maxWidth: "50vw",
        ...props.overlayStyle
      },
      children: props.children
    });
  }
  function __FlagSettingItem({
    configKey,
    label,
    extraAction,
    tooltip,
    tooltipProps,
    as,
    checkboxProps,
    switchProps
  }) {
    const snap = useSettingsSnapshot();
    const checked = !!snap[configKey];
    const onChange = React__default.useCallback((val) => {
      updateSettings({
        [configKey]: val
      });
      extraAction == null ? void 0 : extraAction(val);
    }, []);
    const checkboxOnChange = React__default.useCallback((e2) => {
      onChange(e2.target.checked);
    }, []);
    const wrapTooltip = (children) => {
      if (!tooltip) return children;
      return /* @__PURE__ */ jsx(AntdTooltip, {
        ...tooltipProps,
        title: tooltip,
        children
      });
    };
    if (as === "checkbox") {
      let inner = /* @__PURE__ */ jsx("span", {
        style: {
          userSelect: "none"
        },
        children: label || configKey
      });
      if (tooltip) inner = wrapTooltip(inner);
      return /* @__PURE__ */ jsx(antd.Checkbox, {
        ...checkboxProps,
        checked,
        onChange: checkboxOnChange,
        children: inner
      });
    }
    if (as === "switch") {
      let content = /* @__PURE__ */ jsx(antd.Switch, {
        ...switchProps,
        checked,
        onChange
      });
      if (tooltip) content = wrapTooltip(content);
      return content;
    }
  }
  function CheckboxSettingItem({
    configKey,
    label,
    extraAction,
    tooltip,
    tooltipProps,
    ...otherProps
  }) {
    return /* @__PURE__ */ jsx(__FlagSettingItem, {
      ...{
        configKey,
        label,
        extraAction,
        tooltip,
        tooltipProps,
        as: "checkbox",
        checkboxProps: otherProps
      }
    });
  }
  function SwitchSettingItem({
    configKey,
    extraAction,
    tooltip,
    tooltipProps,
    ...otherProps
  }) {
    return /* @__PURE__ */ jsx(__FlagSettingItem, {
      ...{
        configKey,
        extraAction,
        tooltip,
        tooltipProps,
        as: "switch",
        switchProps: otherProps
      }
    });
  }
  function useRefInit(init) {
    const ref = React__default.useRef(null);
    ref.current ?? (ref.current = init());
    return ref;
  }
  class QueueStrategy {
    constructor(ps = 20) {
      // full-list = returnQueue + bufferQueue + more
      __publicField(this, "returnQueue", []);
      __publicField(this, "bufferQueue", []);
      __publicField(this, "ps");
      this.ps = ps;
    }
    get hasCache() {
      return !!this.returnQueue.length;
    }
    sliceFromQueue(page = 1) {
      if (this.bufferQueue.length) {
        const sliced = this.bufferQueue.slice(0, this.ps * page);
        this.bufferQueue = this.bufferQueue.slice(this.ps * page);
        return this.doReturnItems(sliced);
      }
    }
    // add to returnQueue
    doReturnItems(items) {
      this.returnQueue = [...this.returnQueue, ...items || []];
      return items;
    }
    // restore from returnQueue
    restore() {
      this.bufferQueue = [...this.returnQueue, ...this.bufferQueue];
      this.returnQueue = [];
    }
  }
  function usePopupContainer() {
    const ref = React__default.useRef(null);
    const getPopupContainer = React__default.useCallback(() => {
      var _a2;
      return ((_a2 = ref.current) == null ? void 0 : _a2.closest(".area-header")) || document.body;
    }, []);
    return {
      ref,
      getPopupContainer
    };
  }
  class PopularGeneralRecService {
    constructor() {
      __publicField(this, "hasMore", true);
      __publicField(this, "page", 0);
      // pages loaded
      // shuffle: boolean
      __publicField(this, "anonymous");
      this.anonymous = settings.anonymousForPopularGeneral;
    }
    async loadMore() {
      if (!this.hasMore) return;
      const res = await request.get("/x/web-interface/popular", {
        params: {
          ps: 20,
          pn: this.page + 1
        },
        withCredentials: !this.anonymous
      });
      const json = res.data;
      if (!isWebApiSuccess(json)) {
        return toast(json.message || REQUEST_FAIL_MSG), void 0;
      }
      this.page++;
      this.hasMore = !json.data.no_more;
      const items = (json.data.list || []).map((item) => {
        return {
          ...item,
          api: EApiType.PopularGeneral,
          uniqId: item.bvid
        };
      });
      return items;
    }
    get usageInfo() {
      return /* @__PURE__ */ jsx(PopularGeneralUsageInfo, {});
    }
  }
  function PopularGeneralUsageInfo() {
    const onRefresh = useOnRefreshContext();
    return /* @__PURE__ */ jsx(SwitchSettingItem, {
      configKey: "anonymousForPopularGeneral",
      checkedChildren: "匿名访问: 开",
      unCheckedChildren: "匿名访问: 关",
      tooltip: /* @__PURE__ */ jsx(Fragment, {
        children: "✅ 匿名访问: 使用游客身份访问"
      }),
      extraAction: async () => {
        await delay(100);
        onRefresh == null ? void 0 : onRefresh();
      }
    });
  }
  var src = { exports: {} };
  var worker = function mapOnWorker(arr2, fn, workers) {
    return new Promise(function(resolve, reject) {
      var completed = 0;
      var started = 0;
      var running = 0;
      var results = new Array(arr2.length).fill(void 0);
      var rejected = false;
      var workerIsUnsing = /* @__PURE__ */ new WeakMap();
      var getWorker = function(index) {
        for (var i = 0; i < workers.length; i++) {
          var worker2 = workers[i];
          if (workerIsUnsing.get(worker2)) {
            continue;
          } else {
            workerIsUnsing.set(worker2, index);
            return worker2;
          }
        }
      };
      function start(index) {
        var cur = arr2[index];
        var worker2 = getWorker(index);
        Promise.resolve(fn.call(cur, cur, index, arr2, worker2)).then(function(result) {
          workerIsUnsing.delete(worker2);
          running--;
          results[index] = result;
          completed++;
          replenish();
        }).catch(function(err) {
          rejected = true;
          reject(err);
        });
      }
      function replenish() {
        if (rejected) return;
        if (completed >= arr2.length) {
          return resolve(results);
        }
        while (running < workers.length && started < arr2.length) {
          start(started);
          started++;
          running++;
        }
      }
      replenish();
    });
  };
  src.exports = function pmap(arr2, fn, concurrency) {
    concurrency = concurrency || Infinity;
    if (typeof concurrency !== "number") {
      throw new TypeError(String(concurrency) + " is not a number");
    }
    return new Promise(function(resolve, reject) {
      var completed = 0;
      var started = 0;
      var running = 0;
      var results = new Array(arr2.length).fill(void 0);
      var rejected = false;
      function start(index) {
        var cur = arr2[index];
        Promise.resolve(fn.call(cur, cur, index, arr2)).then(function(result) {
          running--;
          completed++;
          results[index] = result;
          replenish();
        }).catch(function(err) {
          rejected = true;
          reject(err);
        });
      }
      function replenish() {
        if (rejected) return;
        if (completed >= arr2.length) {
          return resolve(results);
        }
        while (running < concurrency && started < arr2.length) {
          start(started);
          running++;
          started++;
        }
      }
      replenish();
    });
  };
  var pmapWorker = worker;
  src.exports.pmapWorker = pmapWorker;
  var srcExports = src.exports;
  const pmap2 = /* @__PURE__ */ getDefaultExportFromCjs(srcExports);
  let episodes = [];
  let cacheKey = "";
  function genCacheKey() {
    const now = dayjs();
    return [now.format("YYYYMMDD"), now.hour() < 18 ? "lt-18" : "gte-18"].join("_");
  }
  async function getEpisodeList() {
    const useCache = episodes.length && cacheKey && cacheKey === genCacheKey();
    if (useCache) return episodes;
    const res = await request.get("/x/web-interface/popular/series/list");
    const json = res.data;
    const list = json.data.list;
    episodes = list;
    cacheKey = genCacheKey();
    return episodes;
  }
  const _PopularWeeklyRecService = class _PopularWeeklyRecService {
    constructor() {
      __publicField(this, "episodesLoaded", false);
      __publicField(this, "episodes", []);
      __publicField(this, "id");
      __publicField(this, "useShuffle");
      // full-list = returnedItems + bufferQueue + more
      __publicField(this, "qs", new QueueStrategy(_PopularWeeklyRecService.PAGE_SIZE));
      this.id = _PopularWeeklyRecService.id++;
      this.useShuffle = settings.shuffleForPopularWeekly;
    }
    get hasMore() {
      if (!this.episodesLoaded) return true;
      return !!this.qs.bufferQueue.length || !!this.episodes.length;
    }
    async loadMore() {
      if (!this.episodesLoaded) {
        this.episodes = await getEpisodeList();
        this.episodesLoaded = true;
        if (this.useShuffle) this.episodes = lodash.shuffle(this.episodes);
      }
      if (!this.hasMore) return;
      if (!this.useShuffle) {
        if (this.qs.bufferQueue.length) return this.qs.sliceFromQueue();
        const ep = this.episodes[0];
        const epNum = ep.number;
        const items = await fetchWeeklyItems(epNum);
        this.qs.bufferQueue.push({
          api: EApiType.Separator,
          uniqId: `popular-weekly-${epNum}`,
          content: /* @__PURE__ */ jsx("a", {
            target: "_blank",
            href: `https://www.bilibili.com/v/popular/weekly?num=${epNum}`,
            children: ep.name
          })
        }, ...items);
        this.episodes = this.episodes.slice(1);
        return this.qs.sliceFromQueue();
      }
      const prefetchPage = 5;
      while (this.qs.bufferQueue.length < _PopularWeeklyRecService.PAGE_SIZE * prefetchPage && this.episodes.length) {
        this.episodes = lodash.shuffle(this.episodes);
        const episodes2 = this.episodes.slice(0, prefetchPage);
        this.episodes = this.episodes.slice(prefetchPage);
        const fetched = await pmap2(episodes2.map((x2) => x2.number), (episodeNum) => fetchWeeklyItems(episodeNum), 2);
        this.qs.bufferQueue = lodash.shuffle([...this.qs.bufferQueue, ...fetched.flat()]);
      }
      return this.qs.sliceFromQueue();
    }
    get usageInfo() {
      return /* @__PURE__ */ jsx(PopularWeeklyUsageInfo, {});
    }
  };
  __publicField(_PopularWeeklyRecService, "id", 0);
  __publicField(_PopularWeeklyRecService, "PAGE_SIZE", 20);
  let PopularWeeklyRecService = _PopularWeeklyRecService;
  const cache = {};
  async function fetchWeeklyItems(episodeNum) {
    var _a2;
    if (!((_a2 = cache[episodeNum]) == null ? void 0 : _a2.length)) {
      const res = await request.get("/x/web-interface/popular/series/one", {
        params: {
          number: episodeNum
        }
      });
      const json = res.data;
      const items2 = (json.data.list || []).map((item) => {
        return {
          ...item,
          api: EApiType.PopularWeekly,
          uniqId: item.bvid
        };
      });
      cache[episodeNum] = items2;
    }
    const items = cache[episodeNum];
    return items;
  }
  function PopularWeeklyUsageInfo() {
    const onRefresh = useOnRefreshContext();
    return /* @__PURE__ */ jsx(Fragment, {
      children: /* @__PURE__ */ jsx(SwitchSettingItem, {
        configKey: "shuffleForPopularWeekly",
        checkedChildren: "随机顺序: 开",
        unCheckedChildren: "随机顺序: 关",
        extraAction: async () => {
          await delay(100);
          onRefresh == null ? void 0 : onRefresh();
        }
      })
    });
  }
  const _Drag = IconWrapper("drag", false, function(props) {
    return /* @__PURE__ */ React__default.createElement("svg", {
      width: props.size,
      height: props.size,
      viewBox: "0 0 48 48",
      fill: "none"
    }, /* @__PURE__ */ React__default.createElement("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M19 10C19 12.2091 17.2091 14 15 14C12.7909 14 11 12.2091 11 10C11 7.79086 12.7909 6 15 6C17.2091 6 19 7.79086 19 10ZM15 28C17.2091 28 19 26.2091 19 24C19 21.7909 17.2091 20 15 20C12.7909 20 11 21.7909 11 24C11 26.2091 12.7909 28 15 28ZM15 42C17.2091 42 19 40.2091 19 38C19 35.7909 17.2091 34 15 34C12.7909 34 11 35.7909 11 38C11 40.2091 12.7909 42 15 42Z",
      fill: props.colors[0]
    }), /* @__PURE__ */ React__default.createElement("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M37 10C37 12.2091 35.2091 14 33 14C30.7909 14 29 12.2091 29 10C29 7.79086 30.7909 6 33 6C35.2091 6 37 7.79086 37 10ZM33 28C35.2091 28 37 26.2091 37 24C37 21.7909 35.2091 20 33 20C30.7909 20 29 21.7909 29 24C29 26.2091 30.7909 28 33 28ZM33 42C35.2091 42 37 40.2091 37 38C37 35.7909 35.2091 34 33 34C30.7909 34 29 35.7909 29 38C29 40.2091 30.7909 42 33 42Z",
      fill: props.colors[0]
    }));
  });
  const _PeopleSearch = IconWrapper("people-search", true, function(props) {
    return /* @__PURE__ */ React__default.createElement("svg", {
      width: props.size,
      height: props.size,
      viewBox: "0 0 48 48",
      fill: "none"
    }, /* @__PURE__ */ React__default.createElement("path", {
      d: "M19 20C22.866 20 26 16.866 26 13C26 9.13401 22.866 6 19 6C15.134 6 12 9.13401 12 13C12 16.866 15.134 20 19 20Z",
      fill: props.colors[1],
      stroke: props.colors[0],
      strokeWidth: props.strokeWidth,
      strokeLinejoin: props.strokeLinejoin
    }), /* @__PURE__ */ React__default.createElement("path", {
      d: "M27 28H18.8C14.3196 28 12.0794 28 10.3681 28.8719C8.86278 29.6389 7.63893 30.8628 6.87195 32.3681C6 34.0794 6 36.3196 6 40.8V42H27",
      stroke: props.colors[0],
      strokeWidth: props.strokeWidth,
      strokeLinecap: props.strokeLinecap,
      strokeLinejoin: props.strokeLinejoin
    }), /* @__PURE__ */ React__default.createElement("path", {
      d: "M39.9997 41.0002L36.8281 37.8286",
      stroke: props.colors[0],
      strokeWidth: props.strokeWidth,
      strokeLinecap: props.strokeLinecap,
      strokeLinejoin: props.strokeLinejoin
    }), /* @__PURE__ */ React__default.createElement("path", {
      d: "M38 35C38 36.1046 37.5523 37.1046 36.8284 37.8284C36.1046 38.5523 35.1046 39 34 39C31.7909 39 30 37.2091 30 35C30 32.7909 31.7909 31 34 31C36.2091 31 38 32.7909 38 35Z",
      fill: props.colors[1],
      stroke: props.colors[0],
      strokeWidth: props.strokeWidth,
      strokeLinecap: props.strokeLinecap,
      strokeLinejoin: props.strokeLinejoin
    }));
  });
  const _PeopleMinus = IconWrapper("people-minus", true, function(props) {
    return /* @__PURE__ */ React__default.createElement("svg", {
      width: props.size,
      height: props.size,
      viewBox: "0 0 48 48",
      fill: "none"
    }, /* @__PURE__ */ React__default.createElement("path", {
      d: "M19 20C22.866 20 26 16.866 26 13C26 9.13401 22.866 6 19 6C15.134 6 12 9.13401 12 13C12 16.866 15.134 20 19 20Z",
      fill: props.colors[1],
      stroke: props.colors[0],
      strokeWidth: props.strokeWidth,
      strokeLinejoin: props.strokeLinejoin
    }), /* @__PURE__ */ React__default.createElement("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M30 35H42H30Z",
      fill: props.colors[1]
    }), /* @__PURE__ */ React__default.createElement("path", {
      d: "M30 35H42",
      stroke: props.colors[0],
      strokeWidth: props.strokeWidth,
      strokeLinecap: props.strokeLinecap,
      strokeLinejoin: props.strokeLinejoin
    }), /* @__PURE__ */ React__default.createElement("path", {
      d: "M27 28H18.8C14.3196 28 12.0794 28 10.3681 28.8719C8.86278 29.6389 7.63893 30.8628 6.87195 32.3681C6 34.0794 6 36.3196 6 40.8V42H27",
      stroke: props.colors[0],
      strokeWidth: props.strokeWidth,
      strokeLinecap: props.strokeLinecap,
      strokeLinejoin: props.strokeLinejoin
    }));
  });
  const _PeopleDelete = IconWrapper("people-delete", true, function(props) {
    return /* @__PURE__ */ React__default.createElement("svg", {
      width: props.size,
      height: props.size,
      viewBox: "0 0 48 48",
      fill: "none"
    }, /* @__PURE__ */ React__default.createElement("path", {
      d: "M19 20C22.866 20 26 16.866 26 13C26 9.13401 22.866 6 19 6C15.134 6 12 9.13401 12 13C12 16.866 15.134 20 19 20Z",
      fill: props.colors[1],
      stroke: props.colors[0],
      strokeWidth: props.strokeWidth,
      strokeLinejoin: props.strokeLinejoin
    }), /* @__PURE__ */ React__default.createElement("path", {
      d: "M33 31L41 39",
      stroke: props.colors[0],
      strokeWidth: props.strokeWidth,
      strokeLinecap: props.strokeLinecap,
      strokeLinejoin: props.strokeLinejoin
    }), /* @__PURE__ */ React__default.createElement("path", {
      d: "M33 39L41 31",
      stroke: props.colors[0],
      strokeWidth: props.strokeWidth,
      strokeLinecap: props.strokeLinecap,
      strokeLinejoin: props.strokeLinejoin
    }), /* @__PURE__ */ React__default.createElement("path", {
      d: "M27 28H18.8C14.3196 28 12.0794 28 10.3681 28.8719C8.86278 29.6389 7.63893 30.8628 6.87195 32.3681C6 34.0794 6 36.3196 6 40.8V42H27",
      stroke: props.colors[0],
      strokeWidth: props.strokeWidth,
      strokeLinecap: props.strokeLinecap,
      strokeLinejoin: props.strokeLinejoin
    }));
  });
  const _AddTwo = IconWrapper("add-two", true, function(props) {
    return /* @__PURE__ */ React__default.createElement("svg", {
      width: props.size,
      height: props.size,
      viewBox: "0 0 48 48",
      fill: "none"
    }, /* @__PURE__ */ React__default.createElement("path", {
      d: "M33 7.26261C30.3212 5.81915 27.2563 5 24 5C13.5066 5 5 13.5066 5 24C5 34.4934 13.5066 43 24 43C26.858 43 29.5685 42.369 32 41.2387",
      stroke: props.colors[0],
      strokeWidth: props.strokeWidth,
      strokeLinecap: props.strokeLinecap
    }), /* @__PURE__ */ React__default.createElement("path", {
      d: "M31 30L43 30",
      stroke: props.colors[0],
      strokeWidth: props.strokeWidth,
      strokeLinecap: props.strokeLinecap,
      strokeLinejoin: props.strokeLinejoin
    }), /* @__PURE__ */ React__default.createElement("path", {
      d: "M15 22L22 29L41 11",
      stroke: props.colors[0],
      strokeWidth: props.strokeWidth,
      strokeLinecap: props.strokeLinecap,
      strokeLinejoin: props.strokeLinejoin
    }), /* @__PURE__ */ React__default.createElement("path", {
      d: "M37 24V36",
      stroke: props.colors[0],
      strokeWidth: props.strokeWidth,
      strokeLinecap: props.strokeLinecap,
      strokeLinejoin: props.strokeLinejoin
    }));
  });
  const _Copy = IconWrapper("copy", true, function(props) {
    return /* @__PURE__ */ React__default.createElement("svg", {
      width: props.size,
      height: props.size,
      viewBox: "0 0 48 48",
      fill: "none"
    }, /* @__PURE__ */ React__default.createElement("path", {
      d: "M13 12.4316V7.8125C13 6.2592 14.2592 5 15.8125 5H40.1875C41.7408 5 43 6.2592 43 7.8125V32.1875C43 33.7408 41.7408 35 40.1875 35H35.5163",
      stroke: props.colors[0],
      strokeWidth: props.strokeWidth,
      strokeLinecap: props.strokeLinecap,
      strokeLinejoin: props.strokeLinejoin
    }), /* @__PURE__ */ React__default.createElement("path", {
      d: "M32.1875 13H7.8125C6.2592 13 5 14.2592 5 15.8125V40.1875C5 41.7408 6.2592 43 7.8125 43H32.1875C33.7408 43 35 41.7408 35 40.1875V15.8125C35 14.2592 33.7408 13 32.1875 13Z",
      fill: props.colors[1],
      stroke: props.colors[0],
      strokeWidth: props.strokeWidth,
      strokeLinejoin: props.strokeLinejoin
    }));
  });
  const _Star = IconWrapper("star", false, function(props) {
    return /* @__PURE__ */ React__default.createElement("svg", {
      width: props.size,
      height: props.size,
      viewBox: "0 0 48 48",
      fill: "none"
    }, /* @__PURE__ */ React__default.createElement("path", {
      d: "M23.9986 5L17.8856 17.4776L4 19.4911L14.0589 29.3251L11.6544 43L23.9986 36.4192L36.3454 43L33.9586 29.3251L44 19.4911L30.1913 17.4776L23.9986 5Z",
      fill: props.colors[1],
      stroke: props.colors[0],
      strokeWidth: props.strokeWidth,
      strokeLinejoin: props.strokeLinejoin
    }));
  });
  const _FileCabinet = IconWrapper("file-cabinet", false, function(props) {
    return /* @__PURE__ */ React__default.createElement("svg", {
      width: props.size,
      height: props.size,
      viewBox: "0 0 48 48",
      fill: "none"
    }, /* @__PURE__ */ React__default.createElement("path", {
      d: "M42 4H6V14H42V4Z",
      fill: props.colors[1],
      stroke: props.colors[0],
      strokeWidth: props.strokeWidth,
      strokeLinejoin: props.strokeLinejoin
    }), /* @__PURE__ */ React__default.createElement("path", {
      d: "M42 19H6V29H42V19Z",
      fill: props.colors[1],
      stroke: props.colors[0],
      strokeWidth: props.strokeWidth,
      strokeLinejoin: props.strokeLinejoin
    }), /* @__PURE__ */ React__default.createElement("path", {
      d: "M42 34H6V44H42V34Z",
      fill: props.colors[1],
      stroke: props.colors[0],
      strokeWidth: props.strokeWidth,
      strokeLinejoin: props.strokeLinejoin
    }), /* @__PURE__ */ React__default.createElement("path", {
      d: "M21 9H27",
      stroke: props.colors[2],
      strokeWidth: props.strokeWidth,
      strokeLinecap: props.strokeLinecap
    }), /* @__PURE__ */ React__default.createElement("path", {
      d: "M21 24H27",
      stroke: props.colors[2],
      strokeWidth: props.strokeWidth,
      strokeLinecap: props.strokeLinecap
    }), /* @__PURE__ */ React__default.createElement("path", {
      d: "M21 39H27",
      stroke: props.colors[2],
      strokeWidth: props.strokeWidth,
      strokeLinecap: props.strokeLinecap
    }));
  });
  const _Tips = IconWrapper("tips", false, function(props) {
    return /* @__PURE__ */ React__default.createElement("svg", {
      width: props.size,
      height: props.size,
      viewBox: "0 0 48 48",
      fill: "none"
    }, /* @__PURE__ */ React__default.createElement("path", {
      d: "M40 20C40 26.8077 35.7484 32.6224 29.7555 34.9336H24H18.2445C12.2516 32.6224 8 26.8077 8 20C8 11.1634 15.1634 4 24 4C32.8366 4 40 11.1634 40 20Z",
      fill: props.colors[1],
      stroke: props.colors[0],
      strokeWidth: props.strokeWidth,
      strokeLinecap: props.strokeLinecap,
      strokeLinejoin: props.strokeLinejoin
    }), /* @__PURE__ */ React__default.createElement("path", {
      d: "M29.7557 34.9336L29.0766 43.0831C29.0334 43.6014 28.6001 44 28.08 44H19.9203C19.4002 44 18.9669 43.6014 18.9238 43.0831L18.2446 34.9336",
      stroke: props.colors[0],
      strokeWidth: props.strokeWidth,
      strokeLinecap: props.strokeLinecap,
      strokeLinejoin: props.strokeLinejoin
    }), /* @__PURE__ */ React__default.createElement("path", {
      d: "M18 17V23L24 20L30 23V17",
      stroke: props.colors[2],
      strokeWidth: props.strokeWidth,
      strokeLinecap: props.strokeLinecap,
      strokeLinejoin: props.strokeLinejoin
    }));
  });
  const _Return = IconWrapper("return", true, function(props) {
    return /* @__PURE__ */ React__default.createElement("svg", {
      width: props.size,
      height: props.size,
      viewBox: "0 0 48 48",
      fill: "none"
    }, /* @__PURE__ */ React__default.createElement("path", {
      d: "M12.9998 8L6 14L12.9998 21",
      stroke: props.colors[0],
      strokeWidth: props.strokeWidth,
      strokeLinecap: props.strokeLinecap,
      strokeLinejoin: props.strokeLinejoin
    }), /* @__PURE__ */ React__default.createElement("path", {
      d: "M6 14H28.9938C35.8768 14 41.7221 19.6204 41.9904 26.5C42.2739 33.7696 36.2671 40 28.9938 40H11.9984",
      stroke: props.colors[0],
      strokeWidth: props.strokeWidth,
      strokeLinecap: props.strokeLinecap,
      strokeLinejoin: props.strokeLinejoin
    }));
  });
  const _Loading = IconWrapper("loading", true, function(props) {
    return /* @__PURE__ */ React__default.createElement("svg", {
      width: props.size,
      height: props.size,
      viewBox: "0 0 48 48",
      fill: "none"
    }, /* @__PURE__ */ React__default.createElement("path", {
      d: "M4 24C4 35.0457 12.9543 44 24 44V44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4",
      stroke: props.colors[0],
      strokeWidth: props.strokeWidth,
      strokeLinecap: props.strokeLinecap,
      strokeLinejoin: props.strokeLinejoin
    }), /* @__PURE__ */ React__default.createElement("path", {
      d: "M36 24C36 17.3726 30.6274 12 24 12C17.3726 12 12 17.3726 12 24C12 30.6274 17.3726 36 24 36V36",
      stroke: props.colors[0],
      strokeWidth: props.strokeWidth,
      strokeLinecap: props.strokeLinecap,
      strokeLinejoin: props.strokeLinejoin
    }));
  });
  const _Help = IconWrapper("help", true, function(props) {
    return /* @__PURE__ */ React__default.createElement("svg", {
      width: props.size,
      height: props.size,
      viewBox: "0 0 48 48",
      fill: "none"
    }, /* @__PURE__ */ React__default.createElement("path", {
      d: "M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z",
      fill: props.colors[1],
      stroke: props.colors[0],
      strokeWidth: props.strokeWidth,
      strokeLinejoin: props.strokeLinejoin
    }), /* @__PURE__ */ React__default.createElement("path", {
      d: "M24 28.6248V24.6248C27.3137 24.6248 30 21.9385 30 18.6248C30 15.3111 27.3137 12.6248 24 12.6248C20.6863 12.6248 18 15.3111 18 18.6248",
      stroke: props.colors[2],
      strokeWidth: props.strokeWidth,
      strokeLinecap: props.strokeLinecap,
      strokeLinejoin: props.strokeLinejoin
    }), /* @__PURE__ */ React__default.createElement("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M24 37.6248C25.3807 37.6248 26.5 36.5055 26.5 35.1248C26.5 33.7441 25.3807 32.6248 24 32.6248C22.6193 32.6248 21.5 33.7441 21.5 35.1248C21.5 36.5055 22.6193 37.6248 24 37.6248Z",
      fill: props.colors[2]
    }));
  });
  const _DistraughtFace = IconWrapper("distraught-face", false, function(props) {
    return /* @__PURE__ */ React__default.createElement("svg", {
      width: props.size,
      height: props.size,
      viewBox: "0 0 48 48",
      fill: "none"
    }, /* @__PURE__ */ React__default.createElement("path", {
      d: "M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z",
      fill: props.colors[1],
      stroke: props.colors[0],
      strokeWidth: props.strokeWidth,
      strokeLinejoin: props.strokeLinejoin
    }), /* @__PURE__ */ React__default.createElement("path", {
      d: "M24 29C29 29 31 33 31 33H17C17 33 19 29 24 29Z",
      stroke: props.colors[2],
      strokeWidth: props.strokeWidth,
      strokeLinecap: props.strokeLinecap,
      strokeLinejoin: props.strokeLinejoin
    }), /* @__PURE__ */ React__default.createElement("path", {
      d: "M32 17L29 20L32 23",
      stroke: props.colors[2],
      strokeWidth: props.strokeWidth,
      strokeLinecap: props.strokeLinecap,
      strokeLinejoin: props.strokeLinejoin
    }), /* @__PURE__ */ React__default.createElement("path", {
      d: "M16 17L19 20L16 23",
      stroke: props.colors[2],
      strokeWidth: props.strokeWidth,
      strokeLinecap: props.strokeLinecap,
      strokeLinejoin: props.strokeLinejoin
    }));
  });
  const ImportedIcons = {
    DistraughtFace: _DistraughtFace,
    Help: _Help,
    Loading: _Loading,
    Return: _Return,
    Tips: _Tips,
    FileCabinet: _FileCabinet,
    Star: _Star,
    Copy: _Copy,
    AddTwo: _AddTwo,
    PeopleDelete: _PeopleDelete,
    PeopleMinus: _PeopleMinus,
    PeopleSearch: _PeopleSearch,
    Drag: _Drag
  };
  function IconPark({
    name,
    theme: theme2,
    size: size2,
    fill,
    ml,
    mr,
    mt,
    mb,
    ...props
  }) {
    theme2 || (theme2 = "outline");
    size2 || (size2 = 24);
    fill || (fill = "currentColor");
    const Comp = ImportedIcons[name];
    return /* @__PURE__ */ jsx(Comp, {
      ...{
        theme: theme2,
        size: size2,
        fill,
        ...props
      },
      style: {
        fontSize: 0,
        ...ml ? {
          marginLeft: ml + "px"
        } : {},
        ...mr ? {
          marginRight: mr + "px"
        } : {},
        ...mt ? {
          marginTop: mt + "px"
        } : {},
        ...mb ? {
          marginBottom: mb + "px"
        } : {},
        ...props.style
      }
    });
  }
  function HelpInfo({
    children,
    iconProps,
    tooltipProps
  }) {
    return /* @__PURE__ */ jsx(Fragment, {
      children: children && /* @__PURE__ */ jsx(AntdTooltip, {
        ...tooltipProps,
        title: children,
        children: /* @__PURE__ */ jsx(IconPark, {
          name: "Tips",
          size: 16,
          ...iconProps,
          style: {
            cursor: "pointer",
            marginLeft: "4px",
            ...iconProps == null ? void 0 : iconProps.style
          }
        })
      })
    });
  }
  function isBangumiCategory(c2) {
    return c2.type === "bangumi";
  }
  function isCinemaCategory(c2) {
    return c2.type === "cinema";
  }
  function isNormalCategory(c2) {
    return !isBangumiCategory(c2) && !isCinemaCategory(c2);
  }
  function isNormalRankingItem(item) {
    const c2 = RANKING_CATEGORIES_MAP[item.slug];
    return isNormalCategory(c2);
  }
  function isBangumiRankingItem(item) {
    const c2 = RANKING_CATEGORIES_MAP[item.slug];
    return isBangumiCategory(c2);
  }
  function isCinemaRankingItem(item) {
    const c2 = RANKING_CATEGORIES_MAP[item.slug];
    return isCinemaCategory(c2);
  }
  function getRequestUrl(c2) {
    if (c2.type === "bangumi") {
      if (c2.slug === "guochan") {
        return `/pgc/season/rank/web/list?day=3&season_type=${c2.season_type}`;
      }
      return `/pgc/web/rank/list?day=3&season_type=${c2.season_type}`;
    }
    if (c2.type === "cinema") {
      return `/pgc/season/rank/web/list?day=3&season_type=${c2.season_type}`;
    }
    return `/x/web-interface/ranking/v2?rid=${c2.tid}&type=${c2.rank_type || "all"}`;
  }
  const arr = [{
    name: "全站",
    tid: 0,
    slug: "all"
  }, {
    name: "番剧",
    type: "bangumi",
    tid: 13,
    slug: "bangumi",
    season_type: 1
  }, {
    name: "国产动画",
    type: "bangumi",
    tid: 168,
    slug: "guochan",
    season_type: 4
  }, {
    name: "国创相关",
    tid: 168,
    slug: "guochuang"
  }, {
    name: "纪录片",
    type: "cinema",
    slug: "documentary",
    tid: 177,
    season_type: 3
  }, {
    name: "动画",
    tid: 1,
    slug: "douga"
  }, {
    name: "音乐",
    tid: 3,
    slug: "music"
  }, {
    name: "舞蹈",
    tid: 129,
    slug: "dance"
  }, {
    name: "游戏",
    tid: 4,
    slug: "game"
  }, {
    name: "知识",
    tid: 36,
    slug: "knowledge"
  }, {
    name: "科技",
    tid: 188,
    slug: "tech"
  }, {
    name: "运动",
    tid: 234,
    slug: "sports"
  }, {
    name: "汽车",
    tid: 223,
    slug: "car"
  }, {
    name: "生活",
    tid: 160,
    slug: "life"
  }, {
    name: "美食",
    tid: 211,
    slug: "food"
  }, {
    name: "动物圈",
    tid: 217,
    slug: "animal"
  }, {
    name: "鬼畜",
    tid: 119,
    slug: "kichiku"
  }, {
    name: "时尚",
    tid: 155,
    slug: "fashion"
  }, {
    name: "娱乐",
    tid: 5,
    slug: "ent"
  }, {
    name: "影视",
    tid: 181,
    slug: "cinephile"
  }, {
    name: "电影",
    type: "cinema",
    slug: "movie",
    tid: 23,
    season_type: 2
  }, {
    name: "电视剧",
    type: "cinema",
    slug: "tv",
    tid: 11,
    season_type: 5
  }, {
    name: "综艺",
    type: "cinema",
    slug: "variety",
    season_type: 7
  }, {
    name: "原创",
    slug: "origin",
    tid: 0,
    rank_type: "origin"
  }, {
    name: "新人",
    slug: "rookie",
    tid: 0,
    rank_type: "rookie"
  }];
  const RANKING_CATEGORIES = arr;
  const RANKING_CATEGORIES_MAP = RANKING_CATEGORIES.reduce((map, c2) => {
    map[c2.slug] = c2;
    return map;
  }, {});
  const RANKING_CATEGORIES_GROUPDED = lodash.groupBy(RANKING_CATEGORIES, (x2) => x2.type || "normal");
  class RankingRecService {
    constructor(slug) {
      __publicField(this, "loaded", false);
      __publicField(this, "slug");
      __publicField(this, "qs", new QueueStrategy(20));
      this.slug = slug || rankingStore.slug;
    }
    get hasMore() {
      if (!this.loaded) return true;
      return !!this.qs.bufferQueue.length;
    }
    async loadMore(abortSignal) {
      var _a2, _b2;
      if (!this.hasMore) return;
      if (!this.loaded) {
        const c2 = RANKING_CATEGORIES_MAP[this.slug];
        const url = getRequestUrl(c2);
        const res = await request.get(url, {
          signal: abortSignal
        });
        const json = res.data;
        this.loaded = true;
        if (!isWebApiSuccess(json)) {
          toast(json.message || REQUEST_FAIL_MSG);
          return;
        }
        const list = ((_a2 = json == null ? void 0 : json.data) == null ? void 0 : _a2.list) || ((_b2 = json == null ? void 0 : json.result) == null ? void 0 : _b2.list) || [];
        const items = list.map((item, index) => {
          return {
            ...item,
            api: EApiType.Ranking,
            uniqId: crypto.randomUUID(),
            rankingNo: index + 1,
            slug: this.slug,
            categoryType: c2.type
          };
        });
        this.qs.bufferQueue = items;
      }
      return this.qs.sliceFromQueue();
    }
    get usageInfo() {
      return /* @__PURE__ */ jsx(RankingUsageInfo, {});
    }
  }
  const rankingStore = await( proxyWithGmStorage({
    slug: "all"
  }, "ranking-store"));
  if (!RANKING_CATEGORIES.map((x2) => x2.slug).includes(rankingStore.slug)) {
    rankingStore.slug = "all";
  }
  function RankingUsageInfo() {
    const {
      ref,
      getPopupContainer
    } = usePopupContainer();
    const [open, setOpen] = React__default.useState(false);
    const hide = React__default.useCallback(() => setOpen(false), []);
    const onOpenChange = React__default.useCallback((newOpen) => {
      setOpen(newOpen);
    }, []);
    const {
      slug
    } = useSnapshot(rankingStore);
    const category = React__default.useMemo(() => RANKING_CATEGORIES_MAP[slug], [slug]);
    const onRefresh = useOnRefreshContext();
    const renderCategoryList = (list, key2, label) => {
      return /* @__PURE__ */ jsxs("div", {
        css: css`
          max-width: 500px;
          margin-top: 15px;
          padding-top: 5px;
          &:first-child {
            margin-top: 0;
            padding-top: 0;
          }
        `,
        children: [/* @__PURE__ */ jsxs("p", {
          css: [flexVerticalCenterStyle, css`
              margin-bottom: 8px;
              color: #fff;
              background-color: ${colorPrimaryValue};
              padding: 5px 0;
              padding-left: 6px;
              border-radius: 5px;
            `, "", ""],
          children: [label, key2 !== "normal" && /* @__PURE__ */ jsx(HelpInfo, {
            children: "不能提供预览"
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "grid",
          css: css`
            display: grid;
            grid-template-columns: repeat(5, minmax(0, 1fr));
            gap: 8px 12px;
            padding-inline: 2px;
          `,
          children: list.map((c2) => {
            const active = c2.slug === slug;
            return /* @__PURE__ */ jsx(antd.Button, {
              css: [antdCustomCss.button, active && css`
                      border-color: ${colorPrimaryValue};
                      color: ${colorPrimaryValue};
                    `, "", ""],
              onClick: (e2) => {
                hide();
                rankingStore.slug = c2.slug;
                onRefresh == null ? void 0 : onRefresh();
              },
              children: /* @__PURE__ */ jsx("span", {
                children: c2.name
              })
            }, c2.slug);
          })
        })]
      });
    };
    return /* @__PURE__ */ jsx("div", {
      ref,
      children: /* @__PURE__ */ jsx(antd.Popover, {
        arrow: false,
        open,
        onOpenChange,
        placement: "bottomLeft",
        getPopupContainer,
        overlayInnerStyle: {
          border: `1px solid ${colorPrimaryValue}`
        },
        content: /* @__PURE__ */ jsxs(Fragment, {
          children: [renderCategoryList(RANKING_CATEGORIES_GROUPDED.normal, "normal", "视频"), renderCategoryList(RANKING_CATEGORIES_GROUPDED.cinema, "cinema", "影视"), renderCategoryList(RANKING_CATEGORIES_GROUPDED.bangumi, "bangumi", "番剧")]
        }),
        children: /* @__PURE__ */ jsx(antd.Button, {
          css: antdCustomCss.button,
          children: category.name
        })
      })
    });
  }
  const ServiceMap = {
    [EHotSubTab.PopularGeneral]: PopularGeneralRecService,
    [EHotSubTab.PopularWeekly]: PopularWeeklyRecService,
    [EHotSubTab.Ranking]: RankingRecService
  };
  function isHotTabUsingShuffle(shuffleForPopularWeekly) {
    const {
      subtab
    } = hotStore;
    shuffleForPopularWeekly ?? (shuffleForPopularWeekly = settings.shuffleForPopularWeekly);
    const change = subtab === EHotSubTab.PopularWeekly && shuffleForPopularWeekly;
    return change;
  }
  const imgOf = (src2) => /* @__PURE__ */ jsx("img", {
    src: src2,
    alt: "",
    style: size("18px")
  });
  const HotSubTabConfig = {
    [EHotSubTab.PopularGeneral]: {
      // icon: <IconPark name='Fire' size={15} />,
      icon: imgOf("https://s1.hdslb.com/bfs/static/jinkela/popular/assets/icon_popular.png"),
      label: "综合热门",
      desc: "各个领域中新奇好玩的优质内容都在这里~",
      swr: true,
      anonymousUsage: true
    },
    [EHotSubTab.PopularWeekly]: {
      // icon: <IconPark name='TrendTwo' size={15} />,
      icon: imgOf("https://s1.hdslb.com/bfs/static/jinkela/popular/assets/icon_weekly.png"),
      label: "每周必看",
      desc: "每周五晚 18:00 更新",
      anonymousUsage: true
    },
    [EHotSubTab.Ranking]: {
      // icon: <IconPark name='Ranking' size={15} />,
      icon: imgOf("https://s1.hdslb.com/bfs/static/jinkela/popular/assets/icon_rank.png"),
      label: "排行榜",
      desc: "排行榜根据稿件内容质量，近期的数据综合展示，动态更新",
      anonymousUsage: true,
      swr: true
    }
  };
  class HotRecService {
    constructor() {
      __publicField(this, "subtab");
      __publicField(this, "service");
      this.subtab = hotStore.subtab;
      this.service = new ServiceMap[hotStore.subtab]();
    }
    get hasMore() {
      return this.service.hasMore;
    }
    loadMore(abortSignal) {
      return this.service.loadMore(abortSignal);
    }
    get usageInfo() {
      return /* @__PURE__ */ jsx(HotUsageInfo, {
        children: this.service.usageInfo
      });
    }
  }
  const hotStore = await( proxyWithGmStorage({
    subtab: EHotSubTab.PopularGeneral
  }, "hot-store"));
  if (!Object.values(EHotSubTab).includes(hotStore.subtab)) {
    hotStore.subtab = EHotSubTab.PopularGeneral;
  }
  function HotUsageInfo({
    children
  }) {
    const {
      subtab: activeSubtab
    } = useSnapshot(hotStore);
    const {
      icon,
      label
    } = HotSubTabConfig[activeSubtab];
    const onRefresh = useOnRefreshContext();
    const {
      ref,
      getPopupContainer
    } = usePopupContainer();
    const menus = React__default.useMemo(() => [EHotSubTab.PopularGeneral, EHotSubTab.PopularWeekly, EHotSubTab.Ranking].map((subtab, index) => {
      const config = HotSubTabConfig[subtab];
      const active = subtab === activeSubtab;
      return [index > 0 && {
        type: "divider"
      }, {
        key: subtab,
        label: /* @__PURE__ */ jsx("span", {
          css: [active && css`
                        color: ${colorPrimaryValue};
                      `, "", ""],
          children: config.label
        }),
        icon: config.icon,
        onClick() {
          if (subtab === hotStore.subtab) return;
          hotStore.subtab = subtab;
          onRefresh == null ? void 0 : onRefresh();
        }
      }].filter(Boolean);
    }).flat(), [activeSubtab]);
    return /* @__PURE__ */ jsxs(Fragment, {
      children: [/* @__PURE__ */ jsx(antd.Dropdown, {
        menu: {
          items: menus
        },
        getPopupContainer,
        rootClassName: styled.generateClassName`
          .ant-dropdown-menu-item-divider {
            margin: 2px 0 !important;
          }
        `,
        children: /* @__PURE__ */ jsxs(antd.Button, {
          ref,
          className: "w-114px gap-0 flex items-center justify-start",
          css: [antdCustomCss.button, css`
              padding-left: 16px;
            `, "", ""],
          children: [icon, /* @__PURE__ */ jsx("span", {
            css: C.ml(8),
            children: label
          })]
        })
      }), children]
    });
  }
  const iconParkOutlineComputer = (props) => /* @__PURE__ */ jsx("svg", {
    viewBox: "0 0 48 48",
    width: "1.2em",
    height: "1.2em",
    ...props,
    children: /* @__PURE__ */ jsxs("g", {
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 4,
      children: [/* @__PURE__ */ jsx("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M19 32h10v9H19z"
      }), /* @__PURE__ */ jsx("rect", {
        width: 38,
        height: 24,
        x: 5,
        y: 8,
        rx: 2
      }), /* @__PURE__ */ jsx("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M22 27h4M14 41h20"
      })]
    })
  });
  const iconParkOutlineConcern = (props) => /* @__PURE__ */ jsx("svg", {
    viewBox: "0 0 48 48",
    width: "1.2em",
    height: "1.2em",
    ...props,
    children: /* @__PURE__ */ jsxs("g", {
      fill: "none",
      stroke: "currentColor",
      children: [/* @__PURE__ */ jsx("path", {
        strokeLinecap: "round",
        strokeWidth: 4,
        d: "M10.858 9.858A19.94 19.94 0 0 0 5 24a19.94 19.94 0 0 0 5.858 14.142m28.284 0A19.94 19.94 0 0 0 45 24a19.94 19.94 0 0 0-5.858-14.142M34.9 33.9A13.96 13.96 0 0 0 39 24a13.96 13.96 0 0 0-4.1-9.9m-19.8 0A13.96 13.96 0 0 0 11 24a13.96 13.96 0 0 0 4.1 9.9"
      }), /* @__PURE__ */ jsx("path", {
        strokeLinejoin: "round",
        strokeWidth: 3.5,
        d: "M28.182 20C30.29 20 32 21.612 32 23.6c0 2.588-2.546 4.8-3.818 6Q26.908 30.8 25 32q-1.909-1.2-3.182-2.4C20.545 28.4 18 26.188 18 23.6c0-1.988 1.71-3.6 3.818-3.6c1.328 0 2.498.64 3.182 1.61c.684-.97 1.854-1.61 3.182-1.61Z"
      })]
    })
  });
  const iconParkOutlineFire = (props) => /* @__PURE__ */ jsx("svg", {
    viewBox: "0 0 48 48",
    width: "1.2em",
    height: "1.2em",
    ...props,
    children: /* @__PURE__ */ jsx("path", {
      fill: "none",
      stroke: "currentColor",
      strokeLinejoin: "round",
      strokeWidth: 4,
      d: "M24 44c8.235 0 15-6.526 15-14.902c0-2.056-.105-4.26-1.245-7.686s-1.369-3.868-2.574-5.984c-.515 4.317-3.27 6.117-3.97 6.655c0-.56-1.666-6.747-4.193-10.45C24.537 8 21.163 5.617 19.185 4c0 3.07-.863 7.634-2.1 9.96c-1.236 2.325-1.468 2.41-3.013 4.14s-2.253 2.265-3.545 4.365S9 27.362 9 29.418C9 37.794 15.765 44 24 44Z"
    })
  });
  const iconParkOutlineIphone = (props) => /* @__PURE__ */ jsx("svg", {
    viewBox: "0 0 48 48",
    width: "1.2em",
    height: "1.2em",
    ...props,
    children: /* @__PURE__ */ jsxs("g", {
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 4,
      children: [/* @__PURE__ */ jsx("rect", {
        width: 26,
        height: 40,
        x: 11,
        y: 4,
        rx: 3
      }), /* @__PURE__ */ jsx("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M22 10h4m-6 28h8"
      })]
    })
  });
  const iconParkOutlineStar = (props) => /* @__PURE__ */ jsx("svg", {
    viewBox: "0 0 48 48",
    width: "1.2em",
    height: "1.2em",
    ...props,
    children: /* @__PURE__ */ jsx("path", {
      fill: "none",
      stroke: "currentColor",
      strokeLinejoin: "round",
      strokeWidth: 4,
      d: "m23.999 5l-6.113 12.478L4 19.49l10.059 9.834L11.654 43L24 36.42L36.345 43L33.96 29.325L44 19.491l-13.809-2.013z"
    })
  });
  const iconParkOutlineTumblr = (props) => /* @__PURE__ */ jsx("svg", {
    viewBox: "0 0 48 48",
    width: "1.2em",
    height: "1.2em",
    ...props,
    children: /* @__PURE__ */ jsxs("g", {
      fill: "none",
      children: [/* @__PURE__ */ jsx("path", {
        stroke: "currentColor",
        strokeWidth: 4,
        d: "M39 6H9a3 3 0 0 0-3 3v30a3 3 0 0 0 3 3h30a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3Z"
      }), /* @__PURE__ */ jsx("path", {
        fill: "currentColor",
        d: "M15 22v-5h5v-3l6-2v5h5v5h-5v7s0 1.5 2 2s5-1 5-1l-2 6h-5c-3.5 0-6-3.5-6-6v-8z"
      })]
    })
  });
  const TabConfig = {
    [ETab.RecommendApp]: {
      icon: /* @__PURE__ */ jsx(iconParkOutlineIphone, {
        ...size(18)
      }),
      label: "推荐",
      desc: "使用 Bilibili App 端推荐 API",
      anonymousUsage: true
    },
    [ETab.RecommendPc]: {
      icon: /* @__PURE__ */ jsx(iconParkOutlineComputer, {
        ...size(18)
      }),
      label: "推荐",
      desc: "使用新版首页顶部推荐 API",
      anonymousUsage: true
    },
    [ETab.KeepFollowOnly]: {
      icon: /* @__PURE__ */ jsx(iconParkOutlineConcern, {
        ...size(18)
      }),
      label: "已关注",
      desc: "从PC端推荐中筛选出「已关注」,可能比较慢; 关注的UP更新在动态~"
    },
    [ETab.DynamicFeed]: {
      icon: /* @__PURE__ */ jsx(iconParkOutlineTumblr, {
        ...size(16)
      }),
      label: "动态",
      desc: "视频投稿动态",
      swr: true,
      anonymousUsage: true
    },
    [ETab.Watchlater]: {
      icon: /* @__PURE__ */ jsx(WatchLaterIcon, {
        ...size(17),
        css: css`
          /* circle 使用的是 fill, 在 tab 中显示太细了 */
          .circle {
            stroke: currentColor;
          }
        `
      }),
      label: "稍后再看",
      desc: "你添加的稍后再看; 默认随机乱序, 可在设置中关闭乱序",
      swr: true
    },
    [ETab.Fav]: {
      icon: /* @__PURE__ */ jsx(iconParkOutlineStar, {
        ...size(16),
        css: C.mt(-1)
      }),
      label: "收藏",
      desc: "你添加的收藏; 默认随机乱序, 可在设置中关闭乱序",
      get swr() {
        return !settings.shuffleForFav;
      }
    },
    [ETab.Hot]: {
      icon: /* @__PURE__ */ jsx(iconParkOutlineFire, {
        ...size(16)
      }),
      label: "热门",
      desc: "各个领域中新奇好玩的优质内容都在这里~",
      anonymousUsage: true,
      get swr() {
        return !isHotTabUsingShuffle();
      }
    },
    [ETab.Live]: {
      icon: /* @__PURE__ */ jsx(LiveIcon, {
        ...size(16)
      }),
      // icon: <MaterialSymbolsBarChart {...size(16)} />,
      label: "直播",
      desc: "直播~",
      swr: true
    }
  };
  function TabIcon({
    tabKey,
    moreCss,
    size: _size2,
    ml,
    mr,
    mt,
    mb,
    active
  }) {
    const {
      icon
    } = TabConfig[tabKey];
    const newCssProp = [icon.props.css, moreCss, ml && C.ml(ml), mr && C.mr(mr), mt && C.mt(mt), mb && C.mb(mb)].flat().filter(Boolean);
    const cloned = React__default.cloneElement(icon, {
      css: newCssProp,
      width: _size2 ? size(_size2).width : icon.props.width,
      height: _size2 ? size(_size2).height : icon.props.height,
      active: tabKey === ETab.Live ? active : void 0
      // 否则 warn: svg recived boolean props
    });
    return cloned;
  }
  function toastNeedLogin() {
    return toast("你需要登录B站后使用该功能! 如已完成登录, 请刷新网页重试~");
  }
  function formatFavFolderUrl(id) {
    const uid = getUid();
    return `https://space.bilibili.com/${uid}/favlist?fid=${id}`;
  }
  function formatFavPlaylistUrl(id) {
    return `https://www.bilibili.com/list/ml${id}`;
  }
  const _FavRecService = class _FavRecService {
    constructor() {
      __publicField(this, "useShuffle");
      __publicField(this, "addSeparator");
      __publicField(this, "total", 0);
      __publicField(this, "allFolderServices", []);
      // before exclude
      __publicField(this, "folderServices", []);
      // after exclude
      // full-list = qs.returnQueue + qs.bufferQueue + folderServices.more
      __publicField(this, "qs", new QueueStrategy(_FavRecService.PAGE_SIZE));
      __publicField(this, "foldersLoaded", false);
      this.useShuffle = settings.shuffleForFav;
      this.addSeparator = settings.addSeparatorForFav;
    }
    get folderHasMore() {
      return this.folderServices.some((s2) => s2.hasMore);
    }
    get hasMore() {
      return this.qs.bufferQueue.length > 0 || this.folderHasMore;
    }
    get usageInfo() {
      if (!this.foldersLoaded) return;
      return /* @__PURE__ */ jsx(FavUsageInfo, {
        allFavFolderServices: this.allFolderServices
      });
    }
    async loadMore() {
      if (!this.foldersLoaded) await this.getAllFolders();
      if (!this.hasMore) return;
      if (!this.useShuffle) {
        if (this.qs.bufferQueue.length) {
          return this.qs.sliceFromQueue();
        }
        const service = this.folderServices.find((s2) => s2.hasMore);
        if (!service) return;
        const items = await service.loadMore();
        const S2 = {
          item: css`
          display: inline-flex;
          align-items: center;
          font-size: 15px;

          &:not(:first-child) {
            margin-left: 30px;
          }

          /* the icon */
          svg {
            margin-right: 5px;
            margin-top: -1px;
          }
        `
        };
        const header = this.addSeparator && service.page === 1 && (items == null ? void 0 : items.length) && {
          api: EApiType.Separator,
          uniqId: `fav-folder-${service.entry.id}`,
          content: /* @__PURE__ */ jsxs(Fragment, {
            children: [/* @__PURE__ */ jsxs("a", {
              target: "_blank",
              href: formatFavFolderUrl(service.entry.id),
              css: S2.item,
              children: [/* @__PURE__ */ jsx(OpenExternalLinkIcon, {
                css: C.size(16)
              }), service.entry.title]
            }), /* @__PURE__ */ jsxs("a", {
              target: "_blank",
              href: formatFavPlaylistUrl(service.entry.id),
              css: S2.item,
              children: [/* @__PURE__ */ jsx(PlayerIcon, {
                css: C.size(16)
              }), "播放全部"]
            })]
          })
        };
        return this.qs.doReturnItems([header, ...items || []].filter(Boolean));
      }
      if (this.qs.bufferQueue.length < _FavRecService.PAGE_SIZE) {
        while (this.folderHasMore && this.qs.bufferQueue.length < _FavRecService.PAGE_SIZE) {
          const restServices = this.folderServices.filter((s2) => s2.hasMore);
          const count = 6;
          const batch = 2;
          const pickedServices = lodash.shuffle(restServices).slice(0, count);
          const fetched = (await pmap2(pickedServices, async (s2) => await s2.loadMore() || [], batch)).flat();
          this.qs.bufferQueue = [...this.qs.bufferQueue, ...lodash.shuffle(fetched)];
        }
      }
      this.qs.bufferQueue = lodash.shuffle(this.qs.bufferQueue);
      return this.qs.sliceFromQueue();
    }
    async getAllFolders() {
      const folders = await apiFavFolderListAll();
      this.foldersLoaded = true;
      this.allFolderServices = folders.map((f2) => new FavFolderService(f2));
      this.folderServices = this.allFolderServices.filter((s2) => !settings.excludeFavFolderIds.includes(s2.entry.id.toString()));
      this.total = this.folderServices.reduce((count, f2) => count + f2.entry.media_count, 0);
    }
  };
  __publicField(_FavRecService, "PAGE_SIZE", 20);
  let FavRecService = _FavRecService;
  async function apiFavFolderListAll() {
    const res = await request.get("/x/v3/fav/folder/created/list-all", {
      params: {
        up_mid: getUid()
      }
    });
    const json = res.data;
    const folders = json.data.list;
    return folders;
  }
  class FavFolderService {
    constructor(entry) {
      __publicField(this, "entry");
      __publicField(this, "hasMore");
      __publicField(this, "info");
      __publicField(this, "page", 0);
      this.entry = entry;
      this.hasMore = entry.media_count > 0;
    }
    // pages loaded
    async loadMore() {
      if (!this.hasMore) return;
      const res = await request.get("/x/v3/fav/resource/list", {
        params: {
          media_id: this.entry.id,
          pn: this.page + 1,
          // start from 1
          ps: 20,
          keyword: "",
          order: "mtime",
          // mtime(最近收藏)  view(最多播放) pubtime(最新投稿)
          type: "0",
          // unkown
          tid: "0",
          // 分区
          platform: "web"
        }
      });
      const json = res.data;
      if (!isWebApiSuccess(json)) {
        toast(json.message || REQUEST_FAIL_MSG);
        return;
      }
      this.page++;
      this.hasMore = json.data.has_more;
      this.info = json.data.info;
      let items = json.data.medias || [];
      items = items.filter((item) => {
        if (item.title === "已失效视频") return false;
        return true;
      });
      return items.map((item) => {
        var _a2;
        return {
          ...item,
          folder: this.info,
          api: EApiType.Fav,
          uniqId: `fav-${(_a2 = this.info) == null ? void 0 : _a2.id}-${item.bvid}`
        };
      });
    }
  }
  function FavUsageInfo({
    allFavFolderServices
  }) {
    const {
      excludeFavFolderIds,
      shuffleForFav,
      addSeparatorForFav
    } = useSettingsSnapshot();
    const onRefresh = useOnRefreshContext();
    const [excludeFavFolderIdsChanged, setExcludeFavFolderIdsChanged] = React__default.useState(false);
    useUpdateEffect(() => {
      void (async () => {
        await delay(100);
        onRefresh == null ? void 0 : onRefresh();
      })();
    }, [shuffleForFav, addSeparatorForFav]);
    const handleChange = useMemoizedFn((newTargetKeys, direction, moveKeys) => {
      setExcludeFavFolderIdsChanged(true);
      updateSettings({
        excludeFavFolderIds: newTargetKeys.map((k2) => k2.toString())
      });
    });
    const foldersCount = React__default.useMemo(() => allFavFolderServices.filter((x2) => !excludeFavFolderIds.includes(x2.entry.id.toString())).length, [allFavFolderServices, excludeFavFolderIds]);
    const videosCount = React__default.useMemo(() => {
      return allFavFolderServices.filter((s2) => !excludeFavFolderIds.includes(s2.entry.id.toString())).reduce((count, s2) => count + s2.entry.media_count, 0);
    }, [allFavFolderServices, excludeFavFolderIds]);
    const onPopupOpenChange = useMemoizedFn((open) => {
      if (open) {
        setExcludeFavFolderIdsChanged(false);
      } else {
        if (excludeFavFolderIdsChanged) {
          onRefresh == null ? void 0 : onRefresh();
        }
      }
    });
    const {
      ref,
      getPopupContainer
    } = usePopupContainer();
    return /* @__PURE__ */ jsxs(antd.Space, {
      ref,
      children: [/* @__PURE__ */ jsx(antd.Popover, {
        getTooltipContainer: getPopupContainer,
        trigger: "click",
        placement: "bottom",
        onOpenChange: onPopupOpenChange,
        getPopupContainer: (el) => el.parentElement || document.body,
        content: /* @__PURE__ */ jsx(Fragment, {
          children: /* @__PURE__ */ jsx(antd.Transfer, {
            dataSource: allFavFolderServices,
            rowKey: (row2) => row2.entry.id.toString(),
            titles: ["收藏夹", "忽略"],
            targetKeys: excludeFavFolderIds,
            onChange: handleChange,
            render: (item) => item.entry.title,
            oneWay: true,
            style: {
              marginBottom: 10
            }
          })
        }),
        children: /* @__PURE__ */ jsxs(antd.Tag, {
          color: "success",
          css: css`
            cursor: pointer;
            font-size: 12px;
          `,
          children: ["收藏夹(", foldersCount, ") 收藏(", videosCount, ")"]
        })
      }), /* @__PURE__ */ jsx(SwitchSettingItem, {
        configKey: "shuffleForFav",
        checkedChildren: "随机顺序: 开",
        unCheckedChildren: "随机顺序: 关"
      })]
    });
  }
  var ELiveStatus = /* @__PURE__ */ ((ELiveStatus2) => {
    ELiveStatus2[ELiveStatus2["Offline"] = 0] = "Offline";
    ELiveStatus2[ELiveStatus2["Streaming"] = 1] = "Streaming";
    ELiveStatus2[ELiveStatus2["Rolling"] = 2] = "Rolling";
    return ELiveStatus2;
  })(ELiveStatus || {});
  async function getLiveList(page) {
    const res = await request.get("https://api.live.bilibili.com/xlive/web-ucenter/user/following", {
      params: {
        page,
        page_size: LiveRecService.PAGE_SIZE,
        ignoreRecord: 1,
        hit_ab: true
      }
    });
    const json = res.data;
    return json;
  }
  class LiveRecService {
    constructor() {
      __publicField(this, "hasMore", true);
      __publicField(this, "page", 0);
      __publicField(this, "loaded", false);
      __publicField(this, "liveCount", -1);
      __publicField(this, "totalPage", Infinity);
      __publicField(this, "separatorAdded", false);
    }
    async loadMore(abortSignal) {
      if (!this.hasMore) return;
      if (this.page + 1 > this.totalPage) {
        this.hasMore = false;
        return;
      }
      const json = await getLiveList(this.page + 1);
      if (!isWebApiSuccess(json)) {
        toast(json.message || REQUEST_FAIL_MSG);
        this.hasMore = false;
      }
      this.page++;
      const {
        count,
        live_count,
        totalPage
      } = json.data;
      this.totalPage = totalPage;
      this.liveCount = live_count;
      const items = json.data.list.map((item) => {
        const _item = {
          ...item,
          api: EApiType.Live,
          uniqId: item.roomid.toString()
        };
        return _item;
      });
      const last = items.at(-1);
      const gateTime = dayjs().subtract(2, "weeks").unix();
      if (last) {
        const lastStatus = last.live_status;
        const lastLiveTime = last.record_live_time;
        if (lastStatus !== ELiveStatus.Streaming && lastLiveTime && lastLiveTime < gateTime) {
          this.hasMore = false;
        }
      }
      const ret = items;
      if (!this.separatorAdded && items.some((x2) => x2.live_status !== ELiveStatus.Streaming)) {
        this.separatorAdded = true;
        const index = items.findIndex((x2) => x2.live_status !== ELiveStatus.Streaming);
        ret.splice(index, 0, {
          api: EApiType.Separator,
          uniqId: "live-separator",
          content: "最近直播过"
        });
      }
      return ret;
    }
    get usageInfo() {
      return null;
    }
  }
  __publicField(LiveRecService, "PAGE_SIZE", 10);
  const _PcRecService = class _PcRecService {
    constructor(isKeepFollowOnly) {
      __publicField(this, "page", 0);
      __publicField(this, "hasMore", true);
      __publicField(this, "qs", new QueueStrategy(_PcRecService.PAGE_SIZE));
      this.isKeepFollowOnly = isKeepFollowOnly;
      this.isKeepFollowOnly = isKeepFollowOnly;
    }
    async getRecommend(signal = void 0) {
      var _a2, _b2;
      const curpage = ++this.page;
      let url;
      let params;
      url = "/x/web-interface/wbi/index/top/rcmd";
      params = {
        fresh_type: 3,
        version: 1,
        ps: _PcRecService.PAGE_SIZE,
        // >14 errors
        fresh_idx: curpage,
        fresh_idx_1h: curpage,
        homepage_ver: 1
      };
      const res = await request.get(url, {
        signal,
        params
      });
      const json = res.data;
      if (!isWebApiSuccess(json)) {
        if (json.code === -62011 && json.message === "暂时没有更多内容了") {
          this.hasMore = false;
          return [];
        }
      }
      if (!((_a2 = json.data) == null ? void 0 : _a2.item)) {
        toast(json.message || "API 请求没有返回结果");
      }
      const items = ((_b2 = json.data) == null ? void 0 : _b2.item) || [];
      return items;
    }
    loadMore() {
      const times = this.isKeepFollowOnly ? 5 : 2;
      return this.getRecommendTimes(times);
    }
    async getRecommendTimes(times, signal = void 0) {
      if (this.qs.bufferQueue.length) {
        return this.qs.sliceFromQueue();
      }
      let list = [];
      const parallel = async () => {
        list = (await Promise.all(new Array(times).fill(0).map(() => this.getRecommend(signal)))).flat();
      };
      await parallel();
      list = list.filter((item) => {
        const goto = item.goto;
        if (goto === "ad") return false;
        if (goto.includes("ad")) return false;
        if (goto === "live") return false;
        return true;
      });
      list = lodash.uniqBy(list, (item) => item.id);
      list.forEach((item) => {
        var _a2, _b2;
        if (((_a2 = item.rcmd_reason) == null ? void 0 : _a2.reason_type) === 1) {
          (_b2 = item.rcmd_reason).content || (_b2.content = "已关注");
        }
      });
      const _list = list.map((item) => {
        return {
          ...item,
          uniqId: item.id + "-" + crypto.randomUUID(),
          api: "pc"
        };
      });
      return this.qs.doReturnItems(_list);
    }
  };
  __publicField(_PcRecService, "PAGE_SIZE", 14);
  let PcRecService = _PcRecService;
  const watchLaterState = proxy({
    updatedAt: 0,
    bvidSet: proxySet()
  });
  function useWatchLaterState(bvid) {
    const set = useSnapshot(watchLaterState.bvidSet);
    return !!bvid && set.has(bvid);
  }
  if (getHasLogined()) {
    setTimeout(() => {
      new WatchLaterRecService().loadMore();
    });
  }
  const _WatchLaterRecService = class _WatchLaterRecService {
    constructor(keepOrder) {
      __publicField(this, "qs", new QueueStrategy(_WatchLaterRecService.PAGE_SIZE));
      __publicField(this, "useShuffle");
      __publicField(this, "addSeparator");
      __publicField(this, "loaded", false);
      __publicField(this, "count", 0);
      __publicField(this, "keepOrder");
      this.keepOrder = keepOrder ?? false;
      this.useShuffle = settings.shuffleForWatchLater;
      this.addSeparator = settings.addSeparatorForWatchLater;
    }
    async fetch() {
      var _a2;
      const res = await request.get("/x/v2/history/toview/web");
      const json = res.data;
      const items = json.data.list.map((item) => {
        return {
          ...item,
          api: EApiType.Watchlater,
          uniqId: `watchlater-${item.bvid}`
        };
      });
      if (Date.now() > watchLaterState.updatedAt) {
        watchLaterState.updatedAt = Date.now();
        watchLaterState.bvidSet.clear();
        items.forEach((item) => watchLaterState.bvidSet.add(item.bvid));
      }
      const gate = dayjs().subtract(2, "days").unix();
      const firstNotTodayAddedIndex = items.findIndex((item) => item.add_at < gate);
      let itemsWithSeparator = items;
      if (firstNotTodayAddedIndex !== -1) {
        const recent = items.slice(0, firstNotTodayAddedIndex);
        let earlier = items.slice(firstNotTodayAddedIndex);
        if (this.keepOrder && _WatchLaterRecService.LAST_BVID_ARR.length) {
          earlier = earlier.map((item) => ({
            item,
            // if not found, -1, front-most
            index: _WatchLaterRecService.LAST_BVID_ARR.findIndex((bvid) => item.bvid === bvid)
          })).sort((a, b2) => a.index - b2.index).map((x2) => x2.item);
        } else if (this.useShuffle) {
          earlier = lodash.shuffle(earlier);
        }
        itemsWithSeparator = [!!recent.length && this.addSeparator && {
          api: EApiType.Separator,
          uniqId: "watchlater-recent",
          content: "近期"
        }, ...recent, !!earlier.length && this.addSeparator && {
          api: EApiType.Separator,
          uniqId: "watchlater-earlier",
          content: "更早"
        }, ...earlier].filter(Boolean);
      }
      this.count = (((_a2 = json == null ? void 0 : json.data) == null ? void 0 : _a2.list) || []).length;
      _WatchLaterRecService.LAST_BVID_ARR = itemsWithSeparator.map((item) => item.api === EApiType.Watchlater && item.bvid).filter(Boolean);
      return itemsWithSeparator;
    }
    get usageInfo() {
      if (!this.loaded) return;
      const {
        count
      } = this;
      return /* @__PURE__ */ jsx(WatchLaterUsageInfo, {
        count
      });
    }
    get hasMore() {
      if (!this.loaded) return true;
      return !!this.qs.bufferQueue.length;
    }
    async loadMore() {
      if (!this.hasMore) return;
      if (!this.loaded) {
        const items = await this.fetch();
        this.qs.bufferQueue.push(...items);
        this.loaded = true;
      }
      return this.qs.sliceFromQueue();
    }
  };
  __publicField(_WatchLaterRecService, "PAGE_SIZE", 20);
  __publicField(_WatchLaterRecService, "LAST_BVID_ARR", []);
  let WatchLaterRecService = _WatchLaterRecService;
  function WatchLaterUsageInfo({
    count
  }) {
    const color = "success";
    const title = `共 ${count} 个视频`;
    const {
      shuffleForWatchLater,
      addSeparatorForWatchLater
    } = useSettingsSnapshot();
    const onRefresh = useOnRefreshContext();
    useUpdateEffect(() => {
      void (async () => {
        await delay(100);
        onRefresh == null ? void 0 : onRefresh();
      })();
    }, [shuffleForWatchLater, addSeparatorForWatchLater]);
    return /* @__PURE__ */ jsxs(antd.Space, {
      children: [/* @__PURE__ */ jsx(antd.Tag, {
        color,
        style: {
          marginRight: 0,
          marginTop: 1,
          cursor: "pointer"
        },
        title,
        onClick: () => {
          toast(`稍后再看: ${title}`);
        },
        children: count
      }), /* @__PURE__ */ jsx(SwitchSettingItem, {
        configKey: "shuffleForWatchLater",
        checkedChildren: "随机顺序: 开",
        unCheckedChildren: "随机顺序: 关"
      })]
    });
  }
  var promise_timeout = { exports: {} };
  function checkAbortController() {
    if (typeof AbortController === "undefined" || typeof AbortSignal === "undefined") {
      console.error("[promise.timeout] need global AbortController & AbortSingal");
    }
  }
  function ptimeout(fn, timeout) {
    return function() {
      var ctx = this;
      var args = [].slice.call(arguments);
      checkAbortController();
      var controller = new AbortController();
      args.push(controller.signal);
      return new Promise(function(resolve, reject) {
        var timer = setTimeout(function() {
          var e2 = new TimeoutError$1(timeout);
          reject(e2);
          controller.abort();
        }, timeout);
        Promise.resolve(fn.apply(ctx, args)).then(
          // resolve
          function(result) {
            clearTimeout(timer);
            resolve(result);
          },
          // reject
          function(err) {
            clearTimeout(timer);
            reject(err);
          }
        );
      });
    };
  }
  let TimeoutError$1 = class TimeoutError extends Error {
    constructor(timeout) {
      super();
      this.timeout = timeout;
      this.message = `timeout of ${timeout}ms exceed`;
      Error.captureStackTrace(this, TimeoutError);
    }
  };
  promise_timeout.exports = ptimeout;
  promise_timeout.exports.TimeoutError = TimeoutError$1;
  var promise_timeoutExports = promise_timeout.exports;
  const ptimeout$1 = /* @__PURE__ */ getDefaultExportFromCjs(promise_timeoutExports);
  var src_default = pretry;
  function pretry(fn, options) {
    const originalFn = fn;
    options = options || {};
    const times = options.times || 5;
    const _timeout = options.timeout;
    if (_timeout) {
      fn = ptimeout$1(fn, _timeout);
    }
    const onerror = options.onerror;
    return async function pretryWrapper(...args) {
      const ctx = this;
      const errors = new Array(times);
      for (let i = 0; i < times; i++) {
        let result;
        let err;
        try {
          result = await fn.apply(ctx, args);
        } catch (e2) {
          err = e2;
        }
        if (!err) {
          return result;
        }
        if (err instanceof TypeError || err instanceof RangeError || err instanceof ReferenceError || err instanceof SyntaxError) {
          throw err;
        }
        errors[i] = err;
        if (onerror) {
          onerror(err, i);
        }
        if (options.delay) {
          const delay2 = typeof options.delay === "number" ? options.delay : options.delay(i);
          await new Promise((resolve) => setTimeout(resolve, delay2));
        }
        continue;
      }
      throw new RetryError({
        times,
        timeout: _timeout,
        fn: originalFn,
        errors
        // 错误列表
      });
    };
  }
  var RetryError = class extends Error {
    constructor(options) {
      super();
      this.times = options.times;
      this.timeout = options.timeout;
      this.fn = options.fn;
      this.errors = options.errors;
      this.name = "RetryError";
      this.message = `tried function ${this.fn.name || "<anonymous>"} ${this.times} times`;
      if (this.timeout) {
        this.message += ` with timeout = ${this.timeout}ms`;
      }
      Error.captureStackTrace(this, this.constructor);
    }
  };
  class RecReqError extends Error {
    constructor(json) {
      super();
      __publicField(this, "json");
      this.json = json;
      this.message = json.message || JSON.stringify(json);
      Error.captureStackTrace(this, RecReqError);
    }
  }
  const _AppRecService = class _AppRecService {
    constructor() {
      __publicField(this, "hasMore", true);
      __publicField(this, "qs", new QueueStrategy(_AppRecService.PAGE_SIZE));
      __publicField(this, "tryGetRecommend", src_default(this.getRecommend, {
        times: 5,
        timeout: 2e3,
        onerror(err, index) {
          console.info("[%s] tryGetRecommend onerror: index=%s", APP_NAME, index, err);
        }
      }));
    }
    async getRecommend(device) {
      var _a2;
      let platformParams = {};
      if (device === EAppApiDevice.android) {
        platformParams = {
          mobi_app: "android"
        };
      }
      if (device === EAppApiDevice.ipad) {
        platformParams = {
          mobi_app: "iphone",
          device: "pad"
        };
      }
      const res = await gmrequest.get(HOST_APP + "/x/v2/feed/index", {
        responseType: "json",
        params: {
          build: "1",
          ...platformParams,
          // idx: 返回的 items.idx 为传入 idx+1, idx+2, ...
          idx: Math.floor(Date.now() / 1e3) + lodash.random(1e3, false)
        }
      });
      const json = res.data;
      if (!json.data) {
        if (json.code === -663) {
          throw new RecReqError(json);
        }
        toast(`${APP_NAME}: 未知错误, 请联系开发者

  code=${json.code} message=${json.message || ""}`, 5e3);
        return [];
      }
      const items = ((_a2 = json == null ? void 0 : json.data) == null ? void 0 : _a2.items) || [];
      return items;
    }
    loadMore() {
      return this.getRecommendTimes(2);
    }
    // 一次不够, 多来几次
    async getRecommendTimes(times) {
      if (this.qs.bufferQueue.length) {
        return this.qs.sliceFromQueue();
      }
      let list = [];
      let device = settings.appApiDecice;
      if (device !== EAppApiDevice.ipad && device !== EAppApiDevice.android) {
        device = EAppApiDevice.ipad;
      }
      const parallel = async () => {
        list = (await Promise.all(new Array(times).fill(0).map(() => this.tryGetRecommend(device)))).flat();
      };
      await parallel();
      list = list.filter((item) => {
        var _a2, _b2;
        if ((_a2 = item.card_goto) == null ? void 0 : _a2.includes("ad")) return false;
        if ((_b2 = item.goto) == null ? void 0 : _b2.includes("ad")) return false;
        if (item.ad_info) return false;
        if (item.card_goto === "banner") return false;
        return true;
      });
      list = lodash.uniqBy(list, (item) => item.param);
      const _list = list.map((item) => {
        return {
          ...item,
          api: "app",
          device,
          // android | ipad
          uniqId: item.param + "-" + crypto.randomUUID()
        };
      });
      return this.qs.doReturnItems(_list);
    }
  };
  // 无法指定, 16 根据返回得到
  __publicField(_AppRecService, "PAGE_SIZE", 16);
  let AppRecService = _AppRecService;
  const REC_TABS = [ETab.KeepFollowOnly, ETab.RecommendPc, ETab.RecommendApp];
  function isRecTab(tab2) {
    return REC_TABS.includes(tab2);
  }
  const createServiceMap = {
    [ETab.RecommendApp]: () => new AppRecService(),
    [ETab.RecommendPc]: () => new PcRecService(false),
    [ETab.KeepFollowOnly]: () => new PcRecService(true),
    [ETab.DynamicFeed]: () => new DynamicFeedRecService(dynamicFeedFilterStore.upMid, dynamicFeedFilterStore.searchText),
    [ETab.Watchlater]: (options) => new WatchLaterRecService(options == null ? void 0 : options.watchlaterKeepOrder),
    [ETab.Fav]: () => new FavRecService(),
    [ETab.Hot]: () => new HotRecService(),
    [ETab.Live]: () => new LiveRecService()
  };
  function getIService(serviceMap, tab2) {
    return serviceMap[tab2];
  }
  function isApp(item) {
    return item.api === EApiType.App;
  }
  function isPc(item) {
    return item.api === EApiType.Pc;
  }
  function isDynamic(item) {
    return item.api === EApiType.Dynamic;
  }
  function isWatchlater(item) {
    return item.api === EApiType.Watchlater;
  }
  function isFav(item) {
    return item.api === EApiType.Fav;
  }
  function isPopularGeneral(item) {
    return item.api === EApiType.PopularGeneral;
  }
  function isPopularWeekly(item) {
    return item.api === EApiType.PopularWeekly;
  }
  function isRanking(item) {
    return item.api === EApiType.Ranking;
  }
  function isLive(item) {
    return item.api === EApiType.Live;
  }
  var XOR_CODE = 23442827791579n;
  var MASK_CODE = 2251799813685247n;
  var MAX_AID = 1n << 51n;
  var BASE = 58n;
  var data = "FcwAPNKTMug3GV5Lj7EJnHpWsx4tb8haYeviqBz6rkCy12mUSDQX9RdoZf";
  function av2bv(aid) {
    const bytes = ["B", "V", "1", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
    let bvIndex = bytes.length - 1;
    let tmp = (MAX_AID | BigInt(aid)) ^ XOR_CODE;
    while (tmp > 0) {
      bytes[bvIndex] = data[Number(tmp % BigInt(BASE))];
      tmp = tmp / BASE;
      bvIndex -= 1;
    }
    [bytes[3], bytes[9]] = [bytes[9], bytes[3]];
    [bytes[4], bytes[7]] = [bytes[7], bytes[4]];
    return bytes.join("");
  }
  function bv2av(bvid) {
    const bvidArr = Array.from(bvid);
    [bvidArr[3], bvidArr[9]] = [bvidArr[9], bvidArr[3]];
    [bvidArr[4], bvidArr[7]] = [bvidArr[7], bvidArr[4]];
    bvidArr.splice(0, 3);
    const tmp = bvidArr.reduce((pre, bvidChar) => pre * BASE + BigInt(data.indexOf(bvidChar)), 0n);
    return Number(tmp & MASK_CODE ^ XOR_CODE);
  }
  var BvCode = { av2bv, bv2av };
  const AppRecIconSvgNameMap = {
    play: "#widget-video-play-count",
    // or #widget-play-count
    danmaku: "#widget-video-danmaku",
    like: "#widget-agree",
    bangumiFollow: "#widget-followed",
    favorite: "#widget-favorite",
    coin: "#widget-coin"
  };
  const AppRecIconMap = {
    1: "play",
    2: "like",
    // 没出现过, 猜的
    3: "danmaku",
    4: "bangumiFollow",
    // 追番
    20: "like"
    // 动态点赞
  };
  const AppRecIconScaleMap = {
    bangumiFollow: 1.3,
    favorite: 0.9
  };
  function getField(id) {
    return AppRecIconMap[id] || AppRecIconMap[1];
  }
  function StatItemDisplay({
    field,
    value
  }) {
    const text = value;
    const iconSvgName = AppRecIconSvgNameMap[field];
    const iconSvgScale = AppRecIconScaleMap[field];
    let _text;
    if (typeof text === "number" || text && /^\d+$/.test(text)) {
      _text = formatCount(Number(text)) ?? STAT_NUMBER_FALLBACK;
    } else {
      _text = text ?? STAT_NUMBER_FALLBACK;
    }
    return /* @__PURE__ */ jsxs("span", {
      className: "bili-video-card__stats--item",
      children: [/* @__PURE__ */ jsx("svg", {
        className: "bili-video-card__stats--icon",
        style: {
          transform: iconSvgScale ? `scale(${iconSvgScale})` : void 0
        },
        children: /* @__PURE__ */ jsx("use", {
          href: iconSvgName
        })
      }), /* @__PURE__ */ jsx("span", {
        className: "bili-video-card__stats--text",
        style: {
          lineHeight: "calc(var(--icon-size) + 1px)"
        },
        children: _text
      })]
    });
  }
  const DESC_SEPARATOR = " · ";
  function lookinto(item, opts) {
    if (isApp(item)) return opts.app(item);
    if (isPc(item)) return opts.pc(item);
    if (isDynamic(item)) return opts.dynamic(item);
    if (isWatchlater(item)) return opts.watchlater(item);
    if (isFav(item)) return opts.fav(item);
    if (isPopularGeneral(item)) return opts["popular-general"](item);
    if (isPopularWeekly(item)) return opts["popular-weekly"](item);
    if (isRanking(item)) return opts["ranking"](item);
    if (isLive(item)) return opts.live(item);
    throw new Error(`unknown api type`);
  }
  function normalizeCardData(item) {
    const ret = lookinto(item, {
      "app": apiAppAdapter,
      "pc": apiPcAdapter,
      "dynamic": apiDynamicAdapter,
      "watchlater": apiWatchLaterAdapter,
      "fav": apiFavAdapter,
      "popular-general": apiPopularGeneralAdapter,
      "popular-weekly": apiPopularWeeklyAdapter,
      "ranking": apiRankingAdapter,
      "live": apiLiveAdapter
    });
    if (ret.authorFace) ret.authorFace = toHttps(ret.authorFace);
    ret.cover = toHttps(ret.cover);
    return ret;
  }
  function apiAppAdapter(item) {
    return item.device === "android" ? apiAndroidAppAdapter(item) : apiIpadAppAdapter(item);
  }
  function apiAndroidAppAdapter(item) {
    var _a2, _b2, _c2;
    const extractCountFor = (target) => {
      const {
        cover_left_icon_1,
        cover_left_text_1,
        cover_left_icon_2,
        cover_left_text_2
      } = item;
      if (cover_left_icon_1 && AppRecIconMap[cover_left_icon_1] === target) {
        return parseCount(cover_left_text_1);
      }
      if (cover_left_icon_2 && AppRecIconMap[cover_left_icon_2] === target) {
        return parseCount(cover_left_text_2);
      }
    };
    const avid = item.param;
    const bvid = BvCode.av2bv(Number(item.param));
    const href = (() => {
      var _a3;
      if (item.uri.startsWith("http://") || item.uri.startsWith("https://")) {
        return item.uri;
      }
      if (item.goto === "av") {
        return `/video/${bvid}/`;
      }
      if (item.goto === "bangumi") {
        console.warn(`[${APP_NAME}]: bangumi uri should not starts with 'bilibili://': %s`, item.uri);
        return item.uri;
      }
      if (item.goto === "picture") {
        const id = (_a3 = /^bilibili:\/\/article\/(\d+)$/.exec(item.uri)) == null ? void 0 : _a3[1];
        if (id) return `/read/cv${id}`;
        return item.uri;
      }
      return item.uri;
    })();
    return {
      // video
      avid,
      bvid,
      goto: item.goto,
      href,
      title: item.title,
      cover: item.cover,
      pubts: void 0,
      pubdateDisplay: void 0,
      duration: ((_a2 = item.player_args) == null ? void 0 : _a2.duration) || 0,
      durationStr: formatDuration((_b2 = item.player_args) == null ? void 0 : _b2.duration),
      recommendReason: item.rcmd_reason,
      // stat
      play: extractCountFor("play"),
      danmaku: extractCountFor("danmaku"),
      bangumiFollow: extractCountFor("bangumiFollow"),
      like: void 0,
      coin: void 0,
      favorite: void 0,
      // e.g 2023-09-17
      // cover_left_1_content_description: "156点赞"
      // cover_left_icon_1: 20
      // cover_left_text_1: "156"
      statItems: [item.cover_left_text_1 && {
        field: getField(item.cover_left_icon_1),
        value: item.cover_left_text_1
      }, item.cover_left_text_2 && {
        field: getField(item.cover_left_icon_2),
        value: item.cover_left_text_2
      }].filter(Boolean),
      // author
      authorName: item.args.up_name,
      authorFace: void 0,
      authorMid: String(item.args.up_id),
      appBadge: item.badge,
      appBadgeDesc: ((_c2 = item.desc_button) == null ? void 0 : _c2.text) || item.desc || ""
    };
  }
  function apiIpadAppAdapter(item) {
    var _a2, _b2;
    const extractCountFor = (target) => {
      const {
        cover_left_text_1,
        cover_left_text_2,
        cover_left_text_3
      } = item;
      const arr2 = [cover_left_text_1, cover_left_text_2, cover_left_text_3].filter(Boolean);
      if (target === "play") {
        const text = arr2.find((text2) => /观看|播放$/.test(text2));
        if (!text) return;
        const rest = text.replace(/观看|播放$/, "");
        return parseCount(rest);
      }
      if (target === "danmaku") {
        const text = arr2.find((text2) => /弹幕$/.test(text2));
        if (!text) return;
        const rest = text.replace(/弹幕$/, "");
        return parseCount(rest);
      }
      if (target === "bangumiFollow") {
        const text = arr2.find((text2) => /追[剧番]$/.test(text2));
        if (!text) return;
        const rest = text.replace(/追[剧番]$/, "");
        return parseCount(rest);
      }
    };
    const avid = item.param;
    const bvid = item.bvid || BvCode.av2bv(Number(item.param));
    const href = (() => {
      var _a3;
      if (item.uri.startsWith("http://") || item.uri.startsWith("https://")) {
        return item.uri;
      }
      if (item.goto === "av") {
        return `/video/${bvid}/`;
      }
      if (item.goto === "bangumi") {
        console.warn(`[${APP_NAME}]: bangumi uri should not starts with 'bilibili://': %s`, item.uri);
        return item.uri;
      }
      if (item.goto === "picture") {
        const id = (_a3 = /^bilibili:\/\/article\/(\d+)$/.exec(item.uri)) == null ? void 0 : _a3[1];
        if (id) return `/read/cv${id}`;
        return item.uri;
      }
      return item.uri;
    })();
    const play = extractCountFor("play");
    const like = void 0;
    const coin = void 0;
    const danmaku = extractCountFor("danmaku");
    const favorite = void 0;
    const bangumiFollow = extractCountFor("bangumiFollow");
    const statItems = [{
      field: "play",
      value: play
    }, typeof danmaku === "number" ? {
      field: "danmaku",
      value: danmaku
    } : {
      field: "bangumiFollow",
      value: bangumiFollow
    }];
    const desc = item.desc || "";
    const [descAuthorName = void 0, descDate = void 0] = desc.split(DESC_SEPARATOR);
    return {
      // video
      avid,
      bvid,
      goto: item.goto,
      href,
      title: item.title,
      cover: item.cover,
      pubts: void 0,
      pubdateDisplay: descDate,
      duration: ((_a2 = item.player_args) == null ? void 0 : _a2.duration) || 0,
      durationStr: formatDuration((_b2 = item.player_args) == null ? void 0 : _b2.duration),
      recommendReason: item.bottom_rcmd_reason || item.top_rcmd_reason,
      // TODO: top_rcmd_reason
      // stat
      play,
      like,
      coin,
      danmaku,
      favorite,
      bangumiFollow,
      statItems,
      // author
      authorName: item.args.up_name || descAuthorName,
      authorFace: item.avatar.cover,
      authorMid: String(item.args.up_id || ""),
      appBadge: item.cover_badge,
      appBadgeDesc: item.desc
    };
  }
  function apiPcAdapter(item) {
    var _a2;
    return {
      // video
      avid: String(item.id),
      bvid: item.bvid,
      goto: item.goto,
      href: item.goto === "av" ? `/video/${item.bvid}/` : item.uri,
      title: item.title,
      cover: item.pic,
      pubts: item.pubdate,
      pubdateDisplay: formatTimeStamp(item.pubdate),
      duration: item.duration,
      durationStr: formatDuration(item.duration),
      recommendReason: (_a2 = item.rcmd_reason) == null ? void 0 : _a2.content,
      // stat
      play: item.stat.view,
      like: item.stat.like,
      coin: void 0,
      danmaku: item.stat.danmaku,
      favorite: void 0,
      statItems: [{
        field: "play",
        value: item.stat.view
      }, {
        field: "like",
        value: item.stat.like
      }],
      // author
      authorName: item.owner.name,
      authorFace: item.owner.face,
      authorMid: String(item.owner.mid)
    };
  }
  function apiDynamicAdapter(item) {
    const v2 = item.modules.module_dynamic.major.archive;
    const author = item.modules.module_author;
    const gateTs = dayjs().subtract(2, "days").unix();
    const pubdateDisplay = (() => {
      const ts = author.pub_ts;
      if (ts > gateTs) {
        return author.pub_time;
      } else {
        return formatTimeStamp(ts);
      }
    })();
    return {
      // video
      avid: v2.aid,
      bvid: v2.bvid,
      goto: "av",
      href: `/video/${v2.bvid}/`,
      title: v2.title,
      cover: v2.cover,
      pubts: author.pub_ts,
      pubdateDisplay,
      duration: parseDuration(v2.duration_text) || 0,
      durationStr: v2.duration_text,
      recommendReason: v2.badge.text,
      // stat
      statItems: [{
        field: "play",
        value: v2.stat.play
      }, {
        field: "danmaku",
        value: v2.stat.danmaku
      }],
      play: parseCount(v2.stat.play),
      danmaku: parseCount(v2.stat.danmaku),
      // author
      authorName: author.name,
      authorFace: author.face,
      authorMid: author.mid.toString()
    };
  }
  function apiWatchLaterAdapter(item) {
    const invalidReason = getVideoInvalidReason(item.state);
    const title = `${item.viewed ? "【已观看】· " : ""}${item.title}`;
    const titleRender = invalidReason ? /* @__PURE__ */ jsx(AntdTooltip, {
      title: /* @__PURE__ */ jsxs(Fragment, {
        children: ["视频已失效, 原因: ", invalidReason]
      }),
      align: {
        offset: [0, -5]
      },
      placement: "topLeft",
      children: /* @__PURE__ */ jsxs("del", {
        children: [item.viewed ? "【已观看】· " : "", item.title, "`"]
      })
    }) : void 0;
    return {
      // video
      avid: String(item.aid),
      bvid: item.bvid,
      goto: "av",
      href: item.uri,
      title,
      titleRender,
      cover: item.pic,
      pubts: item.pubdate,
      pubdateDisplay: formatTimeStamp(item.pubdate),
      pubdateDisplayForTitleAttr: `${formatTimeStamp(item.pubdate, true)} 发布, ${formatTimeStamp(item.add_at, true)} 添加稍后再看`,
      duration: item.duration,
      durationStr: formatDuration(item.duration),
      recommendReason: `${formatTimeStamp(item.add_at)} · 稍后再看`,
      // stat
      statItems: [
        {
          field: "play",
          value: item.stat.view
        },
        {
          field: "like",
          value: item.stat.like
        },
        // { field: 'coin', value: item.stat.coin },
        {
          field: "favorite",
          value: item.stat.favorite
        }
      ],
      play: item.stat.view,
      like: item.stat.like,
      danmaku: item.stat.danmaku,
      // author
      authorName: item.owner.name,
      authorFace: item.owner.face,
      authorMid: String(item.owner.mid)
    };
  }
  function apiFavAdapter(item) {
    return {
      // video
      avid: String(item.id),
      bvid: item.bvid,
      goto: "av",
      href: `/video/${item.bvid}/`,
      title: `【${item.folder.title}】· ${item.title}`,
      titleRender: /* @__PURE__ */ jsxs(Fragment, {
        children: ["【", /* @__PURE__ */ jsx(IconPark, {
          name: "Star",
          size: 16,
          theme: "two-tone",
          fill: ["currentColor", colorPrimaryValue],
          style: {
            display: "inline-block",
            verticalAlign: "middle",
            marginRight: 4,
            marginTop: -4
          }
        }), item.folder.title, "】· ", item.title]
      }),
      cover: item.cover,
      pubts: item.pubtime,
      pubdateDisplay: formatTimeStamp(item.pubtime),
      duration: item.duration,
      durationStr: formatDuration(item.duration),
      recommendReason: `${formatTimeStamp(item.fav_time)} · 收藏`,
      // stat
      play: item.cnt_info.play,
      danmaku: item.cnt_info.danmaku,
      favorite: item.cnt_info.collect,
      statItems: [{
        field: "play",
        value: item.cnt_info.play
      }, {
        field: "danmaku",
        value: item.cnt_info.danmaku
      }, {
        field: "favorite",
        value: item.cnt_info.collect
      }],
      // author
      authorName: item.upper.name,
      authorFace: item.upper.face,
      authorMid: String(item.upper.mid)
    };
  }
  function apiPopularGeneralAdapter(item) {
    var _a2;
    return {
      // video
      avid: String(item.aid),
      bvid: item.bvid,
      goto: "av",
      href: `/video/${item.bvid}/`,
      title: item.title,
      cover: item.pic,
      pubts: item.pubdate,
      pubdateDisplay: formatTimeStamp(item.pubdate),
      duration: item.duration,
      durationStr: formatDuration(item.duration),
      recommendReason: (_a2 = item.rcmd_reason) == null ? void 0 : _a2.content,
      // stat
      play: item.stat.view,
      like: item.stat.like,
      coin: void 0,
      danmaku: item.stat.danmaku,
      favorite: void 0,
      statItems: [{
        field: "play",
        value: item.stat.view
      }, {
        field: "like",
        value: item.stat.like
      }, {
        field: "danmaku",
        value: item.stat.danmaku
      }],
      // author
      authorName: item.owner.name,
      authorFace: item.owner.face,
      authorMid: String(item.owner.mid)
    };
  }
  function apiPopularWeeklyAdapter(item) {
    return {
      // video
      avid: String(item.aid),
      bvid: item.bvid,
      goto: "av",
      href: `/video/${item.bvid}/`,
      title: item.title,
      cover: item.pic,
      pubts: item.pubdate,
      pubdateDisplay: formatTimeStamp(item.pubdate),
      duration: item.duration,
      durationStr: formatDuration(item.duration),
      recommendReason: item.rcmd_reason,
      // stat
      play: item.stat.view,
      like: item.stat.like,
      danmaku: item.stat.danmaku,
      statItems: [{
        field: "play",
        value: item.stat.view
      }, {
        field: "like",
        value: item.stat.like
      }, {
        field: "danmaku",
        value: item.stat.danmaku
      }],
      // author
      authorName: item.owner.name,
      authorFace: item.owner.face,
      authorMid: String(item.owner.mid)
    };
  }
  function apiRankingAdapter(item) {
    if (isBangumiRankingItem(item) || isCinemaRankingItem(item)) {
      const cover = item.new_ep.cover;
      const rankingDesc = item.new_ep.index_show;
      return {
        // video
        avid: "",
        bvid: "",
        goto: "bangumi",
        href: item.url,
        title: item.title,
        cover,
        pubts: void 0,
        pubdateDisplay: void 0,
        duration: 0,
        durationStr: "",
        // stat
        play: item.stat.view,
        like: item.stat.follow,
        danmaku: item.stat.danmaku,
        statItems: [{
          field: "play",
          value: item.stat.view
        }, {
          field: "bangumiFollow",
          value: item.stat.follow
        }, {
          field: "danmaku",
          value: item.stat.danmaku
        }].filter(Boolean),
        rankingDesc
      };
    }
    return {
      // video
      avid: String(item.aid),
      bvid: item.bvid,
      goto: "av",
      href: `/video/${item.bvid}/`,
      title: item.title,
      cover: item.pic,
      pubts: item.pubdate,
      pubdateDisplay: formatTimeStamp(item.pubdate),
      duration: item.duration,
      durationStr: formatDuration(item.duration),
      recommendReason: void 0,
      // TODO: write something here
      // stat
      play: item.stat.view,
      like: item.stat.like,
      danmaku: item.stat.danmaku,
      statItems: [{
        field: "play",
        value: item.stat.view
      }, {
        field: "like",
        value: item.stat.like
      }, {
        field: "danmaku",
        value: item.stat.danmaku
      }].filter(Boolean),
      // author
      authorName: item.owner.name,
      authorFace: item.owner.face,
      authorMid: String(item.owner.mid)
    };
  }
  function apiLiveAdapter(item) {
    const area = `「${item.area_name_v2}」`;
    const liveDesc = item.live_status === ELiveStatus.Streaming ? `${DESC_SEPARATOR.trimEnd()}${area}` : `${DESC_SEPARATOR}${formatLiveTime(item.record_live_time)} 直播过${area}`;
    function formatLiveTime(ts) {
      const today = dayjs().format("YYYYMMDD");
      const yesterday = dayjs().subtract(1, "day").format("YYYYMMDD");
      const d2 = dayjs.unix(ts);
      if (d2.format("YYYYMMDD") === today) {
        return d2.format("HH:mm");
      }
      if (d2.format("YYYYMMDD") === yesterday) {
        return `昨天 ${d2.format("HH:mm")}`;
      }
      return d2.format("MM-DD HH:mm");
    }
    return {
      // video
      goto: "live",
      href: `https://live.bilibili.com/${item.roomid}`,
      title: item.title,
      titleRender: /* @__PURE__ */ jsxs(Fragment, {
        children: [item.live_status === ELiveStatus.Streaming && /* @__PURE__ */ jsx(LiveBadge, {
          css: [C.mr(4), "", ""]
        }), item.title]
      }),
      liveDesc,
      cover: item.room_cover,
      recommendReason: void 0,
      // TODO: write something here
      // stat
      statItems: [{
        field: "play",
        value: item.text_small
      }].filter(Boolean),
      // author
      authorName: item.uname,
      authorFace: item.face,
      authorMid: String(item.uid)
    };
  }
  function LiveBadge({
    className
  }) {
    return /* @__PURE__ */ jsxs("span", {
      className,
      css: css`
        height: 15px;
        line-height: 15px;
        padding: 0 4px;
        width: max-content;
        flex-shrink: 0;

        border-radius: 22px;
        border: 2px solid ${borderColorValue};
        background-color: ${colorPrimaryValue};

        display: inline-flex;
        align-items: center;
        justify-content: center;
      `,
      children: [/* @__PURE__ */ jsx(LiveIcon, {
        active: true,
        ...size(12),
        css: [C.mr(2), "", ""]
      }), /* @__PURE__ */ jsx("span", {
        css: css`
          font-weight: normal;
          font-size: 10px;
          color: #fff;
          line-height: 1;
          position: relative;
          top: 1px;
        `,
        children: "直播中"
      })]
    });
  }
  const isFunction$1 = (value) => {
    return !!(value && value.constructor && value.call && value.apply);
  };
  const isPromise = (value) => {
    if (!value)
      return false;
    if (!value.then)
      return false;
    if (!isFunction$1(value.then))
      return false;
    return true;
  };
  const tryit = (func) => {
    return (...args) => {
      try {
        const result = func(...args);
        if (isPromise(result)) {
          return result.then((value) => [void 0, value]).catch((err) => [err, void 0]);
        }
        return [void 0, result];
      } catch (err) {
        return [err, void 0];
      }
    };
  };
  const pick = (obj, keys2) => {
    if (!obj)
      return {};
    return keys2.reduce((acc, key2) => {
      if (Object.prototype.hasOwnProperty.call(obj, key2))
        acc[key2] = obj[key2];
      return acc;
    }, {});
  };
  const gridItemsKey = `${APP_KEY_PREFIX}_gridItems`;
  const win = unsafeWindow;
  const setWinValue = (key2, val) => void tryit(() => win[key2] = val)();
  function setGlobalGridItems(items) {
    items = items.filter((x2) => x2.api !== EApiType.Separator);
    setWinValue(gridItemsKey, items);
  }
  function getGridCardData() {
    const gridItems = (win == null ? void 0 : win[gridItemsKey]) || [];
    return gridItems.map((item) => normalizeCardData(item));
  }
  function copyBvidsSingleLine() {
    const bvids = getGridCardData().map((cardData) => cardData.bvid);
    GM.setClipboard(bvids.join(" "));
  }
  function copyBvidsInfo() {
    const lines = getGridCardData().map((cardData) => {
      const {
        bvid,
        authorName,
        pubts,
        title
      } = cardData;
      const date = dayjs.unix(pubts ?? 0).format("YYYY-MM-DD");
      return `${bvid} ;; [${authorName}] ${date} ${title}`;
    });
    GM.setClipboard(lines.join("\n"));
  }
  const BIND_TO_UNSAFE_WINDOW_FNS = {
    getGridCardData,
    copyBvidsSingleLine,
    copyBvidsInfo
  };
  setTimeout(() => {
    Object.entries(BIND_TO_UNSAFE_WINDOW_FNS).forEach(([fnName, fn]) => {
      setWinValue(`${APP_KEY_PREFIX}_${fnName}`, fn);
    });
  });
  const OnRefreshContext = React__default.createContext(void 0);
  function useOnRefreshContext() {
    return React__default.useContext(OnRefreshContext);
  }
  function useRefresh({
    debug: debug2,
    // tab,
    fetcher,
    preAction,
    postAction,
    updateExtraInfo,
    // RecGrid 定制
    onScrollToTop,
    setUpperRefreshing
  }) {
    const tab2 = useCurrentUsingTab();
    const itemsCache = useRefInit(() => ({}));
    const getCacheFor = useMemoizedFn((tab22) => {
      const cache2 = itemsCache.current;
      if (tab22 === ETab.Hot) {
        return cache2[hotStore.subtab];
      } else {
        return cache2[tab22];
      }
    });
    const setCacheFor = useMemoizedFn((tab22, items) => {
      const cache2 = itemsCache.current;
      if (tab22 === ETab.Hot) {
        cache2[hotStore.subtab] = items;
      } else {
        cache2[tab22] = items;
      }
    });
    const hasCache = useMemoizedFn((tab22) => {
      var _a2;
      return !!((_a2 = getCacheFor(tab22)) == null ? void 0 : _a2.length);
    });
    const hasMoreBox = useRefStateBox(true);
    const itemsBox = useRefStateBox([]);
    React__default.useEffect(() => {
      setGlobalGridItems(itemsBox.state);
    }, [itemsBox.state]);
    const serviceMapBox = useRefStateBox(() => {
      return Object.fromEntries(Object.entries(createServiceMap).map(([key2, factory]) => [key2, factory(void 0)]));
    });
    const refreshingBox = useRefStateBox(false);
    const refreshTsBox = useRefStateBox(() => Date.now());
    const [refreshFor, setRefreshFor] = React__default.useState(tab2);
    const [refreshAbortController, setRefreshAbortController] = React__default.useState(() => new AbortController());
    const [useSkeleton, setUseSkeleton] = React__default.useState(false);
    const [error, setError] = React__default.useState(void 0);
    const refresh = useMemoizedFn(async (reuse = false, options) => {
      var _a2;
      const start = performance.now();
      const refreshing = refreshingBox.val;
      const serviceMap = serviceMapBox.val;
      if (refreshing) {
        if (tab2 === refreshFor) {
          if (tab2 === ETab.DynamicFeed && serviceMap[ETab.DynamicFeed].searchText !== dynamicFeedFilterStore.searchText) {
            debug2("refresh(): [start] [refreshing] sametab(%s) but conditions change, abort existing", tab2);
            refreshAbortController.abort();
          } else if (tab2 === ETab.Hot && serviceMap[ETab.Hot].subtab !== hotStore.subtab) {
            debug2("refresh(): [start] [refreshing] sametab(%s) but subtab changed, abort existing", tab2);
            refreshAbortController.abort();
          } else {
            debug2("refresh(): [start] [refreshing] prevent same tab(%s) refresh()", tab2);
            return;
          }
        } else {
          debug2("refresh(): [start] [refreshing] switchTab %s -> %s, abort existing", refreshFor, tab2);
          refreshAbortController.abort();
        }
      } else {
        debug2("refresh(): [start] tab = %s", tab2);
      }
      await (onScrollToTop == null ? void 0 : onScrollToTop());
      const updateRefreshing = (val) => {
        refreshingBox.set(val);
        setUpperRefreshing == null ? void 0 : setUpperRefreshing(val);
      };
      updateRefreshing(true);
      refreshTsBox.set(Date.now());
      setRefreshFor(tab2);
      setError(void 0);
      itemsBox.set([]);
      hasMoreBox.set(true);
      await (preAction == null ? void 0 : preAction());
      let _items = [];
      let err;
      const doFetch = async () => {
        try {
          _items = await fetcher(fetcherOptions);
        } catch (e2) {
          err = e2;
        }
      };
      const swrFlag = !!TabConfig[tab2].swr;
      const hasValidCache = swrFlag ? hasCache(tab2) : (() => {
        const service2 = serviceMap[tab2];
        if (!("qs" in service2)) return false;
        return service2.qs.hasCache;
      })();
      const shouldReuse = reuse && hasValidCache;
      const swr = shouldReuse && swrFlag;
      setUseSkeleton(!shouldReuse);
      const newServiceMap = {
        ...serviceMap
      };
      const recreateFor = (tab22) => {
        newServiceMap[tab22] = createServiceMap[tab22](options);
        serviceMapBox.set(newServiceMap);
      };
      if (isRecTab(tab2)) {
        if (shouldReuse) {
          serviceMap[tab2].qs.restore();
        } else {
          recreateFor(tab2);
        }
      }
      if (tab2 === ETab.DynamicFeed || tab2 === ETab.Watchlater || tab2 === ETab.Live) {
        recreateFor(tab2);
      }
      if (tab2 === ETab.Fav) {
        if (shouldReuse) {
          if (swr) {
            recreateFor(tab2);
          } else {
            serviceMap[tab2].qs.restore();
          }
        } else {
          recreateFor(tab2);
        }
      }
      if (tab2 === ETab.Hot) {
        if (shouldReuse) {
          if (swr) {
            recreateFor(tab2);
          } else {
            const hotInnerService = serviceMap[tab2].service;
            (_a2 = hotInnerService.qs) == null ? void 0 : _a2.restore();
          }
        } else {
          recreateFor(tab2);
        }
        updateExtraInfo == null ? void 0 : updateExtraInfo(tab2);
      }
      const _abortController = new AbortController();
      const _signal = _abortController.signal;
      setRefreshAbortController(_abortController);
      const fetcherOptions = {
        tab: tab2,
        abortSignal: _signal,
        serviceMap: newServiceMap
      };
      debug2("refresh(): shouldReuse=%s swr=%s useGridCache=%s", shouldReuse, swr, swrFlag);
      if (shouldReuse) {
        if (swr) {
          _items = getCacheFor(tab2) || [];
          itemsBox.set(_items);
          await doFetch();
        } else {
          setCacheFor(tab2, []);
          await doFetch();
        }
      } else {
        setCacheFor(tab2, []);
        await doFetch();
      }
      if (_signal.aborted) {
        debug2("refresh(): [legacy] skip setItems/err for aborted, legacy tab = %s", tab2);
        return;
      }
      if (err) {
        updateRefreshing(false);
        console.error(err);
        setError(err);
        return;
      }
      if (_items.length) {
        if (swrFlag || tab2 === ETab.Fav || tab2 === ETab.Hot) {
          setCacheFor(tab2, _items.slice(0, 30));
        }
      }
      if (_signal.aborted) {
        debug2("refresh(): [legacy] skip setItems-postAction etc for aborted, legacy tab = %s", tab2);
        return;
      }
      itemsBox.set(_items);
      const service = getIService(newServiceMap, tab2);
      if (service) hasMoreBox.set(service.hasMore);
      updateRefreshing(false);
      await nextTick();
      await (postAction == null ? void 0 : postAction());
      const cost = performance.now() - start;
      debug2("refresh(): [success] cost %s ms", cost.toFixed(0));
    });
    return {
      itemsBox,
      error,
      refresh,
      hasMoreBox,
      refreshingBox,
      refreshTsBox,
      refreshAbortController,
      useSkeleton,
      serviceMapBox
    };
  }
  const iconParkOutlineMore = (props) => /* @__PURE__ */ jsxs("svg", {
    viewBox: "0 0 48 48",
    width: "1.2em",
    height: "1.2em",
    ...props,
    children: [/* @__PURE__ */ jsx("circle", {
      cx: 12,
      cy: 24,
      r: 3,
      fill: "currentColor"
    }), /* @__PURE__ */ jsx("circle", {
      cx: 24,
      cy: 24,
      r: 3,
      fill: "currentColor"
    }), /* @__PURE__ */ jsx("circle", {
      cx: 36,
      cy: 24,
      r: 3,
      fill: "currentColor"
    })]
  });
  const phCrownFill = (props) => /* @__PURE__ */ jsx("svg", {
    viewBox: "0 0 256 256",
    width: "1.2em",
    height: "1.2em",
    ...props,
    children: /* @__PURE__ */ jsx("path", {
      fill: "currentColor",
      d: "M248 80a28 28 0 1 0-51.12 15.77l-26.79 33L146 73.4a28 28 0 1 0-36.06 0l-24.03 55.34l-26.79-33a28 28 0 1 0-26.6 12L47 194.63A16 16 0 0 0 62.78 208h130.44A16 16 0 0 0 209 194.63l14.47-86.85A28 28 0 0 0 248 80M128 40a12 12 0 1 1-12 12a12 12 0 0 1 12-12M24 80a12 12 0 1 1 12 12a12 12 0 0 1-12-12m196 12a12 12 0 1 1 12-12a12 12 0 0 1-12 12"
    })
  });
  const baseZ = 3;
  const S$6 = {
    top: (inlinePosition) => /* @__PURE__ */ css("position:absolute;top:8px;", inlinePosition, ":8px;transform:translateZ(0);z-index:", baseZ + 2, ";", ""),
    topContainer: (inlinePosition) => [S$6.top(inlinePosition), /* @__PURE__ */ css("display:flex;flex-direction:", inlinePosition === "left" ? "row" : "row-reverse", ";column-gap:5px;", "")],
    button: (visible) => /* @__PURE__ */ css("position:relative;width:28px;height:28px;border-radius:6px;cursor:pointer;background-color:rgba(33, 33, 33, 0.7);border:1px solid #444;color:#fff;&:hover{border-color:", colorPrimaryValue, ";}display:", visible ? "inline-flex" : "none", ";align-items:center;justify-content:center;svg{pointer-events:none;user-select:none;}", ""),
    tooltip: (inlinePosition, tooltipOffset = 5) => [/* @__PURE__ */ css("position:absolute;bottom:-6px;pointer-events:none;user-select:none;transform:translateY(100%);font-size:12px;white-space:nowrap;border-radius:4px;line-height:18px;padding:4px 8px;color:#fff;background-color:rgba(0, 0, 0, 0.8);background-color:", colorPrimaryValue, ";", ""), css`
      ${inlinePosition}: -${tooltipOffset}px;
    `]
  };
  const VideoCardActionStyle = S$6;
  const VideoCardActionButton = React__default.memo(function VideoCardActionButton2({
    inlinePosition,
    icon,
    tooltip,
    visible,
    className,
    ...divProps
  }) {
    visible ?? (visible = true);
    const {
      triggerRef,
      tooltipEl
    } = useTooltip({
      inlinePosition,
      tooltip
    });
    return /* @__PURE__ */ jsxs("div", {
      ...divProps,
      ref: triggerRef,
      css: [S$6.button(visible), "", ""],
      className: clsx("action-button", className),
      children: [icon, tooltipEl]
    });
  });
  function useTooltip({
    inlinePosition,
    tooltip,
    tooltipOffset
  }) {
    const triggerRef = React__default.useRef(null);
    const hovering = useHover(triggerRef);
    const tooltipEl = /* @__PURE__ */ jsx("span", {
      style: {
        display: hovering ? "block" : "none"
      },
      css: S$6.tooltip(inlinePosition, tooltipOffset),
      children: tooltip
    });
    return {
      triggerRef,
      tooltipEl
    };
  }
  const CHARGE_ONLY_TEXT = "充电专属";
  function getHasChargeOnlyTag(item, recommendReason) {
    var _a2, _b2, _c2, _d2, _e2;
    if (item.api !== EApiType.Dynamic) return false;
    recommendReason || (recommendReason = (_e2 = (_d2 = (_c2 = (_b2 = (_a2 = item.modules) == null ? void 0 : _a2.module_dynamic) == null ? void 0 : _b2.major) == null ? void 0 : _c2.archive) == null ? void 0 : _d2.badge) == null ? void 0 : _e2.text);
    return recommendReason === CHARGE_ONLY_TEXT;
  }
  function ChargeOnlyTag() {
    return /* @__PURE__ */ jsxs("div", {
      css: [VideoCardActionStyle.top("left"), flexVerticalCenterStyle, css`
          padding: 1px 6px 1px 4px;
          font-size: 10px;
          color: #fff;
          text-align: center;
          line-height: 17px;
          border-radius: 2px;
          margin-left: 4px;
          white-space: nowrap;
          background-color: #f69;
          background-color: ${colorPrimaryValue};
        `, "", ""],
      children: [/* @__PURE__ */ jsx("svg", {
        width: "16",
        height: "17",
        viewBox: "0 0 16 17",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: /* @__PURE__ */ jsx("path", {
          d: "M5.00014 14.9839C4.94522 15.1219 5.12392 15.2322 5.22268 15.1212L11.5561 8.00214C11.7084 7.83093 11.5869 7.56014 11.3578 7.56014H9.13662L11.6019 3.57178C11.7112 3.39489 11.584 3.16666 11.376 3.16666H7.4475C7.22576 3.16666 7.02737 3.30444 6.94992 3.51221L4.68362 9.59189C4.61894 9.76539 4.74725 9.95014 4.93241 9.95014H7.00268L5.00014 14.9839Z",
          fill: "white"
        })
      }), CHARGE_ONLY_TEXT]
    });
  }
  function getColor(no) {
    return no === 1 ? (
      // gold
      "#FFD700"
    ) : no === 2 ? "#C0C0C0" : no === 3 ? "#B36700" : colorPrimaryValue;
  }
  function RankingNumMark({
    item
  }) {
    var _a2;
    const category = RANKING_CATEGORIES_MAP[item.slug];
    const hasMedal = item.rankingNo <= 3;
    const medalIcon = /* @__PURE__ */ jsx(phCrownFill, {});
    let hasOthers = false;
    let others = [];
    if (isNormalRankingItem(item) && ((_a2 = item.others) == null ? void 0 : _a2.length)) {
      hasOthers = true;
      others = item.others;
    }
    const tooltip = `「${category.name}」排行第 ${item.rankingNo} 名`;
    const {
      triggerRef,
      tooltipEl
    } = useTooltip({
      inlinePosition: "left",
      tooltip,
      tooltipOffset: 2
    });
    const roundButtonCss = [flexCenterStyle, css`
      position: relative;
      color: #fff;
      border-radius: 50%;
      white-space: nowrap;
      width: 28px;
      height: 28px;
      background-color: ${getColor(item.rankingNo)};
    `];
    return /* @__PURE__ */ jsxs("div", {
      css: VideoCardActionStyle.topContainer("left"),
      children: [/* @__PURE__ */ jsxs("div", {
        ref: triggerRef,
        css: roundButtonCss,
        children: [hasMedal ? medalIcon : /* @__PURE__ */ jsx("span", {
          style: {
            marginLeft: -1
          },
          children: item.rankingNo
        }), tooltipEl]
      }), hasOthers && /* @__PURE__ */ jsx(antd.Dropdown, {
        placement: "bottomLeft",
        menu: {
          items: [{
            type: "group",
            label: "「其他上榜视频」",
            children: others.map((x2) => {
              return {
                key: x2.bvid,
                label: x2.title,
                onClick() {
                  GM.openInTab(new URL(`/video/${x2.bvid}`, location.href).href, {
                    active: true,
                    insert: true
                  });
                }
              };
            })
          }]
        },
        children: /* @__PURE__ */ jsx("div", {
          css: roundButtonCss,
          children: /* @__PURE__ */ jsx(iconParkOutlineMore, {})
        })
      })]
    });
  }
  var castComparer = function(comparer) {
    return function(a, b2, order) {
      return comparer(a, b2, order) * order;
    };
  };
  var throwInvalidConfigErrorIfTrue = function(condition, context) {
    if (condition)
      throw Error("Invalid sort config: " + context);
  };
  var unpackObjectSorter = function(sortByObj) {
    var _a2 = sortByObj || {}, asc = _a2.asc, desc = _a2.desc;
    var order = asc ? 1 : -1;
    var sortBy = asc || desc;
    throwInvalidConfigErrorIfTrue(!sortBy, "Expected `asc` or `desc` property");
    throwInvalidConfigErrorIfTrue(asc && desc, "Ambiguous object with `asc` and `desc` config properties");
    var comparer = sortByObj.comparer && castComparer(sortByObj.comparer);
    return { order, sortBy, comparer };
  };
  var multiPropertySorterProvider = function(defaultComparer2) {
    return function multiPropertySorter(sortBy, sortByArr, depth, order, comparer, a, b2) {
      var valA;
      var valB;
      if (typeof sortBy === "string") {
        valA = a[sortBy];
        valB = b2[sortBy];
      } else if (typeof sortBy === "function") {
        valA = sortBy(a);
        valB = sortBy(b2);
      } else {
        var objectSorterConfig = unpackObjectSorter(sortBy);
        return multiPropertySorter(objectSorterConfig.sortBy, sortByArr, depth, objectSorterConfig.order, objectSorterConfig.comparer || defaultComparer2, a, b2);
      }
      var equality = comparer(valA, valB, order);
      if ((equality === 0 || valA == null && valB == null) && sortByArr.length > depth) {
        return multiPropertySorter(sortByArr[depth], sortByArr, depth + 1, order, comparer, a, b2);
      }
      return equality;
    };
  };
  function getSortStrategy(sortBy, comparer, order) {
    if (sortBy === void 0 || sortBy === true) {
      return function(a, b2) {
        return comparer(a, b2, order);
      };
    }
    if (typeof sortBy === "string") {
      throwInvalidConfigErrorIfTrue(sortBy.includes("."), "String syntax not allowed for nested properties.");
      return function(a, b2) {
        return comparer(a[sortBy], b2[sortBy], order);
      };
    }
    if (typeof sortBy === "function") {
      return function(a, b2) {
        return comparer(sortBy(a), sortBy(b2), order);
      };
    }
    if (Array.isArray(sortBy)) {
      var multiPropSorter_1 = multiPropertySorterProvider(comparer);
      return function(a, b2) {
        return multiPropSorter_1(sortBy[0], sortBy, 1, order, comparer, a, b2);
      };
    }
    var objectSorterConfig = unpackObjectSorter(sortBy);
    return getSortStrategy(objectSorterConfig.sortBy, objectSorterConfig.comparer || comparer, objectSorterConfig.order);
  }
  var sortArray = function(order, ctx, sortBy, comparer) {
    var _a2;
    if (!Array.isArray(ctx)) {
      return ctx;
    }
    if (Array.isArray(sortBy) && sortBy.length < 2) {
      _a2 = sortBy, sortBy = _a2[0];
    }
    return ctx.sort(getSortStrategy(sortBy, comparer, order));
  };
  function createNewSortInstance(opts) {
    var comparer = castComparer(opts.comparer);
    return function(arrayToSort) {
      var ctx = Array.isArray(arrayToSort) && !opts.inPlaceSorting ? arrayToSort.slice() : arrayToSort;
      return {
        asc: function(sortBy) {
          return sortArray(1, ctx, sortBy, comparer);
        },
        desc: function(sortBy) {
          return sortArray(-1, ctx, sortBy, comparer);
        },
        by: function(sortBy) {
          return sortArray(1, ctx, sortBy, comparer);
        }
      };
    };
  }
  var defaultComparer = function(a, b2, order) {
    if (a == null)
      return order;
    if (b2 == null)
      return -order;
    if (typeof a !== typeof b2) {
      return typeof a < typeof b2 ? -1 : 1;
    }
    if (a < b2)
      return -1;
    if (a > b2)
      return 1;
    return 0;
  };
  var sort = createNewSortInstance({
    comparer: defaultComparer
  });
  createNewSortInstance({
    comparer: defaultComparer,
    inPlaceSorting: true
  });
  function fastSortWithOrders(list, orders) {
    const _by = orders.map(({ order, prop }) => {
      if (order === "asc") return { asc: prop };
      else if (order === "desc") return { desc: prop };
      return { asc: prop, comparer: order };
    });
    return sort(list).by(_by);
  }
  async function getRecentUpdateUpList() {
    const res = await request.get("/x/polymer/web-dynamic/v1/portal");
    const json = res.data;
    const list = (json == null ? void 0 : json.data.up_list) || [];
    return list;
  }
  class DynamicFeedRecService {
    constructor(upMid, searchText) {
      __publicField(this, "offset", "");
      __publicField(this, "page", 0);
      // pages loaded
      __publicField(this, "hasMore", true);
      __publicField(this, "upMid");
      __publicField(this, "searchText");
      this.upMid = upMid;
      this.searchText = searchText;
    }
    async loadMore(signal = void 0) {
      if (!this.hasMore) {
        return;
      }
      const params = {
        timezone_offset: "-480",
        type: "video",
        features: "itemOpusStyle",
        page: this.page + 1
        // ++this.page, starts from 1
      };
      if (this.offset) {
        params.offset = this.offset;
      }
      if (this.upMid) {
        params.host_mid = this.upMid;
      }
      const res = await request.get("/x/polymer/web-dynamic/v1/feed/all", {
        signal,
        params
      });
      const json = res.data;
      if (!isWebApiSuccess(json)) {
        toast(json.message || REQUEST_FAIL_MSG);
        if (json.message === "账号未登录") {
          this.hasMore = false;
        }
        return;
      }
      this.page++;
      this.hasMore = json.data.has_more;
      this.offset = json.data.offset;
      const arr2 = json.data.items;
      const items = arr2.filter((it) => it.type === "DYNAMIC_TYPE_AV").filter((it) => {
        var _a2, _b2, _c2, _d2;
        if (!this.searchText) return true;
        const title = ((_d2 = (_c2 = (_b2 = (_a2 = it == null ? void 0 : it.modules) == null ? void 0 : _a2.module_dynamic) == null ? void 0 : _b2.major) == null ? void 0 : _c2.archive) == null ? void 0 : _d2.title) || "";
        return title.includes(this.searchText);
      }).map((item) => {
        return {
          ...item,
          api: EApiType.Dynamic,
          uniqId: item.id_str || crypto.randomUUID()
        };
      });
      const {
        upMid,
        upName
      } = store$1;
      if (
        //
        QUERY_DYNAMIC_UP_MID && upMid && upName && upName === upMid.toString() && items[0]
      ) {
        const authorName = items[0].modules.module_author.name;
        store$1.upName = authorName;
      }
      if (store$1.hasSelectedUp && this.upMid && !store$1.hasChargeOnlyVideoUpSet.has(this.upMid) && items.some((x2) => getHasChargeOnlyTag(x2))) {
        store$1.hasChargeOnlyVideoUpSet.add(this.upMid);
      }
      return items;
    }
    get usageInfo() {
      return /* @__PURE__ */ jsx(DynamicFeedUsageInfo, {});
    }
  }
  __publicField(DynamicFeedRecService, "PAGE_SIZE", 15);
  const searchParams = new URLSearchParams(location.search);
  const QUERY_DYNAMIC_UP_MID = !!searchParams.get("dyn-mid");
  let upMidInitial = void 0;
  let upNameInitial = void 0;
  if (QUERY_DYNAMIC_UP_MID) {
    upMidInitial = Number(searchParams.get("dyn-mid"));
    upNameInitial = searchParams.get("dyn-name") ?? upMidInitial.toString() ?? void 0;
  }
  const dynamicFeedFilterStore = proxy({
    upMid: upMidInitial,
    upName: upNameInitial,
    searchText: void 0,
    upList: [],
    upListUpdatedAt: 0,
    get hasSelectedUp() {
      return !!(this.upName && this.upMid);
    },
    hasChargeOnlyVideoUpSet: await( proxySetWithGmStorage("dynamic-feed:has-charge-only-video-mids"))
  });
  const store$1 = dynamicFeedFilterStore;
  if (QUERY_DYNAMIC_UP_MID) {
    subscribeKey(store$1, "upName", (upName) => {
      const title = upName ? `「${upName}」的动态` : "动态";
      setPageTitle(title);
    });
  }
  setTimeout(() => {
    if (!IN_BILIBILI_HOMEPAGE) return;
    if (!store$1.upList.length) {
      requestIdleCallback(() => {
        updateUpList();
      });
    }
  }, ms$1("5s"));
  async function updateUpList(force = false) {
    const cacheHit = !force && store$1.upList.length && store$1.upListUpdatedAt && store$1.upListUpdatedAt - Date.now() < ms$1("5min");
    if (cacheHit) return;
    const list = await getRecentUpdateUpList();
    store$1.upList = list;
    store$1.upListUpdatedAt = Date.now();
  }
  function dynamicFeedFilterSelectUp(payload) {
    Object.assign(store$1, payload);
    if (payload.upMid) {
      const item = store$1.upList.find((x2) => x2.mid === payload.upMid);
      if (item) item.has_update = false;
    }
  }
  function DynamicFeedUsageInfo() {
    const {
      ref,
      getPopupContainer
    } = usePopupContainer();
    const onRefresh = useOnRefreshContext();
    const {
      hasSelectedUp,
      upName,
      upMid,
      upList,
      hasChargeOnlyVideoUpSet
    } = useSnapshot(store$1);
    const hasChargeOnlyVideo = React__default.useMemo(() => !!upMid && !!hasChargeOnlyVideoUpSet.has(upMid), [hasChargeOnlyVideoUpSet, upMid]);
    useMount(() => {
      updateUpList();
    });
    const onSelect = useMemoizedFn(async (payload) => {
      dynamicFeedFilterSelectUp(payload);
      await delay(100);
      onRefresh == null ? void 0 : onRefresh();
    });
    const onClear = useMemoizedFn(() => {
      onSelect({
        upMid: void 0,
        upName: void 0,
        searchText: void 0
      });
    });
    const menuItems = React__default.useMemo(() => {
      const itemAll = {
        key: "all",
        icon: /* @__PURE__ */ jsx(antd.Avatar, {
          size: "small",
          children: "全"
        }),
        label: "全部",
        onClick: onClear
      };
      function mapName(name) {
        return name.toLowerCase().replace(/^([a-z])/, "999999$1");
      }
      const upListSorted = fastSortWithOrders(upList, [{
        prop: (it) => it.has_update ? 1 : 0,
        order: "desc"
      }, {
        prop: "uname",
        order: (a, b2) => {
          [a, b2] = [a, b2].map(mapName);
          return a.localeCompare(b2, "zh-CN");
        }
      }]);
      const items = upListSorted.map((up) => {
        let avatar = /* @__PURE__ */ jsx(antd.Avatar, {
          size: "small",
          src: getAvatarSrc(up.face)
        });
        if (up.has_update) {
          avatar = /* @__PURE__ */ jsx(antd.Badge, {
            dot: true,
            children: avatar
          });
        }
        return {
          key: up.mid,
          icon: avatar,
          // label: up.uname,
          label: /* @__PURE__ */ jsx("span", {
            title: up.uname,
            css: css`
              display: block;
              max-width: 130px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            `,
            children: up.uname
          }),
          onClick() {
            onSelect({
              upMid: up.mid,
              upName: up.uname,
              searchText: void 0
            });
          }
        };
      });
      return [itemAll, ...items];
    }, [upList, upList.map((x2) => !!x2.has_update)]);
    /* @__PURE__ */ jsx("div", {
      css: css`
        flex-basis: 100%;
        height: 0;
      `
    });
    return /* @__PURE__ */ jsx(Fragment, {
      children: /* @__PURE__ */ jsxs(antd.Space, {
        ref,
        children: [/* @__PURE__ */ jsx(antd.Dropdown, {
          placement: "bottomLeft",
          getPopupContainer,
          menu: {
            items: menuItems,
            style: {
              maxHeight: "60vh",
              overflowY: "scroll"
            }
          },
          children: /* @__PURE__ */ jsx(antd.Button, {
            css: [antdCustomCss.button, "", ""],
            children: upName ? `UP: ${upName}` : "全部"
          })
        }), hasSelectedUp && /* @__PURE__ */ jsxs(antd.Button, {
          onClick: onClear,
          css: [antdCustomCss.button, "", ""],
          className: "gap-0",
          children: [/* @__PURE__ */ jsx(IconPark, {
            name: "Return",
            size: 14,
            style: {
              marginRight: 5
            }
          }), /* @__PURE__ */ jsx("span", {
            children: "清除"
          })]
        }), hasSelectedUp && hasChargeOnlyVideo && /* @__PURE__ */ jsx(CheckboxSettingItem, {
          css: css`
              margin-left: 5px;
            `,
          configKey: "hideChargeOnlyDynamicFeedVideos",
          label: `隐藏「${CHARGE_ONLY_TEXT}」`,
          extraAction: () => onRefresh == null ? void 0 : onRefresh(),
          tooltip: `隐藏「${CHARGE_ONLY_TEXT}」视频`
        }), hasSelectedUp && /* @__PURE__ */ jsx(antd.Input.Search, {
          style: {
            width: 160
          },
          placeholder: "按标题过滤",
          type: "search",
          autoCorrect: "off",
          autoCapitalize: "off",
          name: `searchText_${upMid}`,
          autoComplete: "on",
          allowClear: true,
          onSearch: async (val) => {
            store$1.searchText = val || void 0;
            await delay(100);
            onRefresh == null ? void 0 : onRefresh();
          }
        })]
      })
    });
  }
  const videoSourceTabState = await( proxyWithGmStorage({
    value: ETab.RecommendApp
  }, `video-source-tab`));
  if (QUERY_DYNAMIC_UP_MID && videoSourceTabState.value !== ETab.DynamicFeed) {
    videoSourceTabState.value = ETab.DynamicFeed;
  }
  function getSortedTabKeys(customTabKeysOrder) {
    return TabKeys.slice().sort((a, b2) => {
      let aIndex = customTabKeysOrder.indexOf(a);
      let bIndex = customTabKeysOrder.indexOf(b2);
      if (aIndex === -1) aIndex = TabKeys.indexOf(a);
      if (bIndex === -1) bIndex = TabKeys.indexOf(b2);
      return aIndex - bIndex;
    });
  }
  function useSortedTabKeys() {
    const {
      customTabKeysOrder
    } = useSettingsSnapshot();
    return React__default.useMemo(() => getSortedTabKeys(customTabKeysOrder), [customTabKeysOrder]);
  }
  function useCurrentDisplayingTabKeys() {
    const {
      hidingTabKeys,
      customTabKeysOrder,
      showPopularWeeklyOnlyOnWeekend
    } = useSettingsSnapshot();
    const logined = useHasLogined();
    const keys = React__default.useMemo(() => {
      const tabkeys = getSortedTabKeys(customTabKeysOrder);
      return tabkeys.filter((key2) => {
        if (key2 === ETab.RecommendApp && !logined) {
          return true;
        }
        if (key2 === ETab.DynamicFeed && QUERY_DYNAMIC_UP_MID) {
          return true;
        }
        return !hidingTabKeys.includes(key2);
      });
    }, [hidingTabKeys, customTabKeysOrder, showPopularWeeklyOnlyOnWeekend, logined]);
    if (QUERY_DYNAMIC_UP_MID && keys.includes(ETab.DynamicFeed)) {
      return [ETab.DynamicFeed];
    }
    return keys;
  }
  function useCurrentDisplayingTabConfigList() {
    const keys = useCurrentDisplayingTabKeys();
    return React__default.useMemo(() => keys.map((key2) => ({
      key: key2,
      ...TabConfig[key2]
    })), [keys]);
  }
  function useCurrentUsingTab() {
    const tab2 = useSnapshot(videoSourceTabState).value;
    const displayTabKeys = useCurrentDisplayingTabKeys();
    const logined = useHasLogined();
    const fallbackTab = ETab.RecommendApp;
    if (!displayTabKeys.includes(tab2)) return fallbackTab;
    if (!logined) {
      if (!TabConfig[tab2].anonymousUsage) {
        return fallbackTab;
      }
    }
    return tab2;
  }
  const iconCss = css`
  margin-right: 4px;
  /* margin-top: -1px; */
`;
  const radioBtnCss = css`
  height: 26px;
  line-height: unset;

  &:has(:focus-visible) {
    outline: none;
    outline-offset: unset;
  }

  > .ant-radio-button + span {
    height: 100%;
  }
`;
  const radioBtnStandardCss = css`
  height: 32px;
`;
  function VideoSourceTab({
    onRefresh
  }) {
    const logined = useHasLogined();
    const tab2 = useCurrentUsingTab();
    const {
      styleUseStandardVideoSourceTab
    } = useSettingsSnapshot();
    const currentTabConfigList = useCurrentDisplayingTabConfigList();
    return /* @__PURE__ */ jsxs("div", {
      css: flexVerticalCenterStyle,
      children: [/* @__PURE__ */ jsx(antd.Radio.Group, {
        optionType: "button",
        buttonStyle: "solid",
        size: "middle",
        value: tab2,
        css: css`
          display: inline-flex;
          align-items: center;
          overflow: hidden;
        `,
        onFocus: (e2) => {
          const target = e2.target;
          target.blur();
        },
        onChange: (e2) => {
          const newValue = e2.target.value;
          if (!logined) {
            if (!TabConfig[newValue].anonymousUsage) {
              if (!checkLoginStatus()) {
                return toastNeedLogin();
              }
            }
          }
          videoSourceTabState.value = newValue;
          setTimeout(() => {
            onRefresh(true, {
              watchlaterKeepOrder: true
            });
          });
        },
        children: currentTabConfigList.map(({
          key: key2,
          label
        }) => /* @__PURE__ */ jsx(antd.Radio.Button, {
          css: [radioBtnCss, styleUseStandardVideoSourceTab && radioBtnStandardCss, "", ""],
          className: "video-source-tab",
          tabIndex: -1,
          value: key2,
          children: /* @__PURE__ */ jsxs("span", {
            css: css`
                display: flex;
                align-items: center;
                line-height: unset;
                height: 100%;
              `,
            children: [/* @__PURE__ */ jsx(TabIcon, {
              tabKey: key2,
              moreCss: iconCss,
              active: key2 === tab2
            }), label]
          })
        }, key2))
      }), /* @__PURE__ */ jsx(HelpInfo, {
        iconProps: {
          name: "Tips",
          size: 16,
          style: {
            marginLeft: 6
          }
        },
        children: /* @__PURE__ */ jsx(Fragment, {
          children: currentTabConfigList.map(({
            key: key2,
            label,
            desc
          }) => /* @__PURE__ */ jsxs("div", {
            css: css`
                display: flex;
                align-items: center;
                height: 22px;
              `,
            children: [/* @__PURE__ */ jsx(TabIcon, {
              tabKey: key2,
              moreCss: iconCss,
              active: true
            }), label, ": ", desc]
          }, key2))
        })
      })]
    });
  }
  function createLessFrequentFn(fn, initialTargetTimes, harder = true) {
    let times = 0;
    let targetTimes = initialTargetTimes;
    return (...args) => {
      times++;
      if (times === targetTimes) {
        times = 0;
        if (harder) targetTimes++;
        return fn(...args);
      }
    };
  }
  function useLessFrequentFn(fn, initialTargetTimes, harder = true) {
    const _fn = useMemoizedFn(fn);
    return React__default.useMemo(() => {
      return createLessFrequentFn(_fn, initialTargetTimes, harder);
    }, [_fn, initialTargetTimes, harder]);
  }
  function useMittOn(emitter2, type, handler) {
    const fn = useMemoizedFn(handler);
    React__default.useEffect(() => {
      emitter2.on(type, fn);
      return () => {
        emitter2.off(type, fn);
      };
    }, [emitter2]);
  }
  const UserFavService = {
    removeFav,
    addFav,
    getVideoFavState
  };
  async function removeFav(folderId, resource) {
    const form = new URLSearchParams({
      resources: resource,
      media_id: folderId.toString(),
      platform: "web",
      csrf: getCsrfToken()
    });
    const res = await request.post("/x/v3/fav/resource/batch-del", form);
    const json = res.data;
    const success = isWebApiSuccess(json);
    if (!success) {
      toast(json.message || OPERATION_FAIL_MSG);
    }
    return success;
  }
  async function getVideoFavState(avid) {
    if (!getHasLogined()) return;
    const res = await request.get("/x/v3/fav/folder/created/list-all", {
      params: {
        up_mid: getUid(),
        type: 2,
        rid: avid
      }
    });
    const json = res.data;
    const favFolders = json.data.list.filter((folder) => folder.fav_state > 0);
    const favFolderNames = favFolders.map((f2) => f2.title);
    const favFolderUrls = favFolders.map((f2) => formatFavFolderUrl(f2.id));
    return {
      favFolders,
      favFolderNames,
      favFolderUrls
    };
  }
  async function favDeal({
    avid,
    add_media_ids = "",
    del_media_ids = ""
  }) {
    const form = new URLSearchParams({
      rid: avid.toString(),
      type: "2",
      add_media_ids,
      del_media_ids,
      platform: "web",
      eab_x: "2",
      ramval: "0",
      ga: "1",
      gaia_source: "web_normal",
      csrf: getCsrfToken()
    });
    const res = await request.post("/x/v3/fav/resource/deal", form);
    const json = res.data;
    const success = isWebApiSuccess(json);
    if (!success) {
      toast((json == null ? void 0 : json.message) || "fav deal api fail");
    }
    return success;
  }
  let defaultFavFolderId = 0;
  let defaultFavFolderName = "";
  async function addFav(avid) {
    if (!defaultFavFolderId || !defaultFavFolderName) {
      const folders = await apiFavFolderListAll();
      defaultFavFolderId = folders[0].id;
      defaultFavFolderName = folders[0].title;
    }
    return await favDeal({
      avid,
      add_media_ids: defaultFavFolderId.toString()
    });
  }
  async function modifyRelations(upMid, act) {
    const uid = getUid();
    const csrf = getCsrfToken();
    const params = new URLSearchParams({
      fid: upMid,
      act: String(act),
      re_src: "11",
      gaia_source: "web_main",
      spmid: "333.999.0.0",
      extend_content: JSON.stringify({
        entity: "user",
        entity_id: uid,
        fp: d()
      }),
      csrf
    });
    const res = await request.post("/x/relation/modify", params);
    const json = res.data;
    const success = isWebApiSuccess(json);
    if (!success) {
      toast(json.message || "未知错误");
    }
    return success;
  }
  function d() {
    let t2;
    let e2;
    const i = (
      // @ts-ignore
      (null === (t2 = window.reportObserver) || void 0 === t2 || null === (e2 = t2.cache) || void 0 === e2 ? void 0 : e2.fpriskMsg) || {}
    );
    let n2 = "empty";
    return i && (n2 = i.webdriver + "" + i.screenResolution + "" + i.platform + "" + i.hardwareConcurrency + "" + i.deviceMemory + "" + i.colorDepth + "" + i.indexedDb + "" + i.language + "" + i.openDatabase + "" + i.touchSupport + "" + i.userAgent), decodeURIComponent(n2);
  }
  const debug$7 = baseDebug.extend("service:user:relations:blacklist");
  const blacklistAdd = blacklistActionFactory("follow");
  const blacklistRemove = blacklistActionFactory("remove");
  const UserBlacklistService = {
    add: blacklistAdd,
    remove: blacklistRemove
  };
  const blacklistMids = await( proxySetWithGmStorage("blacklist-mids"));
  function useInBlacklist(upMid) {
    const set = useSnapshot(blacklistMids);
    return upMid && set.has(upMid);
  }
  function blacklistActionFactory(action2) {
    const act = action2 === "follow" ? 5 : 6;
    return async function blacklistAction(upMid) {
      const success = await modifyRelations(upMid, act);
      if (success) {
        if (action2 === "follow") {
          blacklistMids.add(upMid);
        } else if (action2 === "remove") {
          blacklistMids.delete(upMid);
        }
      }
      return success;
    };
  }
  async function getUserBlacklist() {
    const ps = 20;
    const getPage = async (pn) => {
      const res = await request.get("/x/relation/blacks", {
        params: {
          re_version: 0,
          ps,
          pn
        }
      });
      const json = res.data;
      if (!isWebApiSuccess(json)) return;
      const total2 = json.data.total;
      const mids2 = json.data.list.map((x2) => x2.mid);
      return {
        total: total2,
        mids: mids2
      };
    };
    const ret = await getPage(1);
    if (!ret) return;
    const {
      total,
      mids = []
    } = ret;
    let blackMids = mids;
    if (total) {
      const maxPn = Math.ceil(total / ps);
      for (let pn = 2; pn <= maxPn; pn++) {
        const {
          mids: mids2 = []
        } = await getPage(pn) || {};
        blackMids = blackMids.concat(mids2);
      }
    }
    return blackMids;
  }
  (async () => {
    if (!IN_BILIBILI_HOMEPAGE) return;
    await whenIdle();
    const ids2 = await getUserBlacklist();
    if (ids2) {
      blacklistMids.clear();
      ids2.forEach((x2) => blacklistMids.add(x2.toString()));
    }
    debug$7("user blocklist fetched: %o", ids2);
    return ids2;
  })();
  const follow = followActionFactory("follow");
  const unfollow = followActionFactory("unfollow");
  const UserfollowService = {
    follow,
    unfollow
  };
  function followActionFactory(action2) {
    const act = action2 === "follow" ? 1 : 2;
    return async function followAction(upMid) {
      const success = await modifyRelations(upMid, act);
      return success;
    };
  }
  function Picture({
    src: src2,
    avif,
    webp,
    imgProps,
    ...props
  }) {
    avif ?? (avif = !isSafari);
    webp ?? (webp = true);
    return /* @__PURE__ */ jsxs("picture", {
      css: css`
        width: 100%;
        height: 100%;
        object-fit: cover;
      `,
      ...props,
      children: [avif && /* @__PURE__ */ jsx("source", {
        srcSet: `${src2}.avif`,
        type: "image/avif"
      }), webp && /* @__PURE__ */ jsx("source", {
        srcSet: `${src2}.webp`,
        type: "image/webp"
      }), /* @__PURE__ */ jsx("img", {
        src: src2,
        loading: "lazy",
        css: css`
          display: block;
          width: 100%;
          height: 100%;
          object-fit: inherit;
        `,
        ...imgProps
      })]
    });
  }
  const materialSymbolsDeleteOutlineRounded = (props) => /* @__PURE__ */ jsx("svg", {
    viewBox: "0 0 24 24",
    width: "1.2em",
    height: "1.2em",
    ...props,
    children: /* @__PURE__ */ jsx("path", {
      fill: "currentColor",
      d: "M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zm-7 11q.425 0 .713-.288T11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17m4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17M7 6v13z"
    })
  });
  const S$5 = {
    previewCardWrapper: css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;

    /* see https://github.com/magicdawn/bilibili-app-recommend/issues/112 */
    /* useMouse 使用的是 document.addEventListener, 不用它响应 mousemove 事件 */
    pointer-events: none;

    // 配合进度条, 底部不需要圆角
    border-top-left-radius: ${borderRadiusValue};
    border-top-right-radius: ${borderRadiusValue};
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  `,
    previewCardInner: css`
    width: 100%;
    height: 100%;
  `
  };
  function fallbackWhenNan(...args) {
    for (const num of args) {
      if (isNaN(num)) continue;
      return num;
    }
    return 0;
  }
  const PreviewImage = React__default.memo(React__default.forwardRef(function({
    progress,
    t: t2,
    videoDuration,
    pvideo,
    mouseEnterRelativeX,
    className,
    ...restProps
  }, ref) {
    const divRef = React__default.useRef(null);
    const cursorState = useMouse(divRef);
    const [size2, setSize] = React__default.useState(() => ({
      width: 0,
      height: 0
    }));
    useMount(() => {
      var _a2;
      const rect = (_a2 = divRef.current) == null ? void 0 : _a2.getBoundingClientRect();
      if (!rect) return;
      setSize({
        width: rect.width,
        height: rect.height
      });
    });
    const usingProgress = React__default.useMemo(() => {
      let ret = 0;
      if (typeof progress === "number") {
        ret = progress;
      } else {
        const relativeX = fallbackWhenNan(cursorState.elementX, mouseEnterRelativeX || 0);
        if (size2.width && relativeX && !isNaN(relativeX)) {
          ret = relativeX / size2.width;
        }
      }
      if (ret < 0) ret = 0;
      if (ret > 1) ret = 1;
      return ret;
    }, [progress, cursorState.elementX, mouseEnterRelativeX, size2.width]);
    const usingT = React__default.useMemo(() => t2 ?? Math.floor((videoDuration || 0) * usingProgress), [t2, videoDuration, usingProgress]);
    const __getTDirect = useMemoizedFn(() => usingT);
    useMemoizedFn(() => {
      const arr2 = (pvideo == null ? void 0 : pvideo.index) || [];
      const index = calcIndex(arr2, usingT) ?? -1;
      if (index === -1) return;
      return arr2[index];
    });
    React__default.useImperativeHandle(ref, () => {
      return {
        getT: __getTDirect
      };
    }, [__getTDirect]);
    const innerProps = {
      progress: usingProgress,
      t: usingT,
      pvideo,
      elWidth: size2.width,
      elHeight: size2.height
    };
    return /* @__PURE__ */ jsx("div", {
      ...restProps,
      ref: divRef,
      className: clsx(previewCardWrapper, className),
      css: S$5.previewCardWrapper,
      children: !!(pvideo && size2.width && size2.height && usingProgress) && /* @__PURE__ */ jsx(PreviewImageInner, {
        ...innerProps
      })
    });
  }));
  const PreviewImageInner = React__default.memo(function PreviewImageInner2({
    t: t2,
    progress,
    pvideo,
    elWidth,
    elHeight
  }) {
    var _a2;
    let index = React__default.useMemo(() => {
      return calcIndex((pvideo == null ? void 0 : pvideo.index) || [], t2) ?? 0;
    }, [pvideo, t2]);
    const {
      img_x_len: colCount,
      img_y_len: rowCount,
      img_x_size: w2,
      img_y_size: h2
    } = pvideo;
    const countPerPreview = rowCount * colCount;
    index = index + 1;
    const snapshotIndex = Math.floor(index / countPerPreview);
    const indexInSnapshot = index - snapshotIndex * countPerPreview;
    const snapshotUrl = ((_a2 = pvideo.image) == null ? void 0 : _a2[snapshotIndex]) || "";
    const indexRow = Math.floor(indexInSnapshot / colCount) + 1;
    const indexCol = indexInSnapshot - (indexRow - 1) * colCount;
    const newImgWidth = elWidth * colCount;
    const newImgHeight = elHeight * rowCount;
    const startY = (indexRow - 1) * elHeight;
    const startX = (indexCol - 1) * elWidth;
    return /* @__PURE__ */ jsx("div", {
      css: S$5.previewCardInner,
      style: {
        backgroundColor: "black",
        // 防止加载过程中闪屏
        backgroundImage: `url(${snapshotUrl})`,
        backgroundPosition: `-${startX}px -${startY}px`,
        backgroundSize: `${newImgWidth}px ${newImgHeight}px`
      },
      children: /* @__PURE__ */ jsx(SimplePregressBar, {
        progress
      })
    });
  });
  function SimplePregressBar({
    progress
  }) {
    return /* @__PURE__ */ jsx("div", {
      className: "track",
      style: {
        position: "absolute",
        bottom: 0,
        left: 0,
        backgroundColor: "#eee",
        width: "100%",
        height: 2
      },
      children: /* @__PURE__ */ jsx("div", {
        className: "bar",
        style: {
          backgroundColor: colorPrimaryValue,
          height: "100%",
          width: `${progress * 100}%`
        }
      })
    });
  }
  function calcIndex(arr2, t2) {
    let index = findIndex(arr2, t2);
    if (index !== -1) {
      return index;
    }
    if (t2 > arr2[arr2.length - 1]) {
      index = arr2.length - 1;
    }
  }
  function findIndex(arr2, target) {
    let l2 = 0;
    let r2 = arr2.length - 1;
    let possible = -1;
    while (l2 <= r2) {
      const mid = Math.floor((l2 + r2) / 2);
      const mv = arr2[mid];
      if (target === mv) {
        return mid;
      }
      if (mv < target) {
        l2 = mid + 1;
        possible = mid;
      } else {
        r2 = mid - 1;
      }
    }
    if (possible === -1) return -1;
    const v2 = arr2[possible];
    const v1 = arr2[possible + 1] ?? 0;
    if (v2 < target && target < v1) {
      return possible;
    } else {
      return -1;
    }
  }
  var render = function render2(props) {
    if (typeof props.children === "function") {
      return React__default.createElement(React__default.Fragment, null, props.children());
    }
    return React__default.createElement(React__default.Fragment, null, props.children || null);
  };
  var Case = function Case2(_ref4) {
    var _ref$children = _ref4.children, children = _ref$children === void 0 ? null : _ref$children;
    return render({
      children
    });
  };
  var Default = function Default2(_ref4) {
    var _ref$children = _ref4.children, children = _ref$children === void 0 ? null : _ref$children;
    return render({
      children
    });
  };
  var getConditionResult = function getConditionResult2(condition) {
    var conditionResult = Boolean(typeof condition === "function" ? condition() : condition);
    return conditionResult;
  };
  function isFunction(input) {
    return typeof input === "function";
  }
  var Switch = function Switch2(_ref4) {
    var _ref22, _matchingCase;
    var children = _ref4.children;
    var matchingCase = void 0;
    var defaultCase = void 0;
    if (isFunction(children)) {
      children = children();
    }
    React__default.Children.forEach(children, function(child) {
      if (!React__default.isValidElement(child)) {
        return;
      }
      if (!matchingCase && child.type === Case) {
        var condition = child.props.condition;
        var conditionResult = getConditionResult(condition);
        if (conditionResult) {
          matchingCase = child;
        }
      } else if (!defaultCase && child.type === Default) {
        defaultCase = child;
      }
    });
    return (_ref22 = (_matchingCase = matchingCase) != null ? _matchingCase : defaultCase) != null ? _ref22 : null;
  };
  const S$4 = {
    recommendReason: css`
    display: inline-block;
    cursor: default;
    color: var(--Or5);
    background-color: var(--Or1);
    border-radius: 4px;

    font-size: var(--follow-icon-font-size);
    line-height: var(--follow-icon-line-height);
    height: var(--follow-icon-line-height);

    width: max-content;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    padding-block: 0;
    padding-inline: 2px;
    /* margin-left: -4px; */
  `,
    appBadge: css`
    color: #fa6a9d;
    border-radius: 2px;
    border: 1px #fa6a9d solid;
    line-height: 20px;
    padding: 0 10px;
    transform: scale(0.8);
    transform-origin: center left;
  `
  };
  const descOwnerCss = css`
  font-size: var(--subtitle-font-size);
  line-height: var(--subtitle-line-height);
  color: var(--text3);

  a&:visited {
    color: var(--text3);
  }

  display: inline-flex;
  width: max-content;
  max-width: 100%;

  align-items: center;
  justify-content: flex-start;
`;
  css`
  line-height: var(--subtitle-line-height);
`;
  function VideoCardBottom({
    item,
    cardData,
    handleVideoLinkClick
  }) {
    const {
      styleUseCardBorder
    } = useSettingsSnapshot();
    const {
      // video
      goto,
      href,
      title,
      titleRender,
      pubdateDisplay,
      pubdateDisplayForTitleAttr,
      recommendReason,
      // author
      authorName,
      authorFace,
      authorMid,
      // adpater specific
      appBadge,
      appBadgeDesc,
      rankingDesc,
      liveDesc
    } = cardData;
    const isNormalVideo = goto === "av";
    const authorHref = authorMid ? `https://space.bilibili.com/${authorMid}` : href;
    const streaming = item.api === EApiType.Live && item.live_status === ELiveStatus.Streaming;
    const avatarExtraCss = [css`
      ${flexCenterStyle}
      padding: 1px;
      border: 1px solid transparent;
      border-radius: 50%;
      position: relative;
    `, streaming && css`
        border-color: ${colorPrimaryValue};
      `];
    let descTitleAttr;
    if (isNormalVideo) {
      if (authorName || pubdateDisplay || pubdateDisplayForTitleAttr) {
        descTitleAttr = [
          //
          authorName,
          pubdateDisplayForTitleAttr || pubdateDisplay
        ].filter(Boolean).join(" · ");
      }
    }
    let hideAvatar = false;
    return /* @__PURE__ */ jsxs("div", {
      css: css`
        margin-top: 15px;
        margin-bottom: ${styleUseCardBorder ? 10 : 5}px;
        padding-inline: 5px;
        display: flex;
        column-gap: 5px;
        overflow: hidden;
      `,
      children: [!!authorMid && !hideAvatar && /* @__PURE__ */ jsx("a", {
        href: authorHref,
        target: "_blank",
        children: /* @__PURE__ */ jsxs("span", {
          css: avatarExtraCss,
          children: [authorFace ? /* @__PURE__ */ jsx(antd.Avatar, {
            src: getAvatarSrc(authorFace)
          }) : /* @__PURE__ */ jsx(antd.Avatar, {
            children: (authorName == null ? void 0 : authorName[0]) || (appBadgeDesc == null ? void 0 : appBadgeDesc[0]) || ""
          }), streaming && /* @__PURE__ */ jsx(LiveIcon, {
            ...size(12),
            active: true,
            css: css`
                  position: absolute;
                  bottom: 0;
                  right: 0;
                  background-color: ${colorPrimaryValue};
                  border-radius: 50%;
                `
          })]
        })
      }), /* @__PURE__ */ jsxs("div", {
        css: css`
          /* as item */
          flex: 1;

          /* as container */
          display: flex;
          flex-direction: column;
          row-gap: 4px;

          margin-left: 5px; // Q: why not column-gap:10px. A: avatar my hide, margin-left is needed
        `,
        children: [/* @__PURE__ */ jsx("h3", {
          className: "bili-video-card__info--tit",
          title,
          css: css`
            text-indent: 0 !important;
            .bili-video-card &.bili-video-card__info--tit {
              padding-right: 0;
              height: auto;
              max-height: calc(2 * var(--title-line-height));
            }
          `,
          children: /* @__PURE__ */ jsx("a", {
            onClick: handleVideoLinkClick,
            href,
            target: "_blank",
            rel: "noopener",
            css: css`
              .bili-video-card .bili-video-card__info--tit > a& {
                font-family: inherit;
                font-weight: initial;
              }
            `,
            children: titleRender ?? title
          })
        }), renderDesc()]
      })]
    });
    function renderDesc() {
      if (isNormalVideo) {
        return /* @__PURE__ */ jsxs(Fragment, {
          children: [/* @__PURE__ */ jsxs("a", {
            className: "bili-video-card__info--owner",
            href: authorHref,
            target: "_blank",
            title: descTitleAttr,
            css: descOwnerCss,
            children: [/* @__PURE__ */ jsx("span", {
              className: "bili-video-card__info--author",
              children: authorName
            }), pubdateDisplay && /* @__PURE__ */ jsx("span", {
              className: "bili-video-card__info--date",
              children: DESC_SEPARATOR + pubdateDisplay
            })]
          }), !!recommendReason && /* @__PURE__ */ jsx("span", {
            css: S$4.recommendReason,
            children: recommendReason
          })]
        });
      }
      return /* @__PURE__ */ jsxs(Switch, {
        children: [/* @__PURE__ */ jsx(Case, {
          condition: appBadge || appBadgeDesc,
          children: /* @__PURE__ */ jsxs("a", {
            className: "bili-video-card__info--owner",
            css: descOwnerCss,
            href,
            target: "_blank",
            children: [!!appBadge && /* @__PURE__ */ jsx("span", {
              css: S$4.appBadge,
              children: appBadge
            }), !!appBadgeDesc && /* @__PURE__ */ jsx("span", {
              children: appBadgeDesc
            })]
          })
        }), /* @__PURE__ */ jsx(Case, {
          condition: isRanking(item) && rankingDesc,
          children: /* @__PURE__ */ jsx("div", {
            css: descOwnerCss,
            children: rankingDesc
          })
        }), /* @__PURE__ */ jsx(Case, {
          condition: isLive(item),
          children: /* @__PURE__ */ jsxs("a", {
            css: [descOwnerCss, css`
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 100%;
              `, "", ""],
            href: authorHref,
            target: "_blank",
            title: (authorName || "") + (liveDesc || ""),
            children: [authorName, liveDesc && /* @__PURE__ */ jsx("span", {
              css: [C.ml(4), "", ""],
              children: liveDesc
            })]
          })
        })]
      });
    }
  }
  const SkeletonCard = React__default.memo(function SkeletonCard2({
    loading
  }) {
    return /* @__PURE__ */ jsxs("div", {
      className: clsx("bili-video-card__skeleton", {
        hide: !loading,
        [styles.skeletonActive]: loading
      }),
      children: [/* @__PURE__ */ jsx("div", {
        className: "bili-video-card__skeleton--cover",
        style: {
          borderRadius: borderRadiusValue
        }
      }), /* @__PURE__ */ jsxs("div", {
        className: "bili-video-card__skeleton--info",
        css: css`
          padding-inline: 5px;
        `,
        children: [/* @__PURE__ */ jsx("div", {
          className: "bili-video-card__skeleton--avatar",
          css: css`
            width: 32px;
            height: 32px;
            border-radius: 50%;
          `
        }), /* @__PURE__ */ jsxs("div", {
          className: "bili-video-card__skeleton--right",
          css: css`
            flex: 1;
            margin-left: 10px;
          `,
          children: [/* @__PURE__ */ jsx("p", {
            className: "bili-video-card__skeleton--text"
          }), /* @__PURE__ */ jsx("p", {
            className: "bili-video-card__skeleton--text short"
          }), /* @__PURE__ */ jsx("p", {
            className: "bili-video-card__skeleton--light"
          }), /* @__PURE__ */ jsx("p", {
            className: "bili-video-card__skeleton--text tiny"
          })]
        })]
      })]
    });
  });
  const DislikedCard = React__default.memo(function DislikedCard2({
    item,
    cardData,
    dislikedReason,
    emitter: emitter2 = defaultEmitter
  }) {
    const onCancelDislike = useMemoizedFn(async () => {
      if (!(dislikedReason == null ? void 0 : dislikedReason.id)) return;
      let success = false;
      let err;
      try {
        success = await cancelDislike(item, dislikedReason.id);
      } catch (e2) {
        err = e2;
      }
      if (err) {
        console.error(err.stack || err);
        return toastRequestFail();
      }
      success ? AntdMessage.success("已撤销") : AntdMessage.error(OPERATION_FAIL_MSG);
      if (success) {
        delDislikeId(item.param);
      }
    });
    useMittOn(emitter2, "cancel-dislike", onCancelDislike);
    return /* @__PURE__ */ jsxs("div", {
      className: clsx(styles.dislikedWrapper),
      children: [/* @__PURE__ */ jsx("div", {
        className: styles.dislikeContentCover,
        children: /* @__PURE__ */ jsxs("div", {
          className: styles.dislikeContentCoverInner,
          children: [/* @__PURE__ */ jsx(IconPark, {
            name: "DistraughtFace",
            size: 32,
            className: styles.dislikeIcon
          }), /* @__PURE__ */ jsx("div", {
            className: styles.dislikeReason,
            children: dislikedReason == null ? void 0 : dislikedReason.name
          }), /* @__PURE__ */ jsx("div", {
            className: styles.dislikeDesc,
            children: (dislikedReason == null ? void 0 : dislikedReason.toast) || "将减少此类内容推荐"
          })]
        })
      }), /* @__PURE__ */ jsxs("div", {
        className: styles.dislikeContentAction,
        children: [/* @__PURE__ */ jsx(VideoCardBottom, {
          item,
          cardData
        }), /* @__PURE__ */ jsx("div", {
          className: styles.dislikeContentActionInner,
          children: /* @__PURE__ */ jsxs("button", {
            onClick: onCancelDislike,
            children: [/* @__PURE__ */ jsx(IconPark, {
              name: "Return",
              size: "16",
              style: {
                marginRight: 4,
                marginTop: -2
              }
            }), "撤销"]
          })
        })]
      })]
    });
  });
  const BlacklistCard = React__default.memo(function BlacklistCard2({
    cardData
  }) {
    const {
      authorMid,
      authorName
    } = cardData;
    const onCancel = useMemoizedFn(async () => {
      if (!authorMid) return;
      const success = await UserBlacklistService.remove(authorMid);
      if (success) AntdMessage.success(`已移出黑名单: ${authorName}`);
    });
    return /* @__PURE__ */ jsxs("div", {
      className: clsx(styles.dislikedWrapper),
      children: [/* @__PURE__ */ jsx("div", {
        className: styles.dislikeContentCover,
        children: /* @__PURE__ */ jsxs("div", {
          className: styles.dislikeContentCoverInner,
          children: [/* @__PURE__ */ jsx(IconPark, {
            name: "PeopleDelete",
            size: 32,
            className: styles.dislikeIcon
          }), /* @__PURE__ */ jsx("div", {
            className: styles.dislikeReason,
            children: "已拉黑"
          }), /* @__PURE__ */ jsxs("div", {
            className: styles.dislikeDesc,
            children: ["UP: ", authorName]
          })]
        })
      }), /* @__PURE__ */ jsx("div", {
        className: styles.dislikeContentAction,
        children: /* @__PURE__ */ jsx("div", {
          className: styles.dislikeContentActionInner,
          children: /* @__PURE__ */ jsxs("button", {
            onClick: onCancel,
            children: [/* @__PURE__ */ jsx(IconPark, {
              name: "Return",
              size: "16",
              style: {
                marginRight: 4,
                marginTop: -2
              }
            }), "撤销"]
          })
        })
      })]
    });
  });
  const debug$6 = baseDebug.extend("VideoCard:filter");
  function getFollowedStatus(recommendReason) {
    return !!recommendReason && ["已关注", "新关注"].includes(recommendReason);
  }
  function anyFilterEnabled(tab2) {
    if (tab2 === ETab.KeepFollowOnly) {
      return true;
    }
    if (shouldEnableCommonChecks(tab2)) {
      if (blacklistMids.size || settings.filterEnabled && (settings.filterByAuthorNameEnabled && settings.filterByAuthorNameKeywords.length > 0 || settings.filterByTitleEnabled && settings.filterByTitleKeywords.length > 0)) {
        return true;
      }
    }
    if (tab2 === ETab.RecommendApp || tab2 === ETab.RecommendPc) {
      if (settings.filterEnabled && (settings.filterMinDurationEnabled || settings.filterMinPlayCountEnabled || settings.filterOutGotoTypePicture)) {
        return true;
      }
    }
    if (tab2 === ETab.DynamicFeed && dynamicFeedFilterStore.hasSelectedUp && settings.hideChargeOnlyDynamicFeedVideos) {
      return true;
    }
    return false;
  }
  function shouldEnableCommonChecks(tab2) {
    return [ETab.RecommendApp, ETab.RecommendPc, ETab.Hot].includes(tab2);
  }
  function filterRecItems(items, tab2) {
    if (!anyFilterEnabled(tab2)) {
      return items;
    }
    const settings2 = snapshot(settings);
    const blockUpMids = /* @__PURE__ */ new Set();
    const blockUpNames = /* @__PURE__ */ new Set();
    const regMidWithRemark = /^(?<mid>\d+)\([\S ]+\)$/;
    const regMid = /^\d+$/;
    settings2.filterByAuthorNameKeywords.forEach((x2) => {
      var _a2, _b2;
      if (regMidWithRemark.test(x2)) {
        const mid = (_b2 = (_a2 = regMidWithRemark.exec(x2)) == null ? void 0 : _a2.groups) == null ? void 0 : _b2.mid;
        if (mid) blockUpMids.add(mid);
      } else if (regMid.test(x2)) {
        blockUpMids.add(x2);
      } else {
        blockUpNames.add(x2);
      }
    });
    const titleRegexList = [];
    const titleKeywordList = [];
    settings2.filterByTitleKeywords.forEach((keyword) => {
      if (keyword.startsWith("/") && keyword.endsWith("/")) {
        const regex = new RegExp(keyword.slice(1, -1), "i");
        titleRegexList.push(regex);
      } else {
        titleKeywordList.push(keyword);
      }
    });
    return items.filter((item) => {
      if (item.api === EApiType.Separator) return true;
      const {
        play,
        duration: duration2,
        recommendReason,
        goto,
        authorName,
        authorMid,
        title,
        bvid,
        href
      } = normalizeCardData(item);
      const followed = getFollowedStatus(recommendReason);
      if (tab2 === "keep-follow-only") {
        if (!followed) return false;
      }
      function commonChecks() {
        if (authorMid && blacklistMids.size) {
          if (blacklistMids.has(authorMid)) {
            debug$6("filter out by blacklist-rule: %s %o", authorMid, {
              bvid,
              title
            });
            return false;
          }
        }
        if (settings2.filterEnabled && settings2.filterByAuthorNameEnabled && (blockUpMids.size || blockUpNames.size) && (authorName || authorMid)) {
          if (authorName && blockUpNames.has(authorName) || authorMid && blockUpMids.has(authorMid)) {
            debug$6("filter out by author-rule: %o", {
              authorName,
              authorMid,
              rules: settings2.filterByAuthorNameKeywords,
              blockUpMids,
              blockUpNames,
              bvid,
              title
            });
            return false;
          }
        }
        let possibleTitles = [title];
        if (item.api === EApiType.Ranking && isNormalRankingItem(item) && item.desc) {
          possibleTitles.push(item.desc);
        }
        possibleTitles = possibleTitles.filter(Boolean);
        if (settings2.filterEnabled && settings2.filterByTitleEnabled && settings2.filterByTitleKeywords.length && possibleTitles.length) {
          const titleHit = (title2) => titleKeywordList.some((keyword) => title2.includes(keyword)) || titleRegexList.some((regex) => regex.test(title2));
          if (possibleTitles.some(titleHit)) {
            debug$6("filter out by title-rule: %o", {
              possibleTitles,
              rules: settings2.filterByTitleKeywords,
              bvid
            });
            return false;
          }
        }
      }
      if (shouldEnableCommonChecks(tab2)) {
        if (commonChecks() === false) {
          return false;
        }
      }
      if (tab2 === ETab.DynamicFeed && dynamicFeedFilterStore.hasSelectedUp && settings2.hideChargeOnlyDynamicFeedVideos) {
        if (recommendReason === CHARGE_ONLY_TEXT) {
          debug$6("filter out by dynamic-feed:hide-charge-only-rule: %s %o", recommendReason, {
            bvid,
            title
          });
          return false;
        }
      }
      if (tab2 === ETab.RecommendApp || tab2 === ETab.RecommendPc) {
        if (settings2.filterEnabled) {
          const isVideo = goto === "av";
          const isPicture = goto === "picture";
          const isBangumi = goto === "bangumi";
          if (isVideo) return filterVideo();
          if (isPicture) return filterPicture();
          if (isBangumi) return filterBangumi();
        }
      }
      return true;
      function filterVideo() {
        if (followed && settings2.exemptForFollowedVideo) return true;
        if (recommendReason === "关注了你") {
          debug$6("filter out by recommendReason-rule: %s %o", recommendReason, {
            bvid,
            title
          });
          return false;
        }
        if (settings2.filterMinPlayCountEnabled && settings2.filterMinPlayCount && typeof play === "number" && play < settings2.filterMinPlayCount) {
          debug$6("filter out by min-play-count-rule: %s < %s, %o", play, settings2.filterMinPlayCount, {
            bvid,
            title
          });
          return false;
        }
        if (settings2.filterMinDurationEnabled && settings2.filterMinDuration && duration2 && duration2 < settings2.filterMinDuration) {
          debug$6("filter out by min-duration-rule: %s < %s %o", duration2, settings2.filterMinDuration, {
            bvid,
            title
          });
          return false;
        }
        return true;
      }
      function filterPicture() {
        if (settings2.filterOutGotoTypePicture) {
          if (followed && settings2.exemptForFollowedPicture) {
            return true;
          }
          debug$6("filter out by goto-type-picture-rule: %s %o", goto, {
            bvid,
            title
          });
          return false;
        } else {
          return true;
        }
      }
      function filterBangumi() {
        if (settings2.filterOutGotoTypeBangumi) {
          debug$6("filter out by goto-type-bangumi-rule: %s %o", goto, {
            title,
            href
          });
          return false;
        }
        return true;
      }
    });
  }
  const dislikeIcon = /* @__PURE__ */ jsx(DislikeIcon, {
    ...size(16)
  });
  function useDislikeRelated({
    item,
    authed,
    actionButtonVisible
  }) {
    var _a2, _b2;
    const hasDislikeEntry = isApp(item) && !!((_b2 = (_a2 = item.three_point) == null ? void 0 : _a2.dislike_reasons) == null ? void 0 : _b2.length);
    const onTriggerDislike = useMemoizedFn((e2) => {
      e2 == null ? void 0 : e2.preventDefault();
      e2 == null ? void 0 : e2.stopPropagation();
      if (!hasDislikeEntry) {
        if (item.api !== "app") {
          return AntdMessage.error("当前视频不支持提交「我不想看」");
        }
        return;
      }
      if (!authed) {
        return toast("请先获取 access_key ~");
      }
      showModalDislike(item);
    });
    const dislikeButtonEl = hasDislikeEntry && /* @__PURE__ */ jsx(VideoCardActionButton, {
      visible: actionButtonVisible,
      inlinePosition: "left",
      icon: dislikeIcon,
      tooltip: "我不想看",
      onClick: onTriggerDislike
    });
    return {
      dislikeButtonEl,
      hasDislikeEntry,
      onTriggerDislike
    };
  }
  const videoDetailCacheDB = localforage.createInstance({
    name: APP_NAME,
    storeName: "video_detail",
    driver: localforage.INDEXEDDB
  });
  async function getVideoDetail(bvid) {
    const db = videoDetailCacheDB;
    const cacheKey2 = bvid;
    {
      const data22 = await db.getItem(cacheKey2);
      if (data22) return data22;
    }
    const res = await request.get("/x/web-interface/view", {
      params: {
        bvid
      }
    });
    const json = res.data;
    const data2 = json.data;
    await db.setItem(cacheKey2, data2);
    return data2;
  }
  const radixIconsCross2 = (props) => /* @__PURE__ */ jsx("svg", {
    viewBox: "0 0 15 15",
    width: "1.2em",
    height: "1.2em",
    ...props,
    children: /* @__PURE__ */ jsx("path", {
      fill: "currentColor",
      fillRule: "evenodd",
      d: "M11.782 4.032a.575.575 0 1 0-.813-.814L7.5 6.687L4.032 3.218a.575.575 0 0 0-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 0 0 .814.814L7.5 8.313l3.469 3.469a.575.575 0 0 0 .813-.814L8.313 7.5z",
      clipRule: "evenodd"
    })
  });
  const radixIconsLockClosed = (props) => /* @__PURE__ */ jsx("svg", {
    viewBox: "0 0 15 15",
    width: "1.2em",
    height: "1.2em",
    ...props,
    children: /* @__PURE__ */ jsx("path", {
      fill: "currentColor",
      fillRule: "evenodd",
      d: "M5 4.636c0-.876.242-1.53.643-1.962c.396-.427 1.003-.696 1.858-.696s1.462.269 1.857.694c.4.431.642 1.085.642 1.961V6H5zM4 6V4.636c0-1.055.293-1.978.91-2.643c.623-.67 1.517-1.015 2.591-1.015s1.969.344 2.59 1.014c.617.664.909 1.587.909 2.641V6h1a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zM3 7h9v6H3z",
      clipRule: "evenodd"
    })
  });
  const radixIconsLockOpen1 = (props) => /* @__PURE__ */ jsx("svg", {
    viewBox: "0 0 15 15",
    width: "1.2em",
    height: "1.2em",
    ...props,
    children: /* @__PURE__ */ jsx("path", {
      fill: "currentColor",
      fillRule: "evenodd",
      d: "M7.499 0C6.326 0 5.36.39 4.738 1.194C4.238 1.839 4 2.682 4 3.634h1c0-.79.197-1.4.528-1.828c.388-.5 1.024-.806 1.97-.806c.859 0 1.465.265 1.86.686c.4.426.642 1.074.642 1.95V6H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1V3.636c0-1.055-.293-1.974-.912-2.634C9.465.338 8.57 0 7.498 0M3 7h9v6H3z",
      clipRule: "evenodd"
    })
  });
  const radixIconsOpenInNewWindow = (props) => /* @__PURE__ */ jsx("svg", {
    viewBox: "0 0 15 15",
    width: "1.2em",
    height: "1.2em",
    ...props,
    children: /* @__PURE__ */ jsx("path", {
      fill: "currentColor",
      fillRule: "evenodd",
      d: "M12 13a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v3.5a.5.5 0 0 0 1 0V3h9v9H8.5a.5.5 0 0 0 0 1zM9 6.5v3a.5.5 0 0 1-1 0V7.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 7H5.5a.5.5 0 0 1 0-1h3a.5.5 0 0 1 .5.497",
      clipRule: "evenodd"
    })
  });
  function renderInPipWindow(newHref, pipWindow) {
    const cssInsertContainer = pipWindow.document.head;
    const {
      cache: cache2
    } = createEmotion({
      key: "pip-window",
      container: cssInsertContainer
    });
    const container = document.createElement("div");
    container.classList.add(APP_CLS_ROOT);
    pipWindow.document.body.appendChild(container);
    const root2 = createRoot(container);
    root2.render(/* @__PURE__ */ jsx(AntdApp, {
      emotionCache: cache2,
      styleProviderProps: {
        container: cssInsertContainer
      },
      injectGlobalStyle: true,
      children: /* @__PURE__ */ jsx(antd.App, {
        component: false,
        message: {
          getContainer: () => pipWindow.document.body
        },
        children: /* @__PURE__ */ jsx(PipWindowContent, {
          newHref,
          pipWindow
        })
      })
    }));
  }
  function PipWindowContent({
    newHref,
    pipWindow
  }) {
    const focusOnce = React__default.useMemo(() => {
      return lodash.once(() => {
        window.focus();
      });
    }, []);
    useKeyPress(["leftarrow", "rightarrow", "uparrow", "downawrrow", "esc", "tab"], (e2) => {
      focusOnce();
    }, {
      exactMatch: true,
      target: pipWindow.document.documentElement
    });
    const hovering = useHover(pipWindow.document.documentElement);
    const [locked, setLocked] = React__default.useState(() => {
      if (isEdge) {
        return false;
      }
      return true;
    });
    return /* @__PURE__ */ jsxs(Fragment, {
      children: [/* @__PURE__ */ jsx(Global, {
        styles: [css`
            * {
              box-sizing: border-box;
            }
            body,
            iframe {
              margin: 0;
              padding: 0;
            }
          `, "", ""]
      }), /* @__PURE__ */ jsx("iframe", {
        src: newHref,
        css: css`
          width: 100%;
          height: 100%;
          border: none;
        `
      }), /* @__PURE__ */ jsx(LockOverlay, {
        locked
      }), /* @__PURE__ */ jsxs("div", {
        css: css`
          position: fixed;
          z-index: 9999;
          right: 10px;
          top: 10px;
          display: ${hovering ? "flex" : "none"};
          column-gap: 6px;
          flex-direction: row-reverse;
        `,
        children: [isEdge && /* @__PURE__ */ jsx(CloseButton, {
          pipWindow
        }), /* @__PURE__ */ jsx(CloseThenOpenButton, {
          pipWindow,
          newHref
        }), /* @__PURE__ */ jsx(LockButton, {
          locked,
          setLocked
        })]
      })]
    });
  }
  const S$3 = {
    button: css`
    /* border: 1px solid ${colorPrimaryValue}; */
    svg {
      width: 14px;
      height: 14px;
    }
  `
  };
  function LockOverlay({
    locked
  }) {
    const {
      message: message2
    } = antd.App.useApp();
    const onOverlayClick = useLessFrequentFn(() => {
      message2.info("请先点击右上角 🔓解锁按钮 解锁");
    }, 3);
    return locked && /* @__PURE__ */ jsx("div", {
      className: "locked-overlay",
      css: css`
          position: fixed;
          inset: 0;
          z-index: 9999;
          background-color: transparent;
          user-select: none;
        `,
      onClick: onOverlayClick
    });
  }
  function CloseThenOpenButton({
    newHref,
    pipWindow
  }) {
    const onClick = () => {
      pipWindow.close();
      const u = new URL(newHref);
      u.searchParams.delete(PLAYER_SCREEN_MODE);
      GM.openInTab(u.href, {
        active: true
      });
    };
    return /* @__PURE__ */ jsx(VideoCardActionButton, {
      inlinePosition: "right",
      icon: /* @__PURE__ */ jsx(radixIconsOpenInNewWindow, {}),
      tooltip: "新窗口打开",
      onClick,
      css: S$3.button
    });
  }
  function CloseButton({
    pipWindow
  }) {
    return /* @__PURE__ */ jsx(VideoCardActionButton, {
      inlinePosition: "right",
      icon: /* @__PURE__ */ jsx(radixIconsCross2, {}),
      tooltip: "关闭",
      css: S$3.button,
      onClick: () => {
        pipWindow.close();
      }
    });
  }
  function LockButton({
    locked,
    setLocked
  }) {
    return /* @__PURE__ */ jsx(VideoCardActionButton, {
      inlinePosition: "right",
      icon: locked ? /* @__PURE__ */ jsx(radixIconsLockClosed, {}) : /* @__PURE__ */ jsx(radixIconsLockOpen1, {}),
      tooltip: locked ? "解锁" : "锁定",
      css: S$3.button,
      onClick: (e2) => {
        setLocked((x2) => !x2);
      }
    });
  }
  const debug$5 = baseDebug.extend("VideoCard:useOpenRelated");
  function useOpenRelated({
    href,
    item,
    cardData,
    actionButtonVisible,
    previewImageRef
  }) {
    const {
      videoLinkOpenMode
    } = useSettingsSnapshot();
    function getHref(action2) {
      const u = new URL(href, location.href);
      action2 == null ? void 0 : action2(u);
      const newHref = u.href;
      return newHref;
    }
    const handleVideoLinkClick = useMemoizedFn((e2) => {
      e2.stopPropagation();
      e2.preventDefault();
      onOpenWithMode();
    });
    const onOpenWithMode = useMemoizedFn((mode) => {
      var _a2;
      mode || (mode = settings.videoLinkOpenMode);
      const newHref = getHref((u) => {
        var _a3;
        if (mode === VideoLinkOpenMode.Popup || mode === VideoLinkOpenMode.NormalWebFullscreen) {
          u.searchParams.set(PLAYER_SCREEN_MODE, PlayerScreenMode.WebFullscreen);
        }
        if (settings.startPlayFromPreviewPoint) {
          const t2 = (_a3 = previewImageRef.current) == null ? void 0 : _a3.getT();
          if (t2) {
            u.searchParams.set("t", t2.toString());
          }
        }
      });
      const handleCommon = () => {
        const active = mode !== VideoLinkOpenMode.Background;
        GM.openInTab(newHref, {
          insert: true,
          active
        });
      };
      const handlers = {
        [VideoLinkOpenMode.Normal]: handleCommon,
        [VideoLinkOpenMode.Background]: handleCommon,
        [VideoLinkOpenMode.NormalWebFullscreen]: handleCommon,
        [VideoLinkOpenMode.Popup]: () => handlePopup(newHref),
        [VideoLinkOpenMode.Iina]: handleIINA
      };
      (_a2 = handlers[mode]) == null ? void 0 : _a2.call(handlers);
    });
    function handlePopup(newHref) {
      var _a2;
      let videoWidth;
      let videoHeight;
      if (item.api === EApiType.App && ((_a2 = item.uri) == null ? void 0 : _a2.startsWith("bilibili://"))) {
        const searchParams2 = new URL(item.uri).searchParams;
        const playerWidth = Number(searchParams2.get("player_width") || 0);
        const playerHeight = Number(searchParams2.get("player_height") || 0);
        if (playerWidth && playerHeight && !isNaN(playerWidth) && !isNaN(playerHeight)) {
          videoWidth = playerWidth;
          videoHeight = playerHeight;
        }
      }
      if (item.api === EApiType.Ranking && isNormalRankingItem(item)) {
        const w2 = item.dimension.width;
        const h2 = item.dimension.height;
        if (w2 && h2 && !isNaN(w2) && !isNaN(h2)) {
          videoWidth = w2;
          videoHeight = h2;
        }
      }
      return openInPipOrPopup(newHref, cardData.bvid, videoWidth, videoHeight);
    }
    function handleIINA() {
      let usingHref = href;
      if (item.api === EApiType.Watchlater) usingHref = `/video/${item.bvid}`;
      const fullHref = new URL(usingHref, location.href).href;
      const iinaUrl = `iina://open?url=${encodeURIComponent(fullHref)}`;
      window.open(iinaUrl, "_self");
    }
    const consistentOpenMenus = React__default.useMemo(() => {
      return Object.values(VideoLinkOpenMode).filter((mode) => typeof VideoLinkOpenModeConfig[mode].enabled === "undefined").map((mode) => {
        return {
          key: VideoLinkOpenModeKey[mode],
          label: VideoLinkOpenModeConfig[mode].label,
          icon: VideoLinkOpenModeConfig[mode].icon,
          onClick: () => onOpenWithMode(mode)
        };
      });
    }, []);
    const conditionalOpenMenus = React__default.useMemo(() => {
      return Object.values(VideoLinkOpenMode).filter((mode) => typeof VideoLinkOpenModeConfig[mode].enabled === "boolean" && VideoLinkOpenModeConfig[mode].enabled).length ? Object.values(VideoLinkOpenMode).filter((mode) => typeof VideoLinkOpenModeConfig[mode].enabled === "boolean" && VideoLinkOpenModeConfig[mode].enabled).map((mode) => {
        return {
          key: VideoLinkOpenModeKey[mode],
          label: VideoLinkOpenModeConfig[mode].label,
          icon: VideoLinkOpenModeConfig[mode].icon,
          onClick: () => onOpenWithMode(mode)
        };
      }) : [];
    }, []);
    const openInPopupButtonEl = React__default.useMemo(() => {
      if (videoLinkOpenMode === VideoLinkOpenMode.Popup) return;
      if (item.api === EApiType.Live) return;
      if (!hasDocumentPictureInPicture) return;
      return /* @__PURE__ */ jsx(VideoCardActionButton, {
        visible: actionButtonVisible,
        inlinePosition: "right",
        icon: VideoLinkOpenModeConfig.Popup.icon,
        tooltip: VideoLinkOpenModeConfig.Popup.label,
        onClick: (e2) => {
          e2.preventDefault();
          e2.stopPropagation();
          onOpenWithMode(VideoLinkOpenMode.Popup);
        }
      });
    }, [videoLinkOpenMode, actionButtonVisible]);
    const onOpenInPopup = useMemoizedFn(() => {
      onOpenWithMode(VideoLinkOpenMode.Popup);
    });
    return {
      onOpenWithMode,
      handleVideoLinkClick,
      consistentOpenMenus,
      conditionalOpenMenus,
      openInPopupButtonEl,
      onOpenInPopup
    };
  }
  const hasDocumentPictureInPicture = !!((_e = window.documentPictureInPicture) == null ? void 0 : _e.requestWindow);
  async function openInPipOrPopup(newHref, bvid, videoWidth, videoHeight) {
    var _a2;
    let popupWidth = 1e3;
    let popupHeight = Math.ceil(popupWidth / 16 * 9);
    const MAX_API_WAIT = 200;
    if ((!videoWidth || !videoHeight) && bvid) {
      const detail = await Promise.race([getVideoDetail(bvid), delay(MAX_API_WAIT)]);
      if (detail) {
        videoWidth = detail.dimension.width;
        videoHeight = detail.dimension.height;
      }
    }
    if (videoWidth && videoHeight && videoWidth < videoHeight) {
      const maxHeight = Math.min(Math.floor(window.screen.availHeight * 0.8), 1e3);
      const maxWidth = Math.floor(maxHeight / videoHeight * videoWidth);
      popupWidth = Math.min(720, maxWidth);
      popupHeight = Math.floor(popupWidth / videoWidth * videoHeight);
    }
    debug$5("openInPipOrPopup newHref=%s size=%sx%s", newHref, popupWidth, popupHeight);
    let pipWindow;
    if (hasDocumentPictureInPicture) {
      try {
        pipWindow = await ((_a2 = window.documentPictureInPicture) == null ? void 0 : _a2.requestWindow({
          width: popupWidth,
          height: popupHeight,
          disallowReturnToOpener: true
        }));
      } catch (e2) {
      }
    }
    if (pipWindow) {
      renderInPipWindow(newHref, pipWindow);
    } else {
      openPopupWindow(newHref, popupWidth, popupHeight);
    }
  }
  function openPopupWindow(newHref, popupWidth, popupHeight) {
    const left = (window.innerWidth - popupWidth) / 2;
    const top = (window.innerHeight - popupHeight) / 2 - 50;
    const features = ["popup=true", `width=${popupWidth}`, `height=${popupHeight}`, `left=${left}`, `top=${top}`].join(",");
    debug$5("openInPopup: features -> %s", features);
    window.open(newHref, "_blank", features);
  }
  const DEBUG_ANIMATION = false;
  function usePreviewAnimation({
    uniqId,
    emitter: emitter2,
    title,
    active,
    videoDuration,
    tryFetchVideoData,
    videoDataBox,
    autoPreviewWhenHover,
    videoPreviewWrapperRef
  }) {
    const hasVideoData = useMemoizedFn(() => {
      var _a2, _b2, _c2;
      const data2 = (_a2 = videoDataBox.val) == null ? void 0 : _a2.videoshotJson.data;
      return Boolean(((_b2 = data2 == null ? void 0 : data2.index) == null ? void 0 : _b2.length) && ((_c2 = data2 == null ? void 0 : data2.image) == null ? void 0 : _c2.length));
    });
    const [autoPreviewing, setAutoPreviewing] = React__default.useState(false);
    const [previewProgress, setPreviewProgress] = useRafState();
    const [previewT, setPreviewT] = useRafState();
    const getProgress = useMemoizedFn(() => previewProgress || 0);
    const [mouseMoved, setMouseMoved] = React__default.useState(false);
    const isHoveringBox = useRefStateBox(false);
    const isHoveringAfterDelayBox = useRefStateBox(false);
    const startByHoverBox = useRefBox(false);
    const [mouseEnterRelativeX, setMouseEnterRelativeX] = React__default.useState(void 0);
    const updateMouseEnterRelativeX = (e2) => {
      var _a2;
      const rect = (_a2 = videoPreviewWrapperRef.current) == null ? void 0 : _a2.getBoundingClientRect();
      if (!rect) return;
      const {
        x: x2
      } = rect;
      const relativeX = e2.pageX - window.pageXOffset - x2;
      setMouseEnterRelativeX(relativeX);
    };
    useEventListener("mouseenter", async (e2) => {
      emitter2.emit("mouseenter", uniqId);
      isHoveringBox.set(true);
      updateMouseEnterRelativeX(e2);
      const p2 = tryFetchVideoData();
      const HOVER_DELAY = 800;
      let delayPromise;
      if (settings.useDelayForHover) {
        delayPromise = delay(HOVER_DELAY);
      }
      await Promise.all([p2, delayPromise].filter(Boolean));
      if (!isHoveringBox.val) return;
      isHoveringAfterDelayBox.set(true);
      if (autoPreviewWhenHover && !idBox.val && hasVideoData()) {
        onStartPreviewAnimation(true);
      }
    }, {
      target: videoPreviewWrapperRef
    });
    const _mouseleaveAction = useMemoizedFn(() => {
      isHoveringBox.set(false);
      isHoveringAfterDelayBox.set(false);
    });
    useEventListener("mouseleave", _mouseleaveAction, {
      target: videoPreviewWrapperRef
    });
    useMittOn(emitter2, "mouseenter-other-card", (srcUniqId) => {
      if (srcUniqId === uniqId) return;
      _mouseleaveAction();
    });
    useEventListener("mousemove", (e2) => {
      setMouseMoved(true);
      if (isHoveringBox.val && !isHoveringAfterDelayBox.val) {
        updateMouseEnterRelativeX(e2);
      }
      if (!autoPreviewWhenHover) {
        animationController.stop();
      }
    }, {
      target: videoPreviewWrapperRef
    });
    const idBox = useRefBox(void 0);
    const animationController = useAnimationController({
      startByHoverBox,
      isHoveringBox,
      active,
      mouseMoved,
      idBox,
      autoPreviewWhenHover,
      setAutoPreviewing,
      setPreviewT,
      setPreviewProgress
    });
    const onHotkeyPreviewAnimation = useMemoizedFn(async () => {
      if (!idBox.val) {
        await tryFetchVideoData();
        if (hasVideoData()) {
          onStartPreviewAnimation(false);
        }
        return;
      }
      animationController.togglePaused();
    });
    const onStartPreviewAnimation = useMemoizedFn((startByHover) => {
      startByHoverBox.set(startByHover);
      setMouseMoved(false);
      animationController.reset();
      animationController.stop(true);
      setAutoPreviewing(true);
      setPreviewProgress((val) => typeof val === "undefined" ? 0 : val);
      setPreviewT(void 0);
      const runDuration = 8e3;
      {
        if (videoDataBox.val) ;
      }
      const getInterval = () => {
        return settings.autoPreviewUpdateInterval;
      };
      let start = performance.now();
      let tUpdateAt = 0;
      animationController.resumeImplRef.current = () => {
        start = performance.now() - getProgress() * runDuration;
      };
      function frame(t2) {
        if (animationController.shouldStop()) {
          animationController.stop();
          return;
        }
        if (!animationController.paused) {
          const now = performance.now();
          const elapsed = now - start;
          const p2 = minmax(elapsed % runDuration / runDuration, 0, 1);
          if (settings.autoPreviewUseContinuousProgress) {
            setPreviewProgress(p2);
          }
          if (!tUpdateAt || now - tUpdateAt >= getInterval()) {
            setPreviewProgress(p2);
            tUpdateAt = now;
            if (videoDuration) {
              const t22 = minmax(Math.round(p2 * videoDuration), 0, videoDuration);
              setPreviewT(t22);
            }
          }
        }
        idBox.val = requestAnimationFrame(frame);
      }
      idBox.val = requestAnimationFrame(frame);
    });
    return {
      onHotkeyPreviewAnimation,
      onStartPreviewAnimation,
      autoPreviewing,
      previewProgress,
      previewT,
      isHovering: isHoveringBox.state,
      isHoveringAfterDelay: isHoveringAfterDelayBox.state,
      mouseEnterRelativeX
    };
  }
  function useAnimationController({
    startByHoverBox,
    isHoveringBox,
    idBox,
    active,
    mouseMoved,
    autoPreviewWhenHover,
    setAutoPreviewing,
    setPreviewT,
    setPreviewProgress
  }) {
    const unmounted = useUnmountedRef();
    const shouldStop = useMemoizedFn(() => {
      if (unmounted.current) return true;
      if (startByHoverBox.val) {
        if (!isHoveringBox.val) return true;
      } else {
        if (!active) return true;
        if (mouseMoved) return true;
      }
      return false;
    });
    const stop = useMemoizedFn((isClear = false) => {
      if (!isClear && DEBUG_ANIMATION) {
        console.log(`[${APP_NAME}]: [animation] stopAnimation: %o`, {
          autoPreviewWhenHover,
          unmounted: unmounted.current,
          isHovering: isHoveringBox.val,
          active,
          mouseMoved
        });
      }
      if (idBox.val) cancelAnimationFrame(idBox.val);
      idBox.val = void 0;
      setAutoPreviewing(false);
      setPreviewProgress(void 0);
      setPreviewT(void 0);
      animationController.reset();
    });
    const resumeImplRef = React__default.useRef();
    const pausedBox = useRefStateBox(false);
    const animationController = {
      shouldStop,
      stop,
      get paused() {
        return pausedBox.val;
      },
      set paused(val) {
        pausedBox.val = val;
      },
      togglePaused() {
        var _a2;
        const prev2 = this.paused;
        this.paused = !this.paused;
        if (prev2) {
          (_a2 = resumeImplRef.current) == null ? void 0 : _a2.call(resumeImplRef);
        }
      },
      reset() {
        this.paused = false;
      },
      resumeImplRef
    };
    return animationController;
  }
  function IconAnimatedChecked({
    size: size2 = 18,
    useAnimation = false,
    ...restProps
  }) {
    return /* @__PURE__ */ jsx("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      width: size2,
      height: size2,
      ...restProps,
      children: /* @__PURE__ */ jsx(framerMotion.motion.path, {
        fill: "transparent",
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "M5 11L11 17L21 7",
        ...useAnimation ? {
          initial: {
            pathLength: 0
          },
          animate: {
            pathLength: 1
          },
          transition: {
            duration: 0.2,
            ease: "easeInOut"
          }
        } : void 0
      })
    });
  }
  function useWatchlaterRelated({
    item,
    cardData,
    onRemoveCurrent,
    actionButtonVisible,
    watchLaterAdded
  }) {
    const {
      avid,
      bvid
    } = cardData;
    const hasWatchLaterEntry = (() => {
      if (item.api === EApiType.App) {
        return item.goto === "av";
      }
      if (item.api === EApiType.Ranking) {
        return cardData.goto === "av";
      }
      if (item.api === EApiType.Live) {
        return false;
      }
      return true;
    })();
    const watchLaterAddedPrevious = usePrevious$1(watchLaterAdded);
    const _requesting = React__default.useRef(false);
    const onToggleWatchLater = useMemoizedFn(async (e2, usingAction) => {
      e2 == null ? void 0 : e2.preventDefault();
      e2 == null ? void 0 : e2.stopPropagation();
      if (!avid || !bvid) {
        return {
          success: false
        };
      }
      usingAction ?? (usingAction = watchLaterAdded ? watchLaterDel : watchLaterAdd);
      if (usingAction !== watchLaterAdd && usingAction !== watchLaterDel) {
        throw new Error("unexpected usingAction provided");
      }
      if (_requesting.current) return {
        success: false
      };
      _requesting.current = true;
      let success = false;
      try {
        success = await usingAction(avid);
      } finally {
        _requesting.current = false;
      }
      const targetState = usingAction === watchLaterAdd ? true : false;
      if (success) {
        if (targetState) {
          watchLaterState.bvidSet.add(bvid);
        } else {
          watchLaterState.bvidSet.delete(bvid);
        }
        if (item.api === EApiType.Watchlater) {
          if (!targetState) {
            await delay(100);
            onRemoveCurrent == null ? void 0 : onRemoveCurrent(item, cardData);
          }
        } else {
          AntdMessage.success(`已${targetState ? "添加" : "移除"}稍后再看`);
        }
      }
      return {
        success,
        targetState
      };
    });
    const addSize = 20;
    const addedSize = 18;
    const icon = watchLaterAdded ? /* @__PURE__ */ jsx(IconAnimatedChecked, {
      size: addedSize,
      useAnimation: watchLaterAddedPrevious === false
    }) : /* @__PURE__ */ jsx(WatchLaterIcon, {
      ...size(addSize)
    });
    const watchlaterButtonEl = hasWatchLaterEntry && /* @__PURE__ */ jsx(VideoCardActionButton, {
      visible: actionButtonVisible,
      inlinePosition: "right",
      icon,
      tooltip: watchLaterAdded ? "移除稍后再看" : "稍后再看",
      onClick: onToggleWatchLater
    });
    return {
      watchlaterButtonEl,
      onToggleWatchLater,
      watchLaterAdded,
      hasWatchLaterEntry
    };
  }
  function copyContent(content) {
    GM.setClipboard(content);
    AntdMessage.success(`已复制: ${content}`);
  }
  const VideoCard = React__default.memo(function VideoCard2({
    style,
    className,
    item,
    loading,
    active,
    onRemoveCurrent,
    onMoveToFirst,
    onRefresh,
    emitter: emitter2,
    ...restProps
  }) {
    loading = loading ?? !item;
    const dislikedReason = useDislikedReason((item == null ? void 0 : item.api) === EApiType.App && item.param);
    const cardData = React__default.useMemo(() => item && normalizeCardData(item), [item]);
    const blacklisted = useInBlacklist(cardData == null ? void 0 : cardData.authorMid);
    const watchLaterAdded = useWatchLaterState(cardData == null ? void 0 : cardData.bvid);
    return /* @__PURE__ */ jsx("div", {
      style,
      className: clsx("bili-video-card", styles.biliVideoCard, className),
      "data-bvid": cardData == null ? void 0 : cardData.bvid,
      ...restProps,
      children: loading ? /* @__PURE__ */ jsx(SkeletonCard, {
        loading
      }) : item && cardData && (dislikedReason ? /* @__PURE__ */ jsx(DislikedCard, {
        item,
        cardData,
        emitter: emitter2,
        dislikedReason
      }) : blacklisted ? /* @__PURE__ */ jsx(BlacklistCard, {
        cardData
      }) : /* @__PURE__ */ jsx(VideoCardInner, {
        item,
        cardData,
        active,
        emitter: emitter2,
        onRemoveCurrent,
        onMoveToFirst,
        onRefresh,
        watchLaterAdded
      }))
    });
  });
  const VideoCardInner = React__default.memo(function VideoCardInner2({
    item,
    cardData,
    active = false,
    onRemoveCurrent,
    onMoveToFirst,
    onRefresh,
    emitter: emitter2 = defaultEmitter,
    watchLaterAdded
  }) {
    var _a2, _b2, _c2;
    const {
      autoPreviewWhenHover,
      accessKey,
      styleUseCardBorder,
      styleUseCardBorderOnlyOnHover
    } = useSettingsSnapshot();
    const authed = Boolean(accessKey);
    const {
      // video
      avid,
      bvid,
      goto,
      href,
      title,
      cover,
      duration: duration2,
      durationStr,
      recommendReason,
      // stat
      statItems,
      // author
      authorName,
      authorMid
    } = cardData;
    const isNormalVideo = goto === "av";
    const allowed = ["av", "bangumi", "picture", "live"];
    if (!allowed.includes(goto)) {
      console.warn(`[${APP_NAME}]: none (${allowed.join(",")}) goto type %s`, goto, item);
    }
    const videoDataBox = useRefStateBox(null);
    const videoshotData = (_b2 = (_a2 = videoDataBox.state) == null ? void 0 : _a2.videoshotJson) == null ? void 0 : _b2.data;
    const tryFetchVideoData = useLockFn(async () => {
      var _a3, _b3;
      if (!bvid) return;
      if (!bvid.startsWith("BV")) return;
      if (goto !== "av") return;
      if (isVideoshotDataValid((_b3 = (_a3 = videoDataBox.val) == null ? void 0 : _a3.videoshotJson) == null ? void 0 : _b3.data)) return;
      const data2 = await fetchVideoData(bvid);
      videoDataBox.set(data2);
      if (!isWebApiSuccess(data2.videoshotJson)) {
        warnNoPreview(data2.videoshotJson);
      }
    });
    const warnNoPreview = useLessFrequentFn((json) => {
      AntdNotification.warning({
        message: `${json.message} (code: ${json.code})`,
        description: `${title} (${bvid})`,
        duration: 2
      });
    }, 3, false);
    const cardRef = React__default.useRef(null);
    const coverRef = React__default.useRef(null);
    const videoPreviewWrapperRef = styleUseCardBorder ? cardRef : coverRef;
    const previewImageRef = React__default.useRef(null);
    const {
      onStartPreviewAnimation,
      onHotkeyPreviewAnimation,
      autoPreviewing,
      previewProgress,
      previewT,
      isHovering,
      isHoveringAfterDelay,
      mouseEnterRelativeX
    } = usePreviewAnimation({
      uniqId: item.uniqId,
      emitter: emitter2,
      title,
      active,
      videoDuration: duration2,
      tryFetchVideoData,
      videoDataBox,
      autoPreviewWhenHover,
      videoPreviewWrapperRef
    });
    useUpdateEffect(() => {
      if (!active) return;
      tryit(() => {
        ;
        unsafeWindow[`${APP_KEY_PREFIX}_activeItem`] = item;
      })();
      if (settings.autoPreviewWhenKeyboardSelect) {
        tryFetchVideoData().then(() => {
          onStartPreviewAnimation(false);
        });
      }
    }, [active]);
    const actionButtonVisible = active || isHovering;
    const {
      watchlaterButtonEl,
      onToggleWatchLater,
      hasWatchLaterEntry
    } = useWatchlaterRelated({
      item,
      cardData,
      onRemoveCurrent,
      actionButtonVisible,
      watchLaterAdded
    });
    const {
      dislikeButtonEl,
      hasDislikeEntry,
      onTriggerDislike
    } = useDislikeRelated({
      item,
      authed,
      actionButtonVisible
    });
    const hasChargeOnlyTag = getHasChargeOnlyTag(item, recommendReason);
    const [favFolderNames, setFavFolderNames] = React__default.useState(void 0);
    const [favFolderUrls, setFavFolderUrls] = React__default.useState(void 0);
    const updateFavFolderNames = useMemoizedFn(async () => {
      if (item.api !== "watchlater") return;
      if (!avid) return;
      const result = await UserFavService.getVideoFavState(avid);
      if (result) {
        const {
          favFolderNames: favFolderNames2,
          favFolderUrls: favFolderUrls2
        } = result;
        setFavFolderNames(favFolderNames2);
        setFavFolderUrls(favFolderUrls2);
      }
    });
    const {
      onOpenWithMode,
      handleVideoLinkClick,
      consistentOpenMenus,
      conditionalOpenMenus,
      openInPopupButtonEl,
      onOpenInPopup
    } = useOpenRelated({
      href,
      item,
      cardData,
      actionButtonVisible,
      previewImageRef
    });
    const handleCardClick = useMemoizedFn((e2) => {
      if (!styleUseCardBorder) return;
      if (e2.target.closest("a")) return;
      onOpenWithMode();
    });
    useMittOn(emitter2, "open", onOpenWithMode);
    useMittOn(emitter2, "open-in-popup", onOpenInPopup);
    useMittOn(emitter2, "toggle-watch-later", () => onToggleWatchLater());
    useMittOn(emitter2, "trigger-dislike", () => onTriggerDislike());
    useMittOn(emitter2, "start-preview-animation", onStartPreviewAnimation);
    useMittOn(emitter2, "hotkey-preview-animation", onHotkeyPreviewAnimation);
    const onCopyLink = useMemoizedFn(() => {
      let content = href;
      if (href.startsWith("/")) {
        content = new URL(href, location.href).href;
      }
      copyContent(content);
    });
    const tab2 = useCurrentUsingTab();
    const hasBlacklistEntry = authorMid && (tab2 === ETab.RecommendApp || tab2 === ETab.RecommendPc || tab2 === ETab.Hot);
    const onBlacklistUp = useMemoizedFn(async () => {
      if (!authorMid) return AntdMessage.error("UP mid 为空!");
      const success = await UserBlacklistService.add(authorMid);
      if (success) {
        AntdMessage.success(`已加入黑名单: ${authorName}`);
      }
    });
    const onAddUpToFilterList = useMemoizedFn(async () => {
      if (!authorMid) return AntdMessage.error("UP mid 为空!");
      let content = `${authorMid}`;
      if (authorName) content += `(${authorName})`;
      if (settings.filterByAuthorNameKeywords.includes(content)) {
        return toast(`已在过滤名单中: ${content}`);
      }
      updateSettings({
        filterByAuthorNameKeywords: [...settings.filterByAuthorNameKeywords, content]
      });
      AntdMessage.success(`已加入过滤名单: ${content}, 刷新后生效~`);
    });
    const hasUnfollowEntry = item.api === EApiType.Dynamic || (item.api === EApiType.App || item.api === EApiType.Pc) && getFollowedStatus(recommendReason);
    const onUnfollowUp = useMemoizedFn(async () => {
      if (!authorMid) return;
      const success = await UserfollowService.unfollow(authorMid);
      if (success) {
        AntdMessage.success("已取消关注");
      }
    });
    const hasDynamicFeedFilterSelectUpEntry = isNormalVideo && !!authorMid && !!authorName;
    const onDynamicFeedFilterSelectUp = useMemoizedFn(async (newWindow) => {
      if (!hasDynamicFeedFilterSelectUpEntry) return;
      async function openInCurrentWindow() {
        dynamicFeedFilterSelectUp({
          upMid: Number(authorMid),
          upName: authorName,
          searchText: void 0
        });
        videoSourceTabState.value = ETab.DynamicFeed;
        await delay(100);
        await (onRefresh == null ? void 0 : onRefresh());
      }
      function openInNewWindow() {
        const u = `/?dyn-mid=${authorMid}`;
        GM.openInTab(u, {
          insert: true,
          active: true
        });
      }
      newWindow ?? (newWindow = true);
      if (newWindow) {
        openInNewWindow();
      } else {
        openInCurrentWindow();
      }
    });
    const hasRankingNo = isRanking(item);
    const contextMenus = React__default.useMemo(() => {
      const watchLaterLabel = watchLaterAdded ? "移除稍后再看" : "稍后再看";
      const divider = {
        type: "divider"
      };
      const copyMenus = [{
        key: "copy-link",
        label: "复制视频链接",
        icon: /* @__PURE__ */ jsx(IconPark, {
          name: "Copy",
          size: 15
        }),
        onClick: onCopyLink
      }, bvid && {
        key: "copy-bvid",
        label: "复制 BVID",
        icon: /* @__PURE__ */ jsx(IconPark, {
          name: "Copy",
          size: 15
        }),
        onClick() {
          copyContent(bvid);
        }
      }].filter(Boolean);
      const actionMenus = [hasDislikeEntry && {
        key: "dislike",
        label: "我不想看",
        icon: /* @__PURE__ */ jsx(DislikeIcon, {
          width: 15,
          height: 15
        }),
        onClick() {
          onTriggerDislike();
        }
      }, hasDynamicFeedFilterSelectUpEntry && {
        key: "dymamic-feed-filter-select-up",
        label: "查看 UP 的动态",
        icon: /* @__PURE__ */ jsx(IconPark, {
          name: "PeopleSearch",
          size: 15
        }),
        onClick() {
          onDynamicFeedFilterSelectUp();
        }
      }, hasUnfollowEntry && {
        key: "unfollow-up",
        label: "取消关注",
        icon: /* @__PURE__ */ jsx(IconPark, {
          name: "PeopleMinus",
          size: 15
        }),
        onClick: onUnfollowUp
      }, hasBlacklistEntry && {
        key: "blacklist-up",
        label: "将 UP 加入黑名单",
        icon: /* @__PURE__ */ jsx(IconPark, {
          name: "PeopleDelete",
          size: 15
        }),
        onClick: onBlacklistUp
      }, hasBlacklistEntry && {
        key: "add-up-to-filterlist",
        label: "将 UP 加入过滤列表",
        icon: /* @__PURE__ */ jsx(IconPark, {
          name: "PeopleDelete",
          size: 15
        }),
        onClick: onAddUpToFilterList
      }, item.api === EApiType.Watchlater && {
        key: "add-fav",
        icon: /* @__PURE__ */ jsx(IconPark, {
          name: "Star",
          size: 15,
          ...(favFolderNames == null ? void 0 : favFolderNames.length) ? {
            theme: "two-tone",
            fill: ["currentColor", colorPrimaryValue]
          } : void 0
        }),
        label: (favFolderNames == null ? void 0 : favFolderNames.length) ? `已收藏 ${favFolderNames.map((n2) => `「${n2}」`).join("")}` : "快速收藏",
        async onClick() {
          if (!avid) return;
          const hasFaved = Boolean(favFolderNames == null ? void 0 : favFolderNames.length);
          if (hasFaved) {
            favFolderUrls == null ? void 0 : favFolderUrls.forEach((u) => {
              window.open(u, "_blank");
            });
          } else {
            const success = await UserFavService.addFav(avid);
            if (success) {
              AntdMessage.success(`已加入收藏夹「${defaultFavFolderName}」`);
            }
          }
        }
      }, hasWatchLaterEntry && {
        key: "watchlater",
        label: watchLaterLabel,
        icon: watchLaterAdded ? /* @__PURE__ */ jsx(materialSymbolsDeleteOutlineRounded, {
          ...size(15)
        }) : /* @__PURE__ */ jsx(WatchLaterIcon, {
          ...size(15)
        }),
        onClick() {
          onToggleWatchLater();
        }
      }, item.api === EApiType.Watchlater && watchLaterAdded && {
        key: "watchlater-readd",
        label: "重新添加稍候再看 (移到最前)",
        icon: /* @__PURE__ */ jsx(IconPark, {
          name: "AddTwo",
          size: 15
        }),
        async onClick() {
          const {
            success
          } = await onToggleWatchLater(void 0, watchLaterAdd);
          if (!success) return;
          onMoveToFirst == null ? void 0 : onMoveToFirst(item, cardData);
        }
      }].filter(Boolean);
      const favMenus = item.api === EApiType.Fav ? [{
        key: "open-fav-folder",
        label: "浏览收藏夹",
        icon: /* @__PURE__ */ jsx(OpenExternalLinkIcon, {
          css: C.size(15)
        }),
        onClick() {
          const {
            id
          } = item.folder;
          const url = formatFavFolderUrl(id);
          window.open(url, "_blank");
        }
      }, {
        key: "remove-fav",
        label: "移除收藏",
        icon: /* @__PURE__ */ jsx(materialSymbolsDeleteOutlineRounded, {
          ...size(15)
        }),
        async onClick() {
          if (item.api !== "fav") return;
          const success = await UserFavService.removeFav(item.folder.id, `${item.id}:${item.type}`);
          if (success) {
            onRemoveCurrent == null ? void 0 : onRemoveCurrent(item, cardData);
          }
        }
      }] : [];
      return [...consistentOpenMenus, copyMenus.length && divider, ...copyMenus, actionMenus.length && divider, ...actionMenus, favMenus.length && divider, ...favMenus, conditionalOpenMenus.length && divider, ...conditionalOpenMenus].filter(Boolean);
    }, [item, hasWatchLaterEntry, watchLaterAdded, hasDislikeEntry, hasUnfollowEntry, hasBlacklistEntry, hasDynamicFeedFilterSelectUpEntry, favFolderNames, favFolderUrls, consistentOpenMenus, conditionalOpenMenus]);
    const onContextMenuOpenChange = useMemoizedFn((open) => {
      if (!open) return;
      updateFavFolderNames();
    });
    const prefixCls = `.${APP_CLS_ROOT} .${APP_CLS_GRID} .${APP_CLS_CARD}`;
    const coverRoundCss = [css`
      ${prefixCls} & {
        overflow: hidden;
        border-radius: ${borderRadiusValue};
      }
    `, styleUseCardBorder && (styleUseCardBorderOnlyOnHover ? isHovering && css`
            ${prefixCls} & {
              border-bottom-left-radius: 0;
              border-bottom-right-radius: 0;
            }
          ` : css`
            ${prefixCls} & {
              border-bottom-left-radius: 0;
              border-bottom-right-radius: 0;
            }
          `)];
    const coverContent = /* @__PURE__ */ jsxs("a", {
      ref: (el) => coverRef.current = el,
      href,
      target: "_blank",
      css: css`
        position: relative;
        overflow: hidden;
        /* firefox need this */
        display: block;
      `,
      onClick: handleVideoLinkClick,
      onContextMenu: (e2) => {
        e2.preventDefault();
      },
      children: [/* @__PURE__ */ jsx("div", {
        className: "bili-video-card__image",
        style: {
          aspectRatio: "16 / 9"
        },
        "data-as": "overflow-boundary",
        css: coverRoundCss,
        children: /* @__PURE__ */ jsx("div", {
          className: "bili-video-card__image--wrap",
          children: /* @__PURE__ */ jsx(Picture, {
            className: "v-img bili-video-card__cover",
            src: `${cover}@672w_378h_1c_!web-home-common-cover`,
            imgProps: {
              // in firefox, alt text is visible during loading
              alt: isFirefox ? "" : title
            }
          })
        })
      }), /* @__PURE__ */ jsxs("div", {
        className: "bili-video-card__stats",
        "data-as": "overflow-boundary",
        css: [coverRoundCss, css`
            ${prefixCls} & {
              border-top-left-radius: 0;
              border-top-right-radius: 0;
              pointer-events: none;
            }
          `, "", ""],
        children: [/* @__PURE__ */ jsx("div", {
          className: "bili-video-card__stats--left",
          children: statItems.map(({
            field,
            value
          }) => /* @__PURE__ */ jsx(StatItemDisplay, {
            field,
            value
          }, field))
        }), /* @__PURE__ */ jsx("span", {
          className: "bili-video-card__stats__duration",
          children: isNormalVideo && durationStr
        })]
      }), !!(((_c2 = videoshotData == null ? void 0 : videoshotData.image) == null ? void 0 : _c2.length) && duration2 && (isHoveringAfterDelay || active)) && // auto-preview: start-by (hover | keyboard)
      (autoPreviewing ? /* @__PURE__ */ jsx(PreviewImage, {
        ref: previewImageRef,
        videoDuration: duration2,
        pvideo: videoshotData,
        mouseEnterRelativeX,
        progress: previewProgress,
        t: previewT
      }) : (
        // follow-mouse
        /* @__PURE__ */ jsx(PreviewImage, {
          ref: previewImageRef,
          videoDuration: duration2,
          pvideo: videoshotData,
          mouseEnterRelativeX
        })
      )), !!dislikeButtonEl && /* @__PURE__ */ jsx("div", {
        className: "left-actions",
        css: VideoCardActionStyle.topContainer("left"),
        children: dislikeButtonEl
      }), !!(watchlaterButtonEl || openInPopupButtonEl) && /* @__PURE__ */ jsxs("div", {
        className: "right-actions",
        css: VideoCardActionStyle.topContainer("right"),
        children: [watchlaterButtonEl, openInPopupButtonEl]
      }), hasChargeOnlyTag && /* @__PURE__ */ jsx(ChargeOnlyTag, {}), hasRankingNo && /* @__PURE__ */ jsx(RankingNumMark, {
        item
      })]
    });
    const bottomContent = /* @__PURE__ */ jsx(VideoCardBottom, {
      item,
      cardData,
      handleVideoLinkClick
    });
    function wrapDropdown(c2) {
      return /* @__PURE__ */ jsx(antd.Dropdown, {
        menu: {
          items: contextMenus
        },
        trigger: ["contextMenu"],
        onOpenChange: onContextMenuOpenChange,
        children: c2
      });
    }
    function wrapCardWrapper(c2) {
      return /* @__PURE__ */ jsx("div", {
        ref: (el) => cardRef.current = el,
        className: "bili-video-card__wrap",
        css: css`
          background-color: unset;
          position: static;
          height: 100%;
        `,
        onClick: handleCardClick,
        children: c2
      });
    }
    if (styleUseCardBorder) {
      return wrapDropdown(wrapCardWrapper(/* @__PURE__ */ jsxs(Fragment, {
        children: [coverContent, bottomContent]
      })));
    } else {
      return wrapCardWrapper(/* @__PURE__ */ jsxs(Fragment, {
        children: [wrapDropdown(coverContent), bottomContent]
      }));
    }
  });
  const borderAndShadow = css`
  border-color: ${colorPrimaryValue};
  box-shadow: 0px 0px 9px 4px ${colorPrimaryValue};
`;
  const hightlightBackground = (dark, styleUseWhiteBackground) => {
    let color;
    if (dark) {
      color = "#2d2d2d";
    } else {
      if (styleUseWhiteBackground) {
        color = "#f4f4f5";
      } else {
        color = "#ebeced";
      }
    }
    return css`
    background-color: ${color};
  `;
  };
  const coverZoom = css`
  /* cover zoom */
  .bili-video-card__cover {
    transform-origin: center center;
    transition: transform 0.2s ease-out;
    transform: scale(1.05);
  }
`;
  function useCardBorderCss() {
    const {
      styleUseCardBorder: useBorder,
      styleUseCardBorderOnlyOnHover: useBorderOnlyOnHover,
      styleUseCardBoxShadow: useBoxShadow,
      styleUseWhiteBackground,
      useDelayForHover
    } = useSettingsSnapshot();
    const dark = useIsDarkMode();
    return React__default.useMemo(() => {
      return [css`
        border: 1px solid transparent;
        transition:
          border-color 0.3s ease-in-out,
          box-shadow 0.3s ease-in-out;
      `, useBorder && [css`
          cursor: pointer;
          border-radius: ${borderRadiusValue};
          &:hover {
            border-color: ${borderColorValue};
            ${useBoxShadow ? borderAndShadow : hightlightBackground(dark, styleUseWhiteBackground)}
            ${useDelayForHover && coverZoom}
          }
        `, !useBorderOnlyOnHover && css`
            border-color: ${borderColorValue};
          `]];
    }, [useBorder, useBorderOnlyOnHover, useBoxShadow, dark, styleUseWhiteBackground, useDelayForHover]);
  }
  function getActiveCardBorderCss(active) {
    return active && css`
      border-radius: ${borderRadiusValue};
      ${borderAndShadow}
    `;
  }
  function useShortcut({
    enabled,
    refresh,
    minIndex = 0,
    maxIndex,
    containerRef,
    getScrollerRect,
    changeScrollY,
    videoCardEmitters
  }) {
    const [activeIndex, setActiveIndex] = React__default.useState(void 0);
    const isEnabled = useMemoizedFn(() => {
      if (!enabled) return false;
      if (shouldDisableShortcut()) return false;
      return true;
    });
    const activeIndexIsValid = useMemoizedFn(() => {
      var _a2;
      if (typeof activeIndex !== "number") return false;
      if (!containerRef.current) return false;
      const scrollerRect = getScrollerRect();
      const rect = (_a2 = containerRef.current.querySelector(`.${APP_CLS_CARD}.${APP_CLS_CARD_ACTIVE}`)) == null ? void 0 : _a2.getBoundingClientRect();
      if (!scrollerRect || !rect) return false;
      if (rect.top - scrollerRect.top < -(scrollerRect.height + rect.height)) {
        return false;
      }
      if (rect.top - scrollerRect.top > scrollerRect.height * 2 + rect.height) {
        return false;
      }
      return true;
    });
    function getStep(direction) {
      const card = getCardAt(activeIndex);
      const activeLeft = card.getBoundingClientRect().left;
      const isLeftSame = (left) => Math.abs(activeLeft - left) < 1;
      {
        const col = getColumnCount(containerRef.current);
        const step2 = direction === "down" ? col : -col;
        const newCard = getCardAt(activeIndex + step2);
        if (newCard) {
          const left = newCard.getBoundingClientRect().left;
          if (isLeftSame(left)) {
            return step2;
          }
        }
      }
      let step = 0;
      let cur = card;
      const next2 = () => direction === "down" ? cur.nextElementSibling : cur.previousElementSibling;
      while (next2()) {
        cur = next2();
        if (!cur.classList.contains(APP_CLS_CARD)) continue;
        direction === "down" ? step++ : step--;
        const left = cur.getBoundingClientRect().left;
        if (isLeftSame(left)) {
          return step;
        }
      }
      return 0;
    }
    const addActiveIndex = (step) => (e2) => {
      if (!isEnabled()) return;
      e2 == null ? void 0 : e2.preventDefault();
      let newActiveIndex;
      if (activeIndexIsValid()) {
        const _step = typeof step === "number" ? step : getStep(step);
        newActiveIndex = activeIndex + _step;
      } else {
        newActiveIndex = getInitialIndex();
      }
      if (newActiveIndex < minIndex) {
        makeVisible(minIndex);
        return;
      }
      if (newActiveIndex > maxIndex) {
        makeVisible(maxIndex);
        return;
      }
      setActiveIndex(newActiveIndex);
      makeVisible(newActiveIndex);
    };
    const useKey = (keyFilter, eventHandler) => {
      useKeyPress(keyFilter, (event, key2) => {
        if (!isEnabled()) return;
        eventHandler(event, key2);
      }, {
        exactMatch: true
      });
    };
    useKey("leftarrow", addActiveIndex(-1));
    useKey("rightarrow", addActiveIndex(1));
    useKey("tab", addActiveIndex(1));
    useKey("shift.tab", addActiveIndex(-1));
    useKey("uparrow", addActiveIndex("up"));
    useKey("downarrow", addActiveIndex("down"));
    const clearActiveIndex = () => {
      if (!isEnabled()) return;
      setActiveIndex(void 0);
    };
    const getActiveEmitter = () => {
      if (!isEnabled() || typeof activeIndex !== "number") return;
      return videoCardEmitters[activeIndex];
    };
    useKey("esc", clearActiveIndex);
    useKey("enter", () => {
      var _a2;
      return (_a2 = getActiveEmitter()) == null ? void 0 : _a2.emit("open");
    });
    useKey("x", () => {
      var _a2;
      return (_a2 = getActiveEmitter()) == null ? void 0 : _a2.emit("open-in-popup");
    });
    useKey("backspace", () => {
      var _a2;
      return (_a2 = getActiveEmitter()) == null ? void 0 : _a2.emit("trigger-dislike");
    });
    useKey(["s", "w"], () => {
      var _a2;
      return (_a2 = getActiveEmitter()) == null ? void 0 : _a2.emit("toggle-watch-later");
    });
    useKey(["period", "p"], () => {
      var _a2;
      return (_a2 = getActiveEmitter()) == null ? void 0 : _a2.emit("hotkey-preview-animation");
    });
    function getInitialIndex() {
      const scrollerRect = getScrollerRect();
      if (!scrollerRect) return 0;
      const cards = getCards();
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const rect = card.getBoundingClientRect();
        if (rect.top >= scrollerRect.top) {
          return i;
        }
      }
      return 0;
    }
    const CARDS_SELECTOR = `.${APP_CLS_CARD}`;
    function getCards() {
      var _a2;
      return [...((_a2 = containerRef.current) == null ? void 0 : _a2.querySelectorAll(CARDS_SELECTOR)) || []];
    }
    function getCardAt(index) {
      return getCards()[index];
    }
    function makeVisible(index) {
      var _a2;
      const card = getCardAt(index);
      (_a2 = card == null ? void 0 : card.scrollIntoViewIfNeeded) == null ? void 0 : _a2.call(card, false);
      const scrollerRect = getScrollerRect();
      const rect = card.getBoundingClientRect();
      if (!scrollerRect || !rect) return;
      if (rect.top <= scrollerRect.top) {
        const offset = -(scrollerRect.top - rect.top + 10);
        changeScrollY == null ? void 0 : changeScrollY({
          offset
        });
        return;
      }
      if (scrollerRect.bottom - rect.bottom < 20) {
        const offset = 20 - (scrollerRect.bottom - rect.bottom);
        changeScrollY == null ? void 0 : changeScrollY({
          offset
        });
        return;
      }
    }
    return {
      activeIndex,
      clearActiveIndex
    };
  }
  const countCache1 = /* @__PURE__ */ new Map();
  const countCache2 = /* @__PURE__ */ new Map();
  function getColumnCount(container, mayHaveNarrowMode = true) {
    if (mayHaveNarrowMode && settings.useNarrowMode) return 2;
    const countCache = settings.styleUseCustomGrid ? countCache1 : countCache2;
    let count = countCache.get(Math.trunc(window.innerWidth));
    if (count) {
      return count;
    }
    container || (container = document.querySelector(`.${videoGrid}`));
    if (!container) return 0;
    const style = window.getComputedStyle(container);
    if (style.display !== "grid") return 0;
    count = style.gridTemplateColumns.split(" ").length;
    countCache.set(window.innerWidth, count);
    return count;
  }
  const debug$4 = baseDebug.extend("service");
  const recItemUniqer = (item) => item.api === EApiType.Separator ? item.uniqId : lookinto(item, {
    [EApiType.App]: (item2) => item2.param,
    [EApiType.Pc]: (item2) => item2.bvid,
    [EApiType.Dynamic]: (item2) => item2.modules.module_dynamic.major.archive.bvid,
    [EApiType.Watchlater]: (item2) => item2.bvid,
    [EApiType.Fav]: (item2) => item2.bvid,
    [EApiType.PopularGeneral]: (item2) => item2.bvid,
    [EApiType.PopularWeekly]: (item2) => item2.bvid,
    [EApiType.Ranking]: (item2) => item2.uniqId,
    [EApiType.Live]: (item2) => item2.roomid
  });
  function concatThenUniq(existing, newItems) {
    return lodash.uniqBy([...existing, ...newItems], recItemUniqer);
  }
  const usePcApi = (tab2) => tab2 === ETab.KeepFollowOnly || tab2 === ETab.RecommendPc;
  async function getMinCount(count, fetcherOptions, filterMultiplier = 5) {
    const {
      tab: tab2,
      abortSignal,
      serviceMap
    } = fetcherOptions;
    let items = [];
    let hasMore = true;
    const addMore = async (restCount) => {
      let cur = [];
      if (!REC_TABS.includes(tab2)) {
        const service = getIService(serviceMap, tab2);
        cur = await service.loadMore(abortSignal) || [];
        hasMore = service.hasMore;
        cur = filterRecItems(cur, tab2);
        items = concatThenUniq(items, cur);
        return;
      }
      let times;
      if (tab2 === ETab.KeepFollowOnly) {
        times = 8;
        debug$4("getMinCount: addMore(restCount = %s) times=%s", restCount, times);
      } else {
        const pagesize = usePcApi(tab2) ? PcRecService.PAGE_SIZE : AppRecService.PAGE_SIZE;
        const multipler = anyFilterEnabled(tab2) ? filterMultiplier : 1.2;
        times = Math.ceil(restCount * multipler / pagesize);
        debug$4("getMinCount: addMore(restCount = %s) multipler=%s pagesize=%s times=%s", restCount, multipler, pagesize, times);
      }
      if (usePcApi(tab2)) {
        const service = serviceMap[tab2];
        cur = await service.getRecommendTimes(times, abortSignal) || [];
        hasMore = service.hasMore;
      } else {
        const service = serviceMap[ETab.RecommendApp];
        cur = await service.getRecommendTimes(times) || [];
        hasMore = service.hasMore;
      }
      cur = filterRecItems(cur, tab2);
      items = concatThenUniq(items, cur);
    };
    await addMore(count);
    while (true) {
      if (abortSignal == null ? void 0 : abortSignal.aborted) {
        debug$4("getMinCount: break for abortSignal");
        break;
      }
      if (!hasMore) {
        debug$4("getMinCount: break for tab=%s hasMore=false", tab2);
        break;
      }
      const len = items.filter((x2) => x2.api !== EApiType.Separator).length;
      if (len >= count) break;
      await addMore(count - items.length);
    }
    return items;
  }
  async function refreshForHome(fetcherOptions) {
    let items = await getMinCount(getColumnCount(void 0, false) * 2, fetcherOptions, 5);
    if (fetcherOptions.tab === ETab.Watchlater) {
      items = items.slice(0, 20);
    }
    return items;
  }
  async function refreshForGrid(fetcherOptions) {
    let minCount = getColumnCount() * 3 + 1;
    if (fetcherOptions.tab === ETab.DynamicFeed && fetcherOptions.serviceMap[ETab.DynamicFeed].searchText) {
      minCount = 1;
    }
    return getMinCount(minCount, fetcherOptions, 5);
  }
  var observerMap = /* @__PURE__ */ new Map();
  var RootIds = /* @__PURE__ */ new WeakMap();
  var rootId = 0;
  var unsupportedValue = void 0;
  function getRootId(root2) {
    if (!root2) return "0";
    if (RootIds.has(root2)) return RootIds.get(root2);
    rootId += 1;
    RootIds.set(root2, rootId.toString());
    return RootIds.get(root2);
  }
  function optionsToId(options) {
    return Object.keys(options).sort().filter(
      (key2) => options[key2] !== void 0
    ).map((key2) => {
      return `${key2}_${key2 === "root" ? getRootId(options.root) : options[key2]}`;
    }).toString();
  }
  function createObserver(options) {
    const id = optionsToId(options);
    let instance = observerMap.get(id);
    if (!instance) {
      const elements = /* @__PURE__ */ new Map();
      let thresholds;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          var _a2;
          const inView = entry.isIntersecting && thresholds.some((threshold) => entry.intersectionRatio >= threshold);
          if (options.trackVisibility && typeof entry.isVisible === "undefined") {
            entry.isVisible = inView;
          }
          (_a2 = elements.get(entry.target)) == null ? void 0 : _a2.forEach((callback) => {
            callback(inView, entry);
          });
        });
      }, options);
      thresholds = observer.thresholds || (Array.isArray(options.threshold) ? options.threshold : [options.threshold || 0]);
      instance = {
        id,
        observer,
        elements
      };
      observerMap.set(id, instance);
    }
    return instance;
  }
  function observe(element, callback, options = {}, fallbackInView = unsupportedValue) {
    if (typeof window.IntersectionObserver === "undefined" && fallbackInView !== void 0) {
      const bounds = element.getBoundingClientRect();
      callback(fallbackInView, {
        isIntersecting: fallbackInView,
        target: element,
        intersectionRatio: typeof options.threshold === "number" ? options.threshold : 0,
        time: 0,
        boundingClientRect: bounds,
        intersectionRect: bounds,
        rootBounds: bounds
      });
      return () => {
      };
    }
    const { id, observer, elements } = createObserver(options);
    const callbacks = elements.get(element) || [];
    if (!elements.has(element)) {
      elements.set(element, callbacks);
    }
    callbacks.push(callback);
    observer.observe(element);
    return function unobserve() {
      callbacks.splice(callbacks.indexOf(callback), 1);
      if (callbacks.length === 0) {
        elements.delete(element);
        observer.unobserve(element);
      }
      if (elements.size === 0) {
        observer.disconnect();
        observerMap.delete(id);
      }
    };
  }
  function useInView({
    threshold,
    delay: delay2,
    trackVisibility,
    rootMargin,
    root: root2,
    triggerOnce,
    skip,
    initialInView,
    fallbackInView,
    onChange
  } = {}) {
    var _a2;
    const [ref, setRef] = React__default__namespace.useState(null);
    const callback = React__default__namespace.useRef();
    const [state, setState] = React__default__namespace.useState({
      inView: !!initialInView,
      entry: void 0
    });
    callback.current = onChange;
    React__default__namespace.useEffect(
      () => {
        if (skip || !ref) return;
        let unobserve;
        unobserve = observe(
          ref,
          (inView, entry) => {
            setState({
              inView,
              entry
            });
            if (callback.current) callback.current(inView, entry);
            if (entry.isIntersecting && triggerOnce && unobserve) {
              unobserve();
              unobserve = void 0;
            }
          },
          {
            root: root2,
            rootMargin,
            threshold,
            // @ts-ignore
            trackVisibility,
            // @ts-ignore
            delay: delay2
          },
          fallbackInView
        );
        return () => {
          if (unobserve) {
            unobserve();
          }
        };
      },
      // We break the rule here, because we aren't including the actual `threshold` variable
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [
        // If the threshold is an array, convert it to a string, so it won't change between renders.
        Array.isArray(threshold) ? threshold.toString() : threshold,
        ref,
        root2,
        rootMargin,
        triggerOnce,
        skip,
        trackVisibility,
        fallbackInView,
        delay2
      ]
    );
    const entryTarget = (_a2 = state.entry) == null ? void 0 : _a2.target;
    const previousEntryTarget = React__default__namespace.useRef();
    if (!ref && entryTarget && !triggerOnce && !skip && previousEntryTarget.current !== entryTarget) {
      previousEntryTarget.current = entryTarget;
      setState({
        inView: !!initialInView,
        entry: void 0
      });
    }
    const result = [setRef, state.inView, state.entry];
    result.ref = result[0];
    result.inView = result[1];
    result.entry = result[2];
    return result;
  }
  ({
    List: React__default.forwardRef(({
      context: ctx,
      children,
      ...props
    }, ref) => {
      function setForwardedRef(el) {
        if (!ref) return;
        if (typeof ref === "function") {
          ref(el);
        } else {
          ref.current = el;
        }
      }
      return /* @__PURE__ */ jsx("div", {
        ref: (el) => {
          setForwardedRef(el);
          ctx.containerRef.current = el;
        },
        ...props,
        className: ctx.gridClassName,
        children
      });
    }),
    Footer({
      context: ctx,
      ...props
    }) {
      return /* @__PURE__ */ jsx(Fragment, {
        children: ctx.footerContent
      });
    }
    // Item: ({ context: ctx, children, ...props }) => {
    //   // const cloned = cloneElement(children)
    //   // return null
    // },
  });
  const debug$3 = baseDebug.extend("components:RecGrid");
  const RecGrid = React__default.forwardRef(function RecGrid2({
    infiteScrollUseWindow,
    shortcutEnabled,
    onScrollToTop,
    className,
    scrollerRef,
    setRefreshing: setUpperRefreshing,
    setExtraInfo
  }, ref) {
    const tab2 = useCurrentUsingTab();
    const loadCompleteCountBox = useRefStateBox(0);
    const preAction = useMemoizedFn(() => {
      clearActiveIndex();
      updateExtraInfo(tab2);
    });
    const postAction = useMemoizedFn(() => {
      clearActiveIndex();
      loadCompleteCountBox.set(1);
      updateExtraInfo(tab2);
      setTimeout(checkShouldLoadMore);
    });
    const updateExtraInfo = useMemoizedFn((tab22) => {
      var _a2;
      const info = ((_a2 = getIService(serviceMapBox.val, tab22)) == null ? void 0 : _a2.usageInfo) ?? null;
      setExtraInfo == null ? void 0 : setExtraInfo(info);
    });
    const {
      itemsBox,
      error: refreshError,
      refresh,
      hasMoreBox,
      refreshingBox,
      refreshTsBox,
      refreshAbortController,
      useSkeleton,
      serviceMapBox
    } = useRefresh({
      tab: tab2,
      debug: debug$3,
      fetcher: refreshForGrid,
      preAction,
      postAction,
      updateExtraInfo,
      onScrollToTop,
      setUpperRefreshing
    });
    useMount(refresh);
    React__default.useImperativeHandle(ref, () => ({
      refresh
    }), [refresh]);
    const goOutAt = React__default.useRef();
    useEventListener("visibilitychange", (e2) => {
      const visible = document.visibilityState === "visible";
      if (!visible) {
        goOutAt.current = Date.now();
        return;
      }
      if (refreshingBox.val) return;
      if (loadMoreLocker.current[refreshTsBox.val]) return;
      if (tab2 === ETab.Watchlater && goOutAt.current && Date.now() - goOutAt.current > ms$1("1h")) {
        refresh(true, {
          watchlaterKeepOrder: true
        });
      }
    }, {
      target: document
    });
    const checkShouldLoadMore = useMemoizedFn(async () => {
      await delay(isSafari ? 100 : 0);
      debug$3("checkShouldLoadMore(): footerInView = %s", footerInViewRef.current);
      if (footerInViewRef.current) {
        loadMore();
      }
    });
    const loadMoreLocker = React__default.useRef({});
    const lock = React__default.useCallback((refreshedAt) => {
      loadMoreLocker.current = {
        [refreshedAt]: true
      };
    }, []);
    const unlock = React__default.useCallback((refreshedAt) => {
      loadMoreLocker.current[refreshedAt] = false;
    }, []);
    const isLocked = useMemoizedFn((refreshedAt) => !!loadMoreLocker.current[refreshedAt]);
    const loadMore = useMemoizedFn(async () => {
      if (refreshingBox.val) return;
      if (!hasMoreBox.val) return;
      const refreshTsWhenStart = refreshTsBox.val;
      if (isLocked(refreshTsWhenStart)) return;
      lock(refreshTsWhenStart);
      let newItems = itemsBox.val;
      let newHasMore = true;
      let err;
      try {
        const service = getIService(serviceMapBox.val, tab2);
        let more = await service.loadMore(refreshAbortController.signal) || [];
        more = filterRecItems(more, tab2);
        newItems = concatThenUniq(newItems, more);
        newHasMore = service.hasMore;
      } catch (e2) {
        err = e2;
      }
      if (err) {
        unlock(refreshTsWhenStart);
        throw err;
      }
      if (refreshTsWhenStart !== refreshTsBox.val) {
        debug$3("loadMore: skip update for mismatch refreshedAt, %s != %s", refreshTsWhenStart, refreshTsBox.val);
        return;
      }
      debug$3("loadMore: seq(%s) len %s -> %s", loadCompleteCountBox.val + 1, itemsBox.val.length, newItems.length);
      hasMoreBox.set(newHasMore);
      itemsBox.set(newItems);
      loadCompleteCountBox.set((c2) => c2 + 1);
      unlock(refreshTsWhenStart);
      checkShouldLoadMore();
    });
    const usingItems = itemsBox.state;
    const containerRef = React__default.useRef(null);
    const getScrollerRect = useMemoizedFn(() => {
      var _a2;
      if (infiteScrollUseWindow) {
        const yStart = $headerHeight.get() + 50;
        return new DOMRect(0, yStart, window.innerWidth, window.innerHeight - yStart);
      } else {
        return (_a2 = scrollerRef == null ? void 0 : scrollerRef.current) == null ? void 0 : _a2.getBoundingClientRect();
      }
    });
    const modalDislikeVisible = useModalDislikeVisible();
    const usingVideoItems = React__default.useMemo(() => {
      return usingItems.filter((x2) => x2.api !== EApiType.Separator);
    }, [usingItems]);
    const emitterCache = React__default.useMemo(() => /* @__PURE__ */ new Map(), [refreshTsBox.state]);
    const videoCardEmitters = React__default.useMemo(() => {
      return usingVideoItems.map(({
        uniqId
      }) => {
        const cacheKey2 = uniqId;
        return emitterCache.get(cacheKey2) || (() => {
          const instance = mitt();
          emitterCache.set(cacheKey2, instance);
          return instance;
        })();
      });
    }, [usingVideoItems]);
    React__default.useEffect(() => {
      const broadcastMouseEnter = (srcUniqId) => {
        videoCardEmitters.forEach((emitter2) => {
          emitter2.emit("mouseenter-other-card", srcUniqId);
        });
      };
      videoCardEmitters.forEach((emitter2) => {
        emitter2.on("mouseenter", broadcastMouseEnter);
      });
      return () => {
        videoCardEmitters.forEach((emitter2) => {
          emitter2.off("mouseenter");
        });
      };
    }, [videoCardEmitters]);
    const {
      activeIndex,
      clearActiveIndex
    } = useShortcut({
      enabled: shortcutEnabled && !modalDislikeVisible,
      refresh,
      maxIndex: usingVideoItems.length - 1,
      containerRef,
      getScrollerRect,
      videoCardEmitters,
      changeScrollY: infiteScrollUseWindow ? function({
        offset,
        absolute
      }) {
        const scroller = document.documentElement;
        if (typeof offset === "number") {
          scroller.scrollTop += offset;
          return;
        }
        if (typeof absolute === "number") {
          scroller.scrollTop = absolute;
          return;
        }
      } : void 0
    });
    const setItems = itemsBox.set;
    const handleRemoveCard = useMemoizedFn((item, data2) => {
      setItems((items) => {
        const index = items.findIndex((x2) => x2.uniqId === item.uniqId);
        if (index === -1) return items;
        const newItems = items.slice();
        newItems.splice(index, 1);
        AntdMessage.success(`已移除: ${data2.title}`, 4);
        if (tab2 === ETab.Watchlater) {
          serviceMapBox.val[tab2].count--;
          updateExtraInfo(tab2);
        }
        if (tab2 === ETab.Fav) {
          serviceMapBox.val[tab2].total--;
          updateExtraInfo(tab2);
        }
        return newItems;
      });
    });
    const handleMoveCardToFirst = useMemoizedFn((item, data2) => {
      setItems((items) => {
        const currentItem = items.find((x2) => x2.uniqId === item.uniqId);
        if (!currentItem) return items;
        const index = items.indexOf(currentItem);
        const newItems = items.slice();
        newItems.splice(index, 1);
        const newIndex = newItems.findIndex((x2) => x2.api !== EApiType.Separator);
        newItems.splice(newIndex, 0, currentItem);
        return newItems;
      });
    });
    const refreshing = refreshingBox.state;
    const hasMore = hasMoreBox.state;
    const {
      ref: footerRef,
      inView: __footerInView
    } = useInView({
      root: infiteScrollUseWindow ? null : (scrollerRef == null ? void 0 : scrollerRef.current) || null,
      rootMargin: `0px 0px ${window.innerHeight}px 0px`,
      onChange(inView) {
        if (inView) {
          debug$3("footerInView change to visible", inView);
          setTimeout(checkShouldLoadMore);
        }
      }
    });
    const footerInViewRef = useLatest(__footerInView);
    const footer = /* @__PURE__ */ jsx("div", {
      ref: footerRef,
      css: css`
        grid-column: 1 / -1;
        padding: 30px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 120%;
      `,
      children: !refreshing && /* @__PURE__ */ jsx(Fragment, {
        children: hasMore ? /* @__PURE__ */ jsxs(Fragment, {
          children: [/* @__PURE__ */ jsx(IconPark, {
            name: "Loading",
            fill: colorPrimaryValue,
            spin: true,
            size: 40,
            style: {
              marginRight: 10
            }
          }), "加载中~"]
        }) : "没有更多了~"
      })
    });
    const {
      useNarrowMode,
      styleUseCustomGrid
    } = useSettingsSnapshot();
    const gridClassName = clsx(
      APP_CLS_GRID,
      // for customize css
      videoGrid,
      newCardStyle,
      styleUseCustomGrid ? videoGridCustom : videoGridBiliFeed4,
      useNarrowMode && narrowMode,
      // 居中
      className
    );
    const cardBorderCss = useCardBorderCss();
    React__default.useMemo(() => {
      return {
        footerContent: footer,
        containerRef,
        gridClassName
        // renderItem,
      };
    }, [footer, containerRef, gridClassName]);
    if (refreshError) {
      console.error(refreshError.stack || refreshError);
      return /* @__PURE__ */ jsxs("div", {
        css: css`
          font-size: 20px;
          padding: 20px;
          text-align: center;
        `,
        children: [/* @__PURE__ */ jsx("p", {
          children: "出错了, 请刷新重试!"
        }), tab2 === ETab.Hot && hotStore.subtab === EHotSubTab.PopularWeekly && /* @__PURE__ */ jsxs("p", {
          className: "mt-8 flex items-center justify-center",
          children: ["可能需手动输入验证码", /* @__PURE__ */ jsx(OpenExternalLinkIcon, {
            className: "ml-12"
          }), /* @__PURE__ */ jsx("a", {
            href: "https://www.bilibili.com/v/popular/weekly",
            target: "_blank",
            className: "ml-2",
            children: "每周必看"
          })]
        })]
      });
    }
    const _skeleton = refreshing && useSkeleton;
    if (_skeleton) {
      return /* @__PURE__ */ jsx("div", {
        className: videoGridContainer,
        children: /* @__PURE__ */ jsx("div", {
          className: gridClassName,
          children: new Array(28).fill(void 0).map((_, index) => {
            return /* @__PURE__ */ jsx(VideoCard, {
              loading: true,
              className: APP_CLS_CARD
            }, index);
          })
        })
      });
    }
    const renderItem = (item) => {
      if (item.api === EApiType.Separator) {
        return /* @__PURE__ */ jsx(antd.Divider, {
          css: css`
            grid-column: 1 / -1;

            .ant-divider-inner-text {
              display: inline-flex;
              align-items: center;
              min-height: 30px;

              a {
                color: var(--ant-color-link);
                &:hover {
                  color: var(--ant-color-primary);
                }
              }
            }
          `,
          orientation: "left",
          children: item.content
        }, item.uniqId);
      } else {
        const index = usingVideoItems.findIndex((x2) => x2.uniqId === item.uniqId);
        const active = index === activeIndex;
        return /* @__PURE__ */ jsx(VideoCard, {
          className: clsx(APP_CLS_CARD, {
            [APP_CLS_CARD_ACTIVE]: active
          }),
          css: [cardBorderCss, getActiveCardBorderCss(active), "", ""],
          item,
          active,
          onRemoveCurrent: handleRemoveCard,
          onMoveToFirst: handleMoveCardToFirst,
          onRefresh: refresh,
          emitter: videoCardEmitters[index]
        }, item.uniqId);
      }
    };
    return /* @__PURE__ */ jsxs("div", {
      style: {
        minHeight: "100%"
      },
      className: videoGridContainer,
      children: [/* @__PURE__ */ jsx("div", {
        ref: containerRef,
        className: gridClassName,
        children: usingItems.map((item) => renderItem(item))
      }), footer]
    });
  });
  function useSizeExpression(target, fn, initialValue2) {
    const _fn = useMemoizedFn(fn);
    const box = useRefStateBox(initialValue2);
    React__default.useEffect(() => {
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.target === target && entry.contentRect) {
            const val = _fn(entry);
            if (!lodash.isEqual(box.val, val)) {
              box.set(val);
            }
          }
        }
      });
      observer.observe(target);
      return () => {
        observer.disconnect();
      };
    }, [target, _fn]);
    return box.state;
  }
  function useSticky() {
    const stickyRef = React__default.useRef(null);
    const [sticky, setSticky] = React__default.useState(false);
    React__default.useEffect(() => {
      function observe2() {
        if (!stickyRef.current) return;
        const refPageOffset = Math.trunc(stickyRef.current.getBoundingClientRect().top * 10) / 10;
        const stickyOffset = parseInt(getComputedStyle(stickyRef.current).top);
        const stickyActive = refPageOffset <= stickyOffset;
        setSticky(stickyActive);
      }
      observe2();
      document.addEventListener("scroll", observe2);
      window.addEventListener("resize", observe2);
      window.addEventListener("orientationchange", observe2);
      return () => {
        document.removeEventListener("scroll", observe2);
        window.removeEventListener("resize", observe2);
        window.removeEventListener("orientationchange", observe2);
      };
    }, [sticky]);
    return [stickyRef, sticky];
  }
  class TimeoutError2 extends Error {
    constructor(message2) {
      super(message2);
      this.name = "TimeoutError";
    }
  }
  class AbortError extends Error {
    constructor(message2) {
      super();
      this.name = "AbortError";
      this.message = message2;
    }
  }
  const getDOMException = (errorMessage) => globalThis.DOMException === void 0 ? new AbortError(errorMessage) : new DOMException(errorMessage);
  const getAbortedReason = (signal) => {
    const reason = signal.reason === void 0 ? getDOMException("This operation was aborted.") : signal.reason;
    return reason instanceof Error ? reason : getDOMException(reason);
  };
  function pTimeout(promise, options) {
    const {
      milliseconds,
      fallback,
      message: message2,
      customTimers = {
        setTimeout,
        clearTimeout
      }
    } = options;
    let timer;
    const wrappedPromise = new Promise((resolve, reject) => {
      if (typeof milliseconds !== "number" || Math.sign(milliseconds) !== 1) {
        throw new TypeError(`Expected \`milliseconds\` to be a positive number, got \`${milliseconds}\``);
      }
      if (options.signal) {
        const {
          signal
        } = options;
        if (signal.aborted) {
          reject(getAbortedReason(signal));
        }
        signal.addEventListener("abort", () => {
          reject(getAbortedReason(signal));
        });
      }
      if (milliseconds === Number.POSITIVE_INFINITY) {
        promise.then(resolve, reject);
        return;
      }
      const timeoutError = new TimeoutError2();
      timer = customTimers.setTimeout.call(void 0, () => {
        if (fallback) {
          try {
            resolve(fallback());
          } catch (error) {
            reject(error);
          }
          return;
        }
        if (typeof promise.cancel === "function") {
          promise.cancel();
        }
        if (message2 === false) {
          resolve();
        } else if (message2 instanceof Error) {
          reject(message2);
        } else {
          timeoutError.message = message2 ?? `Promise timed out after ${milliseconds} milliseconds`;
          reject(timeoutError);
        }
      }, milliseconds);
      (async () => {
        try {
          resolve(await promise);
        } catch (error) {
          reject(error);
        }
      })();
    });
    const cancelablePromise = wrappedPromise.finally(() => {
      cancelablePromise.clear();
    });
    cancelablePromise.clear = () => {
      customTimers.clearTimeout.call(void 0, timer);
      timer = void 0;
    };
    return cancelablePromise;
  }
  const normalizeEmitter = (emitter2) => {
    const addListener = emitter2.addEventListener || emitter2.on || emitter2.addListener;
    const removeListener = emitter2.removeEventListener || emitter2.off || emitter2.removeListener;
    if (!addListener || !removeListener) {
      throw new TypeError("Emitter is not compatible");
    }
    return {
      addListener: addListener.bind(emitter2),
      removeListener: removeListener.bind(emitter2)
    };
  };
  function pEventMultiple(emitter2, event, options) {
    let cancel;
    const returnValue = new Promise((resolve, reject) => {
      var _a2;
      options = {
        rejectionEvents: ["error"],
        multiArgs: false,
        resolveImmediately: false,
        ...options
      };
      if (!(options.count >= 0 && (options.count === Number.POSITIVE_INFINITY || Number.isInteger(options.count)))) {
        throw new TypeError("The `count` option should be at least 0 or more");
      }
      (_a2 = options.signal) == null ? void 0 : _a2.throwIfAborted();
      const events2 = [event].flat();
      const items = [];
      const {
        addListener,
        removeListener
      } = normalizeEmitter(emitter2);
      const onItem = (...arguments_) => {
        const value = options.multiArgs ? arguments_ : arguments_[0];
        if (options.filter && !options.filter(value)) {
          return;
        }
        items.push(value);
        if (options.count === items.length) {
          cancel();
          resolve(items);
        }
      };
      const rejectHandler = (error) => {
        cancel();
        reject(error);
      };
      cancel = () => {
        for (const event2 of events2) {
          removeListener(event2, onItem);
        }
        for (const rejectionEvent of options.rejectionEvents) {
          removeListener(rejectionEvent, rejectHandler);
        }
      };
      for (const event2 of events2) {
        addListener(event2, onItem);
      }
      for (const rejectionEvent of options.rejectionEvents) {
        addListener(rejectionEvent, rejectHandler);
      }
      if (options.signal) {
        options.signal.addEventListener("abort", () => {
          rejectHandler(options.signal.reason);
        }, {
          once: true
        });
      }
      if (options.resolveImmediately) {
        resolve(items);
      }
    });
    returnValue.cancel = cancel;
    if (typeof options.timeout === "number") {
      const timeout = pTimeout(returnValue, {
        milliseconds: options.timeout
      });
      timeout.cancel = cancel;
      return timeout;
    }
    return returnValue;
  }
  function pEvent(emitter2, event, options) {
    if (typeof options === "function") {
      options = {
        filter: options
      };
    }
    options = {
      ...options,
      count: 1,
      resolveImmediately: false
    };
    const arrayPromise = pEventMultiple(emitter2, event, options);
    const promise = arrayPromise.then((array) => array[0]);
    promise.cancel = arrayPromise.cancel;
    return promise;
  }
  const newSignedForm = (params) => {
    const sign = appSign(params, TVKeyInfo.appkey, TVKeyInfo.appsec);
    return new URLSearchParams({
      ...params,
      sign
    });
  };
  async function getQrCodeInfo() {
    const res = await request.post(
      "https://passport.bilibili.com/x/passport-tv-login/qrcode/auth_code",
      newSignedForm({
        appkey: TVKeyInfo.appkey,
        local_id: "0",
        ts: "0"
      })
      // sign: 'e134154ed6add881d28fbdf68653cd9c',
    );
    const json = res.data;
    if (!isWebApiSuccess(json)) {
      toast((json == null ? void 0 : json.message) || "获取 auth_code 失败");
      return;
    }
    return json.data;
  }
  async function poll(auth_code) {
    const res = await request.post("https://passport.bilibili.com/x/passport-tv-login/qrcode/poll", newSignedForm({
      appkey: TVKeyInfo.appkey,
      auth_code,
      local_id: "0",
      ts: "0"
    }));
    const json = res.data;
    const msgMap = {
      "0": "成功",
      "-3": "API校验密匙错误",
      "-400": "请求错误",
      "-404": "啥都木有",
      "86038": "二维码已失效",
      "86039": "二维码尚未确认",
      "86090": "二维码已扫码未确认"
    };
    if (!isWebApiSuccess(json)) {
      const code = json.code.toString();
      const message2 = json.message || msgMap[code] || "未知错误";
      if (code === "86038") {
        return {
          success: false,
          message: message2,
          action: "refresh"
        };
      }
      if (code === "86039" || code === "86090") {
        return {
          success: false,
          message: message2,
          action: "wait"
        };
      }
      return {
        success: false,
        message: message2,
        action: void 0
      };
    }
    const accessKey = json.data.access_token;
    const accessKeyExpireAt = Date.now() + json.data.expires_in * 1e3;
    return {
      success: true,
      message: "获取成功",
      accessKey,
      accessKeyExpireAt
    };
  }
  const initialValue = {
    show: false,
    qrcodeUrl: "",
    auth_code: "",
    message: ""
  };
  const store = proxy({
    ...initialValue
  });
  const qrcodeStore = store;
  function updateStore(data2) {
    renderOnce$1();
    Object.assign(store, data2);
  }
  function showQrCodeModal(data2) {
    updateStore({
      ...initialValue,
      ...data2,
      show: true
    });
  }
  function hideQrCodeModal() {
    emitter$1.emit("hide");
    updateStore({
      ...initialValue
    });
  }
  const emitter$1 = mitt();
  function whenQrCodeModalHide() {
    return pEvent(emitter$1, "hide");
  }
  function TvQrCodeAuth() {
    const {
      qrcodeUrl,
      show,
      message: message2
    } = useSnapshot(store);
    const onHide2 = hideQrCodeModal;
    useIsDarkMode();
    return /* @__PURE__ */ jsxs(BaseModal, {
      show,
      onHide: onHide2,
      hideWhenMaskOnClick: false,
      hideWhenEsc: false,
      cssModalMask: css`
        backdrop-filter: blur(10px);
      `,
      cssModal: css`
        width: 260px;
        aspect-ratio: 10 / 16;
      `,
      children: [/* @__PURE__ */ jsxs("div", {
        css: BaseModalStyle.modalHeader,
        children: [/* @__PURE__ */ jsx("div", {
          css: BaseModalStyle.modalTitle
        }), /* @__PURE__ */ jsx("div", {
          className: "space",
          style: {
            flex: 1
          }
        }), /* @__PURE__ */ jsx(ModalClose, {
          onClick: onHide2
        })]
      }), /* @__PURE__ */ jsxs("div", {
        css: [BaseModalStyle.modalBody, css`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
          `, "", ""],
        children: [/* @__PURE__ */ jsx("div", {
          css: css`
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 25px;
            margin-bottom: 2px;
          `,
          children: message2 || ""
        }), qrcodeUrl && /* @__PURE__ */ jsx(antd.QRCode, {
          css: css`
              margin: 0 auto;
              margin-bottom: 40px;
              padding: 8px;
              flex-shrink: 0;
            `,
          value: qrcodeUrl,
          size: 200,
          icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/72/9c/b6/729cb6d8-75f5-0a56-0508-3a26cbba69ae/AppIcon-1x_U007emarketing-0-6-0-0-85-220-0.png/230x0w.webp"
        }), /* @__PURE__ */ jsxs("div", {
          className: "footnote",
          css: css`
            font-size: 13px;
          `,
          children: ["打开「哔哩哔哩」或「bilibili」App ", /* @__PURE__ */ jsx("br", {}), "扫码获取 access_key"]
        })]
      })]
    });
  }
  const renderOnce$1 = lodash.once(function render3() {
    const container = document.createElement("div");
    container.classList.add("modal-tv-qrcode-auth", APP_CLS_ROOT);
    document.body.appendChild(container);
    const r2 = createRoot(container);
    r2.render(/* @__PURE__ */ jsx(AntdApp, {
      children: /* @__PURE__ */ jsx(TvQrCodeAuth, {})
    }));
  });
  async function refreshQrCode() {
    const qrinfo = await getQrCodeInfo();
    if (!qrinfo) return;
    showQrCodeModal({
      qrcodeUrl: qrinfo.url,
      auth_code: qrinfo.auth_code
    });
    return true;
  }
  async function getAccessKeyByQrCode() {
    const next2 = await refreshQrCode();
    if (!next2) return;
    let res;
    let pollfor = qrcodeStore.auth_code;
    function shouldBreak() {
      if (!qrcodeStore.show) return true;
      if (!qrcodeStore.auth_code) return true;
      if (pollfor !== qrcodeStore.auth_code) return true;
    }
    while (true) {
      if (shouldBreak()) return;
      const p1 = delay(1500);
      const p2 = whenQrCodeModalHide();
      await Promise.race([p1, p2]);
      p2.cancel();
      if (shouldBreak()) return;
      if (shouldBreak()) return;
      res = await poll(qrcodeStore.auth_code);
      const {
        success,
        accessKey,
        accessKeyExpireAt,
        message: message2,
        action: action2
      } = res;
      if (shouldBreak()) return;
      updateStore({
        message: message2
      });
      if (success) {
        await delay(1e3);
        hideQrCodeModal();
        return {
          accessKey,
          accessKeyExpireAt
        };
      }
      if (action2 === "refresh") {
        if (shouldBreak()) return;
        await delay(2e3);
        if (shouldBreak()) return;
        await refreshQrCode();
        pollfor = qrcodeStore.auth_code;
        updateStore({
          message: "已刷新二维码"
        });
        continue;
      }
      if (action2 === "wait") {
        continue;
      }
      if (shouldBreak()) return;
      updateStore({
        message: message2
      });
      toast(message2);
      return;
    }
  }
  async function getAccessKey() {
    const {
      accessKey,
      accessKeyExpireAt
    } = await getAccessKeyByQrCode() || {};
    if (!accessKey || !accessKeyExpireAt) return;
    settings.accessKey = accessKey;
    settings.accessKeyExpireAt = accessKeyExpireAt;
    toast("获取成功");
  }
  function deleteAccessKey() {
    settings.accessKey = "";
    settings.accessKeyExpireAt = 0;
    toast("已删除 access_key");
  }
  const btnAccessKeyHelpLink = /* @__PURE__ */ jsx(antd.Button, {
    target: "_blank",
    href: "https://github.com/indefined/UserScripts/tree/master/bilibiliHome#%E6%8E%88%E6%9D%83%E8%AF%B4%E6%98%8E",
    children: "access_key 说明"
  });
  function AccessKeyManage({
    style,
    className
  }) {
    const {
      runAsync,
      loading
    } = useRequest(getAccessKey, {
      manual: true
    });
    const {
      accessKey
    } = useSettingsSnapshot();
    const onDeleteAccessKey = deleteAccessKey;
    return /* @__PURE__ */ jsx(antd.Space, {
      size: "small",
      style,
      className,
      children: !accessKey ? /* @__PURE__ */ jsxs(Fragment, {
        children: [/* @__PURE__ */ jsx(antd.Button, {
          onClick: runAsync,
          disabled: loading,
          children: "获取 access_key"
        }), btnAccessKeyHelpLink]
      }) : /* @__PURE__ */ jsxs(Fragment, {
        children: [/* @__PURE__ */ jsx(antd.Button, {
          onClick: runAsync,
          disabled: loading,
          children: "重新获取 access_key"
        }), /* @__PURE__ */ jsx(antd.Button, {
          onClick: onDeleteAccessKey,
          children: "删除 access_key"
        }), btnAccessKeyHelpLink]
      })
    });
  }
  const headerState = proxy({
    modalFeedVisible: false,
    modalSettingsVisible: false
  });
  function useHeaderState() {
    return useSnapshot(headerState);
  }
  const RefreshButton = React__default.forwardRef(function({
    onRefresh,
    className = "",
    style,
    refreshHotkeyEnabled,
    refreshing
  }, ref) {
    refreshHotkeyEnabled ?? (refreshHotkeyEnabled = true);
    React__default.useState(0);
    const btn = React__default.useRef(null);
    const click = useMemoizedFn(() => {
      if (!btn.current) return;
      if (btn.current.disabled) return;
      btn.current.click();
    });
    React__default.useImperativeHandle(ref, () => ({
      click
    }), []);
    useKeyPress("r", () => {
      if (shouldDisableShortcut()) return;
      if (!refreshHotkeyEnabled) return;
      click();
    }, {
      exactMatch: true
    });
    const tab2 = useCurrentUsingTab();
    const {
      shuffleForFav,
      shuffleForWatchLater,
      shuffleForPopularWeekly
    } = useSettingsSnapshot();
    const text = tab2 === ETab.DynamicFeed || tab2 === ETab.Watchlater && !shuffleForWatchLater || tab2 === ETab.Fav && !shuffleForFav || tab2 === ETab.Hot && !isHotTabUsingShuffle(shuffleForPopularWeekly) || tab2 === ETab.Live ? "刷新" : "换一换";
    const [scope, animate] = framerMotion.useAnimate();
    const onClick = useMemoizedFn((e2) => {
      animate(scope.current, {
        rotate: [0, 360]
      }, {
        duration: 0.5,
        type: "tween"
      });
      return onRefresh == null ? void 0 : onRefresh();
    });
    return /* @__PURE__ */ jsxs(antd.Button, {
      disabled: refreshing,
      className,
      style,
      css: [antdCustomCss.button, css`
          gap: 0;
          &.ant-btn:not(:disabled):focus-visible {
            outline: none;
          }
        `, "", ""],
      ref: btn,
      onClick,
      children: [/* @__PURE__ */ jsx("svg", {
        ref: scope,
        style: {
          width: "11px",
          height: "11px",
          marginRight: 5
        },
        children: /* @__PURE__ */ jsx("use", {
          href: "#widget-roll"
        })
      }), /* @__PURE__ */ jsx("span", {
        children: text
      })]
    });
  });
  const CollapseBtn = React__default.forwardRef(function CollapseBtn2({
    children,
    initialOpen = false
  }, ref) {
    const [buttonsExpanded, buttonsExpandedActions] = useToggle(initialOpen);
    React__default.useImperativeHandle(ref, () => buttonsExpandedActions, [buttonsExpandedActions]);
    const btn = /* @__PURE__ */ jsx("button", {
      onClick: buttonsExpandedActions.toggle,
      className: "primary-btn",
      css: css`
        padding: 0;
        width: 31px;
        height: 31px;
        border-radius: 50%;

        body.dark & {
          color: #eee !important;
          border-color: transparent !important;
          background-color: #333 !important;
          &:hover {
            background-color: #555 !important;
          }
        }
      `,
      children: /* @__PURE__ */ jsx("svg", {
        css: [css`
            width: 13px;
            height: 13px;
            transform: rotateZ(180deg);
          `, buttonsExpanded && css`
              transform: rotateZ(0deg);
            `, "", ""],
        children: /* @__PURE__ */ jsx("use", {
          href: "#widget-arrow"
        })
      })
    });
    return /* @__PURE__ */ jsxs(Fragment, {
      children: [btn, buttonsExpanded && children]
    });
  });
  const S$2 = {
    modalMask: (narrowMode2) => [narrowMode2 && css`
        background-color: rgba(0, 0, 0, 0.9);
      `],
    modal: (narrowMode2, fullScreenMode) => [css`
      width: calc(100vw - 30px);
      height: calc(100vh - 30px);
      max-height: unset;
      padding-right: 0; // 滚动条右移
    `, narrowMode2 && css`
        /* $card-width: 283px; */
        width: ${325 * 2 + 40}px;
        height: calc(100vh - 10px);

        border: none;
        :global(body.dark) & {
          border: none;
        }
      `, fullScreenMode && css`
        width: 100vw;
        height: 100vh;
        // border-radius: 20px;
        // overflow: hidden;
        // box-shadow: 0px 0px 9px 4px vars.$app-color-primary;
      `],
    // 滚动条右移
    modalHeader: css`
    padding-right: 15px;
  `,
    modalBody: css`
    padding-right: 15px;
  `,
    btnRefresh: css`
    body.dark & {
      color: #eee !important;
      background-color: #333 !important;
      border-color: transparent !important;
      height: auto;
      padding: 8px 12px;
      line-height: 16px;
      font-size: 13px;
    }
  `
  };
  const ModalFeed = React__default.memo(function ModalFeed2({
    show,
    onHide: onHide2
  }) {
    const scrollerRef = React__default.useRef(null);
    const recGridRef = React__default.useRef(null);
    const {
      // 双列模式
      useNarrowMode,
      // 全屏模式
      modalFeedFullScreen
    } = useSettingsSnapshot();
    const useFullScreen = !useNarrowMode && modalFeedFullScreen;
    const dark = useIsDarkMode();
    const modalBorderCss = React__default.useMemo(() => {
      if (useFullScreen) {
        return css`
        border: 5px solid ${colorPrimaryValue};
      `;
      } else if (dark) {
        return css`
        border: 1px solid ${colorPrimaryValue};
      `;
      }
    }, [dark, useFullScreen]);
    const onRefresh = useMemoizedFn((...args) => {
      var _a2;
      return (_a2 = recGridRef.current) == null ? void 0 : _a2.refresh(...args);
    });
    const [extraInfo, setExtraInfo] = React__default.useState(null);
    const onScrollToTop = useMemoizedFn(() => {
      if (scrollerRef.current) {
        scrollerRef.current.scrollTop = 0;
      }
    });
    const [refreshing, setRefreshing] = React__default.useState(false);
    return /* @__PURE__ */ jsx(BaseModal, {
      ...{
        show,
        onHide: onHide2
      },
      cssModalMask: S$2.modalMask(useNarrowMode),
      cssModal: [S$2.modal(useNarrowMode, useFullScreen), modalBorderCss],
      children: /* @__PURE__ */ jsxs(OnRefreshContext.Provider, {
        value: onRefresh,
        children: [/* @__PURE__ */ jsxs("div", {
          css: [BaseModalStyle.modalHeader, S$2.modalHeader, css`
              display: flex;
              align-items: center;
              justify-content: space-between;
              column-gap: 20px;
            `, "", ""],
          children: [/* @__PURE__ */ jsxs("div", {
            className: "left",
            css: css`
              flex-shrink: 1;
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              row-gap: 4px;
              column-gap: 15px;
            `,
            children: [/* @__PURE__ */ jsx(VideoSourceTab, {
              onRefresh
            }), extraInfo]
          }), /* @__PURE__ */ jsxs("div", {
            className: "right",
            css: css`
              display: flex;
              align-items: center;
              flex-shrink: 0;
            `,
            children: [useNarrowMode ? null : useFullScreen ? /* @__PURE__ */ jsx(ModalFeedConfigChecks, {}) : /* @__PURE__ */ jsx(CollapseBtn, {
              initialOpen: true,
              children: /* @__PURE__ */ jsx(ModalFeedConfigChecks, {})
            }), /* @__PURE__ */ jsx(RefreshButton, {
              css: css`
                ${S$2.btnRefresh}
                margin-left: 8px;
              `,
              refreshing,
              onRefresh,
              refreshHotkeyEnabled: show
            }), /* @__PURE__ */ jsx(ModalClose, {
              onClick: onHide2
            })]
          })]
        }), /* @__PURE__ */ jsx("div", {
          css: [BaseModalStyle.modalBody, S$2.modalBody, "", ""],
          ref: scrollerRef,
          children: /* @__PURE__ */ jsx(RecGrid, {
            ref: recGridRef,
            shortcutEnabled: show,
            onScrollToTop,
            infiteScrollUseWindow: false,
            scrollerRef,
            setRefreshing,
            setExtraInfo
          })
        })]
      })
    });
  });
  function ModalFeedConfigChecks() {
    const inModalFeedStyle = css`
    margin-left: 5px;
  `;
    return /* @__PURE__ */ jsxs(Fragment, {
      children: [/* @__PURE__ */ jsx(CheckboxSettingItem, {
        configKey: "showModalFeedOnLoad",
        label: "自动查看更多",
        tooltip: "打开首页时默认打开推荐弹窗",
        css: inModalFeedStyle,
        extraAction: (val) => {
          if (val) {
            AntdMessage.success("已开启自动查看更多: 下次打开首页时将直接展示推荐弹窗");
          }
        }
      }), /* @__PURE__ */ jsx(CheckboxSettingItem, {
        configKey: "modalFeedFullScreen",
        label: "全屏",
        tooltip: "世界清净了~",
        css: inModalFeedStyle
      })]
    });
  }
  const iconParkOutlineReturn = (props) => /* @__PURE__ */ jsx("svg", {
    viewBox: "0 0 48 48",
    width: "1.2em",
    height: "1.2em",
    ...props,
    children: /* @__PURE__ */ jsxs("g", {
      fill: "none",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 4,
      children: [/* @__PURE__ */ jsx("path", {
        d: "m13 8l-7 6l7 7"
      }), /* @__PURE__ */ jsx("path", {
        d: "M6 14h22.994c6.883 0 12.728 5.62 12.996 12.5c.284 7.27-5.723 13.5-12.996 13.5H11.998"
      })]
    })
  });
  const S$1 = {
    settingsGroup: css`
    margin-bottom: 10px;
  `,
    settingsGroupTitle: css`
    font-size: 2em;
    display: flex;
    align-items: center;
  `,
    settingsGroupSubTitle: css`
    font-size: 1.3em;
    display: flex;
    align-items: center;
    margin-top: 15px;
  `,
    settingsGroupContent: css`
    color: default;
    button:first-child {
      margin-left: 0;
    }
  `
  };
  function SettingsGroup({
    children,
    title,
    titleCss,
    ...rest
  }) {
    return /* @__PURE__ */ jsxs("div", {
      css: S$1.settingsGroup,
      "data-as": "settings-group",
      ...rest,
      children: [/* @__PURE__ */ jsx("div", {
        css: [S$1.settingsGroupTitle, titleCss, "", ""],
        "data-as": "settings-group-title",
        children: title
      }), /* @__PURE__ */ jsx("div", {
        css: S$1.settingsGroupContent,
        "data-as": "settings-group-content",
        children: /* @__PURE__ */ jsx(antd.Space, {
          size: 5,
          direction: "vertical",
          className: "flex",
          children
        })
      })]
    });
  }
  function resetPartialSettings(keys) {
    updateSettings(structuredClone(lodash.pick(initialSettings, keys)));
  }
  function ResetPartialSettingsButton({
    keys,
    className
  }) {
    return /* @__PURE__ */ jsx(antd.Popconfirm, {
      title: "确定重置下面的设置项?",
      onConfirm: () => resetPartialSettings(keys),
      children: /* @__PURE__ */ jsxs(antd.Button, {
        className,
        css: [antdCustomCss.button, css`
            column-gap: 4px;
          `, "", ""],
        children: [/* @__PURE__ */ jsx(iconParkOutlineReturn, {
          ...size(12),
          css: C.mt(-1)
        }), /* @__PURE__ */ jsx("span", {
          children: "重置"
        })]
      })
    });
  }
  function onResetSettings() {
    resetSettings();
    return toastAndReload();
  }
  async function onRestoreSettings() {
    const remoteSettings = await articleDraft.getData();
    const pickedSettings = lodash.omit(lodash.pick(remoteSettings || {}, allowedSettingsKeys), restoreOmitKeys);
    const len = Object.keys(pickedSettings).length;
    if (!len) {
      return AntdMessage.error("备份不存在或没有有效的配置");
    }
    set_HAS_RESTORED_SETTINGS(true);
    updateSettings(pickedSettings);
    return toastAndReload();
  }
  function TabPaneAdvance() {
    const {
      autoPreviewUpdateInterval
    } = useSettingsSnapshot();
    return /* @__PURE__ */ jsxs("div", {
      className: styles$1.tabPane,
      children: [/* @__PURE__ */ jsx(SettingsGroup, {
        title: "设置项",
        children: /* @__PURE__ */ jsx(antd.Popconfirm, {
          title: "确定",
          description: "确定恢复默认设置? 该操作不可逆!",
          onConfirm: onResetSettings,
          children: /* @__PURE__ */ jsx(antd.Button, {
            danger: true,
            type: "primary",
            children: "恢复默认设置"
          })
        })
      }), /* @__PURE__ */ jsxs(SettingsGroup, {
        title: "备份/恢复",
        children: [/* @__PURE__ */ jsxs("div", {
          css: flexVerticalCenterStyle,
          children: [/* @__PURE__ */ jsx(CheckboxSettingItem, {
            configKey: "backupSettingsToArticleDraft",
            label: "备份设置到专栏草稿箱中",
            tooltip: `专栏 - 草稿箱 - ${APP_NAME}`
          }), /* @__PURE__ */ jsxs("a", {
            style: {
              marginLeft: 15,
              display: "inline-flex",
              alignItems: "center"
            },
            href: "https://member.bilibili.com/platform/upload/text/draft",
            target: "_blank",
            children: [/* @__PURE__ */ jsx(OpenExternalLinkIcon, {
              css: [C.size(16), C.mr(4), "", ""]
            }), "去草稿箱浏览"]
          })]
        }), /* @__PURE__ */ jsx(antd.Popconfirm, {
          title: "确定",
          description: "将覆盖本地设置? 该操作不可逆!",
          onConfirm: onRestoreSettings,
          children: /* @__PURE__ */ jsx(antd.Button, {
            danger: true,
            type: "primary",
            children: "从专栏草稿箱中恢复"
          })
        })]
      }), /* @__PURE__ */ jsxs(SettingsGroup, {
        titleCss: css`
          justify-content: space-between;
        `,
        title: /* @__PURE__ */ jsxs(Fragment, {
          children: ["预览", /* @__PURE__ */ jsx(ResetPartialSettingsButton, {
            keys: ["autoPreviewUpdateInterval", "autoPreviewUseContinuousProgress"]
          })]
        }),
        children: [/* @__PURE__ */ jsxs("div", {
          css: flexVerticalCenterStyle,
          children: ["自动预览更新间隔", /* @__PURE__ */ jsx(antd.Slider, {
            style: {
              flex: 1,
              margin: "0 15px"
            },
            min: 0,
            max: 1e3,
            keyboard: true,
            onChange: (val) => settings.autoPreviewUpdateInterval = val,
            value: autoPreviewUpdateInterval
          }), /* @__PURE__ */ jsxs("span", {
            style: {
              width: "65px"
            },
            children: ["(", autoPreviewUpdateInterval, "ms)"]
          })]
        }), /* @__PURE__ */ jsx(CheckboxSettingItem, {
          configKey: "autoPreviewUseContinuousProgress",
          label: "自动预览: 使用连续式进度条",
          tooltip: /* @__PURE__ */ jsxs(Fragment, {
            children: ["✅ 连续式进度条", /* @__PURE__ */ jsx("br", {}), "❎ 跳跃式进度条"]
          })
        })]
      })]
    });
  }
  function TabPaneBasic() {
    const {
      videoLinkOpenMode
    } = useSettingsSnapshot();
    const openModeOptions = React__default.useMemo(() => {
      return Object.values(VideoLinkOpenMode).filter((mode) => VideoLinkOpenModeConfig[mode].enabled ?? true).map((mode) => {
        const config = VideoLinkOpenModeConfig[mode];
        return {
          config,
          value: mode,
          label: /* @__PURE__ */ jsxs("span", {
            css: css`
                display: flex;
                align-items: center;
                .label {
                  margin-left: 8px;
                }
              `,
            children: [config.icon, /* @__PURE__ */ jsx("span", {
              className: "label",
              children: config.label
            })]
          })
        };
      });
    }, []);
    return /* @__PURE__ */ jsxs("div", {
      className: styles$1.tabPane,
      children: [/* @__PURE__ */ jsx(SettingsGroup, {
        title: /* @__PURE__ */ jsxs(Fragment, {
          children: [/* @__PURE__ */ jsx(TabIcon, {
            tabKey: ETab.RecommendApp,
            size: 30,
            mr: 5
          }), " 推荐 access_key", /* @__PURE__ */ jsxs(HelpInfo, {
            iconProps: {
              name: "Help",
              size: 18,
              style: {
                marginTop: 6,
                marginLeft: 5
              }
            },
            children: [/* @__PURE__ */ jsxs("span", {
              css: inlineFlexVerticalCenterStyle,
              children: ["用于「", /* @__PURE__ */ jsx(TabIcon, {
                tabKey: ETab.RecommendApp,
                mr: 5
              }), "推荐」Tab"]
            }), /* @__PURE__ */ jsx("br", {}), "用于 获取推荐 / 提交不喜欢等操作"]
          })]
        }),
        children: /* @__PURE__ */ jsx(AccessKeyManage, {})
      }), /* @__PURE__ */ jsx(SettingsGroup, {
        title: "开关",
        children: /* @__PURE__ */ jsxs(antd.Space, {
          size: 10,
          wrap: true,
          children: [/* @__PURE__ */ jsx(CheckboxSettingItem, {
            configKey: "pureRecommend",
            label: "全屏模式",
            tooltip: /* @__PURE__ */ jsxs(Fragment, {
              children: ["清空自带推荐内容, 只显示脚本推荐", /* @__PURE__ */ jsx("br", {}), "P.S 需要刷新网页~", /* @__PURE__ */ jsx("br", {}), "P.S 之前版本称 (纯推荐模式)"]
            }),
            extraAction: toastAndReload
          }), /* @__PURE__ */ jsx(CheckboxSettingItem, {
            configKey: "useNarrowMode",
            label: "居中模式",
            tooltip: /* @__PURE__ */ jsxs(Fragment, {
              children: ["居中两列", /* @__PURE__ */ jsx("br", {}), "切换设置快捷键: ", /* @__PURE__ */ jsx(antd.Tag, {
                color: "green",
                children: "shift+c"
              })]
            })
          }), /* @__PURE__ */ jsx(CheckboxSettingItem, {
            configKey: "showModalFeedOnLoad",
            label: "自动「查看更多」",
            tooltip: "打开首页时自动打开「查看更多」弹窗",
            extraAction: (val) => {
              if (val) {
                AntdMessage.success("已开启自动「查看更多」: 下次打开首页时将自动打开「查看更多」弹窗");
              }
            }
          }), /* @__PURE__ */ jsx(CheckboxSettingItem, {
            configKey: "showModalFeedEntry",
            label: "「查看更多」按钮",
            tooltip: "是否展示「查看更多」按钮"
          })]
        })
      }), /* @__PURE__ */ jsx(SettingsGroup, {
        title: "视频链接",
        children: /* @__PURE__ */ jsxs("div", {
          css: flexVerticalCenterStyle,
          children: ["默认打开模式", /* @__PURE__ */ jsxs(HelpInfo, {
            tooltipProps: {
              color: "rgba(0, 0, 0, 0.85)"
            },
            children: ["选择点击视频(封面图片 或 标题)时打开的模式 ", /* @__PURE__ */ jsx("br", {}), openModeOptions.map(({
              value,
              config
            }) => {
              return !!config.desc && /* @__PURE__ */ jsxs("div", {
                css: css`
                      display: flex;
                      align-items: flex-start;
                      margin-top: 10px;
                      &:first-child {
                        margin-top: 0;
                      }
                      .label {
                        display: inline-flex;
                        align-items: center;
                        .text {
                          min-width: 95px;
                          margin-left: 4px;
                          margin-right: 10px;
                        }
                      }
                    `,
                children: [/* @__PURE__ */ jsxs("span", {
                  className: "label",
                  children: [config.icon, /* @__PURE__ */ jsx("span", {
                    className: "text",
                    children: config.label
                  })]
                }), /* @__PURE__ */ jsx("span", {
                  className: "desc",
                  children: config.desc
                })]
              }, value);
            })]
          }), /* @__PURE__ */ jsx(antd.Select, {
            css: css`
              width: 160px;
              margin-left: 8px;
            `,
            options: openModeOptions,
            value: videoLinkOpenMode,
            onChange: (v2) => {
              updateSettings({
                videoLinkOpenMode: v2
              });
            }
          })]
        })
      }), /* @__PURE__ */ jsx(SettingsGroup, {
        title: "预览",
        children: /* @__PURE__ */ jsxs(antd.Space, {
          size: 10,
          children: [/* @__PURE__ */ jsx(CheckboxSettingItem, {
            configKey: "autoPreviewWhenKeyboardSelect",
            label: "键盘选中后自动开始预览",
            tooltip: /* @__PURE__ */ jsxs(Fragment, {
              children: ["手动预览快捷键: ", /* @__PURE__ */ jsx(antd.Tag, {
                color: "green",
                children: "."
              }), " or ", /* @__PURE__ */ jsx(antd.Tag, {
                color: "green",
                children: "p"
              }), /* @__PURE__ */ jsx("br", {}), "切换设置快捷键: ", /* @__PURE__ */ jsx(antd.Tag, {
                color: "green",
                children: "shift+p"
              })]
            })
          }), /* @__PURE__ */ jsx(CheckboxSettingItem, {
            configKey: "autoPreviewWhenHover",
            label: "鼠标悬浮后自动开始预览",
            tooltip: /* @__PURE__ */ jsxs(Fragment, {
              children: ["鼠标悬浮后自动开始预览, 预览不再跟随鼠标位置 ", /* @__PURE__ */ jsx("br", {}), "切换设置快捷键: ", /* @__PURE__ */ jsx(antd.Tag, {
                color: "green",
                children: "shift+m"
              })]
            })
          }), /* @__PURE__ */ jsx(CheckboxSettingItem, {
            configKey: "startPlayFromPreviewPoint",
            label: "从预览处开始播放",
            tooltip: /* @__PURE__ */ jsxs(Fragment, {
              children: ["视频链接会附加", /* @__PURE__ */ jsx(antd.Tag, {
                color: "green",
                className: "m-inline-4",
                children: "t=val"
              }), "参数, 从", /* @__PURE__ */ jsx(antd.Tag, {
                className: "m-inline-4",
                color: "green-inverse",
                children: "t"
              }), "秒开始播放"]
            })
          })]
        })
      }), /* @__PURE__ */ jsx(SettingsGroup, {
        title: /* @__PURE__ */ jsxs(Fragment, {
          children: ["帮助", /* @__PURE__ */ jsxs("span", {
            css: css`
                margin-left: 8px;
                margin-right: 4px;
                font-size: 14px;
                position: relative;
                top: 4px;
              `,
            children: ["(当前版本: v", "0.24.10", ")"]
          }), /* @__PURE__ */ jsx(IconPark, {
            name: "Copy",
            size: 16,
            onClick: () => {
              const content = `v${"0.24.10"}`;
              GM.setClipboard(content);
              AntdMessage.success(`已复制当前版本: ${content}`);
            },
            css: css`
                position: relative;
                top: 4px;
                cursor: pointer;
              `
          })]
        }),
        children: /* @__PURE__ */ jsxs(antd.Space, {
          size: 10,
          wrap: true,
          children: [/* @__PURE__ */ jsx(antd.Button, {
            href: "https://github.com/magicdawn/bilibili-app-recommend",
            target: "_blank",
            children: "GitHub 主页"
          }), /* @__PURE__ */ jsx(antd.Button, {
            href: "https://greasyfork.org/zh-CN/scripts/443530-bilibili-app-recommend",
            target: "_blank",
            children: "GreasyFork 主页"
          }), /* @__PURE__ */ jsx(antd.Button, {
            href: "https://github.com/magicdawn/bilibili-app-recommend#%E5%BF%AB%E6%8D%B7%E9%94%AE%E8%AF%B4%E6%98%8E",
            target: "_blank",
            children: "查看可用的快捷键"
          }), /* @__PURE__ */ jsx(antd.Button, {
            href: "https://github.com/magicdawn/bilibili-app-recommend/releases",
            target: "_blank",
            children: "更新日志"
          }), /* @__PURE__ */ jsx(antd.Button, {
            href: "https://afdian.com/a/magicdawn",
            target: "_blank",
            children: "用 ❤️ 发电"
          })]
        })
      })]
    });
  }
  const borderCycleList = [
    {
      styleUseCardBorder: false
    },
    // no border
    {
      styleUseCardBorder: true,
      styleUseCardBorderOnlyOnHover: true
    },
    // on hover
    {
      styleUseCardBorder: true,
      styleUseCardBorderOnlyOnHover: false
    }
    // always
  ];
  const borderCycleListLabels = ["「卡片边框」: 已禁用", "「卡片边框」: 只在悬浮时展示", "「卡片边框」: 总是展示"];
  function useHotkeyForConfigBorder() {
    return useKeyPress(["shift.b"], (e2) => {
      if (shouldDisableShortcut()) return;
      const curState = pick(settings, ["styleUseCardBorder", "styleUseCardBorderOnlyOnHover"]);
      const curIndex = borderCycleList.findIndex((state) => {
        return lodash.isEqual(state, pick(curState, Object.keys(state)));
      });
      if (curIndex === -1) throw new Error("unexpected curIndex = -1");
      const nextIndex = (curIndex + 1) % borderCycleList.length;
      const nextState = borderCycleList[nextIndex];
      Object.assign(settings, nextState);
      const nextLabel = borderCycleListLabels[nextIndex];
      AntdMessage.success(nextLabel);
    }, {
      exactMatch: true
    });
  }
  function TabPaneCustomUI() {
    const {
      styleUseCardBorder
    } = useSettingsSnapshot();
    return /* @__PURE__ */ jsxs("div", {
      className: styles$1.tabPane,
      children: [/* @__PURE__ */ jsxs(SettingsGroup, {
        title: "样式自定义",
        children: [/* @__PURE__ */ jsx(CheckboxSettingItem, {
          configKey: "styleUseStandardVideoSourceTab",
          label: "推荐 Tab: 按钮使用标准高度",
          tooltip: "默认紧凑高度"
        }), /* @__PURE__ */ jsx(CheckboxSettingItem, {
          configKey: "styleUseStickyTabbarInPureRecommend",
          label: "全屏模式: sticky tab bar",
          tooltip: /* @__PURE__ */ jsxs(Fragment, {
            children: ["默认勾选: Tab 栏会吸附在顶栏下方", /* @__PURE__ */ jsx("br", {}), "取消选中: Tab 栏会随页面一起滚动"]
          })
        }), /* @__PURE__ */ jsx(CheckboxSettingItem, {
          configKey: "styleUseCustomGrid",
          label: "全屏模式: 使用自定义网格配置",
          tooltip: /* @__PURE__ */ jsxs(Fragment, {
            children: ["网格配置指: 网格宽度, 间距, 列数等.", /* @__PURE__ */ jsx("br", {}), "自定义网格配置: 宽度为90%; 可跟随 Bilibili-Evolved 自定义顶栏配置; 列数: 4列 - 10列;", " ", APP_NAME, " 自定义;", /* @__PURE__ */ jsx("br", {}), "默认网格配置: bili-feed4 首页使用的网格配置"]
          })
        }), /* @__PURE__ */ jsx(CheckboxSettingItem, {
          configKey: "styleUseWhiteBackground",
          label: "全屏模式: styleUseWhiteBackground"
        })]
      }), /* @__PURE__ */ jsxs(SettingsGroup, {
        title: /* @__PURE__ */ jsxs(Fragment, {
          children: ["视频卡片", /* @__PURE__ */ jsx(ResetPartialSettingsButton, {
            css: [C.ml(10), "", ""],
            keys: ["styleUseCardBorder", "styleUseCardBorderOnlyOnHover", "styleUseCardBoxShadow", "useDelayForHover"]
          })]
        }),
        children: [/* @__PURE__ */ jsxs("div", {
          css: flexVerticalCenterStyle,
          children: [/* @__PURE__ */ jsx(CheckboxSettingItem, {
            configKey: "styleUseCardBorder",
            label: "使用边框",
            tooltip: /* @__PURE__ */ jsxs(Fragment, {
              children: ["使用边框后, 整个卡片区域可点击 / 可触发预览 / 可使用右键菜单 ", /* @__PURE__ */ jsx("br", {}), "否则只是封面区域可以 ", /* @__PURE__ */ jsx("br", {}), "使用快捷键 ", /* @__PURE__ */ jsx(antd.Tag, {
                color: "green",
                children: "shift+b"
              }), " 切换状态", /* @__PURE__ */ jsx("br", {}), borderCycleListLabels.map((label) => /* @__PURE__ */ jsx(antd.Tag, {
                color: "success",
                children: label
              }, label))]
            })
          }), /* @__PURE__ */ jsx(SwitchSettingItem, {
            size: "small",
            configKey: "styleUseCardBorderOnlyOnHover",
            checkedChildren: "只在悬浮时展示",
            unCheckedChildren: "总是展示",
            disabled: !styleUseCardBorder
          })]
        }), /* @__PURE__ */ jsx(CheckboxSettingItem, {
          configKey: "styleUseCardBoxShadow",
          disabled: !styleUseCardBorder,
          label: "使用主题色阴影(border & box-shadow)",
          tooltip: /* @__PURE__ */ jsxs(Fragment, {
            children: ["如果你觉得太花哨, 可以关掉", /* @__PURE__ */ jsx("br", {}), "✅ 使用主题色作为 box-shadow", /* @__PURE__ */ jsx("br", {}), "❎ no box-shadow, 卡片的背景色会略微改变标识高亮"]
          })
        }), /* @__PURE__ */ jsx(CheckboxSettingItem, {
          configKey: "useDelayForHover",
          label: "延迟悬浮预览",
          tooltip: /* @__PURE__ */ jsx(Fragment, {
            children: "延迟悬浮预览"
          })
        })]
      })]
    });
  }
  const iconParkOutlineCloseSmall = (props) => /* @__PURE__ */ jsx("svg", {
    viewBox: "0 0 48 48",
    width: "1.2em",
    height: "1.2em",
    ...props,
    children: /* @__PURE__ */ jsx("path", {
      fill: "none",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 4,
      d: "m14 14l20 20m-20 0l20-20"
    })
  });
  const {
    Search
  } = antd.Input;
  function EditableListSettingItem({
    configKey,
    searchProps,
    disabled
  }) {
    let list = useSettingsSnapshot()[configKey];
    list = React__default.useMemo(() => lodash.uniq(list), [list]);
    return /* @__PURE__ */ jsxs(Fragment, {
      children: [/* @__PURE__ */ jsx(Search, {
        css: css`
          margin-top: 5px;
          margin-bottom: 5px;
        `,
        enterButton: "添加",
        allowClear: true,
        disabled,
        ...searchProps,
        onSearch: (val, e2) => {
          var _a2;
          if (!val) return;
          const set = /* @__PURE__ */ new Set([...settings[configKey]]);
          if (!set.has(val)) {
            set.add(val);
          } else {
            AntdMessage.warning(`${val} 已存在`);
          }
          updateSettings({
            [configKey]: Array.from(set)
          });
          if (e2 == null ? void 0 : e2.target) {
            const el = e2.target;
            const clearBtn = (_a2 = el.closest(".ant-input-wrapper")) == null ? void 0 : _a2.querySelector(".ant-input-clear-icon");
            clearBtn == null ? void 0 : clearBtn.click();
          }
        }
      }), /* @__PURE__ */ jsx("div", {
        css: [css`
            min-height: 82px;
            border-radius: 6px;
            border: 1px solid #eee;
            margin-top: 3px;
            body.dark & {
              border-color: #333;
            }
          `, disabled && css`
              color: var(--ant-color-text-disabled);
              background-color: var(--ant-color-bg-container-disabled);
              border-color: var(--ant-color-border);
              box-shadow: none;
              opacity: 1;
              pointer-events: none;
              cursor: not-allowed;
            `, "", ""],
        children: list.length ? /* @__PURE__ */ jsx("div", {
          css: css`
              display: flex;
              flex-wrap: wrap;
              padding: 5px;
              gap: 5px 10px;
              align-items: flex-start;
            `,
          children: list.map((t2) => {
            return /* @__PURE__ */ jsx(TagItemDisplay, {
              tag: t2,
              enableDragging: false,
              onDelete: (tag) => {
                const s2 = /* @__PURE__ */ new Set([...settings[configKey]]);
                s2.delete(tag);
                updateSettings({
                  [configKey]: Array.from(s2)
                });
              }
            }, t2);
          })
        }) : /* @__PURE__ */ jsx(antd.Empty, {
          image: antd.Empty.PRESENTED_IMAGE_SIMPLE,
          description: "空空如也",
          css: css`
              &.ant-empty-normal {
                margin-block: 5px;
              }
            `
        })
      })]
    });
  }
  const TagItemDisplay = React__default.forwardRef(({
    tag,
    enableDragging = true,
    dragging,
    className,
    onDelete,
    ...restProps
  }, ref) => {
    return /* @__PURE__ */ jsxs("div", {
      ...restProps,
      ref,
      className: clsx(className, {
        dragging
      }),
      css: [css`
          border-radius: 5px;
          padding: 2px 15px;
          position: relative;
          border: 1px solid #ddd;
          body.dark & {
            border-color: #333;
          }

          display: inline-flex;
          align-items: center;

          &:hover,
          &.dragging {
            border-color: ${colorPrimaryValue};
            color: ${colorPrimaryValue};
            .anticon {
              visibility: visible;
            }
          }

          &.dragging {
            z-index: 10;
          }
        `, enableDragging && css`
            cursor: move;
          `, "", ""],
      children: [tag, /* @__PURE__ */ jsx(iconParkOutlineCloseSmall, {
        onClick: () => {
          onDelete == null ? void 0 : onDelete(tag);
        },
        css: css`
          ${C.size(16)};
          ${C.ml(5)};
          cursor: pointer;
          font-size: 12px;
        `
      })]
    });
  });
  function TabPaneFilter() {
    const {
      filterEnabled,
      filterMinPlayCount,
      filterMinPlayCountEnabled,
      filterMinDuration,
      filterMinDurationEnabled,
      filterOutGotoTypePicture,
      filterByAuthorNameEnabled,
      filterByTitleEnabled
    } = useSettingsSnapshot();
    const getExemptFollowedTooltipProps = (label) => {
      return {
        label: "「已关注」豁免",
        tooltipProps: {
          color: "rgba(0, 0, 0, 0.85)"
        },
        tooltip: /* @__PURE__ */ jsxs(Fragment, {
          children: ["推荐中已关注用户发布的内容(", label, ") 不会被过滤", /* @__PURE__ */ jsx("br", {}), '"豁免" 一词来源', " ", /* @__PURE__ */ jsx("a", {
            target: "_blank",
            href: "https://github.com/magicdawn/bilibili-app-recommend/issues/1#issuecomment-2197868587",
            children: "pilipala"
          })]
        })
      };
    };
    return /* @__PURE__ */ jsx("div", {
      className: styles$1.tabPane,
      css: css`
        padding-right: 15px; // for scrollbar
      `,
      children: /* @__PURE__ */ jsxs("div", {
        className: styles$1.settingsGroup,
        children: [/* @__PURE__ */ jsxs("div", {
          className: styles$1.settingsGroupTitle,
          children: ["内容过滤", /* @__PURE__ */ jsxs(HelpInfo, {
            children: ["启用过滤会大幅降低加载速度, 谨慎开启! ", /* @__PURE__ */ jsx("br", {}), "视频/图文/影视: 仅推荐类 Tab 生效 ", /* @__PURE__ */ jsx("br", {}), "UP/标题: 推荐类 / 热门 等Tab 生效"]
          }), /* @__PURE__ */ jsx(SwitchSettingItem, {
            configKey: "filterEnabled",
            css: C.ml(10)
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: clsx(styles$1.settingsGroupContent),
          children: /* @__PURE__ */ jsxs("div", {
            css: css`
              display: grid;
              grid-template-columns: repeat(2, minmax(0, 1fr));
              column-gap: 20px;
              row-gap: 15px;
            `,
            children: [/* @__PURE__ */ jsxs("div", {
              className: "col",
              children: [/* @__PURE__ */ jsx("div", {
                className: styles$1.settingsGroupSubTitle,
                children: "视频"
              }), /* @__PURE__ */ jsxs("div", {
                className: styles$1.row,
                children: [/* @__PURE__ */ jsx(CheckboxSettingItem, {
                  disabled: !filterEnabled,
                  configKey: "filterMinPlayCountEnabled",
                  label: "按播放量过滤",
                  tooltip: /* @__PURE__ */ jsx(Fragment, {
                    children: "不显示播放量很少的视频"
                  })
                }), /* @__PURE__ */ jsx(antd.InputNumber, {
                  size: "small",
                  min: 1,
                  step: 1e3,
                  value: filterMinPlayCount,
                  onChange: (val) => val && updateSettings({
                    filterMinPlayCount: val
                  }),
                  disabled: !filterEnabled || !filterMinPlayCountEnabled
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: styles$1.row,
                style: {
                  marginTop: 3
                },
                children: [/* @__PURE__ */ jsx(CheckboxSettingItem, {
                  configKey: "filterMinDurationEnabled",
                  label: "按视频时长过滤",
                  tooltip: /* @__PURE__ */ jsx(Fragment, {
                    children: "不显示短视频"
                  }),
                  disabled: !filterEnabled
                }), /* @__PURE__ */ jsx(antd.InputNumber, {
                  style: {
                    width: 150
                  },
                  size: "small",
                  min: 1,
                  step: 10,
                  addonAfter: "单位:秒",
                  value: filterMinDuration,
                  onChange: (val) => val && updateSettings({
                    filterMinDuration: val
                  }),
                  disabled: !filterEnabled || !filterMinDurationEnabled
                })]
              }), /* @__PURE__ */ jsx(CheckboxSettingItem, {
                className: styles$1.row,
                style: {
                  marginTop: 3
                },
                configKey: "exemptForFollowedVideo",
                disabled: !filterEnabled,
                ...getExemptFollowedTooltipProps("视频")
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "col",
              children: [/* @__PURE__ */ jsx("div", {
                className: styles$1.settingsGroupSubTitle,
                children: "图文"
              }), /* @__PURE__ */ jsx(CheckboxSettingItem, {
                className: styles$1.row,
                configKey: "filterOutGotoTypePicture",
                label: "过滤图文类型推荐",
                tooltip: /* @__PURE__ */ jsxs(Fragment, {
                  children: ["过滤 ", /* @__PURE__ */ jsx("kbd", {
                    children: "goto = picture"
                  }), " 的内容: 包括 (动态 & 专栏) 等"]
                }),
                disabled: !filterEnabled
              }), /* @__PURE__ */ jsx(CheckboxSettingItem, {
                className: styles$1.row,
                disabled: !filterEnabled || !filterOutGotoTypePicture,
                configKey: "exemptForFollowedPicture",
                ...getExemptFollowedTooltipProps("图文")
              }), /* @__PURE__ */ jsx("div", {
                className: styles$1.settingsGroupSubTitle,
                children: "影视"
              }), /* @__PURE__ */ jsx(CheckboxSettingItem, {
                className: styles$1.row,
                configKey: "filterOutGotoTypeBangumi",
                label: "过滤影视类型推荐",
                tooltip: /* @__PURE__ */ jsxs(Fragment, {
                  children: ["过滤 ", /* @__PURE__ */ jsx("kbd", {
                    children: "goto = bangumi"
                  }), " 的内容: 包括 (番剧 / 电影 / 国创 / 纪录片) 等"]
                }),
                disabled: !filterEnabled
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "col",
              children: [/* @__PURE__ */ jsxs("div", {
                className: styles$1.settingsGroupSubTitle,
                children: ["UP", /* @__PURE__ */ jsxs(HelpInfo, {
                  children: ["根据 UP 过滤视频", /* @__PURE__ */ jsx("br", {}), "使用 mid 屏蔽时支持备注, 格式: ", /* @__PURE__ */ jsx(antd.Tag, {
                    color: "success",
                    children: "mid(备注)"
                  }), "  ", "如 ", /* @__PURE__ */ jsx(antd.Tag, {
                    color: "success",
                    children: "8047632(B站官方)"
                  }), /* @__PURE__ */ jsx("br", {}), "作用范围: 推荐 / 热门", /* @__PURE__ */ jsx("br", {}), "P.S B站官方支持黑名单, 对于不喜欢的 UP 可以直接拉黑", /* @__PURE__ */ jsx("br", {}), "P.S 这里是客户端过滤, 与黑名单功能重复, 后期版本可能会删除这个功能"]
                }), /* @__PURE__ */ jsx(SwitchSettingItem, {
                  configKey: "filterByAuthorNameEnabled",
                  disabled: !filterEnabled,
                  css: css`
                    margin-left: 10px;
                  `
                })]
              }), /* @__PURE__ */ jsx(EditableListSettingItem, {
                configKey: "filterByAuthorNameKeywords",
                searchProps: {
                  placeholder: "添加UP: 全名 / mid / mid(备注)"
                },
                disabled: !filterEnabled || !filterByAuthorNameEnabled
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "col",
              children: [/* @__PURE__ */ jsxs("div", {
                className: styles$1.settingsGroupSubTitle,
                children: [/* @__PURE__ */ jsx("span", {
                  children: "标题"
                }), /* @__PURE__ */ jsxs(HelpInfo, {
                  children: ["根据标题关键词过滤视频 ", /* @__PURE__ */ jsx("br", {}), "支持正则(i), 语法：/abc|\\d+/ ", /* @__PURE__ */ jsx("br", {}), "作用范围: 推荐 / 热门"]
                }), /* @__PURE__ */ jsx(SwitchSettingItem, {
                  configKey: "filterByTitleEnabled",
                  disabled: !filterEnabled,
                  css: css`
                    margin-left: 10px;
                  `
                })]
              }), /* @__PURE__ */ jsx(EditableListSettingItem, {
                configKey: "filterByTitleKeywords",
                searchProps: {
                  placeholder: "添加过滤关键词"
                },
                disabled: !filterEnabled || !filterByTitleEnabled
              })]
            })]
          })
        })]
      })
    });
  }
  function useCombinedRefs() {
    for (var _len = arguments.length, refs = new Array(_len), _key = 0; _key < _len; _key++) {
      refs[_key] = arguments[_key];
    }
    return React__default.useMemo(
      () => (node2) => {
        refs.forEach((ref) => ref(node2));
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      refs
    );
  }
  const canUseDOM = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
  function isWindow(element) {
    const elementString = Object.prototype.toString.call(element);
    return elementString === "[object Window]" || // In Electron context the Window object serializes to [object global]
    elementString === "[object global]";
  }
  function isNode(node2) {
    return "nodeType" in node2;
  }
  function getWindow(target) {
    var _target$ownerDocument, _target$ownerDocument2;
    if (!target) {
      return window;
    }
    if (isWindow(target)) {
      return target;
    }
    if (!isNode(target)) {
      return window;
    }
    return (_target$ownerDocument = (_target$ownerDocument2 = target.ownerDocument) == null ? void 0 : _target$ownerDocument2.defaultView) != null ? _target$ownerDocument : window;
  }
  function isDocument(node2) {
    const {
      Document
    } = getWindow(node2);
    return node2 instanceof Document;
  }
  function isHTMLElement(node2) {
    if (isWindow(node2)) {
      return false;
    }
    return node2 instanceof getWindow(node2).HTMLElement;
  }
  function isSVGElement(node2) {
    return node2 instanceof getWindow(node2).SVGElement;
  }
  function getOwnerDocument(target) {
    if (!target) {
      return document;
    }
    if (isWindow(target)) {
      return target.document;
    }
    if (!isNode(target)) {
      return document;
    }
    if (isDocument(target)) {
      return target;
    }
    if (isHTMLElement(target) || isSVGElement(target)) {
      return target.ownerDocument;
    }
    return document;
  }
  const useIsomorphicLayoutEffect = canUseDOM ? React__default.useLayoutEffect : React__default.useEffect;
  function useEvent(handler) {
    const handlerRef = React__default.useRef(handler);
    useIsomorphicLayoutEffect(() => {
      handlerRef.current = handler;
    });
    return React__default.useCallback(function() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return handlerRef.current == null ? void 0 : handlerRef.current(...args);
    }, []);
  }
  function useInterval() {
    const intervalRef = React__default.useRef(null);
    const set = React__default.useCallback((listener, duration2) => {
      intervalRef.current = setInterval(listener, duration2);
    }, []);
    const clear = React__default.useCallback(() => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, []);
    return [set, clear];
  }
  function useLatestValue(value, dependencies) {
    if (dependencies === void 0) {
      dependencies = [value];
    }
    const valueRef = React__default.useRef(value);
    useIsomorphicLayoutEffect(() => {
      if (valueRef.current !== value) {
        valueRef.current = value;
      }
    }, dependencies);
    return valueRef;
  }
  function useLazyMemo(callback, dependencies) {
    const valueRef = React__default.useRef();
    return React__default.useMemo(
      () => {
        const newValue = callback(valueRef.current);
        valueRef.current = newValue;
        return newValue;
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [...dependencies]
    );
  }
  function useNodeRef(onChange) {
    const onChangeHandler = useEvent(onChange);
    const node2 = React__default.useRef(null);
    const setNodeRef = React__default.useCallback(
      (element) => {
        if (element !== node2.current) {
          onChangeHandler == null ? void 0 : onChangeHandler(element, node2.current);
        }
        node2.current = element;
      },
      //eslint-disable-next-line
      []
    );
    return [node2, setNodeRef];
  }
  function usePrevious(value) {
    const ref = React__default.useRef();
    React__default.useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  }
  let ids = {};
  function useUniqueId(prefix2, value) {
    return React__default.useMemo(() => {
      if (value) {
        return value;
      }
      const id = ids[prefix2] == null ? 0 : ids[prefix2] + 1;
      ids[prefix2] = id;
      return prefix2 + "-" + id;
    }, [prefix2, value]);
  }
  function createAdjustmentFn(modifier) {
    return function(object) {
      for (var _len = arguments.length, adjustments = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        adjustments[_key - 1] = arguments[_key];
      }
      return adjustments.reduce((accumulator, adjustment) => {
        const entries = Object.entries(adjustment);
        for (const [key2, valueAdjustment] of entries) {
          const value = accumulator[key2];
          if (value != null) {
            accumulator[key2] = value + modifier * valueAdjustment;
          }
        }
        return accumulator;
      }, {
        ...object
      });
    };
  }
  const add = /* @__PURE__ */ createAdjustmentFn(1);
  const subtract = /* @__PURE__ */ createAdjustmentFn(-1);
  function hasViewportRelativeCoordinates(event) {
    return "clientX" in event && "clientY" in event;
  }
  function isKeyboardEvent(event) {
    if (!event) {
      return false;
    }
    const {
      KeyboardEvent
    } = getWindow(event.target);
    return KeyboardEvent && event instanceof KeyboardEvent;
  }
  function isTouchEvent(event) {
    if (!event) {
      return false;
    }
    const {
      TouchEvent
    } = getWindow(event.target);
    return TouchEvent && event instanceof TouchEvent;
  }
  function getEventCoordinates(event) {
    if (isTouchEvent(event)) {
      if (event.touches && event.touches.length) {
        const {
          clientX: x2,
          clientY: y2
        } = event.touches[0];
        return {
          x: x2,
          y: y2
        };
      } else if (event.changedTouches && event.changedTouches.length) {
        const {
          clientX: x2,
          clientY: y2
        } = event.changedTouches[0];
        return {
          x: x2,
          y: y2
        };
      }
    }
    if (hasViewportRelativeCoordinates(event)) {
      return {
        x: event.clientX,
        y: event.clientY
      };
    }
    return null;
  }
  const CSS = /* @__PURE__ */ Object.freeze({
    Translate: {
      toString(transform) {
        if (!transform) {
          return;
        }
        const {
          x: x2,
          y: y2
        } = transform;
        return "translate3d(" + (x2 ? Math.round(x2) : 0) + "px, " + (y2 ? Math.round(y2) : 0) + "px, 0)";
      }
    },
    Scale: {
      toString(transform) {
        if (!transform) {
          return;
        }
        const {
          scaleX,
          scaleY
        } = transform;
        return "scaleX(" + scaleX + ") scaleY(" + scaleY + ")";
      }
    },
    Transform: {
      toString(transform) {
        if (!transform) {
          return;
        }
        return [CSS.Translate.toString(transform), CSS.Scale.toString(transform)].join(" ");
      }
    },
    Transition: {
      toString(_ref4) {
        let {
          property,
          duration: duration2,
          easing
        } = _ref4;
        return property + " " + duration2 + "ms " + easing;
      }
    }
  });
  const SELECTOR = "a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]";
  function findFirstFocusableNode(element) {
    if (element.matches(SELECTOR)) {
      return element;
    }
    return element.querySelector(SELECTOR);
  }
  const hiddenStyles = {
    display: "none"
  };
  function HiddenText(_ref4) {
    let {
      id,
      value
    } = _ref4;
    return React__default.createElement("div", {
      id,
      style: hiddenStyles
    }, value);
  }
  function LiveRegion(_ref4) {
    let {
      id,
      announcement,
      ariaLiveType = "assertive"
    } = _ref4;
    const visuallyHidden = {
      position: "fixed",
      width: 1,
      height: 1,
      margin: -1,
      border: 0,
      padding: 0,
      overflow: "hidden",
      clip: "rect(0 0 0 0)",
      clipPath: "inset(100%)",
      whiteSpace: "nowrap"
    };
    return React__default.createElement("div", {
      id,
      style: visuallyHidden,
      role: "status",
      "aria-live": ariaLiveType,
      "aria-atomic": true
    }, announcement);
  }
  function useAnnouncement() {
    const [announcement, setAnnouncement] = React__default.useState("");
    const announce = React__default.useCallback((value) => {
      if (value != null) {
        setAnnouncement(value);
      }
    }, []);
    return {
      announce,
      announcement
    };
  }
  const DndMonitorContext = /* @__PURE__ */ React__default.createContext(null);
  function useDndMonitor(listener) {
    const registerListener = React__default.useContext(DndMonitorContext);
    React__default.useEffect(() => {
      if (!registerListener) {
        throw new Error("useDndMonitor must be used within a children of <DndContext>");
      }
      const unsubscribe = registerListener(listener);
      return unsubscribe;
    }, [listener, registerListener]);
  }
  function useDndMonitorProvider() {
    const [listeners2] = React__default.useState(() => /* @__PURE__ */ new Set());
    const registerListener = React__default.useCallback((listener) => {
      listeners2.add(listener);
      return () => listeners2.delete(listener);
    }, [listeners2]);
    const dispatch = React__default.useCallback((_ref4) => {
      let {
        type,
        event
      } = _ref4;
      listeners2.forEach((listener) => {
        var _listener$type;
        return (_listener$type = listener[type]) == null ? void 0 : _listener$type.call(listener, event);
      });
    }, [listeners2]);
    return [dispatch, registerListener];
  }
  const defaultScreenReaderInstructions = {
    draggable: "\n    To pick up a draggable item, press the space bar.\n    While dragging, use the arrow keys to move the item.\n    Press space again to drop the item in its new position, or press escape to cancel.\n  "
  };
  const defaultAnnouncements = {
    onDragStart(_ref4) {
      let {
        active
      } = _ref4;
      return "Picked up draggable item " + active.id + ".";
    },
    onDragOver(_ref22) {
      let {
        active,
        over
      } = _ref22;
      if (over) {
        return "Draggable item " + active.id + " was moved over droppable area " + over.id + ".";
      }
      return "Draggable item " + active.id + " is no longer over a droppable area.";
    },
    onDragEnd(_ref32) {
      let {
        active,
        over
      } = _ref32;
      if (over) {
        return "Draggable item " + active.id + " was dropped over droppable area " + over.id;
      }
      return "Draggable item " + active.id + " was dropped.";
    },
    onDragCancel(_ref4) {
      let {
        active
      } = _ref4;
      return "Dragging was cancelled. Draggable item " + active.id + " was dropped.";
    }
  };
  function Accessibility(_ref4) {
    let {
      announcements = defaultAnnouncements,
      container,
      hiddenTextDescribedById,
      screenReaderInstructions = defaultScreenReaderInstructions
    } = _ref4;
    const {
      announce,
      announcement
    } = useAnnouncement();
    const liveRegionId = useUniqueId("DndLiveRegion");
    const [mounted, setMounted] = React__default.useState(false);
    React__default.useEffect(() => {
      setMounted(true);
    }, []);
    useDndMonitor(React__default.useMemo(() => ({
      onDragStart(_ref22) {
        let {
          active
        } = _ref22;
        announce(announcements.onDragStart({
          active
        }));
      },
      onDragMove(_ref32) {
        let {
          active,
          over
        } = _ref32;
        if (announcements.onDragMove) {
          announce(announcements.onDragMove({
            active,
            over
          }));
        }
      },
      onDragOver(_ref42) {
        let {
          active,
          over
        } = _ref42;
        announce(announcements.onDragOver({
          active,
          over
        }));
      },
      onDragEnd(_ref5) {
        let {
          active,
          over
        } = _ref5;
        announce(announcements.onDragEnd({
          active,
          over
        }));
      },
      onDragCancel(_ref6) {
        let {
          active,
          over
        } = _ref6;
        announce(announcements.onDragCancel({
          active,
          over
        }));
      }
    }), [announce, announcements]));
    if (!mounted) {
      return null;
    }
    const markup = React__default.createElement(React__default.Fragment, null, React__default.createElement(HiddenText, {
      id: hiddenTextDescribedById,
      value: screenReaderInstructions.draggable
    }), React__default.createElement(LiveRegion, {
      id: liveRegionId,
      announcement
    }));
    return container ? require$$0.createPortal(markup, container) : markup;
  }
  var Action;
  (function(Action2) {
    Action2["DragStart"] = "dragStart";
    Action2["DragMove"] = "dragMove";
    Action2["DragEnd"] = "dragEnd";
    Action2["DragCancel"] = "dragCancel";
    Action2["DragOver"] = "dragOver";
    Action2["RegisterDroppable"] = "registerDroppable";
    Action2["SetDroppableDisabled"] = "setDroppableDisabled";
    Action2["UnregisterDroppable"] = "unregisterDroppable";
  })(Action || (Action = {}));
  function noop() {
  }
  function useSensor(sensor, options) {
    return React__default.useMemo(
      () => ({
        sensor,
        options: {}
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [sensor, options]
    );
  }
  function useSensors() {
    for (var _len = arguments.length, sensors = new Array(_len), _key = 0; _key < _len; _key++) {
      sensors[_key] = arguments[_key];
    }
    return React__default.useMemo(
      () => [...sensors].filter((sensor) => sensor != null),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [...sensors]
    );
  }
  const defaultCoordinates = /* @__PURE__ */ Object.freeze({
    x: 0,
    y: 0
  });
  function distanceBetween(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  }
  function sortCollisionsAsc(_ref4, _ref22) {
    let {
      data: {
        value: a
      }
    } = _ref4;
    let {
      data: {
        value: b2
      }
    } = _ref22;
    return a - b2;
  }
  function sortCollisionsDesc(_ref32, _ref4) {
    let {
      data: {
        value: a
      }
    } = _ref32;
    let {
      data: {
        value: b2
      }
    } = _ref4;
    return b2 - a;
  }
  function getFirstCollision(collisions, property) {
    if (!collisions || collisions.length === 0) {
      return null;
    }
    const [firstCollision] = collisions;
    return firstCollision[property];
  }
  function centerOfRectangle(rect, left, top) {
    if (left === void 0) {
      left = rect.left;
    }
    if (top === void 0) {
      top = rect.top;
    }
    return {
      x: left + rect.width * 0.5,
      y: top + rect.height * 0.5
    };
  }
  const closestCenter = (_ref4) => {
    let {
      collisionRect,
      droppableRects,
      droppableContainers
    } = _ref4;
    const centerRect = centerOfRectangle(collisionRect, collisionRect.left, collisionRect.top);
    const collisions = [];
    for (const droppableContainer of droppableContainers) {
      const {
        id
      } = droppableContainer;
      const rect = droppableRects.get(id);
      if (rect) {
        const distBetween = distanceBetween(centerOfRectangle(rect), centerRect);
        collisions.push({
          id,
          data: {
            droppableContainer,
            value: distBetween
          }
        });
      }
    }
    return collisions.sort(sortCollisionsAsc);
  };
  function getIntersectionRatio(entry, target) {
    const top = Math.max(target.top, entry.top);
    const left = Math.max(target.left, entry.left);
    const right = Math.min(target.left + target.width, entry.left + entry.width);
    const bottom = Math.min(target.top + target.height, entry.top + entry.height);
    const width = right - left;
    const height = bottom - top;
    if (left < right && top < bottom) {
      const targetArea = target.width * target.height;
      const entryArea = entry.width * entry.height;
      const intersectionArea = width * height;
      const intersectionRatio = intersectionArea / (targetArea + entryArea - intersectionArea);
      return Number(intersectionRatio.toFixed(4));
    }
    return 0;
  }
  const rectIntersection = (_ref4) => {
    let {
      collisionRect,
      droppableRects,
      droppableContainers
    } = _ref4;
    const collisions = [];
    for (const droppableContainer of droppableContainers) {
      const {
        id
      } = droppableContainer;
      const rect = droppableRects.get(id);
      if (rect) {
        const intersectionRatio = getIntersectionRatio(rect, collisionRect);
        if (intersectionRatio > 0) {
          collisions.push({
            id,
            data: {
              droppableContainer,
              value: intersectionRatio
            }
          });
        }
      }
    }
    return collisions.sort(sortCollisionsDesc);
  };
  function adjustScale(transform, rect1, rect2) {
    return {
      ...transform,
      scaleX: rect1 && rect2 ? rect1.width / rect2.width : 1,
      scaleY: rect1 && rect2 ? rect1.height / rect2.height : 1
    };
  }
  function getRectDelta(rect1, rect2) {
    return rect1 && rect2 ? {
      x: rect1.left - rect2.left,
      y: rect1.top - rect2.top
    } : defaultCoordinates;
  }
  function createRectAdjustmentFn(modifier) {
    return function adjustClientRect(rect) {
      for (var _len = arguments.length, adjustments = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        adjustments[_key - 1] = arguments[_key];
      }
      return adjustments.reduce((acc, adjustment) => ({
        ...acc,
        top: acc.top + modifier * adjustment.y,
        bottom: acc.bottom + modifier * adjustment.y,
        left: acc.left + modifier * adjustment.x,
        right: acc.right + modifier * adjustment.x
      }), {
        ...rect
      });
    };
  }
  const getAdjustedRect = /* @__PURE__ */ createRectAdjustmentFn(1);
  function parseTransform(transform) {
    if (transform.startsWith("matrix3d(")) {
      const transformArray = transform.slice(9, -1).split(/, /);
      return {
        x: +transformArray[12],
        y: +transformArray[13],
        scaleX: +transformArray[0],
        scaleY: +transformArray[5]
      };
    } else if (transform.startsWith("matrix(")) {
      const transformArray = transform.slice(7, -1).split(/, /);
      return {
        x: +transformArray[4],
        y: +transformArray[5],
        scaleX: +transformArray[0],
        scaleY: +transformArray[3]
      };
    }
    return null;
  }
  function inverseTransform(rect, transform, transformOrigin) {
    const parsedTransform = parseTransform(transform);
    if (!parsedTransform) {
      return rect;
    }
    const {
      scaleX,
      scaleY,
      x: translateX,
      y: translateY
    } = parsedTransform;
    const x2 = rect.left - translateX - (1 - scaleX) * parseFloat(transformOrigin);
    const y2 = rect.top - translateY - (1 - scaleY) * parseFloat(transformOrigin.slice(transformOrigin.indexOf(" ") + 1));
    const w2 = scaleX ? rect.width / scaleX : rect.width;
    const h2 = scaleY ? rect.height / scaleY : rect.height;
    return {
      width: w2,
      height: h2,
      top: y2,
      right: x2 + w2,
      bottom: y2 + h2,
      left: x2
    };
  }
  const defaultOptions = {
    ignoreTransform: false
  };
  function getClientRect(element, options) {
    if (options === void 0) {
      options = defaultOptions;
    }
    let rect = element.getBoundingClientRect();
    if (options.ignoreTransform) {
      const {
        transform,
        transformOrigin
      } = getWindow(element).getComputedStyle(element);
      if (transform) {
        rect = inverseTransform(rect, transform, transformOrigin);
      }
    }
    const {
      top,
      left,
      width,
      height,
      bottom,
      right
    } = rect;
    return {
      top,
      left,
      width,
      height,
      bottom,
      right
    };
  }
  function getTransformAgnosticClientRect(element) {
    return getClientRect(element, {
      ignoreTransform: true
    });
  }
  function getWindowClientRect(element) {
    const width = element.innerWidth;
    const height = element.innerHeight;
    return {
      top: 0,
      left: 0,
      right: width,
      bottom: height,
      width,
      height
    };
  }
  function isFixed(node2, computedStyle) {
    if (computedStyle === void 0) {
      computedStyle = getWindow(node2).getComputedStyle(node2);
    }
    return computedStyle.position === "fixed";
  }
  function isScrollable(element, computedStyle) {
    if (computedStyle === void 0) {
      computedStyle = getWindow(element).getComputedStyle(element);
    }
    const overflowRegex = /(auto|scroll|overlay)/;
    const properties2 = ["overflow", "overflowX", "overflowY"];
    return properties2.some((property) => {
      const value = computedStyle[property];
      return typeof value === "string" ? overflowRegex.test(value) : false;
    });
  }
  function getScrollableAncestors(element, limit2) {
    const scrollParents = [];
    function findScrollableAncestors(node2) {
      if (limit2 != null && scrollParents.length >= limit2) {
        return scrollParents;
      }
      if (!node2) {
        return scrollParents;
      }
      if (isDocument(node2) && node2.scrollingElement != null && !scrollParents.includes(node2.scrollingElement)) {
        scrollParents.push(node2.scrollingElement);
        return scrollParents;
      }
      if (!isHTMLElement(node2) || isSVGElement(node2)) {
        return scrollParents;
      }
      if (scrollParents.includes(node2)) {
        return scrollParents;
      }
      const computedStyle = getWindow(element).getComputedStyle(node2);
      if (node2 !== element) {
        if (isScrollable(node2, computedStyle)) {
          scrollParents.push(node2);
        }
      }
      if (isFixed(node2, computedStyle)) {
        return scrollParents;
      }
      return findScrollableAncestors(node2.parentNode);
    }
    if (!element) {
      return scrollParents;
    }
    return findScrollableAncestors(element);
  }
  function getFirstScrollableAncestor(node2) {
    const [firstScrollableAncestor] = getScrollableAncestors(node2, 1);
    return firstScrollableAncestor != null ? firstScrollableAncestor : null;
  }
  function getScrollableElement(element) {
    if (!canUseDOM || !element) {
      return null;
    }
    if (isWindow(element)) {
      return element;
    }
    if (!isNode(element)) {
      return null;
    }
    if (isDocument(element) || element === getOwnerDocument(element).scrollingElement) {
      return window;
    }
    if (isHTMLElement(element)) {
      return element;
    }
    return null;
  }
  function getScrollXCoordinate(element) {
    if (isWindow(element)) {
      return element.scrollX;
    }
    return element.scrollLeft;
  }
  function getScrollYCoordinate(element) {
    if (isWindow(element)) {
      return element.scrollY;
    }
    return element.scrollTop;
  }
  function getScrollCoordinates(element) {
    return {
      x: getScrollXCoordinate(element),
      y: getScrollYCoordinate(element)
    };
  }
  var Direction;
  (function(Direction2) {
    Direction2[Direction2["Forward"] = 1] = "Forward";
    Direction2[Direction2["Backward"] = -1] = "Backward";
  })(Direction || (Direction = {}));
  function isDocumentScrollingElement(element) {
    if (!canUseDOM || !element) {
      return false;
    }
    return element === document.scrollingElement;
  }
  function getScrollPosition(scrollingContainer) {
    const minScroll = {
      x: 0,
      y: 0
    };
    const dimensions = isDocumentScrollingElement(scrollingContainer) ? {
      height: window.innerHeight,
      width: window.innerWidth
    } : {
      height: scrollingContainer.clientHeight,
      width: scrollingContainer.clientWidth
    };
    const maxScroll = {
      x: scrollingContainer.scrollWidth - dimensions.width,
      y: scrollingContainer.scrollHeight - dimensions.height
    };
    const isTop = scrollingContainer.scrollTop <= minScroll.y;
    const isLeft = scrollingContainer.scrollLeft <= minScroll.x;
    const isBottom = scrollingContainer.scrollTop >= maxScroll.y;
    const isRight = scrollingContainer.scrollLeft >= maxScroll.x;
    return {
      isTop,
      isLeft,
      isBottom,
      isRight,
      maxScroll,
      minScroll
    };
  }
  const defaultThreshold = {
    x: 0.2,
    y: 0.2
  };
  function getScrollDirectionAndSpeed(scrollContainer, scrollContainerRect, _ref4, acceleration, thresholdPercentage) {
    let {
      top,
      left,
      right,
      bottom
    } = _ref4;
    if (acceleration === void 0) {
      acceleration = 10;
    }
    if (thresholdPercentage === void 0) {
      thresholdPercentage = defaultThreshold;
    }
    const {
      isTop,
      isBottom,
      isLeft,
      isRight
    } = getScrollPosition(scrollContainer);
    const direction = {
      x: 0,
      y: 0
    };
    const speed = {
      x: 0,
      y: 0
    };
    const threshold = {
      height: scrollContainerRect.height * thresholdPercentage.y,
      width: scrollContainerRect.width * thresholdPercentage.x
    };
    if (!isTop && top <= scrollContainerRect.top + threshold.height) {
      direction.y = Direction.Backward;
      speed.y = acceleration * Math.abs((scrollContainerRect.top + threshold.height - top) / threshold.height);
    } else if (!isBottom && bottom >= scrollContainerRect.bottom - threshold.height) {
      direction.y = Direction.Forward;
      speed.y = acceleration * Math.abs((scrollContainerRect.bottom - threshold.height - bottom) / threshold.height);
    }
    if (!isRight && right >= scrollContainerRect.right - threshold.width) {
      direction.x = Direction.Forward;
      speed.x = acceleration * Math.abs((scrollContainerRect.right - threshold.width - right) / threshold.width);
    } else if (!isLeft && left <= scrollContainerRect.left + threshold.width) {
      direction.x = Direction.Backward;
      speed.x = acceleration * Math.abs((scrollContainerRect.left + threshold.width - left) / threshold.width);
    }
    return {
      direction,
      speed
    };
  }
  function getScrollElementRect(element) {
    if (element === document.scrollingElement) {
      const {
        innerWidth,
        innerHeight
      } = window;
      return {
        top: 0,
        left: 0,
        right: innerWidth,
        bottom: innerHeight,
        width: innerWidth,
        height: innerHeight
      };
    }
    const {
      top,
      left,
      right,
      bottom
    } = element.getBoundingClientRect();
    return {
      top,
      left,
      right,
      bottom,
      width: element.clientWidth,
      height: element.clientHeight
    };
  }
  function getScrollOffsets(scrollableAncestors) {
    return scrollableAncestors.reduce((acc, node2) => {
      return add(acc, getScrollCoordinates(node2));
    }, defaultCoordinates);
  }
  function getScrollXOffset(scrollableAncestors) {
    return scrollableAncestors.reduce((acc, node2) => {
      return acc + getScrollXCoordinate(node2);
    }, 0);
  }
  function getScrollYOffset(scrollableAncestors) {
    return scrollableAncestors.reduce((acc, node2) => {
      return acc + getScrollYCoordinate(node2);
    }, 0);
  }
  function scrollIntoViewIfNeeded(element, measure) {
    if (measure === void 0) {
      measure = getClientRect;
    }
    if (!element) {
      return;
    }
    const {
      top,
      left,
      bottom,
      right
    } = measure(element);
    const firstScrollableAncestor = getFirstScrollableAncestor(element);
    if (!firstScrollableAncestor) {
      return;
    }
    if (bottom <= 0 || right <= 0 || top >= window.innerHeight || left >= window.innerWidth) {
      element.scrollIntoView({
        block: "center",
        inline: "center"
      });
    }
  }
  const properties = [["x", ["left", "right"], getScrollXOffset], ["y", ["top", "bottom"], getScrollYOffset]];
  class Rect {
    constructor(rect, element) {
      this.rect = void 0;
      this.width = void 0;
      this.height = void 0;
      this.top = void 0;
      this.bottom = void 0;
      this.right = void 0;
      this.left = void 0;
      const scrollableAncestors = getScrollableAncestors(element);
      const scrollOffsets = getScrollOffsets(scrollableAncestors);
      this.rect = {
        ...rect
      };
      this.width = rect.width;
      this.height = rect.height;
      for (const [axis, keys, getScrollOffset] of properties) {
        for (const key2 of keys) {
          Object.defineProperty(this, key2, {
            get: () => {
              const currentOffsets = getScrollOffset(scrollableAncestors);
              const scrollOffsetsDeltla = scrollOffsets[axis] - currentOffsets;
              return this.rect[key2] + scrollOffsetsDeltla;
            },
            enumerable: true
          });
        }
      }
      Object.defineProperty(this, "rect", {
        enumerable: false
      });
    }
  }
  class Listeners {
    constructor(target) {
      this.target = void 0;
      this.listeners = [];
      this.removeAll = () => {
        this.listeners.forEach((listener) => {
          var _this$target;
          return (_this$target = this.target) == null ? void 0 : _this$target.removeEventListener(...listener);
        });
      };
      this.target = target;
    }
    add(eventName, handler, options) {
      var _this$target2;
      (_this$target2 = this.target) == null ? void 0 : _this$target2.addEventListener(eventName, handler, options);
      this.listeners.push([eventName, handler, options]);
    }
  }
  function getEventListenerTarget(target) {
    const {
      EventTarget
    } = getWindow(target);
    return target instanceof EventTarget ? target : getOwnerDocument(target);
  }
  function hasExceededDistance(delta, measurement) {
    const dx = Math.abs(delta.x);
    const dy = Math.abs(delta.y);
    if (typeof measurement === "number") {
      return Math.sqrt(dx ** 2 + dy ** 2) > measurement;
    }
    if ("x" in measurement && "y" in measurement) {
      return dx > measurement.x && dy > measurement.y;
    }
    if ("x" in measurement) {
      return dx > measurement.x;
    }
    if ("y" in measurement) {
      return dy > measurement.y;
    }
    return false;
  }
  var EventName;
  (function(EventName2) {
    EventName2["Click"] = "click";
    EventName2["DragStart"] = "dragstart";
    EventName2["Keydown"] = "keydown";
    EventName2["ContextMenu"] = "contextmenu";
    EventName2["Resize"] = "resize";
    EventName2["SelectionChange"] = "selectionchange";
    EventName2["VisibilityChange"] = "visibilitychange";
  })(EventName || (EventName = {}));
  function preventDefault(event) {
    event.preventDefault();
  }
  function stopPropagation(event) {
    event.stopPropagation();
  }
  var KeyboardCode;
  (function(KeyboardCode2) {
    KeyboardCode2["Space"] = "Space";
    KeyboardCode2["Down"] = "ArrowDown";
    KeyboardCode2["Right"] = "ArrowRight";
    KeyboardCode2["Left"] = "ArrowLeft";
    KeyboardCode2["Up"] = "ArrowUp";
    KeyboardCode2["Esc"] = "Escape";
    KeyboardCode2["Enter"] = "Enter";
  })(KeyboardCode || (KeyboardCode = {}));
  const defaultKeyboardCodes = {
    start: [KeyboardCode.Space, KeyboardCode.Enter],
    cancel: [KeyboardCode.Esc],
    end: [KeyboardCode.Space, KeyboardCode.Enter]
  };
  const defaultKeyboardCoordinateGetter = (event, _ref4) => {
    let {
      currentCoordinates
    } = _ref4;
    switch (event.code) {
      case KeyboardCode.Right:
        return {
          ...currentCoordinates,
          x: currentCoordinates.x + 25
        };
      case KeyboardCode.Left:
        return {
          ...currentCoordinates,
          x: currentCoordinates.x - 25
        };
      case KeyboardCode.Down:
        return {
          ...currentCoordinates,
          y: currentCoordinates.y + 25
        };
      case KeyboardCode.Up:
        return {
          ...currentCoordinates,
          y: currentCoordinates.y - 25
        };
    }
    return void 0;
  };
  class KeyboardSensor {
    constructor(props) {
      this.props = void 0;
      this.autoScrollEnabled = false;
      this.referenceCoordinates = void 0;
      this.listeners = void 0;
      this.windowListeners = void 0;
      this.props = props;
      const {
        event: {
          target
        }
      } = props;
      this.props = props;
      this.listeners = new Listeners(getOwnerDocument(target));
      this.windowListeners = new Listeners(getWindow(target));
      this.handleKeyDown = this.handleKeyDown.bind(this);
      this.handleCancel = this.handleCancel.bind(this);
      this.attach();
    }
    attach() {
      this.handleStart();
      this.windowListeners.add(EventName.Resize, this.handleCancel);
      this.windowListeners.add(EventName.VisibilityChange, this.handleCancel);
      setTimeout(() => this.listeners.add(EventName.Keydown, this.handleKeyDown));
    }
    handleStart() {
      const {
        activeNode,
        onStart
      } = this.props;
      const node2 = activeNode.node.current;
      if (node2) {
        scrollIntoViewIfNeeded(node2);
      }
      onStart(defaultCoordinates);
    }
    handleKeyDown(event) {
      if (isKeyboardEvent(event)) {
        const {
          active,
          context,
          options
        } = this.props;
        const {
          keyboardCodes = defaultKeyboardCodes,
          coordinateGetter = defaultKeyboardCoordinateGetter,
          scrollBehavior = "smooth"
        } = options;
        const {
          code
        } = event;
        if (keyboardCodes.end.includes(code)) {
          this.handleEnd(event);
          return;
        }
        if (keyboardCodes.cancel.includes(code)) {
          this.handleCancel(event);
          return;
        }
        const {
          collisionRect
        } = context.current;
        const currentCoordinates = collisionRect ? {
          x: collisionRect.left,
          y: collisionRect.top
        } : defaultCoordinates;
        if (!this.referenceCoordinates) {
          this.referenceCoordinates = currentCoordinates;
        }
        const newCoordinates = coordinateGetter(event, {
          active,
          context: context.current,
          currentCoordinates
        });
        if (newCoordinates) {
          const coordinatesDelta = subtract(newCoordinates, currentCoordinates);
          const scrollDelta = {
            x: 0,
            y: 0
          };
          const {
            scrollableAncestors
          } = context.current;
          for (const scrollContainer of scrollableAncestors) {
            const direction = event.code;
            const {
              isTop,
              isRight,
              isLeft,
              isBottom,
              maxScroll,
              minScroll
            } = getScrollPosition(scrollContainer);
            const scrollElementRect = getScrollElementRect(scrollContainer);
            const clampedCoordinates = {
              x: Math.min(direction === KeyboardCode.Right ? scrollElementRect.right - scrollElementRect.width / 2 : scrollElementRect.right, Math.max(direction === KeyboardCode.Right ? scrollElementRect.left : scrollElementRect.left + scrollElementRect.width / 2, newCoordinates.x)),
              y: Math.min(direction === KeyboardCode.Down ? scrollElementRect.bottom - scrollElementRect.height / 2 : scrollElementRect.bottom, Math.max(direction === KeyboardCode.Down ? scrollElementRect.top : scrollElementRect.top + scrollElementRect.height / 2, newCoordinates.y))
            };
            const canScrollX = direction === KeyboardCode.Right && !isRight || direction === KeyboardCode.Left && !isLeft;
            const canScrollY = direction === KeyboardCode.Down && !isBottom || direction === KeyboardCode.Up && !isTop;
            if (canScrollX && clampedCoordinates.x !== newCoordinates.x) {
              const newScrollCoordinates = scrollContainer.scrollLeft + coordinatesDelta.x;
              const canScrollToNewCoordinates = direction === KeyboardCode.Right && newScrollCoordinates <= maxScroll.x || direction === KeyboardCode.Left && newScrollCoordinates >= minScroll.x;
              if (canScrollToNewCoordinates && !coordinatesDelta.y) {
                scrollContainer.scrollTo({
                  left: newScrollCoordinates,
                  behavior: scrollBehavior
                });
                return;
              }
              if (canScrollToNewCoordinates) {
                scrollDelta.x = scrollContainer.scrollLeft - newScrollCoordinates;
              } else {
                scrollDelta.x = direction === KeyboardCode.Right ? scrollContainer.scrollLeft - maxScroll.x : scrollContainer.scrollLeft - minScroll.x;
              }
              if (scrollDelta.x) {
                scrollContainer.scrollBy({
                  left: -scrollDelta.x,
                  behavior: scrollBehavior
                });
              }
              break;
            } else if (canScrollY && clampedCoordinates.y !== newCoordinates.y) {
              const newScrollCoordinates = scrollContainer.scrollTop + coordinatesDelta.y;
              const canScrollToNewCoordinates = direction === KeyboardCode.Down && newScrollCoordinates <= maxScroll.y || direction === KeyboardCode.Up && newScrollCoordinates >= minScroll.y;
              if (canScrollToNewCoordinates && !coordinatesDelta.x) {
                scrollContainer.scrollTo({
                  top: newScrollCoordinates,
                  behavior: scrollBehavior
                });
                return;
              }
              if (canScrollToNewCoordinates) {
                scrollDelta.y = scrollContainer.scrollTop - newScrollCoordinates;
              } else {
                scrollDelta.y = direction === KeyboardCode.Down ? scrollContainer.scrollTop - maxScroll.y : scrollContainer.scrollTop - minScroll.y;
              }
              if (scrollDelta.y) {
                scrollContainer.scrollBy({
                  top: -scrollDelta.y,
                  behavior: scrollBehavior
                });
              }
              break;
            }
          }
          this.handleMove(event, add(subtract(newCoordinates, this.referenceCoordinates), scrollDelta));
        }
      }
    }
    handleMove(event, coordinates) {
      const {
        onMove
      } = this.props;
      event.preventDefault();
      onMove(coordinates);
    }
    handleEnd(event) {
      const {
        onEnd
      } = this.props;
      event.preventDefault();
      this.detach();
      onEnd();
    }
    handleCancel(event) {
      const {
        onCancel
      } = this.props;
      event.preventDefault();
      this.detach();
      onCancel();
    }
    detach() {
      this.listeners.removeAll();
      this.windowListeners.removeAll();
    }
  }
  KeyboardSensor.activators = [{
    eventName: "onKeyDown",
    handler: (event, _ref4, _ref22) => {
      let {
        keyboardCodes = defaultKeyboardCodes,
        onActivation
      } = _ref4;
      let {
        active
      } = _ref22;
      const {
        code
      } = event.nativeEvent;
      if (keyboardCodes.start.includes(code)) {
        const activator = active.activatorNode.current;
        if (activator && event.target !== activator) {
          return false;
        }
        event.preventDefault();
        onActivation == null ? void 0 : onActivation({
          event: event.nativeEvent
        });
        return true;
      }
      return false;
    }
  }];
  function isDistanceConstraint(constraint) {
    return Boolean(constraint && "distance" in constraint);
  }
  function isDelayConstraint(constraint) {
    return Boolean(constraint && "delay" in constraint);
  }
  class AbstractPointerSensor {
    constructor(props, events2, listenerTarget) {
      var _getEventCoordinates;
      if (listenerTarget === void 0) {
        listenerTarget = getEventListenerTarget(props.event.target);
      }
      this.props = void 0;
      this.events = void 0;
      this.autoScrollEnabled = true;
      this.document = void 0;
      this.activated = false;
      this.initialCoordinates = void 0;
      this.timeoutId = null;
      this.listeners = void 0;
      this.documentListeners = void 0;
      this.windowListeners = void 0;
      this.props = props;
      this.events = events2;
      const {
        event
      } = props;
      const {
        target
      } = event;
      this.props = props;
      this.events = events2;
      this.document = getOwnerDocument(target);
      this.documentListeners = new Listeners(this.document);
      this.listeners = new Listeners(listenerTarget);
      this.windowListeners = new Listeners(getWindow(target));
      this.initialCoordinates = (_getEventCoordinates = getEventCoordinates(event)) != null ? _getEventCoordinates : defaultCoordinates;
      this.handleStart = this.handleStart.bind(this);
      this.handleMove = this.handleMove.bind(this);
      this.handleEnd = this.handleEnd.bind(this);
      this.handleCancel = this.handleCancel.bind(this);
      this.handleKeydown = this.handleKeydown.bind(this);
      this.removeTextSelection = this.removeTextSelection.bind(this);
      this.attach();
    }
    attach() {
      const {
        events: events2,
        props: {
          options: {
            activationConstraint,
            bypassActivationConstraint
          }
        }
      } = this;
      this.listeners.add(events2.move.name, this.handleMove, {
        passive: false
      });
      this.listeners.add(events2.end.name, this.handleEnd);
      this.windowListeners.add(EventName.Resize, this.handleCancel);
      this.windowListeners.add(EventName.DragStart, preventDefault);
      this.windowListeners.add(EventName.VisibilityChange, this.handleCancel);
      this.windowListeners.add(EventName.ContextMenu, preventDefault);
      this.documentListeners.add(EventName.Keydown, this.handleKeydown);
      if (activationConstraint) {
        if (bypassActivationConstraint != null && bypassActivationConstraint({
          event: this.props.event,
          activeNode: this.props.activeNode,
          options: this.props.options
        })) {
          return this.handleStart();
        }
        if (isDelayConstraint(activationConstraint)) {
          this.timeoutId = setTimeout(this.handleStart, activationConstraint.delay);
          return;
        }
        if (isDistanceConstraint(activationConstraint)) {
          return;
        }
      }
      this.handleStart();
    }
    detach() {
      this.listeners.removeAll();
      this.windowListeners.removeAll();
      setTimeout(this.documentListeners.removeAll, 50);
      if (this.timeoutId !== null) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }
    }
    handleStart() {
      const {
        initialCoordinates
      } = this;
      const {
        onStart
      } = this.props;
      if (initialCoordinates) {
        this.activated = true;
        this.documentListeners.add(EventName.Click, stopPropagation, {
          capture: true
        });
        this.removeTextSelection();
        this.documentListeners.add(EventName.SelectionChange, this.removeTextSelection);
        onStart(initialCoordinates);
      }
    }
    handleMove(event) {
      var _getEventCoordinates2;
      const {
        activated,
        initialCoordinates,
        props
      } = this;
      const {
        onMove,
        options: {
          activationConstraint
        }
      } = props;
      if (!initialCoordinates) {
        return;
      }
      const coordinates = (_getEventCoordinates2 = getEventCoordinates(event)) != null ? _getEventCoordinates2 : defaultCoordinates;
      const delta = subtract(initialCoordinates, coordinates);
      if (!activated && activationConstraint) {
        if (isDistanceConstraint(activationConstraint)) {
          if (activationConstraint.tolerance != null && hasExceededDistance(delta, activationConstraint.tolerance)) {
            return this.handleCancel();
          }
          if (hasExceededDistance(delta, activationConstraint.distance)) {
            return this.handleStart();
          }
        }
        if (isDelayConstraint(activationConstraint)) {
          if (hasExceededDistance(delta, activationConstraint.tolerance)) {
            return this.handleCancel();
          }
        }
        return;
      }
      if (event.cancelable) {
        event.preventDefault();
      }
      onMove(coordinates);
    }
    handleEnd() {
      const {
        onEnd
      } = this.props;
      this.detach();
      onEnd();
    }
    handleCancel() {
      const {
        onCancel
      } = this.props;
      this.detach();
      onCancel();
    }
    handleKeydown(event) {
      if (event.code === KeyboardCode.Esc) {
        this.handleCancel();
      }
    }
    removeTextSelection() {
      var _this$document$getSel;
      (_this$document$getSel = this.document.getSelection()) == null ? void 0 : _this$document$getSel.removeAllRanges();
    }
  }
  const events = {
    move: {
      name: "pointermove"
    },
    end: {
      name: "pointerup"
    }
  };
  class PointerSensor extends AbstractPointerSensor {
    constructor(props) {
      const {
        event
      } = props;
      const listenerTarget = getOwnerDocument(event.target);
      super(props, events, listenerTarget);
    }
  }
  PointerSensor.activators = [{
    eventName: "onPointerDown",
    handler: (_ref4, _ref22) => {
      let {
        nativeEvent: event
      } = _ref4;
      let {
        onActivation
      } = _ref22;
      if (!event.isPrimary || event.button !== 0) {
        return false;
      }
      onActivation == null ? void 0 : onActivation({
        event
      });
      return true;
    }
  }];
  const events$1 = {
    move: {
      name: "mousemove"
    },
    end: {
      name: "mouseup"
    }
  };
  var MouseButton;
  (function(MouseButton2) {
    MouseButton2[MouseButton2["RightClick"] = 2] = "RightClick";
  })(MouseButton || (MouseButton = {}));
  class MouseSensor extends AbstractPointerSensor {
    constructor(props) {
      super(props, events$1, getOwnerDocument(props.event.target));
    }
  }
  MouseSensor.activators = [{
    eventName: "onMouseDown",
    handler: (_ref4, _ref22) => {
      let {
        nativeEvent: event
      } = _ref4;
      let {
        onActivation
      } = _ref22;
      if (event.button === MouseButton.RightClick) {
        return false;
      }
      onActivation == null ? void 0 : onActivation({
        event
      });
      return true;
    }
  }];
  const events$2 = {
    move: {
      name: "touchmove"
    },
    end: {
      name: "touchend"
    }
  };
  class TouchSensor extends AbstractPointerSensor {
    constructor(props) {
      super(props, events$2);
    }
    static setup() {
      window.addEventListener(events$2.move.name, noop2, {
        capture: false,
        passive: false
      });
      return function teardown() {
        window.removeEventListener(events$2.move.name, noop2);
      };
      function noop2() {
      }
    }
  }
  TouchSensor.activators = [{
    eventName: "onTouchStart",
    handler: (_ref4, _ref22) => {
      let {
        nativeEvent: event
      } = _ref4;
      let {
        onActivation
      } = _ref22;
      const {
        touches
      } = event;
      if (touches.length > 1) {
        return false;
      }
      onActivation == null ? void 0 : onActivation({
        event
      });
      return true;
    }
  }];
  var AutoScrollActivator;
  (function(AutoScrollActivator2) {
    AutoScrollActivator2[AutoScrollActivator2["Pointer"] = 0] = "Pointer";
    AutoScrollActivator2[AutoScrollActivator2["DraggableRect"] = 1] = "DraggableRect";
  })(AutoScrollActivator || (AutoScrollActivator = {}));
  var TraversalOrder;
  (function(TraversalOrder2) {
    TraversalOrder2[TraversalOrder2["TreeOrder"] = 0] = "TreeOrder";
    TraversalOrder2[TraversalOrder2["ReversedTreeOrder"] = 1] = "ReversedTreeOrder";
  })(TraversalOrder || (TraversalOrder = {}));
  function useAutoScroller(_ref4) {
    let {
      acceleration,
      activator = AutoScrollActivator.Pointer,
      canScroll,
      draggingRect,
      enabled,
      interval = 5,
      order = TraversalOrder.TreeOrder,
      pointerCoordinates,
      scrollableAncestors,
      scrollableAncestorRects,
      delta,
      threshold
    } = _ref4;
    const scrollIntent = useScrollIntent({
      delta,
      disabled: !enabled
    });
    const [setAutoScrollInterval, clearAutoScrollInterval] = useInterval();
    const scrollSpeed = React__default.useRef({
      x: 0,
      y: 0
    });
    const scrollDirection = React__default.useRef({
      x: 0,
      y: 0
    });
    const rect = React__default.useMemo(() => {
      switch (activator) {
        case AutoScrollActivator.Pointer:
          return pointerCoordinates ? {
            top: pointerCoordinates.y,
            bottom: pointerCoordinates.y,
            left: pointerCoordinates.x,
            right: pointerCoordinates.x
          } : null;
        case AutoScrollActivator.DraggableRect:
          return draggingRect;
      }
    }, [activator, draggingRect, pointerCoordinates]);
    const scrollContainerRef = React__default.useRef(null);
    const autoScroll = React__default.useCallback(() => {
      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainer) {
        return;
      }
      const scrollLeft = scrollSpeed.current.x * scrollDirection.current.x;
      const scrollTop = scrollSpeed.current.y * scrollDirection.current.y;
      scrollContainer.scrollBy(scrollLeft, scrollTop);
    }, []);
    const sortedScrollableAncestors = React__default.useMemo(() => order === TraversalOrder.TreeOrder ? [...scrollableAncestors].reverse() : scrollableAncestors, [order, scrollableAncestors]);
    React__default.useEffect(
      () => {
        if (!enabled || !scrollableAncestors.length || !rect) {
          clearAutoScrollInterval();
          return;
        }
        for (const scrollContainer of sortedScrollableAncestors) {
          if ((canScroll == null ? void 0 : canScroll(scrollContainer)) === false) {
            continue;
          }
          const index = scrollableAncestors.indexOf(scrollContainer);
          const scrollContainerRect = scrollableAncestorRects[index];
          if (!scrollContainerRect) {
            continue;
          }
          const {
            direction,
            speed
          } = getScrollDirectionAndSpeed(scrollContainer, scrollContainerRect, rect, acceleration, threshold);
          for (const axis of ["x", "y"]) {
            if (!scrollIntent[axis][direction[axis]]) {
              speed[axis] = 0;
              direction[axis] = 0;
            }
          }
          if (speed.x > 0 || speed.y > 0) {
            clearAutoScrollInterval();
            scrollContainerRef.current = scrollContainer;
            setAutoScrollInterval(autoScroll, interval);
            scrollSpeed.current = speed;
            scrollDirection.current = direction;
            return;
          }
        }
        scrollSpeed.current = {
          x: 0,
          y: 0
        };
        scrollDirection.current = {
          x: 0,
          y: 0
        };
        clearAutoScrollInterval();
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [
        acceleration,
        autoScroll,
        canScroll,
        clearAutoScrollInterval,
        enabled,
        interval,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        JSON.stringify(rect),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        JSON.stringify(scrollIntent),
        setAutoScrollInterval,
        scrollableAncestors,
        sortedScrollableAncestors,
        scrollableAncestorRects,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        JSON.stringify(threshold)
      ]
    );
  }
  const defaultScrollIntent = {
    x: {
      [Direction.Backward]: false,
      [Direction.Forward]: false
    },
    y: {
      [Direction.Backward]: false,
      [Direction.Forward]: false
    }
  };
  function useScrollIntent(_ref22) {
    let {
      delta,
      disabled
    } = _ref22;
    const previousDelta = usePrevious(delta);
    return useLazyMemo((previousIntent) => {
      if (disabled || !previousDelta || !previousIntent) {
        return defaultScrollIntent;
      }
      const direction = {
        x: Math.sign(delta.x - previousDelta.x),
        y: Math.sign(delta.y - previousDelta.y)
      };
      return {
        x: {
          [Direction.Backward]: previousIntent.x[Direction.Backward] || direction.x === -1,
          [Direction.Forward]: previousIntent.x[Direction.Forward] || direction.x === 1
        },
        y: {
          [Direction.Backward]: previousIntent.y[Direction.Backward] || direction.y === -1,
          [Direction.Forward]: previousIntent.y[Direction.Forward] || direction.y === 1
        }
      };
    }, [disabled, delta, previousDelta]);
  }
  function useCachedNode(draggableNodes, id) {
    const draggableNode = id !== null ? draggableNodes.get(id) : void 0;
    const node2 = draggableNode ? draggableNode.node.current : null;
    return useLazyMemo((cachedNode) => {
      var _ref4;
      if (id === null) {
        return null;
      }
      return (_ref4 = node2 != null ? node2 : cachedNode) != null ? _ref4 : null;
    }, [node2, id]);
  }
  function useCombineActivators(sensors, getSyntheticHandler) {
    return React__default.useMemo(() => sensors.reduce((accumulator, sensor) => {
      const {
        sensor: Sensor
      } = sensor;
      const sensorActivators = Sensor.activators.map((activator) => ({
        eventName: activator.eventName,
        handler: getSyntheticHandler(activator.handler, sensor)
      }));
      return [...accumulator, ...sensorActivators];
    }, []), [sensors, getSyntheticHandler]);
  }
  var MeasuringStrategy;
  (function(MeasuringStrategy2) {
    MeasuringStrategy2[MeasuringStrategy2["Always"] = 0] = "Always";
    MeasuringStrategy2[MeasuringStrategy2["BeforeDragging"] = 1] = "BeforeDragging";
    MeasuringStrategy2[MeasuringStrategy2["WhileDragging"] = 2] = "WhileDragging";
  })(MeasuringStrategy || (MeasuringStrategy = {}));
  var MeasuringFrequency;
  (function(MeasuringFrequency2) {
    MeasuringFrequency2["Optimized"] = "optimized";
  })(MeasuringFrequency || (MeasuringFrequency = {}));
  const defaultValue = /* @__PURE__ */ new Map();
  function useDroppableMeasuring(containers, _ref4) {
    let {
      dragging,
      dependencies,
      config
    } = _ref4;
    const [queue, setQueue] = React__default.useState(null);
    const {
      frequency,
      measure,
      strategy
    } = config;
    const containersRef = React__default.useRef(containers);
    const disabled = isDisabled();
    const disabledRef = useLatestValue(disabled);
    const measureDroppableContainers = React__default.useCallback(function(ids2) {
      if (ids2 === void 0) {
        ids2 = [];
      }
      if (disabledRef.current) {
        return;
      }
      setQueue((value) => {
        if (value === null) {
          return ids2;
        }
        return value.concat(ids2.filter((id) => !value.includes(id)));
      });
    }, [disabledRef]);
    const timeoutId = React__default.useRef(null);
    const droppableRects = useLazyMemo((previousValue) => {
      if (disabled && !dragging) {
        return defaultValue;
      }
      if (!previousValue || previousValue === defaultValue || containersRef.current !== containers || queue != null) {
        const map = /* @__PURE__ */ new Map();
        for (let container of containers) {
          if (!container) {
            continue;
          }
          if (queue && queue.length > 0 && !queue.includes(container.id) && container.rect.current) {
            map.set(container.id, container.rect.current);
            continue;
          }
          const node2 = container.node.current;
          const rect = node2 ? new Rect(measure(node2), node2) : null;
          container.rect.current = rect;
          if (rect) {
            map.set(container.id, rect);
          }
        }
        return map;
      }
      return previousValue;
    }, [containers, queue, dragging, disabled, measure]);
    React__default.useEffect(() => {
      containersRef.current = containers;
    }, [containers]);
    React__default.useEffect(
      () => {
        if (disabled) {
          return;
        }
        measureDroppableContainers();
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [dragging, disabled]
    );
    React__default.useEffect(
      () => {
        if (queue && queue.length > 0) {
          setQueue(null);
        }
      },
      //eslint-disable-next-line react-hooks/exhaustive-deps
      [JSON.stringify(queue)]
    );
    React__default.useEffect(
      () => {
        if (disabled || typeof frequency !== "number" || timeoutId.current !== null) {
          return;
        }
        timeoutId.current = setTimeout(() => {
          measureDroppableContainers();
          timeoutId.current = null;
        }, frequency);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [frequency, disabled, measureDroppableContainers, ...dependencies]
    );
    return {
      droppableRects,
      measureDroppableContainers,
      measuringScheduled: queue != null
    };
    function isDisabled() {
      switch (strategy) {
        case MeasuringStrategy.Always:
          return false;
        case MeasuringStrategy.BeforeDragging:
          return dragging;
        default:
          return !dragging;
      }
    }
  }
  function useInitialValue(value, computeFn) {
    return useLazyMemo((previousValue) => {
      if (!value) {
        return null;
      }
      if (previousValue) {
        return previousValue;
      }
      return typeof computeFn === "function" ? computeFn(value) : value;
    }, [computeFn, value]);
  }
  function useInitialRect(node2, measure) {
    return useInitialValue(node2, measure);
  }
  function useMutationObserver(_ref4) {
    let {
      callback,
      disabled
    } = _ref4;
    const handleMutations = useEvent(callback);
    const mutationObserver = React__default.useMemo(() => {
      if (disabled || typeof window === "undefined" || typeof window.MutationObserver === "undefined") {
        return void 0;
      }
      const {
        MutationObserver: MutationObserver2
      } = window;
      return new MutationObserver2(handleMutations);
    }, [handleMutations, disabled]);
    React__default.useEffect(() => {
      return () => mutationObserver == null ? void 0 : mutationObserver.disconnect();
    }, [mutationObserver]);
    return mutationObserver;
  }
  function useResizeObserver(_ref4) {
    let {
      callback,
      disabled
    } = _ref4;
    const handleResize = useEvent(callback);
    const resizeObserver = React__default.useMemo(
      () => {
        if (disabled || typeof window === "undefined" || typeof window.ResizeObserver === "undefined") {
          return void 0;
        }
        const {
          ResizeObserver: ResizeObserver2
        } = window;
        return new ResizeObserver2(handleResize);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [disabled]
    );
    React__default.useEffect(() => {
      return () => resizeObserver == null ? void 0 : resizeObserver.disconnect();
    }, [resizeObserver]);
    return resizeObserver;
  }
  function defaultMeasure(element) {
    return new Rect(getClientRect(element), element);
  }
  function useRect(element, measure, fallbackRect) {
    if (measure === void 0) {
      measure = defaultMeasure;
    }
    const [rect, measureRect] = React__default.useReducer(reducer2, null);
    const mutationObserver = useMutationObserver({
      callback(records) {
        if (!element) {
          return;
        }
        for (const record of records) {
          const {
            type,
            target
          } = record;
          if (type === "childList" && target instanceof HTMLElement && target.contains(element)) {
            measureRect();
            break;
          }
        }
      }
    });
    const resizeObserver = useResizeObserver({
      callback: measureRect
    });
    useIsomorphicLayoutEffect(() => {
      measureRect();
      if (element) {
        resizeObserver == null ? void 0 : resizeObserver.observe(element);
        mutationObserver == null ? void 0 : mutationObserver.observe(document.body, {
          childList: true,
          subtree: true
        });
      } else {
        resizeObserver == null ? void 0 : resizeObserver.disconnect();
        mutationObserver == null ? void 0 : mutationObserver.disconnect();
      }
    }, [element]);
    return rect;
    function reducer2(currentRect) {
      if (!element) {
        return null;
      }
      if (element.isConnected === false) {
        var _ref4;
        return (_ref4 = currentRect != null ? currentRect : fallbackRect) != null ? _ref4 : null;
      }
      const newRect = measure(element);
      if (JSON.stringify(currentRect) === JSON.stringify(newRect)) {
        return currentRect;
      }
      return newRect;
    }
  }
  function useRectDelta(rect) {
    const initialRect = useInitialValue(rect);
    return getRectDelta(rect, initialRect);
  }
  const defaultValue$1 = [];
  function useScrollableAncestors(node2) {
    const previousNode = React__default.useRef(node2);
    const ancestors = useLazyMemo((previousValue) => {
      if (!node2) {
        return defaultValue$1;
      }
      if (previousValue && previousValue !== defaultValue$1 && node2 && previousNode.current && node2.parentNode === previousNode.current.parentNode) {
        return previousValue;
      }
      return getScrollableAncestors(node2);
    }, [node2]);
    React__default.useEffect(() => {
      previousNode.current = node2;
    }, [node2]);
    return ancestors;
  }
  function useScrollOffsets(elements) {
    const [scrollCoordinates, setScrollCoordinates] = React__default.useState(null);
    const prevElements = React__default.useRef(elements);
    const handleScroll = React__default.useCallback((event) => {
      const scrollingElement = getScrollableElement(event.target);
      if (!scrollingElement) {
        return;
      }
      setScrollCoordinates((scrollCoordinates2) => {
        if (!scrollCoordinates2) {
          return null;
        }
        scrollCoordinates2.set(scrollingElement, getScrollCoordinates(scrollingElement));
        return new Map(scrollCoordinates2);
      });
    }, []);
    React__default.useEffect(() => {
      const previousElements = prevElements.current;
      if (elements !== previousElements) {
        cleanup(previousElements);
        const entries = elements.map((element) => {
          const scrollableElement = getScrollableElement(element);
          if (scrollableElement) {
            scrollableElement.addEventListener("scroll", handleScroll, {
              passive: true
            });
            return [scrollableElement, getScrollCoordinates(scrollableElement)];
          }
          return null;
        }).filter((entry) => entry != null);
        setScrollCoordinates(entries.length ? new Map(entries) : null);
        prevElements.current = elements;
      }
      return () => {
        cleanup(elements);
        cleanup(previousElements);
      };
      function cleanup(elements2) {
        elements2.forEach((element) => {
          const scrollableElement = getScrollableElement(element);
          scrollableElement == null ? void 0 : scrollableElement.removeEventListener("scroll", handleScroll);
        });
      }
    }, [handleScroll, elements]);
    return React__default.useMemo(() => {
      if (elements.length) {
        return scrollCoordinates ? Array.from(scrollCoordinates.values()).reduce((acc, coordinates) => add(acc, coordinates), defaultCoordinates) : getScrollOffsets(elements);
      }
      return defaultCoordinates;
    }, [elements, scrollCoordinates]);
  }
  function useScrollOffsetsDelta(scrollOffsets, dependencies) {
    if (dependencies === void 0) {
      dependencies = [];
    }
    const initialScrollOffsets = React__default.useRef(null);
    React__default.useEffect(
      () => {
        initialScrollOffsets.current = null;
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      dependencies
    );
    React__default.useEffect(() => {
      const hasScrollOffsets = scrollOffsets !== defaultCoordinates;
      if (hasScrollOffsets && !initialScrollOffsets.current) {
        initialScrollOffsets.current = scrollOffsets;
      }
      if (!hasScrollOffsets && initialScrollOffsets.current) {
        initialScrollOffsets.current = null;
      }
    }, [scrollOffsets]);
    return initialScrollOffsets.current ? subtract(scrollOffsets, initialScrollOffsets.current) : defaultCoordinates;
  }
  function useSensorSetup(sensors) {
    React__default.useEffect(
      () => {
        if (!canUseDOM) {
          return;
        }
        const teardownFns = sensors.map((_ref4) => {
          let {
            sensor
          } = _ref4;
          return sensor.setup == null ? void 0 : sensor.setup();
        });
        return () => {
          for (const teardown of teardownFns) {
            teardown == null ? void 0 : teardown();
          }
        };
      },
      // TO-DO: Sensors length could theoretically change which would not be a valid dependency
      // eslint-disable-next-line react-hooks/exhaustive-deps
      sensors.map((_ref22) => {
        let {
          sensor
        } = _ref22;
        return sensor;
      })
    );
  }
  function useSyntheticListeners(listeners2, id) {
    return React__default.useMemo(() => {
      return listeners2.reduce((acc, _ref4) => {
        let {
          eventName,
          handler
        } = _ref4;
        acc[eventName] = (event) => {
          handler(event, id);
        };
        return acc;
      }, {});
    }, [listeners2, id]);
  }
  function useWindowRect(element) {
    return React__default.useMemo(() => element ? getWindowClientRect(element) : null, [element]);
  }
  const defaultValue$2 = [];
  function useRects(elements, measure) {
    if (measure === void 0) {
      measure = getClientRect;
    }
    const [firstElement] = elements;
    const windowRect = useWindowRect(firstElement ? getWindow(firstElement) : null);
    const [rects, measureRects] = React__default.useReducer(reducer2, defaultValue$2);
    const resizeObserver = useResizeObserver({
      callback: measureRects
    });
    if (elements.length > 0 && rects === defaultValue$2) {
      measureRects();
    }
    useIsomorphicLayoutEffect(() => {
      if (elements.length) {
        elements.forEach((element) => resizeObserver == null ? void 0 : resizeObserver.observe(element));
      } else {
        resizeObserver == null ? void 0 : resizeObserver.disconnect();
        measureRects();
      }
    }, [elements]);
    return rects;
    function reducer2() {
      if (!elements.length) {
        return defaultValue$2;
      }
      return elements.map((element) => isDocumentScrollingElement(element) ? windowRect : new Rect(measure(element), element));
    }
  }
  function getMeasurableNode(node2) {
    if (!node2) {
      return null;
    }
    if (node2.children.length > 1) {
      return node2;
    }
    const firstChild = node2.children[0];
    return isHTMLElement(firstChild) ? firstChild : node2;
  }
  function useDragOverlayMeasuring(_ref4) {
    let {
      measure
    } = _ref4;
    const [rect, setRect] = React__default.useState(null);
    const handleResize = React__default.useCallback((entries) => {
      for (const {
        target
      } of entries) {
        if (isHTMLElement(target)) {
          setRect((rect2) => {
            const newRect = measure(target);
            return rect2 ? {
              ...rect2,
              width: newRect.width,
              height: newRect.height
            } : newRect;
          });
          break;
        }
      }
    }, [measure]);
    const resizeObserver = useResizeObserver({
      callback: handleResize
    });
    const handleNodeChange = React__default.useCallback((element) => {
      const node2 = getMeasurableNode(element);
      resizeObserver == null ? void 0 : resizeObserver.disconnect();
      if (node2) {
        resizeObserver == null ? void 0 : resizeObserver.observe(node2);
      }
      setRect(node2 ? measure(node2) : null);
    }, [measure, resizeObserver]);
    const [nodeRef, setRef] = useNodeRef(handleNodeChange);
    return React__default.useMemo(() => ({
      nodeRef,
      rect,
      setRef
    }), [rect, nodeRef, setRef]);
  }
  const defaultSensors = [{
    sensor: PointerSensor,
    options: {}
  }, {
    sensor: KeyboardSensor,
    options: {}
  }];
  const defaultData = {
    current: {}
  };
  const defaultMeasuringConfiguration = {
    draggable: {
      measure: getTransformAgnosticClientRect
    },
    droppable: {
      measure: getTransformAgnosticClientRect,
      strategy: MeasuringStrategy.WhileDragging,
      frequency: MeasuringFrequency.Optimized
    },
    dragOverlay: {
      measure: getClientRect
    }
  };
  class DroppableContainersMap extends Map {
    get(id) {
      var _super$get;
      return id != null ? (_super$get = super.get(id)) != null ? _super$get : void 0 : void 0;
    }
    toArray() {
      return Array.from(this.values());
    }
    getEnabled() {
      return this.toArray().filter((_ref4) => {
        let {
          disabled
        } = _ref4;
        return !disabled;
      });
    }
    getNodeFor(id) {
      var _this$get$node$curren, _this$get;
      return (_this$get$node$curren = (_this$get = this.get(id)) == null ? void 0 : _this$get.node.current) != null ? _this$get$node$curren : void 0;
    }
  }
  const defaultPublicContext = {
    activatorEvent: null,
    active: null,
    activeNode: null,
    activeNodeRect: null,
    collisions: null,
    containerNodeRect: null,
    draggableNodes: /* @__PURE__ */ new Map(),
    droppableRects: /* @__PURE__ */ new Map(),
    droppableContainers: /* @__PURE__ */ new DroppableContainersMap(),
    over: null,
    dragOverlay: {
      nodeRef: {
        current: null
      },
      rect: null,
      setRef: noop
    },
    scrollableAncestors: [],
    scrollableAncestorRects: [],
    measuringConfiguration: defaultMeasuringConfiguration,
    measureDroppableContainers: noop,
    windowRect: null,
    measuringScheduled: false
  };
  const defaultInternalContext = {
    activatorEvent: null,
    activators: [],
    active: null,
    activeNodeRect: null,
    ariaDescribedById: {
      draggable: ""
    },
    dispatch: noop,
    draggableNodes: /* @__PURE__ */ new Map(),
    over: null,
    measureDroppableContainers: noop
  };
  const InternalContext = /* @__PURE__ */ React__default.createContext(defaultInternalContext);
  const PublicContext = /* @__PURE__ */ React__default.createContext(defaultPublicContext);
  function getInitialState() {
    return {
      draggable: {
        active: null,
        initialCoordinates: {
          x: 0,
          y: 0
        },
        nodes: /* @__PURE__ */ new Map(),
        translate: {
          x: 0,
          y: 0
        }
      },
      droppable: {
        containers: new DroppableContainersMap()
      }
    };
  }
  function reducer(state, action2) {
    switch (action2.type) {
      case Action.DragStart:
        return {
          ...state,
          draggable: {
            ...state.draggable,
            initialCoordinates: action2.initialCoordinates,
            active: action2.active
          }
        };
      case Action.DragMove:
        if (!state.draggable.active) {
          return state;
        }
        return {
          ...state,
          draggable: {
            ...state.draggable,
            translate: {
              x: action2.coordinates.x - state.draggable.initialCoordinates.x,
              y: action2.coordinates.y - state.draggable.initialCoordinates.y
            }
          }
        };
      case Action.DragEnd:
      case Action.DragCancel:
        return {
          ...state,
          draggable: {
            ...state.draggable,
            active: null,
            initialCoordinates: {
              x: 0,
              y: 0
            },
            translate: {
              x: 0,
              y: 0
            }
          }
        };
      case Action.RegisterDroppable: {
        const {
          element
        } = action2;
        const {
          id
        } = element;
        const containers = new DroppableContainersMap(state.droppable.containers);
        containers.set(id, element);
        return {
          ...state,
          droppable: {
            ...state.droppable,
            containers
          }
        };
      }
      case Action.SetDroppableDisabled: {
        const {
          id,
          key: key2,
          disabled
        } = action2;
        const element = state.droppable.containers.get(id);
        if (!element || key2 !== element.key) {
          return state;
        }
        const containers = new DroppableContainersMap(state.droppable.containers);
        containers.set(id, {
          ...element,
          disabled
        });
        return {
          ...state,
          droppable: {
            ...state.droppable,
            containers
          }
        };
      }
      case Action.UnregisterDroppable: {
        const {
          id,
          key: key2
        } = action2;
        const element = state.droppable.containers.get(id);
        if (!element || key2 !== element.key) {
          return state;
        }
        const containers = new DroppableContainersMap(state.droppable.containers);
        containers.delete(id);
        return {
          ...state,
          droppable: {
            ...state.droppable,
            containers
          }
        };
      }
      default: {
        return state;
      }
    }
  }
  function RestoreFocus(_ref4) {
    let {
      disabled
    } = _ref4;
    const {
      active,
      activatorEvent,
      draggableNodes
    } = React__default.useContext(InternalContext);
    const previousActivatorEvent = usePrevious(activatorEvent);
    const previousActiveId = usePrevious(active == null ? void 0 : active.id);
    React__default.useEffect(() => {
      if (disabled) {
        return;
      }
      if (!activatorEvent && previousActivatorEvent && previousActiveId != null) {
        if (!isKeyboardEvent(previousActivatorEvent)) {
          return;
        }
        if (document.activeElement === previousActivatorEvent.target) {
          return;
        }
        const draggableNode = draggableNodes.get(previousActiveId);
        if (!draggableNode) {
          return;
        }
        const {
          activatorNode,
          node: node2
        } = draggableNode;
        if (!activatorNode.current && !node2.current) {
          return;
        }
        requestAnimationFrame(() => {
          for (const element of [activatorNode.current, node2.current]) {
            if (!element) {
              continue;
            }
            const focusableNode = findFirstFocusableNode(element);
            if (focusableNode) {
              focusableNode.focus();
              break;
            }
          }
        });
      }
    }, [activatorEvent, disabled, draggableNodes, previousActiveId, previousActivatorEvent]);
    return null;
  }
  function applyModifiers(modifiers, _ref4) {
    let {
      transform,
      ...args
    } = _ref4;
    return modifiers != null && modifiers.length ? modifiers.reduce((accumulator, modifier) => {
      return modifier({
        transform: accumulator,
        ...args
      });
    }, transform) : transform;
  }
  function useMeasuringConfiguration(config) {
    return React__default.useMemo(
      () => ({
        draggable: {
          ...defaultMeasuringConfiguration.draggable,
          ...config == null ? void 0 : config.draggable
        },
        droppable: {
          ...defaultMeasuringConfiguration.droppable,
          ...config == null ? void 0 : config.droppable
        },
        dragOverlay: {
          ...defaultMeasuringConfiguration.dragOverlay,
          ...config == null ? void 0 : config.dragOverlay
        }
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [config == null ? void 0 : config.draggable, config == null ? void 0 : config.droppable, config == null ? void 0 : config.dragOverlay]
    );
  }
  function useLayoutShiftScrollCompensation(_ref4) {
    let {
      activeNode,
      measure,
      initialRect,
      config = true
    } = _ref4;
    const initialized = React__default.useRef(false);
    const {
      x: x2,
      y: y2
    } = typeof config === "boolean" ? {
      x: config,
      y: config
    } : config;
    useIsomorphicLayoutEffect(() => {
      const disabled = !x2 && !y2;
      if (disabled || !activeNode) {
        initialized.current = false;
        return;
      }
      if (initialized.current || !initialRect) {
        return;
      }
      const node2 = activeNode == null ? void 0 : activeNode.node.current;
      if (!node2 || node2.isConnected === false) {
        return;
      }
      const rect = measure(node2);
      const rectDelta = getRectDelta(rect, initialRect);
      if (!x2) {
        rectDelta.x = 0;
      }
      if (!y2) {
        rectDelta.y = 0;
      }
      initialized.current = true;
      if (Math.abs(rectDelta.x) > 0 || Math.abs(rectDelta.y) > 0) {
        const firstScrollableAncestor = getFirstScrollableAncestor(node2);
        if (firstScrollableAncestor) {
          firstScrollableAncestor.scrollBy({
            top: rectDelta.y,
            left: rectDelta.x
          });
        }
      }
    }, [activeNode, x2, y2, initialRect, measure]);
  }
  const ActiveDraggableContext = /* @__PURE__ */ React__default.createContext({
    ...defaultCoordinates,
    scaleX: 1,
    scaleY: 1
  });
  var Status;
  (function(Status2) {
    Status2[Status2["Uninitialized"] = 0] = "Uninitialized";
    Status2[Status2["Initializing"] = 1] = "Initializing";
    Status2[Status2["Initialized"] = 2] = "Initialized";
  })(Status || (Status = {}));
  const DndContext = /* @__PURE__ */ React__default.memo(function DndContext2(_ref4) {
    var _sensorContext$curren, _dragOverlay$nodeRef$, _dragOverlay$rect, _over$rect;
    let {
      id,
      accessibility,
      autoScroll = true,
      children,
      sensors = defaultSensors,
      collisionDetection = rectIntersection,
      measuring,
      modifiers,
      ...props
    } = _ref4;
    const store2 = React__default.useReducer(reducer, void 0, getInitialState);
    const [state, dispatch] = store2;
    const [dispatchMonitorEvent, registerMonitorListener] = useDndMonitorProvider();
    const [status, setStatus] = React__default.useState(Status.Uninitialized);
    const isInitialized = status === Status.Initialized;
    const {
      draggable: {
        active: activeId,
        nodes: draggableNodes,
        translate
      },
      droppable: {
        containers: droppableContainers
      }
    } = state;
    const node2 = activeId ? draggableNodes.get(activeId) : null;
    const activeRects = React__default.useRef({
      initial: null,
      translated: null
    });
    const active = React__default.useMemo(() => {
      var _node$data;
      return activeId != null ? {
        id: activeId,
        // It's possible for the active node to unmount while dragging
        data: (_node$data = node2 == null ? void 0 : node2.data) != null ? _node$data : defaultData,
        rect: activeRects
      } : null;
    }, [activeId, node2]);
    const activeRef = React__default.useRef(null);
    const [activeSensor, setActiveSensor] = React__default.useState(null);
    const [activatorEvent, setActivatorEvent] = React__default.useState(null);
    const latestProps = useLatestValue(props, Object.values(props));
    const draggableDescribedById = useUniqueId("DndDescribedBy", id);
    const enabledDroppableContainers = React__default.useMemo(() => droppableContainers.getEnabled(), [droppableContainers]);
    const measuringConfiguration = useMeasuringConfiguration(measuring);
    const {
      droppableRects,
      measureDroppableContainers,
      measuringScheduled
    } = useDroppableMeasuring(enabledDroppableContainers, {
      dragging: isInitialized,
      dependencies: [translate.x, translate.y],
      config: measuringConfiguration.droppable
    });
    const activeNode = useCachedNode(draggableNodes, activeId);
    const activationCoordinates = React__default.useMemo(() => activatorEvent ? getEventCoordinates(activatorEvent) : null, [activatorEvent]);
    const autoScrollOptions = getAutoScrollerOptions();
    const initialActiveNodeRect = useInitialRect(activeNode, measuringConfiguration.draggable.measure);
    useLayoutShiftScrollCompensation({
      activeNode: activeId ? draggableNodes.get(activeId) : null,
      config: autoScrollOptions.layoutShiftCompensation,
      initialRect: initialActiveNodeRect,
      measure: measuringConfiguration.draggable.measure
    });
    const activeNodeRect = useRect(activeNode, measuringConfiguration.draggable.measure, initialActiveNodeRect);
    const containerNodeRect = useRect(activeNode ? activeNode.parentElement : null);
    const sensorContext = React__default.useRef({
      activatorEvent: null,
      active: null,
      activeNode,
      collisionRect: null,
      collisions: null,
      droppableRects,
      draggableNodes,
      draggingNode: null,
      draggingNodeRect: null,
      droppableContainers,
      over: null,
      scrollableAncestors: [],
      scrollAdjustedTranslate: null
    });
    const overNode = droppableContainers.getNodeFor((_sensorContext$curren = sensorContext.current.over) == null ? void 0 : _sensorContext$curren.id);
    const dragOverlay = useDragOverlayMeasuring({
      measure: measuringConfiguration.dragOverlay.measure
    });
    const draggingNode = (_dragOverlay$nodeRef$ = dragOverlay.nodeRef.current) != null ? _dragOverlay$nodeRef$ : activeNode;
    const draggingNodeRect = isInitialized ? (_dragOverlay$rect = dragOverlay.rect) != null ? _dragOverlay$rect : activeNodeRect : null;
    const usesDragOverlay = Boolean(dragOverlay.nodeRef.current && dragOverlay.rect);
    const nodeRectDelta = useRectDelta(usesDragOverlay ? null : activeNodeRect);
    const windowRect = useWindowRect(draggingNode ? getWindow(draggingNode) : null);
    const scrollableAncestors = useScrollableAncestors(isInitialized ? overNode != null ? overNode : activeNode : null);
    const scrollableAncestorRects = useRects(scrollableAncestors);
    const modifiedTranslate = applyModifiers(modifiers, {
      transform: {
        x: translate.x - nodeRectDelta.x,
        y: translate.y - nodeRectDelta.y,
        scaleX: 1,
        scaleY: 1
      },
      activatorEvent,
      active,
      activeNodeRect,
      containerNodeRect,
      draggingNodeRect,
      over: sensorContext.current.over,
      overlayNodeRect: dragOverlay.rect,
      scrollableAncestors,
      scrollableAncestorRects,
      windowRect
    });
    const pointerCoordinates = activationCoordinates ? add(activationCoordinates, translate) : null;
    const scrollOffsets = useScrollOffsets(scrollableAncestors);
    const scrollAdjustment = useScrollOffsetsDelta(scrollOffsets);
    const activeNodeScrollDelta = useScrollOffsetsDelta(scrollOffsets, [activeNodeRect]);
    const scrollAdjustedTranslate = add(modifiedTranslate, scrollAdjustment);
    const collisionRect = draggingNodeRect ? getAdjustedRect(draggingNodeRect, modifiedTranslate) : null;
    const collisions = active && collisionRect ? collisionDetection({
      active,
      collisionRect,
      droppableRects,
      droppableContainers: enabledDroppableContainers,
      pointerCoordinates
    }) : null;
    const overId = getFirstCollision(collisions, "id");
    const [over, setOver] = React__default.useState(null);
    const appliedTranslate = usesDragOverlay ? modifiedTranslate : add(modifiedTranslate, activeNodeScrollDelta);
    const transform = adjustScale(appliedTranslate, (_over$rect = over == null ? void 0 : over.rect) != null ? _over$rect : null, activeNodeRect);
    const instantiateSensor = React__default.useCallback(
      (event, _ref22) => {
        let {
          sensor: Sensor,
          options
        } = _ref22;
        if (activeRef.current == null) {
          return;
        }
        const activeNode2 = draggableNodes.get(activeRef.current);
        if (!activeNode2) {
          return;
        }
        const activatorEvent2 = event.nativeEvent;
        const sensorInstance = new Sensor({
          active: activeRef.current,
          activeNode: activeNode2,
          event: activatorEvent2,
          options,
          // Sensors need to be instantiated with refs for arguments that change over time
          // otherwise they are frozen in time with the stale arguments
          context: sensorContext,
          onStart(initialCoordinates) {
            const id2 = activeRef.current;
            if (id2 == null) {
              return;
            }
            const draggableNode = draggableNodes.get(id2);
            if (!draggableNode) {
              return;
            }
            const {
              onDragStart
            } = latestProps.current;
            const event2 = {
              active: {
                id: id2,
                data: draggableNode.data,
                rect: activeRects
              }
            };
            require$$0.unstable_batchedUpdates(() => {
              onDragStart == null ? void 0 : onDragStart(event2);
              setStatus(Status.Initializing);
              dispatch({
                type: Action.DragStart,
                initialCoordinates,
                active: id2
              });
              dispatchMonitorEvent({
                type: "onDragStart",
                event: event2
              });
            });
          },
          onMove(coordinates) {
            dispatch({
              type: Action.DragMove,
              coordinates
            });
          },
          onEnd: createHandler2(Action.DragEnd),
          onCancel: createHandler2(Action.DragCancel)
        });
        require$$0.unstable_batchedUpdates(() => {
          setActiveSensor(sensorInstance);
          setActivatorEvent(event.nativeEvent);
        });
        function createHandler2(type) {
          return async function handler() {
            const {
              active: active2,
              collisions: collisions2,
              over: over2,
              scrollAdjustedTranslate: scrollAdjustedTranslate2
            } = sensorContext.current;
            let event2 = null;
            if (active2 && scrollAdjustedTranslate2) {
              const {
                cancelDrop
              } = latestProps.current;
              event2 = {
                activatorEvent: activatorEvent2,
                active: active2,
                collisions: collisions2,
                delta: scrollAdjustedTranslate2,
                over: over2
              };
              if (type === Action.DragEnd && typeof cancelDrop === "function") {
                const shouldCancel = await Promise.resolve(cancelDrop(event2));
                if (shouldCancel) {
                  type = Action.DragCancel;
                }
              }
            }
            activeRef.current = null;
            require$$0.unstable_batchedUpdates(() => {
              dispatch({
                type
              });
              setStatus(Status.Uninitialized);
              setOver(null);
              setActiveSensor(null);
              setActivatorEvent(null);
              const eventName = type === Action.DragEnd ? "onDragEnd" : "onDragCancel";
              if (event2) {
                const handler2 = latestProps.current[eventName];
                handler2 == null ? void 0 : handler2(event2);
                dispatchMonitorEvent({
                  type: eventName,
                  event: event2
                });
              }
            });
          };
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [draggableNodes]
    );
    const bindActivatorToSensorInstantiator = React__default.useCallback((handler, sensor) => {
      return (event, active2) => {
        const nativeEvent = event.nativeEvent;
        const activeDraggableNode = draggableNodes.get(active2);
        if (
          // Another sensor is already instantiating
          activeRef.current !== null || // No active draggable
          !activeDraggableNode || // Event has already been captured
          nativeEvent.dndKit || nativeEvent.defaultPrevented
        ) {
          return;
        }
        const activationContext = {
          active: activeDraggableNode
        };
        const shouldActivate = handler(event, sensor.options, activationContext);
        if (shouldActivate === true) {
          nativeEvent.dndKit = {
            capturedBy: sensor.sensor
          };
          activeRef.current = active2;
          instantiateSensor(event, sensor);
        }
      };
    }, [draggableNodes, instantiateSensor]);
    const activators = useCombineActivators(sensors, bindActivatorToSensorInstantiator);
    useSensorSetup(sensors);
    useIsomorphicLayoutEffect(() => {
      if (activeNodeRect && status === Status.Initializing) {
        setStatus(Status.Initialized);
      }
    }, [activeNodeRect, status]);
    React__default.useEffect(
      () => {
        const {
          onDragMove
        } = latestProps.current;
        const {
          active: active2,
          activatorEvent: activatorEvent2,
          collisions: collisions2,
          over: over2
        } = sensorContext.current;
        if (!active2 || !activatorEvent2) {
          return;
        }
        const event = {
          active: active2,
          activatorEvent: activatorEvent2,
          collisions: collisions2,
          delta: {
            x: scrollAdjustedTranslate.x,
            y: scrollAdjustedTranslate.y
          },
          over: over2
        };
        require$$0.unstable_batchedUpdates(() => {
          onDragMove == null ? void 0 : onDragMove(event);
          dispatchMonitorEvent({
            type: "onDragMove",
            event
          });
        });
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [scrollAdjustedTranslate.x, scrollAdjustedTranslate.y]
    );
    React__default.useEffect(
      () => {
        const {
          active: active2,
          activatorEvent: activatorEvent2,
          collisions: collisions2,
          droppableContainers: droppableContainers2,
          scrollAdjustedTranslate: scrollAdjustedTranslate2
        } = sensorContext.current;
        if (!active2 || activeRef.current == null || !activatorEvent2 || !scrollAdjustedTranslate2) {
          return;
        }
        const {
          onDragOver
        } = latestProps.current;
        const overContainer = droppableContainers2.get(overId);
        const over2 = overContainer && overContainer.rect.current ? {
          id: overContainer.id,
          rect: overContainer.rect.current,
          data: overContainer.data,
          disabled: overContainer.disabled
        } : null;
        const event = {
          active: active2,
          activatorEvent: activatorEvent2,
          collisions: collisions2,
          delta: {
            x: scrollAdjustedTranslate2.x,
            y: scrollAdjustedTranslate2.y
          },
          over: over2
        };
        require$$0.unstable_batchedUpdates(() => {
          setOver(over2);
          onDragOver == null ? void 0 : onDragOver(event);
          dispatchMonitorEvent({
            type: "onDragOver",
            event
          });
        });
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [overId]
    );
    useIsomorphicLayoutEffect(() => {
      sensorContext.current = {
        activatorEvent,
        active,
        activeNode,
        collisionRect,
        collisions,
        droppableRects,
        draggableNodes,
        draggingNode,
        draggingNodeRect,
        droppableContainers,
        over,
        scrollableAncestors,
        scrollAdjustedTranslate
      };
      activeRects.current = {
        initial: draggingNodeRect,
        translated: collisionRect
      };
    }, [active, activeNode, collisions, collisionRect, draggableNodes, draggingNode, draggingNodeRect, droppableRects, droppableContainers, over, scrollableAncestors, scrollAdjustedTranslate]);
    useAutoScroller({
      ...autoScrollOptions,
      delta: translate,
      draggingRect: collisionRect,
      pointerCoordinates,
      scrollableAncestors,
      scrollableAncestorRects
    });
    const publicContext = React__default.useMemo(() => {
      const context = {
        active,
        activeNode,
        activeNodeRect,
        activatorEvent,
        collisions,
        containerNodeRect,
        dragOverlay,
        draggableNodes,
        droppableContainers,
        droppableRects,
        over,
        measureDroppableContainers,
        scrollableAncestors,
        scrollableAncestorRects,
        measuringConfiguration,
        measuringScheduled,
        windowRect
      };
      return context;
    }, [active, activeNode, activeNodeRect, activatorEvent, collisions, containerNodeRect, dragOverlay, draggableNodes, droppableContainers, droppableRects, over, measureDroppableContainers, scrollableAncestors, scrollableAncestorRects, measuringConfiguration, measuringScheduled, windowRect]);
    const internalContext = React__default.useMemo(() => {
      const context = {
        activatorEvent,
        activators,
        active,
        activeNodeRect,
        ariaDescribedById: {
          draggable: draggableDescribedById
        },
        dispatch,
        draggableNodes,
        over,
        measureDroppableContainers
      };
      return context;
    }, [activatorEvent, activators, active, activeNodeRect, dispatch, draggableDescribedById, draggableNodes, over, measureDroppableContainers]);
    return React__default.createElement(DndMonitorContext.Provider, {
      value: registerMonitorListener
    }, React__default.createElement(InternalContext.Provider, {
      value: internalContext
    }, React__default.createElement(PublicContext.Provider, {
      value: publicContext
    }, React__default.createElement(ActiveDraggableContext.Provider, {
      value: transform
    }, children)), React__default.createElement(RestoreFocus, {
      disabled: (accessibility == null ? void 0 : accessibility.restoreFocus) === false
    })), React__default.createElement(Accessibility, {
      ...accessibility,
      hiddenTextDescribedById: draggableDescribedById
    }));
    function getAutoScrollerOptions() {
      const activeSensorDisablesAutoscroll = (activeSensor == null ? void 0 : activeSensor.autoScrollEnabled) === false;
      const autoScrollGloballyDisabled = typeof autoScroll === "object" ? autoScroll.enabled === false : autoScroll === false;
      const enabled = isInitialized && !activeSensorDisablesAutoscroll && !autoScrollGloballyDisabled;
      if (typeof autoScroll === "object") {
        return {
          ...autoScroll,
          enabled
        };
      }
      return {
        enabled
      };
    }
  });
  const NullContext = /* @__PURE__ */ React__default.createContext(null);
  const defaultRole = "button";
  const ID_PREFIX$1 = "Droppable";
  function useDraggable(_ref4) {
    let {
      id,
      data: data2,
      disabled = false,
      attributes
    } = _ref4;
    const key2 = useUniqueId(ID_PREFIX$1);
    const {
      activators,
      activatorEvent,
      active,
      activeNodeRect,
      ariaDescribedById,
      draggableNodes,
      over
    } = React__default.useContext(InternalContext);
    const {
      role = defaultRole,
      roleDescription = "draggable",
      tabIndex = 0
    } = attributes != null ? attributes : {};
    const isDragging = (active == null ? void 0 : active.id) === id;
    const transform = React__default.useContext(isDragging ? ActiveDraggableContext : NullContext);
    const [node2, setNodeRef] = useNodeRef();
    const [activatorNode, setActivatorNodeRef] = useNodeRef();
    const listeners2 = useSyntheticListeners(activators, id);
    const dataRef = useLatestValue(data2);
    useIsomorphicLayoutEffect(
      () => {
        draggableNodes.set(id, {
          id,
          key: key2,
          node: node2,
          activatorNode,
          data: dataRef
        });
        return () => {
          const node3 = draggableNodes.get(id);
          if (node3 && node3.key === key2) {
            draggableNodes.delete(id);
          }
        };
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [draggableNodes, id]
    );
    const memoizedAttributes = React__default.useMemo(() => ({
      role,
      tabIndex,
      "aria-disabled": disabled,
      "aria-pressed": isDragging && role === defaultRole ? true : void 0,
      "aria-roledescription": roleDescription,
      "aria-describedby": ariaDescribedById.draggable
    }), [disabled, role, tabIndex, isDragging, roleDescription, ariaDescribedById.draggable]);
    return {
      active,
      activatorEvent,
      activeNodeRect,
      attributes: memoizedAttributes,
      isDragging,
      listeners: disabled ? void 0 : listeners2,
      node: node2,
      over,
      setNodeRef,
      setActivatorNodeRef,
      transform
    };
  }
  function useDndContext() {
    return React__default.useContext(PublicContext);
  }
  const ID_PREFIX$1$1 = "Droppable";
  const defaultResizeObserverConfig = {
    timeout: 25
  };
  function useDroppable(_ref4) {
    let {
      data: data2,
      disabled = false,
      id,
      resizeObserverConfig
    } = _ref4;
    const key2 = useUniqueId(ID_PREFIX$1$1);
    const {
      active,
      dispatch,
      over,
      measureDroppableContainers
    } = React__default.useContext(InternalContext);
    const previous = React__default.useRef({
      disabled
    });
    const resizeObserverConnected = React__default.useRef(false);
    const rect = React__default.useRef(null);
    const callbackId = React__default.useRef(null);
    const {
      disabled: resizeObserverDisabled,
      updateMeasurementsFor,
      timeout: resizeObserverTimeout
    } = {
      ...defaultResizeObserverConfig,
      ...resizeObserverConfig
    };
    const ids2 = useLatestValue(updateMeasurementsFor != null ? updateMeasurementsFor : id);
    const handleResize = React__default.useCallback(
      () => {
        if (!resizeObserverConnected.current) {
          resizeObserverConnected.current = true;
          return;
        }
        if (callbackId.current != null) {
          clearTimeout(callbackId.current);
        }
        callbackId.current = setTimeout(() => {
          measureDroppableContainers(Array.isArray(ids2.current) ? ids2.current : [ids2.current]);
          callbackId.current = null;
        }, resizeObserverTimeout);
      },
      //eslint-disable-next-line react-hooks/exhaustive-deps
      [resizeObserverTimeout]
    );
    const resizeObserver = useResizeObserver({
      callback: handleResize,
      disabled: resizeObserverDisabled || !active
    });
    const handleNodeChange = React__default.useCallback((newElement, previousElement) => {
      if (!resizeObserver) {
        return;
      }
      if (previousElement) {
        resizeObserver.unobserve(previousElement);
        resizeObserverConnected.current = false;
      }
      if (newElement) {
        resizeObserver.observe(newElement);
      }
    }, [resizeObserver]);
    const [nodeRef, setNodeRef] = useNodeRef(handleNodeChange);
    const dataRef = useLatestValue(data2);
    React__default.useEffect(() => {
      if (!resizeObserver || !nodeRef.current) {
        return;
      }
      resizeObserver.disconnect();
      resizeObserverConnected.current = false;
      resizeObserver.observe(nodeRef.current);
    }, [nodeRef, resizeObserver]);
    useIsomorphicLayoutEffect(
      () => {
        dispatch({
          type: Action.RegisterDroppable,
          element: {
            id,
            key: key2,
            disabled,
            node: nodeRef,
            rect,
            data: dataRef
          }
        });
        return () => dispatch({
          type: Action.UnregisterDroppable,
          key: key2,
          id
        });
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [id]
    );
    React__default.useEffect(() => {
      if (disabled !== previous.current.disabled) {
        dispatch({
          type: Action.SetDroppableDisabled,
          id,
          key: key2,
          disabled
        });
        previous.current.disabled = disabled;
      }
    }, [id, key2, disabled, dispatch]);
    return {
      active,
      rect,
      isOver: (over == null ? void 0 : over.id) === id,
      node: nodeRef,
      over,
      setNodeRef
    };
  }
  function restrictToBoundingRect(transform, rect, boundingRect) {
    const value = {
      ...transform
    };
    if (rect.top + transform.y <= boundingRect.top) {
      value.y = boundingRect.top - rect.top;
    } else if (rect.bottom + transform.y >= boundingRect.top + boundingRect.height) {
      value.y = boundingRect.top + boundingRect.height - rect.bottom;
    }
    if (rect.left + transform.x <= boundingRect.left) {
      value.x = boundingRect.left - rect.left;
    } else if (rect.right + transform.x >= boundingRect.left + boundingRect.width) {
      value.x = boundingRect.left + boundingRect.width - rect.right;
    }
    return value;
  }
  const restrictToParentElement = (_ref4) => {
    let {
      containerNodeRect,
      draggingNodeRect,
      transform
    } = _ref4;
    if (!draggingNodeRect || !containerNodeRect) {
      return transform;
    }
    return restrictToBoundingRect(transform, draggingNodeRect, containerNodeRect);
  };
  const restrictToVerticalAxis = (_ref4) => {
    let {
      transform
    } = _ref4;
    return {
      ...transform,
      x: 0
    };
  };
  function arrayMove(array, from2, to) {
    const newArray = array.slice();
    newArray.splice(to < 0 ? newArray.length + to : to, 0, newArray.splice(from2, 1)[0]);
    return newArray;
  }
  function getSortedRects(items, rects) {
    return items.reduce((accumulator, id, index) => {
      const rect = rects.get(id);
      if (rect) {
        accumulator[index] = rect;
      }
      return accumulator;
    }, Array(items.length));
  }
  function isValidIndex(index) {
    return index !== null && index >= 0;
  }
  function itemsEqual(a, b2) {
    if (a === b2) {
      return true;
    }
    if (a.length !== b2.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b2[i]) {
        return false;
      }
    }
    return true;
  }
  function normalizeDisabled(disabled) {
    if (typeof disabled === "boolean") {
      return {
        draggable: disabled,
        droppable: disabled
      };
    }
    return disabled;
  }
  const rectSortingStrategy = (_ref4) => {
    let {
      rects,
      activeIndex,
      overIndex,
      index
    } = _ref4;
    const newRects = arrayMove(rects, overIndex, activeIndex);
    const oldRect = rects[index];
    const newRect = newRects[index];
    if (!newRect || !oldRect) {
      return null;
    }
    return {
      x: newRect.left - oldRect.left,
      y: newRect.top - oldRect.top,
      scaleX: newRect.width / oldRect.width,
      scaleY: newRect.height / oldRect.height
    };
  };
  const defaultScale$1 = {
    scaleX: 1,
    scaleY: 1
  };
  const verticalListSortingStrategy = (_ref4) => {
    var _rects$activeIndex;
    let {
      activeIndex,
      activeNodeRect: fallbackActiveRect,
      index,
      rects,
      overIndex
    } = _ref4;
    const activeNodeRect = (_rects$activeIndex = rects[activeIndex]) != null ? _rects$activeIndex : fallbackActiveRect;
    if (!activeNodeRect) {
      return null;
    }
    if (index === activeIndex) {
      const overIndexRect = rects[overIndex];
      if (!overIndexRect) {
        return null;
      }
      return {
        x: 0,
        y: activeIndex < overIndex ? overIndexRect.top + overIndexRect.height - (activeNodeRect.top + activeNodeRect.height) : overIndexRect.top - activeNodeRect.top,
        ...defaultScale$1
      };
    }
    const itemGap = getItemGap$1(rects, index, activeIndex);
    if (index > activeIndex && index <= overIndex) {
      return {
        x: 0,
        y: -activeNodeRect.height - itemGap,
        ...defaultScale$1
      };
    }
    if (index < activeIndex && index >= overIndex) {
      return {
        x: 0,
        y: activeNodeRect.height + itemGap,
        ...defaultScale$1
      };
    }
    return {
      x: 0,
      y: 0,
      ...defaultScale$1
    };
  };
  function getItemGap$1(clientRects, index, activeIndex) {
    const currentRect = clientRects[index];
    const previousRect = clientRects[index - 1];
    const nextRect = clientRects[index + 1];
    if (!currentRect) {
      return 0;
    }
    if (activeIndex < index) {
      return previousRect ? currentRect.top - (previousRect.top + previousRect.height) : nextRect ? nextRect.top - (currentRect.top + currentRect.height) : 0;
    }
    return nextRect ? nextRect.top - (currentRect.top + currentRect.height) : previousRect ? currentRect.top - (previousRect.top + previousRect.height) : 0;
  }
  const ID_PREFIX = "Sortable";
  const Context = /* @__PURE__ */ React__default.createContext({
    activeIndex: -1,
    containerId: ID_PREFIX,
    disableTransforms: false,
    items: [],
    overIndex: -1,
    useDragOverlay: false,
    sortedRects: [],
    strategy: rectSortingStrategy,
    disabled: {
      draggable: false,
      droppable: false
    }
  });
  function SortableContext(_ref4) {
    let {
      children,
      id,
      items: userDefinedItems,
      strategy = rectSortingStrategy,
      disabled: disabledProp = false
    } = _ref4;
    const {
      active,
      dragOverlay,
      droppableRects,
      over,
      measureDroppableContainers
    } = useDndContext();
    const containerId = useUniqueId(ID_PREFIX, id);
    const useDragOverlay = Boolean(dragOverlay.rect !== null);
    const items = React__default.useMemo(() => userDefinedItems.map((item) => typeof item === "object" && "id" in item ? item.id : item), [userDefinedItems]);
    const isDragging = active != null;
    const activeIndex = active ? items.indexOf(active.id) : -1;
    const overIndex = over ? items.indexOf(over.id) : -1;
    const previousItemsRef = React__default.useRef(items);
    const itemsHaveChanged = !itemsEqual(items, previousItemsRef.current);
    const disableTransforms = overIndex !== -1 && activeIndex === -1 || itemsHaveChanged;
    const disabled = normalizeDisabled(disabledProp);
    useIsomorphicLayoutEffect(() => {
      if (itemsHaveChanged && isDragging) {
        measureDroppableContainers(items);
      }
    }, [itemsHaveChanged, items, isDragging, measureDroppableContainers]);
    React__default.useEffect(() => {
      previousItemsRef.current = items;
    }, [items]);
    const contextValue = React__default.useMemo(
      () => ({
        activeIndex,
        containerId,
        disabled,
        disableTransforms,
        items,
        overIndex,
        useDragOverlay,
        sortedRects: getSortedRects(items, droppableRects),
        strategy
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [activeIndex, containerId, disabled.draggable, disabled.droppable, disableTransforms, items, overIndex, droppableRects, useDragOverlay, strategy]
    );
    return React__default.createElement(Context.Provider, {
      value: contextValue
    }, children);
  }
  const defaultNewIndexGetter = (_ref4) => {
    let {
      id,
      items,
      activeIndex,
      overIndex
    } = _ref4;
    return arrayMove(items, activeIndex, overIndex).indexOf(id);
  };
  const defaultAnimateLayoutChanges = (_ref22) => {
    let {
      containerId,
      isSorting,
      wasDragging,
      index,
      items,
      newIndex,
      previousItems,
      previousContainerId,
      transition
    } = _ref22;
    if (!transition || !wasDragging) {
      return false;
    }
    if (previousItems !== items && index === newIndex) {
      return false;
    }
    if (isSorting) {
      return true;
    }
    return newIndex !== index && containerId === previousContainerId;
  };
  const defaultTransition = {
    duration: 200,
    easing: "ease"
  };
  const transitionProperty = "transform";
  const disabledTransition = /* @__PURE__ */ CSS.Transition.toString({
    property: transitionProperty,
    duration: 0,
    easing: "linear"
  });
  const defaultAttributes = {
    roleDescription: "sortable"
  };
  function useDerivedTransform(_ref4) {
    let {
      disabled,
      index,
      node: node2,
      rect
    } = _ref4;
    const [derivedTransform, setDerivedtransform] = React__default.useState(null);
    const previousIndex = React__default.useRef(index);
    useIsomorphicLayoutEffect(() => {
      if (!disabled && index !== previousIndex.current && node2.current) {
        const initial = rect.current;
        if (initial) {
          const current = getClientRect(node2.current, {
            ignoreTransform: true
          });
          const delta = {
            x: initial.left - current.left,
            y: initial.top - current.top,
            scaleX: initial.width / current.width,
            scaleY: initial.height / current.height
          };
          if (delta.x || delta.y) {
            setDerivedtransform(delta);
          }
        }
      }
      if (index !== previousIndex.current) {
        previousIndex.current = index;
      }
    }, [disabled, index, node2, rect]);
    React__default.useEffect(() => {
      if (derivedTransform) {
        setDerivedtransform(null);
      }
    }, [derivedTransform]);
    return derivedTransform;
  }
  function useSortable(_ref4) {
    let {
      animateLayoutChanges = defaultAnimateLayoutChanges,
      attributes: userDefinedAttributes,
      disabled: localDisabled,
      data: customData,
      getNewIndex = defaultNewIndexGetter,
      id,
      strategy: localStrategy,
      resizeObserverConfig,
      transition = defaultTransition
    } = _ref4;
    const {
      items,
      containerId,
      activeIndex,
      disabled: globalDisabled,
      disableTransforms,
      sortedRects,
      overIndex,
      useDragOverlay,
      strategy: globalStrategy
    } = React__default.useContext(Context);
    const disabled = normalizeLocalDisabled(localDisabled, globalDisabled);
    const index = items.indexOf(id);
    const data2 = React__default.useMemo(() => ({
      sortable: {
        containerId,
        index,
        items
      },
      ...customData
    }), [containerId, customData, index, items]);
    const itemsAfterCurrentSortable = React__default.useMemo(() => items.slice(items.indexOf(id)), [items, id]);
    const {
      rect,
      node: node2,
      isOver,
      setNodeRef: setDroppableNodeRef
    } = useDroppable({
      id,
      data: data2,
      disabled: disabled.droppable,
      resizeObserverConfig: {
        updateMeasurementsFor: itemsAfterCurrentSortable,
        ...resizeObserverConfig
      }
    });
    const {
      active,
      activatorEvent,
      activeNodeRect,
      attributes,
      setNodeRef: setDraggableNodeRef,
      listeners: listeners2,
      isDragging,
      over,
      setActivatorNodeRef,
      transform
    } = useDraggable({
      id,
      data: data2,
      attributes: {
        ...defaultAttributes,
        ...userDefinedAttributes
      },
      disabled: disabled.draggable
    });
    const setNodeRef = useCombinedRefs(setDroppableNodeRef, setDraggableNodeRef);
    const isSorting = Boolean(active);
    const displaceItem = isSorting && !disableTransforms && isValidIndex(activeIndex) && isValidIndex(overIndex);
    const shouldDisplaceDragSource = !useDragOverlay && isDragging;
    const dragSourceDisplacement = shouldDisplaceDragSource && displaceItem ? transform : null;
    const strategy = localStrategy != null ? localStrategy : globalStrategy;
    const finalTransform = displaceItem ? dragSourceDisplacement != null ? dragSourceDisplacement : strategy({
      rects: sortedRects,
      activeNodeRect,
      activeIndex,
      overIndex,
      index
    }) : null;
    const newIndex = isValidIndex(activeIndex) && isValidIndex(overIndex) ? getNewIndex({
      id,
      items,
      activeIndex,
      overIndex
    }) : index;
    const activeId = active == null ? void 0 : active.id;
    const previous = React__default.useRef({
      activeId,
      items,
      newIndex,
      containerId
    });
    const itemsHaveChanged = items !== previous.current.items;
    const shouldAnimateLayoutChanges = animateLayoutChanges({
      active,
      containerId,
      isDragging,
      isSorting,
      id,
      index,
      items,
      newIndex: previous.current.newIndex,
      previousItems: previous.current.items,
      previousContainerId: previous.current.containerId,
      transition,
      wasDragging: previous.current.activeId != null
    });
    const derivedTransform = useDerivedTransform({
      disabled: !shouldAnimateLayoutChanges,
      index,
      node: node2,
      rect
    });
    React__default.useEffect(() => {
      if (isSorting && previous.current.newIndex !== newIndex) {
        previous.current.newIndex = newIndex;
      }
      if (containerId !== previous.current.containerId) {
        previous.current.containerId = containerId;
      }
      if (items !== previous.current.items) {
        previous.current.items = items;
      }
    }, [isSorting, newIndex, containerId, items]);
    React__default.useEffect(() => {
      if (activeId === previous.current.activeId) {
        return;
      }
      if (activeId && !previous.current.activeId) {
        previous.current.activeId = activeId;
        return;
      }
      const timeoutId = setTimeout(() => {
        previous.current.activeId = activeId;
      }, 50);
      return () => clearTimeout(timeoutId);
    }, [activeId]);
    return {
      active,
      activeIndex,
      attributes,
      data: data2,
      rect,
      index,
      newIndex,
      items,
      isOver,
      isSorting,
      isDragging,
      listeners: listeners2,
      node: node2,
      overIndex,
      over,
      setNodeRef,
      setActivatorNodeRef,
      setDroppableNodeRef,
      setDraggableNodeRef,
      transform: derivedTransform != null ? derivedTransform : finalTransform,
      transition: getTransition()
    };
    function getTransition() {
      if (
        // Temporarily disable transitions for a single frame to set up derived transforms
        derivedTransform || // Or to prevent items jumping to back to their "new" position when items change
        itemsHaveChanged && previous.current.newIndex === index
      ) {
        return disabledTransition;
      }
      if (shouldDisplaceDragSource && !isKeyboardEvent(activatorEvent) || !transition) {
        return void 0;
      }
      if (isSorting || shouldAnimateLayoutChanges) {
        return CSS.Transition.toString({
          ...transition,
          property: transitionProperty
        });
      }
      return void 0;
    }
  }
  function normalizeLocalDisabled(localDisabled, globalDisabled) {
    var _localDisabled$dragga, _localDisabled$droppa;
    if (typeof localDisabled === "boolean") {
      return {
        draggable: localDisabled,
        // Backwards compatibility
        droppable: false
      };
    }
    return {
      draggable: (_localDisabled$dragga = localDisabled == null ? void 0 : localDisabled.draggable) != null ? _localDisabled$dragga : globalDisabled.draggable,
      droppable: (_localDisabled$droppa = localDisabled == null ? void 0 : localDisabled.droppable) != null ? _localDisabled$droppa : globalDisabled.droppable
    };
  }
  [KeyboardCode.Down, KeyboardCode.Right, KeyboardCode.Up, KeyboardCode.Left];
  function TabPaneVideoSourceTabConfig() {
    const {
      appApiDecice
    } = useSettingsSnapshot();
    const sortedTabKeys = useSortedTabKeys();
    return /* @__PURE__ */ jsx("div", {
      className: styles$1.tabPane,
      children: /* @__PURE__ */ jsxs("div", {
        css: css`
          display: grid;
          grid-template-columns: 250px 1fr;
          column-gap: 50px;
        `,
        children: [/* @__PURE__ */ jsxs("div", {
          className: styles$1.settingsGroup,
          children: [/* @__PURE__ */ jsxs("div", {
            className: styles$1.settingsGroupTitle,
            children: ["Tab 设置", /* @__PURE__ */ jsx(HelpInfo, {
              iconProps: {
                name: "Tips",
                style: {
                  marginLeft: 5,
                  marginRight: 20
                }
              },
              children: "勾选显示, 拖动排序"
            }), /* @__PURE__ */ jsx(antd.Col, {
              flex: 1
            }), /* @__PURE__ */ jsx(ResetPartialSettingsButton, {
              keys: ["hidingTabKeys", "customTabKeysOrder"]
            })]
          }), /* @__PURE__ */ jsx(VideoSourceTabOrder, {})]
        }), /* @__PURE__ */ jsxs("div", {
          className: styles$1.settingsGroup,
          children: [/* @__PURE__ */ jsx("div", {
            className: styles$1.settingsGroupTitle,
            children: "更多设置"
          }), /* @__PURE__ */ jsxs("div", {
            className: clsx(styles$1.settingsGroupContent),
            css: css`
              display: flex;
              flex-direction: column;
            `,
            children: [/* @__PURE__ */ jsxs("div", {
              css: css`
                order: ${sortedTabKeys.indexOf("watchlater") + 1};
              `,
              children: [/* @__PURE__ */ jsxs("div", {
                className: styles$1.settingsGroupSubTitle,
                children: [/* @__PURE__ */ jsx(TabIcon, {
                  tabKey: ETab.Watchlater,
                  mr: 5,
                  mt: -1
                }), "稍后再看"]
              }), /* @__PURE__ */ jsxs(antd.Space, {
                size: 10,
                children: [/* @__PURE__ */ jsx(CheckboxSettingItem, {
                  configKey: "shuffleForWatchLater",
                  label: "随机顺序",
                  tooltip: "不包括近期添加的「稍后再看」"
                }), /* @__PURE__ */ jsx(CheckboxSettingItem, {
                  configKey: "addSeparatorForWatchLater",
                  label: "添加分割线",
                  tooltip: "添加「近期」「更早」分割线",
                  css: css`
                    margin-left: 20px !important;
                  `
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              css: css`
                order: ${sortedTabKeys.indexOf("fav") + 1};
              `,
              children: [/* @__PURE__ */ jsxs("div", {
                className: styles$1.settingsGroupSubTitle,
                children: [/* @__PURE__ */ jsx(TabIcon, {
                  tabKey: ETab.Fav,
                  mr: 5,
                  mt: -2
                }), "收藏"]
              }), /* @__PURE__ */ jsxs(antd.Space, {
                size: 10,
                children: [/* @__PURE__ */ jsx(CheckboxSettingItem, {
                  configKey: "shuffleForFav",
                  label: "随机顺序",
                  tooltip: "随机收藏"
                }), /* @__PURE__ */ jsx(CheckboxSettingItem, {
                  configKey: "addSeparatorForFav",
                  label: "添加分割线",
                  tooltip: "顺序显示时, 按收藏夹添加分割线",
                  css: css`
                    margin-left: 20px !important;
                  `
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              css: css`
                order: ${sortedTabKeys.indexOf(ETab.RecommendApp) + 1};
              `,
              children: [/* @__PURE__ */ jsxs("div", {
                className: styles$1.settingsGroupSubTitle,
                children: [/* @__PURE__ */ jsx(TabIcon, {
                  tabKey: ETab.RecommendApp,
                  mr: 5
                }), "App 推荐"]
              }), /* @__PURE__ */ jsxs("div", {
                style: {
                  width: "100%",
                  display: "flex",
                  alignItems: "center"
                },
                children: ["App API 设备类型", /* @__PURE__ */ jsxs(HelpInfo, {
                  iconProps: {
                    name: "Tips",
                    style: {
                      marginLeft: 5,
                      marginRight: 10
                    }
                  },
                  children: ["默认 ipad, 视频有 头像/日期 等信息", /* @__PURE__ */ jsx("br", {}), "可选 android, 有图文类型的推荐"]
                }), /* @__PURE__ */ jsx(antd.Radio.Group, {
                  optionType: "button",
                  buttonStyle: "solid",
                  size: "small",
                  options: [EAppApiDevice.ipad, EAppApiDevice.android],
                  value: appApiDecice,
                  onChange: (e2) => updateSettings({
                    appApiDecice: e2.target.value
                  })
                })]
              })]
            })]
          })]
        })]
      })
    });
  }
  function useCurrentShowingTabKeys() {
    const {
      hidingTabKeys
    } = useSettingsSnapshot();
    return React__default.useMemo(() => TabKeys.filter((key2) => !hidingTabKeys.includes(key2)), [hidingTabKeys]);
  }
  function VideoSourceTabOrder({
    className,
    style
  }) {
    const currentShowingTabKeys = useCurrentShowingTabKeys();
    const sortedTabKeys = useSortedTabKeys();
    const sensors = useSensors(useSensor(PointerSensor));
    const handleDragEnd = useMemoizedFn((e2) => {
      const {
        over,
        active
      } = e2;
      if (!(over == null ? void 0 : over.id) || over.id === active.id) return;
      const oldIndex = sortedTabKeys.indexOf(active.id.toString());
      const newIndex = sortedTabKeys.indexOf(over.id.toString());
      const newList = arrayMove(sortedTabKeys, oldIndex, newIndex);
      updateSettings({
        customTabKeysOrder: newList
      });
    });
    return /* @__PURE__ */ jsx("div", {
      ...{
        className,
        style
      },
      children: /* @__PURE__ */ jsx(antd.Checkbox.Group, {
        css: css`
          display: block;
          line-height: unset;
        `,
        value: currentShowingTabKeys,
        onChange: (newVal) => {
          if (!newVal.length) {
            return AntdMessage.error("至少选择一项!");
          }
          updateSettings({
            hidingTabKeys: TabKeys.filter((k2) => !newVal.includes(k2))
          });
        },
        children: /* @__PURE__ */ jsx(DndContext, {
          sensors,
          collisionDetection: closestCenter,
          onDragEnd: handleDragEnd,
          modifiers: [restrictToVerticalAxis, restrictToParentElement],
          children: /* @__PURE__ */ jsx(SortableContext, {
            items: sortedTabKeys,
            strategy: verticalListSortingStrategy,
            children: sortedTabKeys.map((key2) => /* @__PURE__ */ jsx(VideoSourceTabSortableItem, {
              id: key2
            }, key2))
          })
        })
      })
    });
  }
  function VideoSourceTabSortableItem({
    id
  }) {
    const {
      attributes,
      listeners: listeners2,
      setNodeRef,
      transform,
      transition,
      setActivatorNodeRef
    } = useSortable({
      id
    });
    const style = {
      transform: CSS.Transform.toString(transform),
      transition
    };
    const {
      label,
      desc
    } = TabConfig[id];
    const dark = useIsDarkMode();
    return /* @__PURE__ */ jsxs("div", {
      ref: setNodeRef,
      style,
      ...attributes,
      css: css`
        display: flex;
        align-items: center;
        justify-content: flex-start;
        height: 35px;

        padding-left: 10px;
        padding-right: 6px;
        border: 1px solid ${!dark ? "#ddd" : "#444"};
        border-radius: 6px;
        margin-top: 8px;
      `,
      children: [/* @__PURE__ */ jsx(AntdTooltip, {
        align: {
          offset: [0, -10]
        },
        title: desc,
        children: /* @__PURE__ */ jsxs(antd.Checkbox, {
          value: id,
          css: css`
            display: inline-flex;
            align-items: center;
            .ant-checkbox + span {
              user-select: none;
              display: inline-flex;
              align-items: center;
            }
          `,
          children: [/* @__PURE__ */ jsx(TabIcon, {
            tabKey: id,
            mr: 5
          }), label]
        })
      }), /* @__PURE__ */ jsx("div", {
        css: css`
          flex: 1;
        `
      }), /* @__PURE__ */ jsx("div", {
        ...listeners2,
        ref: setActivatorNodeRef,
        css: css`
          cursor: grab;
          font-size: 0;
          padding: 3px 5px;
          border-radius: 5px;
          &:hover {
            background-color: ${!dark ? "#eee" : "#999"};
          }
        `,
        children: /* @__PURE__ */ jsx(IconPark, {
          name: "Drag",
          size: 18
        })
      })]
    }, id);
  }
  function ThemesSelect() {
    const activeId = useCurrentTheme().id;
    const prevActiveId = usePrevious$1(activeId);
    const {
      colorPickerThemeSelectedColor
    } = useSettingsSnapshot();
    const [customColor, setCustomColor] = React__default.useState(colorPickerThemeSelectedColor || DEFAULT_BILI_PINK_THEME.colorPrimary);
    const customColorHex = React__default.useMemo(() => {
      return typeof customColor === "string" ? customColor : customColor.toHexString();
    }, [customColor]);
    useMount(() => {
      $evolvedThemeColor.updateThrottled();
    });
    return /* @__PURE__ */ jsx("div", {
      children: ThemeGroups.map(({
        name,
        themes,
        tooltip
      }) => {
        return /* @__PURE__ */ jsxs(React__default.Fragment, {
          children: [/* @__PURE__ */ jsxs("div", {
            css: css`
                font-size: 1.5em;
                display: flex;
                align-items: center;
                margin-top: 10px;
              `,
            children: [name, /* @__PURE__ */ jsx(HelpInfo, {
              children: tooltip,
              tooltipProps: {
                color: "rgba(0, 0, 0, 0.85)"
              },
              iconProps: {
                name: "Tips",
                size: 16
              }
            })]
          }), /* @__PURE__ */ jsx("div", {
            style: {
              display: "flex",
              flexWrap: "wrap",
              gap: "2px 8px"
            },
            children: themes.map((t2) => {
              const isActive = activeId === t2.id;
              const isCustom = t2.isCustom;
              const useAnimation = !!prevActiveId && prevActiveId !== t2.id;
              const innerSize = 30;
              const outerSize = innerSize + 8;
              let previewWrapper = /* @__PURE__ */ jsx("div", {
                className: "preview-wrapper",
                css: [css`
                        aspect-ratio: 1;
                        width: ${outerSize}px;
                        border: 2px solid transparent;
                        border-radius: 50%;
                        /* border-radius: 6px; */
                        margin: 0 auto;
                        font-size: 0;
                      `, flexCenterStyle, isActive && css`
                          border-color: ${t2.colorPrimary};
                        `, "", ""],
                children: /* @__PURE__ */ jsx("div", {
                  className: "preview",
                  css: [css`
                          aspect-ratio: 1;
                          width: ${innerSize}px;
                          background-color: ${isCustom ? customColorHex : t2.colorPrimary};
                          border-radius: 50%;
                          color: #fff;
                          /* border-radius: 4px; */
                        `, flexCenterStyle, "", ""],
                  children: isActive && /* @__PURE__ */ jsx(IconAnimatedChecked, {
                    size: 18,
                    useAnimation
                  })
                })
              });
              if (t2.isCustom) {
                previewWrapper = /* @__PURE__ */ jsx(antd.ColorPicker, {
                  value: customColor,
                  onChange: (c2) => setCustomColor(c2),
                  onOpenChange: (open) => {
                    if (!open) {
                      updateSettings({
                        colorPickerThemeSelectedColor: customColorHex
                      });
                    }
                  },
                  children: previewWrapper
                });
              }
              let el = /* @__PURE__ */ jsxs("div", {
                css: css`
                      min-width: 60px;
                      text-align: center;
                      cursor: pointer;
                    `,
                onClick: (e2) => {
                  updateSettings({
                    theme: t2.id
                  });
                },
                children: [previewWrapper, t2.name]
              });
              if (t2.tooltip) {
                el = /* @__PURE__ */ jsx(AntdTooltip, {
                  title: t2.tooltip,
                  children: el
                });
              }
              el = /* @__PURE__ */ jsx(React__default.Fragment, {
                children: el
              }, t2.id);
              return el;
            })
          })]
        }, name);
      })
    });
  }
  function useHotkeyForConfig(hotkey, configKey, label) {
    return useKeyPress(hotkey, (e2) => {
      if (shouldDisableShortcut()) return;
      settings[configKey] = !settings[configKey];
      const isCancel = !settings[configKey];
      AntdMessage.success(`已${isCancel ? "禁用" : "启用"}「${label}」`);
    }, {
      exactMatch: true
    });
  }
  const tab = "basic";
  const modalSettingsStore = proxy({
    tab
  });
  function ModalSettings({
    show,
    onHide: onHide2
  }) {
    useHotkeyForConfig(["shift.p"], "autoPreviewWhenKeyboardSelect", "键盘选中后自动开始预览");
    useHotkeyForConfig(["shift.m"], "autoPreviewWhenHover", "鼠标悬浮后自动开始预览");
    useHotkeyForConfig(["shift.c"], "useNarrowMode", "居中模式");
    useHotkeyForConfigBorder();
    const {
      tab: tab2
    } = useSnapshot(modalSettingsStore);
    return /* @__PURE__ */ jsxs(BaseModal, {
      ...{
        show,
        onHide: onHide2,
        hideWhenMaskOnClick: true,
        hideWhenEsc: true,
        cssModal: css`
          width: 900px;
          max-height: unset;
        `
      },
      children: [/* @__PURE__ */ jsxs("div", {
        css: BaseModalStyle.modalHeader,
        children: [/* @__PURE__ */ jsxs("div", {
          css: BaseModalStyle.modalTitle,
          children: [/* @__PURE__ */ jsx(ConfigIcon, {
            className: "size-26 mr-4 mt--2"
          }), "设置"]
        }), /* @__PURE__ */ jsx("div", {
          className: "space",
          style: {
            flex: 1
          }
        }), /* @__PURE__ */ jsx(ModalClose, {
          onClick: onHide2
        })]
      }), /* @__PURE__ */ jsx("main", {
        css: BaseModalStyle.modalBody,
        style: {
          overflow: "hidden"
        },
        children: /* @__PURE__ */ jsx(antd.Tabs, {
          tabPosition: "left",
          size: "middle",
          css: css`
            &.ant-tabs {
              .ant-tabs-tab {
                justify-content: end;
                /* 8 24 */
                padding-inline: 5px 15px;
                /* --ant-tabs-vertical-item-margin: 10px 0 0 0; */
              }

              /* https://github.com/ant-design/ant-design/issues/43541 */
              .ant-tabs-nav-operations {
                display: none;
              }
            }
          `,
          activeKey: tab2,
          onChange: (tab3) => modalSettingsStore.tab = tab3,
          items: [{
            label: "常规设置",
            key: "basic",
            children: /* @__PURE__ */ jsx(TabPaneBasic, {})
          }, {
            label: "内容过滤",
            key: "filter",
            children: /* @__PURE__ */ jsx(TabPaneFilter, {})
          }, {
            label: "主题选择",
            key: "theme-select",
            children: /* @__PURE__ */ jsx("div", {
              className: styles$1.tabPane,
              children: /* @__PURE__ */ jsxs("div", {
                className: styles$1.settingsGroup,
                children: [/* @__PURE__ */ jsx("div", {
                  className: styles$1.settingsGroupTitle,
                  style: {
                    marginBottom: 15
                  },
                  children: "主题选择"
                }), /* @__PURE__ */ jsx("div", {
                  className: clsx(styles$1.settingsGroupContent),
                  children: /* @__PURE__ */ jsx(ThemesSelect, {})
                })]
              })
            })
          }, {
            label: "样式自定",
            key: "custom-ui",
            children: /* @__PURE__ */ jsx(TabPaneCustomUI, {})
          }, {
            label: "Tab 设置",
            key: "video-source-tab-config",
            children: /* @__PURE__ */ jsx(TabPaneVideoSourceTabConfig, {})
          }, {
            label: "高级设置",
            key: "advance",
            children: /* @__PURE__ */ jsx(TabPaneAdvance, {})
          }]
        })
      })]
    });
  }
  function showModalFeed() {
    renderOnce();
    headerState.modalFeedVisible = true;
  }
  function hideModalFeed() {
    headerState.modalFeedVisible = false;
  }
  if (IN_BILIBILI_HOMEPAGE && settings.showModalFeedOnLoad) {
    setTimeout(showModalFeed);
  }
  function showModalSettings() {
    renderOnce();
    headerState.modalSettingsVisible = true;
  }
  function hideModalSettings() {
    headerState.modalSettingsVisible = false;
  }
  function registerSettingsGmCommand() {
    GM.registerMenuCommand("⚙️ 设置", showModalSettings);
  }
  const renderOnce = lodash.once(function render4() {
    const container = document.createElement("div");
    container.classList.add("modals-container", APP_CLS_ROOT);
    document.body.appendChild(container);
    const r2 = createRoot(container);
    r2.render(/* @__PURE__ */ jsx(AntdApp, {
      children: /* @__PURE__ */ jsx(ModalsContainer, {})
    }));
  });
  function ModalsContainer() {
    const {
      modalFeedVisible,
      modalSettingsVisible
    } = useHeaderState();
    return /* @__PURE__ */ jsxs(Fragment, {
      children: [/* @__PURE__ */ jsx(ModalFeed, {
        show: modalFeedVisible,
        onHide: hideModalFeed
      }), /* @__PURE__ */ jsx(ModalSettings, {
        show: modalSettingsVisible,
        onHide: hideModalSettings
      })]
    });
  }
  const debug$2 = baseDebug.extend("RecHeader");
  const S = {
    configBtn: css`
    padding: 0;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    ${flexCenterStyle}
  `,
    leftright: css`
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
  `
  };
  const RecHeader = React__default.forwardRef(function RecHeader2({
    onRefresh,
    refreshing,
    leftSlot,
    rightSlot
  }, ref) {
    const {
      accessKey,
      pureRecommend,
      styleUseWhiteBackground,
      showModalFeedEntry,
      styleUseStickyTabbarInPureRecommend
    } = useSettingsSnapshot();
    const {
      modalFeedVisible,
      modalSettingsVisible
    } = useSnapshot(headerState);
    useKeyPress(["shift.comma"], (e2) => {
      if (shouldDisableShortcut()) return;
      headerState.modalSettingsVisible = !headerState.modalSettingsVisible;
    }, {
      exactMatch: true
    });
    const [stickyRef, sticky] = useSticky();
    const scroll = useMemoizedFn(() => {
      var _a2;
      if (!pureRecommend) return;
      const container = (_a2 = stickyRef.current) == null ? void 0 : _a2.parentElement;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const headerHeight2 = $headerHeight.get();
      if (rect.top < headerHeight2) {
        const yOffset = getElementOffset(container).top;
        debug$2("[refresh:scroll] rect.top = %s, headerHeight = %s", rect.top, headerHeight2);
        document.documentElement.scrollTop = yOffset - headerHeight2 + 2;
      }
    });
    React__default.useImperativeHandle(ref, () => ({
      scroll
    }));
    const headerHeight = $headerHeight.use();
    const showAccessKeyManage = useShouldShowAccessKeyManage();
    const usingEvolevdHeader = $usingEvolevdHeader.use();
    const dark = useIsDarkMode();
    const boxShadow = (() => {
      if (usingEvolevdHeader) {
        return dark ? "rgba(0, 0, 0, 26%) 0px 2px 10px 1px" : "rgba(0, 0, 0, 13%) 0 1px 10px 1px;";
      } else {
        return "inset 0 -1px 0 var(--line_regular)";
      }
    })();
    const expandToFullWidthCss = useExpandToFullWidthCss();
    return /* @__PURE__ */ jsx(Fragment, {
      children: /* @__PURE__ */ jsx(OnRefreshContext.Provider, {
        value: onRefresh,
        children: /* @__PURE__ */ jsx("div", {
          ref: stickyRef,
          className: clsx("area-header-wrapper", {
            sticky
          }),
          css: pureRecommend && styleUseStickyTabbarInPureRecommend && [css`
                position: sticky;
                top: ${headerHeight - 1}px; // 有缝隙, 故 -1 px
                z-index: 1000;
                margin-bottom: 12px;
                border-bottom: 1px dotted ${borderColorValue};

                transition:
                  background-color 0.3s ease-in-out,
                  box-shadow 0.3s ease-in-out,
                  margin-bottom 0.3s ease-in-out;
              `, sticky && [css`
                  background-color: var(--${styleUseWhiteBackground ? "bg1" : "bg2"}_float);
                  /* box-shadow: 0 2px 4px rgb(0 0 0 / 8%); */
                  /* box-shadow: inset 0 -1px 0 var(--line_regular); */
                  /* box-shadow: rgba(0, 0, 0, 13%) 0 1px 10px 1px; */
                  box-shadow: ${boxShadow};
                `, expandToFullWidthCss]],
          children: /* @__PURE__ */ jsxs("div", {
            className: "area-header",
            css: [css`
                margin-bottom: 0;
                height: auto;
                column-gap: 20px; // gap between left & right
                padding-inline: 0;
                padding-block: 8px;
              `, "", ""],
            children: [/* @__PURE__ */ jsxs("div", {
              "data-class-name": "left",
              css: [S.leftright, css`
                  /* as item */
                  flex-shrink: 1;

                  /* as container */
                  flex-wrap: wrap;
                  row-gap: 8px;
                  column-gap: 15px;
                `, "", ""],
              children: [/* @__PURE__ */ jsx(VideoSourceTab, {
                onRefresh
              }), leftSlot]
            }), /* @__PURE__ */ jsx("div", {
              "data-class-name": "right",
              css: [S.leftright, css`
                  flex-shrink: 0;
                `, "", ""],
              children: /* @__PURE__ */ jsxs(antd.Space, {
                size: "small",
                children: [rightSlot, !accessKey && showAccessKeyManage && /* @__PURE__ */ jsx(AccessKeyManage, {
                  style: {
                    marginLeft: 5
                  }
                }), /* @__PURE__ */ jsx(antd.Button, {
                  onClick: showModalSettings,
                  css: S.configBtn,
                  children: /* @__PURE__ */ jsx(ConfigIcon, {
                    ...size(14)
                  })
                }), /* @__PURE__ */ jsx(RefreshButton, {
                  refreshing,
                  onRefresh,
                  refreshHotkeyEnabled: !(modalSettingsVisible || modalFeedVisible)
                }), showModalFeedEntry && /* @__PURE__ */ jsxs(antd.Button, {
                  css: antdCustomCss.button,
                  onClick: showModalFeed,
                  className: "gap-0",
                  children: [/* @__PURE__ */ jsx("span", {
                    children: "查看更多"
                  }), /* @__PURE__ */ jsx("svg", {
                    css: css`
                        width: 12px;
                        height: 12px;
                        margin-left: 2px;
                      `,
                    children: /* @__PURE__ */ jsx("use", {
                      href: "#widget-arrow"
                    })
                  })]
                })]
              })
            })]
          })
        })
      })
    });
  });
  function useExpandToFullWidthCss() {
    const {
      xScrolling,
      bodyWidth
    } = useSizeExpression(document.body, (entry) => {
      const width = entry.contentRect.width;
      const xScrolling2 = !!(width && Math.round(width) > Math.round(window.innerWidth));
      if (!xScrolling2) {
        return {
          xScrolling: xScrolling2
        };
      } else {
        return {
          xScrolling: xScrolling2,
          bodyWidth: width
        };
      }
    }, () => ({
      xScrolling: false
    }));
    return React__default.useMemo(() => {
      if (!xScrolling) {
        return css`
        margin-inline: calc((100% - 100vw) / 2);
        padding-inline: calc((100vw - 100%) / 2);
      `;
      } else {
        const w2 = Math.floor(bodyWidth);
        return css`
        margin-inline: calc((100% - ${w2}px) / 2);
        padding-inline: calc((${w2}px - 100%) / 2);
      `;
      }
    }, [xScrolling, bodyWidth]);
  }
  function useShouldShowAccessKeyManage() {
    const tabKeys = useCurrentDisplayingTabKeys();
    return tabKeys.includes(ETab.RecommendApp);
  }
  const narrowStyle = {
    grid: css`
    /* card=360 col-gap=16  */
    width: ${360 * 2 + 20}px;
    margin: 0 auto;
  `
  };
  function PureRecommend() {
    const {
      useNarrowMode
    } = useSettingsSnapshot();
    const {
      modalFeedVisible,
      modalSettingsVisible
    } = useHeaderState();
    const recHeader = React__default.useRef(null);
    const recGrid = React__default.useRef(null);
    const onRefresh = useMemoizedFn((...args) => {
      var _a2;
      return (_a2 = recGrid.current) == null ? void 0 : _a2.refresh(...args);
    });
    const onScrollToTop = useMemoizedFn(() => {
      var _a2;
      return (_a2 = recHeader.current) == null ? void 0 : _a2.scroll();
    });
    const [refreshing, setRefreshing] = React__default.useState(false);
    const [extraInfo, setExtraInfo] = React__default.useState(null);
    return /* @__PURE__ */ jsxs("section", {
      "data-area": "推荐",
      children: [/* @__PURE__ */ jsx(RecHeader, {
        ref: recHeader,
        refreshing,
        onRefresh,
        leftSlot: extraInfo
      }), /* @__PURE__ */ jsx(RecGrid, {
        ref: recGrid,
        css: [useNarrowMode && narrowStyle.grid, "", ""],
        shortcutEnabled: !(modalFeedVisible || modalSettingsVisible),
        infiteScrollUseWindow: true,
        onScrollToTop,
        setRefreshing,
        setExtraInfo
      })]
    });
  }
  const debug$1 = baseDebug.extend("components:SectionRecommend");
  function SectionRecommend() {
    const skeletonPlaceholders = React__default.useMemo(() => new Array(20).fill(0).map(() => crypto.randomUUID()), []);
    const tab2 = useCurrentUsingTab();
    const {
      refreshingBox,
      itemsBox,
      refresh,
      error: refreshError,
      useSkeleton
    } = useRefresh({
      tab: tab2,
      debug: debug$1,
      fetcher: refreshForHome
    });
    useMount(refresh);
    const refreshing = refreshingBox.state;
    const items = itemsBox.state;
    const showSkeleton = !items.length || refreshError || refreshing && useSkeleton;
    const cardBorderCss = useCardBorderCss();
    return /* @__PURE__ */ jsxs("section", {
      "data-area": "推荐",
      children: [/* @__PURE__ */ jsx(RecHeader, {
        refreshing,
        onRefresh: refresh
      }), /* @__PURE__ */ jsx("div", {
        className: clsx(videoGrid, limitTwoLines, videoGridBiliFeed4),
        style: {
          marginBottom: 30
        },
        children: showSkeleton ? skeletonPlaceholders.map((id) => /* @__PURE__ */ jsx(VideoCard, {}, id)) : items.map((item) => {
          return item.api === EApiType.Separator ? null : /* @__PURE__ */ jsx(VideoCard, {
            item,
            className: clsx(APP_CLS_CARD),
            css: cardBorderCss
          }, item.uniqId);
        })
      })]
    });
  }
  const isHashEntry = (location.hash || "").startsWith(`#/${APP_NAME}/`);
  const bewlyEnabledSelector = "html.bewly-design:not(:has(#i_cecream))";
  function hasBewlyBewly() {
    return !isHashEntry && !!document.querySelector(bewlyEnabledSelector);
  }
  async function tryDetectBewlyBewly() {
    return tryAction(bewlyEnabledSelector, () => {
      console.warn(`${APP_NAME}: unmount for using bewly-design`);
      root == null ? void 0 : root.unmount();
    }, {
      pollTimeout: 5e3,
      warnOnTimeout: false
    });
  }
  let root;
  async function initHomepage() {
    tryToRemove(".adblock-tips");
    tryAction("html.gray", (el) => el.classList.remove("gray"));
    tryToRemove(".vip-login-tip");
    registerSettingsGmCommand();
    if (hasBewlyBewly()) {
      console.warn(`${APP_NAME}: quit for using bewly-design`);
      return;
    }
    if (settings.pureRecommend) {
      await initHomepagePureRecommend();
    } else {
      await initHomepageSection();
    }
    tryDetectBewlyBewly();
  }
  async function initHomepageSection() {
    const timeout = 10 * 1e3;
    const timeoutAt = Date.now() + timeout;
    let insert;
    while (Date.now() <= timeoutAt) {
      if (document.querySelector(".bili-feed4-layout")) {
        insert = (reactNode) => {
          var _a2;
          return (_a2 = document.querySelector(".bili-feed4-layout")) == null ? void 0 : _a2.insertAdjacentElement("afterbegin", reactNode);
        };
        break;
      }
      await delay(200);
    }
    if (!insert) {
      console.error(`[${APP_NAME}]: init fail`);
      return;
    }
    const recommendContainer = document.createElement("section");
    recommendContainer.classList.add(APP_CLS_ROOT);
    insert(recommendContainer);
    root = createRoot(recommendContainer);
    root.render(/* @__PURE__ */ jsx(AntdApp, {
      injectGlobalStyle: true,
      renderAppComponent: true,
      children: /* @__PURE__ */ jsx(SectionRecommend, {})
    }));
    tryToRemove(".bili-feed4 .header-channel");
  }
  async function initHomepagePureRecommend() {
    if (isSafari) await delay(500);
    tryToRemove("#i_cecream .bili-feed4-layout");
    tryToRemove(".bili-feed4 .header-channel");
    tryToRemove(".palette-button-wrap");
    const biliLayout = document.createElement("div");
    biliLayout.classList.add("bili-feed4-layout", "pure-recommend");
    const insertFn = (reactContainer2) => document.body.appendChild(reactContainer2);
    insertFn(biliLayout);
    const reactContainer = document.createElement("section");
    reactContainer.classList.add(APP_CLS_ROOT);
    biliLayout.appendChild(reactContainer);
    root = createRoot(reactContainer);
    root.render(/* @__PURE__ */ jsxs(AntdApp, {
      injectGlobalStyle: true,
      renderAppComponent: true,
      children: [/* @__PURE__ */ jsx(PureRecommend, {}), /* @__PURE__ */ jsx(antd.FloatButton.BackTop, {
        style: {
          // right
          insetInlineEnd: "var(--back-top-right, 24px)"
        }
      })]
    }));
  }
  async function initSpacePage() {
    addDynEntry();
  }
  async function addDynEntry() {
    const mid = parseMid();
    if (!mid) return;
    const btnHtml = `<a
    href="https://www.bilibili.com/?dyn-mid=${mid}"
    target="_blank"
    class="h-f-btn"
    style="width: auto; padding-inline: 15px;">BAR-查看动态</a>`;
    await tryAction(".h-action", (container) => container == null ? void 0 : container.insertAdjacentHTML("afterbegin", btnHtml), {
      pollTimeout: 1e4,
      pollInterval: 1e3
    });
  }
  function parseMid() {
    const url = new URL(location.href);
    const mid = url.pathname.split("/").map((x2) => x2.trim()).filter((x2) => x2)[0];
    if (!mid || !/^\d+$/.test(mid)) return;
    return mid;
  }
  const getId = () => ({
    aid: unsafeWindow.aid,
    cid: unsafeWindow.cid
  });
  const emitter = mitt();
  lodash.once((initialCid) => {
    var _a2;
    let lastCid = initialCid;
    const checkCidChange = () => {
      const {
        cid: newCid
      } = getId();
      if (Array.isArray(newCid)) {
        return;
      }
      if (lastCid !== newCid && !lodash.isNil(newCid)) {
        emitter.emit("videoChange", getId());
        lastCid = newCid;
      }
    };
    (_a2 = window.navigation) == null ? void 0 : _a2.addEventListener("navigate", () => checkCidChange());
    window.addEventListener("popstate", () => checkCidChange());
    window.addEventListener("hashchange", () => checkCidChange());
  });
  const debug = baseDebug.extend("main:video-play-page");
  function initVideoPlayPage() {
    handleFullscreen();
    if (hasDocumentPictureInPicture) {
      registerOpenInPipCommand();
    }
  }
  async function handleFullscreen() {
    const targetMode = new URL(location.href).searchParams.get(PLAYER_SCREEN_MODE);
    const next2 = targetMode === PlayerScreenMode.WebFullscreen || targetMode === PlayerScreenMode.Fullscreen;
    if (!next2) return;
    let action2;
    if (targetMode === PlayerScreenMode.WebFullscreen) {
      action2 = () => {
        var _a2;
        return (_a2 = document.querySelector('[role="button"][aria-label="网页全屏"]')) == null ? void 0 : _a2.click();
      };
    }
    if (targetMode === PlayerScreenMode.Fullscreen) {
      action2 = () => {
        var _a2;
        return (_a2 = document.querySelector('[role="button"][aria-label="全屏"]')) == null ? void 0 : _a2.click();
      };
    }
    const getCurrentMode = () => {
      var _a2;
      return ((_a2 = document.querySelector("#bilibili-player .bpx-player-container")) == null ? void 0 : _a2.dataset.screen) || PlayerScreenMode.Normal;
    };
    const timeoutAt = Date.now() + ms$1("30s");
    while (getCurrentMode() !== targetMode && Date.now() <= timeoutAt) {
      action2 == null ? void 0 : action2();
      await delay(100);
    }
    debug("handleFullscreen to %s complete", targetMode);
  }
  function pausePlayingVideoAndOpenInPipWindow() {
    var _a2;
    const currentPaused = !!document.querySelectorAll("#bilibili-player .bpx-player-container.bpx-state-paused").length;
    if (!currentPaused) {
      (_a2 = document.querySelector('#bilibili-player [role="button"][aria-label="播放/暂停"]')) == null ? void 0 : _a2.click();
    }
    const u = new URL(location.href);
    u.searchParams.set(PLAYER_SCREEN_MODE, PlayerScreenMode.WebFullscreen);
    const newHref = u.href;
    openInPipOrPopup(newHref, "");
  }
  function registerOpenInPipCommand() {
    GM.registerMenuCommand("🎦 小窗打开", () => {
      pausePlayingVideoAndOpenInPipWindow();
    });
  }
  dayjs.extend(duration);
  void function main() {
    if (!IN_BILIBILI_HOMEPAGE && !IN_BILIBILI_VIDEO_PLAY_PAGE && !IN_BILIBILI_SPACE_PAGE) {
      return;
    }
    if (IN_BILIBILI_HOMEPAGE) {
      return initHomepage();
    }
    if (IN_BILIBILI_VIDEO_PLAY_PAGE) {
      return initVideoPlayPage();
    }
    if (IN_BILIBILI_SPACE_PAGE) {
      return initSpacePage();
    }
  }();

})(dayjs, dayjs_plugin_duration, React, UAParser, _, axios, antd, antdCssinjs, antd.locales.zh_CN, ReactDOM, localforage, Motion, _.debounce, _.throttle);