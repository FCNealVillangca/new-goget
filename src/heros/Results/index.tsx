'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import { Star } from 'lucide-react'

import type { Page } from '@/payload-types'

export const ResultsHero: React.FC<Page['hero']> = ({ media }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  })

  const avatars = [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
  ]

  return (
    <section className="py-16 md:py-24 px-6 bg-slate-50 overflow-hidden">
      <div className="container px-6 py-20 relative text-center flex flex-col items-center">
        {/* Social Proof Badge */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="flex -space-x-4">
            {avatars.map((url, i) => (
              <img
                key={i}
                src={url}
                className="w-12 h-12 rounded-full border-4 border-white object-cover"
                alt="Student"
                referrerPolicy="no-referrer"
              />
            ))}
            <div className="w-12 h-12 rounded-full border-4 border-white bg-blue-600 text-white flex items-center justify-center text-xs font-bold ring-1 ring-slate-100">
              +1K
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
              4.9/5 Student Rating
            </span>
          </div>
        </div>

        {/* Massive Hero Headline */}
        <div className="relative">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-[0.85] tracking-tighter text-slate-900 mb-16">
            Built for <span className="italic text-blue-600 block md:inline">results.</span> <br />
            Loved by <span className="font-light italic text-slate-400">students.</span>
          </h1>
        </div>

        {/* Featured Review */}
        <div className="max-w-3xl flex flex-col items-center">
          <p className="text-xl md:text-2xl font-serif italic text-slate-500 leading-relaxed text-center">
            "I went from a Grade 5 to a Grade 9 in just one term. The structure gave me the
            confidence I never thought I'd have in French."
          </p>
        </div>

        {/* Floating Abstract Accents */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-blue-50/40 blur-[100px] -z-10 rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-50 group blur-[120px] -z-10 rounded-full" />
      </div>
    </section>
  )
}
