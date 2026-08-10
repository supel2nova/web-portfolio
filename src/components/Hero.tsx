import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Fragment, useRef } from 'react'
import { INTRO_DONE } from '../constants'
import {
  BIO,
  FACTS,
  NAME,
  PROMPT,
  PROMPT_HTML,
  RESUME_URL,
  ROLE,
  TERMINAL_TITLE,
} from '../data/profile'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { introFinished } from '../lib/intro'
import { magnetic } from '../lib/magnetic'

export default function Hero() {
  const reduced = usePrefersReducedMotion()
  const containerRef = useRef<HTMLElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const promptRef = useRef<HTMLParagraphElement>(null)
  const roleRef = useRef<HTMLParagraphElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = containerRef.current
      if (!root) return

      const dots = root.querySelectorAll('.traffic-dot')
      const outputs = root.querySelectorAll('.term-out')
      const ctas = ctaRef.current?.querySelectorAll('a') ?? []

      const facts = root.querySelectorAll('.hero-fact')

      if (reduced) {
        gsap.set([dots, outputs, ctas, facts, cursorRef.current], {
          opacity: 1,
          y: 0,
          clearProps: 'width',
        })
        return
      }

      gsap.set(dots, { opacity: 0 })
      gsap.set(promptRef.current, { text: '' })
      gsap.set(outputs, { opacity: 0, y: 12 })
      gsap.set(ctas, { opacity: 0, y: 16 })
      gsap.set(facts, { opacity: 0, x: -10 })
      gsap.set(cursorRef.current, { opacity: 1 })

      gsap.to(cardRef.current, {
        y: -60,
        opacity: 0.35,
        ease: 'none',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.4,
        },
      })

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: 'power2.out' },
      })
      const play = () => tl.play()
      if (introFinished()) play()
      else window.addEventListener(INTRO_DONE, play, { once: true })

      tl.to(dots, {
        opacity: 1,
        duration: 0.3,
        stagger: 0.08,
      })
        .to(
          promptRef.current,
          {
            duration: 0.6,
            text: { value: PROMPT_HTML, delimiter: '' },
            ease: 'none',
          },
          '+=0.15',
        )
        .to(
          outputs,
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.14,
            ease: 'power3.out',
          },
          '+=0.15',
        )
        .to(
          roleRef.current,
          {
            duration: 1.1,
            ease: 'none',
            scrambleText: {
              text: ROLE,
              chars: 'upperAndLowerCase',
              speed: 0.6,
            },
          },
          '<0.2',
        )
        .to(facts, { opacity: 1, x: 0, duration: 0.35, stagger: 0.05, ease: 'power2.out' }, '-=0.5')
        .add(() => {
          gsap.to(cursorRef.current, {
            opacity: 0,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
          })
        })
        .to(
          ctas,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out',
          },
          '-=0.1',
        )

      const unmagnetise = gsap.utils
        .toArray<HTMLElement>('a', ctaRef.current)
        .map((el) => magnetic(el))

      return () => {
        window.removeEventListener(INTRO_DONE, play)
        unmagnetise.forEach((fn) => fn())
      }
    },
    { scope: containerRef, dependencies: [reduced] },
  )

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative pt-28 pb-20 md:pt-36 md:pb-28 px-5 md:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <div
          ref={cardRef}
          className="bg-card border border-theme rounded-md shadow-theme overflow-hidden will-change-transform"
        >
          <div className="flex items-center gap-3 px-4 py-3 border-b border-theme bg-surface">
            <div className="flex items-center gap-1.5" aria-hidden>
              <span className="traffic-dot size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="traffic-dot size-2.5 rounded-full bg-[#febc2e]" />
              <span className="traffic-dot size-2.5 rounded-full bg-[#28c840]" />
            </div>
            <p className="font-mono text-xs text-dim flex-1 text-center pr-10">{TERMINAL_TITLE}</p>
          </div>

          <div className="p-5 md:p-8 font-mono text-sm md:text-base leading-relaxed min-h-[280px] md:min-h-[320px]">
            <p ref={promptRef} className="mb-5 text-main min-h-[1.5em]" aria-label={PROMPT}>
              <span className="text-accent">$</span> whoami
            </p>

            <div className="term-out mb-5">
              <p className="text-main text-xl md:text-3xl font-semibold tracking-tight">
                {NAME}
                <span
                  ref={cursorRef}
                  className="inline-block w-[0.55em] h-[1.05em] ml-1 align-[-0.15em] bg-accent"
                  aria-hidden
                />
              </p>
            </div>

            <p ref={roleRef} className="term-out text-accent mb-4 text-sm md:text-base">
              {ROLE}
            </p>

            <div className="term-out grid gap-8 lg:grid-cols-[minmax(0,34rem)_minmax(0,1fr)] lg:gap-10">
              <p className="font-sans text-dim text-sm md:text-[15px] leading-relaxed">{BIO}</p>

              <dl className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-x-4 gap-y-2.5 self-start text-[13px] lg:border-l lg:border-theme lg:pl-6">
                {FACTS.map((fact) => (
                  <Fragment key={fact.key}>
                    <dt className="hero-fact text-dim">{fact.key}</dt>
                    <dd className="hero-fact text-main">
                      {fact.key === 'status' ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="size-1.5 rounded-full bg-accent" aria-hidden />
                          {fact.value}
                        </span>
                      ) : (
                        fact.value
                      )}
                    </dd>
                  </Fragment>
                ))}
              </dl>
            </div>
          </div>
        </div>

        <div ref={ctaRef} className="mt-8 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="inline-flex items-center justify-center rounded-md bg-accent px-5 py-2.5 font-mono text-sm font-medium text-[#0f1116] hover:opacity-90 transition-opacity"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-md border border-theme bg-surface px-5 py-2.5 font-mono text-sm text-main hover:border-[var(--accent)] transition-colors"
          >
            Contact
          </a>
          <a
            href={RESUME_URL}
            download
            className="inline-flex items-center justify-center rounded-md border border-theme bg-surface px-5 py-2.5 font-mono text-sm text-main hover:border-[var(--accent)] transition-colors"
          >
            Resume ↓
          </a>
        </div>
      </div>
    </section>
  )
}
