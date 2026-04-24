import type { Block } from 'payload'

import { backgroundField } from '../../fields/background'

export const Stepper: Block = {
  slug: 'stepper',
  interfaceName: 'StepperBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'steps',
      type: 'array',
      required: true,
      minRows: 1,
      labels: {
        singular: 'Step',
        plural: 'Steps',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
        },
      ],
    },
    backgroundField,
  ],
  labels: {
    plural: 'Steppers',
    singular: 'Stepper',
  },
}
