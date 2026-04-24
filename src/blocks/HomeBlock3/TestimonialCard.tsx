import React from 'react'
import { Quote, Play } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import type { Testimonial } from '@/payload-types'

interface TestimonialCardProps {
  testimonial: Testimonial
  isBig?: boolean
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, isBig = false }) => {
  const isVideo =
    testimonial.avatar && typeof testimonial.avatar === 'object'
      ? testimonial.avatar?.mimeType?.startsWith('video/')
      : false
  const mediaUrl =
    testimonial.avatar && typeof testimonial.avatar === 'object'
      ? testimonial.avatar?.url
      : undefined

  return (
    <div
      className={cn(
        'group bg-[#fafafa] border border-slate-50 flex flex-col justify-between hover:bg-white hover:shadow-2xl hover:shadow-slate-100 transition-all duration-700',
        isBig ? 'p-12 rounded-[40px]' : 'p-8 rounded-[30px]',
      )}
    >
      {isBig && mediaUrl && (
        <div className="mb-8">
          {isVideo ? (
            <Dialog>
              <DialogTrigger asChild>
                <button className="w-full aspect-video bg-slate-200 rounded-lg flex items-center justify-center hover:bg-slate-300 transition-colors relative">
                  <Media resource={testimonial.avatar} fill className="object-cover rounded-lg" />
                  <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center">
                    <div className="w-12 h-12 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-slate-800" />
                    </div>
                  </div>
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <video controls className="w-full">
                  <source
                    src={mediaUrl}
                    type={
                      testimonial.avatar && typeof testimonial.avatar === 'object'
                        ? testimonial.avatar.mimeType || 'video/mp4'
                        : 'video/mp4'
                    }
                  />
                  Your browser does not support the video tag.
                </video>
              </DialogContent>
            </Dialog>
          ) : (
            <div className="w-full aspect-video rounded-lg overflow-hidden">
              <Media resource={testimonial.avatar} fill imgClassName="object-cover w-full h-full" />
            </div>
          )}
        </div>
      )}

      <div className="flex-1">
        <Quote className={cn('text-slate-100 mb-6 -ml-1', isBig ? 'w-16 h-16' : 'w-12 h-12')} />
        <p
          className={cn(
            'font-serif italic text-slate-700 leading-relaxed',
            isBig ? 'text-2xl md:text-3xl mb-8' : 'text-lg md:text-xl mb-6',
          )}
        >
          "{testimonial.quote}"
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <div>
          <p
            className={cn(
              'font-bold text-slate-900 leading-tight',
              isBig ? 'text-lg' : 'text-base',
            )}
          >
            {testimonial.name}
          </p>
          <p
            className={cn(
              'uppercase font-black tracking-widest text-slate-400 mt-1',
              isBig ? 'text-sm' : 'text-xs',
            )}
          >
            {testimonial.role}
          </p>
        </div>
        {!isBig && isVideo && mediaUrl && (
          <Dialog>
            <DialogTrigger asChild>
              <button className="text-sm text-blue-600 hover:text-blue-800 underline">
                Play video
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <video controls className="w-full">
                <source
                  src={mediaUrl}
                  type={
                    testimonial.avatar && typeof testimonial.avatar === 'object'
                      ? testimonial.avatar.mimeType || 'video/mp4'
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
}
