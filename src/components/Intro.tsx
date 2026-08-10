import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { markIntroDone } from '../lib/intro'

const CMD = '<span class="text-accent">$</span> ./init supel2nova.dev'

export default function Intro() {
  const reduced = usePrefersReducedMotion()
  const [done, setDone] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null!)
  const innerRef = useRef<HTMLDivElement>(null)
  const cmdRef = useRef<HTMLParagraphElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const pctRef = useRef<HTMLSpanElement>(null)
  const statusRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      if (reduced) {
        markIntroDone()
        setDone(true)
        return
      }

      document.body.style.overflow = 'hidden'

      const progress = { value: 0 }
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = ''
          setDone(true)
        },
      })

      gsap.set(cmdRef.current, { text: '' })
      gsap.set(barRef.current, { scaleX: 0, transformOrigin: 'left center' })

      tl.to(cmdRef.current, {
        duration: 0.45,
        text: { value: CMD },
        ease: 'none',
      })
        .to(
          progress,
          {
            value: 100,
            duration: 0.9,
            ease: 'power1.inOut',
            snap: { value: 1 },
            onUpdate: () => {
              pctRef.current!.textContent = `${progress.value}%`
            },
          },
          '-=0.1',
        )
        .to(barRef.current, { scaleX: 1, duration: 0.9, ease: 'power1.inOut' }, '<')
        .to(
          statusRef.current,
          {
            duration: 0.4,
            ease: 'none',
            scrambleText: { text: 'ready', chars: 'lowerCase', speed: 0.8 },
          },
          '-=0.3',
        )
        .to(innerRef.current, { opacity: 0, y: -12, duration: 0.3, ease: 'power2.in' }, '+=0.1')

        .to(rootRef.current, {
          yPercent: -100,
          duration: 0.65,
          ease: 'power4.inOut',
          onStart: markIntroDone,
        })

      return () => {
        document.body.style.overflow = ''
      }
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  if (done) return null

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-100 bg-page flex items-center justify-center px-6 will-change-transform"
      role="status"
      aria-label="Loading"
    >
      <div ref={innerRef} className="w-full max-w-sm font-mono">
        <p ref={cmdRef} className="text-sm text-main mb-4 min-h-[1.5em]">
          <span className="text-accent">$</span> ./init supel2nova.dev
        </p>
        <div className="h-[3px] w-full rounded-full bg-[var(--border)] overflow-hidden mb-3">
          <div ref={barRef} className="h-full w-full bg-accent" />
        </div>
        <div className="flex justify-between text-xs text-dim">
          <span ref={statusRef}>booting</span>
          <span ref={pctRef}>0%</span>
        </div>
      </div>
    </div>
  )
}
