import type { Block } from 'payload'

import { backgroundField } from '../../fields/background'

export const ResultsBlock: Block = {
  slug: 'resultsBlock',
  interfaceName: 'ResultsBlock',
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
    plural: 'Results Blocks',
    singular: 'Results Block',
  },
}
