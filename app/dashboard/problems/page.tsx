import ProblemCard from "@/components/problems/ProblemCard";
import { detectProblems } from "@/lib/detectProblems";

export default function ProblemsPage() {
  const problems = detectProblems();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-900">🚨 All Problems Detected</h2>
      <div className="flex flex-col gap-3">
        {problems.length === 0 ? (
          <p className="text-gray-500">No problems detected. Everything looks healthy! ✅</p>
        ) : (
          problems.map((problem) => (
            <ProblemCard
              key={problem.title}
              title={problem.title}
              severity={problem.severity}
              description={problem.description}
            />
          ))
        )}
      </div>
    </div>
  );
}