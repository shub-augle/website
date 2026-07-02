import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

const TOC = [
  { id: 'acceptance', label: '1. Acceptance of terms' },
  { id: 'description', label: '2. Description of service' },
  { id: 'eligibility', label: '3. Eligibility' },
  { id: 'account', label: '4. Account registration' },
  { id: 'credits', label: '5. Credits, payments & refunds' },
  { id: 'acceptable-use', label: '6. Acceptable use' },
  { id: 'ip', label: '7. Intellectual property' },
  { id: 'disclaimers', label: '8. Disclaimers' },
  { id: 'liability', label: '9. Limitation of liability' },
  { id: 'indemnification', label: '10. Indemnification' },
  { id: 'termination', label: '11. Termination' },
  { id: 'modifications', label: '12. Modifications to terms' },
  { id: 'governing-law', label: '13. Governing law & dispute resolution' },
  { id: 'general', label: '14. General provisions' },
  { id: 'contact', label: '15. Contact' },
];

const CREDIT_BUNDLES = [
  { bundle: '10 credits', price: '$2.00', per: '$0.20 / credit' },
  { bundle: '30 credits', price: '$5.40', per: '$0.18 / credit' },
  { bundle: '50 credits', price: '$8.00', per: '$0.16 / credit' },
];

const REFUND_SCHEDULE = [
  { trigger: 'Low confidence / Insufficient finding — Rapid', refund: 'Full refund (1 credit)' },
  { trigger: 'Low confidence / Insufficient finding — Standard', refund: '2 of 3 credits returned' },
  { trigger: 'Low confidence / Insufficient finding — Deep', refund: '4 of 6 credits returned' },
  { trigger: 'User-aborted session with no active flag', refund: 'Same schedule as above' },
  { trigger: 'User-aborted session with active Critical flag', refund: 'Full refund (all credits) — Augle absorbs this cost' },
  { trigger: 'User-aborted session with active Moderate flag', refund: 'Same schedule as low-confidence' },
];

export default function TermsPage() {
  return (
    <div className="bg-sand min-h-screen">
      <Nav activeRoute="/about" />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Terms & Conditions' }]} />

      {/* HEADER */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-[72px]">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-5">Legal</div>
          <h1 className="font-serif text-[36px] lg:text-[56px] font-normal leading-[1.12] tracking-[-0.02em] text-dark mb-5">Terms & Conditions</h1>
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
              <Link href="/privacy" className="text-[12px] text-body no-underline hover:text-terracotta transition-colors">Privacy Policy</Link>
              <Link href="/terms-of-service" className="text-[12px] text-body no-underline hover:text-terracotta transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 min-w-0 max-w-[760px]">

          {/* Intro */}
          <p className="text-[15px] text-body leading-[1.8] mb-10 p-5 bg-surface border-[0.5px] border-border rounded-lg">
            These Terms and Conditions ("Terms") govern your access to and use of the Augle platform, including the Augle website, web application, mobile application, APIs, and all associated services (collectively, the "Platform"), operated by Augle, Inc. ("Augle," "we," "us," or "our"). By creating an account, accessing, or using the Platform in any way, you agree to be bound by these Terms.
          </p>

          {/* S1 */}
          <section id="acceptance" className="mb-12">
            <h2 className="font-serif text-[24px] font-normal text-dark mb-4 pb-3 border-b-[0.5px] border-border">1. Acceptance of terms</h2>
            <p className="text-[14px] text-body leading-[1.8] mb-3">By creating an account, accessing, or using the Platform in any way, you ("User" or "you") agree to be bound by these Terms. If you do not agree to these Terms, you must not access or use the Platform.</p>
            <p className="text-[14px] text-body leading-[1.8]">If you are accessing the Platform on behalf of an organization, you represent and warrant that you have authority to bind that organization to these Terms.</p>
          </section>

          {/* S2 */}
          <section id="description" className="mb-12">
            <h2 className="font-serif text-[24px] font-normal text-dark mb-4 pb-3 border-b-[0.5px] border-border">2. Description of service</h2>
            <p className="text-[14px] text-body leading-[1.8] mb-4">Augle is a multi-agent AI deliberation platform that employs a structured ensemble of AI agents to conduct in-depth research and analysis of questions submitted by Users. The Platform currently offers two product modes:</p>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Markets mode', status: 'v1 — Active', body: 'Research and analysis focused on prediction market questions from platforms such as Polymarket and Kalshi.' },
                { label: 'Letters & Science mode', status: 'v2 — Forthcoming', body: 'Research and analysis focused on academic, professional, and institutional research questions.' },
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
            <p className="text-[14px] text-muted leading-[1.7] mt-4">Sessions are conducted through a seven-agent ensemble operating across three structured deliberation phases. Session outputs are for informational and research purposes only.</p>
          </section>

          {/* S3 */}
          <section id="eligibility" className="mb-12">
            <h2 className="font-serif text-[24px] font-normal text-dark mb-4 pb-3 border-b-[0.5px] border-border">3. Eligibility</h2>
            <p className="text-[14px] text-body leading-[1.8] mb-4">To use Augle, you must:</p>
            <ul className="flex flex-col gap-2 mb-4">
              {['Be at least 18 years of age', 'Have the legal capacity to enter into binding contracts', 'Not be located in a jurisdiction where use of AI research tools or prediction market analysis is prohibited', 'Not be a person or entity subject to applicable sanctions programs'].map(item => (
                <li key={item} className="flex gap-3 items-start text-[14px]">
                  <span className="text-terracotta flex-shrink-0">·</span>
                  <span className="text-body leading-[1.7]">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-[14px] text-muted leading-[1.7]">Augle reserves the right to refuse service to any person or entity at its sole discretion.</p>
          </section>

          {/* S4 */}
          <section id="account" className="mb-12">
            <h2 className="font-serif text-[24px] font-normal text-dark mb-6 pb-3 border-b-[0.5px] border-border">4. Account registration</h2>
            {[
              { id: '4.1', title: 'Account creation', body: 'To access paid features of the Platform, you must create an account by providing a display name, valid email address, and password, or by authenticating through a supported third-party provider (e.g., Google OAuth). You are responsible for maintaining the confidentiality of your login credentials.' },
              { id: '4.2', title: 'Account accuracy', body: 'You agree to provide accurate and complete information during registration and to keep your account information current. Augle is not liable for any loss or damage arising from your failure to maintain accurate account information.' },
              { id: '4.3', title: 'Account security', body: 'You are solely responsible for all activities that occur under your account. You must notify Augle immediately at legal@augle.com if you suspect unauthorized access to your account. Augle reserves the right to suspend or terminate accounts that appear to be compromised.' },
              { id: '4.4', title: 'One account per user', body: 'You may not create multiple accounts for the purpose of circumventing Platform limits, credits policies, or free session entitlements. Augle reserves the right to merge or terminate duplicate accounts.' },
            ].map(({ id, title, body }) => (
              <div key={id} className="mb-5">
                <h3 className="font-mono text-[11px] tracking-[0.06em] text-terracotta uppercase mb-2">{id} {title}</h3>
                <p className="text-[14px] text-body leading-[1.8]">{body}</p>
              </div>
            ))}
          </section>

          {/* S5 */}
          <section id="credits" className="mb-12">
            <h2 className="font-serif text-[24px] font-normal text-dark mb-6 pb-3 border-b-[0.5px] border-border">5. Credits, payments & refunds</h2>

            <h3 className="font-mono text-[11px] tracking-[0.06em] text-terracotta uppercase mb-3">5.1 Credit system</h3>
            <p className="text-[14px] text-body leading-[1.8] mb-4">The Platform operates on a prepaid credit system. Credits are purchased in bundles and consumed per session based on the selected depth:</p>
            <div className="flex flex-col gap-2 mb-6">
              {[
                { depth: 'Rapid', credits: '1 credit', desc: 'Single-phase exploration — Cartographer and Synthesizer agents only.' },
                { depth: 'Standard', credits: '3 credits', desc: 'Full three-phase deliberation with the complete seven-agent ensemble.' },
                { depth: 'Deep', credits: '6 credits', desc: 'Full deliberation plus extended expert interjection analysis.' },
              ].map(({ depth, credits, desc }) => (
                <div key={depth} className="grid grid-cols-[80px_80px_1fr] gap-3 items-baseline px-4 py-3 bg-surface border-[0.5px] border-border rounded-lg text-[13px]">
                  <span className="font-medium text-dark">{depth}</span>
                  <span className="font-mono text-terracotta">{credits}</span>
                  <span className="text-muted">{desc}</span>
                </div>
              ))}
            </div>

            <h3 className="font-mono text-[11px] tracking-[0.06em] text-terracotta uppercase mb-3">5.2 Credit bundles</h3>
            <div className="flex flex-col divide-y-[0.5px] divide-border border-[0.5px] border-border rounded-lg overflow-hidden mb-6">
              <div className="grid grid-cols-3 gap-4 px-5 py-3 bg-[#EAE6DC]">
                {['Bundle', 'Price', 'Per credit'].map(h => (
                  <span key={h} className="font-mono text-[10px] text-muted uppercase">{h}</span>
                ))}
              </div>
              {CREDIT_BUNDLES.map(({ bundle, price, per }) => (
                <div key={bundle} className="grid grid-cols-3 gap-4 px-5 py-3">
                  <span className="text-[13px] font-medium text-dark">{bundle}</span>
                  <span className="text-[13px] text-dark">{price}</span>
                  <span className="font-mono text-[12px] text-muted">{per}</span>
                </div>
              ))}
            </div>

            <h3 className="font-mono text-[11px] tracking-[0.06em] text-terracotta uppercase mb-2">5.3 Credit expiration</h3>
            <p className="text-[14px] text-body leading-[1.8] mb-5">Credits do not expire and are not subject to any recurring charges. Purchased credits are associated with your account and are non-transferable.</p>

            <h3 className="font-mono text-[11px] tracking-[0.06em] text-terracotta uppercase mb-2">5.4 Free sessions</h3>
            <p className="text-[14px] text-body leading-[1.8] mb-5">New Users are entitled to one (1) free Standard-depth session upon first use of the Platform. Free sessions are limited to one per user account. Augle reserves the right to modify or discontinue the free session offer at any time.</p>

            <h3 className="font-mono text-[11px] tracking-[0.06em] text-terracotta uppercase mb-3">5.5 Refund policy</h3>
            <p className="text-[14px] text-body leading-[1.8] mb-4">Credits are automatically returned to your account balance in the following circumstances:</p>
            <div className="flex flex-col divide-y-[0.5px] divide-border border-[0.5px] border-border rounded-lg overflow-hidden mb-4">
              {REFUND_SCHEDULE.map(({ trigger, refund }) => (
                <div key={trigger} className="grid grid-cols-1 md:grid-cols-[1fr_180px] gap-2 px-5 py-3">
                  <span className="text-[13px] text-body">{trigger}</span>
                  <span className="font-mono text-[11px] text-terracotta md:text-right">{refund}</span>
                </div>
              ))}
            </div>
            <p className="text-[13px] text-muted leading-[1.6] mb-5">Credits returned under this policy are credited to your account balance. No cash refunds are issued for purchased credits except where required by applicable law.</p>

            <h3 className="font-mono text-[11px] tracking-[0.06em] text-terracotta uppercase mb-2">5.6 Payment processing</h3>
            <p className="text-[14px] text-body leading-[1.8] mb-5">All payment transactions are processed by third-party payment processors. Augle does not store full payment card information. By providing payment information, you agree to the applicable payment processor's terms and conditions.</p>

            <h3 className="font-mono text-[11px] tracking-[0.06em] text-terracotta uppercase mb-2">5.7 Taxes</h3>
            <p className="text-[14px] text-body leading-[1.8]">You are responsible for all applicable taxes associated with your purchase of credits, except where Augle is required by law to collect and remit such taxes.</p>
          </section>

          {/* S6 */}
          <section id="acceptable-use" className="mb-12">
            <h2 className="font-serif text-[24px] font-normal text-dark mb-6 pb-3 border-b-[0.5px] border-border">6. Acceptable use</h2>
            <h3 className="font-mono text-[11px] tracking-[0.06em] text-terracotta uppercase mb-2">6.1 Permitted use</h3>
            <p className="text-[14px] text-body leading-[1.8] mb-5">You may use the Platform for lawful research, analysis, and informational purposes. You agree to use the Platform in accordance with these Terms and all applicable laws and regulations.</p>
            <h3 className="font-mono text-[11px] tracking-[0.06em] text-terracotta uppercase mb-3">6.2 Prohibited conduct</h3>
            <p className="text-[14px] text-body leading-[1.8] mb-4">You agree not to:</p>
            <ul className="flex flex-col gap-2">
              {[
                'Use the Platform for any unlawful purpose or in violation of any applicable regulations',
                'Attempt to reverse-engineer, decompile, disassemble, or otherwise derive source code or agent architectures from the Platform',
                'Use automated scripts, bots, or other methods to create accounts, submit sessions, or manipulate Platform metrics',
                'Attempt to circumvent any access controls, security measures, or rate limits',
                'Use the Platform to generate research outputs intended to manipulate prediction market prices or defraud other market participants',
                "Represent Augle's AI-generated research outputs as the work of a licensed financial advisor, attorney, physician, or other regulated professional",
                'Reproduce, distribute, or commercially exploit session outputs in bulk without express written permission from Augle',
                'Upload, submit, or transmit malicious code, harmful content, or material that violates third-party intellectual property rights',
                "Attempt to access other users' accounts, session data, or private information",
                'Interfere with or disrupt the integrity or performance of the Platform or its underlying systems',
              ].map(item => (
                <li key={item} className="flex gap-3 items-start text-[14px]">
                  <span className="text-terracotta flex-shrink-0">·</span>
                  <span className="text-body leading-[1.7]">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* S7 */}
          <section id="ip" className="mb-12">
            <h2 className="font-serif text-[24px] font-normal text-dark mb-6 pb-3 border-b-[0.5px] border-border">7. Intellectual property</h2>
            {[
              { id: '7.1', title: 'Augle platform', body: "The Platform, including its software, agent architecture, design, branding, trademarks, logos, and all associated technology, is the exclusive intellectual property of Augle, Inc. and its licensors. Nothing in these Terms transfers any ownership rights to you." },
              { id: '7.2', title: 'Session outputs', body: "Augle grants you a limited, non-exclusive, non-transferable, revocable license to use session outputs generated on your account for personal research and informational purposes. This license does not include the right to resell, republish, or commercially distribute session outputs." },
              { id: '7.3', title: 'User-submitted content', body: "By submitting questions or interjections into the Platform, you grant Augle a worldwide, royalty-free, perpetual, irrevocable, sublicensable license to use, store, process, analyze, and exploit your submitted content — including in combination with AI-generated session outputs, evidence nodes, confidence grades, and deliberation records — for any lawful purpose. This includes: (a) operating and improving the Platform; (b) training, fine-tuning, and evaluating AI models by Augle or its licensees; (c) building, maintaining, and commercially licensing structured research and reasoning datasets to third parties; and (d) publishing aggregated or anonymized findings derived from session content. Augle will not attribute session content to you personally in any commercial or public use without your separate consent." },
              { id: '7.4', title: 'Feedback', body: 'Any feedback, suggestions, or ideas you provide regarding the Platform may be used by Augle without restriction, compensation, or attribution to you.' },
            ].map(({ id, title, body }) => (
              <div key={id} className="mb-5">
                <h3 className="font-mono text-[11px] tracking-[0.06em] text-terracotta uppercase mb-2">{id} {title}</h3>
                <p className="text-[14px] text-body leading-[1.8]">{body}</p>
              </div>
            ))}
          </section>

          {/* S8 */}
          <section id="disclaimers" className="mb-12">
            <h2 className="font-serif text-[24px] font-normal text-dark mb-6 pb-3 border-b-[0.5px] border-border">8. Disclaimers</h2>
            <div className="bg-[#FBF5F2] border-[0.5px] border-terracotta rounded-lg p-5 mb-6">
              <p className="font-mono text-[12px] text-dark leading-[1.7] uppercase tracking-wide">
                Augle is a research and analysis tool. Nothing on the Platform constitutes financial advice, investment advice, legal advice, medical advice, or any other form of professional advice. Session outputs are provided for informational purposes only. You should not rely on Augle outputs as the basis for any financial, legal, medical, or other consequential decisions without independent professional consultation.
              </p>
            </div>
            {[
              { id: '8.2', title: 'No warranty', body: 'THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, ACCURACY, OR NON-INFRINGEMENT. AUGLE DOES NOT WARRANT THAT THE PLATFORM WILL BE UNINTERRUPTED, ERROR-FREE, OR THAT ANY PARTICULAR RESEARCH OUTPUT WILL BE ACCURATE OR RELIABLE.' },
              { id: '8.3', title: 'AI limitations', body: "AI-generated research outputs may contain errors, omissions, or outdated information. Augle's deliberation engine is designed to surface uncertainty and calibrate confidence, but it cannot guarantee accuracy. You acknowledge and accept the inherent limitations of AI-generated analysis." },
              { id: '8.4', title: 'Prediction market disclaimer', body: 'Augle does not operate any prediction market and is not affiliated with Polymarket, Kalshi, or any other prediction market platform. Use of Augle\'s research outputs in connection with prediction market participation is at your sole risk.' },
            ].map(({ id, title, body }) => (
              <div key={id} className="mb-5">
                <h3 className="font-mono text-[11px] tracking-[0.06em] text-terracotta uppercase mb-2">{id} {title}</h3>
                <p className="text-[14px] text-body leading-[1.8]">{body}</p>
              </div>
            ))}
          </section>

          {/* S9 */}
          <section id="liability" className="mb-12">
            <h2 className="font-serif text-[24px] font-normal text-dark mb-4 pb-3 border-b-[0.5px] border-border">9. Limitation of liability</h2>
            <p className="text-[14px] text-body leading-[1.8] mb-4">TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, AUGLE, INC., ITS OFFICERS, DIRECTORS, EMPLOYEES, CONTRACTORS, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, LOSS OF DATA, LOSS OF GOODWILL, OR BUSINESS INTERRUPTION, ARISING FROM OR IN CONNECTION WITH YOUR USE OF OR INABILITY TO USE THE PLATFORM, EVEN IF AUGLE HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>
            <p className="text-[14px] text-body leading-[1.8]">IN NO EVENT SHALL AUGLE'S TOTAL AGGREGATE LIABILITY TO YOU FOR ANY CLAIM ARISING FROM OR RELATED TO THESE TERMS OR THE PLATFORM EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID TO AUGLE IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR (B) ONE HUNDRED U.S. DOLLARS ($100).</p>
          </section>

          {/* S10 */}
          <section id="indemnification" className="mb-12">
            <h2 className="font-serif text-[24px] font-normal text-dark mb-4 pb-3 border-b-[0.5px] border-border">10. Indemnification</h2>
            <p className="text-[14px] text-body leading-[1.8]">You agree to indemnify, defend, and hold harmless Augle, Inc. and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable attorneys' fees) arising out of or in connection with: (a) your use of the Platform; (b) your violation of these Terms; (c) your violation of any third-party rights; or (d) any content you submit to the Platform.</p>
          </section>

          {/* S11 */}
          <section id="termination" className="mb-12">
            <h2 className="font-serif text-[24px] font-normal text-dark mb-6 pb-3 border-b-[0.5px] border-border">11. Termination</h2>
            {[
              { id: '11.1', title: 'By you', body: 'You may terminate your account at any time by selecting the account deletion option in your account settings (Danger Zone). Upon deletion, your personal data will be handled in accordance with our Privacy Policy.' },
              { id: '11.2', title: 'By Augle', body: "Augle reserves the right to suspend or terminate your account and access to the Platform at any time, with or without notice, for any violation of these Terms or for any other reason at Augle's sole discretion." },
              { id: '11.3', title: 'Effect of termination', body: 'Upon termination, your right to access the Platform ceases immediately. Unused credits are non-refundable upon termination for cause. Sections 7, 8, 9, 10, and 13 shall survive termination.' },
            ].map(({ id, title, body }) => (
              <div key={id} className="mb-5">
                <h3 className="font-mono text-[11px] tracking-[0.06em] text-terracotta uppercase mb-2">{id} {title}</h3>
                <p className="text-[14px] text-body leading-[1.8]">{body}</p>
              </div>
            ))}
          </section>

          {/* S12 */}
          <section id="modifications" className="mb-12">
            <h2 className="font-serif text-[24px] font-normal text-dark mb-4 pb-3 border-b-[0.5px] border-border">12. Modifications to terms</h2>
            <p className="text-[14px] text-body leading-[1.8]">Augle reserves the right to modify these Terms at any time. We will provide notice of material changes by posting the updated Terms on the Platform and updating the effective date. Your continued use of the Platform after the effective date of any modification constitutes your acceptance of the modified Terms.</p>
          </section>

          {/* S13 */}
          <section id="governing-law" className="mb-12">
            <h2 className="font-serif text-[24px] font-normal text-dark mb-6 pb-3 border-b-[0.5px] border-border">13. Governing law & dispute resolution</h2>
            {[
              { id: '13.1', title: 'Governing law', body: 'These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions.' },
              { id: '13.2', title: 'Informal resolution', body: 'Before initiating any formal dispute, you agree to contact Augle at legal@augle.com to attempt to resolve the matter informally within thirty (30) days.' },
              { id: '13.3', title: 'Arbitration', body: 'Any unresolved dispute arising from or related to these Terms shall be resolved through binding arbitration administered by the American Arbitration Association (AAA) under its Consumer Arbitration Rules, except as noted in Section 13.4.' },
              { id: '13.4', title: 'Exceptions to arbitration', body: 'Either party may seek injunctive or other equitable relief in a court of competent jurisdiction to prevent irreparable harm, without waiving the right to arbitrate underlying claims.' },
              { id: '13.5', title: 'Class action waiver', body: 'YOU WAIVE ANY RIGHT TO PARTICIPATE IN A CLASS ACTION LAWSUIT OR CLASS-WIDE ARBITRATION AGAINST AUGLE.' },
            ].map(({ id, title, body }) => (
              <div key={id} className="mb-5">
                <h3 className="font-mono text-[11px] tracking-[0.06em] text-terracotta uppercase mb-2">{id} {title}</h3>
                <p className="text-[14px] text-body leading-[1.8]">{body}</p>
              </div>
            ))}
          </section>

          {/* S14 */}
          <section id="general" className="mb-12">
            <h2 className="font-serif text-[24px] font-normal text-dark mb-6 pb-3 border-b-[0.5px] border-border">14. General provisions</h2>
            {[
              { id: '14.1', title: 'Entire agreement', body: 'These Terms, together with the Privacy Policy and Terms of Service, constitute the entire agreement between you and Augle regarding your use of the Platform.' },
              { id: '14.2', title: 'Severability', body: 'If any provision of these Terms is found to be unenforceable, that provision shall be modified to the minimum extent necessary to make it enforceable, and the remaining provisions shall continue in full force and effect.' },
              { id: '14.3', title: 'No waiver', body: "Augle's failure to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision." },
              { id: '14.4', title: 'Assignment', body: "You may not assign your rights or obligations under these Terms without Augle's prior written consent. Augle may assign these Terms in connection with a merger, acquisition, or sale of assets." },
            ].map(({ id, title, body }) => (
              <div key={id} className="mb-5">
                <h3 className="font-mono text-[11px] tracking-[0.06em] text-terracotta uppercase mb-2">{id} {title}</h3>
                <p className="text-[14px] text-body leading-[1.8]">{body}</p>
              </div>
            ))}
          </section>

          {/* S15 */}
          <section id="contact" className="mb-4">
            <h2 className="font-serif text-[24px] font-normal text-dark mb-4 pb-3 border-b-[0.5px] border-border">15. Contact</h2>
            <p className="text-[14px] text-body leading-[1.8] mb-5">For questions regarding these Terms, please contact:</p>
            <div className="bg-surface border-[0.5px] border-border rounded-lg overflow-hidden">
              {[
                ['Company', 'Augle, Inc.'],
                ['Legal inquiries', 'legal@augle.com'],
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
