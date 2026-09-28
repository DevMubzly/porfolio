"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-16 lg:py-20 px-6 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-light text-[var(--text-primary)] max-w-3xl mx-auto leading-relaxed"
          >
            &ldquo;The best way to predict the future is to build it.&rdquo;
          </motion.blockquote>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-[var(--text-muted)] text-sm"
          >
            — Let&apos;s build something together
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="pt-4"
          >
            <motion.a
              href="mailto:bmubs15@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--text-primary)] text-[var(--bg)] text-sm font-medium hover:opacity-90 transition-opacity"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in touch
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
