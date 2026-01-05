"use client";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import React from "react";

interface Project {
  title: string;
  summary: string;
  description: string;
  longDescription?: string;
  stack: string[];
  status?: string;
  size: 'half' | 'full' | 'threeQuarter' | 'halfTall';
  links?: { label: string; href: string }[];
  image?: string; // relative path under /public
  projectURL?: string; // optional GitHub repository URL
}

const projects: Project[] = [
  {
    title: 'Telegram SME AI Assistant 🤖',
    summary: 'AI-powered Telegram assistant for small businesses: inventory management 📦, invoicing, receipts, and analytics.',
    description: 'A SaaS product that integrates with Telegram to help SMEs manage inventory 📦, automate invoicing 🧾, generate receipts 🧾, and provide reporting analysis 📊.',
    longDescription: 'This Telegram-based AI assistant empowers small businesses to efficiently manage their inventory 📦, automate invoicing 🧾 and receipts 🧾, and gain actionable insights 📊 through reporting analysis. Features include:\n\n• 📦 Inventory Management: Track stock levels, receive low-stock alerts, and manage product catalogs directly from Telegram.\n• 🧾 Invoicing & Receipts: Generate and send invoices/receipts to customers, with PDF export and payment tracking.\n• 📊 Reporting & Analytics: Visualize sales, expenses, and inventory trends with AI-driven insights and recommendations.\n• 🛡️ SaaS Platform: Multi-tenant architecture, secure data storage, and subscription management.\n• 🤝 Integration: Seamless Telegram bot interface for real-time business operations.\n\nOutcome: 🚀 Streamlined business operations, reduced manual workload, and improved decision-making for SMEs.',
    stack: ['Express.js', 'TypeScript', 'Supabase', 'Telegram Bot API', 'OpenAI'],
    status: 'Deployed',
    size: 'half',
    image: '/telegram bot.png',
    projectURL: 'https://t.me/taviflow_bot'
  },
  {
    title: 'Metro Fried Chicken (MFC) Ordering App 🍗',
    summary: 'Cross-platform mobile app for food ordering 🍔, menu browsing, cart 🛒, address management, order tracking, and more across 3 branches.',
    description: 'A React Native, Expo, and TypeScript-based mobile application for Metro Fried Chicken (by Chello), offering a seamless food ordering experience 🍗 with advanced features.',
    longDescription: 'The MFC Ordering App is a cross-platform mobile solution designed for Metro Fried Chicken customers. Key features include:\n\n• 📖 Menu Browsing: Explore menu categories and items with detailed descriptions.\n• 🛒 Shopping Cart: Add items to cart, select quantities, and checkout.\n• 🏠 Address Management: Add, edit, and delete delivery addresses.\n• 🚚 Order Tracking: Real-time order tracking and order history.\n• ⭐ User Reviews: Leave and edit reviews for menu items.\n• ❤️ Favorites: Mark and manage favorite menu items.\n• 🏢 Branch Selection: Choose restaurant branches with location detection.\n• 🔐 Authentication: Secure login via Google, phone number, and OTP verification.\n• 🔔 Notifications: In-app notifications for order updates.\n• 🆘 Customer Support: Built-in support and help system.\n• 👤 Profile Management: Edit user profile and preferences.\n\nOutcome: 🍽️ Enhanced customer experience, streamlined ordering, and robust feature set for Metro Fried Chicken for the branches of Mbarara, Nsambya and Mbuya.',
    stack: ['React Native', 'Expo', 'TypeScript', 'Zustand', 'AsyncStorage', 'Express.js'],
    status: 'Backend in progress',
    size: 'half',
    image: '/chicken.jpg',
    projectURL: 'https://github.com/DevMubzly/mfc-ordering-app'
  },
  {
  title: 'Fortress: Enterprise-Grade Open-Source LLM Platform',
  summary: 'Deploy, manage, and scale large language models (LLMs) securely within your own infrastructure, no sensitive data leaves your organization.',
  description: 'Fortress is the first open-source platform for enterprises to run LLMs on-premises or in sovereign cloud, ensuring data privacy, compliance, and control.',
  longDescription: `Fortress enables banks, telcos, and governments to adopt AI without sending data to external cloud APIs. Key features:\n
🔑 Authentication & Role Management – secure access for admins, developers, and analysts.\n
📦 Model Hub & Registry – manage, download, and version LLMs (Gemma, LLaMA, TinyLlama).\n
⚙️ Deployment Engine – run inference and fine-tuning jobs on local CPUs/GPUs or sovereign cloud.\n
📊 Usage Monitoring & Analytics – track tokens, costs, and project-specific usage.\n
🔐 Governance & Compliance – logging, quotas, and auditing for GDPR, HIPAA, and Uganda’s Data Protection Act.\n
🌐 Open APIs – integrate Fortress into apps, workflows, and enterprise systems.\n`,
  stack: [
    'FastAPI', 'SQLAlchemy', 'SQLite', 'Transformers', 'Docker', 'Prometheus', 'Grafana',
    'Next.js', 'Vercel'
  ],
  size: 'full',
  image: '/fortress.png', 
  projectURL: 'https://fortress-landing-page.vercel.app'
},
//   {
//     title: 'Edge Image Optimization Suite',
//     summary: 'Edge runtime transformations: AVIF/WebP multi-target, perceptual scoring & signed URL gating.',
//     description: 'Edge image pipeline with adaptive format + perceptual quality scoring.',
//     longDescription: 'Features:\n• Format negotiation via client hints → AVIF/WebP/JPEG ladder.\n• Transform graph: resize, saliency crop, blur hash, progressive streaming.\n• Quality scoring: Fast SSIM proxy guides adaptive compression.\n• Security: HMAC-signed param envelopes prevent abuse.\n• Caching: Layered memory/KV/CDN with deterministic variant keys.\n• Metrics: Edge latency p95, cold vs warm ratio, format distribution.',
//     stack: ['Next.js', 'Edge Runtime', 'Cloudflare', 'Sharp'],
//     size: 'half'
//   },
//   {
//     title: 'Multitenant SaaS Starter',
//     summary: 'Row-level security, tenant isolation, billing, event bus, workspace settings & audit trails.',
//     description: 'Hardened multitenant SaaS foundation with billing & audit.',
//     longDescription: 'Capabilities:\n• Data isolation via RLS policies & schema scoping.\n• Billing: Stripe subscription lifecycle + usage metering.\n• Event bus: Outbox → dispatcher with idempotent consumers.\n• Feature flags: Typed evaluation contexts & targeting.\n• Audit ledger: Append-only diff trail + export pipeline.\n• Security: Scoped API tokens with rotation & introspection.',
//     stack: ['Next.js', 'Postgres', 'Prisma', 'Stripe'],
//     size: 'half'
//   },
//   {
//     title: 'AI Support Orchestrator',
//     summary: 'Routing layer combining FAQ embeddings, tool invocation & fallback escalation with sentiment.',
//     description: 'AI triage engine orchestrating retrieval, tools & escalation heuristics.',
//     longDescription: 'Flow:\n• Ingestion into conversation state graph.\n• Routing: FAQ embedding match, tool schema invocation, or generative fallback.\n• Tool layer: JSON schema validated actions (order lookup, plan change).\n• Sentiment & risk classifiers trigger escalation or throttling.\n• Human handoff: Bundled transcript + rationale + confidence.\n• Analytics: Resolution time, deflection %, satisfaction proxy.',
//     stack: ['Next.js', 'OpenAI', 'Redis', 'tRPC'],
//     size: 'full'
//   }
];

// Distinct animation variant sets to cycle through for visual variety
const cardVariants = [
  {
    hidden: { opacity: 0, y: 56, scale: 0.97, rotateX: 8, rotateY: -6 },
    show:   { opacity: 1, y: 0,  scale: 1,    rotateX: 0,  rotateY: 0 }
  },
  {
    hidden: { opacity: 0, y: 50, scale: 0.985, rotateZ: -4, skewY: 2 },
    show:   { opacity: 1, y: 0,  scale: 1,    rotateZ: 0,  skewY: 0 }
  },
  {
    hidden: { opacity: 0, y: 62, scale: 0.975, rotateX: -7, rotateY: 7 },
    show:   { opacity: 1, y: 0,  scale: 1,    rotateX: 0,  rotateY: 0 }
  },
  {
    hidden: { opacity: 0, y: 52, scale: 0.985, rotateZ: 4, skewX: -3 },
    show:   { opacity: 1, y: 0,  scale: 1,    rotateZ: 0,  skewX: 0 }
  }
];

function spanClasses(size: Project['size']) {
  switch (size) {
    case 'full': return 'md:col-span-12';
    case 'threeQuarter': return 'md:col-span-9';
    case 'halfTall': return 'md:col-span-6 md:row-span-2';
    case 'half':
    default: return 'md:col-span-6';
  }
}

function cardMinHeight(size: Project['size']) {
  switch (size) {
    case 'full': return 'min-h-[300px]';
    case 'threeQuarter': return 'min-h-[300px]';
    case 'halfTall': return 'min-h-[460px]';
    case 'half': return 'min-h-[300px]';
  }
}

export function ProjectsSection() {
  const [active, setActive] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const closeTimer = useRef<number | null>(null);

  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setActive(null);
      return;
    }
    if (active && e.key === 'Tab') {
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )).filter(el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const current = document.activeElement as HTMLElement;
      if (e.shiftKey) {
        if (current === first || current === dialog) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (current === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  }, [active]);

  const closeModal = useCallback(() => setActive(null), []);

  const openProject = useCallback((p: Project) => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setActive(p);
  }, []);

  const scheduleClose = useCallback(() => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setActive(prev => (prev ? null : prev)), 180);
  }, []);

  useEffect(() => {
    if (active) {
      lastFocusRef.current = document.activeElement as HTMLElement;
      document.addEventListener('keydown', onKey);
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        (dialog.querySelector<HTMLElement>('button, a, [tabindex]:not([tabindex="-1"])') || dialog).focus();
      });
      return () => {
        document.removeEventListener('keydown', onKey);
        document.body.style.overflow = prev;
        lastFocusRef.current?.focus();
      };
    }
  }, [active, onKey]);


  return (
  <section className="relative max-w-6xl mx-auto px-6 pt-32 pb-40 min-h-dvh flex flex-col justify-center">
      <motion.div
  initial={{ opacity: 0, y: 60 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-12"
      >
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">Selected Projects</h2>
          <div className="text-xs sm:text-sm font-mono text-neutral-500"><span className="text-neutral-400" aria-hidden="true">▸</span> engineered for scale &amp; clarity</div>
        </div>
  <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[minmax(300px,_auto)] gap-6 md:gap-8 perspective-[1600px]">
          {projects.map((p, i) => {
            const span = spanClasses(p.size);
            const hClass = cardMinHeight(p.size);
            const even = i % 2 === 0;
            const variants = cardVariants[i % cardVariants.length];
            return (
              <motion.article
                key={p.title}
                variants={variants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                whileHover={{ y: -6, scale: 1.012, rotateX: 0, rotateY: 0, rotateZ: 0 }}
                whileTap={{ scale: 0.985 }}
                transition={{ type: 'spring', stiffness: 230, damping: 26, mass: 0.9, delay: (i % cardVariants.length) * 0.05 }}
                className={`group relative glass border-gradient rounded-2xl p-0 overflow-hidden flex flex-col shadow-sm hover:shadow-xl transition-all duration-700 will-change-transform transform-gpu [backface-visibility:hidden] [contain:paint] [transform-origin:center_60%] ${span} ${hClass}`}
              >
                <div className={`flex flex-col md:flex-row ${even ? '' : 'md:flex-row-reverse'} h-full`}>
                  <div className="relative w-full md:w-1/2 h-48 md:h-full overflow-hidden">
                    {p.image ? (
                      <motion.div className="absolute inset-0" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}>
                        <Image
                          src={p.image}
                          alt={p.title + ' preview'}
                          fill
                          sizes="(max-width:768px) 100vw, 50vw"
                          priority={i === 0}
                          className="object-cover object-center select-none"
                        />
                        <span className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.25),rgba(255,255,255,0)_60%)] mix-blend-overlay pointer-events-none" />
                      </motion.div>
                    ) : (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-neutral-200 via-neutral-300 to-neutral-100"
                        initial={{ scale: 1.15, rotate: -4, opacity: 0 }}
                        whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.9, ease: [0.22,1,0.36,1] }}
                      />
                    )}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.55),transparent_70%)]"
                      transition={{ duration: 0.9, ease: 'easeOut' }}
                      style={{ mixBlendMode: 'overlay' }}
                    />
                    <motion.div
                      aria-hidden
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
                      whileInView={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 1.15, ease: [0.65,0,0.35,1] }}
                      style={{ background: 'linear-gradient(115deg, rgba(255,255,255,0.38), rgba(255,255,255,0) 60%)', mixBlendMode: 'soft-light' }}
                    />
                    {p.status && (
                      <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-black/80 text-white backdrop-blur-sm shadow">{p.status}</span>
                    )}
                    <span className="absolute bottom-2 right-3 text-[10px] font-mono tracking-wider text-neutral-600/70 group-hover:text-neutral-800 transition-colors">IMG</span>
                  </div>
                  <div className="flex flex-col flex-1 p-5 md:p-6">
                    <div className="flex items-start justify-between gap-4 mb-3 md:mb-4">
                      <h3 className="text-base md:text-lg font-semibold tracking-tight leading-snug pr-4 break-words">{p.title}</h3>
                    </div>
                    <p className="text-[13px] md:text-sm text-neutral-600 leading-relaxed mb-6 flex-1 break-words">{p.summary}</p>
                    <div className="flex items-center justify-between gap-4 mt-auto w-full">
                      <motion.button
                        type="button"
                        onMouseEnter={() => openProject(p)}
                        onMouseLeave={scheduleClose}
                        onFocus={() => openProject(p)}
                        onBlur={scheduleClose}
                        initial="rest"
                        whileHover="hover"
                        whileFocus="hover"
                        animate="rest"
                        variants={{ rest: { }, hover: { } }}
                        className="group text-[11px] md:text-xs font-medium tracking-wide text-neutral-700 hover:text-black focus-ring relative cursor-pointer"
                        aria-haspopup="dialog"
                        aria-controls="project-dialog"
                      >
                        <span className="relative z-10">View Details</span>
                        <motion.span
                          aria-hidden
                          className="absolute left-0 -bottom-1 h-px bg-neutral-800/90 origin-left"
                          style={{ width: '100%' }}
                          initial={{ scaleX: 0 }}
                          variants={{ hover: { scaleX: 1 }, rest: { scaleX: 0 } }}
                          transition={{ duration: 0.5, ease: [0.22,1,0.36,1] }}
                        />
                        <motion.span
                          aria-hidden
                          className="pointer-events-none absolute inset-0 rounded-md bg-[radial-gradient(circle_at_50%_100%,rgba(0,0,0,0.10),transparent_70%)] opacity-0 group-hover:opacity-100"
                          initial={{ clipPath: 'inset(100% 0 0 0)', opacity: 0 }}
                          variants={{ hover: { clipPath: 'inset(0% 0 0 0)', opacity: 1 }, rest: { clipPath: 'inset(100% 0 0 0)', opacity: 0 } }}
                          transition={{ duration: 0.55, ease: [0.22,1,0.36,1] }}
                        />
                      </motion.button>
                      {p.projectURL && (
                        <a
                          href={p.projectURL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] md:text-xs font-medium tracking-wide text-neutral-600 hover:text-black focus-ring relative cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-neutral-800 after:transition-all hover:after:w-full"
                          aria-label={`View ${p.title} on GitHub`}
                        >
                          Project URL/Repo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <motion.div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.35),transparent_70%)]"
                  transition={{ duration: 0.8 }}
                />
                <motion.div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-white/10 via-transparent to-white/30 mix-blend-overlay"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                />
              </motion.article>
            );
          })}
        </div>
  {/* Connect button removed per request */}
      </motion.div>
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-start justify-center p-4 md:p-8 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" aria-hidden="true" />
            <motion.div
              role="dialog"
              id="project-dialog"
              aria-modal="true"
              aria-labelledby="project-dialog-title"
              aria-describedby="project-dialog-desc"
              initial={{ opacity: 0, y: 20, scale: 0.9, rotateX: 8, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 12, scale: 0.94, rotateX: 4, filter: 'blur(3px)' }}
              transition={{ type: 'spring', stiffness: 280, damping: 26, mass: 0.8 }}
              className="pointer-events-auto relative w-full max-w-4xl bg-white rounded-xl shadow-[0_8px_40px_-4px_rgba(0,0,0,0.25),0_0_0_1px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col focus:outline-none border border-neutral-200"
              ref={dialogRef}
              tabIndex={-1}
              onMouseEnter={() => { if (closeTimer.current) { window.clearTimeout(closeTimer.current); closeTimer.current = null; } }}
              onMouseLeave={scheduleClose}
            >
              <div className="absolute top-3 right-3 flex gap-2 z-10">
                <button
                  onClick={closeModal}
                  className="h-8 w-8 rounded-full bg-neutral-200 hover:bg-neutral-300 text-neutral-700 flex items-center justify-center text-sm font-semibold shadow focus-ring"
                >×</button>
              </div>
              <div className="relative w-full h-52 md:h-56 bg-gradient-to-br from-neutral-200 via-neutral-300 to-neutral-100 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.65),transparent_70%)]" />
                {active.image && (
                  <motion.img
                    src={active.image}
                    alt={active.title + ' detailed preview'}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.1, ease: [0.22,1,0.36,1] }}
                  />
                )}
                {active.status && (
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/80 text-white text-[10px] uppercase tracking-wider shadow">{active.status}</span>
                )}
                {!active.image && (
                  <span className="absolute bottom-3 right-4 text-[10px] font-mono tracking-wider text-neutral-600/80">IMAGE</span>
                )}
              </div>
              <div className="p-6 md:p-8 space-y-5 md:space-y-7 overflow-y-auto max-h-[64vh]">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 id="project-dialog-title" className="text-xl md:text-2xl font-semibold tracking-tight pr-6">{active.title}</h3>
                </div>
                <p id="project-dialog-desc" className="text-sm md:text-[15px] text-neutral-700 leading-relaxed whitespace-pre-line">{active.longDescription || active.description}</p>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">Stack</h4>
                  <ul className="flex flex-wrap gap-2">
                    {active.stack.map(s => (
                      <li key={s} className="px-2 py-1 rounded-md bg-neutral-200 text-[11px] font-medium tracking-wide text-neutral-800 shadow-inner">{s}</li>
                    ))}
                  </ul>
                </div>
                {active.links && active.links.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">Links</h4>
                    <ul className="flex flex-wrap gap-3 text-sm">
                      {active.links.map(l => (
                        <li key={l.href}>
                          <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-neutral-700 hover:text-black underline decoration-neutral-400/70 hover:decoration-neutral-800 transition-colors">{l.label}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="pt-2 flex justify-end">
                  <button onClick={closeModal} className="px-4 cursor-pointer py-2 rounded-lg bg-neutral-900 text-white text-xs font-medium tracking-wide hover:bg-black focus-ring transition-colors">Close</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
