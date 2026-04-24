import type { Block } from 'payload'

import { backgroundField } from '../../fields/background'

export const HomeBlock01: Block = {
  slug: 'homeBlock01',
  interfaceName: 'HomeBlock01Block',
  fields: [
    backgroundField,
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'struggles',
      type: 'array',
      label: 'Struggles',
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
      ],
    },
  ],
  labels: {
    plural: 'Home Block 01',
    singular: 'Home Block 01',
  },
}
