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

