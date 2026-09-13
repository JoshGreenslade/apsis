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
        {data.elements.map((el, i) => {
          if (
            (el.kind === "label" && !labels) ||
            (el.kind === "line" && !construction)
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
