import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

const TOC = [
  { id: 'information-we-collect', label: '1. Information we collect' },
  { id: 'how-we-use', label: '2. How we use your information' },
  { id: 'how-we-share', label: '3. How we share your information' },
  { id: 'data-retention', label: '4. Data retention' },
  { id: 'your-rights', label: '5. Your rights and choices' },
  { id: 'cookies', label: '6. Cookies and tracking technologies' },
  { id: 'data-security', label: '7. Data security' },
  { id: 'childrens-privacy', label: '8. Children\'s privacy' },
  { id: 'third-party', label: '9. Third-party links and services' },
  { id: 'changes', label: '10. Changes to this policy' },
  { id: 'contact', label: '11. Contact us' },
];

export default function PrivacyPage() {
  return (
    <div className="bg-sand min-h-screen">
      <Nav activeRoute="/about" />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} />

      {/* HEADER */}
      <div className="border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-[72px]">
          <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-5">Legal</div>
          <h1 className="font-serif text-[36px] lg:text-[56px] font-normal leading-[1.12] tracking-[-0.02em] text-dark mb-5">Privacy Policy</h1>
          <div className="flex flex-wrap gap-5 font-mono text-[12px] text-muted">
            <span>Effective Date: April 27, 2026</span>
            <span>·</span>
            <span>Version 1.1</span>
            <span>·</span>
            <span>Questions: <a href="mailto:privacy@augle.com" className="text-terracotta no-underline hover:underline">privacy@augle.com</a></span>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-16 flex gap-16 items-start">

        {/* SIDEBAR TOC */}
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
              <Link href="/terms-of-service" className="text-[12px] text-body no-underline hover:text-terracotta transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 min-w-0 max-w-[760px]">

          {/* Intro */}
          <p className="text-[15px] text-body leading-[1.8] mb-10 p-5 bg-surface border-[0.5px] border-border rounded-lg">
            Augle, Inc. ("Augle," "we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you use the Augle platform ("Platform"). By using the Platform, you consent to the practices described in this Policy.
          </p>

          {/* Section 1 */}
          <section id="information-we-collect" className="mb-12">
            <h2 className="font-serif text-[24px] font-normal text-dark mb-6 pb-3 border-b-[0.5px] border-border">1. Information we collect</h2>

            <h3 className="font-mono text-[11px] tracking-[0.06em] text-terracotta uppercase mb-3">1.1 Information you provide</h3>
            <p className="text-[14px] text-body leading-[1.8] mb-4">When you create an account or use the Platform, we collect:</p>
            <ul className="flex flex-col gap-3 mb-8">
              {[
                ['Display name', 'A single display name field used to identify you within the Platform. Your first initial is used for your account avatar.'],
                ['Email address', 'Used for account authentication, email verification, and Platform communications.'],
                ['Password', 'Stored in hashed, encrypted form. We never store plaintext passwords.'],
                ['Authentication data', 'If you use Google OAuth or another third-party provider, we receive basic profile information (name, email) from that provider.'],
                ['Session questions and interjections', 'The research questions you submit and any context or interjection text you provide during sessions.'],
                ['Payment information', 'Credit card or payment data processed by our third-party payment processor. Augle does not store full card numbers, CVVs, or bank account details.'],
              ].map(([term, def]) => (
                <li key={term as string} className="flex gap-3 items-start text-[14px]">
                  <span className="text-terracotta flex-shrink-0 mt-[2px]">·</span>
                  <span className="text-body leading-[1.7]"><span className="font-medium text-dark">{term}:</span> {def}</span>
                </li>
              ))}
            </ul>

            <h3 className="font-mono text-[11px] tracking-[0.06em] text-terracotta uppercase mb-3">1.2 Information automatically collected</h3>
            <p className="text-[14px] text-body leading-[1.8] mb-4">We automatically collect certain technical information when you use the Platform:</p>
            <ul className="flex flex-col gap-3 mb-6">
              {[
                ['Log data', 'IP address, browser type and version, operating system, referring URLs, pages visited, and timestamps.'],
                ['Device information', 'Device type, screen resolution, and general hardware identifiers.'],
                ['Session metadata', 'Session depth, credits consumed, session status, phase outcomes, flag classifications, and confidence grades.'],
                ['Usage analytics', 'Feature interactions, navigation paths, and engagement patterns used to improve the Platform.'],
                ['Cookies and similar technologies', 'See Section 6 for details.'],
                ['Device fingerprint', 'For users accessing the Platform without an account (guest sessions), we collect a hashed device fingerprint derived from browser type, operating system, screen resolution, and graphics renderer. This fingerprint is used solely to enforce one free session per device per 24-hour period and to prevent abuse of the free session entitlement. Device fingerprint data is not linked to your personal identity, is not sold or shared with third parties, and is not used for advertising purposes.'],
              ].map(([term, def]) => (
                <li key={term as string} className="flex gap-3 items-start text-[14px]">
                  <span className="text-terracotta flex-shrink-0 mt-[2px]">·</span>
                  <span className="text-body leading-[1.7]"><span className="font-medium text-dark">{term}:</span> {def}</span>
                </li>
              ))}
            </ul>

            <h3 className="font-mono text-[11px] tracking-[0.06em] text-terracotta uppercase mb-3">1.3 Research output data</h3>
            <p className="text-[14px] text-body leading-[1.8] mb-6">Augle's deliberation engine produces structured research outputs including evidence nodes, agent findings, confidence grades, flag classifications, and Synthesizer conclusions. This structured data is associated with your account and session history.</p>

            <h3 className="font-mono text-[11px] tracking-[0.06em] text-terracotta uppercase mb-3">1.4 Accuracy and calibration data</h3>
            <p className="text-[14px] text-body leading-[1.8]">For sessions conducted against prediction market contracts that subsequently resolve, we store the Augle deliberation finding alongside the actual contract outcome. This calibration record — matched finding against ground truth — is one of Augle's core data assets. It is used to measure and improve the accuracy of the deliberation engine, to publish accuracy benchmarks, and may be commercially licensed to third parties as part of Augle's structured reasoning corpus. Calibration records are de-identified before any commercial use or external disclosure. By submitting a prediction market question and running a session, you consent to this data being collected, stored, and used as described.</p>
          </section>

          {/* Section 2 */}
          <section id="how-we-use" className="mb-12">
            <h2 className="font-serif text-[24px] font-normal text-dark mb-6 pb-3 border-b-[0.5px] border-border">2. How we use your information</h2>

            <h3 className="font-mono text-[11px] tracking-[0.06em] text-terracotta uppercase mb-3">2.1 Platform operation</h3>
            <ul className="flex flex-col gap-2 mb-6">
              {['Creating and managing your account', 'Processing session requests and delivering research outputs', 'Managing your credit balance and processing transactions', 'Storing your session history for retrieval and re-export', 'Delivering email verification and account security communications'].map(item => (
                <li key={item} className="flex gap-3 items-start text-[14px]">
                  <span className="text-terracotta flex-shrink-0">·</span>
                  <span className="text-body leading-[1.7]">{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="font-mono text-[11px] tracking-[0.06em] text-terracotta uppercase mb-3">2.2 Data asset development and commercial use</h3>
            <p className="text-[14px] text-body leading-[1.8] mb-4">Augle's long-term value as a company is grounded in the structured research and reasoning dataset produced as a byproduct of Platform operation. By using the Platform, you acknowledge and consent to the following uses of session data (excluding personally identifying information):</p>
            <ul className="flex flex-col gap-2 mb-4">
              {[
                'Training, fine-tuning, and evaluating AI models — by Augle or by third parties who license the dataset from Augle',
                'Building and maintaining a structured multi-agent reasoning corpus — comprising session questions, agent deliberations, evidence node classifications, confidence grades, Guardian flag records, and finding outcomes — for internal research and external licensing',
                'Commercially licensing the reasoning corpus or calibration dataset, in whole or in part, to AI laboratories, enterprise clients, academic institutions, government agencies, or other third parties',
                'Publishing accuracy benchmarks, calibration analyses, and platform performance metrics derived from session data in aggregated or anonymized form',
                'Using session data as training input for proprietary or licensed AI reasoning models, including models developed by Augle or its commercial partners',
              ].map(item => (
                <li key={item} className="flex gap-3 items-start text-[14px]">
                  <span className="text-terracotta flex-shrink-0">·</span>
                  <span className="text-body leading-[1.7]">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-[14px] text-body leading-[1.8] mb-6 p-4 bg-surface border-[0.5px] border-border rounded-lg">
              Session data used for these purposes is stripped of direct personal identifiers (name, email, account ID) before use or disclosure. The research questions you submit and the structured outputs generated from them are treated as platform-generated research data, not as personal data, once de-identified.
            </p>

            <h3 className="font-mono text-[11px] tracking-[0.06em] text-terracotta uppercase mb-3">2.3 Communications</h3>
            <ul className="flex flex-col gap-2 mb-4">
              {['Sending transactional emails (account verification, credit receipts, session confirmations)', 'Sending product updates, feature announcements, and policy change notifications', 'Responding to support inquiries and feedback submissions'].map(item => (
                <li key={item} className="flex gap-3 items-start text-[14px]">
                  <span className="text-terracotta flex-shrink-0">·</span>
                  <span className="text-body leading-[1.7]">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-[14px] text-muted leading-[1.7] mb-6">You may opt out of non-transactional communications at any time using the unsubscribe link in any email or by contacting <a href="mailto:privacy@augle.com" className="text-terracotta no-underline hover:underline">privacy@augle.com</a>.</p>

            <h3 className="font-mono text-[11px] tracking-[0.06em] text-terracotta uppercase mb-3">2.4 Legal and safety</h3>
            <ul className="flex flex-col gap-2">
              {['Complying with applicable laws and legal processes', 'Investigating and preventing fraud, abuse, and violations of our Terms', 'Protecting the rights, safety, and property of Augle, our users, and the public'].map(item => (
                <li key={item} className="flex gap-3 items-start text-[14px]">
                  <span className="text-terracotta flex-shrink-0">·</span>
                  <span className="text-body leading-[1.7]">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 3 */}
          <section id="how-we-share" className="mb-12">
            <h2 className="font-serif text-[24px] font-normal text-dark mb-4 pb-3 border-b-[0.5px] border-border">3. How we share your information</h2>
            <p className="text-[14px] text-body leading-[1.8] mb-6 font-medium">We do not sell your personal information. We share information only in the limited circumstances described below.</p>

            {[
              { id: '3.1', title: 'Service providers', body: 'We share information with trusted third-party service providers who assist in operating the Platform, including cloud infrastructure providers, payment processors, email delivery services, and analytics providers. These providers are contractually bound to use your data only as directed by Augle.' },
              { id: '3.2', title: 'Legal requirements', body: 'We may disclose your information if required to do so by law, court order, or governmental authority, or if we believe in good faith that such disclosure is necessary to protect our rights, your safety, or the safety of others.' },
              { id: '3.3', title: 'Business transfers', body: "In the event of a merger, acquisition, financing, or sale of all or substantially all of Augle's assets, your information may be transferred as part of that transaction. We will provide notice of any such transfer and the applicable privacy practices." },
              { id: '3.4', title: 'Structured session data and commercial licensing', body: 'Augle may license, sell, or otherwise transfer structured session data — including agent deliberations, evidence node classifications, confidence grades, Guardian flag records, Contrarian objections, Synthesizer findings, and calibration outcomes — to third parties for research, commercial, and AI development purposes. Before any such transfer, session data is de-identified by removing or hashing direct personal identifiers (name, email address, account ID). Augle will not sell data that identifies you personally. Third-party licensees of de-identified session data are contractually prohibited from attempting to re-identify individual users.' },
              { id: '3.5', title: 'With your consent', body: 'We may share your information with third parties when you have given us explicit consent to do so.' },
            ].map(({ id, title, body }) => (
              <div key={id} className="mb-6">
                <h3 className="font-mono text-[11px] tracking-[0.06em] text-terracotta uppercase mb-3">{id} {title}</h3>
                <p className="text-[14px] text-body leading-[1.8]">{body}</p>
              </div>
            ))}
          </section>

          {/* Section 4 */}
          <section id="data-retention" className="mb-12">
            <h2 className="font-serif text-[24px] font-normal text-dark mb-6 pb-3 border-b-[0.5px] border-border">4. Data retention</h2>
            <p className="text-[14px] text-body leading-[1.8] mb-5">We retain your personal information for as long as your account is active or as necessary to provide the Platform and fulfill the purposes described in this Policy.</p>
            <div className="flex flex-col divide-y-[0.5px] divide-border border-[0.5px] border-border rounded-lg overflow-hidden mb-5">
              {[
                ['Account data', 'Retained until you delete your account.'],
                ['Session data', 'Retained in your account history until you delete individual sessions or your account. Structured session metadata (anonymized) may be retained indefinitely for calibration and research purposes.'],
                ['Payment records', 'Retained for the period required by applicable tax and financial recordkeeping laws.'],
                ['Log data', 'Typically retained for 90 days for security and debugging purposes.'],
              ].map(([key, val]) => (
                <div key={key as string} className="grid grid-cols-[160px_1fr] gap-4 px-5 py-4">
                  <span className="font-mono text-[11px] text-muted">{key}</span>
                  <span className="text-[13px] text-body leading-[1.6]">{val}</span>
                </div>
              ))}
            </div>
            <p className="text-[14px] text-body leading-[1.8]">Upon account deletion, your personal information will be deleted or anonymized within a commercially reasonable timeframe, except where retention is required by law or for legitimate business purposes (such as maintaining the integrity of calibration datasets in anonymized form).</p>
          </section>

          {/* Section 5 */}
          <section id="your-rights" className="mb-12">
            <h2 className="font-serif text-[24px] font-normal text-dark mb-6 pb-3 border-b-[0.5px] border-border">5. Your rights and choices</h2>
            <p className="text-[14px] text-body leading-[1.8] mb-6">Depending on your jurisdiction, you may have the following rights with respect to your personal information:</p>
            {[
              { id: '5.1', title: 'Access and portability', body: 'You may request a copy of the personal information we hold about you. We will provide this in a machine-readable format where technically feasible.' },
              { id: '5.2', title: 'Correction', body: 'You may update your display name directly in your account settings. For other corrections, contact privacy@augle.com.' },
              { id: '5.3', title: 'Deletion', body: 'You may request deletion of your account and associated personal data via the account settings Danger Zone. See Section 4 for retention exceptions.' },
              { id: '5.4', title: 'Opt-out of marketing', body: 'You may opt out of marketing emails at any time. You cannot opt out of transactional and security-related communications.' },
              { id: '5.5', title: 'California residents (CCPA/CPRA)', body: 'California residents have additional rights under the California Consumer Privacy Act, including the right to know, delete, correct, and opt out of the sale or sharing of personal information. Augle does not sell or share personal information for cross-context behavioral advertising. To exercise your rights, contact privacy@augle.com.' },
              { id: '5.6', title: 'EEA/UK residents (GDPR)', body: 'If you are located in the European Economic Area or United Kingdom, our legal basis for processing your personal information includes: (a) performance of our contract with you; (b) our legitimate interests in operating and improving the Platform; and (c) your consent where applicable. You may lodge a complaint with your local data protection authority.' },
            ].map(({ id, title, body }) => (
              <div key={id} className="mb-5">
                <h3 className="font-mono text-[11px] tracking-[0.06em] text-terracotta uppercase mb-2">{id} {title}</h3>
                <p className="text-[14px] text-body leading-[1.8]">{body}</p>
              </div>
            ))}
          </section>

          {/* Section 6 */}
          <section id="cookies" className="mb-12">
            <h2 className="font-serif text-[24px] font-normal text-dark mb-6 pb-3 border-b-[0.5px] border-border">6. Cookies and tracking technologies</h2>
            <p className="text-[14px] text-body leading-[1.8] mb-5">Augle uses cookies and similar tracking technologies to operate the Platform, maintain your session, and analyze usage. Specifically:</p>
            {[
              ['Strictly necessary cookies', 'Required for authentication, session management, and Platform security. Cannot be disabled.'],
              ['Analytics cookies', 'Used to understand how users interact with the Platform. May be disabled via your browser settings or a cookie consent mechanism.'],
              ['Preference cookies', 'Store your Platform preferences (e.g., legal disclaimer acknowledgment, session defaults).'],
            ].map(([key, val]) => (
              <div key={key as string} className="mb-4">
                <h3 className="font-mono text-[11px] tracking-[0.06em] text-terracotta uppercase mb-1">{key}</h3>
                <p className="text-[14px] text-body leading-[1.7]">{val}</p>
              </div>
            ))}
            <p className="text-[14px] text-muted leading-[1.7] mt-4">You can control cookie settings through your browser. Disabling certain cookies may limit Platform functionality.</p>
          </section>

          {/* Section 7 */}
          <section id="data-security" className="mb-12">
            <h2 className="font-serif text-[24px] font-normal text-dark mb-6 pb-3 border-b-[0.5px] border-border">7. Data security</h2>
            <p className="text-[14px] text-body leading-[1.8] mb-4">Augle implements industry-standard technical and organizational security measures to protect your personal information against unauthorized access, disclosure, alteration, or destruction. These include:</p>
            <ul className="flex flex-col gap-2 mb-4">
              {['Passwords stored using strong cryptographic hashing', 'TLS/HTTPS encryption for all data in transit', 'Access controls limiting employee access to personal data on a need-to-know basis', 'Regular security reviews and vulnerability assessments'].map(item => (
                <li key={item} className="flex gap-3 items-start text-[14px]">
                  <span className="text-terracotta flex-shrink-0">·</span>
                  <span className="text-body leading-[1.7]">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-[14px] text-muted leading-[1.7]">No method of transmission over the Internet or electronic storage is 100% secure. Augle cannot guarantee absolute security and is not responsible for unauthorized access resulting from your failure to protect your credentials.</p>
          </section>

          {/* Section 8 */}
          <section id="childrens-privacy" className="mb-12">
            <h2 className="font-serif text-[24px] font-normal text-dark mb-4 pb-3 border-b-[0.5px] border-border">8. Children's privacy</h2>
            <p className="text-[14px] text-body leading-[1.8]">The Platform is not directed to individuals under the age of 18. We do not knowingly collect personal information from minors. If you believe we have inadvertently collected information from a minor, please contact us immediately at <a href="mailto:privacy@augle.com" className="text-terracotta no-underline hover:underline">privacy@augle.com</a> and we will delete that information.</p>
          </section>

          {/* Section 9 */}
          <section id="third-party" className="mb-12">
            <h2 className="font-serif text-[24px] font-normal text-dark mb-4 pb-3 border-b-[0.5px] border-border">9. Third-party links and services</h2>
            <p className="text-[14px] text-body leading-[1.8]">The Platform may reference or link to third-party services such as Polymarket or Kalshi. Augle is not responsible for the privacy practices of any third-party sites or services. We encourage you to review the privacy policies of any third parties you interact with.</p>
          </section>

          {/* Section 10 */}
          <section id="changes" className="mb-12">
            <h2 className="font-serif text-[24px] font-normal text-dark mb-4 pb-3 border-b-[0.5px] border-border">10. Changes to this policy</h2>
            <p className="text-[14px] text-body leading-[1.8]">We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated Policy on the Platform and updating the effective date. Your continued use of the Platform after such changes constitutes your acceptance of the revised Policy.</p>
          </section>

          {/* Section 11 */}
          <section id="contact" className="mb-4">
            <h2 className="font-serif text-[24px] font-normal text-dark mb-4 pb-3 border-b-[0.5px] border-border">11. Contact us</h2>
            <p className="text-[14px] text-body leading-[1.8] mb-5">If you have questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact:</p>
            <div className="bg-surface border-[0.5px] border-border rounded-lg overflow-hidden">
              {[
                ['Company', 'Augle, Inc.'],
                ['Privacy inquiries', 'privacy@augle.com'],
                ['General contact', 'legal@augle.com'],
                ['Website', 'augle.com'],
                ['Last updated', 'April 27, 2026'],
              ].map(([key, val]) => (
                <div key={key} className="flex items-center justify-between px-5 py-3 border-b-[0.5px] border-border last:border-0">
                  <span className="font-mono text-[11px] text-muted">{key}</span>
                  <span className="text-[13px] text-dark">
                    {val.includes('@') ? <a href={`mailto:${val}`} className="text-terracotta no-underline hover:underline">{val}</a> : val}
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
