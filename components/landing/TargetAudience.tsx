const personas = [
  {
    role: "Innovation Manager",
    pain: "Too many AI ideas, no clear starting point",
    gain: "A ranked list of realistic AI pilots specific to your function",
  },
  {
    role: "Digital Transformation Lead",
    pain: "Hard to convince leadership without structured evidence",
    gain: "A shareable report with risks, roadmap, and pilot rationale",
  },
  {
    role: "Operations Manager",
    pain: "Repetitive manual work slowing the team down",
    gain: "A recommended low-risk automation or copilot to pilot first",
  },
  {
    role: "R&D / Process Lead",
    pain: "Knowledge scattered across files, teams, and inboxes",
    gain: "AI use cases that address fragmentation and retrieval gaps",
  },
];

export default function TargetAudience() {
  return (
    <section className="bg-slate-50 px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-3xl font-bold text-slate-900">
          Built for pharma and biotech SMEs
        </h2>
        <p className="mt-4 text-center text-slate-600">
          ZestLearn is designed for the people responsible for evaluating and
          initiating AI in regulated or semi-regulated scientific companies.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {personas.map((p) => (
            <div key={p.role} className="rounded-xl bg-white p-6 shadow-sm border border-slate-100">
              <h3 className="font-semibold text-slate-900">{p.role}</h3>
              <p className="mt-2 text-sm text-slate-500">
                <span className="font-medium text-red-500">Pain: </span>
                {p.pain}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                <span className="font-medium text-green-600">Gain: </span>
                {p.gain}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
