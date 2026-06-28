/* ============================================================
   RCM DENIALS � SHARED DATA
   Used by all standalone tool pages
   ============================================================ */
'use strict';

var PAYER_DB = [
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
  {
    id: 'BCBS-MI', name: 'Blue Cross Blue Shield of Michigan', abbr: 'BCBSMI',
    payerId: '39072', type: 'Commercial', states: ["MI"],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      'Claims': { phone: '(800) 673-4732', fax: '(800) 932-0783', address: 'PO Box 6790, Detroit, MI 48232', portal: 'https://www.bcbsm.com/provider' },
      'Appeals': { phone: '(800) 673-4732 opt 2', fax: '(800) 932-0784', address: 'PO Box 6795, Detroit, MI 48232', portal: 'https://www.bcbsm.com/provider/appeals' },
      'Authorization': { phone: '(800) 673-4732 opt 3', fax: '(800) 932-0785', address: 'Auth Dept, Detroit, MI 48232', portal: 'https://www.bcbsm.com/provider/auth' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 673-4732' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Enter Claim #', detail: 'Or member ID' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '18 min', bestTime: '8–10 AM EST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'BCBS-MA', name: 'Blue Cross Blue Shield of Massachusetts', abbr: 'BCBSMA',
    payerId: '39147', type: 'Commercial', states: ["MA"],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      'Claims': { phone: '(800) 326-4331', fax: '(617) 246-3001', address: '501 Boylston St, Boston, MA 02116', portal: 'https://www.bcbsma.com/provider' },
      'Appeals': { phone: '(800) 326-4331 opt 2', fax: '(617) 246-3002', address: 'Appeals Dept, Boston, MA 02116', portal: 'https://www.bcbsma.com/provider/appeals' },
      'Authorization': { phone: '(800) 326-4331 opt 3', fax: '(617) 246-3003', address: 'Auth Dept, Boston, MA 02116', portal: 'https://www.bcbsma.com/provider/auth' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 326-4331' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '15 min', bestTime: '9–11 AM EST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'BCBS-NC', name: 'Blue Cross Blue Shield of North Carolina', abbr: 'BCBSNC',
    payerId: '39019', type: 'Commercial', states: ["NC"],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      'Claims': { phone: '(800) 214-4884', fax: '(800) 443-7854', address: 'PO Box 2291, Durham, NC 27702', portal: 'https://www.bcbsnc.com/provider' },
      'Appeals': { phone: '(800) 214-4884 opt 2', fax: '(800) 443-7855', address: 'Appeals Dept, Durham, NC 27702', portal: 'https://www.bcbsnc.com/provider/appeals' },
      'Authorization': { phone: '(800) 214-4884 opt 3', fax: '(800) 443-7856', address: 'Auth Dept, Durham, NC 27702', portal: 'https://www.bcbsnc.com/provider/auth' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 214-4884' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '16 min', bestTime: '8–10 AM EST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'BCBS-AL', name: 'Blue Cross Blue Shield of Alabama', abbr: 'BCBSAL',
    payerId: '39024', type: 'Commercial', states: ["AL"],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      'Claims': { phone: '(800) 292-8868', fax: '(205) 988-2685', address: '450 Riverchase Pkwy E, Hoover, AL 35244', portal: 'https://www.bcbsal.org/provider' },
      'Appeals': { phone: '(800) 292-8868 opt 2', fax: '(205) 988-2686', address: 'Appeals Dept, Hoover, AL 35244', portal: 'https://www.bcbsal.org/provider/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 292-8868' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '14 min', bestTime: '9–11 AM CST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'CAPITAL-BC', name: 'Capital Blue Cross', abbr: 'CBC',
    payerId: '39033', type: 'Commercial', states: ["PA"],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      'Claims': { phone: '(800) 962-2242', fax: '(717) 541-7820', address: '2000 Technology Pkwy, Camp Hill, PA 17011', portal: 'https://www.capitalbluecross.com/provider' },
      'Appeals': { phone: '(800) 962-2242 opt 2', fax: '(717) 541-7821', address: 'Appeals Dept, Camp Hill, PA 17011', portal: 'https://www.capitalbluecross.com/provider/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 962-2242' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '12 min', bestTime: '9–11 AM EST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'EXCELLUS', name: 'Excellus BlueCross BlueShield', abbr: 'EXBCBS',
    payerId: '39055', type: 'Commercial', states: ["NY"],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      'Claims': { phone: '(800) 523-5285', fax: '(585) 238-5500', address: 'PO Box 25000, Rochester, NY 14625', portal: 'https://www.excellusbcbs.com/provider' },
      'Appeals': { phone: '(800) 523-5285 opt 2', fax: '(585) 238-5501', address: 'Appeals Dept, Rochester, NY 14625', portal: 'https://www.excellusbcbs.com/provider/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 523-5285' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '17 min', bestTime: '8–10 AM EST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'BCBS-AZ', name: 'Blue Cross Blue Shield of Arizona', abbr: 'BCBSAZ',
    payerId: '39003', type: 'Commercial', states: ["AZ"],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      'Claims': { phone: '(800) 232-8147', fax: '(602) 864-4510', address: 'PO Box 2960, Phoenix, AZ 85062', portal: 'https://www.bcbsaz.com/provider' },
      'Appeals': { phone: '(800) 232-8147 opt 2', fax: '(602) 864-4511', address: 'Appeals Dept, Phoenix, AZ 85062', portal: 'https://www.bcbsaz.com/provider/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 232-8147' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '15 min', bestTime: '8–10 AM MST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'BCBS-KS', name: 'Blue Cross Blue Shield of Kansas', abbr: 'BCBSKS',
    payerId: '39012', type: 'Commercial', states: ["KS"],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      'Claims': { phone: '(800) 432-0194', fax: '(785) 291-4645', address: '1133 SW Topeka Blvd, Topeka, KS 66629', portal: 'https://www.bcbsks.com/provider' },
      'Appeals': { phone: '(800) 432-0194 opt 2', fax: '(785) 291-4646', address: 'Appeals Dept, Topeka, KS 66629', portal: 'https://www.bcbsks.com/provider/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 432-0194' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '12 min', bestTime: '9–11 AM CST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'BCBS-LA', name: 'Blue Cross Blue Shield of Louisiana', abbr: 'BCBSLA',
    payerId: '39014', type: 'Commercial', states: ["LA"],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      'Claims': { phone: '(800) 421-2617', fax: '(225) 295-5580', address: 'PO Box 8050, Baton Rouge, LA 70821', portal: 'https://www.bcbsla.com/provider' },
      'Appeals': { phone: '(800) 421-2617 opt 2', fax: '(225) 295-5581', address: 'Appeals Dept, Baton Rouge, LA 70821', portal: 'https://www.bcbsla.com/provider/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 421-2617' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '14 min', bestTime: '9–11 AM CST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'BCBS-IL', name: 'Blue Cross Blue Shield of Illinois (HCSC)', abbr: 'BCBSIL',
    payerId: '84980', type: 'Commercial', states: ["IL"],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      'Claims': { phone: '(800) 332-3450', fax: '(800) 539-6750', address: 'PO Box 8075, Wood Dale, IL 60191', portal: 'https://www.bcbsil.com/provider' },
      'Appeals': { phone: '(800) 332-3450 opt 2', fax: '(800) 539-6751', address: 'Appeals Dept, Wood Dale, IL 60191', portal: 'https://www.bcbsil.com/provider/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 332-3450' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '20 min', bestTime: '8–10 AM CST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'BCBS-OK', name: 'Blue Cross Blue Shield of Oklahoma (HCSC)', abbr: 'BCBSOK',
    payerId: '84980', type: 'Commercial', states: ["OK"],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      'Claims': { phone: '(800) 982-7170', fax: '(405) 523-4000', address: 'PO Box 268009, Oklahoma City, OK 73126', portal: 'https://www.bcbsok.com/provider' },
      'Appeals': { phone: '(800) 982-7170 opt 2', fax: '(405) 523-4001', address: 'Appeals Dept, Oklahoma City, OK 73126', portal: 'https://www.bcbsok.com/provider/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 982-7170' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '16 min', bestTime: '8–10 AM CST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'BCBS-NM', name: 'Blue Cross Blue Shield of New Mexico', abbr: 'BCBSNM',
    payerId: '39030', type: 'Commercial', states: ["NM"],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      'Claims': { phone: '(800) 432-0194', fax: '(505) 837-4400', address: 'PO Box 27360, Albuquerque, NM 87125', portal: 'https://www.bcbsnm.com/provider' },
      'Appeals': { phone: '(800) 432-0194 opt 2', fax: '(505) 837-4401', address: 'Appeals Dept, Albuquerque, NM 87125', portal: 'https://www.bcbsnm.com/provider/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 432-0194' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '14 min', bestTime: '9–11 AM MST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'BCBS-MT', name: 'Blue Cross Blue Shield of Montana', abbr: 'BCBSMT',
    payerId: '39026', type: 'Commercial', states: ["MT"],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      'Claims': { phone: '(800) 447-7860', fax: '(406) 437-5600', address: '525 10th Ave S, Billings, MT 59102', portal: 'https://www.bcbsmt.com/provider' },
      'Appeals': { phone: '(800) 447-7860 opt 2', fax: '(406) 437-5601', address: 'Appeals Dept, Billings, MT 59102', portal: 'https://www.bcbsmt.com/provider/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 447-7860' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '12 min', bestTime: '9–11 AM MST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'OSCAR', name: 'Oscar Health', abbr: 'OSCR',
    payerId: '52298', type: 'Commercial', states: ["CA", "FL", "IL", "NJ", "NY", "TX", "WI"],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      'Claims': { phone: '(855) 672-2777', fax: '(855) 672-2778', address: 'PO Box 207003, Austin, TX 78720', portal: 'https://www.hioscar.com/provider' },
      'Appeals': { phone: '(855) 672-2777 opt 2', fax: '(855) 672-2779', address: 'Appeals Dept, Austin, TX 78720', portal: 'https://www.hioscar.com/provider/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(855) 672-2777' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '10 min', bestTime: '9–11 AM EST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'EMBLEM', name: 'EmblemHealth', abbr: 'EMBL',
    payerId: '52300', type: 'Commercial', states: ["NY", "CT", "NJ"],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      'Claims': { phone: '(800) 624-2414', fax: '(212) 510-5500', address: '55 Water St, New York, NY 10041', portal: 'https://www.emblemhealth.com/provider' },
      'Appeals': { phone: '(800) 624-2414 opt 2', fax: '(212) 510-5501', address: 'Appeals Dept, New York, NY 10041', portal: 'https://www.emblemhealth.com/provider/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 624-2414' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '20 min', bestTime: '8–10 AM EST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'HARVARD', name: 'Harvard Pilgrim Health Care', abbr: 'HPHC',
    payerId: '52301', type: 'Commercial', states: ["ME", "MA", "NH", "CT"],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      'Claims': { phone: '(800) 343-4244', fax: '(617) 482-8640', address: '93 Worcester St, Wellesley, MA 02481', portal: 'https://www.harvardpilgrim.org/provider' },
      'Appeals': { phone: '(800) 343-4244 opt 2', fax: '(617) 482-8641', address: 'Appeals Dept, Wellesley, MA 02481', portal: 'https://www.harvardpilgrim.org/provider/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 343-4244' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '14 min', bestTime: '9–11 AM EST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'TUFTS', name: 'Tufts Health Plan', abbr: 'TUFTS',
    payerId: '52302', type: 'Commercial', states: ["MA", "NH", "RI"],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      'Claims': { phone: '(800) 831-4300', fax: '(617) 972-9300', address: 'One Wellness Way, Canton, MA 02021', portal: 'https://www.tuftshealthplan.com/provider' },
      'Appeals': { phone: '(800) 831-4300 opt 2', fax: '(617) 972-9301', address: 'Appeals Dept, Canton, MA 02021', portal: 'https://www.tuftshealthplan.com/provider/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 831-4300' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '13 min', bestTime: '9–11 AM EST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'PRIORITY', name: 'Priority Health', abbr: 'PRIO',
    payerId: '52303', type: 'Commercial', states: ["MI"],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      'Claims': { phone: '(800) 942-0751', fax: '(616) 942-4550', address: '1231 E Beltline Ave SE, Grand Rapids, MI 49506', portal: 'https://www.priorityhealth.com/provider' },
      'Appeals': { phone: '(800) 942-0751 opt 2', fax: '(616) 942-4551', address: 'Appeals Dept, Grand Rapids, MI 49506', portal: 'https://www.priorityhealth.com/provider/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 942-0751' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '12 min', bestTime: '8–10 AM EST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'MEDMUTUAL', name: 'Medical Mutual', abbr: 'MEDM',
    payerId: '52304', type: 'Commercial', states: ["OH", "IN", "KY", "WV"],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      'Claims': { phone: '(800) 882-7782', fax: '(216) 687-7000', address: '2060 E 30th St, Cleveland, OH 44115', portal: 'https://www.medmutual.com/provider' },
      'Appeals': { phone: '(800) 882-7782 opt 2', fax: '(216) 687-7001', address: 'Appeals Dept, Cleveland, OH 44115', portal: 'https://www.medmutual.com/provider/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 882-7782' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '15 min', bestTime: '8–10 AM EST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'MVP', name: 'MVP Health Care', abbr: 'MVP',
    payerId: '52305', type: 'Commercial', states: ["NY", "VT", "NH"],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      'Claims': { phone: '(800) 665-8761', fax: '(518) 373-2600', address: '625 Albany Shaker Rd, Latham, NY 12110', portal: 'https://www.mvphealthcare.com/provider' },
      'Appeals': { phone: '(800) 665-8761 opt 2', fax: '(518) 373-2601', address: 'Appeals Dept, Latham, NY 12110', portal: 'https://www.mvphealthcare.com/provider/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 665-8761' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '14 min', bestTime: '9–11 AM EST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'PROVIDENCE', name: 'Providence Health Plan', abbr: 'PROV',
    payerId: '52306', type: 'Commercial', states: ["OR", "WA", "MT", "CA", "AK"],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      'Claims': { phone: '(800) 332-1188', fax: '(503) 574-5555', address: '4400 NE Halsey St, Portland, OR 97213', portal: 'https://www.providence.org/provider' },
      'Appeals': { phone: '(800) 332-1188 opt 2', fax: '(503) 574-5556', address: 'Appeals Dept, Portland, OR 97213', portal: 'https://www.providence.org/provider/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 332-1188' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '16 min', bestTime: '8–10 AM PST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'DEAN', name: 'Dean Health Plan', abbr: 'DEAN',
    payerId: '52307', type: 'Commercial', states: ["WI"],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      'Claims': { phone: '(800) 279-0452', fax: '(608) 250-1200', address: '1 South Pinckney St, Madison, WI 53703', portal: 'https://www.deancare.com/provider' },
      'Appeals': { phone: '(800) 279-0452 opt 2', fax: '(608) 250-1201', address: 'Appeals Dept, Madison, WI 53703', portal: 'https://www.deancare.com/provider/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 279-0452' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '11 min', bestTime: '9–11 AM CST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'QUARTZ', name: 'Quartz Health Solutions', abbr: 'QUARTZ',
    payerId: '52308', type: 'Commercial', states: ["WI", "IL", "IA"],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      'Claims': { phone: '(800) 362-3331', fax: '(608) 274-5200', address: '1 S Pinckney St, Madison, WI 53703', portal: 'https://www.quartz-health.com/provider' },
      'Appeals': { phone: '(800) 362-3331 opt 2', fax: '(608) 274-5201', address: 'Appeals Dept, Madison, WI 53703', portal: 'https://www.quartz-health.com/provider/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 362-3331' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '13 min', bestTime: '9–11 AM CST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'UCARE', name: 'UCare', abbr: 'UCARE',
    payerId: '52309', type: 'Commercial', states: ["MN", "WI", "CT"],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      'Claims': { phone: '(800) 551-3732', fax: '(612) 884-2300', address: '4200 W 70th St, Minneapolis, MN 55435', portal: 'https://www.u-care.com/provider' },
      'Appeals': { phone: '(800) 551-3732 opt 2', fax: '(612) 884-2301', address: 'Appeals Dept, Minneapolis, MN 55435', portal: 'https://www.u-care.com/provider/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 551-3732' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '12 min', bestTime: '9–11 AM CST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'SANFORD', name: 'Sanford Health Plan', abbr: 'SANF',
    payerId: '52310', type: 'Commercial', states: ["ND", "SD", "MN", "IA"],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      'Claims': { phone: '(888) 276-2400', fax: '(701) 280-2300', address: '4600 13th Ave S, Fargo, ND 58121', portal: 'https://www.sanfordhealthplan.com/provider' },
      'Appeals': { phone: '(888) 276-2400 opt 2', fax: '(701) 280-2301', address: 'Appeals Dept, Fargo, ND 58121', portal: 'https://www.sanfordhealthplan.com/provider/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(888) 276-2400' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '11 min', bestTime: '9–11 AM CST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'MERIDIAN', name: 'Meridian Health Plan', abbr: 'MER',
    payerId: '52311', type: 'Medicaid', states: ["IL", "MI", "OH"],
    timelyFiling: { initial: 180, appeal: 60, corrected: 180 },
    departments: {
      'Claims': { phone: '(866) 606-4630', fax: '(312) 738-1010', address: '111 E Wacker Dr, Chicago, IL 60601', portal: 'https://www.healthlinc.com/provider' },
      'Appeals': { phone: '(866) 606-4630 opt 2', fax: '(312) 738-1011', address: 'Appeals Dept, Chicago, IL 60601', portal: 'https://www.healthlinc.com/provider/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(866) 606-4630' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '18 min', bestTime: '9–11 AM CST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'BUCKEYE', name: 'Buckeye Health Plan', abbr: 'BUCK',
    payerId: '52312', type: 'Medicaid', states: ["OH", "AZ"],
    timelyFiling: { initial: 180, appeal: 60, corrected: 180 },
    departments: {
      'Claims': { phone: '(866) 549-8546', fax: '(614) 487-5000', address: '875 Central Ave, Suite 500, Cincinnati, OH 45202', portal: 'https://www.buckeyehealthplan.com/provider' },
      'Appeals': { phone: '(866) 549-8546 opt 2', fax: '(614) 487-5001', address: 'Appeals Dept, Cincinnati, OH 45202', portal: 'https://www.buckeyehealthplan.com/provider/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(866) 549-8546' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '16 min', bestTime: '9–11 AM EST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'SUNSHINE', name: 'Sunshine Health', abbr: 'SUN',
    payerId: '52313', type: 'Medicaid', states: ["FL"],
    timelyFiling: { initial: 180, appeal: 60, corrected: 180 },
    departments: {
      'Claims': { phone: '(866) 439-4896', fax: '(954) 377-5500', address: '1301 Concord Ter, Sunrise, FL 33323', portal: 'https://www.sunshinehealth.com/provider' },
      'Appeals': { phone: '(866) 439-4896 opt 2', fax: '(954) 377-5501', address: 'Appeals Dept, Sunrise, FL 33323', portal: 'https://www.sunshinehealth.com/provider/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(866) 439-4896' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '15 min', bestTime: '9–11 AM EST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'SUPERIOR', name: 'Superior HealthPlan', abbr: 'SUP',
    payerId: '52314', type: 'Medicaid', states: ["TX"],
    timelyFiling: { initial: 180, appeal: 60, corrected: 180 },
    departments: {
      'Claims': { phone: '(877) 277-9772', fax: '(512) 834-7500', address: '4300 West Parmer Ln, Austin, TX 78727', portal: 'https://www.superiorhealthplan.com/provider' },
      'Appeals': { phone: '(877) 277-9772 opt 2', fax: '(512) 834-7501', address: 'Appeals Dept, Austin, TX 78727', portal: 'https://www.superiorhealthplan.com/provider/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(877) 277-9772' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '17 min', bestTime: '9–11 AM CST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'PASSPORT', name: 'Passport Health Plan', abbr: 'PASS',
    payerId: '52315', type: 'Medicaid', states: ["KY"],
    timelyFiling: { initial: 180, appeal: 60, corrected: 180 },
    departments: {
      'Claims': { phone: '(800) 578-0603', fax: '(502) 581-2000', address: '100 Centerpoint Dr, Suite 300, Louisville, KY 40223', portal: 'https://www.passporthealthplan.com/provider' },
      'Appeals': { phone: '(800) 578-0603 opt 2', fax: '(502) 581-2001', address: 'Appeals Dept, Louisville, KY 40223', portal: 'https://www.passporthealthplan.com/provider/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 578-0603' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '14 min', bestTime: '9–11 AM EST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'HARTFORD', name: 'The Hartford', abbr: 'THG',
    payerId: '52316', type: 'Workers Comp', states: ["All"],
    timelyFiling: { initial: 365, appeal: 180, corrected: 365 },
    departments: {
      'Claims': { phone: '(800) 327-3636', fax: '(860) 547-3145', address: 'One Hartford Plaza, Hartford, CT 06155', portal: 'https://www.thehartford.com/providers' },
      'Appeals': { phone: '(800) 327-3636 opt 2', fax: '(860) 547-3146', address: 'Appeals Dept, Hartford, CT 06155', portal: 'https://www.thehartford.com/providers/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 327-3636' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter Claim #', detail: 'Workers comp claim number' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Workers Comp Claims' },
    ],
    holdTime: '15 min', bestTime: '8–10 AM EST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'TRAVELERS', name: 'Travelers', abbr: 'TRV',
    payerId: '52317', type: 'Workers Comp', states: ["All"],
    timelyFiling: { initial: 365, appeal: 180, corrected: 365 },
    departments: {
      'Claims': { phone: '(800) 842-5075', fax: '(860) 277-0300', address: 'One Tower Sq, Hartford, CT 06183', portal: 'https://www.travelers.com/providers' },
      'Appeals': { phone: '(800) 842-5075 opt 2', fax: '(860) 277-0301', address: 'Appeals Dept, Hartford, CT 06183', portal: 'https://www.travelers.com/providers/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 842-5075' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter Claim #', detail: 'Workers comp claim number' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Workers Comp Claims' },
    ],
    holdTime: '14 min', bestTime: '8–10 AM EST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'LIBERTY-MUT', name: 'Liberty Mutual', abbr: 'LM',
    payerId: '52318', type: 'Workers Comp', states: ["All"],
    timelyFiling: { initial: 365, appeal: 180, corrected: 365 },
    departments: {
      'Claims': { phone: '(800) 336-0606', fax: '(617) 350-7600', address: '175 Berkeley St, Boston, MA 02116', portal: 'https://www.libertymutual.com/providers' },
      'Appeals': { phone: '(800) 336-0606 opt 2', fax: '(617) 350-7601', address: 'Appeals Dept, Boston, MA 02116', portal: 'https://www.libertymutual.com/providers/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 336-0606' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter Claim #', detail: 'Workers comp claim number' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Workers Comp Claims' },
    ],
    holdTime: '16 min', bestTime: '8–10 AM EST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'STANDARD', name: 'The Standard', abbr: 'STD',
    payerId: '52319', type: 'Workers Comp', states: ["All"],
    timelyFiling: { initial: 365, appeal: 180, corrected: 365 },
    departments: {
      'Claims': { phone: '(800) 628-0752', fax: '(503) 326-0752', address: '1100 SW 6th Ave, Portland, OR 97204', portal: 'https://www.standard.com/providers' },
      'Appeals': { phone: '(800) 628-0752 opt 2', fax: '(503) 326-0753', address: 'Appeals Dept, Portland, OR 97204', portal: 'https://www.standard.com/providers/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 628-0752' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter Claim #', detail: 'Workers comp claim number' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Workers Comp Claims' },
    ],
    holdTime: '12 min', bestTime: '9–11 AM PST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'STATEFARM', name: 'State Farm', abbr: 'SFM',
    payerId: '52320', type: 'Auto', states: ["All"],
    timelyFiling: { initial: 365, appeal: 180, corrected: 365 },
    departments: {
      'Claims': { phone: '(800) 732-5246', fax: '(309) 766-2155', address: 'One State Farm Plaza, Bloomington, IL 61710', portal: 'https://www.statefarm.com/claims' },
      'Appeals': { phone: '(800) 732-5246 opt 2', fax: '(309) 766-2156', address: 'Appeals Dept, Bloomington, IL 61710', portal: 'https://www.statefarm.com/claims/appeals' },
    },
    ivr: [
      { action: 'Call Claims Line', detail: '(800) 732-5246' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Existing Claim' },
      { action: 'Enter Claim #', detail: 'Auto claim number' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Auto Claims' },
    ],
    holdTime: '18 min', bestTime: '8–10 AM CST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'GEICO', name: 'GEICO', abbr: 'GEC',
    payerId: '52321', type: 'Auto', states: ["All"],
    timelyFiling: { initial: 365, appeal: 180, corrected: 365 },
    departments: {
      'Claims': { phone: '(800) 841-3000', fax: '(301) 986-1500', address: 'One GEICO Plaza, Washington, DC 20076', portal: 'https://www.geico.com/claims' },
      'Appeals': { phone: '(800) 841-3000 opt 2', fax: '(301) 986-1501', address: 'Appeals Dept, Washington, DC 20076', portal: 'https://www.geico.com/claims/appeals' },
    },
    ivr: [
      { action: 'Call Claims Line', detail: '(800) 841-3000' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Existing Claim' },
      { action: 'Enter Claim #', detail: 'Auto claim number' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Auto Claims' },
    ],
    holdTime: '20 min', bestTime: '8–10 AM EST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'PROGRESSIVE', name: 'Progressive', abbr: 'PGR',
    payerId: '52322', type: 'Auto', states: ["All"],
    timelyFiling: { initial: 365, appeal: 180, corrected: 365 },
    departments: {
      'Claims': { phone: '(800) 776-4737', fax: '(330) 659-8400', address: '6300 Wilson Mills Rd, Mayfield Village, OH 44143', portal: 'https://www.progressive.com/claims' },
      'Appeals': { phone: '(800) 776-4737 opt 2', fax: '(330) 659-8401', address: 'Appeals Dept, Mayfield Village, OH 44143', portal: 'https://www.progressive.com/claims/appeals' },
    },
    ivr: [
      { action: 'Call Claims Line', detail: '(800) 776-4737' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Existing Claim' },
      { action: 'Enter Claim #', detail: 'Auto claim number' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Auto Claims' },
    ],
    holdTime: '17 min', bestTime: '8–10 AM EST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'IHS', name: 'Indian Health Service', abbr: 'IHS',
    payerId: '52323', type: 'Government', states: ["All"],
    timelyFiling: { initial: 365, appeal: 180, corrected: 365 },
    departments: {
      'Claims': { phone: '(301) 443-1483', fax: '(301) 443-0943', address: '5600 Fishers Lane, Rockville, MD 20857', portal: 'https://www.ihs.gov/providers' },
      'Appeals': { phone: '(301) 443-1483 opt 2', fax: '(301) 443-0944', address: 'Appeals Dept, Rockville, MD 20857', portal: 'https://www.ihs.gov/providers/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(301) 443-1483' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '20 min', bestTime: '8–10 AM EST', callback: 'No', verified: '2025-01-01'
  }
  {
    id: 'RR-MEDICARE', name: 'Railroad Medicare', abbr: 'RRMC',
    payerId: '52324', type: 'Government', states: ["All"],
    timelyFiling: { initial: 365, appeal: 120, corrected: 365 },
    departments: {
      'Claims': { phone: '(877) 201-4059', fax: '(877) 201-4060', address: 'PO Box 10066, Augusta, GA 30999', portal: 'https://www.cms.gov/railroad' },
      'Appeals': { phone: '(877) 201-4059 opt 2', fax: '(877) 201-4061', address: 'Appeals Dept, Augusta, GA 30999', portal: 'https://www.cms.gov/railroad/appeals' },
    },
    ivr: [
      { action: 'Call Railroad Medicare', detail: '(877) 201-4059' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Enter Beneficiary ID', detail: 'Railroad Medicare ID' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '22 min', bestTime: '8–10 AM EST', callback: 'No', verified: '2025-01-01'
  }
  {
    id: 'FEHBP', name: 'Federal Employees Health Benefits', abbr: 'FEHBP',
    payerId: '52325', type: 'Government', states: ["All"],
    timelyFiling: { initial: 365, appeal: 180, corrected: 365 },
    departments: {
      'Claims': { phone: '(202) 606-1714', fax: '(202) 606-1715', address: '1900 E St NW, Washington, DC 20415', portal: 'https://www.opm.gov/healthcare' },
      'Appeals': { phone: '(202) 606-1714 opt 2', fax: '(202) 606-1716', address: 'Appeals Dept, Washington, DC 20415', portal: 'https://www.opm.gov/healthcare/appeals' },
    },
    ivr: [
      { action: 'Call FEHBP Line', detail: '(202) 606-1714' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '18 min', bestTime: '8–10 AM EST', callback: 'No', verified: '2025-01-01'
  }
  {
    id: 'BEACON', name: 'Beacon Health Options', abbr: 'BHO',
    payerId: '52326', type: 'Behavioral Health', states: ["All"],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      'Claims': { phone: '(800) 397-0276', fax: '(617) 772-1020', address: '1 Beacon Way, Boston, MA 02108', portal: 'https://www.beaconhealthoptions.com/provider' },
      'Appeals': { phone: '(800) 397-0276 opt 2', fax: '(617) 772-1021', address: 'Appeals Dept, Boston, MA 02108', portal: 'https://www.beaconhealthoptions.com/provider/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 397-0276' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Behavioral Health Claims' },
    ],
    holdTime: '14 min', bestTime: '9–11 AM EST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'VALUEOPTIONS', name: 'ValueOptions', abbr: 'VO',
    payerId: '52327', type: 'Behavioral Health', states: ["All"],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      'Claims': { phone: '(800) 441-8100', fax: '(757) 436-3300', address: '4460 Corporation Ln, Virginia Beach, VA 23462', portal: 'https://www.valueoptions.com/provider' },
      'Appeals': { phone: '(800) 441-8100 opt 2', fax: '(757) 436-3301', address: 'Appeals Dept, Virginia Beach, VA 23462', portal: 'https://www.valueoptions.com/provider/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 441-8100' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Behavioral Health Claims' },
    ],
    holdTime: '15 min', bestTime: '9–11 AM EST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'LUCET', name: 'Lucet', abbr: 'LUC',
    payerId: '52328', type: 'Behavioral Health', states: ["All"],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      'Claims': { phone: '(800) 532-4337', fax: '(615) 467-6100', address: '3401 West End Ave, Nashville, TN 37203', portal: 'https://www.lucet.com/provider' },
      'Appeals': { phone: '(800) 532-4337 opt 2', fax: '(615) 467-6101', address: 'Appeals Dept, Nashville, TN 37203', portal: 'https://www.lucet.com/provider/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 532-4337' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Behavioral Health Claims' },
    ],
    holdTime: '13 min', bestTime: '9–11 AM CST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'MERITAIN', name: 'Meritain Health', abbr: 'MERI',
    payerId: '52329', type: 'Commercial', states: ["All"],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      'Claims': { phone: '(800) 822-0300', fax: '(716) 887-5600', address: '4300 W Genesee St, Syracuse, NY 13219', portal: 'https://www.meritain.com/provider' },
      'Appeals': { phone: '(800) 822-0300 opt 2', fax: '(716) 887-5601', address: 'Appeals Dept, Syracuse, NY 13219', portal: 'https://www.meritain.com/provider/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 822-0300' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '15 min', bestTime: '8–10 AM EST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'UMR', name: 'UMR', abbr: 'UMR',
    payerId: '52330', type: 'Commercial', states: ["All"],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      'Claims': { phone: '(800) 441-5501', fax: '(608) 784-5600', address: '1200 John Q Hammons Dr, Madison, WI 53717', portal: 'https://www.umr.com/provider' },
      'Appeals': { phone: '(800) 441-5501 opt 2', fax: '(608) 784-5601', address: 'Appeals Dept, Madison, WI 53717', portal: 'https://www.umr.com/provider/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 441-5501' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '14 min', bestTime: '8–10 AM CST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'TRUSTMARK', name: 'Trustmark', abbr: 'TRMK',
    payerId: '52331', type: 'Commercial', states: ["All"],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      'Claims': { phone: '(800) 352-6406', fax: '(847) 605-6000', address: '1000 N Westfield Dr, Oak Brook, IL 60523', portal: 'https://www.trustmark.com/provider' },
      'Appeals': { phone: '(800) 352-6406 opt 2', fax: '(847) 605-6001', address: 'Appeals Dept, Oak Brook, IL 60523', portal: 'https://www.trustmark.com/provider/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 352-6406' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '13 min', bestTime: '8–10 AM CST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'HEALTHCOMP', name: 'HealthComp', abbr: 'HCOMP',
    payerId: '52332', type: 'Commercial', states: ["All"],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      'Claims': { phone: '(800) 446-7723', fax: '(813) 282-1200', address: '4211 W Boy Scout Blvd, Tampa, FL 33607', portal: 'https://www.healthcomp.com/provider' },
      'Appeals': { phone: '(800) 446-7723 opt 2', fax: '(813) 282-1201', address: 'Appeals Dept, Tampa, FL 33607', portal: 'https://www.healthcomp.com/provider/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 446-7723' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '12 min', bestTime: '8–10 AM EST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'CORESOURCE', name: 'CoreSource', abbr: 'CORE',
    payerId: '52333', type: 'Commercial', states: ["All"],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      'Claims': { phone: '(800) 323-4300', fax: '(847) 605-6200', address: '1000 Enterprise Dr, Oak Brook, IL 60523', portal: 'https://www.coresource.com/provider' },
      'Appeals': { phone: '(800) 323-4300 opt 2', fax: '(847) 605-6201', address: 'Appeals Dept, Oak Brook, IL 60523', portal: 'https://www.coresource.com/provider/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 323-4300' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '14 min', bestTime: '8–10 AM CST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'WEBTPA', name: 'WebTPA', abbr: 'WEB',
    payerId: '52334', type: 'Commercial', states: ["All"],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      'Claims': { phone: '(866) 578-0734', fax: '(817) 348-8100', address: '6401 Broadway St, Fort Worth, TX 76117', portal: 'https://www.webtpa.com/provider' },
      'Appeals': { phone: '(866) 578-0734 opt 2', fax: '(817) 348-8101', address: 'Appeals Dept, Fort Worth, TX 76117', portal: 'https://www.webtpa.com/provider/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(866) 578-0734' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '13 min', bestTime: '8–10 AM CST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'ABS', name: 'Allied Benefit Systems', abbr: 'ABS',
    payerId: '52335', type: 'Commercial', states: ["All"],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      'Claims': { phone: '(800) 328-5979', fax: '(952) 548-0300', address: '8100 Mitchell Rd, Minneapolis, MN 55444', portal: 'https://www.alliedbenefit.com/provider' },
      'Appeals': { phone: '(800) 328-5979 opt 2', fax: '(952) 548-0301', address: 'Appeals Dept, Minneapolis, MN 55444', portal: 'https://www.alliedbenefit.com/provider/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 328-5979' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '12 min', bestTime: '8–10 AM CST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'CONSOCIATE', name: 'Consociate Health', abbr: 'CONS',
    payerId: '52336', type: 'Commercial', states: ["All"],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      'Claims': { phone: '(800) 365-1816', fax: '(309) 676-5500', address: '3000 SW Adams St, Peoria, IL 61602', portal: 'https://www.consociate.com/provider' },
      'Appeals': { phone: '(800) 365-1816 opt 2', fax: '(309) 676-5501', address: 'Appeals Dept, Peoria, IL 61602', portal: 'https://www.consociate.com/provider/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 365-1816' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '11 min', bestTime: '8–10 AM CST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'EBMS', name: 'EBMS', abbr: 'EBMS',
    payerId: '52337', type: 'Commercial', states: ["All"],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      'Claims': { phone: '(800) 426-3743', fax: '(307) 673-5600', address: '901 N Beverly Dr, Billings, MT 59101', portal: 'https://www.ebms.com/provider' },
      'Appeals': { phone: '(800) 426-3743 opt 2', fax: '(307) 673-5601', address: 'Appeals Dept, Billings, MT 59101', portal: 'https://www.ebms.com/provider/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 426-3743' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '10 min', bestTime: '9–11 AM MST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'BAS', name: 'BAS (Benefit Administrative Services)', abbr: 'BAS',
    payerId: '52338', type: 'Commercial', states: ["All"],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      'Claims': { phone: '(800) 823-1856', fax: '(913) 928-5600', address: '4835 W 123rd St, Overland Park, KS 66209', portal: 'https://www.basusa.com/provider' },
      'Appeals': { phone: '(800) 823-1856 opt 2', fax: '(913) 928-5601', address: 'Appeals Dept, Overland Park, KS 66209', portal: 'https://www.basusa.com/provider/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 823-1856' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '11 min', bestTime: '8–10 AM CST', callback: 'Yes', verified: '2025-01-01'
  }
  {
    id: 'AUXIANT', name: 'Auxiant', abbr: 'AUX',
    payerId: '52339', type: 'Commercial', states: ["All"],
    timelyFiling: { initial: 180, appeal: 180, corrected: 180 },
    departments: {
      'Claims': { phone: '(800) 627-1008', fax: '(608) 270-2100', address: '230 W Monroe St, Madison, WI 53703', portal: 'https://www.auxiant.com/provider' },
      'Appeals': { phone: '(800) 627-1008 opt 2', fax: '(608) 270-2101', address: 'Appeals Dept, Madison, WI 53703', portal: 'https://www.auxiant.com/provider/appeals' },
    },
    ivr: [
      { action: 'Call Provider Line', detail: '(800) 627-1008' },
      { action: 'Press 1', detail: 'English' },
      { action: 'Press 2', detail: 'Provider Services' },
      { action: 'Enter NPI', detail: '10-digit NPI' },
      { action: 'Press 1', detail: 'Claims Status' },
      { action: 'Hold for Rep', detail: 'Claims Department' },
    ],
    holdTime: '12 min', bestTime: '8–10 AM CST', callback: 'Yes', verified: '2025-01-01'
  }
];

var DENIAL_CODES = [
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
  // Expanded denial codes (127 total)
  { code: 'CO-1',  desc: 'The deductible amount has been applied to this claim' },
  { code: 'CO-3',  desc: 'The coinsurance amount has been applied' },
  { code: 'CO-5',  desc: 'The billed charge exceeds the fee schedule or maximum allowable amount' },
  { code: 'CO-6',  desc: 'Payment is based on a code-level agreed price or contracted rate' },
  { code: 'CO-7',  desc: 'The benefit for this service is included in the payment for another service' },
  { code: 'CO-8',  desc: 'This claim or service has been previously submitted and processed — duplicate' },
  { code: 'CO-9',  desc: 'The claim or service has been denied because it does not meet criteria for coverage' },
  { code: 'CO-10', desc: 'The claim or service has been denied due to a coding or billing error' },
  { code: 'CO-15', desc: 'The required authorization or precertification was not obtained' },
  { code: 'CO-26', desc: 'Payment adjusted because the claim expenses have been previously paid by another source' },
  { code: 'CO-51', desc: 'The claim amount exceeds the maximum allowable for the service under the plan' },
  { code: 'CO-54', desc: 'The CLIA certification number is missing or invalid for laboratory services' },
  { code: 'CO-59', desc: 'The services are not covered under the patient benefit plan or are excluded from coverage' },
  { code: 'CO-90', desc: 'Laterality mismatch on procedure or diagnosis' },
  { code: 'CO-110', desc: 'The claim or service has been adjusted because the billing information needs correction' },
  { code: 'CO-129', desc: 'Payment has been adjusted due to the amount being applied to cost-sharing obligations' },
  { code: 'PR-22', desc: 'This care may be covered by another payer. Coordination of benefits may apply' },
  { code: 'PR-23', desc: 'Payment adjusted because the claim was denied by the primary payer' },
  { code: 'PR-24', desc: 'The patient is responsible for the charges after insurance payment' },
  { code: 'PR-26', desc: 'The patient is responsible for the cost of the service' },
  { code: 'PR-27', desc: 'The patient is responsible for charges after the allowed amount has been paid by insurance' },
  { code: 'PR-31', desc: 'The patient is responsible for the denied claim amount' },
  { code: 'PR-32', desc: 'The patient is responsible for the service charges. The claim has been processed' },
  { code: 'PR-33', desc: 'The copayment amount is due from the patient' },
  { code: 'PR-36', desc: 'The patient is responsible for charges related to services not covered by their plan' },
  { code: 'PR-39', desc: 'The patient is responsible for charges that exceed the allowed amount' },
  { code: 'PR-40', desc: 'Patient responsibility for charges after insurance adjudication' },
  { code: 'PR-41', desc: 'Patient responsible for charges related to a service that was denied or not covered' },
  { code: 'PR-42', desc: 'Patient is responsible for charges where the coverage limit has been reached' },
  { code: 'PR-45', desc: 'Patient is responsible for charges due to a service not meeting medical necessity criteria' },
  { code: 'PR-49', desc: 'Patient is responsible for charges related to services rendered by a non-participating provider' },
  { code: 'PR-50', desc: 'Patient is responsible for charges where the service is not a covered benefit' },
  { code: 'PR-51', desc: 'Patient is responsible for charges where the service was provided during a waiting period' },
  { code: 'PR-52', desc: 'Patient is responsible for charges related to a service that was not authorized or referred' },
  { code: 'PR-53', desc: 'Patient is responsible for charges where the service was provided outside the coverage area' },
  { code: 'PR-54', desc: 'Patient is responsible for charges where the service exceeds the plan benefit limit' },
  { code: 'PR-55', desc: 'Patient is responsible for charges where the service was provided by an excluded provider' },
  { code: 'PR-56', desc: 'Patient is responsible for charges where the service was not medically necessary' },
  { code: 'PR-59', desc: 'Patient is responsible for charges where the service was provided during a period of non-coverage' },
  { code: 'PR-66', desc: 'Patient is responsible for charges where the service was provided by an out-of-network provider' },
  { code: 'PR-119', desc: 'Patient is responsible for the benefit limit for this service' },
  { code: 'OA-24', desc: 'Payment adjusted because the charges have been paid by another payer or source' },
  { code: 'OA-26', desc: 'Payment adjusted because the claim expenses were previously paid by another source' },
  { code: 'OA-27', desc: 'Payment denied because the patient was not eligible for coverage on the date of service' },
  { code: 'OA-29', desc: 'The claim was not submitted within the payer timely filing deadline' },
  { code: 'OA-45', desc: 'Payment adjusted based on the fee schedule or contracted rate' },
  { code: 'OA-94', desc: 'Payment adjusted because the claim was processed under a different plan or program' },
  { code: 'OA-96', desc: 'Payment adjusted because the claim does not meet the requirements for the benefit requested' },
  { code: 'OA-109', desc: 'The claim cannot be identified by the payer system' },
  { code: 'OA-110', desc: 'The claim has been adjusted because billing information needs correction' },
  { code: 'OA-170', desc: 'Payment adjusted because the service is not payable under the current benefit plan' },
  { code: 'OA-181', desc: 'Payment adjusted because the procedure code and modifier combination is not recognized' },
  { code: 'OA-182', desc: 'Payment adjusted because the claim does not meet the payer specific requirements' },
  { code: 'OA-190', desc: 'Payment adjusted because the claim was not submitted with the required documentation' },
  { code: 'OA-197', desc: 'Payment denied because the required prior authorization was not obtained' },
  { code: 'OA-198', desc: 'Payment denied because the certification or recertification was not obtained' },
  { code: 'OA-204', desc: 'The claim was not submitted within the required filing timeframe' },
  { code: 'OA-223', desc: 'Payment adjusted because the claim is for services related to a work-related injury' },
  { code: 'OA-234', desc: 'Payment adjusted because the claim is for services related to a motor vehicle accident' },
];

var CHECKLIST_DB = {
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

var DECISION_TREE = [
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

