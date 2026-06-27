var NCCI_RULES = [
  {
    cpt1: "99213", cpt2: "36415",
    description: "Office visit with venipuncture",
    status: "bundled",
    modifier: "59",
    resolution: "Use modifier 59 to indicate distinct service, or bill venipuncture separately on a different date."
  },
  {
    cpt1: "99214", cpt2: "36415",
    description: "Office visit with venipuncture",
    status: "bundled",
    modifier: "59",
    resolution: "Use modifier 59 if venipuncture is a distinct service."
  },
  {
    cpt1: "99215", cpt2: "36415",
    description: "Office visit with venipuncture",
    status: "bundled",
    modifier: "59",
    resolution: "Use modifier 59 to bypass, or bill separately."
  },
  {
    cpt1: "93000", cpt2: "93005",
    description: "ECG with recording",
    status: "mutually_exclusive",
    modifier: null,
    resolution: "Bill only one - 93000 includes recording and interpretation."
  },
  {
    cpt1: "93000", cpt2: "93010",
    description: "ECG with interpretation",
    status: "bundled",
    modifier: null,
    resolution: "93000 includes interpretation - do not bill 93010 separately."
  },
  {
    cpt1: "99213", cpt2: "96372",
    description: "Office visit with injection",
    status: "separate_procedure",
    modifier: "25",
    resolution: "Use modifier 25 on E&M if separately identifiable, or modifier 59 on injection."
  },
  {
    cpt1: "99214", cpt2: "96372",
    description: "Office visit with injection",
    status: "separate_procedure",
    modifier: "25",
    resolution: "Use modifier 25 on E&M to indicate significant separately identifiable service."
  },
  {
    cpt1: "99215", cpt2: "96372",
    description: "Office visit with injection",
    status: "separate_procedure",
    modifier: "25",
    resolution: "Modifier 25 required on E&M for separate billing."
  },
  {
    cpt1: "99213", cpt2: "90471",
    description: "Office visit with immunization",
    status: "separate_procedure",
    modifier: "25",
    resolution: "Use modifier 25 on E&M if separately identifiable from immunization administration."
  },
  {
    cpt1: "99214", cpt2: "90471",
    description: "Office visit with immunization",
    status: "separate_procedure",
    modifier: "25",
    resolution: "Modifier 25 on E&M for separately identifiable service."
  },
  {
    cpt1: "97110", cpt2: "97140",
    description: "Therapeutic exercises with manual therapy",
    status: "mutually_exclusive",
    modifier: null,
    resolution: "These services are generally not billed together on the same date for the same body region."
  },
  {
    cpt1: "97110", cpt2: "97530",
    description: "Therapeutic exercises with activities",
    status: "mutually_exclusive",
    modifier: null,
    resolution: "These services overlap significantly - bill only one or use different body regions with modifier XS."
  },
  {
    cpt1: "90832", cpt2: "90834",
    description: "Psychotherapy 30 min with 45 min",
    status: "mutually_exclusive",
    modifier: null,
    resolution: "Only one psychotherapy session can be billed per day."
  },
  {
    cpt1: "90834", cpt2: "90837",
    description: "Psychotherapy 45 min with 60 min",
    status: "mutually_exclusive",
    modifier: null,
    resolution: "Only one psychotherapy session per day - bill the longest duration."
  },
  {
    cpt1: "99203", cpt2: "99204",
    description: "New patient visit levels",
    status: "mutually_exclusive",
    modifier: null,
    resolution: "Only one E&M service level per encounter."
  },
  {
    cpt1: "99213", cpt2: "99214",
    description: "Established patient visit levels",
    status: "mutually_exclusive",
    modifier: null,
    resolution: "Only one E&M level per encounter."
  },
  {
    cpt1: "99214", cpt2: "99215",
    description: "Established patient visit levels",
    status: "mutually_exclusive",
    modifier: null,
    resolution: "Only one E&M level per encounter."
  },
  {
    cpt1: "93306", cpt2: "93307",
    description: "Complete vs limited echo",
    status: "mutually_exclusive",
    modifier: null,
    resolution: "Cannot bill both complete and limited echo on same date."
  },
  {
    cpt1: "99213", cpt2: "90832",
    description: "Office visit with psychotherapy",
    status: "separate_procedure",
    modifier: "25",
    resolution: "Use modifier 25 on E&M to indicate separately identifiable service from psychotherapy."
  },
  {
    cpt1: "99214", cpt2: "90832",
    description: "Office visit with psychotherapy",
    status: "separate_procedure",
    modifier: "25",
    resolution: "Modifier 25 on E&M required for separate billing with psychotherapy."
  },
  {
    cpt1: "99214", cpt2: "90837",
    description: "Office visit with 60-min psychotherapy",
    status: "separate_procedure",
    modifier: "25",
    resolution: "Use modifier 25 on E&M. Or use 90838 (integrated E&M + psychotherapy)."
  },
  {
    cpt1: "99203", cpt2: "96372",
    description: "New patient visit with injection",
    status: "separate_procedure",
    modifier: "25",
    resolution: "Modifier 25 on E&M for separately identifiable service."
  },
  {
    cpt1: "99204", cpt2: "96372",
    description: "New patient visit with injection",
    status: "separate_procedure",
    modifier: "25",
    resolution: "Modifier 25 required on E&M for separate billing."
  },
  {
    cpt1: "99205", cpt2: "96372",
    description: "New patient visit with injection",
    status: "separate_procedure",
    modifier: "25",
    resolution: "Modifier 25 on E&M required."
  },
  {
    cpt1: "97112", cpt2: "97530",
    description: "Neuromuscular reeducation with therapeutic activities",
    status: "mutually_exclusive",
    modifier: null,
    resolution: "These services overlap - bill only one or document distinct targets."
  },
  {
    cpt1: "99217", cpt2: "99218",
    description: "Observation care levels",
    status: "mutually_exclusive",
    modifier: null,
    resolution: "Only one observation care level per encounter."
  },
  {
    cpt1: "99218", cpt2: "99219",
    description: "Observation care levels",
    status: "mutually_exclusive",
    modifier: null,
    resolution: "Only one observation care level per encounter."
  }
];

var NCCI_STATUS_LABELS = {
  "no_edit": { label: "No Edit", icon: "✅", color: "green", description: "No NCCI edit exists for this combination." },
  "bundled": { label: "Bundled", icon: "🔗", color: "amber", description: "One code is a component of the other. Modifier may bypass." },
  "modifier_required": { label: "Modifier Required", icon: "🔧", color: "blue", description: "Modifier needed to indicate distinct service." },
  "separate_procedure": { label: "Separate Procedure", icon: "✂️", color: "blue", description: "Can be billed separately with appropriate modifier." },
  "mutually_exclusive": { label: "Mutually Exclusive", icon: "🚫", color: "red", description: "These services cannot be billed together." }
};
