/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react'
import type { AboutBlock03Block as AboutBlock03BlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import { getBackgroundClass, getCustomBackgroundCSS } from '@/utilities/getBackground'
import { cn } from '@/utilities/ui'

const defaultDescription = `I'm a certified French tutor trained at CAVILAM - Alliance Française, based in Chelmsford, originally from Toulouse in the south of France.

Over time, I noticed something important. Most students do not struggle because they lack knowledge. They struggle because they lack confidence when it is time to speak.

That is what GoGet is built to fix.`

const defaultFeatures = [
  'Each lesson follows a clear structure.',
  'Focused speaking practice.',
  'Step by step progress.',
]

export const AboutBlock03Block: React.FC<AboutBlock03BlockProps> = ({
  id,
  background,
  badge,
  title,
  description,
  features,
  goalLabel,
  goalText,
  tutorImage,
}) => {
  const isImage = background?.type === 'image' && background.image
  const presetClass = getBackgroundClass(background)
  const customCSS = getCustomBackgroundCSS(background, id)
  const sectionId = background?.type === 'custom' && id ? `block-bg-${id}` : undefined

  const displayBadge = badge || 'Meet Your Tutor'
  const displayTitle = title || "Bonjour, I'm Kwaku"
  const displayDescription = description || defaultDescription
  const displayFeatures = features && features.length > 0 ? features : defaultFeatures
  const displayGoalLabel = goalLabel || 'The Goal is Simple'
  const displayGoalText = goalText || 'feel confident'

  const descriptionParagraphs = displayDescription.split('\n').filter((p) => p.trim() !== '')

  return (
    <section
      id={sectionId}
      className={cn('relative w-full', presetClass || 'bg-white text-[#1e3a8a]')}
    >
      {isImage && typeof background?.image === 'object' && background.image && (
        <div className="absolute inset-0">
          <Media resource={background.image} fill imgClassName="object-cover w-full h-full" />
        </div>
      )}

      <div className="relative z-10 py-24 md:py-40 px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Left Column: Tutor Image */}
          <div className="flex-1 w-full max-w-xl mx-auto lg:mx-0 order-2 lg:order-1">
            <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl shadow-blue-50 border border-slate-100">
              {tutorImage && typeof tutorImage === 'object' && tutorImage ? (
                <Media
                  resource={tutorImage}
                  fill
                  imgClassName="w-full h-full object-cover"
                  alt={tutorImage.alt || 'French Tutor'}
                />
              ) : (
                <img
                  src="https://picsum.photos/seed/tutor/800/1000"
                  alt="French Tutor Kwaku"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              )}
              {/* Soft Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a8a]/20 to-transparent" />
            </div>
          </div>

          {/* Right Column: Tutor Content */}
          <div className="flex-1 space-y-10 order-1 lg:order-2">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-100 text-[#1e3a8a]/60 text-xs font-bold tracking-widest uppercase">
                {displayBadge}
              </div>

              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">{displayTitle}</h2>
            </div>

            <div className="space-y-6 text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
              {descriptionParagraphs.map((paragraph, index) => {
                const isLast = index === descriptionParagraphs.length - 1
                return (
                  <p key={index} className={isLast ? 'text-[#1e3a8a] font-bold' : ''}>
                    {paragraph}
                  </p>
                )
              })}
            </div>

            {/* Quick Stats/Features */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              {displayFeatures.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 font-bold text-[#1e3a8a]/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  {typeof feature === 'string' ? feature : feature.text}
                </div>
              ))}
            </div>

            {/* Footer Part */}
            <div className="space-y-4 pt-10">
              <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-300">
                {displayGoalLabel}
              </div>
              <p className="text-2xl md:text-3xl font-bold leading-tight">
                Help every student <span className="text-blue-500 italic">{displayGoalText}</span>,
                prepared, and ready to succeed in their exams.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
