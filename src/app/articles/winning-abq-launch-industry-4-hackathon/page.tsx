import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function HackathonArticle() {
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

        <article>
          <header className="space-y-4 mb-12">
            <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
              <span className="font-medium">Hackathon</span>
              <span className="w-1 h-1 rounded-full bg-[var(--border)]"></span>
              <span>Feb 12, 2026</span>
              <span className="w-1 h-1 rounded-full bg-[var(--border)]"></span>
              <span>8 min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[var(--text-primary)]">
              How I Won the Industry 4.0+ Hackathon for the ABQ Launch
            </h1>
            <p className="text-base text-[var(--text-muted)] font-light leading-relaxed max-w-2xl">
              A deep dive into the engineering, rapid prototyping, and AI integration strategies that led me to become the overall winner of the Industry 4.0+ ABQ Launch hackathon.
            </p>
          </header>

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              When the Industry 4.0+ Hackathon was announced for the ABQ Launch, I knew the competition would be fierce. Teams from across the tech landscape were bringing ideas centered around IoT scaling, artificial intelligence, and smart logistics. I decided to participate as a solo engineer. My goal was simple: prove that a tightly integrated, full-stack AI system could outperform sprawling enterprise prototypes on efficiency and direct real-world utility.
            </p>

            <h2 className="text-xl font-light tracking-tight text-[var(--text-primary)] pt-6">The Problem Statement</h2>
            <p>
              The overarching theme of the hackathon was &quot;Modernizing Industrial Workflows.&quot; While many participants focused heavily on hardware, I noticed a major bottleneck that facilities ignored: human-AI synchronization in data pipelines. Manufacturers had machines emitting massive logs, but middle management still relied on fragile spreadsheets and sluggish reporting chains to interpret that data.
            </p>

            <h2 className="text-xl font-light tracking-tight text-[var(--text-primary)] pt-6">The Architecture</h2>
            <p>
              Over the 48-hour sprint, I built an end-to-end telemetry and orchestration layer. 
              Here was the technical stack I utilized:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Frontend:</strong> Next.js with a deeply optimized Tailwind CSS UI, delivering dashboard analytics with sub-second latencies.</li>
              <li><strong>Backend:</strong> A high-throughput FastAPI and Python layer acting as the backbone for heavy ingestion.</li>
              <li><strong>AI integration:</strong> LangChain coupled with an optimized LLM pipeline built to query internal facility databases securely using RAG (Retrieval-Augmented Generation).</li>
            </ul>

            <h2 className="text-xl font-light tracking-tight text-[var(--text-primary)] pt-6">Navigating the 48-Hour Crunch</h2>
            <p>
              Because I was flying solo, I couldn&apos;t afford to get bogged down in DevOps configurations. My prior experience containerizing with Docker completely saved me here, allowing me to spin up a PostgreSQL instance, a Redis cache, and the FastAPI application locally without hitting a single snag. 
            </p>
            <p>
              The hardest challenge was writing the heuristic that triggered the LLM. I didn&apos;t want the AI running blindly on every ping. Instead, I routed the data stream through a fast statistical anomaly detector. The LLM would only wake up, pull context, and generate a human-readable diagnosis if a true anomaly threshold was broken. This kept extreme API costs down and impressed the judges heavily regarding &quot;production realism.&quot;
            </p>

            <h2 className="text-xl font-light tracking-tight text-[var(--text-primary)] pt-6">The Pitch and the Win</h2>
            <p>
              During the final showcase at the ABQ Launch, my live demonstration triggered an intentional data-spike in the mocked pipeline. Within exactly 1.4 seconds, the dashboard lit up, and instead of showing a confusing error code (e.g., Error 0x8273), it showed a generated report: <em>&quot;Pressure values in Valve 4 have spiked by 40% outside historical bounds in the last 5 minutes. Recommended immediate shutoff to prevent line burst.&quot;</em>
            </p>
            <p>
              This was the specific moment that won the judges over. It bridged the gap between Industry 4.0 data generation and human actionability. 
            </p>

            <h2 className="text-xl font-light tracking-tight text-[var(--text-primary)] pt-6">Key Takeaways</h2>
            <p>
              Winning the overall prize at the ABQ Launch was an incredible validation of the hours I spend practicing and refining my tech stack. It proved to me that modern web technologies aren&apos;t just for SaaS dashboards; they are perfectly capable of handling industrial workloads when architected cleanly. 
            </p>
            <p>
              You can read the official university press release about our victory at the <a href="https://www.must.ac.ug/must-students-sweep-top-spots-at-the-national-industry-4-0-hackathon/" target="_blank" rel="noopener noreferrer" className="text-[var(--text-primary)] border-b border-[var(--text-primary)] pb-0.5 hover:text-[var(--text-muted)] hover:border-[var(--text-muted)] transition-colors inline-flex items-center gap-1">National Industry 4.0 Hackathon <span className="text-xs">↗</span></a>.
            </p>
          </div>
        </article>
      </div>
    </main>
  );
}
