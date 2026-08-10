import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, useState } from 'react'
import { NAV_OFFSET, NAV_SCROLL_START } from '../constants'
import { useTheme } from '../hooks/useTheme'
import { NAV_LINKS } from '../data/nav'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export default function Nav() {
  const { theme, toggleTheme } = useTheme()
  const reduced = usePrefersReducedMotion()
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const dotRef = useRef<HTMLSpanElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)
  const logoRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const nav = navRef.current
      if (!nav) return

      const apply = (scrolled: boolean) => {
        nav.classList.toggle('is-scrolled', scrolled)
      }

      const st = ScrollTrigger.create({
        start: NAV_SCROLL_START,
        onEnter: () => apply(true),
        onLeaveBack: () => apply(false),
        onRefresh: (self) => apply(self.scroll() >= NAV_SCROLL_START),
      })

      apply(st.scroll() >= NAV_SCROLL_START)

      let onScroll: (() => void) | undefined

      if (!reduced) {
        const setProgress = gsap.quickTo(progressRef.current, 'scaleX', {
          duration: 0.25,
          ease: 'none',
        })
        onScroll = () => setProgress(window.scrollY / (ScrollTrigger.maxScroll(window) || 1))
        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()
      }

      const logo = logoRef.current
      const scramble = () =>
        gsap.to(logo, {
          duration: 0.5,
          ease: 'none',
          scrambleText: { text: 'panupong', chars: 'lowerCase', speed: 0.6 },
        })
      if (!reduced && logo) logo.addEventListener('mouseenter', scramble)

      NAV_LINKS.forEach(({ href }) => {
        const section = document.querySelector(href)
        if (!section) return
        const links = nav.querySelectorAll(`a[href="${href}"]`)
        ScrollTrigger.create({
          trigger: section,
          start: 'top 50%',
          end: 'bottom 50%',
          onToggle: ({ isActive }) =>
            links.forEach((l) => l.classList.toggle('is-active', isActive)),
        })
      })
      return () => {
        logo?.removeEventListener('mouseenter', scramble)
        if (onScroll) window.removeEventListener('scroll', onScroll)
      }
    },
    { scope: navRef, dependencies: [reduced] },
  )

  const scrollTo = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault()
    setMenuOpen(false)
    gsap.to(window, {
      duration: reduced ? 0 : 0.9,
      ease: 'power3.inOut',
      scrollTo: { y: href, offsetY: NAV_OFFSET, autoKill: true },
    })
  }

  const handleToggle = () => {
    toggleTheme()
    if (!dotRef.current || reduced) return
    gsap.fromTo(dotRef.current, { scale: 1.4 }, { scale: 1, duration: 0.4, ease: 'back.out(3)' })
  }

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 inset-x-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
        menuOpen
          ? 'bg-[var(--bg)] border-theme'
          : 'bg-transparent border-transparent [&.is-scrolled]:bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] [&.is-scrolled]:backdrop-blur-md [&.is-scrolled]:border-theme'
      }`}
    >
      <div className="mx-auto max-w-5xl px-5 md:px-8 h-16 flex items-center justify-between gap-4">
        <a
          href="#top"
          onClick={(e) => scrollTo(e, '#top')}
          className="font-mono text-sm md:text-base font-semibold tracking-tight"
        >
          <span ref={logoRef}>panupong</span>
          <span className="text-accent">.</span>dev
        </a>

        <div className="flex items-center gap-3 md:gap-8">
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="font-mono text-sm text-dim hover:text-main transition-colors [&.is-active]:text-[var(--accent)]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={handleToggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            className="inline-flex items-center gap-2 rounded-full border border-theme bg-surface px-3.5 py-1.5 font-mono text-xs text-dim hover:text-main transition-colors"
          >
            <span
              ref={dotRef}
              className="block size-2 rounded-full bg-accent"
              style={{ boxShadow: '0 0 8px var(--accent)' }}
              aria-hidden
            />
            {theme}
          </button>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden font-mono text-xs text-dim border border-theme rounded-md px-2.5 py-1.5 bg-surface"
          >
            {menuOpen ? 'close' : 'menu'}
          </button>
        </div>
      </div>

      <span
        ref={progressRef}
        className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent"
        aria-hidden
      />

      {menuOpen && (
        <div className="md:hidden border-t border-theme bg-[var(--bg)] px-5 py-4 flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              className="font-mono text-sm text-dim hover:text-main py-1 [&.is-active]:text-[var(--accent)]"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
