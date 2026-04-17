"use client";

export function Footer() {
  return (
    <footer className="relative z-[6] py-12 px-6 lg:px-24 bg-white text-[#222222] rounded-t-[3rem] lg:rounded-t-[4rem] shadow-[0_-4px_24px_rgba(0,0,0,0.03)] -mt-8 lg:-mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-xs lg:text-sm text-[#7B7B7B] tracking-wider uppercase font-medium">
          © {new Date().getFullYear()} Balinda Mubarak
        </p>
        
        <div className="flex items-center gap-2 text-[#7B7B7B]">
          <span className="w-1.5 h-1.5 bg-[#222222] rounded-full"></span>
          <span className="text-xs uppercase tracking-widest font-medium">Available for work</span>
        </div>

        <a
          href="/cv.html"
          target="_blank"
          className="text-xs lg:text-sm text-[#222222] font-medium uppercase tracking-widest hover:text-[#7B7B7B] transition-colors border-b border-[#222222] pb-0.5 hover:border-[#7B7B7B]"
        >
          View CV
        </a>
      </div>
    </footer>
  );
}
