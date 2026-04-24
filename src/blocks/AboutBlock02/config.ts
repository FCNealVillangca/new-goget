import type { Block } from 'payload'

import { backgroundField } from '../../fields/background'

export const AboutBlock02: Block = {
  slug: 'aboutBlock02',
  interfaceName: 'AboutBlock02Block',
  fields: [
    backgroundField,
    {
      name: 'badge',
      type: 'text',
      label: 'Badge Text',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Cards',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          options: [
            { label: 'Layers', value: 'layers' },
            { label: 'Megaphone', value: 'megaphone' },
            { label: 'Trending Up', value: 'trendingUp' },
            { label: 'Message Square', value: 'messageSquare' },
            { label: 'Zap', value: 'zap' },
            { label: 'Target', value: 'target' },
          ],
        },
        {
          name: 'style',
          type: 'select',
          label: 'Card Style',
          options: [
            { label: 'White', value: 'white' },
            { label: 'Blue', value: 'blue' },
          ],
        },
      ],
    },
    {
      name: 'quote',
      type: 'textarea',
      label: 'Quote Text',
    },
    {
      name: 'quoteHighlight',
      type: 'text',
      label: 'Quote Highlighted Text',
    },
    {
      name: 'ctaText',
      type: 'text',
      label: 'CTA Button Text',
    },
  ],
  labels: {
    plural: 'About Block 02',
    singular: 'About Block 02',
  },
}
