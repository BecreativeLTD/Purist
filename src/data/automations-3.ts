import type { Profession } from './automations-1'

export const professions3: Profession[] = [
  {
    slug: 'marketing-agency',
    name: 'Marketing Agency',
    category: 'Agencies & Consulting',
    tagline: 'Stop manually building reports, chasing client approvals, and onboarding new accounts one spreadsheet at a time — automate the operational work that eats your margin.',
    description: 'Marketing agencies sell creative and strategic value but spend 40-60% of account management time on operational tasks: reporting, approval collection, client updates, and onboarding. Automation eliminates the operational drag so your team delivers more billable output with the same headcount.',
    painPoints: [
      'Monthly client reports take 4-6 hours each to compile across 5-10 platforms — a full week of team time every month',
      'Creative approval cycles extend timelines by days when clients don\'t respond to emails — projects stall and deadlines slip',
      'New client onboarding takes 3 weeks when it should take 3 days — access collection, strategy calls, and asset gathering are all manual',
      'Client communication is reactive — account managers write the same updates dozens of times instead of automating status delivery'
    ],
    workflows: [
      { name: 'Automated Client Reporting', description: 'n8n pulls data from Google Analytics, Meta Ads, Google Ads, LinkedIn, and email platforms on a schedule → generates formatted report PDF → sends to client via email on a fixed date. What took 4-6 hours per report now takes zero team time.', timeSaved: '12h/week', impact: '6 client reports automated end-to-end' },
      { name: 'Creative Approval Workflow', description: 'Creative submitted → client receives approval request email with preview link and 1-click approve/request changes. Reminder at 24h and 48h if no response. Team notified instantly when approved. Approval cycle reduced from 5 days to under 18 hours.', timeSaved: '6h/week', impact: 'Approval cycle: 5 days → 18 hours' },
      { name: 'New Client Onboarding Automation', description: 'Contract signed → automated onboarding sequence: welcome email with portal access, access request forms for all required platforms, kickoff call scheduler, and brand asset uploader. All responses flow to project management automatically.', timeSaved: '8h/week', impact: 'Onboarding: 3 weeks → 5 days' },
      { name: 'Weekly Client Status Digest', description: 'Every Friday → automated email to each client with project status, key metrics from the week, upcoming deliverables, and any items awaiting client input. Reduces reactive client check-in calls by 67%.', timeSaved: '5h/week', impact: '67% fewer reactive check-in calls' }
    ],
    tools: ['n8n', 'Google Sheets', 'Slack', 'Notion'],
    stats: { timeSaved: '32h/week', revenueImpact: '$11,200/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can reporting automation connect to all the platforms we use?', a: 'n8n has native integrations with Google Analytics, Meta Ads Manager, Google Ads, LinkedIn Campaign Manager, HubSpot, Mailchimp, Klaviyo, and hundreds of other marketing platforms. If it has an API, we can pull from it.' },
      { q: 'What if a client uses a custom or proprietary reporting platform?', a: 'We build custom API connectors for non-standard platforms. If your client uses an unusual tool, we assess the API and build accordingly. Most platforms expose their data via REST API.' },
      { q: 'Can this scale across different clients with different reporting needs?', a: 'Yes — each client has a separate workflow configuration. Client A gets a weekly paid media report; Client B gets a monthly SEO + content report. Everything runs independently on its own schedule.' }
    ]
  },
  {
    slug: 'seo-agency',
    name: 'SEO Agency',
    category: 'Agencies & Consulting',
    tagline: 'Automate rank tracking, technical audit delivery, and client reporting so your team focuses on strategy and link building — not data gathering.',
    description: 'SEO agencies are drowning in repetitive data work: pulling rankings, compiling crawl data, writing status updates. Automation handles all recurring data collection and client-facing reporting, freeing analysts for the high-leverage work that actually moves rankings.',
    painPoints: [
      'Weekly rank tracking across hundreds of keywords for multiple clients is manually compiled — consuming 10+ hours that should go to strategy',
      'Technical audit findings have to be reformatted and explained for each client separately — the same information written four different ways',
      'Content briefs and keyword research documents are built from scratch every time rather than from automated templates',
      'Lead qualification for new SEO prospects involves manual website audits that could be partially automated as part of the proposal process'
    ],
    workflows: [
      { name: 'Automated Rank Tracking Reports', description: 'SEMrush or Ahrefs API → n8n pulls weekly rank data for all tracked keywords → generates delta report showing movement → delivers to each client with contextual commentary template. Zero manual data pulling for 100% of weekly reporting.', timeSaved: '10h/week', impact: 'Weekly reports fully automated' },
      { name: 'Technical Audit Delivery System', description: 'Screaming Frog/Sitebulb audit complete → n8n formats findings into priority-ordered client report with explanations → sends with implementation timeline. Translates technical findings into client-readable format automatically.', timeSaved: '5h/week', impact: 'Audit delivery time cut by 80%' },
      { name: 'Prospect Audit Pipeline', description: 'Prospect fills intake form → n8n triggers automated website analysis (Core Web Vitals, indexation issues, backlink profile overview) → compiles into proposal-ready audit document → delivered to sales rep within 4 hours. Closes proposals faster.', timeSaved: '6h/week', impact: 'Proposals delivered 4h faster' },
      { name: 'Content Brief Generation', description: 'Target keyword submitted → n8n pulls SERP data, top-ranking page structure, LSI keywords, and word count benchmarks → generates structured content brief in Google Docs. What took 2 hours per brief now takes 15 minutes.', timeSaved: '8h/week', impact: 'Content brief time: 2h → 15min' }
    ],
    tools: ['n8n', 'Google Sheets', 'SEMrush API', 'Google Search Console API'],
    stats: { timeSaved: '30h/week', revenueImpact: '$9,400/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'What SEO tools does the automation integrate with?', a: 'We integrate with SEMrush, Ahrefs, Moz, Google Search Console, Google Analytics, Screaming Frog (via export), and DataForSEO. Most major SEO platforms have APIs we can connect to.' },
      { q: 'Can rank tracking automation handle local SEO keyword sets?', a: 'Yes — local keyword sets with geo-modifiers are tracked separately. Reports can be segmented by location, device type, or campaign. Multi-location clients get location-specific ranking data.' },
      { q: 'Can the system handle white-label reporting for client agencies?', a: 'Yes — reports are fully branded to your agency (or your client\'s brand for white-label). Logo, color scheme, and contact information are configured per client.' }
    ]
  },
  {
    slug: 'pr-agency',
    name: 'PR Agency',
    category: 'Agencies & Consulting',
    tagline: 'Automate media monitoring, coverage reporting, and pitch tracking so your team pitches more journalists and manages more clients without adding headcount.',
    description: 'PR agencies are measured on coverage, but a significant portion of agency time goes to monitoring coverage, compiling reports, and managing pitching logistics rather than building journalist relationships. Automation handles the operational layer so your team can focus on the craft.',
    painPoints: [
      'Daily media monitoring across dozens of publications for multiple clients consumes 2-3 hours of junior staff time every morning',
      'Monthly coverage reports require manually collecting links, screenshots, and metrics from scattered sources',
      'Pitch tracking and follow-up across 50+ journalist contacts per campaign is managed in disconnected spreadsheets',
      'New client onboarding media list building is entirely manual research that takes days per client'
    ],
    workflows: [
      { name: 'Automated Media Monitoring', description: 'n8n monitors Google Alerts, Mention, and Meltwater feeds for client brand mentions → categorizes by sentiment and outlet tier → delivers morning digest to account managers by 8am. Monitors 24/7; delivers once. Eliminates manual morning monitoring.', timeSaved: '10h/week', impact: '24/7 coverage monitoring automated' },
      { name: 'Coverage Report Compilation', description: 'Coverage links submitted to shared tracking form → n8n automatically pulls domain authority, estimated reach, sentiment, and publication date → compiles into formatted monthly coverage report with executive summary. Report creation: 6 hours → 40 minutes.', timeSaved: '8h/week', impact: 'Coverage report time: 6h → 40min' },
      { name: 'Pitch Follow-Up Sequences', description: 'Pitch logged in CRM → n8n schedules 3-day, 7-day, and 14-day follow-up reminders for each journalist contact. Tracks open and response rates. No pitch falls through the cracks due to manual follow-up failure.', timeSaved: '5h/week', impact: '100% pitch follow-up compliance' },
      { name: 'Client Alert Notifications', description: 'Significant coverage hit (tier-1 publication or competitor mention) → instant Slack + email alert to client and account manager with link, reach estimate, and suggested response if needed. Clients are never the last to know about their own coverage.', timeSaved: '3h/week', impact: 'Real-time tier-1 coverage alerts' }
    ],
    tools: ['n8n', 'Google Sheets', 'Slack', 'Notion'],
    stats: { timeSaved: '27h/week', revenueImpact: '$7,800/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'What media monitoring tools does the automation integrate with?', a: 'We integrate with Google Alerts, Mention, Meltwater, Cision, and Brandwatch. If you use a specific monitoring tool, we assess the API and build accordingly.' },
      { q: 'Can coverage reports automatically calculate earned media value?', a: 'Yes — EMV calculations can be built into the report workflow using CPM-based or publication-tier-based formulas. Configuration matches your agency\'s EMV methodology.' },
      { q: 'Can the pitch tracking system integrate with our existing CRM or outreach tool?', a: 'Yes — we integrate with HubSpot, Salesforce, Cision, Muck Rack, and most major PR CRM and outreach platforms. Pitch data flows from your existing tool into the follow-up automation.' }
    ]
  },
  {
    slug: 'web-design-agency',
    name: 'Web Design Agency',
    category: 'Agencies & Consulting',
    tagline: 'Automate client feedback collection, project status updates, and invoice follow-up so your designers spend more time designing and less time chasing.',
    description: 'Web design agencies lose billable hours to the operational infrastructure of running client projects: collecting feedback, chasing invoice payments, sending status updates, and onboarding new clients. Automation handles all of it systematically so your creative team stays in flow.',
    painPoints: [
      'Client feedback on design rounds comes in through email, WhatsApp, phone calls, and Slack — consolidation is a full-time job',
      'Invoice collection averages 47 days when payment terms are 30 days — cash flow suffers from inconsistent follow-up',
      'Project status emails are written manually every week even when the status is the same as last week',
      'New website launches require a multi-step handoff (training, hosting setup, CMS access) that is always chaotic'
    ],
    workflows: [
      { name: 'Design Feedback Collection', description: 'Design round complete → client receives email with preview link and structured feedback form (not a blank text box). Responses categorized into revision, approval, or hold. Consolidates feedback from all stakeholders into a single structured document automatically.', timeSaved: '7h/week', impact: 'Feedback rounds 40% faster' },
      { name: 'Invoice & Payment Follow-Up', description: 'Invoice sent via accounting tool → n8n monitors payment status. Day 7 unpaid → polite reminder. Day 14 → firmer reminder. Day 21 → escalation to account manager. Average collection time drops from 47 days to 19.', timeSaved: '4h/week', impact: 'Collection time: 47 days → 19 days' },
      { name: 'Weekly Project Status Digest', description: 'Every Thursday → automated project status email to each client with current phase, completed milestones, next milestones, and any items awaiting client input. Written once per project stage; sends automatically every week.', timeSaved: '5h/week', impact: '5h/week of status writing eliminated' },
      { name: 'Website Launch Handoff Sequence', description: 'Project marked complete → automated post-launch sequence: hosting credentials delivery, CMS training video links, DNS configuration instructions, 30-day and 90-day check-in scheduling. Launch handoff goes from chaotic to systematic.', timeSaved: '4h/week', impact: 'Launch handoff fully systematized' }
    ],
    tools: ['n8n', 'Stripe', 'Notion', 'Google Sheets'],
    stats: { timeSaved: '21h/week', revenueImpact: '$6,300/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can the feedback collection work with visual design tools like Figma?', a: 'Yes — we integrate with Figma via API to pull comment data. Alternatively, feedback collection can use tools like Loom screen recording links embedded in the feedback form for visual communication.' },
      { q: 'What invoicing software does the payment follow-up integrate with?', a: 'We integrate with FreshBooks, QuickBooks, Xero, Stripe Invoicing, Wave, and most major accounting/invoicing tools. Payment status is pulled directly from the platform.' },
      { q: 'Can client communication automation be paused for specific clients?', a: 'Yes — every client can have automation paused independently. If an account is in a sensitive phase, communication is handled manually. Pausing and resuming takes seconds in the workflow dashboard.' }
    ]
  },
  {
    slug: 'it-consulting-firm',
    name: 'IT Consulting Firm',
    category: 'Agencies & Consulting',
    tagline: 'Automate client ticket routing, infrastructure monitoring alerts, and monthly billing summaries so your engineers focus on solving problems, not managing communication.',
    description: 'IT consulting firms and MSPs are measured on response time and system uptime, but support coordinators spend enormous time on ticket routing, status updates, and billing reconciliation that could run automatically. Automation handles the operational layer while your engineers handle the technical challenges.',
    painPoints: [
      'Support tickets arrive via email, phone, and client portal but are routed manually — leading to delays and occasional drops',
      'Infrastructure monitoring alerts go to a shared inbox and require manual triage before escalation',
      'Monthly billing reconciliation across time tracking, materials, and SLA credits is assembled by hand each month',
      'Client IT asset inventories are never kept current because updates are entirely manual'
    ],
    workflows: [
      { name: 'Intelligent Ticket Routing', description: 'Ticket submitted via any channel → n8n categorizes by priority (critical/high/medium/low), service type, and client SLA tier → assigns to correct engineer and creates record in your ticketing system → sends confirmation to client with ticket number and ETA.', timeSaved: '8h/week', impact: 'Average response time cut by 61%' },
      { name: 'Infrastructure Alert Escalation', description: 'Monitoring alerts from Datadog, PagerDuty, or Nagios → n8n applies severity logic → routes to correct on-call engineer with full context → escalates to senior engineer if unacknowledged within SLA window. Zero manual triage.', timeSaved: '6h/week', impact: 'SLA breach incidents reduced by 78%' },
      { name: 'Monthly Billing Reconciliation', description: 'Time tracking data + materials + SLA credit calculations pulled automatically at month-end → compiled into client invoice summary → reviewed by account manager before sending. Billing prep time reduced from 6 hours to 45 minutes.', timeSaved: '7h/week', impact: 'Billing prep: 6h → 45 min' },
      { name: 'IT Asset Inventory Updates', description: 'Client hardware additions and changes trigger automated inventory form → n8n updates asset spreadsheet/CMDB → generates monthly asset summary for each client. Eliminates manual inventory management for 80% of standard updates.', timeSaved: '4h/week', impact: '95% inventory accuracy maintained' }
    ],
    tools: ['n8n', 'Google Sheets', 'Slack', 'PagerDuty'],
    stats: { timeSaved: '26h/week', revenueImpact: '$8,900/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'What ticketing systems does the routing automation integrate with?', a: 'We integrate with Zendesk, Freshdesk, ServiceNow, ConnectWise, Autotask, Jira Service Management, and most major MSP and IT support platforms.' },
      { q: 'Can the alert escalation logic be configured to our specific SLA tiers?', a: 'Yes — escalation timing and routing are configured per client SLA tier and service type. A P1 production outage escalates differently than a P3 software question, and a premium SLA client routes differently than a standard one.' },
      { q: 'How does the billing automation handle complex project billing vs. retainer billing?', a: 'Both models are supported. Time-and-materials projects bill from time tracking data. Retainer clients bill automatically with over-hours tracked and billed separately. Hybrid arrangements are handled by custom workflow logic.' }
    ]
  },
  {
    slug: 'financial-advisor',
    name: 'Financial Advisor / RIA',
    category: 'Agencies & Consulting',
    tagline: 'Automate client review scheduling, portfolio update communications, and compliance documentation so you serve more clients without growing your operations team.',
    description: 'Registered Investment Advisors and independent financial advisors are capacity-constrained — every hour spent on scheduling, compliance documentation, and routine client communications is an hour not spent on planning or new client development. Automation handles the operational and communication layer that drives client satisfaction but doesn\'t require advisor judgment.',
    painPoints: [
      'Annual review scheduling is a weeks-long phone tag process — calendar coordination for a 1-hour meeting should not take 3 weeks',
      'Client portfolio update communications are written manually by the advisor or operations staff for each client separately',
      'Compliance documentation (ADV updates, client acknowledgments, suitability reviews) is tracked in spreadsheets and often incomplete',
      'Prospect follow-up after the first meeting is inconsistent — warm leads go cold because follow-up depends on advisor memory'
    ],
    workflows: [
      { name: 'Annual Review Scheduling Automation', description: 'Review due date approaches → automated scheduling sequence via email with self-booking link showing advisor\'s availability. One round-trip instead of 5. Annual review completion rate increases from 74% to 96% within the first year.', timeSaved: '8h/week', impact: 'Review completion rate: 74% → 96%' },
      { name: 'Portfolio Update Communications', description: 'Market event or quarterly review trigger → n8n generates personalized client update email with their specific portfolio performance context and advisor commentary template. Advisor reviews and sends with one click. Personalized at scale.', timeSaved: '6h/week', impact: 'Client updates 5x faster at scale' },
      { name: 'Compliance Documentation Tracker', description: 'Compliance calendar triggers automated reminders to clients for required document updates (beneficiary reviews, risk tolerance updates). Completion tracked. Gaps surfaced to compliance officer weekly. Compliance documentation completeness rises above 99%.', timeSaved: '5h/week', impact: '99% compliance doc completeness' },
      { name: 'Prospect Follow-Up Sequence', description: 'Discovery meeting completed → automated 5-touch follow-up sequence over 21 days: meeting summary email, financial planning resource, market commentary, final check-in, and scheduling offer. Converts 31% more prospects to clients vs. manual follow-up.', timeSaved: '4h/week', impact: '31% more prospect conversions' }
    ],
    tools: ['n8n', 'Calendly', 'Google Sheets', 'Redtail CRM'],
    stats: { timeSaved: '24h/week', revenueImpact: '$9,100/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Is automated client communication compliant with SEC and FINRA regulations?', a: 'All automated communications are built to be reviewed and archived in your compliance system. We do not send unapproved investment-specific language. Compliance templates are designed with your Chief Compliance Officer before deployment.' },
      { q: 'What CRM and financial planning tools does this integrate with?', a: 'We integrate with Redtail, Wealthbox, Salesforce Financial Services Cloud, Orion, Black Diamond, and most major RIA technology platforms. Portfolio data and client records drive personalized communication.' },
      { q: 'Can automation handle different service tiers of clients differently?', a: 'Yes — workflows are segmented by AUM tier or client service model. Platinum clients get different communication frequency, review depth, and personalization than standard clients. All configurable.' }
    ]
  },
  {
    slug: 'accounting-firm',
    name: 'Accounting Firm / CPA',
    category: 'Agencies & Consulting',
    tagline: 'Automate document collection, deadline reminders, and client billing so your team spends tax season doing tax work — not chasing paperwork.',
    description: 'Accounting firms lose significant team capacity to document collection, deadline nagging, and administrative work that is entirely automatable. During tax season, the cost of manual processes compounds — every hour spent chasing documents is an hour not spent on returns. Automation systematizes the client communication layer so your CPAs do only what CPAs should do.',
    painPoints: [
      'Document collection before tax season requires weeks of back-and-forth calls and emails that could be replaced by automated request sequences',
      'Tax deadline reminders are sent manually to hundreds of clients — or not sent at all, leading to extension requests that overwhelm capacity',
      'Client billing follows inconsistent schedules because invoicing is manual and tied to whoever remembers to send it',
      'New client intake and engagement letter signing is a multi-week manual process'
    ],
    workflows: [
      { name: 'Document Collection Automation', description: 'Tax prep engagement confirmed → client receives personalized document checklist via secure upload portal link. Daily reminder if document incomplete. Coordinator sees real-time completion dashboard. Document collection time cut by 64%.', timeSaved: '10h/week', impact: 'Document collection time cut by 64%' },
      { name: 'Tax Deadline Reminder Sequence', description: 'Automated deadline reminders sent to every client: Q1 estimated taxes (April 15), Q2 (June 15), Q3 (September 15), Q4 (January 15), and annual filing. Personalized with the client\'s specific obligation. Eliminates manual deadline communication for 100% of clients.', timeSaved: '6h/week', impact: '100% of clients receive deadline reminders' },
      { name: 'Invoice & Collections Automation', description: 'Work completion triggers invoice generation in your accounting software → automated delivery → 10-day reminder if unpaid → 20-day follow-up → 30-day escalation. Average collection time drops from 52 days to 24.', timeSaved: '5h/week', impact: 'Collection time: 52 days → 24 days' },
      { name: 'Engagement Letter Signing Workflow', description: 'New client added → engagement letter generated automatically → sent via DocuSign or HelloSign link → signing completion triggers onboarding sequence and access provisioning. Onboarding reduced from 2 weeks to 48 hours.', timeSaved: '5h/week', impact: 'Onboarding: 2 weeks → 48 hours' }
    ],
    tools: ['n8n', 'Google Sheets', 'Stripe', 'DocuSign'],
    stats: { timeSaved: '27h/week', revenueImpact: '$8,200/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'What accounting software does this integrate with?', a: 'We integrate with QuickBooks, Xero, Sage, CCH Axcess, Thomson Reuters UltraTax, and most major professional accounting platforms. Billing and client status data drives the automation workflows.' },
      { q: 'Can the document collection portal handle sensitive financial documents securely?', a: 'Yes — document upload is handled via encrypted portals (ShareFile, TaxDome, or your existing secure portal). We integrate with your existing secure document system rather than creating a new one.' },
      { q: 'Can this handle different client types — business clients vs. individual filers?', a: 'Completely — document checklists, deadline calendars, and communication sequences are fully configured per client type. An S-Corp client gets different documents requested than an individual W-2 filer.' }
    ]
  },
  {
    slug: 'law-firm',
    name: 'Law Firm',
    category: 'Agencies & Consulting',
    tagline: 'Automate client intake, document request sequences, and billing reminders so your attorneys practice law instead of managing administrative processes.',
    description: 'Law firms pay attorney rates for administrative work — intake coordination, document chasing, billing follow-up — that should be automated. Every hour an attorney spends on non-billable operational work represents a direct revenue loss. Automation creates the operational infrastructure that supports a professional client experience without consuming attorney time.',
    painPoints: [
      'New client intake requires multiple phone calls, manual conflict checks, and paper-based engagement letter processes',
      'Document collection from clients is a persistent bottleneck — matters stall waiting for records that were requested weeks ago',
      'Billing realization rates suffer because invoice follow-up is sporadic and uncomfortable for attorneys to initiate',
      'Case status updates to clients are reactive — clients call to ask for updates rather than receiving them proactively'
    ],
    workflows: [
      { name: 'Client Intake Automation', description: 'Intake form submitted → conflict check triggered → engagement letter generated → e-signature link sent → retainer invoice initiated automatically. What took 5 days of back-and-forth now completes in under 24 hours without attorney involvement.', timeSaved: '8h/week', impact: 'Intake: 5 days → under 24 hours' },
      { name: 'Document Request Sequences', description: 'Document needed tagged in matter management system → automated client request sent with secure upload link → 3-day reminder if not received → 7-day follow-up → paralegal escalation at 14 days. Document collection gaps reduced by 71%.', timeSaved: '6h/week', impact: 'Document gaps reduced by 71%' },
      { name: 'Invoice Follow-Up System', description: 'Invoice sent → 14-day reminder if unpaid → 21-day follow-up from billing coordinator name → 30-day escalation with payment plan offer. Removes attorney from collection conversation while increasing collection rate by 34%.', timeSaved: '5h/week', impact: 'Collection rate increased by 34%' },
      { name: 'Proactive Case Status Updates', description: 'Matter milestone reached → automated client email with status summary, next steps, and timeline estimate. Clients receive updates without calling. Reduces inbound status calls by 58% and increases client satisfaction scores.', timeSaved: '5h/week', impact: '58% fewer inbound status calls' }
    ],
    tools: ['n8n', 'Clio', 'DocuSign', 'Stripe'],
    stats: { timeSaved: '25h/week', revenueImpact: '$10,400/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'What practice management systems does this integrate with?', a: 'We integrate with Clio, MyCase, PracticePanther, Filevine, and most major legal practice management platforms. Matter data and billing status drive all communication workflows.' },
      { q: 'How does automated intake handle conflicts of interest checks?', a: 'Intake data triggers a conflict check query against your existing conflicts database. If no conflict, intake proceeds automatically. If potential conflict flagged, workflow pauses and alerts the responsible attorney for manual review before proceeding.' },
      { q: 'Is client communication from law firm automation appropriate from an ethics standpoint?', a: 'Automated communications are designed to handle administrative and status information only — not legal advice. All templates are reviewed for compliance with your state bar\'s ethics rules before deployment.' }
    ]
  },
  {
    slug: 'recruitment-agency',
    name: 'Recruitment Agency',
    category: 'Agencies & Consulting',
    tagline: 'Automate candidate screening, interview scheduling, and client update sequences so your recruiters spend time building relationships — not managing logistics.',
    description: 'Recruitment agencies are relationship businesses buried under logistics. Resume screening, interview scheduling, feedback collection, and client updates consume the majority of recruiter time. Automation handles the logistics layer so your team focuses on the conversations that close placements.',
    painPoints: [
      'Recruiter spends 2-3 hours daily on interview scheduling back-and-forth between candidates and hiring managers',
      'Candidate follow-up after each interview stage is inconsistent — candidates disappear from the pipeline because no one followed up',
      'Client reporting on pipeline status is reactive and manually assembled when clients call asking for updates',
      'Resume screening for high-volume roles requires reading 100+ applications to find 5 qualified candidates'
    ],
    workflows: [
      { name: 'Automated Interview Scheduling', description: 'Candidate advances to interview stage → scheduling link sent automatically showing hiring manager\'s availability → confirmation sent to all parties → Zoom/Teams link generated → reminder sent 24h and 2h before. Scheduling coordination eliminated entirely.', timeSaved: '8h/week', impact: 'Scheduling time reduced by 94%' },
      { name: 'Candidate Pipeline Communication', description: 'Candidate submits → instant acknowledgment. Interview completed → 24h follow-up for feedback. Offer stage → daily updates. Declined → respectful closure with keep-warm option. Every candidate has a defined communication experience regardless of outcome.', timeSaved: '7h/week', impact: 'Candidate experience NPS up 41 points' },
      { name: 'Client Pipeline Status Reports', description: 'Weekly automated report to each client with current candidate pipeline by stage, activity since last report, next expected milestones, and any blockers. Proactive reporting eliminates status call requests and positions your agency as organized and accountable.', timeSaved: '5h/week', impact: '73% fewer client status calls' },
      { name: 'Initial CV Screening Workflow', description: 'Application received → n8n + Claude AI extracts key qualification signals from CV against role requirements → scores and ranks applications → passes top candidates to recruiter with summary. Screening time for 100-application roles drops from 4 hours to 30 minutes.', timeSaved: '8h/week', impact: 'Screening time: 4h → 30min per role' }
    ],
    tools: ['n8n', 'Claude AI', 'Calendly', 'Google Sheets'],
    stats: { timeSaved: '29h/week', revenueImpact: '$9,700/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'What ATS systems does the automation integrate with?', a: 'We integrate with Bullhorn, JobAdder, Greenhouse, Lever, Workday, and most major ATS platforms. Candidate pipeline data drives all scheduling and communication workflows.' },
      { q: 'How does the AI screening handle complex role requirements?', a: 'Role requirements are captured in a structured brief that the AI screens against. Screening is used for objective qualification matching (years of experience, required skills, location) — never for subjective personality or culture screening.' },
      { q: 'Can this handle both retained and contingency search workflows?', a: 'Yes — retained and contingency searches have different communication protocols, reporting cadences, and client update frequencies. Both models are configured with appropriate workflows.' }
    ]
  },
  {
    slug: 'business-coach',
    name: 'Business Coach',
    category: 'Agencies & Consulting',
    tagline: 'Automate client accountability tracking, session scheduling, and program renewals so you coach more clients without working more hours.',
    description: 'Business coaches sell transformation but lose hours every week to operational tasks: scheduling, accountability follow-ups, homework tracking, and program renewal conversations. Automation handles the infrastructure of coaching delivery so you can scale your practice without scaling your working hours.',
    painPoints: [
      'Session scheduling and rescheduling is a recurring friction point that consumes time and creates awkwardness with clients',
      'Between-session accountability homework is submitted inconsistently because there\'s no systematic tracking or reminder',
      'Program renewal conversations are avoided until the program expires — losing clients who would have renewed with a well-timed ask',
      'New client onboarding requires manual delivery of workbooks, intake forms, and program materials that could be systematized'
    ],
    workflows: [
      { name: 'Session Scheduling & Reminder System', description: 'Monthly → client receives scheduling link for next session. 48h before → reminder with session prep questions. 24h → final reminder. Session recorded → summary and action items sent within 2 hours automatically. Scheduling and follow-up are hands-off.', timeSaved: '5h/week', impact: 'Session admin fully automated' },
      { name: 'Between-Session Accountability', description: 'Weekly accountability check-in SMS to each client with specific questions tied to their current program goals. Responses collected, flagged if concerning. Coach reviews response digest Friday. Accountability without weekly manual check-in calls.', timeSaved: '4h/week', impact: '3x better client goal achievement' },
      { name: 'Program Renewal Campaign', description: '4 weeks before program end → automated renewal sequence: results summary email, next-level program offer, special renewal pricing if applicable. 68% of clients who engage with the renewal sequence renew vs. 31% when the conversation is reactive.', timeSaved: '3h/week', impact: '68% renewal rate vs 31% baseline' },
      { name: 'New Client Onboarding Sequence', description: 'Contract signed → 7-day automated onboarding sequence: welcome video, program workbook delivery, intake assessment, tool access setup, and first session scheduling. Client arrives at session 1 prepared and excited rather than confused.', timeSaved: '4h/week', impact: 'Onboarding fully systematized' }
    ],
    tools: ['n8n', 'Twilio', 'Calendly', 'Stripe'],
    stats: { timeSaved: '17h/week', revenueImpact: '$5,200/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can the accountability check-in questions be customized per client?', a: 'Yes — each client has their own accountability protocol tied to their specific goals. A revenue-growth client gets different questions than a leadership-development client. Questions update automatically when program milestones change.' },
      { q: 'What happens if a client doesn\'t respond to accountability check-ins?', a: 'Non-response triggers an escalation flag after 48 hours. Coach receives an alert identifying the unresponsive client so they can reach out personally. Automation handles the volume; the coach handles exceptions.' },
      { q: 'Can this handle group coaching programs in addition to 1:1 coaching?', a: 'Yes — group programs have their own workflow configuration with cohort-wide announcements, individual accountability tracking, and group session scheduling. Both delivery models are fully supported.' }
    ]
  },
  {
    slug: 'management-consultant',
    name: 'Management Consultant',
    category: 'Agencies & Consulting',
    tagline: 'Automate project status reporting, stakeholder communication, and deliverable tracking so your consultants stay billable on strategic work, not project administration.',
    description: 'Management consultants and boutique strategy firms bill for intellectual output but lose significant consulting time to project administration: status reporting, stakeholder communication, data collection, and deliverable tracking. Automation handles the administrative layer so every billable hour is spent on the work clients actually pay for.',
    painPoints: [
      'Weekly status reports to client steering committees are written manually — a 2-hour task that produces the same format every week',
      'Data collection from client teams requires repeated follow-up emails when a form-based automated system would achieve the same result',
      'Deliverable review and approval cycles extend timelines because there is no systematic tracking of who has reviewed what',
      'Project close-out and case study documentation is rushed and incomplete because no automated process captures outcomes'
    ],
    workflows: [
      { name: 'Automated Status Report Generation', description: 'Project data from your PM tool (milestones, risks, budget burn) pulls automatically every Friday → n8n formats into client-facing status report → consultant reviews and sends with one click. Status report prep time drops from 2 hours to 15 minutes.', timeSaved: '6h/week', impact: 'Status report prep: 2h → 15min' },
      { name: 'Stakeholder Data Collection', description: 'Data needed from client team → automated form sent to each stakeholder with 5-day response window → 2-day reminder if not submitted → consultant alert at deadline. Data collection completion increases from 64% on time to 91%.', timeSaved: '5h/week', impact: 'On-time data collection: 64% → 91%' },
      { name: 'Deliverable Review Tracking', description: 'Deliverable submitted for review → each stakeholder receives email with review link, specific review questions, and deadline. Completion tracked. Outstanding reviews visible to project lead in real time. Review cycles accelerated by 38%.', timeSaved: '4h/week', impact: 'Review cycles 38% faster' },
      { name: 'Project Outcome Documentation', description: 'Project close-out trigger → automated outcome capture survey sent to client and consulting team. Responses compile into case study template. Key metrics, client quote, and results captured systematically. 100% of projects now documented.', timeSaved: '3h/week', impact: '100% of projects documented' }
    ],
    tools: ['n8n', 'Notion', 'Google Sheets', 'Typeform'],
    stats: { timeSaved: '19h/week', revenueImpact: '$8,600/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'What project management tools does the status report automation connect to?', a: 'We integrate with Asana, Notion, Monday.com, ClickUp, Jira, and most major PM platforms. Project milestone and task data pulls automatically without manual data entry.' },
      { q: 'Can automated status reports be formatted to match client expectations?', a: 'Yes — status report templates are fully configured to your client\'s preferred format, branding, and information hierarchy. Multiple templates can exist for different clients or project types.' },
      { q: 'How does the system handle confidential client data in automated workflows?', a: 'All automations run on secure infrastructure with client data isolated per project. No data crosses between client workflows. We work within your existing NDAs and data handling agreements.' }
    ]
  },
  {
    slug: 'insurance-broker',
    name: 'Insurance Broker',
    category: 'Agencies & Consulting',
    tagline: 'Automate renewal reminders, policy review scheduling, and new business follow-up so you retain every client and close more prospects without adding staff.',
    description: 'Insurance brokers lose clients at renewal because manual processes can\'t maintain consistent contact across a large book of business. Automation creates the systematic communication infrastructure that prevents lapses, catches renewal opportunities, and nurtures new business prospects through the long sales cycles of commercial insurance.',
    painPoints: [
      'Policy renewal lapses occur because 90-day advance notice calls slip through the cracks in manual tracking systems',
      'New business prospects require 8-12 touchpoints over 6-12 months — manual follow-up at that frequency is impossible to sustain',
      'Claims follow-up with clients after a loss event is inconsistent — clients feel abandoned when they need support most',
      'Certificate of insurance requests come in frequently and require manual generation that could be partially automated'
    ],
    workflows: [
      { name: 'Renewal Reminder Sequence', description: 'Policy expiry date triggers 120-day, 90-day, 60-day, and 30-day renewal reminder sequence. Each message escalates in urgency and action specificity. Renewal lapse rate drops from 11% to under 3%. Broker retention reaches industry-best levels.', timeSaved: '7h/week', impact: 'Renewal lapse: 11% → 3%' },
      { name: 'New Business Prospect Nurture', description: 'Prospect entered into CRM → automated 12-month nurture sequence with insurance education content, market update emails, and check-in touchpoints. Converts 27% more prospects over a 12-month window vs. manual follow-up.', timeSaved: '6h/week', impact: '27% more prospects converted' },
      { name: 'Post-Claim Care Sequence', description: 'Claim filed → automated sequence: same-day acknowledgment, day 3 check-in, weekly status update until closure, post-close satisfaction survey. Clients feel supported through their most stressful experience with the broker. Retention post-claim increases by 44%.', timeSaved: '4h/week', impact: '44% better post-claim retention' },
      { name: 'Annual Policy Review Scheduling', description: '60 days before policy anniversary → automated review scheduling email with self-booking link. Review completed → summary of coverage gaps and recommendations sent within 24 hours. Converts 31% of reviews into expanded coverage.', timeSaved: '4h/week', impact: '31% of reviews lead to coverage upgrades' }
    ],
    tools: ['n8n', 'Twilio', 'Google Sheets', 'Calendly'],
    stats: { timeSaved: '22h/week', revenueImpact: '$7,400/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'What insurance agency management systems does this integrate with?', a: 'We integrate with Applied Epic, Hawksoft, AMS360, EZLynx, and most major insurance AMS platforms. Policy data and renewal dates drive all communication workflows.' },
      { q: 'Can the renewal reminder system handle multiple policies per client?', a: 'Yes — each policy has its own renewal tracking workflow. A commercial client with property, liability, auto, and workers\' comp policies gets appropriately timed reminders for each, consolidated into a single annual review invitation.' },
      { q: 'Is automated client communication compliant with state insurance regulations?', a: 'All templates are designed to be informational and administrative — not advice or solicitation in the regulated sense. Compliance review of templates against your state\'s requirements is part of our deployment process.' }
    ]
  },
  {
    slug: 'real-estate-agent',
    name: 'Real Estate Agent',
    category: 'Agencies & Consulting',
    tagline: 'Never lose a lead to slow follow-up again — automate lead response, listing updates, and past client re-engagement that compounds into referral revenue.',
    description: 'Real estate agents lose 78% of deals to the first agent who responds. Manual follow-up at the volume required to build a top-producer business is impossible without automation. The agents who consistently outperform their market have automated the communication infrastructure that turns cold leads into closings and past clients into a referral engine.',
    painPoints: [
      'Online leads from Zillow, Realtor.com, and websites go cold within hours when response time exceeds 5 minutes',
      'Listing alert setup and property match notifications are manually configured per buyer — consuming hours and getting done inconsistently',
      'Past client database of 200-500 people sits unused because there is no systematic re-engagement process',
      'Transaction coordination requires daily client communication updates that take 30-45 minutes to write for each active transaction'
    ],
    workflows: [
      { name: 'Instant Lead Response System', description: 'Lead received from any source → immediate personalized SMS and email response within 60 seconds → appointment booking link included → 24h and 48h follow-ups if no response. Speed-to-lead improvement drives 340% more lead conversions.', timeSaved: '6h/week', impact: '340% more leads converted to appointments' },
      { name: 'Buyer Property Alert Automation', description: 'Buyer criteria entered once → weekly automated property match email with new listings meeting criteria. Keeps buyers engaged through long search processes without manual update emails. Active buyer pipeline stays warm automatically.', timeSaved: '4h/week', impact: 'Active buyer engagement maintained' },
      { name: 'Past Client Re-Engagement', description: 'Quarterly home value update emails to your entire past client database. Annual anniversary congratulations. Market update at each rate change. Local market report monthly. Generates referrals from clients who forgot about you — the single highest-ROI communication in real estate.', timeSaved: '5h/week', impact: '2.4x referral rate from past clients' },
      { name: 'Transaction Status Updates', description: 'Transaction milestone reached → automated update email to buyer/seller with clear language about what just happened, what comes next, and the expected timeline. Client anxiety reduced by 67%. Agent called with questions reduced by 54%.', timeSaved: '6h/week', impact: '54% fewer mid-transaction inquiry calls' }
    ],
    tools: ['n8n', 'Twilio', 'Follow Up Boss', 'Google Sheets'],
    stats: { timeSaved: '22h/week', revenueImpact: '$12,800/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'What CRM systems does the lead response automation work with?', a: 'We integrate with Follow Up Boss, kvCORE, Lofty (Chime), BoomTown, LionDesk, and most major real estate CRM platforms. Lead source integrations include Zillow, Realtor.com, Homes.com, and website lead forms.' },
      { q: 'Can the property alert system pull live MLS data?', a: 'Yes — we connect to MLS data feeds via IDX or RETS/RESO Web API. Property alerts pull new listings as they hit the market and match against saved buyer criteria automatically.' },
      { q: 'How does this work for a team vs. a solo agent?', a: 'Both configurations are fully supported. Teams get lead routing logic that distributes leads to appropriate agents based on geography, price range, or buyer type. Solo agents get a simpler configuration that routes everything to one pipeline.' }
    ]
  },
  {
    slug: 'mortgage-broker',
    name: 'Mortgage Broker',
    category: 'Agencies & Consulting',
    tagline: 'Automate loan status updates, document collection, and rate alert notifications so you close more loans with the same team and win more referrals.',
    description: 'Mortgage brokers win referrals from realtors and past clients by being the broker who communicates clearly and closes on time. Automation handles the repetitive communication and document-chasing that currently consumes loan officer time, freeing them to build more referral relationships and handle more loan volume.',
    painPoints: [
      'Borrowers call constantly for loan status updates that could be sent proactively via automated milestone notifications',
      'Document collection is a persistent bottleneck — conditional approval documents sit outstanding for days because follow-up is manual',
      'Rate alert systems for pre-approved borrowers are never maintained because setup is manual and time-consuming',
      'Realtor referral partners receive inconsistent communication about their clients\' loan progress — weakening the relationship'
    ],
    workflows: [
      { name: 'Loan Milestone Status Updates', description: 'Each milestone in your LOS (application received, conditional approval, clear to close, closing scheduled) → automated email and SMS to borrower with plain-language explanation of what happened and what comes next. Borrower calls reduced by 71%.', timeSaved: '7h/week', impact: 'Borrower inquiry calls down 71%' },
      { name: 'Document Collection Sequences', description: 'Condition items required → automated sequence to borrower with specific document requests and secure upload links. Daily reminders if not submitted. Condition cleared → instant confirmation. Loan officer spends 0 minutes chasing documents.', timeSaved: '8h/week', impact: 'Document collection time eliminated' },
      { name: 'Realtor Partner Updates', description: 'Every loan milestone → automated update to the referring realtor with the borrower\'s status (no financial details — just milestone progress). Realtors stop calling the loan officer to ask for updates. Relationship quality improves dramatically.', timeSaved: '4h/week', impact: '2x realtor referral repeat rate' },
      { name: 'Rate Drop Alert System', description: 'Pre-approved borrowers who paused due to rates → automated alert when rates drop to their target threshold. Personalized with their specific loan amount and the new estimated payment. Reactivates pipeline without any manual monitoring.', timeSaved: '3h/week', impact: '$380K in pipeline reactivated' }
    ],
    tools: ['n8n', 'Twilio', 'Google Sheets', 'Encompass API'],
    stats: { timeSaved: '23h/week', revenueImpact: '$10,200/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'What loan origination systems does this integrate with?', a: 'We integrate with Encompass, Calyx Point, Optimal Blue, Floify, and most major LOS platforms. Loan milestone data and condition items drive all automated communications.' },
      { q: 'How are RESPA and compliance requirements handled in automated communications?', a: 'All communication templates are reviewed against RESPA, TRID, and applicable state regulations before deployment. We do not automate any disclosures that require timed delivery under federal regulation — those remain in your LOS workflow.' },
      { q: 'Can the realtor update system be configured to share or withhold specific information?', a: 'Yes — realtor updates share milestone progress only. Financial details, credit information, and borrower-specific data are never included. The information shared is configurable within your compliance guidelines.' }
    ]
  },
  {
    slug: 'event-planning-company',
    name: 'Event Planning Company',
    category: 'Agencies & Consulting',
    tagline: 'Automate vendor coordination, client approval workflows, and timeline reminders so your planners orchestrate flawless events without drowning in logistics.',
    description: 'Event planning companies manage hundreds of moving parts per event — vendors, clients, timelines, budgets, and approvals — mostly through manual email threads. Automation creates the systematic coordination infrastructure that lets your team scale event complexity without scaling team size.',
    painPoints: [
      'Vendor coordination for each event requires dozens of manual emails and follow-ups across caterers, venues, photographers, and florists',
      'Client approval on event designs, menus, and timelines requires repeated follow-up via email that stalls planning',
      'Budget tracking across multiple events and vendors is maintained in separate spreadsheets with no centralized view',
      'Event day timelines and vendor briefings are manually compiled and distributed for every event'
    ],
    workflows: [
      { name: 'Vendor Coordination Automation', description: 'Event created → each vendor category receives automated contract request, timeline brief, and confirmation sequence. Vendor confirmation tracked. Unconfirmed vendors receive escalating reminders. Event planning coordinator sees live confirmation status dashboard.', timeSaved: '9h/week', impact: '9h/event of vendor coordination eliminated' },
      { name: 'Client Approval Workflow', description: 'Design, menu, or timeline element ready for review → client receives structured approval email with options and deadline. 2-day reminder. 4-day escalation. Approvals and change requests tracked automatically. Approval cycle reduced by 56%.', timeSaved: '6h/week', impact: 'Approval cycle 56% faster' },
      { name: 'Budget Tracking Automation', description: 'Vendor invoice submitted → expense recorded against event budget automatically → client receives budget update with current vs. projected spend. Budget overrun alerts trigger immediately rather than at invoice time. No manual budget reconciliation.', timeSaved: '4h/week', impact: 'Budget tracking fully automated' },
      { name: 'Event Day Timeline Delivery', description: '72 hours before event → each vendor receives their specific timeline with arrival times, contact information, and site access instructions. Client receives final timeline and day-of emergency contact. No manual compilation.', timeSaved: '3h/week', impact: '3h per event of timeline prep eliminated' }
    ],
    tools: ['n8n', 'Google Sheets', 'Slack', 'Airtable'],
    stats: { timeSaved: '23h/week', revenueImpact: '$6,700/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can the vendor coordination system handle different vendor types with different requirement sets?', a: 'Yes — vendor category templates (venue, catering, photography, florals, entertainment) each have their own information requests, confirmation requirements, and timeline brief formats.' },
      { q: 'How does the budget tracking work if clients make last-minute changes?', a: 'Change orders trigger an automatic budget impact calculation and client notification showing the revised total. Client approval is required before the change is confirmed with the vendor, creating a clean paper trail.' },
      { q: 'Can automation handle both corporate events and social events in the same system?', a: 'Yes — corporate and social event types have separate workflow configurations reflecting their different vendor sets, client communication styles, and timeline structures.' }
    ]
  },
  {
    slug: 'digital-marketing-consultant',
    name: 'Digital Marketing Consultant',
    category: 'Agencies & Consulting',
    tagline: 'Automate client reporting, proposal delivery, and lead nurturing so you can work with 3x more clients without tripling your working hours.',
    description: 'Independent digital marketing consultants are capacity-constrained — there is a ceiling on how many clients one person can serve when reporting, communication, and administrative tasks are entirely manual. Automation removes that ceiling by handling everything except the strategic and creative work that only you can do.',
    painPoints: [
      'Monthly reporting for 8-10 clients consumes 20-30 hours that should go to strategy and execution',
      'New client proposals require manual research and formatting that delays the sales process by days',
      'Inbound inquiries from the website and LinkedIn arrive at all hours and are not followed up within the critical first hour',
      'Existing clients don\'t hear from you between deliverables — relationship warmth decays without systematic touchpoints'
    ],
    workflows: [
      { name: 'Automated Monthly Client Reports', description: 'n8n pulls data from Google Analytics, Meta, Google Ads, and SEO tools on a schedule → builds formatted report with metrics, period comparison, and key findings template → sends to client with consultant\'s commentary section pre-filled. 2-hour reports become 20-minute reviews.', timeSaved: '12h/week', impact: 'Reporting: 2h per client → 20min' },
      { name: 'Prospect Response Automation', description: 'Website or LinkedIn inquiry → instant automated response within 60 seconds with calendar link, service overview, and case study examples. Day 2 and Day 5 follow-up if no booking. Responds to every inquiry at the moment of highest intent.', timeSaved: '3h/week', impact: '91% of inquiries responded within 60s' },
      { name: 'Client Relationship Touchpoints', description: 'Between deliverables → automated value-add emails: relevant industry article, platform algorithm update, benchmark comparison for their industry. Keeps clients engaged and reinforces your expertise without requiring manual content creation.', timeSaved: '4h/week', impact: 'Client retention rate up 38%' },
      { name: 'Proposal Generation Workflow', description: 'Discovery call completed → intake form responses flow into proposal template → n8n auto-populates relevant case studies, service descriptions, and investment options based on client type and goals → draft ready for consultant review within 2 hours.', timeSaved: '5h/week', impact: 'Proposal delivery: 5 days → 4 hours' }
    ],
    tools: ['n8n', 'Google Sheets', 'Calendly', 'Claude AI'],
    stats: { timeSaved: '25h/week', revenueImpact: '$7,900/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can this handle reporting for clients on completely different platforms?', a: 'Yes — each client workflow pulls from their specific platform set. Client A reports from Google Analytics + Meta. Client B from LinkedIn Ads + HubSpot. Each is independently configured.' },
      { q: 'What if I want to add personal commentary to each automated report?', a: 'The workflow generates the data section automatically and leaves a clearly marked "Commentary" section for you to complete. You spend your time on insight and strategy, not data pulling.' },
      { q: 'Can automation help me handle the inquiry volume if my business grows significantly?', a: 'Yes — automation scales linearly. Whether you receive 3 inquiries or 30, the response quality and speed is identical. The system handles volume spikes without any additional effort from you.' }
    ]
  },
  {
    slug: 'graphic-design-studio',
    name: 'Graphic Design Studio',
    category: 'Agencies & Consulting',
    tagline: 'Automate creative briefs, revision requests, and invoice collection so your designers stay in creative flow instead of managing client communication.',
    description: 'Graphic design studios and freelance designers lose significant creative time to client communication overhead: brief collection, revision tracking, approval chasing, and invoice follow-up. Automation systematizes the business infrastructure so your creative team does creative work.',
    painPoints: [
      'Creative brief collection is an email chain that spans days and produces incomplete briefs that require multiple clarification calls',
      'Revision requests arrive in scattered channels — email, WhatsApp, verbal on calls — with no consistent tracking system',
      'Invoice collection is sporadic because designers are uncomfortable sending follow-up payment requests',
      'Project timelines slip because there is no systematic milestone tracking and client deadline reminder system'
    ],
    workflows: [
      { name: 'Automated Creative Brief Collection', description: 'New project confirmed → client receives structured creative brief form covering goals, audience, deliverables, reference examples, and timeline. Responses flow directly into project management. Brief quality improves; clarification calls drop by 64%.', timeSaved: '5h/week', impact: 'Brief clarification calls down 64%' },
      { name: 'Revision Request Tracking', description: 'Design delivered → client receives structured revision request form (not a blank email). All revision notes compiled into a single organized document. Designer receives consolidated revision summary — not 7 emails and a voice note.', timeSaved: '4h/week', impact: 'Revision rounds 40% faster' },
      { name: 'Payment Follow-Up Automation', description: 'Invoice sent → 10-day reminder if unpaid. 20-day second notice. 30-day escalation with payment link prominently featured. Average collection time drops from 44 days to 18. Designer never has to send an uncomfortable payment email.', timeSaved: '3h/week', impact: 'Collection time: 44 days → 18 days' },
      { name: 'Project Milestone Reminders', description: 'Project kickoff → timeline entered once → n8n sends automated reminders to client before each milestone: "Your brand guide feedback is due in 3 days." Keeps projects on track without designer follow-up. Late projects reduced by 57%.', timeSaved: '3h/week', impact: 'Late projects reduced by 57%' }
    ],
    tools: ['n8n', 'Stripe', 'Typeform', 'Notion'],
    stats: { timeSaved: '16h/week', revenueImpact: '$4,100/month', deploymentDays: 7, roiMonths: 2 },
    faq: [
      { q: 'Can the brief collection form be customized for different project types?', a: 'Yes — logo projects, brand identities, social media assets, and print design all have different brief templates. Each project type triggers the appropriate form automatically.' },
      { q: 'What project management tools does this integrate with?', a: 'We integrate with Notion, Asana, Monday.com, ClickUp, and Trello. Brief responses and revision notes flow directly into your existing project management setup.' },
      { q: 'Can automated invoice follow-up be paused for specific VIP clients?', a: 'Yes — VIP or sensitive accounts can be excluded from automated follow-up. Manual communication continues for those relationships while automation handles the rest of the client portfolio.' }
    ]
  },
  {
    slug: 'hr-consulting-firm',
    name: 'HR Consulting Firm',
    category: 'Agencies & Consulting',
    tagline: 'Automate employee onboarding programs, compliance reminder sequences, and HR audit deliveries so your consultants serve more clients at higher margin.',
    description: 'HR consulting firms deliver enormous value in organizational design, compliance, and talent strategy — but spend significant consultant time on repeatable delivery tasks that should be systematized. Automation handles the delivery layer of consulting engagements so your team spends time on insight and relationships.',
    painPoints: [
      'Employee onboarding program delivery is manual for every client engagement — the same materials delivered differently each time',
      'Compliance deadline reminders (EEOC filings, I-9 reviews, benefits enrollment) require manual tracking across multiple client calendars',
      'Assessment and survey data collection for HR audits is manual — consultants spending hours collecting what an automated form could gather in days',
      'Client engagement renewals are handled reactively when a better system would initiate the conversation at the right moment'
    ],
    workflows: [
      { name: 'Onboarding Program Delivery Automation', description: 'New hire started → automated day-1, week-1, and month-1 onboarding sequences delivered directly to employee. Manager receives parallel supervisor guide. HR consultant sees completion dashboard. Onboarding delivery becomes consistent across all client organizations.', timeSaved: '8h/week', impact: 'Onboarding delivery 100% consistent' },
      { name: 'Compliance Deadline Calendar', description: 'Client compliance calendar configured → automated reminders to each client 60, 30, and 14 days before each compliance deadline. Includes specific action items and documentation requirements. No compliance deadline slips under your watch.', timeSaved: '5h/week', impact: '100% compliance deadline compliance' },
      { name: 'HR Audit Data Collection', description: 'Audit engagement started → automated survey sequences sent to relevant employees, managers, and executives. Responses aggregated and analyzed automatically. Consultant receives structured data package for analysis — not raw form submissions.', timeSaved: '7h/week', impact: 'Audit data collection time cut by 68%' },
      { name: 'Engagement Renewal Campaign', description: '60 days before engagement end → automated renewal sequence: results summary, next-phase recommendations, and renewal proposal offer. 71% of clients who engage with the renewal sequence renew vs. 38% of those who receive a reactive renewal email.', timeSaved: '3h/week', impact: '71% renewal rate on automated sequence' }
    ],
    tools: ['n8n', 'Typeform', 'Google Sheets', 'Slack'],
    stats: { timeSaved: '24h/week', revenueImpact: '$7,600/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can the onboarding delivery automation be configured per client company culture?', a: 'Yes — each client organization has its own onboarding template set reflecting their culture, policies, and role-specific requirements. The automation delivers the right program to the right employee at the right client.' },
      { q: 'How does the compliance calendar handle different compliance requirements by state and industry?', a: 'Compliance calendars are built per client based on their state(s) of operation and industry. A California tech company gets different compliance triggers than a Texas manufacturing client.' },
      { q: 'Can the HR audit automation handle sensitive or confidential survey responses?', a: 'Yes — survey responses can be anonymized at the collection stage. Individual responses are never attributed in the aggregated consultant data package unless the client specifically requires attribution.' }
    ]
  },
  {
    slug: 'social-media-agency',
    name: 'Social Media Agency',
    category: 'Agencies & Consulting',
    tagline: 'Automate content scheduling, performance reporting, and client approval workflows so your team creates better content and manages more accounts.',
    description: 'Social media agencies spend a disproportionate amount of team time on scheduling, reporting, and approval management rather than creative strategy. Automation handles the operational infrastructure so your creative and strategy team stays focused on the work that actually builds client brands.',
    painPoints: [
      'Content approval cycles take 3-5 days because clients don\'t respond to approval requests promptly, delaying the posting schedule',
      'Monthly performance reports require manually pulling metrics from 3-5 platforms per client — a day of work every month',
      'Content scheduling is done manually across multiple clients and platforms — a time-consuming and error-prone process',
      'Client communication between deliverable cycles is sporadic — accounts go quiet and clients question the value of the retainer'
    ],
    workflows: [
      { name: 'Content Approval Automation', description: 'Content batch ready → client receives approval request email with preview links and 1-click approve/request changes. 24-hour reminder if no response. 48-hour escalation. Content approved → automatically queued for scheduling. Approval cycle: 5 days → 22 hours.', timeSaved: '7h/week', impact: 'Approval cycle: 5 days → 22 hours' },
      { name: 'Multi-Platform Performance Reports', description: 'n8n pulls monthly performance data from Instagram, LinkedIn, Facebook, TikTok, and Twitter APIs → generates per-client performance report with platform comparisons, best-performing content, and growth metrics → delivered automatically on reporting day.', timeSaved: '10h/week', impact: '10h/month reporting time eliminated' },
      { name: 'Content Calendar Scheduling', description: 'Approved content batch → n8n pushes to Buffer, Hootsuite, or Sprout Social scheduling queue at optimal posting times per platform. Posts go out on schedule without manual scheduling. Posting consistency reaches 100%.', timeSaved: '5h/week', impact: '100% posting consistency achieved' },
      { name: 'Client Value Digest', description: 'Weekly automated email to each client highlighting key wins from the past 7 days: best-performing post, follower growth, engagement highlights. Keeps clients seeing value between monthly reports. Churn rate decreases by 41%.', timeSaved: '4h/week', impact: 'Client churn rate down 41%' }
    ],
    tools: ['n8n', 'Buffer API', 'Google Sheets', 'Slack'],
    stats: { timeSaved: '27h/week', revenueImpact: '$8,400/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'What social media platforms does the reporting automation cover?', a: 'We integrate with Meta (Instagram + Facebook), LinkedIn, TikTok, X (Twitter), Pinterest, and YouTube. Each platform\'s API has different data availability; we configure reports to include what each platform exposes.' },
      { q: 'Can the scheduling automation post directly without a third-party tool like Buffer?', a: 'For some platforms, yes — n8n can post directly via platform APIs. For others (Instagram in particular), a scheduling tool is required due to API restrictions. We configure the most direct path available for each platform.' },
      { q: 'How does the approval workflow handle content revisions vs. outright rejections?', a: 'Revision requests come with specific feedback captured in the approval form. Rejected content triggers a revision task in your project management tool. Approved with minor notes triggers automated revision request to the designer.' }
    ]
  },
  {
    slug: 'videography-production-company',
    name: 'Videography / Production Company',
    category: 'Agencies & Consulting',
    tagline: 'Automate client briefing, revision tracking, and delivery workflows so your crew shoots more and coordinates less.',
    description: 'Video production companies lose billable hours to pre-production communication, revision management, and file delivery logistics. Automation handles the project communication layer so your team focuses on production quality rather than project coordination.',
    painPoints: [
      'Pre-production briefing calls are often redundant because the information could have been collected via a structured brief form',
      'Video review and revision feedback arrives in scattered formats — email, verbal notes from calls, written comments — making revision lists inconsistent',
      'File delivery to clients involves manual compression, upload, and notification steps that could be automated',
      'Invoice collection after delivery is often delayed because the production team is already on the next project'
    ],
    workflows: [
      { name: 'Pre-Production Brief Automation', description: 'Project confirmed → client receives structured video brief capturing goals, audience, tone, style references, script requirements, location, and delivery specs. Responses flow to production planning automatically. Pre-production call time reduced by 58%.', timeSaved: '5h/week', impact: 'Pre-production call time cut by 58%' },
      { name: 'Revision Request Collection', description: 'Video cut delivered → client receives structured review form with timecoded feedback fields. All revision notes consolidated into a single editing document. Editor receives one organized revision list instead of 6 emails and a voice note.', timeSaved: '4h/week', impact: 'Revision rounds 45% faster' },
      { name: 'File Delivery & Access Management', description: 'Final file uploaded to delivery platform → automatic notification to client with access link, file specifications, and download instructions. Usage rights and watermarked vs. unwatermarked versions delivered to correct recipients automatically.', timeSaved: '3h/week', impact: 'Delivery fully automated' },
      { name: 'Post-Project Invoice & Review', description: 'Project complete → invoice generated and sent automatically → 10-day payment reminder if outstanding → simultaneously, review request sent to client for Google and Clutch. Two critical tasks handled without any manual trigger.', timeSaved: '3h/week', impact: 'Invoice + review captured every project' }
    ],
    tools: ['n8n', 'Stripe', 'Typeform', 'Frame.io API'],
    stats: { timeSaved: '16h/week', revenueImpact: '$4,600/month', deploymentDays: 7, roiMonths: 2 },
    faq: [
      { q: 'Can the brief automation handle different project types — corporate, wedding, commercial?', a: 'Yes — brief templates are configured per project type. A corporate brand video brief looks completely different from a wedding videography brief or a product commercial brief.' },
      { q: 'What video review platforms does this integrate with?', a: 'We integrate with Frame.io, Vimeo Review, Wipster, and most major video collaboration platforms. Review links are sent automatically upon upload to your platform of choice.' },
      { q: 'Can the delivery automation handle large file sets and multiple deliverable formats?', a: 'Yes — delivery notifications can include multiple links for different formats (social cuts, broadcast master, web version). Access permissions and watermarking are configured per deliverable type.' }
    ]
  },
  {
    slug: 'cleaning-company-commercial',
    name: 'Commercial Cleaning Company',
    category: 'Agencies & Consulting',
    tagline: 'Automate client quality check-ins, staff scheduling confirmation, and service renewal sequences that reduce churn and make your operations run without constant oversight.',
    description: 'Commercial cleaning companies operate on thin margins with high staff turnover and recurring service contracts. Automation handles the client communication, service quality tracking, and staff scheduling confirmation that currently depends on supervisors and account managers juggling everything manually.',
    painPoints: [
      'Service quality issues are discovered by clients before the company is aware — no proactive quality monitoring system exists',
      'Staff scheduling confirmation and no-show follow-up requires manual supervisor calls at the start of every shift',
      'Contract renewal conversations are reactive — clients cancel before anyone initiates the renewal discussion',
      'New contract onboarding involves multiple manual steps: site walkthrough scheduling, supplies ordering, and access coordination'
    ],
    workflows: [
      { name: 'Post-Service Quality Check-In', description: 'Service completed → client contact receives automated satisfaction check-in via SMS. Score below 4 → immediate supervisor alert and same-day response. Score above 4 → automatic Google review request. Surfaces issues before they become cancellations.', timeSaved: '5h/week', impact: 'Issues resolved before cancellation' },
      { name: 'Staff Shift Confirmation System', description: 'Shift scheduled → staff member receives SMS confirmation 24h prior. Response required. No response by 12h before → automated escalation to supervisor to arrange coverage. No-show rate drops from 14% to under 4%.', timeSaved: '6h/week', impact: 'No-show rate: 14% → 4%' },
      { name: 'Contract Renewal Campaign', description: '90 days before contract expiry → automated renewal proposal email with current pricing, service history, and upgrade options. 60-day follow-up. 30-day last call. Renewal initiation 90 days early increases renewal rate from 67% to 88%.', timeSaved: '4h/week', impact: 'Renewal rate: 67% → 88%' },
      { name: 'New Contract Onboarding', description: 'Contract signed → automated sequence: site visit scheduling, supplies request form, access credential request, staff assignment notification. All coordination happens automatically. New account setup time reduced from 2 weeks to 4 days.', timeSaved: '4h/week', impact: 'New account setup: 2 weeks → 4 days' }
    ],
    tools: ['n8n', 'Twilio', 'Google Sheets', 'Jobber'],
    stats: { timeSaved: '20h/week', revenueImpact: '$4,800/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can the quality check-in work for multiple service locations under one client?', a: 'Yes — each service location has a separate quality check-in workflow. Aggregate satisfaction scores roll up to an account-level dashboard so supervisors can identify patterns across locations.' },
      { q: 'How does the staff confirmation system handle language barriers with non-English speaking staff?', a: 'Messages can be configured in multiple languages per staff member profile. Spanish and English are the most common configuration. Additional languages are supported.' },
      { q: 'Can this integrate with our existing scheduling or field service software?', a: 'Yes — we integrate with Jobber, ServiceTitan, Swept, Janitorial Manager, and most major commercial cleaning management platforms.' }
    ]
  }
]
