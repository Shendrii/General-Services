'use client';

import { Button } from '@/components/ui/button'

export default function Hero({ onInquireClick }: { onInquireClick: () => void }) {
  return (
    <section className="relative bg-gradient-to-br from-primary via-secondary to-primary py-20 md:py-40 px-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <div className="inline-block bg-white/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm border border-white/20 animate-fade-in-up transition-all duration-300 hover:bg-white/20">
          Trusted by Local Businesses
        </div>
        
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          Professional Accounting Services You Can Rely On
        </h2>
        
        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          We simplify your business compliance and filing requirements so you can focus on growing your business. From registration to closure, we've got you covered.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <Button 
            onClick={onInquireClick}
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-base transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
          >
            Get Started Today
          </Button>
          <Button 
            variant="outline"
            className="border-white text-white hover:bg-white/20 px-8 py-3 text-base bg-white/10 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  )
}
