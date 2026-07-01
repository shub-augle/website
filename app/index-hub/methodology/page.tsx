import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const INDEX_SUBNAV = [
  { href: '/index', label: 'Overview' },
  { href: '/index/explorer', label: 'Question explorer' },
  { href: '/index/heatmap', label: 'Heatmaps' },
  { href: '/index/methodology', label: 'Methodology', active: true },
];

const DEFINITIONS = [
  { term: 'Consensus rate', body: 'The proportion of sessions in a domain that reached a Probable or Established confidence grade with no Unresolved Strong Contrarian objections at Phase 3 close. Computed per domain, not per session.' },
  { term: 'Dissent flag', body: 'An Unresolved Strong Contrarian objection that surfaces verbatim in the final output. Each dissent flag is a named, specific challenge with a resolution condition. The dissent count in the Index is the number of such flags per session.' },
  { term: 'High dissent session', body: 'Any session with two or more Unresolved Strong Contrarian objections. These are typically Contested-grade sessions. The Index filters for high-dissent sessions in the explorer.' },
  { term: 'Contested grade', body: 'Assigned when the evidence base is genuinely split, the methodology is materially weak, or an Unresolved Strong Contrarian objection applies that the evidence cannot resolve. A Contested grade is a complete finding — not a failure to reach a conclusion.' },
  { term: 'Gap grade', body: 'Assigned when the evidence is insufficient to evaluate the claim at all. A Gap finding names the specific evidence that would be required to resolve it. Gap grades are excluded from Brier score computations — they are not paired with prediction market contracts.' },
];

const LIMITATIONS = [
  { title: 'Question selection is not random', body: 'Sessions are initiated by users running real questions. This creates selection bias — questions users choose to deliberate on are not a random sample of all possible questions. The corpus is weighted toward questions people find uncertain enough to deliberate on, which may underrepresent clearly settled or clearly impossible outcomes.' },
  { title: 'Brier score requires binary resolution', body: 'The headline Brier statistic applies only to Markets-mode sessions paired with prediction market contracts that resolve YES or NO. Letters & Science sessions, Contested-grade findings, and Gap-grade findings are not included in Brier calculations. They are published in the Index but excluded from headline calibration statistics.' },
  { title: 'Corpus is small at launch', body: 'Statistical robustness requires sufficient resolved Gold-tier sessions. Domain-level Brier scores with fewer than 30 resolved sessions should be interpreted with caution. The Index notes sample size alongside each domain statistic. The headline score is only published once there are at least 50 Gold-tier resolved sessions in a domain.' },
  { title: 'Market comparison is at session initiation', body: "The market Brier score uses the prediction market's implied probability at session start — not at resolution time. Markets move as information arrives. The comparison is fair because both scores reflect the same moment, but it means market prices after session initiation are not captured." },
  { title: 'Consensus rate is not accuracy', body: 'A high consensus rate does not mean the ensemble was correct. It means the ensemble converged internally. A session can have high consensus and still resolve against the ensemble\'s prediction. Consensus rate and Brier score are distinct metrics measuring different things.' },
  { title: 'Domain classification is approximate', body: 'Questions are classified into domains by the Topic Architect at session initiation. Boundary cases — a question about AI regulation sits in both Policy and AI governance — are classified by primary subject matter. Domain-level statistics should be interpreted with awareness that classification is not perfectly crisp.' },
];

const CORPUS_TIERS = [
  {
    name: 'Gold tier',
    def: 'Contract was live and unresolved at session time',
    color: '#C15F3C',
    body: 'The contract resolves after the session closes. No hindsight contamination is possible — the ensemble cannot have been influenced by the outcome. Gold-tier sessions are the only sessions used in the headline Brier score statistics.',
    used: true,
  },
  {
    name: 'Silver tier',
    def: 'Contract resolved within 60 days prior to session',
    color: '#8A7D72',
    body: 'The contract resolved recently enough that the outcome may have influenced public information at session time. Silver sessions are published in the Index but excluded from headline Brier statistics. Shown separately in domain breakdowns.',
    used: false,
  },
  {
    name: 'Flagged',
    def: 'Contract resolved more than 60 days prior',
    color: '#C8C4BA',
    body: 'Significant risk of hindsight contamination. The resolution outcome is widely known and likely influenced the evidence base the ensemble accessed. Flagged sessions are not used in any calibration statistics and are not published in the Index.',
    used: false,
  },
];

export default function IndexMethodologyPage() {
  return (
    <div className="bg-sand min-h-screen">
      <Nav activeRoute="/index" />

      {/* PAGE HEADER */}
      <div className="bg-dark border-b-[0.5px] border-[#49443F] px-4 lg:px-[72px] py-8">
        <div className="max-w-[1280px] mx-auto">
          <div className="font-mono text-[10px] tracking-[0.08em] text-[#6A645E] uppercase mb-1">Augle Deliberation Index</div>
          <h1 className="font-serif text-[32px] lg:text-[44px] font-normal text-white mb-1">Methodology</h1>
          <p className="text-[14px] text-[#6A645E]">How the Index is computed — Brier scores, corpus tiers, consensus and dissent metrics, and what the data does and doesn't show</p>
        </div>
      </div>

      {/* SUBNAV */}
      <div className="bg-surface border-b-[0.5px] border-border">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] flex gap-6 overflow-x-auto">
          {INDEX_SUBNAV.map(({ href, label, active }) => (
            <Link key={href} href={href}
              className={`text-[14px] py-4 border-b-[2px] whitespace-nowrap no-underline transition-colors ${active ? 'border-terracotta text-dark font-medium' : 'border-transparent text-muted hover:text-dark'}`}>
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-[1280px] mx-auto px-4 lg:px-[72px] py-16">
        <div className="max-w-[760px] flex flex-col gap-16">

          {/* OVERVIEW */}
          <section>
            <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">Overview</div>
            <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-dark leading-[1.15] mb-6">What the Index measures and why.</h2>
            <p className="text-[16px] text-body leading-[1.8] mb-4">
              The Augle Deliberation Index is a public record of calibration accuracy — the relationship between the confidence grades the seven-agent ensemble assigns at session time and the binary ground-truth outcomes those sessions subsequently resolve against. It is not a measure of how often Augle is "right." It is a measure of how well-calibrated the ensemble's confidence estimates are against real-world resolution outcomes.
            </p>
            <p className="text-[16px] text-body leading-[1.8] mb-6">
              A system that consistently outputs 70% confidence on events that resolve YES at a 70% rate is well-calibrated. That's what the Index measures. The primary statistic is the Brier score, computed against Gold-tier resolved sessions only, compared against the prediction market implied probability at the moment the session began.
            </p>
            <div className="bg-surface border-[0.5px] border-border rounded-lg p-5">
              <div className="font-mono text-[10px] tracking-[0.06em] text-terracotta uppercase mb-2">Why this comparison is fair</div>
              <p className="text-[14px] text-body leading-[1.7]">
                The market and the ensemble see the same information at session time. The market's implied probability reflects the aggregate judgment of all market participants at that moment. The ensemble's confidence grade reflects the seven-agent deliberation. Neither has access to the resolution outcome — the comparison is a genuine head-to-head at the same point in time with the same information.
              </p>
            </div>
          </section>

          <hr className="border-none border-t-[0.5px] border-border" />

          {/* BRIER SCORE */}
          <section>
            <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">Brier score</div>
            <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-dark leading-[1.15] mb-6">How calibration accuracy is computed.</h2>
            <p className="text-[16px] text-body leading-[1.8] mb-6">
              The Brier score is a proper scoring rule for probabilistic predictions. It measures the mean squared difference between the predicted probability and the binary outcome. Lower scores are better — a perfect forecaster would score 0.0, and random guessing on balanced outcomes scores 0.25.
            </p>
            <div className="bg-dark rounded-lg p-6 mb-6">
              <div className="font-mono text-[10px] tracking-[0.06em] text-[#6A645E] uppercase mb-4">Brier score formula</div>
              <div className="font-mono text-[18px] text-white mb-2">BS = (1/N) × Σ (f_t − o_t)²</div>
              <div className="font-mono text-[12px] text-[#6A645E] mb-4">where f_t = forecast probability, o_t ∈ {'{0,1}'} = resolution outcome, N = number of sessions</div>
              <div className="h-[0.5px] bg-[#49443F] mb-4" />
              <p className="text-[13px] text-[#B0ADA5] leading-[1.6]">
                For a single session: BS = (confidence_grade − outcome)². If Augle outputs 0.78 confidence and the event resolves YES (1.0), the session Brier score is (0.78 − 1.0)² = 0.048. If the event resolves NO (0.0), it is (0.78 − 0.0)² = 0.608.
              </p>
            </div>
            <p className="text-[16px] text-body leading-[1.8] mb-5">
              Confidence grades are converted to numeric probabilities: Established → 0.90, Probable → 0.70, Contested → 0.45, Gap → 0.15. The Synthesizer's confidence percentage is used directly where available. The market Brier score uses the prediction market's implied probability at session initiation time as the forecast, and the same resolution outcome.
            </p>
            <div className="bg-surface border-[0.5px] border-border rounded-lg p-5">
              <div className="font-mono text-[10px] tracking-[0.06em] text-terracotta uppercase mb-2">Why we publish both scores</div>
              <p className="text-[14px] text-body leading-[1.7]">
                Publishing only Augle's Brier score without a comparison baseline would be uninterpretable. A score of 0.118 is only meaningful if you know what the market consensus was at the same moment. We publish both because the comparison — not the raw number — is what demonstrates calibration advantage.
              </p>
            </div>
          </section>

          <hr className="border-none border-t-[0.5px] border-border" />

          {/* CORPUS QUALITY TIERS */}
          <section>
            <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">Corpus quality tiers</div>
            <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-dark leading-[1.15] mb-6">Not all sessions are equal. Here's how we distinguish them.</h2>
            <p className="text-[16px] text-body leading-[1.8] mb-8">
              Corpus quality tiers classify each session based on whether the prediction market contract was resolved at session time. This matters because a session run after the outcome is known is contaminated — the ensemble cannot avoid being influenced by information that wouldn't have been available if the session had run earlier. We eliminate this contamination by classifying sessions at the moment they run.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {CORPUS_TIERS.map(({ name, def, color, body, used }) => (
                <div key={name} className="bg-surface border-[0.5px] border-border rounded-lg overflow-hidden">
                  <div className="px-5 py-4 border-b-[0.5px] border-border">
                    <div className="font-mono text-[12px] font-medium mb-1" style={{ color }}>{name}</div>
                    <div className="text-[12px] text-muted italic">{def}</div>
                  </div>
                  <div className="p-5">
                    <p className="text-[13px] text-body leading-[1.65] mb-3">{body}</p>
                    <span className={`font-mono text-[10px] px-2 py-[3px] rounded border-[0.5px] ${used ? 'text-[#2A7050] bg-[#D9F0E4] border-[#2A7050]' : 'text-muted bg-[#EAE6DC] border-border'}`}>
                      {used ? 'Used in headline stats' : 'Excluded from headline'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-none border-t-[0.5px] border-border" />

          {/* CONSENSUS AND DISSENT */}
          <section>
            <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">Consensus and dissent metrics</div>
            <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-dark leading-[1.15] mb-6">What consensus rate and dissent flags measure.</h2>
            <p className="text-[16px] text-body leading-[1.8] mb-8">
              The consensus and dissent metrics published in the Index describe the internal deliberation structure of the ensemble — not external agreement between Augle and some external authority. High consensus means the seven agents converged on a Probable or Established grade without unresolved Strong Contrarian objections. Low consensus means the session produced unresolved adversarial pressure.
            </p>
            <div className="flex flex-col divide-y-[0.5px] divide-border border-[0.5px] border-border rounded-lg overflow-hidden">
              {DEFINITIONS.map(({ term, body }) => (
                <div key={term} className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-0">
                  <div className="px-5 py-4 bg-[#EAE6DC] border-b-[0.5px] md:border-b-0 md:border-r-[0.5px] border-border">
                    <span className="font-mono text-[11px] text-dark font-medium">{term}</span>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-[13px] text-body leading-[1.65]">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-none border-t-[0.5px] border-border" />

          {/* LIMITATIONS */}
          <section>
            <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">Limitations</div>
            <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-dark leading-[1.15] mb-6">What the Index does not show.</h2>
            <p className="text-[16px] text-body leading-[1.8] mb-8">
              The Index is an honest record of what the corpus contains. That means it also has to be honest about what it doesn't contain and what its limitations are. The following limitations apply to the current corpus and Index methodology.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {LIMITATIONS.map(({ title, body }) => (
                <div key={title} className="bg-surface border-[0.5px] border-border rounded-lg p-5">
                  <div className="text-[14px] font-medium text-dark mb-2">{title}</div>
                  <p className="text-[13px] text-body leading-[1.65]">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-none border-t-[0.5px] border-border" />

          {/* DATA ACCESS */}
          <section>
            <div className="font-mono text-[12px] tracking-[0.1em] text-terracotta uppercase mb-4">Data access</div>
            <h2 className="font-serif text-[28px] lg:text-[44px] font-normal text-dark leading-[1.15] mb-6">Accessing the full session record.</h2>
            <p className="text-[16px] text-body leading-[1.8] mb-4">
              Every resolved session published in the Index is available in full via the Outcomes browser — including the complete agent-by-agent transcript, every Contrarian objection with its resolution condition, the Guardian verification log, and the Brier score computation. The full record is the accountability artifact. The Index surfaces aggregate patterns from it.
            </p>
            <p className="text-[16px] text-body leading-[1.8] mb-4">
              Researchers interested in the Reasoning Corpus as a training dataset should contact us directly. The corpus is commercially licensed at scale. Individual session records are publicly available and freely accessible via the Outcomes browser and the Index.
            </p>
            <p className="font-mono text-[13px] text-[#B0ADA5] leading-[1.6]">
              All Index data is illustrative at launch. The live corpus begins accumulating at beta launch. Methodology questions:{' '}
              <a href="mailto:hello@augle.com" className="text-terracotta no-underline hover:underline">hello@augle.com</a>
            </p>
          </section>

        </div>
      </div>

      {/* CTA */}
      <div className="bg-terracotta px-4 lg:px-[72px] py-24 text-center">
        <h2 className="font-serif text-[36px] lg:text-[52px] font-normal text-white leading-[1.1] mb-5 tracking-[-0.02em]">
          See the corpus<br />grow in real time.
        </h2>
        <p className="text-[19px] text-white/75 mb-10 leading-[1.7]">
          Every session you run becomes a calibration record. Join the waitlist — one free Standard session with every new account.
        </p>
        <div className="flex items-center justify-center gap-5 flex-wrap">
          <Link href="/waitlist" className="text-[15px] font-medium text-terracotta bg-white px-8 py-[14px] rounded no-underline hover:opacity-90 transition-opacity">Join waitlist</Link>
          <Link href="/index" className="text-[15px] text-white/80 border-[0.5px] border-white/35 px-7 py-[14px] rounded no-underline hover:bg-white/10 transition-colors">Back to Index</Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
