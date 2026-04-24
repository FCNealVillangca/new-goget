import React from 'react'
import { Target, Award, Mic2, Book, GraduationCap } from 'lucide-react'
import type { ExamBlock01 as ExamBlock01Props } from '@/payload-types'

import { getBackgroundClass, getCustomBackgroundCSS } from '@/utilities/getBackground'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'

const iconMap = {
  target: Target,
  award: Award,
  mic: Mic2,
  book: Book,
  graduationCap: GraduationCap,
}

const defaultProgrammes = [
  {
    title: 'GCSE Performance',
    description: 'Moving from passing to top grades through targeted preparation.',
    icon: 'target' as const,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    title: 'A Level Mastery',
    description: 'Advanced precision, depth, and confident expression for high-level study.',
    icon: 'award' as const,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
  {
    title: 'The Speaking System',
    description: 'A specialized framework designed for confidence in oral exam scenarios.',
    icon: 'mic' as const,
    color: 'text-slate-900',
    bgColor: 'bg-slate-100',
  },
]

export const ExamBlock01: React.FC<ExamBlock01Props> = ({
  id,
  background,
  label,
  title,
  programmes,
}) => {
  const isImage = background?.type === 'image' && background.image
  const presetClass = getBackgroundClass(background)
  const customCSS = getCustomBackgroundCSS(background, id)
  const sectionId = background?.type === 'custom' && id ? `block-bg-${id}` : undefined

  const displayLabel = label || 'Pathways'
  const displayTitle = title || 'Choose your path to exam confidence.'

  const displayProgrammes =
    programmes && programmes.length > 0
      ? programmes.map((prog) => ({
          ...prog,
          icon: prog.icon || 'target',
          color: prog.color || 'text-blue-600',
          bgColor: prog.bgColor || 'bg-blue-50',
        }))
      : defaultProgrammes

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

      <div className="container relative z-10 py-20 px-6 font-sans">
        {/* Simple Label */}
        <div className="mb-12 flex items-center gap-4">
          <div className="h-px w-8 bg-blue-600" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
            {displayLabel}
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-20 leading-tight max-w-2xl">
          {displayTitle.split('exam confidence.').map((part, index, array) => (
            <React.Fragment key={index}>
              {part}
              {index < array.length - 1 && <span className="italic">exam confidence.</span>}
            </React.Fragment>
          ))}
        </h2>

        {/* 3-Column Grid Layout */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          {displayProgrammes.map((prog, idx) => {
            const IconComponent = iconMap[prog.icon as keyof typeof iconMap]
            return (
              <div key={idx} className="group flex flex-row items-start gap-5">
                <div
                  className={`w-12 h-12 shrink-0 rounded-2xl ${prog.bgColor} flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}
                >
                  {IconComponent && <IconComponent className={`w-6 h-6 ${prog.color}`} />}
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className="text-xl md:text-2xl font-serif text-slate-900 leading-none group-hover:text-blue-600 transition-colors">
                    {prog.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-light mt-1">
                    {prog.description}
                  </p>
                  <div className="mt-2 flex items-center gap-2 group-hover:gap-3 transition-all cursor-pointer">
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest border-b border-transparent group-hover:border-blue-600 transition-all pb-0.5">
                      Explore Track
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
