import type { Block } from 'payload'

import { backgroundField } from '../../fields/background'

export const AboutHeroBlock: Block = {
  slug: 'aboutHeroBlock',
  interfaceName: 'AboutHeroBlock',
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
      name: 'titleHighlight',
      type: 'text',
      label: 'Title Highlighted Text',
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
    {
      name: 'floatingCardTitle',
      type: 'text',
      label: 'Floating Card Title',
    },
    {
      name: 'floatingCardDescription',
      type: 'text',
      label: 'Floating Card Description',
    },
    backgroundField,
  ],
  labels: {
    plural: 'About Hero Blocks',
    singular: 'About Hero Block',
  },
}
