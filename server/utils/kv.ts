import type { StorageValue } from 'unstorage'

export async function getKVItems(keys: string[]) {
  const results: { key: string, value: StorageValue }[] = []
  const missing: string[] = []

  const current = await Promise.allSettled(
    keys.map(key => hubKV().getItem(key)),
  )

  current.forEach((res, idx) => {
    const key = keys[idx]
    if (res.status === 'fulfilled')
      results.push({ key, value: res.value })
    else
      missing.push(key)
  })

  if (missing.length) {
    const retry = await getKVItems(missing)
    results.push(...retry)
  }

  return results
}

export async function setKVItems(items: { key: string, value: StorageValue }[]) {
  const failed: { key: string, value: StorageValue }[] = []

  const current = await Promise.allSettled(
    items.map(({ key, value }) => hubKV().setItem(key, value)),
  )

  current.forEach((res, idx) => {
    if (res.status !== 'fulfilled')
      failed.push(items[idx])
  })

  if (failed.length)
    await setKVItems(failed)
}
