import UseCaseHubLayout, { HubData } from '../UseCaseHubLayout';

const hub: HubData = {
  slug: 'universities', activeSlug: 'universities',
  breadcrumbLabel: 'Universities + academia',
  eyebrow: 'Use cases · Universities + academia',
  heroTitle: 'Three sessions.<br>One <em class="italic text-terracotta">vertical.</em>',
  heroBody: "How Augle's seven-agent ensemble serves PhD candidates, faculty researchers, and academic teams — from dissertation defence stress-tests to grant proposal reviews. Each session illustrates realistic deliberation behaviour, unresolved objections, and the output that matters for academic work.",
  heroLinks: [
    'PhD candidates preparing for viva examinations',
    'Research fellows mapping systematic review gaps',
    'Faculty stress-testing grant proposals before submission',
    'Academic librarians reviewing evidence claims for publication',
  ],
  panelRows: [
    { label: 'Sessions', value: '3 hypothetical' },
    { label: 'Mode', value: 'Letters & Science' },
    { label: 'Depths', value: 'Standard · Deep' },
    { label: 'Guardian mode', value: 'Academic integrity', accent: true },
    { label: 'Common outputs', value: 'Contested confidence grades · unresolved methodological objections · evidence gap register' },
    { label: 'Solutions page', value: 'Universities', link: '/solutions/universities' },
  ],
  sessions: [
    {
      num: 'Session 01 of 03 · Universities + academia',
      name: 'The Dissertation Defence',
      persona: 'PhD Candidate, Cognitive Science · University of Edinburgh',
      question: '"Does experience sampling via smartphone provide sufficient ecological validity to support attentional state claims in naturalistic environments?"',
      tags: [{ label: 'Letters & Science', variant: 'ls' }, { label: 'Standard', variant: 'standard' }, { label: 'Academic integrity', variant: 'guardian' }],
      agentBlocks: [
        { name: 'Cartographer', text: 'Settled: ESM is an established methodology with a strong publication record. Contested: whether smartphone notification triggers introduce systematic attentional bias through the act of self-report — active debate since 2019. Unknown: no study has directly compared notification-triggered vs. researcher-initiated ESM on attentional outcomes specifically.' },
        { name: 'Methodologist', text: 'Internal validity concern: the notification itself is an attentional interruption — it cannot be neutral to the construct being measured. Construct validity issue: the 3-item Likert operationalisation of attentional state has no published reliability data for smartphone delivery. Confidence ceiling: Contested.' },
        { name: 'Contrarian — Strong objection (Unresolved)', text: '"Self-report of attentional state triggered by an attentional interruption is not a measure of naturalistic attention — it is a measure of post-interruption attentional recovery. These are causally distinct constructs. The thesis conflates them throughout. A viva examiner in cognitive science will identify this immediately."' },
        { name: 'Synthesizer', text: 'Evidence weight: Probable for relative comparisons between conditions. Contested for absolute naturalistic attentional state claims. The methodology supports weaker claims than the thesis currently makes. Reopen condition: replication study with researcher-initiated sampling in identical conditions.' },
      ],
      output: [
        { key: 'Finding', val: 'Contested', accent: true },
        { key: 'Guardian', val: '94% · Academic integrity' },
        { key: 'Dissent flags', val: '1 Strong (Unresolved)' },
        { key: 'Confidence', val: '41%' },
      ],
      unresolvedObjection: '"Self-report triggered by attentional interruption is not a measure of naturalistic attention — it measures post-interruption recovery. These are causally distinct. The thesis conflates them."',
      sessionLink: '/outcomes',
    },
    {
      num: 'Session 02 of 03 · Universities + academia',
      name: 'The Systematic Review Gap',
      persona: 'Research Fellow, Public Health · UCL',
      question: '"What is the current state of evidence on whether screen time interventions reduce depressive symptoms in adolescents, and where are the critical gaps?"',
      tags: [{ label: 'Letters & Science', variant: 'ls' }, { label: 'Standard', variant: 'standard' }],
      agentBlocks: [
        { name: 'Cartographer', text: 'Settled: screen time is associated with worse mental health outcomes in cross-sectional studies. Contested: whether interventions that reduce screen time produce clinically meaningful reductions in depressive symptoms — RCT evidence is thin. Unknown: dose-response relationship, mechanism of action, and whether effect size varies by platform type.' },
        { name: 'Guardian SVS', text: '28 citations verified. One systematic review cited as primary evidence was retracted in 2023 due to data integrity concerns. Flagged Critical — session paused. Evidence node removed from admissible base before deliberation continued.' },
        { name: 'Methodologist', text: 'External validity problem: the three RCTs with positive findings all recruited from clinical populations already receiving treatment. Effect size for general adolescent populations is unknown. The literature conflates passive consumption and active social use — these have different proposed mechanisms and different intervention implications. Gap is structural, not incidental.' },
        { name: 'Contrarian — Moderate objection', text: '"The proposed systematic review scope does not distinguish between platform types. A reviewer will ask why TikTok passive consumption is treated as equivalent to Instagram direct messaging in the intervention literature. Without this distinction, the review\'s findings will be ungeneralisable."' },
      ],
      output: [
        { key: 'Finding', val: 'Gap', accent: true },
        { key: 'SVS flag', val: 'Critical — retracted systematic review' },
        { key: 'Key gap', val: 'No RCT evidence in general (non-clinical) adolescent population' },
        { key: 'Guardian', val: '91% · Academic integrity' },
      ],
      reopenCondition: 'RCT conducted in general adolescent population with platform-type stratification and 6-month follow-up on validated depression measure.',
      sessionLink: '/outcomes',
    },
    {
      num: 'Session 03 of 03 · Universities + academia',
      name: 'The Grant Proposal Review',
      persona: 'Associate Professor, Materials Science · MIT',
      question: '"Is the evidence base for graphene-based supercapacitor energy density improvements sufficient to support the claims in this NSF proposal, and what will reviewers challenge?"',
      tags: [{ label: 'Letters & Science', variant: 'ls' }, { label: 'Deep', variant: 'deep' }],
      agentBlocks: [
        { name: 'Cartographer', text: 'Settled: graphene-based supercapacitors demonstrate improved energy density in laboratory conditions. Contested: whether improvements are attributable to graphene specifically vs. overall electrode architecture — confounded in most published studies. Unknown: scalability at commercial electrode dimensions; most published results are for sub-cm² test electrodes.' },
        { name: 'Methodologist', text: 'Construct validity: the proposal cites energy density figures from studies using different electrolyte systems. Comparing across electrolyte types inflates the apparent advantage of graphene electrodes. The proposal does not disclose this confound. An NSF panel reviewer in materials science will identify it — it is a standard methodological concern in the field.' },
        { name: 'Contrarian — Strong objection (Unresolved)', text: '"The scalability gap is not a minor limitation — it is the central unresolved question in graphene electrode research. The proposal\'s commercialisation pathway assumes scale-up is straightforward. No published study has demonstrated the claimed energy density at electrode dimensions relevant to any practical application. Panel reviewers will not fund a commercialisation pathway built on sub-cm² laboratory data."' },
        { name: 'Pragmatist', text: 'Two revisions: (1) Reframe the commercialisation pathway as a research objective rather than an assumed outcome — propose scalability characterisation as Phase 2 deliverable. (2) Add a comparative electrolyte section that directly addresses the confound rather than leaving it for reviewers to find. Both are strengthening moves, not concessions.' },
      ],
      output: [
        { key: 'Finding', val: 'Contested', accent: true },
        { key: 'Confidence', val: '38%' },
        { key: 'Key gap', val: 'No scalability data at practical electrode dimensions' },
        { key: 'Guardian', val: '96% · Academic integrity' },
      ],
      unresolvedObjection: '"Commercialisation pathway assumes scale-up is straightforward. No published study demonstrates claimed energy density at relevant electrode dimensions. Reviewers will not fund this pathway on sub-cm² laboratory data."',
      sessionLink: '/outcomes',
    },
  ],
  relatedCards: [
    { eyebrow: 'Solutions page', name: 'Universities + academia', desc: 'The full solutions page for this vertical — problem framing, configuration panel, and why Augle for academic research.', href: '/solutions/universities' },
    { eyebrow: 'Related hub', name: 'Research labs hub', desc: 'Three sessions for corporate and independent research labs — replication review, technology readiness, and competitive intelligence.', href: '/use-cases/research-labs' },
    { eyebrow: 'Related hub', name: 'Think tanks + nonprofits hub', desc: 'Pre-publication evidence review, advocacy position stress-testing, and grant evaluation — adjacent patterns for research-adjacent organisations.', href: '/use-cases/think-tanks' },
  ],
  ctaTitle: 'Run a real session<br>on your question.',
  ctaBody: 'Join the waitlist and get one Standard session free — real deliberation, not a simulation.',
  ctaSolutionHref: '/solutions/universities',
  ctaSolutionLabel: 'Universities solutions page',
};

export default function UniversitiesHubPage() {
  return <UseCaseHubLayout hub={hub} />;
}
