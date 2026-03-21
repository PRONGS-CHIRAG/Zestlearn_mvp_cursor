import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-24 text-white">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-5xl font-bold leading-tight tracking-tight">
          Find the best AI pilot for your pharma or biotech team.
        </h1>
        <p className="mt-6 text-xl text-slate-300">
          ZestLearn analyzes your business context, documents, and pain points
          to recommend practical AI use cases, flag risks, and generate a
          roadmap you can act on.
        </p>
        <div className="mt-10">
          <Link
            href="/assessment"
            className="inline-block rounded-xl bg-indigo-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-indigo-600"
          >
            Start Your AI Assessment
          </Link>
        </div>
      </div>
    </section>
  );
}
