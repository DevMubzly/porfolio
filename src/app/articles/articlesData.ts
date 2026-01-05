export type ArticleMeta = {
  slug: string;
  title: string;
  tag: string;
  year: string;
  description: string;
};

export const articles: ArticleMeta[] = [
  {
    slug: "mastering-tailwind-css",
    title: "Mastering Tailwind CSS for Real-World Design Systems",
    tag: "Tailwind CSS",
    year: "2024",
    description:
      "How I use Tailwind to ship fast without creating a mess: constraints, design tokens, and patterns that scale as projects grow.",
  },
  {
    slug: "learning-and-mastering-langchain",
    title: "Learning and Mastering LangChain",
    tag: "LangChain & LLMs",
    year: "2024",
    description:
      "A practical mental model for LangChain: chains, tools, memory, and how to avoid building fragile LLM spaghetti.",
  },
  {
    slug: "introduction-to-docker-orchestration",
    title: "Introduction to Docker Orchestration",
    tag: "DevOps & Docker",
    year: "2024",
    description:
      "From a single container to multi-service deployments: Compose, networks, volumes, and how I think about environments.",
  },
  {
    slug: "fundamentals-of-express-and-node",
    title: "Fundamentals of Express.js and Node",
    tag: "Backend basics",
    year: "2023",
    description:
      "The core Express patterns I actually use in production: routing, middleware, error handling, and project structure.",
  },
  {
    slug: "guide-to-hono-on-the-edge",
    title: "Guide to Hono.js on the Edge",
    tag: "Edge APIs & Hono",
    year: "2024",
    description:
      "Why I enjoy Hono for small but sharp APIs: edge runtimes, DX, and when I pick it over Express.",
  },
  {
    slug: "llm-systems-that-dont-feel-stitched-on",
    title: "LLM Systems That Don\'t Feel Stitched On",
    tag: "AI engineering",
    year: "2025",
    description:
      "Principles I follow to integrate LLMs into products so they feel native, reliable, and worth keeping.",
  },
  {
    slug: "designing-resilient-frontends-for-fast-backends",
    title: "Designing Resilient Frontends for Fast Backends",
    tag: "Frontend craft",
    year: "2024",
    description:
      "Thinking in states, not screens: skeletons, optimistic updates, and failure UIs that still feel calm.",
  },
  {
    slug: "shipping-student-projects-like-production-systems",
    title: "Shipping Student Projects Like Production Systems",
    tag: "Career journal",
    year: "2024",
    description:
      "How treating university and freelance work like real client projects changed my engineering mindset.",
  },
];

export function getArticleBySlug(slug: string): ArticleMeta | undefined {
  return articles.find((article) => article.slug === slug);
}
