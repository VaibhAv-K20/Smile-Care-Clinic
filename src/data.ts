export interface Doctor {
  id: string;
  name: string;
  title: string;
  degree: string;
  experience: string;
  specialization: string;
  bio: string;
  philosophy: string;
  image: string;
  availability: string;
  whatsappMessage: string;
}

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  iconName: string;
  cost: string;
  duration: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  treatment: string;
  date: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const DOCTORS: Doctor[] = [
  {
    id: "dr-amit",
    name: "Dr. Amit Deshmukh",
    title: "Senior Prosthodontist & Implantologist",
    degree: "M.D.S. (Prosthodontics), F.I.C.O.I. (USA)",
    experience: "15+ Years Experience",
    specialization: "Dental Implants, Full-Mouth Reconstruction, and Dental Crowns",
    bio: "Dr. Amit Deshmukh is a highly renowned prosthodontist in Central India. He has successfully placed over 5,000 dental implants and specializes in restoring complex, severely worn dentition. He is known for his warm dental chairside manner and precision.",
    philosophy: "I believe that restoring a smile is a blend of scientific precision and artistic craftsmanship. Every patient deserves a solution that looks natural and functions flawlessly.",
    image: "/Smile-Care-Clinic/images/doctor-male.jpg",
    availability: "Mon - Sat: 10:00 AM - 2:00 PM, 5:00 PM - 8:30 PM",
    whatsappMessage: "Hi Dr. Amit, I want to book an implant/prosthodontic consultation."
  },
  {
    id: "dr-neha",
    name: "Dr. Neha Sharma",
    title: "Chief Orthodontist & Smile Designer",
    degree: "M.D.S. (Orthodontics), Invisalign Certified Provider",
    experience: "10+ Years Experience",
    specialization: "Clear Aligners, Invisible Braces, Pediatric Jaw Growth Modification, and Cosmetic Veneers",
    bio: "Dr. Neha Sharma is a certified Invisalign orthodontist passionate about creating perfect, symmetrical smiles. Having transformed over 2,000 smiles across Nagpur, she specializes in modern aesthetic aligners and gentle preventive pediatric dental procedures.",
    philosophy: "A beautiful smile changes how you see yourself, and how the world sees you. My mission is to deliver modern, pain-free orthodontic treatment that easily fits your lifestyle.",
    image: "/Smile-Care-Clinic/images/doctor-female.jpg",
    availability: "Mon - Sat: 11:30 AM - 4:00 PM, 6:00 PM - 9:00 PM",
    whatsappMessage: "Hi Dr. Neha, I want to inquire about Invisalign / Smile designing."
  }
];

export const SERVICES: Service[] = [
  {
    id: "implants",
    title: "Advanced Dental Implants",
    shortDescription: "Permanent, secure, and completely natural-looking tooth replacements.",
    longDescription: "We offer Swiss-guided implants designed to fuse with your jawbone, providing a lifetime of stability. Painless computer-guided procedures ensure perfect placement with minimal recovery time.",
    iconName: "ShieldCheck",
    cost: "₹18,000 onwards",
    duration: "2-3 sessions"
  },
  {
    id: "aligners",
    title: "Clear Aligners & Invisalign",
    shortDescription: "Straighten your teeth invisibly with comfortable, removable clear trays.",
    longDescription: "State-of-the-art clear aligners tailored using custom 3D digital oral scans. Enjoy complete food freedom and painless orthodontic correction without metallic wires.",
    iconName: "Sparkles",
    cost: "₹45,000 onwards",
    duration: "6-14 months plan"
  },
  {
    id: "veneers",
    title: "Cosmetic Veneers & Smile Makeovers",
    shortDescription: "Porcelain or composite shells designed to cover stains, gaps, or chips.",
    longDescription: "Transform your smile with customized, ultra-thin cosmetic veneers crafted by Nagpur's leading smile design team. Hand-finished for impeccable luster and natural shade matching.",
    iconName: "Smile",
    cost: "₹8,500 per tooth",
    duration: "2 sessions"
  },
  {
    id: "rct",
    title: "Painless Laser Root Canal",
    shortDescription: "Gentle single-visit laser therapy to save your natural infected teeth.",
    longDescription: "Bypass traditional painful drills. Our laser-assisted root canal procedures sanitize micro-canals thoroughly, reducing recovery and post-treatment soreness to nearly zero.",
    iconName: "Zap",
    cost: "₹4,500 onwards",
    duration: "Single Visit (45 mins)"
  },
  {
    id: "pediatric",
    title: "Gentle Pediatric Care",
    shortDescription: "Specialized, fear-free dentistry tailored for your little ones.",
    longDescription: "We make pediatric visits fun! From routine fluoride applications and cavity-preventing pit sealants to growth modification braces, our space is designed to calm dental anxiety.",
    iconName: "Heart",
    cost: "₹1,200 onwards",
    duration: "1 session"
  },
  {
    id: "whitening",
    title: "Advanced Teeth Whitening",
    shortDescription: "Brighten your teeth up to 8 shades in just one single-hour visit.",
    longDescription: "Using clinical-grade Philips Zoom active light technology safely monitored by specialists. Erase years of coffee, tea, and smoke stains comfortably and with instant glow.",
    iconName: "Sun",
    cost: "₹7,000 per session",
    duration: "1 session (60 mins)"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Rajesh Kulkarni",
    location: "Dharampeth, Nagpur",
    rating: 5,
    text: "Dr. Amit explained the entire implant procedure with amazing patience. The treatment was literally painless, and the crown fits perfectly. Highly recommended for senior citizen dental care!",
    treatment: "Dental Implants",
    date: "June 2026"
  },
  {
    id: "t2",
    name: "Pooja Deshpande",
    location: "Ramdaspeth, Nagpur",
    rating: 5,
    text: "I was extremely self-conscious about my crooked teeth. Dr. Neha suggested clear aligners, and within 9 months, my teeth are perfectly aligned! The staff is very polite and the clinic is clean.",
    treatment: "Clear Aligners",
    date: "May 2026"
  },
  {
    id: "t3",
    name: "Dr. Milind Saoji",
    location: "Sadar, Nagpur",
    rating: 5,
    text: "As a fellow medical professional, I am highly critical of sterilization protocols. Nagpur Smile Care has outstanding, world-class hygiene systems. My laser root canal was clean and completely pain-free.",
    treatment: "Laser Root Canal",
    date: "April 2026"
  },
  {
    id: "t4",
    name: "Sneha Wankhede",
    location: "Manish Nagar, Nagpur",
    rating: 5,
    text: "Excellent experience with my 6-year-old son's cavity treatments. Dr. Neha made him laugh throughout the procedure. No tears, just high-fives and a toy reward. Fantastic pediatric clinic!",
    treatment: "Pediatric Care",
    date: "March 2026"
  }
];

export const FAQS: FAQ[] = [
  {
    id: "faq-1",
    question: "How do I book an appointment?",
    answer: "You can easily book by clicking our 'Book on WhatsApp' buttons to instantly text our desk, or dial our direct reception line at +91 98765 43210. Walk-ins are also welcome, but online bookings get priority."
  },
  {
    id: "faq-2",
    question: "Do you offer EMIs or installment plans for premium services?",
    answer: "Yes, we offer 0% interest monthly installment plans (EMI) through partner healthcare financing firms for Clear Aligners, Dental Implants, and full-mouth smile designing packages."
  },
  {
    id: "faq-3",
    question: "Are orthodontic clear aligners suitable for adults?",
    answer: "Absolutely! Over 60% of our aligner patients in Nagpur are working adults. They are transparent, highly comfortable, and completely removable during meetings or meals."
  },
  {
    id: "faq-4",
    question: "What hygiene protocols do you follow in Nagpur Smile Care Clinic?",
    answer: "We employ standard Class-B Autoclave autoclaving, disposable medical-grade dental kits for every single patient, chemical indicator tests, and fully UV-sterilized operatories."
  }
];

export const CLINIC_CONTACT = {
  phone: "+91 98765 43210",
  phoneRaw: "+919876543210",
  whatsapp: "919876543210",
  email: "reception@nagpursmilecare.com",
  address: "102, 1st Floor, Apex Heights, Opposite Dharampeth Park, Dharampeth, Nagpur, Maharashtra - 440010",
  timings: "Monday - Saturday: 10:00 AM - 2:00 PM | 5:00 PM - 9:00 PM (Sundays by appointment only)"
};
