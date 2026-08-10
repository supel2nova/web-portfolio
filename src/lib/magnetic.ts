import gsap from 'gsap'

interface MagneticOptions {
  x?: number
  y?: number
  duration?: number
}

export function magnetic(
  el: HTMLElement | null,
  { x = 0.4, y = 0.6, duration = 0.4 }: MagneticOptions = {},
) {
  if (!el) return () => {}

  const xTo = gsap.quickTo(el, 'x', { duration, ease: 'power3' })
  const yTo = gsap.quickTo(el, 'y', { duration, ease: 'power3' })

  const move = (event: MouseEvent) => {
    const rect = el.getBoundingClientRect()
    xTo((event.clientX - rect.left - rect.width / 2) * x)
    yTo((event.clientY - rect.top - rect.height / 2) * y)
  }
  const reset = () => {
    xTo(0)
    yTo(0)
  }

  el.addEventListener('mousemove', move)
  el.addEventListener('mouseleave', reset)
  return () => {
    el.removeEventListener('mousemove', move)
    el.removeEventListener('mouseleave', reset)
  }
}
