import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MessageSquare, 
  Clock, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  ChevronDown, 
  Star, 
  Award, 
  Shield, 
  Menu, 
  X, 
  Stethoscope, 
  Check, 
  Briefcase, 
  ExternalLink,
  ChevronRight,
  Smile,
  ShieldCheck,
  Sparkles,
  Zap,
  Heart,
  Sun,
  MapPinned,
  Info
} from 'lucide-react';
import { 
  DOCTORS, 
  SERVICES, 
  TESTIMONIALS, 
  FAQS, 
  CLINIC_CONTACT, 
  Service, 
  Doctor 
} from './data';

// Component to dynamically render lucide icons safely
const ServiceIcon = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case "ShieldCheck": return <ShieldCheck className={className} />;
    case "Sparkles": return <Sparkles className={className} />;
    case "Smile": return <Smile className={className} />;
    case "Zap": return <Zap className={className} />;
    case "Heart": return <Heart className={className} />;
    case "Sun": return <Sun className={className} />;
    default: return <Smile className={className} />;
  }
};

export default function App() {
  // Navigation states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Interaction states
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [activeDoctorTab, setActiveDoctorTab] = useState<string>('dr-amit');
  const [reviewFilter, setReviewFilter] = useState<string>('All');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>("faq-1");

  // Booking Calculator States
  const [calcServiceId, setCalcServiceId] = useState<string>(SERVICES[0].id);
  const [calcDoctorId, setCalcDoctorId] = useState<string>(DOCTORS[0].id);
  const [calcDate, setCalcDate] = useState<string>('');
  const [calcTime, setCalcTime] = useState<string>('10:30 AM');
  const [calcName, setCalcName] = useState<string>('');
  const [calcPhone, setCalcPhone] = useState<string>('');
  const [isBookedSuccessfully, setIsBookedSuccessfully] = useState(false);
  const [generatedMsgPreview, setGeneratedMsgPreview] = useState('');

  // Handle Calculator changes
  const currentCalcService = SERVICES.find(s => s.id === calcServiceId) || SERVICES[0];
  const currentCalcDoctor = DOCTORS.find(d => d.id === calcDoctorId) || DOCTORS[0];

  // Auto-calculated offer logic
  const originalCostNum = parseInt(currentCalcService.cost.replace(/[^0-9]/g, '')) || 0;
  const discountAmount = Math.round(originalCostNum * 0.15); // 15% promotional online discount
  const estimatedDiscountedCost = originalCostNum > 0 ? originalCostNum - discountAmount : 0;

  // Handle mock booking and WhatsApp template generation
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!calcName || !calcPhone) {
      alert("Please fill in your Name and Phone Number to configure your appointment.");
      return;
    }

    const templateMsg = `Hi *Nagpur Smile Care Clinic*, I would like to confirm my consultation booking:%0A%0A` +
      `👤 *Patient Name*: ${encodeURIComponent(calcName)}%0A` +
      `📞 *Contact*: ${encodeURIComponent(calcPhone)}%0A` +
      `🦷 *Treatment*: ${encodeURIComponent(currentCalcService.title)}%0A` +
      `👨‍⚕️ *Specialist*: ${encodeURIComponent(currentCalcDoctor.name)}%0A` +
      `📅 *Date*: ${encodeURIComponent(calcDate || 'Preferred Soon')}%0A` +
      `⏰ *Preferred Slot*: ${encodeURIComponent(calcTime)}%0A` +
      `💵 *Est. Promotional Fee*: ₹${estimatedDiscountedCost.toLocaleString('en-IN') || currentCalcService.cost}%0A%0A` +
      `Please confirm the availability. Thank you!`;

    setGeneratedMsgPreview(decodeURIComponent(templateMsg).replace(/%0A/g, '\n'));
    setIsBookedSuccessfully(true);
  };

  const openWhatsAppDirect = () => {
    const templateMsg = `Hi *Nagpur Smile Care Clinic*, I would like to confirm my consultation booking:%0A%0A` +
      `👤 *Patient Name*: ${encodeURIComponent(calcName)}%0A` +
      `📞 *Contact*: ${encodeURIComponent(calcPhone)}%0A` +
      `🦷 *Treatment*: ${encodeURIComponent(currentCalcService.title)}%0A` +
      `👨‍⚕️ *Specialist*: ${encodeURIComponent(currentCalcDoctor.name)}%0A` +
      `📅 *Date*: ${encodeURIComponent(calcDate || 'Preferred Soon')}%0A` +
      `⏰ *Preferred Slot*: ${encodeURIComponent(calcTime)}%0A` +
      `💵 *Est. Promotional Fee*: ₹${estimatedDiscountedCost.toLocaleString('en-IN') || currentCalcService.cost}%0A%0A` +
      `Please confirm the availability. Thank you!`;

    window.open(`https://wa.me/${CLINIC_CONTACT.whatsapp}?text=${templateMsg}`, '_blank');
  };

  // Filter reviews by specific treatments
  const filteredTestimonials = reviewFilter === 'All'
    ? TESTIMONIALS
    : TESTIMONIALS.filter(t => t.treatment === reviewFilter);

  return (
    <div className="min-h-screen bg-natural-bg text-natural-text font-sans selection:bg-natural-accent selection:text-white">
      {/* Clinic Emergency Banner */}
      <div className="bg-natural-primary text-natural-bg text-xs py-2.5 px-4 shadow-sm border-b border-natural-secondary/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-flex h-2 w-2 rounded-full bg-natural-accent animate-pulse"></span>
            <span>Nagpur's trusted ISO-Certified digital sterilization dental clinic</span>
          </div>
          <div className="flex items-center gap-4">
            <a href={`tel:${CLINIC_CONTACT.phoneRaw}`} className="hover:text-natural-accent transition-colors flex items-center gap-1.5 font-semibold">
              <Phone className="w-3.5 h-3.5" /> Call Reception: {CLINIC_CONTACT.phone}
            </a>
            <span className="hidden md:inline text-natural-secondary/40">|</span>
            <a 
              href={`https://wa.me/${CLINIC_CONTACT.whatsapp}?text=Hi!%20I'd%20like%20to%20book%20a%20priority%20dental%20appointment%20in%20Nagpur.`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-natural-accent transition-colors flex items-center gap-1 text-natural-accent font-bold"
            >
              <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Priority: +91 98765 43210
            </a>
          </div>
        </div>
      </div>

      {/* Main Premium Navbar */}
      <header className="sticky top-0 z-50 bg-natural-bg/95 backdrop-blur-md shadow-sm border-b border-natural-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2.5 group">
              <div className="w-12 h-12 bg-gradient-to-br from-natural-primary to-natural-secondary rounded-xl flex items-center justify-center text-white shadow-md shadow-natural-primary/10 group-hover:scale-105 transition-transform" style={{ borderRadius: "16px 4px 16px 4px" }}>
                <Smile className="w-6.5 h-6.5" />
              </div>
              <div>
                <span className="block text-xl font-bold font-serif tracking-tight text-natural-dark group-hover:text-natural-primary transition-colors">
                  Nagpur Smile Care
                </span>
                <span className="block text-[10px] tracking-widest font-mono uppercase text-natural-accent -mt-0.5 font-bold">
                  PREMIUM CLINIC & IMPLANT CENTER
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <a href="#home" className="text-sm font-semibold text-natural-text/80 hover:text-natural-primary transition-colors">Home</a>
              <a href="#services" className="text-sm font-semibold text-natural-text/80 hover:text-natural-primary transition-colors">Services</a>
              <a href="#doctors" className="text-sm font-semibold text-natural-text/80 hover:text-natural-primary transition-colors">Specialists</a>
              <a href="#about" className="text-sm font-semibold text-natural-text/80 hover:text-natural-primary transition-colors">Sterilization</a>
              <a href="#testimonials" className="text-sm font-semibold text-natural-text/80 hover:text-natural-primary transition-colors">Reviews</a>
              <a href="#faqs" className="text-sm font-semibold text-natural-text/80 hover:text-natural-primary transition-colors">FAQs</a>
            </nav>

            {/* Nav Call-To-Action */}
            <div className="hidden lg:flex items-center gap-3">
              <a 
                href={`tel:${CLINIC_CONTACT.phoneRaw}`}
                className="flex items-center gap-2 border border-natural-border hover:border-natural-accent hover:bg-natural-light transition-all px-4 py-2 rounded-xl text-xs font-bold text-natural-text"
              >
                <Phone className="w-3.5 h-3.5 text-natural-primary" /> Call Clinic
              </a>
              <a 
                href="#appointment"
                className="bg-natural-accent hover:bg-natural-accent/90 text-white shadow-md shadow-natural-accent/10 px-5 py-2.5 rounded-xl text-xs font-bold transition-all hover:translate-y-[-1px]"
              >
                Book Appointment
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-natural-text hover:text-natural-primary transition-colors"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-natural-bg border-t border-natural-border px-4 py-6 space-y-4 shadow-lg"
            >
              <div className="flex flex-col space-y-3">
                <a 
                  href="#home" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-semibold text-natural-text hover:text-natural-primary py-1"
                >
                  Home
                </a>
                <a 
                  href="#services" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-semibold text-natural-text hover:text-natural-primary py-1"
                >
                  Services
                </a>
                <a 
                  href="#doctors" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-semibold text-natural-text hover:text-natural-primary py-1"
                >
                  Specialists
                </a>
                <a 
                  href="#about" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-semibold text-natural-text hover:text-natural-primary py-1"
                >
                  Sterilization
                </a>
                <a 
                  href="#testimonials" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-semibold text-natural-text hover:text-natural-primary py-1"
                >
                  Patient Reviews
                </a>
                <a 
                  href="#faqs" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-semibold text-natural-text hover:text-natural-primary py-1"
                >
                  FAQs
                </a>
              </div>
              <hr className="border-natural-border" />
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a 
                  href={`tel:${CLINIC_CONTACT.phoneRaw}`}
                  className="flex items-center justify-center gap-2 border border-natural-border py-3 rounded-xl text-sm font-semibold text-natural-text bg-natural-light"
                >
                  <Phone className="w-4 h-4 text-natural-primary" /> Call Clinic
                </a>
                <a 
                  href={`https://wa.me/${CLINIC_CONTACT.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl text-sm font-semibold"
                >
                  <MessageSquare className="w-4 h-4" /> WhatsApp
                </a>
              </div>
              <a 
                href="#appointment"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-center bg-natural-primary hover:bg-natural-dark text-white py-3 rounded-xl text-sm font-semibold shadow-sm"
              >
                Book Slot Instantly
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden bg-natural-light text-natural-dark pt-12 pb-20 md:py-24 lg:py-32 border-b border-natural-border">
        {/* Background Image overlay */}
        <div className="absolute inset-0 z-0 opacity-15">
          <img 
            src="/images/clinic_hero_1782905854797.jpg" 
            alt="Nagpur Smile Care Clinic reception" 
            className="w-full h-full object-cover filter sepia-[20%] contrast-[95%]"
            referrerPolicy="no-referrer"
          />
        </div>
        
        {/* Warm linear gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-natural-bg via-natural-light/95 to-natural-light/80 z-10"></div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Hero text content */}
            <div className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-natural-primary/10 border border-natural-primary/20 text-natural-primary text-xs font-bold tracking-wider uppercase mx-auto lg:mx-0"
              >
                <Award className="w-4.5 h-4.5 text-natural-accent" />
                <span>Nagpur's Highly Rated Multi-Specialty Dental Clinic</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-natural-dark leading-tight"
              >
                Experience Gentle, <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-natural-primary to-natural-accent">
                  Precision Dental Care
                </span> <br />
                in Nagpur
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-natural-text text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed"
              >
                Restore your confidence with state-of-the-art dental implants, aesthetic Invisalign aligners, and single-visit root canals guided by Nagpur's senior specialists.
              </motion.p>

              {/* Dynamic Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2"
              >
                <a 
                  href="#appointment"
                  className="bg-natural-accent hover:bg-natural-accent/90 text-white font-bold px-8 py-4 rounded-xl text-sm tracking-wide shadow-lg shadow-natural-accent/20 hover:shadow-natural-accent/30 transition-all hover:translate-y-[-2px] flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4.5 h-4.5 text-white" />
                  Configure Appt (Get 15% Off)
                </a>
                <a 
                  href={`https://wa.me/${CLINIC_CONTACT.whatsapp}?text=Hi%2C%20I%20would%20like%20to%20book%20a%20priority%20consultation%20with%20a%20doctor%20at%20Nagpur%20Smile%20Care.`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white hover:bg-natural-light text-emerald-700 font-semibold px-8 py-4 rounded-xl text-sm border border-natural-border hover:border-emerald-600/40 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageSquare className="w-4.5 h-4.5 text-emerald-600" />
                  Chat on WhatsApp
                </a>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-3 gap-4 pt-6 border-t border-natural-border text-natural-text max-w-md mx-auto lg:mx-0"
              >
                <div>
                  <span className="block text-2xl font-bold font-serif text-natural-primary">15+</span>
                  <span className="text-xs text-natural-secondary font-medium">Years of Care</span>
                </div>
                <div className="border-x border-natural-border px-2">
                  <span className="block text-2xl font-bold font-serif text-natural-primary">7,000+</span>
                  <span className="text-xs text-natural-secondary font-medium">Happy Smiles</span>
                </div>
                <div>
                  <span className="block text-2xl font-bold font-serif text-natural-primary">100%</span>
                  <span className="text-xs text-natural-secondary font-medium">Painless Laser RCT</span>
                </div>
              </motion.div>
            </div>

            {/* Hero visual promo box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div 
                className="bg-white p-6 sm:p-8 border border-natural-border shadow-xl relative overflow-hidden"
                style={{ borderRadius: "64px 8px 64px 8px" }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-natural-accent/5 rounded-full blur-2xl"></div>
                
                <h3 className="text-lg font-bold font-serif text-natural-dark mb-4 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-natural-accent animate-pulse"></span>
                  Quick Consultation Guide
                </h3>
                
                <p className="text-xs text-natural-secondary mb-6 leading-relaxed font-medium">
                  Located premium-class in Nagpur. Dial our medical reception for express diagnosis & consults.
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-natural-light text-natural-primary rounded-lg shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-natural-dark">Daily Clinic Hours</h4>
                      <p className="text-[11px] text-natural-secondary font-medium">10:00 AM - 2:00 PM | 5:00 PM - 9:00 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-natural-light text-natural-primary rounded-lg shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-natural-dark">Dharampeth Location</h4>
                      <p className="text-[11px] text-natural-secondary font-medium">Opposite Dharampeth Park, Nagpur</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-natural-light text-natural-primary rounded-lg shrink-0 mt-0.5">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-natural-dark">Zero-Compromise Sterilization</h4>
                      <p className="text-[11px] text-natural-secondary font-medium">Safe, disposable patient kits & laser diagnostics</p>
                    </div>
                  </div>
                </div>

                <a 
                  href={`tel:${CLINIC_CONTACT.phoneRaw}`}
                  className="block text-center bg-natural-primary hover:bg-natural-dark text-white font-bold py-3.5 rounded-xl text-xs transition-colors shadow-sm"
                >
                  Dial Direct Line: {CLINIC_CONTACT.phone}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-28 bg-natural-bg border-b border-natural-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs tracking-widest font-mono uppercase text-natural-primary font-bold bg-natural-primary/10 px-4 py-1.5 rounded-full">
              CLINICAL SPECIALTIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-natural-dark tracking-tight">
              World-Class Dental Care Rendered Locally
            </h2>
            <p className="text-natural-text font-light leading-relaxed">
              We leverage modern digital smile imaging, micro-lasers, and internationally accredited procedures to ensure your treatments are highly effective, aesthetic, and completely painless.
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((srv) => (
              <div 
                key={srv.id}
                className="bg-white hover:bg-natural-light/50 group p-8 border border-natural-border transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md"
                style={{ borderRadius: "24px 4px 24px 4px" }}
              >
                <div className="space-y-5">
                  <div className="w-12 h-12 bg-natural-light text-natural-primary flex items-center justify-center group-hover:bg-natural-primary group-hover:text-white transition-all shadow-sm" style={{ borderRadius: "10px 2px 10px 2px" }}>
                    <ServiceIcon name={srv.iconName} className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-natural-dark group-hover:text-natural-primary transition-colors font-serif">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-natural-accent font-bold mt-1">
                      Estimated: {srv.cost} • Duration: {srv.duration}
                    </p>
                  </div>
                  <p className="text-natural-text/90 text-sm leading-relaxed font-light">
                    {srv.shortDescription}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-natural-border flex items-center justify-between">
                  <button 
                    onClick={() => setSelectedService(srv)}
                    className="text-xs text-natural-primary font-bold hover:text-natural-accent inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    View Details <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <a 
                    href="#appointment"
                    onClick={() => {
                      setCalcServiceId(srv.id);
                    }}
                    className="text-[11px] bg-natural-light text-natural-text font-bold px-3.5 py-2 rounded-lg hover:bg-natural-accent hover:text-white transition-colors border border-natural-border/60"
                  >
                    Book Treatment
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Quick clinical service spotlight featuring generated asset */}
          <div 
            className="mt-16 bg-gradient-to-br from-natural-primary to-natural-dark text-white p-8 sm:p-12 border border-natural-border/10 relative overflow-hidden shadow-xl"
            style={{ borderRadius: "40px 8px 40px 8px" }}
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-natural-accent/10 rounded-full blur-3xl"></div>
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 relative">
                <img 
                  src="/images/dental_service_thumbnail_1782905902584.jpg" 
                  alt="High quality sterile dental care tools" 
                  className="w-full h-auto object-cover shadow-lg border border-white/10"
                  style={{ borderRadius: "24px 4px 24px 4px" }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-natural-dark/90 text-natural-accent text-[10px] uppercase tracking-wider font-mono px-2 py-1 rounded font-bold">
                  Clinical Standards
                </div>
              </div>
              <div className="lg:col-span-7 space-y-5">
                <span className="text-xs font-mono text-natural-accent uppercase tracking-widest block font-bold">
                  TECHNOLOGY SPOTLIGHT
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  Why 100% Computerized & Digital Root Canals & Implants?
                </h3>
                <p className="text-natural-light/80 text-sm leading-relaxed font-light">
                  Traditional dental treatments often rely on generic structural approximations, causing discomfort. At Nagpur Smile Care, we use state-of-the-art 3D intraoral scanners and micro-laser cleanings to guarantee highly personalized cavity treatments, precise bone integration, and unmatched safety.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-1.5 text-xs text-natural-light/90">
                    <Check className="w-4 h-4 text-natural-accent shrink-0" />
                    <span>Computerized Diagnosis</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-natural-light/90">
                    <Check className="w-4 h-4 text-natural-accent shrink-0" />
                    <span>No Loud Drilling Noises</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-natural-light/90">
                    <Check className="w-4 h-4 text-natural-accent shrink-0" />
                    <span>99% Post-Treatment Success</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Services Detail Modal (AnimatePresence React) */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-natural-dark/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-natural-bg max-w-2xl w-full overflow-hidden shadow-2xl border border-natural-border"
              style={{ borderRadius: "32px 4px 32px 4px" }}
            >
              <div className="bg-natural-primary text-white p-6 sm:p-8 relative">
                <button 
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                  <ServiceIcon name={selectedService.iconName} className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-serif font-bold">{selectedService.title}</h3>
                <p className="text-natural-accent text-xs mt-1 font-semibold">Specialized treatment package available at Dharampeth, Nagpur</p>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase text-natural-secondary tracking-wider mb-2">Detailed Treatment Overview</h4>
                  <p className="text-natural-text text-sm leading-relaxed font-light">
                    {selectedService.longDescription}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-natural-light p-4 rounded-xl border border-natural-border">
                  <div>
                    <span className="block text-[11px] text-natural-secondary uppercase tracking-wider font-semibold">Indicative Cost</span>
                    <span className="text-base font-bold text-natural-dark font-serif">{selectedService.cost}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] text-natural-secondary uppercase tracking-wider font-semibold">Approx. Duration</span>
                    <span className="text-base font-bold text-natural-dark font-serif">{selectedService.duration}</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <a 
                    href="#appointment"
                    onClick={() => {
                      setCalcServiceId(selectedService.id);
                      setSelectedService(null);
                    }}
                    className="flex-1 text-center bg-natural-primary hover:bg-natural-dark text-white font-bold py-3.5 rounded-xl text-xs shadow-md transition-colors"
                  >
                    Configure Appointment & Price Offer
                  </a>
                  <a 
                    href={`https://wa.me/${CLINIC_CONTACT.whatsapp}?text=Hi%20I'd%20like%20to%20know%20more%20details%20about%20${encodeURIComponent(selectedService.title)}%20at%20Nagpur%20Smile%20Care.`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center bg-natural-light hover:bg-natural-border/40 text-natural-text font-bold py-3.5 rounded-xl text-xs border border-natural-border transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    Inquire on WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <section id="doctors" className="py-20 md:py-28 bg-natural-light border-y border-natural-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs tracking-widest font-mono uppercase text-natural-primary font-bold bg-natural-primary/10 px-4 py-1.5 rounded-full">
              MEET OUR EXPERTS
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-natural-dark tracking-tight">
              Leading MDS Specialists of Nagpur
            </h2>
            <p className="text-natural-text/90 font-light leading-relaxed">
              Our clinic boasts senior Master of Dental Surgery (MDS) doctors committed to providing top-quality diagnosis, implants, and orthodontics utilizing world-class guidelines.
            </p>
          </div>

          {/* Doctor tabs panel */}
          <div className="max-w-4xl mx-auto">
            {/* Tabs Selector */}
            <div className="flex border-b border-natural-border mb-8 justify-center">
              {DOCTORS.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => setActiveDoctorTab(doc.id)}
                  className={`px-6 py-4 font-serif text-base sm:text-lg font-bold transition-all relative ${
                    activeDoctorTab === doc.id ? 'text-natural-dark' : 'text-natural-secondary hover:text-natural-primary'
                  }`}
                >
                  {doc.name}
                  {activeDoctorTab === doc.id && (
                    <motion.div 
                      layoutId="activeDoctorUnderline" 
                      className="absolute bottom-0 left-0 right-0 h-1 bg-natural-primary" 
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Selected Doctor view with animation */}
            <div>
              {DOCTORS.map((doc) => {
                if (doc.id !== activeDoctorTab) return null;
                return (
                  <motion.div 
                    key={doc.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid md:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-10 border border-natural-border shadow-md"
                    style={{ borderRadius: "40px 8px 40px 8px" }}
                  >
                    {/* Doctor Image with referrer policy */}
                    <div className="md:col-span-5 flex justify-center">
                      <div className="relative w-64 h-64 sm:w-72 sm:h-72 overflow-hidden border-4 border-natural-light shadow-md" style={{ borderRadius: "24px 4px 24px 4px" }}>
                        <img 
                          src={doc.image} 
                          alt={doc.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute bottom-3 left-3 bg-natural-primary/95 text-white text-[10px] font-bold font-mono tracking-widest px-3 py-1 rounded-md shadow-md">
                          {doc.experience}
                        </div>
                      </div>
                    </div>

                    {/* Doctor Info */}
                    <div className="md:col-span-7 space-y-5">
                      <div>
                        <span className="text-[11px] font-mono tracking-widest uppercase font-bold text-natural-accent block">
                          {doc.title}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-natural-dark mt-1">
                          {doc.name}
                        </h3>
                        <p className="text-xs font-mono font-medium text-natural-secondary mt-1">
                          {doc.degree}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-xs font-mono uppercase text-natural-secondary tracking-wider font-bold">Specialization Focus</h4>
                        <p className="text-natural-text text-sm leading-relaxed">
                          {doc.specialization}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-xs font-mono uppercase text-natural-secondary tracking-wider font-bold">About Doctor</h4>
                        <p className="text-natural-text/90 text-sm leading-relaxed font-light">
                          {doc.bio}
                        </p>
                      </div>

                      <blockquote className="border-l-4 border-natural-primary pl-4 py-1.5 italic text-natural-text text-sm bg-natural-light rounded-r-lg font-light">
                        "{doc.philosophy}"
                      </blockquote>

                      <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                        <a 
                          href={`https://wa.me/${CLINIC_CONTACT.whatsapp}?text=${encodeURIComponent(doc.whatsappMessage)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-5 rounded-xl text-xs shadow-md transition-colors inline-flex items-center justify-center gap-2"
                        >
                          <MessageSquare className="w-4.5 h-4.5" /> Book with {doc.name.split(' ')[1]}
                        </a>
                        <a 
                          href="#appointment"
                          onClick={() => {
                            setCalcDoctorId(doc.id);
                          }}
                          className="flex-1 bg-natural-light hover:bg-natural-border/30 text-natural-text font-bold py-3 px-5 rounded-xl text-xs border border-natural-border text-center transition-all"
                        >
                          Check Schedule Slots
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* Zero-Compromise Sterilization Section */}
      <section id="about" className="py-20 bg-natural-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-6">
              <span className="text-xs tracking-widest font-mono uppercase text-natural-primary font-bold bg-natural-primary/10 px-4 py-1.5 rounded-full">
                STERILIZATION & HYGIENE
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-natural-dark tracking-tight leading-tight">
                Our 5-Step Absolute Sterilization Protocol
              </h2>
              <p className="text-natural-text text-base leading-relaxed font-light">
                Your health safety is our fundamental priority. Nagpur Smile Care strictly adheres to international medical sterilization guidelines, exceeding local recommendations to keep you safe from cross-contamination.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-natural-light text-natural-primary rounded-full flex items-center justify-center shrink-0 mt-1 font-bold font-serif text-sm">1</div>
                  <div>
                    <h4 className="text-sm font-bold text-natural-dark">Ultrasonic Pre-Cleaning</h4>
                    <p className="text-xs text-natural-secondary font-light mt-0.5">Instruments undergo highly energetic sound waves to strip debris at the micro-level.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-natural-light text-natural-primary rounded-full flex items-center justify-center shrink-0 mt-1 font-bold font-serif text-sm">2</div>
                  <div>
                    <h4 className="text-sm font-bold text-natural-dark">Surgical Pouch Sealing</h4>
                    <p className="text-xs text-natural-secondary font-light mt-0.5">Every set is packaged in high-tech medical grade indicator paper and heat-sealed hermetically.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-natural-light text-natural-primary rounded-full flex items-center justify-center shrink-0 mt-1 font-bold font-serif text-sm">3</div>
                  <div>
                    <h4 className="text-sm font-bold text-natural-dark">Class B Fractional Vacuum Autoclaving</h4>
                    <p className="text-xs text-natural-secondary font-light mt-0.5">High-pressure steam sterilization destroys 100% of bacterial spores and micro-organisms.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-natural-light text-natural-primary rounded-full flex items-center justify-center shrink-0 mt-1 font-bold font-serif text-sm">4</div>
                  <div>
                    <h4 className="text-sm font-bold text-natural-dark">UV-Sterilized Storage Cabinets</h4>
                    <p className="text-xs text-natural-secondary font-light mt-0.5">Sealed pouches are kept in strict UV-light chambers until opened directly in front of the patient.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-natural-light text-natural-primary rounded-full flex items-center justify-center shrink-0 mt-1 font-bold font-serif text-sm">5</div>
                  <div>
                    <h4 className="text-sm font-bold text-natural-dark">Fresh Patient Disposables</h4>
                    <p className="text-xs text-natural-secondary font-light mt-0.5">A fresh set of medical grade dental chair barriers, cups, gloves, and bibs are unpacked for each patient.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Visual Checklists */}
            <div 
              className="bg-gradient-to-br from-natural-primary to-natural-dark text-white p-8 sm:p-10 border border-natural-border/20 shadow-lg relative"
              style={{ borderRadius: "40px 8px 40px 8px" }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-natural-accent/10 rounded-full blur-2xl"></div>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-natural-dark rounded-lg flex items-center justify-center text-natural-accent shadow-inner">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-serif">Patient Hygiene Assurance</h3>
                  <p className="text-[10px] text-natural-accent uppercase tracking-widest font-mono font-bold">100% Secure Environment</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm font-light text-natural-light/90">
                  <CheckCircle2 className="w-5 h-5 text-natural-accent shrink-0" />
                  <span>ISO 9001:2015 certified sterilization process</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-light text-natural-light/90">
                  <CheckCircle2 className="w-5 h-5 text-natural-accent shrink-0" />
                  <span>Chemical autoclave indicator tape validation</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-light text-natural-light/90">
                  <CheckCircle2 className="w-5 h-5 text-natural-accent shrink-0" />
                  <span>Doctor, assistant double-masking protocols</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-light text-natural-light/90">
                  <CheckCircle2 className="w-5 h-5 text-natural-accent shrink-0" />
                  <span>Water filtration systems back-flushed daily</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-light text-natural-light/90">
                  <CheckCircle2 className="w-5 h-5 text-natural-accent shrink-0" />
                  <span>Continuous clean air filter ventilation</span>
                </div>
              </div>

              <div className="bg-natural-dark/40 p-5 rounded-xl border border-white/10 text-center">
                <p className="text-xs text-natural-light/80 mb-1">Have concerns? Request a physical sterilization walk-through.</p>
                <span className="text-xs text-natural-accent font-bold">We show our autoclave cycles to medical professionals.</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Appointment Planner & WhatsApp Message Generator */}
      <section id="appointment" className="py-20 md:py-28 bg-natural-primary text-white relative overflow-hidden border-y border-natural-border">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-natural-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-natural-dark/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs tracking-widest font-mono uppercase text-natural-accent font-bold bg-natural-dark px-4 py-1.5 rounded-full inline-block border border-white/10 shadow-sm">
                PROMOTIONAL SAVINGS
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
                Plan Your Consultation Price In Real-Time
              </h2>
              <p className="text-natural-light/90 font-light text-sm leading-relaxed">
                Choose your required treatment package and preferred doctor. Our smart estimator applies a <span className="text-natural-accent font-bold">15% online privilege discount</span> on the diagnostics consultation instantly.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="bg-natural-dark p-2 text-natural-accent rounded-lg shrink-0">
                    <Check className="w-4 h-4 text-natural-accent" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Prefilled WhatsApp Drafting</h4>
                    <p className="text-xs text-natural-light/80 mt-0.5">Easily format dates and treatments to bypass long phone queues.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-natural-dark p-2 text-natural-accent rounded-lg shrink-0">
                    <Check className="w-4 h-4 text-natural-accent" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">No Payment Required Online</h4>
                    <p className="text-xs text-natural-light/80 mt-0.5">Pay securely directly at our Dharampeth, Nagpur counter post consult.</p>
                  </div>
                </div>
              </div>

              <div className="bg-natural-dark/40 p-6 rounded-xl border border-white/10 text-center lg:text-left space-y-3">
                <h4 className="text-xs font-mono text-natural-light/70 uppercase tracking-widest">Immediate Urgency?</h4>
                <p className="text-xs text-natural-light/90">Call Nagpur Smile Care Clinic reception directly now.</p>
                <a 
                  href={`tel:${CLINIC_CONTACT.phoneRaw}`} 
                  className="inline-flex items-center gap-2 text-natural-accent font-bold hover:text-white transition-colors text-base"
                >
                  <Phone className="w-4 h-4" /> {CLINIC_CONTACT.phone}
                </a>
              </div>
            </div>

            {/* Right Side Calculator / Form */}
            <div className="lg:col-span-7">
              <div 
                className="bg-white text-natural-dark border border-natural-border p-6 sm:p-10 shadow-xl"
                style={{ borderRadius: "40px 8px 40px 8px" }}
              >
                
                {!isBookedSuccessfully ? (
                  <form onSubmit={handleBookingSubmit} className="space-y-5">
                    <h3 className="text-lg font-serif font-bold text-natural-dark mb-2">Priority Scheduler Estimator</h3>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* Name input */}
                      <div>
                        <label className="block text-xs text-natural-secondary font-mono mb-1.5 uppercase font-bold">Your Full Name *</label>
                        <input 
                          type="text" 
                          required
                          value={calcName}
                          onChange={(e) => setCalcName(e.target.value)}
                          placeholder="e.g. Ramesh Patil" 
                          className="w-full bg-natural-light border border-natural-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-natural-accent focus:ring-1 focus:ring-natural-accent text-natural-dark placeholder-natural-secondary/60"
                        />
                      </div>

                      {/* Phone input */}
                      <div>
                        <label className="block text-xs text-natural-secondary font-mono mb-1.5 uppercase font-bold">Contact Mobile *</label>
                        <input 
                          type="tel" 
                          required
                          value={calcPhone}
                          onChange={(e) => setCalcPhone(e.target.value)}
                          placeholder="e.g. 98765 43210" 
                          className="w-full bg-natural-light border border-natural-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-natural-accent focus:ring-1 focus:ring-natural-accent text-natural-dark placeholder-natural-secondary/60"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* Select Service */}
                      <div>
                        <label className="block text-xs text-natural-secondary font-mono mb-1.5 uppercase font-bold">Select Dental Care</label>
                        <select 
                          value={calcServiceId}
                          onChange={(e) => setCalcServiceId(e.target.value)}
                          className="w-full bg-natural-light border border-natural-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-natural-accent text-natural-dark"
                        >
                          {SERVICES.map(s => (
                            <option key={s.id} value={s.id} className="text-natural-dark">{s.title}</option>
                          ))}
                        </select>
                      </div>

                      {/* Select Doctor */}
                      <div>
                        <label className="block text-xs text-natural-secondary font-mono mb-1.5 uppercase font-bold">Consulting Specialist</label>
                        <select 
                          value={calcDoctorId}
                          onChange={(e) => setCalcDoctorId(e.target.value)}
                          className="w-full bg-natural-light border border-natural-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-natural-accent text-natural-dark"
                        >
                          {DOCTORS.map(d => (
                            <option key={d.id} value={d.id} className="text-natural-dark">{d.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* Select Date */}
                      <div>
                        <label className="block text-xs text-natural-secondary font-mono mb-1.5 uppercase font-bold">Preferred Date (Optional)</label>
                        <input 
                          type="date" 
                          value={calcDate}
                          onChange={(e) => setCalcDate(e.target.value)}
                          className="w-full bg-natural-light border border-natural-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-natural-accent text-natural-dark"
                        />
                      </div>

                      {/* Select Time */}
                      <div>
                        <label className="block text-xs text-natural-secondary font-mono mb-1.5 uppercase font-bold">Preferred Time Slot</label>
                        <select 
                          value={calcTime}
                          onChange={(e) => setCalcTime(e.target.value)}
                          className="w-full bg-natural-light border border-natural-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-natural-accent text-natural-dark"
                        >
                          <option value="10:30 AM" className="text-natural-dark">Morning (10:30 AM - 12:00 PM)</option>
                          <option value="12:30 PM" className="text-natural-dark">Afternoon (12:30 PM - 02:00 PM)</option>
                          <option value="05:30 PM" className="text-natural-dark">Evening (05:30 PM - 07:00 PM)</option>
                          <option value="07:30 PM" className="text-natural-dark">Late Evening (07:30 PM - 09:00 PM)</option>
                        </select>
                      </div>
                    </div>

                    {/* Price Breakdown display card */}
                    <div className="bg-natural-light p-5 rounded-xl border border-natural-border space-y-3">
                      <div className="flex justify-between items-center text-xs text-natural-secondary font-medium">
                        <span>Treatment Package</span>
                        <span className="font-bold text-natural-dark font-serif">{currentCalcService.title}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-natural-secondary font-medium">
                        <span>Indicative Base Cost</span>
                        <span className="line-through text-natural-secondary/60">{currentCalcService.cost}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-natural-secondary font-medium">
                        <span>Web Appointment Discount (15%)</span>
                        <span className="text-emerald-600 font-bold">- ₹{discountAmount.toLocaleString('en-IN')}</span>
                      </div>
                      <hr className="border-natural-border" />
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-natural-text font-bold">Estimated Starting Price</span>
                        <span className="text-2xl font-bold text-natural-accent font-serif">₹{estimatedDiscountedCost.toLocaleString('en-IN')}*</span>
                      </div>
                      <span className="block text-[9px] text-natural-secondary/80 leading-normal font-medium">
                        *Indicative cost. Exact dental pathology charges calculated upon clinical physical inspection. No online prepayment required.
                      </span>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-natural-accent hover:bg-natural-accent/90 text-white font-bold py-4 rounded-xl text-xs uppercase tracking-wider transition-all"
                    >
                      Calculate & Draft Booking Message
                    </button>
                  </form>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6 text-center"
                  >
                    <div className="w-16 h-16 bg-natural-light text-natural-accent rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-natural-dark">Draft Message Formed!</h3>
                      <p className="text-natural-text text-sm mt-1">We are ready to send your appointment layout to our clinical desk.</p>
                    </div>

                    <div className="bg-natural-light border border-natural-border text-left p-5 rounded-xl text-natural-dark text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                      {generatedMsgPreview}
                    </div>

                    <div className="space-y-3">
                      <button 
                        onClick={openWhatsAppDirect}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25"
                      >
                        <MessageSquare className="w-5 h-5" /> Send to WhatsApp Reception
                      </button>
                      <button 
                        onClick={() => setIsBookedSuccessfully(false)}
                        className="w-full bg-natural-light hover:bg-natural-border text-natural-text font-bold py-3 rounded-xl text-xs border border-natural-border transition-colors"
                      >
                        Modify Details / Book Another
                      </button>
                    </div>

                    <div className="flex justify-center gap-6 text-xs text-natural-secondary pt-2 border-t border-natural-border">
                      <span>Or dial direct: <strong>{CLINIC_CONTACT.phone}</strong></span>
                    </div>
                  </motion.div>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Patient Testimonials Section with filtering */}
      <section id="testimonials" className="py-20 md:py-28 bg-natural-bg border-b border-natural-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <span className="text-xs tracking-widest font-mono uppercase text-natural-primary font-bold bg-natural-primary/10 px-4 py-1.5 rounded-full">
              PATIENT SUCCESS
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-natural-dark tracking-tight">
              Real Patient Smiles from Nagpur Districts
            </h2>
            <p className="text-natural-text/90 font-light leading-relaxed">
              Read transparent verified experiences of Nagpur residents who underwent painless implants, aligners, and dental transformations with our doctors.
            </p>
          </div>

          {/* Testimonial Filter Row */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {['All', 'Dental Implants', 'Clear Aligners', 'Laser Root Canal', 'Pediatric Care'].map((category) => (
              <button
                key={category}
                onClick={() => setReviewFilter(category)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  reviewFilter === category 
                    ? 'bg-natural-primary text-white shadow-sm' 
                    : 'bg-natural-light text-natural-text hover:bg-natural-border/30'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Grid of Testimonials */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {filteredTestimonials.length > 0 ? (
              filteredTestimonials.map((test) => (
                <div 
                  key={test.id}
                  className="bg-white p-6 sm:p-8 border border-natural-border relative flex flex-col justify-between"
                  style={{ borderRadius: "24px 4px 24px 4px" }}
                >
                  <div className="space-y-4">
                    {/* Stars */}
                    <div className="flex gap-1 text-natural-accent">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-natural-accent" />
                      ))}
                    </div>
                    <p className="text-natural-text text-sm leading-relaxed italic">
                      "{test.text}"
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-natural-border flex justify-between items-center">
                    <div>
                      <h4 className="font-serif font-bold text-natural-dark text-sm">{test.name}</h4>
                      <p className="text-natural-secondary text-xs">{test.location}</p>
                    </div>
                    <span className="bg-natural-light text-natural-primary text-[10px] font-mono font-bold tracking-wider px-2 py-1 rounded">
                      {test.treatment}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-12 bg-white rounded-2xl text-natural-secondary border border-natural-border">
                <Info className="w-8 h-8 mx-auto mb-3 text-natural-secondary" />
                <p className="text-sm font-light">No specific reviews filtered under this category. View "All" category for full list.</p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section id="faqs" className="py-20 md:py-28 bg-natural-light border-t border-natural-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs tracking-widest font-mono uppercase text-natural-primary font-bold bg-natural-primary/10 px-4 py-1.5 rounded-full">
              HAVE QUESTIONS?
            </span>
            <h2 className="text-3xl font-serif font-bold text-natural-dark tracking-tight">
              Frequently Asked Dental Queries
            </h2>
            <p className="text-natural-text font-light text-sm">
              Read honest clarifications about clinical timings, sterilizations, aligners, and payment options.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq) => {
              const isExpanded = expandedFaqId === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="bg-white border border-natural-border shadow-sm overflow-hidden transition-all duration-300"
                  style={{ borderRadius: "16px 4px 16px 4px" }}
                >
                  <button
                    onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                    className="w-full text-left p-5 flex justify-between items-center gap-4 text-natural-dark hover:text-natural-primary transition-colors font-serif font-bold"
                  >
                    <span className="text-sm sm:text-base">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 shrink-0 text-natural-secondary transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="border-t border-natural-border bg-natural-bg/50"
                      >
                        <div className="p-5 text-natural-text text-xs sm:text-sm leading-relaxed font-light font-sans">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Map Pin / Physical Location Highlight Section */}
      <section className="py-16 bg-natural-bg border-t border-natural-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="bg-white p-8 sm:p-12 border border-natural-border flex flex-col md:flex-row justify-between items-center gap-8 shadow-sm"
            style={{ borderRadius: "32px 4px 32px 4px" }}
          >
            <div className="space-y-3 max-w-xl text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <MapPinned className="w-5 h-5 text-natural-accent" />
                <span className="text-xs font-mono tracking-widest uppercase font-bold text-natural-primary">CLINIC LOCATION</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-natural-dark">
                Located in Dharampeth, Nagpur Center
              </h3>
              <p className="text-natural-text text-xs sm:text-sm leading-relaxed font-light">
                {CLINIC_CONTACT.address}
              </p>
              <p className="text-[11px] text-natural-primary font-bold">
                Convenient landmark: Directly opposite Dharampeth Park. Ample car and two-wheeler valet parking.
              </p>
            </div>
            
            <div className="shrink-0 flex flex-col gap-3 w-full sm:w-auto">
              <a 
                href="https://maps.google.com/?q=Dharampeth+Park+Nagpur+Maharashtra"
                target="_blank"
                rel="noreferrer"
                className="bg-natural-primary hover:bg-natural-dark text-white text-xs font-bold py-3.5 px-6 rounded-xl shadow-md text-center flex items-center justify-center gap-2"
              >
                Open Google Maps Location <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a 
                href={`tel:${CLINIC_CONTACT.phoneRaw}`}
                className="bg-natural-light border border-natural-border hover:border-natural-accent text-natural-text text-xs font-bold py-3.5 px-6 rounded-xl text-center flex items-center justify-center gap-2 transition-all"
              >
                Call Clinic Reception <Phone className="w-3.5 h-3.5 text-natural-primary" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Luxury Footer */}
      <footer className="bg-natural-dark text-natural-light/80 text-xs pt-16 pb-12 border-t border-natural-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Column 1: Brand details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-natural-primary flex items-center justify-center text-white" style={{ borderRadius: "10px 2px 10px 2px" }}>
                  <Smile className="w-5 h-5" />
                </div>
                <span className="text-base font-serif font-bold text-white">Nagpur Smile Care</span>
              </div>
              <p className="text-natural-light/60 text-[11px] leading-relaxed font-light">
                Premium multi-specialty dental practice in Dharampeth, Nagpur. Restoring oral health with advanced global diagnostic guidelines.
              </p>
              <div className="pt-2 text-natural-light/60 font-mono text-[10px]">
                ISO 9001:2015 CERTIFIED CLINIC
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="text-xs font-mono uppercase text-natural-accent tracking-wider mb-4 font-bold font-serif">Patient Help</h4>
              <ul className="space-y-2 font-light text-[11px]">
                <li><a href="#services" className="hover:text-natural-accent transition-colors">Our Specializations</a></li>
                <li><a href="#doctors" className="hover:text-natural-accent transition-colors">Meet the MDS Surgeons</a></li>
                <li><a href="#about" className="hover:text-natural-accent transition-colors">Sterilization Norms</a></li>
                <li><a href="#testimonials" className="hover:text-natural-accent transition-colors">Patient Stories</a></li>
                <li><a href="#appointment" className="hover:text-natural-accent transition-colors">Configure Appt Discount</a></li>
              </ul>
            </div>

            {/* Column 3: Contact details */}
            <div>
              <h4 className="text-xs font-mono uppercase text-natural-accent tracking-wider mb-4 font-bold font-serif">Contact Info</h4>
              <ul className="space-y-3 font-light text-[11px] text-natural-light/80">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-natural-accent shrink-0 mt-0.5" />
                  <span>Dharampeth, Nagpur</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-natural-accent shrink-0" />
                  <a href={`tel:${CLINIC_CONTACT.phoneRaw}`} className="hover:text-white transition-colors">{CLINIC_CONTACT.phone}</a>
                </li>
                <li className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-natural-accent shrink-0" />
                  <a href={`https://wa.me/${CLINIC_CONTACT.whatsapp}`} className="hover:text-white transition-colors text-natural-accent font-bold">WhatsApp Helpdesk</a>
                </li>
              </ul>
            </div>

            {/* Column 4: Hours */}
            <div>
              <h4 className="text-xs font-mono uppercase text-natural-accent tracking-wider mb-4 font-bold font-serif">Daily Timings</h4>
              <ul className="space-y-2 font-mono text-[10px] text-natural-light/60">
                <li className="flex justify-between border-b border-white/10 pb-1">
                  <span>Mon - Sat (Morning)</span>
                  <span className="text-white">10:00 AM - 02:00 PM</span>
                </li>
                <li className="flex justify-between border-b border-white/10 pb-1">
                  <span>Mon - Sat (Evening)</span>
                  <span className="text-white">05:00 PM - 09:00 PM</span>
                </li>
                <li className="flex justify-between pb-1">
                  <span>Sundays</span>
                  <span className="text-natural-accent font-sans text-[11px]">By Priority Appt Only</span>
                </li>
              </ul>
            </div>
          </div>

          <hr className="border-white/10 mb-8" />

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-natural-light/40 text-[10px]">
            <p>© {new Date().getFullYear()} Nagpur Smile Care Clinic. All Rights Reserved. Crafted for medical demonstration showcase.</p>
            <div className="flex gap-4">
              <a href="#about" className="hover:text-natural-light/60 transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#about" className="hover:text-natural-light/60 transition-colors">Sterilization Standards</a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
