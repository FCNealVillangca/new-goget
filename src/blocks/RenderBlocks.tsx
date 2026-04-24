import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { AccordionBlock } from '@/blocks/Accordion/Component'
import { AboutHeroBlock } from '@/blocks/AboutHeroBlock/Component'
import { GalleryBlock } from '@/blocks/Gallery/Component'
import { StepperBlock } from '@/blocks/Stepper/Component'
import { GridLayoutBlock } from '@/blocks/GridLayout/Component'
import { HomeBlock01Block } from '@/blocks/HomeBlock01/Component'
import { HomeBlock02Block } from '@/blocks/HomeBlock02/Component'
import { HomeBlock03Block } from '@/blocks/HomeBlock03/Component'
import { AboutBlock01Block } from '@/blocks/AboutBlock01/Component'
import { AboutBlock02Block } from '@/blocks/AboutBlock02/Component'
import { AboutBlock03Block } from '@/blocks/AboutBlock03/Component'
import { ExamBlock01 } from '@/blocks/examBlock01/Component'
import { ExamBlock02 } from '@/blocks/examBlock02/Component'
import { ExamHeroBlock } from '@/blocks/examHeroBlock/Component'
import { ResultsBlock } from '@/blocks/ResultsBlock/Component'
import { HomeHeroBlock } from '@/blocks/HomeHeroBlock/Component'
import { FaqBlock01 } from '@/blocks/FaqBlock01/Component'
import { HomeBlock3 } from '@/blocks/HomeBlock3/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  accordion: AccordionBlock,
  gallery: GalleryBlock,
  stepper: StepperBlock,
  gridLayout: GridLayoutBlock,
  homeBlock01: HomeBlock01Block,
  homeBlock02: HomeBlock02Block,
  homeBlock03: HomeBlock03Block,
  aboutBlock01: AboutBlock01Block,
  aboutBlock02: AboutBlock02Block,
  aboutBlock03: AboutBlock03Block,
  aboutHeroBlock: AboutHeroBlock,
  examBlock01: ExamBlock01,
  examBlock02: ExamBlock02,
  examHeroBlock: ExamHeroBlock,
  resultsBlock: ResultsBlock,
  homeHeroBlock: HomeHeroBlock,
  faqBlock01: FaqBlock01,
  homeBlock3: HomeBlock3,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
