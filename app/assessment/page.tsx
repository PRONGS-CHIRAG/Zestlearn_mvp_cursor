import AssessmentForm from "@/components/assessment/AssessmentForm";

export default function AssessmentPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Start Your AI Assessment
          </h1>
          <p className="mt-2 text-slate-600">
            Tell us about your team and business context so we can generate
            practical AI recommendations for you.
          </p>
        </div>
        <AssessmentForm />
      </div>
    </main>
  );
}
