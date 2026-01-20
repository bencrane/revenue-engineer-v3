"use client";

import * as React from "react";

interface BorderTextProps {
  text: string;
  orientation: "horizontal" | "vertical";
  borderWidth: number;
  gap?: number;
  rotate?: number;
  className?: string;
}

export function BorderText({
  text,
  orientation,
  borderWidth,
  gap = 48,
  rotate = 0,
  className,
}: BorderTextProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const measureRef = React.useRef<HTMLSpanElement>(null);
  const [count, setCount] = React.useState(0);

  // Measure and calculate count
  const updateCount = React.useCallback(() => {
    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;

    const containerSize =
      orientation === "horizontal"
        ? container.offsetWidth
        : container.offsetHeight;

    const measureRect = measure.getBoundingClientRect();
    const textSize =
      orientation === "horizontal" ? measureRect.width : measureRect.height;

    if (textSize === 0) return;

    const totalPerInstance = textSize + gap;
    const newCount = Math.max(1, Math.floor((containerSize + gap) / totalPerInstance));

    setCount(newCount);
  }, [orientation, gap]);

  // Initial measurement
  React.useLayoutEffect(() => {
    updateCount();
  }, [updateCount, text]);

  // ResizeObserver for container
  React.useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      updateCount();
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [updateCount]);

  const isVertical = orientation === "vertical";

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        height: isVertical ? undefined : borderWidth,
        width: isVertical ? borderWidth : undefined,
      }}
    >
      {/* Hidden measurement element */}
      <span
        ref={measureRef}
        className="absolute opacity-0 pointer-events-none text-[11px] font-medium tracking-widest"
        style={{
          writingMode: isVertical ? "vertical-rl" : undefined,
        }}
      >
        {text}
      </span>

      {/* Visible text instances */}
      <div
        className={`flex items-center justify-center ${
          isVertical ? "w-full h-full" : "h-full"
        }`}
        style={{
          gap,
          writingMode: isVertical ? "vertical-rl" : undefined,
          transform: rotate ? `rotate(${rotate}deg)` : undefined,
        }}
      >
        {Array(count)
          .fill(null)
          .map((_, i) => (
            <span
              key={i}
              className="shrink-0 text-[11px] text-white font-medium tracking-widest"
            >
              {text}
            </span>
          ))}
      </div>
    </div>
  );
}
