import type { Metadata } from "next";
import Link from "next/link";
import { articles, getArticleBySlug } from "../articlesData";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article not found",
    };
  }

  return {
    title: `${article.title} | Dev Mubzly`,
    description: article.description,
  };
}

function ArticleBody({ slug }: { slug: string }) {
  switch (slug) {
    case "mastering-tailwind-css":
      return (
        <>
          <p className="mt-6 text-neutral-700 leading-relaxed">
            Tailwind CSS is often dismissed as &quot;just utility classes&quot;, but in real projects it becomes a
            powerful way to encode a design system directly into the codebase. The goal is not to memorize
            every class but to design a small, opinionated vocabulary that your future self and teammates can
            use consistently.
          </p>
          <h2 className="mt-10 text-xl font-semibold tracking-tight">Start with constraints, not colors</h2>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            Before touching JSX, I define spacing, typography, and color scales in Tailwind config. This gives
            me predictable primitives like <code>space-y-6</code>, <code>text-sm</code>, and
            <code>bg-neutral-100</code> instead of one-off values. When everything is composed from the same
            handful of tokens, pages feel cohesive even as they grow.
          </p>
          <h2 className="mt-8 text-xl font-semibold tracking-tight">Build layout primitives</h2>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            I try to avoid repeating the same complex class strings across the app. Instead, I create small
            layout primitives like &quot;card&quot;, &quot;pill button&quot;, or &quot;section shell&quot; using Tailwind utilities and
            extract them into components. This keeps the speed of utilities while still giving me semantic
            building blocks.
          </p>
          <h2 className="mt-8 text-xl font-semibold tracking-tight">Design for dark mode and theming early</h2>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            Tailwind makes theme variants cheap: <code>dark:bg-neutral-900</code>,
            <code>dark:text-neutral-100</code>, etc. Building both light and dark states from day one forces you
            to think in contrast ratios and keeps your palette honest. It also means flipping the entire site to
            dark mode later is not a refactor; it is just toggling a class on <code>&lt;html&gt;</code>.
          </p>
        </>
      );

    case "learning-and-mastering-langchain":
      return (
        <>
          <p className="mt-6 text-neutral-700 leading-relaxed">
            LangChain can feel overwhelming if you treat it as a framework you must fully adopt. I treat it as a
            toolbox: a set of helpers to wire together LLM calls, tools, and memory in a way that is
            testable and debuggable.
          </p>
          <h2 className="mt-10 text-xl font-semibold tracking-tight">Chains as explicit workflows</h2>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            I start by writing down the exact steps an ideal human expert would follow to answer a request.
            Then I encode those steps as a chain: retrieve context, call tools, format intermediate state, and
            only then call the model. This approach avoids the &quot;single giant prompt&quot; anti-pattern.
          </p>
          <h2 className="mt-8 text-xl font-semibold tracking-tight">Tools and guards</h2>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            Tools are where LangChain becomes interesting: database lookups, HTTP calls, calculators, custom
            business logic. I design tools with strict, typed inputs and clear error messages so I can log and
            monitor how often they fail. The LLM is then orchestrating reliable pieces instead of improvising
            everything.
          </p>
        </>
      );

    case "introduction-to-docker-orchestration":
      return (
        <>
          <p className="mt-6 text-neutral-700 leading-relaxed">
            Docker by itself is about packaging one process. Orchestration is about describing how multiple
            services run together: API, database, queues, dashboards, and supporting tools.
          </p>
          <h2 className="mt-10 text-xl font-semibold tracking-tight">From single container to Compose</h2>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            I usually start with a simple Dockerfile for the app. Once that is healthy, I introduce
            <code>docker-compose.yml</code> to describe the full stack: app, Postgres, Redis, and any sidecars.
            Networks and volumes are declared there, so local development becomes <code>docker compose up</code>
            instead of a README full of shell commands.
          </p>
          <h2 className="mt-8 text-xl font-semibold tracking-tight">Thinking in environments</h2>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            I try to make dev and production as similar as possible. That means using the same images and
            environment variables, with only a few overrides for scaling. Once that is true, most bugs I see in
            production have already appeared in a local or staging Docker environment first.
          </p>
        </>
      );

    case "fundamentals-of-express-and-node":
      return (
        <>
          <p className="mt-6 text-neutral-700 leading-relaxed">
            Express remains one of the cleanest ways to learn backend fundamentals. Every conceptrouting,
            middleware, error handlingis small and explicit.
          </p>
          <h2 className="mt-10 text-xl font-semibold tracking-tight">Requests, responses, and middleware</h2>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            I structure apps around three things: route handlers that stay small, middleware for cross-cutting
            concerns (auth, logging, parsing), and dedicated modules for business logic. This keeps controllers
            thin and makes it much easier to test logic without spinning up an entire HTTP server.
          </p>
          <h2 className="mt-8 text-xl font-semibold tracking-tight">Error handling as a first-class feature</h2>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            A single error-handling middleware at the bottom of the stack is where I normalize all errors into a
            consistent JSON shape. That handler logs internal details while returning safe user-facing messages.
            Once this exists, new routes simply <code>throw</code> errors when something goes wrong.
          </p>
        </>
      );

    case "guide-to-hono-on-the-edge":
      return (
        <>
          <p className="mt-6 text-neutral-700 leading-relaxed">
            Hono.js feels like Express re-imagined for the edge. It is tiny, fast, and designed for runtimes like
            Cloudflare Workers and Vercel Edge Functions, where startup time and per-request cost matter.
          </p>
          <h2 className="mt-10 text-xl font-semibold tracking-tight">Why Hono for small sharp APIs</h2>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            For APIs that need to be globally distributed and respond in a few milliseconds, the edge runtime is
            a good fit. Hono gives me expressive routing, middleware, and TypeScript support without pulling in a
            full Node.js dependency tree.
          </p>
          <h2 className="mt-8 text-xl font-semibold tracking-tight">Patterns I like</h2>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            I keep handlers small and pure, passing dependencies (like database clients) in via the context. This
            makes it straightforward to unit test handlers and to plug the same logic into other environments if
            needed.
          </p>
        </>
      );

    case "llm-systems-that-dont-feel-stitched-on":
      return (
        <>
          <p className="mt-6 text-neutral-700 leading-relaxed">
            The difference between a &quot;demo&quot; LLM feature and a real product is reliability. Users should not feel
            like they are talking to a random model bolted on at the last minute.
          </p>
          <h2 className="mt-10 text-xl font-semibold tracking-tight">Define where AI is allowed to fail</h2>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            I draw a clear line between flows that can tolerate creative failure (brainstorming, drafting) and
            flows that cannot (payments, permissions, critical data). For the latter, LLMs act as assistants to
            deterministic systems, not decision makers.
          </p>
          <h2 className="mt-8 text-xl font-semibold tracking-tight">Measure instead of guessing</h2>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            I log model inputs, outputs, and tool calls (with redaction) to build feedback loops. This makes it
            possible to debug bad answers and iterate on prompts, retrieval strategies, and guardrails with real
            data instead of intuition.
          </p>
        </>
      );

    case "designing-resilient-frontends-for-fast-backends":
      return (
        <>
          <p className="mt-6 text-neutral-700 leading-relaxed">
            When the backend is fast, the frontend has no excuse to feel slow. The UI should react immediately to
            user intent, even while requests are in flight.
          </p>
          <h2 className="mt-10 text-xl font-semibold tracking-tight">Think in states, not pages</h2>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            Every data fetch has at least four states: idle, loading, success, and error. I design for all of
            them explicitly using skeletons, optimistic UI, and clear retry affordances. This prevents the UI from
            ever feeling stuck or mysterious.
          </p>
          <h2 className="mt-8 text-xl font-semibold tracking-tight">Optimistic updates with guardrails</h2>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            I apply optimistic updates for actions that are easy to roll back: toggles, likes, small edits. A
            toast or inline message communicates if the server ultimately rejects the change, so the user is never
            surprised.
          </p>
        </>
      );

    case "shipping-student-projects-like-production-systems":
      return (
        <>
          <p className="mt-6 text-neutral-700 leading-relaxed">
            Treating student and personal projects like real products changed how I learn. It forces discipline:
            version control, documentation, testing, and deployment pipelines.
          </p>
          <h2 className="mt-10 text-xl font-semibold tracking-tight">Real constraints, real discipline</h2>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            I set fake but realistic constraints: small budgets, strict uptime requirements, and clear user
            personas. This pushes me to choose technologies and architectures that would also work for clients,
            not just for a demo.
          </p>
          <h2 className="mt-8 text-xl font-semibold tracking-tight">A portfolio that tells a story</h2>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            When each project has a README, deployment URL, and a short post-mortem, it stops being &quot;just a school
            assignment&quot; and becomes a case study. That is exactly what I want my portfolio to feel like.
          </p>
        </>
      );

    default:
      return (
        <p className="mt-6 text-neutral-700 leading-relaxed">
          This article is still being written. Check back soon.
        </p>
      );
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return (
      <main className="min-h-dvh flex items-center justify-center">
        <div className="text-center px-6">
          <p className="text-sm text-neutral-500 mb-4">Article not found.</p>
          <Link
            href="/#articles"
            className="inline-flex items-center gap-1 text-xs font-medium tracking-wide text-neutral-800 hover:text-black focus-ring"
          >
            <span>&larr;</span>
            <span>Back to articles</span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-dvh">
      <div className="max-w-3xl mx-auto px-6 pt-24 pb-16">
        <Link
          href="/#articles"
          className="inline-flex items-center gap-1 text-xs font-medium tracking-wide text-neutral-700 hover:text-black focus-ring rounded-full px-3 py-1 bg-white/70 glass mb-6"
        >
          <span>&larr;</span>
          <span>Back to all articles</span>
        </Link>

        <header className="space-y-3">
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">
            {article.tag}  b7 {article.year}
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-balance">
            {article.title}
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl">
            {article.description}
          </p>
        </header>

        <ArticleBody slug={article.slug} />
      </div>
    </main>
  );
}
