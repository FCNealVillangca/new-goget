import React from 'react'
import type { HomeBlock02Block as HomeBlock02BlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import { getBackgroundClass, getCustomBackgroundCSS } from '@/utilities/getBackground'
import { cn } from '@/utilities/ui'

interface Step {
  id: number
  title: string
  description: string
}

export const HomeBlock02Block: React.FC<HomeBlock02BlockProps> = ({
  id,
  background,
  title,
  steps,
}) => {
  const defaultSteps: Step[] = [
    {
      id: 1,
      title: 'Clear Structure',
      description: 'A step-by-step roadmap from current level to exam readiness.',
    },
    {
      id: 2,
      title: 'Deep Understanding',
      description: 'Learn how French works, not just what to memorise.',
    },
    {
      id: 3,
      title: 'Speaking Confidence',
      description: 'Targeted practice for GCSE & A-Level speaking exams.',
    },
    {
      id: 4,
      title: 'Track Progress',
      description: "Clear visibility on what's improving and what needs focus.",
    },
  ]

  const displayTitle = title || 'How We Help Students Improve in French'
  const displaySteps =
    steps && steps.length > 0
      ? steps.map((step, index) => ({
          ...step,
          id: index + 1,
        }))
      : defaultSteps

  const isImage = background?.type === 'image' && background.image
  const presetClass = getBackgroundClass(background)
  const customCSS = getCustomBackgroundCSS(background, id)
  const sectionId = background?.type === 'custom' && id ? `block-bg-${id}` : undefined

  return (
    <>
      {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
      <section id={sectionId} className={cn('relative w-full', presetClass || 'bg-white')}>
        {isImage && typeof background?.image === 'object' && background.image && (
          <div className="absolute inset-0">
            <Media resource={background.image} fill imgClassName="object-cover w-full h-full" />
          </div>
        )}

        <div className="container relative z-10 py-32 px-6">
          {/* Branding Header */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
              {displayTitle}
            </h2>
          </div>

          {/* Stepper */}
          <div className="w-full max-w-7xl mx-auto select-none">
            {/* Main Container: Stacked on mobile, side-by-side on desktop */}
            <div className="flex flex-col md:flex-row md:items-start">
              {displaySteps.map((step, index) => {
                return (
                  <div key={step.id} className="flex flex-1 flex-row md:flex-col group">
                    {/* Visual Track: Dot and Line */}
                    <div className="flex flex-col items-center md:flex-row md:flex-1 md:w-full">
                      {/* The Node (Circle with blue dot) */}
                      <div className="flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-blue-600 bg-white">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-600">
                          <span className="text-white font-bold text-lg">{step.id}</span>
                        </div>
                      </div>
                      <div className="flex-grow flex items-center md:w-full">
                        <div className="transition-all duration-500 rounded-full bg-blue-600 w-[2px] h-full mx-auto my-2 md:my-0 md:mx-4 md:h-[2px] md:w-full" />
                      </div>
                    </div>

                    {/* Content Area */}
                    <div
                      className={
                        'flex-grow pl-8 md:pl-0 md:mt-10 md:pb-0 md:text-left' +
                        (index === displaySteps.length - 1 ? ' pb-0' : ' pb-16')
                      }
                    >
                      <h3 className="text-2xl font-serif text-[#1e3a8a] leading-tight mb-4 tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-slate-500 text-base font-medium leading-relaxed max-w-[240px]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
