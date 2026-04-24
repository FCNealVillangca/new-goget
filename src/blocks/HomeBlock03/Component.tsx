/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react'
import type { HomeBlock03Block as HomeBlock03BlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import { getBackgroundClass, getCustomBackgroundCSS } from '@/utilities/getBackground'
import { cn } from '@/utilities/ui'
import { Star, ShieldCheck, BookOpen, CalendarCheck, ArrowRight } from 'lucide-react'

export const HomeBlock03Block: React.FC<HomeBlock03BlockProps> = ({
  id,
  background,
  title,
  highlightedTitle,
  paragraphs,
  features,
  buttonText,
  buttonSubtext,
  beforeCard,
  afterCard,
}) => {
  const isImage = background?.type === 'image' && background.image
  const presetClass = getBackgroundClass(background)
  const customCSS = getCustomBackgroundCSS(background, id)
  const sectionId = background?.type === 'custom' && id ? `block-bg-${id}` : undefined

  const defaultParagraphs = [
    'Most students understand the theory.',
    'They struggle to perform under exam pressure.',
    'We focus on turning knowledge into confident, exam-ready performance.',
  ]

  const defaultFeatures = [
    {
      title: 'Improve grades',
      description: 'Targeted support for higher marks in every paper.',
    },
    {
      title: 'Build confidence',
      description: 'Remove hesitation with structured speaking practice.',
    },
    {
      title: 'Understand grammar',
      description: 'Stop guessing. Understand how French works.',
    },
    {
      title: 'Prepared for exams',
      description: 'Walk into exams knowing exactly what to do.',
    },
  ]

  const defaultBeforeCard = {
    label: 'BEFORE',
    text: '"Parle-moi de tes projets pour l\'avenir."',
    speaker: 'Examiner',
    subtitle: 'Oral Exam Mock',
  }

  const defaultAfterCard = {
    label: 'AFTER',
    text: "\"À l'avenir, j'aimerais étudier le droit à l'université car...\"",
    speaker: 'Student',
    subtitle: 'Confident Response',
  }

  const displayTitle = title || 'Where Practice Becomes'
  const displayHighlightedTitle = highlightedTitle || 'Exam Performance.'
  const displayParagraphs = paragraphs && paragraphs.length > 0 ? paragraphs : defaultParagraphs
  const displayFeatures = features && features.length > 0 ? features : defaultFeatures
  const displayButtonText = buttonText || 'Book Free Assessment'
  const displayButtonSubtext = buttonSubtext || "We'll show you exactly how your child can improve."
  const displayBeforeCard = beforeCard && beforeCard.text ? beforeCard : defaultBeforeCard
  const displayAfterCard = afterCard && afterCard.text ? afterCard : defaultAfterCard

  return (
    <section id={sectionId} className={cn('relative w-full', presetClass || 'bg-white')}>
      {isImage && typeof background?.image === 'object' && background.image && (
        <div className="absolute inset-0">
          <Media resource={background.image} fill imgClassName="object-cover w-full h-full" />
        </div>
      )}

      <div className="container relative z-10 py-32 px-6 overflow-hidden min-h-screen flex items-center text-primary">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          {/* Left Column: Comparison Cards */}
          <div className="relative h-[480px] md:h-[520px] flex items-center justify-center order-2 lg:order-1">
            {/* Decorative background element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-50/50 rounded-full blur-3xl -z-10" />

            {/* Before Card */}
            <div className="absolute top-0 left-0 w-full max-w-[400px] bg-slate-50 rounded-3xl p-10 border border-slate-200 shadow-sm">
              <div className="inline-block bg-[#333] text-white text-[10px] font-bold px-2.5 py-1 rounded mb-8 uppercase tracking-widest">
                {displayBeforeCard.label}
              </div>
              <p className="text-xl md:text-2xl font-medium leading-relaxed mb-10 text-slate-400 italic">
                {displayBeforeCard.text}
              </p>
              <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span>{displayBeforeCard.speaker}</span>
                <span className="opacity-30">•</span>
                <span>{displayBeforeCard.subtitle}</span>
              </div>
            </div>

            {/* After Card */}
            <div className="absolute bottom-0 right-0 w-full max-w-[400px] bg-white rounded-3xl p-10 shadow-lg border border-primary/20 z-10">
              <div className="inline-block bg-black text-white text-[10px] font-bold px-2.5 py-1 rounded mb-8 uppercase tracking-widest">
                {displayAfterCard.label}
              </div>
              <p className="text-xl md:text-2xl font-bold leading-relaxed mb-10 text-primary">
                {displayAfterCard.text}
              </p>
              <div className="flex items-center gap-3 text-[10px] font-bold text-primary uppercase tracking-widest">
                <span>{displayAfterCard.speaker}</span>
                <span className="opacity-30">•</span>
                <span>{displayAfterCard.subtitle}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="space-y-16 order-1 lg:order-2">
            <div className="space-y-8">
              <h2 className="text-5xl lg:text-7xl font-bold text-primary leading-[1.05] tracking-tighter">
                {displayTitle} <span className="text-primary">{displayHighlightedTitle}</span>
              </h2>
              <div className="space-y-6 text-slate-500 text-xl leading-relaxed max-w-xl font-medium">
                {displayParagraphs.map((paragraph, index) => (
                  <p key={index}>{typeof paragraph === 'string' ? paragraph : paragraph.text}</p>
                ))}
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
              {displayFeatures.map((feature, index) => {
                const icons = [Star, ShieldCheck, BookOpen, CalendarCheck]
                const IconComponent = icons[index] || Star
                return (
                  <div key={index} className="flex gap-5 group">
                    <div className="shrink-0 w-12 h-12 rounded-full border-2 border-primary bg-white flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-xl text-primary">{feature.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="pt-10 space-y-6">
              <button className="bg-primary shadow-lg shadow-primary/20 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-primary/80 transition-all flex items-center gap-3 active:scale-95 group">
                {displayButtonText}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-slate-400 text-sm italic font-medium">{displayButtonSubtext}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
