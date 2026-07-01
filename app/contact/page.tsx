'use client';

import { useState } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

const CHANNELS = [
  {
    initials: 'WL',
    label: 'Waitlist',
    title: 'Get early access',
    body: 'Join the waitlist to be among the first to run sessions when Augle opens to new users.',
    action: { label: 'Join waitlist →', href: '/waitlist' },
  },
  {
    initials: 'EN',
    label: 'Enterprise',
    title: 'Team + enterprise plans',
    body: 'Custom session volumes, Guardian configuration, API access, and white-label options for organisations.',
    action: { label: 'enterprise@augle.com →', href: 'mailto:enterprise@augle.com' },
  },
  {
    initials: 'RE',
    label: 'Research',
    title: 'Collaboration + citations',
    body: "Working on augmented deliberation, multi-agent reasoning, or calibration scoring? We'd like to hear from you.",
    action: { label: 'research@augle.com →', href: 'mailto:research@augle.com' },
  },
  {
    initials: 'PR',
    label: 'Press',
    title: 'Media inquiries',
    body: 'For press coverage, interview requests, and media assets. Response within one business day.',
    action: { label: 'press@augle.com →', href: 'mailto:press@augle.com' },
  },
];

const SUBJECTS = [
  'Select a topic',
  'Product question',
  'Waitlist inquiry',
  'Enterprise / team plan',
  'Research collaboration',
  'Press / media',
  'Other',
];

const TEAM = [
  {
    role: 'Co-Founder · CEO',
    name: 'Cory Kelly',
    bio: "Product design and strategy. 15+ years of UI/UX and product leadership. Responsible for Augle's product architecture, design system, investor relations, and commercial strategy.",
    email: 'cory@augle.com',
  },
  {
    role: 'Co-Founder · CTO',
    name: 'Shubhanker Saxena',
    bio: "Engineering and infrastructure. Responsible for the deliberation engine, corpus pipeline, API architecture, and all production systems. Wozniak to Cory's Jobs.",
    email: 'shub@augle.com',
  },
];

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [error, setError] = useState('');

  const inputClass = 'w-full text-[14px] px-4 py-3 border-[0.5px] border-border rounded bg-sand text-dark placeholder:text-muted outline-none focus:border-terracotta transition-colors font-sans';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, org, subject, message }),
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
      <Nav activeRoute="/company" />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Company', href: '/company' }, { label: 'Contact' }]} />

      {/* HERO */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-[96px] grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-12 items-start">
          <div>
            <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-5">Contact</div>
            <h1 className="font-serif text-[36px] lg:text-[64px] font-normal leading-[1.12] tracking-[-0.025em] text-dark mb-6">
              Talk to the people<br />building this.
            </h1>
            <p className="text-[19px] text-body leading-[1.8] max-w-[540px]">
              We're a small team. When you reach out to Augle, you reach the founders. Whether you have a product question, a research idea, an enterprise inquiry, or press coverage in mind — we read and respond to everything.
            </p>
          </div>

          {/* Channels */}
          <div className="flex flex-col gap-3">
            {CHANNELS.map(({ initials, label, title, body, action }) => (
              <div key={label} className="bg-surface border-[0.5px] border-border rounded-lg p-5 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-[#EAE6DC] border-[0.5px] border-border flex items-center justify-center font-mono text-[11px] text-terracotta font-medium flex-shrink-0">
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-[10px] tracking-[0.06em] text-muted uppercase mb-[3px]">{label}</div>
                  <div className="text-[14px] font-medium text-dark mb-[3px]">{title}</div>
                  <p className="text-[12px] text-muted leading-[1.5] mb-2">{body}</p>
                  <Link href={action.href} className="text-[12px] text-terracotta font-medium no-underline hover:underline">
                    {action.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FORM */}
      <div className="bg-surface border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-5">Send a message</div>
            <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-dark leading-[1.15] mb-4">
              We read everything.<br />We respond to most.
            </h2>
            <p className="text-[16px] text-body leading-[1.8] mb-4">
              Use this form for general inquiries. For enterprise, research, or press — the direct emails above get a faster response. We don't use a ticketing system. A person reads every submission.
            </p>
            <p className="text-[13px] text-muted">
              Expected response time: 1–2 business days. For time-sensitive matters, email directly.
            </p>
          </div>

          {status === 'success' ? (
            <div className="bg-sand border-[0.5px] border-border rounded-lg p-8 text-center">
              <p className="text-[16px] font-medium text-dark mb-2">Message sent.</p>
              <p className="text-[14px] text-body">We read every submission — expect a response within 1–2 business days.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="font-mono text-[10px] tracking-[0.06em] text-muted uppercase block mb-2">Your name</label>
                <input type="text" required value={name} onChange={e => setName(e.target.value)}
                  placeholder="Full name" className={inputClass} />
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
                <label className="font-mono text-[10px] tracking-[0.06em] text-muted uppercase block mb-2">Subject</label>
                <select value={subject} onChange={e => setSubject(e.target.value)} aria-label="Subject"
                  className={`${inputClass} appearance-none cursor-pointer`}>
                  {SUBJECTS.map(s => (
                    <option key={s} value={s === 'Select a topic' ? '' : s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] tracking-[0.06em] text-muted uppercase block mb-2">Message</label>
                <textarea required value={message} onChange={e => setMessage(e.target.value)}
                  placeholder="What's on your mind?"
                  className={`${inputClass} h-[120px] resize-y leading-[1.6]`} />
              </div>
              {status === 'error' && (
                <p className="text-[13px] text-[#A32D2D]">{error}</p>
              )}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full text-[15px] font-medium text-white bg-terracotta px-6 py-[14px] rounded hover:opacity-[0.88] transition-opacity cursor-pointer border-none font-sans disabled:opacity-60"
              >
                {status === 'loading' ? 'Sending…' : 'Send message'}
              </button>
              <p className="text-[12px] text-muted text-center">
                By submitting this form you agree to our{' '}
                <Link href="/privacy" className="text-terracotta no-underline hover:underline">Privacy Policy</Link>.
              </p>
            </form>
          )}
        </div>
      </div>

      {/* TEAM */}
      <div id="team" className="border-b-[0.5px] border-border scroll-mt-16">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-20">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">The team</div>
          <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-dark leading-[1.15] mb-12">
            Two founders.<br />Building in public.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TEAM.map(({ role, name: personName, bio, email: personEmail }) => (
              <div key={personName} className="bg-surface border-[0.5px] border-border rounded-lg p-7">
                <div className="font-mono text-[10px] tracking-[0.06em] text-terracotta uppercase mb-1">{role}</div>
                <div className="font-serif text-[24px] font-normal text-dark mb-3">{personName}</div>
                <p className="text-[14px] text-body leading-[1.7] mb-4">{bio}</p>
                <a href={`mailto:${personEmail}`} className="font-mono text-[12px] text-terracotta no-underline hover:underline">
                  {personEmail}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
