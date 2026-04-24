import React from 'react'
import type { GalleryBlock as GalleryBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getBackgroundClass, getCustomBackgroundCSS } from '@/utilities/getBackground'

export const GalleryBlock: React.FC<GalleryBlockProps> = ({
  id,
  title,
  items,
  columns,
  background,
}) => {
  const colClass = {
    '2': 'md:grid-cols-2',
    '3': 'md:grid-cols-2 lg:grid-cols-3',
    '4': 'md:grid-cols-2 lg:grid-cols-4',
  }[columns || '3']

  const isImage = background?.type === 'image' && background.image
  const presetClass = getBackgroundClass(background)
  const customCSS = getCustomBackgroundCSS(background, id)
  const sectionId = background?.type === 'custom' && id ? `block-bg-${id}` : undefined

  return (
    <>
      {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
      <section id={sectionId} className={`relative w-full ${presetClass || 'bg-transparent'}`}>
        {isImage && typeof background.image === 'object' && (
          <Media
            resource={background.image}
            fill
            imgClassName="absolute inset-0 object-cover w-full h-full -z-10"
          />
        )}
        <div className="container relative z-10 py-16">
          {title && <h2 className="text-3xl font-bold mb-8">{title}</h2>}
          <div className={`grid grid-cols-1 ${colClass} gap-6 items-stretch`}>
            {(items || []).map((item, index) => (
              <Card key={index} className="flex flex-col overflow-hidden bg-background">
                {item.image && typeof item.image === 'object' && (
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Media resource={item.image} fill imgClassName="object-cover" />
                  </div>
                )}
                {item.title && (
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                )}
                {item.richText && (
                  <CardContent className="text-muted-foreground grow">
                    <RichText
                      className="mb-0"
                      data={item.richText}
                      enableGutter={false}
                      enableProse={false}
                    />
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
