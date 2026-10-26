"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { articles } from "@/app/articles/articlesData";
import { ArrowUpRight } from "lucide-react";

export function ArticlesSection() {
  return (
    <section id="articles" className="px-6 lg:px-24">
      <div className="max-w-[52rem] mx-auto">
        <hr className="my-16 lg:my-24 border-[var(--border)]" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h2 className="text-2xl font-medium tracking-tight capitalize text-[var(--text-primary)] sm:text-3xl">
            Insights &amp; Writing
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {articles.map((article, index) => {
              const featured = index === 0 || article.tag === "Career journal";
              return (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={featured ? "sm:col-span-2" : ""}
              >
                <Link
                  href={`/articles/${article.slug}`}
                  className="group flex h-full flex-col rounded-2xl bg-[var(--bg-secondary)] p-6 transition-colors hover:bg-[var(--bg-tertiary)]"
                >
                  <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                    <span className="font-medium text-[var(--text-secondary)]">{article.tag}</span>
                    <span className="w-1 h-1 rounded-full bg-[var(--border-strong)]" />
                    <span>{article.date}</span>
                  </div>

                  <h3
                    className={`mt-3 font-medium text-[var(--text-primary)] group-hover:text-[var(--text-secondary)] transition-colors ${
                      featured ? "text-xl sm:text-2xl" : "text-lg"
                    }`}
                  >
                    {article.title}
                  </h3>

                  <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                    {article.description}
                  </p>

                  <div className="mt-auto pt-6 flex items-center justify-between">
                    <span className="text-xs text-[var(--text-muted)]">{article.readTime}</span>
                    <span className="w-8 h-8 flex items-center justify-center text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform duration-300" />
                    </span>
                  </div>
                </Link>
              </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
