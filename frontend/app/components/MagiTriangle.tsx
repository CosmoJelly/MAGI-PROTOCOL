"use client";

import { useEffect, useState } from "react";

interface AgentData {
  response: string;
  confidence: number | null;
  stance: "APPROVE" | "OPPOSE" | "NEUTRAL" | null;
  isLoading: boolean;
}

interface MagiTriangleProps {
  balthasar: AgentData;
  casper: AgentData;
  melchior: AgentData;
}

const STANCE_COLOR = {
  APPROVE: { fill: "#0d2a0d", stroke: "#2a7a2a", text: "#aaffcc", sub: "#88ffaa", bar: "#44ff88" },
  OPPOSE:  { fill: "#2a0d0d", stroke: "#7a2a2a", text: "#ffbbbb", sub: "#ff9999", bar: "#ff4444" },
  NEUTRAL: { fill: "#2a1a0d", stroke: "#7a5a2a", text: "#ffddaa", sub: "#ffcc77", bar: "#ffaa33" },
};

const DEFAULT_COLOR = { fill: "#0d1f3d", stroke: "#2a5ab9", text: "#99ccff", sub: "#7ab0ff", bar: "#4488ff" };

function getColor(stance: "APPROVE" | "OPPOSE" | "NEUTRAL" | null) {
  return stance ? STANCE_COLOR[stance] : DEFAULT_COLOR;
}

function wrapText(text: string, charsPerLine: number, maxLines: number): string[] {
  if (!text) return [];
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if ((current + " " + word).trim().length > charsPerLine) {
      lines.push(current.trim());
      current = word;
      if (lines.length >= maxLines) break;
    } else {
      current = (current + " " + word).trim();
    }
  }
  if (lines.length < maxLines && current) lines.push(current.trim());
  return lines;
}

export default function MagiTriangle({ balthasar, casper, melchior }: MagiTriangleProps) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 50);
    return () => clearInterval(interval);
  }, []);

  const pulse = (Math.sin(tick * 0.08) + 1) / 2;

  const bc = getColor(balthasar.stance);
  const cc = getColor(casper.stance);
  const mc = getColor(melchior.stance);

  const bText = balthasar.isLoading ? "PROCESSING..." : balthasar.response || "STANDBY";
  const cText = casper.isLoading    ? "PROCESSING..." : casper.response    || "STANDBY";
  const mText = melchior.isLoading  ? "PROCESSING..." : melchior.response  || "STANDBY";

  return (
    <svg
      viewBox="0 0 960 680"
      style={{ width: "100%", maxWidth: "960px", display: "block", margin: "0 auto" }}
    >
    
{/* ── CONNECTOR TRIANGLE ── */}
<line x1="330" y1="400" x2="630" y2="400" stroke="#cc7700" strokeWidth="2.5" opacity="0.7"/>
<line x1="330" y1="400" x2="480" y2="100" stroke="#cc7700" strokeWidth="2.5" opacity="0.7"/>
<line x1="630" y1="400" x2="480" y2="100" stroke="#cc7700" strokeWidth="2.5" opacity="0.7"/>

      {/* ── BALTHASAR ── */}
      <polygon
        points="320,20 640,20 640,300 570,340 390,340 320,300"
        fill={bc.fill}
        stroke={bc.stroke}
        strokeWidth="2"
        style={{ filter: `drop-shadow(0 0 ${10 + pulse * 14}px ${bc.stroke}88)` }}
      />
      <text x="480" y="75" textAnchor="middle" fontFamily="Courier New" fontSize="13"
        fill={bc.sub} letterSpacing="4" opacity="0.65">MOTHER</text>
      <text x="480" y="125" textAnchor="middle" fontFamily="Courier New" fontSize="26"
        fontWeight="bold" fill={bc.text} letterSpacing="4"
        style={{ filter: `drop-shadow(0 0 10px ${bc.text}66)` }}>
        BALTHASAR·2
      </text>
      {balthasar.stance && (
        <>
          <rect x="400" y="135" width="160" height="24" fill="none" stroke={bc.bar} strokeWidth="1" opacity="0.8"/>
          <text x="480" y="151" textAnchor="middle" fontFamily="Courier New" fontSize="11"
            fill={bc.bar} letterSpacing="4" fontWeight="bold">{balthasar.stance}</text>
        </>
      )}
      <line x1="340" y1="172" x2="620" y2="172" stroke="#ffffff" strokeWidth="0.5" opacity="0.12"/>
      <text x="340" y="192" fontFamily="Courier New" fontSize="12" fill={bc.sub} opacity="0.6" letterSpacing="2">CONF.</text>
      <rect x="395" y="182" width="180" height="3" fill="#ffffff" fillOpacity="0.08"/>
      <rect x="395" y="182" width={balthasar.confidence ? balthasar.confidence * 180 : 0} height="3" fill={bc.bar}/>
      <text x="585" y="192" textAnchor="end" fontFamily="Courier New" fontSize="12" fill={bc.text} fontWeight="bold">
        {balthasar.confidence ? `${(balthasar.confidence * 100).toFixed(0)}%` : "—"}
      </text>

      {/* Balthasar scrollable text via foreignObject */}
      <foreignObject x="335" y="202" width="290" height="118">
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style={{
            width: "100%",
            height: "100%",
            overflowY: "auto",
            fontFamily: "Courier New, monospace",
            fontSize: "13px",
            lineHeight: "1.7",
            color: `${bc.text}cc`,
            scrollbarWidth: "none",
          }}
        >
          {bText}
        </div>
      </foreignObject>

      {/* ── CASPER ── */}
      <polygon
        points="20,365 300,365 370,430 370,660 20,660"
        fill={cc.fill}
        stroke={cc.stroke}
        strokeWidth="2"
        style={{ filter: `drop-shadow(0 0 ${10 + pulse * 14}px ${cc.stroke}88)` }}
      />
      <text x="185" y="415" textAnchor="middle" fontFamily="Courier New" fontSize="13"
        fill={cc.sub} letterSpacing="4" opacity="0.65">WOMAN</text>
      <text x="185" y="458" textAnchor="middle" fontFamily="Courier New" fontSize="24"
        fontWeight="bold" fill={cc.text} letterSpacing="3"
        style={{ filter: `drop-shadow(0 0 10px ${cc.text}66)` }}>
        CASPER·3
      </text>
      {casper.stance && (
        <>
          <rect x="120" y="466" width="130" height="24" fill="none" stroke={cc.bar} strokeWidth="1" opacity="0.8"/>
          <text x="185" y="482" textAnchor="middle" fontFamily="Courier New" fontSize="11"
            fill={cc.bar} letterSpacing="4" fontWeight="bold">{casper.stance}</text>
        </>
      )}
      <line x1="30" y1="502" x2="355" y2="502" stroke="#ffffff" strokeWidth="0.5" opacity="0.12"/>
      <text x="30" y="522" fontFamily="Courier New" fontSize="12" fill={cc.sub} opacity="0.6" letterSpacing="2">CONF.</text>
      <rect x="85" y="512" width="180" height="3" fill="#ffffff" fillOpacity="0.08"/>
      <rect x="85" y="512" width={casper.confidence ? casper.confidence * 180 : 0} height="3" fill={cc.bar}/>
      <text x="272" y="522" textAnchor="end" fontFamily="Courier New" fontSize="12" fill={cc.text} fontWeight="bold">
        {casper.confidence ? `${(casper.confidence * 100).toFixed(0)}%` : "—"}
      </text>

      {/* Casper scrollable text */}
      <foreignObject x="30" y="532" width="325" height="112">
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style={{
            width: "100%",
            height: "100%",
            overflowY: "auto",
            fontFamily: "Courier New, monospace",
            fontSize: "13px",
            lineHeight: "1.7",
            color: `${cc.text}cc`,
            scrollbarWidth: "none",
          }}
        >
          {cText}
        </div>
      </foreignObject>

      {/* ── MELCHIOR ── */}
      <polygon
	points="660,365 940,365 940,660 590,660 590,430 660,365"
        fill={mc.fill}
        stroke={mc.stroke}
        strokeWidth="2"
        style={{ filter: `drop-shadow(0 0 ${10 + pulse * 14}px ${mc.stroke}88)` }}
      />
      <text x="755" y="415" textAnchor="middle" fontFamily="Courier New" fontSize="13"
        fill={mc.sub} letterSpacing="4" opacity="0.65">SCIENTIST</text>
      <text x="755" y="458" textAnchor="middle" fontFamily="Courier New" fontSize="24"
        fontWeight="bold" fill={mc.text} letterSpacing="3"
        style={{ filter: `drop-shadow(0 0 10px ${mc.text}66)` }}>
        MELCHIOR·1
      </text>
      {melchior.stance && (
        <>
          <rect x="690" y="466" width="130" height="24" fill="none" stroke={mc.bar} strokeWidth="1" opacity="0.8"/>
          <text x="755" y="482" textAnchor="middle" fontFamily="Courier New" fontSize="11"
            fill={mc.bar} letterSpacing="4" fontWeight="bold">{melchior.stance}</text>
        </>
      )}
      <line x1="600" y1="502" x2="928" y2="502" stroke="#ffffff" strokeWidth="0.5" opacity="0.12"/>
      <text x="600" y="522" fontFamily="Courier New" fontSize="12" fill={mc.sub} opacity="0.6" letterSpacing="2">CONF.</text>
      <rect x="655" y="512" width="180" height="3" fill="#ffffff" fillOpacity="0.08"/>
      <rect x="655" y="512" width={melchior.confidence ? melchior.confidence * 180 : 0} height="3" fill={mc.bar}/>
      <text x="842" y="522" textAnchor="end" fontFamily="Courier New" fontSize="12" fill={mc.text} fontWeight="bold">
        {melchior.confidence ? `${(melchior.confidence * 100).toFixed(0)}%` : "—"}
      </text>

      {/* Melchior scrollable text */}
      <foreignObject x="600" y="532" width="325" height="112">
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style={{
            width: "100%",
            height: "100%",
            overflowY: "auto",
            fontFamily: "Courier New, monospace",
            fontSize: "13px",
            lineHeight: "1.7",
            color: `${mc.text}cc`,
            scrollbarWidth: "none",
          }}
        >
          {mText}
        </div>
      </foreignObject>

    </svg>
  );
}
