import { ghStorage } from '~/server/utils/github'

export default defineEventHandler(async () => {
  const dates = (await ghStorage.getKeys()).map(d => d.replace(/\.json$/, ''))
  const keys = new Set(await hubKV().getKeys())

  return await Promise.all(dates.map(async (date) => {
    if (keys.has(date))
      return await hubKV().getItem(date)
    const item = await ghStorage.getItem(date + '.json')
    await hubKV().setItem(date, item)
    return item
  }))
})
