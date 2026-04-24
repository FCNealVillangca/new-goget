import React from 'react'
import { TrendingDown, MessageSquare, Clock, AlertTriangle } from 'lucide-react'
import type { HomeBlock01Block as HomeBlock01BlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import { getBackgroundClass, getCustomBackgroundCSS } from '@/utilities/getBackground'
import { cn } from '@/utilities/ui'

export const HomeBlock01Block: React.FC<HomeBlock01BlockProps> = ({
  id,
  background,
  title,
  struggles,
}) => {
  const defaultStruggles = [
    {
      icon: <TrendingDown className="w-10 h-10 text-red-500" />,
      title: 'Falling behind in French',
      description:
        "Lessons move fast. They're losing confidence and feeling overwhelmed by the pace.",
    },
    {
      icon: <MessageSquare className="w-10 h-10 text-blue-500" />,
      title: 'Afraid to speak in class',
      description: 'They freeze when asked to speak, fearing mistakes in front of their peers.',
    },
    {
      icon: <Clock className="w-10 h-10 text-orange-500" />,
      title: 'Unprepared for exams',
      description: "Hours of revision aren't translating into the grades and results they deserve.",
    },
    {
      icon: <AlertTriangle className="w-10 h-10 text-amber-500" />,
      title: 'Working hard, not improving',
      description:
        "Effort alone isn't leading to improvement without the right strategic approach.",
    },
  ]

  const displayTitle = title || 'Your child might be struggling with French if...'
  const displayStruggles =
    struggles && struggles.length > 0
      ? struggles.map((struggle, index) => ({
          ...struggle,
          icon: defaultStruggles[index]?.icon || (
            <AlertTriangle className="w-10 h-10 text-gray-500" />
          ),
        }))
      : defaultStruggles

  const isImage = background?.type === 'image' && background.image
  const presetClass = getBackgroundClass(background)
  const customCSS = getCustomBackgroundCSS(background, id)
  const sectionId = background?.type === 'custom' && id ? `block-bg-${id}` : undefined

  return (
    <section
      id={sectionId}
      className={cn('relative w-full', presetClass || 'bg-white text-slate-900')}
    >
      {isImage && typeof background?.image === 'object' && background.image && (
        <div className="absolute inset-0">
          <Media resource={background.image} fill imgClassName="object-cover w-full h-full" />
        </div>
      )}

      <div className="container relative z-10 py-32 px-6">
        {/* Section Heading */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
            {displayTitle}
          </h2>
        </div>

        {/* Struggles Grid - Centered & Open Design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {displayStruggles.map((struggle, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              {/* Large, Centered Icon Container */}
              <div className="w-24 h-24 rounded-3xl bg-slate-50 flex items-center justify-center mb-8 group-hover:bg-blue-50 group-hover:scale-110 transition-all duration-500 ease-spring">
                <div className="group-hover:rotate-12 transition-transform duration-500">
                  {struggle.icon}
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-4 leading-tight min-h-[3rem] flex items-center justify-center uppercase tracking-wide text-sm">
                {struggle.title}
              </h3>

              <p className="text-slate-500 leading-relaxed text-sm max-w-[240px]">
                {struggle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
