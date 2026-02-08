/**
 * Design System — Essay-Style Landing Page
 * 
 * Minimal, content-first design inspired by Paul Graham essays and Jason Liu's site.
 * Optimized for readability with generous whitespace and restrained aesthetics.
 * 
 * Usage:
 *   import { ds } from "@/lib/design-system";
 *   <div className={ds.layout.container}>
 *   <h1 className={ds.typography.h1}>
 *   <blockquote className={ds.components.blockquote.default}>
 */

// =============================================================================
// LAYOUT
// =============================================================================

export const layout = {
  /** Max content width — optimized for 45-75 characters per line */
  maxWidth: "max-w-[67ch]",
  
  /** Full-width container with max-width constraint */
  container: "w-full max-w-[67ch] mx-auto",
  
  /** Page padding — responsive horizontal padding */
  pagePadding: "px-6 sm:px-8 lg:px-6",
  
  /** Page vertical padding */
  pageVerticalPadding: "py-16 sm:py-24 lg:py-32",
  
  /** Full page wrapper */
  page: "w-full max-w-[67ch] mx-auto px-6 sm:px-8 lg:px-6 py-16 sm:py-24 lg:py-32",
  
  /** Wider container for media that should "break out" slightly */
  wideContainer: "w-full max-w-[75ch] mx-auto",
} as const;

// =============================================================================
// TYPOGRAPHY
// =============================================================================

export const typography = {
  /** Font families */
  font: {
    /** Primary — clean sans-serif for modern feel */
    sans: "font-sans",
    /** Serif option — for traditional essay feel */
    serif: "font-serif",
    /** Mono — for code or technical emphasis */
    mono: "font-mono",
  },

  /** Heading 1 — page title */
  h1: "text-3xl sm:text-4xl font-semibold tracking-tight leading-tight",
  
  /** Heading 2 — section title */
  h2: "text-xl sm:text-2xl font-semibold tracking-tight leading-snug",
  
  /** Heading 3 — subsection */
  h3: "text-lg font-medium tracking-tight leading-snug",

  /** Body text — optimized for long-form reading */
  body: "text-base sm:text-lg leading-relaxed sm:leading-relaxed",
  
  /** Body large — for intro paragraphs or emphasis */
  bodyLarge: "text-lg sm:text-xl leading-relaxed",

  /** Caption — for image captions, footnotes */
  caption: "text-sm leading-normal",
  
  /** Small — for metadata, timestamps */
  small: "text-xs leading-normal",

  /** Link styling */
  link: "underline underline-offset-2 decoration-1 hover:decoration-2 transition-all",
  
  /** Link without underline (for nav, etc.) */
  linkSubtle: "hover:underline underline-offset-2 decoration-1 transition-all",
} as const;

// =============================================================================
// COLORS
// =============================================================================

export const colors = {
  /** Page background — warm off-white */
  background: "bg-[#fafaf9]",
  
  /** Alternative backgrounds */
  backgroundAlt: {
    white: "bg-white",
    cream: "bg-[#f5f5f0]",
    dark: "bg-[#1a1a1a]",
  },

  /** Primary text — near-black for comfortable contrast */
  text: "text-[#1a1a1a]",
  
  /** Text variants */
  textMuted: "text-[#666666]",
  textSubtle: "text-[#888888]",
  
  /** Inverted text (for dark backgrounds) */
  textInverted: "text-[#fafaf9]",

  /** Accent — understated blue for links/CTA */
  accent: "text-[#0055aa]",
  accentHover: "hover:text-[#003d7a]",
  
  /** Accent background (for solid buttons) */
  accentBg: "bg-[#1a1a1a]",
  accentBgHover: "hover:bg-[#333333]",

  /** Border colors */
  border: "border-[#e5e5e5]",
  borderSubtle: "border-[#f0f0f0]",
  borderStrong: "border-[#1a1a1a]",
} as const;

// =============================================================================
// SPACING
// =============================================================================

export const spacing = {
  /** Between major sections */
  sectionGap: "space-y-16 sm:space-y-24",
  
  /** Between paragraphs */
  paragraphGap: "space-y-6",
  
  /** Between heading and its content */
  headingGap: "mb-4 sm:mb-6",
  
  /** After h1 (before first paragraph) */
  afterTitle: "mt-8 sm:mt-12",
  
  /** Prose container with vertical rhythm */
  prose: "space-y-6",
  
  /** Tight spacing for lists, etc. */
  tight: "space-y-2",
  
  /** Loose spacing for breathing room */
  loose: "space-y-8 sm:space-y-12",
} as const;

// =============================================================================
// COMPONENTS
// =============================================================================

export const components = {
  /** Blockquote / Pull quote */
  blockquote: {
    /** Default — left border accent */
    default: "pl-6 border-l-2 border-[#1a1a1a] italic text-[#444444]",
    
    /** Pull quote — centered, larger */
    pullQuote: "text-xl sm:text-2xl text-center italic text-[#444444] px-6",
    
    /** Minimal — just italic, no border */
    minimal: "italic text-[#444444]",
  },

  /** CTA Button */
  button: {
    /** Base button styles */
    base: "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a1a1a] focus-visible:ring-offset-2",
    
    /** Primary — solid dark background */
    primary: "inline-flex items-center justify-center font-medium px-6 py-3 bg-[#1a1a1a] text-[#fafaf9] hover:bg-[#333333] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a1a1a] focus-visible:ring-offset-2",
    
    /** Secondary — outline style */
    secondary: "inline-flex items-center justify-center font-medium px-6 py-3 border border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#fafaf9] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a1a1a] focus-visible:ring-offset-2",
    
    /** Ghost — just text, like a link */
    ghost: "inline-flex items-center justify-center font-medium px-4 py-2 text-[#1a1a1a] underline underline-offset-4 decoration-1 hover:decoration-2 transition-all duration-200",
    
    /** Small variant modifier */
    small: "text-sm px-4 py-2",
    
    /** Large variant modifier */
    large: "text-lg px-8 py-4",
  },

  /** Section divider */
  divider: {
    /** Horizontal rule — subtle */
    line: "border-t border-[#e5e5e5] my-12 sm:my-16",
    
    /** Spacer — just whitespace (use as className on empty div) */
    space: "h-12 sm:h-16",
    
    /** Asterism — three dots/asterisks centered */
    asterism: "text-center text-[#888888] my-12 sm:my-16 tracking-[1em]",
  },
} as const;

// =============================================================================
// MEDIA
// =============================================================================

export const media = {
  /** Generic media container — works for images, video, embeds */
  container: {
    /** Default — full width within prose */
    default: "w-full my-8 sm:my-12",
    
    /** Centered with max width */
    centered: "w-full max-w-full mx-auto my-8 sm:my-12",
    
    /** Breakout — slightly wider than prose */
    breakout: "w-full max-w-[75ch] -mx-[5ch] my-8 sm:my-12",
  },

  /** Image-specific styles */
  image: {
    /** Default image */
    default: "w-full h-auto",
    
    /** With subtle border radius */
    rounded: "w-full h-auto rounded-sm",
    
    /** With subtle shadow */
    elevated: "w-full h-auto rounded-sm shadow-sm",
  },

  /** Video/embed container — maintains aspect ratio */
  video: {
    /** 16:9 aspect ratio wrapper */
    wrapper: "relative w-full aspect-video",
    
    /** Iframe/video element inside wrapper */
    element: "absolute inset-0 w-full h-full",
  },

  /** Caption for media */
  caption: "mt-3 text-sm text-[#666666] text-center",
} as const;

// =============================================================================
// COMBINED EXPORT
// =============================================================================

export const ds = {
  layout,
  typography,
  colors,
  spacing,
  components,
  media,
} as const;

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/** Combine multiple class strings */
export function cx(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/** 
 * Prose wrapper — combines common prose styles 
 * Use: <div className={prose()}>
 */
export function prose(options?: { size?: "default" | "large" }): string {
  const base = cx(
    layout.container,
    colors.text,
    spacing.prose,
  );
  
  if (options?.size === "large") {
    return cx(base, typography.bodyLarge);
  }
  
  return cx(base, typography.body);
}

export default ds;
