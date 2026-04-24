import type { Field } from 'payload'

export const backgroundField: Field = {
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

    // ── Preset ───────────────────────────────────────────────────────
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

    // ── Custom ───────────────────────────────────────────────────────
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

    // ── Image ────────────────────────────────────────────────────────
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
}
