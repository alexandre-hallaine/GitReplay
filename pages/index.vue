<script setup lang="ts">
interface Stats {
  events: { [key: string]: number }
  hours: { [key: string]: number }
  languages: { [key: string]: number }
}

const { data: stats } = await useFetch<{ [key: string]: Stats }>('/api/stats')

const data = Object.fromEntries(
  Object.entries(stats.value || {})
    .map(([key, value]) => [
      new Date(key).getTime(),
      value.languages,
    ])
    .filter(([_, value]) => value),
)

const keys = computed(() => {
  if (stats.value == null) return []

  const dates = Object.keys(stats.value)
  const date = dates.sort()[dates.length - 1]
  const { languages } = stats.value[date]

  return Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6).map(([lang]) => lang)
})
</script>

<template>
  <UPageSection
    title="Start exploring"
    description="Explore deep GitHub insights — no login required."
  >
    <UCard>
      <StackedArea
        :keys
        :data
      />
    </UCard>
  </UPageSection>
</template>
