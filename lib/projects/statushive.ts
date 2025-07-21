import { Project } from '../info';

export const statushive: Project = {
  id: 'statushive',
  category: 'side-project',
  title: 'StatusHive - Multi-tenant Monitoring Platform',
  github: 'https://github.com/DevItaliya22/StatusHive',
  href: 'https://statushive.devitaliya.me',
  description:
    '🚧 In Progress - Advanced monitoring platform inspired by OpenStatus. Multi-tenant architecture with serverless pings across 18 regions, real-time analytics using Tinybird, and custom Go lambda functions.',
  longDescription: `**⚠️ Project Status: Active Development** - This project is currently in progress due to internship commitments, but the core architecture and learning objectives have been achieved.

A sophisticated **monitoring platform** inspired by [OpenStatus](https://www.openstatus.dev/), built to explore advanced scalable architectures, multi-tenancy, and real-time analytics systems.

## Learning Journey (15-20 Days):
Dedicated intensive learning period where I systematically implemented each microtask necessary for building a production-grade monitoring platform.

## Technical Architecture:

### Multi-Tenant Infrastructure
- **Custom Domain System**: Users can claim \`xyz.statushive.devitaliya.me\` subdomains
- **Tenant Isolation**: Complete multi-tenancy implementation with domain-based routing
- **Scalable Database Design**: Architected for handling multiple tenants efficiently

### Serverless Monitoring Engine
- **18 Global Regions**: Distributed pinging using Vercel regions and Lambda functions
- **30-Minute Intervals**: Automated serverless pings with optimal frequency
- **Custom Go Lambda**: Built dedicated Go function for precise timing measurements

### Precision Timing System
Built custom Go lambda function to capture detailed performance metrics:
\`\`\`go
type ResponseData struct {
    DNSLookup       int64 \`json:"dns_lookup_ms"\`
    TCPConnect      int64 \`json:"tcp_connect_ms"\`
    TLSHandshake    int64 \`json:"tls_handshake_ms"\`
    TimeToFirstByte int64 \`json:"time_to_first_byte_ms"\`
    TotalTime       int64 \`json:"total_time_ms"\`
}
\`\`\`

### Real-time Analytics Stack
- **Tinybird Integration**: Real-time analytics using ClickHouse data sources
- **Data Pipelines**: Custom Tinybird pipes for processing monitoring data
- **Performance Research**: Comprehensive comparison of PostgreSQL + TimescaleDB vs Tinybird vs ClickHouse

## Research & Analysis:
- **Database Performance Testing**: Evaluated multiple time-series solutions
- **ClickHouse vs Tinybird**: Found ClickHouse superior for analytics, Tinybird better for ease of use
- **Serverless Architecture**: Proven scalability through distributed monitoring approach

## Community Collaboration:
- **OpenStatus Founders**: Direct discussions with [@mxkaske](https://github.com/mxkaske) about architecture and ideas
- **Multi-API Chaining**: Proposed feature ideas for OpenStatus future development
- **Knowledge Exchange**: Shared insights about Go-based timing precision vs Node.js limitations

## Current Implementation Status:
- ✅ **Architecture**: Complete scalable, multi-tenant foundation
- ✅ **Go Lambda Checker**: Fully functional with precise timing
- ✅ **Multi-tenancy**: Working domain-based tenant system
- ✅ **Real-time Status Pages**: Live analytics and monitoring
- ⏳ **Web Interface**: Core functionality complete, UI refinement in progress

## Key Learning Outcomes:
- **Multi-tenancy Architecture**: Deep understanding of tenant isolation and scaling
- **Serverless Monitoring**: Expertise in distributed, cost-effective monitoring solutions
- **Real-time Analytics**: Hands-on experience with ClickHouse and Tinybird
- **Performance Optimization**: Go vs Node.js for precision timing applications
- **Database Architecture**: Time-series data handling at scale

*This project represents a comprehensive exploration of modern monitoring infrastructure, demonstrating both technical depth and architectural understanding.*`,
  tags: [
    'Monitoring',
    'Multi-tenant',
    'Serverless',
    'Go',
    'Real-time Analytics',
    'Architecture',
  ],
  features: [
    'Multi-tenant architecture with custom domain system',
    'Serverless monitoring across 18 global regions',
    'Custom Go lambda functions for precise timing measurements',
    'Real-time analytics with Tinybird and ClickHouse integration',
    'Comprehensive database performance research and comparison',
    'Live status pages with real-time monitoring data',
    'Scalable architecture designed for production workloads',
    'Direct collaboration with OpenStatus founding team',
  ],
  techStack: [
    'Next.js',
    'Go',
    'TypeScript',
    'Tinybird',
    'ClickHouse',
    'AWS Lambda',
    'Vercel',
    'Prisma',
    'PostgreSQL',
  ],
  views: 0,
  date: 'Mar 13, 2025',
};
