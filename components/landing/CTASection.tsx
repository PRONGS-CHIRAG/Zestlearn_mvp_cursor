import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-indigo-600 px-4 py-20 text-white">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold">
          Turn your business bottleneck into an AI roadmap
        </h2>
        <p className="mt-4 text-indigo-200">
          No generic chatbot. A context-aware AI consultant that understands
          your company and recommends the right first pilot.
        </p>
        <div className="mt-8">
          <Link
            href="/assessment"
            className="inline-block rounded-xl bg-white px-8 py-4 text-lg font-semibold text-indigo-600 shadow-lg transition hover:bg-indigo-50"
          >
            Start Your AI Assessment
          </Link>
        </div>
      </div>
    </section>
  );
}
