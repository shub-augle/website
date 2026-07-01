'use client';

import { useState } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

const USE_CASES = [
  'Select a use case',
  'Universities',
  'Research labs',
  'Law firms',
  'Venture capital',
  'Healthcare',
  'Government',
  'Financial services',
  'Think tanks + nonprofits',
  'Enterprise',
  'Media',
  'Policy',
  'Other',
];

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function WaitlistPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [useCase, setUseCase] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const inputClass = 'w-full text-[14px] px-4 py-3 border-[0.5px] border-border rounded bg-surface text-dark placeholder:text-muted outline-none focus:border-terracotta transition-colors font-sans';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setError('');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, org, useCase, source: 'waitlist-page' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong.');
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  return (
    <div className="bg-sand min-h-screen">
      <Nav activeRoute="/waitlist" />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Waitlist' }]} />

      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-[80px] grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-16 items-start">
          <div>
            <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-5">Early access</div>
            <h1 className="font-serif text-[36px] lg:text-[64px] font-normal leading-[1.12] tracking-[-0.025em] text-dark mb-6 max-w-[560px]">
              Join the waitlist.<br /><em className="italic text-terracotta">Run your first session free.</em>
            </h1>
            <p className="text-[19px] text-body leading-[1.8] max-w-[520px] mb-8">
              Augle is in early access. Tell us who you are and what you work on — we&apos;ll notify you by email when your account is ready, along with one free Standard session to run a real question.
            </p>
            <div className="flex flex-col gap-3 max-w-[480px]">
              {[
                'No card required to join the waitlist',
                'One free Standard session with every new account',
                'Credits never expire once your account opens',
              ].map(text => (
                <div key={text} className="flex items-start gap-3">
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none" className="mt-[3px] flex-shrink-0">
                    <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#C15F3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[14px] text-body">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface border-[0.5px] border-border rounded-lg p-8">
            {status === 'success' ? (
              <div className="text-center py-8">
                <p className="text-[18px] font-medium text-dark mb-2">You&apos;re on the list.</p>
                <p className="text-[14px] text-body leading-[1.6]">
                  We&apos;ll email you at the address you provided when your account is ready. Thanks for your patience while we work through the corpus build.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="font-mono text-[10px] tracking-[0.06em] text-muted uppercase block mb-2">Full name</label>
                  <input type="text" required value={name} onChange={e => setName(e.target.value)}
                    placeholder="Jane Doe" className={inputClass} />
                </div>
                <div>
                  <label className="font-mono text-[10px] tracking-[0.06em] text-muted uppercase block mb-2">Email address</label>
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="you@organisation.com" className={inputClass} />
                </div>
                <div>
                  <label className="font-mono text-[10px] tracking-[0.06em] text-muted uppercase block mb-2">Organisation</label>
                  <input type="text" value={org} onChange={e => setOrg(e.target.value)}
                    placeholder="Optional" className={inputClass} />
                </div>
                <div>
                  <label className="font-mono text-[10px] tracking-[0.06em] text-muted uppercase block mb-2">Primary use case</label>
                  <select value={useCase} onChange={e => setUseCase(e.target.value)} aria-label="Primary use case"
                    className={`${inputClass} appearance-none cursor-pointer`}>
                    {USE_CASES.map(u => (
                      <option key={u} value={u === 'Select a use case' ? '' : u}>{u}</option>
                    ))}
                  </select>
                </div>
                {status === 'error' && (
                  <p className="text-[13px] text-[#A32D2D]">{error}</p>
                )}
                <button type="submit" disabled={status === 'loading'}
                  className="w-full text-[15px] font-medium text-white bg-terracotta px-6 py-[14px] rounded hover:opacity-[0.88] transition-opacity cursor-pointer border-none font-sans disabled:opacity-60">
                  {status === 'loading' ? 'Joining…' : 'Join waitlist'}
                </button>
                <p className="text-[12px] text-muted text-center">
                  By joining, you agree to our{' '}
                  <Link href="/privacy" className="text-terracotta no-underline hover:underline">Privacy Policy</Link>.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
