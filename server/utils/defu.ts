import { createDefu } from 'defu'

export const defuSum = createDefu((obj, key, value) => {
  if (typeof obj[key] === 'number' && typeof value === 'number') {
    obj[key] += value
    return true
  }
})
