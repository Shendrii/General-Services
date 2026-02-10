'use client'

const services = [
  {
    title: 'Business Permit Renewal / New Application',
    description: 'We handle all the paperwork and requirements for your business permits, whether you\'re starting fresh or renewing existing ones.',
    icon: '📋'
  },
  {
    title: 'Filing of BIR FORM',
    description: 'Expert assistance with Bureau of Internal Revenue forms and filings to ensure compliance with tax regulations.',
    icon: '📄'
  },
  {
    title: 'SEC Registration',
    description: 'Navigate the Securities and Exchange Commission registration process with our experienced team.',
    icon: '🏢'
  },
  {
    title: 'DTI Registration',
    description: 'Streamlined Department of Trade and Industry registration services for your business needs.',
    icon: '✅'
  },
  {
    title: 'SPA (Special Power of Attorney)',
    description: 'Legal document preparation and filing for Special Power of Attorney arrangements.',
    icon: '⚖️'
  },
  {
    title: 'Business Closure & Reopening',
    description: 'Professional guidance through business closure procedures and support for business reopening.',
    icon: '🔄'
  }
]

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-32 px-4 bg-gradient-to-b from-background via-background to-secondary/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 transition-colors duration-300">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive accounting and business registration services tailored to your needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/80 via-secondary/60 to-primary opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
              
              {/* Diagonal Accent Line */}
              <div className="absolute top-0 left-0 w-full h-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%)'
                }}
              />

              {/* Content */}
              <div className="relative z-10">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300">{service.title}</h3>
                <p className="text-white/80 leading-relaxed group-hover:text-white transition-colors duration-300">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
