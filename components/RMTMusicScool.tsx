'use client';
import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  ChevronDown,
  Star,
  Check,
  Music,
  Users,
  Clock,
  Award,
  ArrowRight,
  Play,
} from 'lucide-react';

const tiers = [
  {
    name: 'Core',
    price: '$150',
    period: '/month',
    blurb: '30 minutes weekly',
    subtitle: 'Guaranteed 4 lessons/mo',
    features: [
      '1:1 live on Zoom',
      'Personalized lesson notes',
      'Beginner to advanced',
      'Flexible rescheduling',
    ],
    cta: 'Start Virtual Lessons',
    popular: false,
  },
  {
    name: 'Enhanced',
    price: '$220',
    period: '/month',
    blurb: '45 minutes weekly',
    subtitle: 'Most Popular Choice',
    features: [
      'Everything in Core',
      'Progress goals + check-ins',
      'Access to student community',
      'Book guide included',
      'Performance opportunities',
    ],
    cta: 'Try a Free Trial',
    popular: true,
  },
  {
    name: 'Premier',
    price: '$285',
    period: '/month',
    blurb: '60 min weekly or 2×30',
    subtitle: 'Best Value Package',
    features: [
      'Everything in Enhanced',
      'Priority scheduling',
      '15% off online classes',
      'Early course access',
      'Monthly progress reports',
    ],
    cta: 'Talk to Us',
    popular: false,
  },
];

const instruments = [
  {
    name: 'Voice',
    emoji: '🎤',
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-50',
  },
  {
    name: 'Piano',
    emoji: '🎹',
    color: 'from-indigo-500 to-purple-500',
    bgColor: 'bg-indigo-50',
  },
  {
    name: 'Guitar',
    emoji: '🎸',
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-50',
  },
  {
    name: 'Violin',
    emoji: '🎻',
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-50',
  },
  {
    name: 'Flute',
    emoji: '🎼',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
  },
  {
    name: 'Drums',
    emoji: '🥁',
    color: 'from-red-500 to-pink-500',
    bgColor: 'bg-red-50',
  },
];

const faqs = [
  {
    q: 'How do Zoom lessons work?',
    a: "Book a time, get a Zoom link by email/text, and meet your instructor live. We warm up, build fundamentals, and learn a song matched to your level. It's just like being in the same room!",
  },
  {
    q: 'Do I need prior experience?',
    a: 'Not at all! We teach complete beginners through advanced students and tailor the plan to your individual goals and learning style.',
  },
  {
    q: 'What about months with 5 weeks?',
    a: "We guarantee four lessons per month—there's no extra charge when a month includes a fifth week. That's our promise to you.",
  },
  {
    q: 'Can I switch instruments or packages?',
    a: "Absolutely! Just let our team know and we'll adjust your plan. We want you to love your musical journey.",
  },
  {
    q: 'What equipment do I need?',
    a: "Just your instrument, a device with a camera (computer, tablet, or phone), and a stable internet connection. We'll guide you through the rest!",
  },
];

const testimonials = [
  {
    text: 'RMT helped my daughter fall in love with music. The teachers are patient, professional, and genuinely care about progress.',
    author: 'Sarah M.',
    role: 'Parent, Piano Student',
    rating: 5,
  },
  {
    text: 'As a band director, RMT has been invaluable. Their instructors complement our program perfectly and students show real improvement.',
    author: 'James K.',
    role: 'High School Band Director',
    rating: 5,
  },
  {
    text: 'The Zoom format works better than I expected! My son looks forward to his lessons every week. Best decision we made this year.',
    author: 'Michelle R.',
    role: 'Parent, Guitar Student',
    rating: 5,
  },
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// AnimatedSection component using Intersection Observer
interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: any;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  animation = fadeInUp,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? 'translateY(0) scale(1)'
          : animation === fadeInUp
          ? 'translateY(60px)'
          : animation === scaleIn
          ? 'scale(0.8)'
          : 'translateY(0)',
        transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {children}
    </div>
  );
};

export default function RMTMusicSchool() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeInstrument, setActiveInstrument] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(3deg);
          }
        }
        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 1;
            box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
          }
          50% {
            opacity: 0.8;
            box-shadow: 0 0 40px rgba(99, 102, 241, 0.5);
          }
        }
        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes slide-up {
          from {
            transform: translateY(100px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 6s ease-in-out infinite;
          animation-delay: 3s;
        }
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 6s ease infinite;
        }
        .glass-effect {
          backdrop-filter: blur(12px) saturate(180%);
          background: rgba(255, 255, 255, 0.92);
        }
        html {
          scroll-behavior: smooth;
        }
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .hover-lift:hover {
          transform: translateY(-8px);
        }
      `}</style>

      {/* Referral Banner */}
      <div className="w-full bg-linear-to-r from-indigo-700 via-purple-700 to-pink-600 text-white text-xs sm:text-sm animate-gradient">
        <div className="mx-auto max-w-7xl px-4 py-2.5 sm:py-3 text-center">
          <span className="font-bold">🎁 Limited Time:</span> Refer a friend and
          you both get{' '}
          <span className="font-bold px-1.5 py-0.5 bg-white/20 rounded">
            $25 off
          </span>{' '}
          your next month!
          <a
            className="ml-2 underline underline-offset-2 hover:text-white/80 transition-colors font-medium"
            href="#referral"
          >
            Learn more →
          </a>
        </div>
      </div>

      {/* Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-effect shadow-xl' : 'bg-white/95 backdrop-blur-sm'
        } border-b border-slate-200`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="h-10 w-10 sm:h-12 sm:w-12 grid place-items-center rounded-xl bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-pulse-glow">
              <Music className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="leading-tight">
              <div className="font-extrabold tracking-tight text-sm sm:text-base lg:text-lg bg-linear-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
                RMT Music & Fine Art
              </div>
              <div className="text-xs text-slate-500 hidden sm:block">
                Learn anywhere • Love every lesson
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium">
            {[
              { href: '#instruments', label: 'Instruments' },
              { href: '#pricing', label: 'Pricing' },
              { href: '#guitar', label: 'Beginner Guitar' },
              { href: '#directors', label: 'For Directors' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-indigo-700 transition-all duration-300 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-indigo-700 to-purple-700 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
            <a
              href="#book"
              className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-indigo-700 via-purple-700 to-pink-600 px-5 py-2.5 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <span>Start Lessons</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden glass-effect border-t border-slate-200"
            style={{ animation: 'slide-up 0.3s ease-out' }}
          >
            <div className="px-4 py-6 space-y-4">
              {[
                { href: '#instruments', label: 'Instruments' },
                { href: '#pricing', label: 'Pricing' },
                { href: '#guitar', label: 'Beginner Guitar' },
                { href: '#directors', label: 'For Directors' },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 font-medium hover:text-indigo-700 transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#book"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-700 to-purple-700 px-5 py-3 text-white font-bold shadow-md"
              >
                <span>Start Lessons</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-400 rounded-full filter blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl animate-float-delayed"></div>
          <div
            className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-300 rounded-full filter blur-3xl animate-float"
            style={{ animationDelay: '1.5s' }}
          ></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <AnimatedSection className="space-y-6 sm:space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-sm border border-indigo-200 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 shadow-lg hover:shadow-xl transition-all duration-300">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span>Live Zoom Lessons • Available Now</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
                Music lessons that kids{' '}
                <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                  love
                </span>
                —and parents{' '}
                <span className="bg-linear-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent animate-gradient">
                  trust
                </span>
              </h1>

              <p className="text-lg sm:text-xl lg:text-2xl text-slate-700 leading-relaxed font-medium">
                Expert teachers • Free 15-minute trial • Flexible scheduling •
                Real progress every month
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#book"
                  className="group text-center rounded-2xl bg-linear-to-r from-indigo-700 via-purple-700 to-pink-600 px-8 py-4 text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Book a Free Trial</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#pricing"
                  className="text-center rounded-2xl border-2 border-slate-300 bg-white/50 backdrop-blur-sm px-8 py-4 font-bold text-lg hover:bg-white hover:border-indigo-700 hover:text-indigo-700 hover:shadow-xl transition-all duration-300"
                >
                  See Packages
                </a>
              </div>

              <div className="flex items-center gap-4 text-sm sm:text-base text-slate-600 pt-4">
                <div className="flex -space-x-3">
                  {[
                    'from-amber-400 to-orange-400',
                    'from-indigo-400 to-purple-400',
                    'from-emerald-400 to-teal-400',
                    'from-pink-400 to-rose-400',
                  ].map((gradient, i) => (
                    <div
                      key={i}
                      className={`h-10 w-10 rounded-full bg-linear-to-br ${gradient} border-3 border-white shadow-lg hover:scale-110 transition-transform duration-300`}
                      style={{ zIndex: 4 - i }}
                    />
                  ))}
                  <div className="h-10 w-10 rounded-full bg-linear-to-br from-slate-700 to-slate-900 border-3 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold hover:scale-110 transition-transform duration-300">
                    +500
                  </div>
                </div>
                <div>
                  <div className="font-bold">
                    Trusted by families nationwide
                  </div>
                  <div className="text-xs text-slate-500">
                    Directors & students love us
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection className="relative">
              <div className="relative aspect-video w-full rounded-3xl bg-linear-to-br from-indigo-100 via-purple-100 to-pink-100 border-4 border-white shadow-2xl overflow-hidden group hover-lift">
                <div className="absolute inset-0 bg-linear-to-br from-indigo-600/10 via-purple-600/10 to-pink-600/10 group-hover:from-indigo-600/20 group-hover:via-purple-600/20 group-hover:to-pink-600/20 transition-all duration-500"></div>
                <div className="relative h-full flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-8 h-8 text-indigo-700 ml-1" />
                    </div>
                    <p className="text-xl font-bold mb-2">
                      See Our Students Shine
                    </p>
                    <p className="text-sm text-slate-600">
                      Watch real lessons in action
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating benefit card */}
              <div className="absolute -bottom-6 -left-6 hidden md:block animate-float">
                <div className="rounded-2xl bg-white/95 backdrop-blur-sm border-2 border-indigo-200 shadow-2xl p-6 max-w-xs">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
                      <Check className="w-6 h-6 text-white" />
                    </div>
                    <div className="font-bold text-lg">What you'll get</div>
                  </div>
                  <ul className="space-y-3 text-sm text-slate-700">
                    {[
                      'Personalized lesson plan',
                      'Friendly, vetted instructors',
                      'Clear next steps after trial',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="mt-1 h-2 w-2 rounded-full bg-linear-to-r from-indigo-700 to-purple-700"></div>
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features/Highlights */}
      <section className="border-t border-slate-200 bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                icon: <Award className="w-8 h-8" />,
                title: 'Guaranteed Progress',
                desc: 'Four lessons per month, every month. No extra charge on 5-week months.',
                color: 'from-indigo-500 to-purple-500',
                bgColor: 'bg-indigo-50',
              },
              {
                icon: <Music className="w-8 h-8" />,
                title: 'Flexible & Fun',
                desc: 'Beginner-friendly lessons that build confidence and real musical skill.',
                color: 'from-purple-500 to-pink-500',
                bgColor: 'bg-purple-50',
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Parents Welcome',
                desc: 'Transparent goals, detailed notes, and simple monthly plans you can trust.',
                color: 'from-pink-500 to-rose-500',
                bgColor: 'bg-pink-50',
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: 'For Directors, Too',
                desc: 'Private lessons, masterclasses, accompaniment, and program support.',
                color: 'from-amber-500 to-orange-500',
                bgColor: 'bg-amber-50',
              },
            ].map((item, i) => (
              <AnimatedSection key={item.title}>
                <div
                  className={`rounded-3xl border-2 border-slate-200 p-8 ${item.bgColor} shadow-lg hover:shadow-2xl hover-lift h-full`}
                >
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br ${item.color} text-white shadow-lg mb-6`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Instruments Section */}
      <section
        id="instruments"
        className="border-t border-slate-200 bg-linear-to-b from-slate-50 to-white py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12 lg:mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              Choose your{' '}
              <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                instrument
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Start with your favorite—switch anytime. Every journey begins with
              a single note.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {instruments.map((ins, i) => (
              <AnimatedSection key={ins.name}>
                <div
                  className={`group relative rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-110 cursor-pointer overflow-hidden ${
                    activeInstrument === ins.name
                      ? 'ring-4 ring-indigo-300'
                      : ''
                  }`}
                  onMouseEnter={() => setActiveInstrument(ins.name)}
                  onMouseLeave={() => setActiveInstrument(null)}
                >
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${ins.color} opacity-0 group-hover:opacity-15 transition-all duration-500`}
                  ></div>
                  <div className="relative">
                    <div className="text-5xl sm:text-6xl mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                      {ins.emoji}
                    </div>
                    <div className="font-bold text-base sm:text-lg mb-2">
                      {ins.name}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-500 font-medium">
                      Beginner to Advanced
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Beginner Guitar Course */}
      <section
        id="guitar"
        className="relative bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50 border-t border-slate-200 py-16 sm:py-20 lg:py-24 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-80 h-80 bg-amber-400 rounded-full filter blur-3xl animate-float"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-orange-300 rounded-full filter blur-3xl animate-float-delayed"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-sm border border-amber-200 px-4 py-2 text-sm font-semibold text-amber-900 shadow-lg mb-6">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>New Course Available</span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
                Beginner{' '}
                <span className="bg-linear-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
                  Guitar
                </span>{' '}
                Course
              </h2>

              <p className="text-lg sm:text-xl text-slate-700 mb-8 leading-relaxed font-medium">
                Self-paced modules + live Q&A sessions. Perfect for brand-new
                players who want quick wins and solid fundamentals.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  {
                    icon: <Check className="w-5 h-5" />,
                    text: 'Free Module 1 Preview',
                    highlight: true,
                  },
                  {
                    icon: <Music className="w-5 h-5" />,
                    text: '5 Core Modules with Video Lessons',
                  },
                  {
                    icon: <Users className="w-5 h-5" />,
                    text: 'Weekly Live Q&A Sessions',
                  },
                  {
                    icon: <Award className="w-5 h-5" />,
                    text: 'Certificate of Completion',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div
                      className={`shrink-0 h-12 w-12 rounded-xl bg-linear-to-br ${
                        item.highlight
                          ? 'from-amber-500 to-orange-500'
                          : 'from-amber-400 to-orange-400'
                      } flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      {item.icon}
                    </div>
                    <span className="text-base sm:text-lg text-slate-700 font-semibold">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#"
                  className="group text-center rounded-xl bg-linear-to-r from-amber-500 via-orange-500 to-yellow-500 px-8 py-4 text-white font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Try Free Module</span>
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="#"
                  className="text-center rounded-xl border-2 border-amber-300 bg-white/50 backdrop-blur-sm px-8 py-4 font-bold hover:bg-white hover:border-amber-500 hover:text-amber-700 hover:shadow-xl transition-all duration-300"
                >
                  Join Waitlist
                </a>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="rounded-3xl border-4 border-amber-200 bg-white p-8 sm:p-12 shadow-2xl hover:shadow-3xl hover-lift">
                <div className="text-center">
                  <div className="text-8xl sm:text-9xl mb-6 animate-float">
                    🎸
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold mb-3 bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    Course Preview
                  </div>
                  <div className="text-slate-600 mb-6">
                    5-week journey to your first song
                  </div>
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-br from-amber-500 to-orange-500 text-white shadow-xl hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <Play className="w-8 h-8 ml-1" />
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="bg-linear-to-b from-slate-50 via-white to-slate-50 border-t border-slate-200 py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12 lg:mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              Simple{' '}
              <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                monthly
              </span>{' '}
              plans
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Cancel anytime. Upgrade or switch instruments whenever you like.
              No hidden fees.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-10">
            {tiers.map((tier, i) => (
              <AnimatedSection key={tier.name}>
                <div
                  className={`relative rounded-3xl border-2 ${
                    tier.popular
                      ? 'border-indigo-400 ring-4 ring-indigo-200 scale-105 shadow-2xl'
                      : 'border-slate-200 shadow-xl'
                  } bg-white p-8 hover:shadow-2xl hover-lift transition-all duration-500 h-full flex flex-col`}
                >
                  {tier.popular && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-linear-to-r from-indigo-700 via-purple-700 to-pink-600 px-6 py-2 text-sm font-bold text-white shadow-xl flex items-center gap-2">
                      <Star className="w-4 h-4 fill-white" />
                      <span>Most Popular</span>
                    </div>
                  )}

                  <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
                    {tier.name}
                  </div>

                  <div className="flex items-baseline gap-2 mb-3">
                    <div className="text-5xl sm:text-6xl font-extrabold bg-linear-to-r from-indigo-700 via-purple-700 to-pink-600 bg-clip-text text-transparent">
                      {tier.price}
                    </div>
                    <div className="text-slate-500 font-medium">
                      {tier.period}
                    </div>
                  </div>

                  <div className="text-lg font-bold text-slate-900 mb-1">
                    {tier.blurb}
                  </div>
                  <div className="text-sm text-slate-600 font-medium mb-8 pb-8 border-b-2 border-slate-100">
                    {tier.subtitle}
                  </div>

                  <ul className="space-y-4 mb-8 grow">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 group">
                        <div className="shrink-0 mt-0.5">
                          <div className="h-6 w-6 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        <span className="text-slate-700 font-medium leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#book"
                    className={`w-full text-center rounded-xl ${
                      tier.popular
                        ? 'bg-linear-to-r from-indigo-700 via-purple-700 to-pink-600'
                        : 'bg-linear-to-r from-slate-700 to-slate-900'
                    } px-6 py-4 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2`}
                  >
                    <span>{tier.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <div
              id="referral"
              className="rounded-2xl border-2 border-dashed border-indigo-300 bg-linear-to-r from-indigo-50 via-purple-50 to-pink-50 px-8 py-6 text-center shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-xl sm:text-2xl font-bold text-indigo-900 flex items-center justify-center gap-3 flex-wrap">
                <span className="text-3xl">🎁</span>
                <span>
                  Refer a friend and you both get{' '}
                  <span className="bg-linear-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
                    $25 off
                  </span>{' '}
                  your next month!
                </span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white border-t border-slate-200 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12 lg:mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              What{' '}
              <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                families
              </span>{' '}
              are saying
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
              Real stories from our vibrant community of students and parents
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, i) => (
              <AnimatedSection key={i}>
                <div className="rounded-3xl border-2 border-slate-200 bg-linear-to-br from-white to-slate-50 p-8 shadow-lg hover:shadow-2xl hover-lift h-full flex flex-col">
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  <p className="text-slate-700 text-lg leading-relaxed mb-6 grow italic">
                    "{testimonial.text}"
                  </p>

                  <div className="border-t-2 border-slate-200 pt-4">
                    <div className="font-bold text-slate-900">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-slate-600 font-medium">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Directors Section */}
      <section
        id="directors"
        className="bg-linear-to-b from-slate-900 to-slate-800 text-white border-t border-slate-700 py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 text-sm font-semibold shadow-lg mb-6">
                <Award className="w-4 h-4" />
                <span>For Music Educators</span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
                For Band & Choir{' '}
                <span className="bg-linear-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  Directors
                </span>
              </h2>

              <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed">
                Private lessons, masterclasses, festival prep, accompaniment,
                and sectional support. Plug our team into your program and
                lighten your load.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  'Private student lessons',
                  'Group masterclasses',
                  'Festival & audition prep',
                  'Piano accompaniment',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="shrink-0 h-12 w-12 rounded-xl bg-linear-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Check className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-lg font-semibold">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#"
                  className="group text-center rounded-xl bg-white text-slate-900 px-8 py-4 font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>View Services</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#"
                  className="text-center rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm px-8 py-4 font-bold hover:bg-white/20 hover:border-white/50 hover:shadow-xl transition-all duration-300"
                >
                  Request a Call
                </a>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    title: 'Private Lessons',
                    icon: <Users className="w-6 h-6" />,
                    color: 'from-indigo-500 to-purple-500',
                  },
                  {
                    title: 'Masterclasses',
                    icon: <Award className="w-6 h-6" />,
                    color: 'from-purple-500 to-pink-500',
                  },
                  {
                    title: 'Accompaniment',
                    icon: <Music className="w-6 h-6" />,
                    color: 'from-pink-500 to-rose-500',
                  },
                  {
                    title: 'Festival Prep',
                    icon: <Star className="w-6 h-6" />,
                    color: 'from-amber-500 to-orange-500',
                  },
                ].map((service, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border-2 border-white/20 bg-white/10 backdrop-blur-sm p-6 hover:bg-white/20 hover:scale-105 transition-all duration-300 text-center"
                  >
                    <div
                      className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-linear-to-br ${service.color} mb-4 shadow-lg`}
                    >
                      {service.icon}
                    </div>
                    <div className="font-bold text-lg">{service.title}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section
        id="book"
        className="bg-linear-to-b from-white to-slate-50 border-t border-slate-200 py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12 lg:mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              Ready to{' '}
              <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                start
              </span>{' '}
              your journey?
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
              Book your free 15-minute trial lesson today. No credit card
              required.
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-8">
            <AnimatedSection>
              <div className="rounded-3xl border-2 border-slate-200 bg-white p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-500">
                <div className="text-xl font-bold mb-6 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold shadow-lg">
                    1
                  </div>
                  <span>Quick Info</span>
                </div>

                <form className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Student Name
                    </label>
                    <input
                      className="w-full rounded-xl border-2 border-slate-300 px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 outline-none"
                      placeholder="Enter student's name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Parent Email
                    </label>
                    <input
                      type="email"
                      className="w-full rounded-xl border-2 border-slate-300 px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 outline-none"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Instrument
                    </label>
                    <select className="w-full rounded-xl border-2 border-slate-300 px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 outline-none">
                      <option>Select an instrument</option>
                      {instruments.map((i) => (
                        <option key={i.name}>
                          {i.emoji} {i.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Goals or Experience (Optional)
                    </label>
                    <textarea
                      className="w-full rounded-xl border-2 border-slate-300 px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 outline-none"
                      placeholder="Tell us about your musical goals..."
                      rows={4}
                    />
                  </div>

                  <button
                    type="button"
                    className="w-full rounded-xl bg-linear-to-r from-indigo-700 via-purple-700 to-pink-600 px-6 py-4 text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>Continue to Pick a Time</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="rounded-3xl border-2 border-slate-200 bg-linear-to-br from-indigo-50 to-purple-50 p-8 sm:p-10 shadow-xl h-full flex flex-col items-center justify-center text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 text-white mb-6 shadow-xl animate-pulse-glow">
                  <Clock className="w-10 h-10" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                  Choose Your Time
                </h3>
                <p className="text-slate-600 mb-6 max-w-md">
                  After submitting your info, you'll see our calendar to pick
                  the perfect time for your free trial lesson.
                </p>

                <div className="text-8xl mb-4 animate-float">🗓️</div>
                <p className="text-sm text-slate-500">
                  Scheduler integration (Calendly/similar)
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className="bg-white border-t border-slate-200 py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12 lg:mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              Frequently Asked{' '}
              <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mt-8">
                Questions
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-600">
              Everything you need to know about our lessons
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="divide-y divide-slate-200 rounded-3xl border-2 border-slate-200 bg-white shadow-xl overflow-hidden">
              {faqs.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-8 hover:bg-slate-50 transition-colors duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="flex w-full items-center justify-between text-left group"
                  >
                    <span className="font-bold text-lg sm:text-xl text-slate-900 group-hover:text-indigo-700 transition-colors pr-4">
                      {item.q}
                    </span>
                    <div
                      className={`shrink-0 h-10 w-10 rounded-xl bg-linear-to-br ${
                        openFaq === idx
                          ? 'from-indigo-500 to-purple-500'
                          : 'from-slate-200 to-slate-300'
                      } flex items-center justify-center text-white font-bold shadow-md transition-all duration-300 ${
                        openFaq === idx ? 'rotate-45' : ''
                      }`}
                    >
                      <span className="text-xl">+</span>
                    </div>
                  </button>

                  <div
                    className="overflow-hidden transition-all duration-500"
                    style={{
                      maxHeight: openFaq === idx ? '500px' : '0',
                      opacity: openFaq === idx ? 1 : 0,
                    }}
                  >
                    <p className="mt-4 text-slate-700 leading-relaxed text-base sm:text-lg">
                      {item.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-linear-to-b from-slate-50 to-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid md:grid-cols-4 gap-8 lg:gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-xl bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 text-white shadow-lg flex items-center justify-center">
                  <Music className="w-6 h-6" />
                </div>
                <div className="font-extrabold text-xl bg-linear-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
                  RMT Music & Fine Art
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6 max-w-md">
                Zoom-based private lessons for voice, piano, guitar, and all
                band/orchestra instruments. Trusted by families and directors
                nationwide.
              </p>
              <div className="flex gap-3">
                {['IG', 'FB', 'YT'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="h-10 w-10 rounded-lg bg-linear-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-sm shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div className="font-bold text-lg mb-4 text-slate-900">
                Quick Links
              </div>
              <ul className="space-y-3">
                {[
                  { href: '#instruments', label: 'Instruments' },
                  { href: '#pricing', label: 'Pricing' },
                  { href: '#guitar', label: 'Guitar Course' },
                  { href: '#book', label: 'Book a Trial' },
                  { href: '#faq', label: 'FAQs' },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-slate-600 hover:text-indigo-700 transition-colors font-medium flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all duration-300" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="font-bold text-lg mb-4 text-slate-900">
                Contact Us
              </div>
              <ul className="space-y-3 text-slate-600">
                <li className="font-medium">
                  <a
                    href="mailto:hello@rmtmusic.com"
                    className="hover:text-indigo-700 transition-colors"
                  >
                    hello@rmtmusic.com
                  </a>
                </li>
                <li className="font-medium">
                  <a
                    href="tel:5551234567"
                    className="hover:text-indigo-700 transition-colors"
                  >
                    (555) 123-4567
                  </a>
                </li>
                <li className="font-medium">@rmtmusic on social</li>
              </ul>
            </div>
          </div>

          <div className="border-t-2 border-slate-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <div>
              © {new Date().getFullYear()} RMT Music & Fine Art. All rights
              reserved.
            </div>
            <div className="flex gap-6">
              <a
                href="#"
                className="hover:text-indigo-700 transition-colors font-medium"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-indigo-700 transition-colors font-medium"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
