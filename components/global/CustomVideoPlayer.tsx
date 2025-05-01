// components/CustomVideoPlayer.tsx
'use client'

import { Pause, Play } from 'lucide-react'
import { useRef, useState } from 'react'

type Props = {
  src: string
  poster: string
}

export default function CustomVideoPlayer({ src, poster }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  return (
    <div className="group relative mx-auto rounded-2xl overflow-hidden m-10">

      <video
        ref={videoRef}
        src={src}
        poster={poster}
        preload="metadata"
        controls={false}
        muted
        playsInline
        className="w-full h-auto block bg-black"
        onClick={togglePlay}
      />

      {!isPlaying && (
        <button
          onClick={togglePlay}
          aria-label="Play video"
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className='bg-[#003366] rounded-full h-[60px] w-[60px] inline-flex justify-center items-center'>
            <Play />
          </div>
        </button>
      )}

      {isPlaying && (
        <button
          onClick={togglePlay}
          aria-label="Pause video"
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <div className='bg-[#003366] rounded-full h-[60px] w-[60px] inline-flex justify-center items-center'>
            <Pause />
          </div>
        </button>
      )}
    </div>
  )
}
