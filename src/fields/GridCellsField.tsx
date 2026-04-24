'use client'

import React, { useEffect, useMemo } from 'react'
import type { Validate } from 'payload'

import { FieldError, FieldLabel, useField, useFormFields } from '@payloadcms/ui'

function normalizeCell(v: unknown): number {
  if (typeof v === 'number' && Number.isFinite(v) && Number.isInteger(v) && v >= 1) {
    return v
  }
  const n = parseInt(String(v), 10)
  return Number.isFinite(n) && n >= 1 ? n : 1
}

export function GridCellsField(props: {
  field: {
    admin?: { className?: string; description?: string }
    label?: string | Record<string, string>
    name: string
    required?: boolean
  }
  path: string
  readOnly?: boolean
  validate?: Validate
}) {
  const { field, path: pathFromProps, readOnly, validate } = props
  const className = field.admin?.className

  const { disabled, path, setValue, showError, value } = useField<number[]>({
    potentiallyStalePath: pathFromProps,
    validate,
  })

  const parentPath = useMemo(() => path.replace(new RegExp(`\\.${field.name}$`), ''), [path, field.name])

  const columns = useFormFields(([fields]) => fields?.[`${parentPath}.columns`]?.value as number | undefined)
  const rows = useFormFields(([fields]) => fields?.[`${parentPath}.rows`]?.value as number | undefined)
  const gapKey = useFormFields(([fields]) => fields?.[`${parentPath}.gap`]?.value as string | undefined)

  const colCount = Math.min(6, Math.max(1, Number(columns) || 4))
  const rowCount = Math.min(6, Math.max(1, Number(rows) || 4))
  const expectedLen = colCount * rowCount

  useEffect(() => {
    const raw = Array.isArray(value) ? value : []
    if (raw.length === expectedLen) return
    const next = Array.from({ length: expectedLen }, (_, i) =>
      i < raw.length ? normalizeCell(raw[i]) : 1,
    )
    setValue(next)
  }, [expectedLen, setValue, value])

  const displayCells = useMemo(() => {
    const raw = Array.isArray(value) ? value : []
    return Array.from({ length: expectedLen }, (_, i) =>
      i < raw.length ? normalizeCell(raw[i]) : 1,
    )
  }, [expectedLen, value])

  const updateCell = (index: number, next: number) => {
    const n = Number.isFinite(next) && Number.isInteger(next) && next >= 1 ? next : 1
    const nextArr = [...displayCells]
    nextArr[index] = n
    setValue(nextArr)
  }

  /** Tailwind spacing scale → CSS gap (matches block gap select). */
  const gapCss: Record<string, string> = {
    '0': '0',
    '1': '0.25rem',
    '2': '0.5rem',
    '3': '0.75rem',
    '4': '1rem',
    '5': '1.25rem',
    '6': '1.5rem',
    '8': '2rem',
    '10': '2.5rem',
    '12': '3rem',
    '16': '4rem',
  }
  const gap = gapCss[gapKey ?? '4'] ?? '1rem'

  return (
    <div className={className}>
      <FieldLabel label={field.label} path={path} required={field.required} />
      <div className="mt-2 w-full rounded border border-border p-2">
        <div
          style={{
            display: 'grid',
            width: '100%',
            gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${rowCount}, auto)`,
            gridAutoFlow: 'row',
            gap,
          }}
        >
          {Array.from({ length: rowCount * colCount }, (_, index) => {
            const r = Math.floor(index / colCount)
            const c = index % colCount
            const cell = displayCells[index] ?? 1
            return (
              <input
                aria-label={`R${r + 1} C${c + 1}`}
                className="box-border w-full min-w-0 rounded border border-input bg-background px-0 py-1.5 text-center text-sm tabular-nums outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                disabled={disabled || readOnly}
                key={index}
                min={1}
                onChange={(e) => {
                  const v = parseInt(e.target.value, 10)
                  updateCell(index, v)
                }}
                step={1}
                type="number"
                value={cell}
              />
            )
          })}
        </div>
      </div>
      <FieldError path={path} showError={showError} />
    </div>
  )
}
