"use client";

import { motion } from "motion/react";
import { useEffect, useState, useRef } from "react";

interface DayData {
  date: string;
  count: number;
}

interface HeatmapChartProps {
  data: DayData[];
  gap?: number;
  layout?: "fluid" | "fixed";
  children: React.ReactNode;
}

interface HeatmapCellsProps {
  inactiveOpacity?: number;
  inactiveScale?: number;
}

interface HeatmapXAxisProps {}
interface HeatmapYAxisProps {}
interface HeatmapTooltipProps {
  instant?: boolean;
}
interface HeatmapLegendProps {
  align?: "left" | "center" | "right";
  gap?: number;
  inactiveOpacity?: number;
  inactiveScale?: number;
}

function getLevel(count: number): number {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

const levelColors = [
  "var(--bg-tertiary)",
  "#e4e4e7",
  "#d4d4d8",
  "#a1a1aa",
  "#71717a",
];

function HeatmapChart({ data, gap = 3, layout = "fluid", children }: HeatmapChartProps) {
  return (
    <div className="w-full">
      <div className="flex flex-col" style={{ gap }}>
        {children}
      </div>
    </div>
  );
}

function HeatmapCells({ inactiveOpacity = 1, inactiveScale = 1 }: HeatmapCellsProps) {
  return null;
}

function HeatmapXAxis() {
  return null;
}

function HeatmapYAxis() {
  return null;
}

function HeatmapTooltip({ instant = false }: HeatmapTooltipProps) {
  return null;
}

function HeatmapLegend({ align = "center", gap = 2 }: HeatmapLegendProps) {
  return (
    <div className={`flex items-center gap-${gap} ${align === "center" ? "justify-center" : align === "right" ? "justify-end" : "justify-start"}`}>
      <span className="text-[10px] text-[var(--text-muted)]">Less</span>
      {levelColors.map((color, i) => (
        <div
          key={i}
          className="w-2.5 h-2.5 rounded-[2px]"
          style={{ backgroundColor: color }}
        />
      ))}
      <span className="text-[10px] text-[var(--text-muted)]">More</span>
    </div>
  );
}

export function GitHubHeatmap() {
  const [data, setData] = useState<DayData[]>([]);
  const [loading, setLoading] = useState(true);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; date: string; count: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/github")
      .then((res) => res.json())
      .then((result) => {
        if (result.weeks) {
          const days: DayData[] = [];
          result.weeks.forEach((week: { contributionDays: Array<{ date: string; contributionCount: number }> }) => {
            week.contributionDays.forEach((day) => {
              days.push({ date: day.date, count: day.contributionCount });
            });
          });
          setData(days);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-6 overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="h-3.5 w-32 bg-[var(--bg-tertiary)] rounded animate-pulse" />
          <div className="h-2.5 w-16 bg-[var(--bg-tertiary)] rounded animate-pulse" />
        </div>
        <div className="h-32 bg-[var(--bg-tertiary)] rounded animate-pulse" />
      </div>
    );
  }

  if (!data.length) return null;

  const weeks: DayData[][] = [];
  let currentWeek: DayData[] = [];
  data.forEach((day, i) => {
    const dayOfWeek = new Date(day.date).getDay();
    if (dayOfWeek === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(day);
    if (i === data.length - 1) weeks.push(currentWeek);
  });

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const totalContributions = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] overflow-hidden"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-[var(--text-primary)]">GitHub Contributions</h3>
        <a
          href="https://github.com/DevMubzly"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors link-underline"
        >
          @DevMubzly
        </a>
      </div>

      <div className="overflow-x-auto">
        <div className="flex gap-1 mb-1">
          {months.map((month, i) => (
            <span key={i} className="text-[11px] text-[var(--text-muted)] flex-1 text-center">
              {month.slice(0, 3)}
            </span>
          ))}
        </div>
        <div className="flex gap-1">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1 flex-1">
              {week.map((day, di) => (
                <div
                  key={di}
                  className="w-full aspect-square rounded-sm cursor-pointer transition-transform hover:scale-110"
                  style={{ backgroundColor: levelColors[getLevel(day.count)] }}
                  onMouseEnter={(e) => {
                    const rect = (e.target as HTMLElement).getBoundingClientRect();
                    setTooltip({ x: rect.left, y: rect.top, date: day.date, count: day.count });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className="text-xs text-[var(--text-muted)]">{totalContributions} contributions in the last year</span>
        <HeatmapLegend align="center" gap={3} />
      </div>

      {tooltip && (
        <div
          className="fixed z-50 px-2 py-1 rounded-md bg-[var(--text-primary)] text-[var(--bg)] text-[10px] pointer-events-none"
          style={{ left: tooltip.x, top: tooltip.y - 30 }}
        >
          {tooltip.count} contributions on {tooltip.date}
        </div>
      )}
    </motion.div>
  );
}
