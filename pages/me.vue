<script setup lang="ts">
const data = await useFetch('/api/profile', {
  params: { login: 'alexandre-hallaine' },
})
</script>

<template>
  <UPageSection
    title="Me"
    description="This the your page :D"
  >
    <pre>{{ data }}</pre>
  </UPageSection>
</template>
