import type { Block } from 'payload'

import { backgroundField } from '../../fields/background'

export const HomeBlock3: Block = {
  slug: 'homeBlock3',
  interfaceName: 'HomeBlock3',
  fields: [
    backgroundField,
    {
      name: 'limit',
      type: 'number',
      label: 'Limit',
      defaultValue: 6,
      admin: {
        description: 'Maximum number of testimonials to display.',
      },
    },
  ],
  labels: {
    plural: 'Home Block 3',
    singular: 'Home Block 3',
  },
}
