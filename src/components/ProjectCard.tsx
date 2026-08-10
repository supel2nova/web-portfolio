import gsap from 'gsap'
import { useRef } from 'react'
import { logoFile } from '../lib/assets'
import type { Project } from '../types'

interface ProjectCardProps {
  project: Project
  reduced: boolean
  onOpen: () => void
}

export default function ProjectCard({ project, reduced, onOpen }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLSpanElement>(null)
  const file = logoFile(project.slug)

  const onEnter = () => {
    if (reduced || !cardRef.current) return
    gsap.to(cardRef.current, {
      y: -4,
      borderColor: 'var(--accent)',
      duration: 0.3,
      ease: 'power2.out',
    })
    gsap.to(logoRef.current, {
      scale: 1.08,
      duration: 0.3,
      ease: 'back.out(2.5)',
    })
  }

  const onLeave = () => {
    if (reduced || !cardRef.current) return
    gsap.to(cardRef.current, {
      y: 0,
      borderColor: 'var(--border)',
      duration: 0.3,
      ease: 'power2.out',
    })
    gsap.to(logoRef.current, { scale: 1, duration: 0.3, ease: 'power2.out' })
  }

  return (
    <article
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={project.features ? onOpen : undefined}
      className={`project-card border border-theme bg-card rounded-md p-5 md:p-7 shadow-theme will-change-transform ${
        project.features ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-start gap-4 mb-3">
        <span
          ref={logoRef}
          className={`shrink-0 size-11 rounded-md border border-theme grid place-items-center overflow-hidden ${
            file || project.onWhite ? 'bg-white' : 'bg-surface'
          }`}
          aria-hidden
        >
          {file ? (
            <img src={file} alt="" loading="lazy" className="size-full object-contain p-1.5" />
          ) : (
            <span className="font-mono text-xs font-semibold text-accent">{project.short}</span>
          )}
        </span>

        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1.5">
            <span className="font-mono text-xs text-accent tracking-wide">{project.org}</span>
            {project.client && <span className="font-mono text-xs text-dim">{project.client}</span>}
          </div>
          <h3 className="font-mono text-lg md:text-xl font-semibold text-main tracking-tight">
            {project.title}
          </h3>
        </div>
      </div>

      <p className="font-sans text-sm md:text-[15px] text-dim leading-relaxed mb-5">
        {project.description}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="project-tag font-mono text-[11px] text-dim border border-theme rounded-md px-2 py-1"
          >
            {tag}
          </span>
        ))}

        {project.features && (
          <button
            type="button"
            onClick={onOpen}
            className="ml-auto font-mono text-[11px] text-accent border border-[var(--accent)] rounded-md px-2.5 py-1 hover:opacity-80 transition-opacity"
          >
            what I built →
          </button>
        )}
      </div>
    </article>
  )
}
