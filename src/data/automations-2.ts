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

export const professions2: Profession[] = [
  {
    slug: "general-practitioner",
    name: "General Practitioner",
    category: "Healthcare",
    tagline: "Automate your GP practice admin so you can focus on patient care, not paperwork.",
    description: "General practitioners spend up to 40% of their day on administrative tasks like appointment scheduling, referral letters, and follow-up reminders. Automation frees clinicians from repetitive back-office work and improves patient satisfaction through timely, consistent communication.",
    painPoints: [
      "Manually calling patients to confirm or reschedule appointments leads to no-shows and wasted slots",
      "Writing referral letters and repeat prescription reminders consumes hours of clinical time weekly",
      "Patient follow-up after consultations is inconsistent, leading to poor health outcomes",
      "Billing and insurance claim submissions are error-prone and delay revenue collection"
    ],
    workflows: [
      {
        name: "Automated Appointment Reminders",
        description: "Sends SMS and email reminders 48 hours and 2 hours before each appointment, with a one-click confirm or reschedule link that updates Google Calendar in real time.",
        timeSaved: "4h/week",
        impact: "Reduces no-show rate by up to 40%"
      },
      {
        name: "Referral Letter Generation",
        description: "Claude AI drafts specialist referral letters from consultation notes, pre-populated with patient history and GP signature block, ready for review in under 2 minutes.",
        timeSaved: "3h/week",
        impact: "Cuts letter drafting time by 80%"
      },
      {
        name: "Post-Consultation Follow-Up Sequence",
        description: "Triggers a personalised follow-up SMS or email 3 days after a visit, checking on symptoms and prompting patients to book a follow-up if needed.",
        timeSaved: "2h/week",
        impact: "Increases follow-up booking rate by 30%"
      },
      {
        name: "Repeat Prescription Request Processing",
        description: "Patients submit repeat prescription requests via a Jotform, which routes to the GP inbox, auto-checks for eligibility, and confirms dispatch via SMS.",
        timeSaved: "3h/week",
        impact: "Eliminates 90% of phone-based prescription requests"
      }
    ],
    tools: ["n8n", "Claude AI", "Twilio", "Google Calendar"],
    stats: {
      timeSaved: "12h/week",
      revenueImpact: "$3,200/month",
      deploymentDays: 7,
      roiMonths: 1
    },
    faq: [
      {
        q: "Is patient data kept secure in these automations?",
        a: "Yes. All workflows are configured to comply with HIPAA and local healthcare data regulations, using encrypted connections and access-controlled integrations only."
      },
      {
        q: "Can these automations integrate with my existing practice management software?",
        a: "Most popular systems can be connected via API or Zapier. We assess your current stack during onboarding and build custom connectors where needed."
      },
      {
        q: "How long does it take to go live?",
        a: "Most GP practices are fully automated within 7 days, including data mapping, testing, and staff training."
      }
    ]
  },
  {
    slug: "dentist",
    name: "Dentist",
    category: "Healthcare",
    tagline: "Fill your dental chair every day with smart scheduling and patient follow-up automation.",
    description: "Dental practices lose significant revenue to last-minute cancellations and gaps in the appointment book that could be filled from a waitlist. Automation handles reminders, recall campaigns, and treatment plan follow-ups so your front desk can focus on in-person patient experience.",
    painPoints: [
      "Last-minute cancellations leave chairs empty and revenue on the table",
      "Six-month recall reminders are sent inconsistently, causing patients to lapse",
      "Treatment plan acceptance is low because follow-up after consultations is manual and slow",
      "New patient intake forms are paper-based, creating data entry work and filing delays"
    ],
    workflows: [
      {
        name: "Smart Cancellation & Waitlist Fill",
        description: "When a cancellation occurs, n8n instantly texts the top 5 patients on the waitlist. The first to confirm gets the slot auto-booked in the calendar, filling the chair within minutes.",
        timeSaved: "3h/week",
        impact: "Recovers up to $2,000/month in lost appointment revenue"
      },
      {
        name: "Six-Month Recall Campaign",
        description: "Automatically sends personalised recall reminders via SMS and email at 5.5 months post-visit, with a direct booking link. Unresponsive patients receive a second nudge at 6 months.",
        timeSaved: "4h/week",
        impact: "Increases recall booking rate by 35%"
      },
      {
        name: "Treatment Plan Follow-Up",
        description: "After a treatment consultation, Claude AI generates a personalised summary email explaining the recommended plan, costs, and next steps, sent automatically within 1 hour.",
        timeSaved: "2h/week",
        impact: "Lifts treatment acceptance rate by 25%"
      },
      {
        name: "Digital New Patient Intake",
        description: "New patients complete a Jotform intake form before arrival. Data is automatically added to the patient record, eliminating manual data entry and reducing check-in time.",
        timeSaved: "3h/week",
        impact: "Saves 10 minutes per new patient visit"
      }
    ],
    tools: ["n8n", "Twilio", "Jotform", "Google Calendar"],
    stats: {
      timeSaved: "12h/week",
      revenueImpact: "$4,500/month",
      deploymentDays: 7,
      roiMonths: 1
    },
    faq: [
      {
        q: "Will this work with my dental practice management software like Dentrix or Eaglesoft?",
        a: "Yes, we build connectors for all major dental PMS platforms so automations sync directly with your existing patient records and calendar."
      },
      {
        q: "Can the recall reminders be customised per patient or treatment type?",
        a: "Absolutely. Recall intervals and message content can be tailored by treatment type, patient age group, or any other attribute in your system."
      },
      {
        q: "What happens if a patient doesn't respond to the recall reminder?",
        a: "The workflow sends up to 3 reminder touchpoints across SMS and email before automatically flagging the patient for a personal call from your front desk."
      }
    ]
  },
  {
    slug: "orthodontist",
    name: "Orthodontist",
    category: "Healthcare",
    tagline: "Streamline long-term orthodontic patient journeys with intelligent automation from consult to completion.",
    description: "Orthodontic treatment spans 18–24 months, creating extensive touchpoints that are difficult to manage manually across hundreds of active patients. Automation ensures no appointment, milestone, or payment falls through the cracks, improving compliance and cash flow.",
    painPoints: [
      "Tracking progress appointments across hundreds of active patients is overwhelming for front desk staff",
      "Payment plan management and overdue balance follow-up consumes hours of admin time weekly",
      "Patients frequently miss elastics wear or oral hygiene instructions between visits, prolonging treatment",
      "Consultation-to-case acceptance follow-up is inconsistent, losing potential patients to competitors"
    ],
    workflows: [
      {
        name: "Treatment Milestone Reminders",
        description: "Sends automated check-in messages at key treatment milestones (e.g. 6 months, mid-treatment) with compliance tips and a prompt to book the next adjustment appointment.",
        timeSaved: "3h/week",
        impact: "Improves patient compliance by 30%"
      },
      {
        name: "Payment Plan Automated Billing",
        description: "Stripe charges monthly installments automatically, sends receipts, and triggers a polite overdue reminder sequence via SMS and email for any failed payments.",
        timeSaved: "4h/week",
        impact: "Reduces overdue balances by 50%"
      },
      {
        name: "Consultation Follow-Up Sequence",
        description: "Claude AI sends a personalised case summary and financing options within 2 hours of a new patient consultation, followed by automated nudges at day 3 and day 7 if no decision is made.",
        timeSaved: "2h/week",
        impact: "Increases case acceptance by 20%"
      },
      {
        name: "Retention Phase Patient Engagement",
        description: "After active treatment ends, an automated retainer care sequence sends monthly reminders about retainer wear and annual retention check-up booking prompts.",
        timeSaved: "2h/week",
        impact: "Increases retention check-up attendance by 40%"
      }
    ],
    tools: ["n8n", "Claude AI", "Stripe", "Twilio"],
    stats: {
      timeSaved: "11h/week",
      revenueImpact: "$5,000/month",
      deploymentDays: 7,
      roiMonths: 1
    },
    faq: [
      {
        q: "Can the payment automation handle different payment plan structures?",
        a: "Yes, the system supports fixed monthly installments, custom schedules, and one-time payments, all configurable per patient during onboarding."
      },
      {
        q: "How does the system handle patients who want to pause treatment?",
        a: "Workflows can be paused per patient with a single click, and automatically resume when the patient reactivates their treatment plan."
      },
      {
        q: "Is the consultation follow-up content customisable?",
        a: "Yes, Claude AI generates messages based on your practice tone and the specific treatment plan discussed, which you can review and adjust before messages go live."
      }
    ]
  },
  {
    slug: "optometrist",
    name: "Optometrist",
    category: "Healthcare",
    tagline: "Boost optical sales and patient retention with automated eye exam recalls and eyewear follow-ups.",
    description: "Optometry practices rely heavily on annual recall visits and optical retail sales, both of which benefit enormously from timely, personalised automation. Consistent recall reminders and post-exam follow-ups keep patients engaged and drive frame and lens revenue.",
    painPoints: [
      "Annual eye exam recall reminders are sent in batches by hand, missing patients who slip through the cracks",
      "Post-exam optical recommendations are not followed up, leaving frame and lens sales on the table",
      "Contact lens reorder reminders are inconsistent, causing patients to lapse to online retailers",
      "Insurance benefit expiry reminders are rarely sent, causing patients to lose benefits and not visit"
    ],
    workflows: [
      {
        name: "Annual Recall Reminder Campaign",
        description: "Automatically contacts patients 11 months after their last exam via SMS and email, with a personalised message and direct booking link. A second reminder fires at 12 months if no appointment is made.",
        timeSaved: "4h/week",
        impact: "Increases annual recall rate by 35%"
      },
      {
        name: "Contact Lens Reorder Reminders",
        description: "Based on lens supply duration at purchase, automated reminders prompt patients to reorder 2 weeks before they run out, with a direct link to your online store or a reply to call.",
        timeSaved: "2h/week",
        impact: "Retains 25% more contact lens patients from online competitors"
      },
      {
        name: "Insurance Benefit Expiry Alerts",
        description: "Pulls insurance benefit data from your system and sends automated reminders to patients with unused benefits expiring in 60, 30, and 7 days, driving urgency to book.",
        timeSaved: "3h/week",
        impact: "Converts $1,500+/month in previously unused insurance-covered visits"
      },
      {
        name: "Post-Exam Optical Follow-Up",
        description: "Sends a follow-up message 48 hours after an exam to patients who did not purchase eyewear, featuring their prescription summary and a personalised frame recommendation link.",
        timeSaved: "2h/week",
        impact: "Increases optical conversion rate by 15%"
      }
    ],
    tools: ["n8n", "Twilio", "Google Calendar", "HubSpot"],
    stats: {
      timeSaved: "11h/week",
      revenueImpact: "$3,800/month",
      deploymentDays: 7,
      roiMonths: 1
    },
    faq: [
      {
        q: "Can the system track which patients have which insurance benefits?",
        a: "Yes, we integrate with your practice management software to pull benefit data and trigger reminders based on each patient's specific plan and expiry date."
      },
      {
        q: "What if a patient has already booked when the recall reminder fires?",
        a: "The workflow checks for existing upcoming appointments before sending, so patients who are already booked will not receive duplicate reminders."
      },
      {
        q: "Can I customise the contact lens reorder timing per product?",
        a: "Yes, reorder trigger dates are set per lens SKU based on the supply quantity purchased, ensuring reminders fire at the right time for each patient."
      }
    ]
  },
  {
    slug: "pharmacist",
    name: "Pharmacist",
    category: "Healthcare",
    tagline: "Automate prescription refill reminders and medication adherence follow-ups for your pharmacy.",
    description: "Pharmacies that proactively remind patients about refills and medication adherence retain more customers and generate predictable recurring revenue. Automation replaces manual phone calls with smart, multi-channel outreach that patients actually respond to.",
    painPoints: [
      "Patients forget to pick up or refill prescriptions, leading to abandoned fills and wasted dispensing costs",
      "Manual phone calls for prescription ready notifications consume pharmacist and technician time",
      "Medication adherence reminders are rarely sent, resulting in poor patient outcomes and lost refill revenue",
      "Managing special-order medication arrival notifications is done ad hoc and inconsistently"
    ],
    workflows: [
      {
        name: "Prescription Ready Notification",
        description: "Automatically sends an SMS to patients the moment their prescription is ready for pickup, reducing wait time inquiries and improving pickup rates.",
        timeSaved: "4h/week",
        impact: "Reduces abandoned fills by 30%"
      },
      {
        name: "Refill Due Reminder Sequence",
        description: "7 days before a patient is expected to run out of a chronic medication, an automated SMS and email remind them to request a refill or enable auto-refill.",
        timeSaved: "3h/week",
        impact: "Increases refill adherence by 40%"
      },
      {
        name: "Medication Adherence Check-In",
        description: "For patients on new medications, an automated check-in message fires at day 7 and day 30 asking if they have any questions or side effects, with a prompt to speak to the pharmacist.",
        timeSaved: "2h/week",
        impact: "Improves patient satisfaction scores by 25%"
      },
      {
        name: "Special-Order Arrival Alert",
        description: "When a special-order medication arrives in inventory, the system automatically notifies the patient via SMS with pickup instructions and a 48-hour hold window.",
        timeSaved: "2h/week",
        impact: "Eliminates missed special-order pickups"
      }
    ],
    tools: ["n8n", "Twilio", "Airtable", "Google Sheets"],
    stats: {
      timeSaved: "11h/week",
      revenueImpact: "$2,800/month",
      deploymentDays: 7,
      roiMonths: 1
    },
    faq: [
      {
        q: "Can this integrate with my dispensing or PMS software?",
        a: "Yes, we connect to most pharmacy management systems via API or data export to trigger automations based on real-time prescription status changes."
      },
      {
        q: "Are patients able to opt out of automated messages?",
        a: "Absolutely. Every message includes a simple opt-out option, and the system respects all communication preferences in compliance with messaging regulations."
      },
      {
        q: "Can I segment reminders by medication type or patient risk profile?",
        a: "Yes, high-adherence-risk patients (e.g. those on chronic disease medications) can receive more frequent or urgent outreach sequences compared to low-risk patients."
      }
    ]
  },
  {
    slug: "physical-therapist",
    name: "Physical Therapist",
    category: "Healthcare",
    tagline: "Keep your physical therapy schedule full and patients on track with automated care journey management.",
    description: "Physical therapy outcomes depend on consistent attendance and home exercise compliance, both of which drop sharply without proactive follow-up. Automation keeps patients engaged between sessions and ensures your appointment book stays full even when cancellations occur.",
    painPoints: [
      "Patients drop off mid-treatment plan when they start feeling better, reducing outcomes and revenue",
      "Home exercise program compliance is rarely monitored between sessions, limiting treatment effectiveness",
      "Last-minute cancellations leave appointment slots empty with no systematic process to fill them",
      "Progress documentation and insurance authorisation follow-up take significant administrative time"
    ],
    workflows: [
      {
        name: "Home Exercise Program Reminders",
        description: "Sends daily SMS reminders to patients with their HEP exercises linked via video, and a simple reply prompt to log completion, keeping compliance high between sessions.",
        timeSaved: "2h/week",
        impact: "Improves HEP compliance by 45%"
      },
      {
        name: "Mid-Treatment Dropout Prevention",
        description: "If a patient misses two consecutive appointments, an automated re-engagement sequence fires with a personalised message about their goals and a one-click rebooking link.",
        timeSaved: "3h/week",
        impact: "Recovers 20% of would-be dropouts"
      },
      {
        name: "Insurance Authorisation Renewal Alerts",
        description: "Tracks authorisation expiry dates in Airtable and alerts the admin team 2 weeks in advance to request renewal, preventing treatment gaps due to lapsed authorisations.",
        timeSaved: "3h/week",
        impact: "Eliminates revenue loss from expired authorisations"
      },
      {
        name: "Waitlist Slot Fill Automation",
        description: "When a cancellation occurs, the system automatically contacts the top 3 waitlisted patients via SMS, filling the slot within minutes without any staff involvement.",
        timeSaved: "2h/week",
        impact: "Fills 80% of cancelled slots within 1 hour"
      }
    ],
    tools: ["n8n", "Twilio", "Airtable", "Jane App"],
    stats: {
      timeSaved: "10h/week",
      revenueImpact: "$3,500/month",
      deploymentDays: 7,
      roiMonths: 1
    },
    faq: [
      {
        q: "Can home exercise reminders include video links for each patient's specific programme?",
        a: "Yes, the system stores each patient's personalised HEP and includes the relevant video or PDF links in every reminder message."
      },
      {
        q: "How does the mid-treatment dropout detection work?",
        a: "The system monitors appointment attendance patterns and triggers an alert when a patient misses consecutive sessions or shows an irregular booking pattern."
      },
      {
        q: "Can the authorisation tracking handle multiple insurance providers with different rules?",
        a: "Yes, each payer's authorisation rules and expiry windows can be configured separately in the system."
      }
    ]
  },
  {
    slug: "chiropractor",
    name: "Chiropractor",
    category: "Healthcare",
    tagline: "Grow your chiropractic practice with automated reactivation, recall, and wellness plan management.",
    description: "Chiropractic practices depend on recurring visits and wellness plan compliance, making consistent patient communication essential to retention and revenue. Automation reactivates lapsed patients, fills gaps in the schedule, and ensures wellness plan members stay engaged.",
    painPoints: [
      "Lapsed patients who stopped care 3–6 months ago are never systematically re-engaged",
      "Wellness plan members often under-utilise their visits, reducing perceived value and cancellations",
      "New patient consultation follow-up is inconsistent, causing potential patients to choose other providers",
      "Tracking and collecting wellness plan membership payments is time-consuming and error-prone"
    ],
    workflows: [
      {
        name: "Lapsed Patient Reactivation Campaign",
        description: "Patients who have not visited in 90 days automatically receive a personalised reactivation sequence over 2 weeks via SMS and email, with a limited-time offer to return.",
        timeSaved: "3h/week",
        impact: "Reactivates 15–20% of lapsed patients per campaign"
      },
      {
        name: "Wellness Plan Utilisation Reminders",
        description: "Members who have unused visits remaining receive automated monthly reminders showing their remaining visit balance and a direct booking link.",
        timeSaved: "2h/week",
        impact: "Increases visit utilisation by 30%, improving renewal rates"
      },
      {
        name: "New Patient Follow-Up Sequence",
        description: "After a first visit, Claude AI sends a personalised care plan summary and outcome goals within 24 hours, followed by a check-in at day 3 to address any soreness or questions.",
        timeSaved: "2h/week",
        impact: "Increases new patient retention past visit 3 by 35%"
      },
      {
        name: "Wellness Plan Payment Automation",
        description: "Stripe charges monthly wellness plan fees automatically, sends branded receipts, and triggers a gentle re-engagement sequence for any declined payments before cancelling membership.",
        timeSaved: "3h/week",
        impact: "Reduces involuntary churn by 40%"
      }
    ],
    tools: ["n8n", "Claude AI", "Stripe", "Twilio"],
    stats: {
      timeSaved: "10h/week",
      revenueImpact: "$4,000/month",
      deploymentDays: 7,
      roiMonths: 1
    },
    faq: [
      {
        q: "Can reactivation messages be personalised to the patient's original complaint?",
        a: "Yes, Claude AI references the patient's treatment history to craft messages that speak directly to their original condition and progress."
      },
      {
        q: "How does the system know which wellness plan each patient is on?",
        a: "We integrate with your practice management software or Airtable to pull current membership status and tailor communications accordingly."
      },
      {
        q: "What happens when a patient cancels their wellness plan?",
        a: "The cancellation triggers an exit survey and a win-back sequence at 30 and 60 days, offering a discounted return option."
      }
    ]
  },
  {
    slug: "psychologist",
    name: "Psychologist",
    category: "Healthcare",
    tagline: "Reduce admin burden and improve therapeutic outcomes with secure, automated client management.",
    description: "Psychologists and mental health practitioners spend significant time on scheduling, intake paperwork, and insurance coordination that could be safely automated to protect more time for clinical work. Well-designed automation respects the sensitivity of the therapeutic relationship while handling routine logistics with care.",
    painPoints: [
      "New client intake paperwork is paper-based or emailed as PDFs, creating data entry work and delays",
      "Session reminders are sent manually, leading to inconsistent delivery and avoidable no-shows",
      "Insurance billing and claim follow-up is done manually, slowing cash flow",
      "Clients on waitlists receive no proactive communication, causing them to seek care elsewhere"
    ],
    workflows: [
      {
        name: "Digital Intake & Consent Forms",
        description: "New clients receive a secure Jotform intake link upon booking confirmation, completing history, consent, and privacy forms before their first session, saving 20 minutes of session time.",
        timeSaved: "4h/week",
        impact: "Saves 20 minutes per new client intake"
      },
      {
        name: "Appointment Reminder Sequence",
        description: "Sends a discreet, clinically appropriate reminder 48 hours and 2 hours before each session via SMS or email, with a simple confirm or reschedule option.",
        timeSaved: "2h/week",
        impact: "Reduces no-show rate by 35%"
      },
      {
        name: "Waitlist Nurture Communication",
        description: "Clients on the waitlist receive a monthly check-in message confirming their place, providing mental health resources, and asking if their situation has changed.",
        timeSaved: "2h/week",
        impact: "Retains 70% of waitlisted clients until an opening occurs"
      },
      {
        name: "Insurance Claim Status Follow-Up",
        description: "Tracks outstanding claims in a Google Sheet and sends automated reminders to the billing team when claims have been pending for more than 30 days, preventing revenue leakage.",
        timeSaved: "3h/week",
        impact: "Accelerates average claim resolution by 2 weeks"
      }
    ],
    tools: ["n8n", "Jotform", "SimplePractice", "Google Sheets"],
    stats: {
      timeSaved: "11h/week",
      revenueImpact: "$2,500/month",
      deploymentDays: 7,
      roiMonths: 1
    },
    faq: [
      {
        q: "How do you ensure client confidentiality in automated communications?",
        a: "All messages are designed to be discreet with no clinical content exposed. Platforms used are HIPAA-compliant and data is encrypted in transit and at rest."
      },
      {
        q: "Can the intake forms be customised for different presenting concerns?",
        a: "Yes, conditional logic in Jotform allows different question sets to appear based on the client's reason for seeking therapy."
      },
      {
        q: "Does this work with SimplePractice?",
        a: "Yes, we integrate directly with SimplePractice to sync appointments, client records, and billing status with your automation workflows."
      }
    ]
  },
  {
    slug: "veterinarian",
    name: "Veterinarian",
    category: "Healthcare",
    tagline: "Keep pets healthy and your vet practice thriving with automated vaccine reminders and wellness follow-ups.",
    description: "Veterinary practices rely on annual wellness visits, vaccine schedules, and preventive care plans to drive recurring revenue, yet most still rely on manual recall systems. Automation delivers timely, pet-personalised reminders that bring clients back consistently and increase preventive care compliance.",
    painPoints: [
      "Vaccine and wellness visit reminders are sent inconsistently or not at all for many patients",
      "Post-surgery or post-illness follow-up calls are skipped due to time pressure, risking complications",
      "Clients who miss an appointment are rarely re-engaged proactively, losing the visit permanently",
      "Boarding and grooming reminders and follow-ups are handled separately and manually"
    ],
    workflows: [
      {
        name: "Vaccine & Wellness Recall Reminders",
        description: "Based on each pet's vaccination and wellness schedule in your PMS, automated reminders fire 4 weeks and 1 week before due dates via SMS and email, personalised with the pet's name.",
        timeSaved: "5h/week",
        impact: "Increases preventive care visit compliance by 40%"
      },
      {
        name: "Post-Visit Health Check-In",
        description: "24–48 hours after a sick visit or procedure, an automated check-in message asks the pet owner how their pet is doing, with a prompt to call or book a follow-up if concerned.",
        timeSaved: "2h/week",
        impact: "Improves client trust scores and reduces emergency revisits"
      },
      {
        name: "Missed Appointment Re-Engagement",
        description: "When a client misses a wellness appointment, a friendly re-engagement message fires within 24 hours explaining the importance of the missed visit and offering easy rebooking.",
        timeSaved: "2h/week",
        impact: "Recovers 25% of missed wellness appointments"
      },
      {
        name: "Preventive Care Plan Upsell Sequence",
        description: "After an annual exam, Claude AI generates a personalised preventive care recommendation summary emailed to the owner, with a sign-up link for an annual wellness plan.",
        timeSaved: "2h/week",
        impact: "Increases wellness plan enrolments by 20%"
      }
    ],
    tools: ["n8n", "Claude AI", "Twilio", "Google Calendar"],
    stats: {
      timeSaved: "11h/week",
      revenueImpact: "$3,800/month",
      deploymentDays: 7,
      roiMonths: 1
    },
    faq: [
      {
        q: "Can reminders be sent for multiple pets per household under one client account?",
        a: "Yes, the system tracks each pet separately and sends individual, pet-named reminders while grouping communications under the same client contact."
      },
      {
        q: "How does the system know which vaccines are due for each pet?",
        a: "We sync with your practice management software to pull each pet's vaccination history and calculate upcoming due dates automatically."
      },
      {
        q: "Can boarding and grooming reminders be included in the same system?",
        a: "Yes, all service types can be managed within the same automation platform with different message templates and timing rules per service."
      }
    ]
  },
  {
    slug: "podiatrist",
    name: "Podiatrist",
    category: "Healthcare",
    tagline: "Automate diabetic foot care follow-ups and routine recall to keep your podiatry schedule fully booked.",
    description: "Podiatry practices manage a high proportion of recurring patients with chronic conditions like diabetes who require regular monitoring and consistent recall. Automation ensures these high-risk patients never miss a scheduled appointment while reducing the administrative burden on clinical staff.",
    painPoints: [
      "Diabetic patients requiring regular foot checks often miss appointments without proactive reminders",
      "Post-procedure wound care follow-up is done inconsistently, increasing complication risk",
      "Custom orthotic patients are not systematically reminded to return for fittings or replacements",
      "New patient intake and insurance verification is slow and paper-based"
    ],
    workflows: [
      {
        name: "Diabetic Care Recall System",
        description: "High-risk diabetic patients are flagged in Airtable with a recall frequency, triggering automated reminders at the appropriate interval via SMS and email, ensuring no patient falls through the cracks.",
        timeSaved: "4h/week",
        impact: "Improves diabetic foot check compliance by 50%"
      },
      {
        name: "Post-Procedure Wound Care Follow-Up",
        description: "After nail or wound procedures, an automated message sequence checks in at day 2, day 5, and day 10 with wound care instructions and a prompt to report any concerns.",
        timeSaved: "2h/week",
        impact: "Reduces post-procedure complication callbacks by 30%"
      },
      {
        name: "Orthotic Replacement Reminder",
        description: "Based on the purchase date and typical lifespan of each orthotic type, automated reminders prompt patients to book a replacement assessment at the right time.",
        timeSaved: "2h/week",
        impact: "Increases orthotic repeat sales by 25%"
      },
      {
        name: "Digital Intake & Insurance Verification",
        description: "New patients complete a Jotform intake including insurance details before arrival. The system flags incomplete or unverified insurance for the admin team to action before the visit.",
        timeSaved: "3h/week",
        impact: "Reduces intake time by 15 minutes per new patient"
      }
    ],
    tools: ["n8n", "Airtable", "Jotform", "Twilio"],
    stats: {
      timeSaved: "11h/week",
      revenueImpact: "$2,800/month",
      deploymentDays: 7,
      roiMonths: 1
    },
    faq: [
      {
        q: "How is the recall frequency set for each patient?",
        a: "The frequency is configured per patient based on their condition and your clinical protocol, and can be updated at any time by your team."
      },
      {
        q: "Can the system flag high-risk patients who have not responded to multiple reminders?",
        a: "Yes, after a configurable number of unanswered reminders, the patient is escalated to your admin team for a personal phone call."
      },
      {
        q: "Does the intake form support upload of referral letters or previous imaging?",
        a: "Yes, Jotform supports file uploads and all documents are securely stored and linked to the patient record."
      }
    ]
  },
  {
    slug: "dermatologist",
    name: "Dermatologist",
    category: "Healthcare",
    tagline: "Automate skin check recalls and cosmetic treatment follow-ups to grow your dermatology practice.",
    description: "Dermatology practices balance medical skin care with high-value cosmetic treatments, and both depend on systematic patient follow-up and recall. Automation ensures annual skin check reminders are sent consistently while cosmetic patients receive timely follow-ups that drive rebooking and retail sales.",
    painPoints: [
      "Annual skin cancer check reminders are not sent systematically, putting patients at risk and losing revenue",
      "Cosmetic treatment patients are not followed up after procedures, missing rebooking opportunities",
      "Prescription skincare and product recommendations are not reinforced after consultations",
      "Biopsy result communication and follow-up appointment scheduling is a manual, error-prone process"
    ],
    workflows: [
      {
        name: "Annual Skin Check Recall Campaign",
        description: "Patients are automatically contacted 11 months after their last skin check with a personalised recall reminder and easy online booking, with a follow-up at 12 months for non-bookers.",
        timeSaved: "4h/week",
        impact: "Increases annual skin check compliance by 40%"
      },
      {
        name: "Cosmetic Treatment Rebooking Sequence",
        description: "After each cosmetic procedure (e.g. filler, laser, chemical peel), an automated follow-up sequence checks outcomes at day 7 and prompts rebooking at the clinically appropriate interval.",
        timeSaved: "3h/week",
        impact: "Increases cosmetic patient rebooking rate by 30%"
      },
      {
        name: "Post-Biopsy Follow-Up Coordination",
        description: "When a biopsy is taken, the system creates a tracking entry in Airtable and automatically reminds the admin team to contact the patient with results within the target timeframe.",
        timeSaved: "2h/week",
        impact: "Eliminates missed or delayed biopsy result communications"
      },
      {
        name: "Skincare Regime Follow-Up",
        description: "After a consultation recommending prescription or cosmeceutical skincare, Claude AI sends a personalised skincare routine summary and a 4-week check-in to assess progress.",
        timeSaved: "2h/week",
        impact: "Increases skincare product compliance and repeat purchase by 20%"
      }
    ],
    tools: ["n8n", "Claude AI", "Airtable", "Twilio"],
    stats: {
      timeSaved: "11h/week",
      revenueImpact: "$5,500/month",
      deploymentDays: 7,
      roiMonths: 1
    },
    faq: [
      {
        q: "Can the recall system differentiate between medical and cosmetic patients?",
        a: "Yes, patients are segmented by visit type and receive tailored recall messaging and intervals appropriate to medical or cosmetic care."
      },
      {
        q: "How is the biopsy tracking system updated when results are received?",
        a: "The admin team updates the Airtable record when results arrive, which automatically triggers the patient notification workflow."
      },
      {
        q: "Can cosmetic rebooking messages include before/after imagery or treatment summaries?",
        a: "Yes, messages can include links to secure patient portals with treatment photos and summaries, subject to your consent protocols."
      }
    ]
  },
  {
    slug: "pediatrician",
    name: "Pediatrician",
    category: "Healthcare",
    tagline: "Automate well-child visit reminders and immunisation schedules to keep every child on track.",
    description: "Pediatric practices manage complex, age-based vaccination and well-child visit schedules for hundreds of growing patients simultaneously, making manual recall impossible at scale. Automation ensures every child receives timely reminders for developmental milestones and immunisations, improving health outcomes and practice revenue.",
    painPoints: [
      "Tracking age-appropriate well-child visit and immunisation schedules across hundreds of patients is overwhelming",
      "Parents frequently forget booster doses, leading to delayed immunisations and catch-up complexity",
      "Sick visit follow-up calls are inconsistent, with some families never contacted after an illness",
      "After-hours advice requests from concerned parents are not triaged systematically, creating liability"
    ],
    workflows: [
      {
        name: "Well-Child Visit Schedule Automation",
        description: "Based on each child's date of birth, the system automatically sends visit reminders at all AAP-recommended checkup ages (2m, 4m, 6m, 9m, 12m, 15m, 18m, 2y, 3y, 4y, 5y, and annually), with a booking link.",
        timeSaved: "5h/week",
        impact: "Increases well-child visit compliance by 45%"
      },
      {
        name: "Immunisation Booster Reminders",
        description: "Tracks each child's vaccination record and sends a reminder when a booster is due within 30 days, helping parents stay on schedule and reducing catch-up immunisation complexity.",
        timeSaved: "3h/week",
        impact: "Improves on-time immunisation rates by 35%"
      },
      {
        name: "Post-Sick Visit Follow-Up",
        description: "48 hours after a sick visit, parents receive an automated check-in asking how the child is feeling and providing a prompt to call or book a follow-up if symptoms have not resolved.",
        timeSaved: "2h/week",
        impact: "Reduces unnecessary emergency visits by 15%"
      },
      {
        name: "After-Hours Triage Message",
        description: "After hours, an automated response to parent inquiries provides a symptom triage checklist and directs urgent cases to the ER while scheduling a callback for non-urgent concerns.",
        timeSaved: "2h/week",
        impact: "Reduces after-hours call volume by 30%"
      }
    ],
    tools: ["n8n", "Twilio", "Google Calendar", "Airtable"],
    stats: {
      timeSaved: "12h/week",
      revenueImpact: "$3,200/month",
      deploymentDays: 7,
      roiMonths: 1
    },
    faq: [
      {
        q: "How does the system handle children who are behind on their immunisation schedule?",
        a: "A catch-up reminder sequence is triggered automatically when the system detects an overdue vaccination, with appropriate messaging to the parent."
      },
      {
        q: "Can reminders be sent in languages other than English?",
        a: "Yes, message templates can be configured in multiple languages and assigned to patient records based on the family's preferred language."
      },
      {
        q: "How do you handle twins or multiple children in the same household?",
        a: "Each child has a separate record and schedule, but messages to the same parent are intelligently combined to avoid duplicate notifications."
      }
    ]
  },
  {
    slug: "nutritionist",
    name: "Nutritionist",
    category: "Healthcare",
    tagline: "Scale your nutrition practice with automated client check-ins, meal plan delivery, and progress tracking.",
    description: "Nutritionists and dietitians work best when clients stay accountable between sessions, but manual check-ins and follow-ups are time-consuming and inconsistently delivered. Automation provides structured client touchpoints, delivers personalised meal plans, and tracks progress without adding hours to your week.",
    painPoints: [
      "Clients lose motivation and drop off their programme between fortnightly sessions without accountability",
      "Sending personalised meal plans and recipe packs to each client is time-consuming to do manually",
      "Progress tracking relies on clients self-reporting in sessions, missing the full picture",
      "Re-engaging clients whose programmes have ended is rarely done systematically, losing recurring revenue"
    ],
    workflows: [
      {
        name: "Weekly Client Check-In Automation",
        description: "Every week, clients receive a brief automated check-in form via Jotform asking about adherence, energy levels, and any challenges. Responses are logged in Airtable and flagged for the nutritionist to review.",
        timeSaved: "4h/week",
        impact: "Improves client programme completion rate by 40%"
      },
      {
        name: "Personalised Meal Plan Delivery",
        description: "After each session, Claude AI generates a personalised weekly meal plan based on the client's goals and preferences, which is automatically emailed to the client with a shopping list.",
        timeSaved: "5h/week",
        impact: "Saves 15 minutes of manual plan creation per client per week"
      },
      {
        name: "Progress Milestone Celebration",
        description: "When a client hits a tracked milestone (e.g. 4 weeks on programme, goal weight reached), they automatically receive a congratulatory message and a prompt to share their success.",
        timeSaved: "1h/week",
        impact: "Increases client referrals by 20%"
      },
      {
        name: "Programme End Re-Engagement",
        description: "30 days after a client's programme ends, an automated sequence checks in on their progress and offers a maintenance programme or seasonal reset package.",
        timeSaved: "2h/week",
        impact: "Converts 25% of completed clients to repeat programmes"
      }
    ],
    tools: ["n8n", "Claude AI", "Jotform", "Airtable"],
    stats: {
      timeSaved: "12h/week",
      revenueImpact: "$2,800/month",
      deploymentDays: 7,
      roiMonths: 1
    },
    faq: [
      {
        q: "Can meal plans be generated to account for allergies and dietary restrictions?",
        a: "Yes, Claude AI references each client's allergy and preference profile stored in Airtable to generate fully compliant meal plans."
      },
      {
        q: "How do clients submit their weekly check-in responses?",
        a: "Via a simple Jotform link sent by SMS or email each week. The form takes under 2 minutes to complete and responses are automatically logged."
      },
      {
        q: "Can I review and edit the AI-generated meal plans before they are sent?",
        a: "Yes, there is an optional approval step where the nutritionist reviews the generated plan before it is dispatched, or it can be set to send automatically for efficiency."
      }
    ]
  },
  {
    slug: "medical-imaging-center",
    name: "Medical Imaging Center",
    category: "Healthcare",
    tagline: "Optimise your imaging centre throughput with automated referral management and patient preparation workflows.",
    description: "Medical imaging centres handle high volumes of referred patients who require precise appointment preparation instructions and timely result communication. Automation reduces the administrative burden on booking teams while ensuring patients arrive prepared, improving scan quality and throughput.",
    painPoints: [
      "Patients arrive unprepared for scans (e.g. not fasted, wearing metal) due to inadequate preparation instructions",
      "Referral coordination with ordering physicians is slow and relies on fax and phone calls",
      "Result notification to referring doctors and patients is delayed, creating liability and frustration",
      "No-shows for imaging appointments are costly given the high fixed cost of scanner time"
    ],
    workflows: [
      {
        name: "Scan Preparation Instruction Sequence",
        description: "Upon booking confirmation, patients automatically receive detailed preparation instructions specific to their scan type (e.g. fasting requirements for abdominal CT, contraindication checklist for MRI) via SMS and email.",
        timeSaved: "4h/week",
        impact: "Reduces unprepared patient cancellations by 60%"
      },
      {
        name: "Referral Coordination Automation",
        description: "Incoming referrals from ordering physicians are automatically acknowledged, logged in Airtable, and assigned a booking slot, with a confirmation sent back to the referring practice.",
        timeSaved: "5h/week",
        impact: "Reduces referral-to-booking time from days to hours"
      },
      {
        name: "Result Ready Notification",
        description: "When results are finalised in the system, automated notifications are sent to the referring physician and patient simultaneously, with secure access instructions.",
        timeSaved: "3h/week",
        impact: "Cuts result turnaround communication time by 70%"
      },
      {
        name: "No-Show Prevention & Waitlist Fill",
        description: "SMS reminders fire 48 hours and 2 hours before imaging appointments. Cancellations trigger immediate waitlist outreach to fill the valuable scanner slot.",
        timeSaved: "2h/week",
        impact: "Reduces no-show rate by 35% and recovers 80% of cancelled slots"
      }
    ],
    tools: ["n8n", "Airtable", "Twilio", "Google Sheets"],
    stats: {
      timeSaved: "14h/week",
      revenueImpact: "$6,000/month",
      deploymentDays: 7,
      roiMonths: 1
    },
    faq: [
      {
        q: "Can preparation instructions be dynamically assigned based on the scan type booked?",
        a: "Yes, each scan type has its own instruction template and the correct one is automatically selected and sent based on the appointment type."
      },
      {
        q: "Can the system handle referrals from multiple hospitals and specialist practices?",
        a: "Yes, referrals from any source can be routed into the central Airtable system, with each referring practice tracked separately for reporting."
      },
      {
        q: "Is the result notification system secure enough for medical data?",
        a: "All result notifications are sent via secure, encrypted channels. No clinical data is included in SMS; patients are directed to a secure portal to view results."
      }
    ]
  },
  {
    slug: "clinical-laboratory",
    name: "Clinical Laboratory",
    category: "Healthcare",
    tagline: "Streamline sample tracking, result delivery, and client communication for your clinical laboratory.",
    description: "Clinical laboratories process hundreds of samples daily and must maintain precise chain-of-custody tracking while communicating results promptly to ordering clinicians. Automation reduces manual logging errors, accelerates result notification, and keeps referring practices informed in real time.",
    painPoints: [
      "Sample tracking between collection, processing, and result stages is done manually and prone to errors",
      "Critical result notification to ordering physicians is delayed, creating clinical and legal risk",
      "Referring practice relationship management is ad hoc with no systematic communication cadence",
      "Invoicing and payment collection from ordering practices is slow and manually processed"
    ],
    workflows: [
      {
        name: "Sample Chain-of-Custody Logging",
        description: "Each sample scan event is automatically logged in Airtable with timestamp, handler, and status, providing a real-time chain-of-custody record accessible to authorised staff.",
        timeSaved: "5h/week",
        impact: "Eliminates manual logging errors and audit preparation time"
      },
      {
        name: "Critical Result Alert System",
        description: "When a result outside critical thresholds is entered, an immediate automated alert is sent to the ordering physician via SMS and email, with acknowledgement tracking to ensure receipt.",
        timeSaved: "3h/week",
        impact: "Reduces critical result notification time from 30 minutes to under 5 minutes"
      },
      {
        name: "Result Ready Notification",
        description: "Ordering clinicians receive an automated SMS and email notification when routine results are finalised, with a secure link to view the full report in the laboratory portal.",
        timeSaved: "4h/week",
        impact: "Reduces incoming result inquiry calls by 50%"
      },
      {
        name: "Invoice & Payment Automation",
        description: "Monthly invoices to ordering practices are generated automatically from the Google Sheets order log, emailed as PDFs, and tracked for payment with automated overdue reminders.",
        timeSaved: "4h/week",
        impact: "Reduces average payment collection time by 15 days"
      }
    ],
    tools: ["n8n", "Airtable", "Google Sheets", "Twilio"],
    stats: {
      timeSaved: "16h/week",
      revenueImpact: "$4,500/month",
      deploymentDays: 7,
      roiMonths: 1
    },
    faq: [
      {
        q: "How are critical thresholds defined for the alert system?",
        a: "Thresholds are configured per test type based on your laboratory's clinical protocols and can be updated by the lab director at any time."
      },
      {
        q: "Can the result notification system handle different access levels for different ordering practices?",
        a: "Yes, each practice has its own secure access credentials and can only view results for their own patients."
      },
      {
        q: "How does the invoicing automation handle complex billing arrangements with different practices?",
        a: "Each ordering practice can have a custom pricing schedule and billing cycle configured in the system, with invoices generated accordingly."
      }
    ]
  },
  {
    slug: "audiologist",
    name: "Audiologist",
    category: "Healthcare",
    tagline: "Automate hearing aid follow-ups and annual audiogram recalls to maximise your audiology practice revenue.",
    description: "Audiology practices depend on annual hearing assessments and ongoing hearing aid aftercare visits that patients routinely delay or forget without prompting. Automation delivers timely, caring reminders that bring patients back for assessments and device servicing, protecting both health outcomes and practice revenue.",
    painPoints: [
      "Patients with hearing aids rarely return for annual adjustments or battery and dome replacements without reminders",
      "Annual audiogram recalls are sent sporadically or not at all for much of the patient base",
      "New hearing aid wearers need intensive follow-up support in the first 90 days but rarely receive it",
      "Hearing aid trial period follow-up is inconsistent, reducing conversion from trial to purchase"
    ],
    workflows: [
      {
        name: "Annual Audiogram Recall System",
        description: "Patients are automatically contacted 11 months after their last hearing test with a personalised recall reminder and booking link, with a follow-up at 12 months for non-responders.",
        timeSaved: "4h/week",
        impact: "Increases annual audiogram compliance by 40%"
      },
      {
        name: "New Hearing Aid Wearer Support Sequence",
        description: "New hearing aid wearers receive a structured 90-day support sequence with weekly tips for adapting to their devices, troubleshooting guides, and prompts to book a fine-tuning appointment if needed.",
        timeSaved: "3h/week",
        impact: "Reduces early hearing aid rejection rate by 35%"
      },
      {
        name: "Hearing Aid Servicing Reminder",
        description: "Based on device purchase and last service date, automated reminders prompt patients to book a clean and check appointment, with messaging tailored to their specific device brand.",
        timeSaved: "2h/week",
        impact: "Increases annual service visit rate by 30%"
      },
      {
        name: "Trial Period Conversion Follow-Up",
        description: "During a hearing aid trial, patients receive a structured check-in at day 14 and day 28 assessing their experience and addressing any concerns before the trial end decision point.",
        timeSaved: "2h/week",
        impact: "Increases trial-to-purchase conversion by 25%"
      }
    ],
    tools: ["n8n", "Twilio", "Google Calendar", "Airtable"],
    stats: {
      timeSaved: "11h/week",
      revenueImpact: "$3,500/month",
      deploymentDays: 7,
      roiMonths: 1
    },
    faq: [
      {
        q: "Can the servicing reminders reference the specific hearing aid model the patient has?",
        a: "Yes, the patient's device details are stored in Airtable and included in personalised servicing reminder messages."
      },
      {
        q: "What if a patient upgrades their hearing aids during the recall period?",
        a: "The system resets the recall clock based on the new device purchase date and updates the servicing schedule accordingly."
      },
      {
        q: "Can the new wearer sequence be adjusted for different levels of hearing loss or device type?",
        a: "Yes, different message sequences can be configured for different device types and hearing loss categories."
      }
    ]
  },
  {
    slug: "speech-therapist",
    name: "Speech Therapist",
    category: "Healthcare",
    tagline: "Improve therapy outcomes and parent engagement with automated home practice reminders and progress tracking.",
    description: "Speech therapists work primarily with children and adults who require daily home practice between sessions to achieve meaningful progress, making consistent parent and carer communication essential. Automation delivers structured home practice reminders and progress tracking tools that extend the therapeutic relationship beyond the clinic.",
    painPoints: [
      "Home practice compliance drops sharply within 48 hours of a session without structured reminders",
      "Parents of paediatric clients need consistent guidance between sessions but contact is sporadic",
      "Session progress notes and goal updates are not shared with families in a structured, accessible format",
      "Waitlisted clients receive no communication and frequently book elsewhere while waiting"
    ],
    workflows: [
      {
        name: "Daily Home Practice Reminders",
        description: "Parents or adult clients receive a daily SMS reminder to complete their home practice activities, with a simple reply to log completion. Non-completions are flagged for discussion at the next session.",
        timeSaved: "2h/week",
        impact: "Improves home practice compliance by 50%"
      },
      {
        name: "Post-Session Parent Summary",
        description: "After each paediatric session, Claude AI generates a plain-language summary of what was worked on and how to practice at home, automatically emailed to the parent within 1 hour.",
        timeSaved: "3h/week",
        impact: "Increases parent engagement and satisfaction scores by 35%"
      },
      {
        name: "Waitlist Nurture & Intake",
        description: "Waitlisted clients receive a monthly check-in with estimated wait time updates and a digital intake form to complete in advance, so their first session can begin immediately upon availability.",
        timeSaved: "2h/week",
        impact: "Retains 65% of waitlisted clients and reduces first-session admin"
      },
      {
        name: "Goal Progress Milestone Alerts",
        description: "When a client achieves a tracked speech or language goal, an automated celebration message is sent to the family, reinforcing progress and motivating continued engagement.",
        timeSaved: "1h/week",
        impact: "Increases family motivation and reduces early programme dropout"
      }
    ],
    tools: ["n8n", "Claude AI", "Twilio", "Jotform"],
    stats: {
      timeSaved: "8h/week",
      revenueImpact: "$2,200/month",
      deploymentDays: 7,
      roiMonths: 1
    },
    faq: [
      {
        q: "Can home practice reminders be customised per client based on their current goals?",
        a: "Yes, each client's current practice targets are stored in the system and referenced in their personalised daily reminder messages."
      },
      {
        q: "Is the parent summary sent automatically or does the therapist need to approve it first?",
        a: "Both options are available. You can set it to auto-send after each session or route through an approval step where the therapist reviews and edits before dispatch."
      },
      {
        q: "Can adult clients receive reminders directly rather than having them sent to a carer?",
        a: "Yes, reminders are configured per client to go to the client directly or to a nominated carer, based on the client's age and preference."
      }
    ]
  },
  {
    slug: "occupational-therapist",
    name: "Occupational Therapist",
    category: "Healthcare",
    tagline: "Enhance occupational therapy outcomes with automated home programme support and carer communication.",
    description: "Occupational therapists support clients across a wide range of conditions and life stages, requiring consistent communication with clients, carers, and referral sources to deliver effective care. Automation streamlines these touchpoints, reducing admin time while improving programme adherence and client satisfaction.",
    painPoints: [
      "Home programme adherence drops between OT sessions without structured reminders for clients and carers",
      "Coordinating with referral sources like hospitals and GPs is done manually and delays care initiation",
      "Equipment recommendations and funding application follow-up fall through the cracks under caseload pressure",
      "Progress reports for funding bodies and referrers are time-consuming to draft and track"
    ],
    workflows: [
      {
        name: "Home Programme Adherence Reminders",
        description: "Clients or carers receive structured daily or weekly SMS reminders for their home programme activities, with a simple logging prompt and escalation to the OT if adherence drops.",
        timeSaved: "3h/week",
        impact: "Improves home programme adherence by 40%"
      },
      {
        name: "Referral Source Communication Automation",
        description: "When a referral is received, the referral source gets an automated acknowledgement with the client's next available appointment. When care commences, an update is sent automatically.",
        timeSaved: "3h/week",
        impact: "Reduces referral-to-appointment coordination time by 60%"
      },
      {
        name: "Equipment & Funding Follow-Up Tracker",
        description: "Equipment recommendations and funding applications are logged in Airtable with follow-up deadlines. Automated reminders alert the OT when action is required to keep applications on track.",
        timeSaved: "2h/week",
        impact: "Ensures 100% of funding applications are followed up on time"
      },
      {
        name: "Progress Report Drafting Assistant",
        description: "Claude AI drafts structured progress reports for funding bodies based on session notes entered by the OT, reducing report writing time from 45 minutes to 10 minutes per client.",
        timeSaved: "4h/week",
        impact: "Saves 35 minutes per progress report"
      }
    ],
    tools: ["n8n", "Claude AI", "Airtable", "Twilio"],
    stats: {
      timeSaved: "12h/week",
      revenueImpact: "$2,800/month",
      deploymentDays: 7,
      roiMonths: 1
    },
    faq: [
      {
        q: "Can the system handle clients across different funding schemes with different reporting requirements?",
        a: "Yes, each funding body's report template and deadline rules can be configured separately so the right format is generated for each client."
      },
      {
        q: "How does the referral communication work when a client is on a waiting list?",
        a: "The referral source receives an acknowledgement with the estimated wait time and is automatically updated when the client is assigned an appointment."
      },
      {
        q: "Can carers receive reminders separately from the client?",
        a: "Yes, both client and carer can be registered in the system and receive appropriately worded reminders and updates simultaneously."
      }
    ]
  },
  {
    slug: "aesthetic-clinic",
    name: "Aesthetic Clinic",
    category: "Healthcare",
    tagline: "Fill your aesthetic clinic appointment book and maximise treatment revenue with smart automation.",
    description: "Aesthetic clinics operate in a highly competitive, elective market where client experience, consistent follow-up, and strategic rebooking communications drive revenue. Automation keeps clients engaged between treatments, drives repeat bookings, and generates referrals through systematic post-treatment nurturing.",
    painPoints: [
      "Clients who had a great treatment experience are not systematically asked for reviews or referrals",
      "Treatment rebooking is left to the client's initiative, leading to gaps in the appointment book",
      "Pre-treatment consent forms and preparation instructions are sent manually and inconsistently",
      "Client lifetime value is not maximised because cross-sell opportunities for other treatments are not communicated"
    ],
    workflows: [
      {
        name: "Post-Treatment Review & Referral Request",
        description: "48 hours after a treatment, an automated message checks client satisfaction and, for happy clients, sends a Google review link and a referral incentive offer.",
        timeSaved: "2h/week",
        impact: "Increases 5-star reviews by 60% and referrals by 25%"
      },
      {
        name: "Treatment Rebooking Sequence",
        description: "Based on the recommended interval for each treatment (e.g. 3 months for anti-wrinkle, 6 weeks for laser), automated rebooking prompts fire at the right time with a direct booking link.",
        timeSaved: "3h/week",
        impact: "Increases client rebooking rate by 35%"
      },
      {
        name: "Pre-Treatment Consent & Prep Automation",
        description: "Upon booking confirmation, clients receive an automated pre-treatment consent form via Jotform and preparation instructions specific to their booked treatment.",
        timeSaved: "3h/week",
        impact: "Eliminates day-of consent delays and reduces consultation time by 15 minutes"
      },
      {
        name: "Cross-Sell Treatment Education Sequence",
        description: "Claude AI generates personalised treatment education emails sent to clients between visits, introducing complementary treatments based on their history and skin goals.",
        timeSaved: "2h/week",
        impact: "Increases average client spend by 20%"
      }
    ],
    tools: ["n8n", "Claude AI", "Jotform", "Stripe"],
    stats: {
      timeSaved: "10h/week",
      revenueImpact: "$6,500/month",
      deploymentDays: 7,
      roiMonths: 1
    },
    faq: [
      {
        q: "Can the rebooking prompt interval be set differently for each treatment type?",
        a: "Yes, every treatment in your menu has its own rebooking interval configured in the system, ensuring prompts fire at the clinically and commercially optimal time."
      },
      {
        q: "Can the review request be suppressed for clients who had a complication or complaint?",
        a: "Yes, any client flagged as having a concern or complication is automatically excluded from the review request flow and routed to a personal follow-up queue."
      },
      {
        q: "Can I offer referral incentives automatically through the system?",
        a: "Yes, unique referral codes can be generated per client and tracked through Stripe so incentives are applied only when a referred client completes their first paid booking."
      }
    ]
  },
  {
    slug: "urgent-care-center",
    name: "Urgent Care Center",
    category: "Healthcare",
    tagline: "Reduce wait times and improve patient flow at your urgent care centre with intelligent automation.",
    description: "Urgent care centres face high patient volumes, unpredictable demand, and the constant challenge of managing wait expectations without adequate staffing for communication. Automation handles patient check-in, wait time updates, and post-visit follow-up, improving satisfaction scores and reducing front desk workload.",
    painPoints: [
      "Patients waiting in queue have no visibility into wait times, leading to walkouts and complaints",
      "Post-visit follow-up and discharge instruction reinforcement is rarely done, increasing return visits",
      "Online check-in and digital triage are not available, creating congested waiting rooms",
      "Patient satisfaction survey collection is manual and sporadic, providing insufficient data for improvement"
    ],
    workflows: [
      {
        name: "Digital Check-In & Wait Time Updates",
        description: "Patients check in via a Jotform link on arrival or from the car park, triggering an automated queue position and estimated wait time SMS that updates every 15 minutes.",
        timeSaved: "6h/week",
        impact: "Reduces walkouts by 40% and front desk inquiries by 50%"
      },
      {
        name: "Post-Visit Discharge Instruction Reinforcement",
        description: "2 hours after discharge, patients receive an automated SMS with a summary of their diagnosis and discharge instructions, plus a prompt to contact the centre or seek further care if symptoms worsen.",
        timeSaved: "3h/week",
        impact: "Reduces unnecessary return visits by 20%"
      },
      {
        name: "Automated Patient Satisfaction Survey",
        description: "4 hours post-visit, every patient receives a 3-question satisfaction survey via Jotform. Results are automatically logged in Google Sheets and flagged if below threshold for service recovery.",
        timeSaved: "2h/week",
        impact: "Increases survey response rate to 35%+ and enables real-time service recovery"
      },
      {
        name: "Follow-Up Appointment Reminders",
        description: "When discharge instructions include a GP or specialist follow-up recommendation, the system sends a reminder at day 3 and day 7 prompting the patient to book their follow-up.",
        timeSaved: "2h/week",
        impact: "Increases follow-up compliance by 30%, improving patient outcomes"
      }
    ],
    tools: ["n8n", "Jotform", "Twilio", "Google Sheets"],
    stats: {
      timeSaved: "13h/week",
      revenueImpact: "$4,200/month",
      deploymentDays: 7,
      roiMonths: 1
    },
    faq: [
      {
        q: "Can the wait time update system integrate with our queue management software?",
        a: "Yes, we connect to most queue management systems via API to pull real-time wait data for automated patient SMS updates."
      },
      {
        q: "How is the patient satisfaction data used?",
        a: "Responses are aggregated in Google Sheets with automated weekly summary reports sent to management, and individual low-score alerts trigger a service recovery workflow."
      },
      {
        q: "Can the digital check-in capture insurance and payment information?",
        a: "Yes, the Jotform check-in can include insurance capture fields, and the data flows directly into your practice management system."
      }
    ]
  },
  {
    slug: "mental-health-clinic",
    name: "Mental Health Clinic",
    category: "Healthcare",
    tagline: "Improve access, reduce no-shows, and support therapist capacity with mental health clinic automation.",
    description: "Mental health clinics face growing demand, long waitlists, and high no-show rates that collectively reduce access for patients who urgently need care. Thoughtfully designed automation improves scheduling efficiency, keeps waitlisted clients engaged, and reduces the administrative load on clinical staff.",
    painPoints: [
      "No-show rates for therapy appointments are high, with empty slots that cannot easily be filled",
      "Waitlisted clients lose hope and disengage while waiting weeks or months for an appointment",
      "Clinician administrative burden (notes, referrals, reports) takes time away from clinical care",
      "Client satisfaction and outcome measurement is rarely collected systematically between sessions"
    ],
    workflows: [
      {
        name: "Appointment Reminder & Confirmation",
        description: "Sends a clinically sensitive reminder 48 hours and 2 hours before each appointment via SMS, with a simple confirm or reschedule option and crisis line information included in every message.",
        timeSaved: "3h/week",
        impact: "Reduces no-show rate by 35%"
      },
      {
        name: "Waitlist Engagement & Intake Preparation",
        description: "Waitlisted clients receive a weekly supportive message with mental health resources and a digital intake form to complete in advance, so their first appointment is maximally productive.",
        timeSaved: "3h/week",
        impact: "Retains 70% of waitlisted clients and reduces first-session admin by 20 minutes"
      },
      {
        name: "Between-Session Wellbeing Check-In",
        description: "Clients receive a brief weekly wellbeing check-in via Jotform between sessions. Responses indicating distress are immediately flagged to the assigned clinician for follow-up.",
        timeSaved: "2h/week",
        impact: "Enables early identification of clients in acute distress between sessions"
      },
      {
        name: "Outcome Measurement Automation",
        description: "Standardised outcome measures (e.g. PHQ-9, GAD-7) are sent automatically at intake, session 4, and discharge via Jotform, with results logged in Airtable and trended over time.",
        timeSaved: "3h/week",
        impact: "Achieves 80%+ outcome measurement compliance without admin effort"
      }
    ],
    tools: ["n8n", "Jotform", "Airtable", "Twilio"],
    stats: {
      timeSaved: "11h/week",
      revenueImpact: "$3,000/month",
      deploymentDays: 7,
      roiMonths: 1
    },
    faq: [
      {
        q: "How do you ensure automated messages are trauma-informed and clinically appropriate?",
        a: "All message templates are reviewed and approved by a senior clinician before going live, and messaging is designed to be warm, non-clinical, and always include crisis support information."
      },
      {
        q: "What happens when a between-session check-in indicates a client is in crisis?",
        a: "The system immediately sends an alert to the assigned clinician and their supervisor, and the client receives an automated message with crisis line contacts and instructions to seek immediate support."
      },
      {
        q: "Can outcome measures be configured for different treatment modalities or age groups?",
        a: "Yes, different measure sets can be configured for adult, youth, and different presenting concern pathways within the same system."
      }
    ]
  },
  {
    slug: "acupuncturist",
    name: "Acupuncturist",
    category: "Healthcare",
    tagline: "Grow your acupuncture practice with automated patient education, rebooking, and wellness plan management.",
    description: "Acupuncture practices thrive on repeat visits and long-term treatment relationships, making consistent patient communication and education essential to retention. Automation educates patients on treatment benefits between sessions, drives systematic rebooking, and manages wellness plan members with ease.",
    painPoints: [
      "New patients often discontinue after 2–3 sessions before experiencing full benefit due to lack of education",
      "Lapsed patients who stopped treatment are never systematically re-engaged",
      "Rebooking is left to the patient's initiative, creating gaps in the treatment schedule",
      "Wellness plan payment collection and compliance tracking is done manually"
    ],
    workflows: [
      {
        name: "New Patient Education Sequence",
        description: "Over their first 6 weeks of care, new patients receive a weekly educational email explaining what to expect at each stage of treatment and how acupuncture works for their specific condition.",
        timeSaved: "3h/week",
        impact: "Increases new patient retention past session 5 by 40%"
      },
      {
        name: "Lapsed Patient Reactivation Campaign",
        description: "Patients who have not booked in 60 days receive a personalised reactivation sequence referencing their original treatment goals and offering a discounted re-entry session.",
        timeSaved: "2h/week",
        impact: "Reactivates 20% of lapsed patients per campaign"
      },
      {
        name: "Systematic Rebooking Reminders",
        description: "Based on the recommended treatment frequency for each patient's condition, automated rebooking reminders fire at the appropriate interval with a direct online booking link.",
        timeSaved: "2h/week",
        impact: "Increases treatment plan adherence by 35%"
      },
      {
        name: "Wellness Plan Payment & Compliance",
        description: "Monthly wellness plan fees are charged automatically via Stripe, with receipts sent and a courtesy utilisation reminder for members who have not used their included visits.",
        timeSaved: "2h/week",
        impact: "Reduces involuntary churn and increases visit utilisation by 25%"
      }
    ],
    tools: ["n8n", "Stripe", "Twilio", "Calendly"],
    stats: {
      timeSaved: "9h/week",
      revenueImpact: "$2,500/month",
      deploymentDays: 7,
      roiMonths: 1
    },
    faq: [
      {
        q: "Can the education sequence be customised for different conditions (e.g. pain vs fertility vs stress)?",
        a: "Yes, different educational tracks can be configured for each condition category, with the appropriate sequence assigned at the time of intake."
      },
      {
        q: "Can the rebooking reminder interval be adjusted per patient?",
        a: "Yes, each patient's recommended visit frequency is stored in the system and used to calculate the right time to send rebooking prompts."
      },
      {
        q: "How does the system handle patients who prefer not to receive automated messages?",
        a: "Patients can opt out of non-essential communications at any time, and the system respects their preferences while continuing to send appointment-critical reminders."
      }
    ]
  },
  {
    slug: "midwife",
    name: "Midwife",
    category: "Healthcare",
    tagline: "Support every stage of the pregnancy journey with automated antenatal education and appointment management.",
    description: "Midwifery practices manage complex, emotionally significant care journeys with multiple touchpoints across pregnancy and the postnatal period, requiring consistent and timely communication. Automation delivers personalised educational content, appointment reminders, and postnatal check-ins that support both mother and midwife throughout the journey.",
    painPoints: [
      "Antenatal appointment reminders and preparation instructions are sent manually and inconsistently",
      "Expectant mothers between appointments feel unsupported without access to timely, relevant information",
      "Postnatal follow-up is inconsistent, with some new mothers not contacted until their 6-week check",
      "New client intake and booking for private midwifery services is a slow, paper-based process"
    ],
    workflows: [
      {
        name: "Antenatal Appointment Reminder Sequence",
        description: "Each antenatal appointment triggers an automated reminder 72 hours and 24 hours in advance, including preparation notes (e.g. bring urine sample, partner welcome) specific to the appointment type.",
        timeSaved: "3h/week",
        impact: "Reduces missed antenatal appointments by 30%"
      },
      {
        name: "Weekly Pregnancy Educational Journey",
        description: "From booking, expectant mothers receive a weekly SMS or email with relevant information about their current week of pregnancy, what to expect, and when to contact their midwife.",
        timeSaved: "3h/week",
        impact: "Significantly increases client satisfaction and reduces anxiety-driven contact"
      },
      {
        name: "Postnatal Check-In Sequence",
        description: "In the first 6 weeks postpartum, new mothers receive automated daily and then weekly wellbeing check-ins covering physical recovery, breastfeeding, and mental health, with escalation prompts for concerns.",
        timeSaved: "4h/week",
        impact: "Improves postnatal mental health screening rates by 50%"
      },
      {
        name: "Private Midwifery Booking & Intake",
        description: "Prospective private clients complete an online enquiry and intake form via Jotform, triggering an automated response with a package overview and a Calendly consultation booking link.",
        timeSaved: "2h/week",
        impact: "Increases private consultation conversion by 25%"
      }
    ],
    tools: ["n8n", "Jotform", "Calendly", "Twilio"],
    stats: {
      timeSaved: "12h/week",
      revenueImpact: "$2,800/month",
      deploymentDays: 7,
      roiMonths: 1
    },
    faq: [
      {
        q: "Can the weekly educational content be personalised for different pregnancy types (e.g. twin pregnancy, VBAC)?",
        a: "Yes, different educational tracks are available for different pregnancy categories, assigned at intake based on the client's individual circumstances."
      },
      {
        q: "How sensitive are the postnatal check-in messages?",
        a: "All postnatal messages are written with a warm, supportive tone and reviewed by a midwife. Any response indicating postnatal depression risk is immediately escalated to the midwife for a personal call."
      },
      {
        q: "Can partners or support persons be included in the communication journey?",
        a: "Yes, a partner or support person can be added as a secondary contact at intake and included in key communications throughout the pregnancy journey."
      }
    ]
  },
  {
    slug: "home-care-nurse",
    name: "Home Care Nurse",
    category: "Healthcare",
    tagline: "Optimise home care nurse scheduling, compliance tracking, and family communication with smart automation.",
    description: "Home care nursing services face complex scheduling demands, strict compliance documentation requirements, and the need to keep family members informed about their loved one's care. Automation streamlines visit scheduling, automates compliance reminders, and delivers regular family updates without adding to nurses' administrative burden.",
    painPoints: [
      "Scheduling home visits across multiple clients and nurses is complex and prone to errors or gaps",
      "Compliance documentation (visit records, medication administration) is often completed late or inconsistently",
      "Family members are not proactively kept informed about their loved one's care visits and progress",
      "Missed or rescheduled visits are communicated ad hoc, causing distress for clients and families"
    ],
    workflows: [
      {
        name: "Automated Visit Schedule & Reminders",
        description: "Clients and family members receive an automated daily SMS with the day's visit schedule, including nurse name and expected arrival window, reducing anxiety and improving satisfaction.",
        timeSaved: "4h/week",
        impact: "Reduces family inquiry calls by 50%"
      },
      {
        name: "Post-Visit Compliance Documentation Prompt",
        description: "Immediately after each visit time window, the assigned nurse receives an automated prompt to complete their visit notes in the system, with escalation to the supervisor if not done within 2 hours.",
        timeSaved: "3h/week",
        impact: "Achieves 95%+ same-day documentation compliance"
      },
      {
        name: "Family Progress Update Reports",
        description: "A weekly automated summary of the client's care visits, key observations, and any concerns is generated from visit records and emailed to the nominated family contact.",
        timeSaved: "4h/week",
        impact: "Significantly improves family satisfaction and reduces complaint rates"
      },
      {
        name: "Missed Visit Alert & Rescheduling",
        description: "If a nurse is unable to complete a scheduled visit, the system automatically alerts the client and family, notifies the scheduling team, and triggers a rescheduling workflow to minimise care gaps.",
        timeSaved: "2h/week",
        impact: "Reduces care gap time from hours to minutes when visits are missed"
      }
    ],
    tools: ["n8n", "Airtable", "Twilio", "Google Sheets"],
    stats: {
      timeSaved: "13h/week",
      revenueImpact: "$3,000/month",
      deploymentDays: 7,
      roiMonths: 1
    },
    faq: [
      {
        q: "Can the scheduling automation handle different visit types with different duration requirements?",
        a: "Yes, each visit type is configured with its own duration, and the scheduling system accounts for travel time between visits to build realistic daily schedules."
      },
      {
        q: "How do family members access the weekly progress reports?",
        a: "Reports are emailed directly to the nominated family contact as a PDF. Access can be restricted to authorised family members per the client's preferences."
      },
      {
        q: "Can multiple family members receive updates for the same client?",
        a: "Yes, up to 3 nominated family contacts can be set per client, each receiving the same scheduled updates and any urgent alerts."
      }
    ]
  },
  {
    slug: "massage-therapist",
    name: "Massage Therapist",
    category: "Healthcare",
    tagline: "Keep your massage therapy table fully booked with automated rebooking, recalls, and client loyalty programmes.",
    description: "Massage therapists depend on a loyal, returning client base and consistent appointment bookings to sustain a thriving practice. Automation handles the rebooking follow-up, package sales, and loyalty communications that most therapists do manually or not at all, freeing time for clients rather than admin.",
    painPoints: [
      "Clients intend to rebook but forget, leading to gaps in the appointment book",
      "Gift voucher and package expiry management is done manually and tracking is error-prone",
      "Lapsed clients who have not visited in 2–3 months are never proactively re-engaged",
      "Client birthday and loyalty milestone communications are inconsistent or non-existent"
    ],
    workflows: [
      {
        name: "Post-Session Rebooking Sequence",
        description: "24 hours after each massage, clients receive a personalised follow-up asking how they feel and a direct rebooking link with recommended timing based on their treatment type.",
        timeSaved: "3h/week",
        impact: "Increases rebooking rate by 40%"
      },
      {
        name: "Lapsed Client Reactivation Campaign",
        description: "Clients who have not visited in 8 weeks receive a personalised reactivation message with a special return offer, helping rebuild the appointment book from existing relationships.",
        timeSaved: "2h/week",
        impact: "Reactivates 20–25% of lapsed clients per campaign"
      },
      {
        name: "Gift Voucher & Package Expiry Alerts",
        description: "Clients with gift vouchers or treatment packages expiring within 30 days receive an automated reminder with a booking link, maximising redemption and revenue.",
        timeSaved: "2h/week",
        impact: "Increases voucher and package redemption rate by 35%"
      },
      {
        name: "Birthday & Loyalty Milestone Rewards",
        description: "Clients receive an automated birthday message with a special offer, and a loyalty reward at their 5th, 10th, and 20th visit milestones, building long-term retention.",
        timeSaved: "1h/week",
        impact: "Increases client lifetime value by 25%"
      }
    ],
    tools: ["n8n", "Twilio", "Calendly", "Stripe"],
    stats: {
      timeSaved: "8h/week",
      revenueImpact: "$2,200/month",
      deploymentDays: 7,
      roiMonths: 1
    },
    faq: [
      {
        q: "Can the rebooking timing be set differently for relaxation vs remedial massage clients?",
        a: "Yes, rebooking intervals and message content are configured per treatment type, so remedial clients get a different recommendation to relaxation or pregnancy massage clients."
      },
      {
        q: "How does the system track which visit number a client is on for loyalty rewards?",
        a: "The system counts confirmed completed appointments per client and automatically triggers the loyalty milestone message when the relevant visit number is reached."
      },
      {
        q: "Can gift vouchers sold through Stripe be automatically tracked for expiry reminders?",
        a: "Yes, Stripe purchase data flows into the tracking system and expiry reminders are triggered automatically based on the voucher validity period."
      }
    ]
  }
]
