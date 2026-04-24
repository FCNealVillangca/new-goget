# Creating & Editing Blocks

This project uses **Payload CMS 3.0**. Schema changes sync automatically in development — **no manual migrations needed**.

---

## Creating a New Block

### Step 1: Create config file

Create `src/blocks/<BlockName>/config.ts`:

```typescript
import type { Block } from 'payload'

import { backgroundField } from '../../fields/background'

export const MyBlock: Block = {
  slug: 'myBlock',
  interfaceName: 'MyBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    // Add more fields here:
    // - type: 'text' | 'textarea' | 'richText' | 'upload' | 'relationship' | 'array' | 'select'
    backgroundField,
  ],
  labels: {
    plural: 'My Blocks',
    singular: 'My Block',
  },
}
```

### Step 2: Create Component

Create `src/blocks/<BlockName>/Component.tsx`:

```typescript
import React from 'react'
import type { MyBlock as MyBlockProps } from '@/payload-types'
import { getBackgroundClass, getCustomBackgroundCSS } from '@/utilities/getBackground'

export const MyBlock: React.FC<MyBlockProps> = ({ id, title, background }) => {
  const presetClass = getBackgroundClass(background)
  const customCSS = getCustomBackgroundCSS(background, id)
  const sectionId = background?.type === 'custom' && id ? `block-bg-${id}` : undefined

  return (
    <>
      {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
      <section id={sectionId} className={`relative w-full ${presetClass || 'bg-transparent'}`}>
        <div className="container relative z-10 py-16">
          {title && <h2 className="text-2xl font-bold mb-8">{title}</h2>}
          {/* Block content */}
        </div>
      </section>
    </>
  )
}
```

### Step 3: Register in RenderBlocks

Edit [src/blocks/RenderBlocks.tsx](../src/blocks/RenderBlocks.tsx):

```typescript
import { MyBlock } from '@/blocks/MyBlock/Component'

const blockComponents = {
  // ...existing
  myBlock: MyBlock,
}
```

### Step 4: Add to Pages collection

Edit [src/collections/Pages/index.ts](../src/collections/Pages/index.ts):

```typescript
import { MyBlock } from '../../blocks/MyBlock/config'

// In the layout blocks array:
{
  name: 'layout',
  type: 'blocks',
  blocks: [
    // ...existing blocks
    MyBlock,
  ],
}
```

### Step 5: Regenerate types

```powershell
npm run generate:types
```

---

## Editing an Existing Block

### To add a field:

1. **Edit config** — Add the field in `src/blocks/<BlockName>/config.ts`:

```typescript
fields: [
  // ...existing fields
  {
    name: 'newField',
    type: 'text',
    label: 'New Field',
  },
],
```

2. **Update Component** — Destructure and use the field in `src/blocks/<BlockName>/Component.tsx`:

```typescript
export const MyBlock: React.FC<MyBlockProps> = ({ id, title, newField, background }) => {
  // Use newField in your JSX
  {newField && <p>{newField}</p>}
}
```

3. **Regenerate types:**

```powershell
npm run generate:types
```

### To remove a field:

1. Remove from `config.ts`
2. Remove from `Component.tsx`
3. Regenerate types

---

## No Migration Needed

Payload 3.0 automatically syncs schema changes in development. The database columns are created/updated when you:

- Run `npm run dev`
- Make changes to config files

If you need to reset the database during development:
```powershell
npm run reset:db
```

---

## Common Field Types

| Type | Config Example |
|------|----------------|
| Text | `{ name: 'title', type: 'text' }` |
| Textarea | `{ name: 'description', type: 'textarea' }` |
| Rich Text | `{ name: 'content', type: 'richText', editor: lexicalEditor(...) }` |
| Image | `{ name: 'image', type: 'upload', relationTo: 'media' }` |
| Relationship | `{ name: 'category', type: 'relationship', relationTo: 'categories' }` |
| Array (repeater) | `{ name: 'items', type: 'array', fields: [...] }` |
| Select | `{ name: 'size', type: 'select', options: [{ label: 'Small', value: 'sm' }] }` |
| Boolean | `{ name: 'enabled', type: 'checkbox' }` |

---

## Background Field

Most blocks include a background field for styling:

```typescript
import { backgroundField } from '../../fields/background'

// Add to fields array:
backgroundField,
```

This provides:
- Preset colors (none, primary, secondary, etc.)
- Custom CSS
- Background image upload