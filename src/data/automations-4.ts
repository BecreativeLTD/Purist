import type { Profession } from './automations-1'

export const professions4: Profession[] = [
  // ─── REAL ESTATE (15) ───────────────────────────────────────────────────────
  {
    slug: 'property-management-company',
    name: 'Property Management Company',
    category: 'Real Estate',
    tagline: 'Automate rent collection, maintenance requests, and tenant communication so your property managers handle more doors without more headcount.',
    description: 'Property management companies grow revenue by adding doors, but manual processes — rent follow-up, maintenance coordination, lease renewals — create a ceiling on how many properties one manager can handle. Automation removes that ceiling.',
    painPoints: [
      'Rent collection follow-up requires manual outreach to late-paying tenants every month — a full-day task at scale',
      'Maintenance requests arrive via text, call, and email with no systematic tracking or vendor routing',
      'Lease renewals are handled reactively — tenants who should renew are never contacted proactively',
      'Owner reporting is compiled manually every month from scattered property data'
    ],
    workflows: [
      { name: 'Rent Collection & Late Notice System', description: 'Rent due date → automated reminder day before. Day 1 late → late notice with payment link. Day 5 → escalation notice. Day 10 → property manager alert for formal action. Late payment rate drops from 18% to 6%.', timeSaved: '8h/week', impact: 'Late payments: 18% → 6%' },
      { name: 'Maintenance Request Routing', description: 'Tenant submits maintenance request → categorized by urgency → routed to appropriate vendor with work order → tenant receives vendor name and ETA → completion confirmed. Zero manual coordination for 80% of routine requests.', timeSaved: '7h/week', impact: '80% of maintenance handled automatically' },
      { name: 'Lease Renewal Campaign', description: '90 days before lease expiry → automated renewal offer with updated rate. 60 days → follow-up. 45 days → final offer with market context. Renewal rate increases from 61% to 79% — each renewal saves an average $2,400 in vacancy and turnover costs.', timeSaved: '4h/week', impact: 'Renewal rate: 61% → 79%' },
      { name: 'Owner Monthly Report', description: 'Month-end → owner report auto-generated: income summary, expenses, maintenance completed, vacancy status, and lease dates. Delivered to each owner automatically. Zero manual report assembly.', timeSaved: '6h/week', impact: 'Owner reports fully automated' }
    ],
    tools: ['n8n', 'Twilio', 'AppFolio API', 'Google Sheets'],
    stats: { timeSaved: '26h/week', revenueImpact: '$8,100/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'What property management software does this integrate with?', a: 'We integrate with AppFolio, Buildium, Propertyware, Rent Manager, and Yardi. Tenant, lease, and payment data drives all automated workflows.' },
      { q: 'Can maintenance routing handle emergency vs. routine requests differently?', a: 'Yes — emergencies (water leak, no heat) trigger immediate vendor and property manager notification. Routine requests (bulb replacement, cosmetic issues) follow the standard 48-72 hour routing schedule.' },
      { q: 'Can this scale to hundreds of doors without adding staff?', a: 'Yes — automation scales linearly. Adding 50 doors doesn\'t add 50 hours of work. Our clients typically double their door count without adding a property manager.' }
    ]
  },
  {
    slug: 'real-estate-developer',
    name: 'Real Estate Developer',
    category: 'Real Estate',
    tagline: 'Automate buyer lead nurturing, project milestone communications, and post-sale documentation so your sales team focuses on closing, not coordinating.',
    description: 'Real estate developers have long sales cycles, complex buyer communication needs across multiple project phases, and significant post-sale documentation requirements. Automation handles the communication layer across the entire buyer journey from lead to closing.',
    painPoints: [
      'Buyer leads from project launches go cold within days when follow-up is manual and salespeople are managing dozens of prospects',
      'Project construction updates need to go to hundreds of buyers simultaneously — manual email to each is impractical',
      'Pre-closing document collection (mortgage approval, ID, deposit transfers) is a manual back-and-forth that delays settlements',
      'Post-sale referral programs are never activated because there is no systematic post-close communication'
    ],
    workflows: [
      { name: 'Buyer Lead Nurture Sequence', description: 'Lead registered → immediate project information package delivered. Day 2 → virtual tour invite. Week 2 → construction update. Month 1 → pricing urgency message. 34% more leads convert to deposit within 90 days.', timeSaved: '7h/week', impact: '34% more leads to deposit in 90 days' },
      { name: 'Construction Update Broadcasts', description: 'Milestone photos uploaded → automated project update email sent to all deposited buyers with progress description, expected completion timeline, and next milestone. Buyers feel informed and connected. Sales queries drop by 62%.', timeSaved: '4h/week', impact: '62% fewer buyer status queries' },
      { name: 'Pre-Closing Document Collection', description: 'Closing date set → automated document checklist sent to buyer. Each required document tracked. Missing items trigger escalating reminders. Closing coordinator receives real-time completion dashboard. Closing delays from missing documents drop by 74%.', timeSaved: '5h/week', impact: 'Closing delays down 74%' },
      { name: 'Post-Sale Referral Activation', description: '30 days after closing → buyer receives thank-you message with referral program details. 60 days → follow-up with any friends or family currently searching. 1 year → anniversary message with market update. Generates 1 referral per 4.2 buyers systematically.', timeSaved: '3h/week', impact: '1 referral per 4.2 buyers automated' }
    ],
    tools: ['n8n', 'Twilio', 'Google Sheets', 'DocuSign'],
    stats: { timeSaved: '20h/week', revenueImpact: '$14,200/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can the lead nurture sequence be customized per project type?', a: 'Yes — luxury condo buyers get a different sequence than first-home townhouse buyers. Each project and buyer segment has its own messaging tone, content, and timing.' },
      { q: 'How does the construction update system handle sensitive project delays?', a: 'Delay communications are flagged for developer review before sending. Standard milestone updates send automatically; any update that involves timeline changes requires human approval before dispatch.' },
      { q: 'Can buyer communication automation work across multiple simultaneous projects?', a: 'Yes — each project has its own buyer list, communication sequence, and milestone schedule. Buyers at Project A never receive communication about Project B unless specifically configured.' }
    ]
  },
  {
    slug: 'commercial-real-estate-broker',
    name: 'Commercial Real Estate Broker',
    category: 'Real Estate',
    tagline: 'Automate tenant prospecting, property alert distribution, and deal pipeline updates so you work more deals simultaneously without dropping the ball.',
    description: 'Commercial real estate brokers manage long, complex deal cycles across multiple properties and clients simultaneously. Automation handles the systematic communication that keeps every prospect engaged, every landlord updated, and every deal moving forward without requiring manual attention at every step.',
    painPoints: [
      'Tenant prospects who toured a space 3 months ago are never followed up with systematically — deals are lost to delayed re-engagement',
      'Property availability updates to tenant prospect lists are manual — a time-consuming task that happens inconsistently',
      'Landlord clients expect regular leasing activity reports that take significant manual time to compile',
      'Deal pipeline tracking is maintained in spreadsheets that go stale because updates require manual entry'
    ],
    workflows: [
      { name: 'Tenant Prospect Re-Engagement', description: 'Prospect toured but didn\'t lease → 30-day check-in. 90-day market update. 180-day re-engagement with new availability matching original criteria. Long-cycle prospects convert at 3x the rate of cold outreach.', timeSaved: '5h/week', impact: '3x better conversion vs cold outreach' },
      { name: 'Property Availability Alerts', description: 'New listing added → automatic availability alert to all qualified tenants on prospect list matching size, type, and submarket criteria. First-to-respond advantage maximized. Leasing velocity increases significantly.', timeSaved: '4h/week', impact: 'Leasing velocity significantly increased' },
      { name: 'Landlord Activity Reports', description: 'Weekly → landlord receives automated leasing activity report: tours scheduled, showings completed, offers reviewed, market comps update. Landlords feel informed; broker looks systematic. Landlord retention increases from 71% to 89%.', timeSaved: '5h/week', impact: 'Landlord retention: 71% → 89%' },
      { name: 'Deal Pipeline Automation', description: 'Deal stage change → automatic notifications to all stakeholders (tenant, landlord, attorney) with next steps and deadline. Pipeline visibility maintained without manual status emails. Deal cycle time reduces by 22%.', timeSaved: '4h/week', impact: 'Deal cycle time 22% shorter' }
    ],
    tools: ['n8n', 'Google Sheets', 'Salesforce', 'Twilio'],
    stats: { timeSaved: '19h/week', revenueImpact: '$11,600/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can the tenant prospect alerts segment by specific submarkets and building classes?', a: 'Yes — tenant matching criteria include submarket, building class (A/B/C), square footage range, floor preference, and amenity requirements. Alerts are sent only when a genuinely matching property becomes available.' },
      { q: 'What CRM systems does this integrate with?', a: 'We integrate with Salesforce, HubSpot, Apto, ClientLook, and most major CRE-specific CRM platforms. Deal and prospect data in your CRM drives all automated communications.' },
      { q: 'Can automation handle both landlord rep and tenant rep workflows simultaneously?', a: 'Yes — landlord rep and tenant rep workflows are completely separate. Broker can be active in both simultaneously without any crossover in client communication.' }
    ]
  },
  {
    slug: 'home-stager',
    name: 'Home Stager',
    category: 'Real Estate',
    tagline: 'Automate project proposals, staging schedule coordination, and realtor relationship building that fills your calendar with high-value staging jobs.',
    description: 'Home stagers live and die on realtor relationships and fast turnaround. Automation handles the proposal delivery, scheduling coordination, and realtor follow-up that builds a referral engine without manual effort.',
    painPoints: [
      'Realtor inquiry response time is critical — delayed quotes lose jobs to competing stagers',
      'Staging schedule coordination between warehouse, installers, and realtors is a multi-call manual process',
      'Past realtor clients aren\'t systematically re-engaged — repeat business is left to chance',
      'Post-staging reviews and portfolio photo collection are never systematically requested'
    ],
    workflows: [
      { name: 'Instant Quote Response System', description: 'Realtor inquiry received → automated questionnaire sent collecting property details, timeline, and budget. Responses trigger quote calculation → proposal delivered within 2 hours automatically. Faster than every competing stager.', timeSaved: '4h/week', impact: 'Quote delivery: days → 2 hours' },
      { name: 'Staging Schedule Coordination', description: 'Job confirmed → automated confirmation to realtor, warehouse team, and installation crew with all logistics. Day-before reminder to all parties. Post-staging photo reminder to realtor. Full coordination without a single manual message.', timeSaved: '5h/week', impact: 'Coordination fully automated' },
      { name: 'Realtor Relationship Nurture', description: 'Every realtor in your network receives monthly market update email with staging ROI statistics. Quarterly check-in with new portfolio pieces. Generates consistent referral flow from realtors who haven\'t worked with you recently.', timeSaved: '3h/week', impact: '2.1x referral rate from past realtors' },
      { name: 'Review & Portfolio Collection', description: '3 days after staging install → realtor receives review request with direct Google link. 14 days → photo collection request for staging portfolio. Both happen automatically every job.', timeSaved: '2h/week', impact: 'Portfolio grows automatically' }
    ],
    tools: ['n8n', 'Twilio', 'Google Sheets', 'Calendly'],
    stats: { timeSaved: '15h/week', revenueImpact: '$3,800/month', deploymentDays: 7, roiMonths: 2 },
    faq: [
      { q: 'Can the quote automation handle vacant vs. occupied staging differently?', a: 'Yes — vacant staging (full furniture) and occupied staging (declutter and rearrange) have different questionnaires, pricing formulas, and proposal templates.' },
      { q: 'What if a realtor wants to negotiate the quote?', a: 'The automated quote is a starting point. Any negotiation is handled manually. The automation\'s job is to get the quote in front of the realtor faster than competitors — not to replace the human negotiation.' },
      { q: 'Can this work for a solo stager or is it designed for larger staging companies?', a: 'Solo stagers benefit enormously — the automation replaces the assistant or coordinator they can\'t yet afford, allowing them to handle more concurrent jobs and look more professional than larger competitors.' }
    ]
  },
  {
    slug: 'title-company',
    name: 'Title Company',
    category: 'Real Estate',
    tagline: 'Automate closing milestone updates, document collection, and agent communication so your closers manage more transactions without errors or delays.',
    description: 'Title companies are the operational hub of every real estate transaction — and most spend more time on communication coordination than on the actual title work. Automation systematizes every repetitive communication touchpoint from contract receipt to post-closing.',
    painPoints: [
      'Agents and buyers call multiple times per transaction for status updates that could be sent proactively',
      'Missing documents at closing are discovered days too late because collection is tracked manually',
      'Wire instruction delivery and confirmation is a manual step with significant error and fraud risk',
      'Post-closing recordings and document delivery are managed manually for every transaction'
    ],
    workflows: [
      { name: 'Transaction Milestone Updates', description: 'Each closing milestone (title search ordered, commitment issued, clear to close) → automated update to buyer, seller, and both agents simultaneously. Status calls drop by 68%. All parties always know exactly where the transaction stands.', timeSaved: '7h/week', impact: 'Status calls down 68%' },
      { name: 'Pre-Closing Document Checklist', description: 'Contract received → automated document request sent to appropriate parties. Each document tracked. Missing items trigger escalating reminders at 5 and 10 days. Closing coordinator sees live completion dashboard. Closing delays from missing documents drop by 71%.', timeSaved: '6h/week', impact: 'Closing delays down 71%' },
      { name: 'Agent Transaction Updates', description: 'Weekly automated digest to each agent with all their active transactions: status, next milestone, outstanding items, and expected closing date. Agents stop calling for updates. Closer handles more transactions simultaneously.', timeSaved: '4h/week', impact: 'Agent calls eliminated from workflow' },
      { name: 'Post-Closing Recording Notification', description: 'Deed recorded → automated notification to all parties with recording information. Policy delivery notification follows. Professional, timely post-closing experience generates more referrals from real estate agents.', timeSaved: '2h/week', impact: 'Post-closing experience systematized' }
    ],
    tools: ['n8n', 'Twilio', 'Google Sheets', 'DocuSign'],
    stats: { timeSaved: '20h/week', revenueImpact: '$5,600/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'What title production software does this integrate with?', a: 'We integrate with SoftPro, RamQuest, ResWare, Qualia, and most major title production platforms. Transaction and milestone data from your TPS drives all communication workflows.' },
      { q: 'How are wire instructions handled safely in an automated system?', a: 'Wire instructions are NEVER automated — they are always handled through your secure, manual process with verbal confirmation. Automation explicitly excludes wire instruction delivery to prevent wire fraud exposure.' },
      { q: 'Can this handle commercial and residential transactions in the same system?', a: 'Yes — commercial and residential transactions have different milestone sets, different document checklists, and different stakeholder communication patterns. Both are supported with separate workflow configurations.' }
    ]
  },
  {
    slug: 'real-estate-appraiser',
    name: 'Real Estate Appraiser',
    category: 'Real Estate',
    tagline: 'Automate assignment intake, status communication, and report delivery so you complete more appraisals per week without the administrative overhead.',
    description: 'Real estate appraisers spend significant non-billable time on order intake, status communication with AMCs and lenders, and report delivery logistics. Automation handles this administrative layer so more time goes to field inspections and analysis.',
    painPoints: [
      'Assignment intake from multiple AMCs and lenders arrives in different formats requiring manual logging and acknowledgment',
      'Status update requests from lenders and AMCs are handled manually — the same information communicated repeatedly',
      'Completed reports require manual delivery confirmation and documentation tracking per order',
      'Invoice submission to each AMC follows different processes and is often delayed — affecting cash flow'
    ],
    workflows: [
      { name: 'Assignment Intake Automation', description: 'Order received from any channel → parsed and logged into order management system → acceptance or decline sent within 15 minutes → inspection scheduling link sent to homeowner. Professional response at every order, instantly.', timeSaved: '5h/week', impact: 'Order response time: hours → 15 min' },
      { name: 'Status Communication System', description: 'Inspection completed → automated status update to AMC and lender. Draft in progress → status update. Report submitted → delivery confirmation with report reference. All status communication automated for every order.', timeSaved: '4h/week', impact: 'Status communication fully automated' },
      { name: 'Homeowner Appointment Coordination', description: 'Inspection scheduled → homeowner receives SMS and email confirmation with what to expect, access instructions, and preparation checklist. Reminder 48h and 2h before inspection. No-show rate drops significantly.', timeSaved: '3h/week', impact: 'No-shows virtually eliminated' },
      { name: 'Invoice & Payment Tracking', description: 'Report delivered → invoice submitted automatically to AMC portal. Unpaid at 30 days → automated follow-up. Payment received → recorded. Cash flow visibility maintained without manual tracking across dozens of AMC relationships.', timeSaved: '3h/week', impact: 'Invoice-to-payment cycle shortened' }
    ],
    tools: ['n8n', 'Twilio', 'Google Sheets', 'Calendly'],
    stats: { timeSaved: '16h/week', revenueImpact: '$4,200/month', deploymentDays: 7, roiMonths: 2 },
    faq: [
      { q: 'Can the intake automation handle orders from TOTAL, Mercury, and other AMC portals?', a: 'We build integrations per AMC portal based on their data format. Email-based orders are parsed with AI extraction; portal-based orders integrate via API where available.' },
      { q: 'Can the status system handle different required update intervals per client?', a: 'Yes — each AMC or lender client has a configured update schedule. Some require 48-hour check-ins; others only require delivery confirmation. All configured independently.' },
      { q: 'How does automation handle rush orders vs. standard turn times?', a: 'Rush orders trigger a separate workflow with compressed timelines, immediate acknowledgment, and accelerated status updates matching the rush schedule.' }
    ]
  },
  {
    slug: 'short-term-rental-host',
    name: 'Short-Term Rental Host',
    category: 'Real Estate',
    tagline: 'Automate guest communication, cleaning team coordination, and review generation so your Airbnb or Vrbo property runs itself while you sleep.',
    description: 'Short-term rental hosts who operate more than 2 properties without automation are working a second full-time job. The right automation system handles 90% of guest communication, coordinates cleaning between checkouts, and generates reviews automatically — letting hosts scale to 10+ properties without proportional time investment.',
    painPoints: [
      'Guest inquiries arrive at all hours and require rapid response to maintain Superhost ranking',
      'Cleaning team coordination between checkout and check-in is manual — a single miscommunication causes a bad guest experience',
      'Check-in instructions, house rules, and local recommendations are sent manually for every booking',
      'Review requests depend on hosts remembering to send them after the 5-day window — most forget and lose the review'
    ],
    workflows: [
      { name: 'Guest Communication Automation', description: 'Booking confirmed → immediate welcome message with property details. 3 days before arrival → check-in instructions and access codes. Day of arrival → parking and welcome guide. Day 2 → mid-stay check-in. Checkout day → departure reminder. Every guest gets a perfect communication sequence.', timeSaved: '8h/week', impact: '90% of guest communication automated' },
      { name: 'Cleaning Team Coordination', description: 'Checkout confirmed → instant notification to cleaning team with checkout time, next check-in time, and inspection checklist. Cleaning complete → host notification with confirmation photo. Check-in window confirmed. Zero coordination calls required.', timeSaved: '4h/week', impact: 'Cleaning coordination fully automated' },
      { name: 'Dynamic Pricing Alerts', description: 'Local events calendar and competitor pricing monitored → n8n alerts host when significant pricing opportunity is detected. Occupancy and ADR data reviewed weekly with recommendations. Revenue per available night increases 23%.', timeSaved: '2h/week', impact: 'RevPAN up 23%' },
      { name: 'Review Generation Sequence', description: 'Guest checks out → review request sent at optimal 2-hour post-checkout timing. If no review by day 3 → reminder. Host review posted automatically. Review response for new reviews drafted and sent within 4 hours automatically.', timeSaved: '3h/week', impact: 'Review collection rate up 3x' }
    ],
    tools: ['n8n', 'Twilio', 'Airbnb API', 'Google Sheets'],
    stats: { timeSaved: '18h/week', revenueImpact: '$3,400/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'What platforms does this work with?', a: 'We integrate with Airbnb, Vrbo, Booking.com, and most major OTAs via API or PMS integrations like Hostaway, Guesty, and Lodgify. Multi-platform management is consolidated into one automation layer.' },
      { q: 'Can check-in instructions include smart lock codes that change per guest?', a: 'Yes — smart lock integrations (Schlage, Kwikset, Yale, August) can generate and deliver unique access codes per booking automatically. Codes are delivered in the check-in message and deactivated after checkout.' },
      { q: 'How does the system handle guest complaints at 2am?', a: 'Late-night messages are routed based on urgency. Urgent keywords (locked out, emergency, broken) trigger immediate notification to the host. Non-urgent messages receive an automated empathetic response and are queued for morning host reply.' }
    ]
  },
  {
    slug: 'real-estate-wholesaler',
    name: 'Real Estate Wholesaler',
    category: 'Real Estate',
    tagline: 'Automate motivated seller lead follow-up and buyer list distribution so you move more contracts per month without increasing your marketing spend.',
    description: 'Real estate wholesalers win deals through speed and volume of follow-up with motivated sellers — neither of which is achievable manually at scale. Automation handles the seller follow-up sequences and buyer list distribution that determine whether you close 3 deals a month or 12.',
    painPoints: [
      'Motivated seller leads require 8-12 follow-up touches before converting — manual follow-up at that frequency is impossible across a large lead list',
      'Cash buyer list distribution for new deals is a manual email to a spreadsheet that arrives inconsistently',
      'Lead source tracking is inconsistent — which marketing channels produce deals is unknown without systematic attribution',
      'Signed contract to buyer assignment is a manual coordination process with no systematic deal marketing system'
    ],
    workflows: [
      { name: 'Seller Lead Follow-Up Sequences', description: 'Seller lead generated → 12-touch automated follow-up sequence over 90 days: SMS, voicemail drops, email, and direct mail triggers at optimal intervals. Works leads that would otherwise go cold. Lead-to-contract conversion up 3.1x.', timeSaved: '8h/week', impact: 'Lead-to-contract: 3.1x improvement' },
      { name: 'Buyer Alert Distribution', description: 'New property under contract → automated email blast to segmented buyer list matching property criteria (metro area, price range, property type). First 3 respondents get showing slots automatically. Deal moves in hours, not days.', timeSaved: '4h/week', impact: 'Average assignment: 5 days → 34 hours' },
      { name: 'Lead Source Attribution', description: 'Every inbound lead tagged with source → deals closed attributed back to originating campaign → weekly ROI report per marketing channel. Data-driven marketing spend decisions based on actual deal attribution.', timeSaved: '3h/week', impact: 'Marketing ROI fully visible' },
      { name: 'Contract-to-Close Coordination', description: 'Contract signed → automated sequence: title company introduction, buyer document checklist, closing date confirmation, and earnest money deposit tracking. Assignment closes faster with fewer coordinator calls.', timeSaved: '4h/week', impact: 'Closing coordination time cut by 60%' }
    ],
    tools: ['n8n', 'Twilio', 'Google Sheets', 'Podio'],
    stats: { timeSaved: '20h/week', revenueImpact: '$16,800/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can voicemail drop automation be included in the seller follow-up sequences?', a: 'Yes — we integrate with Slybroadcast and similar voicemail drop services. Voice messages are scheduled as part of the multi-touch sequence alongside SMS and email.' },
      { q: 'How does the buyer list segmentation work?', a: 'Buyers are tagged by metro, price range, property type preference, and cash availability. New deals are matched against buyer tags and alerts sent only to relevant buyers — not mass-blasted to the full list.' },
      { q: 'Can this integrate with existing CRM tools wholesalers typically use?', a: 'Yes — we integrate with Podio, REI BlackBook, InvestorFuse, and most major wholesaling CRM platforms. Lead and deal data in your CRM drives the automation sequences.' }
    ]
  },
  {
    slug: 'leasing-agent',
    name: 'Apartment Leasing Agent',
    category: 'Real Estate',
    tagline: 'Respond to every rental inquiry within 90 seconds, automate tour scheduling, and follow up with every lead until they sign or decline — without manual effort.',
    description: 'Apartment leasing agents and leasing offices lose a significant share of rental inquiries to slow response times and inconsistent follow-up. The renter who doesn\'t receive an immediate response books a tour at the next property on the list. Automation ensures every lead is captured and every tour is booked.',
    painPoints: [
      'Rental inquiries from Apartments.com, Zillow Rentals, and website forms go unanswered for hours during busy periods',
      'Tour scheduling requires back-and-forth communication that loses prospects who book elsewhere in the time it takes',
      'Application status communication is reactive — applicants call repeatedly for updates rather than receiving proactive notifications',
      'Move-in coordination (access codes, utility setup instructions, welcome packets) is manually assembled for every new tenant'
    ],
    workflows: [
      { name: 'Instant Rental Inquiry Response', description: 'Inquiry received from any source → immediate automated response within 90 seconds with availability, pricing, and self-scheduling tour link. Day 2 follow-up if no tour booked. Speed advantage captures prospects before competitors respond.', timeSaved: '6h/week', impact: '3.4x more inquiry-to-tour conversions' },
      { name: 'Tour Scheduling Automation', description: 'Prospect clicks tour link → self-books from real-time availability → confirmation sent to prospect and leasing agent → 24-hour and 2-hour reminders. Tour-to-application rate increases 28% from better-prepared prospects.', timeSaved: '4h/week', impact: 'Tour-to-application rate up 28%' },
      { name: 'Application Status Notifications', description: 'Application received → confirmation. Approval decision made → immediate notification with next steps. Approved → move-in checklist delivered. Denied → respectful decline with re-application timeline. All proactive, none reactive.', timeSaved: '4h/week', impact: 'Application calls eliminated' },
      { name: 'Move-In Coordination Sequence', description: 'Move-in date confirmed → automated sequence: utility setup guide, renter insurance requirement, access instructions, community rules, and welcome contact. New tenant arrives fully informed. Move-in call volume drops 54%.', timeSaved: '3h/week', impact: 'Move-in calls down 54%' }
    ],
    tools: ['n8n', 'Twilio', 'Calendly', 'Google Sheets'],
    stats: { timeSaved: '18h/week', revenueImpact: '$4,900/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'What rental listing platforms does the inquiry response integrate with?', a: 'We integrate with Apartments.com, Zillow Rentals, Trulia, Rent.com, and your website lead forms. All inquiries route to a single response workflow regardless of source.' },
      { q: 'Can the application status automation integrate with our property management software?', a: 'Yes — we integrate with AppFolio, Buildium, Rent Manager, and Yardi. Application status changes in your PMS trigger the automated communications automatically.' },
      { q: 'Can this handle multiple properties with different units, pricing, and availability?', a: 'Yes — each property and floor plan has its own availability, pricing, and tour scheduling configuration. Prospects are matched to the right availability information automatically.' }
    ]
  },
  {
    slug: 'real-estate-photographer',
    name: 'Real Estate Photographer',
    category: 'Real Estate',
    tagline: 'Automate booking, delivery, and realtor relationship building so your camera is in the field — not your desk managing logistics.',
    description: 'Real estate photographers live on realtor relationships and fast turnaround. Automation handles the booking flow, delivery notification, and realtor nurture that builds a full calendar without manual coordination.',
    painPoints: [
      'Booking requests come via text, email, and DM — manual coordination creates delays and double-bookings',
      'Photo delivery involves manual upload, notification, and file format coordination for every shoot',
      'Realtors who haven\'t booked in 60 days are never re-engaged — repeat business is left entirely to chance',
      'Invoice collection is manual and awkward with realtor clients who are ongoing relationships'
    ],
    workflows: [
      { name: 'Automated Booking System', description: 'Realtor submits booking request → automated questionnaire collects property address, shoot type (standard/twilight/aerial), and preferred times → booking confirmed in calendar → confirmation sent to realtor with shoot day checklist. Zero manual coordination.', timeSaved: '5h/week', impact: 'Booking coordination fully automated' },
      { name: 'Photo Delivery Notification', description: 'Gallery uploaded → instant notification to realtor with download link, file format options, and usage terms. Turnaround time visibly faster than competitors. Realtors who receive files first list faster and remember who delivered them.', timeSaved: '2h/week', impact: 'Delivery experience beats competitors' },
      { name: 'Realtor Re-Engagement Sequence', description: 'Realtor inactive for 60 days → automated check-in with recent portfolio piece and seasonal listing tip. 90 days → market activity message. Converts 28% of dormant realtor clients back into active bookings.', timeSaved: '3h/week', impact: '28% dormant realtors reactivated' },
      { name: 'Invoice & Review Automation', description: 'Gallery delivered → invoice sent via payment link. 7-day reminder if unpaid. Simultaneously, review request sent to realtor. Both happen for every shoot automatically without photographer intervention.', timeSaved: '2h/week', impact: 'Collection + reviews automated per shoot' }
    ],
    tools: ['n8n', 'Twilio', 'Stripe', 'Google Sheets'],
    stats: { timeSaved: '13h/week', revenueImpact: '$2,900/month', deploymentDays: 7, roiMonths: 2 },
    faq: [
      { q: 'Can the booking system handle different shoot types with different pricing and duration?', a: 'Yes — standard interiors, twilight shoots, aerial/drone, and virtual tours each have their own pricing, time slots, and booking flow. Realtors select the service type upfront.' },
      { q: 'Can delivery notification include multiple gallery formats?', a: 'Yes — MLS-ready web files, print-resolution files, and branded virtual tour links are all included in the delivery notification with appropriate download links per format.' },
      { q: 'What if the realtor needs to reschedule last minute?', a: 'Rescheduling requests trigger an automated rebook flow showing available time slots. Last-minute cancellations within 24 hours trigger your cancellation fee communication automatically.' }
    ]
  },
  {
    slug: 'real-estate-attorney',
    name: 'Real Estate Attorney',
    category: 'Real Estate',
    tagline: 'Automate transaction coordination, document delivery, and closing communication so your attorneys handle more closings without adding paralegal hours.',
    description: 'Real estate attorneys handle high volumes of similar transactions — each requiring the same document requests, status updates, and coordination sequences. Automation makes each transaction follow a perfect, consistent process without attorney or paralegal time for the routine steps.',
    painPoints: [
      'Each new matter requires the same initial document request sequence — entirely manual despite being identical across transactions',
      'Client status updates require phone tag and manual email drafting despite the information being available in the case management system',
      'Closing day coordination involves simultaneous communication to multiple parties that currently requires dedicated paralegal attention',
      'Post-closing recording follow-up and document delivery is tracked manually per transaction'
    ],
    workflows: [
      { name: 'New Matter Intake Sequence', description: 'New matter opened → automated document checklist sent to client and relevant parties. Signed contracts, title commitment, and survey requests sent simultaneously. All collection tracked centrally. Intake admin time reduced by 69%.', timeSaved: '6h/week', impact: 'Matter intake time cut by 69%' },
      { name: 'Transaction Status Updates', description: 'Each milestone (title received, commitment issued, clear to close, closing scheduled) → automated update to client. Clients stop calling for status. Paralegal handles more transactions. Attorney relationship preserved for substantive questions only.', timeSaved: '5h/week', impact: 'Client status calls eliminated' },
      { name: 'Closing Day Coordination', description: 'Closing scheduled → automated notification to all parties with time, location, identification requirements, and what to bring. Morning-of reminder. Wire instruction confirmation (manual, secure). Closing day smoother with fewer last-minute calls.', timeSaved: '4h/week', impact: 'Closing day calls reduced by 61%' },
      { name: 'Post-Closing Document Delivery', description: 'Recording confirmed → automatically notifies all parties with recording information → packages post-closing documents for delivery → invoice generated and sent. Post-closing workflow runs automatically for every transaction.', timeSaved: '3h/week', impact: 'Post-closing fully systematized' }
    ],
    tools: ['n8n', 'Clio', 'DocuSign', 'Twilio'],
    stats: { timeSaved: '19h/week', revenueImpact: '$7,800/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'What real estate legal practice management software does this integrate with?', a: 'We integrate with Clio, MyCase, Qualia, SoftPro (for closing workflows), and most major real estate legal platforms.' },
      { q: 'Can the automation handle both purchase and refinance transactions?', a: 'Yes — purchase and refinance transactions have different document checklists, party communication sets, and milestone sequences. Both are supported with separate workflow configurations.' },
      { q: 'How does the system handle transactions that fall through?', a: 'Matter cancellation triggers a specific workflow: automated notification to all parties, document return instructions, and refund or fee communication per your standard process. No transaction falls through the cracks.' }
    ]
  },
  {
    slug: 'home-inspector',
    name: 'Home Inspector',
    category: 'Real Estate',
    tagline: 'Automate booking, report delivery, and realtor follow-up so you do more inspections per week and build the referral relationships that fill your calendar.',
    description: 'Home inspectors are inspection businesses — the faster and more professionally you book, deliver, and follow up, the more inspections you do. Automation handles every administrative step so your working hours are spent inspecting, not coordinating.',
    painPoints: [
      'Booking coordination with buyer, realtor, and listing agent requires 3-4 phone calls per inspection that could be replaced by self-scheduling',
      'Report delivery is manual — file upload notification and link distribution for every inspection',
      'Realtor referrals are the primary business driver but realtor relationships are never systematically maintained',
      'Invoice collection from buyers and realtors is manually tracked — delayed payments affect cash flow'
    ],
    workflows: [
      { name: 'Inspection Booking Automation', description: 'Booking request received → automated confirmation collection of property address, type, access instructions, and preferred times → self-scheduling confirmation → all parties (buyer, buyer\'s agent, listing agent) receive automated confirmation with inspection details.', timeSaved: '5h/week', impact: 'Booking calls eliminated entirely' },
      { name: 'Report Delivery System', description: 'Report uploaded to portal → instant notification to buyer and buyer\'s agent with report link and summary of major findings categories. Fastest delivery in the market; realtors notice and remember who delivers first.', timeSaved: '2h/week', impact: 'Report delivery: hours → instant' },
      { name: 'Realtor Referral Nurture', description: 'Every realtor who has sent a referral → monthly portfolio email with recent inspection highlights and availability. Quarterly market activity message. Realtors who feel remembered send more referrals. Referral volume up 41%.', timeSaved: '3h/week', impact: 'Referral volume up 41%' },
      { name: 'Invoice & Review Collection', description: 'Inspection complete → invoice sent via payment link immediately. 5-day reminder if unpaid. Simultaneously, review request to buyer with direct Google link. Both captured for every single inspection automatically.', timeSaved: '2h/week', impact: '4.9★ average maintained' }
    ],
    tools: ['n8n', 'Twilio', 'Stripe', 'Calendly'],
    stats: { timeSaved: '13h/week', revenueImpact: '$3,100/month', deploymentDays: 7, roiMonths: 2 },
    faq: [
      { q: 'Can the booking system handle different inspection types with different duration and pricing?', a: 'Yes — standard home inspection, radon testing, mold inspection, and sewer scope all have their own booking flow with appropriate add-on selection and pricing.' },
      { q: 'What inspection software does the report delivery integrate with?', a: 'We integrate with Spectora, HomeGauge, ISN, and most major inspection report platforms. Report completion triggers the delivery notification automatically.' },
      { q: 'Can the booking confirmation include access instructions for the property automatically?', a: 'Yes — access information entered by the buyer\'s agent during booking is included in all party confirmations automatically, eliminating the pre-inspection access coordination call.' }
    ]
  },
  {
    slug: 'moving-and-storage-company',
    name: 'Moving & Storage Company',
    category: 'Real Estate',
    tagline: 'Automate quote delivery, move day communication, and review collection so your crew moves more customers and your office manages less chaos.',
    description: 'Moving companies compete on speed and reliability — and the businesses that win are the ones that respond fastest to quote requests and communicate most clearly through the move. Automation handles both, turning every lead into a booked move and every completed move into a 5-star review.',
    painPoints: [
      'Quote requests require a callback to assess the job — delayed callbacks lose the booking to a faster competitor',
      'Move day logistics depend on manual coordinator calls to drivers and crews — communication gaps cause late arrivals',
      'Storage unit customers are never systematically re-engaged when their unit contract approaches renewal',
      'Review collection depends on asking customers at the end of an exhausting moving day — most forget to follow through'
    ],
    workflows: [
      { name: 'Instant Quote Response System', description: 'Quote request submitted → immediate SMS + email confirming receipt and asking 3 qualifying questions (move size, origin, destination). Responses trigger ballpark quote delivery within 30 minutes. Booking rate from quote requests up 44%.', timeSaved: '5h/week', impact: 'Quote booking rate up 44%' },
      { name: 'Move Day Communication Sequence', description: '24 hours before → crew assignment confirmation to customer. Morning of → driver "on our way" notification with estimated arrival. Arrival → customer confirmation. Move complete → delivery confirmation. Every customer knows exactly what is happening.', timeSaved: '4h/week', impact: 'Move day customer calls down 71%' },
      { name: 'Storage Unit Renewal Campaign', description: '45 days before contract end → renewal offer with current pricing and upgrade options. 30 days → follow-up. 15 days → final notice. Storage renewal rate increases from 58% to 79%. Each renewal prevents a vacancy and a re-marketing expense.', timeSaved: '3h/week', impact: 'Storage renewal rate: 58% → 79%' },
      { name: 'Post-Move Review Collection', description: '2 days after move completion → review request SMS to customer. Warm, specific, and timed when the relief of a completed move is fresh. Captures 4x more reviews than asking on move day when customers are exhausted.', timeSaved: '2h/week', impact: '4x more reviews collected' }
    ],
    tools: ['n8n', 'Twilio', 'Google Sheets', 'Stripe'],
    stats: { timeSaved: '15h/week', revenueImpact: '$4,600/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can the quote system handle long-distance moves differently from local moves?', a: 'Yes — local and long-distance moves have different qualifying questions, pricing formulas, and quote formats. The system routes each inquiry to the appropriate quote workflow automatically.' },
      { q: 'Can the move day communication system track multiple crews on multiple jobs simultaneously?', a: 'Yes — each job has its own communication thread. Crew A\'s update does not interfere with Crew B\'s job. All jobs run simultaneously with independent communication sequences.' },
      { q: 'How does the storage renewal campaign handle price increases?', a: 'Price increase communications are built into the renewal flow with the appropriate notice periods required by state law. Messaging is transparent and professional, framing the renewal as a value conversation.' }
    ]
  },
  {
    slug: 'construction-company',
    name: 'General Contractor / Construction Company',
    category: 'Real Estate',
    tagline: 'Automate project status updates, subcontractor coordination, and change order tracking so your project managers run more jobs without losing control of any.',
    description: 'General contractors and construction companies fail at scale because communication breaks down — with clients who feel out of the loop, with subcontractors who miss coordination calls, and with project managers who are too busy to send updates. Automation systematizes every communication channel.',
    painPoints: [
      'Clients call weekly for project status updates that a systematic communication system would eliminate',
      'Subcontractor scheduling coordination requires multiple calls and confirmations per trade per week',
      'Change orders are verbally agreed and poorly documented — leading to billing disputes and margin erosion',
      'Project close-out punch lists, final inspections, and warranty information delivery are managed differently every job'
    ],
    workflows: [
      { name: 'Weekly Project Status Updates', description: 'Every Friday → automated project status report to client: milestones completed, photos from the week, next week\'s schedule, and any decisions required. Clients feel informed. Status calls drop 74%.', timeSaved: '6h/week', impact: 'Client status calls down 74%' },
      { name: 'Subcontractor Scheduling System', description: 'Trade needed → automated schedule request to subcontractor with specific date, scope, and access instructions. Confirmation required. No confirmation by 48h → escalation to PM. Scheduling coordination cut by 80%.', timeSaved: '7h/week', impact: 'Subcontractor coordination cut by 80%' },
      { name: 'Change Order Documentation', description: 'Scope change identified → automated change order form sent to client with description, cost impact, and timeline impact. E-signature required before work proceeds. Every change order documented and approved. Billing disputes eliminated.', timeSaved: '4h/week', impact: 'Change order disputes eliminated' },
      { name: 'Project Close-Out Sequence', description: 'Substantial completion → automated punch list delivery, final inspection scheduling, warranty documentation delivery, and review request. Professional, systematic close-out on every project regardless of who manages it.', timeSaved: '4h/week', impact: 'Close-out fully systematized' }
    ],
    tools: ['n8n', 'Twilio', 'DocuSign', 'Buildertrend API'],
    stats: { timeSaved: '22h/week', revenueImpact: '$7,200/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'What construction management software does this integrate with?', a: 'We integrate with Buildertrend, Procore, CoConstruct, Jobber, and most major construction management platforms. Schedule data and milestone completion drive all automated communications.' },
      { q: 'Can the client update system include progress photos automatically?', a: 'Yes — photos uploaded to your project management platform or a shared folder are attached to the weekly update email automatically. No manual photo attachment required.' },
      { q: 'How does the change order automation handle urgent scope changes that need same-day approval?', a: 'Urgent change orders are flagged for immediate delivery with a same-day response deadline. The system sends a follow-up after 4 hours if the change order hasn\'t been signed.' }
    ]
  },
  // ─── FOOD & RESTAURANT (15) ──────────────────────────────────────────────────
  {
    slug: 'restaurant',
    name: 'Restaurant',
    category: 'Food & Restaurant',
    tagline: 'Fill more tables, reduce no-shows, and build a loyal customer base that comes back without running another discount campaign.',
    description: 'Restaurants fight for every cover — and most are running entirely without the systematic follow-up and loyalty infrastructure that turns first-time diners into regulars. Automation handles the repeat visit trigger, birthday campaign, and review collection that build a recurring customer base.',
    painPoints: [
      'No-shows and last-minute cancellations leave tables empty on busy nights with no recovery system',
      'First-time diners have a great experience and never hear from the restaurant again — no system to bring them back',
      'Birthday and anniversary campaigns require manual list management that no one has time for',
      'Online review collection is verbal — most satisfied customers never follow through on their intention to review'
    ],
    workflows: [
      { name: 'Reservation Reminder & Confirmation', description: '48 hours before reservation → SMS confirmation with 1-click cancel option. Day of → reminder with directions and parking note. No-shows drop from 18% to under 5%. Walk-in waitlist fills cancellations automatically.', timeSaved: '4h/week', impact: 'No-shows: 18% → 5%' },
      { name: 'Return Visit Campaign', description: '14 days after last visit → automated re-engagement SMS for dine-in customers. 30 days → second message with current specials. 60 days → win-back offer. Converts 23% of lapsing customers back to a return visit.', timeSaved: '3h/week', impact: '23% lapsing customers returned' },
      { name: 'Birthday & Anniversary Campaign', description: 'Birthdays and anniversaries captured at reservation or loyalty sign-up → automated offer 7 days before the date and again the day before. Birthday marketing has the highest restaurant redemption rate in existence.', timeSaved: '2h/week', impact: 'Highest-ROI restaurant campaign automated' },
      { name: 'Review Generation System', description: '2 hours after dining → SMS review request with direct Google or Yelp link. Timed when the experience is fresh but not intrusive. Generates 5-8x more reviews per month than verbal asking at table.', timeSaved: '2h/week', impact: '5-8x more online reviews' }
    ],
    tools: ['n8n', 'Twilio', 'OpenTable API', 'Google Sheets'],
    stats: { timeSaved: '12h/week', revenueImpact: '$4,800/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'What reservation systems does this integrate with?', a: 'We integrate with OpenTable, Resy, SevenRooms, Yelp Reservations, and most major restaurant reservation platforms. Reservation data drives reminder and follow-up workflows.' },
      { q: 'Can the return visit campaign differentiate between high-value and occasional diners?', a: 'Yes — spend history and visit frequency determine message timing and offer level. High-value guests get different treatment than occasional guests.' },
      { q: 'Can this work for delivery-only or ghost kitchen concepts?', a: 'Yes — delivery customers are reached via order history from your delivery platform. Return visit campaigns become reorder incentive sequences.' }
    ]
  },
  {
    slug: 'catering-company',
    name: 'Catering Company',
    category: 'Food & Restaurant',
    tagline: 'Automate event quote delivery, client approval workflows, and vendor coordination so your operations team handles more events without more chaos.',
    description: 'Catering companies manage complex event logistics — menus, dietary requirements, staffing, venue coordination — all of which depend on consistent client communication and operational coordination. Automation handles the communication layer so your team focuses on execution.',
    painPoints: [
      'Quote requests require manual follow-up and proposal writing that delays the sales process by days',
      'Menu approval, headcount updates, and dietary requirements come in scattered via email and text with no tracking',
      'Day-of event coordination requires multiple simultaneous calls to staff, venue, and suppliers',
      'Post-event invoicing and review collection are handled inconsistently — affecting cash flow and online reputation'
    ],
    workflows: [
      { name: 'Automated Quote Response', description: 'Inquiry received → questionnaire sent collecting event type, date, guest count, dietary requirements, and budget. Responses generate quote parameters → proposal delivered within 24 hours. Proposal delivery speed doubles booking rate vs. 3-day manual process.', timeSaved: '5h/week', impact: '2x booking rate from faster proposals' },
      { name: 'Event Planning Approval Workflow', description: 'Menu proposal, staffing plan, and timeline ready → structured approval request sent to client. Changes collected via form, not email. All approvals tracked. Changes confirmed before event execution. Last-minute confusion eliminated.', timeSaved: '4h/week', impact: 'Event planning confusion eliminated' },
      { name: 'Day-Of Coordination Sequence', description: '12 hours before event → automated briefing sent to each staff member, venue contact, and supplier with specific times, locations, and contacts. Morning-of confirmation required. Day-of coordination calls reduced by 78%.', timeSaved: '4h/week', impact: 'Day-of calls down 78%' },
      { name: 'Post-Event Billing & Review', description: 'Event complete → final invoice generated with actual headcount and any additions → sent via payment link. Simultaneously, review request sent to event organizer. Both captured automatically for every event.', timeSaved: '3h/week', impact: 'Post-event admin fully automated' }
    ],
    tools: ['n8n', 'Twilio', 'Stripe', 'Google Sheets'],
    stats: { timeSaved: '17h/week', revenueImpact: '$5,900/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can the quote system handle custom corporate event inquiries vs. social events?', a: 'Yes — corporate and social events have different intake questionnaires, pricing models, and proposal templates. The workflow routes each inquiry to the appropriate response format.' },
      { q: 'How does the approval workflow handle last-minute headcount changes?', a: 'Headcount changes trigger an automated impact notification showing the updated cost and any menu adjustments required. Client confirmation is required before the change is finalized.' },
      { q: 'Can the staff coordination messages include digital briefing documents?', a: 'Yes — staff briefing packets (event flow, setup instructions, menu descriptions, dress code) are attached to the pre-event briefing message automatically.' }
    ]
  },
  {
    slug: 'food-truck',
    name: 'Food Truck',
    category: 'Food & Restaurant',
    tagline: 'Build a loyal following that shows up wherever you park — automated location alerts, loyalty messages, and event booking that fill every shift.',
    description: 'Food trucks live on repeat customers and event bookings, but most communicate their location sporadically via social media that reaches only a fraction of their audience. Automation builds the direct communication channel that fills shifts and generates consistent event bookings.',
    painPoints: [
      'Location updates via social media reach only 3-8% of followers — most regular customers never know where the truck is today',
      'Event and private party booking requests are fielded manually via Instagram DM and email with no systematic follow-up',
      'Loyalty programs are either non-existent or paper-punch cards that are never redeemed',
      'Catering and private event inquiries are the highest-margin business but are never systematically pursued'
    ],
    workflows: [
      { name: 'Location Alert SMS System', description: 'Daily location schedule updated → automated SMS to subscriber list with today\'s location, hours, and today\'s special. Builds a direct channel that reaches 97% of subscribers vs. 5% social reach. Revenue on location days increases 34%.', timeSaved: '2h/week', impact: 'Revenue per location day up 34%' },
      { name: 'Event Booking Automation', description: 'Private event inquiry → questionnaire collects event details, date, guest count, and budget. Proposal delivered within 4 hours. 3-day follow-up if no response. Booking rate doubles from speed and systematic follow-up.', timeSaved: '3h/week', impact: 'Event booking rate doubled' },
      { name: 'Customer Loyalty Program', description: 'Customer signs up via QR code or text keyword → digital loyalty punch card tracked automatically. Reward earned → instant notification with redemption instructions. Program drives 3.1x more repeat visits than no program.', timeSaved: '2h/week', impact: '3.1x repeat visit rate' },
      { name: 'Catering Prospect Campaign', description: 'Monthly outreach to local businesses, offices, and event venues in operating area with catering menu and booking offer. High-margin catering revenue built systematically rather than by chance.', timeSaved: '2h/week', impact: '2-3 new catering contracts/month' }
    ],
    tools: ['n8n', 'Twilio', 'Google Sheets', 'Stripe'],
    stats: { timeSaved: '10h/week', revenueImpact: '$3,200/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can the location alert work if our schedule changes day-to-day?', a: 'Yes — alerts are sent when the location is confirmed each morning. If plans change, a same-day update is sent to subscribers. The system is designed for the inherently flexible food truck schedule.' },
      { q: 'How do customers subscribe to location alerts?', a: 'Via text keyword (text TACOS to a number), QR code at the truck window, website sign-up, or social media link. Multiple subscription channels all feed the same automated list.' },
      { q: 'Can the loyalty program work without a POS integration?', a: 'Yes — staff confirm purchases via simple mobile form and the loyalty counter increments automatically. POS integration with Square or Clover is available for fully automated stamp tracking.' }
    ]
  },
  {
    slug: 'bakery',
    name: 'Bakery',
    category: 'Food & Restaurant',
    tagline: 'Automate custom order intake, pickup reminders, and wholesale customer reorder campaigns that grow revenue without growing chaos.',
    description: 'Bakeries — especially those with custom orders, wholesale accounts, and retail — have three distinct revenue streams that each require consistent communication. Automation handles all three: custom order workflow, retail customer loyalty, and wholesale reorder cycles.',
    painPoints: [
      'Custom cake and order intake is a back-and-forth process that consumes significant time per order for information that a form could collect upfront',
      'Pickup day no-shows for custom orders result in wasted product and lost revenue with no systematic confirmation system',
      'Wholesale accounts reorder inconsistently because no one is proactively managing the reorder cycle',
      'Seasonal and holiday order campaigns are sent to an email list without personalization or systematic follow-up'
    ],
    workflows: [
      { name: 'Custom Order Intake Automation', description: 'Custom order inquiry received → structured order form sent collecting all details: flavors, size, design references, delivery or pickup, dietary restrictions, and date. Complete order information received before any back-and-forth. Order intake calls drop 73%.', timeSaved: '5h/week', impact: 'Custom order intake calls down 73%' },
      { name: 'Pickup Confirmation System', description: '24 hours before pickup → SMS reminder with order summary and pickup window. 2-hour reminder on pickup day. No-show rate drops from 12% to under 2%. Reduces wasted custom product significantly.', timeSaved: '2h/week', impact: 'No-shows: 12% → 2%' },
      { name: 'Wholesale Reorder Campaigns', description: 'Wholesale account order history → reorder reminder sent at calculated depletion rate. New seasonal menu items sent to all wholesale accounts 2 weeks before launch. Wholesale revenue increases 31% from systematic reorder management.', timeSaved: '3h/week', impact: 'Wholesale revenue up 31%' },
      { name: 'Holiday Order Campaign', description: '6 weeks before each major holiday → automated campaign to past custom order customers with seasonal menu, early-bird pricing, and deadline. Personalized with their previous order history. Holiday revenue 2.4x vs non-systematic campaigns.', timeSaved: '2h/week', impact: 'Holiday revenue 2.4x higher' }
    ],
    tools: ['n8n', 'Twilio', 'Stripe', 'Typeform'],
    stats: { timeSaved: '13h/week', revenueImpact: '$3,700/month', deploymentDays: 7, roiMonths: 2 },
    faq: [
      { q: 'Can the custom order form include design reference photo uploads?', a: 'Yes — the intake form includes image upload fields for inspiration photos, logo files, and color reference images. All files flow directly to the order management system.' },
      { q: 'How does the wholesale reorder system know each account\'s depletion rate?', a: 'Depletion rates are calculated from order history — the system knows roughly how long each order quantity lasts per account. As order history grows, timing precision improves.' },
      { q: 'Can this work for a small home bakery as well as a retail location?', a: 'Yes — the scale of the automation adapts to your volume. A home baker with 15 custom orders per month benefits as much as a retail bakery with 200 weekly wholesale orders.' }
    ]
  },
  {
    slug: 'coffee-shop',
    name: 'Coffee Shop',
    category: 'Food & Restaurant',
    tagline: 'Build a loyalty program that drives daily visits, automate wholesale customer reorders, and capture online orders that increase average ticket size.',
    description: 'Independent coffee shops compete with chains by offering superior product and experience — but most are losing the loyalty and repeat visit battle because they have no systematic communication with their customer base. Automation builds the digital relationship that keeps daily visitors coming back.',
    painPoints: [
      'No loyalty program or inconsistent punch card system means regular customers are never identified or rewarded',
      'Wholesale cafe or office coffee accounts reorder inconsistently — revenue is lumpy and hard to forecast',
      'Morning specials and new menu items are communicated only via chalkboard and social media — reaching a fraction of regulars',
      'Events (cuppings, latte art classes, open mics) are poorly attended because promotion is manual and late'
    ],
    workflows: [
      { name: 'Digital Loyalty Program', description: 'Customer signs up via QR code at register → digital loyalty card tracked automatically → reward earned → instant notification. Loyal customers visit 2.7x more frequently than non-loyalty customers. Program pays for itself in the first week.', timeSaved: '2h/week', impact: 'Loyal customer visit frequency 2.7x' },
      { name: 'Wholesale Account Management', description: 'Office or cafe wholesale account → automated monthly reorder reminder. New roast or blend available → announcement to wholesale list. Wholesale revenue becomes predictable and grows without manual account management.', timeSaved: '3h/week', impact: 'Wholesale revenue stabilized' },
      { name: 'Daily Special Announcements', description: 'Morning special or featured drink → automated SMS to subscriber list at 7am with the day\'s feature. Drives foot traffic from regulars who might have gone elsewhere. SMS open rates 98% vs. Instagram 5%.', timeSaved: '2h/week', impact: 'Daily special traffic measurably up' },
      { name: 'Event Promotion Sequence', description: 'Event scheduled → announcement 2 weeks before to full list. 1-week reminder. Day-before notification. Event attendance doubles from systematic multi-touch promotion vs. single social post.', timeSaved: '2h/week', impact: 'Event attendance doubled' }
    ],
    tools: ['n8n', 'Twilio', 'Square API', 'Google Sheets'],
    stats: { timeSaved: '10h/week', revenueImpact: '$2,600/month', deploymentDays: 7, roiMonths: 2 },
    faq: [
      { q: 'Does the loyalty program require a specific POS system?', a: 'We integrate with Square, Toast, Clover, and Lightspeed. The loyalty stamp can also be triggered via simple mobile form if POS integration is not available.' },
      { q: 'Can the SMS list be built without requiring customers to download an app?', a: 'Yes — customers subscribe by texting a keyword to your number. No app download required. The simplicity dramatically increases sign-up rates versus app-based loyalty programs.' },
      { q: 'How do we handle customers who want to opt out of SMS messages?', a: 'Opt-out is instant via reply STOP to any message. All opt-outs are recorded and respected automatically per TCPA regulations.' }
    ]
  },
  {
    slug: 'meal-prep-service',
    name: 'Meal Prep Service',
    category: 'Food & Restaurant',
    tagline: 'Automate weekly order collection, dietary preference management, and subscription renewals so your kitchen plans around a reliable, predictable order volume.',
    description: 'Meal prep services live on subscription revenue and predictable weekly volumes. Manual order collection creates chaos in the kitchen; lost subscribers represent recurring revenue that walks out the door. Automation handles the subscription lifecycle, order collection, and reactivation that make the business work at scale.',
    painPoints: [
      'Weekly order cutoff management requires staff to chase unresponsive subscribers via email and text — a chaotic process on cutoff day',
      'Subscription cancellation is high because there is no proactive retention system — subscribers cancel when they go on vacation and never return',
      'Dietary preference tracking is manual and error-prone — wrong meals delivered is the top customer complaint',
      'New subscriber acquisition via referrals is never systematically encouraged despite high satisfaction rates'
    ],
    workflows: [
      { name: 'Weekly Order Collection System', description: 'Tuesday → order reminder SMS to all active subscribers with weekly menu and customization options. Cutoff Thursday → final reminder. No response → default meal plan applied and subscriber notified. Order volume becomes predictable.', timeSaved: '5h/week', impact: 'Order chaos eliminated completely' },
      { name: 'Subscription Retention Sequences', description: 'Cancellation received → pause option offered as alternative. Subscriber paused → weekly check-in during pause. Re-activation reminder at pause end. Win-back campaign 30 days after cancellation. Subscriber LTV increases 38%.', timeSaved: '4h/week', impact: 'Subscriber LTV up 38%' },
      { name: 'Dietary Preference Management', description: 'New subscriber → preference questionnaire collects allergies, intolerances, and preferences. Changes submitted via SMS keyword or form → update confirmed. Correct meals delivered to the right customer every week automatically.', timeSaved: '3h/week', impact: 'Wrong meal delivery errors eliminated' },
      { name: 'Referral Program Automation', description: 'Subscriber completing week 4 → referral invitation with personalized code. Reward credited automatically when referral subscribes. Referral rate of 18% of active subscribers when systematically invited vs. 3% organic.', timeSaved: '2h/week', impact: 'Referral rate: 3% → 18%' }
    ],
    tools: ['n8n', 'Twilio', 'Stripe', 'Google Sheets'],
    stats: { timeSaved: '15h/week', revenueImpact: '$4,100/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can the order system handle different meal plans (e.g., 5-meal vs 10-meal) with different cutoffs?', a: 'Yes — each plan type has its own order cycle, cutoff timing, and default selection logic. Subscribers on different plans receive appropriately timed reminders.' },
      { q: 'What if a subscriber has complex multi-allergen requirements?', a: 'Dietary profiles capture multi-allergen combinations. Kitchen preparation reports flag each order with the subscriber\'s full dietary profile. Nothing complex slips through.' },
      { q: 'Can the referral program track referral attribution accurately?', a: 'Yes — each subscriber receives a unique referral code. Referral attribution, reward crediting, and referral count tracking are all automated. No manual tracking required.' }
    ]
  },
  {
    slug: 'bar-nightclub',
    name: 'Bar / Nightclub',
    category: 'Food & Restaurant',
    tagline: 'Automate event promotion, VIP table reservations, and loyalty campaigns that fill your venue on every night that matters.',
    description: 'Bars and nightclubs live on event nights and loyal regulars. Most are relying entirely on social media and word of mouth while leaving systematic SMS marketing, VIP nurture, and event promotion on the table. Automation builds the direct communication channel that turns one-time visitors into VIP regulars.',
    painPoints: [
      'Event promotion via social media reaches only a fraction of the audience that could fill the venue on a major night',
      'VIP table inquiries receive slow, inconsistent responses — high-margin reservations go to competitors who respond first',
      'Guest list management is manual and chaotic — a spreadsheet on the night of a busy event',
      'Regulars are never systematically recognized or rewarded despite representing the highest revenue per visit'
    ],
    workflows: [
      { name: 'Event Promotion SMS Campaigns', description: 'Event confirmed → multi-touch promotion campaign: announcement 2 weeks before, early bird ticket offer 10 days before, sold-out warning 5 days before, day-of reminder. SMS reach vs. social reach: 97% vs. 5%. Consistent sell-outs.', timeSaved: '3h/week', impact: 'Venue capacity consistently filled' },
      { name: 'VIP Table Booking Automation', description: 'VIP inquiry submitted → immediate confirmation with table options, pricing, and minimum spend. Booking confirmed → 48h and day-of reminders with guest list instructions and arrival time. VIP experience starts before the guest arrives.', timeSaved: '4h/week', impact: 'VIP booking response time < 15 min' },
      { name: 'Guest List Management', description: 'Event guest list collected digitally via link — names, party size, and special requests. Door staff access via tablet. No paper lists, no last-minute confusion. Guest list checked in 3x faster on busy nights.', timeSaved: '3h/week', impact: 'Door check-in 3x faster' },
      { name: 'Regular Guest Recognition', description: 'Regulars identified by visit frequency → VIP tier notification → birthday acknowledgment with complimentary drink offer → early access to event tickets. Recognition drives loyalty and higher spend per visit.', timeSaved: '2h/week', impact: 'Regular guest spend up 2.2x' }
    ],
    tools: ['n8n', 'Twilio', 'Stripe', 'Google Sheets'],
    stats: { timeSaved: '13h/week', revenueImpact: '$5,400/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can the SMS promotion list be built from existing social media followers?', a: 'Not directly due to platform restrictions, but we set up opt-in flows at the venue (QR code at bar, door staff sign-up tablet) and via social media posts driving to a text-to-subscribe link.' },
      { q: 'How does the VIP booking system handle minimum spend requirements?', a: 'Minimum spend is captured at booking, confirmed in the deposit process, and included in all VIP confirmation messages. It\'s transparent from the first response, preventing night-of disputes.' },
      { q: 'Can this work for a smaller neighborhood bar vs. a large nightclub?', a: 'Both. A neighborhood bar uses the loyalty and event promotion features at a smaller scale. A large nightclub uses the full VIP, guest list, and high-volume event promotion stack.' }
    ]
  },
  {
    slug: 'personal-chef',
    name: 'Personal Chef',
    category: 'Food & Restaurant',
    tagline: 'Automate client meal planning, grocery ordering, and referral generation so you cook for more clients without the administrative overhead.',
    description: 'Personal chefs sell a premium, relationship-driven service that is incredibly time-intensive to administer. Automation handles the meal planning communication, weekly preference collection, and referral program that allow a personal chef to serve more clients without proportional time investment.',
    painPoints: [
      'Weekly meal planning requires back-and-forth with each client about preferences, dietary needs, and what they\'re in the mood for',
      'Grocery and ingredient lists are manually compiled from approved menus — a time-consuming step before every cook day',
      'New client referrals happen by accident — there is no systematic request or incentive program',
      'Client billing and payment collection is handled inconsistently — cash flow suffers when clients are late'
    ],
    workflows: [
      { name: 'Weekly Menu Planning Sequence', description: 'Every Sunday → automated menu preferences questionnaire sent to each client. Preferences collected → n8n compiles weekly menu for chef approval → menu delivered to client for final confirmation. Planning efficiency 3x better with structured input.', timeSaved: '4h/week', impact: 'Menu planning time cut by 70%' },
      { name: 'Grocery List Automation', description: 'Approved menu → n8n generates categorized grocery list with quantities → delivered to chef via preferred format (email, Notion, Google Sheets). Grocery list preparation time drops from 45 minutes to under 5.', timeSaved: '3h/week', impact: 'Grocery prep: 45 min → 5 min' },
      { name: 'Client Referral Program', description: 'After client month 2 → referral invitation with incentive (one free cook day per referral). Personalized referral link tracks attribution. Referral program drives 1 new client per 3 existing clients when systematically promoted.', timeSaved: '2h/week', impact: '1 referral per 3 clients on average' },
      { name: 'Invoice & Payment Automation', description: 'Cook day completed → invoice generated and sent via payment link automatically. 7-day reminder if unpaid. Monthly clients billed on fixed date automatically. Cash flow predictable and consistent.', timeSaved: '2h/week', impact: 'Cash flow fully predictable' }
    ],
    tools: ['n8n', 'Twilio', 'Stripe', 'Google Sheets'],
    stats: { timeSaved: '12h/week', revenueImpact: '$2,400/month', deploymentDays: 7, roiMonths: 2 },
    faq: [
      { q: 'Can the menu planning questionnaire handle complex dietary requirements across multiple family members?', a: 'Yes — the questionnaire is configured per household, capturing preferences and restrictions for each person who eats the prepared meals.' },
      { q: 'Can grocery lists be sent in formats that work with Instacart or grocery delivery apps?', a: 'Lists can be formatted for any delivery service. Instacart integration can be built for chefs who use consistent delivery services.' },
      { q: 'Can automation handle clients who change their preferences frequently?', a: 'The weekly questionnaire is designed for exactly this — preferences are re-confirmed weekly rather than locked in at onboarding, accommodating clients with seasonal or mood-based preferences.' }
    ]
  },
  {
    slug: 'brewery-winery',
    name: 'Brewery / Winery',
    category: 'Food & Restaurant',
    tagline: 'Automate club membership management, event promotion, and distribution partner communication so your team focuses on the craft, not the admin.',
    description: 'Craft breweries and wineries have multiple revenue streams — taproom/tasting room, clubs, distribution, and events — each requiring consistent communication. Automation systematizes each channel so the team focuses on the product, not the operational communication.',
    painPoints: [
      'Beer or wine club members receive inconsistent communication — allocation announcements, shipping updates, and renewal conversations are all manual',
      'Tasting room events are promoted inconsistently via social media rather than through a direct channel to interested customers',
      'Distribution partner communication requires manual tracking of new product launches, price lists, and sell-through updates',
      'Club renewal lapses happen because there is no proactive retention system before members forget to renew'
    ],
    workflows: [
      { name: 'Club Member Communication System', description: 'Allocation released → instant notification to all club members with what they received, tasting notes, and food pairing suggestions. Shipping → tracking information automatically. Delivery confirmed → tasting notes PDF delivered. Club experience elevated.', timeSaved: '5h/week', impact: 'Club churn rate reduced by 41%' },
      { name: 'Tasting Room Event Promotion', description: 'Event scheduled → multi-touch SMS and email campaign to subscriber list. Early access for club members. Day-before reminder. Walk-in capacity filled via systematic promotion rather than social media luck.', timeSaved: '3h/week', impact: 'Event capacity consistently filled' },
      { name: 'Distribution Partner Updates', description: 'New release or seasonal launch → automated announcement to distribution partners with product specs, pricing, sell sheets, and availability. Distributor education → better sales rep advocacy. Distribution sell-through improves.', timeSaved: '3h/week', impact: 'Distributor engagement measurably higher' },
      { name: 'Club Renewal Retention Campaign', description: '60 days before renewal → member milestone message (how much they\'ve enjoyed, exclusive statistics). 30 days → renewal offer. 14 days → final reminder. Club renewal rate improves from 68% to 84%.', timeSaved: '2h/week', impact: 'Club renewal rate: 68% → 84%' }
    ],
    tools: ['n8n', 'Twilio', 'Stripe', 'Google Sheets'],
    stats: { timeSaved: '14h/week', revenueImpact: '$4,300/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can club communication handle wine vs. beer clubs with different allocation schedules?', a: 'Yes — wine clubs (quarterly) and beer clubs (monthly) have completely different cadences. Each club type has its own allocation calendar, notification timing, and member communication sequence.' },
      { q: 'Can the distribution partner system generate customized sell sheets per product?', a: 'Yes — new release announcement includes a generated sell sheet with product specs, ABV/technical details, suggested retail pricing, and tasting notes formatted for retail use.' },
      { q: 'How does the system handle direct-to-consumer shipping compliance across different states?', a: 'Shipping compliance varies by state. The system can be configured to only trigger shipping communications for members in DTC-legal states, and flag others for in-store pickup arrangements.' }
    ]
  },
  {
    slug: 'meal-delivery-service',
    name: 'Meal Delivery Service',
    category: 'Food & Restaurant',
    tagline: 'Automate driver coordination, order status notifications, and customer reorder campaigns that build predictable recurring revenue.',
    description: 'Local meal delivery services and ghost kitchen delivery operations compete with DoorDash and Uber Eats on quality and service — but lose customers who lapse between orders because there is no systematic follow-up. Automation handles order communication, driver coordination, and the re-engagement that converts one-time orders into weekly customers.',
    painPoints: [
      'Customers who order once and don\'t hear from you again are immediately captured by competitors via push notifications',
      'Driver coordination and order assignment is manual — creating delays and coverage gaps on high-volume days',
      'Order status communication depends on drivers texting customers directly — inconsistent and unreliable',
      'Reorder incentives for lapsing customers are never deployed because there is no tracking of order recency'
    ],
    workflows: [
      { name: 'Order Status Notification System', description: 'Order confirmed → instant confirmation SMS. Driver assigned → "Your driver is on the way" notification with ETA. Delivery → delivery confirmation. Customer always knows exactly where their food is without calling.', timeSaved: '4h/week', impact: 'Customer status calls eliminated' },
      { name: 'Driver Coordination Automation', description: 'New order → driver assignment notification with delivery details, address, and optimal routing. Driver confirms pickup → customer notified. Delivery confirmed → payment settled. Coordination time per order reduced by 80%.', timeSaved: '5h/week', impact: 'Driver coordination 80% faster' },
      { name: 'Reorder Campaign Sequences', description: '5 days after last order → re-engagement SMS with featured item. 14 days → second message with discount offer. 30 days → win-back campaign. Converts 31% of lapsing customers back before they establish competitor loyalty.', timeSaved: '3h/week', impact: '31% of lapsing customers recovered' },
      { name: 'Subscription Conversion Campaign', description: 'After 3rd order → subscription plan pitch: same meals you love, delivered weekly, discounted. Subscription conversion converts one-time customers to predictable weekly revenue and dramatically improves unit economics.', timeSaved: '2h/week', impact: '22% subscription conversion after 3 orders' }
    ],
    tools: ['n8n', 'Twilio', 'Stripe', 'Google Sheets'],
    stats: { timeSaved: '15h/week', revenueImpact: '$4,700/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can the driver coordination work with a mix of employed and contracted drivers?', a: 'Yes — the system handles both employment types. Driver pools are configured separately; assignment logic can weight preferred drivers based on performance metrics.' },
      { q: 'Can order status notifications include real-time GPS tracking?', a: 'Real-time GPS requires driver tracking app integration. We integrate with tools like Circuit, OnFleet, or custom GPS solutions. Basic status notifications work without GPS if preferred.' },
      { q: 'How does the subscription campaign handle meal customization for repeat subscribers?', a: 'Subscribers receive the weekly order collection questionnaire system (same as the Meal Prep Service workflow), allowing customization within the subscription framework.' }
    ]
  },
  {
    slug: 'ice-cream-shop',
    name: 'Ice Cream Shop / Dessert Parlor',
    category: 'Food & Restaurant',
    tagline: 'Build a loyal following that lines up before you open — automated loyalty rewards, birthday campaigns, and new flavor announcements that drive foot traffic all season.',
    description: 'Ice cream shops and dessert concepts have loyal customers who visit frequently during peak seasons, but most businesses have no direct communication channel with those customers. Automation builds the SMS list and loyalty program that drives consistent foot traffic regardless of weather or competition.',
    painPoints: [
      'Loyal customers who come weekly have no way to receive new flavor announcements or seasonal special notifications',
      'Birthday campaigns exist as a marketing best practice but are never implemented because the data collection is manual',
      'Wholesale and catering for events is the highest-margin revenue but is never systematically developed',
      'Off-season traffic drops significantly — no re-engagement system exists to maintain customer connection year-round'
    ],
    workflows: [
      { name: 'Flavor Drop Announcement System', description: 'New flavor or special available → immediate SMS to subscriber list. Scarcity messaging for limited flavors drives same-day visits. SMS subscriber list generates 8x more revenue per message vs. social post.', timeSaved: '2h/week', impact: '8x ROI vs social posts' },
      { name: 'Birthday Reward Campaign', description: 'Birthday captured at loyalty sign-up → automated offer 5 days before birthday and day-of reminder. Birthday redemption rate is 4x higher than any other offer type. Highest ROI marketing for food concepts.', timeSaved: '2h/week', impact: '4x redemption vs standard offers' },
      { name: 'Event & Catering Development', description: 'Monthly outreach to local event planners, birthday party venues, and corporate HR contacts with catering menu and party package options. Converts a passive catering revenue stream into an actively managed business.', timeSaved: '2h/week', impact: '2-3 catering inquiries per month generated' },
      { name: 'Off-Season Re-Engagement', description: 'October → "miss us" campaign with hot item announcement. Winter → seasonal specials promotion. Spring → season opening campaign. Maintains customer connection and drives opening-day traffic from a primed list.', timeSaved: '1h/week', impact: 'Opening season traffic up 44%' }
    ],
    tools: ['n8n', 'Twilio', 'Square API', 'Google Sheets'],
    stats: { timeSaved: '8h/week', revenueImpact: '$2,100/month', deploymentDays: 7, roiMonths: 2 },
    faq: [
      { q: 'How do customers join the flavor alert SMS list?', a: 'Via QR code at the counter, a text-to-subscribe keyword (text SCOOPS to your number), or through the loyalty sign-up form. All channels feed the same automated list.' },
      { q: 'Can the birthday campaign work without knowing customers\' birthdays in advance?', a: 'Birthdays are collected at loyalty signup — either the full date or just the birth month for privacy-conscious customers. Month-level birthday campaigns (deliver an offer to everyone with a birthday this month) also work well.' },
      { q: 'Can the system handle multi-location ice cream brands?', a: 'Yes — each location has its own subscriber list and can send location-specific flavor announcements. Chain-wide campaigns can be sent to all locations simultaneously.' }
    ]
  },
  // ─── E-COMMERCE (15) ─────────────────────────────────────────────────────────
  {
    slug: 'shopify-store',
    name: 'E-commerce / Shopify Store',
    category: 'E-commerce',
    tagline: 'Recover abandoned carts, retain more customers, and build the post-purchase flows that turn one-time buyers into repeat customers.',
    description: 'E-commerce stores on Shopify, WooCommerce, and other platforms lose enormous revenue to abandoned carts, poor post-purchase follow-up, and no systematic re-engagement of one-time buyers. Automation addresses all three revenue leaks with proven conversion-focused workflows.',
    painPoints: [
      'Abandoned cart rate of 70-75% with no recovery sequence beyond Klaviyo\'s default 3-email flow',
      'Post-purchase experience ends at the shipping confirmation email — no follow-up sequence to drive second purchase',
      'Customer review collection is passive — a request buried in a shipping email that generates 0.3% response rate',
      'Seasonal and promotional campaigns are sent to the full list without segmentation — burning the list and delivering low conversions'
    ],
    workflows: [
      { name: 'Advanced Abandoned Cart Recovery', description: 'Cart abandoned → 1-hour SMS with urgency. 4-hour email with top-selling social proof. 24-hour second email with inventory warning. 48-hour final email with discount offer. Multi-channel sequence recovers 18-24% of abandoned carts vs. 8% industry average.', timeSaved: '4h/week', impact: 'Cart recovery: 8% → 18-24%' },
      { name: 'Post-Purchase Sequence', description: 'Order placed → shipping confirmation. Delivery confirmed → "how to use / care for" content. Day 14 → satisfaction check with review request. Day 30 → second purchase recommendation based on purchase category. Second purchase rate increases 43%.', timeSaved: '3h/week', impact: 'Second purchase rate up 43%' },
      { name: 'Segmented Promotional Campaigns', description: 'Promotions segmented by: purchase history (what they\'ve bought), category affinity, purchase frequency, and last purchase date. Segmented campaigns convert at 6x the rate of broadcast lists. Revenue per email send triples.', timeSaved: '4h/week', impact: 'Revenue per email send 3x higher' },
      { name: 'Win-Back Sequence', description: '45 days since last purchase → re-engagement email with best-selling product. 60 days → discount offer. 75 days → final win-back with urgency. Recovers 19% of customers who would otherwise churn permanently.', timeSaved: '2h/week', impact: '19% win-back rate' }
    ],
    tools: ['n8n', 'Klaviyo', 'Twilio', 'Shopify API'],
    stats: { timeSaved: '14h/week', revenueImpact: '$8,600/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Does this replace Klaviyo or work alongside it?', a: 'Both options work. For simple flows, we build directly in Klaviyo and use n8n for complex multi-channel sequences and cross-tool automation. For stores already on Klaviyo, we typically enhance rather than replace.' },
      { q: 'Can SMS be added to abandoned cart recovery without a separate SMS platform?', a: 'We integrate SMS via Twilio or SMSBump/Postscript (Shopify native SMS tools). Adding SMS to the abandoned cart sequence typically increases recovery rate by 40-60% vs. email alone.' },
      { q: 'Can the post-purchase sequence be customized per product category?', a: 'Yes — a skincare buyer gets different day-14 content than a home goods buyer. Post-purchase content is mapped to product categories so every sequence feels relevant.' }
    ]
  },
  {
    slug: 'amazon-fba-seller',
    name: 'Amazon FBA Seller',
    category: 'E-commerce',
    tagline: 'Automate review collection, restock alerts, and listing optimization monitoring so your Amazon business runs efficiently at any scale.',
    description: 'Amazon FBA sellers are at the mercy of reviews, inventory, and listing health — and most are managing these manually at a scale that makes systematic attention impossible. Automation handles the review request sequences, restock alerts, and monitoring that protect and grow your Amazon business.',
    painPoints: [
      'Review collection via Amazon Request a Review is done inconsistently — a systematic approach dramatically improves review velocity',
      'Inventory restock timing depends on manual monitoring that results in stockouts that tank ranking and revenue',
      'Listing hijacking and Buy Box loss often go undetected for days because there is no automated monitoring system',
      'Seller account health metrics require manual daily checks that fall through the cracks on busy days'
    ],
    workflows: [
      { name: 'Review Request Automation', description: 'Order delivered + 5 days → Amazon "Request a Review" triggered via SP-API for every eligible order. Systematic 100% compliance with review requests vs. manual 20-30% coverage. Review velocity increases 4-6x.', timeSaved: '4h/week', impact: 'Review velocity up 4-6x' },
      { name: 'Inventory Restock Alert System', description: 'FBA inventory levels monitored daily → when stock drops below restock threshold (based on velocity × lead time) → immediate alert to seller with reorder quantity recommendation. Stockouts reduced by 87%.', timeSaved: '3h/week', impact: 'Stockouts reduced by 87%' },
      { name: 'Listing Health Monitoring', description: 'Key ASINs monitored for: Buy Box loss, listing suppression, hijacker detection, price change alerts, and category change notifications. Any issue triggers immediate alert with specific remediation steps.', timeSaved: '5h/week', impact: 'Listing issues detected in minutes' },
      { name: 'Account Health Dashboard', description: 'Daily pull of account health metrics → compiled into daily digest → flagged items requiring action highlighted with priority level. Account health maintained proactively rather than reactively.', timeSaved: '3h/week', impact: 'Account health maintained proactively' }
    ],
    tools: ['n8n', 'Amazon SP-API', 'Google Sheets', 'Slack'],
    stats: { timeSaved: '16h/week', revenueImpact: '$7,200/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Is automated review requesting compliant with Amazon\'s Terms of Service?', a: 'Yes — the "Request a Review" button via SP-API is Amazon\'s own approved review request mechanism. It sends Amazon\'s standardized review request (not a custom message). This is the only compliant automated review request method.' },
      { q: 'Can inventory monitoring handle multiple warehouses or 3PL locations?', a: 'Yes — inventory across FBA, FBM, and 3PL can be monitored in aggregate. Restock thresholds account for available inventory across all locations.' },
      { q: 'Can the listing monitoring track competitor pricing and BSR movements?', a: 'Yes — competitor ASIN pricing and BSR monitoring can be added to the workflow. Significant competitor price drops or BSR improvements trigger analysis alerts.' }
    ]
  },
  {
    slug: 'subscription-box-company',
    name: 'Subscription Box Company',
    category: 'E-commerce',
    tagline: 'Reduce churn, increase box personalization, and automate the renewal campaigns that keep subscribers paying month after month.',
    description: 'Subscription box companies live and die on monthly churn rate. A 1% improvement in monthly churn doubles the lifetime value of the average subscriber. Automation builds the retention infrastructure — personalization, loyalty, and proactive renewal management — that compounds subscriber LTV.',
    painPoints: [
      'Subscriber personalization is done manually via surveys that most subscribers don\'t complete — boxes feel generic',
      'Cancellation flow is a single "are you sure?" button — no retention offer, no pause option, no save conversation',
      'Shipping delay communication is reactive — subscribers find out from carrier tracking before hearing from the company',
      'Loyalty and referral programs exist but are never promoted — most subscribers don\'t know they exist'
    ],
    workflows: [
      { name: 'Subscriber Personalization Flow', description: 'New subscriber → onboarding quiz on preferences, sizing, and wishlist items. Month 3 → preference update survey. Personalization data drives box curation. Personalized boxes have 34% lower churn than generic boxes.', timeSaved: '4h/week', impact: 'Churn 34% lower with personalization' },
      { name: 'Cancellation Save Sequence', description: 'Cancellation initiated → retention offer: skip a month, pause subscription, or downgrade option presented before cancellation completes. Saves 31% of would-be cancellations. Each saved subscriber worth average $89 in future revenue.', timeSaved: '3h/week', impact: '31% of cancellations saved' },
      { name: 'Shipping & Fulfillment Communication', description: 'Box shipped → proactive notification with tracking. 2 days before delivery → "your box is almost there" anticipation builder. Delivery confirmed → unboxing prompt. Shipping issue detected → proactive outreach before subscriber contacts support.', timeSaved: '3h/week', impact: 'Shipping support contacts down 67%' },
      { name: 'Loyalty & Referral Promotion', description: 'Monthly subscriber digest includes loyalty points balance, referral link, and what reward they\'re close to earning. Consistent promotion increases referral participation from 3% to 11% of subscribers.', timeSaved: '2h/week', impact: 'Referral participation: 3% → 11%' }
    ],
    tools: ['n8n', 'Twilio', 'Klaviyo', 'Shopify API'],
    stats: { timeSaved: '13h/week', revenueImpact: '$6,400/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'What subscription management platforms does this integrate with?', a: 'We integrate with Recharge, Skio, Bold Subscriptions, Subbly, and most major subscription commerce platforms. Subscription status and renewal data drives all retention workflows.' },
      { q: 'Can the cancellation save flow offer different incentives based on subscriber tenure?', a: 'Yes — long-tenure subscribers (12+ months) get different save offers than new subscribers (1-3 months). Tenure-based offers have higher save rates because they acknowledge subscriber loyalty.' },
      { q: 'Can the shipping communication integrate with multiple fulfillment partners?', a: 'Yes — we integrate with ShipStation, ShipBob, Fulfillment by Amazon, and most major 3PL and fulfillment platforms. Tracking data from any fulfillment partner drives the customer notification sequence.' }
    ]
  },
  {
    slug: 'dropshipping-store',
    name: 'Dropshipping Store',
    category: 'E-commerce',
    tagline: 'Automate supplier order routing, shipping delay communication, and post-purchase follow-up so your store handles volume without customer service chaos.',
    description: 'Dropshipping stores scale rapidly but typically lack the operational automation to handle customer communication at volume. Supplier delays, shipping updates, and customer service inquiries create bottlenecks that damage reputation. Automation handles systematic customer communication so your reputation matches your advertising spend.',
    painPoints: [
      'Supplier orders are manually placed after customer orders arrive — creating delays and errors at volume',
      'Shipping delays are discovered by customers before the store owner is aware — reactive damage control is expensive',
      'Customer service inquiries about "where is my order" consume disproportionate support time',
      'Post-purchase upsell and cross-sell revenue is never captured because follow-up is non-existent'
    ],
    workflows: [
      { name: 'Automated Order Routing', description: 'Customer order placed → order automatically submitted to relevant supplier(s) → confirmation and tracking number captured → customer shipping notification sent. Manual order placement eliminated for 100% of standard orders.', timeSaved: '6h/week', impact: 'Order routing fully automated' },
      { name: 'Proactive Shipping Communication', description: 'Order shipped → tracking notification. Day 5 → "on its way" update. Day 9 (if not delivered) → proactive "checking on your order" message. Delivery → delivery confirmation with review request. WISMO inquiries drop 74%.', timeSaved: '5h/week', impact: 'WISMO inquiries down 74%' },
      { name: 'Shipping Delay Alert System', description: 'Supplier delay detected → automated customer notification before they notice: honest update, revised timeline, and optional cancellation offer. Proactive honesty builds trust; reactive excuses destroy it.', timeSaved: '3h/week', impact: 'Chargeback rate reduced by 61%' },
      { name: 'Post-Purchase Upsell Sequence', description: 'Day 14 post-purchase → recommendation email for complementary products based on what they bought. Day 30 → reorder prompt for consumable items. Post-purchase sequence generates 22% additional revenue from existing customers.', timeSaved: '2h/week', impact: '22% additional revenue from past buyers' }
    ],
    tools: ['n8n', 'Twilio', 'Shopify API', 'Google Sheets'],
    stats: { timeSaved: '17h/week', revenueImpact: '$5,100/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can order routing handle products from multiple different suppliers in one order?', a: 'Yes — multi-supplier orders are split and routed to each supplier independently. Tracking numbers are collected from all suppliers and consolidated into a single customer notification.' },
      { q: 'What supplier integration is supported?', a: 'We integrate with AliExpress (via DSers/Oberlo), CJ Dropshipping, Spocket, Zendrop, US Direct, and custom supplier APIs. Email-based order submission is also supported for suppliers without APIs.' },
      { q: 'Can the delay communication system detect delays before customers notice?', a: 'Yes — if tracking information stops updating for more than 72 hours or shows carrier exception status, the delay alert workflow triggers proactive customer communication before anyone files a dispute.' }
    ]
  },
  {
    slug: 'wholesale-distributor',
    name: 'Wholesale Distributor',
    category: 'E-commerce',
    tagline: 'Automate reorder alerts, pricing update communications, and new product launches so your sales team focuses on relationships, not administrative touchpoints.',
    description: 'Wholesale distributors depend on consistent reorder cycles from retail and business customers, but most distributors rely on customers self-initiating reorders with no systematic re-engagement. Automation creates the proactive communication infrastructure that reduces out-of-stock situations and increases order frequency.',
    painPoints: [
      'Retailers run out of stock before reordering because there is no proactive reorder alert system based on purchase history',
      'Pricing and product updates require manual email to each account — time-consuming and often delayed',
      'New product launches are communicated inconsistently — some accounts hear about new items months after launch',
      'Account reps spend significant time on routine check-in calls that could be replaced by automated touchpoints'
    ],
    workflows: [
      { name: 'Reorder Alert System', description: 'Account order history analyzed → reorder reminder sent at predicted depletion date for each product. "Your previous order of 48 units typically lasts 35 days. You ordered 29 days ago." Reorder frequency increases 28%.', timeSaved: '6h/week', impact: 'Reorder frequency up 28%' },
      { name: 'Pricing & Product Update Distribution', description: 'Price list update finalized → automatic distribution to all active accounts with change summary and effective date. New product added → announcement to all relevant account segments. Communications reach all accounts simultaneously.', timeSaved: '4h/week', impact: 'Update distribution: days → instant' },
      { name: 'New Account Onboarding', description: 'New wholesale account approved → automated onboarding sequence: welcome message, product catalog, ordering instructions, NET terms explanation, and dedicated rep introduction. Professional onboarding without rep involvement for 80% of the content.', timeSaved: '4h/week', impact: 'New account time-to-first-order 40% shorter' },
      { name: 'Dormant Account Reactivation', description: 'Account inactive for 60 days → automated re-engagement with top-selling products in their purchase category, new items, and seasonal specials. Reactivates 24% of dormant accounts that would otherwise be lost.', timeSaved: '3h/week', impact: '24% dormant accounts reactivated' }
    ],
    tools: ['n8n', 'Google Sheets', 'Twilio', 'QuickBooks API'],
    stats: { timeSaved: '18h/week', revenueImpact: '$6,800/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can reorder alerts handle accounts with widely varying order frequencies?', a: 'Yes — depletion timing is calculated per account based on their specific order history, not a generic schedule. A high-volume retailer gets reminders every 2 weeks; a small retailer every 6 weeks.' },
      { q: 'What accounting or ERP systems does this integrate with?', a: 'We integrate with QuickBooks, NetSuite, SAP Business One, Microsoft Dynamics, and most major small business ERP and accounting platforms. Order history and account status drives all automated workflows.' },
      { q: 'Can the system handle different pricing tiers for different account types?', a: 'Yes — pricing communications are segmented by account tier (Gold, Silver, Standard). Each tier receives the pricing information appropriate to their agreement without exposing other tiers\' pricing.' }
    ]
  },
  {
    slug: 'print-on-demand-store',
    name: 'Print-on-Demand Store',
    category: 'E-commerce',
    tagline: 'Automate post-purchase follow-up, design feedback collection, and bulk order management so you scale custom print revenue without customer service overhead.',
    description: 'Print-on-demand businesses serving consumers and custom bulk orders (businesses, schools, teams) need two completely different operational systems. Automation handles retail consumer post-purchase sequences and bulk order coordination simultaneously.',
    painPoints: [
      'Consumer post-purchase experience ends at the shipping notification — no follow-up drives repeat purchases or reviews',
      'Bulk order customers (schools, businesses, sports teams) require extensive proof approval and revision coordination',
      'Production delay communication is reactive — customers file disputes before hearing from the store',
      'Repeat bulk order customers are never proactively approached for annual or recurring orders'
    ],
    workflows: [
      { name: 'Consumer Post-Purchase Sequence', description: 'Delivery confirmed → "love it?" check-in with photo upload invitation. Day 7 → review request with platform link. Day 30 → recommendation for complementary product or personalized upsell. Post-purchase revenue 31% higher per customer.', timeSaved: '3h/week', impact: 'Post-purchase revenue up 31%' },
      { name: 'Bulk Order Proof Approval', description: 'Proof ready → structured review email with proof image and revision form. Client has 48 hours to approve or request changes. Approval → production begins automatically. Revision → designer notified with structured feedback. Approval cycle cut by 52%.', timeSaved: '5h/week', impact: 'Bulk approval cycle 52% faster' },
      { name: 'Production Update Communication', description: 'Bulk order milestone (proof approved, production started, quality check, shipped) → automated update to client with current status and expected completion. Client never has to call for status. Trust built through transparency.', timeSaved: '4h/week', impact: 'Client status calls eliminated' },
      { name: 'Annual Bulk Order Reactivation', description: '11 months after last bulk order → automated re-engagement to business, school, and team customers. "It\'s almost time for your annual uniform order." Converts 41% of annual bulk customers to repeat orders without sales calls.', timeSaved: '3h/week', impact: '41% annual customer renewal rate' }
    ],
    tools: ['n8n', 'Twilio', 'Printful API', 'Shopify API'],
    stats: { timeSaved: '16h/week', revenueImpact: '$4,800/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'What print-on-demand platforms does this integrate with?', a: 'We integrate with Printful, Printify, Gooten, and Custom Cat. Order status and production milestone data from your POD platform drives all customer communication workflows.' },
      { q: 'Can the proof approval system handle multiple rounds of revisions efficiently?', a: 'Yes — each revision round is tracked with version numbering. Clients can see all previous versions in the approval portal. Approval or revision is captured via structured form, not email chain.' },
      { q: 'Can bulk order management handle multiple shipping addresses per order?', a: 'Yes — bulk orders with individual recipient shipping (common for corporate gifts and team uniforms) use address collection forms. All addresses collected in one step and passed to the fulfillment system.' }
    ]
  },
  {
    slug: 'handmade-etsy-seller',
    name: 'Handmade / Etsy Seller',
    category: 'E-commerce',
    tagline: 'Automate custom order management, production scheduling, and customer communication so you make more, sell more, and spend less time on admin.',
    description: 'Handmade sellers on Etsy and their own websites are makers first — but most spend 30-40% of their time on administrative communication: responding to custom order inquiries, managing production timelines, and handling shipping questions. Automation reclaims that time for making.',
    painPoints: [
      'Custom order inquiries require extensive back-and-forth to collect all necessary specifications before production can begin',
      'Production timeline management across multiple active orders is tracked manually — rush orders and schedule conflicts create stress',
      'Shipping questions and delivery inquiries consume significant customer service time despite being easily automated',
      'Review collection from Etsy buyers is passive — most satisfied customers never leave a review that drives future visibility'
    ],
    workflows: [
      { name: 'Custom Order Specification Intake', description: 'Custom order inquiry received → automated specification form sent collecting all customization details, dimensions, color choices, and personalization text. All information captured before any production begins. Back-and-forth messages cut by 78%.', timeSaved: '4h/week', impact: 'Custom order messages down 78%' },
      { name: 'Production Schedule Management', description: 'New order confirmed → added to production queue automatically. Production timeline communicated to customer at booking. Rush order availability checked against queue automatically. No double-booking or missed deadlines.', timeSaved: '3h/week', impact: 'Production scheduling fully automated' },
      { name: 'Shipping & Delivery Updates', description: 'Order shipped → tracking notification to customer. International orders → customs and estimated delivery explanation. Delivery confirmed → "did you love it?" check-in. WISMO inquiries drop to near zero.', timeSaved: '2h/week', impact: 'Shipping inquiries virtually eliminated' },
      { name: 'Review Request Sequence', description: 'Delivery confirmed + 3 days → review request with direct Etsy review link and specific guidance on what to mention. Etsy ranking improves with consistent review velocity. Review rate doubles.', timeSaved: '1h/week', impact: 'Review rate doubled' }
    ],
    tools: ['n8n', 'Twilio', 'Etsy API', 'Google Sheets'],
    stats: { timeSaved: '11h/week', revenueImpact: '$2,300/month', deploymentDays: 7, roiMonths: 2 },
    faq: [
      { q: 'Does Etsy allow automated messaging?', a: 'Etsy permits automated responses and follow-ups via their API. We work within Etsy\'s messaging policies — no spam, no off-platform solicitation. All automation uses compliant channels.' },
      { q: 'Can the production queue handle lead time variations by product type?', a: 'Yes — each product type has a configured lead time. Custom jewelry has a different timeline than custom woodworking. The queue automatically calculates promised delivery dates based on type.' },
      { q: 'Can this work for a seller on both Etsy and their own website simultaneously?', a: 'Yes — orders from Etsy and your own site (Shopify, WooCommerce) flow into the same production queue and customer communication system. Multi-channel management unified.' }
    ]
  },
  {
    slug: 'luxury-goods-retailer',
    name: 'Luxury Goods Retailer',
    category: 'E-commerce',
    tagline: 'Build the white-glove client communication infrastructure that luxury customers expect — personalized, proactive, and perfectly timed.',
    description: 'Luxury e-commerce and boutique retail requires a level of personalized communication that manual processes cannot sustain at scale. Automation enables the consistent, thoughtful communication that luxury customers expect: personal follow-up, anniversary messages, VIP access, and concierge-level service delivery.',
    painPoints: [
      'High-value customers expect personal follow-up after purchase that doesn\'t happen because staff doesn\'t have time for every customer',
      'Product waitlist management is manual — interested customers miss launches because notification systems are inconsistent',
      'VIP clients who represent 80% of revenue are not systematically identified, tracked, or treated differently',
      'Post-purchase care instructions and authenticity documentation delivery is manual and inconsistent'
    ],
    workflows: [
      { name: 'White-Glove Post-Purchase Experience', description: 'Purchase complete → personal thank-you email (not transactional template). Day 3 → "how are you enjoying" follow-up from a named advisor. Day 30 → care guide and styling suggestions. Day 90 → new arrivals preview. Post-purchase LTV 2.8x higher.', timeSaved: '5h/week', impact: 'Post-purchase LTV 2.8x higher' },
      { name: 'Product Drop & Waitlist System', description: 'Customer joins waitlist → immediate confirmation. Product drops → instant notification to waitlist in priority order. Waitlist members get exclusive 24-hour purchase window before public availability. Drives desirability and waitlist growth.', timeSaved: '3h/week', impact: 'Waitlist conversion rate 68%' },
      { name: 'VIP Client Recognition Program', description: 'Lifetime spend threshold reached → VIP tier notification with exclusive perks. Annual anniversary gift or credit. Birthday offer. Preview access to new collections. VIP clients spend 4.2x more than standard clients annually.', timeSaved: '3h/week', impact: 'VIP spend 4.2x standard client' },
      { name: 'Authenticity & Care Documentation', description: 'Purchase completed → authenticity certificate, care instructions, and product story delivered via email and downloadable PDF. White-glove documentation delivery at scale with zero manual effort.', timeSaved: '2h/week', impact: 'Documentation delivery fully automated' }
    ],
    tools: ['n8n', 'Klaviyo', 'Shopify API', 'Google Sheets'],
    stats: { timeSaved: '14h/week', revenueImpact: '$9,400/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can automated luxury communication be made to feel genuinely personal?', a: 'Yes — with the right personalization depth (customer name, specific product purchased, delivery timing, relevant history) and appropriate tone, automated messages are indistinguishable from personally crafted ones. Tone and personalization are configured carefully.' },
      { q: 'Can VIP tier transitions happen automatically as customers cross spend thresholds?', a: 'Yes — spend thresholds trigger VIP tier upgrades automatically. The transition message is framed as exclusive recognition, not a system notification.' },
      { q: 'Can the system handle multi-currency and international luxury customers?', a: 'Yes — all customer communications are sent in the customer\'s language and currency preference. Multi-language template libraries are built per market.' }
    ]
  },
  {
    slug: 'pet-supplies-store',
    name: 'Pet Supplies Store',
    category: 'E-commerce',
    tagline: 'Automate subscription reorders, birthday campaigns for pets, and product recommendations that build loyal customers who never shop elsewhere.',
    description: 'Pet supplies are one of the highest-loyalty, highest-repeat-purchase e-commerce categories — if the communication infrastructure exists to capture it. Automation builds the subscription, personalization, and re-engagement system that turns one-time pet supply buyers into lifetime customers.',
    painPoints: [
      'Food and consumable reorders are left to customers to initiate — subscription conversion is passive and low',
      'Pet birthday campaigns are the highest-performing marketing in the pet category but are never implemented',
      'Product recommendations are generic — a dog food buyer receives cat product promotions',
      'One-time buyers from Facebook Ads are never systematically re-engaged into repeat purchase patterns'
    ],
    workflows: [
      { name: 'Consumable Reorder Campaign', description: 'Purchase of food, treats, or medication → reorder reminder sent at calculated depletion date. "Your dog\'s food typically runs out in about 30 days — you ordered 23 days ago." Reorder conversion rate 44%.', timeSaved: '3h/week', impact: 'Reorder rate up 44%' },
      { name: 'Pet Birthday Campaign', description: 'Pet\'s birthday captured at checkout or profile → birthday offer sent 7 days before and day-of. Include pet\'s name in message. Pet birthday campaigns average 8.4x ROI vs. standard promotions. Highest performing campaign in the pet category.', timeSaved: '2h/week', impact: '8.4x ROI vs standard campaigns' },
      { name: 'Species-Based Personalization', description: 'Customer\'s pet species and breed captured → all subsequent recommendations filtered to species-appropriate products only. Dog owners never receive cat promotions. Conversion rate on recommendations improves 3.7x.', timeSaved: '2h/week', impact: 'Recommendation conversion 3.7x higher' },
      { name: 'Subscription Conversion Campaign', description: 'After 2nd consumable purchase → subscription offer with savings calculation based on their actual spend. Subscription subscribers have 4.1x higher LTV than one-time buyers. Subscription penetration increases 28%.', timeSaved: '2h/week', impact: 'Subscription penetration up 28%' }
    ],
    tools: ['n8n', 'Klaviyo', 'Shopify API', 'Twilio'],
    stats: { timeSaved: '10h/week', revenueImpact: '$4,200/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can the system capture pet profiles for multiple pets per household?', a: 'Yes — each customer can have multiple pet profiles (name, species, breed, birthday). All subsequent communications reference the specific pet(s) in the household.' },
      { q: 'What e-commerce platforms does this work with?', a: 'Shopify, WooCommerce, BigCommerce, and most major e-commerce platforms. Pet profile and purchase history data drive all personalization and reorder workflows.' },
      { q: 'Can reorder timing be adjusted for different food bag sizes and feeding amounts?', a: 'Yes — reorder timing is calculated from bag size (weight) and breed-typical feeding amount. A 50lb dog owner who buys a 30lb bag gets a different reorder timing than a 10lb dog owner buying the same bag.' }
    ]
  }
]
