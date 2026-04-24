import type { Block } from 'payload'

import { backgroundField } from '../../fields/background'

export const AboutBlock01: Block = {
  slug: 'aboutBlock01',
  interfaceName: 'AboutBlock01Block',
  fields: [
    backgroundField,
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'highlightedWord',
      type: 'text',
      label: 'Highlighted Word',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'highlightText',
      type: 'textarea',
      label: 'Highlight Text',
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
            { label: 'Message Square', value: 'messageSquare' },
            { label: 'Zap', value: 'zap' },
            { label: 'Target', value: 'target' },
            { label: 'Trending Up', value: 'trendingUp' },
          ],
        },
        {
          name: 'style',
          type: 'select',
          label: 'Card Style',
          options: [
            { label: 'Blue', value: 'blue' },
            { label: 'White', value: 'white' },
            { label: 'Dark', value: 'dark' },
          ],
        },
      ],
    },
  ],
  labels: {
    plural: 'About Block 01',
    singular: 'About Block 01',
  },
}
