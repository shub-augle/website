import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

const TOC = [
  { id: 'service', label: '1. The Augle service' },
  { id: 'conduct', label: '2. Session conduct and integrity' },
  { id: 'availability', label: '3. Platform availability and service levels' },
  { id: 'ai-outputs', label: '4. AI-generated outputs — understanding and limitations' },
  { id: 'session-history', label: '5. Session history and data' },
  { id: 'third-party', label: '6. Third-party integrations' },
  { id: 'enterprise', label: '7. Enterprise and API access' },
  { id: 'feedback', label: '8. Feedback and beta participation' },
  { id: 'hierarchy', label: '9. Document hierarchy' },
  { id: 'changes', label: '10. Changes to Terms of Service' },
  { id: 'contact', label: '11. Contact' },
];

export default function TermsOfServicePage() {
  return (
    <div className="bg-sand min-h-screen">
      <Nav activeRoute="/company" />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Terms of Service' }]} />

      {/* HEADER */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-[72px]">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-5">Legal</div>
          <h1 className="font-serif text-[36px] lg:text-[56px] font-normal leading-[1.12] tracking-[-0.02em] text-dark mb-5">Terms of Service</h1>
          <div className="flex flex-wrap gap-5 font-mono text-[12px] text-muted">
            <span>Effective Date: April 27, 2026</span>
            <span>·</span>
            <span>Version 1.1</span>
            <span>·</span>
            <span>Questions: <a href="mailto:legal@augle.com" className="text-terracotta no-underline hover:underline">legal@augle.com</a></span>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-16 flex gap-16 items-start">

        {/* SIDEBAR */}
        <div className="hidden xl:block w-[220px] flex-shrink-0 sticky top-[80px]">
          <div className="font-mono text-[10px] tracking-[0.06em] text-muted uppercase mb-4">Contents</div>
          <div className="flex flex-col gap-1">
            {TOC.map(({ id, label }) => (
              <a key={id} href={`#${id}`}
                className="text-[12px] text-body py-[4px] no-underline hover:text-terracotta transition-colors leading-[1.4]">
                {label}
              </a>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t-[0.5px] border-border">
            <div className="font-mono text-[10px] tracking-[0.06em] text-muted uppercase mb-3">Related</div>
            <div className="flex flex-col gap-2">
              <Link href="/terms" className="text-[12px] text-body no-underline hover:text-terracotta transition-colors">Terms & Conditions</Link>
              <Link href="/privacy" className="text-[12px] text-body no-underline hover:text-terracotta transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 min-w-0 max-w-[760px]">

          {/* Intro */}
          <p className="text-[15px] text-body leading-[1.8] mb-6 p-5 bg-surface border-[0.5px] border-border rounded-lg">
            These Terms of Service ("TOS") govern the specific operational terms, service-level expectations, and user responsibilities when accessing and using the Augle Platform. These TOS are incorporated into and should be read together with the Augle Terms and Conditions and Privacy Policy, which together form the complete agreement between you and Augle.
          </p>
          <div className="flex gap-3 flex-wrap mb-10">
            <Link href="/terms" className="font-mono text-[11px] text-terracotta border-[0.5px] border-terracotta rounded px-3 py-[5px] no-underline hover:bg-terracotta hover:text-white transition-colors">Terms & Conditions →</Link>
            <Link href="/privacy" className="font-mono text-[11px] text-body border-[0.5px] border-border rounded px-3 py-[5px] no-underline hover:border-dark transition-colors">Privacy Policy →</Link>
          </div>

          {/* S1 */}
          <section id="service" className="mb-12">
            <h2 className="font-serif text-[24px] font-normal text-dark mb-6 pb-3 border-b-[0.5px] border-border">1. The Augle service</h2>

            <h3 className="font-mono text-[11px] tracking-[0.06em] text-terracotta uppercase mb-2">1.1 Platform overview</h3>
            <p className="text-[14px] text-body leading-[1.8] mb-5">Augle provides a multi-agent AI deliberation service that conducts structured, multi-phase research sessions in response to user-submitted questions. The Platform employs a seven-agent ensemble — the Topic Architect, Cartographer, Methodologist, Guardian, Contrarian, Synthesizer, and Pragmatist — each with a defined role in the deliberation process.</p>

            <h3 className="font-mono text-[11px] tracking-[0.06em] text-terracotta uppercase mb-3">1.2 Session modes</h3>
            <div className="flex flex-col gap-3 mb-5">
              {[
                { label: 'Markets mode', status: 'v1 — Active', body: 'Structured research and analysis for prediction market questions. Optimized for use with Polymarket and Kalshi contracts.' },
                { label: 'Letters & Science mode', status: 'v2 — Forthcoming', body: 'Structured research for academic, institutional, and professional research questions.' },
              ].map(({ label, status, body }) => (
                <div key={label} className="flex gap-3 items-start bg-surface border-[0.5px] border-border rounded-lg p-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[13px] font-medium text-dark">{label}</span>
                      <span className="font-mono text-[10px] text-muted">{status}</span>
                    </div>
                    <p className="text-[13px] text-body leading-[1.6]">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="font-mono text-[11px] tracking-[0.06em] text-terracotta uppercase mb-3">1.3 Session depths</h3>
            <div className="flex flex-col gap-2 mb-5">
              {[
                { depth: 'Rapid', credits: '1 credit', desc: 'Expedited single-phase analysis using the Cartographer and Synthesizer agents. Suitable for fast signal checks.' },
                { depth: 'Standard', credits: '3 credits', desc: 'Full three-phase deliberation using all seven agents. The core Augle experience.' },
                { depth: 'Deep', credits: '6 credits', desc: 'Full three-phase deliberation with extended asynchronous expert interjection. Designed for complex, high-stakes research questions.' },
              ].map(({ depth, credits, desc }) => (
                <div key={depth} className="grid grid-cols-[80px_80px_1fr] gap-3 items-baseline px-4 py-3 bg-surface border-[0.5px] border-border rounded-lg text-[13px]">
                  <span className="font-medium text-dark">{depth}</span>
                  <span className="font-mono text-terracotta">{credits}</span>
                  <span className="text-muted">{desc}</span>
                </div>
              ))}
            </div>

            <h3 className="font-mono text-[11px] tracking-[0.06em] text-terracotta uppercase mb-2">1.4 Beta label</h3>
            <p className="text-[14px] text-body leading-[1.8]">The Platform is currently in beta. Features, agent behavior, and session output formats may change as we continue to develop and improve the service. Augle will provide reasonable notice of material changes.</p>
          </section>

          {/* S2 */}
          <section id="conduct" className="mb-12">
            <h2 className="font-serif text-[24px] font-normal text-dark mb-6 pb-3 border-b-[0.5px] border-border">2. Session conduct and integrity</h2>

            <h3 className="font-mono text-[11px] tracking-[0.06em] text-terracotta uppercase mb-2">2.1 Question submission</h3>
            <p className="text-[14px] text-body leading-[1.8] mb-4">You are responsible for the questions and content you submit to the Platform. Questions must be submitted in good faith for legitimate research purposes. You agree not to submit:</p>
            <ul className="flex flex-col gap-2 mb-5">
              {[
                'Questions designed to elicit outputs that could be used to manipulate markets or defraud third parties',
                'Content that is defamatory, harassing, obscene, or otherwise unlawful',
                'Content that infringes on the intellectual property or privacy rights of any third party',
                'Prompts designed to test, probe, or circumvent the integrity systems of the deliberation engine',
              ].map(item => (
                <li key={item} className="flex gap-3 items-start text-[14px]">
                  <span className="text-terracotta flex-shrink-0">·</span>
                  <span className="text-body leading-[1.7]">{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="font-mono text-[11px] tracking-[0.06em] text-terracotta uppercase mb-2">2.2 Guardian integrity layer</h3>
            <p className="text-[14px] text-body leading-[1.8] mb-5">The Platform includes a Guardian agent that operates as an integrity layer throughout sessions. The Guardian classifies issues as Critical, Moderate, or Informational. Critical flags result in a hard stop and full credit refund. Moderate flags generate inline user-facing notifications with options to interject context or continue. Users acknowledge that the Guardian system may interrupt or affect session continuity based on the content of submitted questions.</p>

            <h3 className="font-mono text-[11px] tracking-[0.06em] text-terracotta uppercase mb-2">2.3 User interjections</h3>
            <p className="text-[14px] text-body leading-[1.8] mb-5">Users may provide additional context to the deliberation ensemble via the Interjection feature at designated phase boundaries or in response to Guardian flags. Interjection content becomes part of the session record and is subject to the same data and licensing terms as submitted questions.</p>

            <h3 className="font-mono text-[11px] tracking-[0.06em] text-terracotta uppercase mb-2">2.4 Session abort</h3>
            <p className="text-[14px] text-body leading-[1.8] mb-5">You may abort a session at any time using the session controls. Credits will be returned in accordance with the refund schedule in the Terms and Conditions (Section 5.5). Aborted sessions are retained in your session history.</p>

            <h3 className="font-mono text-[11px] tracking-[0.06em] text-terracotta uppercase mb-2">2.5 Session outputs</h3>
            <p className="text-[14px] text-body leading-[1.8]">Session outputs are delivered through a structured results interface containing: a Summary, Finding, Confidence Grade, Evidence Map, Unresolved Objections, Pragmatist Recommendation, and suggested Follow-On Questions. Outputs reflect the state of the available evidence at the time of session execution and are not updated post-delivery.</p>
          </section>

          {/* S3 */}
          <section id="availability" className="mb-12">
            <h2 className="font-serif text-[24px] font-normal text-dark mb-6 pb-3 border-b-[0.5px] border-border">3. Platform availability and service levels</h2>
            {[
              { id: '3.1', title: 'Availability', body: 'Augle aims to maintain Platform availability on a commercially reasonable basis. We do not guarantee uninterrupted access or a specific uptime percentage. The Platform may experience downtime for maintenance, updates, or circumstances beyond our reasonable control.' },
              { id: '3.2', title: 'Scheduled maintenance', body: 'We will endeavor to provide advance notice of scheduled maintenance windows that may affect Platform availability. Emergency maintenance may be conducted without advance notice.' },
              { id: '3.3', title: 'Service modifications', body: 'Augle reserves the right to modify, suspend, or discontinue any aspect of the Platform at any time, including agent configurations, session depth options, and credit pricing. Material changes will be communicated to users in advance where feasible.' },
              { id: '3.4', title: 'No service level agreement', body: 'Unless you have a separate written enterprise agreement with Augle, no service level agreement (SLA) applies to your use of the Platform.' },
            ].map(({ id, title, body }) => (
              <div key={id} className="mb-5">
                <h3 className="font-mono text-[11px] tracking-[0.06em] text-terracotta uppercase mb-2">{id} {title}</h3>
                <p className="text-[14px] text-body leading-[1.8]">{body}</p>
              </div>
            ))}
          </section>

          {/* S4 */}
          <section id="ai-outputs" className="mb-12">
            <h2 className="font-serif text-[24px] font-normal text-dark mb-6 pb-3 border-b-[0.5px] border-border">4. AI-generated outputs — understanding and limitations</h2>
            {[
              { id: '4.1', title: 'Nature of AI research', body: "Augle's session outputs are generated by AI agents processing publicly available and user-supplied information. Outputs reflect the state of information available to the agents at the time of session execution. The Platform is not connected to real-time data feeds and does not have access to non-public or proprietary information." },
              { id: '4.2', title: 'Confidence grades', body: "Each session output includes a confidence grade that reflects the strength and quality of available evidence as assessed by the deliberation ensemble. Confidence grades are not guarantees of accuracy. A high-confidence output may still be incorrect. A low-confidence output indicates genuine epistemic uncertainty, not a system failure." },
              { id: '4.3', title: 'Unresolved objections', body: "Strong and moderate Contrarian objections that the deliberation ensemble does not resolve are carried forward to the results output as Unresolved Objections. Users are responsible for reviewing and independently evaluating these objections before acting on session conclusions." },
              { id: '4.4', title: 'Not a substitute for professional judgment', body: "Session outputs are not a substitute for the judgment of licensed financial advisors, attorneys, physicians, or other qualified professionals. No user should take consequential action based solely on Augle session outputs without independent verification and professional consultation where appropriate." },
              { id: '4.5', title: 'Prediction market disclaimer', body: "Research outputs produced in Markets Mode are analytical in nature and do not constitute trading advice, investment recommendations, or market predictions made by Augle, Inc. Participation in prediction markets involves financial risk. You are solely responsible for any trading or financial decisions made in connection with your use of the Platform." },
            ].map(({ id, title, body }) => (
              <div key={id} className="mb-5">
                <h3 className="font-mono text-[11px] tracking-[0.06em] text-terracotta uppercase mb-2">{id} {title}</h3>
                <p className="text-[14px] text-body leading-[1.8]">{body}</p>
              </div>
            ))}
          </section>

          {/* S5 */}
          <section id="session-history" className="mb-12">
            <h2 className="font-serif text-[24px] font-normal text-dark mb-6 pb-3 border-b-[0.5px] border-border">5. Session history and data</h2>
            {[
              { id: '5.1', title: 'Session history', body: "All completed sessions are stored in your account's session history. You may access, re-export, and use session history in accordance with the license granted in the Terms and Conditions." },
              { id: '5.2', title: 'Export', body: 'PDF export of session results is available for paid sessions (Standard and Deep). Free demo sessions do not include PDF export. Export functionality requires an authenticated account.' },
              { id: '5.3', title: 'Resolved contract tracking', body: 'For sessions conducted against prediction market contracts that subsequently resolve, Augle stores the session finding alongside the actual contract outcome. This data is used to build the Platform\'s verifiable accuracy record. By using the Platform for prediction market questions, you consent to this data being collected and used in aggregate, anonymized form for accuracy benchmarking and commercial purposes.' },
              { id: '5.4', title: 'Session deletion', body: 'Individual sessions may be deleted from your history via the account interface. Deletion removes the session from your accessible history. Structured metadata may be retained in anonymized form for calibration and research purposes.' },
            ].map(({ id, title, body }) => (
              <div key={id} className="mb-5">
                <h3 className="font-mono text-[11px] tracking-[0.06em] text-terracotta uppercase mb-2">{id} {title}</h3>
                <p className="text-[14px] text-body leading-[1.8]">{body}</p>
              </div>
            ))}
          </section>

          {/* S6 */}
          <section id="third-party" className="mb-12">
            <h2 className="font-serif text-[24px] font-normal text-dark mb-6 pb-3 border-b-[0.5px] border-border">6. Third-party integrations</h2>
            {[
              { id: '6.1', title: 'Google authentication', body: "The Platform offers Google OAuth as an authentication option. Use of Google authentication is subject to Google's Terms of Service and Privacy Policy. Augle receives only the information necessary to create and maintain your account." },
              { id: '6.2', title: 'Payment processors', body: "Credit purchases are processed through third-party payment processors. Augle does not receive or store full payment card data. Your use of the payment processing service is subject to the applicable processor's terms." },
              { id: '6.3', title: 'Prediction market platforms', body: 'Augle is an independent research tool and has no formal affiliation, partnership, or integration with Polymarket, Kalshi, or any other prediction market platform. Augle does not access your accounts on these platforms and is not responsible for their terms, services, or outcomes.' },
            ].map(({ id, title, body }) => (
              <div key={id} className="mb-5">
                <h3 className="font-mono text-[11px] tracking-[0.06em] text-terracotta uppercase mb-2">{id} {title}</h3>
                <p className="text-[14px] text-body leading-[1.8]">{body}</p>
              </div>
            ))}
          </section>

          {/* S7 */}
          <section id="enterprise" className="mb-12">
            <h2 className="font-serif text-[24px] font-normal text-dark mb-6 pb-3 border-b-[0.5px] border-border">7. Enterprise and API access</h2>
            <h3 className="font-mono text-[11px] tracking-[0.06em] text-terracotta uppercase mb-2">7.1 Current availability</h3>
            <p className="text-[14px] text-body leading-[1.8] mb-5">API access is planned for a future version of the Platform (v2). API access stubs are visible in the current Platform interface but are not yet operational. Augle will publish separate API terms and developer documentation upon launch.</p>
            <h3 className="font-mono text-[11px] tracking-[0.06em] text-terracotta uppercase mb-2">7.2 Enterprise agreements</h3>
            <p className="text-[14px] text-body leading-[1.8]">Enterprise clients seeking high-volume, institutional, or custom access should contact Augle directly at <a href="mailto:business@augle.com" className="text-terracotta no-underline hover:underline">business@augle.com</a>. Enterprise access is subject to separate written agreements.</p>
          </section>

          {/* S8 */}
          <section id="feedback" className="mb-12">
            <h2 className="font-serif text-[24px] font-normal text-dark mb-4 pb-3 border-b-[0.5px] border-border">8. Feedback and beta participation</h2>
            <p className="text-[14px] text-body leading-[1.8]">As a beta-stage Platform, Augle actively welcomes user feedback on session quality, interface design, agent behavior, and overall research utility. Feedback may be submitted via in-platform mechanisms or by contacting <a href="mailto:feedback@augle.com" className="text-terracotta no-underline hover:underline">feedback@augle.com</a>. Feedback submitted by you may be used to improve the Platform without compensation or attribution, as described in the Terms and Conditions.</p>
          </section>

          {/* S9 */}
          <section id="hierarchy" className="mb-12">
            <h2 className="font-serif text-[24px] font-normal text-dark mb-4 pb-3 border-b-[0.5px] border-border">9. Document hierarchy</h2>
            <p className="text-[14px] text-body leading-[1.8] mb-4">These Terms of Service are part of a suite of legal documents governing your use of the Platform. In the event of a conflict:</p>
            <div className="flex flex-col divide-y-[0.5px] divide-border border-[0.5px] border-border rounded-lg overflow-hidden">
              {[
                ['Terms & Conditions', 'Govern matters of general contract, intellectual property, payments, liability, and dispute resolution.', '/terms'],
                ['Privacy Policy', 'Govern all matters related to data collection, use, storage, and user rights.', '/privacy'],
                ['Terms of Service', 'Govern specific operational matters related to session conduct, service availability, and AI output understanding.', '/terms-of-service'],
              ].map(([label, desc, href]) => (
                <div key={label as string} className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-3 px-5 py-4">
                  <Link href={href as string} className="font-mono text-[11px] text-terracotta no-underline hover:underline pt-[2px]">{label}</Link>
                  <span className="text-[13px] text-body leading-[1.6]">{desc}</span>
                </div>
              ))}
            </div>
            <p className="text-[13px] text-muted leading-[1.7] mt-4">In case of conflict between these documents, the Terms and Conditions shall take precedence unless a specific provision in these Terms of Service expressly supersedes it.</p>
          </section>

          {/* S10 */}
          <section id="changes" className="mb-12">
            <h2 className="font-serif text-[24px] font-normal text-dark mb-4 pb-3 border-b-[0.5px] border-border">10. Changes to Terms of Service</h2>
            <p className="text-[14px] text-body leading-[1.8]">Augle may update these Terms of Service from time to time. We will provide notice of material changes by posting the updated document on the Platform and updating the effective date. Continued use of the Platform after the effective date constitutes acceptance of the revised Terms of Service.</p>
          </section>

          {/* S11 */}
          <section id="contact" className="mb-4">
            <h2 className="font-serif text-[24px] font-normal text-dark mb-4 pb-3 border-b-[0.5px] border-border">11. Contact</h2>
            <p className="text-[14px] text-body leading-[1.8] mb-5">For questions regarding these Terms of Service:</p>
            <div className="bg-surface border-[0.5px] border-border rounded-lg overflow-hidden">
              {[
                ['Company', 'Augle, Inc.'],
                ['General inquiries', 'legal@augle.com'],
                ['Enterprise and API', 'business@augle.com'],
                ['Feedback', 'feedback@augle.com'],
                ['Website', 'augle.com'],
                ['Last updated', 'April 27, 2026'],
              ].map(([key, val]) => (
                <div key={key} className="flex items-center justify-between px-5 py-3 border-b-[0.5px] border-border last:border-0">
                  <span className="font-mono text-[11px] text-muted">{key}</span>
                  <span className="text-[13px] text-dark">
                    {(val as string).includes('@') ? <a href={`mailto:${val}`} className="text-terracotta no-underline hover:underline">{val}</a> : val}
                  </span>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>

      <Footer />
    </div>
  );
}
