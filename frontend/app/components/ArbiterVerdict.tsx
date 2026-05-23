"use client";

interface ArbiterVerdictProps {
  verdict: "APPROVE" | "OPPOSE" | "DEADLOCK" | null;
  reasoning: string | null;
  votes: {
    APPROVE: number;
    OPPOSE: number;
    NEUTRAL: number;
  } | null;
  isLoading: boolean;
}

const VERDICT_STYLES = {
  APPROVE: {
    color: "#44ff88",
    shadow: "0 0 12px #44ff8866",
  },
  OPPOSE: {
    color: "#ff4444",
    shadow: "0 0 12px #ff444466",
  },
  DEADLOCK: {
    color: "#ffaa33",
    shadow: "0 0 12px #ffaa3366",
  },
};

export default function ArbiterVerdict({
  verdict,
  reasoning,
  votes,
  isLoading,
}: ArbiterVerdictProps) {
  const styles = verdict ? VERDICT_STYLES[verdict] : null;

  return (
    <div
      style={{ width: "280px", minWidth: "280px" }}
      className="flex flex-col h-full border border-[#4a2000] bg-[#0a0500] font-mono
        [clip-path:polygon(0%_0%,calc(100%-10px)_0%,100%_10px,100%_100%,10px_100%,0%_calc(100%-10px))]"
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#4a2000]">
        <div className="text-[11px] tracking-[3px] text-[#cc8800]">NERV//ARBITER_TERMINAL</div>
      </div>

      {/* System info */}
      <div className="px-4 py-3 border-b border-[#4a2000] flex flex-col gap-2">
        <div className="text-[11px] tracking-[2px] text-[#aa6600]">
          STATUS: {isLoading ? "DELIBERATING" : verdict ? "VERDICT REACHED" : "STANDBY"}
        </div>
        <div className="text-[11px] tracking-[2px] text-[#aa6600]">PROTOCOL: DEBATE_V1</div>
        <div className="text-[11px] tracking-[2px] text-[#aa6600]">SUBSYSTEMS: 3/3 ONLINE</div>
      </div>

      {/* Verdict */}
      <div className="px-4 py-3 border-b border-[#4a2000]">
        <div className="text-[11px] tracking-[3px] text-[#cc8800] mb-3">
          ARBITER — FINAL VERDICT
        </div>
        {isLoading ? (
          <div className="flex items-center gap-2 text-[#cc8800] text-[12px] tracking-widest">
            <span>DELIBERATING</span>
            <span className="cursor-amber"> </span>
          </div>
        ) : verdict ? (
          <div
            className="text-[24px] font-bold tracking-[4px]"
            style={{ color: styles?.color, textShadow: styles?.shadow }}
          >
            {verdict}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-[#cc8800] text-[12px] tracking-widest">
            <span>AWAITING QUERY</span>
            <span className="cursor-amber"> </span>
          </div>
        )}
      </div>

      {/* Vote tally */}
      <div className="px-4 py-3 border-b border-[#4a2000] flex flex-col gap-2">
        <div className="text-[11px] tracking-[2px] text-[#cc8800] mb-1">VOTE TALLY</div>
        <div className="text-[12px] tracking-[2px] text-[#44ff88]">
          APPROVE: {votes ? votes.APPROVE : "—"}
        </div>
        <div className="text-[12px] tracking-[2px] text-[#ff4444]">
          OPPOSE: {votes ? votes.OPPOSE : "—"}
        </div>
        <div className="text-[12px] tracking-[2px] text-[#ffaa33]">
          NEUTRAL: {votes ? votes.NEUTRAL : "—"}
        </div>
      </div>

      {/* Reasoning — scrollable */}
      <div
        className="flex-1 px-4 py-3 overflow-y-auto"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="text-[11px] tracking-[2px] text-[#cc8800] mb-2">REASONING</div>
        {reasoning ? (
          <div className="text-[12px] text-[#ffaa44] leading-[1.8]">
            {reasoning}
          </div>
        ) : (
          <div className="text-[12px] text-[#885500] leading-[1.8]">
            &gt; NO ACTIVE SESSION<br />
            &gt; MAGI IDLE<br />
            &gt; SUBMIT QUERY TO BEGIN
          </div>
        )}
      </div>
    </div>
  );
}
