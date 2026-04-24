import React from 'react'

import type { GridLayoutBlock as GridLayoutBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import { getBackgroundClass, getCustomBackgroundCSS } from '@/utilities/getBackground'

const GAP_MAP: Record<string, string> = {
  '0': 'gap-0',
  '1': 'gap-1',
  '2': 'gap-2',
  '3': 'gap-3',
  '4': 'gap-4',
  '5': 'gap-5',
  '6': 'gap-6',
  '8': 'gap-8',
  '10': 'gap-10',
  '12': 'gap-12',
  '16': 'gap-16',
}

function normalizeCells(cells: unknown, expectedLen: number): number[] {
  if (!Array.isArray(cells)) {
    return Array.from({ length: expectedLen }, () => 1)
  }
  const out: number[] = []
  for (let i = 0; i < expectedLen; i++) {
    const v = cells[i]
    const n = typeof v === 'number' && Number.isFinite(v) && Number.isInteger(v) && v >= 1 ? v : 1
    out.push(n)
  }
  return out
}

type Bounds = { minR: number; maxR: number; minC: number; maxC: number }

function boundsForRegion(cells: number[], cols: number, regionId: number): Bounds | null {
  let minR = Infinity
  let maxR = -1
  let minC = Infinity
  let maxC = -1
  let found = false

  for (let i = 0; i < cells.length; i++) {
    if (cells[i] !== regionId) continue
    found = true
    const r = Math.floor(i / cols)
    const c = i % cols
    minR = Math.min(minR, r)
    maxR = Math.max(maxR, r)
    minC = Math.min(minC, c)
    maxC = Math.max(maxC, c)
  }

  if (!found) return null
  return { minR, maxR, minC, maxC }
}

function isRectangle(cells: number[], cols: number, regionId: number, b: Bounds): boolean {
  for (let r = b.minR; r <= b.maxR; r++) {
    for (let c = b.minC; c <= b.maxC; c++) {
      const idx = r * cols + c
      if (cells[idx] !== regionId) return false
    }
  }
  return true
}

type GridRegionRow = NonNullable<NonNullable<GridLayoutBlockProps['regions']>[number]>

export const GridLayoutBlock: React.FC<
  GridLayoutBlockProps & { disableInnerContainer?: boolean; background?: any; id?: string }
> = (props) => {
  const { title, columns = 4, rows = 4, gap, cells: cellsRaw, regions, background, id } = props

  const cols = Math.min(6, Math.max(1, columns))
  const rowCount = Math.min(6, Math.max(1, rows))
  const expectedLen = cols * rowCount
  const cells = normalizeCells(cellsRaw, expectedLen)

  const gapKey = gap ?? '4'
  const gapClass = GAP_MAP[gapKey] ?? 'gap-4'

  const regionMap = new Map<number, GridRegionRow>()
  for (const r of regions ?? []) {
    if (typeof r.regionId === 'number' && Number.isInteger(r.regionId)) {
      regionMap.set(r.regionId, r)
    }
  }

  const uniqueIds = Array.from(new Set(cells)).sort((a, b) => a - b)

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
          {title && <h2 className="text-2xl font-bold mb-8 lg:mb-12">{title}</h2>}
          <div
            className={cn('grid w-full auto-rows-min', gapClass)}
            style={{
              gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${rowCount}, minmax(0, min-content))`,
            }}
          >
            {uniqueIds.map((regionId) => {
              const b = boundsForRegion(cells, cols, regionId)
              if (!b) return null

              const validRect = isRectangle(cells, cols, regionId, b)
              const data = regionMap.get(regionId)

              const gridColumn = `${b.minC + 1} / ${b.maxC + 2}`
              const gridRow = `${b.minR + 1} / ${b.maxR + 2}`

              return (
                <div
                  key={regionId}
                  className={cn(
                    'relative min-h-0 min-w-0 overflow-hidden rounded',
                    !validRect && 'ring-2 ring-destructive/80',
                  )}
                  style={{ gridColumn, gridRow }}
                  data-region-id={regionId}
                  title={
                    !validRect ? 'Region is not a solid rectangle; layout may be wrong.' : undefined
                  }
                >
                  {data?.richText && (
                    <RichText
                      className="mb-0 not-last:mb-4"
                      data={data.richText}
                      enableGutter={false}
                    />
                  )}
                  {data?.media && typeof data.media === 'object' && data.media && (
                    <Media
                      fill
                      imgClassName="object-cover rounded-md border border-border"
                      resource={data.media}
                    />
                  )}
                  {!data?.richText && !data?.media && (
                    <p className="text-sm text-muted-foreground">Region {regionId} (no content)</p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
