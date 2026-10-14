export type Locale = "en" | "pt";

export const locales: Locale[] = ["en", "pt"];

type ExperienceEntry = {
  id: string;
  role: string;
  company: string;
  period: string;
  meta: string;
  bullets: string[];
  tags: string[];
};

export type Dictionary = {
  meta: { resume: string; resumeFile: string };
  sections: Record<SectionId, string>;
  commands: Record<SectionId, string>;
  hero: {
    role: string;
    lead: string;
    soft: string;
    availability: string;
    links: { email: string; linkedin: string; github: string; resume: string };
  };
  about: {
    paragraphs: string[];
    avatarAlt: string;
    facts: { key: string; value: string }[];
  };
  stack: { intro: string; groups: { label: string; items: string[] }[] };
  ai: {
    intro: string;
    items: { title: string; description: string }[];
    resultLabel: string;
    result: string;
  };
  experience: { entries: ExperienceEntry[] };
  projects: { status: string; body: string; more: string; follow: string; live: string; code: string };
  contact: {
    lead: string;
    rows: { key: string; value: string; href?: string }[];
  };
  footer: string;
  statusBar: { language: string; theme: string };
};

export type SectionId =
  | "intro"
  | "about"
  | "stack"
  | "ai"
  | "experience"
  | "projects"
  | "contact";

export const sectionIds: SectionId[] = [
  "intro",
  "about",
  "stack",
  "ai",
  "experience",
  "projects",
  "contact",
];

const links = {
  email: "mailto:restlucas.dev@gmail.com",
  linkedin: "https://www.linkedin.com/in/restlucas",
  github: "https://github.com/restlucas",
};

export const contactLinks = links;

const stackItems = {
  languages: ["TypeScript", "JavaScript", "HTML", "CSS", "PHP", "SQL"],
  frontend: [
    "React",
    "Next.js",
    "React Native (Expo)",
    "Vue.js",
    "Vite",
    "Tailwind CSS",
    "shadcn/ui",
    "Storybook",
  ],
  state: ["Redux Toolkit", "Zustand", "TanStack Query", "React Hook Form", "Zod"],
  testing: ["Vitest", "React Testing Library", "Playwright"],
  backend: ["REST", "GraphQL", "WebSockets", "Node.js", "Laravel", "Inertia.js", "PostgreSQL"],
  tooling: ["Git", "GitHub Actions", "Docker", "Vercel", "AWS S3", "Railway", "Sentry"],
  ai: ["Claude Code", "MCP", "Custom skills & workflows", "GitHub Copilot"],
};

const tags = {
  sgm: ["Next.js", "TypeScript", "TanStack Query", "Redux Toolkit", "Laravel", "AWS S3", "Claude Code"],
  freelance: ["React", "React Native", "Expo", "Vite", "Zod", "Inertia.js", "shadcn/ui"],
  sonda: ["Laravel", "React", "Vue.js", "TypeScript", "Scrum"],
  jsl: ["PHP", "React", "Semantic UI", "jQuery"],
  vert: ["React", "Joomla"],
};

const en: Dictionary = {
  meta: { resume: "resume", resumeFile: "/resume-en.pdf" },
  sections: {
    intro: "intro",
    about: "about",
    stack: "stack",
    ai: "ai workflow",
    experience: "experience",
    projects: "projects",
    contact: "contact",
  },
  commands: {
    intro: "./whoami",
    about: "cat about.md",
    stack: "ls ~/stack",
    ai: "claude --workflow",
    experience: "git log --career",
    projects: "ls ~/projects",
    contact: "./contact.sh",
  },
  hero: {
    role: "frontend developer",
    lead: "5 years building web applications with **React, Next.js and TypeScript**, from multi-tenant SaaS products to internal systems for logistics and the public sector.",
    soft: "I keep **Claude Code** at the core of my workflow, with MCP servers, custom skills and human review of every line.",
    availability: "**open to remote** roles and international relocation · based in Brazil (UTC-3)",
    links: { email: "email", linkedin: "linkedin", github: "github", resume: "resume" },
  },
  about: {
    paragraphs: [
      "I'm Lucas Souza de Oliveira, a frontend developer from Telêmaco Borba, Brazil. My path in software started in 2018, when I enrolled in Systems Analysis and Development at the Federal Institute of Paraná.",
      "Since then I've worked remotely for companies in the **United States** and **Chile**, building systems for Brazil's Federal Public Defender's Office, an in-house fleet monitoring platform for a logistics company, and multi-tenant SaaS products.",
      "I care about interfaces that are fast, accessible and easy to maintain, and about the architecture that keeps them that way.",
    ],
    avatarAlt: "Dithered portrait of Lucas",
    facts: [
      { key: "based", value: "Telêmaco Borba, Brazil · UTC-3" },
      { key: "education", value: "Associate Degree (Tecnólogo) in Systems Analysis and Development · IFPR · 2023" },
      { key: "languages", value: "Portuguese (native) · English (B2) · Spanish (A2)" },
    ],
  },
  stack: {
    intro: "Tools I use to ship production work.",
    groups: [
      { label: "languages", items: stackItems.languages },
      { label: "frontend", items: stackItems.frontend },
      { label: "state & forms", items: stackItems.state },
      { label: "testing", items: stackItems.testing },
      { label: "apis & backend", items: stackItems.backend },
      { label: "tooling & cloud", items: stackItems.tooling },
      { label: "ai", items: stackItems.ai },
    ],
  },
  ai: {
    intro: "AI is not a side tool for me. It is part of how I plan, build and review software.",
    items: [
      {
        title: "Claude Code at the core",
        description: "Integrated into the daily development workflow, from architecture decisions to delivery.",
      },
      {
        title: "MCP servers & custom skills",
        description: "Connected the agent to project tools and built reusable skills and workflows for recurring tasks.",
      },
      {
        title: "Human review, always",
        description: "Every generated line is reviewed, tested and owned by me before it ships.",
      },
    ],
    resultLabel: "result",
    result: "time to deliver a new screen: **about 2 days → a few hours**",
  },
  experience: {
    entries: [
      {
        id: "a7f3c21",
        role: "Mid-Level Frontend Developer",
        company: "Savage Global Marketing",
        period: "Apr 2025 – Oct 2026",
        meta: "remote · Florida, USA · marketing & consulting",
        bullets: [
          "Led the rebuild of the legacy management system as a **multi-tenant SaaS platform** built with Next.js and TypeScript.",
          "Integrated Claude Code into the development workflow with MCP servers, custom skills and workflows, cutting delivery time for a new screen from **about 2 days to a few hours**.",
          "Maintained and evolved the legacy system in production through refactoring, bug fixes and new features.",
          "Integrated Laravel REST APIs with TanStack Query and Redux Toolkit, including authentication and real-time WebSockets.",
          "Implemented file uploads and access permissions on Amazon S3, using Docker and Playwright end-to-end tests.",
        ],
        tags: tags.sgm,
      },
      {
        id: "5e09b8d",
        role: "Frontend Developer",
        company: "Freelance",
        period: "Mar 2025 – Nov 2025",
        meta: "remote · B2B product",
        bullets: [
          "Built and maintained the **web and mobile frontend** of a B2B product end to end with React, React Native (Expo) and Vite.",
          "Built forms and data layers with React Hook Form, Zod and TanStack Query, integrated with Laravel via Inertia.js.",
          "Contributed to architecture and UI/UX decisions, creating a **custom design system** with Tailwind CSS and shadcn/ui.",
          "Ensured accessibility and consistent UI behavior across devices and screen sizes.",
        ],
        tags: tags.freelance,
      },
      {
        id: "c41d6e0",
        role: "Software Developer II",
        company: "Sonda IT",
        period: "Jan 2023 – Jun 2024",
        meta: "remote · Santiago, Chile · IT services & systems integration",
        bullets: [
          "Built systems for **Brazil's Federal Public Defender's Office (DPU)** with Laravel, React, Vue.js and TypeScript in a Scrum team.",
        ],
        tags: tags.sonda,
      },
      {
        id: "9b2e47a",
        role: "Junior Full-Stack Developer",
        company: "JSL S.A.",
        period: "Aug 2021 – Jan 2023",
        meta: "Telêmaco Borba, Brazil · road logistics",
        bullets: [
          "Developed and maintained the company's **in-house logistics monitoring system**, tracking the truck fleet and materials in transit.",
          "Integrated data from external APIs into the monitoring system.",
        ],
        tags: tags.jsl,
      },
      {
        id: "1f8a3c5",
        role: "Junior Systems Analyst",
        company: "Vert IT",
        period: "Jun 2020 – Sep 2020",
        meta: "remote · Brasília, Brazil · IT services",
        bullets: [
          "Built React interfaces and maintained CMS platforms (Joomla), improving performance and usability.",
        ],
        tags: tags.vert,
      },
    ],
  },
  projects: {
    status: "building",
    body: "New **AI-powered projects** are being built right now. This section will be updated soon.",
    more: "more projects on the way",
    follow: "follow along on github",
    live: "live",
    code: "code",
  },
  contact: {
    lead: "Open to remote frontend roles and international relocation. Email is the fastest way to reach me.",
    rows: [
      { key: "email", value: "restlucas.dev@gmail.com", href: links.email },
      { key: "linkedin", value: "linkedin.com/in/restlucas", href: links.linkedin },
      { key: "github", value: "github.com/restlucas", href: links.github },
      { key: "based", value: "Telêmaco Borba, Brazil · UTC-3" },
    ],
  },
  footer: "lucas souza · built with next.js, typescript & tailwind css",
  statusBar: { language: "language", theme: "change accent color" },
};

const pt: Dictionary = {
  meta: { resume: "currículo", resumeFile: "/resume-pt.pdf" },
  sections: {
    intro: "início",
    about: "sobre",
    stack: "stack",
    ai: "fluxo com ia",
    experience: "experiência",
    projects: "projetos",
    contact: "contato",
  },
  commands: {
    intro: "./whoami",
    about: "cat sobre.md",
    stack: "ls ~/stack",
    ai: "claude --workflow",
    experience: "git log --carreira",
    projects: "ls ~/projetos",
    contact: "./contato.sh",
  },
  hero: {
    role: "desenvolvedor frontend",
    lead: "5 anos construindo aplicações web com **React, Next.js e TypeScript**, de produtos SaaS multi-tenant a sistemas internos para logística e setor público.",
    soft: "Uso o **Claude Code** no centro do meu fluxo de desenvolvimento, com MCP servers, skills customizadas e revisão humana de cada linha.",
    availability: "**disponível para trabalho remoto** · Brasil (UTC-3)",
    links: { email: "e-mail", linkedin: "linkedin", github: "github", resume: "currículo" },
  },
  about: {
    paragraphs: [
      "Sou Lucas Souza de Oliveira, desenvolvedor frontend de Telêmaco Borba, Paraná. Minha trajetória em software começou em 2018, quando entrei no curso de Análise e Desenvolvimento de Sistemas do Instituto Federal do Paraná.",
      "Desde então, trabalhei remotamente para empresas dos **Estados Unidos** e do **Chile**, desenvolvendo sistemas para a Defensoria Pública da União, uma plataforma interna de monitoramento de frota para uma empresa de logística e produtos SaaS multi-tenant.",
      "Me importo com interfaces rápidas, acessíveis e fáceis de manter, e com a arquitetura que as mantém assim.",
    ],
    avatarAlt: "Retrato pontilhado de Lucas",
    facts: [
      { key: "local", value: "Telêmaco Borba, Brasil · UTC-3" },
      { key: "formação", value: "Tecnólogo em Análise e Desenvolvimento de Sistemas · IFPR · 2023" },
      { key: "idiomas", value: "Português (nativo) · Inglês (B2) · Espanhol (A2)" },
    ],
  },
  stack: {
    intro: "Ferramentas que uso para entregar em produção.",
    groups: [
      { label: "linguagens", items: stackItems.languages },
      { label: "frontend", items: stackItems.frontend },
      { label: "estado & formulários", items: stackItems.state },
      { label: "testes", items: stackItems.testing },
      { label: "apis & backend", items: stackItems.backend },
      { label: "ferramentas & cloud", items: stackItems.tooling },
      { label: "ia", items: ["Claude Code", "MCP", "Skills & workflows customizados", "GitHub Copilot"] },
    ],
  },
  ai: {
    intro: "IA não é uma ferramenta paralela para mim. Ela faz parte de como eu planejo, construo e reviso software.",
    items: [
      {
        title: "Claude Code no centro",
        description: "Integrado ao fluxo de desenvolvimento do dia a dia, das decisões de arquitetura à entrega.",
      },
      {
        title: "MCP servers & skills customizadas",
        description: "Conectei o agente às ferramentas do projeto e criei skills e workflows reutilizáveis para tarefas recorrentes.",
      },
      {
        title: "Revisão humana, sempre",
        description: "Cada linha gerada é revisada, testada e assumida por mim antes de ir para produção.",
      },
    ],
    resultLabel: "resultado",
    result: "tempo de entrega de uma nova tela: **cerca de 2 dias → poucas horas**",
  },
  experience: {
    entries: [
      {
        id: "a7f3c21",
        role: "Desenvolvedor Frontend Pleno",
        company: "Savage Global Marketing",
        period: "Abr 2025 – Out 2026",
        meta: "remoto · Flórida, EUA · marketing e consultoria",
        bullets: [
          "Liderei a reconstrução do sistema de gestão legado como **plataforma SaaS multi-tenant**, com arquitetura em Next.js e TypeScript.",
          "Integrei o Claude Code ao fluxo de desenvolvimento com MCP servers, skills e workflows customizados, reduzindo o tempo de entrega de uma tela de **cerca de 2 dias para poucas horas**.",
          "Mantive e evoluí o sistema legado em produção, com refatorações, correções e novas funcionalidades.",
          "Integrei APIs REST em Laravel com TanStack Query e Redux Toolkit, com autenticação e tempo real via WebSockets.",
          "Implementei upload e permissões de arquivos na Amazon S3, com Docker e testes end-to-end em Playwright.",
        ],
        tags: tags.sgm,
      },
      {
        id: "5e09b8d",
        role: "Desenvolvedor Frontend",
        company: "Freelancer",
        period: "Mar 2025 – Nov 2025",
        meta: "remoto · produto B2B",
        bullets: [
          "Desenvolvi de ponta a ponta o **frontend web e mobile** de um produto B2B com React, React Native (Expo) e Vite.",
          "Construí formulários e dados com React Hook Form, Zod e TanStack Query, integrados a Laravel via Inertia.js.",
          "Participei das decisões de arquitetura e UI/UX, criando um **design system próprio** com Tailwind CSS e shadcn/ui.",
          "Garanti acessibilidade e comportamento consistente da interface em diferentes dispositivos e tamanhos de tela.",
        ],
        tags: tags.freelance,
      },
      {
        id: "c41d6e0",
        role: "Desenvolvedor de Software II",
        company: "Sonda IT",
        period: "Jan 2023 – Jun 2024",
        meta: "remoto · Santiago, Chile · serviços de TI e integração de sistemas",
        bullets: [
          "Desenvolvi sistemas para a **Defensoria Pública da União (DPU)** com Laravel, React, Vue.js e TypeScript, em time Scrum.",
        ],
        tags: tags.sonda,
      },
      {
        id: "9b2e47a",
        role: "Desenvolvedor Full-Stack Júnior",
        company: "JSL S/A",
        period: "Ago 2021 – Jan 2023",
        meta: "Telêmaco Borba, Brasil · logística e transporte rodoviário",
        bullets: [
          "Desenvolvi e mantive o **sistema interno de monitoramento logístico** da empresa, com acompanhamento da frota de caminhões e rastreamento de materiais.",
          "Integrei dados de APIs externas ao sistema de monitoramento.",
        ],
        tags: tags.jsl,
      },
      {
        id: "1f8a3c5",
        role: "Analista de Sistemas Júnior",
        company: "Vert IT",
        period: "Jun 2020 – Set 2020",
        meta: "remoto · Brasília, DF · serviços de TI",
        bullets: [
          "Desenvolvi interfaces com React e mantive plataformas CMS (Joomla), otimizando performance e usabilidade.",
        ],
        tags: tags.vert,
      },
    ],
  },
  projects: {
    status: "em construção",
    body: "Novos **projetos com IA** estão sendo construídos agora. Esta seção será atualizada em breve.",
    more: "mais projetos a caminho",
    follow: "acompanhe no github",
    live: "ver online",
    code: "código",
  },
  contact: {
    lead: "Disponível para vagas remotas de frontend. O jeito mais rápido de falar comigo é por e-mail.",
    rows: [
      { key: "e-mail", value: "restlucas.dev@gmail.com", href: links.email },
      { key: "linkedin", value: "linkedin.com/in/restlucas", href: links.linkedin },
      { key: "github", value: "github.com/restlucas", href: links.github },
      { key: "local", value: "Telêmaco Borba, Brasil · UTC-3" },
    ],
  },
  footer: "lucas souza · feito com next.js, typescript & tailwind css",
  statusBar: { language: "idioma", theme: "trocar cor de destaque" },
};

export const dictionaries: Record<Locale, Dictionary> = { en, pt };
