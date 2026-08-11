import type { Project } from '../types'

export const PROJECTS: Project[] = [
  {
    org: 'TTB',
    short: 'TTB',
    slug: 'ttb',
    onWhite: true,
    title: 'Deposit–Cheque Banking System',
    client: 'TMBThanachart Bank',
    description:
      'Developed and maintained an internal banking system for Deposit–Cheque processing. Maintained frontend libraries and improved application stability, resolving production issues across frontend and backend. Built unit and e2e test suites with Playwright.',
    tags: [],
    features: [
      {
        name: 'FINOVA — branch dashboard',
        shot: 'finova-dashboard',
        blurred: true,
        detail:
          'Teller dashboard for daily branch operations: cash position, transaction and cheque summaries, plus quick actions for deposit, withdraw, transfer, bill payment and related services.',
      },
    ],
  },
  {
    org: 'SET',
    short: 'SET',
    slug: 'set',
    onWhite: true,
    title: 'LiVE Exchange / SET Link / Listed Company Snapshot / Corporate Value Up',
    client: 'The Stock Exchange of Thailand',
    description:
      'Expanded from frontend into backend and infrastructure. Built a Disaster Recovery site using Nginx, ProxyPass, and ECS with a custom CI/CD pipeline, and implemented real-time AI-powered translation over WebSocket in Listed Company Snapshot.',
    tags: ['Next.js', 'Angular', 'Golang', 'AWS', 'WebSocket'],
    features: [
      {
        name: 'LiVE Platform — landing revamp',
        shot: 'live-platform',
        link: 'https://www.live-platforms.com',
        detail:
          'Education and tools portal for companies preparing to list — course catalogue, downloadable legal templates, accelerator tracks and an event calendar, all searchable from one hero.',
      },
      {
        name: 'LiVE Platform — login',
        shot: 'live-login',
        link: 'https://www.live-platforms.com',
        detail:
          'One entry point routing three member types — SET, LiVE and LiVEx — into their own permission set and landing area.',
      },
      {
        name: 'LiVE Exchange — landing revamp',
        shot: 'live-exchange',
        link: 'https://www.live-platforms.com/live-exchange',
        detail:
          'Public market page for the SME and startup board: most active / gainer / loser tables, the IPO and SPO pipeline as status cards, company news and recorded Earnings Call sessions.',
      },
      {
        name: 'LiVEx Issuer Portal — IPO filing',
        shot: 'ipo-filing',
        link: 'https://www.live-platforms.com/live-exchange',
        detail:
          'The filing a company works through to list: seven numbered sections plus certifications, public opinion and the effective filing, each tracked in a sidebar that shows how far along the application is. Every saved draft carries a filing version id so approvers review a fixed snapshot.',
      },
      {
        name: 'Corporate Value Up — report workflow',
        shot: 'cvup-dashboard',
        link: 'https://www.setlink.set.or.th/main',
        detail:
          'Four stages on one page — CGR score, data entry, board resolution, publish — each section carrying its own progress bar so a company can see what is left before submitting. Finished reports export to Thai and English PDFs.',
      },
      {
        name: 'Corporate Value Up — bilingual form',
        shot: 'cvup-form',
        detail:
          'Every field is entered twice, Thai beside English, with rich-text editors, repeatable product and segment blocks, three-year revenue tables and a per-section confirmation checkbox that has to be ticked in both languages before the section counts as done.',
      },
      {
        name: 'Listed Company Snapshot',
        shot: 'lss-snapshot',
        link: 'https://www.setlink.set.or.th/main',
        note: 'Preview from a test account — mock data throughout; company name, logo and contact details blurred.',
        detail:
          'A quarterly one-page snapshot rendered in both languages — financial statements, ratios, price chart against the SET index, shareholder breakdown — where the English side is filled by AI translation streamed over WebSocket while the Thai one is being written.',
      },
    ],
  },
  {
    org: 'Food Bank',
    short: 'FB',
    slug: 'foodbank',
    onWhite: true,
    title: 'Load Testing & Infra Optimization',
    client: null,
    description:
      'Conducted system load testing using K6 to evaluate production stability. Optimized Kubernetes and Helm chart configurations for deployment environments.',
    tags: ['Docker', 'Kubernetes', 'K6', 'Helm'],
    features: [
      {
        name: 'GitOps Delivery Pipeline',
        shot: 'foodbank-gitops',
        detail:
          'A merge to main has GitHub Actions build, test and push SHA-tagged images to GHCR, then bump image.tag in a separate infra repo holding the Helm chart and values. Argo CD pulls that repo with a read-only deploy key, renders the chart into the foodbank-bkk namespace and self-heals drift — nothing pushes into the cluster, and the kubelet is what pulls the image.',
      },
      {
        name: 'k6 Load Testing',
        shot: 'foodbank-k6',
        detail:
          'A ramping-vus scenario driving POST /api/v1/orders and GET /api/v1/items up to 50 virtual users over two minutes, with thresholds on p95 latency, failure rate and check rate so a regression fails the run instead of waiting for someone to read the summary.',
        note: 'Illustrative summary used for documentation — the figures are not from a production run.',
      },
    ],
  },
  {
    org: 'Inskru',
    short: 'IN',
    slug: 'inskru',
    title: 'Idea-Sharing Platform for Teachers',
    client: null,
    description:
      'Kickstarted my professional software development journey, focused on frontend development within an existing legacy codebase, adapting to established architecture and conventions.',
    tags: ['Next.js', 'TypeScript', 'Ant Design', 'Tailwind'],
    link: 'https://inskru.com/idea-library/',
    features: [
      {
        name: 'Idea Library',
        shot: 'idea-library',
        note: 'Faces and author avatars blurred for privacy.',
        detail:
          'Community feed of teaching ideas — curated tabs (Recommended, New, insKru Selected, Collections), topic cards, tag filtering and pagination across 15k+ ideas.',
      },
      {
        name: 'Idea Editor',
        shot: 'idea-editor',
        detail:
          'Cover image / video upload, tagging, crediting the idea it builds on, up to 15 attachments, and a rich-text editor with swappable templates — plus preview, draft and publish.',
      },
      {
        name: 'Student Feedback',
        shot: 'student-feedback',
        detail:
          'End-of-class, custom-question and end-of-term feedback forms shared by link or QR, with a results dashboard and downloadable PDF/CSV reports.',
      },
      {
        name: 'Teacher Profile',
        shot: 'teacher-profile',
        note: 'Profile photo blurred for privacy.',
        detail:
          'Sharer and learner stats, Impact Points, follower counts, and separate tabs for own ideas vs. ideas credited by others.',
      },
      {
        name: 'Supporter Membership',
        shot: 'supporter',
        detail:
          'Monthly / quarterly / yearly support plans with a community goal bar, perk gallery (ad-free browsing, insKru Selected tag, name badge, profile frames, certificates) and a tip jar with its own quantity stepper.',
      },
    ],
  },
]
