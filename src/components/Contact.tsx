import Github from '@thesvg/react/github'
import Gmail from '@thesvg/react/gmail'
import Linkedin from '@thesvg/react/linkedin'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import { CONTACT_ACTIONS, LOCATION } from '../data/contact'
import type { ContactIcon, IconComponent } from '../types'
import Download from './icons/Download'
import MonoIcon from './icons/MonoIcon'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { magnetic } from '../lib/magnetic'
import SectionHeader from './SectionHeader'

const CONTACT_ICONS: Record<ContactIcon, IconComponent> = {
  gmail: Gmail,
  github: Github,
  linkedin: Linkedin,
  download: Download,
}

export default function Contact() {
  const reduced = usePrefersReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const items = sectionRef.current?.querySelectorAll('.contact-reveal')
      if (!items?.length) return

      if (reduced) {
        gsap.set(items, { opacity: 1, y: 0 })
        return
      }

      gsap.from(items, {
        opacity: 0,
        y: 14,
        duration: 0.55,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      const cleanups = gsap.utils
        .toArray<HTMLAnchorElement>('a', sectionRef.current)
        .map((el) => magnetic(el))

      return () => cleanups.forEach((fn) => fn())
    },
    { scope: sectionRef, dependencies: [reduced] },
  )

  return (
    <section id="contact" ref={sectionRef} className="py-20 md:py-28 px-5 md:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeader label="// contact" title="Let's Talk" />
        <p className="contact-reveal font-sans text-dim text-sm md:text-base mb-8 max-w-xl leading-relaxed">
          {LOCATION}
        </p>
        <div className="contact-reveal flex flex-wrap gap-3">
          {CONTACT_ACTIONS.map((action) => {
            const Icon = action.icon ? CONTACT_ICONS[action.icon] : undefined
            return (
              <a
                key={action.label}
                href={action.href}
                {...(action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={
                  action.kind === 'primary'
                    ? 'inline-flex items-center rounded-md bg-accent px-5 py-2.5 font-mono text-sm font-medium text-[#0f1116] hover:opacity-90 transition-opacity'
                    : 'inline-flex items-center rounded-md border border-theme bg-surface px-5 py-2.5 font-mono text-sm text-main hover:border-[var(--accent)] transition-colors'
                }
              >
                {Icon && <MonoIcon Icon={Icon} aria-hidden className="mr-2.5 size-4" />}
                {action.label}
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
