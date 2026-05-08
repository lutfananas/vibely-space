declare namespace YT {
  class Player {
    constructor(elementId: string, options: YTPlayerOptions)
    playVideo(): void
    pauseVideo(): void
    destroy(): void
  }
}

interface YTPlayerOptions {
  videoId: string
  playerVars?: YTPlayerVars
  events?: YTPlayerEvents
}

interface YTPlayerVars {
  autoplay?: number
  start?: number
  loop?: number
  playlist?: string
  controls?: number
  disablekb?: number
  fs?: number
  modestbranding?: number
  rel?: number
  playsinline?: number
}

interface YTPlayerEvents {
  onReady?: (event: { target: YT.Player }) => void
  onStateChange?: (event: YT.OnStateChangeEvent) => void
}

declare namespace YT {
  interface OnStateChangeEvent {
    target: Player
    data: number
  }

  interface PlayerState {
    PLAYING: number
    PAUSED: number
    ENDED: number
  }
}

interface Window {
  YT: {
    Player: typeof YT.Player
    PlayerState: YT.PlayerState
  }
  onYouTubeIframeAPIReady: (() => void) | undefined
}
