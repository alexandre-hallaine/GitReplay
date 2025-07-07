import type { StorageValue } from 'unstorage'

const getStats = defineCachedFunction(async () => {
  const keys = await hubKV().getKeys()
  const rawDates = await ghStorage.getKeys()
  const dates = rawDates.map(date => date.replace(/\.json$/, ''))

  const knownKeys = new Set(keys)
  const existing = dates.filter(k => knownKeys.has(k))
  const missing = dates.filter(k => !knownKeys.has(k))

  const items = await getKVItems(existing)
  const newItemsRaw = await ghStorage.getItems(missing.map(key => key + '.json'))

  const newItems = newItemsRaw.map(({ key, value }) => ({ key: key.replace(/\.json$/, ''), value }))
  await setKVItems(newItems)

  return [...items, ...newItems]
}, {
  maxAge: 60 * 60 * 24,
})

export const getMonthStats = defineCachedFunction(async () => {
  const days = await getStats()
  const monthsMap = new Map<string, StorageValue>()

  for (const day of days) {
    const monthKey = day.key.slice(0, 7)

    if (monthsMap.has(monthKey)) {
      const prev = monthsMap.get(monthKey)!
      monthsMap.set(monthKey, defuSum(day.value, prev))
    }
    else {
      monthsMap.set(monthKey, day.value)
    }
  }

  return Array.from(monthsMap.entries()).map(([key, value]) => ({ key, value }))
}, {
  maxAge: 60 * 60 * 24,
})
