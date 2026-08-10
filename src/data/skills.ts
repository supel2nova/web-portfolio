import AmazonWebServices from '@thesvg/react/amazon-web-services'
import AntDesign from '@thesvg/react/ant-design'
import Docker from '@thesvg/react/docker'
import Express from '@thesvg/react/express'
import GithubActions from '@thesvg/react/github-actions'
import Go from '@thesvg/react/go'
import Helm from '@thesvg/react/helm'
import Kubernetes from '@thesvg/react/kubernetes'
import Mongodb from '@thesvg/react/mongodb'
import Mui from '@thesvg/react/mui'
import Mysql from '@thesvg/react/mysql'
import Nextjs from '@thesvg/react/nextjs'
import Nodejs from '@thesvg/react/nodejs'
import Postgresql from '@thesvg/react/postgresql'
import React from '@thesvg/react/react'
import Tailwindcss from '@thesvg/react/tailwindcss'
import Tanstack from '@thesvg/react/tanstack'
import Typescript from '@thesvg/react/typescript'
import type { Skill } from '../types'

export const SKILLS: Skill[] = [
  { name: 'React', Icon: React, href: 'https://react.dev' },
  { name: 'Next.js', Icon: Nextjs, href: 'https://nextjs.org/docs' },
  { name: 'TypeScript', Icon: Typescript, href: 'https://www.typescriptlang.org/docs/' },
  {
    name: 'TanStack Query',
    Icon: Tanstack,
    href: 'https://tanstack.com/query/latest/docs/framework/react/overview',
  },
  { name: 'TailwindCSS', Icon: Tailwindcss, href: 'https://tailwindcss.com/docs' },
  { name: 'MUI', Icon: Mui, href: 'https://mui.com/material-ui/getting-started/' },
  { name: 'Ant Design', Icon: AntDesign, href: 'https://ant.design/components/overview/' },
  { name: 'Node.js', Icon: Nodejs, href: 'https://nodejs.org/docs/latest/api/' },
  { name: 'Golang', Icon: Go, href: 'https://go.dev/doc/' },
  { name: 'Express', Icon: Express, href: 'https://expressjs.com/' },
  { name: 'AWS', Icon: AmazonWebServices, href: 'https://docs.aws.amazon.com/' },
  { name: 'Docker', Icon: Docker, href: 'https://docs.docker.com/' },
  { name: 'Kubernetes', Icon: Kubernetes, href: 'https://kubernetes.io/docs/home/' },
  { name: 'Helm', Icon: Helm, href: 'https://helm.sh/docs/' },
  { name: 'GitHub Actions', Icon: GithubActions, href: 'https://docs.github.com/en/actions' },
  { name: 'PostgreSQL', Icon: Postgresql, href: 'https://www.postgresql.org/docs/' },
  { name: 'MySQL', Icon: Mysql, href: 'https://dev.mysql.com/doc/' },
  { name: 'MongoDB', Icon: Mongodb, href: 'https://www.mongodb.com/docs/' },
]
