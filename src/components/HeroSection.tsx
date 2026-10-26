"use client";

import { motion, useReducedMotion } from "motion/react";
import { SocialIcons } from "./SocialIcons";
import { EatClock } from "./EatClock";
import { scrollToId } from "@/lib/scroll";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function GetInTouchButton() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      href="#contact"
      onClick={(e) => {
        e.preventDefault();
        scrollToId("contact");
      }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="group relative inline-flex shrink-0 overflow-hidden rounded-full p-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(140deg,var(--text-muted),transparent_40%,transparent_60%,var(--text-muted))]"
      />
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -inset-[100%] rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,var(--text-muted)_25deg,transparent_70deg)] opacity-70"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={reduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: "linear" }}
      />
      <span className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-linear-to-b from-[var(--text-secondary)] to-[var(--text-primary)] px-5 py-2.5 text-sm font-medium text-[var(--bg)]">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-[130%] skew-x-[-18deg] bg-[linear-gradient(90deg,transparent,var(--bg),transparent)] opacity-30 transition-transform duration-700 ease-out group-hover:translate-x-[130%]"
        />
        <span className="relative">Get in touch</span>
        <svg
          className="relative h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </motion.a>
  );
}

function AboutCards() {
  const card =
    "absolute inset-0 m-auto h-[250px] w-[180px] rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-1.5 sm:h-[320px] sm:w-[230px]";

  const cards = [
    { src: "/aboutme.jpg", alt: "Mubarak at work", rotate: -10, y: 10, offset: "translate-x-[-60px] md:translate-x-[-120px] lg:translate-x-[-234px]" },
    { src: "/aboutme3.png", alt: "Mubarak", rotate: -4, y: 4, offset: "translate-x-[-20px] md:translate-x-[-40px] lg:translate-x-[-78px]" },
    { src: "/aboutme2.png", alt: "Mubarak", rotate: 4, y: 4, offset: "translate-x-[20px] md:translate-x-[40px] lg:translate-x-[78px]" },
    { src: "/about%20me4.png", alt: "Mubarak", rotate: 10, y: 10, offset: "translate-x-[60px] md:translate-x-[120px] lg:translate-x-[234px]" },
  ];

  return (
    <div className="mt-16 flex justify-center">
      <div className="relative h-[300px] w-full max-w-[52rem] sm:h-[390px]">
        {cards.map((item) => (
          <motion.div
            key={item.src}
            initial={{ rotate: 0, y: 0 }}
            whileInView={{ rotate: item.rotate, y: item.y }}
            whileHover={{ rotate: 0, y: -14, scale: 1.04, zIndex: 30 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={`${card} ${item.offset}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.src} alt={item.alt} className="h-full w-full rounded-xl object-cover" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section id="home" className="min-h-screen px-6 lg:px-24">
      <div className="mx-auto h-80 max-w-[58rem] bg-[url('/profile.jpg')] bg-cover bg-center" />
      <div className="max-w-[52rem] mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="-mt-16 space-y-5">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-[var(--avatar-bg)] border-4 border-[var(--text-primary)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/avatar.svg" alt="Balinda Mubarak" className="w-full h-full" />
            </div>
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[var(--text-primary)]">
                  Hey, I&apos;m Balinda Mubarak
                </h1>
                <div className="flex flex-wrap items-center gap-3">
                  {/* <SocialIcons /> */}
                  <GetInTouchButton />
                </div>
              </div>
              {/* <p className="text-base sm:text-lg text-[var(--text-secondary)] font-light mt-1">
                Product Engineer
              </p> */}
              <p className="mt-8 max-w-2xl text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                I am a{" "}
                <span className="inline-block rounded-md bg-blue-500/10 px-2 py-0.5 text-blue-600">
                  software developer
                </span>{" "}
                from Uganda, aspiring founder, and professional overthinker of ideas that probably should&apos;ve stayed in my
                notes app.
              </p>
              <p className="mt-2 max-w-2xl text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                I write code, dream up products, explore rabbit holes, and occasionally convince myself that
                I&apos;ve found the next big thing.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-4 text-sm text-[var(--text-muted)]">
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              bmubs15@gmail.com
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Uganda
            </span>
            <EatClock />
          </motion.div>

          <div className="mt-16 lg:mt-24">
            <hr className="mb-16 lg:mb-24 border-[var(--border)]" />
            <motion.div variants={itemVariants} className="space-y-4">
              <p className="text-2xl font-medium tracking-tight capitalize text-[var(--text-primary)] sm:text-3xl">About me</p>
              <p className="text-base text-[var(--text-secondary)] font-light leading-relaxed">
                My journey into software started with a{" "}
                <span className="inline-block rounded-md bg-blue-500/10 px-1.5 py-0.5 text-blue-600">
                  Computer Science
                </span>{" "}
                degree and grew into something bigger. Working with web frameworks taught me how the pieces of a
                product fit together.
              </p>
              <p className="text-base text-[var(--text-secondary)] font-light leading-relaxed">
                But code was never the whole story. I became more interested in the ideas behind it: the problems
                worth solving, the people who use it, and what turns a technical solution into a useful product.
              </p>
              <p className="text-base text-[var(--text-secondary)] font-light leading-relaxed">
                Out of curiosity, I built{" "}
                <a
                  href="https://edgekeeper.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-md bg-blue-500/10 px-1.5 py-0.5 text-blue-600 hover:bg-blue-500/20 transition-colors"
                >
                  EdgeKeeper
                </a>{" "}
                to bring my idea to reality: a visual, n8n-style experience for building and backtesting trading
                algos. That path later led me to{" "}
                <a
                  href="https://salastores.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-md bg-blue-500/10 px-1.5 py-0.5 text-blue-600 hover:bg-blue-500/20 transition-colors"
                >
                  SalaStores
                </a>
                , simplifying workflows for Ugandan merchants. Both pushed me beyond implementation, into
                understanding the people and decisions behind a product.
              </p>
              <p className="text-base text-[var(--text-secondary)] font-light leading-relaxed">
                Outside the code, I&apos;m the kind of person who starts with one technical problem and ends up three
                hours into a different business idea. My notes app has seen more startup pitches than most investors.
              </p>
              <p className="text-base text-[var(--text-secondary)] font-light leading-relaxed">
                I&apos;m still early in the journey, and the exciting part isn&apos;t just knowing how to build
                software. It&apos;s discovering what can be built with it. Enough about me, go look at what I&apos;ve
                been building.
              </p>
            </motion.div>
            <AboutCards />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
