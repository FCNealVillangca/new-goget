import React from 'react'
import type { StepperBlock as StepperBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import { getBackgroundClass, getCustomBackgroundCSS } from '@/utilities/getBackground'
import { cn } from '@/utilities/ui'

export const StepperBlock: React.FC<StepperBlockProps> = ({ id, title, steps, background }) => {
  const list = steps ?? []
  const isImage = background?.type === 'image' && background.image
  const presetClass = getBackgroundClass(background)
  const customCSS = getCustomBackgroundCSS(background, id)
  const sectionId = background?.type === 'custom' && id ? `block-bg-${id}` : undefined

  if (list.length === 0) return null

  return (
    <>
      {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
      <section
        id={sectionId}
        className={cn('relative w-full', presetClass || 'bg-black text-white')}
      >
        {isImage && typeof background?.image === 'object' && background.image && (
          <Media
            resource={background.image}
            fill
            imgClassName="absolute inset-0 object-cover w-full h-full -z-10"
          />
        )}

        <div className="container relative z-10 py-16">
          {title && <h2 className="text-3xl font-bold mb-8">{title}</h2>}
          {/* Main Container: Stacked on mobile, side-by-side on desktop */}
          <div className="flex flex-col md:flex-row md:items-start">
            {list.map((step, index) => (
              <div key={step.id ?? index} className="flex flex-1 flex-row md:flex-col group">
                {/* Visual Track: Dot and Line */}
                <div className="flex flex-col items-center md:flex-row md:flex-1 md:w-full">
                  {/* The Dot/Ring */}
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-full border-2 border-current bg-transparent">
                    <div className="size-2 rounded-full bg-blue-500" />
                  </div>

                  {/* The Line */}
                  {index < list.length - 1 ? (
                    <div
                      className={cn(
                        'bg-current/30',
                        // Mobile: Vertical line between dots
                        'w-[2px] flex-grow my-2 md:my-0',
                        // Desktop: Horizontal line between dots
                        'md:h-[2px] md:w-full md:mx-2',
                      )}
                    />
                  ) : (
                    // Spacer for the last item on desktop so text aligns
                    <div className="hidden md:block md:flex-grow" />
                  )}
                </div>

                {/* Content Area */}
                <div className="flex-grow pl-6 md:pl-0 md:mt-6 pb-10 md:pb-0">
                  <h3 className="text-xl font-bold leading-none mb-2">{step.title}</h3>
                  {step.description && (
                    <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
