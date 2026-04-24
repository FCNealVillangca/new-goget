import type { Block } from 'payload'

import { backgroundField } from '../../fields/background'

export const HomeBlock03: Block = {
  slug: 'homeBlock03',
  interfaceName: 'HomeBlock03Block',
  fields: [
    backgroundField,
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'highlightedTitle',
      type: 'text',
      label: 'Highlighted Title',
    },
    {
      name: 'paragraphs',
      type: 'array',
      label: 'Paragraphs',
      fields: [
        {
          name: 'text',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'features',
      type: 'array',
      label: 'Features',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'Button Text',
    },
    {
      name: 'buttonSubtext',
      type: 'text',
      label: 'Button Subtext',
    },
    {
      name: 'beforeCard',
      type: 'group',
      label: 'Before Card',
      fields: [
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'text',
          type: 'textarea',
        },
        {
          name: 'speaker',
          type: 'text',
        },
        {
          name: 'subtitle',
          type: 'text',
        },
      ],
    },
    {
      name: 'afterCard',
      type: 'group',
      label: 'After Card',
      fields: [
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'text',
          type: 'textarea',
        },
        {
          name: 'speaker',
          type: 'text',
        },
        {
          name: 'subtitle',
          type: 'text',
        },
      ],
    },
  ],
  labels: {
    plural: 'Home Block 03',
    singular: 'Home Block 03',
  },
}
