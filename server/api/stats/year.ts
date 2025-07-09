export default cachedEventHandler(async () => {
  const { start } = await getRange()
  const results: Record<string, object> = {}

  const startYear = start.getFullYear()
  const currentYear = new Date().getFullYear()

  for (let year = startYear; year < currentYear; year++) {
    const yearStart = new Date(year, 0, 1)
    const yearEnd = new Date(year, 11, 31)

    results[year] = await getStats(yearStart, yearEnd)
  }

  return results
}, {
  maxAge: 60 * 60 * 24,
  getKey: event => event.path,
})
