import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import { SKILLS } from '../data/skills'
import MonoIcon from './icons/MonoIcon'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import type { Skill } from '../types'
import SectionHeader from './SectionHeader'

function SkillCard({ skill, reduced }: { skill: Skill; reduced: boolean }) {
  const wrapRef = useRef<HTMLSpanElement>(null)
  const monoRef = useRef<SVGSVGElement>(null)
  const colorRef = useRef<SVGSVGElement>(null)
  const { name, Icon, href } = skill

  const onEnter = () => {
    if (reduced || !wrapRef.current) return
    gsap.to(wrapRef.current, { scale: 1.15, rotate: -6, duration: 0.3, ease: 'back.out(2)' })
    gsap.to(monoRef.current, { opacity: 0, duration: 0.25 })
    gsap.to(colorRef.current, { opacity: 1, duration: 0.25 })
  }

  const onLeave = () => {
    if (reduced || !wrapRef.current) return
    gsap.to(wrapRef.current, { scale: 1, rotate: 0, duration: 0.3, ease: 'power2.out' })
    gsap.to(monoRef.current, { opacity: 1, duration: 0.25 })
    gsap.to(colorRef.current, { opacity: 0, duration: 0.25 })
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} documentation`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="skill-card flex flex-col items-center justify-center gap-2.5 border border-theme bg-card rounded-md px-2 py-4 md:py-5 shadow-theme hover:border-[var(--accent)] transition-colors"
    >
      <span ref={wrapRef} className="relative inline-flex size-7 md:size-8 text-dim">
        <MonoIcon
          Icon={Icon}
          ref={monoRef}
          aria-hidden
          className="absolute inset-0 size-full grayscale"
        />
        <Icon ref={colorRef} aria-hidden className="absolute inset-0 size-full opacity-0" />
      </span>
      <span className="font-mono text-[10px] md:text-xs text-dim text-center leading-tight">
        {name}
      </span>
    </a>
  )
}

export default function Skills() {
  const reduced = usePrefersReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const cards = sectionRef.current?.querySelectorAll('.skill-card')
      if (!cards?.length) return

      if (reduced) {
        gsap.set(cards, { opacity: 1, y: 0, scale: 1 })
        return
      }

      gsap.from('.skill-card', {
        opacity: 0,
        y: 20,
        scale: 0.9,
        duration: 0.5,
        stagger: { each: 0.05, grid: 'auto', from: 'center' },
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    },
    { scope: sectionRef, dependencies: [reduced] },
  )

  return (
    <section id="skills" ref={sectionRef} className="py-20 md:py-28 px-5 md:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeader label="// stack" title="Tools I Use" />
        <div className="skills-grid grid grid-cols-4 sm:grid-cols-6 gap-2.5 md:gap-3">
          {SKILLS.map((skill) => (
            <SkillCard key={skill.name} skill={skill} reduced={reduced} />
          ))}
        </div>
      </div>
    </section>
  )
}
