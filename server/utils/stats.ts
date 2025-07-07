import type { H3Event } from 'h3'

async function getStats(start: Date, end: Date) {
  const rawDates = await ghStorage.getKeys()
  const dates = rawDates.map(date => date.replace(/\.json$/, ''))

  const toFetch = dates.filter((str) => {
    const date = new Date(str)
    return date >= start && date <= end
  })

  const itemsRaw = await ghStorage.getItems(toFetch.map(key => key + '.json'))
  const items = itemsRaw.map(({ key, value }) => ({ key: key.replace(/\.json$/, ''), value }))

  let result = {}
  for (const { value: item } of items)
    result = defuSum(item, result)
  return result
}

export const getMonthStats = defineCachedFunction(async (event: H3Event, date: Date) => {
  const next = new Date(date)
  next.setMonth(date.getMonth() + 1)
  return await getStats(date, next)
}, {
  maxAge: 60 * 60 * 24,
  name: 'getMonthStats',
  getKey: (event, date) => date.toISOString().slice(0, 7),
})
