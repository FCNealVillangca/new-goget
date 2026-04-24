import React from 'react'
import type { FaqBlock01 as FaqBlock01Props, Faq } from '@/payload-types'
import { Media } from '@/components/Media'
import { getBackgroundClass, getCustomBackgroundCSS } from '@/utilities/getBackground'
import { cn } from '@/utilities/ui'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { FaqList } from './FaqList'

const defaultFaqs = [
  {
    question: 'How does it work?',
    answer:
      'It starts with a free 30-minute assessment to understand your current level and exam goals. From there, we create a structured plan and schedule weekly lessons at a time that works for you.',
  },
  {
    question: 'Is it online or in person?',
    answer:
      'Lessons are primarily online via high-quality video conferencing, which allows for maximum flexibility. However, for students based in Chelmsford, in-person sessions can also be arranged.',
  },
  {
    question: 'What level do you accept?',
    answer:
      'We specialise in GCSE and A-Level French support for all major exam boards. We also work with adult learners and beginners who want a structured, results-oriented approach to learning French.',
  },
  {
    question: 'How quickly can we start?',
    answer:
      "Very quickly. Once we've had our initial assessment and agreed on a schedule, we can usually start your first full lesson within the same week.",
  },
]

export const FaqBlock01: React.FC<
  FaqBlock01Props & {
    id?: string
  }
> = async ({ id, background, title, description, limit = 10, showContact }) => {
  const payload = await getPayload({ config: configPromise })

  const fetchedFaqs = await payload.find({
    collection: 'faqs',
    depth: 1,
    limit: limit || 10,
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  const faqs = fetchedFaqs.docs.length > 0 ? fetchedFaqs.docs : defaultFaqs

  const isImage = background?.type === 'image' && background.image
  const presetClass = getBackgroundClass(background)
  const customCSS = getCustomBackgroundCSS(background, id)
  const sectionId = background?.type === 'custom' && id ? `block-bg-${id}` : undefined

  const displayTitle = title || 'Frequently Asked Questions'
  const displayDescription =
    description || 'Everything you need to know about GOGET and our methodology.'
  const displayFaqs = faqs
  const displayShowContact = showContact !== false

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

      <div className="container relative z-10 py-20 px-6">
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight mb-2">{displayTitle}</h1>
          <p className="text-slate-500 text-sm">{displayDescription}</p>
        </div>

        <FaqList faqs={displayFaqs} showContact={displayShowContact} />
      </div>
    </section>
  )
}
