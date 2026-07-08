/**
 * All resume content lives in this one file. Components import from here
 * instead of hard-coding text, so updating the site's content later never
 * requires touching component/layout code.
 */

export const profile = {
  name: "Nithish Kumar",
  headline: "Cloud Operations Engineer & SRE-Focused Software Engineer",
  location: "Dublin, Ireland",
  email: "nithish21kumar04@gmail.com",
  phone: "+353 089 985 3696",
  resumeFile: "/resume.pdf", // drop your actual PDF into client/public/resume.pdf
  heroSummary:
    "I keep customer-facing, cloud-hosted systems fast, available, and observable. Three-plus years operating and building on AWS, Azure and GCP - from triaging live incidents across distributed microservices to shipping the backend services and automation that prevent the next one.",
  about:
    "Cloud Operations-focused software engineer with 3+ years of experience running secure, scalable, high-performing systems for customer-facing workloads. Comfortable across the full incident lifecycle - Linux administration, monitoring, alerting, triage, root cause analysis and SOP documentation - and equally comfortable writing the Java, JavaScript/TypeScript, Python and Go behind backend services, automation scripts and diagnostic tooling. Experienced with AWS, Azure, GCP, Docker, Kubernetes, CloudWatch and Splunk, and used to working across engineering, product and support teams to raise uptime and cut MTTR.",
};

export const stats = [
  { label: "Years Experience", value: "3+" },
  { label: "Production APIs Shipped", value: "17+" },
  { label: "Latency Reduced", value: "25%" },
  { label: "MTTR / Manual Effort Cut", value: "35%" },
];

export const experience = [
  {
    company: "Jabil",
    role: "Support Engineer (Cloud Operations & SRE)",
    location: "Dublin, Ireland",
    dates: "May 2025 – Present",
    current: true,
    points: [
      "Coordinate with a global engineering and operations team accountable for the uptime and reliability of cloud-hosted, Linux-based services.",
      "Monitor application health through dashboards, metrics and logs; detect incidents and triage alerts across distributed microservices.",
      "Diagnose live incidents spanning Linux services, microservices and TCP/IP networking.",
      "Redesigned core data structures and service logic for high-concurrency workloads, cutting average request latency by 25%.",
      "Built automated regression and functional test suites that reduced defect escape rate by 40%.",
      "Coordinated configuration management and deployments across Dev, Test and Production using CI/CD in Azure and AWS, reducing rollback frequency by 20%.",
      "Ran system performance analysis using metrics, logs and trend reports to catch degradation early.",
      "Supported post-incident RCA by consolidating timelines and reviewing logs and metrics.",
      "Maintained runbooks, SOPs, troubleshooting workflows and architecture diagrams for the team.",
      "Built internal support tooling and backend utilities in Go, cutting manual investigation time by 35%.",
      "Partnered with product, cloud engineering and support teams to streamline operational processes.",
      "Active in Agile ceremonies and operational reviews, with readiness for on-call rotation.",
    ],
    stack: ["AWS", "Azure", "Linux", "Kubernetes", "Go", "CI/CD", "CloudWatch"],
  },
  {
    company: "Rapid Data Technologies Pvt Ltd",
    role: "Associate Software Engineer (Backend & Cloud Services)",
    location: "India",
    dates: "August 2020 – October 2023",
    current: false,
    points: [
      "Engineered backend services and RESTful APIs using Java Spring Boot and Node.js on AWS.",
      "Worked across MongoDB, PostgreSQL, MySQL, Oracle IMS/RMS and DynamoDB.",
      "Delivered 17+ production APIs, improving system efficiency by roughly 10% and cutting response times by roughly 15%.",
      "Architected real-time, event-driven messaging pipelines using AWS Lambda, SQS and Kafka.",
      "Implemented schema design, index tuning and data migration across relational and NoSQL systems.",
      "Built web and integration tools that exposed operational and reporting data to internal stakeholders.",
      "Containerised applications with Docker and deployed them to Kubernetes (AWS EKS), improving environment consistency by 40%.",
      "Automated build, test and deployment pipelines with Jenkins and GitHub Actions.",
      "Applied clean code practices, code review, JUnit and Selenium regression testing, cutting regressions by 30%.",
      "Took part in incident response and production support for customer-facing systems.",
      "Contributed in Agile/Scrum ceremonies, translating business needs into technical tasks.",
    ],
    stack: ["Java", "Spring Boot", "Node.js", "Kafka", "AWS", "Docker", "Kubernetes"],
  },
];

export const skillGroups = [
  {
    title: "Cloud Operations & SRE",
    skills: [
      "Cloud operations",
      "DevOps/SRE practices",
      "Incident management",
      "Production support",
      "On-call readiness",
      "Monitoring and alerting",
      "System performance analysis",
      "Capacity & reliability planning",
      "MTTR reduction",
      "Root cause analysis",
    ],
  },
  {
    title: "Operating Systems & Networking",
    skills: [
      "Linux system administration",
      "Linux-based services",
      "Configuration & troubleshooting",
      "Windows enterprise environments",
      "DNS",
      "TCP/IP networking",
      "Load balancing basics",
      "Web & internet technologies",
    ],
  },
  {
    title: "Programming & Scripting",
    skills: [
      "Java",
      "JavaScript",
      "TypeScript",
      "Python",
      "Go",
      "SQL",
      "C++ (exposure)",
      "Automation & diagnostic scripting",
    ],
  },
  {
    title: "Backend & APIs",
    skills: [
      "Java Spring Boot",
      "Node.js",
      "FastAPI",
      "RESTful APIs",
      "GraphQL",
      "Microservices",
      "Event-driven architecture",
      "Kafka",
      "AWS SQS",
      "Service-oriented architecture",
    ],
  },
  {
    title: "Databases & Data",
    skills: [
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "Oracle IMS/RMS",
      "DynamoDB",
      "SQL & NoSQL data modelling",
      "Query optimisation",
      "Database operations",
    ],
  },
  {
    title: "Cloud Platforms & Infrastructure",
    skills: [
      "AWS (Lambda, API Gateway, SQS, SNS, Batch, EC2, EKS, ECS, S3, Step Functions, Parameter Store, EFS)",
      "Azure (exposure)",
      "Docker",
      "Kubernetes",
      "Cloud-native deployments",
      "Distributed messaging",
      "Serverless concepts",
    ],
  },
  {
    title: "Monitoring, Observability & Tooling",
    skills: [
      "CloudWatch",
      "Splunk",
      "Logging & alerting",
      "Metrics & log diagnostics",
      "Git & GitHub",
      "Jenkins",
      "GitHub Actions",
      "Jira",
      "ServiceNow",
      "Basic JVM troubleshooting",
    ],
  },
  {
    title: "Process & Collaboration",
    skills: [
      "Agile/Scrum",
      "Cross-team collaboration",
      "Product, engineering & support partnership",
      "Technical documentation",
      "Runbooks & SOPs",
      "Architecture notes",
      "Knowledge sharing",
      "Continuous improvement",
    ],
  },
];

export const projects = [
  {
    name: "Omni",
    tagline: "AI Digital Memory App (MVP)",
    description:
      "An MVP digital memory application using Retrieval-Augmented Generation (RAG) to store user documents, extract insights and answer questions with grounded, source-backed responses.",
    points: [
      "Built scalable backend services and database storage for document ingestion.",
      "Implemented backend APIs, data flows and basic monitoring for reliable search and query operations.",
    ],
    stack: ["RAG", "Node.js", "MongoDB", "API Design"],
  },
  {
    name: "Note Extraction API",
    tagline: "Extracting Musical Notes - Python & FastAPI",
    description:
      "A FastAPI REST service that processes audio files and selects the best algorithmic approach for extracting musical notes.",
    points: [
      "Refactored the core detection logic into a reusable Python library.",
      "Published the library on PyPI for others to install and use directly.",
    ],
    stack: ["Python", "FastAPI", "PyPI", "Audio Processing"],
  },
  {
    name: "Incident Management System",
    tagline: "Java Spring Boot & MySQL",
    description:
      "A Spring Boot application integrating the PagerDuty and ServiceNow APIs to unify incident data from both platforms.",
    points: [
      "Merged and transformed incident data according to business rules, storing results in MySQL.",
      "Automated previously manual incident reporting, enabling faster and more accurate operational analysis.",
    ],
    stack: ["Java", "Spring Boot", "MySQL", "PagerDuty API", "ServiceNow API"],
  },
  {
    name: "SAMS",
    tagline: "Simple Async Messaging Service - AWS Serverless",
    description:
      "An asynchronous messaging platform built on AWS SQS, Lambda, EventBridge, API Gateway and SNS.",
    points: [
      "Improved decoupling and resilience between microservices.",
      "Reduced communication costs through a fully serverless, event-driven design.",
    ],
    stack: ["AWS SQS", "Lambda", "EventBridge", "API Gateway", "SNS"],
  },
];

export const education = [
  {
    school: "Maynooth University",
    degree: "M.Sc. in Computer Science (Software Engineering)",
    date: "December 2024",
  },
  {
    school: "S.A.E.C, Anna University",
    degree: "B.E. in Computer Science",
    date: "December 2021",
  },
];

export const certifications = [
  "Specialization in AWS Serverless Architecture",
  "VMware Network Virtualization Concepts",
  "AWS DevOps Crash Course",
  "Backend Development with Node.js",
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];
