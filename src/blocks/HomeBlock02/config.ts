import type { Block } from 'payload'

import { backgroundField } from '../../fields/background'

export const HomeBlock02: Block = {
  slug: 'homeBlock02',
  interfaceName: 'HomeBlock02Block',
  fields: [
    backgroundField,
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'steps',
      type: 'array',
      label: 'Steps',
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
    plural: 'Home Block 02',
    singular: 'Home Block 02',
  },
}
