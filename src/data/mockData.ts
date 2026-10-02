import { Job, JobCategory, RecruitmentService } from '../types';

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Software Developer',
    company: 'IT Company',
    companyLogoText: 'IT',
    location: 'Bangalore',
    category: 'IT & Software',
    type: 'Full Time',
    experience: '2–4 Years',
    salary: '₹4 – ₹8 LPA',
    description: 'We are seeking an experienced Software Developer proficient in modern web applications, RESTful APIs, and database architecture to build robust enterprise client solutions.',
    skills: ['React.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'REST APIs'],
    responsibilities: [
      'Design, develop, and maintain responsive front-end and backend services.',
      'Collaborate with product managers and QA to deliver scalable features.',
      'Write clean, well-tested, and documented code adhering to engineering best practices.',
      'Optimize application performance and latency for high-traffic workloads.'
    ],
    requirements: [
      '2 to 4 years of hands-on experience in full-stack web software development.',
      'Proficiency in JavaScript/TypeScript, modern UI frameworks, and relational databases.',
      'Bachelor’s degree in Computer Science, Information Technology, or equivalent.'
    ],
    benefits: ['Health Insurance', 'Performance Bonus', 'Flexible Working Hours', 'Continuous Learning Allowance'],
    postedDate: 'Just now',
    isFeatured: true,
  },
  {
    id: 'job-2',
    title: 'Customer Support Executive',
    company: 'BPO Company',
    companyLogoText: 'BPO',
    location: 'Bangalore',
    category: 'BPO & Customer Support',
    type: 'Full Time',
    experience: '0–2 Years',
    salary: '₹18,000 – ₹28,000',
    description: 'Join a leading customer experience operations team providing multi-channel inbound customer support, query resolution, and CRM ticket management.',
    skills: ['Customer Service', 'Fluent English', 'Email & Chat Support', 'CRM Tools', 'Problem Solving'],
    responsibilities: [
      'Handle customer inquiries via phone calls, live chat, and ticketing systems.',
      'Maintain first-call resolution benchmarks and ensure high customer satisfaction.',
      'Document interactions accurately in customer relationship management systems.'
    ],
    requirements: [
      '0 to 2 years experience (freshers with good communication skills are encouraged to apply).',
      'Excellent verbal and written communication in English and Hindi/Kannada.',
      'Basic computer literacy and fast typing speed.'
    ],
    benefits: ['Cab Facility / Travel Allowance', 'Overtime Allowance', 'Rotational Shifts Incentives'],
    postedDate: '1 day ago',
    isFeatured: true,
  },
  {
    id: 'job-3',
    title: 'HR Recruiter',
    company: 'RRGBS',
    companyLogoText: 'HR',
    location: 'Shivamogga',
    category: 'HR & Administration',
    type: 'Full Time',
    experience: '0–3 Years',
    salary: '₹15,000 – ₹25,000',
    description: 'RRGBS is looking for an enthusiastic HR Recruiter to join our talent acquisition desk in Shivamogga, sourcing candidates for IT, Non-IT, and bulk staffing mandates.',
    skills: ['Talent Sourcing', 'Candidate Screening', 'Interview Scheduling', 'Portal Sourcing', 'Cold Calling'],
    responsibilities: [
      'Source candidate profiles through job portals, LinkedIn, and social networks.',
      'Conduct preliminary candidate phone screenings and evaluate candidate fit.',
      'Coordinate interview schedules with hiring managers and follow up throughout the hiring pipeline.',
      'Maintain candidate databases and recruitment pipeline reports.'
    ],
    requirements: [
      '0 to 3 years of recruitment experience (graduates with strong communication welcome).',
      'Knowledge of recruitment life cycles, staffing metrics, and candidate follow-ups.',
      'Resident of or willing to work from Shivamogga office.'
    ],
    benefits: ['Attractive Placement Incentives', 'Annual Appraisal', 'Supportive Team Culture'],
    postedDate: '2 days ago',
    isFeatured: true,
  },
  {
    id: 'job-4',
    title: 'Warehouse Executive',
    company: 'Logistics Company',
    companyLogoText: 'OPS',
    location: 'Bangalore',
    category: 'Logistics',
    type: 'Contract',
    experience: '0–2 Years',
    salary: '₹18,000 – ₹25,000',
    description: 'Looking for a dedicated Warehouse Executive to manage inventory sorting, inbound/outbound dispatches, and stock auditing at our central logistics fulfillment center.',
    skills: ['Inventory Tracking', 'Dispatch Coordination', 'Barcode Scanning', 'ERP / WMS', 'Material Handling'],
    responsibilities: [
      'Supervise loading, unloading, barcode scanning, and bin allocation of goods.',
      'Verify physical stock against digital dispatch manifests and purchase orders.',
      'Coordinate with fleet drivers and delivery partners for timely truck departures.'
    ],
    requirements: [
      '0 to 2 years experience in e-commerce, courier, or 3PL warehouse operations.',
      'Familiarity with warehouse management systems (WMS) and hand-held scanners.',
      'High attention to detail and punctuality.'
    ],
    benefits: ['Overtime Pay', 'Subsidized Canteen', 'Safety Gear Provided'],
    postedDate: '3 days ago',
  },
  {
    id: 'job-5',
    title: 'Frontend React Developer',
    company: 'FinTech Solutions India',
    companyLogoText: 'TECH',
    location: 'Bangalore',
    category: 'IT & Software',
    type: 'Full Time',
    experience: '3–5 Years',
    salary: '₹8 – ₹14 LPA',
    description: 'Join our digital banking platform team to design pixel-perfect financial dashboards, interactive data visualizations, and accessible client portals.',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Redux / Zustand', 'REST & GraphQL'],
    responsibilities: [
      'Implement modular, reusable React components with clean design system tokens.',
      'Integrate payment gateways, transaction histories, and user verification workflows.',
      'Ensure web performance optimization across mobile and desktop viewports.'
    ],
    requirements: [
      '3+ years building production web apps in React.js and modern JavaScript/TypeScript.',
      'Solid grasp of responsive layouts, state management, and web security basics.'
    ],
    benefits: ['Hybrid Work Policy', 'Comprehensive Health Cover', 'Gym Reimbursement'],
    postedDate: 'Just now',
    isFeatured: true,
  },
  {
    id: 'job-6',
    title: 'Business Development Executive',
    company: 'Apex Corporate Services',
    companyLogoText: 'SALE',
    location: 'Shivamogga',
    category: 'Sales & Marketing',
    type: 'Full Time',
    experience: '1–3 Years',
    salary: '₹2.5 – ₹4.5 LPA',
    description: 'Drive regional client acquisition for business services, B2B product sales, and client relationship management across Shivamogga and Malnad districts.',
    skills: ['B2B Sales', 'Lead Generation', 'Client Pitching', 'Negotiation', 'Field Sales'],
    responsibilities: [
      'Identify prospective commercial clients and book on-site introductory meetings.',
      'Present custom business packages and negotiate service contracts.',
      'Achieve monthly sales quotas and maintain clear CRM pipelines.'
    ],
    requirements: [
      '1 to 3 years experience in field sales or corporate sales.',
      'Fluent in Kannada and English; valid two-wheeler driving license.'
    ],
    benefits: ['Travel Allowance (TA/DA)', 'Quarterly Incentive Bonuses', 'Phone Allowance'],
    postedDate: '4 days ago',
  },
  {
    id: 'job-7',
    title: 'Production Quality Inspector',
    company: 'Precision Engineering Works',
    companyLogoText: 'MFG',
    location: 'Bangalore',
    category: 'Manufacturing',
    type: 'Full Time',
    experience: '1–4 Years',
    salary: '₹22,000 – ₹32,000',
    description: 'Responsible for precision component quality checks, dimensional verification using vernier calipers, micrometers, and maintaining ISO batch inspection logs.',
    skills: ['Quality Assurance', 'Vernier Caliper', 'Micrometer', 'ISO 9001', 'Defect Analysis'],
    responsibilities: [
      'Perform in-line and final stage quality inspections on machined metal components.',
      'Isolate non-conforming items and prepare First Article Inspection (FAI) reports.',
      'Ensure compliance with industrial plant safety standards.'
    ],
    requirements: [
      'Diploma or ITI in Mechanical / Automobile Engineering.',
      'Ability to read engineering blueprints and dimensional GD&T drawings.'
    ],
    benefits: ['Shift Allowance', 'ESI & PF Benefits', 'Annual Safety Bonus'],
    postedDate: '5 days ago',
  },
  {
    id: 'job-8',
    title: 'Graduate Trainee - 2025/2026 Batch',
    company: 'RRGBS Client Connect',
    companyLogoText: 'GRAD',
    location: 'Bangalore',
    category: 'Freshers',
    type: 'Internship',
    experience: 'Fresher (0 Years)',
    salary: '₹15,000 – ₹20,000',
    description: 'Exciting 6-month graduate trainee opportunity for recent college graduates looking to kickstart their corporate career with structured training and full-time conversion.',
    skills: ['Fast Learner', 'Communication', 'MS Office / Excel', 'Problem Solving', 'Team Player'],
    responsibilities: [
      'Undergo intensive corporate orientation and practical operational training.',
      'Assist senior project leads with data compilation, documentation, and coordination.',
      'Complete weekly case evaluations and show proactive learning.'
    ],
    requirements: [
      'B.E / B.Tech / BCA / B.Com / BBA / B.Sc graduates (freshers welcome).',
      'Eager to learn, strong interpersonal skills, and professional demeanor.'
    ],
    benefits: ['PPO (Pre-Placement Offer) on performance', 'Mentorship from Industry Leaders', 'Certificate of Completion'],
    postedDate: 'Today',
    isFeatured: true,
  },
  {
    id: 'job-9',
    title: 'Remote Content Moderator & Reviewer',
    company: 'Global Media Ops',
    companyLogoText: 'WFH',
    location: 'Remote',
    category: 'Work From Home',
    type: 'Work From Home',
    experience: '0–2 Years',
    salary: '₹20,000 – ₹30,000',
    description: 'Review digital user submissions, articles, and community postings from home. Ensure compliance with community safety guidelines and brand safety policies.',
    skills: ['Content Moderation', 'Attention to Detail', 'Policy Adherence', 'High-Speed Internet', 'Time Management'],
    responsibilities: [
      'Assess user-generated text, image, and video content against strict safety policies.',
      'Flag abusive, copyrighted, or violating material efficiently.',
      'Maintain speed and accuracy standards on cloud review dashboards.'
    ],
    requirements: [
      'Personal computer/laptop with reliable high-speed broadband connection.',
      'Strong reading comprehension and objective judgment.',
      'Freshers and experienced candidates both eligible.'
    ],
    benefits: ['100% Work from Home', 'Broadband Subsidy', 'Flexible Shift Schedules'],
    postedDate: '1 day ago',
  },
  {
    id: 'job-10',
    title: 'Payroll & Compliance Specialist',
    company: 'RRGBS Workforce Solutions',
    companyLogoText: 'PAY',
    location: 'Shivamogga',
    category: 'HR & Administration',
    type: 'Full Time',
    experience: '2–5 Years',
    salary: '₹3 – ₹5.5 LPA',
    description: 'Oversee end-to-end payroll processing, PF, ESI, Professional Tax, TDS compliance, and statutory filings for contracted client personnel.',
    skills: ['Payroll Processing', 'PF & ESI Compliance', 'Statutory Filings', 'Excel / Tally', 'Salary Structuring'],
    responsibilities: [
      'Compute monthly payroll cycles, employee leaves, overtime, and deductions.',
      'Generate statutory challans for Provident Fund, Employee State Insurance, and PT.',
      'Resolve employee salary grievances and ensure seamless bank transfer runs.'
    ],
    requirements: [
      '2+ years handling payroll or statutory compliance in a staffing or corporate agency.',
      'Proficiency in Indian labor laws, PF portals, and advanced spreadsheet formulas.'
    ],
    benefits: ['Annual Performance Bonus', 'Corporate Health Insurance', '5-day Work Week'],
    postedDate: '3 days ago',
  }
];

export const CATEGORIES: JobCategory[] = [
  {
    id: 'cat-it',
    title: 'IT & Software',
    icon: '💻',
    count: 24,
    description: 'Technology & software jobs',
  },
  {
    id: 'cat-bpo',
    title: 'BPO & Customer Support',
    icon: '📞',
    count: 18,
    description: 'Customer service opportunities',
  },
  {
    id: 'cat-sales',
    title: 'Sales & Marketing',
    icon: '📊',
    count: 15,
    description: 'Sales and business development',
  },
  {
    id: 'cat-mfg',
    title: 'Manufacturing',
    icon: '🏭',
    count: 12,
    description: 'Industrial opportunities',
  },
  {
    id: 'cat-logistics',
    title: 'Logistics',
    icon: '🚚',
    count: 14,
    description: 'Warehouse & delivery jobs',
  },
  {
    id: 'cat-hr',
    title: 'HR & Administration',
    icon: '👨‍💼',
    count: 11,
    description: 'HR and office positions',
  },
  {
    id: 'cat-freshers',
    title: 'Freshers',
    icon: '🎓',
    count: 32,
    description: 'Entry-level opportunities',
  },
  {
    id: 'cat-wfh',
    title: 'Work From Home',
    icon: '🏠',
    count: 16,
    description: 'Remote opportunities',
  },
];

export const RECRUITMENT_SERVICES: RecruitmentService[] = [
  {
    id: 'serv-1',
    title: 'Permanent Hiring',
    icon: '👥',
    description: 'Professional recruitment solutions for permanent positions.',
    features: ['Direct hire talent search', 'Rigorous pre-screening', 'Role-specific assessments', 'Guaranteed candidate replacement warranty']
  },
  {
    id: 'serv-2',
    title: 'Contract Staffing',
    icon: '🏢',
    description: 'Flexible workforce solutions for short and long-term requirements.',
    features: ['Rapid project deployments', 'Zero long-term headcount liability', 'Third-party payroll compliance', 'Scalable ramp-up and ramp-down']
  },
  {
    id: 'serv-3',
    title: 'RPO Services',
    icon: '📋',
    description: 'Recruitment process outsourcing for growing organizations.',
    features: ['Dedicated talent acquisition desk', 'ATS & pipeline management', 'Reduced cost-per-hire', 'Employer branding optimization']
  },
  {
    id: 'serv-4',
    title: 'Payroll Outsourcing',
    icon: '💰',
    description: 'Payroll administration and workforce compliance support.',
    features: ['Statutory PF, ESI, PT filings', 'Direct bank disbursement runs', 'Digital payslips & tax reports', '100% labor compliance guarantee']
  },
  {
    id: 'serv-5',
    title: 'Bulk Hiring',
    icon: '🚀',
    description: 'Large-scale hiring support for business expansion.',
    features: ['Campus placement drives', 'High-volume screening days', 'Rapid onboarding pipelines', 'PAN-India talent sourcing']
  },
  {
    id: 'serv-6',
    title: 'Executive Search',
    icon: '🎯',
    description: 'Specialized hiring for critical and senior-level positions.',
    features: ['Confidential headhunting', 'Leadership competency mapping', 'Executive background verification', 'Industry benchmark compensation review']
  },
  {
    id: 'serv-7',
    title: 'Managed Workforce',
    icon: '⚙️',
    description: 'End-to-end workforce management solutions.',
    features: ['On-site supervisory support', 'Attendance & SLA tracking', 'Productivity metrics reporting', 'Complete shift lifecycle governance']
  },
  {
    id: 'serv-8',
    title: 'HR Outsourcing',
    icon: '📑',
    description: 'Business-friendly HR support and compliance solutions.',
    features: ['Policy & handbook drafting', 'Performance appraisal setup', 'Employee grievance handling', 'Labor court & audit advisory']
  },
];

export const WHY_POINTS = [
  {
    icon: '🔎',
    title: 'Job Discovery',
    description: 'Search opportunities using job title, skills, location and job type with transparent salary ranges and verified hiring employers.',
  },
  {
    icon: '🤝',
    title: 'Recruitment Support',
    description: 'Candidates and employers can access dedicated RRGBS recruitment specialists to guide screening, scheduling, and onboarding.',
  },
  {
    icon: '🌐',
    title: 'PAN India Opportunities',
    description: 'Discover opportunities across Karnataka, Bangalore, Shivamogga, Tier-1 hubs, and emerging industrial cities across India.',
  },
];

export const STATS = [
  { label: 'Active Openings', value: '450+' },
  { label: 'Candidates Placed', value: '5,000+' },
  { label: 'Partner Employers', value: '250+' },
  { label: 'Cities Covered', value: '20+' },
];
