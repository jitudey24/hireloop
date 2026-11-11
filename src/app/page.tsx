import { Briefcase, CircleDot, Search } from "lucide-react";

const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
] as const;

const stars = [
  { top: "14%", left: "9%", size: 2, color: "rgba(255, 255, 255, 0.25)" },
  { top: "24%", left: "81%", size: 2, color: "rgba(129, 140, 248, 0.45)" },
  { top: "32%", left: "18%", size: 3, color: "rgba(99, 102, 241, 0.5)" },
  { top: "38%", left: "91%", size: 2, color: "rgba(255, 255, 255, 0.22)" },
  { top: "45%", left: "47%", size: 2, color: "rgba(255, 255, 255, 0.15)" },
  { top: "52%", left: "5%", size: 2, color: "rgba(167, 139, 250, 0.4)" },
  { top: "57%", left: "53%", size: 2, color: "rgba(99, 102, 241, 0.4)" },
  { top: "61%", left: "27%", size: 2, color: "rgba(255, 255, 255, 0.25)" },
  { top: "64%", left: "74%", size: 3, color: "rgba(99, 102, 241, 0.5)" },
  { top: "68%", left: "12%", size: 3, color: "rgba(79, 109, 247, 0.6)" },
  { top: "48%", left: "66%", size: 2, color: "rgba(167, 139, 250, 0.45)" },
  { top: "62%", left: "90%", size: 2, color: "rgba(255, 255, 255, 0.28)" },
  { top: "66%", left: "35%", size: 2, color: "rgba(129, 140, 248, 0.5)" },
] as const;

export default function Home() {
  return (
    <main className="relative isolate flex flex-1 flex-col bg-black">
      {/* Background: globe rising from the bottom, soft top light and scattered stars.
          Fixed so its coordinates match viewport fractions exactly. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 overflow-hidden bg-black"
      >
        {/* Globe: box fitted so the sphere crest sits at ~86% height and the
            limb edges match the target at y828-900. No mask — the image's
            own soft alpha edge provides the aura hugging the limb. */}
        <div className="absolute left-[-13%] top-[-10.9%] h-[230.9%] w-[163.6%] bg-[url('/images/globe-clean.png')] bg-[length:100%_100%] bg-no-repeat" />
        {/* Background glows fitted to the target's median luminance profile:
            a broad top band, a bright upper-left core, a lower-left core, a
            right-edge core, and a faint bottom-left afterglow. */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_33%_at_50%_10%,rgba(255,255,255,0.13),transparent_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_32%_34%_at_20%_22%,rgba(255,255,255,0.135),transparent_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_24%_30%_at_9%_46%,rgba(255,255,255,0.075),transparent_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_28%_at_104%_10%,rgba(255,255,255,0.14),transparent_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_26%_22%_at_4%_72%,rgba(255,255,255,0.02),transparent_100%)]" />
        {stars.map((star) => (
          <span
            key={`${star.top}-${star.left}`}
            className="absolute rounded-full"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              background: star.color,
            }}
          />
        ))}
      </div>

      <div className="relative -left-[1.6%] z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-start px-4 pt-[5vh] pb-16 text-center">
        {/* Badge with side lines */}
        <div className="flex items-center gap-3">
          <span className="hidden h-px w-20 bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.3))] sm:block" />
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-gradient-to-b from-[#1a1a1a] to-black py-1 pl-4 pr-4">
            <span className="flex size-9 items-center justify-center rounded-lg bg-[#f97316]/15">
              <Briefcase aria-hidden className="size-5 text-[#f97316]" />
            </span>
            <span className="text-xl font-semibold text-white">50,000+</span>
            <span className="font-mono text-lg uppercase tracking-widest text-white/50">
              New jobs this month
            </span>
          </div>
          <span className="hidden h-px w-20 bg-[linear-gradient(to_left,transparent,rgba(255,255,255,0.3))] sm:block" />
        </div>

        {/* Heading */}
        <h1 className="mt-7 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Find Your Dream Job Today
        </h1>

        <p className="mt-2 max-w-md text-base leading-relaxed text-zinc-400 sm:text-xl sm:leading-[28px] lg:max-w-[48rem]">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Search bar */}
        <div
          role="search"
          className="mt-9 flex w-full max-w-xl items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] p-2 pl-4 shadow-2xl shadow-black/50 focus-within:border-white/20 focus-within:ring-2 focus-within:ring-[#6366f1]/40 lg:max-w-[51rem]"
        >
          <div className="flex min-w-0 flex-1 items-center gap-2.5">
            <Search aria-hidden className="size-4 shrink-0 text-white/50" />
            <label className="sr-only" htmlFor="job-search">
              Job title, skill or company
            </label>
            <input
              id="job-search"
              name="q"
              type="text"
              placeholder="Job title, skill or company"
              className="w-full min-w-0 bg-transparent text-base text-white placeholder:text-white/50 focus:outline-none"
            />
          </div>

          <span aria-hidden className="h-6 w-px shrink-0 bg-white/10" />

          <div className="flex min-w-0 flex-1 items-center gap-2.5 pl-1">
            <CircleDot aria-hidden className="size-4 shrink-0 text-white/50" />
            <label className="sr-only" htmlFor="location-search">
              Location or Remote
            </label>
            <input
              id="location-search"
              name="location"
              type="text"
              placeholder="Location or Remote"
              className="w-full min-w-0 bg-transparent text-base text-white placeholder:text-white/50 focus:outline-none"
            />
          </div>

          <button
            type="button"
            aria-label="Search jobs"
            className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#6366f1] text-white transition-colors hover:bg-[#5b6ef7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6366f1]"
          >
            <Search aria-hidden className="size-5" />
          </button>
        </div>

        {/* Trending positions */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
          <span className="mr-1 text-base text-white/50">Trending Position</span>
          {trendingPositions.map((position) => (
            <button
              key={position}
              type="button"
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-sm text-white/80 transition-colors hover:bg-white/[0.08] hover:text-white focus-visible:rounded-full focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#6366f1]/50 sm:text-[15px]"
            >
              {position}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
