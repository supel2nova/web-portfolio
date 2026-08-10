import type { ComponentType, SVGProps } from 'react'

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>

export type ContactIcon = 'gmail' | 'github' | 'linkedin' | 'download'

export interface Feature {
  name: string
  detail: string
  shot?: string
  note?: string
  link?: string
  /** Pre-blurred / confidential screenshot — show overlay, skip full-size link */
  blurred?: boolean
}

export interface Project {
  org: string
  short: string
  slug: string
  title: string
  description: string
  tags: string[]
  client?: string | null
  onWhite?: boolean
  link?: string
  features?: Feature[]
}

export interface Skill {
  name: string
  Icon: IconComponent
  href: string
}

export interface ExperienceEntry {
  period: string
  role: string
  org: string
  detail: string | null
}

export interface NavLink {
  href: string
  label: string
}

export interface ContactAction {
  label: string
  href: string
  icon?: ContactIcon
  kind: 'primary' | 'secondary'
  external?: boolean
}

export interface Fact {
  key: string
  value: string
}
