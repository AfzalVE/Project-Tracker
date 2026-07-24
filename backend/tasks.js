const projectTasks = [
    {
        title: "Authentication & Authorization",
        tasks: [
            "Super Admin Login",
            "Admin Login",
            "Manager Login",
            "Employee Login",
            "Client Login",
            "Email OTP Login",
            "Phone OTP Login",
            "Google Login",
            "Microsoft Login",
            "Forgot Password",
            "Reset Password",
            "JWT Authentication",
            "Refresh Tokens",
            "Role-Based Access Control (RBAC)",
            "Session Management",
            "Profile Verification",
            "Secure Logout",
            "Password Encryption",
            "Two-Factor Authentication (Optional)"
        ]
    },
    {
        title: "Super Admin Module",
        tasks: [
            "Create Admin",
            "Create Manager",
            "Approve Admin Access",
            "Revoke Admin Access",
            "Activate Admin",
            "Deactivate Admin",
            "Manage All Users",
            "Manage Platform Settings",
            "Manage AI Configurations",
            "Manage Subscription Plans",
            "Manage Pricing",
            "Manage Proposal Templates",
            "Manage Email Templates",
            "View Audit Logs",
            "View Activity Logs",
            "Manage Notifications",
            "Manage Employee Visibility",
            "Reset User Passwords",
            "View All POCs",
            "View All Chats",
            "View Analytics Dashboard"
        ]
    },
    {
        title: "Admin / Manager Module",
        tasks: [
            "Manage Clients",
            "Manage Employees",
            "Edit Client",
            "Delete Client",
            "Suspend Client",
            "Reactivate Client",
            "Assign Employees",
            "Manage Generated POCs",
            "View Proposal History",
            "View Chat History",
            "View Employee Availability",
            "View Employee Workload",
            "Analytics Dashboard",
            "Export Reports",
            "Receive Alerts"
        ]
    },
    {
        title: "Client Profile",
        tasks: [
            "Company Name",
            "Client Name",
            "Designation",
            "Email",
            "Phone Number",
            "Company Website",
            "Industry",
            "Company Size",
            "Country",
            "Time Zone",
            "Profile Picture",
            "Billing Information"
        ]
    },
    {
        title: "Requirement Collection",
        tasks: [
            "Project Name",
            "Project Description",
            "Business Goals",
            "Existing System",
            "Target Users",
            "Target Platforms",
            "Preferred Technology Stack",
            "Budget",
            "Timeline",
            "Launch Date",
            "Required Integrations",
            "Upload Documents",
            "Upload Images",
            "Upload PDFs",
            "Upload Wireframes"
        ]
    },
    {
        title: "AI Requirement Chat",
        tasks: [
            "Chat with AI",
            "Requirement Extraction",
            "Ask Missing Questions",
            "Context Memory",
            "Technology Recommendation",
            "Timeline Suggestion",
            "Budget Suggestion",
            "Project Complexity Detection",
            "MVP Recommendation",
            "Full Product Recommendation",
            "Requirement Summary",
            "Edit Extracted Requirements"
        ]
    },
    {
        title: "AI Proposal Engine",
        tasks: [
            "Requirement Processing",
            "Technology Recommendation",
            "Resource Estimation",
            "Cost Estimation",
            "Timeline Estimation",
            "Feature Prioritization",
            "Risk Identification",
            "Generate MVP Proposal",
            "Generate Full Product Proposal",
            "Proposal Comparison",
            "Proposal Regeneration",
            "Proposal Editing",
            "Proposal Saving",
            "Version History"
        ]
    },
    {
        title: "Proposal Contents",
        tasks: [
            "Executive Summary",
            "Project Scope",
            "Features Included",
            "Features Excluded",
            "Technology Stack",
            "Architecture Overview",
            "Development Timeline",
            "Team Composition",
            "Cost Estimation",
            "Assumptions",
            "Deliverables",
            "Scalability Plan",
            "Security Considerations",
            "Deployment Plan",
            "Maintenance Plan",
            "Future Enhancements"
        ]
    },
    {
        title: "Proposal Actions",
        tasks: [
            "Preview Proposal",
            "Compare MVP & Full Product",
            "Download PDF",
            "Download DOCX",
            "Email Proposal",
            "Share Proposal",
            "Save Proposal"
        ]
    },
    {
        title: "Client Dashboard",
        tasks: [
            "Dashboard Overview",
            "Proposal History",
            "POC History",
            "Chat History",
            "Saved Drafts",
            "Continue Conversation",
            "Notifications",
            "Project Status",
            "Assigned Employee",
            "Meeting Schedule",
            "Search Projects",
            "Filter Projects",
            "Archive Projects"
        ]
    },
    {
        title: "Employee Module",
        tasks: [
            "Employee Profile",
            "Personal Information",
            "Upload Resume",
            "Skills",
            "Experience",
            "Certifications",
            "Portfolio",
            "LinkedIn",
            "GitHub",
            "Hourly Rate",
            "Monthly Cost",
            "Availability",
            "Current Projects",
            "Languages",
            "Profile Visibility"
        ]
    },
    {
        title: "Employee Dashboard",
        tasks: [
            "Assigned Clients",
            "Assigned Projects",
            "Meeting Schedule",
            "Proposal Reviews",
            "Chat Requests",
            "Update Availability",
            "Accept Project",
            "Reject Project",
            "Project Notes"
        ]
    },
    {
        title: "Client & Employee Communication",
        tasks: [
            "Real-time Chat",
            "Voice Calling",
            "Video Calling",
            "Screen Sharing",
            "Meeting Scheduling",
            "Meeting Reminders",
            "Chat History",
            "Call History",
            "File Sharing",
            "Image Sharing",
            "PDF Sharing",
            "Typing Indicator",
            "Read Receipts",
            "Free Chat Duration",
            "Free Call Duration",
            "Premium Communication"
        ]
    },
    {
        title: "Analytics",
        tasks: [
            "Total Users",
            "Active Users",
            "Inactive Users",
            "New Users",
            "Returning Users",
            "Daily Active Users",
            "Monthly Active Users",
            "Total POCs",
            "Total Proposals",
            "AI Usage",
            "Proposal Acceptance Rate",
            "Average Response Time",
            "Employee Utilization",
            "Revenue Dashboard",
            "Conversion Rate",
            "Client Retention"
        ]
    },
    {
        title: "AI Chat Engine",
        tasks: [
            "Intent Detection",
            "Context Memory",
            "Conversation History",
            "Streaming Responses",
            "Requirement Validation",
            "Requirement Summary",
            "Technology Recommendation",
            "Budget Recommendation",
            "Timeline Recommendation",
            "Missing Requirement Detection",
            "Conversation Recovery",
            "Voice-to-Text",
            "Text-to-Speech",
            "Multilingual Support",
            "Human Handoff"
        ]
    },
    {
        title: "Notifications",
        tasks: [
            "Email Notifications",
            "SMS Notifications",
            "WhatsApp Notifications",
            "Push Notifications",
            "In-App Notifications"
        ]
    },
    {
        title: "Security",
        tasks: [
            "Rate Limiting",
            "API Security",
            "Audit Logs",
            "Activity Logs",
            "File Upload Validation",
            "Malware Scan",
            "Data Encryption",
            "Backup & Recovery",
            "GDPR Compliance",
            "IP Monitoring"
        ]
    },
    {
        title: "Administration",
        tasks: [
            "Platform Settings",
            "AI Prompt Management",
            "Model Configuration",
            "API Key Management",
            "Employee Cost Configuration",
            "Pricing Configuration",
            "Proposal Templates",
            "Email Templates",
            "System Logs",
            "Maintenance Mode"
        ]
    },
    {
        title: "Integrations",
        tasks: [
            "Gmail",
            "Outlook",
            "Google Calendar",
            "Microsoft Calendar",
            "Zoom",
            "Google Meet",
            "Slack",
            "Microsoft Teams",
            "Stripe",
            "Razorpay",
            "HubSpot",
            "Salesforce",
            "GitHub",
            "Jira",
            "Trello"
        ]
    },
    {
        title: "Production Readiness",
        tasks: [
            "Responsive Design",
            "Accessibility",
            "SEO",
            "API Documentation",
            "Error Logging",
            "Health Checks",
            "Caching",
            "CDN",
            "Database Optimization",
            "Unit Testing",
            "Integration Testing",
            "E2E Testing",
            "CI/CD",
            "Docker",
            "Kubernetes",
            "Environment Variables",
            "Production Monitoring",
            "Load Testing",
            "Backup Strategy",
            "Disaster Recovery"
        ]
    },
    {
        title: "Future Enhancements",
        tasks: [
            "AI Contract Generator",
            "AI SRS Generator",
            "AI User Story Generator",
            "AI Wireframe Generator",
            "AI Gantt Chart Generator",
            "AI Sprint Planner",
            "AI Test Case Generator",
            "AI API Documentation Generator",
            "AI Database Schema Generator",
            "AI Risk Analysis",
            "Multi-Tenant Support",
            "White Label Platform",
            "Marketplace for Consultants",
            "AI Meeting Assistant"
        ]
    }
];