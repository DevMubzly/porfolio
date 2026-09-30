import type { Metadata } from "next";
import Link from "next/link";
import { articles, getArticleBySlug } from "../articlesData";
import { ArrowLeft } from "lucide-react";

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
    title: `${article.title} | Balinda Mubarak`,
    description: article.description,
  };
}

function ArticleBody({ slug }: { slug: string }) {
  switch (slug) {
    case "learning-and-mastering-langchain":
      return (
        <>
          <p className="mt-6 text-[var(--text-secondary)] leading-relaxed">
            LangChain can feel overwhelming if you treat it as a framework you must fully adopt. I treat it as a
            toolbox: a set of helpers to wire together LLM calls, tools, and memory in a way that is
            testable and debuggable.
          </p>
          <h2 className="mt-10 text-xl font-light tracking-tight text-[var(--text-primary)]">Chains as explicit workflows</h2>
          <p className="mt-3 text-[var(--text-secondary)] leading-relaxed">
            I start by writing down the exact steps an ideal human expert would follow to answer a request.
            Then I encode those steps as a chain: retrieve context, call tools, format intermediate state, and
            only then call the model. This approach avoids the &quot;single giant prompt&quot; anti-pattern.
          </p>
          <h2 className="mt-8 text-xl font-light tracking-tight text-[var(--text-primary)]">Tools and guards</h2>
          <p className="mt-3 text-[var(--text-secondary)] leading-relaxed">
            Tools are where LangChain becomes interesting: database lookups, HTTP calls, calculators, custom
            business logic. I design tools with strict, typed inputs and clear error messages so I can log and
            monitor how often they fail. The LLM is then orchestrating reliable pieces instead of improvising
            everything.
          </p>
        </>
      );

    case "llm-systems-that-dont-feel-stitched-on":
      return (
        <>
          <p className="mt-6 text-[var(--text-secondary)] leading-relaxed">
            The difference between a &quot;demo&quot; LLM feature and a real product is reliability. Users should not feel
            like they are talking to a random model bolted on at the last minute.
          </p>
          <h2 className="mt-10 text-xl font-light tracking-tight text-[var(--text-primary)]">Define where AI is allowed to fail</h2>
          <p className="mt-3 text-[var(--text-secondary)] leading-relaxed">
            I draw a clear line between flows that can tolerate creative failure (brainstorming, drafting) and
            flows that cannot (payments, permissions, critical data). For the latter, LLMs act as assistants to
            deterministic systems, not decision makers.
          </p>
          <h2 className="mt-8 text-xl font-light tracking-tight text-[var(--text-primary)]">Measure instead of guessing</h2>
          <p className="mt-3 text-[var(--text-secondary)] leading-relaxed">
            I log model inputs, outputs, and tool calls (with redaction) to build feedback loops. This makes it
            possible to debug bad answers and iterate on prompts, retrieval strategies, and guardrails with real
            data instead of intuition.
          </p>
        </>
      );

    case "designing-resilient-frontends-for-fast-backends":
      return (
        <>
          <p className="mt-6 text-[var(--text-secondary)] leading-relaxed">
            When the backend is fast, the frontend has no excuse to feel slow. The UI should react immediately to
            user intent, even while requests are in flight.
          </p>
          <h2 className="mt-10 text-xl font-light tracking-tight text-[var(--text-primary)]">Think in states, not pages</h2>
          <p className="mt-3 text-[var(--text-secondary)] leading-relaxed">
            Every data fetch has at least four states: idle, loading, success, and error. I design for all of
            them explicitly using skeletons, optimistic UI, and clear retry affordances. This prevents the UI from
            ever feeling stuck or mysterious.
          </p>
          <h2 className="mt-8 text-xl font-light tracking-tight text-[var(--text-primary)]">Optimistic updates with guardrails</h2>
          <p className="mt-3 text-[var(--text-secondary)] leading-relaxed">
            I apply optimistic updates for actions that are easy to roll back: toggles, likes, small edits. A
            toast or inline message communicates if the server ultimately rejects the change, so the user is never
            surprised.
          </p>
        </>
      );

    case "shipping-student-projects-like-production-systems":
      return (
        <>
          <p className="mt-6 text-[var(--text-secondary)] leading-relaxed">
            Treating student and personal projects like real products changed how I learn. It forces discipline:
            version control, documentation, testing, and deployment pipelines.
          </p>
          <h2 className="mt-10 text-xl font-light tracking-tight text-[var(--text-primary)]">Real constraints, real discipline</h2>
          <p className="mt-3 text-[var(--text-secondary)] leading-relaxed">
            I set fake but realistic constraints: small budgets, strict uptime requirements, and clear user
            personas. This pushes me to choose technologies and architectures that would also work for clients,
            not just for a demo.
          </p>
          <h2 className="mt-8 text-xl font-light tracking-tight text-[var(--text-primary)]">A portfolio that tells a story</h2>
          <p className="mt-3 text-[var(--text-secondary)] leading-relaxed">
            When each project has a README, deployment URL, and a short post-mortem, it stops being &quot;just a school
            assignment&quot; and becomes a case study. That is exactly what I want my portfolio to feel like.
          </p>
        </>
      );

    default:
      return (
        <p className="mt-6 text-[var(--text-secondary)] leading-relaxed">
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
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center px-6">
          <p className="text-sm text-[var(--text-muted)] mb-4">Article not found.</p>
          <Link
            href="/#articles"
            className="inline-flex items-center gap-1 text-xs font-medium text-[var(--text-primary)] hover:text-[var(--text-muted)] transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Back to articles</span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-28 pb-16 px-6 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/#articles"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to articles
        </Link>

        <header className="space-y-4 mb-12">
          <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
            <span className="font-medium">{article.tag}</span>
            <span className="w-1 h-1 rounded-full bg-[var(--border)]"></span>
            <span>{article.date}</span>
            <span className="w-1 h-1 rounded-full bg-[var(--border)]"></span>
            <span>{article.readTime}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[var(--text-primary)]">
            {article.title}
          </h1>
          <p className="text-base text-[var(--text-muted)] font-light leading-relaxed max-w-2xl">
            {article.description}
          </p>
        </header>

        <ArticleBody slug={article.slug} />
      </div>
    </main>
  );
}
