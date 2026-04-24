import React from 'react'
import { ArrowRight } from 'lucide-react'
import type { ExamBlock02 as ExamBlock02Props } from '@/payload-types'
import { Media } from '@/components/Media'
import { getBackgroundClass, getCustomBackgroundCSS } from '@/utilities/getBackground'
import { cn } from '@/utilities/ui'

const defaultSteps = [
  {
    id: 'STEP 1',
    title: 'Free speaking assessment',
    description: 'Understand your level and where you lose marks',
  },
  {
    id: 'STEP 2',
    title: 'Clear learning plan',
    description: 'Know exactly what to improve and how',
  },
  {
    id: 'STEP 3',
    title: 'Structured weekly sessions',
    description: 'Build confidence and perform under exam conditions',
  },
]

const defaultBoards = [
  { name: 'AQA', sub: 'GCSE AND A LEVEL' },
  { name: 'Edexcel', sub: 'GCSE AND A LEVEL' },
  { name: 'OCR', sub: 'GCSE AND A LEVEL' },
  { name: 'Eduqas', sub: 'GCSE' },
]

export const ExamBlock02: React.FC<ExamBlock02Props> = ({
  id,
  background,
  title,
  description,
  steps,
  examBoardsTitle,
  examBoards,
  buttonText,
}) => {
  const isImage = background?.type === 'image' && background.image
  const presetClass = getBackgroundClass(background)
  const customCSS = getCustomBackgroundCSS(background, id)
  const sectionId = background?.type === 'custom' && id ? `block-bg-${id}` : undefined

  const displayTitle = title || 'Your path to exam confidence'
  const displayDescription =
    description ||
    'We start with a clear assessment to understand your level and identify exactly what needs to improve.'
  const displaySteps = steps && steps.length > 0 ? steps : defaultSteps
  const displayExamBoardsTitle = examBoardsTitle || 'Aligned with your exam board'
  const displayExamBoards = examBoards && examBoards.length > 0 ? examBoards : defaultBoards
  const displayButtonText = buttonText || 'Start your free speaking assessment'

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
        <main className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Left Side: Steps */}
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-6">
              <h2 className="text-5xl md:text-6xl font-serif text-slate-900 leading-tight">
                {displayTitle.split('exam confidence').map((part, index, array) => (
                  <React.Fragment key={index}>
                    {part}
                    {index < array.length - 1 && <span className="italic">exam confidence</span>}
                  </React.Fragment>
                ))}
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed max-w-md">
                {displayDescription}
              </p>
            </div>

            <div className="flex flex-col gap-10">
              {displaySteps.map((step, idx) => (
                <div key={step.id || idx} className="flex flex-col gap-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
                    {step.id}
                  </span>
                  <h3 className="text-2xl font-serif text-slate-800">{step.title}</h3>
                  <p className="text-sm text-slate-400 font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Exam Board Card */}
          <div className="relative">
            <div className="bg-[#fafafa] rounded-[48px] p-8 md:p-14 border border-slate-50 shadow-2xl shadow-slate-100/50">
              <h3 className="text-2xl font-serif text-slate-900 mb-10 text-center md:text-left">
                {displayExamBoardsTitle}
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-12">
                {displayExamBoards.map((board, idx) => (
                  <div
                    key={board.name || idx}
                    className="bg-white p-6 rounded-2xl border border-slate-100/60 shadow-sm flex flex-col items-center justify-center text-center group hover:border-blue-200 transition-colors cursor-default"
                  >
                    <span className="text-xl font-black text-slate-800 mb-1">{board.name}</span>
                    <span className="text-[9px] font-bold text-slate-300 tracking-wider uppercase leading-none">
                      {board.sub}
                    </span>
                  </div>
                ))}
              </div>

              <button className="w-full bg-[#1a1a1a] text-white py-5 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 transition-all hover:bg-black hover:scale-[1.01] active:scale-[0.99] shadow-xl shadow-black/10">
                {displayButtonText}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Decorative subtle glow */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-50/20 blur-[100px] rounded-full pointer-events-none" />
          </div>
        </main>
      </div>
    </section>
  )
}
