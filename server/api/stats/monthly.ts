import { eachMonthOfInterval, endOfMonth, format, startOfMonth } from 'date-fns'

export default cachedEventHandler(async (event) => {
  const { start } = await getRange()
  const end = new Date()

  return Object.fromEntries(await Promise.all(
    eachMonthOfInterval({ start, end }).map(async date => ([
      format(date, 'yyyy-MM'),
      await getStats(event, startOfMonth(date), endOfMonth(date)),
    ])),
  ))
}, {
  maxAge: 60 * 60 * 24 * 31, // 1 month
  getKey: event => event.path,
})
