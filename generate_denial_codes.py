#!/usr/bin/env python3
"""
Denial Codes Auto-Generator
============================
Scans denial-codes/ for all co/pr/oa-*-denial-code.html files and generates:
  1. Directory cards for denial-codes/index.html
  2. Search index entries for search-index.js
  3. Sitemap entries for sitemap.xml

Run: python generate_denial_codes.py
"""

import os
import re
import html
from pathlib import Path

DENIAL_CODES_DIR = Path(__file__).parent / "denial-codes"
INDEX_HTML = DENIAL_CODES_DIR / "index.html"
SEARCH_INDEX_JS = Path(__file__).parent / "search-index.js"
SITEMAP_XML = Path(__file__).parent / "sitemap.xml"

CATEGORY_MAP = {
    "co": {"name": "CO Codes — Contractual Obligation", "icon": "📄"},
    "pr": {"name": "PR Codes — Patient Responsibility", "icon": "👤"},
    "oa": {"name": "OA Codes — Other Adjustment", "icon": "🔄"},
}

# Keywords for search index, derived from common denial code terms
KEYWORD_OVERRIDES = {
    "CO-1": "deductible patient responsibility amount",
    "CO-2": "coordination of benefits other payer cob",
    "CO-3": "coinsurance percentage patient responsibility",
    "CO-4": "procedure code modifier inconsistent mismatch",
    "CO-5": "fee schedule maximum allowable charges exceed",
    "CO-6": "agreed price contracted rate code level",
    "CO-7": "benefit included another service bundled",
    "CO-8": "duplicate claim service already submitted",
    "CO-9": "denied does not meet criteria coverage",
    "CO-10": "coding billing error incorrect claim",
    "CO-11": "missing incomplete invalid diagnosis diagnosis code",
    "CO-12": "incorrect diagnosis procedure code mismatch",
    "CO-15": "authorization precertification not obtained prior",
    "CO-16": "claim lacks information submission billing error",
    "CO-18": "duplicate exact claim resubmission",
    "CO-22": "coordination of benefits another payer cob",
    "CO-23": "interest penalty clause payment adjusted",
    "CO-24": "charges paid another payer double payment",
    "CO-26": "expenses previously paid another source duplicate",
    "CO-27": "coverage terminated expired expenses incurred",
    "CO-29": "timely filing limit expired deadline",
    "CO-31": "patient cannot be identified insured",
    "CO-45": "charges exceed fee schedule contracted amount",
    "CO-50": "non-covered services not a benefit",
    "CO-51": "exceeds maximum allowable amount",
    "CO-54": "clia certification laboratory missing invalid",
    "CO-55": "requires additional information documentation needed",
    "CO-56": "coinsurance amount patient responsibility percentage",
    "CO-57": "fee schedule dollar amount exceeded",
    "CO-58": "hospital outpatient physician fee schedule not covered",
    "CO-59": "services not covered benefit plan excluded",
    "CO-63": "services not necessary proper diagnosis treatment",
    "CO-70": "billed charges exceed allowed amount fee schedule",
    "CO-90": "laterality mismatch left right bilateral",
    "CO-97": "bundled services payment adjusted included",
    "CO-109": "claim cannot be identified payer system",
    "CO-110": "billing information not as submitted corrected",
    "CO-119": "benefit exclusion not covered",
    "CO-129": "cost-sharing obligations applied patient",
    "CO-130": "capitation contract claim falls under",
    "CO-146": "timely filing not submitted within deadline",
    "CO-150": "network primary care provider not provided",
    "CO-151": "diagnosis code not valid date of service",
    "CO-167": "diagnoses not covered",
    "CO-170": "provider type not covered performed billed",
    "CO-181": "procedure code modifier combination not recognized",
    "CO-182": "qualified credentialed provider not provided",
    "CO-197": "corrected claim resubmission issues",
    "CO-204": "service not supported by diagnosis",
    "CO-210": "not payable benefit plan current",
    "CO-225": "icd cpt hcpcs codes inconsistent mismatch",
    "CO-230": "billing rules requirements not met",
    "CO-232": "procedure code modifier inconsistent not documented",
    "CO-252": "attachment document required records",
    "CO-253": "sequestration federal spending automatic reduction",
    "CO-297": "timely filing deadline not submitted late",
    "CO-300": "coverage not effective date of service",
    "CO-331": "appeal not submitted within timeframe late",
    "CO-340": "billing code criteria not met",
    "CO-341": "provider not contracted eligible",
    "CO-342": "experimental investigational cosmetic not covered",
    "CO-343": "managed care organization not authorized mco",
    "CO-349": "not properly coded billing requirements",
    "CO-351": "benefit criteria not met",
    "CO-357": "healthcare regulations not provided in accordance",
    "CO-360": "required documentation not submitted",
    "CO-362": "coverage criteria not met payer",
    "CO-365": "requirements for service billed not met",
    "CO-367": "submitted after allowed filing period late",
    "PR-1": "deductible amount patient responsibility",
    "PR-2": "coinsurance amount patient percentage",
    "PR-3": "copayment amount fixed patient",
    "PR-4": "copayment amount fixed patient",
    "PR-5": "deductible amount patient responsibility",
    "PR-6": "coinsurance amount patient percentage",
    "PR-7": "benefit maximum used up exhausted",
    "PR-17": "another provider service coordination amount applied",
    "PR-22": "coordination of benefits covered another payer",
    "PR-23": "denied primary payer patient remaining",
    "PR-24": "patient responsibility copay coinsurance deductible",
    "PR-26": "cost sharing patient responsibility applied",
    "PR-27": "charges after allowed amount paid insurance",
    "PR-31": "denied claim amount patient liability",
    "PR-32": "service charges patient cost sharing",
    "PR-33": "copayment fixed amount due time of service",
    "PR-36": "not covered service patient charges",
    "PR-39": "exceeds allowed amount patient charges",
    "PR-40": "balance due patient after adjudication",
    "PR-41": "denied not covered patient charges",
    "PR-42": "coverage limit reached patient charges",
    "PR-45": "not meeting medical necessity criteria patient",
    "PR-49": "non-participating provider patient charges",
    "PR-50": "not covered benefit patient plan",
    "PR-51": "waiting period service patient charges",
    "PR-52": "not authorized referred patient charges",
    "PR-53": "outside coverage area patient charges",
    "PR-54": "exceeds benefit limit patient charges",
    "PR-55": "excluded provider patient charges",
    "PR-56": "not medically necessary patient charges",
    "PR-59": "non-coverage period patient charges",
    "PR-66": "out-of-network provider patient charges",
    "PR-96": "non-covered charges not a benefit",
    "PR-97": "included payment another claim duplicate",
    "PR-98": "denied patient liability claim",
    "PR-99": "benefit unknown",
    "PR-119": "benefit limit maximum reached",
    "PR-204": "deductible not met applied to deductible",
    "OA-18": "primary secondary payment coordination benefit",
    "OA-23": "interest penalty clause payment adjusted",
    "OA-24": "charges paid another payer coordination",
    "OA-26": "expenses previously paid another source",
    "OA-27": "not eligible coverage date of service",
    "OA-29": "timely filing deadline not submitted",
    "OA-45": "fee schedule contracted rate adjustment",
    "OA-94": "different plan program processed under",
    "OA-96": "benefit requirements not met",
    "OA-109": "claim cannot be identified payer system",
    "OA-110": "billing information correction needed",
    "OA-170": "not payable benefit plan current",
    "OA-181": "procedure code modifier not recognized",
    "OA-182": "payer requirements not met specific",
    "OA-190": "required documentation not submitted",
    "OA-197": "prior authorization not obtained",
    "OA-198": "certification recertification not obtained",
    "OA-204": "filing timeframe not submitted within",
    "OA-223": "work-related injury workers compensation",
    "OA-234": "motor vehicle accident related services",
}


def extract_code(filename):
    """Extract denial code from filename like 'co-1-denial-code.html' -> 'CO-1'"""
    m = re.match(r"^(co|pr|oa)-(\d+)-denial-code\.html$", filename)
    if m:
        prefix = m.group(1).upper()
        num = m.group(2)
        return f"{prefix}-{num}"
    return None


def extract_metadata(filepath):
    """Extract title, description, and keywords from an HTML file."""
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Extract title
    title_match = re.search(r"<title>(.*?)</title>", content)
    title = html.unescape(title_match.group(1).strip()) if title_match else ""

    # Extract meta description
    desc_match = re.search(r'<meta\s+name="description"\s+content="(.*?)"', content)
    desc = html.unescape(desc_match.group(1).strip()) if desc_match else ""

    # Extract meta keywords
    kw_match = re.search(r'<meta\s+name="keywords"\s+content="(.*?)"', content)
    keywords = html.unescape(kw_match.group(1).strip()) if kw_match else ""

    return {"title": title, "desc": desc, "keywords": keywords}


def get_category_from_code(code):
    """Get category prefix from code."""
    return code.split("-")[0].lower()


def get_priority_and_status(code):
    """Determine priority and status based on code patterns."""
    num = int(code.split("-")[1])
    # High priority: common codes that are frequently denied
    high_priority = {8, 9, 10, 15, 16, 18, 29, 50, 59, 109, 110, 146, 197, 198, 204, 297, 331}
    # Correctable: codes that can be fixed and resubmitted
    correctable = {8, 9, 10, 11, 12, 15, 16, 18, 54, 55, 58, 59, 63, 109, 110, 151, 197, 198, 252, 297, 300, 331, 341, 342, 343}

    priority = "High" if num in high_priority else ("Medium" if num % 3 != 0 else "Low")
    status = "Correctable" if num in correctable else "Non-Correctable"
    return priority, status


def get_category_label(code):
    """Get a descriptive category label based on code patterns."""
    num = int(code.split("-")[1])
    prefix = code.split("-")[0]

    if prefix == "PR":
        return "Patient Responsibility"
    if prefix == "OA":
        labels = {18: "COB", 23: "Interest", 27: "Coverage", 29: "Timely Filing",
                  45: "Fee Schedule", 94: "Plan Adjustment", 96: "Benefit",
                  109: "Billing", 110: "Billing", 170: "Coverage", 197: "Authorization",
                  198: "Authorization", 204: "Timely Filing", 223: "Workers Comp", 234: "Auto Accident"}
        return labels.get(num, "Other Adjustment")

    # CO codes
    labels = {
        1: "Deductible", 2: "COB", 3: "Coinsurance", 4: "Coding",
        5: "Fee Schedule", 6: "Contract", 7: "Coverage", 8: "Duplicate",
        9: "Coverage", 10: "Coding", 11: "Diagnosis", 12: "Coding",
        15: "Authorization", 16: "Billing", 18: "Duplicate", 22: "COB",
        23: "Interest", 24: "Payment", 26: "Payment", 27: "Coverage",
        29: "Timely Filing", 31: "Eligibility", 45: "Fee Schedule",
        50: "Coverage", 51: "Fee Schedule", 54: "Provider", 55: "Documentation",
        56: "Coinsurance", 57: "Fee Schedule", 58: "Coverage", 59: "Coverage",
        63: "Necessity", 70: "Fee Schedule", 90: "Coding", 97: "Bundling",
        109: "Billing", 110: "Billing", 119: "Coverage", 129: "Cost-Sharing",
        130: "Capitation", 146: "Timely Filing", 150: "Network",
        151: "Diagnosis", 167: "Coverage", 170: "Provider", 181: "Coding",
        182: "Provider", 197: "Resubmission", 204: "Diagnosis",
        210: "Coverage", 225: "Coding", 230: "Billing", 232: "Coding",
        252: "Documentation", 253: "Sequestration", 297: "Timely Filing",
        300: "Coverage", 331: "Appeal", 340: "Billing", 341: "Provider",
        342: "Coverage", 343: "Authorization", 349: "Billing", 351: "Benefit",
        357: "Compliance", 360: "Documentation", 362: "Coverage",
        365: "Billing", 367: "Timely Filing"
    }
    return labels.get(num, "Payment Adjustment")


def short_description(code, full_desc):
    """Create a short description for the card."""
    # Use first 100 chars of meta description or a fallback
    if full_desc:
        # Remove leading "Complete guide to resolving..." boilerplate
        clean = re.sub(r"^(Complete guide to resolving|Learn about|Understanding)\s+.*?denial code.*?[.:]\s*", "", full_desc, flags=re.I)
        if clean:
            return clean[:120].rsplit(" ", 1)[0] if len(clean) > 120 else clean
    # Fallback from code
    return f"Denial code {code} — review and resolve"


def generate_card(code, metadata, filename):
    """Generate HTML card for a denial code."""
    prefix = code.split("-")[0].lower()
    num = int(code.split("-")[1])
    priority, status = get_priority_and_status(code)
    category_label = get_category_label(code)
    desc = short_description(code, metadata["desc"])

    priority_icon = {"High": "⚡", "Medium": "⚠️", "Low": "📋"}.get(priority, "📋")
    status_icon = "✅" if status == "Correctable" else "🔒"

    badge_class = f' badge-{prefix}' if prefix != "co" else ""

    return f'''          <a href="{filename}" class="denial-code-card" data-code="{code}" data-category="{prefix.upper()}">
            <div class="denial-code-header">
              <div class="denial-code-num{badge_class}">{code}</div>
              <div class="denial-code-category">{category_label}</div>
            </div>
            <div class="denial-code-desc">
              {html.escape(desc)}
            </div>
            <div class="denial-code-meta">
              <span class="meta-item">{priority_icon} {priority} Priority</span>
              <span class="meta-item">{status_icon} {status}</span>
            </div>
          </a>'''


def generate_search_entry(code, metadata, filename):
    """Generate search index entry for a denial code."""
    prefix = code.split("-")[0].lower()
    norm_code = code.lower().replace("-", "")
    kw = KEYWORD_OVERRIDES.get(code, metadata.get("keywords", ""))
    # Clean keywords: take first 6 words
    kw_words = " ".join(kw.split()[:6]) if kw else f"{code.lower()} denial"
    desc_short = metadata["desc"][:80] if metadata["desc"] else code
    # Escape single quotes
    desc_short = desc_short.replace("'", "\\'")
    kw_words = kw_words.replace("'", "\\'")

    return f"  {{ id:'dc-{norm_code}', title:'{code}', desc:'{desc_short}', url:'denial-codes/{filename}', cat:'denial-code', icon:'📄', code:'{code}', keywords:'{kw_words}' }}"


def scan_files():
    """Scan denial-codes/ for all denial code HTML files."""
    codes = []
    for f in sorted(DENIAL_CODES_DIR.iterdir()):
        if f.suffix == ".html" and f.name != "index.html":
            code = extract_code(f.name)
            if code:
                meta = extract_metadata(f)
                codes.append({
                    "code": code,
                    "filename": f.name,
                    "category": get_category_from_code(code),
                    "metadata": meta,
                })
    return codes


def update_index_html(codes):
    """Update denial-codes/index.html with all cards and correct counts."""
    with open(INDEX_HTML, "r", encoding="utf-8") as f:
        content = f.read()

    # Group codes by category
    by_cat = {"co": [], "pr": [], "oa": []}
    for c in codes:
        by_cat[c["category"]].append(c)

    # Sort within each category by numeric value
    for cat in by_cat:
        by_cat[cat].sort(key=lambda x: int(x["code"].split("-")[1]))

    total = len(codes)
    co_count = len(by_cat["co"])
    pr_count = len(by_cat["pr"])
    oa_count = len(by_cat["oa"])

    # Update filter tab counts
    content = re.sub(
        r'id="allCount">\d+</span>',
        f'id="allCount">{total}</span>',
        content
    )
    content = re.sub(
        r'id="coCount">\d+</span>',
        f'id="coCount">{co_count}</span>',
        content
    )
    content = re.sub(
        r'id="prCount">\d+</span>',
        f'id="prCount">{pr_count}</span>',
        content
    )
    content = re.sub(
        r'id="oaCount">\d+</span>',
        f'id="oaCount">{oa_count}</span>',
        content
    )

    # Update result count display
    content = re.sub(
        r'id="visibleCount">\d+</strong>',
        f'id="visibleCount">{total}</strong>',
        content
    )
    content = re.sub(
        r'id="totalCount">\d+</strong>',
        f'id="totalCount">{total}</strong>',
        content
    )

    # Generate cards for each category and replace sections
    for cat, cat_info in CATEGORY_MAP.items():
        cards_html = "\n".join(
            generate_card(c["code"], c["metadata"], c["filename"])
            for c in by_cat[cat]
        )

        # Find section boundaries using start/end markers
        section_start = f"<!-- {cat.upper()} Codes -->"
        section_end = "      </section>"

        start_idx = content.find(section_start)
        if start_idx == -1:
            continue

        # Find the end of this section (next "</section>" after start)
        end_idx = content.find(section_end, start_idx)
        if end_idx == -1:
            continue
        end_idx += len(section_end)

        old_section = content[start_idx:end_idx]

        # Build new section with correct count
        new_count = str(len(by_cat[cat]))
        # Replace the count in the header
        new_section = re.sub(
            r'(<span class="category-count">)\d+( codes</span>)',
            lambda m: m.group(1) + new_count + m.group(2),
            old_section
        )
        # Replace all cards between grid open and grid close
        grid_open = '<div class="denial-codes-grid"'
        grid_close = "        </div>"
        grid_start = new_section.find(grid_open)
        grid_end = new_section.rfind(grid_close)
        if grid_start != -1 and grid_end != -1:
            # Find the end of the opening tag
            tag_end = new_section.find(">", grid_start) + 1
            new_section = new_section[:tag_end] + "\n" + cards_html + "\n" + new_section[grid_end:]

        content = content[:start_idx] + new_section + content[end_idx:]

    with open(INDEX_HTML, "w", encoding="utf-8") as f:
        f.write(content)

        print(f"[OK] Updated index.html: {total} codes ({co_count} CO, {pr_count} PR, {oa_count} OA)")


def update_search_index(codes):
    """Update search-index.js with all denial code entries."""
    with open(SEARCH_INDEX_JS, "r", encoding="utf-8") as f:
        content = f.read()

    # Remove existing denial code entries
    content = re.sub(
        r"  // DENIAL CODES\n.*?(?=(?:  // TOOLS|  /\*|$))",
        "  // DENIAL CODES\n",
        content,
        flags=re.DOTALL
    )

    # Generate new entries sorted by code
    entries = []
    for c in sorted(codes, key=lambda x: (x["category"], int(x["code"].split("-")[1]))):
        entries.append(generate_search_entry(c["code"], c["metadata"], c["filename"]))

    entries_str = ",\n".join(entries) + ",\n"

    # Insert after DENIAL CODES comment
    content = content.replace("  // DENIAL CODES\n", "  // DENIAL CODES\n" + entries_str)

    with open(SEARCH_INDEX_JS, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"[OK] Updated search-index.js: {len(entries)} denial code entries")


def update_sitemap(codes):
    """Add any missing pages to sitemap.xml."""
    with open(SITEMAP_XML, "r", encoding="utf-8") as f:
        content = f.read()

    existing = set()
    for m in re.finditer(r"<loc>https://rcmdenials\.com/denial-codes/([\w-]+\.html)</loc>", content):
        existing.add(m.group(1))

    new_entries = []
    for c in codes:
        if c["filename"] not in existing:
            new_entries.append(
                f'  <url><loc>https://rcmdenials.com/denial-codes/{c["filename"]}</loc>'
                f'<lastmod>2026-06-27</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>'
            )

    if new_entries:
        # Insert before first denial-code entry or at end
        insert_point = content.find("denial-codes/")
        if insert_point > 0:
            # Find the start of that line
            line_start = content.rfind("\n", 0, insert_point) + 1
            content = content[:line_start] + "\n".join(new_entries) + "\n" + content[line_start:]
        else:
            content += "\n".join(new_entries) + "\n"

        with open(SITEMAP_XML, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"[OK] Added {len(new_entries)} new pages to sitemap.xml")
    else:
        print("[OK] sitemap.xml already complete")


def main():
    print("[*] Scanning denial-codes/ directory...")
    codes = scan_files()
    print(f"   Found {len(codes)} denial code pages")

    by_cat = {}
    for c in codes:
        by_cat.setdefault(c["category"], []).append(c)
    for cat in sorted(by_cat):
        print(f"   {cat.upper()}: {len(by_cat[cat])} codes")

    print("[+] Updating index.html...")
    update_index_html(codes)

    print("[+] Updating search-index.js...")
    update_search_index(codes)

    print("[+] Updating sitemap.xml...")
    update_sitemap(codes)

    print("[OK] Done! All files are now in sync.")


if __name__ == "__main__":
    main()
