# Embedded Proposal Signing Page - Complete Handoff

## Overview

Build a page at `/proposal/[dealId]/page.tsx` that displays an embedded document signing experience using Documenso. When a client visits this URL, they see the proposal and can sign it directly on your branded domain.

---

## Tech Stack Required

- **Next.js 15+** (App Router)
- **React 18+**
- **Tailwind CSS v4**
- **TypeScript**
- **@documenso/embed-react** (v0.4.0+)
- **lucide-react** (icons)
- **clsx + tailwind-merge** (for `cn()` utility)
- **geist** (font family)

---

## API Endpoint

**Endpoint:** `GET https://bencrane--deals-api-api.modal.run/proposal/{deal_id}`

**Example Request:**
```bash
curl https://bencrane--deals-api-api.modal.run/proposal/d1111111-aaaa-4111-8111-111111111111
```

**Success Response (200):**
```json
{
  "deal_id": "d1111111-aaaa-4111-8111-111111111111",
  "company_name": "Acme Corp",
  "company_domain": "acme.com",
  "person_name": "Sarah Chen",
  "person_email": "sarah.chen@acme.com",
  "value": 10000.0,
  "signing_token": "tZRa-Z4zXsv7eNTviLg3z",
  "documenso_document_id": "9105",
  "status": "active",
  "stage": "proposal",
  "generated_at": "2026-01-11T02:01:10.500129+00:00"
}
```

**Error Responses:**
- `404`: `{ "error": "Deal not found" }`
- `400`: `{ "error": "No proposal generated for this deal" }`

---

## Install Dependencies

```bash
npm install @documenso/embed-react@^0.4.0 lucide-react clsx tailwind-merge geist
```

---

## File Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── proposal/
│       └── [dealId]/
│           └── page.tsx
└── lib/
    └── utils.ts
```

---

## FILE: `src/lib/utils.ts`

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## FILE: `src/app/layout.tsx`

```typescript
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Revenue Engineering",
  description: "Proposal signing and contract management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
```

---

## FILE: `src/app/globals.css`

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);

  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);

  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);

  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);

  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);

  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);

  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);

  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);

  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

/* Stark Black & White Theme - Dark Mode Only */
:root {
  --background: #000000;
  --foreground: #ffffff;
  --card: #0a0a0a;
  --card-foreground: #ffffff;
  --popover: #0a0a0a;
  --popover-foreground: #ffffff;
  --primary: #ffffff;
  --primary-foreground: #000000;
  --secondary: #141414;
  --secondary-foreground: #ffffff;
  --muted: #1a1a1a;
  --muted-foreground: #737373;
  --accent: #1a1a1a;
  --accent-foreground: #ffffff;
  --destructive: #dc2626;
  --destructive-foreground: #ffffff;
  --border: #262626;
  --input: #262626;
  --ring: #404040;
  --radius: 0.5rem;
}

.dark {
  --background: #000000;
  --foreground: #ffffff;
  --card: #0a0a0a;
  --card-foreground: #ffffff;
  --popover: #0a0a0a;
  --popover-foreground: #ffffff;
  --primary: #ffffff;
  --primary-foreground: #000000;
  --secondary: #141414;
  --secondary-foreground: #ffffff;
  --muted: #1a1a1a;
  --muted-foreground: #737373;
  --accent: #1a1a1a;
  --accent-foreground: #ffffff;
  --destructive: #dc2626;
  --destructive-foreground: #ffffff;
  --border: #262626;
  --input: #262626;
  --ring: #404040;
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground antialiased;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

/* Custom scrollbar */
@layer base {
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: #262626;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #404040;
  }
}

/* Selection styling */
::selection {
  background: #ffffff;
  color: #000000;
}

/* Focus ring styling */
@layer base {
  *:focus-visible {
    @apply outline-none ring-1 ring-white/20 ring-offset-0;
  }
}

/* Animations */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse-subtle {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

.animate-pulse-subtle {
  animation: pulse-subtle 2s ease-in-out infinite;
}

.animate-shimmer {
  background: linear-gradient(
    90deg,
    #1a1a1a 0%,
    #262626 50%,
    #1a1a1a 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}

/* Staggered animations */
.stagger-1 { animation-delay: 0.05s; }
.stagger-2 { animation-delay: 0.1s; }
.stagger-3 { animation-delay: 0.15s; }
.stagger-4 { animation-delay: 0.2s; }
```

---

## FILE: `src/app/proposal/[dealId]/page.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { EmbedSignDocument } from '@documenso/embed-react';
import { FileText, DollarSign, Building2, User, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProposalData {
  deal_id: string;
  company_name: string;
  company_domain: string;
  person_name: string;
  person_email: string;
  value: number | null;
  signing_token: string;
  documenso_document_id: string;
  status: string;
  stage: string;
  generated_at: string;
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header skeleton */}
      <header className="border-b border-zinc-800 bg-black shrink-0">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <div className="h-7 w-64 animate-shimmer rounded" />
              <div className="h-4 w-40 animate-shimmer rounded" />
            </div>
            <div className="text-right space-y-2">
              <div className="h-4 w-24 animate-shimmer rounded ml-auto" />
              <div className="h-6 w-32 animate-shimmer rounded ml-auto" />
            </div>
          </div>
        </div>
      </header>

      {/* Document skeleton */}
      <main className="flex-1 bg-zinc-950">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
            <div className="h-[700px] flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 text-zinc-600 animate-spin" />
                <p className="text-sm text-zinc-500">Loading proposal...</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ErrorState({ message, title = 'Unable to Load Proposal' }: { message: string; title?: string }) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-8 text-center space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
            <AlertCircle className="h-6 w-6 text-red-400" />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-semibold text-white">{title}</h1>
            <p className="text-sm text-zinc-400">{message}</p>
          </div>
          <div className="pt-4">
            <p className="text-xs text-zinc-500">
              If you believe this is an error, please contact the sender.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function ProposalPage() {
  const params = useParams();
  const dealId = params.dealId as string;

  const [data, setData] = useState<ProposalData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProposal() {
      try {
        const res = await fetch(
          `https://bencrane--deals-api-api.modal.run/proposal/${dealId}`
        );
        const json = await res.json();

        if (!res.ok) {
          setError(json.error || 'Failed to load proposal');
          return;
        }

        setData(json);
      } catch {
        setError('Unable to connect to server. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    if (dealId) {
      fetchProposal();
    }
  }, [dealId]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    // Customize error messages based on common errors
    if (error === 'Deal not found') {
      return <ErrorState title="Proposal Not Found" message="This proposal doesn't exist or may have been removed." />;
    }
    if (error === 'No proposal generated for this deal') {
      return <ErrorState title="Proposal Not Ready" message="The proposal for this deal hasn't been generated yet." />;
    }
    return <ErrorState message={error} />;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black flex flex-col animate-fade-in">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-black shrink-0">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="flex items-start justify-between gap-6">
            {/* Left: Company and person info */}
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-3">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-zinc-400" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-xl font-semibold text-white truncate">
                    Proposal for {data.company_name}
                  </h1>
                  <p className="text-sm text-zinc-400 flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" />
                    Prepared for {data.person_name}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Value and date */}
            <div className="shrink-0 text-right space-y-1">
              {data.value && (
                <div className="flex items-center gap-2 justify-end">
                  <DollarSign className="h-4 w-4 text-zinc-500" />
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider">
                      Monthly Investment
                    </p>
                    <p className="text-xl font-bold text-white tabular-nums">
                      {formatCurrency(data.value)}
                    </p>
                  </div>
                </div>
              )}
              <p className="text-xs text-zinc-500">
                Generated {formatDate(data.generated_at)}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Status badge */}
      <div className="bg-zinc-950 border-b border-zinc-800/50">
        <div className="max-w-5xl mx-auto px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-zinc-500" />
              <span className="text-sm text-zinc-400">Document ready for signature</span>
            </div>
            <span className={cn(
              "text-xs px-2 py-0.5 rounded-full font-medium",
              data.status === 'active' 
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "bg-zinc-800 text-zinc-400 border border-zinc-700"
            )}>
              {data.status === 'active' ? 'Awaiting Signature' : data.status}
            </span>
          </div>
        </div>
      </div>

      {/* Documenso Embed */}
      <main className="flex-1 bg-zinc-950">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div 
            className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden shadow-2xl shadow-black/50"
            style={{ height: '800px' }}
          >
            <EmbedSignDocument
              token={data.signing_token}
              host="https://app.documenso.com"
              className="w-full h-full"
              cssVars={{
                primary: '#ffffff',
                background: '#0a0a0a',
              }}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-black py-6">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <p className="text-xs text-zinc-500">
              Powered by Outbound Solutions
            </p>
            <p className="text-xs text-zinc-500">
              Questions? Contact your representative.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
```

---

## Key Configuration

| Item | Value |
|------|-------|
| **API Endpoint** | `https://bencrane--deals-api-api.modal.run/proposal/{deal_id}` |
| **Signing Token Field** | `signing_token` from API response |
| **Documenso Host** | `https://app.documenso.com` (production) |
| **Embed Component** | `<EmbedSignDocument token={...} host={...} />` |
| **Embed Height** | `800px` fixed height container |

---

## Documenso Embed Props

```typescript
<EmbedSignDocument
  token={string}           // Required - the signing token from API
  host={string}            // Optional - Documenso instance URL (default: app.documenso.com)
  className={string}       // Optional - CSS class for container
  css={string}             // Optional - custom CSS to inject
  cssVars={{               // Optional - CSS variable overrides
    primary: '#ffffff',
    background: '#0a0a0a',
  }}
/>
```

---

## Testing

Use this test deal ID: `d1111111-aaaa-4111-8111-111111111111`

Navigate to: `/proposal/d1111111-aaaa-4111-8111-111111111111`

---

## Features Implemented

1. **Loading State** - Skeleton with shimmer animation
2. **Error States** - Custom messages for "Deal not found", "No proposal generated", and generic errors
3. **Header** - Company icon, name, person name, monthly value, generated date
4. **Status Badge** - Green "Awaiting Signature" when status is "active"
5. **Documenso Embed** - 800px tall container with dark theme styling
6. **Footer** - Branding and contact info
7. **Dark Theme** - Stark black/white design with zinc accents
8. **Animations** - Fade-in on load, shimmer on skeleton

---

## Design System

- **Primary Background**: `#000000` (black)
- **Card Background**: `#0a0a0a`
- **Border Color**: `#262626` (zinc-800)
- **Text Primary**: `#ffffff` (white)
- **Text Secondary**: `#a1a1aa` (zinc-400)
- **Success/Active**: `#34d399` (emerald-400)
- **Error**: `#f87171` (red-400)
- **Font**: Geist Sans / Geist Mono

