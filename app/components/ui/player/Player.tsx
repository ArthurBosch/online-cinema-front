import cn from 'classnames'
import { FC } from 'react'

import { useAuth } from '@/hooks/useAuth'

import { MaterialIcon } from '../MaterailIcon'

import AuthPlaceholder from './AuthPlaceholder/AuthPlaceholder'
import styles from './Player.module.scss'
import { useVideo } from './useVideo'
import { IPlayer } from './video.interface'

const Player: FC<IPlayer> = ({ slug, videoSrc }) => {
	const { actions, video, videoRef } = useVideo()
	const { user } = useAuth()

	return (
		<div className={cn(styles.wrapper, { 'h-96': !user })}>
			{user ? (
				<>
					<video
						ref={videoRef}
						className={styles.video}
						src={`${videoSrc}#t=8`}
						preload="metadata"
					/>

					<div className={styles.progressBarContainer}>
						<div
							className={styles.progressBar}
							style={{ width: `${video.progress}%` }}
						></div>
					</div>

					<div className={styles.controls}>
						<div>
							<button onClick={actions.revert}>
								<MaterialIcon name="MdHistory" />
							</button>
							<button
								className={styles.playButton}
								onClick={actions.toggleVideo}
							>
								<MaterialIcon
									name={video.isPlaying ? 'MdPause' : 'MdPlayArrow'}
								/>
							</button>
							<button onClick={actions.forward}>
								<MaterialIcon name="MdUpdate" />
							</button>
							<div className={styles.timeControls}>
								<p className={styles.controlsTime}>
									{Math.floor(video.currentTime / 60) +
										':' +
										('0' + Math.floor(video.currentTime % 60)).slice(-2)}
								</p>
								<p> / </p>
								<p className={styles.controlsTime}>
									{Math.floor(video.videoTime / 60) +
										':' +
										('0' + Math.floor(video.videoTime % 60)).slice(-2)}
								</p>
							</div>
						</div>
						<div>
							<button onClick={actions.fullScreen}>
								<MaterialIcon name="MdFullscreen" />
							</button>
						</div>
					</div>
				</>
			) : (
				<AuthPlaceholder slug={slug} />
			)}
		</div>
	)
}

export default Player
