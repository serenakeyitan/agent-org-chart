import { useEffect, useRef, useState } from 'react'
import { copyToClipboard } from '../lib/instructions'

interface CopyButtonProps {
  label: string
  getText: () => string
  variant?: 'solid' | 'quiet'
  className?: string
}

export default function CopyButton({ label, getText, variant = 'solid', className = '' }: CopyButtonProps) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const handleClick = async () => {
    const ok = await copyToClipboard(getText())
    setState(ok ? 'copied' : 'failed')
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setState('idle'), 2200)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`copy-btn copy-btn--${variant} ${state !== 'idle' ? 'is-done' : ''} ${className}`}
    >
      <span className="copy-btn__face" aria-hidden={state !== 'idle'}>
        <CopyGlyph />
        {label}
      </span>
      <span className="copy-btn__face copy-btn__face--done" aria-hidden={state === 'idle'}>
        {state === 'failed' ? (
          'Copy failed'
        ) : (
          <>
            <CheckGlyph />
            Copied
          </>
        )}
      </span>
      <span className="sr-only" aria-live="polite">
        {state === 'copied' ? `${label}: copied to clipboard` : state === 'failed' ? 'Copy failed' : ''}
      </span>
    </button>
  )
}

function CopyGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="5.25" y="5.25" width="8" height="8" rx="1.75" stroke="currentColor" strokeWidth="1.25" />
      <path d="M10.75 5.25V4a1.75 1.75 0 0 0-1.75-1.75H4A1.75 1.75 0 0 0 2.25 4v5c0 .97.78 1.75 1.75 1.75h1.25" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  )
}

function CheckGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
