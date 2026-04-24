import React from 'react'
import type { AccordionBlock as AccordionBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { getBackgroundClass, getCustomBackgroundCSS } from '@/utilities/getBackground'

export const AccordionBlock: React.FC<AccordionBlockProps> = ({ id, items, background }) => {
  const isImage = background?.type === 'image' && background.image
  const presetClass = getBackgroundClass(background)
  const customCSS = getCustomBackgroundCSS(background, id)
  const sectionId = background?.type === 'custom' && id ? `block-bg-${id}` : undefined

  return (
    <>
      {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
      <section
        id={sectionId}
        className={`relative w-full ${presetClass || 'bg-transparent'}`}
      >
        {isImage && typeof background.image === 'object' && (
          <Media
            resource={background.image}
            fill
            imgClassName="absolute inset-0 object-cover w-full h-full -z-10"
          />
        )}
        <div className="container relative z-10 py-16">
          <Accordion type="single" collapsible>
            {(items || []).map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-xl font-semibold">{item.title}</AccordionTrigger>
                <AccordionContent>
                  {item.richText && (
                    <RichText className="mb-0" data={item.richText} enableGutter={false} />
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  )
}
