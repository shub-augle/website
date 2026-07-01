'use client';

import { useEffect, useRef } from 'react';

export interface WaffleAgent {
  name: string;
  pct: number;
  color: string;
}

interface WaffleGridProps {
  agents: WaffleAgent[];
  isActive?: boolean;
  id?: string; // for targeting in animated cards
}

const EMPTY_COLOR = '#C8C4BA';
const SQUARES = 20;

export default function WaffleGrid({ agents, isActive = false, id }: WaffleGridProps) {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isActive) return;

    intervalRef.current = setInterval(() => {
      agents.forEach((agent, i) => {
        const row = rowRefs.current[i];
        if (!row) return;
        const squares = row.querySelectorAll<HTMLDivElement>('.wsq');
        const fluctuation = (Math.random() - 0.5) * 6; // ±3%
        const newPct = Math.max(20, Math.min(95, agent.pct + fluctuation));
        const filled = Math.round(newPct / 5);
        squares.forEach((sq, j) => {
          sq.style.background = j < filled ? agent.color : EMPTY_COLOR;
        });
      });
    }, 2200 + Math.random() * 800);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, agents]);

  return (
    <div className="flex flex-col gap-[2px]" id={id}>
      {agents.map((agent, i) => {
        const filled = Math.round(agent.pct / 5);
        return (
          <div
            key={agent.name}
            ref={(el) => { rowRefs.current[i] = el; }}
            className="grid gap-[1.5px]"
            style={{ gridTemplateColumns: `repeat(${SQUARES}, 1fr)` }}
          >
            {Array.from({ length: SQUARES }, (_, j) => (
              <div
                key={j}
                className="wsq"
                style={{
                  height: '5px',
                  background: j < filled ? agent.color : EMPTY_COLOR,
                }}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
