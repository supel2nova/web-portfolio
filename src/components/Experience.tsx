import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import { EXPERIENCE } from '../data/experience'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import SectionHeader from './SectionHeader'

export default function Experience() {
  const reduced = usePrefersReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>('.t-item')
      if (!items.length) return

      if (reduced) {
        gsap.set(items, { opacity: 1, y: 0 })
        gsap.set(lineRef.current, { scaleY: 1 })
        return
      }

      gsap.set(lineRef.current, { scaleY: 0, transformOrigin: 'top center' })
      gsap.set(items, { opacity: 0, y: 20 })

      gsap.to(lineRef.current, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 55%',
          scrub: true,
        },
      })

      gsap.set('.t-dot', { scale: 0 })

      gsap.to(items[0].querySelector('.t-dot'), {
        boxShadow: '0 0 0 4px color-mix(in srgb, var(--accent) 22%, transparent)',
        duration: 1.6,
        delay: 1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      items.forEach((item) => {
        const scrollTrigger = {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }

        gsap.to(item, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger,
        })

        gsap.to(item.querySelector('.t-dot'), {
          scale: 1,
          duration: 0.5,
          delay: 0.15,
          ease: 'back.out(4)',
          scrollTrigger,
        })
      })
    },
    { scope: sectionRef, dependencies: [reduced] },
  )

  return (
    <section id="experience" ref={sectionRef} className="py-20 md:py-28 px-5 md:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeader label="// timeline" title="Work Experience" />

        <div className="relative pl-8 md:pl-10">
          <div
            ref={lineRef}
            className="absolute left-[6.5px] top-2 bottom-2 w-px bg-[var(--border)]"
            aria-hidden
          />

          <ol className="flex flex-col gap-8 md:gap-10">
            {EXPERIENCE.map((entry) => (
              <li key={entry.period + entry.org} className="t-item relative">
                <span
                  className="t-dot absolute -left-8 md:-left-10 top-1.5 size-3.5 rounded-full border-2 border-[var(--accent)] bg-[var(--bg)]"
                  aria-hidden
                />
                <p className="font-mono text-xs text-accent mb-1.5">{entry.period}</p>
                <h3 className="font-mono text-base md:text-lg font-semibold text-main tracking-tight">
                  {entry.role}
                </h3>
                <p className="font-mono text-sm text-dim mt-1">{entry.org}</p>
                {entry.detail && (
                  <p className="font-sans text-sm text-dim mt-2 leading-relaxed max-w-2xl">
                    {entry.detail}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
