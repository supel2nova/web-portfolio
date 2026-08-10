import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { shotFile } from '../lib/assets'
import { magnetic } from '../lib/magnetic'
import type { Project } from '../types'

interface FeatureModalProps {
  project: Project
  onClose: () => void
}

export default function FeatureModal({ project, onClose }: FeatureModalProps) {
  const reduced = usePrefersReducedMotion()
  const dialogRef = useRef<HTMLDialogElement>(null!)
  const panelRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)

  const { contextSafe } = useGSAP(
    () => {
      dialogRef.current.showModal()
      if (reduced) return

      const title = SplitText.create(titleRef.current, { type: 'lines,chars', mask: 'lines' })
      const stagger = 0.07

      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from(panelRef.current, { y: 28, scale: 0.96, opacity: 0, duration: 0.35 })
        .from(title.chars, { yPercent: 110, duration: 0.45, stagger: 0.018 }, '-=0.2')
        .from('.feat-row', { opacity: 0, x: -16, duration: 0.4, stagger }, '-=0.3')
        .from('.feat-bar', { scaleY: 0, duration: 0.45, stagger }, '<')
        .from('.feat-num', { opacity: 0, y: 10, duration: 0.35, stagger }, '<0.05')

        .from('.feat-shot', { clipPath: 'inset(0 100% 0 0)', duration: 0.6, stagger }, '<')
        .from('.feat-cta', { opacity: 0, y: 12, duration: 0.35 }, '-=0.3')

      const unmagnetise = magnetic(ctaRef.current)

      return () => {
        unmagnetise()

        title.revert()
      }
    },
    { scope: dialogRef },
  )

  const close = contextSafe(() => {
    if (reduced) return onClose()
    gsap.to(panelRef.current, {
      y: 14,
      scale: 0.97,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: onClose,
    })
  })

  return (
    <dialog
      ref={dialogRef}
      onCancel={(e) => {
        e.preventDefault()
        close()
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current) close()
      }}
      className="m-auto w-[min(46rem,92vw)] max-h-[85vh] bg-transparent p-0 text-main backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      <div
        ref={panelRef}
        className="bg-card border border-theme rounded-md shadow-theme overflow-y-auto max-h-[85vh] p-6 md:p-8"
      >
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <p className="font-mono text-xs text-accent tracking-wide mb-1.5">{project.org}</p>
            <h3
              ref={titleRef}
              className="font-mono text-lg md:text-xl font-semibold tracking-tight"
            >
              {project.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="shrink-0 font-mono text-xs text-dim border border-theme rounded-md px-2.5 py-1.5 bg-surface hover:text-main transition-colors"
          >
            esc
          </button>
        </div>

        <ul className="flex flex-col gap-8">
          {project.features?.map((feature, i) => {
            const shot = shotFile(feature.shot)
            return (
              <li key={feature.name} className="feat-row">
                <div className="relative pl-6">
                  <span className="feat-bar absolute left-0 top-1 bottom-1 w-0.5 bg-accent origin-top" />
                  <div className="flex items-baseline gap-3 mb-1.5">
                    <span className="feat-num font-mono text-[11px] text-dim tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="font-mono text-sm font-semibold">{feature.name}</p>
                  </div>
                  <p className="font-sans text-sm text-dim leading-relaxed">{feature.detail}</p>
                </div>
                {shot && (
                  <div className="ml-6">
                    <div
                      className={`feat-shot relative mt-4 h-80 rounded-md border border-theme bg-white ${
                        feature.blurred ? 'overflow-hidden' : 'overflow-y-auto'
                      }`}
                    >
                      <img
                        src={shot}
                        alt=""
                        className={
                          feature.blurred
                            ? 'feat-img size-full select-none object-cover object-top'
                            : 'feat-img w-full'
                        }
                      />
                      {feature.blurred && (
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/35 px-6">
                          <p className="max-w-sm text-center font-mono text-xs md:text-sm text-white leading-relaxed">
                            Internal application — screenshot blurred.
                            <br />
                            Full UI cannot be disclosed.
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      {feature.note ? (
                        <p className="font-mono text-[11px] text-dim">
                          <span className="text-accent">#</span> {feature.note}
                        </p>
                      ) : (
                        <span />
                      )}
                      <span className="flex shrink-0 items-baseline gap-4 font-mono text-[11px]">
                        {feature.link && (
                          <a
                            href={feature.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent hover:opacity-80 transition-opacity"
                          >
                            {new URL(feature.link).hostname.replace(/^www\./, '')} ↗
                          </a>
                        )}
                        {!feature.blurred && (
                          <a
                            href={shot}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-dim hover:text-accent transition-colors"
                          >
                            open full size ↗
                          </a>
                        )}
                      </span>
                    </div>
                  </div>
                )}
              </li>
            )
          })}
        </ul>

        {project.link && (
          <a
            ref={ctaRef}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="feat-cta mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 font-mono text-sm font-medium text-[#0f1116] hover:opacity-90 transition-opacity will-change-transform"
          >
            Visit insKru ↗
          </a>
        )}
      </div>
    </dialog>
  )
}
