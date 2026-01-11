'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { EmbedSignDocument } from '@documenso/embed-react';

interface ProposalData {
  deal_id: string;
  company_name: string;
  company_domain: string;
  person_name: string;
  person_email: string;
  value: number | null;
  payment_type: string | null;
  signing_token: string;
  documenso_document_id: string;
  status: string;
  stage: string;
  generated_at: string;
}

function LoadingSpinner() {
  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-zinc-700 border-t-white rounded-full animate-spin" />
    </div>
  );
}

function ErrorState({ title, message }: { title: string; message: string }) {
  return (
    <div className="h-screen w-full bg-black flex items-center justify-center px-6">
      <div className="max-w-sm w-full bg-zinc-900 border border-zinc-800 rounded-lg p-6 text-center">
        <h1 className="text-lg font-semibold text-white">{title}</h1>
        <p className="mt-2 text-sm text-zinc-400">{message}</p>
      </div>
    </div>
  );
}

export default function ProposalPage() {
  const params = useParams();
  const dealId = params.dealId as string;

  const [data, setData] = useState<ProposalData | null>(null);
  const [error, setError] = useState<{ title: string; message: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://bencrane--deals-api-api.modal.run/proposal/${dealId}`)
      .then(res => res.json().then(json => ({ ok: res.ok, status: res.status, json })))
      .then(({ ok, status, json }) => {
        if (!ok) {
          if (status === 404) {
            setError({ title: 'Deal Not Found', message: 'This proposal does not exist.' });
          } else if (status === 400) {
            setError({ title: 'Proposal Not Ready', message: 'No proposal has been generated for this deal yet.' });
          } else {
            setError({ title: 'Error', message: json.error || 'Failed to load proposal.' });
          }
          return;
        }
        setData(json);
      })
      .catch(() => {
        setError({ title: 'Connection Error', message: 'Unable to connect. Please try again.' });
      })
      .finally(() => setLoading(false));
  }, [dealId]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorState title={error.title} message={error.message} />;
  if (!data) return null;

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <EmbedSignDocument
        token={data.signing_token}
        host="https://app.documenso.com"
      />
    </div>
  );
}
