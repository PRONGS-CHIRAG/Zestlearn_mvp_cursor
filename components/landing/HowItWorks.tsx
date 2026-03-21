const steps = [
  {
    number: "01",
    title: "Tell us about your team and bottleneck",
    description:
      "Complete a short assessment covering your company, role, pain points, and AI maturity.",
  },
  {
    number: "02",
    title: "Upload internal context",
    description:
      "Share relevant documents — SOPs, meeting notes, process descriptions — so recommendations are grounded in your reality.",
  },
  {
    number: "03",
    title: "Chat with the AI consultant",
    description:
      "Ask practical questions. Explore use cases, feasibility, and risks with an advisor that knows your context.",
  },
  {
    number: "04",
    title: "Get a practical AI opportunity report",
    description:
      "Receive a structured report with recommended use cases, your best first pilot, risks, and a 30/60/90 roadmap.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-3xl font-bold text-slate-900">
          How it works
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {steps.map((step) => (
            <div key={step.number} className="rounded-xl border border-slate-100 bg-slate-50 p-6 shadow-sm">
              <span className="text-sm font-bold text-indigo-500">{step.number}</span>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
