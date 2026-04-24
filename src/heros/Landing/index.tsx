'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import { ArrowRight, Info } from 'lucide-react'

import type { Page } from '@/payload-types'

import { getMediaUrl } from '@/utilities/getMediaUrl'

export const LandingHero: React.FC<Page['hero']> = ({
  media,
  badge,
  title,
  description,
  links,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  })

  return (
    <section className="py-16 md:py-24 px-6 bg-slate-50">
      <div className="container px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8 order-2 md:order-1">
          {badge && (
            <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-md uppercase tracking-wider">
              {badge}
            </div>
          )}

          {title && (
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
              {title}
            </h1>
          )}

          {description && <p className="text-lg text-slate-600 max-w-lg">{description}</p>}
          {links && links.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.link.url || '#'}
                  className={
                    link.link.appearance === 'default'
                      ? 'bg-blue-800 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-900 transition-all shadow-lg hover:shadow-blue-800/20'
                      : 'border-2 border-slate-200 bg-white px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all'
                  }
                >
                  {link.link.label}
                  {link.link.appearance === 'default' && <ArrowRight size={20} />}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Right Image */}
        <div className="relative flex justify-center items-center order-1 md:order-2">
          <div className="absolute w-[85%] h-[85%] bg-indigo-200/40 rounded-full blur-[80px] -z-10"></div>

          <div className="relative w-full max-w-md transition-transform duration-700 hover:scale-[1.02]">
            <div className="relative w-full aspect-square rounded-full border-10 border-white shadow-[0_32px_80px_-15px_rgba(0,0,0,0.15)] overflow-hidden">
              <img
                src={
                  media && typeof media === 'object' && 'url' in media
                    ? getMediaUrl(media.url)
                    : '/assets/landingpagebanner.jpg'
                }
                alt="Teacher and student learning French"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Info Card */}
            <div
              className="absolute -bottom-6 right-0 md:-right-10 bg-white/95 backdrop-blur p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce"
              style={{ animationDuration: '4s' }}
            >
              <div className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center text-white">
                <Info size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                  New Enrolments
                </p>
                <p className="text-sm font-bold text-slate-900">We're accepting inquiries</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
