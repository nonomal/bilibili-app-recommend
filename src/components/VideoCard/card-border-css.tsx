/**
 * inspired by styles of
 * - https://ai.taobao.com
 * - https://xlog.app/hottest
 *
 * box-shadow playground
 * https://box-shadow.dev/
 */

import { APP_NAMESPACE } from '$common'
import { bgLv1Value, bgLv2Value, borderColorValue, colorPrimaryValue } from '$components/css-vars'
import { useSettingsSnapshot } from '$modules/settings'
import { tweakLightness } from '$utility/css'
import type { CssProp } from '$utility/type'
import { css as _css, css } from '@emotion/react'
import { bgValue, videoCardBorderRadiusValue } from '../css-vars'

const c = tweakLightness(colorPrimaryValue, 0.1)
const borderAndShadow = css`
  border-color: ${c};
  box-shadow: 0px 0px 9px 4px ${c};
`

/* cover zoom */
const coverZoom = css`
  .bili-video-card__cover {
    transform-origin: center center;
    transition: transform 0.2s ease-out;
    transform: scale(1.05);
  }
`

/**
 * for dislike & blacklist card
 * - show border ALWAYS
 * - hover highlight bg
 * - hover highlight separator
 */
export function useInNormalCardCss(showingInNormalCard: boolean): CssProp {
  const sepIdentifier = `--${APP_NAMESPACE}-separator-color`
  return useMemo(() => {
    if (!showingInNormalCard) return undefined
    return _css`
      border-color: ${borderColorValue};

      background-color: ${bgValue};
      ${sepIdentifier}:  ${bgLv1Value};
      &:hover {
        background-color: ${bgLv1Value};
        ${sepIdentifier}: ${bgLv2Value};
      }

      /* disable padding */
      margin-inline: 0;
      .bili-video-card__wrap {
        padding: 0;
      }
    `
  }, [showingInNormalCard])
}

export function useCardBorderCss(): CssProp {
  const {
    useDelayForHover,
    style: {
      videoCard: { useBorder, useBorderOnlyOnHover, useBoxShadow, usePadding },
    },
  } = useSettingsSnapshot()

  return useMemo(() => {
    return [
      css`
        border: 1px solid transparent;
        transition-property: border-color, box-shadow, background-color;
        transition-duration: 0.3s;
        transition-timing-function: ease-in-out;
      `,

      useBorder && [
        css`
          cursor: pointer;
          border-radius: ${videoCardBorderRadiusValue};
          &:hover {
            border-color: ${borderColorValue};
            background-color: ${bgLv1Value};
            ${useBoxShadow && borderAndShadow}
            ${useDelayForHover && coverZoom}
          }
        `,

        !useBorderOnlyOnHover &&
          css`
            border-color: ${borderColorValue};
          `,

        // add padding & negative margin
        useBorderOnlyOnHover &&
          !useBoxShadow &&
          usePadding &&
          css`
            margin-inline: -6px;
            .bili-video-card__wrap {
              padding: 6px;
              padding-bottom: 0;
            }
          `,
      ],
    ]
  }, [useBorder, useBorderOnlyOnHover, useBoxShadow, usePadding, useDelayForHover])
}

export function getActiveCardBorderCss(active: boolean): CssProp {
  return (
    active &&
    css`
      border-radius: ${videoCardBorderRadiusValue};
      ${borderAndShadow}
    `
  )
}
