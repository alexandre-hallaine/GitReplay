export default cachedEventHandler(async () => {
  const { start } = await getRange()
  const results: Record<string, object> = {}

  const startMonth = start.getFullYear() * 12 + start.getMonth()
  const currentMonth = new Date().getFullYear() * 12 + new Date().getMonth()

  for (let month = startMonth; month < currentMonth; month++) {
    const year = Math.floor(month / 12)
    const m = month % 12

    const monthStart = new Date(year, m, 1)
    const monthEnd = new Date(year, m + 1, 0)
    const key = `${year}-${String(m + 1).padStart(2, '0')}`

    results[key] = await getStats(monthStart, monthEnd)
  }

  return results
}, {
  maxAge: 60 * 60 * 24,
  getKey: event => event.path,
})
