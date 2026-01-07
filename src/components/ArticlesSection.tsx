"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { articles } from "@/app/articles/articlesData";

export function ArticlesSection() {
  return (
    <section className="relative max-w-4xl mx-auto px-4 pt-24 pb-32 min-h-dvh flex items-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-10 w-full"
      >
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
              Articles &amp; thinking
            </h2>
            <p className="mt-2 max-w-lg text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Deep dives into Tailwind, LangChain, Docker, Express, Hono, and LLM systems – how I use them
              end to end in real projects.
            </p>
          </div>
          <p className="text-xs sm:text-sm font-mono text-neutral-500">
            <span className="text-neutral-400" aria-hidden>
              ·
            </span>{" "}
            Writing helps me design clearer systems.
          </p>
        </div>

        <div className="grid gap-4 md:gap-5 md:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="block focus-ring"
            >
              <article className="h-full glass border-gradient rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-sm hover:shadow-lg hover-card-transition">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3 text-xs font-mono text-neutral-500">
                    <span className="uppercase tracking-[0.18em] text-neutral-600">{article.tag}</span>
                    <span>{article.year}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold tracking-tight leading-snug text-neutral-900">
                    {article.title}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {article.description}
                  </p>
                </div>
                <div className="pt-3">
                  <span className="inline-flex items-center text-xs font-medium tracking-wide text-neutral-800">
                    Read article
                    <span className="ml-1">→</span>
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
