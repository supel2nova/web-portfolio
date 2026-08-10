import type { ComponentType, SVGProps } from 'react'
import type { IconComponent } from '../../types'

type WithVariant = ComponentType<SVGProps<SVGSVGElement> & { variant?: string }>

export default function MonoIcon({
  Icon,
  ...props
}: SVGProps<SVGSVGElement> & { Icon: IconComponent }) {
  const Glyph = Icon as WithVariant
  return <Glyph variant="mono" {...props} />
}
