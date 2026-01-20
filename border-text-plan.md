# BorderText Component Implementation Plan

---

## 1. Component API

```tsx
interface BorderTextProps {
  text: string;              // The text to repeat (e.g., "RevenueEngineer.com")
  orientation: "horizontal" | "vertical";  // Direction of text flow
  borderWidth: number;       // Thickness of border in pixels (e.g., 26)
  gap?: number;              // Space between text instances in pixels (default: 48)
  rotate?: number;           // Rotation in degrees applied to inner container (default: 0)
  className?: string;        // Additional classes for the container
}
```

**Props explained:**
- `text`: The string to measure and repeat
- `orientation`: Determines layout direction and whether to use `writing-mode: vertical-rl`
- `borderWidth`: Used to set the container height (horizontal) or width (vertical)
- `gap`: Spacing between repeated instances — allows tuning density
- `rotate`: Rotation applied to the inner flex container — used for left edge (180deg) so text reads in correct direction
- `className`: For positioning (e.g., `top-0 left-[26px] right-[26px]`)

---

## 2. Measurement Strategy

**What we measure:**
1. **Container size**: The available length along the text flow direction
   - Horizontal: container's `offsetWidth`
   - Vertical: container's `offsetHeight`

2. **Single text instance size**: Width/height of one "RevenueEngineer.com"
   - Render a hidden single instance, measure with `getBoundingClientRect()`
   - This accounts for font size, letter-spacing, font-weight

**When measurements happen:**
1. **On mount**: Initial measurement via `useLayoutEffect` (before paint)
2. **On resize**: Via `ResizeObserver` watching the container element
3. **On prop changes**: Re-measure if `text`, `gap`, or `orientation` changes

**Refs needed:**
- `containerRef`: Points to the outer container div
- `measureRef`: Points to the hidden measurement span

---

## 3. Calculation Logic

```
availableSpace = containerSize
instanceSize = measuredTextSize
totalPerInstance = instanceSize + gap

count = Math.floor((availableSpace + gap) / totalPerInstance)
```

**Why `(availableSpace + gap)`:**
The last instance doesn't need trailing gap, so we add one gap back before dividing.

**Example:**
- Container: 1200px wide
- Text instance: 140px
- Gap: 48px
- Total per instance: 188px
- Count: Math.floor((1200 + 48) / 188) = Math.floor(6.6) = **6 instances**

**Edge case handling:**
- If count < 1, render 1 instance (always show at least one)
- If measurement returns 0 (not yet measured), render nothing or a placeholder

---

## 4. Resize Handling

**Approach: ResizeObserver with no debounce**

```tsx
useLayoutEffect(() => {
  const container = containerRef.current;
  if (!container) return;

  const observer = new ResizeObserver((entries) => {
    const entry = entries[0];
    const size = orientation === "horizontal"
      ? entry.contentRect.width
      : entry.contentRect.height;
    setContainerSize(size);
  });

  observer.observe(container);
  return () => observer.disconnect();
}, [orientation]);
```

**Why no debounce:**
- The calculation is cheap (just division)
- Rendering N spans is fast
- Debouncing would cause visible lag/jumpiness during resize

**Why ResizeObserver over window.resize:**
- More accurate — tracks the actual container, not just viewport
- Handles cases where container size changes without viewport changing

---

## 5. Styling Approach

**Horizontal orientation (top/bottom edges):**
```tsx
<div
  ref={containerRef}
  className={className}
  style={{ height: borderWidth }}
>
  <div className="flex items-center justify-center h-full" style={{ gap }}>
    {Array(count).fill(null).map((_, i) => (
      <span key={i} className="shrink-0 text-[11px] text-white font-medium tracking-widest">
        {text}
      </span>
    ))}
  </div>
</div>
```

**Vertical orientation (left/right edges):**
```tsx
<div
  ref={containerRef}
  className={className}
  style={{ width: borderWidth }}
>
  <div
    className="flex items-center justify-center w-full"
    style={{
      writingMode: 'vertical-rl',
      gap,
      // Rotate 180 for left edge so text reads top-to-bottom
    }}
  >
    {Array(count).fill(null).map((_, i) => (
      <span key={i} className="shrink-0 text-[11px] text-white font-medium tracking-widest">
        {text}
      </span>
    ))}
  </div>
</div>
```

**Left vs Right edge:**
- Right edge: `writing-mode: vertical-rl` (text reads top to bottom)
- Left edge: `writing-mode: vertical-rl` + `rotate-180` (text reads bottom to top, maintaining same visual direction)

**Hidden measurement element:**
```tsx
<span
  ref={measureRef}
  className="absolute opacity-0 pointer-events-none text-[11px] font-medium tracking-widest"
  style={{ writingMode: orientation === 'vertical' ? 'vertical-rl' : undefined }}
>
  {text}
</span>
```

---

## 6. Integration

**Page structure:**
```tsx
{/* Border frame container */}
<div className="hidden sm:block fixed inset-0 pointer-events-none z-50">
  {/* Solid border */}
  <div className="absolute inset-0 border-[26px] border-black" />

  {/* Top edge */}
  <BorderText
    text="RevenueEngineer.com"
    orientation="horizontal"
    borderWidth={26}
    className="absolute top-0 left-[26px] right-[26px]"
  />

  {/* Bottom edge */}
  <BorderText
    text="RevenueEngineer.com"
    orientation="horizontal"
    borderWidth={26}
    className="absolute bottom-0 left-[26px] right-[26px]"
  />

  {/* Left edge */}
  <BorderText
    text="RevenueEngineer.com"
    orientation="vertical"
    borderWidth={26}
    rotate={180}
    className="absolute left-0 top-[26px] bottom-[26px]"
  />

  {/* Right edge */}
  <BorderText
    text="RevenueEngineer.com"
    orientation="vertical"
    borderWidth={26}
    className="absolute right-0 top-[26px] bottom-[26px]"
  />
</div>
```

**Corner bleed prevention:**
- Horizontal edges: `left-[26px] right-[26px]` — inset by border width
- Vertical edges: `top-[26px] bottom-[26px]` — inset by border width
- This creates clean 90° corners where edges don't overlap

---

## Summary

| Concern | Approach |
|---------|----------|
| Measure text | Hidden span + `getBoundingClientRect()` |
| Measure container | `ResizeObserver` on container |
| Calculate count | `Math.floor((containerSize + gap) / (textSize + gap))` |
| Resize response | ResizeObserver, no debounce |
| Horizontal text | Flexbox row, centered |
| Vertical text | `writing-mode: vertical-rl`, rotate for left edge |
| Corner prevention | Inset positioning by `borderWidth` |
