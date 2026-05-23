"use client";

import { useState } from "react";

interface QueryTerminalProps {
  onSubmit: (message: string) => void;
  isLoading: boolean;
  lastQuery: string | null;
}

export default function QueryTerminal({ onSubmit, isLoading, lastQuery }: QueryTerminalProps) {
  const [input, setInput] = useState("");
  const [log, setLog] = useState<string[]>([
    "SYSTEM BOOT COMPLETE",
    "MAGI LINK ESTABLISHED",
    "ALL SUBSYSTEMS ONLINE",
    "AWAITING QUERY INPUT...",
  ]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!input.trim() || isLoading) return;
      setLog(prev => [...prev, `> ${input.trim()}`, "PROCESSING..."]);
      onSubmit(input.trim());
      setInput("");
    }
  };

  return (
    <div
      style={{ width: "280px", minWidth: "280px" }}
      className="flex flex-col h-full border border-[#1a4a1a] bg-[#050a05] font-mono
        [clip-path:polygon(10px_0%,100%_0%,100%_calc(100%-10px),calc(100%-10px)_100%,0%_100%,0%_10px)]"
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#1a4a1a]">
        <div className="text-[11px] tracking-[3px] text-[#00cc33]">NERV//QUERY_TERMINAL</div>
      </div>

      {/* System info */}
      <div className="px-4 py-3 border-b border-[#1a4a1a] flex flex-col gap-2">
        <div className="text-[11px] tracking-[2px] text-[#00aa44]">SESSION: ACTIVE</div>
        <div className="text-[11px] tracking-[2px] text-[#00aa44]">OPERATOR: AUTHORIZED</div>
        <div className="text-[11px] tracking-[2px] text-[#00aa44]">CLEARANCE: LEVEL 4</div>
      </div>

      {/* Scrollable log */}
      <div
        className="flex-1 px-4 py-3 overflow-y-auto flex flex-col gap-1"
        style={{ scrollbarWidth: "none" }}
      >
        {log.map((line, i) => (
          <div key={i} className="text-[11px] text-[#00cc44] leading-[1.8]">
            &gt; {line}
          </div>
        ))}
        {lastQuery && (
          <div className="text-[11px] text-[#00ff66] leading-[1.8]">
            &gt; LAST: {lastQuery}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-[#1a4a1a]">
        <div className="text-[11px] tracking-[2px] text-[#00cc33] mb-2">QUERY INPUT</div>
        <div className="flex gap-2 items-center">
          <span className="text-[var(--nerv-green)] text-sm">❯</span>
          <span className="cursor"> </span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder={isLoading ? "PROCESSING..." : "Enter query..."}
            className="flex-1 bg-transparent border-none outline-none text-[var(--nerv-green)]
                       placeholder:text-[#1a6a1a] text-[12px] font-mono
                       disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
}
