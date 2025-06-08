export default defineEventHandler(async (event) => {
  const octokit = await getOctokit(event)
  const login = getQuery(event).login as string
  if (!login) throw createError({ statusCode: 400, message: '"login" parameter is missing.' })

  const years = await fetchContributionYears(octokit, login) // Pass octokit
  console.log(years)

  const allDays = (
    await Promise.all(
      years.map(async (year) => {
        const collection = await fetchContributionDataForYear(octokit, login, year)
        console.log(year, 'done')
        return collection.contributionCalendar.weeks.flatMap(w => w.contributionDays)
      }),
    )
  ).flat()

  const { currentStreak, longestStreak } = computeStreaks(allDays)

  return {
    currentStreak,
    longestStreak,
  }
})
