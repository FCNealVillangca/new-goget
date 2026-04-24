import React from 'react'

import type { Page } from '@/payload-types'

import { AboutHero } from '@/heros/About'
import { ExamSupportHero } from '@/heros/ExamSupport'
import { ResultsHero } from '@/heros/Results'
import { HighImpactHero } from '@/heros/HighImpact'

import { LowImpactHero } from '@/heros/LowImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'
import { log } from 'console'

const heroes = {
  about: AboutHero,
  examSupport: ExamSupportHero,
  results: ResultsHero,
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
}

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}
  log('RenderHero props:', JSON.stringify(props))
  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
