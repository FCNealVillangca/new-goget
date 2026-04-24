import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
    },
    {
      name: 'brandName',
      type: 'text',
      label: 'Brand Name',
      defaultValue: 'GOGET',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      defaultValue:
        'Structured French learning focused on speaking, clarity, and exam performance. Built to help you improve with confidence.',
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          label: 'Platform',
          options: [
            { label: 'Website', value: 'website' },
            { label: 'Email', value: 'email' },
          ],
        },
        link(),
      ],
      maxRows: 4,
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation Links',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
      defaultValue: '+44 7587 407771',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      defaultValue: 'info@gogetfrench.com',
    },
    {
      name: 'ctaTitle',
      type: 'text',
      label: 'CTA Title',
      defaultValue: 'Start your journey',
    },
    {
      name: 'ctaDescription',
      type: 'textarea',
      label: 'CTA Description',
      defaultValue: 'Master French with confidence and ace your exams.',
    },
    {
      name: 'ctaButtonText',
      type: 'text',
      label: 'CTA Button Text',
      defaultValue: 'Get Started',
    },
    {
      name: 'ctaLink',
      type: 'group',
      label: 'CTA Link',
      fields: [
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'url',
          type: 'text',
        },
        {
          name: 'newTab',
          type: 'checkbox',
        },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      label: 'Copyright Text',
      defaultValue: '© 2024 GOGET FRENCH. All rights reserved.',
    },
    {
      name: 'legalLinks',
      type: 'array',
      label: 'Legal Links',
      fields: [
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'url',
          type: 'text',
        },
      ],
      maxRows: 4,
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
