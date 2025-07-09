import type { H3Event } from 'h3'

export const getStats = defineCachedFunction(async (event: H3Event, start: Date, end: Date) => {
  const rawDates = await ghStorage.getKeys()
  const dates = rawDates.map(date => date.replace(/\.json$/, ''))

  const toFetch = dates.filter((str) => {
    const date = new Date(str)
    return date >= start && date <= end
  })

  const items = await ghStorage.getItems<object>(toFetch.map(key => key + '.json'))
  return items.reduce((acc, { value }) => defuSum(value, acc), {}) as object
}, {
  maxAge: 60 * 60 * 24 * 365, // 1 year
  name: 'getStats',
  getKey: (event: H3Event, start: Date, end: Date) => {
    const formatDate = (date: Date) => date.toISOString().split('T')[0]
    return `${formatDate(start)}-${formatDate(end)}`
  },
})
