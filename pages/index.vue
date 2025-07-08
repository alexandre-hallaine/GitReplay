<script setup lang="ts">
const { data: rawStats } = await useFetch<Record<string, Stats>>('/api/stats')

const stats = {
  languages: normalize(filter(extract(rawStats.value!, 'languages'), 15)),
  events: extract(rawStats.value!, 'events'),
}
</script>

<template>
  <UPageSection
    title="Start exploring"
    description="Explore deep GitHub insights — no login required."
  >
    <UPageCard title="Top Languages Over Time">
      <MultiLine :data="Object.entries(stats.languages).map(([k, v]) => [+k, v])" />
    </UPageCard>
    <UPageCard title="Events Breakdown">
      <MultiLine :data="Object.entries(stats.events).map(([k, v]) => [+k, v])" />
    </UPageCard>
  </UPageSection>
</template>
