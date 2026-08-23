import { AwardCategory, ImportantDate, Winner, GalleryItem, Testimonial, JuryMember, FaqItem } from '../types';

export const AWARDS_METADATA = {
  edition: "2026 Edition",
  title: "TuRight National Education Awards",
  shortTitle: "TuRight Education Awards",
  tagline: "Honoring Visionaries, Transforming Learning, Empowering the Nation",
  description: "The premier national recognition program celebrating educators, institutions, and innovators shaping the future of global and national education.",
  nominationDeadline: "2026-11-15T23:59:59",
  ceremonyDate: "December 18, 2026",
  venue: "Grand Convention Center & National Education Conclave, New Delhi",
  organizer: "TuRight Educational Foundation & National Academic Council",
  contactEmail: "awards@turight.org",
  contactPhone: "+91 98765 43210 / +91 11 2345 6789",
  address: "TuRight Tower, National Education Hub, Institutional Area, New Delhi - 110001",
};

export const STATS_HIGHLIGHTS = [
  { value: "25+", label: "Award Categories", sub: "Covering K-12 to Higher Ed" },
  { value: "1,200+", label: "Institutions Nominated", sub: "Across 28 States & UTs" },
  { value: "45+", label: "Distinguished Jury", sub: "Eminent academicians & leaders" },
  { value: "100%", label: "Merit-Based Process", sub: "Rigorous 3-stage evaluation" },
];

export const AWARD_CATEGORIES: AwardCategory[] = [
  {
    id: "best-educator",
    title: "Best Educator of the Year",
    categoryType: "educators",
    shortDescription: "Recognizes exceptional school and collegiate teachers with groundbreaking pedagogy, student mentorship, and transformative classroom impact.",
    fullDescription: "The Best Educator of the Year Award honors outstanding teaching professionals across primary, secondary, and higher education levels who exhibit phenomenal dedication to student development, innovative pedagogical methodologies, inclusive teaching frameworks, and measurable student progress.",
    eligibility: [
      "Full-time educators with a minimum of 3 years teaching experience",
      "Recognized school, college, or university affiliation",
      "Documented student outcomes and pedagogical innovation"
    ],
    evaluationCriteria: [
      "Teaching philosophy and classroom innovation (30%)",
      "Student development and academic outcomes (25%)",
      "Mentorship, empathy, and holistic support (20%)",
      "Peer recognition and continuous professional development (25%)"
    ],
    iconName: "GraduationCap",
    nominationFee: "Free for early submissions (Official fee structure: Placeholder)",
    badge: "Flagship Category",
  },
  {
    id: "outstanding-school",
    title: "Outstanding School of Excellence",
    categoryType: "institutions",
    shortDescription: "Honors primary and secondary institutions achieving holistic excellence in academics, infrastructure, values, and student well-being.",
    fullDescription: "This coveted institutional accolade honors K-12 schools that demonstrate stellar academic curricula, state-of-the-art infrastructure, inclusive learning environments, athletic and creative programs, and an enduring commitment to student character development.",
    eligibility: [
      "Accredited government, private, or international schools",
      "Minimum 5 years of operational excellence",
      "Clear safety, inclusion, and academic compliance records"
    ],
    evaluationCriteria: [
      "Academic performance & progressive curriculum (25%)",
      "Infrastructure, sports & creative arts facilities (25%)",
      "Faculty development and teacher-student ratio (25%)",
      "Community engagement, safety & values framework (25%)"
    ],
    iconName: "School",
    nominationFee: "Institutional Entry (Official fee structure: Placeholder)",
    badge: "Institutional",
  },
  {
    id: "innovative-educator",
    title: "Innovative Educator Award",
    categoryType: "innovation",
    shortDescription: "Celebrates educators pioneering digital tools, experiential STEM/STEAM learning, and interactive curriculum design.",
    fullDescription: "Dedicated to forward-thinking educators who break traditional boundaries by integrating technology, project-based learning, artificial intelligence, gamification, and creative interdisciplinary strategies into the learning ecosystem.",
    eligibility: [
      "Teachers, professors, tutors, or instructional designers",
      "Demonstrated original teaching methodologies or open educational resources",
      "Evidence of enhanced student engagement"
    ],
    evaluationCriteria: [
      "Originality and creativity of pedagogical approach (35%)",
      "Measurable engagement and learning retention (30%)",
      "Scalability and adaptability of the innovation (20%)",
      "Student & peer feedback (15%)"
    ],
    iconName: "Sparkles",
    nominationFee: "Free Submission (Official fee structure: Placeholder)",
    badge: "Tech & Pedagogy",
  },
  {
    id: "education-leadership",
    title: "Excellence in Education Leadership",
    categoryType: "leadership",
    shortDescription: "Honors Principals, Chancellors, Deans, and Directors whose strategic vision has elevated their institutions to national prominence.",
    fullDescription: "Recognizing visionary administrative leaders whose inspiring governance, empathetic leadership, educational policy advocacy, and crisis resilience have empowered faculty, energized student bodies, and transformed institutional reputation.",
    eligibility: [
      "Principals, Headmasters, Deans, Vice-Chancellors, or Trustees",
      "Minimum 5 years in an educational executive leadership role",
      "Clear institutional growth and impact milestones"
    ],
    evaluationCriteria: [
      "Strategic vision and institutional transformation (35%)",
      "Faculty empowerment and culture building (25%)",
      "Community impact and policy contribution (20%)",
      "Governance, transparency & student welfare (20%)"
    ],
    iconName: "Award",
    nominationFee: "Nomination Open (Official fee structure: Placeholder)",
    badge: "Visionary",
  },
  {
    id: "educational-innovation",
    title: "Excellence in Educational Innovation",
    categoryType: "innovation",
    shortDescription: "Awarded to groundbreaking learning programs, labs, curriculum designs, or research projects revolutionizing modern pedagogy.",
    fullDescription: "Recognizes breakthrough educational frameworks, multidisciplinary incubators, research-to-classroom pipelines, and sustainable school models that set new benchmarks for 21st-century education.",
    eligibility: [
      "Educational institutions, research teams, non-profits, or academic departments",
      "Implemented innovation with proven track record over at least 1 academic cycle",
      "Documented qualitative and quantitative impact"
    ],
    evaluationCriteria: [
      "Innovation depth and disruption of conventional roadblocks (30%)",
      "Practical feasibility and cost-effectiveness (25%)",
      "Positive impact on learners and educators (30%)",
      "Replicability across diverse educational demographics (15%)"
    ],
    iconName: "Lightbulb",
    nominationFee: "Open for Entries (Official fee structure: Placeholder)",
    badge: "Breakthrough",
  },
  {
    id: "edtech-pioneer",
    title: "EdTech Pioneer & Platform of the Year",
    categoryType: "edtech",
    shortDescription: "Recognizes digital learning platforms, AI learning aids, and assistive technologies making learning accessible to all.",
    fullDescription: "Honoring technology companies, digital startups, and software creators whose products enhance digital accessibility, personalized learning paths, student retention, and teacher enablement.",
    eligibility: [
      "Registered EdTech enterprise or digital educational service",
      "Active user base in schools, colleges, or self-learners",
      "Strict data privacy, child safety, and security compliance"
    ],
    evaluationCriteria: [
      "User experience, accessibility and instructional effectiveness (35%)",
      "Technological robustness and data security (25%)",
      "Reach across underserved or diverse populations (20%)",
      "Measurable learning outcome improvements (20%)"
    ],
    iconName: "Laptop",
    nominationFee: "Corporate/Startup Entry (Official fee structure: Placeholder)",
    badge: "EdTech",
  },
  {
    id: "inclusive-education",
    title: "Champion of Inclusive & Special Needs Education",
    categoryType: "educators",
    shortDescription: "Honoring individuals and centers championing neurodiverse learners, physically challenged students, and marginalized communities.",
    fullDescription: "Celebrating dedicated special educators, shadow teachers, and inclusive learning centers that dismantle barriers and provide equitable education to neurodivergent students and disadvantaged learners.",
    eligibility: [
      "Special education professionals, resource centers, or inclusive schools",
      "Active programs supporting students with diverse learning needs",
      "Evidence of personalized learning frameworks"
    ],
    evaluationCriteria: [
      "Compassionate, individualized learning methodologies (35%)",
      "Barrier-free accessibility and assistive technology usage (25%)",
      "Empowerment of families and communities (20%)",
      "Advocacy for inclusive policy (20%)"
    ],
    iconName: "HeartHandshake",
    nominationFee: "Complimentary Entry (Official fee structure: Placeholder)",
    badge: "Special Recognition",
  },
  {
    id: "higher-ed-excellence",
    title: "Outstanding University / Higher Ed Institution",
    categoryType: "institutions",
    shortDescription: "Recognizes premier colleges and universities spearheading research publications, global placements, and world-class faculty.",
    fullDescription: "Celebrating higher educational institutions with exemplary academic rigour, high impact factor research, industry partnerships, state-of-the-art laboratories, and robust career placement records.",
    eligibility: [
      "Recognized University, Autonomous College, or Poly-technical Institute",
      "NAAC/NBA/UGC or equivalent international accreditation",
      "Demonstrated research outputs and placement statistics"
    ],
    evaluationCriteria: [
      "Research output, patents and citations (30%)",
      "Industry collaboration and campus placements (25%)",
      "Faculty qualifications & international exposure (25%)",
      "Student entrepreneurship & incubation ecosystem (20%)"
    ],
    iconName: "Building2",
    nominationFee: "Institutional Entry (Official fee structure: Placeholder)",
    badge: "Higher Ed",
  }
];

export const IMPORTANT_DATES: ImportantDate[] = [
  {
    id: "phase-1",
    phase: "Phase 01",
    title: "Call for Nominations Open",
    date: "August 15, 2026",
    isoDate: "2026-08-15",
    status: "completed",
    description: "Online nomination portal goes live for educators, institutions, and organizations nationwide.",
    iconName: "Send"
  },
  {
    id: "phase-2",
    phase: "Phase 02",
    title: "Nomination Submission Deadline",
    date: "November 15, 2026",
    isoDate: "2026-11-15",
    status: "active",
    description: "Final deadline for submitting dossiers, endorsement letters, and supporting case studies.",
    iconName: "Clock"
  },
  {
    id: "phase-3",
    phase: "Phase 03",
    title: "Independent Jury Evaluation & Shortlisting",
    date: "November 20 - 30, 2026",
    isoDate: "2026-11-20",
    status: "upcoming",
    description: "Grand Jury panel audits dossiers, conducts blind evaluations, and confirms category shortlists.",
    iconName: "CheckCircle2"
  },
  {
    id: "phase-4",
    phase: "Phase 04",
    title: "Finalist Announcement & Verification",
    date: "December 05, 2026",
    isoDate: "2026-12-05",
    status: "upcoming",
    description: "Top 3 finalists in each category are notified with official invitations to the National Ceremony.",
    iconName: "Trophy"
  },
  {
    id: "phase-5",
    phase: "Phase 05",
    title: "Grand Gala Awards Ceremony",
    date: "December 18, 2026",
    isoDate: "2026-12-18",
    status: "upcoming",
    description: "Prestigious red-carpet national ceremony, live telecast, keynote addresses, and trophy distribution.",
    iconName: "Sparkles"
  }
];

export const PREVIOUS_WINNERS: Winner[] = [
  {
    id: "w-1",
    name: "Dr. Ananya Sharma",
    designation: "Head of Science & STEAM Innovation",
    institution: "St. Xavier's International Academy",
    category: "Best Educator of the Year",
    year: "2025",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    achievement: "Pioneered low-cost solar-powered science kits across 40 rural classrooms, boosting student STEM retention by 78%.",
    quote: "Receiving the TuRight National Education Award gave our grassroots science initiatives national credibility and vital philanthropic backing.",
    state: "Maharashtra",
    tags: ["STEM Pedagogy", "Rural Outreach", "STEAM"]
  },
  {
    id: "w-2",
    name: "Heritage Valley Global School",
    designation: "Awarded to Principal Rajeshwar Mehta",
    institution: "Heritage Valley Education Campus",
    category: "Outstanding School of Excellence",
    year: "2025",
    avatarUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80",
    achievement: "Recognized for exemplary zero-carbon campus design, 100% digital literacy curriculum, and inclusive neurodiverse classrooms.",
    quote: "A testament to our teachers and students who believe that true education nurtures empathy alongside academic excellence.",
    state: "Karnataka",
    tags: ["Green Campus", "Inclusive", "Holistic Ed"]
  },
  {
    id: "w-3",
    name: "Prof. Raghavendra Joshi",
    designation: "Dean of Academic Innovations",
    institution: "National Institute of Advanced Tech",
    category: "Excellence in Education Leadership",
    year: "2025",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    achievement: "Established 12 interdisciplinary research incubators that generated 34 patents and 18 student-led spin-off tech ventures.",
    quote: "TuRight sets a golden standard for rewarding leaders who dare to rewrite traditional academic boundaries.",
    state: "Delhi NCR",
    tags: ["Research Incubator", "Patents", "Higher Ed"]
  },
  {
    id: "w-4",
    name: "Dr. Meenakshi Sundaram",
    designation: "Founder & Special Educator",
    institution: "Samarthya Learning Foundation",
    category: "Champion of Inclusive Education",
    year: "2024",
    avatarUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
    achievement: "Developed sensory learning tools and tactile math modules adopted by 120+ public schools for dyslexic and autistic learners.",
    quote: "The recognition opened doors for policy makers to listen to the urgent needs of neurodivergent learners across the country.",
    state: "Tamil Nadu",
    tags: ["Special Ed", "Sensory Tools", "Inclusion"]
  },
  {
    id: "w-5",
    name: "EduVerse Interactive",
    designation: "Represented by CEO Rohan Verma",
    institution: "EduVerse Technologies Ltd.",
    category: "EdTech Pioneer of the Year",
    year: "2024",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    achievement: "Deployed offline AI tutoring tablets to 250,000+ vernacular-speaking students in underserved regions.",
    quote: "TuRight Awards rigorously validated our pedagogical impact rather than just startup metrics.",
    state: "Telangana",
    tags: ["AI Tutoring", "Vernacular", "Accessibility"]
  },
  {
    id: "w-6",
    name: "Sister Mary Catherine",
    designation: "Senior Educator & Life Mentor",
    institution: "St. Teresa Community High School",
    category: "Innovative Educator Award",
    year: "2024",
    avatarUrl: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80",
    achievement: "35 years of teaching literature through theater and community service learning, mentoring over 6,000 first-generation learners.",
    quote: "Every teacher’s heart beats for the moment their students discover their voice. This honor is for every humble classroom.",
    state: "Kerala",
    tags: ["Literature", "Community", "Lifetime Impact"]
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g-1",
    title: "National Trophy Presentation Ceremony",
    category: "ceremony",
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
    caption: "Dignitaries presenting the prestigious TuRight National Trophy to the Educator of the Year.",
    year: "2025"
  },
  {
    id: "g-2",
    title: "Keynote Address on the Future of AI in Education",
    category: "keynote",
    imageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
    caption: "Academic leaders discussing adaptive learning paradigms and educational equity.",
    year: "2025"
  },
  {
    id: "g-3",
    title: "Educators and School Leaders Networking Conclave",
    category: "ceremony",
    imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
    caption: "Over 500 school heads and awardees collaborating during the National Education Gala.",
    year: "2025"
  },
  {
    id: "g-4",
    title: "Interactive Classroom & STEAM Lab Innovations",
    category: "campus",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    caption: "Award-winning experimental pedagogy in modern student laboratories.",
    year: "2025"
  },
  {
    id: "g-5",
    title: "Celebrating Excellence on Stage",
    category: "winners",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    caption: "Winners posing with citations and gold statuettes during the gala finale.",
    year: "2025"
  },
  {
    id: "g-6",
    title: "Inspiring Future Generations in the Classroom",
    category: "campus",
    imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80",
    caption: "Teacher mentoring young students in collaborative problem-solving.",
    year: "2025"
  },
  {
    id: "g-7",
    title: "Distinguished Jury Round Table",
    category: "keynote",
    imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80",
    caption: "Jury deliberations ensuring transparent, merit-driven evaluation.",
    year: "2024"
  },
  {
    id: "g-8",
    title: "Grand Stage and Award Gala Lighting",
    category: "ceremony",
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
    caption: "The glittering stage ready to receive national education champions.",
    year: "2024"
  }
];

export const JURY_MEMBERS: JuryMember[] = [
  {
    id: "j-1",
    name: "Prof. Dr. Vikramaditya Sen",
    title: "Former Vice-Chancellor & Education Policy Advisor",
    institution: "National Academic Council",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    bio: "40+ years in university governance, curriculum reform, and higher education accreditation boards."
  },
  {
    id: "j-2",
    name: "Dr. Arundhati Roy Chowdhury",
    title: "Senior Fellow in Educational Psychology",
    institution: "Center for Pedagogical Research",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    bio: "Leading specialist in early childhood learning models, teacher training, and emotional intelligence in schools."
  },
  {
    id: "j-3",
    name: "Prof. K. R. Nambiar",
    title: "Emeritus Professor & STEM Curriculum Pioneer",
    institution: "Indian Institute of Science Education",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    bio: "Author of 14 national textbooks and pioneer of hands-on experimental science education in school systems."
  },
  {
    id: "j-4",
    name: "Dr. Shalini Mukhopadhyay",
    title: "Director of Inclusive Learning & Neurodiversity",
    institution: "Global Education Equity Initiative",
    imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80",
    bio: "Advocate for universal design for learning (UDL) and accessibility across rural and urban institutions."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-1",
    name: "Dr. Sandeep K. Verma",
    role: "Principal",
    institution: "Delhi Public Global Academy",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    content: "The TuRight National Education Awards stands out for its absolute transparency, rigorous audit standards, and dignified recognition of educators who rarely step into the limelight.",
    year: "2025",
    awardWon: "Outstanding School of Excellence"
  },
  {
    id: "t-2",
    name: "Priyanka Nair",
    role: "Senior Math Educator & STEAM Lead",
    institution: "Vidyashilp High School",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    content: "Winning the Innovative Educator award motivated my entire faculty to adopt project-based learning. TuRight is a beacon of encouragement for passionate teachers.",
    year: "2025",
    awardWon: "Innovative Educator Award"
  },
  {
    id: "t-3",
    name: "Fr. Thomas Kurien",
    role: "Director",
    institution: "St. Aloysius Education Trust",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    content: "An immaculately organized program with a jury composed of respected scholars. The TuRight platform sets an inspiring benchmark for Indian education.",
    year: "2024",
    awardWon: "Excellence in Education Leadership"
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    question: "Who is eligible to nominate for the TuRight National Education Awards?",
    answer: "Nominations are open to individual teachers, professors, school principals, higher education administrators, research faculties, educational institutions (K-12, colleges, universities), non-profits, and EdTech enterprises across the nation. Both self-nominations and third-party endorsements by colleagues, alumni, or institutional boards are accepted.",
    category: "general"
  },
  {
    id: "faq-2",
    question: "Can I nominate my own school, college, or self as an educator?",
    answer: "Yes. Self-nominations are fully recognized and evaluated under the exact same blind evaluation rubric as third-party nominations. Please ensure you provide comprehensive supporting evidence, student impact data, and professional references.",
    category: "nomination"
  },
  {
    id: "faq-3",
    question: "Is there any nomination or processing fee for entries?",
    answer: "The TuRight National Education Awards prioritizes merit above all. Basic submissions for individual educators and grassroots innovators are free of charge. Institutional and corporate submissions may have standard administrative processing guidelines (Official fee structure: Placeholder - to be announced in the official prospectus).",
    category: "fees"
  },
  {
    id: "faq-4",
    question: "What documents and supporting materials are required during nomination?",
    answer: "Nominees should prepare: (1) A detailed summary of achievements & teaching methodology (maximum 1,000 words), (2) Professional CV or Institutional profile, (3) High-resolution photograph or institutional logo, (4) Letters of recommendation or testimonials, and (5) Optional portfolio links, video clips, or published research papers.",
    category: "nomination"
  },
  {
    id: "faq-5",
    question: "How does the evaluation and jury selection process work?",
    answer: "The selection follows a 3-stage process: (Stage 1) Technical validation & eligibility compliance audit, (Stage 2) Blind evaluation and scoring by the expert jury panel against weighted rubrics, (Stage 3) Verification checks and confirmation of the top 3 finalists per category followed by the national gala announcement.",
    category: "eligibility"
  },
  {
    id: "faq-6",
    question: "When and where will the winners be announced?",
    answer: "Finalists will be notified via email by December 05, 2026. The final national award recipients will be honored live on stage during the grand gala ceremony on December 18, 2026, held at the Grand Convention Center, New Delhi.",
    category: "dates"
  },
  {
    id: "faq-7",
    question: "Can an institution or educator apply in multiple award categories?",
    answer: "Yes. An applicant may apply in up to three distinct categories, provided separate dossiers tailored to each specific category's criteria are submitted.",
    category: "nomination"
  },
  {
    id: "faq-8",
    question: "How can I get assistance or contact the awards coordination team?",
    answer: "You can reach the official awards secretariat via email at awards@turight.org, or through our helpline at +91 98765 43210 (Mon-Sat, 9:00 AM – 6:00 PM IST). You can also use the contact form located at the bottom of this website.",
    category: "general"
  }
];

export const PARTNERS_LIST = [
  { name: "National Academic Council", type: "Academic Patron" },
  { name: "Global EduTech Forum", type: "Technology Partner" },
  { name: "Higher Ed Insights India", type: "Knowledge Partner" },
  { name: "National Teachers Alliance", type: "Outreach Partner" },
  { name: "Scholastic Media Group", type: "Media Broadcast Partner" },
  { name: "Future Learning Labs", type: "Innovation Partner" },
];
