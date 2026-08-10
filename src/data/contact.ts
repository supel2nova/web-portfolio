import type { ContactAction } from '../types'
import { RESUME_URL } from './profile'

export const LOCATION =
  'Samutprakarn, Thailand — Open to new opportunities and interesting projects'

export const CONTACT_ACTIONS: ContactAction[] = [
  {
    label: 'y.panupong.91@gmail.com',
    href: 'mailto:y.panupong.91@gmail.com',
    kind: 'primary',
    icon: 'gmail',
  },
  { label: '099-119-2662', href: 'tel:0991192662', kind: 'secondary' },
  { label: 'Resume (PDF)', href: RESUME_URL, kind: 'secondary', icon: 'download' },
  {
    label: 'GitHub',
    href: 'https://github.com/supel2nova',
    kind: 'secondary',
    external: true,
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/panupong-yapradith-013391191',
    kind: 'secondary',
    external: true,
    icon: 'linkedin',
  },
]
