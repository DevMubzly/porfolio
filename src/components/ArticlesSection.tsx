 'use client'

import { motion } from "motion/react"

type Article = {
  title: string;
  description: string;
  href?: string;
  tag: string;
  year: string;
};

const articles: Article[] = [
  {
    title: 'LLM systems that dont feel stitched on',
    description:
      'Notes on integrating LLMs into real products: routing latency budgets fallbacks and when to say no to AI.',
    href: 'https://github.com/DevMubzly',
    tag: 'AI engineering',
    year: '2025',
  },
  {
    title: Designing resilient frontends for fast backends,
    description:
      How I think about UI states skeletons optimistic updates and error surfaces when the backend really moves.,
    href: https://github.com/DevMubzly,
    tag: Frontend craft,
    year: 2024,
  },
  {
    title: Shipping student projects like production systems,
    description:
      What Ive learned from treating university and freelance work with the same standards as client work.,
    tag: Career journal,
    year: 2024,
  },
];

export function ArticlesSection() {
  return (
    <section className=relative max-w-6xl mx-auto px-6 pt-28 pb-32 min-h-dvh flex items-center>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className=space-y-10 w-full
      >
        <div className=flex items-end justify-between gap-6 flex-wrap>
          <div>
            <h2 className=text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight>
              Articles & thinking
            </h2>
            <p className=mt-3 max-w-xl text-sm sm:text-base text-neutral-600 leading-relaxed>
              A rotating selection of pieces about web engineering, AI integrations, and how I approach
              building products end-to-end.
            </p>
          </div>
          <p className=text-xs sm:text-sm font-mono text-neutral-500>
            <span className=text-neutral-400 aria-hidden>
              
            </span>{ }
            Writing helps me design clearer systems.
          </p>
        </div>

        <div className= grid gap-5 md:gap-6 md:grid-cols-3>
          {articles.map((article) => {
            const card = (
              <div className=h-full glass border-gradient rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-sm hover:shadow-lg hover-card-transition>
                <div className=space-y-3>
                  <div className=flex items-center justify-between gap-3 text-xs font-mono text-neutral-500>
                    <span className=uppercase tracking-[0.18em] text-neutral-600>{article.tag}</span>
                    <span>{article.year}</span>
                  </div>
                  <h3 className=text-base sm:text-lg font-semibold tracking-tight leading-snug text-neutral-900>
                    {article.title}
                  </h3>
                  <p className=text-sm text-neutral-600 leading-relaxed>
                    {article.description}
                  </p>
                </div>
                {article.href && (
                  <div className=pt-4>
                    <span className=inline-flex items-center text-xs font-medium tracking-wide text-neutral-800>
                      Read notes
                      <span className=ml-1></span>
                    </span>
                  </div>
                )}
              </div>
            );

            return article.href ? (
              <a
                key={article.title}
                href={article.href}
                target=_blank
                rel=noopener noreferrer
                className=block focus-ring
              >
                {card}
              </a>
            ) : (
              <div key={article.title}>{card}</div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
