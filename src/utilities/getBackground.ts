/**
 * Shared background resolver for block components.
 *
 * preset  → returns a Tailwind className string (theme-aware, safe)
 * custom  → returns a scoped CSS string to inject via <style>
 *           using the block's Payload id as the element id selector
 * image   → no className; caller renders the <Media> overlay
 * none    → empty string
 */

/** Loose type so this helper works before/after generate:types */
export type BackgroundField = {
  type?: 'none' | 'preset' | 'custom' | 'image' | null
  presetColor?: string | null
  customLight?: string | null
  customDark?: string | null
  image?: unknown
}

/**
 * Strip characters that are not valid in a CSS color value.
 * Prevents </style><script> injection from CMS editors.
 */
function sanitizeCSSColor(value: string): string {
  return value.replace(/[^a-zA-Z0-9#%().,\s]/g, '')
}

/** Returns the Tailwind className to apply to the section element. */
export function getBackgroundClass(bg: BackgroundField | null | undefined): string {
  if (bg?.type === 'preset') return bg.presetColor ?? ''
  return ''
}

/**
 * Returns a scoped CSS string for custom colors, or null if not applicable.
 * Inject via:  <style dangerouslySetInnerHTML={{ __html: css }} />
 * Apply via:   <section id={`block-bg-${id}`}>
 */
export function getCustomBackgroundCSS(
  bg: BackgroundField | null | undefined,
  blockId: string | null | undefined,
): string | null {
  if (bg?.type !== 'custom' || !blockId) return null

  const light = bg.customLight ? sanitizeCSSColor(bg.customLight) : 'transparent'
  const dark = bg.customDark ? sanitizeCSSColor(bg.customDark) : null

  const selector = `#block-bg-${blockId}`
  return [
    `${selector}{background-color:${light}}`,
    dark ? `[data-theme='dark'] ${selector}{background-color:${dark}}` : '',
  ].join('')
}
