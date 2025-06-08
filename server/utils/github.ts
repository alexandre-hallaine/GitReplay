import { Octokit } from 'octokit'
import type { H3Event } from 'h3'

interface ContributionYearData {
  user: {
    contributionsCollection: {
      contributionYears: number[]
    }
  }
}

interface ContributionDayGraphQL {
  date: string
  contributionCount: number
}

interface ContributionCalendarGraphQL {
  weeks: {
    contributionDays: ContributionDayGraphQL[]
  }[]
}

interface ContributionCollectionData {
  user: {
    contributionsCollection: {
      contributionCalendar: ContributionCalendarGraphQL
    }
  }
}

export async function getOctokit(event: H3Event) {
  const headers = getRequestHeaders(event)
  const session = await auth().api.getSession({ headers })
  if (!session) throw createError({ statusCode: 401, message: 'Authentication required.' })

  const { accessToken } = await auth().api.getAccessToken({ body: { providerId: 'github' }, headers })
  if (!accessToken) throw createError({ statusCode: 401, message: 'Missing GitHub access token. Check your BetterAuth session.' })

  return new Octokit({ auth: accessToken })
}

export async function fetchContributionYears(octokit: Octokit, login: string): Promise<number[]> {
  const { user } = await octokit.graphql<ContributionYearData>(`
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionYears
        }
      }
    }
  `, { login })
  return user.contributionsCollection.contributionYears
}

export async function fetchContributionDataForYear(octokit: Octokit, login: string, year: number) {
  const from = new Date(`${year}-01-01T00:00:00Z`).toISOString()
  const to = new Date(`${year}-12-31T23:59:59Z`).toISOString()

  const { user } = await octokit.graphql<ContributionCollectionData>(`
    query($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `, { login, from, to })

  return user.contributionsCollection
}
