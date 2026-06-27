import { professions1 } from './automations-1'
import { professions2 } from './automations-2'
import { professions3 } from './automations-3'
import { professions4 } from './automations-4'
import { professions5a } from './automations-5a'
import { professions5b } from './automations-5b'
import { professions5c } from './automations-5c'

export type { Profession, Workflow, FAQ } from './automations-1'

export const professions = [
  ...professions1,
  ...professions2,
  ...professions3,
  ...professions4,
  ...professions5a,
  ...professions5b,
  ...professions5c,
]
