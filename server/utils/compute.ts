export interface ContributionDay {
  date: string
  contributionCount: number
}

// TODO: need refactor (this function come from chat and gemini)
export function computeStreaks(days: ContributionDay[]) {
  if (!days.length) return { currentStreak: 0, longestStreak: 0 }

  const sorted = days
    .map(({ date, contributionCount }) => ({
      date: new Date(date),
      count: contributionCount,
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime())

  let longest = 0
  let streak = 0

  for (let i = 0; i < sorted.length; i++) {
    const { date, count } = sorted[i]
    const prevDate = i > 0 ? sorted[i - 1].date : null

    // Calculate difference in milliseconds, then convert to days
    const diffInMs = prevDate ? date.getTime() - prevDate.getTime() : 0
    const isNextDay = diffInMs === 86400000 || diffInMs === 0 // Check for exactly 24 hours, or same day (e.g. first entry)

    // If the current date is the same as the previous (e.g., multiple entries for one day),
    // or if it's the next day, and there's a contribution, continue/start streak.
    streak = count > 0 && isNextDay
      ? streak + 1
      : (count > 0 ? 1 : 0) // If not next day but has contribution, start new streak. If no contribution, streak breaks.

    longest = Math.max(longest, streak)
  }

  // To compute current streak, we need to consider today and yesterday.
  // Get today's date at midnight UTC for consistent comparison.
  const now = new Date()
  const today = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0))

  let current = 0
  // Filter for days relevant to current streak (today and previous days)
  const relevantDays = sorted.filter(d => d.date.getTime() <= today.getTime())

  if (relevantDays.length > 0) {
    // Check if there was a contribution today
    const lastDay = relevantDays[relevantDays.length - 1]
    if (lastDay.date.getTime() === today.getTime() && lastDay.count > 0) {
      current = 1 // At least today's contribution
      // Iterate backwards from the day before today
      for (let i = relevantDays.length - 2; i >= 0; i--) {
        const prevDay = relevantDays[i]
        const expectedDate = new Date(today.getTime() - (current * 86400000))

        // Check if the previous day is exactly the expected day for the streak
        if (prevDay.date.getTime() === expectedDate.getTime() && prevDay.count > 0) {
          current++
        }
        else {
          // If the day before isn't a part of the continuous streak, break
          break
        }
      }
    }
    else if (lastDay.date.getTime() === (today.getTime() - 86400000) && lastDay.count > 0) {
      // If there was no contribution today but there was yesterday, check yesterday's streak
      current = 1 // Start from yesterday
      for (let i = relevantDays.length - 2; i >= 0; i--) {
        const prevDay = relevantDays[i]
        const expectedDate = new Date(today.getTime() - ((current + 1) * 86400000))
        if (prevDay.date.getTime() === expectedDate.getTime() && prevDay.count > 0) {
          current++
        }
        else {
          break
        }
      }
    }
  }

  return { currentStreak: current, longestStreak: longest }
}
