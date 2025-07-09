import { eachYearOfInterval, endOfYear, format, startOfYear } from 'date-fns'

export default cachedEventHandler(async (event) => {
  const { start } = await getRange()
  const end = new Date()

  return Object.fromEntries(await Promise.all(
    eachYearOfInterval({ start, end }).map(async date => ([
      format(date, 'yyyy'),
      await getStats(event, startOfYear(date), endOfYear(date)),
    ])),
  ))
}, {
  maxAge: 60 * 60 * 24 * 365, // 1 year
  getKey: event => event.path,
})
