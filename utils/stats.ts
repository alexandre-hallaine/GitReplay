export interface Stats {
  [key: string]: Record<string, number> | undefined
}

export function extract(raw: Record<string, Stats>, key: string) {
  const result: Record<number, Record<string, number>> = {}

  for (const [date, stats] of Object.entries(raw)) {
    const data = stats[key]
    if (data && Object.keys(data).length > 0)
      result[new Date(date).getTime()] = data
  }

  return result
}

export function filter(series: Record<number, Record<string, number>>, limit = 6) {
  const latest = Math.max(...Object.keys(series).map(Number))
  const topKeys = Object.entries(series[latest] || {})
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([k]) => k)

  const filtered: Record<number, Record<string, number>> = {}
  for (const [ts, data] of Object.entries(series)) {
    const entry: Record<string, number> = {}
    for (const k of topKeys)
      entry[k] = data[k] || 0
    filtered[+ts] = entry
  }

  return filtered
}

export function normalize(series: Record<number, Record<string, number>>) {
  const normalized: Record<number, Record<string, number>> = {}

  for (const [ts, data] of Object.entries(series)) {
    const sum = Object.values(data).reduce((a, v) => a + v, 0)
    normalized[+ts] = Object.fromEntries(Object.entries(data).map(([k, v]) => [k, v / sum]))
  }

  return normalized
}
