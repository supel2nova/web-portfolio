import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'
import { PROJECTS } from '../data/projects'
import type { Project } from '../types'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import FeatureModal from './FeatureModal'
import ProjectCard from './ProjectCard'
import SectionHeader from './SectionHeader'

export default function Projects() {
  const reduced = usePrefersReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const [openProject, setOpenProject] = useState<Project | null>(null)

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>('.project-card')
      if (!cards.length) return

      if (reduced) {
        gsap.set(cards, { opacity: 1, y: 0 })
        gsap.set('.project-tag', { opacity: 1, y: 0 })
        return
      }

      cards.forEach((card) => {
        const tags = card.querySelectorAll('.project-tag')
        const scrollTrigger = {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }

        gsap.from(card, {
          opacity: 0,
          y: 28,
          duration: 0.55,
          ease: 'power2.out',
          scrollTrigger,
        })

        if (tags.length) {
          gsap.from(tags, {
            opacity: 0,
            y: 8,
            duration: 0.35,
            stagger: 0.04,
            ease: 'power2.out',
            scrollTrigger: { ...scrollTrigger, start: 'top 80%' },
          })
        }
      })
    },
    { scope: sectionRef, dependencies: [reduced] },
  )

  return (
    <section id="projects" ref={sectionRef} className="py-20 md:py-28 px-5 md:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeader label="// projects" title="Selected Work" />
        <div className="flex flex-col gap-5">
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.org + project.title}
              project={project}
              reduced={reduced}
              onOpen={() => setOpenProject(project)}
            />
          ))}
        </div>
      </div>

      {openProject && <FeatureModal project={openProject} onClose={() => setOpenProject(null)} />}
    </section>
  )
}
