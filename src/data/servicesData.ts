export interface CorporateService {
  number: string;
  id: string;
  icon: string;
  title: string;
  description: string;
  items: string[];
}

export interface DetailedCapability {
  no: string;
  title: string;
  description: string;
  tags: string[];
}

export interface IndustrySector {
  id: string;
  number: string;
  name: string;
}

export interface HowWeWorkStep {
  number: string;
  title: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export const CORPORATE_SERVICES: CorporateService[] = [
  {
    number: '01',
    id: 'staffing-recruitment',
    icon: '👥',
    title: 'Staffing & Recruitment',
    description: 'Flexible recruitment and staffing solutions for organizations of different sizes and industries.',
    items: [
      'IT & Non-IT Recruitment',
      'Permanent Hiring',
      'Contract Staffing',
      'Temporary Staffing',
      'Bulk Hiring',
      'Executive Search',
    ],
  },
  {
    number: '02',
    id: 'hr-solutions',
    icon: '💼',
    title: 'HR Solutions',
    description: 'Outsourced HR operations and structured people management support.',
    items: [
      'HR Outsourcing',
      'HR Operations',
      'Employee Lifecycle',
      'HR Policies & SOPs',
      'Attendance & Leave',
      'HR Administration',
    ],
  },
  {
    number: '03',
    id: 'payroll-outsourcing',
    icon: '💰',
    title: 'Payroll Outsourcing',
    description: 'Structured payroll processing and workforce payroll administration.',
    items: [
      'Payroll Processing',
      'Third-Party Payroll',
      'Salary Processing',
      'PF & ESI Support',
      'PT & LWF Support',
      'Payroll MIS',
    ],
  },
  {
    number: '04',
    id: 'manpower-solutions',
    icon: '🏢',
    title: 'Manpower Solutions',
    description: 'Workforce deployment solutions for operational and business requirements.',
    items: [
      'Skilled Manpower',
      'Semi-Skilled Manpower',
      'Blue-Collar Workforce',
      'White-Collar Workforce',
      'Managed Workforce',
      'Workforce Deployment',
    ],
  },
  {
    number: '05',
    id: 'facility-management',
    icon: '🛠️',
    title: 'Facility Management',
    description: 'Workforce and operational support for commercial and institutional facilities.',
    items: [
      'Housekeeping',
      'Security Manpower',
      'Office Support',
      'Facility Supervisors',
      'Pantry Staff',
      'Maintenance Support',
    ],
  },
  {
    number: '06',
    id: 'bpo-outsourcing',
    icon: '☎️',
    title: 'BPO & Outsourcing',
    description: 'Outsource repetitive and non-core business processes to improve operational efficiency.',
    items: [
      'Back-Office Operations',
      'Data Entry',
      'Customer Support',
      'Telecalling',
      'Documentation',
      'Administrative Support',
    ],
  },
  {
    number: '07',
    id: 'rpo-services',
    icon: '🎯',
    title: 'RPO Services',
    description: 'Recruitment Process Outsourcing for organizations looking to scale hiring operations.',
    items: [
      'End-to-End Recruitment',
      'Dedicated Recruiters',
      'Sourcing & Screening',
      'Interview Coordination',
      'Bulk Recruitment',
      'Recruitment MIS',
    ],
  },
  {
    number: '08',
    id: 'business-consulting',
    icon: '📊',
    title: 'Business Consulting',
    description: 'Practical consulting support for HR, workforce and operational processes.',
    items: [
      'HR Consulting',
      'Workforce Consulting',
      'Process Consulting',
      'HR Audit Support',
      'Policy Development',
      'Process Improvement',
    ],
  },
  {
    number: '09',
    id: 'compliance-support',
    icon: '📋',
    title: 'Compliance Support',
    description: 'Structured support for workforce-related statutory and HR administration requirements.',
    items: [
      'PF Administration Support',
      'ESI Administration Support',
      'PT & LWF Support',
      'Employee Records',
      'Compliance Documentation',
      'HR MIS',
    ],
  },
];

export const DETAILED_CAPABILITIES: DetailedCapability[] = [
  {
    no: '01 / STAFFING',
    title: 'Recruitment & Staffing Solutions',
    description:
      'Support for organizations requiring individual hiring, bulk recruitment, permanent recruitment, contract staffing, temporary staffing and specialized talent acquisition.',
    tags: ['Permanent Hiring', 'Contract Staffing', 'Bulk Hiring', 'Executive Search'],
  },
  {
    no: '02 / HR',
    title: 'HR Outsourcing & HR Operations',
    description:
      'HR administration, employee lifecycle support, documentation, policies, HR operations and workforce administration.',
    tags: ['HR Operations', 'HR Policies', 'Employee Lifecycle', 'HR Administration'],
  },
  {
    no: '03 / PAYROLL',
    title: 'Payroll & Third-Party Payroll',
    description:
      'Payroll administration for employees and outsourced workforce, including salary processing, payroll records, statutory administration support and MIS.',
    tags: ['Payroll Processing', 'Third-Party Payroll', 'PF', 'ESI', 'Payroll MIS'],
  },
  {
    no: '04 / WORKFORCE',
    title: 'Managed Manpower & Workforce Solutions',
    description:
      'Workforce deployment and management models for operational, field, warehouse, retail, logistics, production and other business requirements.',
    tags: ['Workforce Deployment', 'Managed Workforce', 'Skilled Workforce', 'Field Workforce'],
  },
  {
    no: '05 / FACILITY',
    title: 'Facility & Support Services',
    description:
      'Facility workforce solutions covering housekeeping, security, office support, pantry, maintenance and supervision requirements.',
    tags: ['Housekeeping', 'Security', 'Office Support', 'Maintenance'],
  },
  {
    no: '06 / BPO',
    title: 'BPO & Business Process Outsourcing',
    description:
      'Outsourced business process support for administrative, customer support, data, documentation and other non-core operational functions.',
    tags: ['Back Office', 'Data Entry', 'Customer Support', 'Telecalling'],
  },
  {
    no: '07 / RPO',
    title: 'Recruitment Process Outsourcing',
    description:
      'Recruitment operations delivered through dedicated recruitment resources and structured hiring processes.',
    tags: ['Sourcing', 'Screening', 'Interview Coordination', 'Bulk Hiring'],
  },
  {
    no: '08 / CONSULTING',
    title: 'Business & HR Consulting',
    description:
      'Consulting support for workforce planning, HR processes, recruitment operations, payroll processes, SOPs and business process improvement.',
    tags: ['HR Consulting', 'Process Consulting', 'SOPs', 'Workforce Planning'],
  },
];

export const INDUSTRY_SECTORS: IndustrySector[] = [
  { id: 'ind-01', number: '01', name: 'IT & Technology' },
  { id: 'ind-02', number: '02', name: 'BPO & KPO' },
  { id: 'ind-03', number: '03', name: 'E-Commerce' },
  { id: 'ind-04', number: '04', name: 'Retail' },
  { id: 'ind-05', number: '05', name: 'Logistics' },
  { id: 'ind-06', number: '06', name: 'Warehousing' },
  { id: 'ind-07', number: '07', name: 'Manufacturing' },
  { id: 'ind-08', number: '08', name: 'Healthcare' },
  { id: 'ind-09', number: '09', name: 'Education' },
  { id: 'ind-10', number: '10', name: 'Hospitality' },
  { id: 'ind-11', number: '11', name: 'BFSI' },
  { id: 'ind-12', number: '12', name: 'Startups & MSMEs' },
  { id: 'ind-13', number: '13', name: 'Infrastructure' },
  { id: 'ind-14', number: '14', name: 'Real Estate' },
  { id: 'ind-15', number: '15', name: 'Corporate Offices' },
  { id: 'ind-16', number: '16', name: 'Other Industries' },
];

export const HOW_WE_WORK_STEPS: HowWeWorkStep[] = [
  {
    number: '01',
    title: 'Understand',
    description: 'Understand your business and workforce requirements.',
  },
  {
    number: '02',
    title: 'Plan',
    description: 'Develop the appropriate service and workforce model.',
  },
  {
    number: '03',
    title: 'Deploy',
    description: 'Deploy people, processes and operational support.',
  },
  {
    number: '04',
    title: 'Manage',
    description: 'Monitor workforce, payroll, operations and service delivery.',
  },
  {
    number: '05',
    title: 'Improve',
    description: 'Review performance and continuously improve processes.',
  },
];

export const CORPORATE_STATS = [
  { value: '2019+', label: 'Business Journey' },
  { value: 'PAN', label: 'India Service Capability' },
  { value: 'IT +', label: 'Non-IT Workforce Solutions' },
  { value: '360°', label: 'Business & HR Support' },
];

export const CORPORATE_FAQS: ServiceFAQ[] = [
  {
    question: 'What services does RRGBS provide?',
    answer:
      'RRGBS provides Staffing, Recruitment, HR, Payroll, Manpower, Facility Management, BPO, RPO, Outsourcing and Business Consulting services.',
  },
  {
    question: 'Does RRGBS provide both IT and Non-IT recruitment?',
    answer:
      'Yes. RRGBS can support IT and Non-IT recruitment requirements, including permanent, contract and bulk hiring requirements.',
  },
  {
    question: 'Does RRGBS provide contract staffing?',
    answer:
      'Yes. Contract staffing and managed workforce solutions can be structured based on the client’s manpower, deployment and operational requirements.',
  },
  {
    question: 'Can RRGBS manage third-party payroll?',
    answer:
      'RRGBS offers payroll outsourcing and third-party payroll support covering payroll administration, employee records, salary processing and applicable statutory administration support.',
  },
  {
    question: 'What is RPO?',
    answer:
      'RPO means Recruitment Process Outsourcing. RRGBS can support recruitment operations such as sourcing, screening, coordination, bulk recruitment and recruitment administration.',
  },
  {
    question: 'Does RRGBS provide facility manpower?',
    answer:
      'Facility workforce solutions can include housekeeping, security manpower, office support, pantry support, supervisors and other facility-related staffing requirements.',
  },
];
