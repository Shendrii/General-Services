'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Hero from '@/components/hero'
import Services from '@/components/services'
import Footer from '@/components/footer'
import InquiryModal from '@/components/inquiry-modal'

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <Hero onInquireClick={() => setIsModalOpen(true)} />
      <Services />
      <Footer onInquireClick={() => setIsModalOpen(true)} />

      {/* Floating Inquiry Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 rounded-full bg-accent text-accent-foreground shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 w-14 h-14 flex items-center justify-center text-2xl z-40 animate-pulse-soft"
        aria-label="Open inquiry form"
      >
        ✉️
      </button>

      {/* Inquiry Modal */}
      <InquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
