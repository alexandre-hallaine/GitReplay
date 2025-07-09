import { eachYearOfInterval, endOfYear, format, isThisYear, startOfYear } from 'date-fns'

export default cachedEventHandler(async (event) => {
  const { start } = await getRange()
  const end = new Date()

  const years = eachYearOfInterval({ start, end })
    .filter(date => !isThisYear(date))
    .map(date => ({
      key: format(date, 'yyyy'),
      range: [startOfYear(date), endOfYear(date)] as [Date, Date],
    }))

  const result: Record<string, unknown> = {}
  for (const { key, range } of years)
    result[key] = await getStats(event, ...range)
  return result
}, {
  maxAge: 60 * 60 * 24 * 365, // 1 year
  getKey: event => event.path,
})
