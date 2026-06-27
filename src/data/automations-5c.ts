import type { Profession } from './automations-1'

export const professions5c: Profession[] = [
  // ─── BEAUTY (10) ─────────────────────────────────────────────────────────────
  {
    slug: 'hair-salon',
    name: 'Hair Salon',
    category: 'Beauty & Wellness',
    tagline: 'Fill your book automatically, reduce no-shows, and build the rebooking rate that makes your revenue predictable week over week.',
    description: 'Hair salons live and die on full appointment books and consistent rebooking. The stylists with the highest income have systematized their rebooking so clients never leave without a next appointment — automation builds that system for the whole salon.',
    painPoints: [
      'No-shows and last-minute cancellations leave empty chair time that is impossible to fill manually at the last minute',
      'Clients who don\'t rebook at checkout go weeks or months between visits — revenue is erratic',
      'New client inquiry through Instagram and Google is not responded to within the critical first-hour window',
      'Color-treated client maintenance schedules require consistent follow-up that depends on stylists remembering to ask'
    ],
    workflows: [
      { name: 'Appointment Reminder & Confirmation', description: '48 hours before appointment → SMS confirmation with 1-click reschedule link. 24 hours → reminder. Same-day → hour-before reminder. No-shows drop from 14% to under 3%. Waitlist fills cancellations instantly.', timeSaved: '4h/week', impact: 'No-shows: 14% → 3%' },
      { name: 'Rebooking Campaign', description: '3 weeks after last visit → personalized SMS with rebooking link and stylist\'s availability. 5 weeks → second message. Clients on 4-week cycles return consistently rather than sporadically. Chair utilization up 28%.', timeSaved: '3h/week', impact: 'Chair utilization up 28%' },
      { name: 'New Client Inquiry Response', description: 'Instagram DM, Google Message, or website inquiry → instant automated response with availability link, service menu, and new client offer. Responds within 60 seconds at any hour. Inquiry-to-booking rate up 51%.', timeSaved: '3h/week', impact: 'Inquiry booking rate up 51%' },
      { name: 'Color Client Maintenance Reminder', description: 'Color service completed → root touch-up reminder at 6-7 weeks. Gloss or toner refresh at 10-12 weeks. Personalized with the client\'s specific color service. Color clients return more frequently when reminded at the right time.', timeSaved: '2h/week', impact: 'Color client return frequency 2.1x' }
    ],
    tools: ['n8n', 'Twilio', 'Vagaro', 'Google Sheets'],
    stats: { timeSaved: '13h/week', revenueImpact: '$3,800/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'What salon booking software does this integrate with?', a: 'We integrate with Vagaro, Mindbody, Booker, Square Appointments, and most major salon scheduling platforms.' },
      { q: 'Can rebooking reminders be customized per service type and client maintenance interval?', a: 'Yes — cut clients get different intervals than color clients. Brazilian blowout clients get different timing than highlights clients.' },
      { q: 'Can this work for a multi-stylist salon with clients who are loyal to specific stylists?', a: 'Yes — each client is linked to their preferred stylist. Rebooking reminders show that stylist\'s specific availability.' }
    ]
  },
  {
    slug: 'nail-salon',
    name: 'Nail Salon',
    category: 'Beauty & Wellness',
    tagline: 'Automate fill and refresh reminders, review collection, and the cancellation fill system that eliminates empty tables during peak hours.',
    description: 'Nail salons serve clients on predictable 2-4 week cycles — but most clients drift to 4-6 weeks because there is no systematic reminder. Automation closes that gap, maintains the booking cadence, and builds the review reputation that fills tables from organic search.',
    painPoints: [
      'Gel and acrylic clients who don\'t rebook at checkout drift from 2-week to 4-week cycles — losing significant revenue per seat',
      'Cancellations are handled manually — the receptionist calls a mental list of clients who might take the slot',
      'Walk-in capacity is managed by turning people away instead of building a waitlist that could be systematically filled',
      'Review collection is passive — nail salons provide a highly shareable experience but rarely capture the review at the right moment'
    ],
    workflows: [
      { name: 'Fill & Refresh Reminders', description: 'Service completed → fill reminder at 2 weeks for gel/acrylic clients. Fresh set reminder at 3 weeks. Pedicure reminder at 4 weeks. Personalized to service type. Clients return on schedule rather than when they notice significant growth.', timeSaved: '3h/week', impact: 'Client visit frequency up 38%' },
      { name: 'Cancellation Fill System', description: 'Cancellation received → automated notification to waitlisted clients for that time slot. First to confirm gets the booking. 81% of cancellations filled within 90 minutes. No manual list-calling required.', timeSaved: '3h/week', impact: '81% cancellation fill rate' },
      { name: 'Walk-In Waitlist Management', description: 'Walk-in arrives when full → waitlist sign-up via QR code. When table opens → first on list receives SMS to come in immediately. Turns turned-away customers into captured leads and captured revenue.', timeSaved: '2h/week', impact: 'Walk-in capture rate up 64%' },
      { name: 'Review Collection', description: '2 hours after appointment → review request SMS with direct Google link. Nail clients are social sharers — they just need the prompt and the link. Review volume increases 8x. Salon dominates local search.', timeSaved: '1h/week', impact: 'Review volume 8x vs passive collection' }
    ],
    tools: ['n8n', 'Twilio', 'Vagaro', 'Google Sheets'],
    stats: { timeSaved: '10h/week', revenueImpact: '$2,900/month', deploymentDays: 7, roiMonths: 2 },
    faq: [
      { q: 'Can reminders differentiate between gel, acrylic, dip powder, and natural nail clients?', a: 'Yes — each nail service type has its own recommended return interval and reminder timing.' },
      { q: 'Can the waitlist system handle specific technician preferences?', a: 'Yes — waitlisted clients who prefer a specific technician are only notified when that technician has an opening.' },
      { q: 'Can the review request mention specific technician names?', a: 'Yes — review requests can include the technician\'s name to prompt clients to mention them by name in reviews, helping individual technicians build their reputation.' }
    ]
  },
  {
    slug: 'barbershop',
    name: 'Barbershop',
    category: 'Beauty & Wellness',
    tagline: 'Automate the rebooking cycle, loyalty rewards, and new client conversion that turn a full chair into a predictable, growing business.',
    description: 'Barbershops with high-frequency repeat clients (every 2-4 weeks) have a systematic rebooking advantage over salons — automation turns that frequency into a reliable, measurable revenue stream.',
    painPoints: [
      'Clients who walk in without appointments create unpredictable capacity utilization and wait time management challenges',
      'Regulars who drift to 4-6 week cycles represent significant revenue erosion vs. consistent 2-3 week bookings',
      'New clients found via Instagram and Google don\'t convert because inquiry response is slow or non-existent',
      'Loyalty programs are punch-card based and poorly tracked — rewards are rarely redeemed and never drive loyalty'
    ],
    workflows: [
      { name: 'Rebooking Reminder System', description: 'Haircut completed → 2-week reminder SMS to rebook. 3-week follow-up if not booked. Online booking link included. Clients maintain consistent cut cycles. Barber chair utilization up 31%.', timeSaved: '3h/week', impact: 'Chair utilization up 31%' },
      { name: 'Digital Loyalty Program', description: 'Customer signs up via QR code → digital loyalty card tracked automatically. Every 8th cut free or product reward. Points visible via SMS on request. Loyalty members visit 2.9x more frequently than non-members.', timeSaved: '2h/week', impact: 'Loyalty member visit frequency 2.9x' },
      { name: 'New Client Inquiry Response', description: 'Instagram DM or website inquiry → instant automated response with barber availability, service menu with photos, and booking link. Responds within 60 seconds. First-response advantage captures clients who message 3 shops simultaneously.', timeSaved: '2h/week', impact: 'New client inquiry conversion up 58%' },
      { name: 'Review & Referral Collection', description: '3 hours after service → review request SMS with direct Google link. Referral invitation to text a friend who needs a cut. Barbershop clients are highly word-of-mouth oriented — systematic invitation multiplies natural referrals.', timeSaved: '1h/week', impact: 'Referral rate 2.4x with systematic ask' }
    ],
    tools: ['n8n', 'Twilio', 'Square Appointments', 'Google Sheets'],
    stats: { timeSaved: '9h/week', revenueImpact: '$2,700/month', deploymentDays: 7, roiMonths: 2 },
    faq: [
      { q: 'Can rebooking reminders be linked to a specific barber\'s availability?', a: 'Yes — each client is linked to their preferred barber. Reminders show only that barber\'s open slots.' },
      { q: 'Can the loyalty program work without a specific POS integration?', a: 'Yes — loyalty stamps can be triggered via simple staff confirmation form. POS integration with Square, Clover, or barbershop-specific platforms is available for fully automated tracking.' },
      { q: 'Can this work for a solo barber vs. a multi-chair shop?', a: 'Yes — solo barbers benefit as much as multi-chair shops. The automation replaces what would be a receptionist for a solo operator.' }
    ]
  },
  {
    slug: 'spa',
    name: 'Day Spa',
    category: 'Beauty & Wellness',
    tagline: 'Automate gift card campaigns, package upsells, and membership enrollment so your spa generates revenue even when the treatment rooms are quiet.',
    description: 'Day spas compete on experience and have natural recurring visit cycles, gift card opportunities, and membership models that most spas massively underutilize. Automation captures all three revenue streams systematically.',
    painPoints: [
      'Gift card campaigns for Mother\'s Day, holidays, and birthdays are never executed systematically — enormous seasonal revenue left untouched',
      'Package upgrades and add-on services are offered verbally at checkout when clients are focused on paying — conversion is poor',
      'Membership programs exist but are never actively sold — passive enrollment means 80% of clients who would join never hear the pitch',
      'Post-treatment product retail is one of the highest-margin revenue lines but is never followed up after clients leave'
    ],
    workflows: [
      { name: 'Seasonal Gift Card Campaigns', description: 'Mother\'s Day, Valentine\'s Day, Christmas → automated gift card promotion to full client list with easy purchase link. Personalized with suggested amount based on their typical service spend. Gift card revenue 3.8x higher with systematic campaigns vs. passive display.', timeSaved: '4h/week', impact: 'Gift card revenue 3.8x higher' },
      { name: 'Package & Upgrade Upsell', description: '48 hours before appointment → upgrade offer via SMS: "Add a scalp treatment to your massage for $30." Clients who decide at home convert at 3x the rate of in-session upsell attempts. Add-on revenue per appointment up 44%.', timeSaved: '3h/week', impact: 'Add-on revenue per visit up 44%' },
      { name: 'Membership Enrollment Campaign', description: 'After client\'s 2nd visit → membership pitch email with personalized savings calculation and monthly benefit summary. After 3rd → in-app or in-store offer. 26% of 2nd-visit clients enroll when systematically offered.', timeSaved: '3h/week', impact: '26% membership conversion at visit 2-3' },
      { name: 'Post-Visit Retail Follow-Up', description: '3 days after treatment → product recommendation email featuring what was used in the service. Home care guide included. Online purchase link. Retail revenue 31% higher from systematic post-treatment recommendation.', timeSaved: '2h/week', impact: 'Retail revenue up 31%' }
    ],
    tools: ['n8n', 'Twilio', 'Mindbody', 'Stripe'],
    stats: { timeSaved: '13h/week', revenueImpact: '$5,200/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can seasonal gift card campaigns be timed to specific purchase windows?', a: 'Yes — gift card promotions are scheduled to launch 2-3 weeks before peak gifting moments and conclude on the holiday itself.' },
      { q: 'Can membership programs offer different tiers for different service levels?', a: 'Yes — entry, standard, and premium membership tiers have their own enrollment campaigns and benefit communication.' },
      { q: 'What spa management platforms does this integrate with?', a: 'We integrate with Mindbody, Booker, Boulevard, Vagaro, and most major spa management systems.' }
    ]
  },
  {
    slug: 'tattoo-studio',
    name: 'Tattoo Studio',
    category: 'Beauty & Wellness',
    tagline: 'Automate booking deposit collection, aftercare follow-up, and portfolio review requests that fill your artist\'s calendar and build your reputation.',
    description: 'Tattoo studios have high-intent clients who require specific booking processes, significant consultation investment, and careful aftercare communication. Automation handles the booking deposit workflow, healing follow-up, and review collection that every studio should be running systematically.',
    painPoints: [
      'No-shows for long tattoo appointments are devastating — requiring deposits with systematic reminders is critical but inconsistently executed',
      'Consultation scheduling requires multiple back-and-forth messages that could be replaced by a self-scheduling system',
      'Aftercare follow-up is inconsistently provided despite being critical for healing outcomes and client satisfaction',
      'Portfolio review and tattoo healed photos are rarely collected — artist portfolios grow slowly without systematic collection'
    ],
    workflows: [
      { name: 'Deposit & Booking Confirmation', description: 'Booking accepted → deposit payment link sent via SMS immediately. Deposit received → full booking confirmation with date, duration, and preparation guide. 7-day reminder. 48-hour reminder. Day-of confirmation. No-show rate from non-deposit to systematic deposit: near zero.', timeSaved: '4h/week', impact: 'No-shows reduced to near zero' },
      { name: 'Consultation Scheduling System', description: 'New client inquiry → automated intake form collecting design concept, placement, size, and reference images. Consultation scheduling link based on artist availability. No back-and-forth DMs required.', timeSaved: '3h/week', impact: 'Consultation scheduling fully automated' },
      { name: 'Aftercare Follow-Up Sequence', description: 'Session completed → immediate aftercare guide delivered. Day 3 → healing check-in with specific questions. Day 7 → mid-heal update request. Day 21 → fully healed photo request. Clients feel supported; healing outcomes better.', timeSaved: '3h/week', impact: 'Client satisfaction measurably higher' },
      { name: 'Healed Photo & Review Collection', description: 'Day 21 → healed photo request with submission link for portfolio. Simultaneously, Google review request. Portfolio grows organically; review reputation builds consistently.', timeSaved: '2h/week', impact: 'Portfolio and reviews grow automatically' }
    ],
    tools: ['n8n', 'Twilio', 'Stripe', 'Google Sheets'],
    stats: { timeSaved: '13h/week', revenueImpact: '$3,600/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can the deposit system handle partial deposits vs. full session pre-payment?', a: 'Yes — deposit amount can be configured as a fixed amount, percentage, or full pre-payment per session type or artist.' },
      { q: 'Can aftercare instructions be customized per placement and technique?', a: 'Yes — solid color vs. fine line, body placement (hands, ribs, neck), and technique (traditional vs. watercolor) each require different healing protocols.' },
      { q: 'Can consultation intake forms include image upload for reference photos?', a: 'Yes — the intake form includes image upload fields for reference photos, placement selfies, and design inspiration.' }
    ]
  },
  {
    slug: 'eyebrow-microblading-studio',
    name: 'Eyebrow & Microblading Studio',
    category: 'Beauty & Wellness',
    tagline: 'Automate touch-up appointment scheduling, healing follow-up, and annual maintenance campaigns that keep your book full and your clients loyal.',
    description: 'Microblading and permanent makeup studios have a natural 2-visit initial service (initial session + touch-up at 6-8 weeks) and annual maintenance cycle that most studios fail to systematically manage. Automation handles the touch-up scheduling, healing communication, and maintenance recall that builds recurring revenue.',
    painPoints: [
      'Touch-up appointment scheduling at 6-8 weeks is critical for optimal results but is often left to clients to initiate',
      'Healing process communication is essential for client satisfaction but is done manually and inconsistently',
      'Annual color refresh appointments represent recurring high-value revenue that is never systematically recalled',
      'Before/after photo collection for portfolio is never systematically executed despite being critical for marketing'
    ],
    workflows: [
      { name: 'Touch-Up Scheduling Automation', description: 'Initial session completed → touch-up booking link sent at 6 weeks with urgency: "Your touch-up window is weeks 6-8 for optimal results." Reminder at 7 weeks if not booked. Touch-up completion rate up from 67% to 93%.', timeSaved: '4h/week', impact: 'Touch-up completion: 67% → 93%' },
      { name: 'Healing Process Communication', description: 'Session completed → day-by-day healing guide delivered (days 1-14). Day 5 → peeling check-in. Day 10 → fading check-in. Day 14 → initial healed result check-in. Day 30 → settled result check-in. Clients informed; anxiety eliminated.', timeSaved: '3h/week', impact: 'Healing anxiety eliminated' },
      { name: 'Annual Maintenance Recall', description: '11 months after touch-up → annual color refresh reminder. Microblading fades at 12-18 months; early recall captures clients before noticeable fading. Annual maintenance recall rate up from 41% to 74%.', timeSaved: '3h/week', impact: 'Annual recall rate: 41% → 74%' },
      { name: 'Before/After Portfolio Collection', description: 'Healed result confirmed (day 30-45) → professional photo guide sent with lighting instructions + submission link. Portfolio grows with healed results rather than just immediate-after photos that don\'t show true results.', timeSaved: '2h/week', impact: 'Portfolio healed photo collection automated' }
    ],
    tools: ['n8n', 'Twilio', 'Acuity', 'Google Sheets'],
    stats: { timeSaved: '13h/week', revenueImpact: '$4,100/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can healing communication include photos to show clients what normal healing looks like?', a: 'Yes — healing guides include reference photos showing the day-by-day healing process so clients can compare their healing to expected results.' },
      { q: 'Can annual recall timing be adjusted per skin type and lifestyle?', a: 'Yes — oily skin types and outdoor/active lifestyles fade faster. Recall timing can be set shorter for these clients.' },
      { q: 'Can the touch-up reminder adjust based on how booked the studio is?', a: 'Yes — if the studio is heavily booked, touch-up reminders can be sent earlier to ensure clients get into the optimal window.' }
    ]
  },
  {
    slug: 'lash-studio',
    name: 'Lash Studio',
    category: 'Beauty & Wellness',
    tagline: 'Automate fill appointment reminders, lash care follow-up, and referral campaigns that keep every technician fully booked.',
    description: 'Lash extension studios have the most predictable service cycle in beauty — fills every 2-3 weeks — and the best studios have automated that cycle so clients never fall off the schedule. Automation builds the systematic rebooking and referral infrastructure.',
    painPoints: [
      'Clients who don\'t rebook at checkout let their fills lapse — coming in at 4-5 weeks instead of 2-3, reducing service frequency',
      'Lash retention follow-up (checking that extensions are holding) positions the studio as caring but is never systematically done',
      'No-shows for fill appointments waste technician time that is nearly impossible to fill last minute',
      'Referral programs exist verbally but are never systematically promoted — most clients refer organically 1-2 times without being asked'
    ],
    workflows: [
      { name: 'Fill Reminder Sequence', description: 'Service completed → fill reminder at 2 weeks for classic, 2.5 weeks for hybrid, 3 weeks for volume. Personalized to set type. Reminder includes technician\'s availability and booking link. Fill appointment regularity up 44%.', timeSaved: '4h/week', impact: 'Fill regularity up 44%' },
      { name: 'Lash Care & Retention Follow-Up', description: 'Day 3 after service → lash care check-in: "How are your lashes feeling? Any fallout concerns?" Negative response → immediate offer to address. Positive → tip on extending retention. Client relationship depth increases significantly.', timeSaved: '2h/week', impact: 'Client retention 3.1x better with follow-up' },
      { name: 'Cancellation Fill System', description: 'Cancellation received → instant notification to all clients on the waitlist for that technician and time slot. 87% of cancellations filled within 2 hours. Empty appointment slots virtually eliminated.', timeSaved: '3h/week', impact: '87% cancellation fill rate' },
      { name: 'Referral Campaign', description: 'After client\'s 3rd fill → referral invitation with unique code for friend discount + lash credit for referrer. Systematic referral invitation generates 1 new client per 3.2 existing clients vs. 1 per 9 with no systematic ask.', timeSaved: '2h/week', impact: 'Referral rate 3x with systematic ask' }
    ],
    tools: ['n8n', 'Twilio', 'Vagaro', 'Google Sheets'],
    stats: { timeSaved: '12h/week', revenueImpact: '$3,200/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can reminders be sent for different lash set types with appropriate fill timing?', a: 'Yes — classic, hybrid, and volume sets each have different retention characteristics and different optimal fill intervals.' },
      { q: 'Can the referral tracking link new clients to the referring client automatically?', a: 'Yes — unique referral codes track attribution. Referral credits are applied automatically when the new client\'s appointment is completed.' },
      { q: 'Can this work for a solo lash artist as well as a multi-tech studio?', a: 'Yes — solo artists benefit enormously. Automation handles the administrative work that would otherwise require a receptionist.' }
    ]
  },
  {
    slug: 'skin-care-clinic',
    name: 'Skin Care Clinic / Esthetician',
    category: 'Beauty & Wellness',
    tagline: 'Automate treatment series follow-up, product reorder prompts, and skin care regimen check-ins that build long-term client relationships and recurring revenue.',
    description: 'Estheticians and skin care clinics sell treatment series and ongoing skin care management — but most lose clients between series because there is no systematic follow-up. Automation maintains the client relationship between visits and drives product reorder revenue.',
    painPoints: [
      'Treatment series (chemical peels, microneedling, facials) require consistent session spacing that clients don\'t maintain without reminders',
      'Home care product replenishment represents significant recurring revenue that clients buy at Sephora because no one follows up',
      'Skin analysis follow-up between sessions captures compliance and results data that improves outcomes and client satisfaction',
      'Referral programs are mentioned at checkout but never systematically promoted — word-of-mouth is left entirely to organic behavior'
    ],
    workflows: [
      { name: 'Treatment Series Scheduling', description: 'Series sold → next appointment automatically scheduled at protocol-appropriate interval. Reminder at 48h and day-of. Series completion rate up from 58% to 83%. Better outcomes drive better before/afters and more referrals.', timeSaved: '4h/week', impact: 'Series completion: 58% → 83%' },
      { name: 'Product Reorder Reminders', description: 'Product purchased → automated reorder reminder at calculated depletion date based on product size and usage instructions. "Your vitamin C serum should be running low." Reorder conversion 44% with prompt vs. 8% without.', timeSaved: '3h/week', impact: 'Product reorder rate: 8% → 44%' },
      { name: 'Skin Check-In Between Sessions', description: 'Mid-series → SMS check-in: "How is your skin feeling? Any reactions or questions about your regimen?" Responses capture compliance data and catch issues before they become problems. Client outcomes measurably better.', timeSaved: '2h/week', impact: 'Outcome compliance significantly better' },
      { name: 'Referral Campaign', description: 'After completing a treatment series → before/after celebration + referral invitation with friend discount. Skin transformation clients are the most enthusiastic referrers in beauty. Systematic ask generates 1 referral per 3.4 series completers.', timeSaved: '2h/week', impact: '1 referral per 3.4 series completers' }
    ],
    tools: ['n8n', 'Twilio', 'Vagaro', 'Stripe'],
    stats: { timeSaved: '12h/week', revenueImpact: '$3,400/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can treatment series automation handle different protocol intervals per treatment type?', a: 'Yes — chemical peel series (every 4 weeks), microneedling series (every 6 weeks), and hydrafacial series (every 4 weeks) each have their own scheduling intervals.' },
      { q: 'Can product recommendations be personalized to each client\'s skin type and concerns?', a: 'Yes — product recommendations are filtered by the client\'s skin profile (dry/oily/combination, sensitivity, primary concerns) captured at intake.' },
      { q: 'Can the skin check-in capture photos to track progress between sessions?', a: 'Yes — check-in messages can include optional photo submission for the practitioner to review. This is particularly valuable for acne treatment series.' }
    ]
  },
  {
    slug: 'waxing-studio',
    name: 'Waxing Studio',
    category: 'Beauty & Wellness',
    tagline: 'Fill your appointment book with consistent clients on 3-4 week cycles using automated rebooking and cancellation fill systems.',
    description: 'Waxing studios have an ideal recurring service cycle — most body waxing services repeat every 3-5 weeks — but most studios let clients lapse without systematic follow-up. Automation builds the rebooking cadence and cancellation recovery that fills every slot.',
    painPoints: [
      'Clients who leave without rebooking average 5-6 weeks between visits instead of the optimal 3-4 weeks',
      'Cancellations are hard to fill last-minute because there is no waitlist or instant notification system',
      'New client inquiry via Instagram and Google arrives at all hours without consistent response',
      'Review collection is entirely passive — waxing clients are loyal and satisfied but rarely write reviews without being asked'
    ],
    workflows: [
      { name: 'Rebooking Reminder Cycle', description: 'Service completed → rebooking reminder at 3 weeks for facial waxing, 4 weeks for body waxing. Personalized to specific service. Direct booking link included. Client frequency improves; revenue per client per month up 31%.', timeSaved: '3h/week', impact: 'Revenue per client per month up 31%' },
      { name: 'Cancellation Fill System', description: 'Cancellation received → instant waitlist notification for that slot. 89% fill rate within 2 hours with systematic waitlist vs. manual calling from memory.', timeSaved: '3h/week', impact: '89% cancellation fill rate' },
      { name: 'New Client Auto-Response', description: 'Inquiry via any channel → instant automated response within 60 seconds with service menu, pricing, and booking link. After-hours inquiries captured and converted that manual response would have lost.', timeSaved: '2h/week', impact: 'Inquiry conversion up 48%' },
      { name: 'Review Collection', description: '2 hours after service → review request SMS. Simple, timed, with direct Google link. Review volume increases 7x. Waxing studio dominates local search as the best-reviewed option in the area.', timeSaved: '1h/week', impact: '7x review volume' }
    ],
    tools: ['n8n', 'Twilio', 'Vagaro', 'Google Sheets'],
    stats: { timeSaved: '10h/week', revenueImpact: '$2,600/month', deploymentDays: 7, roiMonths: 2 },
    faq: [
      { q: 'Can reminders be configured for different waxing services with different regrowth cycles?', a: 'Yes — facial waxing clients get shorter intervals than body waxing clients. Each service type has its own rebooking timing.' },
      { q: 'Can the system handle both walk-in and appointment-based business models?', a: 'Yes — appointment clients receive the full reminder and rebooking sequence. Walk-in waitlist management handles non-appointment traffic.' },
      { q: 'Can the booking link show specific technician availability for clients with preferences?', a: 'Yes — clients with preferred technicians see only that technician\'s availability when rebooking.' }
    ]
  },
  {
    slug: 'wellness-center',
    name: 'Wellness Center',
    category: 'Beauty & Wellness',
    tagline: 'Automate multi-service scheduling, wellness program enrollment, and practitioner utilization campaigns that maximize your center\'s revenue per square foot.',
    description: 'Wellness centers offer multiple modalities — massage, acupuncture, chiropractic, nutrition — and the challenge is cross-selling between services and maintaining consistent client relationships across practitioners. Automation handles the integrated client journey.',
    painPoints: [
      'Clients who see one practitioner are never introduced to other services that would improve their outcomes',
      'Wellness program enrollment (multi-session packages, memberships) is passive — most clients are never offered structured programs',
      'Practitioner capacity utilization is uneven — some practitioners are fully booked while others have significant gaps',
      'Health-focused seasonal campaigns (new year, summer, stress season) are never systematically deployed to the client base'
    ],
    workflows: [
      { name: 'Cross-Service Introduction', description: 'Client completes service → automated educational message about complementary service at the center. Massage client → acupuncture introduction. Chiropractic client → massage therapy suggestion. Cross-service visits up 34%.', timeSaved: '4h/week', impact: 'Cross-service visits up 34%' },
      { name: 'Wellness Program Enrollment', description: 'After 2nd visit → personalized wellness program pitch with savings calculation and outcome goals. After 3rd → upgrade offer. Program enrollment from casual clients converts 27% with systematic offer.', timeSaved: '3h/week', impact: '27% program enrollment conversion' },
      { name: 'Practitioner Utilization Balancing', description: 'Practitioner with open slots → targeted promotion to clients who haven\'t seen that practitioner. "Dr. Chen has availability this week — clients who see her for acupuncture report 40% faster recovery." Utilization gaps filled systematically.', timeSaved: '3h/week', impact: 'Practitioner utilization balanced' },
      { name: 'Seasonal Wellness Campaigns', description: 'January → new year wellness program. Spring → stress/energy campaign. October → immune support season. Each campaign targeted to client health history and service preferences. Seasonal revenue predictably elevated.', timeSaved: '2h/week', impact: 'Seasonal campaign revenue 2.3x baseline' }
    ],
    tools: ['n8n', 'Twilio', 'Mindbody', 'Google Sheets'],
    stats: { timeSaved: '13h/week', revenueImpact: '$4,800/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can cross-service introductions be filtered to avoid recommending services that conflict with a client\'s health conditions?', a: 'Yes — health intake data is used to filter recommendations. Clients with certain conditions are not sent recommendations for contraindicated services.' },
      { q: 'Can practitioner promotion messages be sent as if from the practitioner personally?', a: 'Yes — practitioner recommendation messages can be sent in the practitioner\'s voice with their name. Personal tone drives higher engagement than generic promotions.' },
      { q: 'Can wellness program enrollment handle different program types for different health goals?', a: 'Yes — weight management programs, stress reduction programs, and pain management programs each have their own enrollment campaigns and client segmentation.' }
    ]
  },
  // ─── CREATIVE (10) ───────────────────────────────────────────────────────────
  {
    slug: 'freelance-photographer',
    name: 'Freelance Photographer',
    category: 'Creative',
    tagline: 'Automate booking inquiries, gallery delivery, and annual session campaigns that fill your calendar without constant marketing effort.',
    description: 'Freelance photographers spend significant time on the operational work of booking, communicating, and delivering — all of which can be systematized so your working hours go toward shooting and editing.',
    painPoints: [
      'Booking inquiries require multiple back-and-forth messages to determine availability, pricing, and requirements',
      'Gallery delivery involves manual upload, notification, and password sharing for every session',
      'Past clients are never systematically approached for annual sessions, holiday portraits, or milestone photography',
      'Invoice collection is inconsistent — some clients pay promptly, others require multiple follow-ups'
    ],
    workflows: [
      { name: 'Inquiry Intake & Booking', description: 'Inquiry received → automated questionnaire: session type, date, location, number of subjects. Responses trigger availability check → booking link with appropriate session options. Booking calls replaced by self-service intake.', timeSaved: '4h/week', impact: 'Booking coordination time cut by 70%' },
      { name: 'Gallery Delivery Automation', description: 'Gallery uploaded → instant notification to client with access link, download instructions, and print ordering options. Delivery quality experience matches the photography quality. Every client receives professional delivery.', timeSaved: '2h/week', impact: 'Gallery delivery fully automated' },
      { name: 'Annual Session Campaign', description: 'Birthday, family portrait anniversary, and seasonal milestones → automated outreach to past clients with session booking offer. Annual session re-engagement converts 34% of past clients to repeat bookings.', timeSaved: '3h/week', impact: '34% past client rebooking rate' },
      { name: 'Invoice & Payment Automation', description: 'Session completed → invoice generated and sent via payment link. 7-day reminder if unpaid. 14-day follow-up. Collection time drops from 34 days to 11. Cash flow becomes predictable.', timeSaved: '2h/week', impact: 'Collection time: 34 days → 11 days' }
    ],
    tools: ['n8n', 'Stripe', 'Pixieset API', 'Twilio'],
    stats: { timeSaved: '12h/week', revenueImpact: '$2,800/month', deploymentDays: 7, roiMonths: 2 },
    faq: [
      { q: 'Can the booking system handle different session types with different pricing and duration?', a: 'Yes — headshots, family sessions, senior portraits, and engagement sessions each have their own intake flow and pricing.' },
      { q: 'What gallery delivery platforms does this integrate with?', a: 'We integrate with Pixieset, ShootProof, Cloudspot, and most major photography gallery platforms.' },
      { q: 'Can annual campaign timing be personalized based on when each family typically schedules?', a: 'Yes — past session dates drive the campaign timing. A family that always shoots in October gets their annual invitation in September.' }
    ]
  },
  {
    slug: 'music-producer',
    name: 'Music Producer / Recording Studio',
    category: 'Creative',
    tagline: 'Automate session booking, project delivery, and client pipeline management so your creative time is spent making music, not managing logistics.',
    description: 'Music producers and recording studios lose significant time to booking coordination, client communication, and project delivery logistics. Automation handles the business infrastructure so creative time is protected.',
    painPoints: [
      'Session booking requires availability coordination and deposit collection that creates friction and occasional no-shows',
      'Project delivery (stems, masters, mixed files) involves manual packaging and delivery notification for each client',
      'New client outreach to artists who have expressed interest goes stale without systematic follow-up',
      'Royalty splits and collaboration agreements are tracked informally — disputes create professional friction'
    ],
    workflows: [
      { name: 'Session Booking & Deposit System', description: 'Session inquiry → automated questionnaire collecting project type, genre, session length needed. Availability shown → booking with deposit payment. Deposit confirmed → session details and studio prep guide delivered. No-shows virtually eliminated.', timeSaved: '5h/week', impact: 'No-shows virtually eliminated' },
      { name: 'Project Delivery Automation', description: 'Mixing or mastering complete → client notification with secure download link for all stems, masters, and documentation. Version history maintained. Professional delivery experience consistent for every project.', timeSaved: '2h/week', impact: 'Delivery process fully systematized' },
      { name: 'Client Pipeline Follow-Up', description: 'Artist expressed interest but didn\'t book → 2-week follow-up with availability update. 30-day → new work showcase. 60-day → collaboration invitation. Converts long-cycle creative relationships into sessions.', timeSaved: '3h/week', impact: '28% of interested artists book within 90 days' },
      { name: 'Release Milestone Campaign', description: 'Track completed → automated release preparation checklist delivered. Release day → promotion support package. 30 days post-release → streaming performance summary. Producer positioned as long-term career partner.', timeSaved: '2h/week', impact: 'Producer-artist retention 2.4x higher' }
    ],
    tools: ['n8n', 'Stripe', 'Google Sheets', 'Twilio'],
    stats: { timeSaved: '13h/week', revenueImpact: '$3,400/month', deploymentDays: 7, roiMonths: 2 },
    faq: [
      { q: 'Can session booking handle different studio environments (tracking room, vocal booth, mixing suite)?', a: 'Yes — each studio space has its own availability calendar and session type configuration.' },
      { q: 'Can project delivery include collaboration agreements and split sheet tracking?', a: 'Yes — collaboration agreement templates and split sheet documentation can be included in the project delivery workflow.' },
      { q: 'Can the system handle both in-person studio sessions and remote collaboration projects?', a: 'Yes — in-person and remote sessions have different booking flows, pricing, and delivery workflows.' }
    ]
  },
  {
    slug: 'copywriter-freelance',
    name: 'Freelance Copywriter',
    category: 'Creative',
    tagline: 'Automate client onboarding, project milestone communication, and referral generation so you write more and manage less.',
    description: 'Freelance copywriters sell creative output but spend significant time on operational communication: onboarding, brief collection, revision management, and invoice follow-up. Automation handles all of it so your writing time is protected.',
    painPoints: [
      'Client onboarding requires extensive brief collection that is currently done through long emails and calls',
      'Revision requests come in via email, Slack, and voice notes with no consolidated tracking system',
      'Invoice collection is often uncomfortable — writers avoid following up on late payments',
      'Referral requests are never made at the peak satisfaction moment after project delivery'
    ],
    workflows: [
      { name: 'Project Onboarding Automation', description: 'Contract signed → structured creative brief form delivered immediately: target audience, brand voice, key messages, competitors, and reference examples. Complete brief in the client\'s first touchpoint. Kickoff calls shorter and more productive.', timeSaved: '4h/week', impact: 'Brief collection time cut by 71%' },
      { name: 'Revision Request Tracking', description: 'Draft delivered → structured revision request form with specific field for each copy element. Responses consolidated into revision document for writer. No revision lost in email chains.', timeSaved: '3h/week', impact: 'Revision rounds 40% faster' },
      { name: 'Invoice & Payment Follow-Up', description: 'Project complete → invoice sent via payment link immediately. 10-day reminder. 20-day follow-up. 30-day escalation. Collection time drops from 42 days to 16. Writer never needs to send an uncomfortable payment chaser.', timeSaved: '2h/week', impact: 'Collection time: 42 days → 16 days' },
      { name: 'Referral Request at Peak Satisfaction', description: 'Project delivered + 7 days → referral invitation sent at the moment of highest client satisfaction. Specific, personalized ask: "Who else do you know who needs copy this good?" Referral rate 2.8x higher vs. no systematic ask.', timeSaved: '1h/week', impact: 'Referral rate 2.8x higher' }
    ],
    tools: ['n8n', 'Stripe', 'Typeform', 'Google Sheets'],
    stats: { timeSaved: '11h/week', revenueImpact: '$2,600/month', deploymentDays: 7, roiMonths: 2 },
    faq: [
      { q: 'Can the brief form be customized for different copy types?', a: 'Yes — website copy, email sequences, ad copy, and blog content each have their own brief templates with relevant questions.' },
      { q: 'Can project delivery include a review and approval step before revision requests are collected?', a: 'Yes — draft delivery → client review period → revision request form opens after the review deadline.' },
      { q: 'Can the invoice automation pause for retainer clients who are billed monthly?', a: 'Yes — retainer clients receive automated monthly invoices on a fixed date. Project-based clients receive invoices at project completion.' }
    ]
  },
  {
    slug: 'architect',
    name: 'Architect',
    category: 'Creative',
    tagline: 'Automate client communication across long project timelines, milestone billing, and referral generation that grows your practice from your satisfied client base.',
    description: 'Architecture projects span years with complex client communication needs, milestone-based billing, and significant referral potential from satisfied clients who own completed buildings. Automation handles the communication layer across the project lifecycle.',
    painPoints: [
      'Long project timelines require consistent client communication that is currently dependent on individual architect initiative',
      'Milestone billing requires manual invoice generation and follow-up at each phase completion',
      'Client construction updates during documentation and construction administration are inconsistent',
      'Completed project referrals are never systematically requested despite architecture\'s high referral value'
    ],
    workflows: [
      { name: 'Project Milestone Communication', description: 'Design phase completion → automated milestone summary to client: what was completed, what was decided, what comes next, and photos of key deliverables. Clients always informed without requiring architect calls.', timeSaved: '5h/week', impact: 'Client communication systematized' },
      { name: 'Milestone Billing Automation', description: 'Phase completed → invoice automatically generated and sent based on contract fee schedule. 14-day reminder if unpaid. 28-day escalation. Cash flow aligned to project milestones without manual invoice generation.', timeSaved: '4h/week', impact: 'Milestone billing fully automated' },
      { name: 'Construction Phase Updates', description: 'Site visit completed → automated construction progress report to client: observations, issues identified, status of open items, and next site visit schedule. Clients feel involved without requiring constant calls.', timeSaved: '3h/week', impact: 'CA calls reduced by 54%' },
      { name: 'Post-Completion Referral Campaign', description: '6 months after project completion → "How are you enjoying the space?" check-in + referral invitation. 12 months → professional photography offer for their portfolio and testimonial request. Referrals from completed projects are the highest-value new business source in architecture.', timeSaved: '2h/week', impact: '1 referral per 4.1 completed projects' }
    ],
    tools: ['n8n', 'Stripe', 'Google Sheets', 'Twilio'],
    stats: { timeSaved: '15h/week', revenueImpact: '$7,200/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can milestone billing adapt to percentage-complete billing vs. fixed-phase billing?', a: 'Yes — both billing models are supported. Percentage-complete billing triggers from client confirmation of phase completion; fixed-phase billing triggers from project milestone markers.' },
      { q: 'Can construction update reports include site photos automatically?', a: 'Yes — photos uploaded to a shared folder or cloud storage trigger attachment to the client update report automatically.' },
      { q: 'Can the system handle multiple simultaneous projects with different clients and timelines?', a: 'Yes — each project has its own timeline, client, and communication sequence running independently.' }
    ]
  },
  {
    slug: 'interior-designer',
    name: 'Interior Designer',
    category: 'Creative',
    tagline: 'Automate design approval workflows, vendor coordination, and project milestone updates so your creative process runs on time and clients stay excited.',
    description: 'Interior design projects require extensive client approval cycles, vendor coordination, and procurement tracking that consumes enormous design team time. Automation systematizes the operational layer so designers focus on creative work.',
    painPoints: [
      'Design concept approval rounds take weeks because clients don\'t respond promptly to emailed PDFs',
      'Vendor order tracking across 10-20 vendors per project is manually managed in spreadsheets that go stale',
      'Client project updates are inconsistent — some clients feel informed, others feel ignored — depending on who is managing the account',
      'Procurement invoice collection and billing to clients is manual and often delayed'
    ],
    workflows: [
      { name: 'Design Approval Workflow', description: 'Design presentation ready → structured approval request with visual previews and specific approval questions sent via link. 48-hour reminder if no response. 96-hour escalation. Approval cycle time reduced from 2 weeks to under 4 days.', timeSaved: '5h/week', impact: 'Approval cycle: 2 weeks → 4 days' },
      { name: 'Vendor Order Tracking', description: 'Order placed → delivery date entered into tracking system. Automatic follow-up to vendor at 3 days before expected delivery if no tracking update. Client notified when items are received at receiving warehouse. Procurement tracking fully visible.', timeSaved: '5h/week', impact: 'Procurement visibility 100%' },
      { name: 'Client Project Update Digest', description: 'Bi-weekly → automated project update to client: items ordered and their status, design decisions pending, upcoming milestones, and current estimated completion. Clients feel informed regardless of which team member manages the communication.', timeSaved: '4h/week', impact: 'Client satisfaction consistently high' },
      { name: 'Procurement Billing Automation', description: 'Items received → client invoice generated with markup. 14-day payment reminder. 30-day follow-up. Procurement billing cycle shortened from 45 days to under 18 days.', timeSaved: '3h/week', impact: 'Procurement billing cycle 60% shorter' }
    ],
    tools: ['n8n', 'Google Sheets', 'Stripe', 'Typeform'],
    stats: { timeSaved: '18h/week', revenueImpact: '$6,400/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can the approval system handle multi-room projects with different approval timelines?', a: 'Yes — each room or space has its own approval sequence with independent timing.' },
      { q: 'Can vendor tracking integrate with trade accounts at major suppliers?', a: 'We build integrations with suppliers that have APIs. For others, tracking is managed via email parsing and manual order entry with automatic follow-up logic.' },
      { q: 'Can the billing system handle design fees separately from procurement billing?', a: 'Yes — design phase fees (retainer, milestone) and procurement markup billing have separate invoice workflows with different payment terms.' }
    ]
  },
  {
    slug: 'content-creator-influencer',
    name: 'Content Creator / Influencer',
    category: 'Creative',
    tagline: 'Automate brand partnership inquiries, content deliverable tracking, and audience engagement campaigns so you create more and administrate less.',
    description: 'Content creators with growing audiences face increasing brand partnership inquiry volume, content deliverable management, and audience communication needs that can consume as much time as content creation itself. Automation handles the business layer.',
    painPoints: [
      'Brand partnership inquiries require manual screening, rate communication, and contract coordination — time-consuming at volume',
      'Content deliverable deadlines across multiple simultaneous partnerships are tracked manually — missed deadlines damage brand relationships',
      'Audience newsletter and community communication is sporadic because it\'s entirely manual',
      'Affiliate link performance tracking across multiple platforms requires manual aggregation for reporting to brand partners'
    ],
    workflows: [
      { name: 'Brand Partnership Inquiry Response', description: 'Brand inquiry received → automated response with media kit, rate card, and partnership intake questionnaire. Qualifying questions filter serious partners from mass outreach. Response time < 2 hours at any volume.', timeSaved: '5h/week', impact: 'Partnership inquiry handling time cut 80%' },
      { name: 'Content Deliverable Tracking', description: 'Partnership confirmed → deliverable schedule entered → automated reminders to creator at 1 week and 3 days before each deadline. Partner receives automated delivery notification on submission. Zero missed deliverables.', timeSaved: '3h/week', impact: 'Zero missed content deliverables' },
      { name: 'Audience Newsletter Automation', description: 'Weekly newsletter → content from creator entered once → automated distribution to subscriber list with professional formatting. New subscribers → welcome sequence. Newsletter consistency improves 3x; audience growth accelerates.', timeSaved: '4h/week', impact: 'Newsletter consistency 3x better' },
      { name: 'Affiliate Performance Reporting', description: 'Monthly affiliate performance data pulled from major platforms → compiled into partner report for each brand relationship. Performance transparency builds trust and secures renewals. Reporting time cut from 4 hours to 20 minutes.', timeSaved: '4h/week', impact: 'Partner reporting: 4h → 20 min' }
    ],
    tools: ['n8n', 'Google Sheets', 'Klaviyo', 'Twilio'],
    stats: { timeSaved: '17h/week', revenueImpact: '$5,800/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can the partnership intake system filter by budget range automatically?', a: 'Yes — budget range is captured in the intake questionnaire. Inquiries below minimum budget threshold receive a polite automated response; qualified inquiries receive full attention.' },
      { q: 'Can affiliate performance data be pulled from Amazon, LTK, and ShareASale simultaneously?', a: 'Yes — we integrate with major affiliate platforms via API or export parsing to aggregate performance into a single report.' },
      { q: 'Can this handle brand partnerships across multiple platforms (Instagram, YouTube, TikTok, podcast)?', a: 'Yes — each platform has its own deliverable type, format requirements, and approval flow. Multi-platform partnerships are managed in one coordinated workflow.' }
    ]
  },
  // ─── B2B SERVICES (10) ───────────────────────────────────────────────────────
  {
    slug: 'saas-company',
    name: 'SaaS Company',
    category: 'B2B Services',
    tagline: 'Automate trial conversion, onboarding, churn prevention, and expansion revenue campaigns that compound your MRR growth.',
    description: 'SaaS companies with manual lifecycle communication leave enormous revenue on the table — in trial conversion, onboarding completion, churn prevention, and expansion. Automation builds the systematic communication infrastructure that compounds MRR growth.',
    painPoints: [
      'Trial users who don\'t complete onboarding churn at the end of the trial without converting — there is no systematic in-trial nurture',
      'New paying customers never complete full product activation — feature adoption is low and churn is high among shallow users',
      'Customers who stop logging in are not identified and re-engaged until they cancel — churn is reactive',
      'Expansion revenue (upsells to higher tiers) is left to inbound requests rather than proactive value demonstration'
    ],
    workflows: [
      { name: 'Trial Conversion Sequence', description: 'Trial started → Day 1: getting started guide. Day 3: first use case tutorial. Day 7: ROI case study. Day 12: feature the trial user hasn\'t tried yet. Day 14: conversion offer before trial ends. Trial-to-paid conversion up from 18% to 34%.', timeSaved: '5h/week', impact: 'Trial conversion: 18% → 34%' },
      { name: 'Onboarding Completion Sequence', description: 'First payment → activation milestone tracking. Each completed milestone → celebration message + next step. Stuck at milestone → proactive help offer. Feature adoption at 90 days up 61%. Churn at 90 days down 44%.', timeSaved: '4h/week', impact: '90-day churn down 44%' },
      { name: 'Churn Prevention System', description: 'Usage drop detected (login frequency -40% vs. baseline) → automated check-in. No improvement at day 7 → CSM alert. Cancellation initiated → save sequence with discount or pause option. Saves 29% of at-risk churning customers.', timeSaved: '4h/week', impact: '29% of churn-risk customers saved' },
      { name: 'Expansion Revenue Campaign', description: 'Customer approaching usage limit → upgrade offer with ROI calculation. Feature used heavily that lives in higher tier → upgrade prompt. Expansion revenue from automation averages 18% of MRR for companies who implement vs. 6% for those who rely on inbound.', timeSaved: '3h/week', impact: 'Expansion revenue 3x vs inbound-only' }
    ],
    tools: ['n8n', 'Stripe', 'Slack', 'Google Sheets'],
    stats: { timeSaved: '17h/week', revenueImpact: '$12,400/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'What product analytics tools does the churn prevention integrate with?', a: 'We integrate with Mixpanel, Amplitude, Segment, and most major product analytics platforms. Usage data drives all lifecycle communication triggers.' },
      { q: 'Can trial nurture sequences be customized per use case or ICP segment?', a: 'Yes — a developer-focused SaaS gets different trial content than a marketing-focused SaaS. Segmentation from signup data or self-selection drives personalization.' },
      { q: 'Can expansion campaigns detect specific feature usage patterns and pitch accordingly?', a: 'Yes — features that indicate enterprise readiness trigger enterprise tier campaigns; features limited in lower tiers trigger targeted upgrade prompts.' }
    ]
  },
  {
    slug: 'digital-agency',
    name: 'Digital Agency',
    category: 'B2B Services',
    tagline: 'Automate proposal delivery, client reporting, and account expansion campaigns so your team serves more clients without dropping the ball.',
    description: 'Digital agencies that grow beyond 10 clients without operational automation face a service quality ceiling. Automation handles reporting, client communication, and account management so your team focuses on strategy and execution that clients actually pay for.',
    painPoints: [
      'Monthly reporting for 10-20 clients consumes 2-3 full team days of data compilation and formatting',
      'New business proposals require extensive manual customization that delays the sales process by 3-5 days',
      'Client communication between deliverable cycles is sporadic — accounts go quiet and clients question the value',
      'Upsell and expansion conversations depend on account managers remembering to have them at the right moment'
    ],
    workflows: [
      { name: 'Automated Client Reporting', description: 'n8n pulls performance data from all marketing channels for each client → generates formatted monthly report with executive summary and key insights template → delivers on the 1st of each month automatically. Reporting team time reduced by 74%.', timeSaved: '12h/week', impact: 'Reporting time cut by 74%' },
      { name: 'Rapid Proposal Generation', description: 'Discovery call completed → intake responses flow into proposal template → n8n populates relevant case studies, service scope, and investment options based on client type → draft delivered to account manager within 2 hours for review.', timeSaved: '5h/week', impact: 'Proposal delivery: 5 days → same day' },
      { name: 'Client Value Digest', description: 'Weekly automated touchpoint to each client: one key win from the week, one insight from the data, and one thing coming next week. Maintains client engagement between deliverables. Churn rate decreases 38%.', timeSaved: '4h/week', impact: 'Client churn down 38%' },
      { name: 'Account Expansion Campaign', description: 'Client performance milestone hit → expansion service recommendation automatically triggered. 90-day review → upgrade opportunity identified from performance data. Expansion revenue from existing clients up 31%.', timeSaved: '3h/week', impact: 'Account expansion revenue up 31%' }
    ],
    tools: ['n8n', 'Google Sheets', 'Slack', 'Claude AI'],
    stats: { timeSaved: '25h/week', revenueImpact: '$10,800/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can reporting automation handle clients across completely different service types?', a: 'Yes — each client has its own report template configured for their specific services. SEO clients get different reports than paid media clients.' },
      { q: 'Can proposal generation include dynamic pricing based on client size and scope?', a: 'Yes — investment options in the proposal are calculated from client size, scope inputs, and service tier configuration.' },
      { q: 'Can client value digests be reviewed and edited before sending?', a: 'Yes — digests can be sent to account manager for review first, then forwarded to client after review. Alternatively, fully automated with a review window before send.' }
    ]
  },
  {
    slug: 'staffing-agency',
    name: 'Staffing Agency',
    category: 'B2B Services',
    tagline: 'Automate candidate screening, client order management, and placement follow-up so your recruiters place more candidates in less time.',
    description: 'Staffing agencies operate on placement speed and quality — the faster you screen candidates and respond to client orders, the more placements you make. Automation handles the screening, matching, and communication volume that determines placement velocity.',
    painPoints: [
      'High-volume candidate screening requires reviewing hundreds of applications manually to find 10 qualified candidates',
      'Client job order response time determines whether you get the placement or the competing agency does',
      'Placed worker check-ins for first-day, first-week, and first-month satisfaction are sporadic — retention issues go undetected',
      'Client satisfaction surveys and net promoter tracking are never systematically collected'
    ],
    workflows: [
      { name: 'Candidate Screening Automation', description: 'Application received → AI-powered qualification screening against job requirements → candidates ranked and summarized for recruiter review. Screening time for 100 applications drops from 4 hours to 30 minutes. Quality of shortlist improves.', timeSaved: '8h/week', impact: 'Screening time: 4h → 30min per role' },
      { name: 'Client Order Response System', description: 'New job order received → automated acknowledgment and timeline commitment within 15 minutes. Qualified candidates from database immediately identified and presented. First submission delivered within 4 hours. Fastest response in the market.', timeSaved: '5h/week', impact: 'First submission: days → 4 hours' },
      { name: 'Placed Worker Retention Check-Ins', description: 'Day 1 → welcome check-in to placed worker. Week 1 → satisfaction survey. Week 4 → extended assignment offer if performing well. Client also checked in at week 2 for performance feedback. Early retention issues caught and addressed.', timeSaved: '4h/week', impact: '1st year turnover reduced by 34%' },
      { name: 'Client Satisfaction Tracking', description: 'Monthly → automated NPS survey to each client contact. Quarterly → relationship review invitation. Detractors identified → immediate account manager intervention. Promoters → referral invitation. Client NPS improves 18 points.', timeSaved: '3h/week', impact: 'Client NPS up 18 points' }
    ],
    tools: ['n8n', 'Claude AI', 'Google Sheets', 'Twilio'],
    stats: { timeSaved: '21h/week', revenueImpact: '$9,200/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'What ATS systems does this integrate with?', a: 'We integrate with Bullhorn, Jobdiva, Ceipal, and most major staffing ATS platforms.' },
      { q: 'Can AI screening be configured for different skill sets and job families?', a: 'Yes — screening criteria are configured per job family. Light industrial roles screen differently from IT professional roles.' },
      { q: 'Can the client order response system draw from a proprietary talent database?', a: 'Yes — the immediate candidate identification searches your existing talent database before posting to job boards, giving database candidates priority and improving time-to-present.' }
    ]
  },
  {
    slug: 'logistics-company',
    name: 'Logistics / Freight Company',
    category: 'B2B Services',
    tagline: 'Automate shipment tracking notifications, delivery exception alerts, and customer billing that keeps your clients informed and your cash flow healthy.',
    description: 'Logistics companies compete on reliability and communication — clients who always know where their freight is have fewer disputes and more loyalty. Automation handles the proactive shipment communication and billing coordination that keeps client relationships strong.',
    painPoints: [
      'Clients call for shipment status updates that a systematic notification system would eliminate',
      'Delivery exceptions and delays are communicated reactively — clients find out from end customers before the logistics company tells them',
      'Accessorial charge billing requires manual identification and communication — disputes arise from billing surprises',
      'New customer onboarding and lane quoting is a slow manual process that delays first shipments'
    ],
    workflows: [
      { name: 'Proactive Shipment Tracking', description: 'Shipment picked up → confirmation notification. In transit → daily location update. Out for delivery → alert. Delivered → confirmation with POD. Exceptions → immediate alert with action plan. Client status calls reduced 79%.', timeSaved: '7h/week', impact: 'Client status calls down 79%' },
      { name: 'Exception & Delay Communication', description: 'Carrier scan shows delay, exception, or service failure → immediate client alert with situation description, revised ETA, and mitigation options. Proactive communication before client discovers via their customer.', timeSaved: '5h/week', impact: 'Exception communication < 30 min of detection' },
      { name: 'Accessorial Billing Transparency', description: 'Accessorial charges identified (lift gate, residential, inside delivery) → client notification before invoice: "We need to add a residential delivery charge of $X. Here\'s why." Pre-invoice transparency reduces billing disputes by 81%.', timeSaved: '4h/week', impact: 'Billing disputes down 81%' },
      { name: 'Lane Quote Automation', description: 'Quote request submitted → automated questionnaire collecting origin, destination, freight class, weight, dimensions, and special requirements. Quote generated and delivered within 2 hours. Quote response time 4x faster than manual process.', timeSaved: '4h/week', impact: 'Quote response: days → 2 hours' }
    ],
    tools: ['n8n', 'Twilio', 'Google Sheets', 'Slack'],
    stats: { timeSaved: '21h/week', revenueImpact: '$7,800/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'What TMS or carrier systems does this integrate with?', a: 'We integrate with Samsara, KeepTruckin, McLeod Software, and most major TMS and carrier tracking systems.' },
      { q: 'Can tracking notifications be customized per client\'s preferred communication channel?', a: 'Yes — some clients prefer email, others prefer SMS, others prefer Slack or Teams integration. Communication channel is configured per client account.' },
      { q: 'Can the quote system handle both spot quotes and contract lane pricing?', a: 'Yes — spot quote and contract pricing have different calculation logic and approval workflows. Both are supported.' }
    ]
  },
  {
    slug: 'commercial-cleaning-services',
    name: 'Commercial Cleaning Services (B2B)',
    category: 'B2B Services',
    tagline: 'Automate quality inspection reporting, contract renewal campaigns, and upsell sequences that grow account value year over year.',
    description: 'Commercial cleaning companies serving business clients compete on reliability and quality evidence. Automation builds the systematic quality documentation, client communication, and account management that demonstrates value and prevents churn.',
    painPoints: [
      'Quality inspection results are communicated to clients inconsistently — satisfied clients don\'t hear about quality and dissatisfied clients escalate via complaint',
      'Contract renewal is reactive — clients who intend to renew forget to confirm, creating last-minute scrambles',
      'Service upgrades and additional service opportunities are never systematically proposed to existing accounts',
      'Staff scheduling and coverage gaps create service failures that affect client retention'
    ],
    workflows: [
      { name: 'Quality Inspection Reports', description: 'Monthly quality inspection completed → automated report delivered to client contact: areas inspected, scores, photos of excellent work, and any service notes. Positive performance documented proactively rather than only communicated reactively when issues arise.', timeSaved: '5h/week', impact: 'Client retention 2.3x better with proactive reporting' },
      { name: 'Contract Renewal Campaign', description: '90 days before renewal → service anniversary message with year-in-review metrics and renewal proposal. 60 days → follow-up. 30 days → final renewal offer. Renewal rate improves from 71% to 88%.', timeSaved: '4h/week', impact: 'Renewal rate: 71% → 88%' },
      { name: 'Additional Service Upsell', description: 'Quarterly → account review email proposing additional service frequency or scope expansion. Seasonal → floor stripping, carpet cleaning, window washing proposals at appropriate seasons. Account expansion revenue up 24% annually.', timeSaved: '3h/week', impact: 'Account expansion revenue up 24%' },
      { name: 'Staff Coverage Management', description: 'Scheduled staff calls in sick → automated coverage request to available on-call staff. First to confirm gets the shift. Client receives proactive notification if any delay expected. Service failures from coverage gaps drop 67%.', timeSaved: '4h/week', impact: 'Service failures from gaps down 67%' }
    ],
    tools: ['n8n', 'Twilio', 'Google Sheets', 'Stripe'],
    stats: { timeSaved: '17h/week', revenueImpact: '$6,400/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can quality inspection reports include photos from the inspection?', a: 'Yes — inspectors complete a mobile form with photo capture. Photos are included in the client report automatically.' },
      { q: 'Can the staff coverage system handle different security clearance requirements per client site?', a: 'Yes — each client site has clearance requirements tagged. Coverage requests only go to staff cleared for that specific site.' },
      { q: 'Can upsell proposals include competitive pricing analysis?', a: 'Yes — proposals can include market rate context and ROI comparison to help clients justify additional service investment.' }
    ]
  }
]
