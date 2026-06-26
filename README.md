# RCM Denials - AI-Powered AR Calling Assistant

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://rcmdenials.com)
[![License](https://img.shields.io/badge/license-proprietary-blue)](#)

A comprehensive web application designed to help healthcare billing professionals resolve medical claim denials efficiently. This tool provides instant access to payer information, denial code guidance, and AI-powered resolution strategies.

## 🎯 Overview

RCM Denials is a full-featured SaaS platform that streamlines the accounts receivable (AR) calling process by providing:

- **Comprehensive Payer Directory** - Contact information, IVR navigation, and timely filing limits for 30+ major insurance payers
- **Denial Code Database** - Detailed explanations and resolution strategies for 100+ denial codes
- **AI-Powered Guidance** - Real-time assistance with denial resolution workflows
- **Interactive Checklists** - Context-aware questions to ask payer representatives
- **Decision Trees** - Step-by-step guidance for complex denial scenarios

## ✨ Key Features

### 📞 Payer Information
- **30+ Major Payers** including:
  - Commercial: Anthem BCBS, Aetna, UnitedHealthcare, Cigna, Humana
  - Government: Medicare, Medicaid, TRICARE, VA, CHAMPVA
  - Managed Care: Molina, Centene, WellCare, Amerigroup
  - Behavioral Health: Carelon, Optum BH, Magellan
  - Workers Comp: Sedgwick, CorVel, Gallagher Bassett

- **Complete Contact Details**:
  - Phone numbers with IVR navigation scripts
  - Fax numbers for all departments
  - Mailing addresses
  - Provider portals
  - Best calling times and average hold times

- **Department-Specific Contacts**:
  - Claims Processing
  - Appeals
  - Authorization/Prior Auth
  - EDI Support
  - Credentialing

### 🔢 Denial Code Resolution

Comprehensive coverage of:
- **CO Codes** (Contractual Obligation) - CO-4, CO-16, CO-22, CO-29, CO-45, CO-50, CO-97, etc.
- **PR Codes** (Patient Responsibility) - PR-1, PR-2, PR-3, PR-96, PR-97, etc.
- **OA Codes** (Other Adjustment) - OA-18, OA-23
- **PI Codes** (Payer Initiated) - PI-4
- **NCPDP Codes** - N30-N100, N382, N517, N569
- **Other Codes** - B15

Each denial code includes:
- Full description
- Common triggers and keywords
- Resolution strategies
- Required documentation
- Appeal processes
- Timeline expectations

### 🤖 AI-Powered Tools

- **Real-time Call Assistance** - Context-aware guidance during payer calls
- **Smart Checklists** - Dynamic questions based on denial type and payer
- **Decision Trees** - 15+ interactive workflows for common scenarios:
  - Claim not on file
  - Timely filing issues
  - Authorization denials
  - Eligibility problems
  - Credentialing issues
  - Medical necessity denials
  - Bundling/NCCI edits
  - Out-of-network denials
  - COB issues
  - And more...

- **Escalation Triggers** - Automatic alerts for when to request supervisor
- **Documentation Tracking** - What to gather before ending the call

## 📁 Project Structure

```
rcmdenials/
├── denial-codes/              # Individual denial code pages
│   ├── co-16-denial-code.html # Claim lacks information
│   ├── co-22-denial-code.html # COB - primary paid
│   ├── co-27-denial-code.html # Expenses incurred after coverage terminated
│   ├── co-29-denial-code.html # Time limit for filing expired
│   ├── co-4-denial-code.html  # Service inconsistent with modifier
│   ├── co-45-denial-code.html # Contractual adjustment
│   ├── co-50-denial-code.html # Not medically necessary
│   ├── co-97-denial-code.html # Payment included in another service
│   └── pr-1-denial-code.html  # Deductible amount
├── app.js                     # Main application logic & data
├── index.html                 # Homepage
├── about.html                 # About page
├── contact.html               # Contact page
├── cookies.html               # Cookie policy
├── 404.html                   # Error page
├── _headers                   # Security headers configuration
└── .wrangler/                 # Cloudflare Pages deployment config
```

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Custom CSS with dark theme support
- **Deployment**: Cloudflare Pages
- **Analytics**: Google Analytics
- **Performance**: Optimized for fast loading and mobile responsiveness

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools required - pure HTML/CSS/JS

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://gitlab.com/ipankajkishore/rcmdenials.git
   cd rcmdenials
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   open index.html
   # or
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

3. **Start developing**
   - Edit HTML/CSS/JS files directly
   - Refresh browser to see changes
   - No compilation or build step needed

### Deployment

The application is deployed on Cloudflare Pages:
- **Production URL**: https://rcmdenials.com
- **Auto-deployment**: Pushes to main branch trigger automatic deployment

## 📊 Data Structures

### Payer Database (`PAYER_DB`)

Each payer entry includes:
```javascript
{
  id: 'PAYER-ID',
  name: 'Full Payer Name',
  abbr: 'ABBR',
  payerId: '12345',
  type: 'Commercial|Medicare|Medicaid|etc',
  states: ['CA', 'TX', ...],
  timelyFiling: {
    initial: 365,    // days
    appeal: 180,     // days
    corrected: 365   // days
  },
  departments: {
    Claims: { phone, fax, address, portal },
    Appeals: { ... },
    Authorization: { ... },
    // etc.
  },
  ivr: [
    { action: 'Press 1', detail: 'For English' },
    // Step-by-step IVR navigation
  ],
  holdTime: '18 min',
  bestTime: '8-10 AM EST',
  callback: 'Yes|No',
  verified: '2024-12-01'
}
```

### Denial Codes (`DENIAL_CODES`)

```javascript
[
  { code: 'CO-16', desc: 'Claim lacks information needed for adjudication' },
  { code: 'CO-29', desc: 'Time limit for filing expired' },
  // 100+ codes...
]
```

### Checklist Database (`CHECKLIST_DB`)

Context-aware questions organized by:
- Claim Verification
- Denial Clarification
- Authorization
- Eligibility
- Timely Filing
- Appeals
- Fee Schedule
- Medical Necessity
- Provider Enrollment
- Documentation Requests

### Decision Trees (`DECISION_TREE`)

Interactive workflows with:
- Trigger keywords
- Questions to ask
- Escalation criteria
- Documentation requirements
- Action items
- Timeline expectations

## 🎯 Use Cases

Perfect for:
- **Medical Billing Specialists** - Resolve denials faster with instant payer info
- **AR Calling Teams** - Standardize call scripts and documentation
- **Revenue Cycle Managers** - Train new staff with comprehensive guides
- **Healthcare Billing Departments** - Reduce denial resolution time
- **Medical Practice Administrators** - Improve cash flow with faster resolutions
- **Billing Service Companies** - Handle multiple payers efficiently

## 📈 Statistics

- ✅ **30+** Major payers covered
- ✅ **100+** Denial codes documented
- ✅ **15+** Decision tree workflows
- ✅ **200+** Checklist questions
- ✅ **Real-time** AI assistance
- ✅ **Mobile-responsive** design

## 🔒 Security & Privacy

- Content Security Policy (CSP) headers configured
- HTTPS enforced via Cloudflare
- No sensitive patient data stored
- Privacy-focused analytics
- HIPAA-compliant design (no PHI processed)

## 📱 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ✅ Tablet optimized

## 🎨 Features in Detail

### IVR Navigation Scripts
Step-by-step instructions for navigating payer phone systems:
- Exact button presses
- Information to have ready (NPI, Tax ID, Claim #)
- Expected prompts
- Shortcuts to reach live representatives

### Timely Filing Limits
Critical deadlines for each payer:
- Initial claim submission
- Appeal filing
- Corrected claim resubmission
- State-specific variations

### Smart Escalation
Automatic triggers for requesting supervisor:
- Authorization denials
- Medical necessity denials
- Timely filing with proof
- Contract disputes over $500
- Patient safety concerns

### Documentation Checklists
Never forget to gather:
- Reference numbers
- Representative names
- Exact denial reasons
- Appeal deadlines
- Required documentation
- Next steps promised

## 🤝 Contributing

This is a proprietary project. For inquiries or suggestions:
- Visit the [Contact Page](https://rcmdenials.com/contact.html)
- Email: contact@rcmdenials.com

## 📄 License

Copyright © 2024 RCM Denials. All rights reserved.

This is proprietary software. Unauthorized copying, distribution, or modification is prohibited.

## 🆘 Support

For questions, issues, or feature requests:
- 📧 Email: support@rcmdenials.com
- 🌐 Website: [rcmdenials.com](https://rcmdenials.com)
- 📞 Contact form: [rcmdenials.com/contact](https://rcmdenials.com/contact.html)

## 🗺️ Roadmap

- [ ] Additional payer integrations
- [ ] Real-time payer status updates
- [ ] Mobile app (iOS/Android)
- [ ] API for integration with billing systems
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Voice-to-text call documentation

## 📚 Resources

- [About RCM Denials](https://rcmdenials.com/about.html)
- [Denial Code Library](https://rcmdenials.com/denial-codes/)
- [Cookie Policy](https://rcmdenials.com/cookies.html)

## 🏆 Why RCM Denials?

**Save Time**
- Instant access to payer contact info
- Pre-written IVR scripts
- No more searching for phone numbers

**Increase Success Rate**
- Know exactly what to ask
- Context-aware checklists
- Escalation triggers

**Standardize Process**
- Consistent documentation
- Repeatable workflows
- Training tool for new staff

**Reduce Denials**
- Learn from resolution patterns
- Understand payer requirements
- Prevent future denials

---

**Built with ❤️ for healthcare billing professionals**

*Making denial resolution faster, easier, and more effective.*