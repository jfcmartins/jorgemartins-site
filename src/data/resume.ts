import { GITHUB_URL, EMAIL, LINKEDIN_URL } from '../../site.config.mjs';

export const profile = {
  name: 'Jorge Martins',
  role: 'Staff Site Reliability Engineer',
  fields: ['DevOps', 'Platform', 'SRE'],
  company: 'Fabric Health',
  location: 'Coimbra, Portugal',
  github: GITHUB_URL,
  email: EMAIL,
  linkedin: LINKEDIN_URL,
  summary:
    '8+ years across DevOps, Platform Engineering, and Site Reliability — provisioning, orchestration, observability, and CI/CD for reliable, scalable cloud infrastructure in healthcare and utility platforms.',
};

export const highlights = [
  { value: '8+', label: 'Years in SRE & platform engineering' },
  { value: '30%', label: 'Cloud cost reduction via FinOps & autoscaling' },
  { value: '$50k/yr', label: 'AWS compute savings from Karpenter' },
  { value: '50%', label: 'Faster CI build times after pipeline migration' },
];

export const certifications = [
  { name: 'Certified Kubernetes Administrator (CKA)', issuer: 'Linux Foundation', icon: 'kubernetes' },
  { name: 'Certified Kubernetes Application Developer (CKAD)', issuer: 'Linux Foundation', icon: 'kubernetes' },
  { name: 'Terraform Associate', issuer: 'HashiCorp', icon: 'terraform' },
];

export const skills = [
  {
    category: 'Cloud & Platform',
    icon: 'cloud',
    items: ['AWS', 'GCP', 'Kubernetes (EKS/GKE)', 'Docker', 'Karpenter', 'KEDA'],
  },
  {
    category: 'Provisioning & IaC',
    icon: 'layers',
    items: ['Terraform', 'Terragrunt', 'Pulumi', 'CloudFormation', 'Helm', 'Ansible', 'Atlantis'],
  },
  {
    category: 'CI/CD & Automation',
    icon: 'refresh',
    items: ['GitHub Actions', 'Jenkins', 'Azure DevOps', 'Python', 'Java', 'Bash', 'Robot Framework'],
  },
  {
    category: 'Observability',
    icon: 'activity',
    items: ['Datadog', 'Prometheus', 'Grafana', 'ELK / ECK', 'CloudWatch'],
  },
  {
    category: 'Data & Messaging',
    icon: 'database',
    items: ['Kafka', 'Redis', 'RDS PostgreSQL', 'Elasticsearch', 'MongoDB', 'Databricks'],
  },
  {
    category: 'Security & Networking',
    icon: 'shield',
    items: ['VPC Architecture', 'IAM', 'PrivateLink', 'WAF', 'Cert-Manager', 'HashiCorp Vault', 'Consul'],
  },
];

export type Role = {
  title: string;
  period: string;
  note?: string;
  bullets: string[];
};

export type CompanyExperience = {
  company: string;
  location: string;
  logo?: string;
  roles: Role[];
};

// Consecutive roles at the same company (e.g. Critical Software) are
// grouped under one entry so the timeline can show the internal career
// path with a connecting line, instead of repeating the company name.
export const experience: CompanyExperience[] = [
  {
    company: 'Fabric Health (formerly GYANT)',
    location: 'Remote, Portugal',
    logo: '/images/logos/fabric-health.png',
    roles: [
      {
        title: 'Staff Site Reliability Engineer',
        period: 'Jan 2024 – Present',
        note: 'Promoted from Senior Platform Engineer to lead architectural strategy and platform maturity',
        bullets: [
          'Led a large-scope VPC refactor and EKS Auto Mode migration across multiple systems with zero service disruption.',
          'Achieved $50k/year in AWS compute savings by implementing Karpenter for dynamic autoscaling.',
          'Hardened platform security via private-only database connectivity, AWS WAF integration, and automated IAM permission management.',
          'Designed a unified provisioning repository and standardized Service Catalog to streamline developer workflows.',
          'Standardized global monitoring by migrating the observability stack from Prometheus/ELK to Datadog.',
          'Executed zero-downtime Kubernetes cluster upgrades and resolved long-standing ACM certificate and legacy load balancer issues.',
          'Migrated from Kubernetes Ingress to the Gateway API, decommissioning Ingress NGINX in favor of kgateway.',
          'Reviewed complex technical proposals and PRs org-wide to prevent architectural bottlenecks.',
          'Designed a hub-and-spoke access model with an identity-aware proxy, unifying safe, auditable engineering access across all acquired organizations.',
        ],
      },
    ],
  },
  {
    company: 'Tribusmed',
    location: 'Remote, Portugal',
    logo: '/images/logos/tribusmed.png',
    logoBg: true,
    roles: [
      {
        title: 'Cloud Engineer (Freelancer)',
        period: 'Oct 2023 – Jan 2024',
        bullets: [
          'Architected and automated GCP resource provisioning with Pulumi, moving from manual configuration to fully version-controlled infrastructure.',
          'Configured KEDA to scale Kubernetes workloads dynamically based on GCP Pub/Sub metrics.',
          'Designed CI/CD pipelines in GitHub Actions supporting ephemeral environments for rapid feature testing.',
        ],
      },
    ],
  },
  {
    company: 'GYANT',
    location: 'Remote, Portugal',
    logo: '/images/logos/gyant.png',
    roles: [
      {
        title: 'Senior Platform Engineer',
        period: 'May 2022 – Dec 2023',
        bullets: [
          'Architected and maintained high-availability Kubernetes clusters with custom Helm charts and NGINX/Cert-Manager ingress.',
          'Built and scaled a centralized logging and monitoring solution using ECK and the ELK stack for high-volume healthcare data.',
          'Managed AWS environments via Terraform and implemented Policy-as-Code to meet HITRUST healthcare compliance standards.',
          'Facilitated deployment of self-hosted AI vector databases and large-scale data pipelines for AI-driven healthcare features.',
          'Migrated legacy Travis CI pipelines to GitHub Actions, cutting build times by 50%.',
        ],
      },
    ],
  },
  {
    company: 'Talkdesk',
    location: 'Remote, Portugal',
    logo: '/images/logos/talkdesk.png',
    roles: [
      {
        title: 'Site Reliability Engineer',
        period: 'Jan 2021 – Apr 2022',
        bullets: [
          'Orchestrated global AWS infrastructure with Terraform and Terragrunt, implementing Atlantis for a PR-driven GitOps workflow.',
          'Automated lifecycle management of Kafka, Redis, RDS PostgreSQL, Elasticsearch, and MongoDB with Ansible.',
          'Managed large-scale Kubernetes clusters and Git-based CI/CD workflows via Jenkins.',
          'Implemented HashiCorp Vault for secret orchestration and Consul for service discovery and health monitoring.',
          'Handled zero-downtime Elasticsearch index migrations and managed Databricks workspace access control.',
        ],
      },
    ],
  },
  {
    company: 'Critical Software',
    location: 'Portugal',
    logo: '/images/logos/critical-software.png',
    roles: [
      {
        title: 'Technical Team Lead & DevOps Architect',
        period: 'Aug 2019 – Dec 2020',
        bullets: [
          'Led a cross-functional team delivering high-consequence UK Energy Smart Metering platforms, guiding architecture and technology decisions using Agile/Kanban.',
          'Mentored engineers, reviewed technical proposals, and coordinated with testing and client DevOps teams to keep delivery aligned with product quality standards.',
          'Engineered highly available multi-cloud environments across AWS and Azure with CloudFormation, meeting ISO 27001 and UK government utility compliance standards.',
        ],
      },
      {
        title: 'DevOps Engineer',
        period: 'Apr 2018 – Aug 2019',
        bullets: [
          'Engineered automated AWS provisioning with CloudFormation (S3, CloudFront, Route53, Lambda, API Gateway, Cognito) for a national-scale platform.',
          'Built CI/CD pipelines with Jenkins and Azure, and automated testing suites with Robot Framework and Python.',
        ],
      },
    ],
  },
  {
    company: 'Sentilant',
    location: 'Portugal',
    logo: '/images/logos/sentilant.jpg',
    roles: [
      {
        title: 'Software Engineer (Internship)',
        period: 'Sep 2017 – Mar 2018',
        bullets: [
          'Developed a vehicle telemetry system end-to-end, including a data acquisition device and an ASP.NET Core web server.',
          'Built an Android app for trip management and designed a MySQL database for real-time telemetry data.',
        ],
      },
    ],
  },
];

export const education = [
  {
    degree: "Bachelor's Degree in Computer Science",
    school: 'Instituto Superior de Engenharia de Coimbra, Portugal',
    logo: '/images/logos/isec.png',
    logoBg: true,
    period: 'March 2018',
  },
  {
    degree: 'ERASMUS+ International Exchange',
    school: 'Universidad Rey Juan Carlos, Madrid, Spain',
    logo: '/images/logos/urjc.png',
    logoBg: true,
    period: 'February 2017',
  },
];

export const languages = [
  { name: 'Portuguese', level: 'Native', flag: '🇵🇹' },
  { name: 'English', level: 'Full Professional (C1)', flag: '🇬🇧' },
  { name: 'Spanish', level: 'Working Proficiency', flag: '🇪🇸' },
];
