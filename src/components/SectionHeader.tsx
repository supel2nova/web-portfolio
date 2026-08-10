import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

interface SectionHeaderProps {
  label: string
  title: string
  className?: string
}

export default function SectionHeader({ label, title, className = '' }: SectionHeaderProps) {
  const reduced = usePrefersReducedMotion()
  const rootRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useGSAP(
    () => {
      if (reduced) return

      const scrollTrigger = {
        trigger: rootRef.current,
        start: 'top 85%',
        once: true,
      }

      gsap.from('.sh-label', {
        opacity: 0,
        x: -14,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger,
      })

      SplitText.create(titleRef.current, {
        type: 'lines,chars',
        mask: 'lines',
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.chars, {
            yPercent: 110,
            duration: 0.6,
            stagger: 0.022,
            ease: 'power3.out',
            scrollTrigger,
          }),
      })
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  return (
    <header ref={rootRef} className={`mb-10 md:mb-14 ${className}`}>
      <p className="sh-label font-mono text-sm text-accent mb-3 tracking-wide">{label}</p>
      <h2
        ref={titleRef}
        className="font-mono text-2xl md:text-3xl font-semibold text-main tracking-tight"
      >
        {title}
      </h2>
    </header>
  )
}
