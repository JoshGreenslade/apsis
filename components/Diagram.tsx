"use client";
import { useState } from "react";
import type { Diagram as DiagramData } from "@/types/curriculum";
export function Diagram({ data }: { data: DiagramData }) {
  const [labels, setLabels] = useState(true),
    [construction, setConstruction] = useState(true);
  return (
    <figure className="diagram">
      <div className="eyebrow">Geometric model</div>
      <div className="diagram-controls">
        <label>
          <input
            type="checkbox"
            checked={labels}
            onChange={(e) => setLabels(e.target.checked)}
          />{" "}
          Labels
        </label>
        <label>
          <input
            type="checkbox"
            checked={construction}
            onChange={(e) => setConstruction(e.target.checked)}
          />{" "}
          Construction lines
        </label>
      </div>
      <svg
        viewBox={data.viewBox.join(" ")}
        role="img"
        aria-label={`${data.title}. ${data.caption}`}
      >
        <defs>
          {(["accent", "muted", "ink"] as const).map((tone) => (
            <marker
              key={tone}
              id={`arrow-${tone}`}
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="4"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path
                d="M0,0 L8,4 L0,8 z"
                fill={
                  tone === "accent"
                    ? "var(--accent)"
                    : tone === "muted"
                      ? "var(--diagram-muted)"
                      : "var(--ink)"
                }
              />
            </marker>
          ))}
        </defs>
        {data.elements.map((el, i) => {
          if (
            (el.kind === "label" && !labels) ||
            ((el.kind === "line" || el.kind === "arrow") && !construction)
          )
            return null;
          if (el.kind === "label")
            return (
              <text key={i} x={el.at[0]} y={el.at[1]}>
                {el.text}
              </text>
            );
          const stroke =
            el.tone === "accent"
              ? "var(--accent)"
              : el.tone === "muted"
                ? "var(--diagram-muted)"
                : "var(--ink)";
          if (el.kind === "ellipse")
            return (
              <ellipse
                key={i}
                cx={el.center[0]}
                cy={el.center[1]}
                rx={el.rx}
                ry={el.ry}
                stroke={stroke}
                fill="none"
                strokeWidth="2"
                strokeDasharray={el.dashed ? "5 6" : undefined}
              />
            );
          if (el.kind === "line")
            return (
              <line
                key={i}
                x1={el.from[0]}
                y1={el.from[1]}
                x2={el.to[0]}
                y2={el.to[1]}
                stroke={stroke}
                strokeWidth="1.5"
                strokeDasharray={el.dashed ? "5 6" : undefined}
              />
            );
          if (el.kind === "arrow") {
            const stroke =
              el.tone === "accent"
                ? "var(--accent)"
                : el.tone === "muted"
                  ? "var(--diagram-muted)"
                  : "var(--ink)";
            return (
              <g key={i}>
                <line
                  x1={el.from[0]}
                  y1={el.from[1]}
                  x2={el.to[0]}
                  y2={el.to[1]}
                  stroke={stroke}
                  strokeWidth="2"
                  strokeDasharray={el.dashed ? "5 6" : undefined}
                  markerEnd={`url(#arrow-${el.tone})`}
                />
                {labels && el.label && (
                  <text
                    x={(el.from[0] + el.to[0]) / 2}
                    y={(el.from[1] + el.to[1]) / 2 - 7}
                    textAnchor="middle"
                    className="diagram-edge-label"
                  >
                    {el.label}
                  </text>
                )}
              </g>
            );
          }
          if (el.kind === "box") {
            const stroke =
              el.tone === "accent"
                ? "var(--accent)"
                : el.tone === "muted"
                  ? "var(--diagram-muted)"
                  : "var(--ink)";
            const lines = el.label.match(/.{1,25}(?:\s+|$)/g) ?? [el.label];
            const lineHeight = 17;
            const startY =
              el.center[1] - ((lines.length - 1) * lineHeight) / 2 + 5;
            return (
              <g key={i}>
                <rect
                  x={el.center[0] - el.width / 2}
                  y={el.center[1] - el.height / 2}
                  width={el.width}
                  height={el.height}
                  rx="10"
                  fill="var(--surface)"
                  stroke={stroke}
                  strokeWidth="2"
                />
                {labels && (
                  <text x={el.center[0]} textAnchor="middle">
                    {lines.map((line, lineIndex) => (
                      <tspan
                        key={lineIndex}
                        x={el.center[0]}
                        y={startY + lineIndex * lineHeight}
                      >
                        {line.trim()}
                      </tspan>
                    ))}
                    {el.detail && (
                      <tspan
                        x={el.center[0]}
                        y={el.center[1] + el.height / 2 - 9}
                        className="diagram-detail"
                      >
                        {el.detail}
                      </tspan>
                    )}
                  </text>
                )}
              </g>
            );
          }
          return (
            <g key={i}>
              <circle cx={el.at[0]} cy={el.at[1]} r="5" fill={stroke} />
              {labels && (
                <text
                  x={el.at[0] + (el.labelOffset?.[0] ?? 0)}
                  y={el.at[1] + (el.labelOffset?.[1] ?? 24)}
                  textAnchor="middle"
                >
                  {el.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <figcaption>{data.caption}</figcaption>
    </figure>
  );
}
