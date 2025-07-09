import { eachMonthOfInterval, endOfMonth, format, isThisMonth, startOfMonth } from 'date-fns'

export default cachedEventHandler(async (event) => {
  const { start } = await getRange()
  const end = new Date()

  const months = eachMonthOfInterval({ start, end })
    .filter(date => !isThisMonth(date))
    .map(date => ({
      key: format(date, 'yyyy-MM'),
      range: [startOfMonth(date), endOfMonth(date)] as [Date, Date],
    }))

  const result: Record<string, unknown> = {}
  for (const { key, range } of months)
    result[key] = await getStats(event, ...range)
  return result
}, {
  maxAge: 60 * 60 * 24 * 31, // 1 month
  getKey: event => event.path,
})
