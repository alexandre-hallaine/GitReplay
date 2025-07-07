import type { StorageValue } from 'unstorage'

export default defineEventHandler(async (event) => {
  const result: { [key: string]: StorageValue } = {}

  const { start } = await getRange()
  const current = new Date(start.getUTCFullYear(), start.getUTCMonth(), 1)
  const end = new Date()
  end.setUTCDate(0)

  while (current <= end) {
    result[current.toISOString().slice(0, 7)] = await getMonthStats(event, current)
    current.setMonth(current.getMonth() + 1)
  }

  return result
})
