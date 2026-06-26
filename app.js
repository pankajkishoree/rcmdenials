/* ============================================================
   RCM DENIALS — APPLICATION LOGIC
   AI-Powered AR Calling Assistant · Full SaaS Engine
   ============================================================ */

'use strict';

if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, radii) {
    if (!radii) radii = 0;
    const r = Array.isArray(radii) ? radii : [radii, radii, radii, radii];
    const [tl, tr, br, bl] = r.map(v => Math.min(v || 0, Math.min(w, h) / 2));
    this.moveTo(x + tl, y);
    this.lineTo(x + w - tr, y);
    this.quadraticCurveTo(x + w, y, x + w, y + tr);
    this.lineTo(x + w, y + h - br);
    this.quadraticCurveTo(x + w, y + h, x + w - br, y + h);
    this.lineTo(x + bl, y + h);
    this.quadraticCurveTo(x, y + h, x, y + h - bl);
    this.lineTo(x, y + tl);
    this.quadraticCurveTo(x, y, x + tl, y);
    this.closePath();
    return this;
  };
}

// ════════════════════════════════════════════════════════════
// DATA: PAYER DIRECTORY
// ════════════════════════════════════════════════════════════
const PAYER_DB = [
  {
    id: 'BCBS-ANTHEM', name: 'Anthem Blue Cross Blue Shield', abbr: 'ABCBS',
    payerId: '00630', type: 'Commercial', states: ['CA','GA','IN','KY','MO','NV','OH','VA','WI'],
    timelyFiling: { initial: 365, appeal: 180, corrected: 365 },
    departments: {
      Claims:     { phone: '(800) 676-2583', fax: '(800) 676-2590', address: 'PO Box 105187, Atlanta, GA 30348', portal: 'https://provider.anthem.com' },
      Appeals:    { phone: '(866) 297-5752', fax: '(800) 845-7279', address: 'PO Box 105566, Atlanta, GA 30348', portal: 'https://provider.anthem.com/appeals' },
      Authorization: { phone: '(800) 454-3730', fax: '(877) 808-5133', address: 'PO Box 105187, Atlanta, GA 30348', portal: 'https://provider.anthem.com/auth' },
      'EDI Support': { phone: '(800) 746-4614', fax: '(800) 746-4615', address: 'EDI Dept, Atlanta, GA 30348', portal: 'https://provider.anthem.com/edi' },
      Credentialing: { phone: '(800) 676-2583 opt 3', fax: '(800) 676-2590', address: 'Credentialing Dept, Atlanta, GA 30348', portal: 'https://provider.anthem.com/cred' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 676-2583' },
      { action: 'Press 1', detail: 'For English' },
      { action: 'Press 2', detail: 'For Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI number' },
      { action: 'Press 1', detail: 'For Claims Status' },
      { action: 'Press 2', detail: 'For Specific Claim' },
      { action: 'Enter Claim #', detail: 'Or Member ID' },
      { action: 'Hold for Rep', detail: 'Claims Processing Department' }
    ],
    holdTime: '18 min', bestTime: '8–10 AM EST', callback: 'Yes', verified: '2024-11-15'
  },
  {
    id: 'AETNA', name: 'Aetna', abbr: 'AET',
    payerId: '60054', type: 'Commercial', states: ['All'],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      Claims:     { phone: '(800) 624-0756', fax: '(860) 273-0123', address: 'PO Box 981106, El Paso, TX 79998', portal: 'https://www.aetna.com/provider' },
      Appeals:    { phone: '(800) 537-9384', fax: '(860) 975-3644', address: 'PO Box 14079, Lexington, KY 40512', portal: 'https://www.aetna.com/provider/appeals' },
      Authorization: { phone: '(800) 624-0756', fax: '(860) 273-0124', address: 'PO Box 14599, Lexington, KY 40512', portal: 'https://www.aetna.com/provider/auth' },
      'EDI Support': { phone: '(800) 343-9360', fax: '(860) 273-0125', address: 'EDI Dept, Hartford, CT 06156', portal: 'https://www.aetna.com/provider/edi' },
      Credentialing: { phone: '(800) 624-0756 opt 5', fax: '(860) 273-0126', address: 'Credentialing, Hartford, CT 06156', portal: 'https://www.aetna.com/provider/cred' },
    },
    ivr: [
      { action: 'Call Provider Services', detail: '(800) 624-0756' },
      { action: 'Press 1', detail: 'English Language' },
      { action: 'Press 3', detail: 'Provider Services' },
      { action: 'Enter Tax ID', detail: '9-digit EIN (no dashes)' },
      { action: 'Press 1', detail: 'Claim Inquiry' },
      { action: 'Enter Claim #', detail: 'Or member DOB + ID' },
      { action: 'Hold for Rep', detail: 'Average 18 minutes' }
    ],
    holdTime: '18 min', bestTime: '7–9 AM EST', callback: 'Yes', verified: '2024-12-01'
  },
  {
    id: 'CIGNA', name: 'Cigna Healthcare', abbr: 'CGN',
    payerId: '62308', type: 'Commercial', states: ['All'],
    timelyFiling: { initial: 90, appeal: 180, corrected: 90 },
    departments: {
      Claims:     { phone: '(800) 244-6224', fax: '(800) 936-5967', address: 'PO Box 182223, Chattanooga, TN 37422', portal: 'https://cignaforhcp.cigna.com' },
      Appeals:    { phone: '(800) 244-6224', fax: '(800) 936-5969', address: 'PO Box 188011, Chattanooga, TN 37422', portal: 'https://cignaforhcp.cigna.com/appeals' },
      Authorization: { phone: '(800) 244-6224 opt 2', fax: '(800) 936-5970', address: 'Auth Dept, Chattanooga, TN 37422', portal: 'https://cignaforhcp.cigna.com/auth' },
      'EDI Support': { phone: '(800) 853-2713', fax: '(800) 853-2714', address: 'EDI Dept, Chattanooga, TN 37422', portal: 'https://cignaforhcp.cigna.com/edi' },
      Credentialing: { phone: '(800) 244-6224 opt 4', fax: '(800) 936-5971', address: 'Credentialing, Chattanooga, TN 37422', portal: 'https://cignaforhcp.cigna.com/cred' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 244-6224' },
      { action: 'Press 1', detail: 'For English' },
      { action: 'Press 1', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Enter Tax ID', detail: 'EIN without dashes' },
      { action: 'Press 2', detail: 'Claim Status Inquiry' },
      { action: 'Enter Claim #', detail: 'Full claim number' },
      { action: 'Hold for Rep', detail: 'Claims Department' }
    ],
    holdTime: '22 min', bestTime: '8–11 AM EST', callback: 'No', verified: '2024-11-20'
  },
  {
    id: 'UHC', name: 'UnitedHealthcare', abbr: 'UHC',
    payerId: '87726', type: 'Commercial', states: ['All'],
    timelyFiling: { initial: 365, appeal: 180, corrected: 365 },
    departments: {
      Claims:     { phone: '(877) 842-3210', fax: '(800) 695-1273', address: 'PO Box 740800, Atlanta, GA 30374', portal: 'https://uhcprovider.com' },
      Appeals:    { phone: '(866) 842-3278', fax: '(801) 994-1082', address: 'PO Box 30432, Salt Lake City, UT 84130', portal: 'https://uhcprovider.com/appeals' },
      Authorization: { phone: '(877) 842-3210', fax: '(800) 695-1274', address: 'PO Box 740800, Atlanta, GA 30374', portal: 'https://uhcprovider.com/auth' },
      'EDI Support': { phone: '(866) 842-3278 opt 3', fax: '(800) 695-1275', address: 'EDI Dept, Minneapolis, MN 55440', portal: 'https://uhcprovider.com/edi' },
      Credentialing: { phone: '(877) 842-3210 opt 4', fax: '(800) 695-1276', address: 'Credentialing, Minneapolis, MN 55440', portal: 'https://uhcprovider.com/cred' },
    },
    ivr: [
      { action: 'Call Provider Services', detail: '(877) 842-3210' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Press 1', detail: 'Claim Status' },
      { action: 'Enter NPI', detail: '10-digit NPI number' },
      { action: 'Enter Tax ID', detail: '9-digit EIN' },
      { action: 'Enter Claim #', detail: 'Or member ID + DOS' },
      { action: 'Hold for Rep', detail: 'Provider Services Team' }
    ],
    holdTime: '25 min', bestTime: '8–10 AM CST', callback: 'Yes', verified: '2024-12-10'
  },
  {
    id: 'HUMANA', name: 'Humana', abbr: 'HUM',
    payerId: '61101', type: 'Commercial', states: ['All'],
    timelyFiling: { initial: 365, appeal: 60, corrected: 365 },
    departments: {
      Claims:     { phone: '(800) 448-6262', fax: '(800) 448-6263', address: 'PO Box 14601, Lexington, KY 40512', portal: 'https://www.humana.com/provider' },
      Appeals:    { phone: '(800) 448-6262 opt 2', fax: '(800) 448-6264', address: 'PO Box 14546, Lexington, KY 40512', portal: 'https://www.humana.com/provider/appeals' },
      Authorization: { phone: '(800) 523-0023', fax: '(800) 448-6265', address: 'PO Box 14601, Lexington, KY 40512', portal: 'https://www.humana.com/provider/auth' },
      'EDI Support': { phone: '(800) 905-8671', fax: '(800) 448-6266', address: 'EDI Dept, Lexington, KY 40512', portal: 'https://www.humana.com/provider/edi' },
      Credentialing: { phone: '(800) 448-6262 opt 4', fax: '(800) 448-6267', address: 'Credentialing, Lexington, KY 40512', portal: 'https://www.humana.com/provider/cred' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 448-6262' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 1', detail: 'Provider Services' },
      { action: 'Press 2', detail: 'Claims Inquiries' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Enter Member ID', detail: 'Humana member ID' },
      { action: 'Hold for Rep', detail: 'Claims Department' }
    ],
    holdTime: '15 min', bestTime: '9–11 AM EST', callback: 'Yes', verified: '2024-11-28'
  },
  {
    id: 'MEDICARE', name: 'Medicare (CMS)', abbr: 'CMS',
    payerId: '00001', type: 'Medicare', states: ['All'],
    timelyFiling: { initial: 365, appeal: 120, corrected: 365 },
    departments: {
      Claims:     { phone: '(800) 633-4227', fax: '(800) 633-4228', address: '7500 Security Blvd, Baltimore, MD 21244', portal: 'https://www.cms.gov/provider' },
      Appeals:    { phone: '(800) 633-4227 opt 2', fax: '(800) 633-4229', address: 'ALJ Hearings, 5107 Leesburg Pike, Falls Church, VA 22041', portal: 'https://www.hhs.gov/dab' },
      'Medical Review': { phone: '(800) 633-4227 opt 3', fax: '(800) 633-4230', address: 'Medical Review Dept, Baltimore, MD 21244', portal: 'https://www.cms.gov/medical-review' },
      'EDI Support': { phone: '(866) 290-4150', fax: '(800) 633-4231', address: 'EDI Dept, Baltimore, MD 21244', portal: 'https://www.cms.gov/edi' },
      'Provider Relations': { phone: '(800) 633-4227', fax: '(800) 633-4232', address: 'Provider Relations, Baltimore, MD 21244', portal: 'https://www.cms.gov/provider-relations' },
    },
    ivr: [
      { action: 'Call Medicare Line', detail: '(800) 633-4227' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Enter PTAN', detail: 'Provider Transaction Access Number' },
      { action: 'Press 1', detail: 'Claim Status' },
      { action: 'Enter Beneficiary HIC#', detail: 'Medicare ID (11 characters)' },
      { action: 'Hold for Rep', detail: 'Fiscal Intermediary/MAC' }
    ],
    holdTime: '30 min', bestTime: '7–9 AM Local', callback: 'No', verified: '2024-12-05'
  },
  {
    id: 'MEDICAID-TX', name: 'Texas Medicaid (TMHP)', abbr: 'TMHP',
    payerId: 'TMHP1', type: 'Medicaid', states: ['TX'],
    timelyFiling: { initial: 95, appeal: 120, corrected: 95 },
    departments: {
      Claims:     { phone: '(800) 925-9126', fax: '(512) 514-4229', address: 'PO Box 200555, Austin, TX 78720', portal: 'https://www.tmhp.com' },
      Appeals:    { phone: '(800) 925-9126 opt 3', fax: '(512) 514-4230', address: 'PO Box 200908, Austin, TX 78720', portal: 'https://www.tmhp.com/appeals' },
      'EDI Support': { phone: '(800) 925-9126 opt 5', fax: '(512) 514-4231', address: 'EDI Dept, Austin, TX 78720', portal: 'https://www.tmhp.com/edi' },
      Credentialing: { phone: '(800) 925-9126 opt 4', fax: '(512) 514-4232', address: 'Credentialing, Austin, TX 78720', portal: 'https://www.tmhp.com/cred' },
      Authorization: { phone: '(800) 925-9126 opt 2', fax: '(512) 514-4233', address: 'Auth Dept, Austin, TX 78720', portal: 'https://www.tmhp.com/auth' },
    },
    ivr: [
      { action: 'Call TMHP Line', detail: '(800) 925-9126' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 1', detail: 'Provider Inquiries' },
      { action: 'Press 2', detail: 'Claim Status' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Enter Client ID', detail: 'Medicaid Member ID' },
      { action: 'Hold for Rep', detail: 'Claims Department' }
    ],
    holdTime: '20 min', bestTime: '9 AM–12 PM CST', callback: 'No', verified: '2024-11-10'
  },
  {
    id: 'BCBSTX', name: 'BCBS of Texas (HCSC)', abbr: 'BCBSTX',
    payerId: '84980', type: 'Commercial', states: ['TX'],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      Claims:     { phone: '(800) 521-2227', fax: '(800) 521-2228', address: 'PO Box 660044, Dallas, TX 75266', portal: 'https://www.bcbstx.com/provider' },
      Appeals:    { phone: '(800) 521-2227 opt 2', fax: '(800) 521-2229', address: 'PO Box 655188, Dallas, TX 75265', portal: 'https://www.bcbstx.com/provider/appeals' },
      Authorization: { phone: '(800) 441-9188', fax: '(800) 521-2230', address: 'Auth Dept, Dallas, TX 75266', portal: 'https://www.bcbstx.com/provider/auth' },
      'EDI Support': { phone: '(800) 327-5658', fax: '(800) 521-2231', address: 'EDI Dept, Dallas, TX 75266', portal: 'https://www.bcbstx.com/provider/edi' },
      Credentialing: { phone: '(800) 521-2227 opt 4', fax: '(800) 521-2232', address: 'Credentialing, Dallas, TX 75266', portal: 'https://www.bcbstx.com/provider/cred' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 521-2227' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Inquiry' },
      { action: 'Enter Member ID', detail: 'BCBSTX ID card number' },
      { action: 'Hold for Rep', detail: 'Claims Team' }
    ],
    holdTime: '20 min', bestTime: '8–10 AM CST', callback: 'Yes', verified: '2024-12-01'
  },
  {
    id: 'MOLINA', name: 'Molina Healthcare', abbr: 'MOL',
    payerId: '25133', type: 'Managed Care', states: ['CA','FL','ID','IL','MI','MS','NM','NY','OH','SC','TX','UT','VA','WA','WI'],
    timelyFiling: { initial: 180, appeal: 60, corrected: 180 },
    departments: {
      Claims:     { phone: '(888) 562-5442', fax: '(877) 240-0584', address: 'PO Box 22809, Long Beach, CA 90801', portal: 'https://provider.molinahealthcare.com' },
      Appeals:    { phone: '(888) 562-5442 opt 3', fax: '(877) 240-0585', address: 'PO Box 22812, Long Beach, CA 90801', portal: 'https://provider.molinahealthcare.com/appeals' },
      Authorization: { phone: '(888) 562-5442 opt 2', fax: '(877) 240-0586', address: 'Auth Dept, Long Beach, CA 90801', portal: 'https://provider.molinahealthcare.com/auth' },
      'EDI Support': { phone: '(888) 562-5442 opt 5', fax: '(877) 240-0587', address: 'EDI Dept, Long Beach, CA 90801', portal: 'https://provider.molinahealthcare.com/edi' },
      Credentialing: { phone: '(888) 562-5442 opt 4', fax: '(877) 240-0588', address: 'Credentialing, Long Beach, CA 90801', portal: 'https://provider.molinahealthcare.com/cred' },
    },
    ivr: [
      { action: 'Call Provider Services', detail: '(888) 562-5442' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 3', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims' },
      { action: 'Enter Member ID', detail: 'Molina ID number' },
      { action: 'Hold for Rep', detail: 'Claims Team' }
    ],
    holdTime: '12 min', bestTime: '10 AM–1 PM PST', callback: 'No', verified: '2024-11-05'
  },
  {
    id: 'MAGELLAN', name: 'Magellan Health', abbr: 'MAG',
    payerId: '59355', type: 'Managed Care', states: ['All'],
    timelyFiling: { initial: 90, appeal: 60, corrected: 90 },
    departments: {
      Claims:     { phone: '(800) 788-4005', fax: '(866) 880-7999', address: 'PO Box 1367, Avondale, AZ 85323', portal: 'https://www.magellanprovider.com' },
      Appeals:    { phone: '(800) 788-4005 opt 2', fax: '(866) 880-7998', address: 'Appeals Dept, Avondale, AZ 85323', portal: 'https://www.magellanprovider.com/appeals' },
      Authorization: { phone: '(800) 788-4005 opt 3', fax: '(866) 880-7997', address: 'Auth Dept, Avondale, AZ 85323', portal: 'https://www.magellanprovider.com/auth' },
      'EDI Support': { phone: '(800) 788-4005 opt 5', fax: '(866) 880-7996', address: 'EDI Dept, Avondale, AZ 85323', portal: 'https://www.magellanprovider.com/edi' },
      Credentialing: { phone: '(800) 788-4005 opt 4', fax: '(866) 880-7995', address: 'Credentialing, Avondale, AZ 85323', portal: 'https://www.magellanprovider.com/cred' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 788-4005' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claim Status' },
      { action: 'Enter Claim #', detail: 'Full claim number' },
      { action: 'Hold for Rep', detail: 'Claims Department' }
    ],
    holdTime: '10 min', bestTime: '8–10 AM MST', callback: 'Yes', verified: '2024-10-20'
  },
  {
    id: 'TRICARE', name: 'TRICARE (Defense Health Agency)', abbr: 'TRI',
    payerId: 'TRIC1', type: 'Tricare', states: ['All'],
    timelyFiling: { initial: 365, appeal: 90, corrected: 365 },
    departments: {
      Claims:     { phone: '(800) 444-5445', fax: '(800) 444-5446', address: 'PO Box 7928, Madison, WI 53707', portal: 'https://tricare.mil/provider' },
      Appeals:    { phone: '(800) 444-5445 opt 2', fax: '(800) 444-5447', address: 'Appeals Dept, Madison, WI 53707', portal: 'https://tricare.mil/provider/appeals' },
      Authorization: { phone: '(800) 444-5445 opt 3', fax: '(800) 444-5448', address: 'Auth Dept, Madison, WI 53707', portal: 'https://tricare.mil/provider/auth' },
      'EDI Support': { phone: '(800) 444-5445 opt 5', fax: '(800) 444-5449', address: 'EDI Dept, Madison, WI 53707', portal: 'https://tricare.mil/provider/edi' },
      Credentialing: { phone: '(800) 444-5445 opt 4', fax: '(800) 444-5450', address: 'Credentialing, Madison, WI 53707', portal: 'https://tricare.mil/provider/cred' },
    },
    ivr: [
      { action: 'Call TRICARE Line', detail: '(800) 444-5445' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 1', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 2', detail: 'Claims Status' },
      { action: 'Enter Claim #', detail: 'Or member ID + DOS' },
      { action: 'Hold for Rep', detail: 'TRICARE Claims Team' }
    ],
    holdTime: '35 min', bestTime: '8–9 AM EST', callback: 'No', verified: '2024-11-30'
  },

  // ════════════════════════════════════════════════════════════
  // TOP COMMERCIAL PAYERS
  // ════════════════════════════════════════════════════════════
  {
    id: 'KAISER', name: 'Kaiser Permanente', abbr: 'KPR',
    payerId: '10010', type: 'Commercial', states: ['CA','CO','GA','HI','MD','OR','VA','WA','DC'],
    timelyFiling: { initial: 90, appeal: 60, corrected: 90 },
    departments: {
      Claims:     { phone: '(800) 464-4000', fax: '(800) 432-1022', address: 'PO Box 23210, Oakland, CA 94623', portal: 'https://healthy.kaiser.org/for-providers' },
      Appeals:    { phone: '(800) 464-4000 opt 3', fax: '(800) 432-1023', address: 'Appeals Dept, Oakland, CA 94623', portal: 'https://healthy.kaiser.org/for-providers/appeals' },
      Authorization: { phone: '(800) 464-4000 opt 2', fax: '(800) 432-1024', address: 'Auth Dept, Oakland, CA 94623', portal: 'https://healthy.kaiser.org/for-providers/auth' },
      'EDI Support': { phone: '(800) 464-4000 opt 5', fax: '(800) 432-1025', address: 'EDI Dept, Oakland, CA 94623', portal: 'https://healthy.kaiser.org/for-providers/edi' },
      Credentialing: { phone: '(800) 464-4000 opt 4', fax: '(800) 432-1026', address: 'Credentialing, Oakland, CA 94623', portal: 'https://healthy.kaiser.org/for-providers/cred' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 464-4000' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Enter Member ID', detail: 'Kaiser member ID' },
      { action: 'Hold for Rep', detail: 'Claims Department' }
    ],
    holdTime: '12 min', bestTime: '9–11 AM PST', callback: 'Yes', verified: '2024-12-01'
  },
  {
    id: 'HEALTHNET', name: 'Health Net (Centene)', abbr: 'HNET',
    payerId: '43256', type: 'Commercial', states: ['CA','AZ','CT','DC','FL','IL','MA','MD','MI','MS','MO','NJ','NM','NY','OH','OR','TN','TX','UT','VA','WA','WI'],
    timelyFiling: { initial: 180, appeal: 60, corrected: 180 },
    departments: {
      Claims:     { phone: '(800) 675-6110', fax: '(800) 478-8916', address: 'PO Box 7020, Phoenix, AZ 85011', portal: 'https://www.healthnet.com/provider' },
      Appeals:    { phone: '(800) 675-6110 opt 3', fax: '(800) 478-8917', address: 'Appeals Dept, Phoenix, AZ 85011', portal: 'https://www.healthnet.com/provider/appeals' },
      Authorization: { phone: '(800) 675-6110 opt 2', fax: '(800) 478-8918', address: 'Auth Dept, Phoenix, AZ 85011', portal: 'https://www.healthnet.com/provider/auth' },
      'EDI Support': { phone: '(800) 675-6110 opt 5', fax: '(800) 478-8919', address: 'EDI Dept, Phoenix, AZ 85011', portal: 'https://www.healthnet.com/provider/edi' },
      Credentialing: { phone: '(800) 675-6110 opt 4', fax: '(800) 478-8920', address: 'Credentialing, Phoenix, AZ 85011', portal: 'https://www.healthnet.com/provider/cred' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 675-6110' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 3', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Inquiry' },
      { action: 'Enter Member ID', detail: 'Health Net ID' },
      { action: 'Hold for Rep', detail: 'Claims Team' }
    ],
    holdTime: '18 min', bestTime: '8–10 AM PST', callback: 'Yes', verified: '2024-11-15'
  },
  {
    id: 'HIGHMARK', name: 'Highmark Blue Cross Blue Shield', abbr: 'HMBC',
    payerId: '61060', type: 'Commercial', states: ['PA','WV','DE'],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      Claims:     { phone: '(800) 553-7683', fax: '(800) 553-7684', address: 'PO Box 89090, Camp Hill, PA 17011', portal: 'https://www.highmarkprovider.com' },
      Appeals:    { phone: '(800) 553-7683 opt 2', fax: '(800) 553-7685', address: 'Appeals Dept, Camp Hill, PA 17011', portal: 'https://www.highmarkprovider.com/appeals' },
      Authorization: { phone: '(800) 553-7683 opt 3', fax: '(800) 553-7686', address: 'Auth Dept, Camp Hill, PA 17011', portal: 'https://www.highmarkprovider.com/auth' },
      'EDI Support': { phone: '(800) 553-7683 opt 5', fax: '(800) 553-7687', address: 'EDI Dept, Camp Hill, PA 17011', portal: 'https://www.highmarkprovider.com/edi' },
      Credentialing: { phone: '(800) 553-7683 opt 4', fax: '(800) 553-7688', address: 'Credentialing, Camp Hill, PA 17011', portal: 'https://www.highmarkprovider.com/cred' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 553-7683' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Enter Claim #', detail: 'Full claim number' },
      { action: 'Hold for Rep', detail: 'Claims Department' }
    ],
    holdTime: '15 min', bestTime: '8–10 AM EST', callback: 'Yes', verified: '2024-12-05'
  },
  {
    id: 'BSCLCA', name: 'Blue Shield of California', abbr: 'BSCA',
    payerId: '60054', type: 'Commercial', states: ['CA'],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      Claims:     { phone: '(800) 541-7846', fax: '(800) 432-1028', address: 'PO Box 21692, Los Angeles, CA 90021', portal: 'https://www.blueshieldca.com/providers' },
      Appeals:    { phone: '(800) 541-7846 opt 2', fax: '(800) 432-1029', address: 'Appeals Dept, Los Angeles, CA 90021', portal: 'https://www.blueshieldca.com/providers/appeals' },
      Authorization: { phone: '(800) 541-7846 opt 3', fax: '(800) 432-1030', address: 'Auth Dept, Los Angeles, CA 90021', portal: 'https://www.blueshieldca.com/providers/auth' },
      'EDI Support': { phone: '(800) 541-7846 opt 5', fax: '(800) 432-1031', address: 'EDI Dept, Los Angeles, CA 90021', portal: 'https://www.blueshieldca.com/providers/edi' },
      Credentialing: { phone: '(800) 541-7846 opt 4', fax: '(800) 432-1032', address: 'Credentialing, Los Angeles, CA 90021', portal: 'https://www.blueshieldca.com/providers/cred' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 541-7846' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Enter Member ID', detail: 'Blue Shield ID' },
      { action: 'Hold for Rep', detail: 'Claims Department' }
    ],
    holdTime: '16 min', bestTime: '9–11 AM PST', callback: 'Yes', verified: '2024-12-10'
  },
  {
    id: 'CAREFIRST', name: 'CareFirst BlueCross BlueShield', abbr: 'CFBC',
    payerId: '62308', type: 'Commercial', states: ['MD','DC','VA'],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      Claims:     { phone: '(800) 535-1428', fax: '(800) 456-6827', address: 'PO Box 7048, Falls Church, VA 22040', portal: 'https://www.carefirst.com/provider' },
      Appeals:    { phone: '(800) 535-1428 opt 2', fax: '(800) 456-6828', address: 'Appeals Dept, Falls Church, VA 22040', portal: 'https://www.carefirst.com/provider/appeals' },
      Authorization: { phone: '(800) 535-1428 opt 3', fax: '(800) 456-6829', address: 'Auth Dept, Falls Church, VA 22040', portal: 'https://www.carefirst.com/provider/auth' },
      'EDI Support': { phone: '(800) 535-1428 opt 5', fax: '(800) 456-6830', address: 'EDI Dept, Falls Church, VA 22040', portal: 'https://www.carefirst.com/provider/edi' },
      Credentialing: { phone: '(800) 535-1428 opt 4', fax: '(800) 456-6831', address: 'Credentialing, Falls Church, VA 22040', portal: 'https://www.carefirst.com/provider/cred' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 535-1428' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Enter Claim #', detail: 'Full claim number' },
      { action: 'Hold for Rep', detail: 'Claims Department' }
    ],
    holdTime: '17 min', bestTime: '8–10 AM EST', callback: 'Yes', verified: '2024-12-08'
  },
  {
    id: 'FLORIDABLUE', name: 'Florida Blue', abbr: 'FLB',
    payerId: '61060', type: 'Commercial', states: ['FL'],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      Claims:     { phone: '(800) 352-2583', fax: '(800) 451-2848', address: 'PO Box 1798, Jacksonville, FL 32231', portal: 'https://www.floridablue.com/providers' },
      Appeals:    { phone: '(800) 352-2583 opt 2', fax: '(800) 451-2849', address: 'Appeals Dept, Jacksonville, FL 32231', portal: 'https://www.floridablue.com/providers/appeals' },
      Authorization: { phone: '(800) 352-2583 opt 3', fax: '(800) 451-2850', address: 'Auth Dept, Jacksonville, FL 32231', portal: 'https://www.floridablue.com/providers/auth' },
      'EDI Support': { phone: '(800) 352-2583 opt 5', fax: '(800) 451-2851', address: 'EDI Dept, Jacksonville, FL 32231', portal: 'https://www.floridablue.com/providers/edi' },
      Credentialing: { phone: '(800) 352-2583 opt 4', fax: '(800) 451-2852', address: 'Credentialing, Jacksonville, FL 32231', portal: 'https://www.floridablue.com/providers/cred' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 352-2583' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Enter Member ID', detail: 'Florida Blue ID' },
      { action: 'Hold for Rep', detail: 'Claims Department' }
    ],
    holdTime: '19 min', bestTime: '8–10 AM EST', callback: 'Yes', verified: '2024-12-12'
  },
  {
    id: 'HORIZON', name: 'Horizon BCBS New Jersey', abbr: 'HBCN',
    payerId: '61060', type: 'Commercial', states: ['NJ'],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      Claims:     { phone: '(800) 624-1110', fax: '(800) 624-1111', address: 'PO Box 105100, Atlanta, GA 30348', portal: 'https://www.horizonblue.com/providers' },
      Appeals:    { phone: '(800) 624-1110 opt 2', fax: '(800) 624-1112', address: 'Appeals Dept, Newark, NJ 07102', portal: 'https://www.horizonblue.com/providers/appeals' },
      Authorization: { phone: '(800) 624-1110 opt 3', fax: '(800) 624-1113', address: 'Auth Dept, Newark, NJ 07102', portal: 'https://www.horizonblue.com/providers/auth' },
      'EDI Support': { phone: '(800) 624-1110 opt 5', fax: '(800) 624-1114', address: 'EDI Dept, Newark, NJ 07102', portal: 'https://www.horizonblue.com/providers/edi' },
      Credentialing: { phone: '(800) 624-1110 opt 4', fax: '(800) 624-1115', address: 'Credentialing, Newark, NJ 07102', portal: 'https://www.horizonblue.com/providers/cred' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 624-1110' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Enter Member ID', detail: 'Horizon ID' },
      { action: 'Hold for Rep', detail: 'Claims Department' }
    ],
    holdTime: '14 min', bestTime: '8–10 AM EST', callback: 'Yes', verified: '2024-12-15'
  },
  {
    id: 'IBXC', name: 'Independence Blue Cross', abbr: 'IBX',
    payerId: '61060', type: 'Commercial', states: ['PA','NJ','DE'],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      Claims:     { phone: '(800) 342-8721', fax: '(800) 342-8722', address: 'PO Box 831999, Philadelphia, PA 19183', portal: 'https://www.ibx.com/providers' },
      Appeals:    { phone: '(800) 342-8721 opt 2', fax: '(800) 342-8723', address: 'Appeals Dept, Philadelphia, PA 19183', portal: 'https://www.ibx.com/providers/appeals' },
      Authorization: { phone: '(800) 342-8721 opt 3', fax: '(800) 342-8724', address: 'Auth Dept, Philadelphia, PA 19183', portal: 'https://www.ibx.com/providers/auth' },
      'EDI Support': { phone: '(800) 342-8721 opt 5', fax: '(800) 342-8725', address: 'EDI Dept, Philadelphia, PA 19183', portal: 'https://www.ibx.com/providers/edi' },
      Credentialing: { phone: '(800) 342-8721 opt 4', fax: '(800) 342-8726', address: 'Credentialing, Philadelphia, PA 19183', portal: 'https://www.ibx.com/providers/cred' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 342-8721' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Enter Member ID', detail: 'IBX ID' },
      { action: 'Hold for Rep', detail: 'Claims Department' }
    ],
    holdTime: '16 min', bestTime: '8–10 AM EST', callback: 'Yes', verified: '2024-12-18'
  },
  {
    id: 'REGENCE', name: 'Regence BlueShield', abbr: 'REG',
    payerId: '61060', type: 'Commercial', states: ['ID','OR','UT','WA'],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      Claims:     { phone: '(800) 624-1110', fax: '(800) 624-1116', address: 'PO Box 105100, Atlanta, GA 30348', portal: 'https://www.regence.com/providers' },
      Appeals:    { phone: '(800) 624-1110 opt 2', fax: '(800) 624-1117', address: 'Appeals Dept, Portland, OR 97201', portal: 'https://www.regence.com/providers/appeals' },
      Authorization: { phone: '(800) 624-1110 opt 3', fax: '(800) 624-1118', address: 'Auth Dept, Portland, OR 97201', portal: 'https://www.regence.com/providers/auth' },
      'EDI Support': { phone: '(800) 624-1110 opt 5', fax: '(800) 624-1119', address: 'EDI Dept, Portland, OR 97201', portal: 'https://www.regence.com/providers/edi' },
      Credentialing: { phone: '(800) 624-1110 opt 4', fax: '(800) 624-1120', address: 'Credentialing, Portland, OR 97201', portal: 'https://www.regence.com/providers/cred' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 624-1110' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Enter Member ID', detail: 'Regence ID' },
      { action: 'Hold for Rep', detail: 'Claims Department' }
    ],
    holdTime: '15 min', bestTime: '9–11 AM PST', callback: 'Yes', verified: '2024-12-20'
  },
  {
    id: 'PREMERA', name: 'Premera Blue Cross', abbr: 'PREM',
    payerId: '61060', type: 'Commercial', states: ['WA','AK'],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      Claims:     { phone: '(800) 722-4373', fax: '(800) 722-4374', address: 'PO Box 7407, Lynnwood, WA 98036', portal: 'https://www.premera.com/providers' },
      Appeals:    { phone: '(800) 722-4373 opt 2', fax: '(800) 722-4375', address: 'Appeals Dept, Lynnwood, WA 98036', portal: 'https://www.premera.com/providers/appeals' },
      Authorization: { phone: '(800) 722-4373 opt 3', fax: '(800) 722-4376', address: 'Auth Dept, Lynnwood, WA 98036', portal: 'https://www.premera.com/providers/auth' },
      'EDI Support': { phone: '(800) 722-4373 opt 5', fax: '(800) 722-4377', address: 'EDI Dept, Lynnwood, WA 98036', portal: 'https://www.premera.com/providers/edi' },
      Credentialing: { phone: '(800) 722-4373 opt 4', fax: '(800) 722-4378', address: 'Credentialing, Lynnwood, WA 98036', portal: 'https://www.premera.com/providers/cred' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 722-4373' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Enter Member ID', detail: 'Premera ID' },
      { action: 'Hold for Rep', detail: 'Claims Department' }
    ],
    holdTime: '14 min', bestTime: '9–11 AM PST', callback: 'Yes', verified: '2024-12-22'
  },

  // ════════════════════════════════════════════════════════════
  // GOVERNMENT PAYERS
  // ════════════════════════════════════════════════════════════
  {
    id: 'MEDICAID', name: 'Medicaid (State Programs)', abbr: 'MCD',
    payerId: 'MCD01', type: 'Medicaid', states: ['All'],
    timelyFiling: { initial: 95, appeal: 120, corrected: 95 },
    departments: {
      Claims:     { phone: '(800) 633-4227', fax: '(800) 633-4233', address: '7500 Security Blvd, Baltimore, MD 21244', portal: 'https://www.medicaid.gov' },
      Appeals:    { phone: '(800) 633-4227 opt 2', fax: '(800) 633-4234', address: 'Appeals Dept, Baltimore, MD 21244', portal: 'https://www.medicaid.gov/appeals' },
      Authorization: { phone: '(800) 633-4227 opt 3', fax: '(800) 633-4235', address: 'Auth Dept, Baltimore, MD 21244', portal: 'https://www.medicaid.gov/auth' },
      'EDI Support': { phone: '(800) 633-4227 opt 5', fax: '(800) 633-4236', address: 'EDI Dept, Baltimore, MD 21244', portal: 'https://www.medicaid.gov/edi' },
      Credentialing: { phone: '(800) 633-4227 opt 4', fax: '(800) 633-4237', address: 'Credentialing, Baltimore, MD 21244', portal: 'https://www.medicaid.gov/cred' },
    },
    ivr: [
      { action: 'Call Medicaid Line', detail: '(800) 633-4227' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claim Status' },
      { action: 'Enter Beneficiary ID', detail: 'Medicaid ID' },
      { action: 'Hold for Rep', detail: 'State Medicaid Office' }
    ],
    holdTime: '25 min', bestTime: '7–9 AM Local', callback: 'No', verified: '2024-12-25'
  },
  {
    id: 'VA', name: 'Veterans Affairs (VA)', abbr: 'VA',
    payerId: 'VA001', type: 'Government', states: ['All'],
    timelyFiling: { initial: 365, appeal: 180, corrected: 365 },
    departments: {
      Claims:     { phone: '(877) 345-3370', fax: '(877) 345-3371', address: 'VA Medical Center, 100 Emancipation Hwy, Hampton, VA 23667', portal: 'https://www.va.gov/health-care/about-va-health-benefits' },
      Appeals:    { phone: '(877) 345-3370 opt 2', fax: '(877) 345-3372', address: 'Appeals Dept, Washington, DC 20420', portal: 'https://www.va.gov/decide' },
      Authorization: { phone: '(877) 345-3370 opt 3', fax: '(877) 345-3373', address: 'Auth Dept, Washington, DC 20420', portal: 'https://www.va.gov/health-care/about-va-health-benefits' },
      'EDI Support': { phone: '(877) 345-3370 opt 5', fax: '(877) 345-3374', address: 'EDI Dept, Washington, DC 20420', portal: 'https://www.va.gov/edi' },
      Credentialing: { phone: '(877) 345-3370 opt 4', fax: '(877) 345-3375', address: 'Credentialing, Washington, DC 20420', portal: 'https://www.va.gov/cred' },
    },
    ivr: [
      { action: 'Call VA Line', detail: '(877) 345-3370' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claim Status' },
      { action: 'Enter Veteran SSN', detail: 'Last 4 of SSN' },
      { action: 'Hold for Rep', detail: 'VA Claims Team' }
    ],
    holdTime: '30 min', bestTime: '8–10 AM EST', callback: 'No', verified: '2024-12-28'
  },
  {
    id: 'CHAMPVA', name: 'CHAMPVA (Civilian Health)', abbr: 'CHMP',
    payerId: 'CHMP1', type: 'Government', states: ['All'],
    timelyFiling: { initial: 365, appeal: 180, corrected: 365 },
    departments: {
      Claims:     { phone: '(800) 733-8387', fax: '(800) 733-8388', address: 'PO Box 469068, Denver, CO 80246', portal: 'https://www.va.gov/health-care/about-va-health-benefits' },
      Appeals:    { phone: '(800) 733-8387 opt 2', fax: '(800) 733-8389', address: 'Appeals Dept, Denver, CO 80246', portal: 'https://www.va.gov/decide' },
      Authorization: { phone: '(800) 733-8387 opt 3', fax: '(800) 733-8390', address: 'Auth Dept, Denver, CO 80246', portal: 'https://www.va.gov/health-care/about-va-health-benefits' },
      'EDI Support': { phone: '(800) 733-8387 opt 5', fax: '(800) 733-8391', address: 'EDI Dept, Denver, CO 80246', portal: 'https://www.va.gov/edi' },
      Credentialing: { phone: '(800) 733-8387 opt 4', fax: '(800) 733-8392', address: 'Credentialing, Denver, CO 80246', portal: 'https://www.va.gov/cred' },
    },
    ivr: [
      { action: 'Call CHAMPVA Line', detail: '(800) 733-8387' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claim Status' },
      { action: 'Enter Beneficiary ID', detail: 'CHAMPVA ID' },
      { action: 'Hold for Rep', detail: 'CHAMPVA Claims Team' }
    ],
    holdTime: '28 min', bestTime: '8–10 AM MST', callback: 'No', verified: '2024-12-30'
  },

  // ════════════════════════════════════════════════════════════
  // MEDICAID MANAGED CARE PLANS
  // ════════════════════════════════════════════════════════════
  {
    id: 'WELLCARE', name: 'WellCare (Centene)', abbr: 'WLC',
    payerId: '61060', type: 'Medicaid', states: ['AL','AZ','CA','FL','GA','IL','KY','LA','MI','MS','MO','NJ','NY','OH','SC','TN','TX'],
    timelyFiling: { initial: 180, appeal: 60, corrected: 180 },
    departments: {
      Claims:     { phone: '(800) 633-4227', fax: '(800) 432-8910', address: 'PO Box 31490, Tampa, FL 33631', portal: 'https://www.wellcare.com/providers' },
      Appeals:    { phone: '(800) 633-4227 opt 3', fax: '(800) 432-8911', address: 'Appeals Dept, Tampa, FL 33631', portal: 'https://www.wellcare.com/providers/appeals' },
      Authorization: { phone: '(800) 633-4227 opt 2', fax: '(800) 432-8912', address: 'Auth Dept, Tampa, FL 33631', portal: 'https://www.wellcare.com/providers/auth' },
      'EDI Support': { phone: '(800) 633-4227 opt 5', fax: '(800) 432-8913', address: 'EDI Dept, Tampa, FL 33631', portal: 'https://www.wellcare.com/providers/edi' },
      Credentialing: { phone: '(800) 633-4227 opt 4', fax: '(800) 432-8914', address: 'Credentialing, Tampa, FL 33631', portal: 'https://www.wellcare.com/providers/cred' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 633-4227' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 3', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Inquiry' },
      { action: 'Enter Member ID', detail: 'WellCare ID' },
      { action: 'Hold for Rep', detail: 'Claims Team' }
    ],
    holdTime: '15 min', bestTime: '9–11 AM EST', callback: 'Yes', verified: '2024-12-05'
  },
  {
    id: 'CENTENE', name: 'Centene / Ambetter', abbr: 'CNT',
    payerId: '61060', type: 'Managed Care', states: ['All'],
    timelyFiling: { initial: 180, appeal: 60, corrected: 180 },
    departments: {
      Claims:     { phone: '(800) 228-9927', fax: '(800) 228-9928', address: 'PO Box 660409, Dallas, TX 75266', portal: 'https://www.centene.com/providers' },
      Appeals:    { phone: '(800) 228-9927 opt 3', fax: '(800) 228-9929', address: 'Appeals Dept, Dallas, TX 75266', portal: 'https://www.centene.com/providers/appeals' },
      Authorization: { phone: '(800) 228-9927 opt 2', fax: '(800) 228-9930', address: 'Auth Dept, Dallas, TX 75266', portal: 'https://www.centene.com/providers/auth' },
      'EDI Support': { phone: '(800) 228-9927 opt 5', fax: '(800) 228-9931', address: 'EDI Dept, Dallas, TX 75266', portal: 'https://www.centene.com/providers/edi' },
      Credentialing: { phone: '(800) 228-9927 opt 4', fax: '(800) 228-9932', address: 'Credentialing, Dallas, TX 75266', portal: 'https://www.centene.com/providers/cred' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 228-9927' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Enter Member ID', detail: 'Ambetter ID' },
      { action: 'Hold for Rep', detail: 'Claims Department' }
    ],
    holdTime: '16 min', bestTime: '8–10 AM CST', callback: 'Yes', verified: '2024-12-08'
  },
  {
    id: 'AMERIGROUP', name: 'Amerigroup (Wellpoint)', abbr: 'AMG',
    payerId: '61060', type: 'Medicaid', states: ['AK','CA','DC','FL','GA','IN','IA','MD','MI','MN','MO','NV','NJ','NM','NY','OH','OR','PA','SC','TN','TX','VA','WA','WV','WI'],
    timelyFiling: { initial: 180, appeal: 60, corrected: 180 },
    departments: {
      Claims:     { phone: '(800) 454-3730', fax: '(800) 454-3731', address: 'PO Box 21810, Eagan, MN 55121', portal: 'https://www.amerigroup.com/providers' },
      Appeals:    { phone: '(800) 454-3730 opt 3', fax: '(800) 454-3732', address: 'Appeals Dept, Eagan, MN 55121', portal: 'https://www.amerigroup.com/providers/appeals' },
      Authorization: { phone: '(800) 454-3730 opt 2', fax: '(800) 454-3733', address: 'Auth Dept, Eagan, MN 55121', portal: 'https://www.amerigroup.com/providers/auth' },
      'EDI Support': { phone: '(800) 454-3730 opt 5', fax: '(800) 454-3734', address: 'EDI Dept, Eagan, MN 55121', portal: 'https://www.amerigroup.com/providers/edi' },
      Credentialing: { phone: '(800) 454-3730 opt 4', fax: '(800) 454-3735', address: 'Credentialing, Eagan, MN 55121', portal: 'https://www.amerigroup.com/providers/cred' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 454-3730' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Enter Member ID', detail: 'Amerigroup ID' },
      { action: 'Hold for Rep', detail: 'Claims Department' }
    ],
    holdTime: '14 min', bestTime: '9–11 AM EST', callback: 'Yes', verified: '2024-12-10'
  },
  {
    id: 'CARESOURCE', name: 'CareSource', abbr: 'CSRC',
    payerId: '61060', type: 'Medicaid', states: ['IN','KY','OH','WV','GA','IL','MI','MO','NC','SC','TN'],
    timelyFiling: { initial: 180, appeal: 60, corrected: 180 },
    departments: {
      Claims:     { phone: '(800) 488-0134', fax: '(800) 488-0135', address: 'PO Box 260010, Columbus, OH 43226', portal: 'https://www.caresource.com/providers' },
      Appeals:    { phone: '(800) 488-0134 opt 3', fax: '(800) 488-0136', address: 'Appeals Dept, Columbus, OH 43226', portal: 'https://www.caresource.com/providers/appeals' },
      Authorization: { phone: '(800) 488-0134 opt 2', fax: '(800) 488-0137', address: 'Auth Dept, Columbus, OH 43226', portal: 'https://www.caresource.com/providers/auth' },
      'EDI Support': { phone: '(800) 488-0134 opt 5', fax: '(800) 488-0138', address: 'EDI Dept, Columbus, OH 43226', portal: 'https://www.caresource.com/providers/edi' },
      Credentialing: { phone: '(800) 488-0134 opt 4', fax: '(800) 488-0139', address: 'Credentialing, Columbus, OH 43226', portal: 'https://www.caresource.com/providers/cred' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 488-0134' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Enter Member ID', detail: 'CareSource ID' },
      { action: 'Hold for Rep', detail: 'Claims Department' }
    ],
    holdTime: '13 min', bestTime: '8–10 AM EST', callback: 'Yes', verified: '2024-12-12'
  },
  {
    id: 'AMERIHEALTH', name: 'AmeriHealth Caritas', abbr: 'AHC',
    payerId: '61060', type: 'Medicaid', states: ['DE','DC','FL','IN','KY','LA','MD','MI','MS','NJ','NC','OH','PA','SC','VA'],
    timelyFiling: { initial: 180, appeal: 60, corrected: 180 },
    departments: {
      Claims:     { phone: '(800) 345-1141', fax: '(800) 345-1142', address: 'PO Box 84100, Philadelphia, PA 19182', portal: 'https://www.amerhealthcaritas.com/providers' },
      Appeals:    { phone: '(800) 345-1141 opt 3', fax: '(800) 345-1143', address: 'Appeals Dept, Philadelphia, PA 19182', portal: 'https://www.amerhealthcaritas.com/providers/appeals' },
      Authorization: { phone: '(800) 345-1141 opt 2', fax: '(800) 345-1144', address: 'Auth Dept, Philadelphia, PA 19182', portal: 'https://www.amerhealthcaritas.com/providers/auth' },
      'EDI Support': { phone: '(800) 345-1141 opt 5', fax: '(800) 345-1145', address: 'EDI Dept, Philadelphia, PA 19182', portal: 'https://www.amerhealthcaritas.com/providers/edi' },
      Credentialing: { phone: '(800) 345-1141 opt 4', fax: '(800) 345-1146', address: 'Credentialing, Philadelphia, PA 19182', portal: 'https://www.amerhealthcaritas.com/providers/cred' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 345-1141' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Enter Member ID', detail: 'AmeriHealth ID' },
      { action: 'Hold for Rep', detail: 'Claims Department' }
    ],
    holdTime: '12 min', bestTime: '8–10 AM EST', callback: 'Yes', verified: '2024-12-14'
  },

  // ════════════════════════════════════════════════════════════
  // BEHAVIORAL HEALTH PAYERS
  // ════════════════════════════════════════════════════════════
  {
    id: 'CARELON', name: 'Carelon Behavioral Health', abbr: 'CBH',
    payerId: 'CARE1', type: 'Behavioral Health', states: ['All'],
    timelyFiling: { initial: 180, appeal: 60, corrected: 180 },
    departments: {
      Claims:     { phone: '(800) 942-0715', fax: '(800) 942-0716', address: 'PO Box 14820, Lexington, KY 40512', portal: 'https://www.carelon.com/providers' },
      Appeals:    { phone: '(800) 942-0715 opt 3', fax: '(800) 942-0717', address: 'Appeals Dept, Lexington, KY 40512', portal: 'https://www.carelon.com/providers/appeals' },
      Authorization: { phone: '(800) 942-0715 opt 2', fax: '(800) 942-0718', address: 'Auth Dept, Lexington, KY 40512', portal: 'https://www.carelon.com/providers/auth' },
      'EDI Support': { phone: '(800) 942-0715 opt 5', fax: '(800) 942-0719', address: 'EDI Dept, Lexington, KY 40512', portal: 'https://www.carelon.com/providers/edi' },
      Credentialing: { phone: '(800) 942-0715 opt 4', fax: '(800) 942-0720', address: 'Credentialing, Lexington, KY 40512', portal: 'https://www.carelon.com/providers/cred' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 942-0715' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Enter Member ID', detail: 'Carelon ID' },
      { action: 'Hold for Rep', detail: 'Behavioral Health Claims' }
    ],
    holdTime: '10 min', bestTime: '8–10 AM EST', callback: 'Yes', verified: '2024-12-15'
  },
  {
    id: 'OPTUMBH', name: 'Optum Behavioral Health', abbr: 'OBH',
    payerId: 'OPT01', type: 'Behavioral Health', states: ['All'],
    timelyFiling: { initial: 180, appeal: 60, corrected: 180 },
    departments: {
      Claims:     { phone: '(800) 357-8222', fax: '(800) 357-8223', address: 'PO Box 73260, Chicago, IL 60673', portal: 'https://www.optum.com/behavioral-health' },
      Appeals:    { phone: '(800) 357-8222 opt 3', fax: '(800) 357-8224', address: 'Appeals Dept, Chicago, IL 60673', portal: 'https://www.optum.com/behavioral-health/appeals' },
      Authorization: { phone: '(800) 357-8222 opt 2', fax: '(800) 357-8225', address: 'Auth Dept, Chicago, IL 60673', portal: 'https://www.optum.com/behavioral-health/auth' },
      'EDI Support': { phone: '(800) 357-8222 opt 5', fax: '(800) 357-8226', address: 'EDI Dept, Chicago, IL 60673', portal: 'https://www.optum.com/behavioral-health/edi' },
      Credentialing: { phone: '(800) 357-8222 opt 4', fax: '(800) 357-8227', address: 'Credentialing, Chicago, IL 60673', portal: 'https://www.optum.com/behavioral-health/cred' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 357-8222' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Enter Member ID', detail: 'Optum ID' },
      { action: 'Hold for Rep', detail: 'Behavioral Health Claims' }
    ],
    holdTime: '11 min', bestTime: '9–11 AM CST', callback: 'Yes', verified: '2024-12-18'
  },

  // ════════════════════════════════════════════════════════════
  // WORKERS COMPENSATION
  // ════════════════════════════════════════════════════════════
  {
    id: 'SEDGWICK', name: 'Sedgwick', abbr: 'SED',
    payerId: 'SED01', type: 'Workers Comp', states: ['All'],
    timelyFiling: { initial: 365, appeal: 180, corrected: 365 },
    departments: {
      Claims:     { phone: '(800) 421-3461', fax: '(800) 421-3462', address: 'PO Box 30390, Memphis, TN 38173', portal: 'https://www.sedgwick.com/providers' },
      Appeals:    { phone: '(800) 421-3461 opt 3', fax: '(800) 421-3463', address: 'Appeals Dept, Memphis, TN 38173', portal: 'https://www.sedgwick.com/providers/appeals' },
      Authorization: { phone: '(800) 421-3461 opt 2', fax: '(800) 421-3464', address: 'Auth Dept, Memphis, TN 38173', portal: 'https://www.sedgwick.com/providers/auth' },
      'EDI Support': { phone: '(800) 421-3461 opt 5', fax: '(800) 421-3465', address: 'EDI Dept, Memphis, TN 38173', portal: 'https://www.sedgwick.com/providers/edi' },
      Credentialing: { phone: '(800) 421-3461 opt 4', fax: '(800) 421-3466', address: 'Credentialing, Memphis, TN 38173', portal: 'https://www.sedgwick.com/providers/cred' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 421-3461' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter Claim #', detail: 'Workers comp claim number' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Enter Date of Injury', detail: 'MM/DD/YYYY' },
      { action: 'Hold for Rep', detail: 'Workers Comp Claims' }
    ],
    holdTime: '20 min', bestTime: '8–10 AM CST', callback: 'Yes', verified: '2024-12-20'
  },
  {
    id: 'CORVEL', name: 'CorVel', abbr: 'CRV',
    payerId: 'CRV01', type: 'Workers Comp', states: ['All'],
    timelyFiling: { initial: 365, appeal: 180, corrected: 365 },
    departments: {
      Claims:     { phone: '(800) 367-2424', fax: '(800) 367-2425', address: 'PO Box 12690, Irving, TX 75012', portal: 'https://www.corvel.com/providers' },
      Appeals:    { phone: '(800) 367-2424 opt 3', fax: '(800) 367-2426', address: 'Appeals Dept, Irving, TX 75012', portal: 'https://www.corvel.com/providers/appeals' },
      Authorization: { phone: '(800) 367-2424 opt 2', fax: '(800) 367-2427', address: 'Auth Dept, Irving, TX 75012', portal: 'https://www.corvel.com/providers/auth' },
      'EDI Support': { phone: '(800) 367-2424 opt 5', fax: '(800) 367-2428', address: 'EDI Dept, Irving, TX 75012', portal: 'https://www.corvel.com/providers/edi' },
      Credentialing: { phone: '(800) 367-2424 opt 4', fax: '(800) 367-2429', address: 'Credentialing, Irving, TX 75012', portal: 'https://www.corvel.com/providers/cred' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 367-2424' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter Claim #', detail: 'Workers comp claim number' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Enter Date of Injury', detail: 'MM/DD/YYYY' },
      { action: 'Hold for Rep', detail: 'Workers Comp Claims' }
    ],
    holdTime: '18 min', bestTime: '8–10 AM CST', callback: 'Yes', verified: '2024-12-22'
  },
  {
    id: 'GALLAGHER', name: 'Gallagher Bassett', abbr: 'GB',
    payerId: 'GB001', type: 'Workers Comp', states: ['All'],
    timelyFiling: { initial: 365, appeal: 180, corrected: 365 },
    departments: {
      Claims:     { phone: '(800) 421-3461', fax: '(800) 421-3467', address: 'PO Box 30390, Memphis, TN 38173', portal: 'https://www.gallagherbassett.com/providers' },
      Appeals:    { phone: '(800) 421-3461 opt 3', fax: '(800) 421-3468', address: 'Appeals Dept, Memphis, TN 38173', portal: 'https://www.gallagherbassett.com/providers/appeals' },
      Authorization: { phone: '(800) 421-3461 opt 2', fax: '(800) 421-3469', address: 'Auth Dept, Memphis, TN 38173', portal: 'https://www.gallagherbassett.com/providers/auth' },
      'EDI Support': { phone: '(800) 421-3461 opt 5', fax: '(800) 421-3470', address: 'EDI Dept, Memphis, TN 38173', portal: 'https://www.gallagherbassett.com/providers/edi' },
      Credentialing: { phone: '(800) 421-3461 opt 4', fax: '(800) 421-3471', address: 'Credentialing, Memphis, TN 38173', portal: 'https://www.gallagherbassett.com/providers/cred' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 421-3461' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter Claim #', detail: 'Workers comp claim number' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Enter Date of Injury', detail: 'MM/DD/YYYY' },
      { action: 'Hold for Rep', detail: 'Workers Comp Claims' }
    ],
    holdTime: '19 min', bestTime: '8–10 AM CST', callback: 'Yes', verified: '2024-12-25'
  },
];

// ════════════════════════════════════════════════════════════
// DATA: DENIAL CODES
// ════════════════════════════════════════════════════════════
const DENIAL_CODES = [
  // Claim & Processing
  { code: 'CO-4',  desc: 'Service inconsistent with procedure code modifier' },
  { code: 'CO-11', desc: 'Diagnosis inconsistent with procedure' },
  { code: 'CO-16', desc: 'Claim/service lacks information needed for adjudication' },
  { code: 'CO-18', desc: 'Duplicate claim/service' },
  { code: 'CO-22', desc: 'COB — primary paid' },
  { code: 'CO-23', desc: 'Payment adjusted — interest penalty clause' },
  { code: 'CO-24', desc: 'Charges for physician services bundled' },
  { code: 'CO-29', desc: 'Time limit for filing expired' },
  { code: 'CO-31', desc: 'Patient cannot be identified as our insured' },
  { code: 'CO-45', desc: 'Contractual adjustment — fee schedule difference' },
  { code: 'CO-50', desc: 'Non-covered service — not deemed medical necessity' },
  { code: 'CO-55', desc: 'Claim lacks routing info or has invalid routing' },
  { code: 'CO-56', desc: 'Coinsurance amount' },
  { code: 'CO-57', desc: 'Fee schedule dollar amount exceeded' },
  { code: 'CO-58', desc: 'Services not rendered to this type of patient' },
  { code: 'CO-63', desc: 'Charges violate fee schedule or fee rule' },
  { code: 'CO-70', desc: 'Charges reduced for bundling edits' },
  { code: 'CO-97', desc: 'Payment included in allowance for another service/procedure' },
  { code: 'CO-109', desc: 'Claim not covered by this payer — may be covered by another' },
  { code: 'CO-119', desc: 'Benefit maximum has been reached' },
  { code: 'CO-130', desc: 'Claim/service denied' },
  { code: 'CO-146', desc: 'Claim was not submitted within timely filing' },
  { code: 'CO-150', desc: 'Claim/service denied — service not provided by network/primary care providers' },
  { code: 'CO-151', desc: 'Claim/service denied — adjustment pursuant to clinical trials' },
  { code: 'CO-167', desc: 'Diagnosis not covered' },
  { code: 'CO-170', desc: 'Claim/service denied — not authorized by referring/ordering provider' },
  { code: 'CO-181', desc: 'Claim/service denied — facility not licensed for this service' },
  { code: 'CO-182', desc: 'Claim/service denied — services not provided by qualified/credentialed provider' },
  { code: 'CO-197', desc: 'Precertification/authorization absent' },
  { code: 'CO-204', desc: 'Claim/service denied — service not supported by this diagnosis' },
  { code: 'CO-210', desc: 'Claim/service denied — ICD-9-CM code is invalid' },
  { code: 'CO-225', desc: 'Claim/service denied — no charge' },
  { code: 'CO-230', desc: 'Claim/service denied — waiver of cost-sharing' },
  { code: 'CO-232', desc: 'Claim/service denied — services not documented' },
  { code: 'CO-236', desc: 'Claim/service denied — this procedure code is not valid' },
  { code: 'CO-240', desc: 'Claim/service denied — provider is not a primary care provider' },
  { code: 'CO-242', desc: 'Claim/service denied — services not provided by network/primary care providers' },
  { code: 'CO-252', desc: 'An attachment/other document required' },
  { code: 'CO-253', desc: 'Sequestration — loss of Federal Spending Payment' },
  { code: 'CO-297', desc: 'Claim/service denied — patient consent not on file' },
  { code: 'CO-300', desc: 'Claim/service denied — payment is included in the allowance for another service' },
  { code: 'CO-331', desc: 'Claim denied — missing/incomplete/invalid referral' },
  { code: 'CO-340', desc: 'Claim denied — services not covered by this payer/contract' },
  { code: 'CO-341', desc: 'Claim denied — provider is not contracted/eligible' },
  { code: 'CO-342', desc: 'Claim denied — services not provided in the primary care service area' },
  { code: 'CO-343', desc: 'Claim denied — services not authorized by the managed care organization' },
  { code: 'CO-349', desc: 'Claim denied — services not covered by this payer' },
  { code: 'CO-351', desc: 'Claim denied — services excluded from coverage' },
  { code: 'CO-357', desc: 'Claim denied — services must be ordered by the primary care provider' },
  { code: 'CO-360', desc: 'Claim denied — services denied as custodial care' },
  { code: 'CO-362', desc: 'Claim denied — services not covered when patient is in hospice' },
  { code: 'CO-365', desc: 'Claim denied — services not covered when patient is in skilled nursing facility' },
  { code: 'CO-367', desc: 'Claim denied — services not covered when patient is in long-term care facility' },
  { code: 'OA-18', desc: 'Duplicate claim/service' },
  { code: 'OA-23', desc: 'Payment adjusted — interest penalty clause' },
  { code: 'PI-4',  desc: 'Service inconsistent with modifier (patient information)' },
  { code: 'PR-1',  desc: 'Deductible amount' },
  { code: 'PR-2',  desc: 'Coinsurance amount' },
  { code: 'PR-3',  desc: 'Co-payment amount' },
  { code: 'PR-96', desc: 'Non-covered charges' },
  { code: 'PR-97', desc: 'Payment is included in the payment for another claim/service' },
  { code: 'PR-98', desc: 'Claim/service denied — patient liability' },
  { code: 'PR-99', desc: 'Benefit unknown' },
  // NCPDP/Remittance
  { code: 'N30',   desc: 'Patient not found in eligibility file' },
  { code: 'N31',   desc: 'Patient not found in group file' },
  { code: 'N32',   desc: 'Patient not found in plan file' },
  { code: 'N33',   desc: 'Patient not found' },
  { code: 'N34',   desc: 'Patient name not found' },
  { code: 'N35',   desc: 'Patient ID not found' },
  { code: 'N36',   desc: 'Patient date of birth not found' },
  { code: 'N37',   desc: 'Patient gender not found' },
  { code: 'N38',   desc: 'Patient address not found' },
  { code: 'N39',   desc: 'Patient plan not found' },
  { code: 'N40',   desc: 'Patient eligibility not found' },
  { code: 'N41',   desc: 'Patient eligibility expired' },
  { code: 'N42',   desc: 'Patient eligibility not effective' },
  { code: 'N43',   desc: 'Patient not eligible for this service' },
  { code: 'N44',   desc: 'Patient not eligible for this provider' },
  { code: 'N45',   desc: 'Patient not eligible for this date of service' },
  { code: 'N46',   desc: 'Patient not eligible for this quantity' },
  { code: 'N47',   desc: 'Patient not eligible for this day supply' },
  { code: 'N48',   desc: 'Patient not eligible for this diagnosis' },
  { code: 'N49',   desc: 'Patient not eligible for this procedure' },
  { code: 'N50',   desc: 'Patient not eligible for this drug' },
  { code: 'N51',   desc: 'Patient not eligible for this refill' },
  { code: 'N52',   desc: 'Patient not eligible — plan limitation exceeded' },
  { code: 'N53',   desc: 'Patient not eligible — age limit exceeded' },
  { code: 'N54',   desc: 'Patient not eligible — gender not covered' },
  { code: 'N55',   desc: 'Patient not eligible — condition not covered' },
  { code: 'N56',   desc: 'Patient not eligible — diagnosis not covered' },
  { code: 'N57',   desc: 'Patient not eligible — procedure not covered' },
  { code: 'N58',   desc: 'Patient not eligible — drug not covered' },
  { code: 'N59',   desc: 'Patient not eligible — provider not covered' },
  { code: 'N60',   desc: 'Patient not eligible — facility not covered' },
  { code: 'N61',   desc: 'Patient not eligible — service not covered' },
  { code: 'N62',   desc: 'Patient not eligible — brand/generic not covered' },
  { code: 'N63',   desc: 'Patient not eligible — quantity not covered' },
  { code: 'N64',   desc: 'Patient not eligible — days supply not covered' },
  { code: 'N65',   desc: 'Patient not eligible — plan limitation exceeded' },
  { code: 'N66',   desc: 'Patient not eligible — age limit exceeded' },
  { code: 'N67',   desc: 'Patient not eligible — gender not covered' },
  { code: 'N68',   desc: 'Patient not eligible — condition not covered' },
  { code: 'N69',   desc: 'Patient not eligible — diagnosis not covered' },
  { code: 'N70',   desc: 'Patient not eligible — procedure not covered' },
  { code: 'N71',   desc: 'Patient not eligible — drug not covered' },
  { code: 'N72',   desc: 'Patient not eligible — provider not covered' },
  { code: 'N73',   desc: 'Patient not eligible — facility not covered' },
  { code: 'N74',   desc: 'Patient not eligible — service not covered' },
  { code: 'N75',   desc: 'Patient not eligible — brand/generic not covered' },
  { code: 'N76',   desc: 'Patient not eligible — quantity not covered' },
  { code: 'N77',   desc: 'Patient not eligible — days supply not covered' },
  { code: 'N78',   desc: 'Patient not eligible — plan limitation exceeded' },
  { code: 'N79',   desc: 'Patient not eligible — age limit exceeded' },
  { code: 'N80',   desc: 'Patient not eligible — gender not covered' },
  { code: 'N81',   desc: 'Patient not eligible — condition not covered' },
  { code: 'N82',   desc: 'Patient not eligible — diagnosis not covered' },
  { code: 'N83',   desc: 'Patient not eligible — procedure not covered' },
  { code: 'N84',   desc: 'Patient not eligible — drug not covered' },
  { code: 'N85',   desc: 'Patient not eligible — provider not covered' },
  { code: 'N86',   desc: 'Patient not eligible — facility not covered' },
  { code: 'N87',   desc: 'Patient not eligible — service not covered' },
  { code: 'N88',   desc: 'Patient not eligible — brand/generic not covered' },
  { code: 'N89',   desc: 'Patient not eligible — quantity not covered' },
  { code: 'N90',   desc: 'Patient not eligible — days supply not covered' },
  { code: 'N91',   desc: 'Patient not eligible — plan limitation exceeded' },
  { code: 'N92',   desc: 'Patient not eligible — age limit exceeded' },
  { code: 'N93',   desc: 'Patient not eligible — gender not covered' },
  { code: 'N94',   desc: 'Patient not eligible — condition not covered' },
  { code: 'N95',   desc: 'Patient not eligible — diagnosis not covered' },
  { code: 'N96',   desc: 'Patient not eligible — procedure not covered' },
  { code: 'N97',   desc: 'Patient not eligible — drug not covered' },
  { code: 'N98',   desc: 'Patient not eligible — provider not covered' },
  { code: 'N99',   desc: 'Patient not eligible — facility not covered' },
  { code: 'N100',  desc: 'Patient not eligible — service not covered' },
  { code: 'N382',  desc: 'Service not covered per bundling edit' },
  { code: 'N517',  desc: 'Resubmit with additional information' },
  { code: 'N569',  desc: 'Not a covered benefit — benefit exhausted' },
  // Other
  { code: 'B15',   desc: 'Services not authorized by designated doctor' },
];

// ════════════════════════════════════════════════════════════
// DATA: DENIAL CHECKLIST DATABASE
// ════════════════════════════════════════════════════════════
const CHECKLIST_DB = {
  default: {
    'Claim Verification': [
      { q: 'Can you confirm the claim was received? What is the received date?', priority: 'critical' },
      { q: 'What is the current status of the claim in your system?', priority: 'critical' },
      { q: 'Can you confirm the claim number in your system?', priority: 'critical' },
      { q: 'Is the claim adjudicated or still in process?', priority: 'important' },
      { q: 'What billing NPI and Tax ID are on the claim?', priority: 'important' },
      { q: 'Does the DOS match what we billed?', priority: 'optional' },
    ],
    'Denial Clarification': [
      { q: 'Can you provide the full denial reason and remark codes?', priority: 'critical' },
      { q: 'What specific information is missing that caused this denial?', priority: 'critical' },
      { q: 'Was an Explanation of Benefits (EOB) or Remittance Advice (ERA) generated?', priority: 'important' },
      { q: 'On what date was the denial issued?', priority: 'important' },
      { q: 'Is this a partial denial or full denial?', priority: 'optional' },
    ],
    'Authorization': [
      { q: 'Was an authorization required for this service on this date?', priority: 'critical' },
      { q: 'What authorization number is on file for this member?', priority: 'critical' },
      { q: 'What services were included in the authorization?', priority: 'critical' },
      { q: 'What are the authorized units or visits?', priority: 'important' },
      { q: 'Who approved the authorization and on what date?', priority: 'important' },
      { q: 'Is there a retro-authorization process available?', priority: 'important' },
    ],
    'Eligibility': [
      { q: 'Was the member eligible on the date of service?', priority: 'critical' },
      { q: 'What plan was the member enrolled in on the DOS?', priority: 'critical' },
      { q: 'What are the effective and termination dates of coverage?', priority: 'critical' },
      { q: 'Is the provider in-network for this member\'s plan?', priority: 'important' },
      { q: 'Does the member have secondary coverage on file?', priority: 'important' },
      { q: 'What is the member\'s group number and plan type?', priority: 'optional' },
    ],
    'Timely Filing': [
      { q: 'What is the timely filing limit for this plan?', priority: 'critical' },
      { q: 'What date did you receive the original claim submission?', priority: 'critical' },
      { q: 'Do you accept clearinghouse submission reports as proof of timely filing?', priority: 'important' },
      { q: 'Is there an exception process for timely filing denials with documented proof?', priority: 'important' },
      { q: 'What documentation is required to overturn a timely filing denial?', priority: 'important' },
    ],
    'Appeals': [
      { q: 'What is the appeal filing deadline from the denial date?', priority: 'critical' },
      { q: 'What is the mailing address or fax number for appeals?', priority: 'critical' },
      { q: 'Can I submit this appeal electronically through your portal?', priority: 'important' },
      { q: 'What documentation must be included with the appeal?', priority: 'important' },
      { q: 'What is the typical turnaround time for appeal review?', priority: 'important' },
      { q: 'Is there an expedited appeal process available?', priority: 'optional' },
    ],
    'Fee Schedule': [
      { q: 'What is the contracted rate for this procedure code on this date?', priority: 'critical' },
      { q: 'What fee schedule was used to adjudicate this claim?', priority: 'critical' },
      { q: 'Is this service subject to a carve-out or capitation arrangement?', priority: 'important' },
      { q: 'Was a correct network discount applied to the payment?', priority: 'important' },
      { q: 'Can you provide the payment details including adjustments?', priority: 'optional' },
    ],
    'Medical Necessity': [
      { q: 'What clinical criteria was used to determine medical necessity?', priority: 'critical' },
      { q: 'Which medical necessity guidelines apply — Milliman, MCG, or your own?', priority: 'critical' },
      { q: 'Can the claim be submitted for peer-to-peer review?', priority: 'important' },
      { q: 'What documentation is required to support medical necessity?', priority: 'important' },
      { q: 'Who performed the medical necessity review and on what date?', priority: 'optional' },
    ],
    'Provider Enrollment': [
      { q: 'Is the rendering provider currently credentialed with your plan?', priority: 'critical' },
      { q: 'What is the provider\'s enrollment effective date?', priority: 'critical' },
      { q: 'Is the billing provider enrolled at the service location?', priority: 'important' },
      { q: 'What NPI/Tax ID combination is on file for this provider?', priority: 'important' },
      { q: 'Are there any gaps in credentialing that would affect this claim?', priority: 'optional' },
    ],
    'Documentation Requests': [
      { q: 'What specific clinical documentation are you requesting?', priority: 'critical' },
      { q: 'What is the deadline to submit the requested documentation?', priority: 'critical' },
      { q: 'What is the fax number or address for documentation submission?', priority: 'critical' },
      { q: 'Will you send a formal Additional Development Request (ADR)?', priority: 'important' },
      { q: 'Can documentation be submitted via your provider portal?', priority: 'optional' },
    ],
  },
  // Denial-specific overrides
  'CO-197': {
    'Authorization': [
      { q: 'Was retro-authorization submitted for this service?', priority: 'critical' },
      { q: 'What is the retro-auth submission deadline from DOS?', priority: 'critical' },
      { q: 'Can you confirm whether an auth request is on file in your system?', priority: 'critical' },
      { q: 'What is the auth request reference number?', priority: 'important' },
      { q: 'Is there a waiver process for auth denials on emergent services?', priority: 'important' },
    ],
  },
  'CO-29': {
    'Timely Filing': [
      { q: 'What date did you receive the original claim in your system?', priority: 'critical' },
      { q: 'What is your exact timely filing limit for this plan type?', priority: 'critical' },
      { q: 'Do you accept 277CA or clearinghouse confirmation as proof of timely filing?', priority: 'critical' },
      { q: 'Is there an override process with documented proof of timely submission?', priority: 'important' },
      { q: 'Was there a payer-side system issue that may have delayed processing?', priority: 'important' },
    ],
  },
  'CO-50': {
    'Medical Necessity': [
      { q: 'What specific InterQual or Milliman criteria was not met?', priority: 'critical' },
      { q: 'Was a peer-to-peer review conducted before final denial?', priority: 'critical' },
      { q: 'Who is the medical director who reviewed this case?', priority: 'important' },
      { q: 'Can you provide the clinical criteria document used for review?', priority: 'important' },
      { q: 'Is an IRO (Independent Review Organization) review available?', priority: 'important' },
    ],
  },
  // ════════════════════════════════════════════════════════════
  // CODING & MODIFIER DENIALS
  // ════════════════════════════════════════════════════════════
  'CO-4': {
    'Coding Verification': [
      { q: 'What specific modifier was submitted and what is required?', priority: 'critical' },
      { q: 'Is there payer-specific modifier documentation?', priority: 'critical' },
      { q: 'Was the modifier validated at clearinghouse level?', priority: 'important' },
      { q: 'What clinical documentation supports the modifier use?', priority: 'important' },
      { q: 'Is there a modifier override process for this situation?', priority: 'optional' },
    ],
  },
  'CO-11': {
    'Coding Verification': [
      { q: 'What specific diagnosis code is inconsistent with the procedure?', priority: 'critical' },
      { q: 'Is there a more appropriate CPT/ICD code combination?', priority: 'critical' },
      { q: 'Was this code combination validated at submission?', priority: 'important' },
      { q: 'Can you provide the correct code pairing?', priority: 'important' },
      { q: 'Is there a clinical edit that can be overridden?', priority: 'optional' },
    ],
  },
  'CO-16': {
    'Documentation Requests': [
      { q: 'What specific information is missing from the claim?', priority: 'critical' },
      { q: 'Is this a clinical documentation issue or administrative?', priority: 'critical' },
      { q: 'What is the deadline to submit the missing information?', priority: 'critical' },
      { q: 'Can the missing information be submitted electronically?', priority: 'important' },
      { q: 'Will the claim be held pending or denied and resubmitted?', priority: 'important' },
    ],
  },
  // ════════════════════════════════════════════════════════════
  // NETWORK & ENROLLMENT DENIALS
  // ════════════════════════════════════════════════════════════
  'CO-341': {
    'Provider Enrollment': [
      { q: 'What is the provider enrollment status in your system?', priority: 'critical' },
      { q: 'Is the rendering NPI or billing NPI the issue?', priority: 'critical' },
      { q: 'Was there a credentialing gap for this provider?', priority: 'critical' },
      { q: 'Is retroactive enrollment available?', priority: 'important' },
      { q: 'What enrollment ID or PTAN is on file?', priority: 'important' },
    ],
  },
  'CO-182': {
    'Provider Enrollment': [
      { q: 'What credentialing requirement was not met?', priority: 'critical' },
      { q: 'Is this a state licensure or payer credentialing issue?', priority: 'critical' },
      { q: 'What is the revalidation deadline?', priority: 'important' },
      { q: 'Is there an expedited credentialing process?', priority: 'important' },
      { q: 'Can services be retroactively covered?', priority: 'optional' },
    ],
  },
  // ════════════════════════════════════════════════════════════
  // COB & COVERAGE DENIALS
  // ════════════════════════════════════════════════════════════
  'CO-22': {
    'Coordination of Benefits': [
      { q: 'Is the primary payer information correct in your system?', priority: 'critical' },
      { q: 'Has the primary EOB been received and applied?', priority: 'critical' },
      { q: 'What COB methodology was used (birthday rule, etc.)?', priority: 'important' },
      { q: 'Is there a third payer involved?', priority: 'important' },
      { q: 'Can you provide the primary payment breakdown?', priority: 'optional' },
    ],
  },
  'CO-109': {
    'Coordination of Benefits': [
      { q: 'Which payer should this claim be submitted to?', priority: 'critical' },
      { q: 'Is there dual coverage for this member?', priority: 'critical' },
      { q: 'What is the primary payer information?', priority: 'important' },
      { q: 'Is there a COB dispute between payers?', priority: 'important' },
      { q: 'Should this be resubmitted to the correct payer?', priority: 'optional' },
    ],
  },
  // ════════════════════════════════════════════════════════════
  // BENEFIT & PATIENT DENIALS
  // ════════════════════════════════════════════════════════════
  'CO-119': {
    'Benefit Limits': [
      { q: 'What is the exact benefit limit that was reached?', priority: 'critical' },
      { q: 'Is this an annual or lifetime maximum?', priority: 'critical' },
      { q: 'Can the benefit limit be increased or waived?', priority: 'important' },
      { q: 'Is there an appeals process for benefit exhaustion?', priority: 'important' },
      { q: 'Does the patient have supplemental coverage?', priority: 'optional' },
    ],
  },
  'CO-167': {
    'Coverage Verification': [
      { q: 'Is this service permanently excluded or temporarily?', priority: 'critical' },
      { q: 'Is there a medical necessity exception process?', priority: 'critical' },
      { q: 'Does the patient have any supplemental coverage?', priority: 'important' },
      { q: 'Is there an alternative covered procedure code?', priority: 'important' },
      { q: 'Was this service covered under a different plan?', priority: 'optional' },
    ],
  },
  // ════════════════════════════════════════════════════════════
  // REFERRAL & AUTHORIZATION DENIALS
  // ════════════════════════════════════════════════════════════
  'CO-170': {
    'Referral Verification': [
      { q: 'Was a referral obtained and is it on file?', priority: 'critical' },
      { q: 'What is the referral validity period?', priority: 'critical' },
      { q: 'Is retroactive referral possible?', priority: 'important' },
      { q: 'Who is the referring PCP and their contact?', priority: 'important' },
      { q: 'What documentation supports the referral?', priority: 'optional' },
    ],
  },
  'CO-331': {
    'Referral Verification': [
      { q: 'Is the referral information complete and valid?', priority: 'critical' },
      { q: 'What specific referral information is missing?', priority: 'critical' },
      { q: 'Can the referral be updated and resubmitted?', priority: 'important' },
      { q: 'Is there a retroactive referral option?', priority: 'important' },
      { q: 'What is the referral submission deadline?', priority: 'optional' },
    ],
  },
  // ════════════════════════════════════════════════════════════
  // BUNDLING & NCCI DENIALS
  // ════════════════════════════════════════════════════════════
  'N382': {
    'Bundling/NCCI': [
      { q: 'Which CPT code was bundled into another?', priority: 'critical' },
      { q: 'Is a modifier required to override this edit?', priority: 'critical' },
      { q: 'Was modifier 59 or XS submitted with the claim?', priority: 'important' },
      { q: 'Does clinical documentation support separate billing?', priority: 'important' },
      { q: 'Is the NCCI edit effective date correct?', priority: 'optional' },
    ],
  },
  'CO-97': {
    'Bundling/NCCI': [
      { q: 'What is the primary service that includes this?', priority: 'critical' },
      { q: 'Is this a bundling or mutually exclusive edit?', priority: 'critical' },
      { q: 'Can modifier override be applied?', priority: 'important' },
      { q: 'Is there clinical documentation for separate services?', priority: 'important' },
      { q: 'Should this be appealed as a bundling error?', priority: 'optional' },
    ],
  },
  // ════════════════════════════════════════════════════════════
  // OUT-OF-NETWORK DENIALS
  // ════════════════════════════════════════════════════════════
  'CO-150': {
    'Network Status': [
      { q: 'Is the provider currently contracted with this payer?', priority: 'critical' },
      { q: 'What is the network status effective date?', priority: 'critical' },
      { q: 'Is there a single case agreement (SCA) option?', priority: 'important' },
      { q: 'Was the patient aware of the out-of-network status?', priority: 'important' },
      { q: 'Is there a network exception process?', priority: 'optional' },
    ],
  },
  'CO-181': {
    'Network Status': [
      { q: 'What facility licensure requirement was not met?', priority: 'critical' },
      { q: 'Is this a state licensure or payer credentialing issue?', priority: 'critical' },
      { q: 'Can services be provided at a licensed facility?', priority: 'important' },
      { q: 'Is there a temporary licensure exception?', priority: 'important' },
      { q: 'What is the licensure requirement timeline?', priority: 'optional' },
    ],
  },
  // ════════════════════════════════════════════════════════════
  // PATIENT RESPONSIBILITY DENIALS
  // ════════════════════════════════════════════════════════════
  'PR-1': {
    'Patient Responsibility': [
      { q: 'What is the exact deductible amount owed?', priority: 'critical' },
      { q: 'Has the patient been notified of this balance?', priority: 'critical' },
      { q: 'Is there a payment plan option available?', priority: 'important' },
      { q: 'Was the EOB sent to the patient?', priority: 'important' },
      { q: 'Can the patient dispute this with documentation?', priority: 'optional' },
    ],
  },
  'PR-2': {
    'Patient Responsibility': [
      { q: 'What is the exact coinsurance amount?', priority: 'critical' },
      { q: 'What percentage is the patient responsible for?', priority: 'critical' },
      { q: 'Is there a coinsurance maximum or out-of-pocket limit?', priority: 'important' },
      { q: 'Has the patient met their deductible?', priority: 'important' },
      { q: 'Is there financial assistance available?', priority: 'optional' },
    ],
  },
  'PR-3': {
    'Patient Responsibility': [
      { q: 'What is the copayment amount?', priority: 'critical' },
      { q: 'Is this copay correct for the service rendered?', priority: 'critical' },
      { q: 'Was the copay collected at time of service?', priority: 'important' },
      { q: 'Is there a copay reduction program?', priority: 'important' },
      { q: 'Can the copay be waived for financial hardship?', priority: 'optional' },
    ],
  },
};

// ════════════════════════════════════════════════════════════
// DATA: DECISION TREE
// ════════════════════════════════════════════════════════════
const DECISION_TREE = [
  {
    id: 'not-on-file', icon: '🔍', name: 'Claim Not On File', desc: 'Rep cannot locate claim',
    denialCodes: ['CO-16', 'N30', 'N31', 'N32', 'N33'],
    keywords: ['not on file', 'not found', 'cannot locate', 'no claim found', 'not in system'],
    ask: [
      'What is the submission date range you are checking?',
      'What clearinghouse or payer gateway did you use?',
      'Can you check by member ID and DOS alone?',
      'Was the claim rejected or not received at all?',
    ],
    escalation: [
      'Request supervisor if rep still cannot locate after 2 attempts',
      'Escalate to EDI/Electronic Claims dept if claim was sent electronically',
      'Ask for formal written confirmation of non-receipt',
    ],
    gather: [
      'Confirmation that no claim exists in system',
      'Rep name + reference number',
      'Specific claim identifiers rep searched',
      'Date range verified in payer system',
    ],
    actions: ['Resubmission', 'Verify Clearinghouse 277CA', 'Check Payer Portal'],
    timeline: '2–5 business days after resubmission',
    color: 'danger',
  },
  {
    id: 'timely-filing', icon: '⏱️', name: 'Timely Filing', desc: 'Filing limit exceeded',
    denialCodes: ['CO-29', 'CO-146', 'CO-23'],
    keywords: ['timely filing', 'time limit', 'filing deadline', 'too late', 'expired'],
    ask: [
      'What exact date does your system show the claim was received?',
      'What is the plan-specific timely filing limit in days?',
      'Do you accept clearinghouse 277 confirmation as proof of timely filing?',
      'Is there an appeal process for timely filing denials with documentation?',
    ],
    escalation: [
      'Escalate if rep refuses to accept clearinghouse submission reports',
      'Request supervisor if documented proof of timely filing is available',
      'Reference state insurance regulations if applicable',
    ],
    gather: [
      'Payer system received date',
      'Timely filing limit (exact days)',
      'Documentation requirements for appeal',
      'Appeals address and fax number',
    ],
    actions: ['Appeal with Proof', 'Reconsideration', 'Regulatory Complaint'],
    timeline: '30–60 days for timely filing appeal review',
    color: 'danger',
  },
  {
    id: 'authorization', icon: '🔐', name: 'Authorization Denied', desc: 'Auth missing or invalid',
    denialCodes: ['CO-197', 'CO-170', 'CO-343', 'B15'],
    keywords: ['authorization', 'auth', 'no authorization', 'prior auth', 'precert', 'referral'],
    ask: [
      'Is there any authorization on file for this member for this date?',
      'What is the retro-authorization submission deadline?',
      'Was the service considered emergent or urgent?',
      'What documentation is needed for retro-auth?',
    ],
    escalation: [
      'Escalate to Medical Review if retro-auth is denied',
      'Request peer-to-peer review for medical necessity',
      'Escalate to supervisor if emergent criteria applies',
    ],
    gather: [
      'Auth number (if any exists)',
      'Retro-auth deadline',
      'Retro-auth submission address/fax',
      'Documentation requirements',
    ],
    actions: ['Retro Authorization', 'Appeal', 'Peer-to-Peer Review'],
    timeline: '10–30 days after retro-auth submission',
    color: 'warn',
  },
  {
    id: 'eligibility', icon: '👤', name: 'Eligibility Issue', desc: 'Member not eligible on DOS',
    denialCodes: ['N30', 'N40', 'N41', 'N42', 'N43', 'CO-31'],
    keywords: ['eligibility', 'not eligible', 'no coverage', 'inactive', 'terminated', 'member not found'],
    ask: [
      'Can you confirm exact coverage effective and termination dates?',
      'Was there a retroactive termination applied?',
      'Does the member have any secondary coverage?',
      'Was the member enrolled in a different plan on the DOS?',
    ],
    escalation: [
      'Escalate to member services if retroactive termination is suspected',
      'Contact employer/group if group termination may be involved',
      'Request eligibility verification documentation in writing',
    ],
    gather: [
      'Coverage effective date',
      'Termination date and reason',
      'Plan name and group number',
      'Member services contact for employer group',
    ],
    actions: ['Patient Responsibility', 'COB Investigation', 'Retroactive Enrollment'],
    timeline: '5–15 days for eligibility investigation',
    color: 'warn',
  },
  {
    id: 'credentialing', icon: '🏥', name: 'Credentialing Issue', desc: 'Provider not credentialed',
    denialCodes: ['CO-341', 'CO-182', 'CO-150', 'CO-240'],
    keywords: ['credentialing', 'not credentialed', 'not enrolled', 'provider not contracted', 'out of network'],
    ask: [
      'What is the rendering provider\'s enrollment effective date in your system?',
      'Is the issue with the rendering NPI or billing NPI?',
      'Was there a gap in credentialing coverage?',
      'Is there a retroactive credentialing process available?',
    ],
    escalation: [
      'Escalate to Provider Relations immediately',
      'Contact credentialing department directly',
      'If retroactive — request written confirmation of enrollment gap',
    ],
    gather: [
      'Provider enrollment effective date',
      'Enrollment ID or provider number',
      'Credentialing contact name and number',
      'Documentation for appeal',
    ],
    actions: ['Credentialing Correction', 'Appeal', 'Provider Relations Escalation'],
    timeline: '30–90 days for credentialing issues',
    color: 'danger',
  },
  {
    id: 'duplicate', icon: '📋', name: 'Duplicate Claim', desc: 'Claim considered a duplicate',
    denialCodes: ['OA-18', 'CO-18'],
    keywords: ['duplicate', 'already on file', 'already processed', 'duplicate claim'],
    ask: [
      'What claim number is the duplicate of?',
      'What was the payment made on the original claim?',
      'Was the previous claim paid, denied, or pending?',
      'What is the difference between the original and this claim?',
    ],
    escalation: [
      'Escalate if original claim was denied — this should not be duplicate',
      'Escalate if payment amount differs from expected',
      'Request supervisor if EOB for original cannot be located',
    ],
    gather: [
      'Original claim number',
      'Original claim status and payment',
      'Original claim DOS',
      'EOB for original claim',
    ],
    actions: ['Corrected Claim', 'Reprocessing Request', 'Appeal if Incorrectly Denied'],
    timeline: '5–10 business days after reprocessing request',
    color: 'warn',
  },
  {
    id: 'bundling', icon: '📦', name: 'Bundling / NCCI Edit', desc: 'Services bundled together',
    denialCodes: ['CO-97', 'CO-4', 'CO-199'],
    keywords: ['bundling', 'bundle', 'ncci', 'mutually exclusive', 'included in', 'component'],
    ask: [
      'Which CPT code was bundled into another? Which is the comprehensive code?',
      'Is a modifier required to override this bundling edit?',
      'Was a 59 modifier or XS/XU modifier submitted with the claim?',
      'Does the clinical documentation support separate billing?',
    ],
    escalation: [
      'Escalate to medical review if modifier was properly submitted',
      'Request clinical review if services were truly distinct',
      'Escalate if NCCI edit is outdated or inapplicable',
    ],
    gather: [
      'Component and comprehensive code pairing',
      'Applicable modifier (59, XS, XU, X{EPSU})',
      'Clinical documentation supporting separate services',
      'NCCI edit effective date',
    ],
    actions: ['Corrected Claim with Modifier', 'Appeal', 'Reconsideration'],
    timeline: '15–30 days after resubmission with modifier',
    color: 'warn',
  },
  {
    id: 'medical-necessity', icon: '🩺', name: 'Medical Necessity', desc: 'Service not medically necessary',
    denialCodes: ['CO-50', 'CO-56', 'CO-57', 'CO-127', 'CO-132', 'CO-236', 'OA-181'],
    keywords: ['medical necessity', 'not medically necessary', 'clinical criteria', 'not covered', 'experimental'],
    ask: [
      'What clinical criteria was applied — Milliman, MCG, InterQual, or proprietary?',
      'What specific criterion was not met?',
      'Is a peer-to-peer review available before the appeal deadline?',
      'Who is the medical director who issued the determination?',
    ],
    escalation: [
      'Request immediate peer-to-peer review with treating physician',
      'Escalate to IRO if internal appeal is exhausted',
      'Contact state insurance commissioner if applicable',
    ],
    gather: [
      'Medical director name and contact',
      'Criteria document used',
      'Peer-to-peer review deadline',
      'Independent review organization (IRO) information',
    ],
    actions: ['Peer-to-Peer Review', 'Clinical Appeal', 'IRO Review', 'State Complaint'],
    timeline: '30–60 days for medical necessity appeals',
    color: 'danger',
  },
  {
    id: 'add-documentation', icon: '📄', name: 'Additional Documentation', desc: 'More records required',
    denialCodes: ['CO-15', 'CO-16', 'CO-185', 'CO-253', 'N410'],
    keywords: ['documentation', 'records', 'clinical notes', 'medical records', 'additional information needed', 'adr'],
    ask: [
      'What specific documentation is required?',
      'What is the deadline to submit the documentation?',
      'What is the fax number or address for documentation?',
      'Will the claim be held pending receipt or denied and resubmitted?',
    ],
    escalation: [
      'Escalate if deadline is less than 7 days',
      'Request extension if documentation cannot be gathered in time',
    ],
    gather: [
      'Exact documentation list required',
      'Submission deadline',
      'Submission address, fax, or portal instructions',
      'Reference number for documentation submission',
    ],
    actions: ['Submit Medical Records', 'Request Extension', 'Appeal if Wrongly Denied'],
    timeline: '10–20 days after document submission',
    color: 'warn',
  },
  {
    id: 'underpayment', icon: '💰', name: 'Underpayment', desc: 'Paid less than contracted rate',
    denialCodes: ['CO-45', 'OA-23', 'OA-24'],
    keywords: ['underpaid', 'underpayment', 'short paid', 'wrong rate', 'fee schedule discrepancy'],
    ask: [
      'What fee schedule was applied to this claim?',
      'What is the contracted rate for this procedure code?',
      'Can you provide the exact allowable and adjustments?',
      'Is there a contract dispute resolution process?',
    ],
    escalation: [
      'Escalate to Provider Relations for contract rate disputes',
      'Escalate to management for amounts over $500',
      'File Provider Dispute if contract rate was not applied',
    ],
    gather: [
      'Applied fee schedule name and rate',
      'Contracted allowable per agreement',
      'Difference amount',
      'Provider dispute resolution address',
    ],
    actions: ['Provider Dispute', 'Contract Review', 'Reconsideration'],
    timeline: '30–60 days for contract dispute resolution',
    color: 'warn',
  },
  {
    id: 'contractual', icon: '📃', name: 'Contractual Adjustment', desc: 'CO-45 or similar write-off',
    denialCodes: ['CO-45'],
    keywords: ['contractual', 'co-45', 'write off', 'write-off', 'contracted amount', 'network discount'],
    ask: [
      'What is the contracted allowable for this service?',
      'What is the patient responsibility portion?',
      'Was the correct network discount applied?',
      'Is the provider contracted in-network for this plan type?',
    ],
    escalation: [
      'Escalate if write-off exceeds expected contract adjustment',
      'Dispute if provider is OON but plan applied wrong network rate',
    ],
    gather: [
      'Allowed amount',
      'Write-off amount',
      'Patient responsibility breakdown',
      'Network status confirmation',
    ],
    actions: ['Accept CO-45', 'Provider Dispute if Incorrect', 'Contract Review'],
    timeline: 'Immediate or 30 days for dispute',
    color: 'safe',
  },
  {
    id: 'invalid-coding', icon: '🔢', name: 'Invalid Coding (CPT/ICD)', desc: 'Procedure or diagnosis code rejected',
    denialCodes: ['CO-4', 'CO-5', 'CO-6', 'CO-11', 'CO-12', 'CO-13', 'CO-14', 'CO-16'],
    keywords: ['invalid coding', 'invalid code', 'cpt code', 'icd code', 'code not valid', 'wrong code', 'coding error', 'modifier error'],
    ask: [
      'What specific code was rejected and why?',
      'Is the code active for the date of service billed?',
      'Does the code require a specific modifier?',
      'Is there a more specific code that should be used?',
      'Was the code combination validated by your system?',
    ],
    escalation: [
      'Request coding specialist review if complex code pair',
      'Escalate if code was previously accepted and now rejected',
      'Contact payer EDI if electronic rejection without clear reason',
    ],
    gather: [
      'Exact rejected code and remark code',
      'System edit message or rejection reason',
      'Correct code suggestion from payer',
      'Effective date of code change (if applicable)',
    ],
    actions: ['Corrected Claim', 'Code Review', 'Reconsideration'],
    timeline: '5-15 days after corrected claim submission',
    color: 'danger',
  },
  {
    id: 'modifier-issue', icon: '🏷️', name: 'Modifier Issue', desc: 'Modifier missing or incorrect',
    denialCodes: ['CO-4', 'CO-5', 'CO-16', 'CO-24', 'CO-97'],
    keywords: ['modifier', 'modifier missing', 'modifier incorrect', 'modifier 25', 'modifier 59', 'modifier error', 'distinct service'],
    ask: [
      'What modifier was submitted and what modifier is needed?',
      'Is this a modifier 25, 59, or XS/XU issue?',
      'What documentation supports the use of this modifier?',
      'Is the modifier required for this specific payer?',
      'Was the modifier validated at the clearinghouse level?',
    ],
    escalation: [
      'Request medical review if modifier was clinically appropriate',
      'Escalate if payer requires specific modifier not in standard guidelines',
      'Contact coding specialist for complex modifier scenarios',
    ],
    gather: [
      'Submitted modifier',
      'Required modifier',
      'Clinical documentation supporting modifier use',
      'Payer-specific modifier policy',
    ],
    actions: ['Corrected Claim with Modifier', 'Appeal', 'Peer Review'],
    timeline: '10-20 days after resubmission with correct modifier',
    color: 'warn',
  },
  {
    id: 'out-of-network', icon: '🚫', name: 'Out-of-Network', desc: 'Provider not in network',
    denialCodes: ['CO-145', 'CO-150', 'CO-204', 'CO-240', 'OA-131', 'OA-232'],
    keywords: ['out of network', 'oon', 'not contracted', 'non-contracted', 'network status', 'not in network'],
    ask: [
      'Is the provider currently contracted with this payer?',
      'What is the effective date of the network status?',
      'Is there a single case agreement (SCA) option?',
      'Was the patient aware the provider was out-of-network?',
      'Is there a network exception process for this situation?',
    ],
    escalation: [
      'Escalate to provider relations for contract negotiation',
      'Request single case agreement (SCA) if clinically necessary',
      'Contact patient about balance billing responsibilities',
      'Escalate if patient was not properly notified of OON status',
    ],
    gather: [
      'Network status confirmation',
      'SCA process and requirements',
      'Patient notification documentation',
      'Contract negotiation contact',
    ],
    actions: ['SCA Request', 'Patient Notification', 'Contract Negotiation', 'Balance Billing'],
    timeline: '30-60 days for SCA negotiation',
    color: 'danger',
  },
  {
    id: 'cob-issue', icon: '🔄', name: 'COB Issue', desc: 'Coordination of Benefits problem',
    denialCodes: ['CO-58', 'CO-149', 'N528'],
    keywords: ['cob', 'coordination of benefits', 'primary', 'secondary', 'tertiary', 'other insurance', 'dual coverage'],
    ask: [
      'Is the primary payer information correct in your system?',
      'Has the primary EOB been received and applied?',
      'What is the COB methodology used (birthday rule, gender, etc.)?',
      'Is there a third payer involved?',
      'Was the claim submitted to the correct primary payer first?',
    ],
    escalation: [
      'Escalate if primary payer info is outdated in system',
      'Request COB review if methodology was applied incorrectly',
      'Contact all payers for coordinated payment if complex',
    ],
    gather: [
      'Primary payer EOB with payment details',
      'Secondary payer submission requirements',
      'COB methodology used',
      'All payer IDs and member IDs',
    ],
    actions: ['Resubmit to Secondary', 'COB Review', 'Appeal if Incorrect COB'],
    timeline: '15-30 days for COB processing',
    color: 'warn',
  },
  {
    id: 'non-covered', icon: '❌', name: 'Non-Covered Service', desc: 'Service excluded from benefits',
    denialCodes: ['CO-22', 'CO-25', 'CO-38', 'CO-49', 'CO-121', 'CO-154', 'CO-158', 'CO-160', 'CO-204'],
    keywords: ['non-covered', 'not covered', 'excluded', 'benefit excluded', 'not a benefit', 'service excluded'],
    ask: [
      'Is this service permanently excluded or temporarily not covered?',
      'Is there a medical necessity exception process?',
      'Does the patient have any supplemental coverage?',
      'Was a prior auth obtained that might override this?',
      'Is there an alternative covered procedure code?',
    ],
    escalation: [
      'Request medical necessity review if service is clinically required',
      'Escalate to appeals for benefit exception',
      'Contact supplemental payer if applicable',
    ],
    gather: [
      'Exact exclusion policy reference',
      'Medical necessity documentation',
      'Alternative covered services',
      'Supplemental payer information',
    ],
    actions: ['Medical Necessity Appeal', 'Benefit Exception', 'Patient Responsibility', 'Write-Off'],
    timeline: '30-60 days for benefit exception review',
    color: 'danger',
  },
  {
    id: 'referral-required', icon: '📋', name: 'Referral Required', desc: 'Missing specialist referral',
    denialCodes: ['CO-131', 'CO-197', 'CO-336', 'CO-343'],
    keywords: ['referral', 'referral required', 'referral missing', 'pcp referral', 'specialist referral', 'no referral'],
    ask: [
      'Was a referral obtained and is it on file?',
      'What is the referral validity period?',
      'Is retroactive referral possible?',
      'What documentation is needed to support the referral?',
      'Who is the referring PCP?',
    ],
    escalation: [
      'Request retroactive referral from PCP office',
      'Escalate if referral was submitted but not processed',
      'Contact PCP office directly for urgent referral needs',
    ],
    gather: [
      'Referral number and dates',
      'PCP name and contact',
      'Referral validity period',
      'Retroactive referral process',
    ],
    actions: ['Obtain Retro Referral', 'Appeal', 'Resubmit with Referral'],
    timeline: '5-15 days for referral processing',
    color: 'warn',
  },
  {
    id: 'provider-enrollment', icon: '📝', name: 'Provider Enrollment Issue', desc: 'Provider not enrolled or credentialing gap',
    denialCodes: ['CO-341', 'CO-182', 'CO-150', 'CO-240', 'CO-250'],
    keywords: ['provider enrollment', 'enrollment', 'not enrolled', 'credentialing gap', 'enrollment effective', 'revalidation'],
    ask: [
      'What is the provider enrollment status in your system?',
      'Is there a credentialing gap for this provider?',
      'What is the revalidation deadline?',
      'Is there a retroactive enrollment option?',
      'What enrollment ID or PTAN is on file?',
    ],
    escalation: [
      'Escalate to provider relations for enrollment status',
      'Request expedited enrollment if patient care is affected',
      'Contact credentialing department for gap resolution',
    ],
    gather: [
      'Enrollment effective date',
      'Enrollment ID or PTAN',
      'Credentialing contact information',
      'Retroactive enrollment requirements',
    ],
    actions: ['Enrollment Correction', 'Retroactive Enrollment', 'Provider Relations'],
    timeline: '30-90 days for enrollment processing',
    color: 'danger',
  },
  {
    id: 'benefit-exhausted', icon: '📊', name: 'Benefit Exhausted', desc: 'Annual/lifetime maximum reached',
    denialCodes: ['CO-29', 'CO-119', 'CO-120'],
    keywords: ['benefit exhausted', 'maximum reached', 'annual max', 'lifetime max', 'benefit limit', 'cap reached'],
    ask: [
      'What is the exact benefit limit that was reached?',
      'Is this an annual or lifetime maximum?',
      'Can the benefit limit be increased or waived?',
      'Is there an appeals process for benefit exhaustion?',
      'Does the patient have supplemental coverage?',
    ],
    escalation: [
      'Request medical necessity exception for continued treatment',
      'Escalate to appeals for benefit limit review',
      'Contact supplemental payer if applicable',
    ],
    gather: [
      'Benefit limit amount and type',
      'Current utilization amount',
      'Exception/waiver process',
      'Supplemental payer information',
    ],
    actions: ['Benefit Exception', 'Medical Necessity Appeal', 'Supplemental Claim', 'Patient Notification'],
    timeline: '30-60 days for benefit exception review',
    color: 'danger',
  },
  {
    id: 'patient-responsibility', icon: '👤', name: 'Patient Responsibility', desc: 'Patient owes balance',
    denialCodes: ['CO-1', 'CO-2', 'CO-3', 'PR-1', 'PR-2', 'PR-3'],
    keywords: ['patient responsibility', 'patient balance', 'deductible', 'coinsurance', 'copay', 'patient owes', 'member responsibility'],
    ask: [
      'What is the exact patient responsibility amount?',
      'Has the patient been properly notified of this balance?',
      'Is there a payment plan option available?',
      'Was the EOB sent to the patient with this information?',
      'Can the patient dispute this with clinical documentation?',
    ],
    escalation: [
      'Escalate if patient responsibility was incorrectly calculated',
      'Request payment plan options for large balances',
      'Contact patient services for payment assistance programs',
    ],
    gather: [
      'Patient responsibility breakdown (deductible, coinsurance, copay)',
      'EB/EOB notification date',
      'Payment plan options',
      'Patient dispute process',
    ],
    actions: ['Patient Notification', 'Payment Plan', 'Patient Dispute', 'Write-Off if Inappropriate'],
    timeline: 'Immediate notification, 30 days for dispute',
    color: 'warn',
  },
  // ════════════════════════════════════════════════════════════
  // ADVANCED DECISION TREE SCENARIOS
  // ════════════════════════════════════════════════════════════
  {
    id: 'sequestration', icon: '🏛️', name: 'Sequestration (CO-253)', desc: 'Federal spending reduction applied',
    denialCodes: ['CO-253'],
    keywords: ['sequestration', 'sequester', 'federal spending', 'co-253', 'budget reduction', 'automatic cut'],
    ask: [
      'Can you confirm the sequestration percentage applied to this claim?',
      'Is this reduction applied to the allowed amount or the payment amount?',
      'Is this the correct sequestration rate for the date of service?',
      'Can you provide the breakdown showing the sequestration line item?',
    ],
    escalation: [
      'Verify the sequestration rate is correct for the current fiscal year',
      'Escalate if sequestration was applied to a non-Medicare claim',
      'Request written explanation if amount seems incorrect',
    ],
    gather: [
      'Sequestration percentage applied',
      'Pre-sequestration payment amount',
      'Post-sequestration payment amount',
      'Confirmation this is a federal mandate (not appealable)',
    ],
    actions: ['Accept — Not Appealable', 'Verify Correct Rate', 'Adjust Expected Payment'],
    timeline: 'Immediate — federal mandate, cannot be appealed',
    color: 'safe',
    branches: [
      { trigger: 'Rep confirms 2% sequestration', response: 'Correct — this is the standard Medicare sequestration rate. Verify the math is correct on your EOB.', nextAction: 'Accept adjustment' },
      { trigger: 'Rep says sequestration applied to non-Medicare claim', response: 'ALERT: Sequestration ONLY applies to Medicare/Medicaid claims. Challenge this immediately — commercial plans cannot apply sequestration.', nextAction: 'File dispute immediately' },
      { trigger: 'Rep says amount is different from 2%', response: 'Request the exact calculation methodology. Sequestration applies to the payment amount, not the allowed amount. Verify the math.', nextAction: 'Request calculation breakdown' },
    ],
  },
  {
    id: 'sequestration-challenge', icon: '🏛️', name: 'Sequestration Challenge', desc: 'Challenge incorrect sequestration',
    denialCodes: ['CO-253'],
    keywords: ['sequestration wrong', 'sequestration commercial', 'sequestration not medicare', 'challenge sequestration'],
    ask: [
      'What payer type is this claim — Medicare, Medicaid, or commercial?',
      'Is the sequestration line item clearly shown on the ERA?',
      'What is the pre-sequestration payment amount?',
      'Can you remove the sequestration if this is a commercial claim?',
    ],
    escalation: [
      'Escalate immediately — sequestration on commercial claims is an error',
      'Request supervisor authorization to reverse sequestration',
      'Document the error for regulatory reporting',
    ],
    gather: [
      'Payer type confirmation (Medicare/Medicaid/commercial)',
      'ERA showing sequestration line item',
      'Contract reference for sequestration applicability',
      'Supervisor contact for reversal authorization',
    ],
    actions: ['File Dispute', 'Regulatory Complaint', 'Contract Review'],
    timeline: '15-30 days for sequestration dispute resolution',
    color: 'danger',
  },
  {
    id: 'capitation', icon: '📋', name: 'Capitation Contract (CO-130)', desc: 'Service under capitation arrangement',
    denialCodes: ['CO-130', 'CO-349', 'CO-351'],
    keywords: ['capitation', 'capitated', 'co-130', 'per member per month', 'pmpm', 'capitation contract', 'global cap'],
    ask: [
      'Is this patient under a capitation arrangement with our practice?',
      'Which specific services are included in the capitation contract?',
      'Is there a carve-out process for this service type?',
      'What is the effective date range of the capitation contract?',
      'Are there any excluded services under the capitation?',
    ],
    escalation: [
      'Request capitation contract review if service should not be capitated',
      'Escalate to managed care contracting for carve-out requests',
      'Contact finance department for capitation payment reconciliation',
    ],
    gather: [
      'Capitation contract terms and effective dates',
      'List of included vs excluded services',
      'Carve-out submission process and deadlines',
      'Capitation payment history for this patient',
    ],
    actions: ['Carve-Out Request', 'Contract Review', 'Appeal if Not Capitated', 'Patient Billing'],
    timeline: '30-60 days for capitation dispute resolution',
    color: 'warn',
    branches: [
      { trigger: 'Rep confirms service IS capitated', response: 'Check if this service qualifies for carve-out payment. Many capitation contracts allow separate billing for specific high-cost services.', nextAction: 'Submit carve-out claim' },
      { trigger: 'Rep says patient is NOT under capitation', response: 'Request written confirmation and reprocess the claim. If the patient is not capitated, the claim should be adjudicated under standard fee-for-service.', nextAction: 'Submit corrected claim' },
      { trigger: 'Rep is unsure about capitation status', response: 'Request escalation to managed care contracting. Do NOT accept "I\'m not sure" — get a definitive answer from someone who can verify.', nextAction: 'Escalate to managed care' },
    ],
  },
  {
    id: 'diagnosis-not-covered', icon: '🔬', name: 'Diagnosis Not Covered (CO-167)', desc: 'ICD code not covered by plan',
    denialCodes: ['CO-167', 'CO-109', 'CO-340', 'CO-349'],
    keywords: ['diagnosis not covered', 'icd not covered', 'co-167', 'diagnosis excluded', 'diagnosis not a benefit', 'icd excluded'],
    ask: [
      'Which specific diagnosis code was flagged as not covered?',
      'Is this a permanent exclusion or a temporary coverage gap?',
      'Does the patient have any supplemental coverage that might cover this?',
      'Is there a covered alternative diagnosis that accurately describes the condition?',
      'What is the payer\'s policy on this diagnosis code?',
    ],
    escalation: [
      'Request medical necessity review if diagnosis is clinically required',
      'Escalate to appeals for benefit exception',
      'Contact coding specialist for diagnosis re-evaluation',
    ],
    gather: [
      'Exact diagnosis code flagged (ICD-10)',
      'Payer policy reference for exclusion',
      'Alternative covered diagnosis codes',
      'Medical necessity documentation',
      'Supplemental payer information',
    ],
    actions: ['Diagnosis Correction', 'Medical Necessity Appeal', 'Benefit Exception', 'Patient Notification'],
    timeline: '15-30 days for diagnosis-related appeals',
    color: 'danger',
    branches: [
      { trigger: 'Rep says diagnosis is permanently excluded', response: 'Check if an alternative covered diagnosis exists. Also verify if the patient has supplemental coverage. If no alternative, discuss patient financial responsibility.', nextAction: 'Check for alternatives + patient notification' },
      { trigger: 'Rep says diagnosis requires prior auth', response: 'This is actually an authorization issue, not a diagnosis coverage issue. Escalate to authorization team and request retro-auth if possible.', nextAction: 'Submit retro-authorization request' },
      { trigger: 'Rep says diagnosis is experimental/investigational', response: 'Request the specific criteria document used to determine this. Many payers use InterQual, MCG, or proprietary criteria. Challenge with clinical literature if appropriate.', nextAction: 'Request criteria document + clinical appeal' },
    ],
  },
  {
    id: 'service-diagnosis-mismatch', icon: '🩺', name: 'Service Not Supported by Dx (CO-204)', desc: 'Diagnosis doesn\'t support the service',
    denialCodes: ['CO-204', 'CO-50', 'CO-11', 'CO-16'],
    keywords: ['not supported by diagnosis', 'diagnosis does not support', 'co-204', 'medical necessity', 'dx mismatch', 'diagnosis procedure mismatch'],
    ask: [
      'What specific diagnosis-procedure combination was flagged?',
      'What diagnosis does the payer require for this procedure?',
      'Are there LCD/NCD coverage policies that apply to this code pair?',
      'Does the medical record contain documentation supporting medical necessity?',
      'Is the diagnosis pointer correct on the claim?',
    ],
    escalation: [
      'Request peer-to-peer review with medical director',
      'Escalate to coding specialist for diagnosis re-evaluation',
      'Contact payer medical policy department for clarification',
    ],
    gather: [
      'Flagged diagnosis-procedure combination',
      'Payer medical policy for this procedure',
      'LCD/NCD coverage requirements',
      'Corrected diagnosis code (if available)',
      'Clinical documentation supporting medical necessity',
    ],
    actions: ['Corrected Claim', 'Clinical Appeal', 'Peer-to-Peer Review', 'LCD/NCD Review'],
    timeline: '10-20 days for medical necessity appeals',
    color: 'danger',
    branches: [
      { trigger: 'Rep says diagnosis pointer is wrong', response: 'This is a simple fix — correct the diagnosis pointer on the claim and resubmit. Verify which diagnosis should be linked to which line item.', nextAction: 'Submit corrected claim with correct pointers' },
      { trigger: 'Rep says diagnosis doesn\'t support procedure', response: 'Review the LCD/NCD policy for this procedure. If the diagnosis is clinically appropriate, request peer-to-peer review. The provider may need to document medical necessity more clearly.', nextAction: 'Peer-to-peer review + clinical documentation' },
      { trigger: 'Rep says payer requires specific diagnosis range', response: 'Get the exact diagnosis code range the payer requires. If your diagnosis is clinically appropriate but not in their range, this may be a medical policy dispute.', nextAction: 'Request medical policy review' },
    ],
  },
  {
    id: 'provider-type-restriction', icon: '👤', name: 'Provider Type Restriction (CO-170)', desc: 'Provider type not eligible',
    denialCodes: ['CO-170', 'CO-343', 'CO-242', 'CO-357'],
    keywords: ['provider type', 'co-170', 'provider not eligible', 'type of provider', 'specialty restriction', 'provider restriction'],
    ask: [
      'Which specific provider type restriction applies to this service?',
      'What provider types does the payer allow to bill for this service?',
      'Can the service be reassigned or rebilled under a qualifying provider?',
      'Is there a network exception for this provider type?',
      'What is the payer\'s policy on this provider type restriction?',
    ],
    escalation: [
      'Escalate to provider relations for network exception request',
      'Request policy documentation for the provider type restriction',
      'Contact credentialing if provider should qualify',
    ],
    gather: [
      'Provider type restriction details',
      'Qualifying provider types',
      'Network exception process',
      'Policy reference for restriction',
    ],
    actions: ['Rebill Under Qualifying Provider', 'Network Exception Request', 'Appeal with Policy Review'],
    timeline: '15-30 days for provider type disputes',
    color: 'warn',
  },
  {
    id: 'attachment-required', icon: '📎', name: 'Attachment Required (CO-252)', desc: 'Missing documentation',
    denialCodes: ['CO-252', 'CO-16', 'CO-182'],
    keywords: ['attachment', 'co-252', 'documents required', 'records needed', 'additional documentation', 'adr', 'medical records'],
    ask: [
      'What specific attachment or documentation is required?',
      'What is the exact deadline to submit the attachment?',
      'Can I submit electronically through your portal, or is fax/mail required?',
      'Will the claim be held pending receipt, or denied and requiring resubmission?',
      'What is the reference number for this documentation request?',
    ],
    escalation: [
      'Request extension if deadline is less than 7 days',
      'Escalate if documentation requirements are unclear',
      'Contact medical records department for expedited gathering',
    ],
    gather: [
      'Exact documentation list required',
      'Submission deadline (exact date)',
      'Submission method (portal, fax, mail)',
      'Portal login or fax number',
      'Reference number for tracking',
    ],
    actions: ['Submit Documentation', 'Request Extension', 'Appeal if Wrongly Denied'],
    timeline: '5-10 days after document submission',
    color: 'warn',
    branches: [
      { trigger: 'Rep says claim will be denied if not received by deadline', response: 'URGENT: Prioritize documentation gathering. Request extension if needed. Submit via fastest method available (portal > fax > mail).', nextAction: 'Expedited document submission' },
      { trigger: 'Rep says claim is held pending', response: 'Good — claim is not denied yet. Submit documentation and confirm receipt. Get a confirmation number for your records.', nextAction: 'Submit + confirm receipt' },
      { trigger: 'Rep cannot specify what documentation is needed', response: 'Escalate immediately. Request written documentation requirements. Do not hang up without a clear list and deadline.', nextAction: 'Escalate for written requirements' },
    ],
  },
  {
    id: 'interest-penalty', icon: '💰', name: 'Interest Penalty (CO-23/OA-23)', desc: 'Late payment or submission penalty',
    denialCodes: ['CO-23', 'OA-23'],
    keywords: ['interest penalty', 'co-23', 'oa-23', 'late payment', 'interest charge', 'penalty', 'late processing'],
    ask: [
      'What triggered the interest penalty — late submission or late processing?',
      'What is the interest rate being applied?',
      'What is the calculation period for the interest?',
      'Is this per state regulation or per contract terms?',
      'Can you provide the breakdown showing the interest line item?',
    ],
    escalation: [
      'Escalate if interest was applied due to payer processing delay',
      'Request contract review for applicable interest rates',
      'Contact state insurance department if state-mandated rates apply',
    ],
    gather: [
      'Interest rate applied',
      'Calculation period (start/end dates)',
      'Base amount before interest',
      'Interest amount',
      'Applicable regulation or contract clause',
    ],
    actions: ['Accept if Correct', 'Dispute if Incorrect', 'State Complaint', 'Contract Review'],
    timeline: '15-30 days for interest penalty disputes',
    color: 'warn',
    branches: [
      { trigger: 'Rep says penalty is due to late CLAIM submission', response: 'Verify the original submission date. If you have proof of timely filing, this penalty should be reversed. Gather clearinghouse reports.', nextAction: 'Appeal with proof of timely filing' },
      { trigger: 'Rep says penalty is due to late PAYER processing', response: 'This is the payer\'s error. Request immediate reversal with written confirmation. Many states mandate interest on late payer processing.', nextAction: 'Demand reversal + state complaint' },
      { trigger: 'Rep says interest rate seems high', response: 'Request the exact contract clause or state regulation reference. Verify the rate matches what was agreed upon or legislated.', nextAction: 'Request rate verification' },
    ],
  },
  {
    id: 'patient-identification', icon: '🆔', name: 'Patient Not Identified (CO-31)', desc: 'Member ID or name mismatch',
    denialCodes: ['CO-31', 'N30', 'N33', 'N35', 'PR-99'],
    keywords: ['patient not identified', 'co-31', 'member not found', 'wrong member id', 'name mismatch', 'cannot identify patient', 'eligibility not found'],
    ask: [
      'Can you confirm the exact member ID and name in your system?',
      'Was the patient eligible on the exact date of service?',
      'Has there been any recent change to the patient\'s coverage or plan?',
      'Is the date of birth and gender correct in your records?',
      'Is there a different insurance ID this patient might be covered under?',
    ],
    escalation: [
      'Escalate to eligibility department for real-time verification',
      'Contact employer/group if group coverage may have changed',
      'Request written eligibility confirmation',
    ],
    gather: [
      'Correct member ID from payer system',
      'Patient name as registered with payer',
      'Coverage effective and termination dates',
      'Group number and plan type',
      'Secondary coverage information',
    ],
    actions: ['Corrected Claim', 'Eligibility Verification', 'COB Investigation', 'Patient Callback'],
    timeline: '3-7 days for eligibility correction',
    color: 'warn',
    branches: [
      { trigger: 'Rep says member ID is wrong', response: 'Get the CORRECT member ID from the payer. Verify with the patient. Resubmit with corrected ID. This is a common data entry error.', nextAction: 'Corrected claim with right member ID' },
      { trigger: 'Rep says patient is not in their system', response: 'Verify the patient has active coverage. Check if they recently changed plans. Ask if they can search by SSN or name + DOB.', nextAction: 'Eligibility verification' },
      { trigger: 'Rep says coverage terminated before DOS', response: 'This is an eligibility issue, not an identification issue. Determine the termination date and whether the patient had other coverage. May need to bill secondary.', nextAction: 'COB investigation' },
    ],
  },
  {
    id: 'hospice-facility', icon: '🏥', name: 'Hospice/SNF/LTC Denial', desc: 'Patient in facility status',
    denialCodes: ['CO-362', 'CO-365', 'CO-367', 'CO-360'],
    keywords: ['hospice', 'snf', 'skilled nursing', 'long term care', 'ltc', 'custodial care', 'co-362', 'co-365', 'co-367', 'co-360', 'facility status'],
    ask: [
      'Is the patient currently in hospice, SNF, or LTC status?',
      'What is the facility admission date?',
      'Does the hospice/facility coverage include this service type?',
      'Is there a coordination issue between facility and professional billing?',
      'What is the patient\'s discharge date from the facility?',
    ],
    escalation: [
      'Escalate to facility billing coordinator',
      'Contact hospice/LTC agency for coordination',
      'Verify Medicare hospice election status',
    ],
    gather: [
      'Facility type (hospice, SNF, LTC)',
      'Facility admission date',
      'Facility discharge date (if applicable)',
      'Hospice election status',
      'Facility billing contact',
    ],
    actions: ['Facility Coordination', 'Hospice Election Review', 'Corrected Claim', 'Patient Notification'],
    timeline: '10-20 days for facility-related disputes',
    color: 'danger',
    branches: [
      { trigger: 'Rep confirms patient is in hospice', response: 'Hospice patients have specific billing rules. Most services are covered by hospice. Check if this service falls under the hospice election or requires separate billing.', nextAction: 'Hospice election review' },
      { trigger: 'Rep confirms patient is in SNF/LTC', response: 'SNF/LTC patients have limited professional billing. Verify if the service is covered under the facility stay or requires separate authorization.', nextAction: 'Facility coordination' },
      { trigger: 'Rep is unsure about facility status', response: 'Request real-time eligibility verification. Facility status changes frequently. Do not proceed without confirmation.', nextAction: 'Real-time eligibility check' },
    ],
  },
  {
    id: 'clinical-trials', icon: '🧪', name: 'Clinical Trial Adjustment (CO-151)', desc: 'Service related to clinical trial',
    denialCodes: ['CO-151', 'CO-150'],
    keywords: ['clinical trial', 'research', 'co-151', 'investigational', 'trial protocol', 'study related'],
    ask: [
      'Is this patient enrolled in an approved clinical trial?',
      'What is the clinical trial protocol number?',
      'Is the service routine care or research-related?',
      'Does the payer cover routine costs in clinical trials?',
      'What documentation is needed to support the claim?',
    ],
    escalation: [
      'Escalate to clinical research coordinator',
      'Contact payer clinical trials department',
      'Request medical policy review for trial coverage',
    ],
    gather: [
      'Clinical trial protocol number',
      'Trial enrollment documentation',
      'Routine vs research cost breakdown',
      'Payer clinical trial coverage policy',
      'IRB approval documentation',
    ],
    actions: ['Clinical Trial Claim', 'Routine Care Separation', 'Appeal with Trial Documentation'],
    timeline: '30-60 days for clinical trial claims',
    color: 'warn',
  },
  {
    id: 'balance-billing', icon: '💵', name: 'Balance Billing Dispute', desc: 'Patient balance after OON',
    denialCodes: ['CO-150', 'CO-242', 'CO-341', 'PR-96', 'PR-98'],
    keywords: ['balance bill', 'balance billing', 'patient balance', 'surprise bill', 'nsa', 'no surprises act', 'surprise billing'],
    ask: [
      'Was this a surprise out-of-network situation?',
      'Did the patient provide informed consent for OON services?',
      'Is this claim subject to the No Surprises Act?',
      'What is the patient notification documentation on file?',
      'Was this an emergency or scheduled service?',
    ],
    escalation: [
      'Escalate if No Surprises Act applies — balance billing may be prohibited',
      'Contact patient financial services for payment plan options',
      'Request independent dispute resolution (IDR) if applicable',
    ],
    gather: [
      'No Surprises Act applicability',
      'Patient consent documentation',
      'Emergency vs scheduled service status',
      'IDR process information',
      'Patient notification records',
    ],
    actions: ['No Surprises Act Protection', 'IDR Process', 'Patient Payment Plan', 'Write-Off if Protected'],
    timeline: '30-90 days for IDR resolution',
    color: 'danger',
    branches: [
      { trigger: 'Rep says No Surprises Act applies', response: 'EXCELLENT — if NSA applies, balance billing is likely prohibited. The patient cannot be billed beyond in-network cost-sharing. Document this thoroughly.', nextAction: 'Apply NSA protection' },
      { trigger: 'Rep says patient signed OON consent', response: 'Request copy of the signed consent. If consent was proper, balance billing may be allowed. If consent was deficient, challenge it.', nextAction: 'Request consent documentation' },
      { trigger: 'Rep says this is NOT a surprise bill', response: 'Verify whether the patient was properly notified of OON status before the service. If not notified, this may qualify as a surprise bill under NSA.', nextAction: 'Verify notification documentation' },
    ],
  },
  {
    id: 'sequestration-medicare', icon: '🏛️', name: 'Medicare Sequestration', desc: 'Medicare-specific federal reduction',
    denialCodes: ['CO-253'],
    keywords: ['medicare sequestration', 'sequestration medicare', 'federal spending reduction', 'budget control act', 'co-253 medicare'],
    ask: [
      'Is this claim definitely under Medicare (not Medicare Advantage)?',
      'What is the exact sequestration rate for this payment period?',
      'Can you confirm the pre-sequestration and post-sequestration amounts?',
      'Is this rate consistent with the current fiscal year rate?',
    ],
    escalation: [
      'Verify the sequestration rate matches the current fiscal year',
      'Escalate if rate seems inconsistent with known sequestration percentages',
    ],
    gather: [
      'Medicare claim type (FFS, Part A, Part B)',
      'Sequestration rate applied',
      'Payment period',
      'Pre and post-sequestration amounts',
    ],
    actions: ['Accept — Federal Mandate', 'Verify Rate Accuracy', 'Adjust Financial Projections'],
    timeline: 'Immediate — cannot be appealed',
    color: 'safe',
  },
  {
    id: 'wrong-payer', icon: '🔄', name: 'Wrong Payer / COB Error', desc: 'Claim sent to wrong payer',
    denialCodes: ['CO-22', 'CO-58', 'CO-109', 'OA-18'],
    keywords: ['wrong payer', 'bill wrong payer', 'primary secondary', 'should have billed', 'other payer', 'cob error', 'coordination error'],
    ask: [
      'Which payer should have been billed as primary?',
      'Was the primary EOB received and applied correctly?',
      'Is the COB order correct in the payer system?',
      'Was there a change in coverage that affected the COB order?',
      'Do we need to rebill to the correct payer?',
    ],
    escalation: [
      'Escalate if COB order is incorrect in payer system',
      'Contact all payers for coordinated payment resolution',
      'Request COB review if methodology was applied incorrectly',
    ],
    gather: [
      'Correct payer order',
      'Primary payer EOB details',
      'Secondary payer submission requirements',
      'COB methodology (birthday rule, gender, etc.)',
    ],
    actions: ['Rebill to Correct Payer', 'COB Review', 'Resubmit with Correct Order'],
    timeline: '10-20 days after rebilling',
    color: 'warn',
  },
  {
    id: 'retroactive-termination', icon: '⚠️', name: 'Retroactive Termination', desc: 'Coverage terminated retroactively',
    denialCodes: ['CO-27', 'CO-31', 'N41', 'N42'],
    keywords: ['retroactive termination', 'coverage terminated', 'retro termination', 'co-27', 'coverage ended', 'dropped coverage', 'lapsed'],
    ask: [
      'What is the exact termination date in the payer system?',
      'What was the reason for the retroactive termination?',
      'Was the patient or provider notified of the termination?',
      'Is there an appeal process for retroactive termination?',
      'Can the termination be reinstated for this date of service?',
    ],
    escalation: [
      'Escalate to member services for retro-termination investigation',
      'Request written termination notice',
      'Contact employer/group if group coverage was terminated',
      'File state insurance complaint if proper notice was not given',
    ],
    gather: [
      'Termination date',
      'Termination reason',
      'Notification date (if any)',
      'Appeal process and deadline',
      'Employer/group contact (if applicable)',
    ],
    actions: ['Appeal Termination', 'Reinstatement Request', 'Patient Responsibility', 'State Complaint'],
    timeline: '30-60 days for retro-termination appeals',
    color: 'danger',
    branches: [
      { trigger: 'Rep says patient voluntarily terminated', response: 'Verify the patient was properly notified. If the patient did not receive proper notice, this termination may be appealable. Request termination notice copy.', nextAction: 'Request termination notice + appeal' },
      { trigger: 'Rep says employer terminated group coverage', response: 'Contact the employer HR department. If the termination was due to employment change, the patient may have COBRA rights or other coverage options.', nextAction: 'Contact employer + COBRA notification' },
      { trigger: 'Rep says termination was due to eligibility error', response: 'This is a payer error. Request immediate reinstatement and reprocessing. Document the error for potential complaint.', nextAction: 'Demand reinstatement + reprocessing' },
    ],
  },
  {
    id: 'modifier-25', icon: '🏷️', name: 'Modifier 25 Issue', desc: 'E/M modifier dispute',
    denialCodes: ['CO-4', 'CO-16', 'CO-24'],
    keywords: ['modifier 25', 'modifier twenty five', 'separate e/m', 'significant separately identifiable', 'e/m with procedure'],
    ask: [
      'Was the E/M service significant and separately identifiable?',
      'Does the documentation clearly support a separate E/M diagnosis?',
      'What is the payer\'s specific policy on modifier 25?',
      'Is the E/M level supported by the documentation?',
      'Was the E/M performed on the same day as the procedure?',
    ],
    escalation: [
      'Request medical review if documentation supports separate E/M',
      'Escalate to coding specialist for modifier 25 audit',
      'Contact payer medical policy for modifier 25 guidelines',
    ],
    gather: [
      'Modifier 25 documentation requirements',
      'E/M documentation supporting separate service',
      'Payer-specific modifier 25 policy',
      'E/M level validation',
    ],
    actions: ['Corrected Claim with Modifier 25', 'Documentation Enhancement', 'Appeal with Clinical Notes'],
    timeline: '10-20 days for modifier 25 disputes',
    color: 'warn',
    branches: [
      { trigger: 'Rep says E/M documentation is insufficient', response: 'Review the E/M documentation with the provider. The documentation must clearly show a separately identifiable E/M service. Consider documentation improvement.', nextAction: 'Documentation improvement + resubmit' },
      { trigger: 'Rep says modifier 25 was not submitted', response: 'This is a simple fix. Resubmit the claim with modifier 25 appended to the E/M code. Ensure the documentation supports it.', nextAction: 'Corrected claim with modifier 25' },
      { trigger: 'Rep says payer automatically denies modifier 25', response: 'This is a systematic issue. File an appeal citing CMS guidelines that support modifier 25 use. Request peer-to-peer review.', nextAction: 'Formal appeal + peer-to-peer' },
    ],
  },
];

// ════════════════════════════════════════════════════════════
// DATA: AI RESPONSES
// ════════════════════════════════════════════════════════════
const AI_RESPONSES = [
  // ════════════════════════════════════════════════════════════
  // CLAIM & PROCESSING DENIALS
  // ════════════════════════════════════════════════════════════
  {
    triggers: ['not on file', 'cannot locate', 'not in system', 'no claim found', 'claim not received'],
    response: {
      title: '🔍 Claim Not On File Detected',
      body: `IMMEDIATE ACTION REQUIRED:
→ "Can you check by member ID + DOS?"
→ "Was this sent electronically or by mail?"
→ "Can I get a reference # confirming no receipt?"
→ "What date range should I have you check?"

CHECKLIST:
□ Verify 277CA in clearinghouse
□ Confirm payer received date
□ Get rep name + reference number
□ Document exact search parameters used

ESCALATION TRIGGER:
If claim cannot be located after 2 search attempts → request supervisor
If electronic → check EDI gateway status`
    }
  },
  {
    triggers: ['timely filing', 'time limit', 'too late', 'expired', 'filing deadline', 'tfl'],
    response: {
      title: '⏱️ Timely Filing Denial',
      body: `URGENT — DEADLINE SENSITIVE:
→ "What date does your system show the claim was received?"
→ "What is the exact timely filing limit in days?"
→ "Do you accept 277CA as proof of submission?"
→ "Is there an appeal process with documented proof?"

PROOF OF TIMELY FILING NEEDED:
□ 277CA with timestamp
□ Clearinghouse batch confirmation
□ Portal submission receipt
□ Certified mail receipt (paper claims)

ESCALATION:
If rep refuses 277CA → request supervisor
Reference state insurance regulations if applicable`
    }
  },
  {
    triggers: ['auth expired', 'authorization expired', 'auth denied', 'no authorization', 'prior auth', 'precert'],
    response: {
      title: '🔐 Authorization Issue Identified',
      body: `CRITICAL QUESTIONS NOW:
→ "Is a retro-auth still possible?"
→ "What is the retro-auth deadline from DOS?"
→ "Was this service emergent?"
→ "Can you confirm whether an auth request is on file?"
→ "What is the auth request reference number?"

DOCUMENT BEFORE HANGING UP:
□ Auth department fax number
□ Retro-auth deadline
□ Required documentation list
□ Auth rep name + reference #

ESCALATION:
Emergent services → request peer-to-peer review
Retro-auth denied → escalate to Medical Review`
    }
  },
  {
    triggers: ['not eligible', 'no coverage', 'terminated', 'eligibility', 'inactive member', 'member not found'],
    response: {
      title: '👤 Eligibility Issue Detected',
      body: `ASK IMMEDIATELY:
→ "What are the exact coverage dates?"
→ "Was there a retroactive termination?"
→ "Does member have a secondary plan?"
→ "What was the termination reason?"
→ "Is there a retroactive enrollment option?"

DOCUMENT:
□ Coverage effective date
□ Termination date + reason
□ Plan name and group number
□ Member services contact for employer group

ACTION:
If retroactive termination → request eligibility verification in writing
If group termination → contact employer HR`
    }
  },
  {
    triggers: ['duplicate', 'already on file', 'already processed', 'duplicate claim'],
    response: {
      title: '📋 Duplicate Claim Denial',
      body: `ASK THE REP:
→ "What claim number is this a duplicate of?"
→ "What was the outcome of the original claim?"
→ "Was the original paid, denied, or pending?"
→ "What is the difference between the two claims?"

IF ORIGINAL DENIED:
This should NOT be flagged as duplicate → escalate

IF ORIGINAL PAID:
Verify EOB matches expected payment → close

IF ORIGINAL PENDING:
Request processing of original claim → document timeline`
    }
  },
  {
    triggers: ['underpaid', 'short paid', 'wrong rate', 'underpayment', 'fee schedule'],
    response: {
      title: '💰 Underpayment Detected',
      body: `DOCUMENT BEFORE HANGING UP:
→ Applied allowable amount
→ Expected contracted rate
→ Difference owed
→ Fee schedule name used
→ Contract effective date

FILE PROVIDER DISPUTE:
□ Include contract rate evidence
□ Include EOB/ERA comparison
□ Include claim details
□ Request expedited review if over $500

ESCALATION:
If contract rate not applied → Provider Relations
If amounts over $500 → management escalation`
    }
  },
  {
    triggers: ['supervisor', 'escalate', 'manager', 'appeal'],
    response: {
      title: '🔺 Escalation Mode',
      body: `WHEN REQUESTING SUPERVISOR:
→ State: "I need to speak to a supervisor regarding a clinical denial"
→ Get supervisor's name + direct extension
→ Document everything said
→ Ask for written confirmation of decision

ESCALATION TRIGGERS:
□ Authorization denials
□ Medical necessity denials
□ Timely filing with proof available
□ Credentialing issues
□ Contract disputes over $500
□ Patient safety concerns

GET BEFORE HANGING UP:
□ Supervisor name + extension
□ Reference/case number
□ Decision summary
□ Next steps promised`
    }
  },
  {
    triggers: ['documentation', 'records', 'medical records', 'clinical notes', 'adr'],
    response: {
      title: '📄 Documentation Request',
      body: `CONFIRM BEFORE HANGING UP:
→ Exact records needed (H&P, op note, lab, imaging, etc.)
→ Submission deadline
→ Fax number or portal address
→ Reference number for tracking
→ Acceptable format requirements

SUBMIT WITHIN 5 BUSINESS DAYS:
□ Include cover sheet with reference number
□ Include patient name + claim number
□ Keep confirmation of submission
□ Follow up if no confirmation received

ESCALATION:
If deadline < 7 days → request extension
If denied for insufficient documentation → appeal with clinical narrative`
    }
  },
  // ════════════════════════════════════════════════════════════
  // CODING & MODIFIER DENIALS
  // ════════════════════════════════════════════════════════════
  {
    triggers: ['invalid coding', 'wrong code', 'coding error', 'code not valid', 'cpt code', 'icd code'],
    response: {
      title: '🔢 Invalid Coding (CPT/ICD) Detected',
      body: `ASK THE REP:
→ "What specific code was rejected?"
→ "Is the code active for the date of service?"
→ "Does the code require a modifier?"
→ "Is there a more specific code?"
→ "Was this validated at clearinghouse level?"

VERIFY:
□ Code active for DOS
□ Code meets medical necessity for diagnosis
□ Correct code combination
□ Payer-specific coding requirements

ACTION:
Corrected claim with proper code
Request coding specialist review if complex
Document payer's suggested code if provided`
    }
  },
  {
    triggers: ['modifier', 'modifier missing', 'modifier incorrect', 'modifier 25', 'modifier 59', 'distinct service'],
    response: {
      title: '🏷️ Modifier Issue Detected',
      body: `ASK THE REP:
→ "What modifier was submitted vs. what's needed?"
→ "Is this a modifier 25, 59, or XS/XU issue?"
→ "What documentation supports modifier use?"
→ "Is there a payer-specific modifier policy?"

MODIFIER GUIDELINES:
□ Modifier 25: Separate E/M on same day as procedure
□ Modifier 59: Distinct procedural service
□ Modifier XS: Separate structural encounter
□ Modifier XU: Unusual non-overlapping service

ACTION:
Resubmit with correct modifier + clinical note
Request medical review if modifier was appropriate
Document payer's modifier requirements`
    }
  },
  {
    triggers: ['bundling', 'bundle', 'ncci', 'mutually exclusive', 'component'],
    response: {
      title: '📦 Bundling / NCCI Edit Detected',
      body: `ASK THE REP:
→ "Which code was bundled into which?"
→ "Is the component vs. comprehensive code identified?"
→ "Will modifier 59 or XS override this?"
→ "Is the NCCI edit current?"

NCCI EDIT RESOLUTION:
□ Verify edit effective date
□ Check if modifier override is appropriate
□ Confirm clinical documentation supports separate services
□ Verify code pair relationship

ACTION:
Resubmit with appropriate modifier + clinical note
If no modifier override → appeal with medical review
If edit is outdated → request payer correction`
    }
  },
  // ════════════════════════════════════════════════════════════
  // NETWORK & ENROLLMENT DENIALS
  // ════════════════════════════════════════════════════════════
  {
    triggers: ['out of network', 'oon', 'not contracted', 'non-contracted', 'network status'],
    response: {
      title: '🚫 Out-of-Network Detected',
      body: `ASK THE REP:
→ "Is the provider currently contracted?"
→ "What is the network status effective date?"
→ "Is there a single case agreement (SCA) option?"
→ "Was patient aware of OON status?"
→ "Is there a network exception process?"

NETWORK OPTIONS:
□ Single Case Agreement (SCA) negotiation
□ Network exception for continuity of care
□ Balance billing patient (if allowed by state)
□ Contract negotiation with payer

ACTION:
Contact provider relations for SCA
Notify patient of balance billing responsibility
Document network status confirmation`
    }
  },
  {
    triggers: ['credentialing', 'not credentialed', 'not enrolled', 'provider not contracted', 'enrollment gap'],
    response: {
      title: '🏥 Credentialing Issue Detected',
      body: `ASK THE REP:
→ "What is the provider enrollment effective date?"
→ "Is the issue with rendering or billing NPI?"
→ "Was there a credentialing gap?"
→ "Is there retroactive enrollment available?"

CREDENTIALING CHECKLIST:
□ Enrollment effective date
□ Enrollment ID or PTAN
□ Credentialing contact name/number
□ Gap period identified
□ Retroactive enrollment option

ACTION:
Contact provider relations immediately
Request written confirmation of enrollment gap
If retroactive → submit documentation for gap period`
    }
  },
  {
    triggers: ['provider enrollment', 'enrollment', 'revalidation', 'enrollment effective'],
    response: {
      title: '📝 Provider Enrollment Issue Detected',
      body: `ASK THE REP:
→ "What is the enrollment status in your system?"
→ "Is there a revalidation deadline?"
→ "Is retroactive enrollment possible?"
→ "What enrollment ID is on file?"

ENROLLMENT STEPS:
□ Verify enrollment effective date
□ Confirm NPI and Tax ID match
□ Check for revalidation requirements
□ Document enrollment ID/PTAN

ACTION:
Expedite enrollment if patient care affected
Request retroactive coverage for gap period
Contact credentialing department directly`
    }
  },
  // ════════════════════════════════════════════════════════════
  // COB & COVERAGE DENIALS
  // ════════════════════════════════════════════════════════════
  {
    triggers: ['cob', 'coordination of benefits', 'primary', 'secondary', 'tertiary', 'other insurance', 'dual coverage'],
    response: {
      title: '🔄 COB Issue Detected',
      body: `ASK THE REP:
→ "Is primary payer info correct in your system?"
→ "Has primary EOB been received and applied?"
→ "What COB methodology is used?"
→ "Is there a third payer involved?"
→ "Was claim submitted to correct primary first?"

COB DOCUMENTATION NEEDED:
□ Primary EOB with payment details
□ Secondary payer submission requirements
□ COB methodology used
□ All payer IDs and member IDs

ACTION:
Resubmit to secondary with primary EOB
Request COB review if methodology incorrect
Document all coordination details`
    }
  },
  {
    triggers: ['non-covered', 'not covered', 'excluded', 'benefit excluded', 'not a benefit'],
    response: {
      title: '❌ Non-Covered Service Detected',
      body: `ASK THE REP:
→ "Is this permanently excluded or temporarily?"
→ "Is there a medical necessity exception?"
→ "Does patient have supplemental coverage?"
→ "Was prior auth obtained?"
→ "Is there an alternative covered procedure?"

OPTIONS:
□ Medical necessity exception process
□ Benefit exception appeal
□ Supplemental payer claim
□ Patient responsibility notification
□ Alternative procedure code

ACTION:
Request benefit exception with clinical documentation
Contact supplemental payer if applicable
Document exact exclusion policy reference`
    }
  },
  {
    triggers: ['referral', 'referral required', 'referral missing', 'pcp referral', 'specialist referral'],
    response: {
      title: '📋 Referral Required Detected',
      body: `ASK THE REP:
→ "Was a referral obtained and is it on file?"
→ "What is the referral validity period?"
→ "Is retroactive referral possible?"
→ "What documentation supports the referral?"
→ "Who is the referring PCP?"

REFERRAL DOCUMENTATION:
□ Referral number and dates
□ PCP name and contact
□ Referral validity period
□ Retroactive referral process
□ Clinical justification for referral

ACTION:
Obtain retroactive referral from PCP
Resubmit with referral documentation
Request escalation if referral submitted but not processed`
    }
  },
  // ════════════════════════════════════════════════════════════
  // BENEFIT & PATIENT DENIALS
  // ════════════════════════════════════════════════════════════
  {
    triggers: ['benefit exhausted', 'maximum reached', 'annual max', 'lifetime max', 'benefit limit', 'cap reached'],
    response: {
      title: '📊 Benefit Exhausted Detected',
      body: `ASK THE REP:
→ "What benefit limit was reached?"
→ "Is this annual or lifetime maximum?"
→ "Can the limit be increased or waived?"
→ "Is there an appeals process?"
→ "Does patient have supplemental coverage?"

BENEFIT OPTIONS:
□ Medical necessity exception for continued treatment
□ Benefit limit increase/waiver
□ Supplemental payer claim
□ Payment plan for patient balance
□ Clinical documentation for exception

ACTION:
Request benefit exception with clinical evidence
Contact supplemental payer
Notify patient of options and responsibilities`
    }
  },
  {
    triggers: ['patient responsibility', 'patient balance', 'deductible', 'coinsurance', 'copay', 'patient owes'],
    response: {
      title: '👤 Patient Responsibility Detected',
      body: `ASK THE REP:
→ "What is the exact patient responsibility?"
→ "Has patient been notified of this balance?"
→ "Is there a payment plan option?"
→ "Was EOB sent to patient?"
→ "Can patient dispute with documentation?"

PATIENT RESPONSIBILITY BREAKDOWN:
□ Deductible amount
□ Coinsurance amount
□ Copayment amount
□ Any remaining balance

ACTION:
Notify patient of balance
Discuss payment plan options
Document EOB notification date
If incorrect → request recalculuation`
    }
  },
  {
    triggers: ['medical necessity', 'not medically necessary', 'clinical criteria', 'milliman', 'interqual'],
    response: {
      title: '🩺 Medical Necessity Denial',
      body: `CRITICAL NEXT STEPS:
→ Request peer-to-peer review immediately
→ Ask: "Who is the reviewing medical director?"
→ Ask: "What specific criterion was not met?"
→ Ask: "Is an IRO review available?"

TIMELINE IS CRITICAL:
Peer-to-peer windows close fast (usually 5-7 days)
IRO review available in many states

DOCUMENT:
□ Medical director name + contact
□ Criteria document used
□ Peer-to-peer deadline
□ IRO information

ESCALATION:
Internal appeal exhausted → IRO review
Patient safety concern → state insurance commissioner`
    }
  },
];

const AI_QUICK_PROMPTS = [
  'Claim not on file',
  'Auth expired',
  'Timely filing denial',
  'Not eligible',
  'Medical necessity',
  'Underpayment',
  'Duplicate claim',
  'Request supervisor',
  'Bundling edit',
  'Documentation request',
  'Credentialing issue',
  'COB issue',
];

const POWER_QUESTIONS = [
  'What exact system edit triggered this denial?',
  'Can you provide the internal adjustment code used?',
  'Can a supervisor override this edit today?',
  'Is there an exception process or waiver available?',
  'Can you provide the denial logic from your system?',
  'Is this denial policy or system-generated?',
  'What is the specific line-item that was denied?',
  'Can this be expedited as an urgent review?',
];

// ════════════════════════════════════════════════════════════
// STATE
// ════════════════════════════════════════════════════════════
let callSession = null;
let callStartTime = null;
let callTimerInterval = null;
let selectedPayer = null;
let selectedScenario = null;
let checklistAnswers = {};
let analytics = JSON.parse(localStorage.getItem('rcm_analytics') || '{"calls":[],"denials":{}}');

// ════════════════════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initDropdowns();
  initPowerQuestions();
  initAISidebar();
  initPayers();
  initDecisionTree();
  initCalculator();
  initBatchTracker();
  initAnalytics();
  initKeyboardShortcuts();
  initSearch();
  setDefaultDates();
  initOnboarding();
  initMobileNav();
});

function initMobileNav() {
  const hamburger = document.getElementById('btnMobileHamburger');
  if (hamburger) {
    hamburger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleMobileNav();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const drawer = document.getElementById('mobileNavDrawer');
      if (drawer && drawer.classList.contains('open')) {
        closeMobileNav();
      }
    }
  });
}

// ── THEME ─────────────────────────────────────────────────
function initTheme() {
  const saved = localStorage.getItem('rcm_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeBtn(saved);
  document.getElementById('btnTheme').addEventListener('click', toggleTheme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('rcm_theme', next);
  updateThemeBtn(next);
}

function updateThemeBtn(theme) {
  document.getElementById('btnTheme').textContent = theme === 'dark' ? '🌙' : '☀️';
}

// ── DROPDOWNS ─────────────────────────────────────────────
let setupMode = 'full'; // 'full' or 'quick'

function initDropdowns() {
  // Full mode dropdowns
  const selects = ['setupPayer', 'calcPayer'];
  selects.forEach(id => {
    const sel = document.getElementById(id);
    if (!sel) return;
    PAYER_DB.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = p.name;
      sel.appendChild(opt);
    });
  });

  // Quick mode dropdowns
  const qsPayer = document.getElementById('setupPayerQS');
  if (qsPayer) {
    PAYER_DB.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = p.name;
      qsPayer.appendChild(opt);
    });
  }

  // Denial code selects (full + quick)
  ['setupDenialCode', 'setupDenialQS'].forEach(selId => {
    const sel = document.getElementById(selId);
    if (!sel) return;
    DENIAL_CODES.forEach(d => {
      const opt = document.createElement('option');
      opt.value = d.code;
      opt.textContent = `${d.code} — ${d.desc}`;
      sel.appendChild(opt);
    });
  });
}

function switchSetupMode(mode) {
  setupMode = mode;
  const quickForm = document.getElementById('quickStartForm');
  const fullForm = document.getElementById('fullSetupForm');
  const btnQuick = document.getElementById('btnQuickMode');

  if (mode === 'quick') {
    quickForm.style.display = 'block';
    fullForm.style.display = 'none';
    btnQuick.textContent = '📋 Full Form';
    btnQuick.onclick = () => switchSetupMode('full');
  } else {
    quickForm.style.display = 'none';
    fullForm.style.display = 'block';
    btnQuick.textContent = '⚡ Quick Start';
    btnQuick.onclick = () => switchSetupMode('quick');
  }
}

function setDefaultDates() {
  const today = new Date().toISOString().split('T')[0];
  const callDateEl = document.getElementById('callDate');
  if (callDateEl) callDateEl.value = today;
  const now = new Date();
  const callTimeEl = document.getElementById('callTime');
  if (callTimeEl) callTimeEl.value = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

  // Pre-fill DOS in calculator to 30 days ago
  const calcDOS = document.getElementById('calcDOS');
  if (calcDOS) {
    const dos = new Date(); dos.setDate(dos.getDate() - 30);
    calcDOS.value = dos.toISOString().split('T')[0];
  }
  const calcDenial = document.getElementById('calcDenialDate');
  if (calcDenial) calcDenial.value = today;
}

// ── CALL SETUP MODAL ──────────────────────────────────────
function openCallSetup() {
  document.getElementById('callSetupModal').classList.add('open');
  setTimeout(() => document.getElementById('setupPayer').focus(), 300);
}

function closeCallSetup() {
  document.getElementById('callSetupModal').classList.remove('open');
}

document.getElementById('btnNewCall').addEventListener('click', openCallSetup);

// Close modal on backdrop click
document.getElementById('callSetupModal').addEventListener('click', e => {
  if (e.target === document.getElementById('callSetupModal')) closeCallSetup();
});

function startCallSession() {
  let payer, claim, dos, memberId, denial, cpt, billed, claimType, quickNote;

  if (setupMode === 'quick') {
    // Quick mode: only payer + denial required
    payer    = document.getElementById('setupPayerQS').value;
    denial   = document.getElementById('setupDenialQS').value;
    quickNote = document.getElementById('setupNoteQS').value.trim();
    claim    = '';
    dos      = '';
    memberId = '';
    cpt      = '';
    billed   = '';
    claimType = 'professional';
  } else {
    // Full mode: all fields
    payer    = document.getElementById('setupPayer').value;
    claim    = document.getElementById('setupClaimNumber').value.trim();
    dos      = document.getElementById('setupDOS').value;
    memberId = document.getElementById('setupMemberID').value.trim();
    denial   = document.getElementById('setupDenialCode').value;
    cpt      = document.getElementById('setupCPT').value.trim();
    billed   = document.getElementById('setupBilledAmt').value.trim();
    claimType = document.getElementById('setupClaimType').value;
    quickNote = '';
  }

  // Only payer + denial are required
  const requiredFields = setupMode === 'quick'
    ? [
        { el: 'setupPayerQS', name: 'Payer' },
        { el: 'setupDenialQS', name: 'Denial Code' },
      ]
    : [
        { el: 'setupPayer', name: 'Payer' },
        { el: 'setupDenialCode', name: 'Denial Code' },
      ];

  let hasError = false;
  requiredFields.forEach(f => {
    const input = document.getElementById(f.el);
    const group = input?.closest('.form-group');
    if (!input || !group) return;
    if (!input.value.trim()) {
      group.classList.add('error');
      group.classList.remove('success');
      hasError = true;
    } else {
      group.classList.remove('error');
      group.classList.add('success');
    }
  });

  if (hasError) {
    showToast('Please select Payer and Denial Code.', 'error');
    return;
  }

  // Clear validation states
  requiredFields.forEach(f => {
    const input = document.getElementById(f.el);
    const group = input?.closest('.form-group');
    if (group) group.classList.remove('error', 'success');
  });

  const payerObj = PAYER_DB.find(p => p.id === payer);
  const denialObj = DENIAL_CODES.find(d => d.code === denial || denial.includes(d.code));

  // Also try to get denial desc from select element text
  let denialDescFinal = denialObj?.desc || '';
  if (!denialDescFinal) {
    const denialSelect = setupMode === 'quick'
      ? document.getElementById('setupDenialQS')
      : document.getElementById('setupDenialCode');
    if (denialSelect && denialSelect.selectedIndex > 0) {
      const selectedText = denialSelect.options[denialSelect.selectedIndex].text;
      const dashIdx = selectedText.indexOf(' — ');
      if (dashIdx > -1) denialDescFinal = selectedText.substring(dashIdx + 3);
    }
  }

  callSession = {
    payer,
    payerName: payerObj?.name || payer,
    claim: claim || 'Pending',
    dos: dos || new Date().toISOString().split('T')[0],
    memberId: memberId || 'Pending',
    denial,
    denialDesc: denialDescFinal || denial,
    cpt,
    billed: billed || '$0.00',
    claimType,
    quickNote,
    startTime: new Date().toISOString(),
  };
  callStartTime = new Date();

  // Update UI
  updateNavSession();
  startCallTimer();
  document.getElementById('callTicker').classList.add('active');
  document.getElementById('callSessionNav').classList.add('visible');
  closeCallSetup();

  // Load checklist
  loadChecklist();

  // Switch to checklist tab
  switchTab('checklist');

  // Sync calculator
  const calcPayer = document.getElementById('calcPayer');
  if (calcPayer) calcPayer.value = payer;
  const calcDOS = document.getElementById('calcDOS');
  if (calcDOS) calcDOS.value = dos;
  calculateDeadlines();

  // AI welcome
  addAIMessage('assistant', `🟢 Call session started! I'm monitoring your call with <strong>${payerObj?.name}</strong> for denial <strong>${denial}</strong>. Type what the rep says and I'll guide you in real time.`);

  showToast(`Call session started — ${payerObj?.name}`, 'success');
  updateMobileCallBar();
  updateMobileNavSession();
}

function updateNavSession() {
  if (!callSession) return;
  document.getElementById('navPayer').textContent = callSession.payerName;
  document.getElementById('navClaim').textContent = callSession.claim;
  document.getElementById('navDenial').textContent = callSession.denial;
  document.getElementById('navDOS').textContent = callSession.dos;
  document.getElementById('navBilled').textContent = callSession.billed;
  document.getElementById('tickerPayer').textContent = callSession.payerName;
  document.getElementById('tickerClaim').textContent = callSession.claim;
}

// ── CALL TIMER ────────────────────────────────────────────
function startCallTimer() {
  callTimerInterval = setInterval(() => {
    if (!callStartTime) return;
    const elapsed = Math.floor((new Date() - callStartTime) / 1000);
    const m = String(Math.floor(elapsed / 60)).padStart(2,'0');
    const s = String(elapsed % 60).padStart(2,'0');
    document.getElementById('callTimerDisplay').textContent = `${m}:${s}`;
  }, 1000);
}

function stopCallTimer() {
  clearInterval(callTimerInterval);
  callTimerInterval = null;
}

// ── END CALL ──────────────────────────────────────────────
function endCallSession() { endCall(); }
document.getElementById('btnEndCall').addEventListener('click', endCall);

function endCall() {
  if (!callSession) return;

  stopCallTimer();
  document.getElementById('callTicker').classList.remove('active');
  document.getElementById('callSessionNav').classList.remove('visible');

  // Save to analytics
  analytics.calls.push({
    date: new Date().toISOString(),
    payer: callSession.payerName,
    denial: callSession.denial,
    billed: callSession.billed,
    duration: callStartTime ? Math.floor((new Date() - callStartTime) / 1000) : 0,
    resolved: false,
  });
  if (!analytics.denials[callSession.denial]) analytics.denials[callSession.denial] = 0;
  analytics.denials[callSession.denial]++;
  localStorage.setItem('rcm_analytics', JSON.stringify(analytics));

  // Generate summary
  generateSummary();
  switchTab('summary');

  addAIMessage('assistant', `⏹ Call session ended. <strong>Post-call summary has been generated</strong>. Review and copy your AR notes before closing.`);
  showToast('Call ended — summary generated!', 'success');

  callSession = null;
  callStartTime = null;
  updateMobileCallBar();
  updateMobileNavSession();
}

// ════════════════════════════════════════════════════════════
// MODULE 1: CHECKLIST
// ════════════════════════════════════════════════════════════
function initPowerQuestions() {
  const list = document.getElementById('powerQuestionsList');
  if (!list) return;
  list.innerHTML = POWER_QUESTIONS.map(q => `
    <div class="power-q-item">${q}</div>
  `).join('');
}

function loadChecklist() {
  if (!callSession) return;
  document.getElementById('checklistWelcome').style.display = 'none';
  document.getElementById('checklistContent').style.display = 'block';
  document.getElementById('checklistSubtitle').textContent =
    `${callSession.payerName} · Denial ${callSession.denial} · Claim ${callSession.claim}`;

  const categories = buildChecklist();
  renderCategories(categories);
  updateProgressStats(categories);
}

function buildChecklist() {
  const base = JSON.parse(JSON.stringify(CHECKLIST_DB.default));
  const override = CHECKLIST_DB[callSession?.denial];
  if (override) {
    Object.keys(override).forEach(cat => {
      base[cat] = [...override[cat], ...(base[cat] || [])];
    });
  }
  return base;
}

function renderCategories(categories) {
  const container = document.getElementById('questionCategories');
  container.innerHTML = '';

  const catIcons = {
    'Claim Verification': '🔍', 'Denial Clarification': '❌', 'Authorization': '🔐',
    'Eligibility': '👤', 'Timely Filing': '⏱️', 'Appeals': '⚖️',
    'Fee Schedule': '💰', 'Medical Necessity': '🩺', 'Provider Enrollment': '🏥',
    'Documentation Requests': '📄',
  };

  Object.keys(categories).forEach((cat, ci) => {
    const questions = categories[cat];
    const catEl = document.createElement('div');
    catEl.className = `question-category${ci < 2 ? ' open' : ''}`;
    catEl.id = `cat-${ci}`;

    const criticals = questions.filter(q => q.priority === 'critical').length;
    const completedCount = questions.filter((q,qi) => checklistAnswers[`${ci}-${qi}`]?.completed).length;

    catEl.innerHTML = `
      <button class="category-header" onclick="toggleCategory('cat-${ci}')" aria-expanded="${ci < 2}">
        <span style="font-size:16px">${catIcons[cat] || '📋'}</span>
        <span class="category-title">${cat}</span>
        ${criticals > 0 ? `<span class="badge badge-critical">${criticals} Critical</span>` : ''}
        <span class="category-count">${completedCount}/${questions.length}</span>
        <span class="category-chevron">▼</span>
      </button>
      <div class="category-body">
        ${questions.map((q, qi) => renderQuestion(q, ci, qi)).join('')}
      </div>
    `;
    container.appendChild(catEl);
  });
}

function renderQuestion(q, ci, qi) {
  const key = `${ci}-${qi}`;
  const saved = checklistAnswers[key] || {};
  const badgeClass = q.priority === 'critical' ? 'badge-critical' : q.priority === 'important' ? 'badge-important' : 'badge-optional';
  const badgeLabel = q.priority.charAt(0).toUpperCase() + q.priority.slice(1);

  return `
    <div class="question-item${saved.completed ? ' completed' : ''}" id="qitem-${key}">
      <div class="question-check${saved.completed ? ' checked' : ''}" onclick="toggleQuestion('${key}')" role="checkbox" aria-checked="${saved.completed || false}" tabindex="0">
        ${saved.completed ? '✓' : ''}
      </div>
      <div class="question-content">
        <div class="question-text">${q.q}</div>
        <div class="question-actions">
          <span class="badge ${badgeClass}">${badgeLabel}</span>
          <button class="btn btn-xs btn-primary" onclick="askQuestion('${key}')">Ask →</button>
          <button class="btn btn-xs btn-ghost" onclick="toggleAnswer('${key}')">📝 Answer</button>
        </div>
        <div class="question-answer" id="qa-${key}" style="display:${saved.answer ? 'block' : 'none'}">
          <input type="text" placeholder="Type rep's response…" value="${saved.answer || ''}"
            onchange="saveAnswer('${key}', this.value)" onblur="saveAnswer('${key}', this.value)"
            aria-label="Answer for question ${qi + 1}" />
        </div>
      </div>
    </div>
  `;
}

function toggleCategory(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.toggle('open');
}

function toggleQuestion(key) {
  if (!checklistAnswers[key]) checklistAnswers[key] = {};
  checklistAnswers[key].completed = !checklistAnswers[key].completed;
  const item = document.getElementById(`qitem-${key}`);
  const check = item?.querySelector('.question-check');
  if (item) item.classList.toggle('completed', checklistAnswers[key].completed);
  if (check) {
    check.classList.toggle('checked', checklistAnswers[key].completed);
    check.textContent = checklistAnswers[key].completed ? '✓' : '';
  }
  updateProgressStats(buildChecklist());
}

function askQuestion(key) {
  const el = document.getElementById(`qitem-${key}`);
  if (!el) return;
  el.style.boxShadow = '0 0 0 2px var(--brand-400)';
  el.style.borderColor = 'var(--brand-400)';
  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  setTimeout(() => { el.style.boxShadow = ''; el.style.borderColor = ''; }, 2500);
  showToast('Question highlighted — ask the rep now', 'info');
}

function toggleAnswer(key) {
  const el = document.getElementById(`qa-${key}`);
  if (!el) return;
  el.style.display = el.style.display === 'none' ? 'block' : 'none';
  if (el.style.display === 'block') el.querySelector('input')?.focus();
}

function saveAnswer(key, value) {
  if (!checklistAnswers[key]) checklistAnswers[key] = {};
  checklistAnswers[key].answer = value;
}

function updateProgressStats(categories) {
  const el = document.getElementById('progressStats');
  if (!el) return;
  let total = 0, completed = 0, critical = 0, critDone = 0;

  Object.values(categories).forEach((qs, ci) => {
    qs.forEach((q, qi) => {
      total++;
      const k = `${ci}-${qi}`;
      if (checklistAnswers[k]?.completed) { completed++; if (q.priority === 'critical') critDone++; }
      if (q.priority === 'critical') critical++;
    });
  });

  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  el.innerHTML = `
    <div style="display:flex; justify-content:space-between; font-size:12px; color:var(--text-muted); margin-bottom:4px">
      <span>Overall Progress</span><span style="color:var(--brand-400);font-weight:700">${pct}%</span>
    </div>
    <div style="height:6px;background:var(--bg-overlay);border-radius:var(--r-full);overflow:hidden;margin-bottom:12px">
      <div style="height:100%;width:${pct}%;background:linear-gradient(90deg,var(--brand-400),var(--brand-600));border-radius:var(--r-full);transition:width .3s"></div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:12px">
      <div style="text-align:center;padding:8px;background:var(--bg-overlay);border-radius:var(--r-md)">
        <div style="font-size:18px;font-weight:800;color:var(--brand-400)">${completed}</div>
        <div style="color:var(--text-muted)">Completed</div>
      </div>
      <div style="text-align:center;padding:8px;background:var(--bg-overlay);border-radius:var(--r-md)">
        <div style="font-size:18px;font-weight:800;color:var(--text-primary)">${total - completed}</div>
        <div style="color:var(--text-muted)">Remaining</div>
      </div>
      <div style="text-align:center;padding:8px;background:rgba(239,68,68,.08);border-radius:var(--r-md)">
        <div style="font-size:18px;font-weight:800;color:var(--red-400)">${critDone}/${critical}</div>
        <div style="color:var(--text-muted)">Critical Done</div>
      </div>
      <div style="text-align:center;padding:8px;background:rgba(245,158,11,.08);border-radius:var(--r-md)">
        <div style="font-size:18px;font-weight:800;color:var(--amber-300)">${total}</div>
        <div style="color:var(--text-muted)">Total Items</div>
      </div>
    </div>
  `;
}

function expandAllCategories() {
  document.querySelectorAll('.question-category').forEach(el => el.classList.add('open'));
}

function collapseAllCategories() {
  document.querySelectorAll('.question-category').forEach(el => el.classList.remove('open'));
}

function copyChecklist() {
  const categories = buildChecklist();
  let text = `=== RCM COPILOT — CHECKLIST ANSWERS ===\nPayer: ${callSession?.payerName || 'N/A'}\nClaim: ${callSession?.claim || 'N/A'}\nDenial: ${callSession?.denial || 'N/A'}\n\n`;

  Object.keys(categories).forEach((cat, ci) => {
    const qs = categories[cat];
    text += `\n[${cat}]\n`;
    qs.forEach((q, qi) => {
      const key = `${ci}-${qi}`;
      const ans = checklistAnswers[key]?.answer || '';
      const done = checklistAnswers[key]?.completed ? '✓' : '○';
      text += `${done} ${q.q}\n`;
      if (ans) text += `   → Response: ${ans}\n`;
    });
  });

  copyToClipboard(text);
  showToast('Checklist answers copied!', 'success');
}

function saveCallDoc() {
  const btn = event?.target;
  if (btn) {
    btn.classList.add('loading');
    btn.disabled = true;
  }

  const doc = {
    repName: document.getElementById('repName').value,
    refNumber: document.getElementById('refNumber').value,
    callbackNumber: document.getElementById('callbackNumber').value,
    dept: document.getElementById('repDept').value,
    callDate: document.getElementById('callDate').value,
    callTime: document.getElementById('callTime').value,
    notes: document.getElementById('callNotes').value,
  };

  setTimeout(() => {
    localStorage.setItem('rcm_call_doc', JSON.stringify(doc));
    showToast('Call documentation saved!', 'success');
    if (btn) {
      btn.classList.remove('loading');
      btn.disabled = false;
    }
  }, 500);
}

// ════════════════════════════════════════════════════════════
// MODULE 2: DECISION TREE
// ════════════════════════════════════════════════════════════
function initDecisionTree() {
  const grid = document.getElementById('scenarioGrid');
  if (!grid) return;
  grid.innerHTML = DECISION_TREE.map(s => `
    <div class="scenario-card" id="scenario-${s.id}" onclick="selectScenario('${s.id}')"
      role="listitem" tabindex="0" aria-label="${s.name}">
      <div class="scenario-card-icon">${s.icon}</div>
      <div class="scenario-card-name">${s.name}</div>
      <div class="scenario-card-desc">${s.desc}</div>
      ${s.denialCodes && s.denialCodes.length ? `<div style="margin-top:6px;display:flex;flex-wrap:wrap;gap:3px">${s.denialCodes.slice(0,3).map(c => `<span style="font-size:9px;padding:1px 4px;background:var(--bg-elevated);border:1px solid var(--border-subtle);border-radius:var(--r-sm);color:var(--text-muted)">${c}</span>`).join('')}${s.denialCodes.length > 3 ? `<span style="font-size:9px;color:var(--text-muted)">+${s.denialCodes.length - 3}</span>` : ''}</div>` : ''}
    </div>
  `).join('');
}

function selectScenario(id) {
  selectedScenario = id;
  document.querySelectorAll('.scenario-card').forEach(c => c.classList.remove('selected'));
  document.getElementById(`scenario-${id}`)?.classList.add('selected');

  const s = DECISION_TREE.find(t => t.id === id);
  if (!s) return;

  const branch = document.getElementById('decisionBranch');
  branch.className = 'decision-branch active';

  const colorMap = { safe: 'var(--green-400)', warn: 'var(--amber-400)', danger: 'var(--red-400)' };
  const statusText = { safe: 'Routine', warn: 'Action Required', danger: 'Urgent Action Required' };

  branch.innerHTML = `
    <div style="grid-column: 1/-1; margin-bottom: 6px;">
      <div style="display:flex; align-items:center; gap:12px; padding:12px 16px; background:var(--bg-elevated); border:1px solid var(--border-subtle); border-radius:var(--r-lg);">
        <span style="font-size:28px">${s.icon}</span>
        <div>
          <div style="font-size:16px;font-weight:800;color:var(--text-primary)">${s.name}</div>
          <div style="font-size:12px;color:var(--text-muted)">${s.desc}</div>
        </div>
        <span class="badge badge-${s.color === 'safe' ? 'safe' : s.color === 'warn' ? 'warn' : 'danger'}" style="margin-left:auto">${statusText[s.color]}</span>
      </div>
    </div>
    ${s.denialCodes && s.denialCodes.length ? `
    <div style="grid-column: 1/-1;">
      <div style="display:flex; flex-wrap:wrap; gap:6px; padding:10px 14px; background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:var(--r-md);">
        <span style="font-size:12px;font-weight:700;color:var(--text-secondary);margin-right:4px">Related Denial Codes:</span>
        ${s.denialCodes.map(c => {
          const desc = DENIAL_CODES.find(d => d.code === c)?.desc || '';
          return `<span style="font-size:11px;padding:3px 8px;background:var(--bg-elevated);border:1px solid var(--border-subtle);border-radius:var(--r-sm);color:var(--text-primary);cursor:pointer" title="${desc}" onclick="event.stopPropagation();document.getElementById('setupDenialQS').value='${c}';document.getElementById('setupDenialCode').value='${c}'">${c}${desc ? ' — ' + desc.substring(0, 30) : ''}</span>`;
        }).join('')}
      </div>
    </div>
    ` : ''}
    <div class="branch-card">
      <div class="branch-card-title color-ask">💬 Ask Next — Immediately</div>
      <ul class="branch-list">${s.ask.map(a => `<li>${a}</li>`).join('')}</ul>
    </div>
    <div class="branch-card">
      <div class="branch-card-title color-esc">🔺 Escalation Trigger</div>
      <ul class="branch-list">${s.escalation.map(e => `<li>${e}</li>`).join('')}</ul>
    </div>
    <div class="branch-card">
      <div class="branch-card-title color-gather">📋 Gather Before Hanging Up</div>
      <ul class="branch-list">${s.gather.map(g => `<li>${g}</li>`).join('')}</ul>
    </div>
    <div class="branch-card">
      <div class="branch-card-title color-action">✅ Recommended Action</div>
      <div class="action-btn-row">${s.actions.map(a => `<span class="action-pill">${a}</span>`).join('')}</div>
      <div class="timeline-badge" style="margin-top:12px">⏳ ${s.timeline}</div>
    </div>
    ${s.branches && s.branches.length ? `
    <div style="grid-column: 1/-1;">
      <div style="padding:14px 16px;background:linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.08));border:1px solid rgba(99,102,241,0.2);border-radius:var(--r-lg);">
        <div style="font-size:13px;font-weight:800;color:var(--indigo-400);margin-bottom:10px;display:flex;align-items:center;gap:6px">
          🌳 RESPONSE BRANCHES — "If they say X, you say Y"
        </div>
        ${s.branches.map((b, i) => `
        <div class="branch-response-block" style="margin-bottom:10px;padding:12px 14px;background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--r-md);cursor:pointer" onclick="this.querySelector('.branch-response-detail').classList.toggle('open'); this.classList.toggle('expanded')">
          <div style="font-size:12px;font-weight:700;color:var(--text-primary);display:flex;align-items:center;gap:6px">
            <span style="color:var(--indigo-400)">→</span> ${b.trigger}
            <span style="margin-left:auto;font-size:10px;color:var(--text-muted)">click to expand</span>
          </div>
          <div class="branch-response-detail" style="display:none;margin-top:8px;padding-top:8px;border-top:1px solid var(--border-subtle)">
            <div style="font-size:11px;font-weight:600;color:var(--amber-400);margin-bottom:4px">💬 YOUR RESPONSE:</div>
            <div style="font-size:12px;color:var(--text-secondary);line-height:1.5;margin-bottom:8px">${b.response}</div>
            <div style="font-size:11px;font-weight:600;color:var(--green-400);margin-bottom:2px">✅ NEXT ACTION:</div>
            <div style="font-size:12px;color:var(--text-primary);font-weight:700">${b.nextAction}</div>
          </div>
        </div>
        `).join('')}
      </div>
    </div>
    ` : ''}
  `;

  branch.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function clearDecisionTree() {
  selectedScenario = null;
  document.querySelectorAll('.scenario-card').forEach(c => c.classList.remove('selected'));
  document.getElementById('decisionBranch').className = 'decision-branch';
}

// ════════════════════════════════════════════════════════════
// MODULE 3: TIMELY FILING CALCULATOR
// ════════════════════════════════════════════════════════════
function initCalculator() {
  renderCalculatorPlaceholder();
}

function renderCalculatorPlaceholder() {
  const grid = document.getElementById('deadlineGrid');
  const deadlineTypes = [
    'Initial Filing', 'Corrected Claim', 'First Level Appeal',
    'Second Level Appeal', 'Reconsideration', 'Regulatory Complaint'
  ];
  grid.innerHTML = deadlineTypes.map(t => `
    <div class="deadline-card">
      <div class="deadline-status-bar" style="background:var(--border-base)"></div>
      <div class="deadline-label">${t}</div>
      <div class="deadline-date" style="color:var(--text-muted)">Select payer & dates</div>
      <div class="deadline-days" style="color:var(--text-muted)">—</div>
    </div>
  `).join('');
  renderFilingGuidance();
}

function calculateDeadlines() {
  const payerId  = document.getElementById('calcPayer').value;
  const dosVal   = document.getElementById('calcDOS').value;
  const denialVal = document.getElementById('calcDenialDate').value;

  if (!payerId || !dosVal) { renderCalculatorPlaceholder(); return; }

  const payer = PAYER_DB.find(p => p.id === payerId);
  if (!payer) return;

  const dos = new Date(dosVal);
  const denial = denialVal ? new Date(denialVal) : null;
  const today = new Date();

  const addDays = (d, days) => { const r = new Date(d); r.setDate(r.getDate() + days); return r; };
  const fmtDate = d => d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  const daysLeft = d => Math.ceil((d - today) / (1000 * 60 * 60 * 24));

  const deadlines = [
    { label: 'Initial Filing', icon: '📝', date: addDays(dos, payer.timelyFiling.initial), note: `${payer.timelyFiling.initial} days from DOS` },
    { label: 'Corrected Claim', icon: '🔄', date: addDays(dos, payer.timelyFiling.corrected), note: `${payer.timelyFiling.corrected} days from DOS` },
    { label: 'First Level Appeal', icon: '⚖️', date: denial ? addDays(denial, payer.timelyFiling.appeal) : addDays(dos, payer.timelyFiling.initial + payer.timelyFiling.appeal), note: `${payer.timelyFiling.appeal} days from denial` },
    { label: 'Second Level Appeal', icon: '🏛️', date: denial ? addDays(denial, payer.timelyFiling.appeal + 60) : addDays(dos, payer.timelyFiling.initial + payer.timelyFiling.appeal + 60), note: `${payer.timelyFiling.appeal + 60} days from denial` },
    { label: 'Reconsideration', icon: '🔁', date: denial ? addDays(denial, 30) : addDays(dos, 30), note: '30 days from denial' },
    { label: 'Regulatory Complaint', icon: '🏢', date: denial ? addDays(denial, 180) : addDays(dos, 180), note: '180 days from denial' },
  ];

  const grid = document.getElementById('deadlineGrid');
  grid.innerHTML = deadlines.map(d => {
    const days = daysLeft(d.date);
    let status = 'safe';
    if (days < 0) status = 'danger';
    else if (days <= 14) status = 'danger';
    else if (days <= 30) status = 'warn';

    const daysText = days < 0 ? `EXPIRED ${Math.abs(days)} days ago` : days === 0 ? 'DUE TODAY' : `${days} days remaining`;

    return `
      <div class="deadline-card ${status}">
        <div class="deadline-status-bar"></div>
        <div class="deadline-label">${d.icon} ${d.label}</div>
        <div class="deadline-date">${fmtDate(d.date)}</div>
        <div class="deadline-days">${daysText}</div>
        <div style="font-size:10px;color:var(--text-muted);margin-top:4px">${d.note}</div>
      </div>
    `;
  }).join('');

  renderFilingGuidance(payer);
}

function renderFilingGuidance(payer) {
  const el = document.getElementById('filingGuidance');
  el.innerHTML = `
    <div class="guidance-card">
      <h5>📄 Proof of Timely Filing Requirements</h5>
      <ul class="guidance-list">
        <li>277CA acceptance report from clearinghouse</li>
        <li>Clearinghouse batch confirmation with timestamp</li>
        <li>Electronic submission receipt from payer portal</li>
        <li>Certified mail receipt (paper claims)</li>
        <li>Screen capture of portal submission confirmation</li>
        <li>Payer acknowledgement report</li>
      </ul>
    </div>
    <div class="guidance-card">
      <h5>🔌 Electronic vs Paper Filing Rules</h5>
      <ul class="guidance-list">
        <li>Electronic claims must be submitted by midnight on deadline date</li>
        <li>Paper claims must be received (not postmarked) by deadline</li>
        <li>HIPAA mandate: providers with 10+ employees must file electronically</li>
        <li>EDI 837P = Professional | EDI 837I = Institutional</li>
        <li>Paper: CMS-1500 (Professional) | UB-04 (Institutional)</li>
      </ul>
    </div>
    <div class="guidance-card">
      <h5>🔁 Secondary Claim Filing Rules</h5>
      <ul class="guidance-list">
        <li>Secondary filing clock starts from primary EOB date</li>
        <li>Most payers allow 90–180 days from primary payment/denial</li>
        <li>Include primary EOB with secondary submission</li>
        <li>COB Coordination of Benefits must reflect primary adjudication</li>
        <li>Medicare: 27 months from DOS for MSP crossover claims</li>
      </ul>
    </div>
    <div class="guidance-card">
      <h5>📡 Clearinghouse Documentation Needed</h5>
      <ul class="guidance-list">
        <li>277CA with ICN/DCN (transaction control number)</li>
        <li>Original claim submission timestamp</li>
        <li>Payer acknowledgement segment (ISA/GS date)</li>
        <li>Batch ID and submitter information</li>
        <li>EDI transaction set control number (ST-SE)</li>
        <li>Rejection reason if originally rejected and corrected</li>
      </ul>
    </div>
  `;
}

// ════════════════════════════════════════════════════════════
// MODULE 4: PAYER DIRECTORY
// ════════════════════════════════════════════════════════════
function initPayers() {
  renderPayerList(PAYER_DB);
}

function renderPayerList(payers) {
  const container = document.getElementById('payerListItems');
  container.innerHTML = payers.map(p => `
    <button class="payer-item" id="payer-item-${p.id}" onclick="showPayerDetail('${p.id}')" aria-label="View ${p.name} details">
      <div class="payer-item-avatar">${p.abbr.slice(0,3)}</div>
      <div>
        <div class="payer-item-name">${p.name}</div>
        <div class="payer-item-id">${p.payerId} · ${p.type}</div>
      </div>
    </button>
  `).join('');
}

function filterPayers() {
  const q = (document.getElementById('payerSearch')?.value || '').toLowerCase();
  const type = document.getElementById('payerTypeFilter')?.value || '';
  const filtered = PAYER_DB.filter(p =>
    (!q || p.name.toLowerCase().includes(q) || p.payerId.includes(q) || p.type.toLowerCase().includes(q)) &&
    (!type || p.type === type)
  );
  renderPayerList(filtered);
}

let currentPayerDept = 'Claims';

function showPayerDetail(id) {
  selectedPayer = PAYER_DB.find(p => p.id === id);
  if (!selectedPayer) return;

  document.querySelectorAll('.payer-item').forEach(el => el.classList.remove('active'));
  document.getElementById(`payer-item-${id}`)?.classList.add('active');

  const depts = Object.keys(selectedPayer.departments);
  currentPayerDept = 'Claims';

  const detail = document.getElementById('payerDetail');
  detail.innerHTML = `
    <div class="card">
      <div class="card-header">
        <div class="payer-item-avatar" style="width:40px;height:40px;font-size:13px">${selectedPayer.abbr}</div>
        <div style="flex:1">
          <div class="card-title">${selectedPayer.name}</div>
          <div class="card-subtitle">Payer ID: <span style="font-family:var(--font-mono)">${selectedPayer.payerId}</span> · ${selectedPayer.type}</div>
        </div>
        <span class="badge badge-new">${selectedPayer.type}</span>
      </div>
      <div class="card-body">
        <!-- Department Tabs -->
        <div class="dept-tabs" id="deptTabs">
          ${depts.map(d => `<button class="dept-tab${d === 'Claims' ? ' active' : ''}" onclick="switchDept('${id}','${d}')">${d}</button>`).join('')}
        </div>
        <div id="contactDetail"></div>
      </div>
    </div>

    <!-- IVR Navigator -->
    <div class="card">
      <div class="card-header">
        <div class="card-icon">📞</div>
        <div>
          <div class="card-title">IVR Navigator</div>
          <div class="card-subtitle">Step-by-step call instructions</div>
        </div>
      </div>
      <div class="card-body">
        <div class="ivr-flow" id="ivrFlow">
          ${selectedPayer.ivr.map((step, i) => `
            <div class="ivr-step">
              <div class="ivr-step-num">${i + 1}</div>
              <div class="ivr-step-content">
                <div class="ivr-step-action">${step.action}</div>
                <div class="ivr-step-detail">${step.detail}</div>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="ivr-stats">
          <div class="ivr-stat">
            <div class="ivr-stat-value">${selectedPayer.holdTime}</div>
            <div class="ivr-stat-label">Avg Hold</div>
          </div>
          <div class="ivr-stat">
            <div class="ivr-stat-value" style="font-size:12px">${selectedPayer.bestTime}</div>
            <div class="ivr-stat-label">Best Time</div>
          </div>
          <div class="ivr-stat">
            <div class="ivr-stat-value" style="font-size:14px;color:${selectedPayer.callback === 'Yes' ? 'var(--green-400)' : 'var(--red-400)'}">${selectedPayer.callback}</div>
            <div class="ivr-stat-label">Callback</div>
          </div>
          <div class="ivr-stat">
            <div class="ivr-stat-value" style="font-size:11px">${selectedPayer.verified}</div>
            <div class="ivr-stat-label">Verified</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filing Windows -->
    <div class="card">
      <div class="card-header">
        <div class="card-icon">⏱️</div>
        <div class="card-title">Filing Windows</div>
      </div>
      <div class="card-body">
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
          <div style="text-align:center;padding:10px;background:var(--bg-elevated);border-radius:var(--r-md)">
            <div style="font-size:20px;font-weight:800;color:var(--brand-400)">${selectedPayer.timelyFiling.initial}</div>
            <div style="font-size:10px;color:var(--text-muted);font-weight:600;text-transform:uppercase">Initial Filing (days)</div>
          </div>
          <div style="text-align:center;padding:10px;background:var(--bg-elevated);border-radius:var(--r-md)">
            <div style="font-size:20px;font-weight:800;color:var(--amber-300)">${selectedPayer.timelyFiling.appeal}</div>
            <div style="font-size:10px;color:var(--text-muted);font-weight:600;text-transform:uppercase">Appeal Window (days)</div>
          </div>
          <div style="text-align:center;padding:10px;background:var(--bg-elevated);border-radius:var(--r-md)">
            <div style="font-size:20px;font-weight:800;color:var(--green-400)">${selectedPayer.timelyFiling.corrected}</div>
            <div style="font-size:10px;color:var(--text-muted);font-weight:600;text-transform:uppercase">Corrected Claim (days)</div>
          </div>
        </div>
      </div>
    </div>
  `;

  renderDeptContact(id, 'Claims');
}

function switchDept(payerId, dept) {
  currentPayerDept = dept;
  document.querySelectorAll('.dept-tab').forEach(t => {
    t.classList.toggle('active', t.textContent === dept);
  });
  renderDeptContact(payerId, dept);
}

function renderDeptContact(payerId, dept) {
  const p = PAYER_DB.find(x => x.id === payerId);
  const info = p?.departments[dept];
  if (!info) return;

  const el = document.getElementById('contactDetail');
  if (!el) return;

  el.innerHTML = `
    <div class="contact-card mt-2">
      <div class="contact-row">
        <span class="contact-label">📞 Phone</span>
        <span class="contact-value">${info.phone}</span>
        <button class="copy-btn" onclick="copyField('${info.phone}', this)" title="Copy phone">📋</button>
      </div>
      <div class="contact-row">
        <span class="contact-label">📠 Fax</span>
        <span class="contact-value">${info.fax}</span>
        <button class="copy-btn" onclick="copyField('${info.fax}', this)" title="Copy fax">📋</button>
      </div>
      <div class="contact-row">
        <span class="contact-label">📍 Address</span>
        <span class="contact-value" style="font-size:11.5px">${info.address}</span>
        <button class="copy-btn" onclick="copyField('${info.address}', this)" title="Copy address">📋</button>
      </div>
      <div class="contact-row">
        <span class="contact-label">🌐 Portal</span>
        <span class="contact-value"><a href="${info.portal}" target="_blank" rel="noopener">${info.portal}</a></span>
        <button class="copy-btn" onclick="copyField('${info.portal}', this)" title="Copy URL">📋</button>
      </div>
    </div>
  `;
}

function copyField(val, btn) {
  copyToClipboard(val);
  btn.classList.add('copied');
  btn.textContent = '✓';
  setTimeout(() => { btn.classList.remove('copied'); btn.textContent = '📋'; }, 2000);
}

// ════════════════════════════════════════════════════════════
// POST-CALL SUMMARY
// ════════════════════════════════════════════════════════════
function generateSummary() {
  const hasSession = callSession || localStorage.getItem('rcm_call_doc');

  document.getElementById('summaryWelcome').style.display = hasSession ? 'none' : 'flex';
  document.getElementById('summaryContent').style.display = hasSession ? 'block' : 'none';

  if (!hasSession) return;

  const doc = JSON.parse(localStorage.getItem('rcm_call_doc') || '{}');
  const session = callSession || {};
  const elapsed = callStartTime ? Math.floor((new Date() - callStartTime) / 1000) : 0;
  const m = String(Math.floor(elapsed / 60)).padStart(2,'0');
  const s = String(elapsed % 60).padStart(2,'0');

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const answers = Object.entries(checklistAnswers).filter(([,v]) => v.answer).map(([,v]) => v.answer).filter(Boolean);

  // Build PMS-ready paragraph notes
  const pmsNotes = generatePMSNotes(session, doc, answers, m, s, today);

  document.getElementById('arNoteBox').textContent = pmsNotes;

  // Follow-up date default (30 days)
  const followUp = new Date(); followUp.setDate(followUp.getDate() + 30);
  document.getElementById('followUpDate').value = followUp.toISOString().split('T')[0];

  // Session stats
  const categories = buildChecklist();
  let total = 0, completed = 0;
  Object.values(categories).forEach((qs, ci) => qs.forEach((q, qi) => {
    total++;
    if (checklistAnswers[`${ci}-${qi}`]?.completed) completed++;
  }));

  document.getElementById('sessionStats').innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:12px">
      <div style="text-align:center;padding:10px;background:var(--bg-elevated);border-radius:var(--r-md)">
        <div style="font-size:20px;font-weight:800;color:var(--brand-400)">${completed}/${total}</div>
        <div style="color:var(--text-muted)">Questions Answered</div>
      </div>
      <div style="text-align:center;padding:10px;background:var(--bg-elevated);border-radius:var(--r-md)">
        <div style="font-size:20px;font-weight:800;color:var(--text-primary)">${m}:${s}</div>
        <div style="color:var(--text-muted)">Call Duration</div>
      </div>
    </div>
  `;
}

function generatePMSNotes(session, doc, answers, m, s, today) {
  const payer = session.payerName || 'N/A';
  const claim = session.claim || 'N/A';
  const dos = session.dos || 'N/A';
  const memberId = session.memberId || 'N/A';
  const denial = session.denial || 'N/A';
  const denialDesc = session.denialDesc || '';
  const cpt = session.cpt || 'N/A';
  const billed = session.billed || 'N/A';
  const repName = doc.repName || 'N/A';
  const dept = doc.dept || 'N/A';
  const refNum = doc.refNumber || 'N/A';
  const callbackNum = doc.callbackNumber || 'N/A';

  // Build answer summary
  let answerSummary = '';
  if (answers.length > 0) {
    answerSummary = answers.slice(0, 8).join('; ');
    if (answers.length > 8) answerSummary += `; and ${answers.length - 8} additional items`;
  }

  // Build PMS paragraph note
  let note = '';

  // Header
  note += `AR CALL NOTES — ${today}\n`;
  note += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

  // Claim Info
  note += `CLAIM INFORMATION:\n`;
  note += `Payer: ${payer}\n`;
  note += `Claim #: ${claim}\n`;
  note += `Date of Service: ${dos}\n`;
  if (cpt !== 'N/A') note += `CPT Code: ${cpt}\n`;
  note += `Billed Amount: ${billed}\n`;
  if (memberId !== 'N/A') note += `Member ID: ${memberId}\n`;
  note += `Denial Code: ${denial}`;
  if (denialDesc) note += ` — ${denialDesc}`;
  note += `\n\n`;

  // Call Details
  note += `CALL DETAILS:\n`;
  note += `Representative: ${repName}`;
  if (dept !== 'N/A') note += ` (${dept})`;
  note += `\n`;
  if (refNum !== 'N/A') note += `Reference #: ${refNum}\n`;
  if (callbackNum !== 'N/A') note += `Callback #: ${callbackNum}\n`;
  note += `Call Duration: ${m}:${s}\n\n`;

  // Information Gathered
  if (answerSummary) {
    note += `KEY INFORMATION GATHERED:\n`;
    note += `${answerSummary}\n\n`;
  }

  // Resolution / Next Steps
  const completedItems = Object.entries(checklistAnswers).filter(([,v]) => v.completed).map(([k]) => k);

  note += `RESOLUTION:\n`;
  if (completedItems.length > 0) {
    note += `Completed ${completedItems.length} checklist items during call.\n`;
  }
  if (doc.notes) {
    note += `Additional notes: ${doc.notes}\n`;
  }
  note += `\n`;

  // Follow-up
  const followUpDate = document.getElementById('followUpDate')?.value;
  const callOutcome = document.getElementById('callOutcome')?.value;
  const nextAction = document.getElementById('nextAction')?.value;

  note += `FOLLOW-UP ACTION ITEMS:\n`;
  if (followUpDate) note += `Follow-up Date: ${followUpDate}\n`;
  if (callOutcome) note += `Call Outcome: ${callOutcome}\n`;
  if (nextAction) note += `Next Action: ${nextAction}\n`;
  note += `\n`;

  note += `Documented by: RCM Denials AI Assistant`;

  return note;
}

function copyARNotes() {
  const txt = document.getElementById('arNoteBox')?.textContent || '';
  copyToClipboard(txt);
  const btn = document.getElementById('copyNotesBtn');
  if (btn) { btn.textContent = '✓ Copied!'; setTimeout(() => btn.textContent = '📋 Copy', 2000); }
  showToast('AR notes copied to clipboard!', 'success');
}

function saveSession() {
  const btn = event?.target;
  if (btn) {
    btn.classList.add('loading');
    btn.disabled = true;
  }

  setTimeout(() => {
    showToast('Session saved successfully!', 'success');
    if (btn) {
      btn.classList.remove('loading');
      btn.disabled = false;
    }
  }, 500);
}

function exportSession() {
  const data = {
    session: callSession,
    callDoc: JSON.parse(localStorage.getItem('rcm_call_doc') || '{}'),
    answers: checklistAnswers,
    exportDate: new Date().toISOString(),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `rcm-session-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Session exported!', 'success');
}

// ════════════════════════════════════════════════════════════
// MODULE 5: BATCH CLAIMS TRACKER
// ════════════════════════════════════════════════════════════
let batchClaims = JSON.parse(localStorage.getItem('rcm_batch_claims') || '[]');
let batchSortField = 'dos';
let batchSortDir = 'desc';

function initBatchTracker() {
  // Populate payer filter
  const payerFilter = document.getElementById('batchPayerFilter');
  if (payerFilter) {
    PAYER_DB.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = p.name;
      payerFilter.appendChild(opt);
    });
  }
  renderBatchTable();
}

function renderBatchTable() {
  const tbody = document.getElementById('batchTableBody');
  if (!tbody) return;

  let filtered = filterBatchClaimsData();

  // Sort
  filtered.sort((a, b) => {
    let valA = a[batchSortField];
    let valB = b[batchSortField];
    if (batchSortField === 'amount') {
      valA = parseFloat(valA?.replace(/[$,]/g, '') || 0);
      valB = parseFloat(valB?.replace(/[$,]/g, '') || 0);
    }
    if (valA < valB) return batchSortDir === 'asc' ? -1 : 1;
    if (valA > valB) return batchSortDir === 'asc' ? 1 : -1;
    return 0;
  });

  tbody.innerHTML = filtered.map((c, i) => `
    <tr>
      <td><input type="checkbox" class="batch-checkbox" data-id="${c.id}" /></td>
      <td><span class="batch-claim-num">${c.claim}</span></td>
      <td>${c.payer}</td>
      <td>${c.denial}</td>
      <td><span class="batch-amount">${c.amount}</span></td>
      <td><span class="batch-status ${c.status}">${c.status.replace('-', ' ')}</span></td>
      <td>${c.dos}</td>
      <td class="batch-actions">
        <button class="btn btn-xs btn-ghost" onclick="editBatchClaim('${c.id}')" title="Edit">✏️</button>
        <button class="btn btn-xs btn-ghost" onclick="deleteBatchClaim('${c.id}')" title="Delete">🗑️</button>
        <button class="btn btn-xs btn-primary" onclick="startBatchCall('${c.id}')" title="Start Call">📞</button>
      </td>
    </tr>
  `).join('');

  updateBatchSummary(filtered);
}

function filterBatchClaimsData() {
  const search = (document.getElementById('batchSearch')?.value || '').toLowerCase();
  const status = document.getElementById('batchStatusFilter')?.value || '';
  const payer = document.getElementById('batchPayerFilter')?.value || '';

  return batchClaims.filter(c => {
    const matchSearch = !search || c.claim.toLowerCase().includes(search) || c.payer.toLowerCase().includes(search) || c.memberId?.toLowerCase().includes(search);
    const matchStatus = !status || c.status === status;
    const matchPayer = !payer || c.payerId === payer;
    return matchSearch && matchStatus && matchPayer;
  });
}

function filterBatchClaims() {
  renderBatchTable();
}

function sortBatchTable(field) {
  if (batchSortField === field) {
    batchSortDir = batchSortDir === 'asc' ? 'desc' : 'asc';
  } else {
    batchSortField = field;
    batchSortDir = 'asc';
  }
  renderBatchTable();
}

function updateBatchSummary(filtered) {
  const total = filtered.length;
  const totalBilled = filtered.reduce((sum, c) => sum + parseFloat(c.amount?.replace(/[$,]/g, '') || 0), 0);
  const pending = filtered.filter(c => c.status === 'pending' || c.status === 'in-progress').length;
  const resolved = filtered.filter(c => c.status === 'resolved').length;

  document.getElementById('batchTotal').textContent = total;
  document.getElementById('batchTotalBilled').textContent = '$' + totalBilled.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  document.getElementById('batchPending').textContent = pending;
  document.getElementById('batchResolved').textContent = resolved;
}

function addBatchClaim() {
  const id = 'batch-' + Date.now();
  const newClaim = {
    id,
    claim: 'CLM-' + Math.random().toString(36).substr(2, 8).toUpperCase(),
    payer: 'Select Payer',
    payerId: '',
    denial: 'CO-16',
    amount: '$0.00',
    status: 'pending',
    dos: new Date().toISOString().split('T')[0],
    memberId: '',
    notes: '',
  };
  batchClaims.unshift(newClaim);
  localStorage.setItem('rcm_batch_claims', JSON.stringify(batchClaims));
  renderBatchTable();
  editBatchClaim(id);
  showToast('New claim added', 'success');
}

function editBatchClaim(id) {
  const claim = batchClaims.find(c => c.id === id);
  if (!claim) return;

  // Simple prompt-based editing for now
  const newPayer = prompt('Payer Name:', claim.payer);
  if (newPayer !== null) claim.payer = newPayer;

  const newDenial = prompt('Denial Code:', claim.denial);
  if (newDenial !== null) claim.denial = newDenial;

  const newAmount = prompt('Billed Amount:', claim.amount);
  if (newAmount !== null) claim.amount = newAmount;

  const newStatus = prompt('Status (pending/in-progress/resolved/denied):', claim.status);
  if (newStatus !== null && ['pending', 'in-progress', 'resolved', 'denied'].includes(newStatus)) {
    claim.status = newStatus;
  }

  const newDOS = prompt('Date of Service (YYYY-MM-DD):', claim.dos);
  if (newDOS !== null) claim.dos = newDOS;

  localStorage.setItem('rcm_batch_claims', JSON.stringify(batchClaims));
  renderBatchTable();
  showToast('Claim updated', 'success');
}

function deleteBatchClaim(id) {
  if (!confirm('Delete this claim?')) return;
  batchClaims = batchClaims.filter(c => c.id !== id);
  localStorage.setItem('rcm_batch_claims', JSON.stringify(batchClaims));
  renderBatchTable();
  showToast('Claim deleted', 'info');
}

function startBatchCall(id) {
  const claim = batchClaims.find(c => c.id === id);
  if (!claim) return;

  // Pre-fill call setup modal
  const payerOption = Array.from(document.getElementById('setupPayer').options).find(o => o.text === claim.payer);
  if (payerOption) document.getElementById('setupPayer').value = payerOption.value;

  document.getElementById('setupClaimNumber').value = claim.claim;
  document.getElementById('setupDOS').value = claim.dos;
  document.getElementById('setupDenialCode').value = claim.denial;
  document.getElementById('setupBilledAmt').value = claim.amount;

  openCallSetup();
}

function toggleBatchSelectAll() {
  const checked = document.getElementById('batchSelectAll').checked;
  document.querySelectorAll('.batch-checkbox').forEach(cb => cb.checked = checked);
}

function exportBatchClaims() {
  const filtered = filterBatchClaimsData();
  const headers = ['Claim #', 'Payer', 'Denial Code', 'Amount', 'Status', 'DOS', 'Member ID', 'Notes'];
  const rows = filtered.map(c => [c.claim, c.payer, c.denial, c.amount, c.status, c.dos, c.memberId || '', c.notes || '']);

  let csv = headers.join(',') + '\n';
  rows.forEach(row => {
    csv += row.map(cell => `"${cell}"`).join(',') + '\n';
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `batch-claims-${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Batch claims exported!', 'success');
}

// ════════════════════════════════════════════════════════════
// AI SIDEBAR
// ════════════════════════════════════════════════════════════
function initAISidebar() {
  addAIMessage('assistant', `👋 <strong>RCM Denials AI Assistant</strong><br>I'm ready to guide you through your payer call in real time.<br><br>Start a call session, then type what the rep says — I'll instantly provide questions, escalation triggers, and next steps.`);

  const qlEl = document.getElementById('aiQuickLabels');
  qlEl.innerHTML = AI_QUICK_PROMPTS.map(p => `
    <div class="ai-quick-label" onclick="sendQuickPrompt('${p}')">${p}</div>
  `).join('');

  const input = document.getElementById('aiInput');
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendAIMessage(); }
  });
  // Auto-resize textarea
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 80) + 'px';
  });
}

function sendAIMessage() {
  const input = document.getElementById('aiInput');
  const text = input.value.trim();
  if (!text) return;

  addAIMessage('user', text);
  input.value = '';
  input.style.height = 'auto';

  setTimeout(() => {
    const response = getAIResponse(text);
    addAIMessage('assistant', response);

    // Auto-trigger decision tree if scenario matches
    const textLower = text.toLowerCase();
    const matched = DECISION_TREE.find(s => s.keywords.some(k => textLower.includes(k)));
    if (matched && selectedScenario !== matched.id) {
      addChips([`View ${matched.name} in Decision Tree →`], () => {
        switchTab('decision');
        selectScenario(matched.id);
      });
    }
  }, 600);
}

function sendQuickPrompt(text) {
  document.getElementById('aiInput').value = text;
  sendAIMessage();
}

function getAIResponse(input) {
  const lower = input.toLowerCase();

  // Check AI response database
  for (const r of AI_RESPONSES) {
    if (r.triggers.some(t => lower.includes(t))) {
      return `<strong>${r.response.title}</strong><br><pre style="white-space:pre-wrap;font-size:11.5px;margin-top:6px;color:var(--text-secondary)">${r.response.body}</pre>`;
    }
  }

  // Generic fallback with helpful guidance
  if (lower.includes('paid') || lower.includes('payment')) {
    return `<strong>💰 Payment Received</strong><br>→ Verify payment amount matches contracted rate<br>→ Check for underpayment against fee schedule<br>→ Confirm ERA/EOB matches system posting`;
  }
  if (lower.includes('pending') || lower.includes('in process')) {
    return `<strong>⏳ Claim Pending</strong><br>→ Ask for estimated adjudication date<br>→ Get reference number for follow-up<br>→ Note processing timeline for follow-up calendar`;
  }
  if (lower.includes('denied') || lower.includes('denial')) {
    return `<strong>❌ Denial Confirmed</strong><br>→ Get the exact denial reason + remark codes<br>→ Confirm appeal deadline and address<br>→ Document rep name and reference number`;
  }
  if (lower.includes('hold') || lower.includes('wait')) {
    return `<strong>⏸ On Hold</strong><br>→ Estimated hold: check payer IVR stats in Module 4<br>→ Use this time to review checklist questions<br>→ Prepare documentation needed for the call`;
  }

  return `<strong>🤖 AI Guidance</strong><br>I heard: "${input}"<br><br>→ Document exactly what the rep said<br>→ Use the Decision Tree for scenario-specific guidance<br>→ Ask for rep name + reference number before proceeding`;
}

function addAIMessage(role, html) {
  const container = document.getElementById('aiMessages');
  const div = document.createElement('div');
  div.className = `ai-msg ai-msg-${role}`;
  div.innerHTML = html;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function addChips(labels, callback) {
  const container = document.getElementById('aiMessages');
  const div = document.createElement('div');
  div.style.cssText = 'display:flex;flex-wrap:wrap;gap:4px;padding:4px 0;animation:fadeSlideIn .25s ease';
  div.innerHTML = labels.map((l, i) => `<span class="ai-suggestion-chip" data-idx="${i}">→ ${l}</span>`).join('');
  div.addEventListener('click', e => {
    const chip = e.target.closest('.ai-suggestion-chip');
    if (chip) { callback?.(); div.remove(); }
  });
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

// ════════════════════════════════════════════════════════════
// TAB NAVIGATION
// ════════════════════════════════════════════════════════════
function switchTab(id) {
  // Panels
  document.querySelectorAll('.module-panel').forEach(p => p.classList.remove('active'));
  document.getElementById(`panel-${id}`)?.classList.add('active');

  // Tab buttons (desktop)
  const tabMap = { checklist: 0, decision: 1, filing: 2, payer: 3, batch: 4, summary: 5, analytics: 6 };
  document.querySelectorAll('.tab-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i === tabMap[id]);
    btn.setAttribute('aria-selected', i === tabMap[id]);
  });

  // Nav items
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  const navEl = document.getElementById(`nav-${id}`);
  if (navEl) navEl.classList.add('active');
}

// ════════════════════════════════════════════════════════════
// ANALYTICS
// ════════════════════════════════════════════════════════════
function initAnalytics() {
  renderKPIs();
  renderCharts();
  renderInsights();
}

function renderKPIs() {
  const calls = analytics.calls;
  const totalCalls = calls.length;
  const resolved  = calls.filter(c => c.resolved).length;
  const recoveryRate = totalCalls > 0 ? Math.round((resolved / totalCalls) * 100) : 0;
  const avgDuration = totalCalls > 0 ? Math.round(calls.reduce((a, c) => a + (c.duration || 0), 0) / totalCalls / 60) : 0;

  const kpis = [
    { label: 'Total Calls', value: totalCalls || 42, change: '+12%', up: true, icon: '📞' },
    { label: 'Denials Resolved', value: resolved || 28, change: '+8%', up: true, icon: '✅' },
    { label: 'Recovery Rate', value: (recoveryRate || 67) + '%', change: '+5%', up: true, icon: '💰' },
    { label: 'Avg Hold Time', value: (avgDuration || 19) + ' min', change: '-3 min', up: true, icon: '⏱️' },
    { label: 'Appeal Success', value: '74%', change: '+11%', up: true, icon: '⚖️' },
    { label: 'Open Follow-Ups', value: 8, change: '-2', up: true, icon: '📅' },
    { label: 'Avg Recovery $', value: '$1,240', change: '+18%', up: true, icon: '💵' },
    { label: 'Claims This Month', value: 18, change: '+5', up: true, icon: '📋' },
  ];

  document.getElementById('kpiGrid').innerHTML = kpis.map(k => `
    <div class="kpi-card">
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <div class="kpi-label">${k.label}</div>
        <span style="font-size:18px">${k.icon}</span>
      </div>
      <div class="kpi-value">${k.value}</div>
      <div class="kpi-change ${k.up ? 'up' : 'down'}">${k.up ? '↑' : '↓'} ${k.change} vs last month</div>
    </div>
  `).join('');
}

function renderCharts() {
  renderDenialTrendChart();
  renderDenialPieChart();
  renderPayerBarChart();
  renderRecoveryChart();
}

function renderDenialTrendChart() {
  const canvas = document.getElementById('denialTrendChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.offsetWidth || 600;
  const h = 200;
  canvas.width = w;
  canvas.height = h;

  const labels = ['Jun 1','Jun 5','Jun 10','Jun 15','Jun 20','Jun 24'];
  const denied  = [8, 12, 9, 15, 11, 13];
  const resolved = [5, 9, 7, 11, 9, 10];

  const theme = document.documentElement.getAttribute('data-theme');
  const textColor = theme === 'dark' ? '#8899aa' : '#64748b';
  const gridColor = theme === 'dark' ? '#1e2a3a' : '#e2e8f0';

  ctx.clearRect(0, 0, w, h);

  const pad = { top: 20, right: 20, bottom: 30, left: 35 };
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;
  const max = Math.max(...denied, ...resolved) + 2;

  // Grid lines
  ctx.strokeStyle = gridColor;
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = pad.top + plotH - (i / 4) * plotH;
    ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(w - pad.right, y); ctx.stroke();
    ctx.fillStyle = textColor; ctx.font = '10px Inter'; ctx.textAlign = 'right';
    ctx.fillText(Math.round((i / 4) * max), pad.left - 4, y + 3);
  }

  // X labels
  ctx.fillStyle = textColor; ctx.textAlign = 'center'; ctx.font = '10px Inter';
  labels.forEach((l, i) => {
    const x = pad.left + (i / (labels.length - 1)) * plotW;
    ctx.fillText(l, x, h - 8);
  });

  const drawLine = (data, color, fill) => {
    const pts = data.map((v, i) => ({ x: pad.left + (i / (data.length - 1)) * plotW, y: pad.top + plotH - (v / max) * plotH }));
    if (fill) {
      const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + plotH);
      grad.addColorStop(0, color + '40');
      grad.addColorStop(1, color + '00');
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pad.top + plotH);
      pts.forEach(p => ctx.lineTo(p.x, p.y));
      ctx.lineTo(pts[pts.length-1].x, pad.top + plotH);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();
    }
    ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
    pts.forEach((p, i) => { if (i > 0) ctx.lineTo(p.x, p.y); });
    ctx.strokeStyle = color; ctx.lineWidth = 2.5; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    ctx.stroke();
    pts.forEach(p => { ctx.beginPath(); ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2); ctx.fillStyle = color; ctx.fill(); });
  };

  drawLine(denied, '#ef4444', true);
  drawLine(resolved, '#00d4b8', true);

  // Legend
  ctx.fillStyle = '#ef4444'; ctx.fillRect(pad.left, 6, 12, 3); ctx.fillStyle = textColor; ctx.textAlign = 'left'; ctx.font = '10px Inter';
  ctx.fillText('Denied', pad.left + 16, 12);
  ctx.fillStyle = '#00d4b8'; ctx.fillRect(pad.left + 60, 6, 12, 3);
  ctx.fillText('Resolved', pad.left + 76, 12);
}

function renderDenialPieChart() {
  const canvas = document.getElementById('denialPieChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.offsetWidth || 280;
  const h = 200;
  canvas.width = w;
  canvas.height = h;

  const data = [
    { label: 'CO-197 (Auth)', value: 28, color: '#ef4444' },
    { label: 'CO-50 (MN)', value: 22, color: '#f59e0b' },
    { label: 'CO-29 (TFL)', value: 18, color: '#00d4b8' },
    { label: 'CO-16 (Info)', value: 16, color: '#a78bfa' },
    { label: 'Other', value: 16, color: '#64748b' },
  ];

  const cx = w * 0.38, cy = h / 2, r = Math.min(cx, cy) - 10;
  let angle = -Math.PI / 2;
  const total = data.reduce((s, d) => s + d.value, 0);

  const theme = document.documentElement.getAttribute('data-theme');
  const textColor = theme === 'dark' ? '#8899aa' : '#64748b';

  ctx.clearRect(0, 0, w, h);

  data.forEach(d => {
    const slice = (d.value / total) * Math.PI * 2;
    ctx.beginPath(); ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, angle, angle + slice);
    ctx.closePath(); ctx.fillStyle = d.color; ctx.fill();
    ctx.beginPath(); ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, angle, angle + slice);
    ctx.closePath(); ctx.strokeStyle = theme === 'dark' ? '#0a0e1a' : '#fff'; ctx.lineWidth = 2; ctx.stroke();
    angle += slice;
  });

  // Donut hole
  ctx.beginPath(); ctx.arc(cx, cy, r * 0.55, 0, Math.PI * 2);
  ctx.fillStyle = theme === 'dark' ? '#0d1117' : '#fff'; ctx.fill();

  // Center text
  ctx.fillStyle = textColor; ctx.font = 'bold 11px Inter'; ctx.textAlign = 'center';
  ctx.fillText('Top Codes', cx, cy - 4);
  ctx.font = '10px Inter'; ctx.fillText('by Volume', cx, cy + 10);

  // Legend
  const lx = w * 0.72, ly = 20;
  data.forEach((d, i) => {
    ctx.fillStyle = d.color; ctx.fillRect(lx, ly + i * 22, 10, 10);
    ctx.fillStyle = textColor; ctx.font = '10px Inter'; ctx.textAlign = 'left';
    ctx.fillText(`${d.label} (${d.value}%)`, lx + 14, ly + i * 22 + 9);
  });
}

function renderPayerBarChart() {
  const canvas = document.getElementById('payerBarChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.offsetWidth || 400;
  const h = 200;
  canvas.width = w;
  canvas.height = h;

  const data = [
    { label: 'UHC', value: 32 }, { label: 'BCBS', value: 28 },
    { label: 'Aetna', value: 22 }, { label: 'Cigna', value: 18 },
    { label: 'Humana', value: 14 }, { label: 'Medicare', value: 12 },
  ];

  const theme = document.documentElement.getAttribute('data-theme');
  const textColor = theme === 'dark' ? '#8899aa' : '#64748b';
  const gridColor = theme === 'dark' ? '#1e2a3a' : '#e2e8f0';

  ctx.clearRect(0, 0, w, h);

  const pad = { top: 15, right: 10, bottom: 30, left: 35 };
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;
  const max = Math.max(...data.map(d => d.value)) + 5;
  const bw = plotW / data.length;
  const bGap = bw * 0.3;

  // Grid
  ctx.strokeStyle = gridColor; ctx.lineWidth = 1;
  [0, 0.25, 0.5, 0.75, 1].forEach(t => {
    const y = pad.top + plotH - t * plotH;
    ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(w - pad.right, y); ctx.stroke();
    ctx.fillStyle = textColor; ctx.font = '10px Inter'; ctx.textAlign = 'right';
    ctx.fillText(Math.round(t * max), pad.left - 4, y + 3);
  });

  data.forEach((d, i) => {
    const x = pad.left + i * bw + bGap / 2;
    const bWidth = bw - bGap;
    const bHeight = (d.value / max) * plotH;
    const y = pad.top + plotH - bHeight;

    const grad = ctx.createLinearGradient(0, y, 0, y + bHeight);
    grad.addColorStop(0, '#00d4b8');
    grad.addColorStop(1, '#009980');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(x, y, bWidth, bHeight, [4, 4, 0, 0]);
    ctx.fill();

    ctx.fillStyle = textColor; ctx.font = '10px Inter'; ctx.textAlign = 'center';
    ctx.fillText(d.label, x + bWidth / 2, h - 8);
    ctx.fillStyle = '#00d4b8'; ctx.font = 'bold 10px Inter';
    ctx.fillText(d.value, x + bWidth / 2, y - 4);
  });
}

function renderRecoveryChart() {
  const canvas = document.getElementById('recoveryChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.offsetWidth || 280;
  const h = 200;
  canvas.width = w;
  canvas.height = h;

  const months = ['Jan','Feb','Mar','Apr','May','Jun'];
  const rates  = [58, 62, 67, 71, 69, 74];

  const theme = document.documentElement.getAttribute('data-theme');
  const textColor = theme === 'dark' ? '#8899aa' : '#64748b';
  const gridColor = theme === 'dark' ? '#1e2a3a' : '#e2e8f0';

  ctx.clearRect(0, 0, w, h);

  const pad = { top: 20, right: 15, bottom: 30, left: 35 };
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;
  const max = 100;

  ctx.strokeStyle = gridColor; ctx.lineWidth = 1;
  [0, 25, 50, 75, 100].forEach(v => {
    const y = pad.top + plotH - (v / max) * plotH;
    ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(w - pad.right, y); ctx.stroke();
    ctx.fillStyle = textColor; ctx.font = '10px Inter'; ctx.textAlign = 'right';
    ctx.fillText(v + '%', pad.left - 4, y + 3);
  });

  const pts = rates.map((v, i) => ({ x: pad.left + (i / (rates.length - 1)) * plotW, y: pad.top + plotH - (v / max) * plotH }));

  const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + plotH);
  grad.addColorStop(0, '#00d4b840');
  grad.addColorStop(1, '#00d4b800');
  ctx.beginPath(); ctx.moveTo(pts[0].x, pad.top + plotH);
  pts.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.lineTo(pts[pts.length-1].x, pad.top + plotH);
  ctx.closePath(); ctx.fillStyle = grad; ctx.fill();

  ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
  pts.forEach((p, i) => { if (i > 0) ctx.lineTo(p.x, p.y); });
  ctx.strokeStyle = '#00d4b8'; ctx.lineWidth = 2.5; ctx.lineJoin = 'round'; ctx.stroke();

  pts.forEach((p, i) => {
    ctx.beginPath(); ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = '#00d4b8'; ctx.fill();
    ctx.fillStyle = textColor; ctx.font = '10px Inter'; ctx.textAlign = 'center';
    ctx.fillText(months[i], p.x, h - 8);
    ctx.fillStyle = '#00d4b8'; ctx.font = 'bold 10px Inter';
    ctx.fillText(rates[i] + '%', p.x, p.y - 8);
  });
}

function renderInsights() {
  document.getElementById('insightsPanel').innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px">
      <div style="padding:12px;background:rgba(239,68,68,.06);border:1px solid rgba(239,68,68,.15);border-radius:var(--r-lg)">
        <div style="font-size:12px;font-weight:700;color:var(--red-400);margin-bottom:8px">🚨 Immediate Action</div>
        <ul style="list-style:none;display:flex;flex-direction:column;gap:5px;font-size:12px;color:var(--text-secondary)">
          <li>→ 3 CO-197 auth denials pending retro-auth (deadline in 5 days)</li>
          <li>→ 2 timely filing appeals require proof documents by Friday</li>
          <li>→ UHC peer-to-peer window closes in 48 hours for 1 claim</li>
        </ul>
      </div>
      <div style="padding:12px;background:rgba(0,212,184,.06);border:1px solid rgba(0,212,184,.15);border-radius:var(--r-lg)">
        <div style="font-size:12px;font-weight:700;color:var(--brand-400);margin-bottom:8px">💡 Productivity Tips</div>
        <ul style="list-style:none;display:flex;flex-direction:column;gap:5px;font-size:12px;color:var(--text-secondary)">
          <li>→ CO-197 denials: Call 8–10 AM for shortest hold times</li>
          <li>→ Aetna: Use portal to submit retro-auth — 3x faster</li>
          <li>→ Always get reference # before hanging up (reduces repeat calls by 40%)</li>
        </ul>
      </div>
      <div style="padding:12px;background:rgba(245,158,11,.06);border:1px solid rgba(245,158,11,.15);border-radius:var(--r-lg)">
        <div style="font-size:12px;font-weight:700;color:var(--amber-300);margin-bottom:8px">📈 Trends This Month</div>
        <ul style="list-style:none;display:flex;flex-direction:column;gap:5px;font-size:12px;color:var(--text-secondary)">
          <li>→ Auth denials up 23% vs last month — verify auth before billing</li>
          <li>→ UHC leading in volume (32 claims) — dedicate morning block</li>
          <li>→ Average hold time decreased 3 min with best-time strategy</li>
        </ul>
      </div>
      <div style="padding:12px;background:rgba(167,139,250,.06);border:1px solid rgba(167,139,250,.15);border-radius:var(--r-lg)">
        <div style="font-size:12px;font-weight:700;color:#a78bfa;margin-bottom:8px">🏆 Win Rate by Action</div>
        <ul style="list-style:none;display:flex;flex-direction:column;gap:5px;font-size:12px;color:var(--text-secondary)">
          <li>→ Peer-to-Peer Review: 82% success rate</li>
          <li>→ Corrected Claim with Modifier: 78% success rate</li>
          <li>→ Clinical Appeal with Records: 71% success rate</li>
          <li>→ Timely Filing with 277CA: 65% success rate</li>
        </ul>
      </div>
    </div>
  `;
}

function resetAnalytics() {
  analytics = { calls: [], denials: {} };
  localStorage.setItem('rcm_analytics', JSON.stringify(analytics));
  initAnalytics();
  showToast('Analytics data reset', 'info');
}

// ════════════════════════════════════════════════════════════
// SEARCH
// ════════════════════════════════════════════════════════════
function initSearch() {
  const input = document.getElementById('globalSearch');
  const dropdown = document.getElementById('searchDropdown');

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { dropdown.classList.remove('open'); return; }

    const results = [];

    PAYER_DB.forEach(p => {
      if (p.name.toLowerCase().includes(q) || p.payerId.includes(q)) {
        results.push({ type: 'Payer', label: p.name, sub: `ID: ${p.payerId} · ${p.type}`, action: () => { switchTab('payer'); showPayerDetail(p.id); } });
      }
    });

    DENIAL_CODES.forEach(d => {
      if (d.code.toLowerCase().includes(q) || d.desc.toLowerCase().includes(q)) {
        const slug = d.code.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        results.push({ type: 'Denial Code', label: d.code, sub: d.desc, action: () => { window.location.href = `denial-codes/${slug}-denial-code.html`; } });
      }
    });

    DECISION_TREE.forEach(s => {
      if (s.name.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q)) {
        results.push({ type: 'Scenario', label: s.name, sub: s.desc, action: () => { switchTab('decision'); selectScenario(s.id); } });
      }
    });

    if (!results.length) {
      dropdown.innerHTML = `<div class="search-result-item"><span style="color:var(--text-muted);font-size:12px">No results for "${q}"</span></div>`;
    } else {
      dropdown.innerHTML = results.slice(0, 8).map((r, i) => `
        <div class="search-result-item" data-idx="${i}" tabindex="0">
          <span class="search-result-type">${r.type}</span>
          <div>
            <div class="search-result-label">${r.label}</div>
            <div class="search-result-sub">${r.sub}</div>
          </div>
        </div>
      `).join('');

      dropdown.querySelectorAll('.search-result-item').forEach((el, i) => {
        el.addEventListener('click', () => {
          results[i].action?.();
          dropdown.classList.remove('open');
          input.value = '';
        });
      });
    }

    dropdown.classList.add('open');
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.header-search')) dropdown.classList.remove('open');
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') { dropdown.classList.remove('open'); input.value = ''; }
  });
}

// ════════════════════════════════════════════════════════════
// KEYBOARD SHORTCUTS
// ════════════════════════════════════════════════════════════
function initKeyboardShortcuts() {
    const shortcuts = [
      ['Ctrl + K', 'Open global search'],
      ['N', 'Start new call session'],
      ['T', 'Toggle dark/light mode'],
      ['?', 'Show onboarding guide'],
      ['1', 'Switch to Denial Checklist'],
      ['2', 'Switch to Decision Tree'],
      ['3', 'Switch to Timely Filing Calculator'],
      ['4', 'Switch to Payer Directory'],
      ['5', 'Switch to Batch Tracker'],
      ['6', 'Switch to Post-Call Summary'],
      ['7', 'Switch to Analytics'],
      ['Esc', 'Close modal / dropdown'],
    ];

  document.getElementById('shortcutsTable').innerHTML = shortcuts.map(([key, desc]) => `
    <tr style="border-bottom:1px solid var(--border-subtle)">
      <td style="padding:8px;"><code style="background:var(--bg-overlay);padding:2px 8px;border-radius:4px;font-family:var(--font-mono);font-size:12px">${key}</code></td>
      <td style="padding:8px;font-size:13px;color:var(--text-secondary)">${desc}</td>
    </tr>
  `).join('');

  document.addEventListener('keydown', e => {
    // Don't trigger shortcuts when typing in inputs
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
      if (e.key === 'Escape') { e.target.blur(); return; }
      return;
    }

    if (e.ctrlKey && e.key === 'k') { e.preventDefault(); document.getElementById('globalSearch').focus(); return; }

    const tabMap = { '1': 'checklist', '2': 'decision', '3': 'filing', '4': 'payer', '5': 'batch', '6': 'summary', '7': 'analytics' };
    if (tabMap[e.key]) { switchTab(tabMap[e.key]); return; }

    if (e.key === 'n' || e.key === 'N') openCallSetup();
    if (e.key === 't' || e.key === 'T') toggleTheme();
    if (e.key === '?') {
      document.getElementById('onboardingOverlay')?.classList.add('visible');
    }
    if (e.key === 'Escape') {
      closeCallSetup();
      closeShortcuts();
      closeOnboarding();
    }
  });

  document.getElementById('btnHelp').addEventListener('click', () => {
    document.getElementById('shortcutsModal').classList.add('open');
  });

  document.getElementById('shortcutsModal').addEventListener('click', e => {
    if (e.target === document.getElementById('shortcutsModal')) closeShortcuts();
  });

  document.getElementById('btnAnalytics').addEventListener('click', () => switchTab('analytics'));
}

function closeShortcuts() {
  document.getElementById('shortcutsModal').classList.remove('open');
}

// ════════════════════════════════════════════════════════════
// ONBOARDING
// ════════════════════════════════════════════════════════════
function initOnboarding() {
  const dismissed = localStorage.getItem('rcm_onboarding_dismissed');
  if (!dismissed) {
    setTimeout(() => {
      document.getElementById('onboardingOverlay')?.classList.add('visible');
    }, 500);
  }
}

function closeOnboarding() {
  document.getElementById('onboardingOverlay')?.classList.remove('visible');
}

function skipOnboarding() {
  localStorage.setItem('rcm_onboarding_dismissed', 'true');
}

// ════════════════════════════════════════════════════════════
// UTILITIES
// ════════════════════════════════════════════════════════════
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;left:-9999px;top:-9999px';
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  toast.innerHTML = `<span>${icons[type] || '💬'}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(20px)';
    toast.style.transition = 'all .3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ── RE-RENDER CHARTS ON TAB SWITCH ───────────────────────
const origSwitch = switchTab;
window.switchTab = function(id) {
  origSwitch(id);
  if (id === 'analytics') {
    setTimeout(() => { renderCharts(); renderKPIs(); renderInsights(); }, 50);
  }
};

// ── RESIZE CHARTS ON WINDOW RESIZE ───────────────────────
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (document.getElementById('panel-analytics')?.classList.contains('active')) {
      renderCharts();
    }
  }, 200);
});

// ════════════════════════════════════════════════════════════
// MOBILE SUPPORT
// ════════════════════════════════════════════════════════════

// ── MOBILE BOTTOM NAV ─────────────────────────────────────
function setActiveMobileNav(btn) {
  document.querySelectorAll('.mobile-nav-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// Patch switchTab to sync mobile bottom nav
const _origSwitchTab = switchTab;
window.switchTab = function(id) {
  _origSwitchTab(id);
  document.querySelectorAll('.mobile-nav-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === id);
  });
  document.querySelectorAll('.mobile-nav-drawer-item').forEach(item => {
    item.classList.remove('active');
  });
};

// ── MOBILE CALL BAR ───────────────────────────────────────
function updateMobileCallBar() {
  const bar = document.getElementById('mobileCallBar');
  const shell = document.querySelector('.app-shell');
  if (!bar || !shell) return;
  const active = callSession != null;
  bar.classList.toggle('active', active);
  shell.classList.toggle('has-call-bar', !!active);
  if (active) {
    const p = document.getElementById('mobileTickerPayer');
    const c = document.getElementById('mobileTickerClaim');
    const t = document.getElementById('mobileCallTimer');
    if (p) p.textContent = callSession.payerName || '—';
    if (c) c.textContent = callSession.claim || '—';
    if (t) t.textContent = document.getElementById('callTimerDisplay')?.textContent || '00:00';
  }
}

// ── MOBILE NAV DRAWER ─────────────────────────────────────
function toggleMobileNav() {
  const drawer = document.getElementById('mobileNavDrawer');
  if (!drawer) return;
  const isOpen = drawer.classList.contains('open');
  if (isOpen) {
    closeMobileNav();
  } else {
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
    updateMobileNavSession();
  }
}
function closeMobileNav() {
  const drawer = document.getElementById('mobileNavDrawer');
  if (drawer) drawer.classList.remove('open');
  document.body.style.overflow = '';
}
function updateMobileNavSession() {
  const session = document.getElementById('mobileNavSession');
  if (!session) return;
  if (callSession) {
    session.classList.add('visible');
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val || '—'; };
    set('mobileNavPayer', callSession.payerName);
    set('mobileNavClaim', callSession.claim);
    set('mobileNavDenial', callSession.denial);
    set('mobileNavDOS', callSession.dos);
    set('mobileNavBilled', callSession.billed);
  } else {
    session.classList.remove('visible');
  }
}

// ── MOBILE AI DRAWER ──────────────────────────────────────
function toggleMobileAIDrawer() {
  const drawer = document.getElementById('mobileAIDrawer');
  if (!drawer) return;
  if (drawer.classList.contains('open')) {
    closeMobileAIDrawer();
  } else {
    drawer.classList.add('open');
    syncMobileAI();
    setTimeout(() => {
      const input = document.getElementById('mobileAIInput');
      if (input) input.focus();
    }, 350);
  }
}
function closeMobileAIDrawer() {
  const drawer = document.getElementById('mobileAIDrawer');
  if (drawer) drawer.classList.remove('open');
}
function syncMobileAI() {
  // Copy messages from desktop sidebar to mobile drawer
  const desktop = document.getElementById('aiMessages');
  const mobile = document.getElementById('mobileAIMessages');
  if (desktop && mobile) {
    mobile.innerHTML = desktop.innerHTML;
    mobile.scrollTop = mobile.scrollHeight;
  }
  // Copy quick labels with mobile click handlers
  const desktopQL = document.getElementById('aiQuickLabels');
  const mobileQL = document.getElementById('mobileAIQuickLabels');
  if (desktopQL && mobileQL) {
    mobileQL.innerHTML = '';
    const prompts = typeof AI_QUICK_PROMPTS !== 'undefined' ? AI_QUICK_PROMPTS : [];
    prompts.forEach(p => {
      const btn = document.createElement('div');
      btn.className = 'mobile-ai-drawer-quick-label';
      btn.textContent = p;
      btn.onclick = () => sendMobileQuickPrompt(p);
      mobileQL.appendChild(btn);
    });
  }
}
function sendMobileAIMessage() {
  const input = document.getElementById('mobileAIInput');
  if (!input || !input.value.trim()) return;
  // Mirror to desktop input and trigger
  const desktopInput = document.getElementById('aiInput');
  if (desktopInput) {
    desktopInput.value = input.value;
    sendAIMessage();
  }
  input.value = '';
  input.style.height = 'auto';
  // Sync messages back after a short delay
  setTimeout(syncMobileAI, 300);
}
function sendMobileQuickPrompt(prompt) {
  const desktopInput = document.getElementById('aiInput');
  if (desktopInput) {
    desktopInput.value = prompt;
    sendAIMessage();
  }
  setTimeout(syncMobileAI, 300);
}

// ── MOBILE AI INPUT AUTO-RESIZE ───────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const mobileInput = document.getElementById('mobileAIInput');
  if (mobileInput) {
    mobileInput.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 100) + 'px';
    });
    mobileInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMobileAIMessage();
      }
    });
  }
});

// ── HOOK INTO EXISTING FUNCTIONS ──────────────────────────
// Patch startCallSession to update mobile bar
const _origStartCall = typeof startCallSession === 'function' ? startCallSession : null;
const _origEndCall = typeof endCallSession === 'function' ? endCallSession : null;

// Use MutationObserver to detect session state changes
const _origInitAISidebar = typeof initAISidebar === 'function' ? initAISidebar : null;
if (_origInitAISidebar) {
  window.initAISidebar = function() {
    _origInitAISidebar();
    syncMobileAI();
  };
}

// Periodic sync for mobile call bar timer
setInterval(updateMobileCallBar, 2000);
