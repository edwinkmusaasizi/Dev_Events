const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// Helper to generate slug
function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

async function seed() {
  // 1. Read MONGODB_URI from .env.local
  const envPath = path.join(__dirname, '.env.local');
  if (!fs.existsSync(envPath)) {
    console.error("Could not find .env.local");
    process.exit(1);
  }
  
  const envContent = fs.readFileSync(envPath, 'utf8');
  const uriMatch = envContent.match(/^MONGODB_URI=(.+)$/m);
  
  if (!uriMatch) {
    console.error("Could not find MONGODB_URI in .env.local");
    process.exit(1);
  }
  
  const uri = uriMatch[1].trim().replace(/^"|"$/g, '');
  
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log("Connected to MongoDB...");
    const db = client.db(); 
    const eventsCollection = db.collection('events'); // Mongoose usually pluralizes models

    const events = [
      {
        title: "React Next.js Summit 2026",
        description: "The ultimate gathering for React and Next.js developers. Learn about Server Actions, PPR, and the future of React.",
        overview: "A 2-day deep dive into the Next.js ecosystem.",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
        creatorId: "admin",
        venue: "Tech Convention Center",
        location: "San Francisco, CA",
        date: "2026-09-15",
        time: "09:00",
        mode: "hybrid",
        audience: "Frontend Developers, Fullstack Engineers",
        agenda: ["Keynote: The Future of React", "Deep Dive: Server Actions", "Networking Lunch", "Workshop: Advanced Next.js Caching"],
        organizer: "Vercel & React Core Team",
        tags: ["react", "nextjs", "frontend", "javascript"]
      },
      {
        title: "Global AI DevFest",
        description: "Explore the latest in Artificial Intelligence, Machine Learning, and LLM integrations for web applications.",
        overview: "Bringing AI engineers and web developers together.",
        image: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=800&q=80",
        creatorId: "admin",
        venue: "Virtual Event",
        location: "Online",
        date: "2026-10-05",
        time: "10:00",
        mode: "online",
        audience: "AI Researchers, Software Engineers",
        agenda: ["State of LLMs in 2026", "Building AI Agents", "RAG architectures", "Ethical AI"],
        organizer: "AI Dev Alliance",
        tags: ["ai", "machine-learning", "llm", "agents"]
      },
      {
        title: "Cybersecurity for Web Devs",
        description: "A hands-on workshop teaching web developers how to secure their applications against modern OWASP top 10 threats.",
        overview: "Secure your web apps against the latest threats.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
        creatorId: "admin",
        venue: "Downtown Marriott",
        location: "Austin, TX",
        date: "2026-08-22",
        time: "13:00",
        mode: "offline",
        audience: "Backend Developers, Fullstack Engineers, Security Enthusiasts",
        agenda: ["Modern Auth Attacks", "Preventing XSS in SPA", "Database Injection live hack", "Securing APIs"],
        organizer: "OWASP Austin",
        tags: ["security", "owasp", "backend", "auth"]
      },
      {
        title: "Tailwind UI & UX Masterclass",
        description: "Learn how to build stunning, accessible user interfaces using Tailwind CSS v4 and modern CSS features.",
        overview: "Design beautiful apps faster.",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80",
        creatorId: "admin",
        venue: "Design Hub",
        location: "London, UK",
        date: "2026-11-12",
        time: "09:30",
        mode: "hybrid",
        audience: "UI/UX Designers, Frontend Developers",
        agenda: ["Tailwind v4 features", "Building a Design System", "Micro-interactions", "Accessibility deep dive"],
        organizer: "DesignersCode",
        tags: ["tailwind", "css", "ui-ux", "design"]
      },
      {
        title: "MongoDB Schema Design Patterns",
        description: "Stop relying on relational habits. Learn how to model your NoSQL data for scale, speed, and flexibility in MongoDB.",
        overview: "Advanced NoSQL data modeling.",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
        creatorId: "admin",
        venue: "Virtual Event",
        location: "Online",
        date: "2026-09-02",
        time: "15:00",
        mode: "online",
        audience: "Database Admins, Backend Engineers",
        agenda: ["The Polymorphic Pattern", "Handling large arrays", "Bucket Pattern", "Indexes and performance"],
        organizer: "Mongo Enthusiasts",
        tags: ["mongodb", "database", "backend", "nosql"]
      },
      {
        title: "Cloud Native DevOps Bootcamp",
        description: "Get up to speed with Kubernetes, Docker, CI/CD pipelines, and infrastructure as code using Terraform.",
        overview: "Master modern deployment strategies.",
        image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&q=80",
        creatorId: "admin",
        venue: "Tech Park",
        location: "Seattle, WA",
        date: "2026-10-20",
        time: "08:00",
        mode: "offline",
        audience: "DevOps Engineers, SysAdmins, Backend Developers",
        agenda: ["Docker from scratch", "K8s architecture", "GitOps with ArgoCD", "Terraform modules"],
        organizer: "Cloud Native Computing Foundation",
        tags: ["devops", "kubernetes", "cloud", "docker"]
      },
      {
        title: "Web3 & Blockchain Developers Conference",
        description: "Explore smart contract development, decentralized apps (dApps), and the future of the decentralized web.",
        overview: "Building the future of the internet.",
        image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800&q=80",
        creatorId: "admin",
        venue: "Convention Center",
        location: "Miami, FL",
        date: "2026-12-05",
        time: "10:00",
        mode: "hybrid",
        audience: "Web3 Developers, Crypto Enthusiasts",
        agenda: ["Solidity 101", "Building a DeFi app", "Zero-Knowledge Proofs", "Web3 UX"],
        organizer: "Web3 Builders",
        tags: ["web3", "blockchain", "crypto", "solidity"]
      },
      {
        title: "Rust for Web Developers",
        description: "Why are so many JS tools being rewritten in Rust? Learn the basics of Rust and how to compile it to WebAssembly.",
        overview: "Blazing fast tooling and Wasm.",
        image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&q=80",
        creatorId: "admin",
        venue: "Virtual Event",
        location: "Online",
        date: "2026-08-30",
        time: "14:00",
        mode: "online",
        audience: "JavaScript Developers, Systems Programmers",
        agenda: ["Rust syntax for JS devs", "Ownership & Borrowing", "WebAssembly overview", "Building a Rust API"],
        organizer: "Rustaceans",
        tags: ["rust", "wasm", "webassembly", "performance"]
      },
      {
        title: "Mobile App Dev with React Native",
        description: "Bring your React skills to mobile. Learn how to build cross-platform iOS and Android apps with React Native and Expo.",
        overview: "Build mobile apps with web tech.",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
        creatorId: "admin",
        venue: "Startup Hub",
        location: "Berlin, Germany",
        date: "2026-11-20",
        time: "11:00",
        mode: "hybrid",
        audience: "Frontend Developers, Mobile Engineers",
        agenda: ["Expo Router", "Native Modules", "Animations with Reanimated", "App Store Deployment"],
        organizer: "Mobile React Alliance",
        tags: ["react-native", "mobile", "ios", "android"]
      },
      {
        title: "GraphQL APIs at Scale",
        description: "Learn how to design, build, and maintain large GraphQL federated schemas and ensure performant resolvers.",
        overview: "Advanced GraphQL architecture.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        creatorId: "admin",
        venue: "Virtual Event",
        location: "Online",
        date: "2026-09-25",
        time: "16:00",
        mode: "online",
        audience: "Backend Developers, API Designers",
        agenda: ["Schema Design Best Practices", "Apollo Federation", "Caching GraphQL", "Handling N+1 problems"],
        organizer: "API Architecture Group",
        tags: ["graphql", "api", "backend", "apollo"]
      }
    ];

    const processedEvents = events.map(event => ({
      ...event,
      slug: generateSlug(event.title),
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    const result = await eventsCollection.insertMany(processedEvents);
    console.log(`Successfully inserted ${result.insertedCount} events!`);
    
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await client.close();
  }
}

seed();
