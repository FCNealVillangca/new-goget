'use client'

import React from 'react'
import { Sparkles } from 'lucide-react'

import type { AboutHeroBlock as AboutHeroBlockType } from '@/payload-types'

import { getMediaUrl } from '@/utilities/getMediaUrl'
import { Media } from '@/components/Media'
import { getBackgroundClass, getCustomBackgroundCSS } from '@/utilities/getBackground'
import { cn } from '@/utilities/ui'

export const AboutHeroBlock: React.FC<AboutHeroBlockType> = ({
  id,
  background,
  badge,
  title,
  titleHighlight,
  description,
  media,
  floatingCardTitle,
  floatingCardDescription,
}) => {
  const isImage = background?.type === 'image' && background.image
  const presetClass = getBackgroundClass(background)
  const customCSS = getCustomBackgroundCSS(background, id)
  const sectionId = background?.type === 'custom' && id ? `block-bg-${id}` : undefined

  const displayBadge = badge || 'Our Methodology'
  const displayTitle = title || 'Improve Your French & Feel Confident for GCSE & A-Level Exams'
  const displayTitleHighlight = titleHighlight || 'Feel Confident'
  const displayDescription =
    description || 'Structured lessons that help students understand, improve, and perform better.'
  const displayFloatingCardTitle = floatingCardTitle || 'Innovative Methodology'
  const displayFloatingCardDescription =
    floatingCardDescription || 'Transforming practice into performance since 2018.'

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
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-widest uppercase">
                <Sparkles className="w-4 h-4" />
                {displayBadge}
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] md:leading-[1.05] tracking-tighter">
                {titleParts.map((part, index) => (
                  <React.Fragment key={index}>
                    {part}
                    {index < titleParts.length - 1 && (
                      <span className="text-blue-500 italic">{displayTitleHighlight}</span>
                    )}
                  </React.Fragment>
                ))}
              </h1>

              <p className="text-slate-500 text-xl md:text-2xl font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {displayDescription}
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative flex justify-center items-center order-1 md:order-2">
            <div className="relative w-full max-w-md transition-transform duration-700 hover:scale-[1.02]">
              <div className="relative w-full aspect-square rounded-[40px] overflow-hidden shadow-2xl shadow-blue-100 border border-slate-100">
                {media && typeof media === 'object' && 'url' in media ? (
                  <img
                    src={getMediaUrl(media.url)}
                    alt="Education atmosphere"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src="https://picsum.photos/seed/education/1200/1200"
                    alt="Education atmosphere"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                )}
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a8a]/40 to-transparent" />

                {/* Floating Card */}
                <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/20">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1e3a8a]">{displayFloatingCardTitle}</h4>
                      <p className="text-slate-500 text-xs">{displayFloatingCardDescription}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Blooms */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10" />
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -z-10" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
