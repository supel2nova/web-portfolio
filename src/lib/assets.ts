const IMAGES = import.meta.glob<string>('../assets/images/*.{svg,png,jpg,jpeg,webp,gif}', {
  eager: true,
  import: 'default',
})

const match = (name?: string) =>
  name ? Object.entries(IMAGES).find(([path]) => path.includes(`/${name}.`))?.[1] : undefined

export const logoFile = (slug: string) => match(`logo-${slug}`)
export const shotFile = (shot?: string) => match(shot && `shot-${shot}`)
