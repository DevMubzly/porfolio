"use client";

import { motion } from "motion/react";
import { GitHubCalendar } from "react-github-calendar";

export function GitHubHeatmap() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="p-6 overflow-hidden"
    >
      <h3 className="text-sm font-medium text-[var(--text-primary)] mb-4">GitHub Contributions</h3>
      <GitHubCalendar
        username="DevMubzly"
        blockSize={13}
        blockMargin={3}
        fontSize={12}
        style={{ color: "var(--text-muted)", width: "100%", maxWidth: "100%" }}
        labels={{
          months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        }}
      />
    </motion.div>
  );
}
