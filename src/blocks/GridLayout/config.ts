import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { backgroundField } from '../../fields/background'

export const GridLayout: Block = {
  slug: 'gridLayout',
  interfaceName: 'GridLayoutBlock',
  labels: {
    plural: 'Grid layouts',
    singular: 'Grid layout',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'columns',
          type: 'number',
          label: 'Columns',
          required: true,
          defaultValue: 4,
          min: 1,
          max: 6,
          admin: {
            width: '33%',
          },
        },
        {
          name: 'rows',
          type: 'number',
          label: 'Rows',
          required: true,
          defaultValue: 4,
          min: 1,
          max: 6,
          admin: {
            width: '33%',
          },
        },
        {
          name: 'gap',
          type: 'select',
          label: 'Gap',
          defaultValue: '4',
          options: [
            { label: '0', value: '0' },
            { label: '1 (0.25rem)', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' },
            { label: '5', value: '5' },
            { label: '6', value: '6' },
            { label: '8', value: '8' },
            { label: '10', value: '10' },
            { label: '12', value: '12' },
            { label: '16', value: '16' },
          ],
          admin: {
            width: '34%',
          },
        },
      ],
    },
    {
      name: 'cells',
      type: 'json',
      label: 'Cells',
      admin: {
        components: {
          Field: '@/fields/GridCellsField#GridCellsField',
        },
      },
      defaultValue: [1, 1, 1, 1],
      validate: (value) => {
        if (value === null || value === undefined) {
          return true
        }
        if (!Array.isArray(value)) {
          return 'Cells must be a JSON array of numbers'
        }
        for (const v of value) {
          if (typeof v !== 'number' || !Number.isFinite(v) || v < 1 || !Number.isInteger(v)) {
            return 'Each cell must be a positive integer (region id)'
          }
        }
        return true
      },
    },
    {
      name: 'regions',
      type: 'array',
      label: 'Regions',
      admin: {
        className: 'grid-layout-regions',
        initCollapsed: true,
      },
      labels: {
        singular: 'Region',
        plural: 'Regions',
      },
      fields: [
        {
          name: 'regionId',
          type: 'number',
          label: 'ID',
          required: true,
          min: 1,
        },
        {
          name: 'contentType',
          type: 'radio',
          label: 'Content Type',
          required: true,
          defaultValue: 'richText',
          options: [
            {
              label: 'Rich Text',
              value: 'richText',
            },
            {
              label: 'Media',
              value: 'media',
            },
          ],
          admin: {
            layout: 'horizontal',
          },
        },
        {
          name: 'richText',
          type: 'richText',
          label: 'Rich Text',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ]
            },
          }),
          admin: {
            condition: (_, siblingData) => siblingData?.contentType === 'richText',
          },
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          label: 'Media',
          admin: {
            condition: (_, siblingData) => siblingData?.contentType === 'media',
          },
        },
      ],
    },
    backgroundField,
  ],
}
