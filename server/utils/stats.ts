export async function getStats(start: Date, end: Date) {
  const rawDates = await ghStorage.getKeys()
  const dates = rawDates.map(date => date.replace(/\.json$/, ''))

  const toFetch = dates.filter((str) => {
    const date = new Date(str)
    return date >= start && date <= end
  })

  const items = await ghStorage.getItems<object>(toFetch.map(key => key + '.json'))
  return items.reduce((acc, { value }) => defuSum(value, acc), {}) as object
}
