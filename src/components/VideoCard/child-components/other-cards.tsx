import { OPERATION_FAIL_MSG } from '$common'
import { useMittOn } from '$common/hooks/useMitt'
import type { Reason } from '$components/ModalDislike'
import { delDislikeId } from '$components/ModalDislike'
import type { AppRecItem } from '$define'
import { IconPark } from '$icon-park'
import { cx } from '$libs'
import { useSettingsSnapshot } from '$modules/settings'
import { UserBlacklistService } from '$modules/user/relations/blacklist'
import { AntdMessage } from '$utility'
import { toastRequestFail } from '$utility/toast'
import { cancelDislike } from '../card.service'
import styles from '../index.module.scss'
import type { VideoCardEmitter } from '../index.shared'
import { borderRadiusStyle, defaultEmitter } from '../index.shared'
import type { IVideoCardData } from '../process/normalize'

export const SkeletonCard = memo(function SkeletonCard({ loading }: { loading: boolean }) {
  const { styleNewCardStyle } = useSettingsSnapshot()

  return (
    <div
      className={cx('bili-video-card__skeleton', {
        hide: !loading,
        [styles.skeletonActive]: loading,
      })}
    >
      <div className='bili-video-card__skeleton--cover' style={borderRadiusStyle} />

      {!styleNewCardStyle && (
        <div className='bili-video-card__skeleton--info'>
          <div className='bili-video-card__skeleton--right'>
            <p className='bili-video-card__skeleton--text'></p>
            <p className='bili-video-card__skeleton--text short'></p>
            <p className='bili-video-card__skeleton--light'></p>
          </div>
        </div>
      )}
      {styleNewCardStyle && (
        <div className='bili-video-card__skeleton--info'>
          <div
            className='bili-video-card__skeleton--avatar'
            css={css`
              width: 32px;
              height: 32px;
              border-radius: 50%;
            `}
          />
          <div
            className='bili-video-card__skeleton--right'
            css={css`
              flex: 1;
              margin-left: 10px;
            `}
          >
            <p className='bili-video-card__skeleton--text'></p>
            <p className='bili-video-card__skeleton--text short'></p>
            <p className='bili-video-card__skeleton--light'></p>
            <p className='bili-video-card__skeleton--text tiny'></p>
          </div>
        </div>
      )}
    </div>
  )
})

export const DislikedCard = memo(function DislikedCard({
  dislikedReason,
  item,
  emitter = defaultEmitter,
}: {
  item: AppRecItem
  dislikedReason: Reason
  emitter?: VideoCardEmitter
}) {
  const onCancelDislike = useMemoizedFn(async () => {
    if (!dislikedReason?.id) return

    let success = false
    let err: Error | undefined
    try {
      success = await cancelDislike(item, dislikedReason.id)
    } catch (e) {
      err = e as Error
    }

    if (err) {
      console.error(err.stack || err)
      return toastRequestFail()
    }

    success ? AntdMessage.success('已撤销') : AntdMessage.error(OPERATION_FAIL_MSG)
    if (success) {
      delDislikeId(item.param)
    }
  })

  useMittOn(emitter, 'cancel-dislike', onCancelDislike)

  return (
    <div className={cx(styles.dislikedWrapper)}>
      <div className={styles.dislikeContentCover}>
        <div className={styles.dislikeContentCoverInner}>
          <IconPark name='DistraughtFace' size={32} className={styles.dislikeIcon} />
          <div className={styles.dislikeReason}>{dislikedReason?.name}</div>
          <div className={styles.dislikeDesc}>{dislikedReason?.toast || '将减少此类内容推荐'}</div>
        </div>
      </div>
      <div className={styles.dislikeContentAction}>
        <button onClick={onCancelDislike}>
          <IconPark name='Return' size='16' style={{ marginRight: 4, marginTop: -2 }} />
          撤销
        </button>
      </div>
    </div>
  )
})

export const BlacklistCard = memo(function BlacklistCard({
  cardData,
}: {
  cardData: IVideoCardData
}) {
  const { authorMid, authorName } = cardData

  const onCancel = useMemoizedFn(async () => {
    if (!authorMid) return
    const success = await UserBlacklistService.remove(authorMid)
    if (success) AntdMessage.success(`已移出黑名单: ${authorName}`)
  })

  return (
    <div className={cx(styles.dislikedWrapper)}>
      <div className={styles.dislikeContentCover}>
        <div className={styles.dislikeContentCoverInner}>
          <IconPark name='PeopleDelete' size={32} className={styles.dislikeIcon} />
          <div className={styles.dislikeReason}>已拉黑</div>
          <div className={styles.dislikeDesc}>UP: {authorName}</div>
        </div>
      </div>
      <div className={styles.dislikeContentAction}>
        <button onClick={onCancel}>
          <IconPark name='Return' size='16' style={{ marginRight: 4, marginTop: -2 }} />
          撤销
        </button>
      </div>
    </div>
  )
})
