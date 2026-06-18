import { siteUrl } from '../lib/siteUrl'

/** Navbar logo heights in px — used in Header.tsx */
export const headerLayout = {
  logoHeightDefault: 112,
  logoHeightScrolled: 56,
  /** Sticky header stack height on lg+ — keep in sync with .hero-section margin-top */
  navBarOverlap: '11rem',
} as const

export const site = {
  name: "Mario's Roofing & Construction",
  url: siteUrl,
  tagline: 'ROOFING • REMODELING • PLUMBING • HVAC',
  phones: {
    texas: { label: 'Texas Line', number: '409-999-0600', href: 'tel:+14099990600' },
    florida: { label: 'Florida Line', number: '561-377-5260', href: 'tel:+15613775260' },
  },
  email: 'abcsconst@gmail.com',
  emailHref: 'mailto:abcsconst@gmail.com',
  formEndpoint: '/api/contact',
} as const

export const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Our Work', href: '#gallery' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Areas', href: '#areas' },
  { label: 'Contact', href: '#contact' },
] as const

export const hero = {
  eyebrow: 'Houston • Galveston • Gulf Coast',
  titleLead: 'Roofing, Remodeling & Repairs',
  titleAccent: 'Done Right',
  subtitle:
    'We help homeowners and property owners repair, improve, and protect their homes with honest work, practical solutions, and dependable service.',
  services: ['Roofing', 'Remodeling', 'Plumbing', 'HVAC'] as const,
  backgroundImage: '/images/hero-background.png',
  showcasePhotos: [
    {
      src: '/images/gallery-roof-crew-on-site.jpeg',
      alt: "Mario's Roofing crew installing shingles on a Gulf Coast home",
      caption: 'Roofing crew',
    },
    {
      src: '/images/meet-mario-owner-sign.jpeg',
      alt: 'Mario smiling beside the Mario\'s Roofing & Construction yard sign at a job site',
      caption: 'Meet Mario',
      objectPosition: '38% 32%',
    },
  ],
  trustStrip: [
    { value: 'Master Craftsman', label: 'CertainTeed certified · valid through 2028' },
    { value: '24/7', label: 'Storm damage & emergency repairs' },
    { value: 'Free', label: 'Drone roof inspections' },
  ],
  projectVideo: {
    src: '/videos/project-showcase.mp4',
    poster: '/images/video-poster.jpg',
    title: 'Projects in action',
    subtitle: 'Real crews on real Gulf Coast jobs',
    ctaLabel: 'Watch Our Work',
    fallbackMessage: 'Try again on Wi‑Fi, or call us for a free quote.',
  },
} as const

export const services = [
  {
    id: 'roofing',
    title: 'Roofing',
    description:
      'Repairs, replacements, and storm damage restoration — built to stand up to Gulf Coast weather.',
    highlights: ['Storm & leak repairs', 'Full roof replacements', 'Free drone inspections'],
    icon: 'home' as const,
  },
  {
    id: 'remodeling',
    title: 'Remodeling',
    description:
      'Bathrooms, kitchens, and full interior upgrades handled from demo through finish.',
    highlights: ['Bathroom remodels', 'Kitchen updates', 'Tile & flooring'],
    icon: 'hammer' as const,
  },
  {
    id: 'plumbing',
    title: 'Plumbing',
    description:
      'Leaks, repipes, fixtures, and new construction plumbing done right the first time.',
    icon: 'droplet' as const,
    highlights: ['Leak detection & repair', 'Fixture installs', 'Repipes & new lines'],
  },
  {
    id: 'hvac',
    title: 'HVAC',
    description:
      'Heating and cooling service, installs, and repairs to keep your home comfortable year-round.',
    highlights: ['AC repair & service', 'Heating systems', 'New unit installs'],
    icon: 'wind' as const,
  },
] as const

export const meetMario = {
  eyebrow: 'Meet Mario',
  title: 'Your Contractor — On Site, Not Just on Paper',
  description:
    'When you call Mario\'s Roofing & Construction, you talk to a local contractor who shows up, explains your options honestly, and stands behind the work — from the first quote to the final walkthrough.',
  points: [
    'Hands-on owner across Houston, Galveston & South Florida',
    'On-site leadership from estimate through final walkthrough',
    'Roofing, remodeling, plumbing & HVAC under one trusted team',
  ],
  photos: {
    primary: {
      src: '/images/meet-mario-owner-sign.jpeg',
      alt: 'Mario smiling beside the Mario\'s Roofing & Construction yard sign in front of a Gulf Coast home',
      objectPosition: '42% 28%',
    },
    secondary: {
      src: '/images/meet-mario-on-site.jpeg',
      alt: 'Mario on location at a Gulf Coast residential project',
      objectPosition: '22% 30%',
    },
    caption: 'Mario on site — the same person you speak with when you call.',
  },
  author: {
    cover: {
      src: '/images/book-cover-front.png',
      alt: 'Book cover: The Barter Life / La Vida del Trueque by Mario D. Romero',
    },
    label: 'Published Author',
    title: 'The Barter Life · La Vida del Trueque',
    line:
      'Authors get it done. Less than 10% of writers who start a book ever finish — Mario did.',
  },
} as const

export const whyChooseUs = {
  eyebrow: 'Trusted Local Pros',
  title: 'Why Mario',
  titleAccent: 'is different.',
  intro:
    'Local contractor. Real accountability. Work that holds up on the Gulf Coast — not empty promises.',
  stats: [
    { value: 'Certified', label: 'Master Craftsman' },
    { value: 'Through 2028', label: 'CertainTeed credential' },
    { value: '24/7', label: 'Emergency service' },
  ],
  points: [
    {
      id: '01',
      title: 'Honest estimates',
      detail: 'Clear pricing and straight answers before a single shingle moves.',
    },
    {
      id: '02',
      title: 'Quality workmanship',
      detail: 'Skilled crews and finish details done right the first time.',
    },
    {
      id: '03',
      title: 'Emergency service',
      detail: 'Storm damage, leaks, and urgent repairs — call anytime.',
    },
    {
      id: '04',
      title: 'Gulf Coast experience',
      detail: 'Houston, Galveston, and the communities we have worked in for years.',
    },
  ],
  highlights: [
    { title: 'Licensed & Insured', detail: 'Fully covered for your peace of mind', icon: 'shield' as const },
    { title: 'Free Drone Inspections', detail: 'Aerial roof surveys — no cost, no pressure', icon: 'camera' as const },
  ],
  certificate: {
    image: '/images/cert-certainteed-master-craftsman.jpeg',
    alt: 'CertainTeed Master Craftsman certificate for Mario Daniel Romero',
    badge: 'CertainTeed Certified',
    caption: 'Master Craftsman — Residential Roofing',
    recipient: 'Mario Daniel Romero',
    validThrough: 'Valid through January 15, 2028',
    credentialHat: {
      image: '/images/cert-master-craftsman-hat.jpeg',
      alt: 'CertainTeed Master Craftsman roofing contractor cap',
      label: 'Worn on every job',
    },
  },
} as const

export type GalleryItem =
  | {
      id: string
      type: 'image'
      src: string
      alt: string
      caption: string
      category: 'remodeling' | 'roofing' | 'construction'
    }
  | {
      id: string
      type: 'placeholder'
      caption: string
      category: 'roofing'
      message: string
    }

export const gallery: GalleryItem[] = [
  {
    id: 'project-commercial-replacement',
    type: 'image',
    src: '/images/gallery-project-commercial-replacement.jpeg',
    alt: 'Roofing crew replacing a large commercial building roof with blue synthetic underlayment',
    caption: 'Commercial Roof Replacement',
    category: 'roofing',
  },
  {
    id: 'project-church-replacement',
    type: 'image',
    src: '/images/gallery-project-church-replacement.jpeg',
    alt: 'Crew replacing the roof on a brick church with exposed decking and material staging below',
    caption: 'Church Roof Project',
    category: 'roofing',
  },
  {
    id: 'roof-finished-aerial',
    type: 'image',
    src: '/images/gallery-roof-finished-aerial.jpeg',
    alt: 'New architectural shingle roof on a Gulf Coast home, viewed from the ridge',
    caption: 'Architectural Shingle Install — Gulf Coast',
    category: 'roofing',
  },
  {
    id: 'project-commercial-crew',
    type: 'image',
    src: '/images/gallery-project-commercial-crew.jpeg',
    alt: 'Workers installing CertainTeed underlayment on a long commercial brick building',
    caption: 'Commercial Crew On Site',
    category: 'roofing',
  },
  {
    id: 'roof-crew-on-site',
    type: 'image',
    src: '/images/gallery-roof-crew-on-site.jpeg',
    alt: 'Roofing crew installing shingles on a brick and siding home under blue skies',
    caption: 'Crew On Site — Full Replacement',
    category: 'roofing',
  },
  {
    id: 'project-church-site',
    type: 'image',
    src: '/images/gallery-project-church-site.jpeg',
    alt: 'Mario\'s Roofing crew staging materials at a church roofing project',
    caption: 'Church Project — On Site',
    category: 'roofing',
  },
  {
    id: 'bath-finished-01',
    type: 'image',
    src: '/images/gallery-master-bath-finished-01.jpeg',
    alt: 'Finished master bathroom with frameless glass shower and tile work',
    caption: 'Master Bath Remodel — Galveston Area',
    category: 'remodeling',
  },
  {
    id: 'project-underlayment-install',
    type: 'image',
    src: '/images/gallery-project-underlayment-install.jpeg',
    alt: 'Roofer installing GAF StormGuard and CertainTeed underlayment on a commercial roof',
    caption: 'Premium Underlayment Install',
    category: 'roofing',
  },
  {
    id: 'roof-certainteed',
    type: 'image',
    src: '/images/gallery-roof-certainteed-install.jpeg',
    alt: 'CertainTeed Landmark shingles staged on a residential roof ridge during installation',
    caption: 'CertainTeed Shingle Install',
    category: 'roofing',
  },
  {
    id: 'tile-install',
    type: 'image',
    src: '/images/gallery-shower-tile-install.jpeg',
    alt: 'Contractor installing large-format shower wall tile',
    caption: 'Custom Tile Installation',
    category: 'remodeling',
  },
  {
    id: 'roof-underlayment',
    type: 'image',
    src: '/images/gallery-roof-underlayment-crew.jpeg',
    alt: 'Roofing crew installing synthetic underlayment on a steep residential roof',
    caption: 'Synthetic Underlayment — Quality Prep',
    category: 'roofing',
  },
  {
    id: 'shower-framing',
    type: 'image',
    src: '/images/gallery-shower-backboard-framing.jpeg',
    alt: 'Shower area with cement backer board and framing',
    caption: 'Shower Build-Out — In Progress',
    category: 'construction',
  },
  {
    id: 'wall-framing',
    type: 'image',
    src: '/images/gallery-wall-framing-insulation.jpeg',
    alt: 'Wall framing and insulation during remodel',
    caption: 'Structural Remodel Work',
    category: 'construction',
  },
  {
    id: 'bath-prep',
    type: 'image',
    src: '/images/gallery-bath-remodel-prep.jpeg',
    alt: 'Bathroom protected and prepped for remodeling work',
    caption: 'Protected Worksite — Quality Prep',
    category: 'remodeling',
  },
  {
    id: 'tile-progress',
    type: 'image',
    src: '/images/gallery-shower-tile-in-progress.jpeg',
    alt: 'Shower tile installation in progress with leveling clips',
    caption: 'Precision Tile Work',
    category: 'remodeling',
  },
]

export const transformations = [
  {
    id: 'shower-01',
    title: 'Master Bath Shower',
    location: 'Gulf Coast',
    before: {
      src: '/images/before-after-shower-framing.jpeg',
      alt: 'Shower area during framing and backer board stage',
      label: 'Before',
    },
    after: {
      src: '/images/before-after-shower-finished.jpeg',
      alt: 'Finished master bathroom shower with glass enclosure',
      label: 'After',
    },
  },
  {
    id: 'shower-02',
    title: 'Custom Tile Shower',
    location: 'Galveston Area',
    before: {
      src: '/images/before-after-tile-progress.jpeg',
      alt: 'Shower walls during tile installation',
      label: 'Before',
    },
    after: {
      src: '/images/before-after-tile-finished.jpeg',
      alt: 'Completed shower with stone-look tile and glass door',
      label: 'After',
    },
  },
] as const

export const testimonials = {
  enabled: true,
  eyebrow: 'Customer Reviews',
  title: 'What Our Customers Say',
  placeholderMessage:
    'Reviews from Houston & Galveston homeowners — coming soon.',
  items: [
    {
      id: 'jason-n-clear-lake',
      quote:
        'Mario has done several projects in my home. His knowledge and expertise is top notch!!!!',
      author: 'Jason N',
      location: 'Clear Lake, TX',
    },
  ],
} as const

export const serviceAreas = [
  'Houston',
  'Galveston',
  'Harris County',
  'League City',
  'Dickinson',
  'Kemah',
  'San Leon',
  'Bacliff',
  'Texas City',
  'La Marque',
  'Friendswood',
  'Surrounding Areas',
] as const

export const serviceAreasSection = {
  image: '/images/gallery-roof-finished-aerial.jpeg',
  imageAlt: 'New architectural shingle roof on a Gulf Coast residential home',
  stats: [
    { label: 'Communities served', value: '12+' },
    { label: 'Service region', value: 'Gulf Coast' },
    { label: 'Emergency line', value: '24/7' },
  ],
} as const

export const contact = {
  title: 'Get a Free Quote',
  eyebrow: 'Contact Us',
  subtitle: 'Tell us about your project. We respond quickly — usually the same business day.',
  callout: 'Prefer to call? We\'re ready when you are.',
  hours: {
    label: 'Business Hours',
    schedule: 'Mon – Sat · 7:00 AM – 6:00 PM',
    note: '24/7 emergency line for urgent storm & leak repairs',
  },
  fields: {
    services: ['Roofing', 'Remodeling', 'Plumbing', 'HVAC', 'Other'] as const,
  },
} as const
