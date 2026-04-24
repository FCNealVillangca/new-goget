import type { Block } from 'payload'

import { backgroundField } from '../../fields/background'

export const AboutBlock03: Block = {
  slug: 'aboutBlock03',
  interfaceName: 'AboutBlock03Block',
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
      name: 'description',
      type: 'textarea',
      label: 'Description (use newlines for paragraphs)',
    },
    {
      name: 'features',
      type: 'array',
      label: 'Features',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'goalLabel',
      type: 'text',
      label: 'Goal Label',
    },
    {
      name: 'goalText',
      type: 'text',
      label: 'Goal Text',
    },
    {
      name: 'tutorImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Tutor Image',
    },
  ],
  labels: {
    plural: 'About Block 03',
    singular: 'About Block 03',
  },
}
