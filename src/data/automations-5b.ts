import type { Profession } from './automations-1'

export const professions5b: Profession[] = [
  // ─── LEGAL (12) ──────────────────────────────────────────────────────────────
  {
    slug: 'immigration-attorney',
    name: 'Immigration Attorney',
    category: 'Legal',
    tagline: 'Automate case status updates, document collection, and deadline reminders so your attorneys practice immigration law instead of chasing paperwork.',
    description: 'Immigration law is deadline-critical and document-intensive — and clients are often anxious about their status. Automation handles the systematic document collection, deadline tracking, and proactive status communication that reduces client anxiety and prevents costly deadline misses.',
    painPoints: [
      'Required government forms and supporting documents are collected manually — follow-up is inconsistent and errors are costly',
      'Immigration deadlines (visa expiry, response to RFE, interview dates) must be tracked for every active case — manual tracking creates risk',
      'Clients call repeatedly for case status updates that could be communicated proactively',
      'New consultation booking is entirely phone-based — a significant bottleneck for a high-inquiry-volume practice'
    ],
    workflows: [
      { name: 'Document Collection Sequences', description: 'New matter opened → automated document checklist sent to client with secure upload portal link. Each required document tracked. 3-day reminder if incomplete. 7-day escalation. Paralegals never chase documents manually again.', timeSaved: '7h/week', impact: 'Document collection time cut by 68%' },
      { name: 'Case Deadline Tracking System', description: 'Case milestones and government deadlines entered → automated 30-day, 14-day, and 7-day reminders to attorney and client. RFE response deadlines, visa expiry warnings, and interview date reminders all tracked systematically.', timeSaved: '5h/week', impact: 'Zero deadline misses on tracked cases' },
      { name: 'Case Status Communication', description: 'USCIS or NVC status change detected → client notified within 24 hours with plain-language explanation. Attorney adds context if needed. Clients stop calling for status; anxiety significantly reduced.', timeSaved: '4h/week', impact: 'Client status calls down 67%' },
      { name: 'Consultation Booking Automation', description: 'Website or referral inquiry → immediate response with consultation types, fees, and online booking link. Day 2 follow-up if no booking. Consultation booking rate from inquiries up 44%.', timeSaved: '3h/week', impact: 'Consultation booking rate up 44%' }
    ],
    tools: ['n8n', 'Twilio', 'Calendly', 'DocuSign'],
    stats: { timeSaved: '20h/week', revenueImpact: '$8,200/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can the system monitor USCIS case status automatically?', a: 'Yes — we integrate with USCIS case status API to detect status changes and trigger client notifications automatically.' },
      { q: 'Can document collection be configured per visa type?', a: 'Yes — each case type (H-1B, green card, DACA, family petition) has its own document checklist. The correct checklist triggers automatically based on case type.' },
      { q: 'Is client communication via automated text messaging appropriate for immigration cases?', a: 'Status and deadline reminders via SMS are appropriate and helpful. Legal advice always comes from the attorney through appropriate channels.' }
    ]
  },
  {
    slug: 'family-law-attorney',
    name: 'Family Law Attorney',
    category: 'Legal',
    tagline: 'Automate client intake, document collection, and court deadline tracking so your attorneys focus on advocacy instead of case administration.',
    description: 'Family law practices handle emotionally charged cases with significant documentation and deadline requirements. Clients are often going through the most difficult periods of their lives — clear, proactive communication from the law firm is both legally important and therapeutically valuable.',
    painPoints: [
      'New client intake for divorce or custody matters requires extensive information gathering that is currently done via phone or in-person',
      'Financial disclosure documents (income, assets, debts) are collected manually — a common bottleneck in divorce proceedings',
      'Court filing deadlines must be tracked for every active matter — manual tracking in a busy practice creates risk',
      'Client communication is reactive — clients in emotionally difficult situations call repeatedly for reassurance and updates'
    ],
    workflows: [
      { name: 'New Client Intake Automation', description: 'Consultation completed → automated intake questionnaire sent to client covering case history, children involved, assets and debts, and key dates. All information collected before the second meeting — saving 1-2 hours of billable intake time per case.', timeSaved: '6h/week', impact: 'Intake time saved per matter: 1-2 hours' },
      { name: 'Financial Disclosure Collection', description: 'Financial disclosure required → automated request sent with secure document upload for bank statements, tax returns, pay stubs, and asset documentation. Reminder sequence until complete. Disclosure process 58% faster.', timeSaved: '5h/week', impact: 'Financial disclosure 58% faster' },
      { name: 'Court Deadline Management', description: 'Hearing or filing deadline set → 30-day, 14-day, and 3-day alerts to attorney and paralegal. Response deadline to opposing counsel tracked. Discovery deadlines managed. No deadline missed due to calendar oversight.', timeSaved: '4h/week', impact: 'Zero deadline misses on tracked matters' },
      { name: 'Client Update Sequence', description: 'Case milestone reached → proactive client update: what happened, what it means, what comes next. Reduces anxiety-driven calls by 54%. Clients who receive proactive communication give higher satisfaction ratings and generate more referrals.', timeSaved: '4h/week', impact: 'Client update calls down 54%' }
    ],
    tools: ['n8n', 'Clio', 'DocuSign', 'Twilio'],
    stats: { timeSaved: '20h/week', revenueImpact: '$7,600/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'How is sensitive client information handled in automated collection forms?', a: 'All document collection uses encrypted, HIPAA-grade secure portals (ShareFile, HighQ, or your existing secure portal). No sensitive data is handled via standard email.' },
      { q: 'Can client communication be paused during sensitive negotiation phases?', a: 'Yes — any automation can be paused per matter. High-stakes negotiation phases are often managed with entirely manual communication.' },
      { q: 'What family law practice management software does this integrate with?', a: 'We integrate with Clio, MyCase, and most major legal practice management platforms.' }
    ]
  },
  {
    slug: 'personal-injury-attorney',
    name: 'Personal Injury Attorney',
    category: 'Legal',
    tagline: 'Automate case status updates, medical record collection, and settlement communication so your team manages more cases at higher margin.',
    description: 'Personal injury practices are case-volume businesses — the more cases managed per attorney, the better the economics. Automation handles the client communication and document collection that currently prevents scaling, allowing each attorney to manage a larger caseload without service quality degradation.',
    painPoints: [
      'Medical record collection from multiple providers is a months-long manual chase that delays case resolution',
      'Client status calls consume significant paralegal time for questions that could be answered by proactive case updates',
      'Demand letter preparation requires medical record compilation and economic damages calculation that has manual steps',
      'Liens from healthcare providers must be tracked and negotiated — a manual process prone to oversights'
    ],
    workflows: [
      { name: 'Medical Record Collection System', description: 'Medical providers identified → automated medical record request letters generated and sent. Follow-up at 30, 60, and 90 days. Status tracked per provider. Record collection time reduced from 4 months average to under 7 weeks.', timeSaved: '8h/week', impact: 'Record collection: 4 months → 7 weeks' },
      { name: 'Client Case Update Sequence', description: 'Case milestone reached → proactive client update via SMS and email: current status, recent developments, and next expected milestone. Client status calls drop 71%. Client satisfaction increases significantly.', timeSaved: '6h/week', impact: 'Client calls down 71%' },
      { name: 'Settlement Communication Workflow', description: 'Settlement offer received → client notification with offer summary, attorney analysis, and consultation scheduling link. Acceptance or counter-offer tracked. Settlement communication systematized from offer to disbursement.', timeSaved: '4h/week', impact: 'Settlement communication systematized' },
      { name: 'Lien Tracking & Resolution', description: 'Lien identified → automated lien registry tracking. Negotiation status updated. Resolution documented. Final disbursement calculation triggered. Liens tracked systematically — none missed; disbursements accurate.', timeSaved: '3h/week', impact: 'Lien tracking 100% accurate' }
    ],
    tools: ['n8n', 'Litify', 'DocuSign', 'Google Sheets'],
    stats: { timeSaved: '22h/week', revenueImpact: '$9,400/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'What legal software does personal injury automation integrate with?', a: 'We integrate with Litify, Filevine, SmartAdvocate, and most major personal injury case management platforms.' },
      { q: 'Can medical record requests be sent via certified mail or only digitally?', a: 'Digital requests with HIPAA-compliant secure fax or electronic submission are supported. Physical mail requests can be triggered as part of the workflow and tracked for responses.' },
      { q: 'Can the lien tracking system flag potential Medicare/Medicaid liens automatically?', a: 'Yes — cases with identified government-program coverage trigger automatic Medicare/Medicaid lien check reminders at appropriate case stages.' }
    ]
  },
  {
    slug: 'estate-planning-attorney',
    name: 'Estate Planning Attorney',
    category: 'Legal',
    tagline: 'Automate plan review reminders, document signing sequences, and client lifecycle communication that builds a recurring revenue book of business.',
    description: 'Estate planning is not a one-time transaction — it requires regular review as life events occur and laws change. Automation turns a transactional practice into a recurring relationship business through systematic lifecycle communication that brings clients back for reviews and updates.',
    painPoints: [
      'Estate plans are created but never systematically reviewed — clients with outdated plans create liability and miss upgrade opportunities',
      'Major life event triggers (marriage, divorce, new child, new asset) that should prompt estate plan updates are never tracked or acted upon',
      'Document signing coordination is manual — getting all signatories in front of a notary requires extensive scheduling',
      'Client referrals are the primary new business source but are never systematically requested from satisfied clients'
    ],
    workflows: [
      { name: 'Estate Plan Review Reminders', description: 'Every 3 years after plan completion → automated review reminder to client. Annual reminder for clients with significant changes in the prior year. Law change event → proactive update invitation sent to affected clients. Review engagements up 3.4x.', timeSaved: '5h/week', impact: 'Review engagements up 3.4x' },
      { name: 'Life Event Trigger Campaigns', description: 'Annual check-in email to clients asking about life changes: new child, marriage, divorce, business acquisition, inheritance. Positive responses trigger plan update consultation invitation. Ongoing client relationship maintained proactively.', timeSaved: '4h/week', impact: 'Life event revenue captured' },
      { name: 'Document Signing Coordination', description: 'Documents ready → automated signing coordination: notary appointment scheduling, location options, and document preparation checklist. Remote online notarization option offered where legally available. Signing coordination time cut by 63%.', timeSaved: '4h/week', impact: 'Signing coordination: 63% faster' },
      { name: 'Referral Request Sequence', description: '30 days after plan signing → satisfaction check + referral invitation asking for friends or family members who should have estate plans. 1 in 4 estate planning clients has at least one referral when systematically asked. Most are never asked.', timeSaved: '2h/week', impact: '1 referral per 4 clients when asked' }
    ],
    tools: ['n8n', 'Clio', 'Calendly', 'Twilio'],
    stats: { timeSaved: '16h/week', revenueImpact: '$6,800/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can the review reminder system account for different plan complexity levels?', a: 'Yes — a simple will and healthcare directive has a different review cycle than a complex trust with business succession planning. Review timing is configured per plan type.' },
      { q: 'Can law change notifications be configured for specific states?', a: 'Yes — tax law changes, Medicaid planning changes, and state-specific estate law updates can be configured as triggers for targeted client outreach.' },
      { q: 'Can online notarization scheduling be integrated for remote signing?', a: 'Yes — we integrate with Notarize, Pavaso, and most major RON platforms where remote notarization is legally permitted.' }
    ]
  },
  {
    slug: 'criminal-defense-attorney',
    name: 'Criminal Defense Attorney',
    category: 'Legal',
    tagline: 'Automate client communication, court date reminders, and discovery management so your attorneys focus on defense strategy instead of case administration.',
    description: 'Criminal defense requires urgent, precise communication with clients who are often in high-stress situations. Automation ensures no court date reminder is missed, no discovery deadline is forgotten, and every client feels informed and supported throughout their case.',
    painPoints: [
      'Court date reminders to clients are sent manually — clients who miss court appearances create emergency situations and potential liability',
      'Discovery receipt and review tracking is manual in a case type where timing is legally critical',
      'New client intake requires urgent processing — criminal matters often need same-day or next-day engagement',
      'Client family communication (for detained clients) requires specific protocols that are currently inconsistent'
    ],
    workflows: [
      { name: 'Court Date Reminder System', description: 'Court date entered → automated reminders to client at 2 weeks, 1 week, 3 days, and day before. SMS and email. Specific court location, time, and dress code included. Client no-shows reduced from 9% to under 1%.', timeSaved: '4h/week', impact: 'Client no-shows: 9% → 1%' },
      { name: 'Discovery Deadline Tracking', description: 'Discovery deadline entered → attorney alerts at 14 days, 7 days, and 3 days. Discovery received → logged and attorney notified immediately for review prioritization. No discovery deadline missed on tracked cases.', timeSaved: '4h/week', impact: 'Zero discovery deadline misses' },
      { name: 'Urgent Intake Processing', description: 'Emergency criminal intake inquiry → immediate automated response with attorney on-call contact and intake questionnaire. Urgency level detected from keywords → appropriate escalation to on-call attorney. Emergency cases responded to in minutes.', timeSaved: '3h/week', impact: 'Emergency response time < 15 minutes' },
      { name: 'Case Milestone Communication', description: 'Each procedural milestone (arraignment complete, motions filed, plea offer received) → automated client notification in plain language explaining what happened and what comes next. Reduces anxiety calls by 58%.', timeSaved: '3h/week', impact: 'Anxiety calls down 58%' }
    ],
    tools: ['n8n', 'Twilio', 'Clio', 'Google Sheets'],
    stats: { timeSaved: '15h/week', revenueImpact: '$6,400/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can court date reminders be configured for multiple hearing dates in the same case?', a: 'Yes — each scheduled hearing has its own reminder sequence. Cases with multiple hearings maintain independent reminder tracks.' },
      { q: 'Can communication with detained clients who may not have regular phone access be handled?', a: 'Family member contact protocols can be configured. The system identifies designated family contacts and routes communications appropriately for clients with limited access.' },
      { q: 'Can the system handle multiple jurisdictions with different court systems?', a: 'Yes — each jurisdiction\'s court system and scheduling format is configured separately. Multi-jurisdictional practices manage each court\'s requirements independently.' }
    ]
  },
  {
    slug: 'bankruptcy-attorney',
    name: 'Bankruptcy Attorney',
    category: 'Legal',
    tagline: 'Automate means test document collection, trustee communication preparation, and client education sequences that make your practice run more efficiently.',
    description: 'Bankruptcy practices handle high document volume with clients who are often overwhelmed and stressed. Automation systematizes the document collection and client education that is currently consuming disproportionate paralegal time.',
    painPoints: [
      'Means test document collection (6 months of income, 2 years of tax returns, bank statements) is a lengthy manual chase',
      'Clients are often confused about the bankruptcy process — repeated education calls consume attorney and paralegal time',
      '341 meeting preparation requires client preparation that is done manually and inconsistently',
      'Post-discharge follow-up for credit rebuilding guidance positions the firm as a long-term partner — currently never done'
    ],
    workflows: [
      { name: 'Document Collection Automation', description: 'Engagement signed → automated document request covering all means test requirements: income documentation, tax returns, bank statements, property appraisals, and vehicle values. Completion tracked. Collection time cut by 61%.', timeSaved: '7h/week', impact: 'Document collection time cut by 61%' },
      { name: 'Client Education Sequence', description: 'Engagement signed → 5-part bankruptcy education email series delivered over 2 weeks: what to expect, what to avoid, automatic stay explanation, discharge requirements, and post-discharge responsibilities. Education calls reduced 64%.', timeSaved: '4h/week', impact: 'Education calls reduced by 64%' },
      { name: '341 Meeting Preparation', description: '2 weeks before 341 meeting → preparation guide delivered: what to bring, what the trustee will ask, how to answer. 48 hours before → reminder with trustee contact and location. Clients arrive prepared; meetings run smoother.', timeSaved: '3h/week', impact: '341 meeting preparation systematized' },
      { name: 'Post-Discharge Credit Rebuilding', description: '30 days after discharge → credit rebuilding guide delivered. 6 months → follow-up with progress check. 12 months → credit rebuild milestone celebration + referral invitation. Positions firm as partner beyond the case.', timeSaved: '2h/week', impact: 'Referral rate from past clients 2.3x' }
    ],
    tools: ['n8n', 'Twilio', 'Google Sheets', 'DocuSign'],
    stats: { timeSaved: '17h/week', revenueImpact: '$5,800/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can document collection handle Chapter 7 and Chapter 13 requirements separately?', a: 'Yes — Chapter 7 and Chapter 13 have different document requirements and timelines. Each case type triggers the appropriate collection sequence.' },
      { q: 'Can the means test document checklist be configured per district\'s specific requirements?', a: 'Yes — bankruptcy districts have slightly different requirements. Checklists are configured per district.' },
      { q: 'What bankruptcy practice management software does this integrate with?', a: 'We integrate with Best Case, Needles, and most major bankruptcy practice management platforms.' }
    ]
  },
  {
    slug: 'employment-attorney',
    name: 'Employment Attorney',
    category: 'Legal',
    tagline: 'Automate intake questionnaires, statute of limitations tracking, and EEOC deadline management so your employment law practice never misses a critical date.',
    description: 'Employment law practices handle high-volume inquiries and strict filing deadlines — EEOC charges, right-to-sue letters, and statute of limitations vary by claim type and state. Automation handles intake systematization and deadline tracking that protects your practice and your clients.',
    painPoints: [
      'Employment discrimination intake requires extensive fact-gathering about employment history, adverse actions, and witnesses',
      'EEOC charge filing deadlines (180 or 300 days from the discriminatory act) must be tracked precisely — missing them bars the claim',
      'Right-to-sue letter receipt triggers a 90-day federal court filing window that must be tracked automatically',
      'Potential client screening for merit and statute of limitations requires consistent intake questionnaires'
    ],
    workflows: [
      { name: 'Employment Intake Questionnaire', description: 'Consultation inquiry received → automated intake questionnaire: employment history, adverse action details, witnesses, documentation available, and timeline. Completed questionnaire reviewed before consultation → attorney preparation time cut by 68%.', timeSaved: '5h/week', impact: 'Consultation prep time cut by 68%' },
      { name: 'EEOC & Filing Deadline Tracker', description: 'Discriminatory act date entered → EEOC filing deadline calculated and tracked automatically. 60-day, 30-day, and 14-day alerts to attorney. Right-to-sue letter received → 90-day federal filing deadline automatically set and tracked.', timeSaved: '5h/week', impact: 'Zero deadline misses on tracked cases' },
      { name: 'Client Communication Sequence', description: 'EEOC charge filed → client notification. Mediation offer received → explanation and consultation scheduling. Right-to-sue issued → immediate notification with next steps. Clients informed at every critical juncture.', timeSaved: '3h/week', impact: 'Client communication systematized' },
      { name: 'Statute of Limitations Alert System', description: 'New matter with state claim → applicable SOL calculated by state and claim type → alert schedule set. SOL approaching → escalation to attorney with urgency flag. No state claim ever barred by missed SOL on tracked matters.', timeSaved: '3h/week', impact: 'SOL tracking 100% systematic' }
    ],
    tools: ['n8n', 'Clio', 'Google Sheets', 'Twilio'],
    stats: { timeSaved: '17h/week', revenueImpact: '$7,200/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can the EEOC deadline tracker differentiate between 180-day and 300-day filing jurisdictions?', a: 'Yes — the system determines the applicable filing window based on the jurisdiction and claim type automatically.' },
      { q: 'Can intake questionnaires screen for statute of limitations issues before the consultation?', a: 'Yes — the questionnaire captures the discriminatory act date and triggers a preliminary SOL calculation. Cases potentially outside the statute are flagged for attorney review before the consultation.' },
      { q: 'Can the system handle both employee-side and employer-side employment matters?', a: 'Yes — employee and employer clients have completely different intake questionnaires, deadline types, and communication sequences.' }
    ]
  },
  {
    slug: 'intellectual-property-attorney',
    name: 'Intellectual Property Attorney',
    category: 'Legal',
    tagline: 'Automate trademark monitoring, maintenance deadline tracking, and client portfolio reporting so your IP practice never lets a valuable right lapse.',
    description: 'IP law practices manage portfolios of trademarks, patents, and copyrights with critical maintenance deadlines — maintenance fees, renewal dates, and monitoring obligations. Automation handles the systematic tracking and client reporting that protects the portfolio and demonstrates value.',
    painPoints: [
      'Patent maintenance fees and trademark renewal deadlines must be tracked across entire client portfolios — manual tracking creates risk',
      'Trademark monitoring for infringement requires systematic watching that is often done inconsistently',
      'Client IP portfolio reporting is assembled manually — showing clients their full portfolio value requires significant effort',
      'New trademark application status updates are pulled manually from USPTO — clients call for updates that could be automated'
    ],
    workflows: [
      { name: 'Maintenance Deadline Tracking', description: 'Patent and trademark maintenance deadlines entered → 1-year, 6-month, 90-day, and 30-day alerts to attorney and client. USPTO office action deadlines tracked. Nothing in the portfolio ever lapses due to missed maintenance on tracked matters.', timeSaved: '6h/week', impact: 'Zero portfolio lapses on tracked rights' },
      { name: 'USPTO Status Monitoring', description: 'Active applications monitored via USPTO API → status changes detected and client notified within 24 hours with plain-language explanation. Office actions trigger immediate attorney alert and client notification. Manual status checking eliminated.', timeSaved: '5h/week', impact: 'USPTO monitoring fully automated' },
      { name: 'Portfolio Status Reports', description: 'Quarterly → automated client portfolio report: all marks and patents, current status, upcoming deadlines, and any issues requiring attention. Clients see their full portfolio in context. Demonstrates value; drives renewal and expansion work.', timeSaved: '4h/week', impact: 'Portfolio reporting fully automated' },
      { name: 'Trademark Watch Alerts', description: 'Trademark monitoring subscription → new potentially conflicting mark filed → immediate alert to attorney with comparison analysis. Client notified promptly. Enforcement opportunities captured before rights are diluted.', timeSaved: '3h/week', impact: 'Infringement alerts within 24 hours' }
    ],
    tools: ['n8n', 'USPTO API', 'Google Sheets', 'Twilio'],
    stats: { timeSaved: '19h/week', revenueImpact: '$8,600/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'What IP management software does this integrate with?', a: 'We integrate with FoundationIP, Anaqua, CPA Global, and most major IP management platforms.' },
      { q: 'Can the USPTO monitoring cover both trademark and patent databases?', a: 'Yes — both USPTO TESS (trademarks) and USPTO Patent Full-Text Database are monitored via their respective APIs.' },
      { q: 'Can portfolio reports be formatted for different client types — startup founders vs. large corporations?', a: 'Yes — startup clients receive simplified portfolio summaries; corporate clients receive detailed technical reports with classification analysis.' }
    ]
  },
  {
    slug: 'tax-attorney',
    name: 'Tax Attorney',
    category: 'Legal',
    tagline: 'Automate IRS response deadline tracking, document collection, and client update communication so your tax attorneys resolve more cases with less administrative burden.',
    description: 'Tax law matters — IRS audits, collection actions, offers in compromise, tax court litigation — all have strict deadlines and document-intensive processes. Automation handles the administrative infrastructure that currently consumes significant attorney and paralegal time.',
    painPoints: [
      'IRS response deadlines are absolute — a missed response deadline can waive client rights permanently',
      'IRS audit document requests require extensive client document collection that is currently handled via email',
      'Offer in compromise preparation requires financial analysis documentation that clients provide inconsistently',
      'Installment agreement and collection matter updates require ongoing client communication that is currently reactive'
    ],
    workflows: [
      { name: 'IRS Deadline Management', description: 'IRS notice received → response deadline calculated and entered → 30-day, 14-day, and 3-day alerts to attorney. Extension filed → new deadline updated. No IRS response deadline ever missed on tracked matters.', timeSaved: '5h/week', impact: 'Zero IRS deadlines missed' },
      { name: 'IRS Audit Document Collection', description: 'Audit document request received → categorized list sent to client via secure portal with specific document descriptions and submission instructions. Reminder sequence until complete. Audit document preparation time cut by 54%.', timeSaved: '6h/week', impact: 'Audit prep time cut by 54%' },
      { name: 'OIC Financial Documentation', description: 'OIC matter opened → comprehensive financial documentation request sent: income, assets, expenses, and future income analysis. Templates guide client through each category. OIC package preparation time dramatically reduced.', timeSaved: '4h/week', impact: 'OIC package prep time cut by 60%' },
      { name: 'Collection Matter Client Updates', description: 'IRS collection action milestone (levy released, payment plan established, collection suspended) → immediate client notification in plain language. Collection matter resolution feels supported and transparent throughout.', timeSaved: '3h/week', impact: 'Client satisfaction in collection matters up' }
    ],
    tools: ['n8n', 'Google Sheets', 'DocuSign', 'Twilio'],
    stats: { timeSaved: '19h/week', revenueImpact: '$7,800/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can the IRS deadline system account for Tax Court petition deadlines?', a: 'Yes — Tax Court petition deadlines (90-day and 150-day) are configured with appropriate alert sequences.' },
      { q: 'Can the OIC financial documentation system calculate reasonable collection potential automatically?', a: 'The documentation collection feeds into a structured financial analysis template. RCP calculation is completed by the attorney using collected data.' },
      { q: 'Can document collection secure portals be configured to accept large document sets?', a: 'Yes — collections requiring extensive documentation use secure portals with bulk upload capability and document organization by category.' }
    ]
  },
  {
    slug: 'contract-attorney',
    name: 'Contract Attorney / Business Attorney',
    category: 'Legal',
    tagline: 'Automate contract review intake, client education, and agreement signature collection so your business law practice handles more clients at higher margin.',
    description: 'Business and contract attorneys handle high volumes of similar work — NDA reviews, vendor agreements, partnership documents — that can be significantly systematized through intake automation and client education, freeing attorney time for complex bespoke legal work.',
    painPoints: [
      'Contract review intake involves manual back-and-forth to understand what the client needs reviewed and in what context',
      'Client education about basic contract concepts repeats across every new client — consuming time that should be automated',
      'Agreement signature collection and execution tracking is manual — executed agreement storage and retrieval is disorganized',
      'Business formation work (LLC, S-Corp) requires consistent document collection that is handled differently each time'
    ],
    workflows: [
      { name: 'Contract Review Intake Automation', description: 'Review inquiry received → intake questionnaire: contract type, transaction value, key risks identified, jurisdiction, and timeline. Attorney receives structured brief before review begins. Review scoping time cut by 67%.', timeSaved: '5h/week', impact: 'Review scoping time cut by 67%' },
      { name: 'Client Education Sequence', description: 'New business client onboarded → automated 4-part legal education series: contract basics, business entity liability, IP ownership, and employment basics. Client better informed; meetings more productive. Basic education calls eliminated.', timeSaved: '3h/week', impact: 'Basic education calls eliminated' },
      { name: 'Agreement Execution Tracking', description: 'Draft agreement sent → e-signature request via DocuSign. Signature completed → fully executed agreement stored and client notified. Counter-signature reminder if outstanding. Execution tracking across all active agreements maintained automatically.', timeSaved: '3h/week', impact: 'Execution tracking fully automated' },
      { name: 'Business Formation Collection', description: 'Business formation engagement → automated document collection: owner information, entity purpose, ownership percentages, registered agent, and capitalization details. Formation documents prepared from structured input rather than scattered emails.', timeSaved: '4h/week', impact: 'Formation process 50% faster' }
    ],
    tools: ['n8n', 'Clio', 'DocuSign', 'Google Sheets'],
    stats: { timeSaved: '16h/week', revenueImpact: '$6,200/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can intake forms automatically identify the type of agreement from client description?', a: 'Yes — Claude AI can be integrated into the intake flow to classify contract type and identify key review areas from the client\'s description before the attorney review begins.' },
      { q: 'Can the agreement execution system handle multi-party agreements requiring signatures from 3+ parties?', a: 'Yes — DocuSign supports multi-party routing. Signature order, parallel signing, and expiration dates are all configurable.' },
      { q: 'Can business formation documents be generated automatically from intake data?', a: 'For standard formations, document generation from structured intake data is possible and significantly reduces preparation time.' }
    ]
  },
  {
    slug: 'landlord-tenant-attorney',
    name: 'Landlord-Tenant Attorney',
    category: 'Legal',
    tagline: 'Automate eviction filing preparation, case status updates, and court date tracking so your practice handles more cases with the same team.',
    description: 'Landlord-tenant practices handle high case volumes of similar matters — evictions, security deposit disputes, lease enforcement — that require consistent processes. Automation handles the intake, document preparation, and deadline tracking that make high-volume landlord-tenant practice efficient.',
    painPoints: [
      'Eviction filing requires consistent documentation collection from landlord clients — rental agreement, payment ledger, notices served',
      'Court date tracking across dozens of active cases is done manually — missed court dates create serious problems',
      'Landlord clients expect regular status updates during eviction proceedings that take weeks or months to resolve',
      'Post-judgment collection enforcement actions have their own deadlines and documentation requirements'
    ],
    workflows: [
      { name: 'Eviction Filing Document Collection', description: 'New eviction matter opened → automated documentation request: lease agreement, payment ledger, served notices with proof of service, and correspondence history. Structured intake cuts filing preparation from 3 hours to under 1 hour per case.', timeSaved: '6h/week', impact: 'Filing prep: 3h → under 1h per case' },
      { name: 'Court Date Management System', description: 'Court date scheduled → reminders to attorney and paralegal at 1 week, 3 days, and day before. Client notified of court date and outcome automatically. Zero court dates missed on tracked cases.', timeSaved: '4h/week', impact: 'Zero court dates missed' },
      { name: 'Landlord Client Status Updates', description: 'Eviction proceeding milestone (notice period expired, filing submitted, hearing scheduled, judgment entered) → automated client update with plain-language explanation and timeline estimate. Landlord status calls reduced 66%.', timeSaved: '4h/week', impact: 'Landlord status calls down 66%' },
      { name: 'Judgment Enforcement Tracking', description: 'Judgment entered → writ of possession and writ of execution deadlines tracked. Garnishment and bank levy filing reminders. Post-judgment collection enforcement actions tracked systematically.', timeSaved: '3h/week', impact: 'Post-judgment enforcement systematized' }
    ],
    tools: ['n8n', 'Clio', 'Twilio', 'Google Sheets'],
    stats: { timeSaved: '18h/week', revenueImpact: '$6,600/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can the intake system handle different eviction types — non-payment vs. lease violation vs. holdover?', a: 'Yes — each eviction type has different required documents and notice requirements. The intake questionnaire routes to the appropriate collection based on eviction type.' },
      { q: 'Can court date tracking handle cases in multiple jurisdictions simultaneously?', a: 'Yes — each court\'s scheduling format and appearance requirements are configured separately.' },
      { q: 'Can the system help landlord clients track the notice serving period before filing?', a: 'Yes — notice service date entered → filing-eligible date calculated automatically → attorney reminder to proceed. Landlords never file too early and invalidate their notice.' }
    ]
  },
  {
    slug: 'workers-compensation-attorney',
    name: 'Workers\' Compensation Attorney',
    category: 'Legal',
    tagline: 'Automate medical appointment tracking, IME preparation, and settlement communication so your team manages more comp cases at higher capacity.',
    description: 'Workers\' compensation practices manage long-running cases with multiple medical provider relationships, strict benefit tracking requirements, and settlement processes. Automation handles the systematic tracking and communication that makes high-volume workers\' comp practice possible.',
    painPoints: [
      'Medical appointment tracking across multiple treating providers and IME doctors requires constant manual follow-up',
      'Temporary disability benefit payment tracking is done manually — gaps in benefits require immediate identification and action',
      'IME preparation requires specific client preparation that is communicated inconsistently',
      'Deposition and hearing preparation requires client coaching that is scheduled and delivered manually'
    ],
    workflows: [
      { name: 'Medical Appointment Tracking', description: 'Medical appointment scheduled → confirmation to client with location and preparation notes. Post-appointment: medical report request sent to provider. Report received → attorney notification for review. Medical documentation current and complete for all active cases.', timeSaved: '6h/week', impact: 'Medical documentation tracking automated' },
      { name: 'TD Benefit Monitoring', description: 'Temporary disability period entered → weekly benefit payment tracked. Late payment detected → immediate alert to attorney for insurer follow-up. Benefit gaps identified and addressed before client suffers financial hardship.', timeSaved: '4h/week', impact: 'Zero undetected benefit gaps' },
      { name: 'IME Preparation Sequence', description: '2 weeks before IME → client preparation guide: what to expect, what the examiner will do, how to accurately describe symptoms. 48 hours before → reminder with location and arrival instructions. IME results better reflect client\'s actual condition.', timeSaved: '3h/week', impact: 'IME preparation systematized' },
      { name: 'Settlement Communication Workflow', description: 'Settlement conference scheduled → client preparation guide delivered. Settlement offer received → client notification with attorney analysis and consultation scheduling. Settlement agreement executed → disbursement timeline communicated.', timeSaved: '3h/week', impact: 'Settlement communication systematized' }
    ],
    tools: ['n8n', 'Twilio', 'Google Sheets', 'Clio'],
    stats: { timeSaved: '17h/week', revenueImpact: '$7,100/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'What workers\' comp case management software does this integrate with?', a: 'We integrate with Clio, Needles, and most major plaintiff-side workers\' comp case management platforms.' },
      { q: 'Can the TD benefit tracking adjust for partial disability payments?', a: 'Yes — both full and partial disability payment tracking are supported. Partial disability calculations can be configured per state formula.' },
      { q: 'Can the system handle cases in multiple states with different workers\' comp frameworks?', a: 'Yes — each state\'s specific workers\' comp system has its own configuration. Multi-state practices manage each state\'s rules independently.' }
    ]
  },
  // ─── AUTO (10) ───────────────────────────────────────────────────────────────
  {
    slug: 'auto-repair-shop',
    name: 'Auto Repair Shop',
    category: 'Automotive',
    tagline: 'Automate service reminders, repair updates, and review collection so your bays stay full and your customers come back for every service.',
    description: 'Auto repair shops compete on trust and convenience — and both are built through communication. Automation handles the repair status updates, service reminder campaigns, and review collection that turn one-visit customers into loyal accounts who service all their vehicles with you.',
    painPoints: [
      'Customers call repeatedly for repair status updates when their vehicle is in the shop — consuming service advisor time',
      'Oil change and scheduled maintenance reminders are sent inconsistently — customers lapse and service with competitors',
      'Review collection depends on service advisors asking at checkout — most forget, and reviewers who meant to review forget within 24 hours',
      'Declined service recommendations are never followed up — significant future revenue sits in unrealized declined estimates'
    ],
    workflows: [
      { name: 'Repair Status Updates', description: 'Vehicle checked in → automated SMS confirmation. Diagnosis complete → update with findings and estimate link for approval. Repair in progress → "we\'re working on it" update. Ready for pickup → notification with total and payment link. Zero status calls required.', timeSaved: '7h/week', impact: 'Status call volume cut by 81%' },
      { name: 'Service Reminder Campaigns', description: 'Based on last service date and mileage → oil change reminder at interval. Tire rotation reminder. Annual inspection reminder. Brake service reminder based on mileage. Customers return for service consistently rather than only when something breaks.', timeSaved: '4h/week', impact: '34% more return service visits' },
      { name: 'Review Collection System', description: '2 hours after pickup → SMS review request with direct Google link. Positive experience captured before it fades. Review volume increases 6x vs verbal asking. 4.8★ average maintained.', timeSaved: '2h/week', impact: '6x more Google reviews' },
      { name: 'Declined Service Follow-Up', description: 'Estimate declined → 30-day follow-up SMS: "We noticed you declined the brake service — are you still noticing that issue?" Converts 22% of declined estimates within 90 days. Significant revenue from work already diagnosed.', timeSaved: '2h/week', impact: '22% of declined estimates converted' }
    ],
    tools: ['n8n', 'Twilio', 'Google Sheets', 'Mitchell1 API'],
    stats: { timeSaved: '16h/week', revenueImpact: '$5,800/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'What shop management software does this integrate with?', a: 'We integrate with Mitchell1, Tekmetric, Shop-Ware, and most major auto repair management systems.' },
      { q: 'Can service reminders track mileage-based intervals or just time-based?', a: 'Both. Mileage-based reminders are calculated from odometer readings recorded at each visit. Time-based reminders fire regardless of mileage.' },
      { q: 'Can repair approval be done digitally via the status update?', a: 'Yes — repair estimate links can include digital approval for customers who want to authorize via phone. This is the most common request for repair shop automation.' }
    ]
  },
  {
    slug: 'car-dealership',
    name: 'Car Dealership',
    category: 'Automotive',
    tagline: 'Automate unsold lead follow-up, service interval reminders, and finance renewal campaigns that recover the revenue sitting in your existing customer database.',
    description: 'Car dealerships have two distinct revenue streams — vehicle sales and service — and most leave enormous money in both by relying on manual follow-up and sporadic service reminders. Automation systematizes both revenue streams from the existing customer database.',
    painPoints: [
      'Sales leads who test drove but didn\'t buy are followed up with once or twice and then abandoned',
      'Service customers who haven\'t returned in 12+ months are never re-engaged — service department revenue is left to chance',
      'Lease and finance customers approaching contract maturity are contacted too late — competitors get to them first',
      'Trade-in leads from customers whose equity position has improved are never proactively contacted'
    ],
    workflows: [
      { name: 'Sales Lead Nurture Sequence', description: 'Test drive completed without purchase → 12-month nurture sequence: 3-day follow-up, vehicle availability alerts, monthly market update, new model announcements, and urgency campaigns when inventory turns. Converts 31% more long-cycle leads.', timeSaved: '8h/week', impact: '31% more long-cycle leads converted' },
      { name: 'Service Lapsed Customer Campaign', description: 'Service customer inactive 12+ months → re-engagement campaign with service special offer and vehicle health reminder. 24-month lapsed → more aggressive win-back. Service revenue from lapsed customers recovered at 28% rate.', timeSaved: '5h/week', impact: '28% of lapsed service customers recovered' },
      { name: 'Lease & Finance Maturity Campaign', description: '8 months before maturity → early return and upgrade offer. 6 months → equity analysis delivery. 4 months → competitive offer from other brands preemptively addressed. Captures renewal 3-4 months before lease maturity vs. competitive solicitation.', timeSaved: '4h/week', impact: 'Renewal captured 3-4 months earlier' },
      { name: 'Equity Alert System', description: 'Customer equity position monitored → when equity creates a favorable trade scenario → automated equity letter sent. Personalized with their specific vehicle value, payoff, and estimated new payment. Trade-in lead generation from existing customers.', timeSaved: '3h/week', impact: 'Equity-based trade leads generated' }
    ],
    tools: ['n8n', 'Twilio', 'VinSolutions API', 'Google Sheets'],
    stats: { timeSaved: '21h/week', revenueImpact: '$14,200/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'What CRM systems does this integrate with?', a: 'We integrate with VinSolutions, DealerSocket, Reynolds & Reynolds CRM, and most major automotive CRM platforms.' },
      { q: 'Can the equity alert system pull real-time vehicle values from a valuation tool?', a: 'Yes — we integrate with JD Power, Kelley Blue Book, and Black Book values. Equity calculations update with current market conditions.' },
      { q: 'Can sales lead nurturing be segmented by vehicle type interest (truck vs SUV vs sedan)?', a: 'Yes — vehicle interest is captured from the test drive record and drives segmented inventory alerts and new model announcements.' }
    ]
  },
  {
    slug: 'auto-detailing-shop',
    name: 'Auto Detailing Shop',
    category: 'Automotive',
    tagline: 'Automate appointment reminders, seasonal campaign promotions, and review collection that fills your calendar and builds your reputation.',
    description: 'Auto detailing is a repeat business — well-maintained vehicles need regular detailing, and customers who find a trusted detailer keep coming back. Automation builds the systematic follow-up and seasonal campaign infrastructure that fills the calendar year-round.',
    painPoints: [
      'Customers who had a great detail never hear from the shop again — no system exists to prompt return visits',
      'Seasonal campaign promotions (spring clean, winter protection, ceramic coating season) are sent inconsistently or not at all',
      'Booking is primarily phone-based — missed calls lose bookings to competitors with online scheduling',
      'Review collection is verbal and sporadic — reputation growth is slow despite high customer satisfaction'
    ],
    workflows: [
      { name: 'Return Visit Reminder Sequence', description: 'Detail completed → 8-week return visit reminder SMS. 12-week → seasonal protection reminder. 6-month → comprehensive detail offer. Repeat visit rate increases from 34% to 61% with systematic follow-up.', timeSaved: '3h/week', impact: 'Repeat visit rate: 34% → 61%' },
      { name: 'Seasonal Promotion Campaigns', description: 'Spring → spring cleaning special. Summer → UV protection and ceramic coating offer. Fall → winter protection package. Winter → interior deep clean for salt and grime. Each campaign timed and targeted to past customers.', timeSaved: '3h/week', impact: 'Seasonal revenue consistently higher' },
      { name: 'Online Booking Automation', description: 'Missed call or website visit → instant automated response with online booking link. Captures leads 24/7 including after hours. Booking volume increases 38% from capturing after-hours and rapid-response leads.', timeSaved: '3h/week', impact: 'Booking volume up 38%' },
      { name: 'Review Collection System', description: '3 hours after vehicle pickup → review request SMS with Google link. Timing when the freshly detailed vehicle feeling is peak. Review rate 5x higher than verbal asking. 4.9★ average maintained.', timeSaved: '2h/week', impact: '5x more reviews than verbal asking' }
    ],
    tools: ['n8n', 'Twilio', 'Calendly', 'Stripe'],
    stats: { timeSaved: '12h/week', revenueImpact: '$3,400/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can return visit reminders be customized based on the package they purchased?', a: 'Yes — a ceramic coating customer gets different return visit timing than a basic wash customer. Service type drives the follow-up sequence.' },
      { q: 'Can the booking system handle different service durations and vehicle types?', a: 'Yes — scheduling blocks are configured by service type (basic detail, full detail, paint correction) and vehicle size (sedan, SUV, truck).' },
      { q: 'Can this work for mobile detailers as well as fixed-location shops?', a: 'Yes — mobile detailers use the same workflows with location-based booking rather than fixed-address scheduling.' }
    ]
  },
  {
    slug: 'tire-shop',
    name: 'Tire Shop',
    category: 'Automotive',
    tagline: 'Automate tire rotation reminders, seasonal tire changeover campaigns, and review collection that builds the loyal customer base every tire shop needs.',
    description: 'Tire shops have predictable seasonal demand and natural service intervals — but most leave enormous recurring revenue on the table by never communicating those intervals to existing customers. Automation turns a one-time tire purchase into a multi-year service relationship.',
    painPoints: [
      'Tire rotation reminders are sent inconsistently — customers who don\'t rotate regularly come back for tire replacement instead of rotation',
      'Seasonal tire changeover campaigns (winter/summer in northern markets) are not systematically communicated to existing customers',
      'Warranty follow-up and road hazard claims are managed manually — customers who have claims don\'t always know to use them',
      'Review collection is passive — tire shops rarely ask and rarely get the reviews they deserve'
    ],
    workflows: [
      { name: 'Rotation Reminder System', description: 'Tire purchase or rotation service → rotation reminder sent at 5,000-mile interval (based on average driving). Also triggered at 6-month mark for low-mileage drivers. Rotation service bookings increase 44%.', timeSaved: '3h/week', impact: 'Rotation bookings up 44%' },
      { name: 'Seasonal Changeover Campaign', description: 'September → winter tire changeover reminder to all customers with seasonal tires stored. March → spring changeover reminder. Customers with stored tires represent guaranteed seasonal revenue — 100% systematically contacted.', timeSaved: '3h/week', impact: '100% of seasonal customers contacted' },
      { name: 'Warranty & Claim Reminder', description: '12 months after tire purchase → warranty summary reminder: what\'s covered, how to claim, road hazard coverage. Customers who know their coverage use it; customers who use it come back for replacement at the same shop.', timeSaved: '2h/week', impact: 'Warranty utilization drives replacement loyalty' },
      { name: 'Review Generation', description: '2 hours after service completion → SMS review request with direct Google link. Tire shops rarely ask for reviews — shops that systematically collect them dominate local search. Review volume increases 7x.', timeSaved: '2h/week', impact: '7x review volume increase' }
    ],
    tools: ['n8n', 'Twilio', 'Google Sheets', 'Tekmetric'],
    stats: { timeSaved: '11h/week', revenueImpact: '$3,200/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can rotation reminders track mileage from service records or just time-based intervals?', a: 'Both — odometer readings recorded at each visit drive mileage-based reminders. Time-based (6-month) reminders serve customers with infrequent visits.' },
      { q: 'Can seasonal reminders handle markets where seasonal tires are not relevant?', a: 'Yes — seasonal campaigns are configured per market. Shops in frost-free markets use seasonal campaigns differently (wet season tires, track day preparation, etc.).' },
      { q: 'Can the system track stored tire inventory per customer?', a: 'Yes — stored tire records are linked to customer profiles. Seasonal changeover reminders are only sent to customers who have tires in storage.' }
    ]
  },
  {
    slug: 'auto-glass-repair',
    name: 'Auto Glass Repair',
    category: 'Automotive',
    tagline: 'Respond to every crack and chip inquiry instantly and automate the insurance coordination that turns a complex process into a smooth customer experience.',
    description: 'Auto glass repair is an urgent, insurance-dependent service where speed of response and hassle-free insurance coordination determines who gets the job. Automation handles both — instant lead response and systematic insurance claim coordination.',
    painPoints: [
      'Auto glass inquiries require immediate response — a cracked windshield is urgent and customers book the first responsive shop',
      'Insurance claim coordination for covered repairs requires multiple calls between shop, customer, and insurer',
      'Mobile repair appointment scheduling requires coordination of technician location routing and customer address confirmation',
      'Review collection is missed entirely despite auto glass customers being among the most satisfied in any service category'
    ],
    workflows: [
      { name: 'Instant Quote & Booking Response', description: 'Inquiry submitted → immediate automated response with same-day appointment availability and insurance coverage determination form. Speed of response determines booking — 90% of auto glass customers book within the first responsive shop.', timeSaved: '4h/week', impact: '90% of same-day inquiries converted' },
      { name: 'Insurance Coordination System', description: 'Insurance repair confirmed → automated coordination: claim number collection, insurer pre-authorization tracking, and coverage confirmation delivery to customer. Insurance paperwork coordination cut by 67%.', timeSaved: '4h/week', impact: 'Insurance coordination cut by 67%' },
      { name: 'Mobile Appointment Logistics', description: 'Mobile appointment booked → tech assigned → customer receives tech\'s ETA via SMS morning of appointment. Tech arrival → customer notified. Repair complete → instant notification. Mobile appointment experience professional and transparent.', timeSaved: '3h/week', impact: 'Mobile appointment experience systematized' },
      { name: 'Post-Service Review Collection', description: '2 hours after repair → review request SMS. Auto glass customers are highly satisfied — few competitive options exist once the repair is done well. Review rate 6x higher than verbal asking.', timeSaved: '1h/week', impact: '6x more reviews vs verbal asking' }
    ],
    tools: ['n8n', 'Twilio', 'Google Sheets', 'Calendly'],
    stats: { timeSaved: '13h/week', revenueImpact: '$3,800/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can insurance pre-authorization tracking integrate with major glass insurance networks?', a: 'We integrate with Safelite Network API, Lynx Services, and most major glass insurance network portals where API access is available.' },
      { q: 'Can mobile technician routing be optimized across multiple appointments?', a: 'Yes — we integrate with routing optimization tools for mobile technician scheduling across multiple daily appointments.' },
      { q: 'Can the quote response handle both OEM and aftermarket glass options?', a: 'Yes — the response can present both options with pricing and availability, allowing customers to choose before the appointment is confirmed.' }
    ]
  },
  {
    slug: 'car-wash',
    name: 'Car Wash',
    category: 'Automotive',
    tagline: 'Build a membership base and automate return visit campaigns that turn occasional customers into monthly subscribers.',
    description: 'Car washes compete on convenience and consistency — and the membership model is the most profitable vehicle in the car wash industry. Automation drives membership conversion, manages member communication, and recaptures lapsed customers before they establish competitor loyalty.',
    painPoints: [
      'Single-use customers represent enormous untapped recurring revenue potential — most are never offered membership',
      'Membership cancellation is too easy and there is no save sequence when members attempt to cancel',
      'Loyalty points and rewards are rarely promoted — customers don\'t know about benefits and therefore don\'t see enough value',
      'Seasonal promotions (spring cleaning, pollen season) are never systematically deployed to existing customers'
    ],
    workflows: [
      { name: 'Membership Conversion Campaign', description: 'After 2nd single-use wash → automated membership pitch with monthly savings calculation based on their actual spend. Day 5 follow-up if no sign-up. 29% of multi-visit customers convert to membership when systematically offered.', timeSaved: '3h/week', impact: '29% non-member to member conversion' },
      { name: 'Membership Cancellation Save', description: 'Cancellation initiated → retention offer: one month free, downgrade option, or pause. Save rate of 34% from systematic retention vs. zero saves from one-click cancellation. Each saved member worth average $12/month.', timeSaved: '2h/week', impact: '34% of cancellations saved' },
      { name: 'Loyalty Rewards Communication', description: 'Monthly → member loyalty summary: washes used, points earned, reward they\'re close to. Promotion of double-point days and exclusive member events. Members who know their rewards value churn 44% less.', timeSaved: '2h/week', impact: 'Member churn 44% lower with awareness' },
      { name: 'Seasonal Promotion Campaigns', description: 'Pollen season → "Your car needs it" spring wash campaign. Summer → free interior wipe offer with upgrade. Winter → road salt protection promotion. Each seasonal campaign drives 18-28% volume lift.', timeSaved: '2h/week', impact: 'Seasonal volume lift 18-28%' }
    ],
    tools: ['n8n', 'Twilio', 'Stripe', 'Google Sheets'],
    stats: { timeSaved: '10h/week', revenueImpact: '$4,200/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'What car wash POS and management systems does this integrate with?', a: 'We integrate with DRB Systems, Sonny\'s, and most major car wash management platforms.' },
      { q: 'Can the loyalty system work across multiple car wash locations?', a: 'Yes — members earn and redeem across all locations in the network. Cross-location redemption drives convenience and loyalty.' },
      { q: 'Can membership promotion be targeted to customers who visit above a certain frequency?', a: 'Yes — high-frequency single-use customers are the best membership conversion targets. Targeting by visit frequency significantly improves conversion rates.' }
    ]
  },
  {
    slug: 'motorcycle-shop',
    name: 'Motorcycle Shop',
    category: 'Automotive',
    tagline: 'Automate seasonal service reminders, riding gear upsells, and demo ride follow-up that fills your service bays and showroom year-round.',
    description: 'Motorcycle shops serve passionate customers with seasonal service needs and natural opportunities for gear and accessory revenue. Automation builds the systematic communication that keeps riders coming back for service and spending on gear.',
    painPoints: [
      'Winter storage pickup reminders reach only riders who remember to call — spring service appointments are left entirely to customers to initiate',
      'Demo ride inquiries receive inconsistent follow-up — a test ride is the highest-converting sales touchpoint, yet follow-up is sporadic',
      'Gear and accessory upsells are never made to existing service customers who would buy from a trusted shop',
      'Review collection is non-existent — motorcycle shop customers are enthusiastic and would review if asked at the right moment'
    ],
    workflows: [
      { name: 'Seasonal Service Campaign', description: 'February → spring prep reminder campaign to all customers who winterized. Summer → cooling system service reminder. Fall → winterization offer. Seasonal service appointments predictable and full.', timeSaved: '4h/week', impact: 'Spring service bookings up 3.1x' },
      { name: 'Demo Ride Follow-Up Sequence', description: 'Demo ride completed → same-day follow-up SMS. Day 3 → financing information if not mentioned. Day 7 → alternate model suggestion. Day 14 → final follow-up. Demo ride conversion rate up 44%.', timeSaved: '3h/week', impact: 'Demo ride conversion up 44%' },
      { name: 'Gear & Accessory Upsell Campaigns', description: 'Service completed → automated gear recommendation based on riding style and bike type. Monthly gear email to full customer list with curated selection. Accessory revenue increases 31% from systematic recommendation.', timeSaved: '3h/week', impact: 'Accessory revenue up 31%' },
      { name: 'Review Collection', description: '48 hours after service or purchase → review request SMS with Google and dealer group review link. Motorcycle enthusiasts are vocal advocates when prompted. Review volume 5x industry average.', timeSaved: '2h/week', impact: 'Review volume 5x industry average' }
    ],
    tools: ['n8n', 'Twilio', 'Google Sheets', 'DealerSocket'],
    stats: { timeSaved: '13h/week', revenueImpact: '$4,800/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can seasonal reminders be configured per climate zone?', a: 'Yes — shops in warm climates (year-round riding) have very different seasonal campaigns than shops in cold climates with distinct riding seasons.' },
      { q: 'Can gear recommendations be personalized by riding style?', a: 'Yes — sport rider customers get different gear recommendations than touring or adventure riders. Riding style is captured from purchase and service history.' },
      { q: 'Can the demo ride follow-up handle group demo events vs. individual test rides?', a: 'Yes — group demo event follow-up campaigns differ from individual test ride sequences.' }
    ]
  },
  {
    slug: 'rv-dealer',
    name: 'RV Dealer',
    category: 'Automotive',
    tagline: 'Automate service recall communication, winterization campaigns, and long-cycle lead nurturing that closes sales 6-12 months in the making.',
    description: 'RV dealers operate in a market with 6-18 month purchase decision cycles and highly seasonal service demand. Automation handles the long-cycle lead nurturing and systematic service campaigns that most RV dealers leave entirely to manual effort.',
    painPoints: [
      'RV purchase decisions take 6-18 months — leads who didn\'t buy at the show need 12+ month nurture sequences that are never executed manually',
      'Manufacturer recall notifications require proactive customer outreach that dealers often handle slowly',
      'Seasonal service demand (winterization, spring commissioning) is not systematically communicated to the service customer base',
      'Consignment inventory management and current owner communication requires consistent outreach'
    ],
    workflows: [
      { name: 'Long-Cycle Lead Nurture', description: 'Show inquiry or website lead → 18-month nurture sequence: lifestyle content, new inventory alerts matching preferences, customer testimonials, financing education, and seasonal urgency campaigns. 44% of long-cycle leads close within 18 months with systematic nurture.', timeSaved: '7h/week', impact: '44% of long-cycle leads close in 18 months' },
      { name: 'Recall Communication System', description: 'Manufacturer recall received → automated notification to all affected owners with recall description, safety implications, and scheduling link. Professional, prompt recall communication vs. slow manual outreach.', timeSaved: '4h/week', impact: 'Recall response time < 24 hours' },
      { name: 'Seasonal Service Campaign', description: 'September → winterization campaign to all service customers. March → spring commissioning offer. Each campaign targeted, personalized, and timed. Seasonal service capacity filled in advance.', timeSaved: '3h/week', impact: 'Seasonal service fully booked in advance' },
      { name: 'Trade-In & Upgrade Outreach', description: 'Customers who purchased 3-5 years ago → equity analysis and upgrade invitation. New model arrivals matching their configuration → personalized announcement. RV owners upgrade on 5-7 year cycles — be first to ask.', timeSaved: '3h/week', impact: 'Trade-in leads from existing owners' }
    ],
    tools: ['n8n', 'Twilio', 'DealerSocket', 'Google Sheets'],
    stats: { timeSaved: '18h/week', revenueImpact: '$9,600/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can lead nurture sequences be customized by RV type preference?', a: 'Yes — Class A motorhome prospects get different content than fifth wheel trailer prospects. Interest is captured from the initial inquiry and drives all subsequent content.' },
      { q: 'Can recall notifications be sent in priority order based on safety severity?', a: 'Yes — safety recall notifications are treated as priority communications with immediate multi-channel delivery.' },
      { q: 'What dealer management systems does this integrate with?', a: 'We integrate with DealerSocket, IDS DMS, and most major RV dealer management platforms.' }
    ]
  }
]
