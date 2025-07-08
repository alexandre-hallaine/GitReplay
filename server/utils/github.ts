import { createStorage } from 'unstorage'
import githubDriver from 'unstorage/drivers/github'

export const ghStorage = createStorage({
  driver: githubDriver({
    repo: 'alexandre-hallaine/ghstats',
    token: process.env.GITHUB_TOKEN,
    dir: '/stats',
  }),
})

export async function getRange() {
  const rawDates = await ghStorage.getKeys()
  const dates = rawDates.map(date => date.replace(/\.json$/, ''))

  return {
    start: new Date(dates[0]),
    end: new Date(dates[dates.length - 1]),
  }
}
