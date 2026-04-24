import type { Block } from 'payload'

export const ExamBlock01: Block = {
  slug: 'examBlock01',
  interfaceName: 'ExamBlock01',
  fields: [
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
    {
      name: 'label',
      type: 'text',
      label: 'Section Label',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'programmes',
      type: 'array',
      label: 'Programmes',
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
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          options: [
            { label: 'Target', value: 'target' },
            { label: 'Award', value: 'award' },
            { label: 'Mic', value: 'mic' },
            { label: 'Book', value: 'book' },
            { label: 'Graduation Cap', value: 'graduationCap' },
          ],
        },
        {
          name: 'color',
          type: 'select',
          label: 'Icon Color',
          options: [
            { label: 'Blue', value: 'text-blue-600' },
            { label: 'Red', value: 'text-red-600' },
            { label: 'Slate', value: 'text-slate-900' },
            { label: 'Green', value: 'text-green-600' },
          ],
        },
        {
          name: 'bgColor',
          type: 'select',
          label: 'Icon Background',
          options: [
            { label: 'Blue Light', value: 'bg-blue-50' },
            { label: 'Red Light', value: 'bg-red-50' },
            { label: 'Slate Light', value: 'bg-slate-100' },
            { label: 'Green Light', value: 'bg-green-50' },
          ],
        },
      ],
    },
  ],
  labels: {
    plural: 'Exam Support Blocks',
    singular: 'Exam Support Block',
  },
}
