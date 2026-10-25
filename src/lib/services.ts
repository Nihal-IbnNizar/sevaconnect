export type ServiceCategory =
  | 'Certificates & Revenue'
  | 'Employment & PSC'
  | 'Land & Registration'
  | 'Vehicles & Transport'
  | 'Identity & Aadhaar'
  | 'Welfare & Pension'
  | 'Local Bodies & Municipalities';

export type ServiceType = 'state' | 'central' | 'utility';

export interface ServicePortalItem {
  id: string;
  title: string;
  titleMl: string;
  url: string;
  authority: string;
  authorityMl: string;
  source: 'state' | 'central';
  category: ServiceCategory;
  categoryMl?: string;
  pinned?: boolean;
  iconName: string;
  iconBg: string;
  description: string;
  descriptionMl: string;
  services: string[];
  servicesMl: string[];
  docs: string[];
  docsMl: string[];
  tags: string[];
  fee: string;
  feeMl: string;
  sla: string;
  slaMl: string;
}

export interface UtilityItem {
  id: string;
  title: string;
  titleMl: string;
  description: string;
  descriptionMl: string;
  url: string;
  icon: string;
  badge: string;
  badgeMl: string;
  specs: string[];
}

export const CATEGORIES_DATA: { key: ServiceCategory; labelEn: string; labelMl: string; icon: string }[] = [
  { key: 'Certificates & Revenue', labelEn: 'Certificates & Revenue', labelMl: 'സർട്ടിഫിക്കറ്റുകൾ & വരുമാനം', icon: 'description' },
  { key: 'Employment & PSC', labelEn: 'Employment & PSC', labelMl: 'തൊഴിൽ & പി.എസ്.സി', icon: 'school' },
  { key: 'Land & Registration', labelEn: 'Land & Registration', labelMl: 'ഭൂമിയും നികുതിയും', icon: 'landscape' },
  { key: 'Vehicles & Transport', labelEn: 'Vehicles & Transport', labelMl: 'വാഹനങ്ങളും ലൈസൻസും', icon: 'directions_car' },
  { key: 'Identity & Aadhaar', labelEn: 'Identity & Aadhaar', labelMl: 'ആധാർ & തിരിച്ചറിയൽ', icon: 'badge' },
  { key: 'Welfare & Pension', labelEn: 'Welfare & Pension', labelMl: 'പെൻഷൻ & ക്ഷേമം', icon: 'volunteer_activism' },
  { key: 'Local Bodies & Municipalities', labelEn: 'Panchayat & K-Smart', labelMl: 'പഞ്ചായത്ത് & K-Smart', icon: 'apartment' },
];

export const PORTAL_DATABASE: ServicePortalItem[] = [
  {
    id: 'edistrict',
    title: 'e-District Kerala',
    titleMl: 'ഇ-ഡിസ്ട്രിക്ട് കേരള',
    url: 'https://edistrict.kerala.gov.in',
    authority: 'Kerala Revenue Department / IT Mission',
    authorityMl: 'കേരള റവന്യൂ വകുപ്പ് / ഐ.ടി മിഷൻ',
    source: 'state',
    category: 'Certificates & Revenue',
    pinned: true,
    iconName: 'account_balance',
    iconBg: 'bg-emerald-600 text-white',
    description: 'Apply online for 24+ village office certificates including Income, Caste, Nativity, Relationship, and Possession certificates.',
    descriptionMl: 'വരുമാന സർട്ടിഫിക്കറ്റ്, ജാതി സർട്ടിഫിക്കറ്റ്, നേറ്റിവിറ്റി, കൈവശാവകാശ സർട്ടിഫിക്കറ്റ് എന്നിവ വില്ലേജ് ഓഫീസിൽ പോകാതെ ഓൺലൈനായി നേടാം.',
    services: [
      'Income Certificate (വരുമാന സർട്ടിഫിക്കറ്റ്)',
      'Caste & Non-Creamy Layer (ജാതി സർട്ടിഫിക്കറ്റ്)',
      'Nativity Certificate (നേറ്റിവിറ്റി സർട്ടിഫിക്കറ്റ്)',
      'Relationship & Legal Heir (അനന്തരാവകാശ സർട്ടിഫിക്കറ്റ്)',
      'Location & Possession Certificate'
    ],
    servicesMl: [
      'വരുമാന സർട്ടിഫിക്കറ്റ് (വിദ്യാഭ്യാസം & സ്കോളർഷിപ്പ്)',
      'ജാതി / നോൺ-ക്രീമിലെയർ സർട്ടിഫിക്കറ്റ്',
      'നേറ്റിവിറ്റി & റെസിഡൻസ് സർട്ടിഫിക്കറ്റ്',
      'അനന്തരാവകാശ & കുടുംബാംഗ സർട്ടിഫിക്കറ്റ്',
      'ലൊക്കേഷൻ & പൊസഷൻ സർട്ടിഫിക്കറ്റ്'
    ],
    docs: ['Aadhaar Card', 'Ration Card', 'Land Tax Receipt', 'Salary Slip / Income Proof'],
    docsMl: ['ആധാർ കാർഡ്', 'റേഷൻ കാർഡ്', 'കരം അടച്ച രസീത്', 'വരുമാനം തെളിയിക്കുന്ന രേഖ'],
    tags: ['edistrict', 'income certificate', 'caste', 'nativity', 'revenue', 'village office', 'വരുമാന സർട്ടിഫിക്കറ്റ്', 'ജാതി'],
    fee: '₹15 - ₹25 per certificate',
    feeMl: '₹15 - ₹25 സർട്ടിഫിക്കറ്റിന്',
    sla: '3 - 7 Days',
    slaMl: '3 മുതൽ 7 ദിവസത്തിനുള്ളിൽ'
  },
  {
    id: 'ksmart',
    title: 'K-Smart Kerala (LSGD)',
    titleMl: 'കെ-സ്മാർട്ട് തദ്ദേശ സ്വയംഭരണം',
    url: 'https://ksmart.lsgkerala.gov.in/',
    authority: 'Local Self Government Dept, Kerala',
    authorityMl: 'തദ്ദേശ സ്വയംഭരണ വകുപ്പ്, കേരളം',
    source: 'state',
    category: 'Local Bodies & Municipalities',
    pinned: true,
    iconName: 'apartment',
    iconBg: 'bg-teal-600 text-white',
    description: 'Unified online portal for Grama Panchayats, Municipalities, and Corporations for Building Tax, Birth/Death certificates, and Trade Licenses.',
    descriptionMl: 'പഞ്ചായത്ത്, മുനിസിപ്പാലിറ്റി, കോർപ്പറേഷൻ കെട്ടിട നികുതി, ജനന-മരണ രജിസ്ട്രേഷൻ, ട്രേഡ് ലൈസൻസ് എന്നിവയ്ക്ക്.',
    services: [
      'Building Tax payment (കെട്ടിട നികുതി അടക്കൽ)',
      'Birth & Death Certificate download',
      'Marriage Registration (വിവാഹ രജിസ്ട്രേഷൻ)',
      'Trade & Business License application',
      'Building permit application'
    ],
    servicesMl: [
      'ഓൺലൈൻ കെട്ടിട നികുതി അടയ്ക്കൽ',
      'ജനന - മരണ സർട്ടിഫിക്കറ്റ് ഡൗൺലോഡ്',
      'വിവാഹ രജിസ്ട്രേഷൻ & സർട്ടിഫിക്കറ്റ്',
      'വ്യാപാര ലൈസൻസ് അപേക്ഷ',
      'കെട്ടിട നിർമ്മാണ അനുമതി'
    ],
    docs: ['Aadhaar Number', 'Previous Tax Receipt', 'Building Assessment No', 'Hospital Record'],
    docsMl: ['ആധാർ നമ്പർ', 'മുൻപത്തെ നികുതി രസീത്', 'കെട്ടിട നമ്പർ', 'ആശുപത്രി രേഖകൾ'],
    tags: ['ksmart', 'building tax', 'panchayat tax', 'birth certificate', 'death certificate', 'marriage certificate', 'തദ്ദേശം', 'കെട്ടിട നികുതി'],
    fee: 'Varies by tax amount',
    feeMl: 'നികുതി തുകയനുസരിച്ച്',
    sla: 'Instant for Tax & Downloads',
    slaMl: 'തൽക്ഷണം രസീത് ലഭിക്കും'
  },
  {
    id: 'psc-thulasi',
    title: 'Kerala PSC Thulasi',
    titleMl: 'കേരള പി.എസ്.സി തുളസി',
    url: 'https://thulasi.psc.kerala.gov.in/thulasi/',
    authority: 'Kerala Public Service Commission',
    authorityMl: 'കേരള പബ്ലിക് സർവീസ് കമ്മീഷൻ',
    source: 'state',
    category: 'Employment & PSC',
    pinned: true,
    iconName: 'school',
    iconBg: 'bg-indigo-600 text-white',
    description: 'One Time Registration (OTR), job applications, examination hall tickets, confirmation, and ranked list updates.',
    descriptionMl: 'വൺ ടൈം രജിസ്ട്രേഷൻ, പരീക്ഷാ അപേക്ഷകൾ, ഹാൾടിക്കറ്റ് ഡൗൺലോഡ്, പരീക്ഷ കൺഫർമേഷൻ, റാങ്ക് ലിസ്റ്റ് വിവരങ്ങൾ.',
    services: [
      'One Time Registration (OTR) profile login',
      'Apply online for active PSC notifications',
      'Exam Hall Ticket download',
      'Exam confirmation OTP submission',
      'Check shortlisted & ranked lists'
    ],
    servicesMl: [
      'വൺ ടൈം രജിസ്ട്രേഷൻ പ്രൊഫൈൽ ലോഗിൻ',
      'പുതിയ പരീക്ഷകൾക്ക് അപേക്ഷിക്കുക',
      'ഹാൾടിക്കറ്റ് ഡൗൺലോഡ് ചെയ്യുക',
      'പരീക്ഷാ കൺഫർമേഷൻ നൽകുക',
      'റാങ്ക് ലിസ്റ്റും മാർക്കുകളും പരിശോധിക്കുക'
    ],
    docs: ['User ID & Password', '150x200 Photo (Name/Date stamped)', 'Signature (150x100)'],
    docsMl: ['യൂസർ ഐഡി & പാസ്‌വേഡ്', 'ഫോട്ടോ (പേരും തീയതിയും രേഖപ്പെടുത്തിയത്)', 'ഒപ്പ്'],
    tags: ['psc', 'kerala psc', 'thulasi', 'hall ticket', 'rank list', 'otr', 'job', 'പി.എസ്.സി', 'തുളസി', 'ഹാൾടിക്കറ്റ്'],
    fee: '₹0 (Free Govt Recruitment)',
    feeMl: 'സൗജന്യം (₹0)',
    sla: 'Instant Profile Access',
    slaMl: 'തൽക്ഷണം ലഭിക്കും'
  },
  {
    id: 'relis-erekha',
    title: 'reLIS Land Tax & e-Rekha',
    titleMl: 'ഭൂനികുതി & ഇ-രേഖ (റവന്യൂ)',
    url: 'https://www.revenue.kerala.gov.in/',
    authority: 'Revenue & Survey Department, Kerala',
    authorityMl: 'റവന്യൂ & സർവേ വകുപ്പ്, കേരളം',
    source: 'state',
    category: 'Land & Registration',
    pinned: true,
    iconName: 'landscape',
    iconBg: 'bg-amber-600 text-white',
    description: 'Pay Kerala Land Tax online, download digital receipts, verify Thandapper, check Pokkuvaravu (mutation status), and view survey sketch maps.',
    descriptionMl: 'ഓൺലൈനായി ഭൂനികുതി (കരം) അടയ്ക്കാം, കരം രസീത് ഡൗൺലോഡ് ചെയ്യാം, പോക്കുവരവ് നിലയും സർവേ സ്കെച്ചും പരിശോധിക്കാം.',
    services: [
      'Online Land Basic Tax payment & e-Receipt',
      'Check Thandapper and land ownership',
      'Mutation / Pokkuvaravu application status',
      'Survey Sketch Map & FMB digital download',
      'Fair value of land calculation'
    ],
    servicesMl: [
      'ഓൺലൈൻ ഭൂനികുതി (കരം) അടയ്ക്കലും രസീതും',
      'തണ്ടപ്പേര് & ഉടമസ്ഥാവകാശ വിവരങ്ങൾ',
      'പോക്കുവരവ് അപേക്ഷാ സ്റ്റാറ്റസ്',
      'സർവേ മാപ്പുകളും FMB സ്കെച്ചും കാണുക',
      'ഭൂമിയുടെ ന്യായവില പരിശോധന'
    ],
    docs: ['Old Land Tax Receipt (തണ്ടപ്പേര് നമ്പർ / സർവേ നമ്പർ)', 'Aadhaar / Mobile OTP'],
    docsMl: ['പഴയ കരം രസീത് / തണ്ടപ്പേര് നമ്പർ', 'സർവേ നമ്പർ & സബ് ഡിവിഷൻ'],
    tags: ['land tax', 'relis', 'erekha', 'pokkuvaravu', 'thandaper', 'survey map', 'കരം', 'ഭൂനികുതി', 'പോക്കുവരവ്'],
    fee: 'Calculated by land extent (Cent / Acre)',
    feeMl: 'ഭൂമിയുടെ അളവനുസരിച്ച്',
    sla: 'Instant e-Receipt download',
    slaMl: 'തൽക്ഷണം രസീത് ഡൗൺലോഡ്'
  },
  {
    id: 'uidai-aadhaar',
    title: 'UIDAI myAadhaar Portal',
    titleMl: 'യു.ഐ.ഡി.എ.ഐ മൈ ആധാർ',
    url: 'https://myaadhaar.uidai.gov.in/',
    authority: 'Unique Identification Authority of India',
    authorityMl: 'കേന്ദ്ര ആധാർ അതോറിറ്റി',
    source: 'central',
    category: 'Identity & Aadhaar',
    pinned: true,
    iconName: 'fingerprint',
    iconBg: 'bg-blue-600 text-white',
    description: 'Official Aadhaar portal to download e-Aadhaar, update home address online, order durable PVC card, check mobile link, and lock biometric details.',
    descriptionMl: 'ഇ-ആധാർ ഡൗൺലോഡ് ചെയ്യുക, വിലാസം തിരുത്തുക, പി.വി.സി ആധാർ കാർഡ് ഓർഡർ ചെയ്യുക, ബയോമെട്രിക് ലോക്ക് ചെയ്യുക.',
    services: [
      'Download official password-protected e-Aadhaar PDF',
      'Order PVC Aadhaar Card delivered home (₹50)',
      'Update residential address online with document proof',
      'Lock or Unlock fingerprint biometric authentication',
      'Verify mobile number and email linked to Aadhaar'
    ],
    servicesMl: [
      'ഒറിജിനൽ ഇ-ആധാർ PDF ഡൗൺലോഡ്',
      'പ്ലാസ്റ്റിക് PVC ആധാർ കാർഡ് വീട്ടിലെത്തിക്കുക (₹50)',
      'ഓൺലൈനായി വിലാസം മാറ്റുക / അപ്ഡേറ്റ് ചെയ്യുക',
      'ബയോമെട്രിക് വിരലടയാളം സുരക്ഷിതമായി ലോക്ക് ചെയ്യുക',
      'ആധാറുമായി ലിങ്ക് ചെയ്ത മൊബൈൽ നമ്പർ പരിശോധിക്കുക'
    ],
    docs: ['Aadhaar Number', 'Mobile phone linked to Aadhaar for OTP', 'Proof of Address (if changing address)'],
    docsMl: ['ആധാർ നമ്പർ', 'ഒ.ടി.പി ലഭിക്കാൻ ലിങ്ക് ചെയ്ത മൊബൈൽ', 'വിലാസം തെളിയിക്കുന്ന രേഖ'],
    tags: ['aadhaar', 'uidai', 'myaadhaar', 'pvc card', 'download aadhaar', 'address update', 'ആധാർ', 'ഇ-ആധാർ'],
    fee: 'Free (e-Aadhaar) / ₹50 (PVC Card)',
    feeMl: 'ഡൗൺലോഡ് സൗജന്യം / PVC കാർഡിന് ₹50',
    sla: 'Instant Download / 5-7 days for PVC',
    slaMl: 'ഡൗൺലോഡ് തൽക്ഷണം / കാർഡ് 7 ദിവസത്തിനകം'
  },
  {
    id: 'nsp-scholarships',
    title: 'National Scholarship Portal (NSP)',
    titleMl: 'ദേശീയ സ്കോളർഷിപ്പ് പോർട്ടൽ (NSP)',
    url: 'https://scholarships.gov.in/',
    authority: 'Ministry of Electronics & IT / Education, GoI',
    authorityMl: 'കേന്ദ്ര ഇലക്ട്രോണിക്സ് & വിദ്യാഭ്യാസ മന്ത്രാലയം',
    source: 'central',
    category: 'Welfare & Pension',
    pinned: true,
    iconName: 'military_tech',
    iconBg: 'bg-amber-700 text-white',
    description: 'Unified national platform for applying to central, state, and UGC/AICTE merit-cum-means, post-matric, and pre-matric scholarships.',
    descriptionMl: 'സ്കൂൾ-കോളേജ് വിദ്യാർത്ഥികൾക്കുള്ള കേന്ദ്ര-സംസ്ഥാന സ്കോളർഷിപ്പുകൾ, പോസ്റ്റ്-മെട്രിക്, പ്രീ-മെട്രിക്, മെറിറ്റ് സ്കോളർഷിപ്പുകൾക്കുള്ള ഒരൊറ്റ പോർട്ടൽ.',
    services: [
      'Post-Matric Scholarship for Minority, SC, ST, and OBC students',
      'Central Sector Scheme of Scholarships for College & University Students',
      'National Means-cum-Merit Scholarship Scheme (NMMSS)',
      'Fresh application and Renewal application tracking',
      'Direct Benefit Transfer (DBT) payment status to bank account'
    ],
    servicesMl: [
      'പോസ്റ്റ്-മെട്രിക് & പ്രീ-മെട്രിക് സ്കോളർഷിപ്പുകൾ',
      'കോളേജ് വിദ്യാർത്ഥികൾക്കുള്ള സെൻട്രൽ സെക്ടർ സ്കോളർഷിപ്പ്',
      'നാഷണൽ മീൻസ്-കം-മെറിറ്റ് സ്കോളർഷിപ്പ് (NMMSS)',
      'പുതിയ അപേക്ഷകളും റിന്യൂവൽ അപേക്ഷകളും',
      'സ്കോളർഷിപ്പ് തുക ബാങ്കിൽ എത്തിയോ എന്ന് പരിശോധിക്കുക'
    ],
    docs: ['Aadhaar Number', 'Bank Account Passbook (Aadhaar Seeded)', 'Income Certificate', 'Previous Year Marksheet', 'Bonafide Student Certificate'],
    docsMl: ['ആധാർ കാർഡ്', 'ബാങ്ക് പാസ്ബുക്ക്', 'വരുമാന സർട്ടിഫിക്കറ്റ്', 'മാർക്ക് ലിസ്റ്റ്', 'സ്കൂൾ/കോളേജ് ബോണഫൈഡ് സർട്ടിഫിക്കറ്റ്'],
    tags: ['scholarship', 'nsp', 'national scholarship', 'post matric', 'student grant', 'dbt', 'സ്കോളർഷിപ്പ്', 'വിദ്യാഭ്യാസം'],
    fee: '₹0 (Free Citizen Benefit)',
    feeMl: 'സൗജന്യം (₹0)',
    sla: 'Academic Cycle / Direct Bank Transfer',
    slaMl: 'നേരിട്ട് ബാങ്ക് അക്കൗണ്ടിലേക്ക്'
  },
  {
    id: 'parivahan-mvd',
    title: 'Parivahan / Kerala MVD',
    titleMl: 'പരിവാഹൻ / കേരള മോട്ടോർ വാഹനം',
    url: 'https://sarathi.parivahan.gov.in/',
    authority: 'Ministry of Road Transport / Kerala MVD',
    authorityMl: 'കേന്ദ്ര ഗതാഗത മന്ത്രാലയം / കേരള MVD',
    source: 'central',
    category: 'Vehicles & Transport',
    pinned: true,
    iconName: 'directions_car',
    iconBg: 'bg-rose-600 text-white',
    description: 'Driving license services, learner permit test, driving test slot booking, DL renewal, vehicle RC ownership transfer, and traffic fine payments.',
    descriptionMl: 'ഡ്രൈവിംഗ് ലൈസൻസ് പുതുക്കൽ, ലേണേഴ്സ് പരീക്ഷ, ആർ.സി ഉടമസ്ഥാവകാശം മാറ്റൽ, ഇ-ചെല്ലാൻ പിഴ അടയ്ക്കൽ.',
    services: [
      'Learners License online test & slot booking',
      'Driving License (DL) renewal and address correction',
      'Vehicle Registration Certificate (RC) duplicate/transfer',
      'International Driving Permit (IDP)',
      'Pay traffic police e-Challan fines online'
    ],
    servicesMl: [
      'ലേണേഴ്സ് ലൈസൻസ് അപേക്ഷയും ഓൺലൈൻ പരീക്ഷയും',
      'ഡ്രൈവിംഗ് ലൈസൻസ് പുതുക്കൽ / വിലാസം മാറ്റൽ',
      'വാഹന ആർ.സി ഉടമസ്ഥാവകാശ മാറ്റം / ഡ്യൂപ്ലിക്കേറ്റ്',
      'ട്രാഫിക് പിഴ (e-Challan) അടയ്ക്കൽ',
      'വാഹന നികുതി അടയ്ക്കൽ'
    ],
    docs: ['Aadhaar', 'Old DL / RC Book', 'Eye Test Medical Certificate (Form 1A)', 'Passport Photo'],
    docsMl: ['ആധാർ', 'പഴയ ലൈസൻസ് / ആർ.സി ബുക്ക്', 'മെഡിക്കൽ സർട്ടിഫിക്കറ്റ്', 'ഫോട്ടോ'],
    tags: ['driving license', 'learner', 'parivahan', 'sarathi', 'vahan', 'mvd', 'rc book', 'echallan', 'ലൈസൻസ്', 'പരിവാഹൻ'],
    fee: '₹200 - ₹1,200 depending on service',
    feeMl: 'സേവനത്തിനനുസരിച്ച് ₹200 മുതൽ',
    sla: '1 - 7 Days',
    slaMl: '1 മുതൽ 7 ദിവസത്തിനുള്ളിൽ'
  },
  {
    id: 'sevana-pension',
    title: 'Sevana Social Security Pension',
    titleMl: 'സേവന സോഷ്യൽ സെക്യൂരിറ്റി പെൻഷൻ',
    url: 'https://www.welfarepension.lsgkerala.gov.in/',
    authority: 'LSGD & Finance Department, Kerala',
    authorityMl: 'തദ്ദേശ സ്വയംഭരണ & ധനകാര്യ വകുപ്പ്, കേരളം',
    source: 'state',
    category: 'Welfare & Pension',
    pinned: true,
    iconName: 'volunteer_activism',
    iconBg: 'bg-emerald-700 text-white',
    description: 'Check status of Kerala Welfare Pensions: Old Age, Widow, Disability, Agricultural, and Mustering (biometric verification) status.',
    descriptionMl: 'വാർദ്ധക്യകാല പെൻഷൻ, വിധവാ പെൻഷൻ, കർഷകത്തൊഴിലാളി പെൻഷൻ എന്നിവയുടെ ബാങ്ക് അക്കൗണ്ട് തുക നിലയും മസ്റ്ററിംഗ് വിവരങ്ങളും.',
    services: [
      'Check monthly pension disbursement status to bank account',
      'Mustering / Biometric life certificate status',
      'Old Age & Senior Citizen Pension details',
      'Widow and Unmarried Women Pension scheme',
      'Disability and Agricultural Labor Pension'
    ],
    servicesMl: [
      'പെൻഷൻ തുക ബാങ്കിൽ എത്തിയോ എന്ന് പരിശോധിക്കുക',
      'മസ്റ്ററിംഗ് / ജീവൻ പ്രമാൺ ലൈഫ് സർട്ടിഫിക്കറ്റ് നില',
      'വാർദ്ധക്യകാല പെൻഷൻ വിവരങ്ങൾ',
      'വിധവ / വികലാംഗ പെൻഷൻ സ്റ്റാറ്റസ്',
      'കർഷകത്തൊഴിലാളി പെൻഷൻ പരിശോധന'
    ],
    docs: ['Pension ID / Aadhaar Number', 'Bank Account Passbook Number'],
    docsMl: ['പെൻഷൻ നമ്പർ / ആധാർ നമ്പർ', 'ബാങ്ക് അക്കൗണ്ട് നമ്പർ'],
    tags: ['pension', 'sevana', 'mustering', 'old age pension', 'widow pension', 'welfare', 'പെൻഷൻ', 'മസ്റ്ററിംഗ്', 'സേവന'],
    fee: '₹0 (Free Citizen Benefit)',
    feeMl: 'സൗജന്യം (₹0)',
    sla: 'Instant Status Inquiry',
    slaMl: 'തൽക്ഷണം സ്റ്റാറ്റസ് അറിയാം'
  },
  {
    id: 'digilocker',
    title: 'DigiLocker India',
    titleMl: 'ഡിജിലോക്കർ ഇന്ത്യ',
    url: 'https://digilocker.gov.in/',
    authority: 'Digital India Corporation, MeitY',
    authorityMl: 'ഡിജിറ്റൽ ഇന്ത്യ / കേന്ദ്ര ഐ.ടി മന്ത്രാലയം',
    source: 'central',
    category: 'Identity & Aadhaar',
    pinned: false,
    iconName: 'cloud_done',
    iconBg: 'bg-cyan-600 text-white',
    description: 'Government cloud storage to safely store and fetch legally recognized digital Driving License, Vehicle RC, Marksheets, and Aadhaar.',
    descriptionMl: 'ഡ്രൈവിംഗ് ലൈസൻസ്, വാഹന ആർ.സി, എസ്.എസ്.എൽ.സി സർട്ടിഫിക്കറ്റ് എന്നിവ മൊബൈലിൽ സൂക്ഷിക്കാനും പരിശോധിക്കാനും.',
    services: [
      'Legally valid digital Driving License & RC storage',
      'Fetch 10th (SSLC) & 12th Board Marksheets',
      'Ration Card and COVID vaccination certificates',
      'Insurance policies and PAN card duplicate'
    ],
    servicesMl: [
      'നിയമസാധുതയുള്ള ഡിജിറ്റൽ ഡ്രൈവിംഗ് ലൈസൻസ്',
      'എസ്.എസ്.എൽ.സി & പ്ലസ് ടു മാർക്ക് ലിസ്റ്റുകൾ',
      'റേഷൻ കാർഡ് ഡിജിറ്റൽ കോപ്പി',
      'പാൻ കാർഡ് & വാഹന ഇൻഷുറൻസ്'
    ],
    docs: ['Aadhaar Number with active Mobile OTP'],
    docsMl: ['ആധാർ നമ്പറും മൊബൈൽ ഒ.ടി.പിയും'],
    tags: ['digilocker', 'marksheets', 'dl copy', 'rc copy', 'digital documents', 'ഡിജിലോക്കർ'],
    fee: '₹0 (Free Citizen Cloud)',
    feeMl: 'സൗജന്യം (₹0)',
    sla: 'Instant Document Fetch',
    slaMl: 'തൽക്ഷണം ലഭിക്കും'
  },
  {
    id: 'passport-seva',
    title: 'Passport Seva Kendra',
    titleMl: 'പാസ്‌പോർട്ട് സേവാ കേന്ദ്രം',
    url: 'https://www.passportindia.gov.in/',
    authority: 'Ministry of External Affairs, Govt of India',
    authorityMl: 'കേന്ദ്ര വിദേശകാര്യ മന്ത്രാലയം',
    source: 'central',
    category: 'Identity & Aadhaar',
    pinned: false,
    iconName: 'flight_takeoff',
    iconBg: 'bg-purple-600 text-white',
    description: 'Apply for fresh Indian passport, passport renewal, Tatkaal appointments, police verification tracking, and document advisor.',
    descriptionMl: 'പുതിയ പാസ്‌പോർട്ടിന് അപേക്ഷിക്കുക, പാസ്‌പോർട്ട് പുതുക്കൽ, അപ്പോയിന്റ്മെന്റ് ബുക്കിംഗ്, സ്റ്റാറ്റസ് ട്രാക്കിംഗ്.',
    services: [
      'Apply for Fresh Passport or Re-issue on expiry',
      'Book Passport Seva Kendra (PSK / POPSK) slot',
      'Track Police Clearance Certificate (PCC)',
      'Tatkaal passport urgent appointment',
      'Fee calculator and Document advisor'
    ],
    servicesMl: [
      'പുതിയ പാസ്‌പോർട്ടിന് അപേക്ഷിക്കുക',
      'കാലഹരണപ്പെട്ട പാസ്‌പോർട്ട് പുതുക്കുക (Re-issue)',
      'പാസ്‌പോർട്ട് കേന്ദ്രത്തിൽ അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യുക',
      'പോലീസ് ക്ലിയറൻസ് സർട്ടിഫിക്കറ്റ് (PCC)',
      'അടിയന്തര തത്കാൽ പാസ്‌പോർട്ട്'
    ],
    docs: ['Aadhaar Card', 'Birth Certificate / SSLC Marksheet (DOB Proof)', 'Voter ID / Bank Passbook'],
    docsMl: ['ആധാർ കാർഡ്', 'എസ്.എസ്.എൽ.സി ബുക്ക് (ജനനത്തീയതിക്ക്)', 'ബാങ്ക് പാസ്ബുക്ക് / വോട്ടർ ഐഡി'],
    tags: ['passport', 'psk', 'tatkaal', 'visa', 'pcc', 'പാസ്‌പോർട്ട്'],
    fee: '₹1,500 (Normal 36 pages) / ₹3,500 (Tatkaal)',
    feeMl: '₹1,500 (സാധാരണ) / ₹3,500 (തത്കാൽ)',
    sla: '7 - 14 Days (Normal) / 3 Days (Tatkaal)',
    slaMl: '7 മുതൽ 14 ദിവസത്തിനകം'
  },
  {
    id: 'voters-eci',
    title: 'Election Commission Voter Portal',
    titleMl: 'വോട്ടർ സർവീസ് പോർട്ടൽ (ECI)',
    url: 'https://voters.eci.gov.in/',
    authority: 'Election Commission of India',
    authorityMl: 'കേന്ദ്ര തെരഞ്ഞെടുപ്പ് കമ്മീഷൻ',
    source: 'central',
    category: 'Identity & Aadhaar',
    pinned: false,
    iconName: 'how_to_vote',
    iconBg: 'bg-indigo-700 text-white',
    description: 'Register as new voter (Form 6), apply for EPIC voter ID correction (Form 8), download digital e-EPIC card, and search name in electoral roll.',
    descriptionMl: 'പുതിയ വോട്ടർ തിരിച്ചറിയൽ കാർഡിന് അപേക്ഷിക്കുക (Form 6), തിരുത്തലുകൾ വരുത്തുക, വോട്ടർപട്ടികയിൽ പേര് പരിശോധിക്കുക.',
    services: [
      'New Voter Registration (Form 6)',
      'Correction of Name, Photo, or Address in Voter ID (Form 8)',
      'Download digital e-EPIC card in PDF',
      'Search name and polling booth in Electoral Roll'
    ],
    servicesMl: [
      'പുതിയ വോട്ടർ കാർഡ് അപേക്ഷ (Form 6)',
      'പേര്, ഫോട്ടോ, വിലാസം തിരുത്തൽ (Form 8)',
      'ഡിജിറ്റൽ e-EPIC കാർഡ് ഡൗൺലോഡ്',
      'വോട്ടർപട്ടികയിൽ പേരും പോളിംഗ് ബൂത്തും കണ്ടെത്തുക'
    ],
    docs: ['Passport Size Photo', 'Age Proof (Aadhaar/SSLC)', 'Address Proof'],
    docsMl: ['ഫോട്ടോ', 'പ്രായം തെളിയിക്കുന്ന രേഖ', 'വിലാസം തെളിയിക്കുന്ന രേഖ'],
    tags: ['voter id', 'election', 'epic', 'form 6', 'electoral roll', 'വോട്ടർ ഐഡി', 'തെരഞ്ഞെടുപ്പ്'],
    fee: '₹0 (Free Citizen Service)',
    feeMl: 'സൗജന്യം (₹0)',
    sla: '15 - 30 Days',
    slaMl: '15 മുതൽ 30 ദിവസത്തിനുള്ളിൽ'
  },
  {
    id: 'ehealth-kerala',
    title: 'e-Health Kerala (Hospital OP Booking)',
    titleMl: 'ഇ-ഹെൽത്ത് ഒ.പി ടിക്കറ്റ് ബുക്കിംഗ്',
    url: 'https://ehealth.kerala.gov.in/',
    authority: 'Health & Family Welfare Dept, Kerala',
    authorityMl: 'ആരോഗ്യ വകുപ്പ്, കേരളം',
    source: 'state',
    category: 'Welfare & Pension',
    pinned: false,
    iconName: 'local_hospital',
    iconBg: 'bg-red-600 text-white',
    description: 'Advance online outpatient (OP) ticket booking for Government Medical Colleges, District Hospitals, and Taluk hospitals without waiting in long queues.',
    descriptionMl: 'സർക്കാർ മെഡിക്കൽ കോളേജുകളിലും താലൂക്ക് ആശുപത്രികളിലും ക്യൂ നിൽക്കാതെ ഓൺലൈനായി ഒ.പി ടിക്കറ്റ് മുൻകൂട്ടി ബുക്ക് ചെയ്യാം.',
    services: [
      'Online OP token advance booking for Medical Colleges',
      'Unique Health ID (UHID) creation',
      'Doctor appointment time-slot selection',
      'View lab test reports digitally'
    ],
    servicesMl: [
      'മെഡിക്കൽ കോളേജ് ഒ.പി ടിക്കറ്റ് മുൻകൂട്ടി ബുക്ക് ചെയ്യുക',
      'ആരോഗ്യ തിരിച്ചറിയൽ നമ്പർ (UHID) എടുക്കുക',
      'ഡോക്ടറുടെ സമയം തെരഞ്ഞെടുക്കുക',
      'ലാബ് പരിശോധനാ ഫലങ്ങൾ ഓൺലൈനായി കാണുക'
    ],
    docs: ['Aadhaar Number / UHID', 'Mobile Phone for OTP'],
    docsMl: ['ആധാർ നമ്പർ / UHID', 'മൊബൈൽ ഫോൺ'],
    tags: ['ehealth', 'hospital op ticket', 'medical college', 'doctor appointment', 'ആശുപത്രി', 'ഒ.പി ടിക്കറ്റ്'],
    fee: 'Free / Nominal hospital fee',
    feeMl: 'സൗജന്യം / ചെറിയ ആശുപത്രി ഫീസ്',
    sla: 'Instant Token Generation',
    slaMl: 'തൽക്ഷണം ടോക്കൺ ലഭിക്കും'
  },
  {
    id: 'pm-kisan',
    title: 'PM-Kisan Samman Nidhi',
    titleMl: 'പി.എം കിസാൻ കർഷക നിധി',
    url: 'https://pmkisan.gov.in/',
    authority: 'Ministry of Agriculture, Govt of India',
    authorityMl: 'കേന്ദ്ര കൃഷി മന്ത്രാലയം',
    source: 'central',
    category: 'Welfare & Pension',
    pinned: false,
    iconName: 'agriculture',
    iconBg: 'bg-green-600 text-white',
    description: 'Financial support of ₹6,000 per year for farmer families. Check beneficiary installment status, perform e-KYC update, and new farmer registration.',
    descriptionMl: 'കർഷകർക്ക് വർഷം ₹6,000 ധനസഹായം. ഗഡുക്കൾ ബാങ്കിൽ എത്തിയോ എന്ന് പരിശോധിക്കാം, e-KYC ചെയ്യാം, പുതിയ അപേക്ഷ സമർപ്പിക്കാം.',
    services: [
      'Check installment payment status to bank account',
      'Complete Aadhaar OTP based e-KYC online',
      'New farmer registration with land records',
      'Update name as per Aadhaar'
    ],
    servicesMl: [
      'ബാങ്കിൽ എത്തിയ പണത്തിന്റെ ഗഡുക്കൾ പരിശോധിക്കുക',
      'ഓൺലൈൻ e-KYC പൂർത്തിയാക്കുക',
      'പുതിയ കർഷക രജിസ്ട്രേഷൻ',
      'ആധാർ പ്രകാരമുള്ള പേര് തിരുത്തൽ'
    ],
    docs: ['Aadhaar Card', 'Land Holding Record (കരം രസീത്)', 'Bank Account Passbook'],
    docsMl: ['ആധാർ കാർഡ്', 'ഭൂമിയുടെ കരം രസീത്', 'ബാങ്ക് പാസ്ബുക്ക്'],
    tags: ['pm kisan', 'farmer pension', 'kyc', 'installment status', 'agriculture', 'കിസാൻ', 'കർഷക പെൻഷൻ'],
    fee: '₹0 (Direct Bank Benefit)',
    feeMl: 'സൗജന്യം (₹0)',
    sla: '4 Month Installment Cycle',
    slaMl: '4 മാസത്തിലൊരിക്കൽ ₹2000'
  },
  {
    id: 'incometax-itr',
    title: 'Income Tax e-Filing Portal',
    titleMl: 'ഇൻകം ടാക്സ് ഇ-ഫയലിംഗ്',
    url: 'https://www.incometax.gov.in/iec/foportal/',
    authority: 'Income Tax Department, Govt of India',
    authorityMl: 'കേന്ദ്ര ആദായനികുതി വകുപ്പ്',
    source: 'central',
    category: 'Certificates & Revenue',
    pinned: false,
    iconName: 'receipt_long',
    iconBg: 'bg-slate-700 text-white',
    description: 'File annual Income Tax Returns (ITR), check income tax refund status, link PAN with Aadhaar, and view Form 26AS & AIS tax credit.',
    descriptionMl: 'വാർഷിക ആദായനികുതി റിട്ടേൺ (ITR) ഫയൽ ചെയ്യുക, റീഫണ്ട് പരിശോധിക്കുക, പാനും ആധാറും ലിങ്ക് ചെയ്യുക.',
    services: [
      'File Income Tax Return (ITR-1 / ITR-2)',
      'Check tax refund bank credit status',
      'Link PAN Card with Aadhaar Card',
      'View Annual Information Statement (AIS) & Form 26AS'
    ],
    servicesMl: [
      'ആദായനികുതി റിട്ടേൺ (ITR) ഫയൽ ചെയ്യുക',
      'ടാക്സ് റീഫണ്ട് തുക ബാങ്കിൽ എത്തിയോ എന്ന് പരിശോധിക്കുക',
      'പാൻ കാർഡും ആധാറും തമ്മിൽ ബന്ധിപ്പിക്കുക',
      'ഫോം 26AS ടാക്സ് ക്രെഡിറ്റ് കാണുക'
    ],
    docs: ['PAN Card Number', 'Aadhaar Number', 'Form 16 / Bank Interest Certificate'],
    docsMl: ['പാൻ കാർഡ്', 'ആധാർ കാർഡ്', 'ഫോം 16 / ബാങ്ക് പലിശ രേഖ'],
    tags: ['income tax', 'itr', 'tax refund', 'pan aadhaar link', '26as', 'ആദായനികുതി', 'പാൻ കാർഡ്'],
    fee: 'Based on taxable income',
    feeMl: 'വരുമാന നികുതി അനുസരിച്ച്',
    sla: 'Instant Filing Acknowledgment',
    slaMl: 'തൽക്ഷണം ലഭിക്കും'
  },
  {
    id: 'pol-app-kerala',
    title: 'Kerala Police Pol-App Services',
    titleMl: 'കേരള പോലീസ് പോൽ-ആപ്പ് സേവനങ്ങൾ',
    url: 'https://keralapolice.gov.in/',
    authority: 'Kerala Police Department',
    authorityMl: 'കേരള പോലീസ് വകുപ്പ്',
    source: 'state',
    category: 'Certificates & Revenue',
    pinned: false,
    iconName: 'local_police',
    iconBg: 'bg-blue-800 text-white',
    description: 'Apply online for Police Clearance Certificate (PCC for jobs abroad), report lost mobile/documents, download FIR copies, and register senior citizen visits.',
    descriptionMl: 'വിദേശ ജോലികൾക്കുള്ള പോലീസ് ക്ലിയറൻസ് സർട്ടിഫിക്കറ്റ് (PCC), നഷ്ടപ്പെട്ട രേഖകൾ റിപ്പോർട്ട് ചെയ്യൽ, മുതിർന്ന പൗരന്മാർക്കുള്ള സുരക്ഷാ രജിസ്ട്രേഷൻ.',
    services: [
      'Police Clearance Certificate (PCC) for passport/abroad visa',
      'Report Lost Mobile Phone, Passport, or Vehicle RC',
      'Search and download FIR copy online',
      'Pranavam: Senior Citizen beat patrol registration'
    ],
    servicesMl: [
      'വിദേശ ജോലികൾക്കുള്ള പോലീസ് ക്ലിയറൻസ് (PCC)',
      'നഷ്ടപ്പെട്ട മൊബൈൽ ഫോൺ / രേഖകൾ റിപ്പോർട്ട് ചെയ്യുക',
      'എഫ്.ഐ.ആർ (FIR) കോപ്പി ഡൗൺലോഡ് ചെയ്യുക',
      'മുതിർന്ന പൗരന്മാർക്കുള്ള പ്രത്യേക പോലീസ് സുരക്ഷ'
    ],
    docs: ['Aadhaar / Passport Copy', 'Passport size photo', 'Job offer letter (for PCC)'],
    docsMl: ['ആധാർ / പാസ്‌പോർട്ട് കോപ്പി', 'ഫോട്ടോ', 'ജോലി ഓഫർ ലെറ്റർ'],
    tags: ['police clearance', 'pcc', 'lost mobile', 'fir', 'kerala police', 'പോലീസ് ക്ലിയറൻസ്', 'പോൽ ആപ്പ്'],
    fee: '₹0 - ₹500 for PCC',
    feeMl: 'സാധാരണ സൗജന്യം / PCC യ്ക്ക് ₹500',
    sla: '3 - 7 Days for PCC',
    slaMl: '3 മുതൽ 7 ദിവസത്തിനകം'
  }
];

export const UTILITY_TOOLS: UtilityItem[] = [
  {
    id: 'tool-jpg-to-pdf',
    title: 'Image to PDF Converter (JPG/PNG)',
    titleMl: 'ഫോട്ടോകൾ PDF ആക്കാൻ (JPG to PDF)',
    description: 'Combine scanned photos, certificate images, and documents into a clean upload-ready PDF file.',
    descriptionMl: 'സ്കാൻ ചെയ്ത ഫോട്ടോകളും സർട്ടിഫിക്കറ്റുകളും ഒരൊറ്റ പി.ഡി.എഫ് (PDF) ഫയലാക്കി മാറ്റാൻ.',
    url: 'https://www.ilovepdf.com/jpg_to_pdf',
    icon: 'picture_as_pdf',
    badge: 'JPG to PDF',
    badgeMl: 'JPG ൽ നിന്ന് PDF',
    specs: ['JPG to PDF', 'PNG to PDF', 'Combine Scans']
  },
  {
    id: 'tool-pdf-compress',
    title: 'Document PDF Compressor',
    titleMl: 'പി.ഡി.എഫ് സൈസ് കുറയ്ക്കാൻ (Compressor)',
    description: 'Compress large scanned certificate files under 100KB or 200KB for e-District and Govt portals.',
    descriptionMl: 'വില്ലേജ് സർട്ടിഫിക്കറ്റുകളും രേഖകളും അപ്‌ലോഡ് ചെയ്യാൻ ഫയൽ സൈസ് 100KB ൽ താഴെയാക്കാം.',
    url: 'https://www.ilovepdf.com/compress_pdf',
    icon: 'compress',
    badge: 'Target <100 KB',
    badgeMl: '<100 KB ആക്കാം',
    specs: ['<100 KB Target', '<200 KB Target', 'Clean PDF']
  },
  {
    id: 'tool-image-resizer',
    title: 'Target KB Image Resizer & Compressor',
    titleMl: 'ഫോട്ടോ KB സൈസ് കുറയ്ക്കാൻ (Resizer)',
    description: 'Reduce size of any photo or document scan strictly below 30KB, 50KB, or 100KB without blurring.',
    descriptionMl: 'ഫോട്ടോകളുടെയും രേഖകളുടെയും സൈസ് 30KB, 50KB, 100KB ൽ താഴെ കൃത്യമായി ക്രമീകരിക്കാൻ.',
    url: 'https://www.reduceimages.com/',
    icon: 'photo_size_select_large',
    badge: 'Custom KB Limits',
    badgeMl: 'KB സൈസ് മാറ്റാം',
    specs: ['Under 30 KB', 'Under 50 KB', 'Zero Quality Loss']
  },
  {
    id: 'tool-pdf-to-jpg',
    title: 'PDF to High-Res JPEG Converter',
    titleMl: 'പി.ഡി.എഫ് ഫയൽ ഫോട്ടോയാക്കാൻ (PDF to JPG)',
    description: 'Convert single or multi-page PDF documents into clear JPG/JPEG image files for form uploads.',
    descriptionMl: 'പി.ഡി.എഫ് രേഖകൾ വ്യക്തതയുള്ള ഫോട്ടോകളാക്കി (JPG) മാറ്റാൻ.',
    url: 'https://www.ilovepdf.com/pdf_to_jpg',
    icon: 'image',
    badge: 'High Resolution',
    badgeMl: 'വ്യക്തതയോടെ',
    specs: ['300 DPI', 'Instant Download', 'No Watermark']
  },
  {
    id: 'tool-pdf-merge',
    title: 'PDF Merge & Combine',
    titleMl: 'പി.ഡി.എഫ് ഫയലുകൾ ഒന്നിപ്പിക്കാൻ (Merge)',
    description: 'Join multiple pages, prior tax receipts, and identity documents into one unified PDF.',
    descriptionMl: 'പല പേജുകളായുള്ള രേഖകളും കരം രസീതുകളും ഒരൊറ്റ PDF ഫയലായി ചേർക്കാൻ.',
    url: 'https://www.ilovepdf.com/merge_pdf',
    icon: 'merge',
    badge: 'Join Documents',
    badgeMl: 'ഫയലുകൾ ചേർക്കാം',
    specs: ['Multi-page PDF', 'Drag & Drop', 'Instant']
  },
  {
    id: 'tool-image-background-remover',
    title: 'Image Background Remover',
    titleMl: 'ഇമേജ് ബാക്ക്ഗ്രൗണ്ട് റിമൂവർ',
    description: 'Remove backgrounds from images quickly and create clean, transparent backgrounds for photos and designs.',
    descriptionMl: 'ഫോട്ടോകളിൽ നിന്നും ചിത്രങ്ങളിൽ നിന്നും പശ്ചാത്തലം എളുപ്പത്തിൽ നീക്കം ചെയ്ത് സുതാര്യമായ പശ്ചാത്തലമുള്ള ചിത്രങ്ങൾ തയ്യാറാക്കാം.',
    url: 'https://www.iloveimg.com/remove-background',
    icon: 'image',
    badge: 'AI Background Removal',
    badgeMl: 'ബാക്ക്ഗ്രൗണ്ട് റിമൂവർ',
    specs: ['Background Removal', 'Transparent Background', 'Easy to Use']
  },
  {
    id: 'tool-doc-scanner',
    title: 'CamScanner Document Enhancer',
    titleMl: 'മൊബൈൽ സ്കാൻ വ്യക്തമാക്കാൻ (Enhancer)',
    description: 'Clean shadow marks, sharpen text contrast, and make mobile phone document photos scan-ready.',
    descriptionMl: 'മൊബൈലിൽ എടുത്ത രേഖകളുടെ നിഴലുകൾ മാറ്റി അക്ഷരങ്ങൾ വ്യക്തമായി കാണാൻ.',
    url: 'https://www.camscanner.com/',
    icon: 'document_scanner',
    badge: 'Enhance Scans',
    badgeMl: 'വ്യക്തത കൂട്ടാം',
    specs: ['Shadow Removal', 'High Contrast', 'Sharp Text']
  },
  {
    id: 'tool-psc-photo',
    title: 'Kerala PSC Photo & Sign Resizer',
    titleMl: 'പി.എസ്.സി ഫോട്ടോ & ഒപ്പ് റീസൈസർ',
    description: 'Auto crop photo with Name & Date to 150x200 px and Signature to 150x100 px under strict 30KB limit.',
    descriptionMl: 'പേരും തീയതിയും ചേർത്ത് ഫോട്ടോ 150x200 വലുപ്പത്തിലും ഒപ്പ് 150x100 വലുപ്പത്തിലും 30KB ൽ താഴെയാക്കാം.',
    url: 'https://keralapscphotomaker.com/',
    icon: 'crop',
    badge: '150x200 px • <30 KB',
    badgeMl: '150x200 px • <30 KB',
    specs: ['150x200 Photo', '150x100 Sign', '<30 KB JPEG']
  }
];
