/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react'
import { MessageSquare, Zap, Target, TrendingUp } from 'lucide-react'
import type { AboutBlock01Block as AboutBlock01BlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import { getBackgroundClass, getCustomBackgroundCSS } from '@/utilities/getBackground'
import { cn } from '@/utilities/ui'

const iconMap = {
  messageSquare: MessageSquare,
  zap: Zap,
  target: Target,
  trendingUp: TrendingUp,
}

const defaultCards = [
  {
    title: 'Speaking',
    description: 'Structured practice sessions daily.',
    icon: 'messageSquare' as const,
    style: 'blue' as const,
  },
  {
    title: 'Confidence',
    description: 'Removing the fear of mistakes.',
    icon: 'zap' as const,
    style: 'white' as const,
  },
  {
    title: 'Structured Dialogue',
    description: '',
    icon: 'target' as const,
    style: 'white' as const,
  },
  {
    title: '98%',
    description: 'Grade improvement focused.',
    icon: 'trendingUp' as const,
    style: 'dark' as const,
  },
]

export const AboutBlock01Block: React.FC<AboutBlock01BlockProps> = ({
  id,
  background,
  title,
  highlightedWord,
  subtitle,
  description,
  highlightText,
  cards,
}) => {
  const isImage = background?.type === 'image' && background.image
  const presetClass = getBackgroundClass(background)
  const customCSS = getCustomBackgroundCSS(background, id)
  const sectionId = background?.type === 'custom' && id ? `block-bg-${id}` : undefined

  const displayTitle = title || 'Why most students struggle with French'
  const displayHighlightedWord = highlightedWord || 'struggle'
  const displaySubtitle =
    subtitle || "Most students understand French. But when it's time to speak, they hesitate."
  const displayDescription =
    description ||
    "The problem isn't knowledge. It's the lack of structured speaking practice. Without it, confidence drops and progress stalls."
  const displayHighlightText =
    highlightText ||
    'GoGet was built to remove that barrier. We transform the learning experience from a passive academic exercise into an active, confident practice.'

  const displayCards =
    cards && cards.length > 0
      ? cards.map((card) => ({
          ...card,
          icon: card.icon || 'messageSquare',
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

      <div className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-16 lg:gap-32 items-center">
            {/* Left Content Column */}
            <div className="space-y-10">
              <div className="space-y-6">
                <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-[#0f172a]">
                  {displayTitle.split(displayHighlightedWord).map((part, index, array) => (
                    <React.Fragment key={index}>
                      {part}
                      {index < array.length - 1 && (
                        <span className="text-[#1e40af]">{displayHighlightedWord}</span>
                      )}
                    </React.Fragment>
                  ))}
                </h2>

                <div className="space-y-4 max-w-lg">
                  <p className="text-lg md:text-xl text-slate-500 font-medium">{displaySubtitle}</p>
                  <p className="text-slate-500 leading-relaxed">{displayDescription}</p>
                  <p className="text-slate-500 leading-relaxed font-bold border-l-4 border-red-500 pl-6 py-2 bg-red-50 rounded-r-lg">
                    {displayHighlightText}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: 2x2 Grid (The 4 Grids) */}
            <div className="grid grid-cols-2 gap-6 md:gap-8">
              {displayCards.map((card, index) => {
                const IconComponent = iconMap[card.icon as keyof typeof iconMap]
                const isBlue = card.style === 'blue'
                const isDark = card.style === 'dark'

                if (index === 2) {
                  // Card 3: Dialogue (centered, no description)
                  return (
                    <div
                      key={index}
                      className="group relative bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden"
                    >
                      <div className="relative z-10 flex flex-col h-full justify-center text-center items-center gap-6">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-[#1e40af] transition-colors">
                          {IconComponent && <IconComponent size={32} />}
                        </div>
                        <div>
                          <h3 className="font-display font-black text-sm tracking-[0.2em] uppercase text-slate-900">
                            {card.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  )
                }

                if (index === 3) {
                  // Card 4: Results (dark with percentage)
                  return (
                    <div
                      key={index}
                      className="group relative bg-[#0f172a] p-8 rounded-[2.5rem] text-white shadow-2xl overflow-hidden"
                    >
                      <div className="relative z-10 flex flex-col justify-between h-full">
                        <div className="space-y-4">
                          <div className="flex gap-1">
                            {[1, 2, 3].map((i) => (
                              <div key={i} className="w-1 h-8 bg-blue-500 rounded-full" />
                            ))}
                            <div className="w-1 h-8 bg-slate-700 rounded-full" />
                          </div>
                          <h3 className="font-display font-black text-5xl tracking-tighter">
                            {card.title}
                          </h3>
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-xs tracking-widest uppercase mb-1">
                            Results
                          </h3>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                            {card.description}
                          </p>
                        </div>
                      </div>
                      {/* Techy background detail */}
                      <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none p-4">
                        {IconComponent && (
                          <IconComponent className="w-full h-full" strokeWidth={1} />
                        )}
                      </div>
                    </div>
                  )
                }

                // Card 1 & 2: Standard cards
                return (
                  <div
                    key={index}
                    className={cn(
                      'group relative p-8 rounded-[2.5rem] overflow-hidden shadow-2xl',
                      isBlue
                        ? 'bg-[#1e40af] text-white shadow-blue-200'
                        : 'bg-white border border-slate-100 flex flex-col justify-between',
                    )}
                  >
                    <div className="relative z-10 space-y-6">
                      <div
                        className={cn(
                          'w-12 h-12 rounded-2xl flex items-center justify-center',
                          isBlue
                            ? 'bg-white/20 backdrop-blur'
                            : 'bg-[#ef4444] text-white transform group-hover:rotate-12 transition-transform',
                        )}
                      >
                        {IconComponent && (
                          <IconComponent size={24} fill={isBlue ? 'none' : 'currentColor'} />
                        )}
                      </div>
                      <div>
                        <h3 className="font-display font-black text-xl mb-2 tracking-tight uppercase">
                          {card.title}
                        </h3>
                        <p
                          className={cn(
                            'text-xs font-medium leading-relaxed uppercase tracking-wide',
                            isBlue ? 'text-blue-100 opacity-80' : 'text-slate-400 font-bold',
                          )}
                        >
                          {card.description}
                        </p>
                      </div>
                    </div>
                    {isBlue && (
                      <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white opacity-[0.05] rounded-full group-hover:scale-150 transition-transform duration-700" />
                    )}
                    {!isBlue && (
                      <div className="absolute top-0 right-0 w-2 h-full bg-[#ef4444] opacity-5" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
