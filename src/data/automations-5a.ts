import type { Profession } from './automations-1'

export const professions5a: Profession[] = [
  // ─── EDUCATION (15) ──────────────────────────────────────────────────────────
  {
    slug: 'tutoring-center',
    name: 'Tutoring Center',
    category: 'Education',
    tagline: 'Automate enrollment follow-up, session reminders, and progress reports so your tutors teach and your center grows without adding admin staff.',
    description: 'Tutoring centers compete on outcomes and communication — parents who feel informed stay enrolled. Automation handles the enrollment pipeline, session reminders, and progress reporting that differentiate professional centers from individual tutors.',
    painPoints: [
      'Enrollment inquiries require multiple follow-up calls before parents commit — delayed follow-up loses enrollments to competitors',
      'Student no-shows waste tutor time and create scheduling gaps that are expensive to fill',
      'Progress reporting to parents is sporadic and inconsistent — parents who don\'t see progress don\'t re-enroll',
      'Seasonal enrollment surges (back-to-school, SAT prep) require marketing campaigns that are never systematically executed'
    ],
    workflows: [
      { name: 'Enrollment Inquiry Follow-Up', description: 'Inquiry submitted → immediate response with program options, pricing, and scheduling link for assessment call. Day 2 → follow-up if no booking. Day 5 → final follow-up with social proof. Enrollment conversion from inquiry up 41%.', timeSaved: '5h/week', impact: 'Enrollment conversion up 41%' },
      { name: 'Session Reminder System', description: '24 hours before session → SMS reminder to parent and student. 1 hour before → final reminder. No-show rate drops from 16% to under 4%. Empty tutor slots eliminated.', timeSaved: '3h/week', impact: 'No-shows: 16% → 4%' },
      { name: 'Weekly Progress Reports', description: 'Session completed → tutor fills 3-minute progress form → automated parent report compiled and sent: skills practiced, improvement noted, homework assigned, next session focus. Parents see progress; retention increases 38%.', timeSaved: '4h/week', impact: 'Student retention up 38%' },
      { name: 'Seasonal Enrollment Campaigns', description: 'August → back-to-school enrollment push. October → PSAT/SAT prep announcement. January → semester recovery campaign. Each campaign targeted to the right age group from student records. Seasonal enrollment 2.1x higher.', timeSaved: '3h/week', impact: 'Seasonal enrollment 2.1x higher' }
    ],
    tools: ['n8n', 'Twilio', 'Google Sheets', 'Typeform'],
    stats: { timeSaved: '16h/week', revenueImpact: '$4,200/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can progress reports be customized per subject and grade level?', a: 'Yes — math tutoring reports look different from reading or SAT prep reports. Templates are configured per subject with relevant metrics and vocabulary.' },
      { q: 'What scheduling platforms does this integrate with?', a: 'We integrate with Acuity, Calendly, TutorBird, and most scheduling tools used by tutoring centers.' },
      { q: 'Can the enrollment campaign segment by age and grade level?', a: 'Yes — elementary, middle, and high school students get different campaign messaging and offers.' }
    ]
  },
  {
    slug: 'online-course-creator',
    name: 'Online Course Creator',
    category: 'Education',
    tagline: 'Automate your course launch, student completion sequences, and upsell campaigns so your course revenue compounds without repeat launches.',
    description: 'Online course creators invest enormous effort into launch campaigns but leave most of their revenue potential in post-enrollment engagement. Students who complete courses buy more; students who don\'t complete churn without upsell. Automation handles both.',
    painPoints: [
      'Student completion rates average 10-15% — students enroll, watch 2 lessons, and disappear',
      'Course launch email sequences are manually written each launch instead of evergreened into evergreen funnels',
      'Students who complete courses are never systematically offered the next program — upsell is left to chance',
      'Affiliate partners promote inconsistently because there is no systematic communication or performance reporting'
    ],
    workflows: [
      { name: 'Student Completion Sequence', description: 'Student completes each module → celebration message + preview of next module. Day 3 inactive → check-in SMS. Day 7 → re-engagement offer (coaching call or accountability partner). Completion rates up from 12% to 41%.', timeSaved: '4h/week', impact: 'Completion rate: 12% → 41%' },
      { name: 'Evergreen Launch Funnel', description: 'New lead enters funnel → 7-day automated launch sequence: problem education, social proof, course preview, FAQ, testimonials, and enrollment close. Runs continuously without any manual intervention. Revenue no longer dependent on launches.', timeSaved: '8h/week', impact: 'Revenue decoupled from live launches' },
      { name: 'Post-Completion Upsell Sequence', description: 'Course completed → celebration email + next-level program offer. Day 3 → transformation story from advanced program graduate. Day 7 → limited-time enrollment offer. 34% of completers enroll in next program within 30 days.', timeSaved: '3h/week', impact: '34% completers upsell in 30 days' },
      { name: 'Affiliate Partner Management', description: 'Monthly affiliate performance report delivered automatically to each partner with clicks, enrollments, and commission earned. New promotional assets delivered when launched. Affiliate engagement doubles.', timeSaved: '3h/week', impact: 'Affiliate revenue up 2.1x' }
    ],
    tools: ['n8n', 'Twilio', 'Kajabi API', 'Google Sheets'],
    stats: { timeSaved: '19h/week', revenueImpact: '$7,800/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'What course platforms does this integrate with?', a: 'We integrate with Kajabi, Teachable, Thinkific, Podia, and most major course platforms. Module completion data drives all student engagement sequences.' },
      { q: 'Can the evergreen funnel be customized per traffic source?', a: 'Yes — cold traffic from ads gets a different sequence than warm traffic from podcast appearances or organic content. Multiple funnel variants run simultaneously.' },
      { q: 'Can completion sequences adapt to students who are ahead of schedule vs. behind?', a: 'Yes — ahead-of-schedule students get advanced bonus content; behind-schedule students get re-engagement and support resources. Both are triggered by completion data.' }
    ]
  },
  {
    slug: 'music-school',
    name: 'Music School',
    category: 'Education',
    tagline: 'Automate lesson scheduling, practice reminders, and recital communication so your instructors focus on teaching and your school retains more students.',
    description: 'Music schools live on long-term student retention — students who stick through the first year tend to continue for many years. Automation builds the communication and engagement infrastructure that gets students through the critical first 90 days and keeps families engaged long-term.',
    painPoints: [
      'Students quit in the first 3 months because motivation dips and parents don\'t see enough progress — communication and engagement are critical',
      'Lesson scheduling changes create back-and-forth with parents that consumes instructor and admin time',
      'Recital coordination requires reaching every student and parent with dates, requirements, and performance details',
      'Annual enrollment renewal is reactive — families leave when the year ends without anyone asking them to stay'
    ],
    workflows: [
      { name: 'New Student Engagement Sequence', description: 'Enrollment confirmed → welcome sequence: lesson preparation tips, what to expect first 3 months, practice schedule guide. Day 30 → milestone celebration + encourage message. Day 60 → progress check-in. First-year retention up 44%.', timeSaved: '4h/week', impact: 'First-year retention up 44%' },
      { name: 'Practice Reminder System', description: 'Practice days determined at enrollment → automated practice reminders via SMS to student/parent at scheduled practice time. Tracks "practiced today?" responses. Weekly practice report sent to instructor. Practice frequency 3x with reminders vs. without.', timeSaved: '3h/week', impact: 'Practice frequency 3x with reminders' },
      { name: 'Recital Coordination Automation', description: 'Recital date set → automated sequence to all families: date announcement, repertoire requirements, rehearsal schedule, dress code, and day-of logistics. One coordinated communication campaign replaces dozens of individual instructor messages.', timeSaved: '5h/week', impact: 'Recital coordination fully automated' },
      { name: 'Annual Renewal Campaign', description: '6 weeks before summer break → re-enrollment campaign with year-in-review progress summary, next level curriculum preview, and enrollment link. 74% re-enrollment rate vs. 52% passive rate.', timeSaved: '3h/week', impact: 'Re-enrollment: 52% → 74%' }
    ],
    tools: ['n8n', 'Twilio', 'Google Sheets', 'Jackrabbit'],
    stats: { timeSaved: '16h/week', revenueImpact: '$3,600/month', deploymentDays: 7, roiMonths: 2 },
    faq: [
      { q: 'Can practice reminders be set for different days and times per student?', a: 'Yes — each student\'s practice schedule is set at enrollment. Reminders go out on the specific days and times that family chose.' },
      { q: 'What studio management software does this integrate with?', a: 'We integrate with Jackrabbit, Music Teacher\'s Helper, MyMusicStaff, and most major studio management platforms.' },
      { q: 'Can recital communication handle different programs (guitar, piano, voice) with different requirements?', a: 'Yes — each instrument program has its own recital requirements and communication templates.' }
    ]
  },
  {
    slug: 'martial-arts-school',
    name: 'Martial Arts School / Dojo',
    category: 'Education',
    tagline: 'Automate belt test enrollment, class reminders, and parent communication so your instructors develop students instead of chasing admin tasks.',
    description: 'Martial arts schools combine fitness, character development, and long-term skill progression — a powerful proposition that most schools fail to communicate consistently. Automation handles the belt progression communication, attendance tracking, and parent engagement that builds lifelong students.',
    painPoints: [
      'Students who miss classes for 2-3 weeks rarely return without proactive re-engagement from the school',
      'Belt test enrollment is announced verbally and tracked manually — many qualified students don\'t test because they miss the announcement',
      'Parent communication about student progress is inconsistent — parents who don\'t see progress don\'t renew memberships',
      'Trial class follow-up is manual and inconsistent — the highest-converting touchpoint in the student journey is handled worst'
    ],
    workflows: [
      { name: 'Trial Class Conversion Sequence', description: 'Trial class attended → same-day follow-up email + SMS to parent. Day 2 → student-specific assessment and enrollment invitation. Day 5 → final follow-up with special offer. Trial-to-enrollment conversion up 58%.', timeSaved: '4h/week', impact: 'Trial conversion up 58%' },
      { name: 'Attendance-Based Re-Engagement', description: 'Student misses 2 consecutive classes → automated check-in SMS to parent. 4 classes missed → instructor personal call trigger. Re-engagement before students formally quit. Dropout rate reduced by 47%.', timeSaved: '3h/week', impact: 'Dropout rate reduced by 47%' },
      { name: 'Belt Test Promotion Sequence', description: 'Student meets hours and skill requirements → automated belt test invitation with test date, requirements, and enrollment link. Parents and students notified. Belt test participation up from 61% to 89% of qualified students.', timeSaved: '3h/week', impact: 'Belt test participation: 61% → 89%' },
      { name: 'Monthly Progress Reports', description: 'Monthly → parent receives automated progress report: classes attended, skills mastered this month, next belt requirements, and instructor note. Parents engaged with student progress; membership renewal rate up 34%.', timeSaved: '3h/week', impact: 'Membership renewal up 34%' }
    ],
    tools: ['n8n', 'Twilio', 'Mindbody', 'Google Sheets'],
    stats: { timeSaved: '14h/week', revenueImpact: '$3,900/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can attendance tracking integrate with our check-in system?', a: 'Yes — we integrate with Mindbody, Zen Planner, Kicksite, and most major martial arts software. Attendance data drives all re-engagement triggers.' },
      { q: 'Can belt test invitations be customized per belt level and age group?', a: 'Yes — children\'s belt tests and adult belt tests have different communication tone, requirement descriptions, and fee structures.' },
      { q: 'Can the system handle multiple program types (kids, teens, adults, BJJ, Muay Thai)?', a: 'Yes — each program has its own communication templates, belt progression sequences, and event notifications.' }
    ]
  },
  {
    slug: 'language-school',
    name: 'Language School',
    category: 'Education',
    tagline: 'Automate student placement, class level progression, and conversation practice scheduling so your school grows enrollment without growing admin overhead.',
    description: 'Language schools manage complex enrollment — placement levels, multiple language programs, varied student paces — and most handle it entirely manually. Automation systematizes enrollment, tracks progression, and re-engages students who pause their studies.',
    painPoints: [
      'Placement assessment coordination requires multiple back-and-forth messages before a new student is properly placed',
      'Students who complete one level need immediate enrollment guidance for the next level — delays cause dropout',
      'Adult students who pause their studies are rarely re-engaged with a systematic "comeback" campaign',
      'Conversation practice hour scheduling is managed manually despite being a high-demand, schedulable resource'
    ],
    workflows: [
      { name: 'Enrollment & Placement Automation', description: 'Enrollment inquiry → automated placement quiz delivered immediately. Results scored → correct level recommendation sent to student with enrollment options and schedule. Placement-to-enrollment process reduced from 5 days to same-day.', timeSaved: '5h/week', impact: 'Placement-to-enrollment: 5 days → same day' },
      { name: 'Level Progression Communication', description: 'Student passes level → immediate congratulations message + next level course options and enrollment link. Same-day re-enrollment offer keeps momentum. Level-to-level continuation rate up 41%.', timeSaved: '3h/week', impact: 'Level continuation rate up 41%' },
      { name: 'Paused Student Win-Back', description: '30 days after last class → re-engagement SMS. 60 days → special return offer. 90 days → final win-back campaign with progress reminder (how far they\'ve come). 29% of paused students return with systematic re-engagement.', timeSaved: '3h/week', impact: '29% of paused students returned' },
      { name: 'Conversation Practice Scheduling', description: 'Native speaker availability posted → students receive automated booking notification for their level and language. Sessions self-scheduled via link. No manual scheduling coordination for the highest-demand supplemental offering.', timeSaved: '4h/week', impact: 'Conversation practice capacity fully utilized' }
    ],
    tools: ['n8n', 'Twilio', 'Calendly', 'Google Sheets'],
    stats: { timeSaved: '16h/week', revenueImpact: '$3,800/month', deploymentDays: 7, roiMonths: 2 },
    faq: [
      { q: 'Can the placement quiz handle multiple languages with different assessment structures?', a: 'Yes — each language program has its own placement assessment. Spanish placement differs from Mandarin placement in format and scoring.' },
      { q: 'Can this work for a hybrid in-person and online language school?', a: 'Yes — in-person and online students receive appropriately different communication regarding class location, technology setup, and scheduling.' },
      { q: 'Can corporate language training clients be managed separately from individual students?', a: 'Yes — corporate accounts with multiple employees have their own enrollment coordination, progress reporting to HR, and billing workflows.' }
    ]
  },
  {
    slug: 'yoga-studio',
    name: 'Yoga Studio',
    category: 'Education',
    tagline: 'Fill every class, retain more members, and automate the new student journey so first-timers become long-term practitioners.',
    description: 'Yoga studios live on membership retention and class utilization. Most studios have a leaky bucket — new students come in from promotions but leave before establishing a habit. Automation handles the new student journey, class fills from cancellations, and membership renewal that build a sustainable practice community.',
    painPoints: [
      'New students who attend once and don\'t return represent the biggest revenue loss — there is no systematic first-30-day engagement',
      'Classes with cancellations sit unfilled because waitlist notification is manual and slow',
      'Membership renewal conversations are awkward and reactive — members who should renew cancel because no one asked proactively',
      'Workshop and special event promotion reaches only the social media audience, leaving most existing students unreached'
    ],
    workflows: [
      { name: 'New Student Onboarding Journey', description: 'First class completed → same-day welcome message with beginner guide. Day 3 → class recommendation based on first class type. Day 7 → check-in and second class offer. Day 14 → intro membership offer. 44% of new students who complete this journey become members.', timeSaved: '4h/week', impact: '44% new student → member conversion' },
      { name: 'Class Fill Automation', description: 'Cancellation received → instant notification to waitlisted students for that class and time slot. First to respond gets the spot. Class utilization increases from 71% to 89% average.', timeSaved: '3h/week', impact: 'Class utilization: 71% → 89%' },
      { name: 'Membership Renewal Sequence', description: '30 days before membership expiry → personalized renewal offer with classes attended this year and what\'s coming next season. 14 days → second message. 7 days → final offer. Renewal rate up from 63% to 81%.', timeSaved: '3h/week', impact: 'Renewal rate: 63% → 81%' },
      { name: 'Workshop & Event Promotion', description: 'Workshop or special event scheduled → SMS + email announcement to full student list with early bird pricing. 1-week reminder. 48-hour final push. Event revenue doubles with systematic multi-touch promotion vs. social-only.', timeSaved: '2h/week', impact: 'Workshop revenue doubled' }
    ],
    tools: ['n8n', 'Twilio', 'Mindbody', 'Google Sheets'],
    stats: { timeSaved: '13h/week', revenueImpact: '$3,400/month', deploymentDays: 7, roiMonths: 2 },
    faq: [
      { q: 'What studio management software does this integrate with?', a: 'We integrate with Mindbody, Pike13, Zen Planner, and most major studio software.' },
      { q: 'Can class recommendations be based on a student\'s level and previous classes attended?', a: 'Yes — class recommendations are filtered by level and style based on the student\'s class history.' },
      { q: 'Can the system handle both drop-in students and members in the same workflows?', a: 'Yes — members and drop-in students have separate workflows with appropriate pricing and renewal logic.' }
    ]
  },
  {
    slug: 'driving-school',
    name: 'Driving School',
    category: 'Education',
    tagline: 'Automate lesson scheduling, DMV test preparation reminders, and parent updates so your instructors drive and your office runs without constant oversight.',
    description: 'Driving schools serve a student with a fixed, urgent timeline — get licensed before school starts, before a job starts, before a deadline. Automation manages the scheduling urgency, lesson reminders, and DMV preparation communication that turns an anxious student into a licensed driver and a referral source.',
    painPoints: [
      'Lesson scheduling requires multiple coordination calls between student, parent, and instructor — a 20-minute process for a 10-minute transaction',
      'DMV test date reminders and preparation checklists are sent manually to each student — time-consuming and often missed',
      'Parent communication about teen student progress is inconsistent — parents who feel informed are more satisfied and more likely to refer',
      'Completed students are never asked for referrals or Google reviews despite being highly satisfied'
    ],
    workflows: [
      { name: 'Lesson Scheduling Automation', description: 'Enrollment confirmed → automated scheduling link sent to student/parent showing instructor availability. Lesson confirmed → calendar invitation to all parties. Day-before reminder. No manual scheduling coordination required.', timeSaved: '5h/week', impact: 'Scheduling time eliminated' },
      { name: 'DMV Prep Sequence', description: '2 weeks before DMV test date → automated preparation checklist and practice test resource delivery. 1 week → final preparation guide. Day before → documentation checklist. Test day → good luck message. Anxiety reduced; first-time pass rate up.', timeSaved: '2h/week', impact: 'First-time DMV pass rate improved' },
      { name: 'Parent Progress Updates', description: 'After each lesson → parent receives automated progress note: skills practiced, areas for improvement, lessons remaining. Parents feel involved in teen\'s progress. Satisfaction scores higher; referral rate increases 31%.', timeSaved: '3h/week', impact: 'Referral rate up 31%' },
      { name: 'License Celebration & Referral', description: 'Student passes DMV test → automated congratulations + review request + referral invitation with discount code for friends and siblings. Highest referral moment in the student journey, systematically captured.', timeSaved: '2h/week', impact: '1 referral per 3.4 licensed students' }
    ],
    tools: ['n8n', 'Twilio', 'Calendly', 'Google Sheets'],
    stats: { timeSaved: '13h/week', revenueImpact: '$2,800/month', deploymentDays: 7, roiMonths: 2 },
    faq: [
      { q: 'Can scheduling handle multiple instructors with different availability?', a: 'Yes — each instructor\'s availability is independently managed. Students are matched to the appropriate instructor based on location, vehicle type, and schedule.' },
      { q: 'Can the system handle both teen and adult learner programs separately?', a: 'Yes — teen programs (with parent communication) and adult programs have completely separate workflows.' },
      { q: 'Can DMV prep content be customized per state?', a: 'Yes — DMV requirements and test content vary by state. Templates are configured for the specific state\'s requirements.' }
    ]
  },
  {
    slug: 'personal-trainer',
    name: 'Personal Trainer',
    category: 'Education',
    tagline: 'Automate client check-ins, workout delivery, and package renewals so you train more clients without working more hours.',
    description: 'Personal trainers sell fitness transformation but lose hours to administrative tasks — scheduling, check-ins, workout delivery, and renewal conversations. Automation handles the operational layer so your working hours are spent training, not administrating.',
    painPoints: [
      'Between-session accountability depends on trainers manually texting clients — inconsistent and time-consuming at scale',
      'Workout program delivery via email or WhatsApp is manual and disorganized — clients lose their programs',
      'Package renewal conversations are avoided until packages expire — revenue is reactive rather than predictable',
      'Nutrition and lifestyle tracking between sessions provides no data to the trainer unless clients self-report manually'
    ],
    workflows: [
      { name: 'Between-Session Accountability', description: 'On non-training days → automated check-in SMS with specific questions tied to current phase goals: "Did you hit 8,000 steps today?" "Rate your sleep 1-5." Responses logged. Trainer reviews digest before each session.', timeSaved: '4h/week', impact: '2.8x better client goal achievement' },
      { name: 'Workout Delivery System', description: 'Training session complete → next workout delivered automatically via SMS or email with exercise descriptions and video links. Client always knows the next workout. Drop-off from "I forgot my program" eliminated.', timeSaved: '3h/week', impact: 'Program adherence up 3.1x' },
      { name: 'Package Renewal Campaign', description: '3 sessions remaining → automated renewal message with current package pricing and progress summary. 1 session remaining → urgent renewal offer. Renewal rate increases from 51% to 76% with proactive sequencing.', timeSaved: '3h/week', impact: 'Renewal rate: 51% → 76%' },
      { name: 'Nutrition & Lifestyle Tracking', description: 'Daily nutrition check-in SMS: simplified macro or food quality question. Weekly weigh-in reminder. Biweekly progress photo prompt. Collected data summarized for trainer before session — making every session data-informed.', timeSaved: '2h/week', impact: 'Sessions more data-informed' }
    ],
    tools: ['n8n', 'Twilio', 'Stripe', 'Google Sheets'],
    stats: { timeSaved: '13h/week', revenueImpact: '$3,200/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can accountability check-ins be customized per client\'s current program phase?', a: 'Yes — cutting phase questions differ from building phase questions. Check-ins update when the trainer changes the client\'s program phase.' },
      { q: 'Can workout delivery include video demonstrations?', a: 'Yes — exercise links can point to YouTube, app videos, or your own hosted content. Delivery message includes links specific to each exercise in the session.' },
      { q: 'Can this handle both in-person and online training clients?', a: 'Yes — in-person clients get session-based check-ins; online clients get more frequent digital touchpoints. Both run from the same system.' }
    ]
  },
  {
    slug: 'swim-school',
    name: 'Swim School',
    category: 'Education',
    tagline: 'Automate level advancement, makeup class scheduling, and parent communication so your instructors focus on safety and skill — not administrative chaos.',
    description: 'Swim schools manage complex enrollment with level progressions, makeup classes, seasonal schedule changes, and safety-critical parent communication. Automation handles every routine communication touchpoint so your team focuses on water safety and skill development.',
    painPoints: [
      'Level advancement assessments are communicated inconsistently — students ready to advance don\'t know they\'ve qualified',
      'Makeup class scheduling is a manual coordination process that creates scheduling conflicts and frustrated parents',
      'Seasonal schedule changes require mass communication that\'s handled manually and never reaches all families',
      'End-of-season recertification and enrollment renewal is reactive — families don\'t hear from the school until they decide to leave'
    ],
    workflows: [
      { name: 'Level Advancement Notification', description: 'Student reaches skill benchmarks → automated notification to parent with advancement details, next level description, and enrollment link for the next level class. Advancement communication that was previously verbal and forgettable becomes documented and actionable.', timeSaved: '4h/week', impact: 'Level-to-level continuation up 38%' },
      { name: 'Makeup Class Scheduling', description: 'Class missed → automated makeup class notification sent to parent with available makeup slots and 1-click booking. Makeup class fill rate increases from 34% to 79%. No manual coordination required.', timeSaved: '4h/week', impact: 'Makeup fill rate: 34% → 79%' },
      { name: 'Schedule Change Communication', description: 'Schedule change confirmed → automated mass notification to all affected families with new schedule details and re-enrollment option if needed. Every family notified simultaneously, correctly.', timeSaved: '3h/week', impact: 'Schedule communication errors eliminated' },
      { name: 'Seasonal Re-Enrollment Campaign', description: '5 weeks before season end → re-enrollment invitation to all current families. Early enrollment discount for 2 weeks. Level-specific next-class recommendation included. Re-enrollment rate up from 61% to 82%.', timeSaved: '3h/week', impact: 'Re-enrollment: 61% → 82%' }
    ],
    tools: ['n8n', 'Twilio', 'Jackrabbit', 'Google Sheets'],
    stats: { timeSaved: '15h/week', revenueImpact: '$3,500/month', deploymentDays: 7, roiMonths: 2 },
    faq: [
      { q: 'Can this handle multi-child families with students at different levels?', a: 'Yes — each child in a family is tracked individually. Parents receive separate communications per child, or consolidated family digests — configurable per family preference.' },
      { q: 'What swim school management software does this integrate with?', a: 'We integrate with Jackrabbit, IClassPro, and most major swim school management platforms.' },
      { q: 'Can makeup class booking enforce pool capacity limits?', a: 'Yes — makeup class slots are created per available pool capacity. Once a slot is full, it no longer appears as available in the booking system.' }
    ]
  },
  {
    slug: 'dance-studio',
    name: 'Dance Studio',
    category: 'Education',
    tagline: 'Automate recital coordination, costume ordering, and annual re-enrollment so your team teaches and your studio grows year over year.',
    description: 'Dance studios are community businesses built on long-term student relationships — but the operational work of recitals, costume coordination, and schedule management consumes enormous staff time. Automation handles the entire administrative cycle.',
    painPoints: [
      'Recital coordination involves reaching every family with dates, costume requirements, rehearsal times, and ticket sales — a massive manual effort',
      'Costume ordering requires collecting measurements, colors, and sizes from hundreds of families by a specific deadline',
      'New student inquiry response is slow because the front desk is consumed with current student coordination',
      'Annual re-enrollment is passive — students and parents assume they\'re enrolled next season without anyone confirming'
    ],
    workflows: [
      { name: 'Recital Coordination Campaign', description: 'Recital date set → 8-week automated campaign: announcement, costume order deadline, rehearsal schedule, ticket sales link, dress rehearsal reminder, and show day logistics. One campaign replaces weeks of manual family communication.', timeSaved: '8h/week', impact: 'Recital admin time cut by 80%' },
      { name: 'Costume Order Collection', description: 'Costume order deadline set → automated measurement and selection form sent to each family with class-specific costume options. Deadline reminder at 3 days. Orders compiled automatically for submission to costume vendor.', timeSaved: '5h/week', impact: 'Costume collection fully automated' },
      { name: 'New Student Inquiry Response', description: 'Inquiry submitted → immediate automated response with class options by age, schedule, pricing, and trial class booking link. Converts 38% more inquiries to enrolled students from faster, more complete responses.', timeSaved: '3h/week', impact: 'Inquiry conversion up 38%' },
      { name: 'Annual Re-Enrollment Campaign', description: '8 weeks before season end → re-enrollment invitation with year-in-review for each student and next year class options. 4 weeks → early bird deadline. 2 weeks → final enrollment notice. Re-enrollment rate: 58% → 79%.', timeSaved: '4h/week', impact: 'Re-enrollment: 58% → 79%' }
    ],
    tools: ['n8n', 'Twilio', 'Jackrabbit', 'Stripe'],
    stats: { timeSaved: '21h/week', revenueImpact: '$4,100/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can the recital campaign handle multiple shows and casts differently?', a: 'Yes — each show, cast, or performance group receives appropriately segmented communication with their specific rehearsal times and performance details.' },
      { q: 'Can costume collection handle complex ordering with multiple sizes per dancer?', a: 'Yes — dancers in multiple classes receive consolidated costume collection requests with all their required pieces in one form.' },
      { q: 'Can the system communicate differently with competition team families vs. recreational students?', a: 'Yes — competition team families receive additional communication about competition schedules, fees, and requirements separate from the recreational program.' }
    ]
  },
  {
    slug: 'coding-bootcamp',
    name: 'Coding Bootcamp / Tech Training',
    category: 'Education',
    tagline: 'Automate student progress tracking, employer introduction sequences, and alumni engagement so your outcomes data drives more enrollment.',
    description: 'Coding bootcamps are sold on outcomes — job placement rates and salary increases. Automation helps achieve those outcomes by keeping students engaged through the program, accelerating job placement after graduation, and building the alumni network that drives future enrollment.',
    painPoints: [
      'Students who fall behind in curriculum rarely catch up without early detection and intervention — dropout is expensive and reputationally damaging',
      'Job placement after graduation depends on students self-initiating outreach to employers — an inefficient process',
      'Alumni are an underutilized asset for referrals, mentorship, and job placement that requires systematic engagement',
      'Employer partner relationships depend on individual instructor relationships rather than institutional communication systems'
    ],
    workflows: [
      { name: 'Student Progress Monitoring', description: 'Daily assignment submission tracked → students 2+ assignments behind trigger instructor alert. Automated encouragement message + office hours invitation sent to at-risk student. Early intervention reduces dropout from 18% to 7%.', timeSaved: '5h/week', impact: 'Dropout rate: 18% → 7%' },
      { name: 'Job Placement Sequence', description: 'Graduation → automated 8-week job search support sequence: resume review invitation, LinkedIn optimization guide, employer introduction introductions, interview prep resources, and weekly accountability check-ins. Placement timeline 40% shorter.', timeSaved: '4h/week', impact: 'Placement timeline 40% shorter' },
      { name: 'Employer Partner Communication', description: 'Monthly automated newsletter to employer partners: hiring availability, cohort skills and technologies, featured graduate profiles, and campus recruiting event invitations. Partner engagement doubles from systematic communication.', timeSaved: '3h/week', impact: 'Employer partner engagement doubled' },
      { name: 'Alumni Network Engagement', description: 'Quarterly alumni update: cohort achievements, mentorship opportunities, referral program, and events. Alumni who remain engaged refer 3.4x more prospective students than unengaged alumni.', timeSaved: '2h/week', impact: 'Alumni referral rate 3.4x higher' }
    ],
    tools: ['n8n', 'Slack', 'Google Sheets', 'Twilio'],
    stats: { timeSaved: '15h/week', revenueImpact: '$5,200/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can the progress monitoring integrate with our LMS or project submission system?', a: 'Yes — we integrate with Canvas, Moodle, GitHub Classroom, and most LMS platforms. Submission data drives at-risk detection automatically.' },
      { q: 'Can employer introductions be personalized to each graduate\'s skills and preferences?', a: 'Yes — employer introductions match graduate skills, preferred role type, and location to relevant employer partners in the network.' },
      { q: 'Can the alumni system handle graduates from multiple cohorts and tracks?', a: 'Yes — full-stack, data science, and cybersecurity alumni are segmented and receive relevant content for their specific track.' }
    ]
  },
  {
    slug: 'art-school',
    name: 'Art School / Studio',
    category: 'Education',
    tagline: 'Automate class enrollment, workshop promotion, and supply list delivery so your instructors create and your studio fills every seat.',
    description: 'Art schools and creative studios have a passionate student base that responds enthusiastically to new workshops, supplies, and community events — if they hear about them. Automation builds the direct communication channel that fills classes and creates a loyal creative community.',
    painPoints: [
      'Workshop announcements via social media reach a fraction of past students who would have enrolled if they knew',
      'Supply lists and preparation instructions reach students inconsistently before the first class — unprepared students have worse experiences',
      'Student artwork showcases and gallery events are poorly promoted because the promotional effort is too manual',
      'Multi-week class series have high dropout between sessions because there is no between-session engagement'
    ],
    workflows: [
      { name: 'Workshop Enrollment Campaign', description: 'New workshop announced → SMS and email to full past student list segmented by medium (watercolor list, oil painting list, pottery list). Early bird window with deadline. Enrollment averages 2.8x higher than social-only announcement.', timeSaved: '3h/week', impact: 'Workshop enrollment 2.8x higher' },
      { name: 'Class Preparation Delivery', description: 'Enrollment confirmed → automated supply list, preparation instructions, parking/access information, and what-to-expect guide delivered immediately. Students arrive prepared. First-class experience dramatically better.', timeSaved: '3h/week', impact: 'First-class preparation dramatically improved' },
      { name: 'Between-Session Engagement', description: 'Between workshop sessions → practice prompt or technique tip SMS. Student artwork sharing invitation. Connection to what they\'ll create next session. Multi-week completion rates up from 67% to 88%.', timeSaved: '2h/week', impact: 'Multi-week completion: 67% → 88%' },
      { name: 'Gallery & Showcase Promotion', description: 'Student showcase scheduled → multi-touch promotional campaign to students, their networks, and local community arts contacts. Event attendance doubles with systematic promotion vs. flyer-only approach.', timeSaved: '2h/week', impact: 'Event attendance doubled' }
    ],
    tools: ['n8n', 'Twilio', 'Google Sheets', 'Stripe'],
    stats: { timeSaved: '11h/week', revenueImpact: '$2,600/month', deploymentDays: 7, roiMonths: 2 },
    faq: [
      { q: 'Can supply list automation handle different supply requirements per workshop level?', a: 'Yes — beginner, intermediate, and advanced workshops each have their own supply lists and preparation guides.' },
      { q: 'Can enrollment campaigns segment by the specific medium a student has taken before?', a: 'Yes — students who have taken pottery receive pottery workshop announcements; watercolor students receive watercolor workshops. Cross-promotion is configurable.' },
      { q: 'Can the system handle both drop-in classes and multi-week series differently?', a: 'Yes — drop-in registrations get simple confirmation; multi-week series get the full between-session engagement sequence.' }
    ]
  },
  {
    slug: 'test-prep-company',
    name: 'Test Prep Company',
    category: 'Education',
    tagline: 'Automate study plan delivery, practice test reminders, and score report follow-up so every student has the preparation infrastructure to reach their target score.',
    description: 'Test prep companies sell score improvement — and score improvement depends on consistent study habits between sessions that most students don\'t maintain without systematic accountability. Automation builds the study accountability infrastructure that improves outcomes and drives referrals.',
    painPoints: [
      'Students who don\'t study between sessions make slow progress — there is no system to maintain study accountability',
      'Practice test scheduling and score report delivery is handled manually for each student',
      'Enrollment peaks around test registration deadlines but the marketing to capture those peaks is inconsistent',
      'Successful students who achieve their target score are never asked for testimonials or referrals at the right moment'
    ],
    workflows: [
      { name: 'Study Plan Accountability System', description: 'Weekly study plan delivered every Monday. Friday → study completion check-in. Students who don\'t complete their plan receive a weekend catch-up prompt. Students with accountability systems score 94 points higher on average than those without.', timeSaved: '4h/week', impact: 'Average score improvement 94 pts higher' },
      { name: 'Practice Test Scheduling', description: 'Study plan milestone reached → automated practice test invitation with available test times and booking link. Score report delivered automatically with section analysis within 24 hours of completion. Feedback loop without manual delivery.', timeSaved: '3h/week', impact: 'Practice test cadence fully automated' },
      { name: 'Test Date Enrollment Campaign', description: 'SAT/ACT/GRE registration deadlines → targeted enrollment push to students in the right grade and test timeline window. Score improvement guarantee messaging drives urgency. Enrollment from campaigns up 44%.', timeSaved: '3h/week', impact: 'Campaign enrollment up 44%' },
      { name: 'Score Achievement Follow-Up', description: 'Student achieves target score → celebration message + testimonial request + referral invitation for friends preparing for the same test. Highest-conversion referral moment in the student journey, systematically captured.', timeSaved: '2h/week', impact: '1 referral per 3.8 successful students' }
    ],
    tools: ['n8n', 'Twilio', 'Google Sheets', 'Stripe'],
    stats: { timeSaved: '13h/week', revenueImpact: '$3,700/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can the study accountability system adapt to different test timelines?', a: 'Yes — a 3-month SAT preparation schedule differs from a 6-week LSAT intensive. Study plan delivery and milestone timing are configured per program.' },
      { q: 'Can practice test score analysis be automated?', a: 'Standardized score reports can be parsed to extract section scores and generate performance summaries. Test-specific analysis depth depends on the format of the score report.' },
      { q: 'Can the enrollment campaign segment by target test and grade level?', a: 'Yes — SAT prep messaging targets high school juniors and seniors specifically; GRE prep targets college seniors and graduates. Each test has its own campaign.' }
    ]
  },
  {
    slug: 'corporate-training-company',
    name: 'Corporate Training Company',
    category: 'Education',
    tagline: 'Automate program delivery, participant tracking, and employer reporting so you run more training engagements at higher margin.',
    description: 'Corporate training providers deliver high-value programs to business clients — but much of the delivery overhead (scheduling, reminders, completion tracking, and reporting) is administrative work that should be automated. Automation handles the operational layer so your trainers focus on facilitating, not coordinating.',
    painPoints: [
      'Participant scheduling and enrollment for multi-session corporate programs requires extensive coordination with HR and managers',
      'Program completion tracking for compliance and certification purposes is manual and prone to errors',
      'Client reporting on training outcomes and participation rates requires manual data compilation from scattered sources',
      'Annual training contract renewal conversations happen reactively when proactive automation would initiate them at the right moment'
    ],
    workflows: [
      { name: 'Participant Enrollment Coordination', description: 'Training engagement confirmed → automated enrollment invitation sent to each participant with program schedule, pre-work requirements, and login/access instructions. HR receives enrollment completion dashboard. Coordination time per engagement cut by 71%.', timeSaved: '6h/week', impact: 'Enrollment coordination cut by 71%' },
      { name: 'Session Reminders & Pre-Work Delivery', description: '48 hours before each session → reminder to all participants with session agenda, pre-work due, and any preparation required. Pre-work completion increases from 34% to 78% with automated delivery and reminder.', timeSaved: '4h/week', impact: 'Pre-work completion: 34% → 78%' },
      { name: 'Completion & Certification Tracking', description: 'Session attended → attendance automatically recorded. All sessions completed → certificate generated and delivered. Completion data compiled into client report. Compliance documentation maintained without manual tracking.', timeSaved: '5h/week', impact: 'Certification tracking fully automated' },
      { name: 'Contract Renewal Campaign', description: '90 days before contract end → automated renewal proposal: training outcomes summary, participation data, ROI metrics, and next program recommendations. 68% renewal rate on automated proposals vs. 41% reactive.', timeSaved: '3h/week', impact: 'Contract renewal rate: 41% → 68%' }
    ],
    tools: ['n8n', 'Google Sheets', 'Typeform', 'DocuSign'],
    stats: { timeSaved: '19h/week', revenueImpact: '$7,200/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can completion tracking integrate with our LMS?', a: 'Yes — we integrate with TalentLMS, Cornerstone, Docebo, and most major corporate LMS platforms.' },
      { q: 'Can the system handle different completion requirements for different roles within the same organization?', a: 'Yes — managers and individual contributors often have different required modules. The system tracks completion against each participant\'s specific requirements.' },
      { q: 'Can reporting be delivered in a format that works with the client\'s HR systems?', a: 'Yes — reports are delivered in the format preferred by each client: PDF for executives, CSV for HR data systems, or direct API delivery where supported.' }
    ]
  },
  // ─── TRAVEL (13) ─────────────────────────────────────────────────────────────
  {
    slug: 'travel-agency',
    name: 'Travel Agency',
    category: 'Travel',
    tagline: 'Automate trip follow-up, travel document delivery, and post-trip review collection so your agents book more and coordinate less.',
    description: 'Travel agencies live on the quality of the client experience — and client experience extends from the first inquiry through the post-trip follow-up that generates the next booking. Automation handles every communication touchpoint in that journey so your agents focus on designing great itineraries.',
    painPoints: [
      'Inquiry response time is a primary booking decision factor — slow responses lose bookings to online booking platforms',
      'Pre-departure document delivery (itineraries, confirmation numbers, hotel vouchers) is assembled and sent manually for each traveler',
      'Post-trip follow-up for reviews and repeat booking is sporadic — the highest-value communication in the client relationship is often skipped',
      'Passport and vaccination requirement reminders are never sent proactively — clients scramble to prepare at the last minute'
    ],
    workflows: [
      { name: 'Instant Inquiry Response', description: 'Travel inquiry submitted → immediate automated response with destination guide, pricing range, and consultation booking link. Day 2 follow-up if no booking. Inquiry-to-consultation conversion up 38%.', timeSaved: '4h/week', impact: 'Inquiry conversion up 38%' },
      { name: 'Pre-Departure Document Delivery', description: '7 days before departure → complete travel document package: itinerary, confirmations, hotel vouchers, local contacts, and emergency information. 48 hours before → packing reminder and day-of logistics. Every traveler perfectly prepared.', timeSaved: '5h/week', impact: 'Pre-departure calls eliminated' },
      { name: 'Post-Trip Follow-Up Sequence', description: '2 days after return → "welcome home" check-in with review request. Day 14 → trip highlights request for portfolio. Day 30 → next trip inspiration based on preferences. 41% of post-trip clients book again within 12 months.', timeSaved: '3h/week', impact: '41% rebooking rate within 12 months' },
      { name: 'Passport & Visa Reminder System', description: 'Departure date set → automated passport expiry check reminder. Visa requirements communicated per destination. Vaccination requirements delivered at 8 weeks and 4 weeks before departure. No last-minute documentation crises.', timeSaved: '2h/week', impact: 'Documentation issues eliminated' }
    ],
    tools: ['n8n', 'Twilio', 'Google Sheets', 'Calendly'],
    stats: { timeSaved: '15h/week', revenueImpact: '$5,400/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can document delivery be customized per trip type — cruise vs. land tour vs. custom itinerary?', a: 'Yes — each trip type has its own document package template. Cruise clients receive port information; custom itinerary clients receive hotel addresses and transfer details.' },
      { q: 'Can post-trip recommendations be personalized based on the trip they just took?', a: 'Yes — clients who went to Europe get different next-destination suggestions than clients who took a Caribbean cruise.' },
      { q: 'Can this work for group travel in addition to individual bookings?', a: 'Yes — group travel has additional coordination: group itinerary distribution, participant document collection, and group payment tracking workflows.' }
    ]
  },
  {
    slug: 'tour-operator',
    name: 'Tour Operator',
    category: 'Travel',
    tagline: 'Automate booking confirmation, pre-tour preparation, and post-tour review collection so every guest becomes a promoter.',
    description: 'Tour operators compete on experience quality — but the communication around that experience (before, during, and after) determines whether guests leave as passive customers or active promoters. Automation builds systematic pre and post-tour communication that fills tours and generates reviews.',
    painPoints: [
      'Booking confirmation communication is basic — guests receive a receipt but no preparation information that builds anticipation and reduces no-shows',
      'Day-of logistics (meeting points, what to wear, what to bring) are communicated inconsistently and forgotten by guests',
      'Review requests depend on guides remembering to ask verbally — most satisfied guests never leave reviews',
      'Last-minute cancellations leave open spots that could be filled from a waitlist with systematic notification'
    ],
    workflows: [
      { name: 'Booking Confirmation & Anticipation Sequence', description: 'Booking confirmed → immediate confirmation with meeting point map and parking. 1 week before → what to expect, what to wear, what to bring. 48 hours → day-of logistics reminder. Day of → "see you soon" with weather forecast. No-shows drop from 12% to 3%.', timeSaved: '4h/week', impact: 'No-shows: 12% → 3%' },
      { name: 'Waitlist Slot Fill System', description: 'Cancellation received → instant notification to all waitlisted guests. First to confirm gets the spot. Cancellation revenue recovered. 84% of slots filled within 2 hours.', timeSaved: '2h/week', impact: '84% cancellations filled in 2 hours' },
      { name: 'Post-Tour Review Campaign', description: '4 hours after tour → review request via SMS with direct Google, TripAdvisor, and Viator links. Timing when experience is fresh generates 6x more reviews than next-day email requests.', timeSaved: '2h/week', impact: '6x more reviews vs next-day email' },
      { name: 'Rebooking & Referral Sequence', description: '7 days post-tour → curated recommendation for next tour experience based on what they did. Referral invitation with discount for friends. 24% of guests rebook or refer within 60 days.', timeSaved: '2h/week', impact: '24% rebook or refer within 60 days' }
    ],
    tools: ['n8n', 'Twilio', 'Google Sheets', 'Fareharbor API'],
    stats: { timeSaved: '11h/week', revenueImpact: '$3,600/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'What tour booking platforms does this integrate with?', a: 'We integrate with FareHarbor, Bokun, Peek Pro, Checkfront, and most major tour operator booking systems.' },
      { q: 'Can pre-tour communication be customized per tour type?', a: 'Yes — hiking tours get different preparation guides than food tours or city walking tours. Each tour type has its own preparation template.' },
      { q: 'Can review requests direct guests to the specific platform that matters most for the tour type?', a: 'Yes — Viator reviews for tours listed on Viator, Google reviews for local tour traffic, TripAdvisor for international guests. Platform prioritization is configurable.' }
    ]
  },
  {
    slug: 'hotel-boutique',
    name: 'Boutique Hotel / B&B',
    category: 'Travel',
    tagline: 'Automate guest pre-arrival communication, upsell offers, and review collection so every stay generates maximum revenue and a 5-star rating.',
    description: 'Boutique hotels and bed & breakfasts compete with chains on personalized experience — but most independent properties deliver that personalization inconsistently because it depends on whoever is working that day. Automation makes the personalized experience systematic and consistent.',
    painPoints: [
      'Pre-arrival upsell opportunities (room upgrades, spa packages, dining reservations) are never systematically offered',
      'Check-in and property information communication is inconsistent — some guests arrive fully informed, others arrive confused',
      'Review collection is verbal at checkout — most guests mean to review and forget within 24 hours',
      'Past guests are never re-engaged for return visits despite the highest conversion rate of any guest segment'
    ],
    workflows: [
      { name: 'Pre-Arrival Experience Sequence', description: '7 days before check-in → welcome email with local recommendations and property highlights. 3 days → upsell offer for room upgrade, spa package, or dining reservation. 48 hours → check-in instructions and parking. 100% of guests perfectly prepared.', timeSaved: '5h/week', impact: 'Upsell revenue up 34%' },
      { name: 'In-Stay Engagement', description: 'Day 2 of multi-night stay → mid-stay check-in SMS. Any issues → immediate escalation to property manager. No issues → local experience recommendation for remaining days. Issues resolved before checkout; satisfaction protected.', timeSaved: '2h/week', impact: 'Mid-stay issues resolved before checkout' },
      { name: 'Post-Stay Review Sequence', description: '2 hours after checkout → review request via SMS and email with direct links to Google, TripAdvisor, and booking platform. Response rate 8x higher than verbal asking. 4.9★ consistently maintained.', timeSaved: '2h/week', impact: '4.9★ average across all platforms' },
      { name: 'Return Guest Campaign', description: 'Anniversary of last stay → "we miss you" email with return guest discount. Seasonal special offers to past guests before public availability. Past guests convert at 4.8x the rate of new leads.', timeSaved: '2h/week', impact: 'Past guest conversion 4.8x higher' }
    ],
    tools: ['n8n', 'Twilio', 'Google Sheets', 'Cloudbeds API'],
    stats: { timeSaved: '12h/week', revenueImpact: '$4,800/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'What PMS systems does this integrate with?', a: 'We integrate with Cloudbeds, Little Hotelier, Mews, and most boutique hotel property management systems.' },
      { q: 'Can upsell offers be personalized based on the guest\'s booking type?', a: 'Yes — a guest booking a romantic getaway package gets spa and dining upsells; a business traveler gets airport transfer and late checkout offers.' },
      { q: 'Can this handle multi-property boutique groups?', a: 'Yes — each property has its own guest communication and branding. Group-level reporting aggregates performance across properties.' }
    ]
  },
  {
    slug: 'vacation-rental-management',
    name: 'Vacation Rental Management Company',
    category: 'Travel',
    tagline: 'Automate guest communication, owner reporting, and maintenance coordination across your entire property portfolio.',
    description: 'Vacation rental management companies scale by adding properties — but manual guest communication and owner reporting create a coordination ceiling. Automation handles the guest experience and owner relationships that determine whether property owners stay with your management company.',
    painPoints: [
      'Guest communication across dozens of properties requires manual attention that doesn\'t scale beyond 15-20 properties per manager',
      'Property owner monthly reports are assembled manually from scattered booking, revenue, and maintenance data',
      'Maintenance issues reported by guests require manual coordination between guest, maintenance team, and owner',
      'Property owner retention depends on communication quality — owners who don\'t hear from you proactively find other managers'
    ],
    workflows: [
      { name: 'Guest Experience Automation', description: 'Booking confirmed → automated welcome sequence: confirmation, pre-arrival guide, check-in instructions, digital guidebook, and mid-stay check-in. All personalized to the specific property. Guest experience consistent across all properties regardless of volume.', timeSaved: '10h/week', impact: 'Guest experience consistent at any scale' },
      { name: 'Property Owner Monthly Reports', description: 'Month-end → automated owner report: bookings, revenue, occupancy rate, maintenance completed, expenses, and next month\'s bookings. Every owner receives a professional report without manager involvement.', timeSaved: '7h/week', impact: 'Owner reports fully automated' },
      { name: 'Maintenance Issue Routing', description: 'Guest reports issue → automated maintenance request created → routed to appropriate vendor → guest receives ETA → maintenance confirmed → owner notified with cost. Zero manual coordination for standard maintenance issues.', timeSaved: '5h/week', impact: 'Maintenance coordination fully automated' },
      { name: 'Owner Retention Communication', description: 'Quarterly performance review delivered to each owner. Seasonal market updates. Improvement recommendations. Annual renewal conversation initiated automatically. Owner retention rate improves from 71% to 88%.', timeSaved: '4h/week', impact: 'Owner retention: 71% → 88%' }
    ],
    tools: ['n8n', 'Twilio', 'Hostaway API', 'Google Sheets'],
    stats: { timeSaved: '27h/week', revenueImpact: '$7,400/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'What vacation rental software does this integrate with?', a: 'We integrate with Hostaway, Guesty, Lodgify, OwnerRez, and most major VRM platforms.' },
      { q: 'Can the system handle properties with different owners and different management agreements?', a: 'Yes — each property has its own configuration reflecting the specific owner agreement, commission structure, and reporting preferences.' },
      { q: 'Can maintenance routing differentiate between owner-expense and guest-damage repairs?', a: 'Yes — maintenance is categorized at intake. Owner expense repairs route to owner notification; potential guest damage items route to damage documentation and security deposit workflows.' }
    ]
  },
  {
    slug: 'travel-photographer',
    name: 'Travel Photographer / Vacation Photographer',
    category: 'Travel',
    tagline: 'Automate booking, gallery delivery, and review collection so more of your beach and destination shoots become 5-star reviews and referrals.',
    description: 'Vacation and destination photographers have a unique window — they work with emotionally high moments (honeymoons, family vacations, proposals) that generate tremendous goodwill and referral potential when the experience is delivered correctly. Automation captures that moment.',
    painPoints: [
      'Booking inquiries from tourists and honeymooners expire quickly — slow response loses the job to another photographer',
      'Shoot logistics coordination (meeting location, what to wear, timeline) is sent manually for each booking',
      'Gallery delivery involves manual upload notification and download instructions for every session',
      'Review and referral requests are never made at the right moment — the post-shoot high dissipates quickly without a prompt'
    ],
    workflows: [
      { name: 'Rapid Booking Response', description: 'Inquiry received → instant automated response with availability, packages, and booking link. Day 2 follow-up if no booking. Speed advantage captures tourists who need to book before their trip begins.', timeSaved: '3h/week', impact: 'Booking rate from inquiries up 44%' },
      { name: 'Pre-Shoot Preparation Sequence', description: 'Booking confirmed → preparation guide: what to wear, location meeting point, timeline, and what to expect. 24 hours before → reminder. Clients arrive prepared; shoot quality improves.', timeSaved: '2h/week', impact: 'Client preparation 100% consistent' },
      { name: 'Gallery Delivery & Announcement', description: 'Gallery ready → instant notification via SMS and email with download link, print ordering options, and social sharing guidance. Fastest delivery among competitors; memories captured and delivered.', timeSaved: '1h/week', impact: 'Gallery delivery fully automated' },
      { name: 'Review & Referral Collection', description: '24 hours after gallery delivery → review request while emotions are still high. Day 7 → referral invitation for friends and family with upcoming trips to the destination. High emotional moment converts to reviews and referrals at 3x standard rates.', timeSaved: '1h/week', impact: 'Reviews and referrals at 3x standard rates' }
    ],
    tools: ['n8n', 'Twilio', 'Stripe', 'Google Sheets'],
    stats: { timeSaved: '8h/week', revenueImpact: '$2,400/month', deploymentDays: 7, roiMonths: 2 },
    faq: [
      { q: 'Can the booking system handle different session types — beach, engagement, family — with different pricing?', a: 'Yes — each session type has its own intake form, pricing, and preparation guide.' },
      { q: 'Can the referral invitation be location-specific — referring friends visiting the same destination?', a: 'Yes — referral messages can mention the specific destination and the type of experience, making referrals highly relevant to travel planning discussions.' },
      { q: 'Can gallery delivery include print ordering integration?', a: 'Yes — we integrate with print labs like Pixieset, ShootProof, and most major gallery and print fulfillment platforms.' }
    ]
  },
  {
    slug: 'boat-charter-company',
    name: 'Boat Charter Company',
    category: 'Travel',
    tagline: 'Automate booking confirmations, weather communication, and post-charter reviews that fill your calendar and build your reputation.',
    description: 'Boat charter businesses operate in weather-dependent, experience-driven markets where communication quality directly determines whether customers show up, stay safe, and tell their friends. Automation handles all systematic communication so captains focus on the water.',
    painPoints: [
      'Weather-related communication (delays, rescheduling, safety briefings) requires manual outreach to every booked charter',
      'Booking confirmation and pre-charter preparation information is sent manually — inconsistent and time-consuming',
      'Review collection depends on satisfied customers remembering to review after returning to dry land — most forget',
      'Off-peak season bookings drop significantly because there is no systematic marketing to past charter customers'
    ],
    workflows: [
      { name: 'Pre-Charter Preparation Sequence', description: 'Booking confirmed → confirmation email with itinerary. 48 hours before → preparation guide (what to bring, motion sickness tips, dress code, meeting time/location). Day of → weather update and any logistics adjustments. Every charter group arrives perfectly prepared.', timeSaved: '4h/week', impact: 'Pre-charter preparation fully automated' },
      { name: 'Weather Communication System', description: 'Weather event detected → automated outreach to all affected charter bookings with situation description and options (reschedule, credit, cancellation policy). No manual customer-by-customer calls during weather disruptions.', timeSaved: '3h/week', impact: 'Weather communication automated' },
      { name: 'Post-Charter Review Collection', description: '4 hours after charter return → review request SMS while the experience is fresh. Generates reviews on Google, TripAdvisor, and Viator at 5x the rate of verbal asking or next-day email.', timeSaved: '2h/week', impact: 'Review rate 5x higher' },
      { name: 'Off-Season Marketing Campaign', description: 'October → past customer email featuring fall/winter charter opportunities. January → special early-season booking discount. Past charter customers rebook at 4.2x the rate of new leads.', timeSaved: '2h/week', impact: 'Off-season bookings up 38%' }
    ],
    tools: ['n8n', 'Twilio', 'Google Sheets', 'Fareharbor API'],
    stats: { timeSaved: '12h/week', revenueImpact: '$4,100/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can the weather communication system monitor forecasts automatically?', a: 'Yes — weather API integration (Weather.gov, OpenWeatherMap) triggers alerts when conditions meet configured thresholds for your operation. Captain reviews and approves communication before it sends.' },
      { q: 'Can booking confirmation include a liability waiver for digital signature?', a: 'Yes — liability waiver is sent as part of the booking confirmation sequence via DocuSign or HelloSign. Completion is tracked and required before the charter date.' },
      { q: 'Can the system handle both fishing charters and leisure cruises with different preparation guides?', a: 'Yes — fishing charter preparation (licenses, tackle info) and leisure cruise preparation (dress code, BYOB policy) have completely different templates.' }
    ]
  },
  {
    slug: 'ski-resort-lodge',
    name: 'Ski Resort / Mountain Lodge',
    category: 'Travel',
    tagline: 'Automate lift ticket upsells, lesson booking, and return guest campaigns that maximize revenue per visitor and fill lodging before peak season.',
    description: 'Ski resorts and mountain lodges have a predictable seasonal cycle with enormous revenue opportunities — lesson bookings, equipment rentals, dining reservations, and lodge upgrades — most of which are left to guests to self-initiate. Automation captures revenue at every touchpoint.',
    painPoints: [
      'Pre-arrival upsell opportunities (ski lessons, equipment rental, dining reservations) are never systematically offered',
      'Ski school booking for families is last-minute and chaotic because there is no advance communication about availability',
      'Season pass renewal is passive — past guests aren\'t approached proactively before the season begins',
      'End-of-season off-peak periods have low occupancy because there is no targeted marketing to price-sensitive past guests'
    ],
    workflows: [
      { name: 'Pre-Arrival Upsell Sequence', description: '14 days before arrival → ski lesson booking offer with current availability. 7 days → equipment rental pre-booking link. 3 days → dining reservation and après-ski recommendations. Upsell revenue per guest increases 44%.', timeSaved: '4h/week', impact: 'Upsell revenue per guest up 44%' },
      { name: 'Ski School Advance Booking', description: 'Lodging booking confirmed → 30-day advance ski school notification for families with children. Early booking discount for the first week of the month. Ski school advance bookings double; instructors better scheduled.', timeSaved: '3h/week', impact: 'Ski school advance bookings doubled' },
      { name: 'Season Pass Renewal Campaign', description: 'August → season pass holder renewal invitation with early-bird pricing. September → price increase warning. October → final renewal window. Season pass renewal rate up from 67% to 82%.', timeSaved: '3h/week', impact: 'Season pass renewal: 67% → 82%' },
      { name: 'Off-Peak Booking Campaign', description: 'March-April → deep off-peak discount campaign to past guests. Spring skiing messaging. Specific weekday packages for flexible travelers. Off-peak occupancy improves 34%.', timeSaved: '2h/week', impact: 'Off-peak occupancy up 34%' }
    ],
    tools: ['n8n', 'Twilio', 'Google Sheets', 'Checkfront API'],
    stats: { timeSaved: '13h/week', revenueImpact: '$6,200/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can the upsell sequence be customized for expert skiers vs. beginners?', a: 'Yes — guests who book based on their skill level receive relevant offers. Beginners get lesson recommendations; experts get backcountry guide upsells.' },
      { q: 'What lodging management systems does this integrate with?', a: 'We integrate with Checkfront, ResNexus, and most major mountain resort property management systems.' },
      { q: 'Can the campaign handle both lodging guests and day visitors?', a: 'Yes — lodging guests and day visitors receive different communication tracks with appropriate offers for each guest type.' }
    ]
  },
  {
    slug: 'cruise-line-agent',
    name: 'Cruise Booking Agent',
    category: 'Travel',
    tagline: 'Automate cruise quote follow-up, document delivery, and pre-cruise excursion upsells that convert more bookings and generate more commission.',
    description: 'Cruise booking agents work on commission from high-value bookings that require persistent follow-up over long decision cycles. Automation handles the follow-up cadence and pre-cruise upsell communication that converts more inquiries and generates more per-booking revenue.',
    painPoints: [
      'Cruise quotes require multiple follow-up touches over weeks or months — manual follow-up at that cadence is impossible across a large prospect base',
      'Booking documentation (cruise line confirmations, dining reservations, shore excursion bookings) is assembled and delivered manually',
      'Pre-cruise excursion upsells happen only if the agent remembers to suggest them — significant commission is left on the table',
      'Post-cruise follow-up for future bookings is done reactively when a systematic approach would capture clients at peak travel enthusiasm'
    ],
    workflows: [
      { name: 'Cruise Quote Follow-Up Sequence', description: 'Quote sent → Day 3 check-in with pricing context. Day 7 → alternate itinerary option. Day 14 → availability urgency. Day 21 → final follow-up. Converts 34% more long-cycle cruise inquiries than manual follow-up.', timeSaved: '5h/week', impact: '34% more cruise inquiries convert' },
      { name: 'Pre-Cruise Document Package', description: '30 days before departure → complete document package: booking confirmation, boarding pass instructions, port information, and packing guide. 14 days → visa and passport reminder. 7 days → online check-in reminder. Clients feel completely prepared.', timeSaved: '3h/week', impact: 'Pre-cruise calls eliminated' },
      { name: 'Excursion Upsell Campaign', description: '45 days before departure → curated shore excursion recommendations per port with booking links. Commission from excursion bookings adds 18-24% to per-booking revenue with zero agent time.', timeSaved: '3h/week', impact: 'Revenue per booking up 18-24%' },
      { name: 'Post-Cruise Return Booking Campaign', description: '2 weeks after return → "welcome home" with cruise photos from the line if available + next cruise recommendations. 60 days → specific itinerary offer. 67% of cruisers book again within 18 months with systematic follow-up.', timeSaved: '2h/week', impact: '67% rebook within 18 months' }
    ],
    tools: ['n8n', 'Twilio', 'Google Sheets', 'Calendly'],
    stats: { timeSaved: '14h/week', revenueImpact: '$6,800/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can excursion recommendations be personalized per port and passenger age/interests?', a: 'Yes — excursion recommendations are filtered by port, passenger profiles (families vs. couples vs. seniors), and activity preferences captured at booking.' },
      { q: 'Can the document delivery sequence handle group cruise bookings with multiple cabins?', a: 'Yes — group bookings send individual documents to each cabin\'s primary contact rather than one consolidated package to the group leader.' },
      { q: 'Can the post-cruise follow-up capture feedback to improve future bookings?', a: 'Yes — a short feedback survey is included in the post-cruise follow-up. Responses inform future itinerary recommendations and flag any service issues for the cruise line relationship.' }
    ]
  },
  {
    slug: 'hostel',
    name: 'Hostel',
    category: 'Travel',
    tagline: 'Automate booking confirmations, experience recommendations, and review collection so your hostel earns top ranking on Hostelworld and Booking.com.',
    description: 'Hostels compete on community, experience, and value — but rankings on booking platforms are determined by review volume and rating. Automation builds systematic review collection and guest experience communication that drives the platform visibility that fills beds.',
    painPoints: [
      'New bookings receive a basic confirmation email but no pre-arrival communication that builds excitement and reduces questions',
      'Review collection is passive — front desk staff ask verbally during the busy checkout rush, and most guests never follow through',
      'Activity and experience recommendations are given verbally at check-in but forgotten by guests within hours',
      'Hostel events (bar nights, walking tours, cooking classes) are promoted via notice board — reaching only guests already in the building'
    ],
    workflows: [
      { name: 'Pre-Arrival Experience Sequence', description: '3 days before arrival → city guide, neighborhood tips, and what to pack for the climate. Day before → check-in instructions, locker information, and transport from airport/station. Guests arrive informed and enthusiastic.', timeSaved: '3h/week', impact: 'Check-in questions cut by 61%' },
      { name: 'In-Stay Activity Recommendations', description: 'Check-in completed → automated guide delivered to guest email with curated day-by-day activity recommendations, hidden gems, restaurant recommendations, and free city resources. Guests rate their stay higher when they have more experiences.', timeSaved: '2h/week', impact: 'Guest satisfaction scores higher' },
      { name: 'Event Promotion System', description: 'Event scheduled → notification sent to all current guests via SMS or WhatsApp with event details and sign-up link. Events promoted to all guests in building, not just those who see the notice board. Attendance doubles.', timeSaved: '2h/week', impact: 'Event attendance doubled' },
      { name: 'Review Collection at Checkout', description: 'Checkout time → automated review request via SMS with Hostelworld, Google, and Booking.com review links. Sent at checkout moment when experience is peak-fresh. Review volume increases 5x.', timeSaved: '2h/week', impact: 'Review volume 5x higher' }
    ],
    tools: ['n8n', 'Twilio', 'Google Sheets', 'Hostelworld API'],
    stats: { timeSaved: '10h/week', revenueImpact: '$2,800/month', deploymentDays: 7, roiMonths: 2 },
    faq: [
      { q: 'Can activity recommendations be customized per destination city?', a: 'Yes — each hostel location has its own curated guide. Guides are updated seasonally.' },
      { q: 'Can event notifications reach guests who haven\'t checked in yet?', a: 'Yes — upcoming guests receive event announcements for events happening during their stay as part of the pre-arrival sequence.' },
      { q: 'What booking platforms does this integrate with?', a: 'We integrate with Hostelworld, Booking.com, and most major hostel booking platforms via their data feeds.' }
    ]
  },
  {
    slug: 'scuba-diving-school',
    name: 'Scuba Diving School',
    category: 'Travel',
    tagline: 'Automate certification course enrollment, open water dive scheduling, and advanced course upsells so your instructors dive and your business grows.',
    description: 'Scuba diving schools have a clear student progression — discover scuba → open water → advanced → specialty courses — but most schools lose students between certifications because there is no systematic follow-up. Automation keeps divers progressing and diving.',
    painPoints: [
      'New students who complete Open Water certification are never systematically invited to Advanced certification',
      'Dive trip announcements reach only social media followers — most certified graduates never hear about dive expeditions',
      'Certification paperwork and PADI/NAUI registration is handled manually — creating delays and errors',
      'Equipment rental and purchase upsells are never made at the right moment in the student journey'
    ],
    workflows: [
      { name: 'Certification Progression Sequence', description: 'Open Water certified → 30-day congratulations + Advanced course invitation. 90-day follow-up. Rescue Diver invitation after Advanced completion. Each certification naturally leads to the next. Student LTV 3.1x higher with systematic progression.', timeSaved: '4h/week', impact: 'Student LTV 3.1x higher' },
      { name: 'Dive Trip Announcements', description: 'Dive trip announced → email and SMS to all certified graduates in the school database. Trip-specific diver requirements (Advanced required, nitrox recommended) used for targeting. Trip bookings double from systematic announcement.', timeSaved: '3h/week', impact: 'Dive trip bookings doubled' },
      { name: 'Certification Processing Updates', description: 'Course completed → automated PADI/NAUI registration initiated → student receives processing status updates → certification card delivery notification. Students never wait anxiously without information.', timeSaved: '2h/week', impact: 'Certification anxiety eliminated' },
      { name: 'Equipment Consultation Sequence', description: 'After Open Water certification → equipment recommendation guide sent with progression path. Consultation booking offered. Students who own equipment dive 3.8x more than renters — driving more dive trip revenue.', timeSaved: '2h/week', impact: 'Equipment consults up 3x' }
    ],
    tools: ['n8n', 'Twilio', 'Google Sheets', 'Stripe'],
    stats: { timeSaved: '12h/week', revenueImpact: '$3,900/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can the certification progression work for both PADI and NAUI programs?', a: 'Yes — both certification frameworks have their own progression milestones and course sequences. Both are supported.' },
      { q: 'Can dive trip announcements segment by certification level?', a: 'Yes — trips requiring Advanced certification only go to Advanced or higher certified graduates.' },
      { q: 'Can this work for a dive shop that offers both courses and retail equipment?', a: 'Yes — equipment purchase upsells are integrated into the post-certification sequence.' }
    ]
  },
  {
    slug: 'glamping-campsite',
    name: 'Glamping / Campsite',
    category: 'Travel',
    tagline: 'Automate arrival preparation, add-on upsells, and review collection so every guest has a remarkable experience and tells their friends.',
    description: 'Glamping and campsite businesses sell a nature escape experience — and the quality of that experience is significantly determined by preparation and communication. Automation handles the guest preparation sequence, activity upsells, and review collection that build a fully-booked campsite with a waiting list.',
    painPoints: [
      'Guests arrive unprepared for outdoor conditions — wrong clothing, forgotten items — leading to poor experiences and negative reviews',
      'Activity and add-on upsells (campfire wood, s\'mores kits, kayak rentals, guided hikes) are never systematically offered',
      'Review collection is passive — most satisfied guests drive home and never write the review they intended to',
      'Off-season bookings require marketing effort that is never systematically executed'
    ],
    workflows: [
      { name: 'Guest Preparation Sequence', description: '7 days before arrival → preparation guide: what to pack, weather forecast for their dates, arrival instructions. 3 days → activity preview with add-on booking links. Day before → final weather update and check-in time confirmation. Guests arrive perfectly prepared.', timeSaved: '4h/week', impact: 'Arrival preparation complaints eliminated' },
      { name: 'Add-On Upsell Campaign', description: '14 days before arrival → curated add-on recommendations: romantic s\'mores kit, guided sunrise hike, kayak rental, firewood delivery, camp chef dinner. 3 days → final add-on offer. Add-on revenue per booking up 61%.', timeSaved: '3h/week', impact: 'Add-on revenue per booking up 61%' },
      { name: 'Review Collection System', description: '4 hours after checkout → review request via SMS while the outdoor magic is still fresh. Multiple review platform links provided. Review volume 4x higher vs. passive collection.', timeSaved: '2h/week', impact: 'Review volume 4x higher' },
      { name: 'Return Booking Campaign', description: '3 months after stay → return booking invitation with different season messaging ("Come see the fall foliage"). 6 months → early summer availability notice. Return guests book at 5x the conversion rate of new leads.', timeSaved: '2h/week', impact: 'Return booking rate 5x vs new leads' }
    ],
    tools: ['n8n', 'Twilio', 'Google Sheets', 'Checkfront API'],
    stats: { timeSaved: '12h/week', revenueImpact: '$3,400/month', deploymentDays: 7, roiMonths: 1 },
    faq: [
      { q: 'Can add-on booking handle inventory limits (only 2 kayaks available)?', a: 'Yes — add-on inventory is tracked. Once kayak slots are full, they no longer appear as available in the add-on booking flow.' },
      { q: 'Can preparation guides be customized per season and weather conditions?', a: 'Yes — summer, fall, and winter preparation guides are distinct. Weather API integration can dynamically update preparation content based on actual forecast.' },
      { q: 'Can review requests be sent via WhatsApp for international guests?', a: 'Yes — WhatsApp messaging is available for guests with international numbers. Communication channel is configured based on guest origin.' }
    ]
  }
]
