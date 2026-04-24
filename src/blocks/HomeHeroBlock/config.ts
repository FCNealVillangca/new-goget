import type { Block } from 'payload'

import { backgroundField } from '../../fields/background'
import { linkGroup } from '@/fields/linkGroup'

export const HomeHeroBlock: Block = {
  slug: 'homeHeroBlock',
  interfaceName: 'HomeHeroBlock',
  fields: [
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
      label: 'Description',
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    backgroundField,
  ],
  labels: {
    plural: 'Home Hero Blocks',
    singular: 'Home Hero Block',
  },
}
