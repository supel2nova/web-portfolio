import type { SVGProps } from 'react'

const BRAND = '#61DAFB'

export default function ReactLogo({
  variant = 'default',
  ...props
}: SVGProps<SVGSVGElement> & { variant?: string }) {
  const color = variant === 'mono' ? 'currentColor' : BRAND
  return (
    <svg viewBox="-11.5 -10.23174 23 20.46348" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>React</title>
      <circle r="2.05" fill={color} />
      <g stroke={color} strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  )
}
