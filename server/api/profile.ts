export default defineEventHandler(async (event) => {
  const octokit = await getOctokit(event)
  const login = getQuery(event).login as string
  if (!login) throw createError({ statusCode: 400, message: '"login" parameter is missing.' })

  const collection = await fetchContributionDataForYear(octokit, login, 2025)
  const { currentStreak, longestStreak } = computeStreaks(collection.contributionCalendar.weeks.flatMap(w => w.contributionDays))

  return {
    currentStreak,
    longestStreak,
  }
})
