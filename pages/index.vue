<script setup lang="ts">
import {VisXYContainer, VisLine, VisBulletLegend, VisAxis} from '@unovis/vue'

interface Stats {
  key: string
  events: { [key: string]: number }
  hours: { [key: string]: number }
  languages: { [key: string]: number }
}

const { data: stats } = await useFetch<{ [key: string]: Stats }>('/api/stats')

const languages = computed(() => {
  const dates = Object.keys(stats.value!)
  const date = dates.sort()[dates.length - 1]
  const { languages } = stats.value![date]
  return Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5).map(([lang]) => lang)
})

const data = computed(() => Object.keys(stats.value!).map(key => ({ ...stats.value![key], key })))

const x = (s: Stats) => new Date(s.key).getTime()
const y = languages.value.map(language => s => s.languages?.[language])
</script>

<template>
  <UPageSection
    title="Start exploring"
    description="Explore deep GitHub insights — no login required."
  >
    <VisBulletLegend :items="languages.map(value => ({name: value}))" />
    <VisXYContainer :data>
      <VisLine
        :x
        :y
      />
      <VisAxis
        type="x"
        label="Date"
        :tick-format="(value) => Intl.DateTimeFormat().format(value)"
      />
    </VisXYContainer>
    <pre>{{ data }}</pre>
  </UPageSection>
</template>
