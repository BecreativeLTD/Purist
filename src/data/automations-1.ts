export interface Workflow {
  name: string
  description: string
  timeSaved: string
  impact: string
}

export interface FAQ {
  q: string
  a: string
}

export interface Profession {
  slug: string
  name: string
  category: string
  tagline: string
  description: string
  painPoints: string[]
  workflows: Workflow[]
  tools: string[]
  stats: {
    timeSaved: string
    revenueImpact: string
    deploymentDays: number
    roiMonths: number
  }
  faq: FAQ[]
}

export const professions1: Profession[] = [
  {
    slug: 'plumber',
    name: 'Plumber',
    category: 'Home Services',
    tagline: 'Stop losing $3,000/week to missed calls — automate your plumbing business and respond to every lead in under 2 minutes.',
    description: 'Plumbing businesses lose 30-40% of inbound leads to missed calls during peak hours and overnight emergencies. Automation ensures every missed call gets an immediate SMS response, every quote is sent within minutes, and every past customer is systematically re-engaged.',
    painPoints: [
      'Missed calls during active jobs send leads directly to competitors — 70% never call back',
      'Quotes written by hand on job sheets take 45+ minutes per estimate and are frequently lost',
      'Google review collection depends on technicians remembering to ask — most forget',
      'No systematic follow-up with past customers means zero recurring revenue from existing relationships'
    ],
    workflows: [
      { name: 'Missed Call SMS Recovery', description: 'Every missed call triggers an automatic SMS within 90 seconds: customer name, acknowledgment, estimated callback time, and direct booking link. Captures 67% of leads that would otherwise call a competitor.', timeSaved: '4h/week', impact: 'Recover 60% of missed call leads' },
      { name: 'Automated Quote Generation', description: 'Technician completes a mobile form on-site → n8n generates a branded PDF quote with line items from your rate card → sent to customer via SMS and email within 4 minutes of form submission.', timeSaved: '6h/week', impact: 'Quote-to-booking rate up 79%' },
      { name: 'Google Review Request Sequence', description: '2 hours after job marked complete in Jobber → customer receives personalized SMS with direct Google review link. Timing and personalization increase review conversion by 340% vs asking in person.', timeSaved: '2h/week', impact: '31 new reviews in first 6 weeks' },
      { name: 'Past Customer Reactivation', description: '30 days after completed job → automated check-in SMS. 90 days → seasonal maintenance reminder referencing the specific system serviced. Converts 14% of past customers into repeat bookings.', timeSaved: '3h/week', impact: '$2,800/month in recovered recurring revenue' }
    ],
    tools: ['n8n', 'Twilio', 'Jobber', 'Google Sheets'],
    stats: { timeSaved: '18h/week', revenueImpact: '$6,300/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Will automated SMS messages feel impersonal to my customers?', a: 'No — the messages are personalized with the customer\'s name, the specific service they requested, and the technician\'s name. Most customers report the communication feels more professional and responsive than what they receive from other plumbers.' },
      { q: 'What happens if a customer has an emergency and needs an immediate response?', a: 'Emergency calls are flagged by keyword detection in the SMS reply and immediately alert the on-call technician via Slack and phone. The workflow escalates automatically — no emergency falls through the cracks.' },
      { q: 'How long does it take to set up the full automation system?', a: 'PURIST deploys the complete plumbing automation system — missed call recovery, quote generation, review requests, and reactivation — in 7 days. You provide access to your existing tools; we handle everything else.' }
    ]
  },
  {
    slug: 'electrician',
    name: 'Electrician',
    category: 'Home Services',
    tagline: 'Electricians who automate their lead response close 3x more jobs — here is the exact system.',
    description: 'Electrical contractors lose significant revenue to slow lead response and inconsistent follow-up, especially for high-value panel upgrades and EV charger installations. Automation captures every inbound lead, automates permit-related reminders, and systematically generates Google reviews after every completed job.',
    painPoints: [
      'High-value jobs like panel upgrades and EV charger installs require fast response — slow reply loses the job',
      'Permit scheduling and inspection reminders managed manually cause delays and missed appointments',
      'Estimates for complex jobs take 2-3 hours to prepare and send — most customers have moved on',
      'No follow-up system for maintenance contracts or annual inspection upsells to past customers'
    ],
    workflows: [
      { name: 'Lead Response & Triage', description: 'Inbound inquiry via web form or missed call → Claude AI reads the message, classifies the job type (emergency, installation, repair, inspection), assigns urgency, and sends a personalized response within 3 minutes. High-value jobs trigger immediate owner alert.', timeSaved: '5h/week', impact: 'Response time from 4h to 3min' },
      { name: 'Estimate Automation', description: 'After site visit, technician submits job assessment form on mobile → n8n pulls labor and material costs from your pricing database → formatted estimate PDF generated and sent to customer within 6 minutes. Includes digital acceptance button.', timeSaved: '7h/week', impact: 'Estimate acceptance rate up 45%' },
      { name: 'Permit & Inspection Scheduler', description: 'When permit is applied for → workflow creates calendar reminders for inspection dates, notifies customer of scheduling, sends day-before reminder to both customer and inspector contact. Zero missed inspection appointments.', timeSaved: '3h/week', impact: 'Eliminate permit-related delays' },
      { name: 'Annual Inspection Upsell', description: '11 months after any panel or major installation job → automated outreach offering annual electrical safety inspection. Personalized to the specific work completed. Converts 22% of past customers into recurring inspection clients.', timeSaved: '2h/week', impact: '$1,800/month in recurring inspection revenue' }
    ],
    tools: ['n8n', 'Claude AI', 'Twilio', 'Google Calendar'],
    stats: { timeSaved: '17h/week', revenueImpact: '$4,200/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can the system handle both residential and commercial electrical jobs?', a: 'Yes — the lead triage workflow classifies job type and routes commercial inquiries to a separate pipeline with different follow-up sequences, pricing templates, and response protocols.' },
      { q: 'How does the permit scheduling automation integrate with local permit offices?', a: 'The workflow manages the internal scheduling and customer communication side. It does not file permits automatically — but it tracks permit status, sends reminders, and ensures no inspection date is missed.' },
      { q: 'What if a customer wants to modify their estimate after receiving it?', a: 'The estimate system includes a revision request button. When clicked, it notifies the estimator with the original quote and the customer\'s notes, and generates a revision workflow with updated pricing.' }
    ]
  },
  {
    slug: 'hvac-technician',
    name: 'HVAC Technician',
    category: 'Home Services',
    tagline: 'HVAC businesses that automate seasonal demand spikes serve 40% more customers without hiring — here is how.',
    description: 'HVAC companies face extreme demand seasonality — summer AC calls and winter heating calls create booking backlogs that manual scheduling cannot handle efficiently. Automation manages the surge, optimizes technician routing, and builds a preventive maintenance contract base that smooths revenue year-round.',
    painPoints: [
      'Summer and winter demand spikes overwhelm manual scheduling — customers wait days and call competitors',
      'Preventive maintenance contracts managed in spreadsheets lead to missed service visits and lost renewals',
      'After-hours emergency calls have no systematic response — customers reach voicemail and book someone else',
      'Equipment warranty registrations and filter replacement reminders never get sent without automation'
    ],
    workflows: [
      { name: 'Seasonal Surge Booking System', description: 'During peak season, web form intake → automatic availability check across all technicians → optimal appointment slot offered to customer → confirmation sent → technician notified with job details and address. Handles 3x normal booking volume without additional staff.', timeSaved: '10h/week', impact: 'Handle 40% more bookings without hiring' },
      { name: 'Preventive Maintenance Contract Automation', description: 'Maintenance contract database → automated scheduling of biannual visits → customer appointment confirmation → technician route optimization → post-visit report sent to customer. Contract renewal reminders sent 60 days before expiration.', timeSaved: '6h/week', impact: '94% contract renewal rate' },
      { name: 'After-Hours Emergency Response', description: 'Emergency call outside business hours → immediate SMS to customer with estimated response time → on-call technician alerted via SMS and phone → customer receives technician name and ETA when dispatched. No emergency inquiry goes unanswered.', timeSaved: '3h/week', impact: 'Capture 100% of after-hours emergency leads' },
      { name: 'Filter Replacement & Warranty Reminders', description: 'After installation → 90-day filter replacement reminder sent to customer with direct purchase link. Equipment warranty registered automatically. Annual tune-up reminder sent each spring and fall with booking link.', timeSaved: '2h/week', impact: '$900/month in filter and accessory sales' }
    ],
    tools: ['n8n', 'Twilio', 'Google Calendar', 'Jobber'],
    stats: { timeSaved: '21h/week', revenueImpact: '$5,400/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can the booking system handle both residential and commercial HVAC?', a: 'Yes — the intake form separates residential and commercial jobs, routes them to the appropriate technician pool, and applies different pricing and scheduling rules for each.' },
      { q: 'How does the maintenance contract system handle customers who reschedule?', a: 'Rescheduled appointments automatically update the technician calendar, send the customer a new confirmation, and adjust the next scheduled visit date accordingly. No manual calendar management required.' },
      { q: 'Does the automation work with our existing dispatch software?', a: 'PURIST integrates n8n with most major HVAC dispatch platforms including ServiceTitan, Jobber, and Housecall Pro via API. We map your existing data before building anything.' }
    ]
  },
  {
    slug: 'roofer',
    name: 'Roofer',
    category: 'Home Services',
    tagline: 'Storm season overwhelms roofing companies with manual follow-up — automate and close jobs while competitors are still returning calls.',
    description: 'Roofing companies face intense competition immediately after storm events, when hundreds of homeowners are simultaneously searching for contractors. The businesses that respond within minutes win the jobs. Automation handles the surge, manages insurance claim documentation workflows, and follows up on every estimate that goes cold.',
    painPoints: [
      'Storm events generate 50-100 leads in 48 hours — manual follow-up misses most of them',
      'Insurance claim documentation and adjuster coordination requires hours of manual back-and-forth',
      'Estimates sent without systematic follow-up result in 65% abandonment rate',
      'Subcontractor scheduling and material ordering done manually causes delays and cost overruns'
    ],
    workflows: [
      { name: 'Storm Surge Lead Capture', description: 'Post-storm → geo-targeted lead capture activated → every inbound inquiry receives immediate SMS with inspection scheduling link → appointments filled in calendar order → technicians notified with address clusters for efficient routing.', timeSaved: '12h/week', impact: 'Capture 80% of storm leads within 2 hours' },
      { name: 'Insurance Claim Documentation', description: 'After inspection → damage photo form submitted by technician → n8n compiles photos, measurements, and damage report into formatted insurance package → sent to homeowner and adjuster simultaneously. Reduces claim preparation time from 3 hours to 20 minutes.', timeSaved: '8h/week', impact: 'Claims processed 9x faster' },
      { name: 'Estimate Follow-Up Sequence', description: 'Estimate sent → no response after 24h → personalized follow-up referencing specific damage noted → 72h → second follow-up with financing option highlighted → 7 days → final outreach with limited availability message. Recovers 34% of cold estimates.', timeSaved: '5h/week', impact: '34% cold estimate recovery rate' },
      { name: 'Material & Crew Scheduling', description: 'Job approved → material order generated from estimate line items → supplier notified → crew scheduled → customer receives installation date confirmation → day-before reminder sent to customer and crew. Zero scheduling gaps.', timeSaved: '4h/week', impact: 'Eliminate scheduling errors and delays' }
    ],
    tools: ['n8n', 'Claude AI', 'Twilio', 'Google Sheets'],
    stats: { timeSaved: '29h/week', revenueImpact: '$8,100/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'How does the storm surge system know when to activate?', a: 'The workflow monitors weather alert APIs for your service area. When a hail or wind event above your threshold is detected, the surge lead capture mode activates automatically and deactivates when the event window closes.' },
      { q: 'Can the insurance documentation workflow handle both ACV and RCV claims?', a: 'Yes — the damage report template adjusts based on the insurance type selected during the inspection form submission, generating the appropriate documentation format for each claim type.' },
      { q: 'What if a homeowner\'s insurance adjuster needs to schedule a joint inspection?', a: 'The workflow includes an adjuster coordination module — when a joint inspection is needed, it sends available time slots to both the homeowner and adjuster, confirms the appointment, and adds it to the technician\'s calendar.' }
    ]
  },
  {
    slug: 'painter',
    name: 'Painter',
    category: 'Home Services',
    tagline: 'Painting contractors who automate follow-up close 2x more estimates — without spending more time on sales.',
    description: 'Painting businesses send dozens of estimates per week but follow up on fewer than 20% of them due to time constraints. Automation closes this gap, systematically following up on every estimate while the painter focuses on active jobs. Combined with automated review collection, automation compounds lead flow from Google Maps.',
    painPoints: [
      'Estimates emailed and never followed up — 70% of potential jobs lost to silence',
      'Scheduling paint jobs around drying times and crew availability done manually causes booking errors',
      'Color consultation notes and client preferences stored in personal phones — lost when staff changes',
      'No referral system in place despite high customer satisfaction rates after completed jobs'
    ],
    workflows: [
      { name: 'Estimate Follow-Up Automation', description: 'Estimate sent → 48h no response → personalized follow-up mentioning specific rooms quoted → 5 days → second follow-up with seasonal booking availability → 10 days → final outreach. Converts 38% of non-responsive estimate recipients.', timeSaved: '6h/week', impact: '38% estimate conversion improvement' },
      { name: 'Job Scheduling & Crew Coordination', description: 'Job booked → crew assigned based on availability and location → material list generated from quote → paint order sent to supplier → customer receives prep checklist and start date confirmation → day-before reminder sent automatically.', timeSaved: '5h/week', impact: 'Zero scheduling conflicts' },
      { name: 'Color & Client Preference Database', description: 'During estimate → color selections, surface conditions, and client preferences captured in structured form → stored in customer profile → accessible to any crew member → referenced in all future communications with that client.', timeSaved: '3h/week', impact: 'Eliminate repeat consultations' },
      { name: 'Referral Request Sequence', description: '1 week after job completion → satisfaction check SMS → if positive → referral request with unique tracking link → $50 discount offered for successful referrals. Generates 2-3 qualified referrals per 10 completed jobs.', timeSaved: '2h/week', impact: '$2,100/month in referral-generated revenue' }
    ],
    tools: ['n8n', 'Twilio', 'Airtable', 'Google Calendar'],
    stats: { timeSaved: '16h/week', revenueImpact: '$3,800/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can the scheduling system handle multi-day jobs that span multiple crews?', a: 'Yes — the scheduling workflow supports multi-phase jobs with different crew assignments per phase, material delivery coordination at each phase, and customer updates at each stage milestone.' },
      { q: 'How does the referral tracking link work?', a: 'Each customer receives a unique referral link. When a new customer books using that link, the referring customer is automatically notified and their discount is applied to their next job invoice.' },
      { q: 'Can we track paint colors used for each room in case the client needs touch-ups later?', a: 'Yes — the color database stores brand, product name, color code, finish, and room for every job. When a past client calls for touch-ups, you retrieve their complete color history in seconds.' }
    ]
  },
  {
    slug: 'tile-contractor',
    name: 'Tile Contractor',
    category: 'Home Services',
    tagline: 'Tile contractors lose jobs to faster competitors — automate your response and win more bids before competitors call back.',
    description: 'Tile installation is a high-consideration purchase where customers typically get 3-5 quotes. The contractor who responds fastest and follows up most consistently wins disproportionately. Automation puts tile contractors in front of every lead first and follows up on every estimate without manual effort.',
    painPoints: [
      'Customers request multiple quotes simultaneously — slow response means the job is already gone',
      'Material quantity calculations done manually lead to ordering errors and costly project delays',
      'Progress photos for client approval sent inconsistently — causes communication breakdowns mid-project',
      'No systematic process for collecting testimonials despite high-quality work and satisfied clients'
    ],
    workflows: [
      { name: 'Instant Lead Response', description: 'Web form or missed call → immediate SMS within 2 minutes acknowledging inquiry → project type classified → quote request form sent for client to submit measurements and photos → estimator notified with all details pre-filled.', timeSaved: '4h/week', impact: 'First responder advantage on 90% of leads' },
      { name: 'Material Calculator & Order Automation', description: 'Client submits room dimensions → n8n calculates tile quantity with 10% waste factor → generates material list with product codes → sends order to supplier → confirms delivery date → updates project timeline automatically.', timeSaved: '5h/week', impact: 'Eliminate material ordering errors' },
      { name: 'Project Progress Updates', description: 'At defined project milestones → technician submits photo form → n8n sends progress update to client with photos, completion percentage, and next steps. Client approval required before proceeding to next phase.', timeSaved: '3h/week', impact: 'Zero mid-project disputes' },
      { name: 'Testimonial & Portfolio Collection', description: '1 week after project completion → client receives satisfaction survey with photo submission option → approved photos added to portfolio database → Google review request sent → 5-star reviewers asked for referral.', timeSaved: '2h/week', impact: '28 new portfolio photos and reviews per quarter' }
    ],
    tools: ['n8n', 'Twilio', 'Jotform', 'Google Sheets'],
    stats: { timeSaved: '14h/week', revenueImpact: '$3,200/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can the material calculator handle different tile sizes and patterns?', a: 'Yes — the calculator supports standard grid, herringbone, diagonal, and custom patterns, adjusting waste percentages accordingly for each layout type.' },
      { q: 'How does the client approval system work for mid-project decisions?', a: 'When a decision point is reached, the client receives an SMS and email with photos and options. Their response is logged, the choice is recorded in the project file, and the crew is notified automatically.' },
      { q: 'What if a client requests changes to the tile selection after ordering?', a: 'The change order workflow captures the new selection, calculates any cost difference, generates a change order document for client signature, and alerts the supplier to modify the order if it has not yet shipped.' }
    ]
  },
  {
    slug: 'carpenter',
    name: 'Carpenter',
    category: 'Home Services',
    tagline: 'Custom carpentry businesses grow on referrals — automate the follow-up and review systems that make referrals happen consistently.',
    description: 'Custom carpenters typically have strong word-of-mouth but no systematic process to amplify it. Automation builds a referral engine on top of completed projects, follows up on every estimate, and manages project timelines and client communications without pulling the carpenter away from the bench.',
    painPoints: [
      'Custom project scoping requires multiple back-and-forth calls that could be handled by a structured intake form',
      'Estimates for custom work take hours to prepare and clients frequently go silent after receiving them',
      'Project milestone updates communicated inconsistently — clients feel uninformed during long builds',
      'Referral potential not captured — satisfied clients rarely asked for referrals or reviews systematically'
    ],
    workflows: [
      { name: 'Custom Project Intake', description: 'Client submits detailed project brief via structured form including dimensions, wood preferences, style references, and photos → Claude AI generates a project summary and preliminary scope → sent to carpenter for review before first call. Saves 45 minutes of discovery time per inquiry.', timeSaved: '5h/week', impact: 'Cut pre-quote time by 60%' },
      { name: 'Estimate Follow-Up', description: 'Custom estimate sent → 3-day follow-up asking if client has questions about the scope → 7-day follow-up with material availability note → 14-day final follow-up. Recovers 29% of estimates that would otherwise go cold.', timeSaved: '4h/week', impact: '29% cold estimate recovery' },
      { name: 'Build Progress Communications', description: 'At each project milestone (wood selection confirmed, construction started, finishing applied, installation scheduled) → client receives update SMS with photos and timeline. Keeps client engaged and reduces inbound status calls by 80%.', timeSaved: '3h/week', impact: '80% reduction in client status calls' },
      { name: 'Post-Project Referral Engine', description: '2 weeks after delivery → satisfaction check → happy clients receive referral request with a referral code for $200 off for their referred contact → tracking system logs referral source for every new inquiry.', timeSaved: '2h/week', impact: '2-4 referral jobs per month from existing clients' }
    ],
    tools: ['n8n', 'Claude AI', 'Twilio', 'Airtable'],
    stats: { timeSaved: '14h/week', revenueImpact: '$4,500/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'How does the intake form handle clients who are not sure what they want?', a: 'The form includes inspiration photo upload and style preference options that help clarify the brief even for clients with vague ideas. Claude AI summarizes what can be determined and flags what needs clarification in the first call.' },
      { q: 'Can the workflow handle both residential and commercial carpentry projects?', a: 'Yes — the intake form separates project type at the first question, routing residential to one workflow and commercial to another with different scoping questions, timelines, and pricing structures.' },
      { q: 'How long does it take to build the referral tracking system?', a: 'The referral system is part of the standard PURIST deployment — set up within the same 7-day window as the rest of the automation stack.' }
    ]
  },
  {
    slug: 'locksmith',
    name: 'Locksmith',
    category: 'Home Services',
    tagline: 'Locksmiths win on response speed — automate your dispatch and capture every emergency call before the customer tries someone else.',
    description: 'Locksmith businesses are almost entirely dependent on being the fastest responder to emergency calls. A customer locked out of their home or car will call the first available locksmith — the business with automated response and dispatch wins every time. Automation also builds the commercial locksmith recurring revenue base through systematic follow-up.',
    painPoints: [
      'Emergency calls require instant response — every minute of delay loses the job to a faster competitor',
      'Pricing transparency is a major concern — automated upfront pricing communication reduces on-site disputes',
      'Commercial clients need annual lock rekeying and security audits — no follow-up system in place',
      'Fake locksmith competitors dominate Google ads — authentic reviews are critical for visibility'
    ],
    workflows: [
      { name: 'Emergency Dispatch Automation', description: 'Call or web form → job type classified (lockout, rekey, installation) → nearest available technician identified by GPS → customer receives technician name, photo, ETA, and price range within 90 seconds → technician receives job details and navigation link.', timeSaved: '6h/week', impact: 'Average dispatch time under 90 seconds' },
      { name: 'Upfront Pricing Communication', description: 'After job type identified → standardized price range SMS sent to customer before technician arrives → eliminates pricing surprise on arrival → customer confirmation required before dispatch confirmed. Reduces on-site disputes by 85%.', timeSaved: '2h/week', impact: '85% reduction in pricing disputes' },
      { name: 'Commercial Client Annual Outreach', description: 'Commercial client database → 11 months after last service → automated outreach for annual security audit and rekeying → appointment scheduling link included → proposal generated automatically based on property type and prior service history.', timeSaved: '4h/week', impact: '$2,400/month in recurring commercial revenue' },
      { name: 'Review Generation After Every Job', description: '2 hours after job completion → personalized SMS to customer → direct Google review link → 5-star reviewers asked for referral → reviews monitored and owner alerted to any negative review within 10 minutes for immediate response.', timeSaved: '2h/week', impact: '4.9 star average maintained across 300+ reviews' }
    ],
    tools: ['n8n', 'Twilio', 'Google Sheets', 'Slack'],
    stats: { timeSaved: '14h/week', revenueImpact: '$3,600/month', deploymentDays: 5, roiMonths: 1 },
    faq: [
      { q: 'How does the GPS-based dispatch work if I have multiple technicians?', a: 'The workflow checks each technician\'s last known location (via their phone GPS check-in) and current job status, then assigns the closest available technician. Technicians update their status via a simple mobile form.' },
      { q: 'Can the system handle automotive locksmith jobs differently from residential?', a: 'Yes — automotive jobs have different pricing, different required information (make, model, year, VIN), and different technician skill requirements. The intake form routes them to the appropriate technician pool automatically.' },
      { q: 'What if a technician cannot make the quoted ETA due to traffic?', a: 'When a technician updates their status in the system with a delay, the workflow automatically sends the customer an updated ETA with an apology message and a small discount code for the inconvenience.' }
    ]
  },
  {
    slug: 'landscaper',
    name: 'Landscaper',
    category: 'Home Services',
    tagline: 'Landscaping businesses that automate recurring client management grow 60% faster — without adding office staff.',
    description: 'Landscaping companies have high recurring revenue potential from weekly and monthly maintenance contracts but typically manage these manually through spreadsheets and phone calls. Automation handles scheduling, invoicing, seasonal service upsells, and client communication — turning a chaotic manual operation into a systematic business.',
    painPoints: [
      'Weekly maintenance scheduling managed in spreadsheets — weather changes cause cascading rescheduling chaos',
      'Seasonal service upsells (fall cleanup, spring mulching, irrigation winterization) pitched inconsistently or forgotten',
      'Invoice collection from maintenance clients takes 6-8 hours per month of manual follow-up',
      'New property quotes require multiple site visits and manual measurements before pricing is possible'
    ],
    workflows: [
      { name: 'Maintenance Schedule & Weather Management', description: 'Weekly maintenance routes generated automatically from client database → weather API monitored → if rain forecast → affected clients receive rescheduling SMS with new time slot → crews notified of updated route → no manual intervention required.', timeSaved: '8h/week', impact: 'Zero weather-related scheduling calls' },
      { name: 'Seasonal Upsell Campaigns', description: 'Calendar-triggered outreach to all active maintenance clients: March (spring cleanup), May (mulching), October (fall cleanup), November (irrigation winterization) → personalized quote based on property size → booking link included → 41% conversion rate.', timeSaved: '4h/week', impact: '$3,200/month in seasonal service revenue' },
      { name: 'Automated Invoice & Payment Collection', description: 'Monthly maintenance invoice generated automatically from service log → sent via email and SMS on 1st of month → payment reminder on day 8 if unpaid → second reminder day 15 → escalation to owner day 21. Average collection time reduced from 22 days to 6 days.', timeSaved: '6h/week', impact: 'DSO reduced from 22 to 6 days' },
      { name: 'New Property Quote System', description: 'Client submits address and service requirements → n8n pulls property square footage from public records API → generates preliminary quote range → sent to client with booking link for site visit → site visit confirmed and added to calendar automatically.', timeSaved: '3h/week', impact: '50% of quotes converted without site visit' }
    ],
    tools: ['n8n', 'Twilio', 'QuickBooks', 'Google Calendar'],
    stats: { timeSaved: '21h/week', revenueImpact: '$5,800/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'How does the weather monitoring system work with our scheduling?', a: 'The workflow checks a weather API for your service area daily. When precipitation above your threshold is forecast for a scheduled service day, it automatically initiates rescheduling for all affected clients and rebuilds the crew route.' },
      { q: 'Can the invoice system handle clients on different billing cycles?', a: 'Yes — weekly, bi-weekly, and monthly billing cycles are all supported. Each client profile stores their billing cycle preference, and invoices are generated and sent on the correct schedule for each.' },
      { q: 'Does the property size lookup work for all US addresses?', a: 'The system uses county assessor data which covers approximately 94% of US residential addresses. For properties without data, the system flags them for manual measurement during the site visit.' }
    ]
  },
  {
    slug: 'pool-service',
    name: 'Pool Service',
    category: 'Home Services',
    tagline: 'Pool service companies with automated maintenance routes and chemical tracking serve 35% more clients with the same crew.',
    description: 'Pool service businesses run on tight weekly routes where efficiency determines profitability. Manual route management, chemical log tracking, and customer communication consume hours that should be spent servicing pools. Automation optimizes routes, automates chemical reports, and manages repair upsell follow-up systematically.',
    painPoints: [
      'Weekly routes planned manually — inefficient sequencing wastes 2-3 hours of drive time per day',
      'Chemical readings and service logs recorded on paper — data lost and not shared with clients',
      'Repair recommendations made verbally on-site — 60% forgotten before client decides to approve',
      'Seasonal opening and closing service not systematically offered to existing maintenance clients'
    ],
    workflows: [
      { name: 'Optimized Route Generation', description: 'Weekly client list → n8n calculates geographically optimized route → accounts for pool size and service duration per client → generates turn-by-turn schedule for each technician → updates automatically when clients add or cancel.', timeSaved: '8h/week', impact: '35% more pools serviced per day' },
      { name: 'Digital Chemical Log & Client Reports', description: 'Technician submits chemical readings via mobile form after each service → n8n generates service report with readings, chemicals added, and next visit date → automatically emailed to client within 30 minutes of service completion.', timeSaved: '4h/week', impact: '94% client satisfaction improvement' },
      { name: 'Repair Estimate Follow-Up', description: 'Repair recommendation submitted by technician → written estimate generated and sent to client within 2 hours → follow-up sequence: 2 days, 5 days, 10 days → repair approved → automatically scheduled into next available slot.', timeSaved: '3h/week', impact: '52% repair estimate conversion rate' },
      { name: 'Seasonal Service Campaigns', description: 'March → pool opening outreach to all clients in cold climates. October → closing service outreach. Personalized by pool type and prior service history. Includes online booking link. 78% of clients book seasonal services when proactively contacted.', timeSaved: '2h/week', impact: '$4,100/month in seasonal service revenue' }
    ],
    tools: ['n8n', 'Twilio', 'Jotform', 'Google Sheets'],
    stats: { timeSaved: '17h/week', revenueImpact: '$4,800/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'How does the route optimization handle last-minute cancellations or additions?', a: 'When a cancellation or addition is submitted, the route recalculates automatically and sends updated schedules to the affected technicians within minutes. No dispatcher needed.' },
      { q: 'Can clients access their chemical history through a portal?', a: 'The service reports are cumulative — clients receive each report via email and can see their full service history. A client portal can be added as an optional upgrade.' },
      { q: 'Does the system handle both residential and commercial pool accounts differently?', a: 'Yes — commercial accounts have different chemical standards, compliance reporting requirements, and billing structures. The workflow applies the appropriate template and frequency for each account type.' }
    ]
  },
  {
    slug: 'house-cleaner',
    name: 'House Cleaner',
    category: 'Home Services',
    tagline: 'House cleaning businesses that automate booking and review collection grow 3x faster through Google Maps visibility.',
    description: 'Residential cleaning companies live and die by Google Maps rankings, which are driven primarily by review volume and recency. Automation systematically collects reviews after every clean, manages recurring booking schedules, and handles the client communications that consume hours of administrative time each week.',
    painPoints: [
      'Recurring booking management in group texts and spreadsheets causes double-bookings and missed appointments',
      'Google review collection inconsistent — some cleaners ask, most forget — resulting in slow rating growth',
      'Client key and access code management is a security and operational risk when stored in personal phones',
      'Last-minute cancellations leave cleaning slots empty with no automated system to fill them'
    ],
    workflows: [
      { name: 'Recurring Booking Management', description: 'Client database with service frequency → automated appointment reminders 48h before each visit → easy reschedule link → cleaner assigned and notified → access instructions sent automatically on morning of service. Zero booking confusion.', timeSaved: '6h/week', impact: '98% appointment confirmation rate' },
      { name: 'Post-Clean Review Sequence', description: '2 hours after cleaning marked complete → satisfaction SMS to client → 5-star experience → direct Google review link sent immediately → below 5-star → owner notified for personal follow-up before any public review. Generates 4-6 new reviews per week.', timeSaved: '2h/week', impact: '4.9 star average with 200+ reviews' },
      { name: 'Cancellation Slot Filler', description: 'Cancellation received → waiting list clients in same area notified with available slot and incentive offer → first to respond gets the booking → cleaner schedule updated → confirmation sent to new client. Fills 70% of cancelled slots within 2 hours.', timeSaved: '3h/week', impact: '70% cancellation slot recovery rate' },
      { name: 'Secure Access Management', description: 'Client onboarding → access information stored encrypted in Airtable → retrieved automatically on day of service and sent to assigned cleaner only → deleted from message after 24 hours. Eliminates personal phone storage of client keys and codes.', timeSaved: '2h/week', impact: 'Complete access security compliance' }
    ],
    tools: ['n8n', 'Twilio', 'Airtable', 'Google Calendar'],
    stats: { timeSaved: '13h/week', revenueImpact: '$2,800/month', deploymentDays: 5, roiMonths: 1 },
    faq: [
      { q: 'How does the system handle clients with special cleaning instructions?', a: 'Special instructions are stored in the client profile and automatically included in the cleaner\'s briefing SMS sent on the morning of each service. Instructions are version-controlled so changes apply from the next visit forward.' },
      { q: 'Can the booking system handle both one-time and recurring cleans?', a: 'Yes — one-time cleans follow a single booking and review workflow. Recurring cleans are added to a repeating schedule with automatic reminders and confirmations at each occurrence.' },
      { q: 'What happens if a cleaner calls in sick and a booking needs to be covered?', a: 'The coverage workflow alerts available cleaners for the affected time slot, confirms the first to respond, notifies the client of the cleaner change, and updates the schedule automatically.' }
    ]
  },
  {
    slug: 'moving-company',
    name: 'Moving Company',
    category: 'Home Services',
    tagline: 'Moving companies that automate quotes and logistics coordination handle 40% more moves with the same crew size.',
    description: 'Moving companies face a booking window problem — most customers book 2-4 weeks out but decide within 24 hours of requesting quotes. The company that gets a quote to the customer first and follows up consistently wins the job. Automation delivers instant quotes, manages crew logistics, and generates reviews that drive the next wave of bookings.',
    painPoints: [
      'Quotes require in-home or virtual surveys that delay the customer decision — competitors with instant estimates win',
      'Crew scheduling across multiple same-day moves requires constant manual coordination between dispatcher and drivers',
      'Damage claims and inventory tracking managed on paper — creates liability exposure and disputes',
      'No systematic process for collecting the reviews that drive Google Maps visibility in a competitive market'
    ],
    workflows: [
      { name: 'Instant Quote System', description: 'Customer submits move details (origin, destination, home size, floor, elevator access, special items) → n8n generates preliminary quote range within 2 minutes → firm quote offered after virtual video survey → digital acceptance with deposit link. Closes 44% of leads without a site visit.', timeSaved: '8h/week', impact: '44% of quotes closed without site visit' },
      { name: 'Crew & Truck Scheduling', description: 'Move confirmed → crew assigned based on availability and job size → truck allocated → crew briefed with job details, address, and special instructions → day-before confirmation sent to crew and customer → morning-of ETA sent to customer automatically.', timeSaved: '6h/week', impact: 'Zero scheduling conflicts across simultaneous moves' },
      { name: 'Digital Inventory & Condition Report', description: 'Before loading → crew submits item condition photos via mobile form → inventory list generated automatically → customer signs digitally → copy stored in job file. Resolves 95% of damage claim disputes before they escalate.', timeSaved: '4h/week', impact: '95% reduction in damage claim disputes' },
      { name: 'Post-Move Review & Referral', description: '24 hours after move completion → satisfaction check → positive response → Google review link and referral offer ($75 credit for referred move that books) → negative response → owner personal outreach within 1 hour. Generates 3-5 reviews per week.', timeSaved: '2h/week', impact: '$3,200/month in referral-driven revenue' }
    ],
    tools: ['n8n', 'Claude AI', 'Twilio', 'Jotform'],
    stats: { timeSaved: '20h/week', revenueImpact: '$5,600/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'How does the virtual survey work for the instant quote system?', a: 'After the preliminary range is sent, the customer books a 10-minute video call via an automated scheduling link. The estimator does a walkthrough via phone camera and submits the inventory into the quote system for a firm price.' },
      { q: 'Can the inventory system handle specialty items like pianos, artwork, and antiques?', a: 'Yes — the inventory form has specialty item categories with condition photo requirements and value declarations. These automatically trigger the appropriate insurance and handling protocols in the crew briefing.' },
      { q: 'Does the system work for both local and long-distance moves?', a: 'Yes — the quote system has separate workflows for local (hourly) and long-distance (flat rate) moves, with different pricing logic, deposit requirements, and logistics coordination for each.' }
    ]
  },
  {
    slug: 'appliance-repair-technician',
    name: 'Appliance Repair Technician',
    category: 'Home Services',
    tagline: 'Appliance repair businesses that automate parts ordering and appointment reminders cut no-show rates by 60% and complete more jobs per day.',
    description: 'Appliance repair profitability depends on technician utilization — every no-show appointment and every parts delay costs real money. Automation reduces no-show rates through systematic reminders, speeds up parts ordering through automated supplier workflows, and builds recurring revenue through warranty and maintenance follow-up.',
    painPoints: [
      'No-show rate for appliance repair appointments averages 22% — each empty slot is $150-300 in lost revenue',
      'Parts ordering done manually per job — delays of 2-5 days when suppliers are not checked proactively',
      'Diagnostic fees and repair estimates communicated verbally — disputes arise when final bill differs',
      'Extended warranty and maintenance plan upsells never systematically offered after successful repairs'
    ],
    workflows: [
      { name: 'Appointment Reminder Sequence', description: 'Appointment booked → confirmation SMS immediately → 48h reminder with technician name and arrival window → 2h before → final reminder with exact ETA. No-show rate drops from 22% to under 8%.', timeSaved: '4h/week', impact: 'No-show rate reduced from 22% to 8%' },
      { name: 'Parts Pre-Order Automation', description: 'Diagnostic submitted by technician → likely parts identified by appliance make, model, and fault code → automatic parts availability check with primary and backup suppliers → order placed for parts with highest likelihood of need → customer notified of parts ETA.', timeSaved: '5h/week', impact: 'Same-day repair rate increased 40%' },
      { name: 'Written Estimate & Authorization', description: 'After diagnostic → written repair estimate generated with parts and labor breakdown → sent to customer for digital approval → no work proceeds without written authorization → approved estimates trigger automatic parts confirmation and scheduling.', timeSaved: '3h/week', impact: 'Eliminate verbal estimate disputes' },
      { name: 'Warranty & Maintenance Upsell', description: '30 days after successful repair → automated outreach offering extended warranty or annual maintenance plan → personalized to appliance type and repair performed → 19% conversion rate among contacted customers.', timeSaved: '2h/week', impact: '$1,400/month in warranty plan revenue' }
    ],
    tools: ['n8n', 'Twilio', 'Google Sheets', 'QuickBooks'],
    stats: { timeSaved: '14h/week', revenueImpact: '$2,900/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'How does the parts identification system know which parts to pre-order?', a: 'The system uses a fault code database mapped to common failure parts by appliance make and model. It orders the top 1-2 most likely parts based on the diagnostic, with an authorization amount cap that you set.' },
      { q: 'What happens if the pre-ordered parts are not the ones needed after the full diagnostic?', a: 'The workflow tracks all pre-ordered parts and their return windows. If a part is not used, a return request is generated automatically and the supplier is notified within the return period.' },
      { q: 'Can the system handle both in-warranty and out-of-warranty repairs differently?', a: 'Yes — warranty repairs trigger a manufacturer claim workflow with documentation requirements. Out-of-warranty repairs follow the standard estimate and authorization workflow.' }
    ]
  },
  {
    slug: 'kitchen-installer',
    name: 'Kitchen Installer',
    category: 'Home Services',
    tagline: 'Kitchen installation businesses that automate project communication and supplier coordination deliver projects 30% faster with fewer callbacks.',
    description: 'Kitchen installation projects involve complex coordination between multiple suppliers, subcontractors, and the client — all managed manually in most businesses. Automation manages the project timeline, triggers supplier orders at the right time, keeps clients informed, and captures the high-value referrals that kitchen jobs generate.',
    painPoints: [
      'Appliance and cabinet delivery scheduling requires constant manual follow-up with multiple suppliers',
      'Clients have no visibility into project timeline — constant status calls interrupt installation work',
      'Subcontractor coordination (plumbing, electrical) managed via group text — critical information lost',
      'Satisfied kitchen clients rarely asked for referrals despite being the highest-ROI referral source in home services'
    ],
    workflows: [
      { name: 'Supplier Delivery Coordination', description: 'Project start date set → n8n generates delivery schedule for cabinets, appliances, countertops, and fixtures → supplier orders placed with correct lead times → delivery confirmations tracked → customer notified of each delivery window automatically.', timeSaved: '7h/week', impact: 'Zero delivery date surprises or conflicts' },
      { name: 'Client Project Dashboard Updates', description: 'At each installation milestone (demo complete, cabinets in, counters templated, counters installed, appliances in, punch list complete) → client receives progress SMS with photo and percentage complete → reduces inbound client calls by 85%.', timeSaved: '4h/week', impact: '85% fewer client status calls' },
      { name: 'Subcontractor Coordination', description: 'When plumbing or electrical work required → automated work order sent to subcontractor with project address, scope, and access instructions → confirmation required → reminder 24h before → post-work quality check submitted via mobile form.', timeSaved: '4h/week', impact: 'Zero subcontractor coordination gaps' },
      { name: 'Referral Capture at Project Completion', description: '2 weeks after punch list signed → satisfaction survey → happy clients receive referral package: unique tracking link, $500 referral reward, social share option with project photo. Kitchen projects generate the highest referral conversion in home services.', timeSaved: '2h/week', impact: '$6,800/month in referral project revenue' }
    ],
    tools: ['n8n', 'Claude AI', 'Twilio', 'Airtable'],
    stats: { timeSaved: '17h/week', revenueImpact: '$7,200/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'How does the system handle supplier delays that push the project timeline?', a: 'When a delivery is delayed, the workflow automatically recalculates the project timeline, notifies the client with the updated schedule, and adjusts subcontractor bookings accordingly.' },
      { q: 'Can the system manage projects with custom cabinet makers who have longer lead times?', a: 'Yes — each supplier in the system has a configurable lead time. Custom cabinet orders trigger their order workflow earlier in the project timeline based on the lead time you set for that supplier.' },
      { q: 'What if the client requests design changes mid-project?', a: 'Change requests are captured via a structured form, generate a change order with cost and timeline implications, require client digital signature, and trigger any necessary supplier order modifications.' }
    ]
  },
  {
    slug: 'flooring-installer',
    name: 'Flooring Installer',
    category: 'Home Services',
    tagline: 'Flooring contractors who automate estimates and material ordering close more jobs faster and eliminate costly material mistakes.',
    description: 'Flooring installation businesses handle multiple simultaneous projects with tight material ordering windows — order too early and material sits in the way, order too late and the project stalls. Automation manages the ordering timeline, keeps clients informed, and systematically captures the referrals that high-satisfaction flooring jobs generate.',
    painPoints: [
      'Material ordering timed manually — frequent errors in quantity and delivery timing cause project delays',
      'Subfloor condition discovered at installation requires rapid client communication and scope change approval',
      'Estimate follow-up inconsistent — sales cycle lost when clients take time to decide and nobody follows up',
      'Installation scheduling across multiple simultaneous projects managed in personal calendars — conflicts arise'
    ],
    workflows: [
      { name: 'Material Order Automation', description: 'Job confirmed → installation date set → n8n calculates material order date based on supplier lead time → automatic order placed with correct quantities plus 8% overage → delivery confirmed for day before installation → installer notified.', timeSaved: '5h/week', impact: 'Eliminate material ordering errors and delays' },
      { name: 'Subfloor Assessment & Change Order', description: 'Day of installation → installer submits subfloor condition report via mobile form → if remediation needed → cost estimate generated automatically → change order sent to client for digital approval before work proceeds → scope updated in project file.', timeSaved: '3h/week', impact: 'Zero disputed change orders' },
      { name: 'Estimate Follow-Up Sequence', description: 'Estimate sent → 3-day follow-up with flooring trend article relevant to their selection → 7-day follow-up with current material availability note → 14-day final follow-up. Converts 31% of otherwise-lost estimates.', timeSaved: '4h/week', impact: '31% estimate recovery rate' },
      { name: 'Post-Installation Care Instructions & Review', description: '48h after completion → care instructions for the specific flooring type installed sent to client → 1 week → Google review request → 3 months → check-in on how the floor is holding up with accessory product recommendation.', timeSaved: '2h/week', impact: '4.8 star average with growing review base' }
    ],
    tools: ['n8n', 'Twilio', 'Jotform', 'Google Calendar'],
    stats: { timeSaved: '14h/week', revenueImpact: '$3,400/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'How does the system handle different flooring types with different care instructions?', a: 'Each flooring type has its own care instruction template in the system. When a job is logged with the flooring type installed, the correct care guide is automatically selected and sent to the client.' },
      { q: 'Can the material order system handle multiple suppliers for different flooring types?', a: 'Yes — each supplier is configured in the system with their lead times, ordering methods, and product catalog. The workflow routes the order to the correct supplier based on the flooring type in the job.' },
      { q: 'What if a client wants to change their flooring selection after the order is placed?', a: 'The change order workflow captures the new selection, checks return policy for the originally ordered material, calculates any cost difference, generates a change order for client approval, and initiates the new order and return simultaneously.' }
    ]
  },
  {
    slug: 'chimney-sweep',
    name: 'Chimney Sweep',
    category: 'Home Services',
    tagline: 'Chimney sweeps that automate annual inspection reminders never lose a repeat customer again — and triple their review count in 90 days.',
    description: 'Chimney sweep businesses have the most predictable recurring revenue opportunity in home services — every chimney needs annual inspection and cleaning. Yet most sweep businesses rely on customers to remember and call back, losing 60% of potential repeat business. Automation captures this recurring revenue automatically.',
    painPoints: [
      '60% of satisfied customers never call back for their annual inspection because no one reminds them',
      'Fall booking surge creates a 6-week backlog managed manually — many customers book competitors out of frustration',
      'Inspection reports delivered verbally on-site — homeowners forget recommendations and safety concerns are not documented',
      'Insurance and real estate inspection requests require formal reports that take hours to prepare manually'
    ],
    workflows: [
      { name: 'Annual Inspection Reminder Campaign', description: 'Every completed inspection → 11-month anniversary → automated reminder SMS with "your annual chimney inspection is due" → direct booking link → 3-week follow-up if not booked. Converts 74% of past customers into annual repeat clients.', timeSaved: '3h/week', impact: '74% repeat customer conversion rate' },
      { name: 'Fall Surge Booking Management', description: 'August 1st → pre-season outreach to all past clients → priority booking window offered before public availability → schedule fills in order of inquiry → waitlist managed automatically → cancellation slots filled from waitlist within 2 hours.', timeSaved: '6h/week', impact: 'Fully booked 6 weeks in advance every fall' },
      { name: 'Digital Inspection Report Generation', description: 'Sweep submits inspection checklist via mobile form with photo uploads → n8n generates professional PDF report with findings, photos, and recommendations → emailed to homeowner within 1 hour of service → copy stored in client file for future reference.', timeSaved: '4h/week', impact: 'Professional reports for every inspection' },
      { name: 'Google Review Generation', description: '24 hours after service → satisfaction SMS → positive response → Google review link → review received → owner notified → client added to annual reminder sequence for next year automatically.', timeSaved: '1h/week', impact: '4.9 star average with 150+ reviews' }
    ],
    tools: ['n8n', 'Twilio', 'Jotform', 'Google Sheets'],
    stats: { timeSaved: '14h/week', revenueImpact: '$3,100/month', deploymentDays: 5, roiMonths: 1 },
    faq: [
      { q: 'How does the system handle clients who have moved since their last inspection?', a: 'The annual reminder sequence includes a "has your address changed?" option. If confirmed, the address is updated in the client profile and the new address is used for all future communications and scheduling.' },
      { q: 'Can the inspection report include NFPA 211 standard compliance language?', a: 'Yes — the report template includes the relevant NFPA 211 condition level classifications (Level I, II, III) and can be customized to include your certification credentials and standard compliance language.' },
      { q: 'What if a client needs an urgent inspection for a real estate transaction?', a: 'Rush inspection requests are flagged in the system and routed to your next available slot. A formal report with your certification credentials is generated within 2 hours of the inspection completion.' }
    ]
  },
  {
    slug: 'security-system-installer',
    name: 'Security System Installer',
    category: 'Home Services',
    tagline: 'Security system installers that automate monitoring contract renewals and referrals build the recurring revenue base that makes the business sellable.',
    description: 'Security system installation businesses have two revenue streams: one-time installation and recurring monitoring contracts. Most businesses focus on installation and neglect the compounding value of monitoring renewals and systematic referral programs. Automation manages both without adding administrative overhead.',
    painPoints: [
      'Monitoring contract renewals not systematically managed — 30% lapse due to no renewal outreach',
      'Installation scheduling requires coordinating technicians, equipment delivery, and customer availability simultaneously',
      'Post-installation support calls consume technician time that should be spent on billable installations',
      'Referral potential from satisfied homeowners and commercial clients never systematically captured'
    ],
    workflows: [
      { name: 'Monitoring Contract Renewal Management', description: '60 days before monitoring contract expiration → renewal offer sent with multi-year discount option → 30 days → second outreach with upgrade option → 14 days → owner notified for personal outreach on high-value contracts → renewal confirmed → billing updated automatically.', timeSaved: '4h/week', impact: '94% monitoring contract renewal rate' },
      { name: 'Installation Scheduling Coordination', description: 'Job booked → equipment pre-ordered from supplier → installation date confirmed → technician assigned → customer receives pre-installation checklist → equipment delivery scheduled day before → installation confirmed morning-of with ETA.', timeSaved: '5h/week', impact: 'Zero installation day surprises' },
      { name: 'Post-Installation Support Deflection', description: 'After installation → customer receives detailed video tutorial links for their specific system → FAQ document for common questions → if support request submitted → Claude AI triage → 80% resolved without technician dispatch → escalated cases scheduled automatically.', timeSaved: '4h/week', impact: '80% support call deflection rate' },
      { name: 'Referral Program for Residential & Commercial', description: '60 days after installation → referral request with $150 credit for residential referrals and $300 for commercial → unique tracking links → successful referral triggers credit automatically applied to next monitoring invoice.', timeSaved: '2h/week', impact: '$2,800/month in referral-generated installations' }
    ],
    tools: ['n8n', 'Claude AI', 'Twilio', 'Stripe'],
    stats: { timeSaved: '15h/week', revenueImpact: '$4,100/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can the monitoring contract system handle different monitoring levels and pricing tiers?', a: 'Yes — each contract type has its own renewal workflow with the appropriate pricing, term options, and upgrade paths. The system applies the correct renewal offer based on the client\'s current plan.' },
      { q: 'How does the support deflection system know when to escalate to a technician?', a: 'Claude AI classifies each support request by complexity. Hardware failures, power issues, and anything requiring on-site diagnosis are escalated immediately. Configuration questions, false alarm management, and user training are handled by the automated response system.' },
      { q: 'Does the system work with all major security monitoring platforms?', a: 'PURIST integrates with the major monitoring platforms via API where available. For platforms without APIs, the workflow uses email parsing to track contract and alarm status.' }
    ]
  },
  {
    slug: 'solar-panel-installer',
    name: 'Solar Panel Installer',
    category: 'Home Services',
    tagline: 'Solar installers that automate the permit and utility interconnection process close projects 6 weeks faster and double their installation capacity.',
    description: 'Solar installation businesses lose as much time to paperwork and permit coordination as they do to actual installation. The permitting, utility interconnection, and incentive application processes involve dozens of manual touchpoints that automation can handle systematically — freeing installers to run more projects simultaneously.',
    painPoints: [
      'Permit applications and utility interconnection requests require weeks of manual follow-up with multiple agencies',
      'Federal and state incentive applications missed or delayed due to manual tracking — clients lose thousands',
      'Lead-to-install cycle takes 3-6 months — most communication with the client during this period is manual and inconsistent',
      'Post-installation monitoring alerts not communicated to clients — underperforming systems damage satisfaction'
    ],
    workflows: [
      { name: 'Permit & Interconnection Tracking', description: 'Application submitted → n8n creates tracking record with all deadline dates → automated follow-up with relevant agencies at each deadline → client receives status updates at every milestone → permit approved → installation scheduled automatically.', timeSaved: '10h/week', impact: 'Project timeline reduced by 6 weeks on average' },
      { name: 'Incentive Application Management', description: 'After contract signed → federal ITC paperwork package generated for client → state and local incentive eligibility checked automatically → applications filed at correct project stage → deadlines tracked → client notified of each incentive received.', timeSaved: '6h/week', impact: '100% incentive capture rate' },
      { name: 'Long Sales Cycle Client Communication', description: 'From contract to installation → automated client updates every 2 weeks with project status, next steps, and estimated timeline → questions answered via Claude AI triage → complex issues escalated to project manager. Keeps clients informed without consuming staff time.', timeSaved: '5h/week', impact: '90% reduction in client status calls during permitting' },
      { name: 'Production Monitoring Alerts', description: 'System performance monitored via inverter API → if production drops below expected by 15% for 3 consecutive days → client notified with explanation and service scheduling link → technician dispatched if remote diagnosis insufficient.', timeSaved: '2h/week', impact: 'Proactive service before clients notice problems' }
    ],
    tools: ['n8n', 'Claude AI', 'Airtable', 'Twilio'],
    stats: { timeSaved: '23h/week', revenueImpact: '$9,200/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'How does the system track permit status with different local jurisdictions?', a: 'Each jurisdiction has a configured follow-up protocol based on their typical response times. The system sends follow-up requests at the appropriate intervals for each jurisdiction and escalates to a staff member when a deadline is approaching.' },
      { q: 'Can the incentive tracking handle both residential and commercial incentive programs?', a: 'Yes — residential and commercial incentive programs are tracked separately with their own application requirements, deadlines, and documentation checklists. The system applies the correct program set based on the project type.' },
      { q: 'Does the production monitoring integration work with all inverter brands?', a: 'The system integrates with Enphase, SolarEdge, Fronius, and SMA via their monitoring APIs. For other inverter brands, monitoring data can be imported via CSV on a scheduled basis.' }
    ]
  },
  {
    slug: 'pest-control-technician',
    name: 'Pest Control Technician',
    category: 'Home Services',
    tagline: 'Pest control businesses with automated recurring service management and review collection dominate local Google Maps results.',
    description: 'Pest control is one of the highest-recurring-revenue home service businesses — quarterly treatments mean every customer is worth 4x a single-service client. Automation manages the recurring service schedule, handles the seasonal pest outreach that drives new revenue, and builds the Google Maps visibility that drives inbound leads.',
    painPoints: [
      'Quarterly recurring service managed manually — customers frequently fall off schedule without automated reminders',
      'Seasonal pest events (termite season, mosquito season, rodent winter migration) not systematically marketed',
      'Treatment documentation and warranty records maintained on paper — retrieving history for disputes is impossible',
      'No systematic review collection despite high customer satisfaction and long-term relationships'
    ],
    workflows: [
      { name: 'Recurring Service Schedule Management', description: 'Recurring service contract → automated appointment reminders 1 week before each quarterly treatment → easy reschedule option → technician assigned and routed → treatment record created → next appointment scheduled automatically at completion.', timeSaved: '6h/week', impact: '96% recurring service retention rate' },
      { name: 'Seasonal Pest Campaign', description: 'Calendar-triggered campaigns by pest type: February (termite swarm season) → April (mosquito season) → October (rodent season) → personalized to client property type and prior treatment history → 38% of contacted clients book additional seasonal treatments.', timeSaved: '4h/week', impact: '$2,600/month in seasonal service revenue' },
      { name: 'Digital Treatment Records', description: 'After each treatment → technician submits chemical log, pest activity notes, and recommendations via mobile form → treatment report generated → emailed to client → stored in their profile → accessible for warranty claims or retreatment requests.', timeSaved: '3h/week', impact: 'Complete treatment history for every client' },
      { name: 'Review Generation', description: '24 hours after each treatment → satisfaction SMS → 5-star response → Google review link sent → review posted → client added to annual review cadence. Pest control businesses with 200+ reviews capture 70% of local search clicks.', timeSaved: '1h/week', impact: '#1 Google Maps ranking in service area' }
    ],
    tools: ['n8n', 'Twilio', 'Jotform', 'Google Sheets'],
    stats: { timeSaved: '14h/week', revenueImpact: '$3,800/month', deploymentDays: 5, roiMonths: 1 },
    faq: [
      { q: 'How does the treatment record system handle chemical compliance documentation?', a: 'The treatment form captures all required information including product EPA registration number, application rate, target pest, and technician license number. Reports are formatted for state compliance requirements.' },
      { q: 'Can the system handle both residential and commercial pest control accounts?', a: 'Yes — commercial accounts have different treatment frequencies, compliance documentation requirements, and billing structures. The workflow applies the correct template and schedule for each account type.' },
      { q: 'What if a client calls with a pest emergency between scheduled treatments?', a: 'Emergency service requests are classified by the intake system, an available technician is identified, and the client receives an ETA within 2 minutes. Emergency visits are logged and may trigger an early recurring treatment reset.' }
    ]
  },
  {
    slug: 'handyman',
    name: 'Handyman',
    category: 'Home Services',
    tagline: 'Handyman businesses that automate their booking and review systems earn 40% more per week without taking on more jobs.',
    description: 'Handyman businesses operate on tight margins where efficiency of scheduling and follow-up determines profitability. Most handymen lose 30% of potential revenue to uncaptured leads, unbooked estimates, and zero referral systems. Automation captures every lead, converts more estimates, and builds the review base that makes the phone ring without paying for ads.',
    painPoints: [
      'Inbound calls handled during jobs lead to missed inquiries — customers who reach voicemail book someone else',
      'Estimates communicated verbally on-site are forgotten by both parties — no written record or follow-up',
      'Scheduling managed in personal calendar without client reminders — no-show rate above industry average',
      'Referral network not systematically developed despite being the primary source of handyman business'
    ],
    workflows: [
      { name: 'Lead Capture & Auto-Response', description: 'Missed call or web inquiry → immediate SMS with service menu and booking link → client selects job type → preliminary pricing range sent → booking confirmed → added to calendar → confirmation and reminder sequence started.', timeSaved: '4h/week', impact: 'Capture 75% of previously missed leads' },
      { name: 'Written Estimate System', description: 'After walkthrough → handyman submits scope via mobile form → itemized estimate generated with parts and labor → sent to client with digital acceptance → follow-up sequence activated if not responded to within 48 hours.', timeSaved: '4h/week', impact: 'Estimate acceptance rate up 44%' },
      { name: 'Appointment Reminder & No-Show Prevention', description: 'Job booked → confirmation SMS → 48h reminder → morning-of confirmation request → if no response → owner alerted to call → no-show rate drops from 18% to under 6%.', timeSaved: '3h/week', impact: 'No-show rate reduced by 67%' },
      { name: 'Referral Network Builder', description: 'After completed job → satisfaction check → happy clients receive referral card SMS: "know anyone who needs a reliable handyman?" → unique link → $40 credit for referred jobs → 2-3 referred jobs generated per 10 completed jobs.', timeSaved: '1h/week', impact: '2-3 referral jobs per 10 completed' }
    ],
    tools: ['n8n', 'Twilio', 'Jotform', 'Google Calendar'],
    stats: { timeSaved: '12h/week', revenueImpact: '$2,400/month', deploymentDays: 5, roiMonths: 1 },
    faq: [
      { q: 'How does the pricing range system work without doing a site visit first?', a: 'The booking form includes job type selection with common handyman tasks. Each task category has a preliminary price range based on typical complexity and time. The client understands it is a range until the handyman sees the job.' },
      { q: 'Can the system handle multi-day jobs or jobs with material procurement?', a: 'Yes — multi-day jobs have a project workflow with daily check-ins sent to the client. Jobs requiring materials trigger a shopping list workflow that can be sent to a preferred supplier for pickup scheduling.' },
      { q: 'What if the job scope expands significantly once work begins?', a: 'The change order workflow lets the handyman submit the additional scope via mobile form, generates a change order for client approval, and updates the final invoice accordingly. All changes are documented.' }
    ]
  },
  {
    slug: 'garage-door-technician',
    name: 'Garage Door Technician',
    category: 'Home Services',
    tagline: 'Garage door companies automate emergency dispatch and maintenance reminders to capture 100% of urgent calls and build year-round revenue.',
    description: 'Garage door repair is highly time-sensitive — a stuck door blocks a car, disrupts a schedule, and needs fixing now. Automation ensures every emergency call is answered instantly with a dispatch response, while systematic maintenance reminders build recurring revenue from the 80% of customers who have no other reason to call until the door fails again.',
    painPoints: [
      'Emergency calls after hours and weekends handled by voicemail — customers book competitors within minutes',
      'Annual spring and fall maintenance visits not systematically offered — missed recurring revenue opportunity',
      'Parts inventory managed manually — technicians arrive on-site without the correct spring or panel for the job',
      'Commercial garage door clients have multiple doors with different service schedules — impossible to track manually'
    ],
    workflows: [
      { name: 'Emergency Response Dispatch', description: '24/7 emergency form or missed call → immediate SMS acknowledgment → job classified (spring, cable, panel, opener) → on-call technician dispatched → customer receives technician name and ETA → technician receives job details and navigation. Average response under 4 minutes.', timeSaved: '5h/week', impact: 'Capture 100% of emergency inquiries' },
      { name: 'Maintenance Reminder Campaign', description: 'Spring (March) and Fall (October) → outreach to all past clients for seasonal tune-up → appointment scheduling link → 29% book within 1 week of outreach → service completed → next reminder date set automatically.', timeSaved: '3h/week', impact: '$2,100/month in maintenance revenue' },
      { name: 'Parts Pre-Staging System', description: 'Job booked with door make/model → likely parts identified → availability check with suppliers → parts pre-staged for technician before dispatch → first-trip completion rate improved from 71% to 94%.', timeSaved: '4h/week', impact: 'First-trip fix rate improved from 71% to 94%' },
      { name: 'Commercial Account Management', description: 'Commercial client database → each door tracked separately with service history → maintenance schedule per door → automated service reminders per door unit → inspection report generated after each commercial visit.', timeSaved: '3h/week', impact: 'Full visibility across all commercial door assets' }
    ],
    tools: ['n8n', 'Twilio', 'Google Sheets', 'Jobber'],
    stats: { timeSaved: '15h/week', revenueImpact: '$3,400/month', deploymentDays: 5, roiMonths: 1 },
    faq: [
      { q: 'How does the emergency dispatch work on nights and weekends?', a: 'The workflow runs 24/7. After-hours calls trigger the on-call technician via SMS and phone call simultaneously. If not acknowledged within 5 minutes, a backup technician is alerted.' },
      { q: 'Can the system handle door models that require specialty parts with long lead times?', a: 'Yes — parts with lead times over 24 hours trigger a customer communication explaining the timeline, offering a temporary fix if available, and confirming the appointment for when parts arrive.' },
      { q: 'How does the commercial door tracking handle properties with 50+ doors?', a: 'Each door is a separate record with its own service history and maintenance schedule. The system generates weekly service lists for commercial accounts sorted by next service due date.' }
    ]
  },
  {
    slug: 'window-cleaner',
    name: 'Window Cleaner',
    category: 'Home Services',
    tagline: 'Window cleaning businesses with automated recurring booking and review systems generate 60% of their revenue from repeat clients without any marketing spend.',
    description: 'Window cleaning has one of the highest repeat purchase rates in home services — residential clients need windows cleaned 2-4 times per year, and commercial clients often weekly or monthly. Automation turns every satisfied customer into a recurring revenue stream with zero manual scheduling effort.',
    painPoints: [
      'Recurring residential clients managed in personal notebooks — visits missed when the cleaner is busy',
      'Commercial clients need invoices immediately after each service — manual invoicing delays payment by weeks',
      'Weather cancellations require rescheduling 20-30 clients simultaneously — manual process takes half a day',
      'New residential lead conversion requires quick quote turnaround — slow response loses to faster competitors'
    ],
    workflows: [
      { name: 'Recurring Client Schedule Management', description: 'Recurring client database with frequency preference → automatic appointment confirmations sent 1 week before → client confirms or reschedules → crew route generated → service completed → next appointment scheduled automatically → invoice sent within 30 minutes.', timeSaved: '6h/week', impact: '99% recurring appointment completion rate' },
      { name: 'Commercial Client Invoicing', description: 'Service completion submitted by crew → invoice generated with service date, property address, and line items → emailed to commercial client within 15 minutes of service → payment reminder sent on day 15 and 25 if unpaid → late fee applied automatically at day 30.', timeSaved: '4h/week', impact: 'Average payment time reduced from 28 to 9 days' },
      { name: 'Weather Rescheduling System', description: 'Rain forecast detected for service day → all affected clients receive rescheduling SMS with alternative dates → first-come first-served on available slots → crew route rebuilt automatically → no manual intervention required.', timeSaved: '5h/week', impact: 'Reschedule 30 clients in 10 minutes vs 3 hours manually' },
      { name: 'Instant Residential Quote', description: 'Prospect submits property address and window count via web form → preliminary quote generated based on home size and window count → sent within 3 minutes → follow-up sequence if not booked within 48 hours.', timeSaved: '3h/week', impact: 'Quote delivered in 3 minutes vs same-day callback' }
    ],
    tools: ['n8n', 'Twilio', 'QuickBooks', 'Google Calendar'],
    stats: { timeSaved: '18h/week', revenueImpact: '$3,200/month', deploymentDays: 5, roiMonths: 1 },
    faq: [
      { q: 'How does the weather monitoring system determine when to trigger rescheduling?', a: 'The workflow checks a weather API for your service area each morning. If precipitation above your threshold (configurable, typically 0.1 inches) is forecast for that day, rescheduling is triggered automatically.' },
      { q: 'Can the system handle both interior and exterior window cleaning with different pricing?', a: 'Yes — the quote form allows clients to select interior only, exterior only, or both, with pricing applied automatically for each option and any add-ons like screen cleaning or track cleaning.' },
      { q: 'How does the commercial invoicing handle clients with multiple properties?', a: 'Each property is tracked as a separate service location under the commercial client account. Invoices can be generated per property or consolidated into a single invoice for the entire account, depending on the client\'s preference.' }
    ]
  },
  {
    slug: 'irrigation-specialist',
    name: 'Irrigation Specialist',
    category: 'Home Services',
    tagline: 'Irrigation businesses that automate seasonal startup and winterization outreach fill their schedule 6 weeks in advance without a single cold call.',
    description: 'Irrigation businesses have two guaranteed revenue windows each year — spring startup and fall winterization — plus repair and service revenue in between. Automation captures both seasonal windows with systematic client outreach, manages the scheduling surge, and builds the recurring contract base that smooths revenue year-round.',
    painPoints: [
      'Spring startup season creates a booking surge that overwhelms manual scheduling — clients wait weeks and some hire competitors',
      'Winterization reminder calls made manually over several days — inefficient and some clients are missed entirely',
      'Repair call diagnostics require knowing the system configuration — manually maintained records are incomplete or lost',
      'Water audit and efficiency upgrade upsells never systematically offered to existing clients'
    ],
    workflows: [
      { name: 'Seasonal Outreach Campaigns', description: 'March 1st → spring startup outreach to all active clients with priority booking link → October 1st → winterization outreach → booking fills in calendar order → waitlist managed automatically → 82% of existing clients book within 3 weeks of outreach.', timeSaved: '8h/week', impact: 'Fully booked 6 weeks ahead each season' },
      { name: 'System Configuration Database', description: 'After each service visit → technician submits system map update with zone counts, head types, controller model, and valve locations → stored in client profile → retrieved automatically before each future visit → technician arrives prepared.', timeSaved: '3h/week', impact: 'First-trip fix rate up 35%' },
      { name: 'Repair Request Triage', description: 'Client reports issue via text or web form → system configuration pulled from database → Claude AI identifies likely cause based on symptom description → technician briefed with diagnosis hypothesis and tools needed → faster job completion on-site.', timeSaved: '3h/week', impact: 'Average repair time reduced by 40%' },
      { name: 'Water Audit Upsell Campaign', description: 'June → water audit offer sent to all clients in drought-restricted areas or with systems over 5 years old → audit books and generates efficiency upgrade recommendations → average upgrade value $800 per property.', timeSaved: '2h/week', impact: '$2,400/month in upgrade revenue' }
    ],
    tools: ['n8n', 'Twilio', 'Airtable', 'Google Calendar'],
    stats: { timeSaved: '16h/week', revenueImpact: '$4,200/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'How does the system handle clients with multiple irrigation zones and complex systems?', a: 'The system configuration database supports unlimited zones per property with photos, head types, flow rates, and controller settings stored per zone. Complex systems are fully documented on first visit.' },
      { q: 'Can the seasonal outreach differentiate between clients in different climate zones?', a: 'Yes — clients are tagged by climate zone and the outreach timing adjusts accordingly. A client in Colorado receives winterization outreach in late September while a Texas client gets it in November.' },
      { q: 'Does the system handle rain sensor and smart controller integrations?', a: 'The configuration database tracks smart controller models and their API capabilities. For compatible controllers, the system can pull runtime data automatically to inform efficiency recommendations.' }
    ]
  },
  {
    slug: 'generator-installer',
    name: 'Generator Installer',
    category: 'Home Services',
    tagline: 'Generator installers that automate post-storm demand capture and maintenance reminders generate 50% more revenue from the same service area.',
    description: 'Generator installation businesses experience extreme demand spikes after major storm events, when hundreds of homeowners simultaneously want quotes. The businesses with automated lead capture and follow-up convert the surge into revenue while competitors are still returning calls manually. Annual maintenance contracts provide year-round revenue stability.',
    painPoints: [
      'Post-storm lead surges overwhelm manual call handling — dozens of qualified leads lost within 48 hours',
      'Generator maintenance visits not systematically scheduled — critical for warranty compliance and customer safety',
      'Permit coordination for permanent standby generator installations involves weeks of manual agency follow-up',
      'Fuel management and exercise schedules for commercial generator clients not systematically tracked'
    ],
    workflows: [
      { name: 'Storm Surge Lead Capture', description: 'Power outage event detected via weather API → automated landing page activated with lead capture form → every inquiry receives immediate confirmation → preliminary quote range for home size submitted → appointment scheduling link sent → surge queue managed automatically.', timeSaved: '10h/week', impact: 'Capture 85% of storm surge leads' },
      { name: 'Annual Maintenance Contract Management', description: 'Installation complete → annual maintenance contract offered → reminder sent 50 weeks after last service → appointment booked → technician dispatched with service checklist → maintenance report generated and emailed → next annual appointment scheduled at completion.', timeSaved: '4h/week', impact: '88% annual maintenance contract retention' },
      { name: 'Permit Coordination Tracking', description: 'Permit application submitted → tracking record created → follow-up with permit office at 1 week, 3 weeks, 6 weeks → customer updated at each milestone → permit issued → installation scheduled automatically → utility notification filed.', timeSaved: '5h/week', impact: 'Installation timeline reduced by 3 weeks average' },
      { name: 'Commercial Generator Management', description: 'Commercial client database → each generator tracked separately → monthly exercise schedule reminders → fuel level check reminders → load bank testing reminders → compliance documentation generated automatically after each test.', timeSaved: '3h/week', impact: '100% compliance documentation for commercial clients' }
    ],
    tools: ['n8n', 'Twilio', 'Airtable', 'Google Calendar'],
    stats: { timeSaved: '22h/week', revenueImpact: '$6,800/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'How does the storm surge system know when to activate?', a: 'The workflow monitors power outage maps from major utilities in your service area. When outages above your threshold (configurable by number of affected customers) are detected, the surge lead capture mode activates automatically.' },
      { q: 'Can the maintenance system track both portable and permanent standby generators?', a: 'Yes — portable and standby generators have different maintenance requirements and schedules. The system applies the correct maintenance checklist and frequency based on the generator type registered in each client profile.' },
      { q: 'What if a commercial client\'s generator fails its load bank test?', a: 'A failed test triggers an immediate alert to the owner, a service scheduling workflow for the client, and a documentation record of the failure for compliance purposes. The issue is tracked until the retest passes.' }
    ]
  },
  {
    slug: 'gutter-cleaner',
    name: 'Gutter Cleaner',
    category: 'Home Services',
    tagline: 'Gutter cleaning businesses that automate biannual outreach and route optimization serve 50% more homes with the same crew.',
    description: 'Gutter cleaning is a predictable seasonal service with two natural demand windows — fall and spring. Most gutter cleaning businesses rely on homeowners to remember to call, losing 60% of potential repeat revenue. Automation captures both windows with systematic outreach, optimizes crew routes for maximum efficiency, and builds recurring contracts.',
    painPoints: [
      'Most homeowners forget to schedule gutter cleaning until they have a problem — reactive only business model',
      'Crew routes planned manually — inefficient geographic sequencing wastes 2-3 hours of drive time daily',
      'Fascia damage and gutter repair needs observed during cleaning not systematically captured as upsell opportunities',
      'No systematic process for converting one-time customers to annual recurring contracts'
    ],
    workflows: [
      { name: 'Biannual Outreach Campaign', description: 'April and October → outreach to all past clients with seasonal cleaning reminder → direct booking link with address pre-filled → 71% of existing clients book within 2 weeks of outreach → calendar fills automatically → crew routes generated.', timeSaved: '6h/week', impact: '71% repeat client re-booking rate each season' },
      { name: 'Optimized Route Generation', description: 'Confirmed bookings for each crew day → n8n generates geographically optimized route → accounts for driveway access requirements and time per home based on linear footage → start times staggered to avoid traffic → crew receives route via SMS morning of.', timeSaved: '5h/week', impact: '50% more homes serviced per day per crew' },
      { name: 'Repair Upsell Documentation', description: 'During cleaning → crew submits condition report with photos of any damaged gutters, loose spikes, or fascia issues → repair estimate generated automatically → sent to homeowner within 2 hours → follow-up if not responded to within 5 days.', timeSaved: '3h/week', impact: '$1,800/month in repair upsell revenue' },
      { name: 'Annual Contract Conversion', description: 'After first service → annual cleaning package offered (both spring and fall for discounted rate) → recurring clients added to automatic outreach → no manual scheduling needed → invoice generated automatically before each seasonal visit.', timeSaved: '2h/week', impact: '44% of one-time clients converted to annual contracts' }
    ],
    tools: ['n8n', 'Twilio', 'Google Sheets', 'Google Calendar'],
    stats: { timeSaved: '16h/week', revenueImpact: '$2,800/month', deploymentDays: 5, roiMonths: 1 },
    faq: [
      { q: 'How does the route optimization handle properties with special access requirements?', a: 'Each property profile includes access notes (gate codes, dog in yard, specific parking instructions) that are included in the crew\'s route briefing automatically. No need to look these up separately.' },
      { q: 'Can the outreach campaigns differentiate between clients in different regions with different fall foliage timing?', a: 'Yes — clients are tagged by geographic region and the outreach timing is adjusted accordingly. Northern clients receive fall outreach in September, southern clients in October and November.' },
      { q: 'How does the repair documentation system handle repairs that require more than one visit?', a: 'Multi-visit repairs create a project record with each visit tracked separately. The client receives updates after each visit and the repair is not marked complete until a final inspection confirms all work is done.' }
    ]
  }
]
