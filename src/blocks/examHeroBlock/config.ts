import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'

export const ExamHeroBlock: Block = {
  slug: 'examHeroBlock',
  interfaceName: 'ExamHeroBlock',
  fields: [
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
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'confidenceLevel',
      type: 'number',
      label: 'Confidence Level (%)',
      min: 0,
      max: 100,
    },
    {
      name: 'background',
      type: 'group',
      label: 'Background',
      fields: [
        {
          name: 'type',
          type: 'select',
          label: 'Background Type',
          defaultValue: 'none',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Preset Color', value: 'preset' },
            { label: 'Custom Color', value: 'custom' },
            { label: 'Image', value: 'image' },
          ],
        },
        {
          name: 'presetColor',
          type: 'select',
          label: 'Color',
          defaultValue: 'bg-muted text-muted-foreground',
          options: [
            { label: 'Background', value: 'bg-background text-foreground' },
            { label: 'Card', value: 'bg-card text-card-foreground' },
            { label: 'Popover', value: 'bg-popover text-popover-foreground' },
            { label: 'Primary', value: 'bg-primary text-primary-foreground' },
            { label: 'Secondary', value: 'bg-secondary text-secondary-foreground' },
            { label: 'Muted', value: 'bg-muted text-muted-foreground' },
            { label: 'Accent', value: 'bg-accent text-accent-foreground' },
            { label: 'Destructive', value: 'bg-destructive text-destructive-foreground' },
          ],
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'preset',
            description: 'Theme-aware — adapts automatically to light and dark mode.',
          },
        },
        {
          name: 'customLight',
          type: 'text',
          label: 'Color — Light Mode',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'custom',
            placeholder: '#f5f0e8',
            description: 'Any valid CSS color value: hex, rgb(), oklch(), hsl(), etc.',
          },
        },
        {
          name: 'customDark',
          type: 'text',
          label: 'Color — Dark Mode',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'custom',
            placeholder: '#2a2520',
            description: 'Optional. If left empty, the light color is used in both modes.',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'image',
            description: 'Displayed as a full-bleed background behind the block content.',
          },
        },
      ],
    },
  ],
  labels: {
    plural: 'Exam Support Hero Blocks',
    singular: 'Exam Support Hero Block',
  },
}
