import type { H3Event } from 'h3'

async function getStats(start: Date, end: Date) {
  const rawDates = await ghStorage.getKeys()
  const dates = rawDates.map(date => date.replace(/\.json$/, ''))

  const toFetch = dates.filter((str) => {
    const date = new Date(str)
    return date >= start && date <= end
  })

  const items = await ghStorage.getItems<object>(toFetch.map(key => key + '.json'))
  return items.reduce((acc, { value }) => defuSum(value, acc), {}) as object
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
