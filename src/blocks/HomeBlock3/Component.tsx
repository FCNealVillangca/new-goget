import React from 'react'
import type { Testimonial } from '@/payload-types'
import { Media } from '@/components/Media'
import { getBackgroundClass, getCustomBackgroundCSS } from '@/utilities/getBackground'
import { cn } from '@/utilities/ui'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { TestimonialCard } from './TestimonialCard'

export const HomeBlock3: React.FC<{
  id?: string
  background?: any
  limit?: number
}> = async ({ id, background, limit = 6 }) => {
  const payload = await getPayload({ config: configPromise })

  const fetchedTestimonials = await payload.find({
    collection: 'testimonials',
    depth: 1,
    limit: limit || 6,
    where: {
      _status: {
        equals: 'published',
      },
    },
    sort: '-featured,-publishedAt',
  })

  const testimonials = fetchedTestimonials.docs

  const featured = testimonials.find((t) => t.featured)
  const hasFeaturedMedia = featured && featured.avatar

  const isImage = background?.type === 'image' && background.image
  const presetClass = getBackgroundClass(background)
  const customCSS = getCustomBackgroundCSS(background, id)
  const sectionId = background?.type === 'custom' && id ? `block-bg-${id}` : undefined

  if (hasFeaturedMedia) {
    // Layout: big left, 4 small right (2x2)
    const smallTestimonials = testimonials.filter((t) => t.id !== featured.id).slice(0, 4)
    return (
      <section id={sectionId} className={cn('relative w-full py-20', presetClass || 'bg-white')}>
        {isImage && typeof background?.image === 'object' && background.image && (
          <div className="absolute inset-0">
            <Media resource={background.image} fill imgClassName="object-cover w-full h-full" />
          </div>
        )}

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Big block left */}
            <div className="lg:col-span-1">
              <TestimonialCard testimonial={featured} isBig />
            </div>
            {/* 4 small blocks right */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-6">
              {smallTestimonials.map((t) => (
                <TestimonialCard key={t.id} testimonial={t} />
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  } else {
    // Layout: 3x2 grid, featured first
    return (
      <section id={sectionId} className={cn('relative w-full py-20', presetClass || 'bg-white')}>
        {isImage && typeof background?.image === 'object' && background.image && (
          <div className="absolute inset-0">
            <Media resource={background.image} fill imgClassName="object-cover w-full h-full" />
          </div>
        )}

        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </div>
      </section>
    )
  }
}
