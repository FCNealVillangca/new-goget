'use client'

import React from 'react'
import { Quote } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import type { Testimonial, Media } from '@/payload-types'

interface TestimonialItem {
  id?: string | number
  quote: string
  name: string
  role: string
  avatar?: Media | string | number | null | undefined
}

interface TestimonialListProps {
  testimonials: any[]
}

export const TestimonialList: React.FC<TestimonialListProps> = ({ testimonials }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {testimonials.map((t, idx) => {
        const isVideo =
          t.avatar && typeof t.avatar === 'object' && t.avatar?.mimeType?.startsWith('video/')
        const videoUrl =
          t.avatar && typeof t.avatar === 'object'
            ? t.avatar.url
            : typeof t.avatar === 'string'
              ? t.avatar
              : null

        return (
          <div
            key={t.id || idx}
            className="group p-10 rounded-[40px] bg-[#fafafa] border border-slate-50 flex flex-col justify-between hover:bg-white hover:shadow-2xl hover:shadow-slate-100 transition-all duration-700"
          >
            <div>
              <Quote className="w-12 h-12 text-slate-100 mb-8 -ml-1" />
              <p className="text-xl md:text-2xl font-serif italic text-slate-700 leading-relaxed mb-10">
                "{t.quote}"
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div>
                <p className="text-base font-bold text-slate-900 leading-tight">{t.name}</p>
                <p className="text-[11px] uppercase font-black tracking-widest text-slate-400 mt-1">
                  {t.role}
                </p>
              </div>
              {isVideo && videoUrl && (
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-sm text-blue-600 hover:text-blue-800 underline">
                      Play video
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <video controls className="w-full">
                      <source
                        src={videoUrl}
                        type={
                          t.avatar && typeof t.avatar === 'object' && t.avatar.mimeType
                            ? t.avatar.mimeType
                            : 'video/mp4'
                        }
                      />
                      Your browser does not support the video tag.
                    </video>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
