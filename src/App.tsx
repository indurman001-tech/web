/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Clock, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Droplets, 
  Hammer, 
  Wrench, 
  Flame,
  Menu,
  X,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { cn } from './lib/utils';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

const NAV_LINKS = [
  { name: 'Services', href: '#services' },
  { name: 'About Us', href: '#about' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'Contact', href: '#contact' },
];

const SERVICES = [
  {
    title: 'Residential Plumbing',
    description: 'Expert repairs and maintenance for your home.',
    icon: Droplets,
  },
  {
    title: 'Commercial Services',
    description: 'Durable solutions for businesses and large facilities.',
    icon: Hammer,
  },
  {
    title: 'Water Heater Installation',
    description: 'Energy-efficient hot water systems for your property.',
    icon: Flame,
  },
  {
    title: '24-Hour Emergency Repair',
    description: 'Day or night, we are here when you need us most.',
    icon: Clock,
  },
];

const REVIEWS = [
  {
    name: 'Michael R.',
    text: 'Tucker & Sons saved us at 2 AM when our main line burst. Professional and fast!',
    rating: 5,
  },
  {
    name: 'Sarah J.',
    text: 'The boiler installation was clean and efficient. Best plumbers in New York.',
    rating: 5,
  },
  {
    name: 'David L.',
    text: 'Reliable service and fair pricing. Highly recommend for any commercial work.',
    rating: 4,
  },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-brand-orange selection:text-white">
      {/* Navigation */}
      <nav
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled ? 'bg-white/90 py-3 shadow-md backdrop-blur-md' : 'bg-transparent py-5'
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
          <a href="#" className="flex items-center gap-2">
            <div className="rounded-lg bg-brand-navy p-2 text-white">
              <Wrench size={24} />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-brand-navy md:text-2xl">
              Tucker & Sons <span className="text-brand-orange">Plumbing</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-slate-600 transition-colors hover:text-brand-orange"
              >
                {link.name}
              </a>
            ))}
            <a
              href="tel:+16198538911"
              className="flex items-center gap-2 rounded-full bg-brand-orange px-6 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105 active:scale-95"
            >
              <Phone size={16} />
              Call Now: +1 619-853-8911
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="rounded-lg p-2 text-brand-navy md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-x-0 top-full border-t border-slate-100 bg-white p-6 shadow-xl md:hidden"
            >
              <div className="flex flex-col gap-4">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-lg font-semibold text-slate-900"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                <a
                  href="tel:+16198538911"
                  className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-brand-orange py-4 font-bold text-white"
                >
                  <Phone size={20} />
                  +1 619-853-8911
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32 lg:pt-64">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 -z-10 h-[800px] w-1/2 rounded-bl-[200px] bg-slate-50 md:block hidden" />
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6 flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1.5 text-brand-orange">
                <ShieldCheck size={18} />
                <span className="text-xs font-bold uppercase tracking-wider">Licensed & Insured</span>
              </div>
              <h1 className="font-serif text-5xl font-bold leading-tight text-brand-navy md:text-7xl">
                Expert Plumbing Solutions in <span className="text-brand-orange">New York</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-600 md:text-xl">
                From emergency repairs to complex system installations, Tucker & Sons Plumbing delivers reliable, high-quality service you can trust. Available 24/7.
              </p>
              
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a 
                  href="tel:+16198538911"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-brand-orange bg-brand-orange px-8 py-4 text-lg font-bold text-white transition-all hover:bg-orange-700 sm:w-auto md:px-12"
                >
                  Emergency Service
                </a>
              </div>

              <div className="mt-12 flex items-center gap-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-slate-200">
                      <img 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} 
                        alt="Customer" 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-brand-yellow">
                    {[1, 2, 3, 4].map((i) => <Star key={i} size={18} fill="currentColor" />)}
                    <Star size={18} fill="currentColor" className="opacity-60" />
                  </div>
                  <p className="text-sm font-semibold text-slate-600">
                    <span className="text-slate-900">4.6 Star Rating</span> based on 78+ Google Reviews
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[40px] shadow-2xl md:aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=2600&auto=format&fit=crop"
                  alt="Plumbing System"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent" />
                <div className="absolute bottom-10 left-10 text-white">
                  <p className="text-sm font-bold uppercase tracking-widest opacity-80">Our Recent Work</p>
                  <h3 className="text-2xl font-bold">Industrial Boiler Installation</h3>
                  <p className="mt-2 text-sm opacity-90">Manhattan, NY</p>
                </div>
              </div>
              
              {/* Floating Stat */}
              <div className="absolute -bottom-6 -left-6 rounded-3xl bg-white p-6 shadow-xl md:p-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-orange/10 text-brand-orange">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-tight">Open</p>
                    <p className="text-xl font-bold text-brand-navy">24 Hours / 7 Days</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-brand-navy py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { label: 'Licensed & Insured', icon: ShieldCheck },
              { label: 'Family Owned', icon: Droplets },
              { label: '24/7 Availability', icon: Clock },
              { label: 'Free Estimates', icon: CheckCircle2 },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-3 text-center text-white/80">
                <item.icon size={28} className="text-brand-orange" />
                <span className="text-sm font-bold tracking-wide uppercase">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-serif text-4xl font-bold text-brand-navy md:text-5xl">Our Professional Services</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
              We provide a full range of plumbing solutions with modern equipment and experienced technicians.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service, idx) => (
              <motion.div
                key={service.title}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all hover:shadow-xl"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-brand-navy transition-colors group-hover:bg-brand-orange group-hover:text-white">
                  <service.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-brand-navy">{service.title}</h3>
                <p className="mt-3 text-slate-600">{service.description}</p>
                <div className="mt-6 flex items-center gap-2 text-sm font-bold text-brand-orange">
                  Learn More <ChevronRight size={16} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="overflow-hidden bg-slate-50 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                <div className="space-y-4">
                  <img
                    src="https://images.unsplash.com/photo-1504148455328-43769c17912c?q=80&w=2600"
                    alt="Tools"
                    className="rounded-2xl shadow-md transition-transform hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2600"
                    alt="Technician working"
                    className="rounded-2xl shadow-md transition-transform hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-4 pt-8">
                  <img
                    src="https://images.unsplash.com/photo-1621510456681-23a016df2424?q=80&w=2600"
                    alt="Plumbing work"
                    className="rounded-2xl shadow-md transition-transform hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2600"
                    alt="Modern Bathroom"
                    className="rounded-2xl shadow-md transition-transform hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="hidden space-y-4 pt-4 md:block">
                  <img
                    src="https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=2600"
                    alt="Piping detail"
                    className="rounded-2xl shadow-md transition-transform hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1542013916723-3b60fe33729c?q=80&w=2600"
                    alt="Maintenance"
                    className="rounded-2xl shadow-md transition-transform hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="font-serif text-4xl font-bold text-brand-navy md:text-5xl">Built on Family Values & Local Trust</h2>
              <p className="mt-6 text-lg leading-relaxed text-slate-600">
                Tucker & Sons Plumbing is a family-owned business based in the heart of New York. For over two decades, we have been serving the 5 boroughs with a simple promise: honest work at a fair price.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                Our team is comprised of highly skilled, licensed professionals who treat every home like their own. Whether it's a leaky faucet or a full commercial renovation, we bring the same level of dedication to every job.
              </p>

              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                {[
                  '20+ Years Experience',
                  'Licensed & Insured',
                  'Eco-Friendly Solutions',
                  'Satisfaction Guaranteed',
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-orange text-white">
                      <CheckCircle2 size={20} />
                    </div>
                    <span className="font-bold text-brand-navy">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div>
              <h2 className="font-serif text-4xl font-bold text-brand-navy md:text-5xl">What Our Customers Say</h2>
              <p className="mt-4 text-lg text-slate-600">Don't just take our word for it—read our latest Google Reviews.</p>
            </div>
            <button className="rounded-xl border-2 border-brand-navy px-8 py-3 font-bold text-brand-navy transition-all hover:bg-brand-navy hover:text-white">
              View All 78 Reviews
            </button>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {REVIEWS.map((review, idx) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-3xl bg-slate-50 p-8"
              >
                <div className="mb-4 flex text-brand-yellow">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <p className="text-lg italic text-slate-700">"{review.text}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-300" />
                  <span className="font-bold text-brand-navy">{review.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Map Section */}
      <section id="contact" className="bg-brand-navy py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-white">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <h2 className="font-serif text-4xl font-bold md:text-5xl">Get in Touch</h2>
              <p className="mt-6 text-lg text-white/70">
                Have a plumbing emergency or planning a renovation? Reach out today for a free consultation.
              </p>

              <div className="mt-12 space-y-8">
                <div className="flex items-start gap-6">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-brand-orange">
                    <Phone size={28} />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-white/50">Emergency Call</p>
                    <a href="tel:+16198538911" className="text-2xl font-bold hover:text-brand-orange transition-colors">
                      +1 619-853-8911
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-brand-orange">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-white/50">Our Location</p>
                    <p className="text-xl font-bold">344 E 59th St #9100, New York, NY 10022</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-brand-orange">
                    <Clock size={28} />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-white/50">Operating Hours</p>
                    <p className="text-xl font-bold">Open 24 Hours / 7 Days a Week</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/5 p-4 shadow-2xl">
              <div className="h-[400px] w-full overflow-hidden rounded-[32px] bg-slate-800">
                {!hasValidKey ? (
                  <div className="flex h-full flex-col items-center justify-center p-8 text-center text-white">
                    <MapPin size={48} className="mb-4 text-brand-orange" />
                    <h3 className="text-xl font-bold">Google Maps API Key Required</h3>
                    <p className="mt-2 text-sm text-white/60">
                      Add GOOGLE_MAPS_PLATFORM_KEY to Secrets to enable the service area map.
                    </p>
                  </div>
                ) : (
                  <APIProvider apiKey={API_KEY} version="weekly">
                    <Map
                      defaultCenter={{ lat: 40.7602, lng: -73.9632 }}
                      defaultZoom={13}
                      mapId="DEMO_MAP_ID"
                      internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                      style={{ width: '100%', height: '100%' }}
                    >
                      <AdvancedMarker position={{ lat: 40.7602, lng: -73.9632 }}>
                        <Pin background="#ea580c" borderColor="#fff" glyphColor="#fff" />
                      </AdvancedMarker>
                    </Map>
                  </APIProvider>
                )}
              </div>
              <div className="mt-6 flex flex-col items-center justify-between gap-4 px-4 sm:flex-row">
                <div className="text-center sm:text-left">
                  <p className="font-bold">Serving all of New York City</p>
                  <p className="text-sm text-white/50">Manhattan • Brooklyn • Queens • Bronx</p>
                </div>
                <button className="w-full rounded-2xl bg-brand-orange px-8 py-3 font-bold text-white transition-all hover:bg-orange-700 sm:w-auto">
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-brand-navy p-2 text-white">
                <Wrench size={20} />
              </div>
              <span className="font-serif text-xl font-bold text-brand-navy">Tucker & Sons</span>
            </div>
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Tucker & Sons Plumbing. All Rights Reserved.
            </p>
            <div className="flex gap-6">
              {['Privacy Policy', 'Terms of Service'].map((link) => (
                <a key={link} href="#" className="text-sm font-semibold text-slate-600 hover:text-brand-orange underline underline-offset-4">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

