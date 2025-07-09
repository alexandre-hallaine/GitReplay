<script setup lang="ts">
const { data: rawStats } = await useFetch<Record<string, Stats>>('/api/stats/year')

const stats = {
  languages: normalize(filter(extract(rawStats.value!, 'languages'), 6)),
  events: filter(extract(rawStats.value!, 'events'), 1),
}
</script>

<template>
  <UPageSection
    title="Start exploring"
    description="Explore deep GitHub insights — no login required."
  >
    <UPageCard title="Top Languages Over Time">
      <XYChart :data="Object.entries(stats.languages).map(([k, v]) => [+k, v])" />
    </UPageCard>
    <UPageCard title="Events Breakdown">
      <XYChart :data="Object.entries(stats.events).map(([k, v]) => [+k, v])" />
    </UPageCard>
  </UPageSection>
</template>
