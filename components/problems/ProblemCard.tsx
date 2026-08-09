"use client";

import { useState } from "react";

interface ProblemCardProps {
  title: string;
  description: string;
  severity: "HIGH" | "MEDIUM" | "LOW";
}

interface Investigation {
  cause: string;
  recommendation: string;
  impact: string;
}

const severityStyles = {
  HIGH: "bg-red-100 border-red-300 text-red-700",
  MEDIUM: "bg-orange-100 border-orange-300 text-orange-700",
  LOW: "bg-yellow-100 border-yellow-300 text-yellow-700",
};

export default function ProblemCard({ title, description, severity }: ProblemCardProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Investigation | null>(null);

  async function handleInvestigate() {
    setLoading(true);
    try {
      const res = await fetch("/api/investigate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`border rounded-lg p-4 ${severityStyles[severity]}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold">{title}</h3>
          <p className="text-sm">{description}</p>
        </div>
        <span className="text-xs font-semibold bg-white px-2 py-1 rounded">{severity}</span>
      </div>

      {!result && (
        <button
          onClick={handleInvestigate}
          disabled={loading}
          className="mt-3 bg-black text-white text-sm px-3 py-1.5 rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Investigating..." : "Investigate"}
        </button>
      )}

      {result && (
        <div className="mt-3 bg-white rounded p-3 text-sm text-gray-800 space-y-1">
          <p><strong>Cause:</strong> {result.cause}</p>
          <p><strong>Recommendation:</strong> {result.recommendation}</p>
          <p><strong>Impact:</strong> {result.impact}</p>
        </div>
      )}
    </div>
  );
}