"use client";

import * as React from "react";
import { createPortal } from "react-dom";

interface QuoteHighlightProps {
  children: React.ReactNode;
  quote: string;
  attribution: string;
}

const POPOVER_WIDTH = 380;
const MIN_MARGIN_SPACE = 420; // Minimum space needed for side popover
const GAP = 24;

export function QuoteHighlight({
  children,
  quote,
  attribution,
}: QuoteHighlightProps) {
  const [open, setOpen] = React.useState(false);
  const [canShowSide, setCanShowSide] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const popoverRef = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState<{ top: number; left: number } | null>(null);

  // Measure available space and determine layout mode
  const measureSpace = React.useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return false;

    // Find the content container
    const container = trigger.closest("article") || trigger.closest("main") || trigger.closest("section");
    if (!container) return false;

    const containerRect = container.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const availableSpace = viewportWidth - containerRect.right;

    return availableSpace >= MIN_MARGIN_SPACE;
  }, []);

  // Check layout mode on mount and resize
  React.useEffect(() => {
    const checkSpace = () => setCanShowSide(measureSpace());

    checkSpace();
    window.addEventListener("resize", checkSpace);
    return () => window.removeEventListener("resize", checkSpace);
  }, [measureSpace]);

  // Calculate position for side popover
  React.useEffect(() => {
    if (!open || !canShowSide || !triggerRef.current) {
      setPosition(null);
      return;
    }

    const updatePosition = () => {
      const trigger = triggerRef.current;
      if (!trigger) return;

      const container = trigger.closest("article") || trigger.closest("main") || trigger.closest("section");
      const paragraph = trigger.closest("p");
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const paragraphRect = paragraph?.getBoundingClientRect();

      // Align with top of paragraph
      const topPosition = paragraphRect
        ? paragraphRect.top + window.scrollY
        : containerRect.top + window.scrollY;

      setPosition({
        top: topPosition,
        left: containerRect.right + GAP,
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [open, canShowSide]);

  // Close on scroll (for side popover)
  React.useEffect(() => {
    if (!open || !canShowSide) return;

    const handleScroll = () => setOpen(false);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open, canShowSide]);

  // Close on click outside
  React.useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const clickedOutsidePopover = popoverRef.current && !popoverRef.current.contains(target);
      const clickedOutsideTrigger = triggerRef.current && !triggerRef.current.contains(target);

      if (clickedOutsidePopover && clickedOutsideTrigger) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const triggerButton = (
    <button
      ref={triggerRef}
      type="button"
      onClick={() => setOpen(!open)}
      className="
        inline cursor-pointer
        decoration-dotted underline underline-offset-4 decoration-[#888888]
        bg-[#f0fdf4] hover:bg-[#dcfce7]
        px-0.5 -mx-0.5
        rounded-sm
        transition-colors duration-150
      "
    >
      {children}
    </button>
  );

  const quoteContent = (
    <>
      <blockquote className="text-[15px] leading-relaxed text-[#333333] italic">
        "{quote}"
      </blockquote>
      <footer className="mt-3 text-sm text-[#666666] not-italic">
        — {attribution}
      </footer>
    </>
  );

  // Narrow viewport: inline expansion below trigger
  if (!canShowSide) {
    return (
      <>
        {triggerButton}
        {open && (
          <span
            ref={popoverRef}
            className="
              block mt-4 mb-4 ml-0
              pl-4 border-l-2 border-[#d4d4d4]
              animate-in fade-in-0 slide-in-from-top-2
              duration-200
            "
          >
            <span className="block text-[15px] leading-relaxed text-[#333333] italic">
              "{quote}"
            </span>
            <span className="block mt-2 text-sm text-[#666666] not-italic">
              — {attribution}
            </span>
          </span>
        )}
      </>
    );
  }

  // Wide viewport: side popover via portal
  return (
    <>
      {triggerButton}
      {open && position && createPortal(
        <div
          ref={popoverRef}
          className="
            fixed z-50
            bg-[#fafaf9] border border-[#e5e5e5]
            rounded-md shadow-lg
            p-5
            animate-in fade-in-0 zoom-in-95
            duration-200
          "
          style={{
            top: position.top,
            left: position.left,
            width: POPOVER_WIDTH,
          }}
        >
          {quoteContent}
        </div>,
        document.body
      )}
    </>
  );
}
