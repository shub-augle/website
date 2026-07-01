import SolutionLayout, { VerticalData } from '../SolutionLayout';

const data: VerticalData = {
  slug: 'research-labs', activeSlug: 'research-labs',
  breadcrumbLabel: 'Research labs',
  eyebrow: 'Solutions · Research labs',
  heroTitle: 'Find the assumption<br>before you build<br><em class="italic text-terracotta">the programme.</em>',
  heroBody: 'Every research programme is built on a stack of assumptions. Most hold. One won\'t. The question is whether you find it before you\'ve committed three years and $4M of capital to a programme that fails on a premise you never stress-tested. Augle finds it — and tells you precisely what evidence would resolve it.',
  personas: [
    'Principal investigators at Phase I–III decision points',
    'Lab directors commissioning landmark finding audits',
    'Research directors evaluating trial design choices',
    'Drug discovery teams assessing target viability',
    'Programme leads stress-testing foundational literature',
  ],
  panelLabel: 'Session configuration · Research labs',
  panelRows: [
    { label: 'Mode', value: 'Letters & Science' },
    { label: 'Guardian', value: 'Clinical integrity', accent: true },
    { label: 'SVS checks', value: 'Retraction DB · erratum tracking · preprint flag' },
    { label: 'Documents', value: 'Literature summaries · trial briefs · programme memos' },
    { label: 'Depth', value: 'Standard or Deep' },
    { label: 'Output', value: 'Critical assumption identification · evidence-anchored finding · resolution pathway' },
  ],
  problemTitle: 'The assumption your<br>programme can\'t<br>survive without.',
  problemBody: 'Literature reviews don\'t stress-test. Colleagues with a stake in the programme don\'t find the foundational weakness. The erratum that changes your evidence weight doesn\'t announce itself. Augle is the adversarial review that has no stake in your programme succeeding.',
  problemQuestions: [
    '"Is the published effect size reproducible, or is it inflated by allegiance bias in the meta-analysis?"',
    '"Does the cryo-EM resolution actually support the mechanism claim, or is it an extrapolation?"',
    '"Which of our Phase II endpoints will be most vulnerable to FDA scrutiny given the indication?"',
    '"Is our clinical trial design choice — RCT vs. adaptive — actually better supported by the evidence?"',
  ],
  problemItems: [
    { title: 'The erratum that changed the evidence weight', body: 'Errata, retractions, and effect size corrections don\'t always propagate through the literature. The Guardian\'s SVS cross-references every cited paper against retraction databases and published errata — before the deliberation begins, not after you\'ve built a programme on the finding.' },
    { title: 'Design decisions built on inapplicable precedents', body: 'The Methodologist evaluates whether the precedent your trial design is based on actually applies to your indication, patient population, and endpoint structure. External validity problems surface here — not at the FDA meeting.' },
    { title: 'The assumption your programme can\'t survive without', body: 'Augle identifies the single critical assumption in your programme — the one that, if false, invalidates the investment thesis. It specifies the evidence that would resolve it and whether that evidence exists.' },
    { title: 'Literature reviewed by people who want the programme to succeed', body: 'Internal teams have a stake in the programme continuing. The Contrarian has no such stake. It steelmans every claim before challenging it, surfaces the strongest version of the objection, and tells you precisely what evidence would close it.' },
  ],
  useCasesTitle: 'Two sessions.<br>Two go/no-go moments.',
  useCasesBody: 'Each scenario is drawn from the Augle Use Case Compendium — hypothetical sessions illustrating deliberation behaviour at critical programme decision points.',
  useCases: [
    {
      num: 'Use case 01 of 02 · Research labs',
      name: 'The New Drug Target Assessment',
      persona: 'Research Director, Oncology · Pre-programme go/no-go decision',
      badge: 'Deep · flagship Contrarian', badgeVariant: 'deep',
      question: '"Is the published evidence for this oncology target sufficient to justify committing to a three-year, $4M research programme, or are there foundational assumptions that require resolution first?"',
      highlights: [
        { agent: 'Cartographer', text: 'Settled: the target is expressed in the tumour type. Contested: whether expression levels correlate with therapeutic response in the indication. Unknown: no published study has tested the correlation in the specific patient subpopulation the programme targets.' },
        { agent: 'Methodologist', text: 'External validity: all supporting studies used cell line models — no in vivo evidence in the human indication exists. Evidence ceiling: Probable for mechanistic plausibility. Gap for clinical efficacy in the target population.' },
        { agent: 'Contrarian', text: 'Strong objection (Unresolved): "The programme\'s primary evidence rests on a 2019 paper whose corresponding author has a subsequent erratum reducing the effect size by 40%. The erratum changes the evidentiary weight of the central mechanistic claim."' },
      ],
      outcome: { label: 'Session output', rows: [
        { key: 'Finding', val: 'Gap — insufficient in vivo human evidence to justify $4M commitment without resolving the population correlation question' },
        { key: 'SVS', val: '2019 key paper flagged — significant erratum reduces claimed effect size by 40%' },
        { key: 'Critical assumption', val: 'Target expression → therapeutic response correlation in the specific patient subpopulation' },
        { key: 'Resolution pathway', val: 'Commission retrospective analysis of existing biobank samples — 6-week timeline, ~$80K' },
      ]},
      value: 'The research director had strong conviction in the target. Augle found the erratum and the population scope gap. The programme was paused for six weeks for a retrospective biobank analysis — which confirmed the correlation. The $4M commitment was made on a stronger evidentiary foundation than it would have been without the pause.',
    },
    {
      num: 'Use case 02 of 02 · Research labs',
      name: 'The Clinical Trial Design Decision',
      persona: 'Principal Investigator, Oncology · Phase II design review',
      badge: 'Standard depth', badgeVariant: 'standard',
      question: '"For a combination immunotherapy Phase II trial in this indication, which trial design — randomised controlled or adaptive platform — is better supported by the available methodological and clinical evidence?"',
      highlights: [
        { agent: 'Cartographer', text: 'Settled: both designs are methodologically valid for Phase II. Contested: whether adaptive designs provide sufficient power in this indication given the heterogeneous patient population. Unknown: no published adaptive design data for this specific combination in this tumour type.' },
        { agent: 'Methodologist', text: 'Construct validity: the adaptive design\'s interim analysis rules require a biomarker endpoint with validated correlation to overall survival. The proposed biomarker has not been validated in this indication — this is a material gap.' },
        { agent: 'Contrarian', text: 'Moderate objection: "The adaptive design\'s complexity may introduce operational variance that undermines the statistical power gains. The RCT\'s simplicity has execution advantages in multi-site trials that are underweighted in the current analysis."' },
      ],
      outcome: { label: 'Session output', rows: [
        { key: 'Finding', val: 'Contested — adaptive design advantages are conditional on biomarker validation not yet completed' },
        { key: 'Recommendation', val: 'Proceed with RCT design unless biomarker validation is completed before trial initiation' },
        { key: 'Reopen condition', val: 'Biomarker validation data — if validated, revisit adaptive design with updated evidence' },
      ]},
      value: 'The PI had advocated for the adaptive design based on published efficiency gains. The biomarker validation gap hadn\'t been identified because the team assumed an existing correlation. Augle surfaced the gap with a clear resolution condition — the trial launched as an RCT with a protocol amendment pathway if the biomarker validates.',
    },
  ],
  howTitle: 'Built for the research<br>programme lifecycle.',
  howSteps: [
    { n: 1, title: 'Submit the hypothesis or programme decision question', body: 'The Topic Architect parses your question, sets the Guardian to clinical integrity mode, and configures the ensemble for scientific evidence evaluation. Upload supporting literature, trial briefs, or programme memos.' },
    { n: 2, title: 'The Guardian checks every citation for retractions and errata', body: 'Clinical integrity mode cross-references every cited paper against retraction databases, published errata, and conference abstract vs. published discrepancies. Evidence weight changes catch propagation failures before they reach the deliberation.' },
    { n: 3, title: 'The Contrarian finds the critical assumption', body: 'The Contrarian has no stake in your programme succeeding. It steelmans your evidence base before challenging it — and specifically targets the foundational assumption whose failure would undermine the programme, not peripheral objections.' },
    { n: 4, title: 'You get the finding and the resolution pathway', body: 'The Synthesizer produces a confidence-graded finding. Unresolved objections appear verbatim with resolution conditions — not vague uncertainty acknowledgments, but specific evidence that would close each objection. The Pragmatist translates this into concrete next steps.' },
  ],
  configLabel: 'Clinical integrity mode · Guardian configuration',
  configRows: [
    { key: 'Retraction check', val: 'Every cited paper cross-referenced against Retraction Watch, publisher retraction notices, and PubMed retraction flags before entering the evidence registry' },
    { key: 'Erratum tracking', val: 'Published errata and corrections cross-referenced — effect size changes and scope limitations surfaced automatically' },
    { key: 'Preprint flag', val: 'bioRxiv and medRxiv preprints flagged SVS_UNVERIFIED — evidence node capped at Probable' },
    { key: 'Cell line flag', val: 'In vitro evidence without in vivo human confirmation flagged with external validity limitation' },
    { key: 'Allegiance bias', val: 'Meta-analyses with original-lab inclusion flagged for allegiance bias risk — evidence weight adjusted' },
    { key: 'Audit trail', val: 'Full session record exportable — SVS log, objection register, confidence grades, resolution pathways' },
  ],
  whyTitle: 'What makes it different<br>from a literature review.',
  whyCards: [
    { title: 'SVS catches what literature review misses', body: 'Errata, retractions, and effect size corrections don\'t always propagate through the literature. The Guardian\'s Source Verification Service cross-references every cited paper against retraction databases and published errata — before the deliberation begins, not after you\'ve built a programme on the finding.' },
    { title: 'It names the specific assumption, not general uncertainty', body: 'Every research programme has uncertainty. Augle identifies the single critical assumption — the one that, if false, undermines the investment thesis — and specifies what evidence would resolve it. Vague uncertainty acknowledgments are prohibited by the Methodologist\'s output contract.' },
    { title: 'The Contrarian has no stake in your programme succeeding', body: 'Internal teams, supervisors, and collaborators all have a stake in the programme continuing. The Contrarian has none. It produces the strongest possible version of the objection, not a weak one you can dismiss. That independence is the structural advantage.' },
    { title: 'Precedent applicability, not just precedent existence', body: 'The Methodologist evaluates whether the design precedent, effect size estimate, or mechanism claim actually applies to your indication, population, and endpoint structure. Knowing a precedent exists is not the same as knowing it applies.' },
    { title: 'A decision structure, not just a finding', body: 'The output includes the finding, the unresolved objections, and the specific evidence that would resolve each one. For go/no-go decisions, this translates directly to: what you can proceed on, what requires resolution first, and what the resolution pathway looks like.' },
    { title: '$0.60 for a Standard session · $1.20 for Deep', body: 'A Standard deliberation costs $0.60. A Deep session with the flagship Contrarian and async expert interjection costs $1.20. A Phase II trial failure costs orders of magnitude more. The economics are straightforward.' },
  ],
  ctaTitle: 'Find the assumption<br>before you fund it.',
  ctaBody: 'Join the waitlist and get one Standard session free. Run it on a real hypothesis before your next programme decision.',
};

export default function ResearchLabsPage() {
  return <SolutionLayout v={data} />;
}
