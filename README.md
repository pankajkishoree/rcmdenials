# RCM Denials — Free Healthcare Denial Management Tools

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://rcmdenials.com)
[![License](https://img.shields.io/badge/license-proprietary-blue)](#)

Free, no-login healthcare tools for medical billing professionals. AI-powered denial management, coding validation, and revenue cycle optimization — all in one place.

## Tools

### AI Claim Risk Review
Pre-submission claim quality review and denial risk analysis. Enter CPT/HCPCS codes, ICD-10 diagnosis codes, modifiers, and payer info to get a risk score with specific denial predictions and fix recommendations before claim submission.

### Coding Compliance Checker
Pre-submission coding compliance — validates ICD-CPT linkage, NCCI edits, modifier usage, and medical necessity. Checks your codes before the payer does.

### Modifier Validator
Validate CPT modifiers against payer-specific rules. Supports 25, 59, 76, 77, LT, RT, and all standard modifiers with commercial payer rule sets.

### Timely Filing Calculator
Calculate filing and appeal deadlines by payer. Enter the date of service, payer, and claim type to get exact deadlines for initial filing, appeals, and corrected claims.

### AI Decision Tree Engine
Guided next steps based on payer call responses. Interactive decision trees for claim not on file, timely filing issues, authorization denials, eligibility problems, and more.

### AI Denial Checklist
Step-by-step checklist to resolve any denial. Dynamic questions based on denial type, payer, and claim details with escalation triggers and documentation tracking.

### Payer Directory & IVR Navigator
Payer contacts, IVR navigation paths, and escalation steps for 30+ major insurance payers. Includes phone numbers, fax, portal links, best calling times, and hold time estimates.

### Batch Claims Tracker
Track and manage multiple claims efficiently. Log claim numbers, status updates, rep names, and next actions in a batch workflow.

### Post-Call Summary
Auto-generate call notes and next actions from payer call details. Structured summary with reference numbers, deadlines, and follow-up tasks.

### ICD-10 Code Search
Search 3,700+ ICD-10-CM diagnosis codes with fuzzy matching, synonyms, autocomplete, parent/child hierarchy, and similar code suggestions. Includes clinical coding guidance and documentation tips.

## Additional Resources

- **[Denial Code Directory](https://rcmdenials.com/denial-codes/)** — 45+ denial codes with causes, resolutions, and appeal templates
- **[Specialty CPT Guides](https://rcmdenials.com/specialties/)** — 20+ medical specialties with CPT code references

## Project Structure

```
rcmdenials/
├── index.html                      # Homepage with tool card grid
├── styles.css                      # Design system (CSS variables, dark/light theme)
├── data.js                         # Shared data (payers, denial codes, checklists)
├── app.js                          # Main application logic
├── _headers                        # Cloudflare Pages security headers
│
├── claim-risk-review/              # AI Claim Risk Review
│   ├── index.html
│   ├── dashboard.html
│   ├── tool.js / tool.css
│   ├── rule-engine.js
│   └── ai-engine.js
│
├── coding-compliance-checker/      # Coding Compliance Checker
│   ├── index.html
│   ├── tool.js / tool.css
│   ├── compliance-engine.js
│   └── cci-edits.js
│
├── modifier-validator/             # Modifier Validator
│   ├── index.html
│   ├── app.js / styles.css
│   └── data/                       # Rule databases
│       ├── modifierDatabase.js
│       ├── cptDatabase.js
│       ├── icdDatabase.js
│       ├── ncciRules.js
│       └── payerRules.js
│
├── timely-filing-calculator/       # Timely Filing Calculator
│   └── index.html
│
├── ai-decision-tree/               # AI Decision Tree Engine
│   └── index.html
│
├── ai-denial-checklist/            # AI Denial Checklist
│   └── index.html
│
├── payer-directory/                # Payer Directory & IVR Navigator
│   └── index.html
│
├── batch-claims-tracker/           # Batch Claims Tracker
│   └── index.html
│
├── post-call-summary/              # Post-Call Summary
│   └── index.html
│
├── icd10/                          # ICD-10 Code Search
│   ├── index.html
│   ├── icd10-data.js               # 3,700+ ICD-10-CM codes
│   ├── search-engine.js            # Fuzzy search, autocomplete, scoring
│   ├── tool.js / tool.css
│   └── generate*.js                # Data generation scripts
│
├── denial-codes/                   # Individual denial code pages (SEO)
│   ├── index.html
│   └── *.html                      # 45+ denial code detail pages
│
├── specialties/                    # Specialty CPT code guides (SEO)
│   ├── index.html
│   └── *.html                      # 20+ specialty pages
│
├── about.html
├── faq.html
├── contact.html
├── privacy.html
├── terms.html
├── cookies.html
├── 404.html
├── sitemap.xml
└── robots.txt
```

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (no frameworks, no build step)
- **Styling**: Custom CSS design system with CSS variables, dark/light theme
- **Deployment**: Cloudflare Pages (auto-deploy on push to main)
- **Analytics**: Google Analytics (G-6JRMMNNR40)
- **Performance**: Static site, optimized for fast loading and mobile

## Local Development

```bash
git clone https://github.com/pankajkishoree/rcmdenials.git
cd rcmdenials
python -m http.server 8000
# Visit http://localhost:8000
```

No build tools required — edit HTML/CSS/JS files directly and refresh.

## Key Data

| Dataset | Count | Description |
|---------|-------|-------------|
| ICD-10-CM Codes | 3,700+ | All 21 chapters with synonyms and hierarchy |
| Denial Codes | 45+ | CO, PR, OA codes with resolutions |
| Payer Profiles | 30+ | Contacts, IVR paths, filing limits |
| Specialty Guides | 20+ | CPT codes by medical specialty |
| Decision Trees | 15+ | Interactive denial resolution workflows |

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Tablet optimized

## Security

- CSP headers configured
- HTTPS enforced via Cloudflare
- No PHI stored or processed
- HIPAA-conscious design

## License

Copyright 2026 RCM Denials. All rights reserved.

## Contact

- Website: [rcmdenials.com](https://rcmdenials.com)
- Contact: [rcmdenials.com/contact](https://rcmdenials.com/contact.html)
