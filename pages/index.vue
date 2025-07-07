<script setup lang="ts">
const { data: stats } = await useFetch('/api/stats')
</script>

<template>
  <UPageSection
    title="Start exploring"
    description="Explore deep GitHub insights — no login required."
  >
    <pre>{{ stats }}</pre>
  </UPageSection>
</template>
