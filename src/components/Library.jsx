import React from "react";
import scrl1Img from "../media/Scroll-1.avif";
import scrl2Img from "../media/Scroll-2.avif";
import scrl3Img from "../media/Scroll-3.avif";
import scrl4Img from "../media/Scroll-4.avif";

const cards = [
  {
    id: "feature",
    title: "Adaline is now generally available. Giving $1MM in API credits.",
    excerpt:
      "After nearly a year of building with some incredible customers and over 100K developers, Adaline is now open to everyone for iteration, evaluation, deployment, and monitor with even more coming soon.",
    image: scrl1Img,
    tag: "PRODUCT",
    span: "feature",
  },
  {
    id: 1,
    title: "Reforge Reduces AI Deployment from 1 Month to 1 Week Using Adaline",
    excerpt: "",
    image: scrl2Img,
    tag: "CASE-STUDIES",
  },
  {
    id: 2,
    title: "LLM as Judges: Advances in Fine-tuning Models for AI Evaluation",
    excerpt: "",
    image: scrl3Img,
    tag: "RESEARCH",
  },
  {
    id: 3,
    title:
      "What is the ARC AGI Benchmark and its significance in evaluating LLM capabilities in 2025",
    excerpt: "",
    image: scrl4Img,
    tag: "RESEARCH",
  },
  {
    id: 4,
    title: "Understanding Prompt Injection Attacks and How to Mitigate Them",
    excerpt: "",
    image: scrl2Img,
    tag: "TIPS",
  },
];

function SmallCard({ c }) {
  return (
    <article className="border border-dashed border-[#0a1d08]/20 rounded-sm overflow-hidden bg-[#fdfdf6]">
      <div className="w-full" style={{ aspectRatio: "16 / 9" }}>
        <img
          src={c.image}
          alt={c.title}
          className="w-full h-full object-cover hover:scale-110 transition-all duration-700"
        />
      </div>
      <div className="p-4">
        <div className="atlas-web-mono text-[11px] tracking-[0.25em] text-[#0a1d08]/60">
          {c.tag}
        </div>
        <h3 className="mt-2 text-[clamp(1rem,1.6vw,1.1rem)] leading-snug text-[#0a1d08]">
          {c.title}
        </h3>
      </div>
    </article>
  );
}

export default function Library() {
  const feature = cards[0];
  const rest = cards.slice(1);
  return (
    <section className="bg-[#fdfdf6] text-[#0a1d08] py-16 sm:py-20">
      <div className="max-w-11/12 mx-auto px-6">
        {/* Header row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <h2 className="text-[clamp(2.2rem,7vw,3.75rem)] font-semibold leading-[1.05]">
            Library
          </h2>
          <p className="text-[#0a1d08]/70 text-[clamp(0.95rem,1.6vw,1.125rem)]">
            Find the knowledge to refine your AI-powered applications and unlock
            new possibilities across case studies, applied research, cookbooks,
            expert insights, practical guides, and more.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Feature card */}
          <article className="lg:col-span-7 border border-dashed border-[#0a1d08]/20 rounded-sm overflow-hidden bg-[#fdfdf6]">
            <div className="w-full" style={{ aspectRatio: "16 / 9" }}>
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-full object-cover hover:scale-110 transition-all duration-700"
              />
            </div>
            <div className="p-6 sm:p-8">
              <div className="atlas-web-mono text-[11px] tracking-[0.25em] text-[#0a1d08]/60">
                {feature.tag}
              </div>
              <h3 className="mt-2 text-[clamp(1.3rem,2.2vw,1.8rem)] font-medium">
                {feature.title}
              </h3>
              <p className="mt-3 text-[#0a1d08]/70 text-[clamp(0.95rem,1.3vw,1.05rem)]">
                {feature.excerpt}
              </p>
            </div>
          </article>

          {/* Right rail: 2 x 2 of small cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {rest.map((c) => (
              <SmallCard key={c.id} c={c} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
