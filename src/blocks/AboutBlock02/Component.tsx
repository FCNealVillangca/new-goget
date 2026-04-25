/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react'
import { ArrowRight, Layers, Megaphone, TrendingUp, MessageSquare, Zap, Target } from 'lucide-react'
import type { AboutBlock02Block as AboutBlock02BlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import { getBackgroundClass, getCustomBackgroundCSS } from '@/utilities/getBackground'
import { cn } from '@/utilities/ui'

const iconMap = {
  layers: Layers,
  megaphone: Megaphone,
  trendingUp: TrendingUp,
  messageSquare: MessageSquare,
  zap: Zap,
  target: Target,
}

const defaultCards = [
  {
    title: 'Clear exam-focused structure',
    description:
      'Every lesson follows a step-by-step plan aligned with GCSE & A-Level requirements, so students always know what to work on.',
    icon: 'layers' as const,
    style: 'white' as const,
  },
  {
    title: 'Build real speaking confidence',
    description:
      'We focus on helping students speak clearly and confidently — especially for oral exams where most struggle.',
    icon: 'megaphone' as const,
    style: 'blue' as const,
  },
  {
    title: 'Track progress and improve results',
    description:
      'Students see clear improvement over time, with structured support to help them feel prepared and perform better in exams.',
    icon: 'trendingUp' as const,
    style: 'white' as const,
  },
]

export const AboutBlock02Block: React.FC<AboutBlock02BlockProps> = ({
  id,
  background,
  badge,
  title,
  cards,
  quote,
  quoteHighlight,
  ctaText,
}) => {
  const isImage = background?.type === 'image' && background.image
  const presetClass = getBackgroundClass(background)
  const customCSS = getCustomBackgroundCSS(background, id)
  const sectionId = background?.type === 'custom' && id ? `block-bg-${id}` : undefined

  const displayBadge = badge || 'The Methodology'
  const displayTitle = title || 'The GoGet Approach'
  const displayQuote = quote || "Most students don't need more content — they need the"
  const displayQuoteHighlight = quoteHighlight || 'right structure'
  const displayCtaText = ctaText || 'Book a Free Assessment'

  const displayCards =
    cards && cards.length > 0
      ? cards.map((card) => ({
          ...card,
          icon: card.icon || 'layers',
          style: card.style || 'white',
        }))
      : defaultCards

  return (
    <section
      id={sectionId}
      className={cn('relative w-full', presetClass || 'bg-[#fcfdff] text-slate-900')}
    >
      {isImage && typeof background?.image === 'object' && background.image && (
        <div className="absolute inset-0">
          <Media resource={background.image} fill imgClassName="object-cover w-full h-full" />
        </div>
      )}

      <div className="relative z-10 py-24 px-6">
        <main className="max-w-6xl mx-auto w-full space-y-24">
          {/* Header Section */}
          <div className="text-center space-y-6">
            <div className="inline-block px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-full">
              <span className="text-[10px] font-extrabold tracking-[0.2em] text-slate-400 uppercase">
                {displayBadge}
              </span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#0f172a]">
              {displayTitle}
            </h2>
          </div>

          {/* 3-Card Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {displayCards.map((card, index) => {
              const IconComponent = iconMap[card.icon as keyof typeof iconMap]
              const isBlue = card.style === 'blue'

              return (
                <div
                  key={index}
                  className={cn(
                    'group p-10 rounded-[3rem] flex flex-col items-center text-center space-y-8 transition-transform hover:translate-y-[-8px]',
                    isBlue
                      ? 'bg-[#1e40af] shadow-2xl shadow-blue-200 text-white relative overflow-hidden'
                      : 'bg-white border border-slate-100 shadow-xl',
                  )}
                >
                  {isBlue && (
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-12 translate-x-12" />
                  )}
                  <div
                    className={cn(
                      'w-16 h-16 rounded-2xl flex items-center justify-center transition-all',
                      isBlue
                        ? 'bg-white/10 backdrop-blur-sm relative z-10'
                        : 'bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-[#1e40af]',
                    )}
                  >
                    <IconComponent size={28} />
                  </div>
                  <div className={cn('space-y-4', isBlue && 'relative z-10')}>
                    <h3 className="font-display font-extrabold text-xl leading-tight px-4">
                      {card.title}
                    </h3>
                    <p
                      className={cn(
                        'text-sm leading-relaxed font-medium',
                        isBlue ? 'text-blue-100/80' : 'text-slate-500',
                      )}
                    >
                      {card.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Quote & CTA */}
          <div className="text-center space-y-12 pt-12">
            <p className="text-2xl md:text-3xl font-display font-bold italic tracking-tight text-slate-400 max-w-4xl mx-auto leading-tight">
              "{displayQuote}{' '}
              <span className="text-[#1e40af] not-italic">{displayQuoteHighlight}</span>{' '}
              {displayQuote === "Most students don't need more content — they need the"
                ? 'and confidence to perform in exams."'
                : '"'}
            </p>

            <div className="flex flex-col items-center gap-4">
              <button className="bg-[#1e40af] hover:bg-blue-800 text-white px-10 py-5 rounded-2xl font-extrabold text-lg shadow-xl shadow-blue-100 flex items-center gap-3 transition-all hover:translate-y-[-2px] active:scale-95 group">
                {displayCtaText}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </section>
  )
}
