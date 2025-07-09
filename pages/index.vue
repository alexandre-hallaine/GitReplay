<script setup lang="ts">
const modes = ['yearly', 'monthly']
const mode = useCookie('mode', { default: () => 'yearly' })

const url = computed(() => `/api/stats/${mode.value}`)
const { data: rawStats } = await useFetch<Record<string, Stats>>(url, { watch: [url] })

const stats = {
  languages: computed(() => normalize(filter(extract(rawStats.value!, 'languages'), 6))),
  events: computed(() => filter(extract(rawStats.value!, 'events'), 1)),
}
</script>

<template>
  <UPageSection
    title="Start exploring"
    description="Explore deep GitHub insights — no login required."
  >
    <template #links>
      <USelectMenu
        v-model="mode"
        :items="modes"
      />
    </template>
    <UPageCard title="Top Languages Over Time">
      <XYChart :data="Object.entries(stats.languages.value).map(([k, v]) => [+k, v])" />
    </UPageCard>
    <UPageCard title="Events Breakdown">
      <XYChart :data="Object.entries(stats.events.value).map(([k, v]) => [+k, v])" />
    </UPageCard>
  </UPageSection>
</template>
