export default defineEventHandler(async () => {
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
})
