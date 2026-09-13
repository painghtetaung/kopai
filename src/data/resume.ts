// Single source of truth for all portfolio content.
// Edit values here to update the site.

export interface Social {
  label: string
  href: string
}

export interface Profile {
  name: string
  role: string
  tagline: string
  location: string
  email: string
  phone: string
  yearsExperience: string
  summary: string
  socials: Social[]
}

export interface SkillGroup {
  group: string
  items: string[]
}

export interface Job {
  company: string
  role: string
  period: string
  mode: string
  url?: string
  summary: string
  points: string[]
}

export interface Project {
  title: string
  tag: string
  description: string
  accent: string
  company: string
  category: string
}

export interface Education {
  school: string
  detail: string
  period: string
}

export const profile: Profile = {
  name: 'Paing Htet Aung',
  role: 'Frontend Developer',
  tagline:
    'I build responsive, high-performance web experiences with thoughtful motion and interaction.',
  location: 'Bangkok, Thailand',
  email: 'painghtetaung1999@gmail.com',
  phone: '+66 92 617 0030',
  yearsExperience: '5+',
  summary:
    'Senior JavaScript frontend developer with 5+ years of experience creating responsive, user-centric web applications. Proficient across React, Next.js and Vue, with a focus on clean architecture, reusable components, motion design and performance.',
  socials: [
    { label: 'Email', href: 'mailto:painghtetaung1999@gmail.com' },
    { label: 'GitHub', href: 'https://github.com/painghtetaung' },
  ],
}

export const skills: SkillGroup[] = [
  {
    group: 'Front-End',
    items: [
      'JavaScript',
      'TypeScript',
      'React',
      'Redux',
      'Next.js',
      'Vue.js',
      'jQuery',
      'HTML5',
      'CSS3',
    ],
  },
  {
    group: 'UI Libraries',
    items: [
      'Tailwind CSS',
      'Bootstrap',
      'Material UI',
      'shadcn/ui',
      'Ant Design',
    ],
  },
  {
    group: 'Animation',
    items: ['Framer Motion', 'GSAP', 'P5.js', 'Google Blockly'],
  },
  {
    group: 'Tools & Methods',
    items: ['Git', 'GitHub', 'GitLab', 'Heroku', 'Netlify'],
  },
]

export const experience: Job[] = [
  {
    company: 'Rezerv',
    role: 'Frontend Developer',
    period: 'Feb 2025 — Present',
    mode: 'Current',
    url: 'https://www.rezerv.co/',
    summary:
      'All-in-one booking and business management platform for fitness, wellness and appointment-based studios.',
    points: [
      'Develop and maintain customer-facing booking flows and business dashboards using React and TypeScript.',
      'Build reusable, accessible component systems that keep the product consistent across features.',
      'Focus on smooth interactions, responsive layouts and frontend performance across devices.',
    ],
  },
  {
    company: 'Nuos Magicko',
    role: 'Frontend Developer',
    period: 'Sept 2024 — Feb 2025',
    mode: 'Onsite · Bangkok',
    summary: 'AI-powered startup building enterprise-level software solutions.',
    points: [
      'Developed responsive, scalable frontend applications using React, TypeScript and Tailwind CSS.',
      'Built real-time video call features with MediaSoup, integrating frontend with backend for seamless communication.',
      'Collaborated with backend engineers across OpenAI, Python and .NET APIs to build intelligent interfaces.',
      'Contributed to internal tools and dashboards, prioritising clean architecture and reusable components.',
    ],
  },
  {
    company: 'Dinger',
    role: 'Senior Frontend Developer',
    period: 'Jan 2023 — Sept 2024',
    mode: 'Hybrid',
    summary:
      'A leading payment gateway providing wallet systems for local banks.',
    points: [
      'Enabled businesses to accept digital payments, optimising apps for speed and secure transactions at 600+ transactions per day.',
      'Enhanced security measures to protect sensitive user data and maintain transaction integrity.',
      'Built the E-Wallet Admin Dashboard for Myanma Tourism Bank in React and Next.js — user management, transaction monitoring, analytics and reporting.',
      'Developed accounting and financial-record tooling within the dashboard with robust access controls.',
    ],
  },
  {
    company: 'MINT',
    role: 'Frontend Developer',
    period: 'July 2022 — Dec 2022',
    mode: 'Remote',
    summary:
      'A digital powerhouse offering business consulting, technology integration, data analytics and creative solutions.',
    points: [
      "Developed MINT's portfolio website from scratch with reusable, testable components and clean design patterns.",
      'Collaborated closely with UI/UX designers to ensure products matched design intent.',
      'Sharpened JavaScript and CSS animation skills through the portfolio build.',
      'At AIDMA Holdings: restructured a large Japanese recruitment platform, revamping the UI with Vue and Quasar and resolving numerous UI bugs.',
    ],
  },
  {
    company: 'Thate Pan Hub',
    role: 'Frontend Developer',
    period: 'Oct 2021 — Apr 2023',
    mode: 'Hybrid',
    summary:
      'EdTech building programming and STEM learning for youths in Myanmar.',
    points: [
      'Built a visual programming platform teaching kids and teenagers to code — React, Redux and Tailwind CSS with Google Blockly and P5.js for gamified, interactive elements.',
      'Improved the learning platform’s usability and performance for a more engaging experience.',
      'Developed Thate Pan Learn, an e-learning LMS on Moodle with a custom theme for CS, AI and STEM courses.',
    ],
  },
]

export const projects: Project[] = [
  {
    title: 'Rezerv Booking Platform',
    company: 'Rezerv',
    category: 'Booking & wellness',
    tag: 'React · TypeScript',
    description:
      'Booking flows and business dashboards for fitness & wellness studios, with a shared component system.',
    accent: '#7c6cff',
  },
  {
    title: 'E-Wallet Admin Dashboard',
    company: 'Dinger',
    category: 'Finance & payments',
    tag: 'Next.js · Fintech',
    description:
      'Admin dashboard for a bank wallet system — user management, transaction monitoring, analytics and reporting.',
    accent: '#3ddc97',
  },
  {
    title: 'Visual Programming Platform',
    company: 'Thate Pan Hub',
    category: 'Learning & play',
    tag: 'React · Blockly · P5.js',
    description:
      'Gamified visual programming environment that teaches kids and teens to code through interactive blocks.',
    accent: '#ff7a59',
  },
  {
    title: 'Real-time Video Calling',
    company: 'Nuos Magicko',
    category: 'Real-time communication',
    tag: 'React · MediaSoup',
    description:
      'Low-latency video call features integrated with backend services for seamless real-time communication.',
    accent: '#4fc3ff',
  },
]

export const education: Education[] = [
  {
    school: 'Yangon University of Distance Education',
    detail:
      'Final Year — Business Management (Management Accounting, International Finance)',
    period: 'Dec 2016 — Apr 2019',
  },
  {
    school: 'KMD Institute',
    detail:
      'Diploma in Web Development (Database Management Systems, Web Development Technology)',
    period: 'Apr 2016 — Apr 2017',
  },
]

export const studio = {
  shortName: 'Paing',
  intro:
    'I turn complex ideas into simple, expressive web experiences. A frontend developer with a soft spot for the little details.',
  about:
    'Good interfaces should make life a little easier. And, when there’s room, a little more delightful.',
  note: 'I care about the way a button responds, how a page settles into place, and all the small things you feel before you notice.',
  principles: [
    'Make it useful.',
    'Keep it thoughtful.',
    'Leave room for play.',
  ],
  toolkit: ['React', 'Next.js', 'TypeScript', 'Vue.js', 'Framer Motion'],
}
