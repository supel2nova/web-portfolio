import { INTRO_DONE } from '../constants'

let finished = false

export const introFinished = () => finished

export function markIntroDone() {
  finished = true
  window.dispatchEvent(new Event(INTRO_DONE))
}
