export type EventItem = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: 'online' | 'offline' | 'hybrid';
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
};

export const events: EventItem[] = [
  {
    _id: "60c72b2f9b1d8b2d88a1b501",
    title: "React Summit US 2025",
    slug: "react-summit-us-2025",
    description: "The largest React conference in the US, bringing together frontend engineers to discuss React 19, server components, and styling solutions.",
    overview: "Join thousands of developers in San Francisco or online for two days of talk, hands-on workshops, and networking with core React maintainers and innovators.",
    image: "/images/event1.png",
    venue: "San Francisco Palace of Fine Arts",
    location: "San Francisco, CA, USA",
    date: "2025-11-07",
    time: "09:00 AM",
    mode: "hybrid",
    audience: "Frontend Engineers, React Developers, UI Specialists",
    agenda: [
      "09:00 AM - Opening Keynote: React 19 and Beyond",
      "11:00 AM - Deep Dive: Server Actions in Next.js",
      "02:00 PM - Panel: The Future of CSS-in-JS and Tailwind v4",
      "04:30 PM - Closing Remarks & Happy Hour Networking"
    ],
    organizer: "GitNation",
    tags: ["react", "nextjs", "frontend", "javascript"]
  },
  {
    _id: "60c72b2f9b1d8b2d88a1b502",
    title: "KubeCon + CloudNativeCon Europe 2026",
    slug: "kubecon-cloudnativecon-eu-2026",
    description: "The Cloud Native Computing Foundation's flagship conference gathering adopters and technologists from leading open-source and cloud-native communities.",
    overview: "Four days of education, networking, and collaboration to advance cloud-native computing and Kubernetes ecosystem innovation.",
    image: "/images/event2.png",
    venue: "Messe Wien Exhibition & Congress Center",
    location: "Vienna, Austria",
    date: "2026-03-18",
    time: "10:00 AM",
    mode: "offline",
    audience: "DevOps Engineers, Sysadmins, Site Reliability Engineers, Cloud Architects",
    agenda: [
      "10:00 AM - Welcome & CNCF Community Update Keynote",
      "11:30 AM - Managing Multi-Cluster Kubernetes at Scale",
      "01:30 PM - Hands-On Workshop: eBPF-based Observability",
      "03:30 PM - Panel: GitOps Best Practices in Enterprise"
    ],
    organizer: "Cloud Native Computing Foundation",
    tags: ["kubernetes", "devops", "cloudnative", "docker"]
  },
  {
    _id: "60c72b2f9b1d8b2d88a1b503",
    title: "AWS re:Invent 2025",
    slug: "aws-reinvent-2025",
    description: "Amazon Web Services' learning conference for the global cloud computing community, featuring keynote announcements, training, and certification opportunities.",
    overview: "A transformative week of technology education, feature announcements, and developer networking in the heart of Las Vegas.",
    image: "/images/event3.png",
    venue: "The Venetian Expo",
    location: "Las Vegas, NV, USA",
    date: "2025-12-01",
    time: "08:30 AM",
    mode: "offline",
    audience: "Cloud Architects, Database Administrators, IT Directors",
    agenda: [
      "08:30 AM - Keynote with AWS CEO: The Next Wave of Cloud Compute",
      "10:30 AM - Technical Session: Optimizing Serverless with AWS Lambda",
      "01:00 PM - Chalk Talk: Designing Secure Multi-Region Architectures",
      "03:00 PM - Hands-on Lab: Deploying GenAI on AWS Bedrock"
    ],
    organizer: "Amazon Web Services",
    tags: ["aws", "cloud", "serverless", "databases"]
  },
  {
    _id: "60c72b2f9b1d8b2d88a1b504",
    title: "Next.js Conf 2025",
    slug: "nextjs-conf-2025",
    description: "Vercel's premier conference showcasing the latest advancements in web development, performance optimization, and Next.js features.",
    overview: "Experience a fully hybrid developer conference dedicated to building a faster, more accessible web with Next.js and React Server Components.",
    image: "/images/event4.png",
    venue: "Vercel Campus LA & Online",
    location: "Los Angeles, CA, USA (Hybrid)",
    date: "2025-11-12",
    time: "09:30 AM",
    mode: "hybrid",
    audience: "Next.js Developers, Full-Stack Developers, Web Performance Enthusiasts",
    agenda: [
      "09:30 AM - Keynote: Next.js 16 and Turbopack Production Readiness",
      "11:00 AM - Mastering Partial Prerendering (PPR)",
      "02:00 PM - Fireside Chat: Next.js Caching Best Practices",
      "04:00 PM - Showcase: Incredible Web Apps Built with Next.js"
    ],
    organizer: "Vercel",
    tags: ["nextjs", "react", "vercel", "web-performance"]
  },
  {
    _id: "60c72b2f9b1d8b2d88a1b505",
    title: "Google Cloud Next 2026",
    slug: "google-cloud-next-2026",
    description: "Google Cloud's annual global exhibition highlighting AI innovations, modern infrastructure, security, and developer productivity tools.",
    overview: "Explore how Google Cloud is shaping the future of generative AI, workspace efficiency, and secure app deployment globally.",
    image: "/images/event5.png",
    venue: "San Jose McEnery Convention Center",
    location: "San Jose, CA, USA",
    date: "2026-04-07",
    time: "09:00 AM",
    mode: "offline",
    audience: "AI Engineers, Data Engineers, Security Analysts, Cloud Developers",
    agenda: [
      "09:00 AM - Keynote: Scaling GenAI with Gemini 2.0 Pro",
      "11:00 AM - Building Event-Driven Apps with Cloud Run",
      "01:30 PM - Securing APIs with Apigee & AI Shield",
      "03:30 PM - BigQuery Deep Dive: Real-time Analytics at Scale"
    ],
    organizer: "Google Cloud",
    tags: ["google-cloud", "ai", "gemini", "bigquery"]
  },
  {
    _id: "60c72b2f9b1d8b2d88a1b506",
    title: "ETHGlobal Hackathon: Paris 2026",
    slug: "ethglobal-paris-2026",
    description: "A premier web3 hackathon bringing developers, designers, and creators together to build decentralized applications and smart contracts.",
    overview: "36 hours of continuous hacking, mentorship, and tech talks in the center of Paris, competing for substantial sponsor prizes.",
    image: "/images/event6.png",
    venue: "La Halle Freyssinet (Station F)",
    location: "Paris, France",
    date: "2026-07-10",
    time: "10:00 AM",
    mode: "offline",
    audience: "Smart Contract Developers, Web3 Designers, Solidity Engineers",
    agenda: [
      "10:00 AM - Opening Ceremony & Team Formation Meetup",
      "12:00 PM - Hacking Begins & Sponsor Tech Workshops",
      "08:00 PM - Mentorship Clinics & Smart Contract Auditing Demos",
      "10:00 AM (Next Day) - Project Submission & Demo Presentations"
    ],
    organizer: "ETHGlobal",
    tags: ["ethereum", "solidity", "web3", "hackathon"]
  },
  {
    _id: "60c72b2f9b1d8b2d88a1b507",
    title: "Open Source Summit North America 2026",
    slug: "oss-na-2026",
    description: "The premier event for open-source developers, technologists, and community leaders to collaborate, share information, and solve problems.",
    overview: "A multi-track conference focusing on Linux, security, open-source compliance, database architecture, and community growth.",
    image: "/images/event-full.png",
    venue: "Vancouver Convention Centre",
    location: "Vancouver, Canada",
    date: "2026-06-22",
    time: "09:00 AM",
    mode: "hybrid",
    audience: "Open Source Contributors, Linux Developers, Kernel Engineers",
    agenda: [
      "09:00 AM - Linus Torvalds Keynote: State of the Linux Kernel",
      "11:00 AM - Designing Secure Open Source Software Supply Chains",
      "02:00 PM - Best Practices for Growing an Open Source Project",
      "04:00 PM - Panel: The Economics of Open Source Sustainability"
    ],
    organizer: "The Linux Foundation",
    tags: ["linux", "open-source", "security", "community"]
  }
];

export default events;
