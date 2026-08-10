import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export default function Footer() {
  const reduced = usePrefersReducedMotion()
  const rootRef = useRef<HTMLElement>(null)
  const dotRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      if (reduced) return

      gsap.from('.footer-line', {
        opacity: 0,
        y: 10,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 95%', once: true },
      })

      gsap.to(dotRef.current, {
        opacity: 0.25,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  return (
    <footer ref={rootRef} className="border-t border-theme py-8 px-5 md:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="footer-line font-mono text-xs text-dim text-center md:text-left">
          built with care · panupong
          <span ref={dotRef} className="text-accent">
            .
          </span>
          dev © 2026
        </p>
      </div>
    </footer>
  )
}
