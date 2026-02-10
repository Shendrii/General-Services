'use client';

import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter } from 'lucide-react'

interface FooterProps {
  onInquireClick: () => void
}

export default function Footer({ onInquireClick }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-primary/5 to-primary/15 border-t border-border/50 mt-auto">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0ms' }}>
            <h3 className="text-2xl font-bold text-primary mb-4 transition-colors duration-300">General Services</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Your trusted accounting and business registration partner since 2020. Dedicated to simplifying complex regulatory requirements.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-lg bg-secondary/10 hover:bg-secondary/20 text-secondary transition-all duration-300 hover:scale-110">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 rounded-lg bg-secondary/10 hover:bg-secondary/20 text-secondary transition-all duration-300 hover:scale-110">
                <Linkedin size={20} />
              </a>
              <a href="#" className="p-2 rounded-lg bg-secondary/10 hover:bg-secondary/20 text-secondary transition-all duration-300 hover:scale-110">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <h4 className="text-lg font-bold text-primary mb-6 transition-colors duration-300">Contact</h4>
            <div className="space-y-4">
              <a href="tel:0000" className="flex items-start gap-3 text-muted-foreground hover:text-secondary transition-colors duration-300 group">
                <Phone size={20} className="flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:translate-x-1 transition-transform duration-300">0000</span>
              </a>
              <a href="mailto:test" className="flex items-start gap-3 text-muted-foreground hover:text-secondary transition-colors duration-300 group">
                <Mail size={20} className="flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:translate-x-1 transition-transform duration-300">test</span>
              </a>
              <a href="#" className="flex items-start gap-3 text-muted-foreground hover:text-secondary transition-colors duration-300 group">
                <MapPin size={20} className="flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:translate-x-1 transition-transform duration-300">Sto.Tomas Batangas</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <h4 className="text-lg font-bold text-primary mb-6 transition-colors duration-300">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#services" className="text-muted-foreground hover:text-secondary transition-all duration-300 inline-block hover:translate-x-1">Our Services</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-secondary transition-all duration-300 inline-block hover:translate-x-1">About Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-secondary transition-all duration-300 inline-block hover:translate-x-1">Blog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-secondary transition-all duration-300 inline-block hover:translate-x-1">FAQs</a></li>
            </ul>
          </div>

          {/* Call to Action */}
          <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <h4 className="text-lg font-bold text-primary mb-6 transition-colors duration-300">Ready to Get Started?</h4>
            <p className="text-muted-foreground mb-4">
              Let us handle your accounting and registration needs so you can focus on your business.
            </p>
            <button
              onClick={onInquireClick}
              className="w-full px-6 py-3 bg-secondary text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
            >
              Send Inquiry
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 pt-8">
          <div className="grid md:grid-cols-3 gap-4 items-center">
            <p className="text-sm text-muted-foreground">
              © {currentYear} General Services. All rights reserved.
            </p>
            <div className="flex justify-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-secondary transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-secondary transition-colors duration-300">Terms of Service</a>
            </div>
            <p className="text-sm text-muted-foreground text-right">
              Made with care for your business.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
