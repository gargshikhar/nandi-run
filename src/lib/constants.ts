export const SITE = {
  name: "Nandi Hills Monsoon Run",
  tagline: "Run into the Clouds, Race with the Rain!",
  edition: "2nd Edition",
  date: "August 9, 2026",
  raceDay: new Date("2026-08-08T06:00:00+05:30"),
  venue: "Whispers of the Wind by DivyaSree",
  venueAddress: "Enroute Nandi Hills, Nelamangala–Chikkaballapur, Bengaluru",
  email: "support@nandirun.in",
  phone: "9844093666",
  whatsapp: "919844093666",
  instagram: "https://www.instagram.com/nandihillsmonsoonrun/",
  wowInstagram: "https://www.instagram.com/whispersofthewind_divyasree/",
  registerUrl: "/register",
  organizers: {
    jjActive: {
      name: "JJ Active",
      description:
        "JJ Active is a premier running event management company based in Bengaluru, dedicated to creating world-class running experiences across India. With years of experience organizing marathons, trail runs, and community running events, JJ Active brings professional timing, safety standards, and an unmatched runner experience.",
    },
    divyaSree: {
      name: "DivyaSree",
      description:
        "DivyaSree is a leading real estate developer known for sustainable, nature-centric projects. Their Whispers of the Wind property at Nandi Hills is a testament to harmonious living with nature — the perfect venue for a monsoon hill run that celebrates the outdoors.",
    },
  },
};

export const RACES = [
  {
    id: "half-marathon",
    name: "Half Marathon",
    distance: "21.1K",
    price: 1750,
    priceLabel: "₹1,750 + GST",
    minAge: 18,
    reportingTime: "5:30 AM",
    startTime: "6:30 AM",
    cutoff: "4 hours",
    elevation: { ascent: 530, descent: 531 },
    description:
      "Conquer 21.1 kilometres of monsoon-kissed mountain roads with 530 metres of elevation gain. Wind through misty bends, cloud-wrapped peaks, and lush green canopies en route to the summit of Nandi Hills.",
    highlights: [
      "530m elevation gain",
      "Scenic monsoon trails",
      "Timed & competitive",
      "4-hour cutoff",
    ],
  },
  {
    id: "10k-run",
    name: "10K Run",
    distance: "10K",
    price: 1250,
    priceLabel: "₹1,250 + GST",
    minAge: 18,
    reportingTime: "5:30 AM",
    startTime: "7:00 AM",
    cutoff: "3 hours",
    elevation: { ascent: 191, descent: 190 },
    description:
      "A challenging yet accessible 10-kilometre run with 191 metres of elevation through the monsoon-drenched roads around Nandi Hills. Perfect for runners looking to push their limits in a stunning natural setting.",
    highlights: [
      "191m elevation gain",
      "Road course — no trails",
      "Timed & competitive",
      "3-hour cutoff",
    ],
  },
];

export const TIMELINE_EVENTS = [
  { date: "15 Mar 2026", label: "Website Release", active: true },
  { date: "31 Mar 2026", label: "Ad Campaigns & Logo Unveiling", active: false },
  { date: "10 Apr 2026", label: "Launch Meet & Registration Open", active: false },
  { date: "28 Apr 2026", label: "Training Program", active: false },
  { date: "10 May 2026", label: "Early Bird Closing", active: false },
  { date: "07–08 Aug 2026", label: "Bib Collection", active: false },
  { date: "09 Aug 2026", label: "Race Day!", active: false },
];

export const GIVEAWAYS = [
  {
    title: "Race T-Shirt",
    description: "Premium event-branded running tee",
    icon: "shirt",
  },
  {
    title: "Finisher's Medal",
    description: "Exclusive monsoon-themed finisher medal",
    icon: "medal",
  },
  {
    title: "Breakfast",
    description: "Post-race breakfast at the venue",
    icon: "coffee",
  },
  {
    title: "E-Certificate",
    description: "Digital finisher certificate with your timing",
    icon: "award",
  },
];

export const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    quote:
      "Running through the clouds at Nandi Hills was a life-changing experience. The mist, the rain, the green — nothing compares.",
    location: "Bengaluru",
  },
  {
    name: "Rahul Menon",
    quote:
      "The elevation was brutal but so rewarding. Crossing that finish line in the rain is a moment I'll never forget.",
    location: "Chennai",
  },
  {
    name: "Anitha Reddy",
    quote:
      "Beautifully organized event with stunning views. The monsoon adds a magical dimension to the running experience.",
    location: "Hyderabad",
  },
  {
    name: "Vikram Nair",
    quote:
      "One of the toughest hill runs I've done. The 530m climb is no joke — but the scenery makes every step worth it.",
    location: "Mumbai",
  },
  {
    name: "Deepa Kulkarni",
    quote:
      "Loved the green initiative! It's rare to see an event so committed to sustainability. The run itself was spectacular.",
    location: "Bengaluru",
  },
];

export const FAQS = [
  {
    q: "What distances are offered?",
    a: "Two race categories: 21.1K Half Marathon and 10K Run.",
  },
  {
    q: "When is the race?",
    a: "August 10, 2025 (Sunday). Reporting Time: 5:30 AM. Half Marathon flag-off: 6:30 AM. 10K Run flag-off: 7:00 AM.",
  },
  {
    q: "Where is the race held?",
    a: "DivyaSree Whispers of the Wind, at the base of Nandi Hills on the Nelamangala–Chikkaballapur road, near Bengaluru.",
  },
  {
    q: "What are the elevation gains?",
    a: "Half Marathon: 530m ascent / 531m descent. 10K Run: 191m ascent / 190m descent.",
  },
  {
    q: "Can I change my race category after registration?",
    a: "Changes are allowed until July 20, 2025. Upgrades require payment of the difference; downgrades receive no refund.",
  },
  {
    q: "Are refunds or transfers available?",
    a: "No. Once an entry is received, there will be no refund of registration fees or transfer of registration, under any circumstances. BIBs cannot be transferred.",
  },
  {
    q: "Is the course on roads or trails?",
    a: "The entire race course is on the road. There are no stairs or trails involved.",
  },
  {
    q: "What are the cutoff times?",
    a: "Half Marathon: 4 hours. 10K Run: 3 hours from race start.",
  },
  {
    q: "Is shuttle service available?",
    a: "Yes, shuttle service will be provided to participants at designated pick-up and drop points, at an additional cost.",
  },
  {
    q: "Where and when do I collect my BIB?",
    a: "All participants must collect their BIB from the pre-race Expo. BIBs cannot be mailed. Details will be announced via text and email.",
  },
  {
    q: "Is medical assistance available on course?",
    a: "Yes. Medical assistance will be provided from the beginning of the race through its completion.",
  },
  {
    q: "Is parking available at the venue?",
    a: "Yes, paid parking will be available at the venue.",
  },
  {
    q: "Can family members attend?",
    a: "Only runners with valid BIBs are allowed inside the Start & Finish Holding Area. Family members can be on the route to cheer but will not be allowed inside the holding area.",
  },
  {
    q: "What's included with registration?",
    a: "Race T-shirt, Finisher's Medal, Breakfast, and an E-Certificate.",
  },
  {
    q: "How will I get my race timing and certificate?",
    a: "Finishers will receive a text message with their provisional timing on registered mobile numbers. Final timings and certificates are available on the results portal.",
  },
];

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Race Info", href: "/race-info" },
  { label: "Schedule", href: "/schedule" },
  { label: "Event Guide", href: "/event-guide" },
  { label: "Prizes", href: "/prizes" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
];
