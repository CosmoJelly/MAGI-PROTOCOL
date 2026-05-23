"use client";

import { useState } from "react";
import MagiTriangle from "./components/MagiTriangle";
import ArbiterVerdict from "./components/ArbiterVerdict";
import QueryTerminal from "./components/QueryTerminal";

interface AgentResponse {
  agent: string;
  response: string;
  confidence: number | null;
  stance: "APPROVE" | "OPPOSE" | "NEUTRAL" | null;
}

interface DebateResult {
  query: string;
  responses: AgentResponse[];
  arbiter: {
    verdict: "APPROVE" | "OPPOSE" | "DEADLOCK" | null;
    reasoning: string | null;
    votes: {
      APPROVE: number;
      OPPOSE: number;
      NEUTRAL: number;
    };
  };
}

const EMPTY: AgentResponse = {
  agent: "",
  response: "",
  confidence: null,
  stance: null,
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DebateResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (message: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/debate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        }
      );
      if (!res.ok) throw new Error(`SERVER ERROR: ${res.status}`);
      const data: DebateResult = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "UNKNOWN ERROR");
    } finally {
      setIsLoading(false);
    }
  };

  const get = (name: string) =>
    result?.responses.find((r) => r.agent === name) ?? EMPTY;

  const balthasar = get("BALTHASAR-2");
  const casper    = get("CASPER-3");
  const melchior  = get("MELCHIOR-1");

  return (
    <div className="h-full flex flex-col overflow-hidden px-4 py-3 gap-3">

      {/* System label */}
      <div className="text-[10px] tracking-[5px] text-[#334455] font-mono text-center shrink-0">
        NERV CENTRAL DOGMA — MAGI SUPERCOMPUTER SYSTEM
      </div>

      {/* Three column layout */}
      <div className="flex-1 flex gap-4 min-h-0">

        {/* LEFT — Query Terminal */}
        <QueryTerminal
          onSubmit={handleSubmit}
          isLoading={isLoading}
          lastQuery={result?.query ?? null}
        />

        {/* CENTER — MAGI Triangle */}
        <div className="flex-1 flex items-center justify-center min-w-0 min-h-0">
          <MagiTriangle
            balthasar={{
              response: balthasar.response,
              confidence: balthasar.confidence,
              stance: balthasar.stance,
              isLoading,
            }}
            casper={{
              response: casper.response,
              confidence: casper.confidence,
              stance: casper.stance,
              isLoading,
            }}
            melchior={{
              response: melchior.response,
              confidence: melchior.confidence,
              stance: melchior.stance,
              isLoading,
            }}
          />
        </div>

        {/* RIGHT — Arbiter Terminal */}
        <ArbiterVerdict
          verdict={result?.arbiter.verdict ?? null}
          reasoning={result?.arbiter.reasoning ?? null}
          votes={result?.arbiter.votes ?? null}
          isLoading={isLoading}
        />

      </div>

      {/* Error */}
      {error && (
        <div className="shrink-0 font-mono text-[#ff4444] text-[11px] tracking-[2px]
          border border-[#ff4444] px-4 py-2
          [clip-path:polygon(10px_0%,100%_0%,100%_calc(100%-10px),calc(100%-10px)_100%,0%_100%,0%_10px)]">
          ERROR: {error}
        </div>
      )}

    </div>
  );
}
