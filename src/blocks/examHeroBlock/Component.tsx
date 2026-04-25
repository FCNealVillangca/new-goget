'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { ExamHeroBlock as ExamHeroBlockType } from '@/payload-types'

import { Media } from '@/components/Media'
import { getBackgroundClass, getCustomBackgroundCSS } from '@/utilities/getBackground'
import { cn } from '@/utilities/ui'

export const ExamHeroBlock: React.FC<ExamHeroBlockType> = ({
  id,
  background,
  title,
  titleHighlight,
  description,
  links,
  confidenceLevel,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  })

  const isImage = background?.type === 'image' && background.image
  const presetClass = getBackgroundClass(background)
  const customCSS = getCustomBackgroundCSS(background, id)
  const sectionId = background?.type === 'custom' && id ? `block-bg-${id}` : undefined

  const displayTitle = title || 'Speak clearly. Perform confidently. Pass with structure.'
  const displayTitleHighlight = titleHighlight || 'Pass with structure.'
  const displayDescription =
    description ||
    'Structured lessons designed to turn understanding into performance. Build confidence for speaking exams and know exactly what to say under pressure.'
  const displayConfidenceLevel = confidenceLevel || 100

  const titleParts = displayTitle.split(displayTitleHighlight)

  return (
    <>
      {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
      <section id={sectionId} className={cn('relative w-full', presetClass || 'bg-slate-50')}>
        {isImage && typeof background?.image === 'object' && background.image && (
          <div className="absolute inset-0">
            <Media
              resource={background.image}
              fill
              imgClassName="object-cover w-full h-full -z-10"
            />
          </div>
        )}

        <div className="container px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 order-2 md:order-1">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
              {titleParts.map((part, index, array) => (
                <React.Fragment key={index}>
                  {part}
                  {index < array.length - 1 && (
                    <span className="text-blue-800">{displayTitleHighlight}</span>
                  )}
                </React.Fragment>
              ))}
            </h1>

            <p className="text-lg text-slate-600 max-w-lg">{displayDescription}</p>

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
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Right Visual */}
          <div className="relative flex justify-center items-center order-1 md:order-2">
            <div className="relative w-full max-w-md">
              {/* Confidence Meter Card */}
              <div className="bg-white p-6 rounded-2xl shadow-xl shadow-blue-900/5 border border-white flex flex-col gap-4">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Confidence Level
                  </span>
                  <span className="text-2xl font-black text-blue-600">
                    {displayConfidenceLevel}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="h-4 bg-slate-100 rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"
                    style={{ width: `${displayConfidenceLevel}%` }}
                  ></div>
                </div>

                <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-1">
                  <span>SHY</span>
                  <span>FLUENT</span>
                </div>

                <div className="mt-4 py-2 px-4 bg-blue-50 rounded-lg border border-blue-100 flex items-center justify-center gap-2">
                  <span className="text-blue-700 font-bold">Magnifique!</span>
                  <span>🎉</span>
                </div>
              </div>

              {/* Floating Fun Elements */}
              <div className="absolute -top-10 -right-6 bg-red-50 p-3 rounded-xl border border-red-100 shadow-sm">
                <span className="text-2xl">🥐</span>
              </div>

              <div className="absolute -bottom-6 -left-10 bg-blue-50 p-3 rounded-xl border border-blue-100 shadow-sm">
                <span className="text-2xl">🗣️</span>
              </div>

              {/* Background accents */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full blur-3xl -mr-16 -mt-16" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-200 rounded-full blur-3xl -ml-16 -mb-16" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
