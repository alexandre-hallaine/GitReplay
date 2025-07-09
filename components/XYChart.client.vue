<script setup lang="ts">
import { VisXYContainer, VisLine, VisArea, VisBulletLegend, VisAxis } from '@unovis/vue'

const { data, showArea } = defineProps<{
  data: [number, Record<string, number>][]
  showArea?: boolean
}>()

const keys = computed(() => data.length ? Object.keys(data[0][1]) : [])
const x = (d: [number, Record<string, number>]) => d[0]
const y = keys.value.map(k => (d: [number, Record<string, number>]) => d[1][k])
</script>

<template>
  <div>
    <VisBulletLegend
      v-if="keys.length > 1"
      :items="keys.map((key) => ({ name: key }))"
    />
    <VisXYContainer :data>
      <component
        :is="showArea ? VisArea : VisLine"
        :x
        :y
      />
      <VisAxis
        type="x"
        :tick-format="(value: number) => Intl.DateTimeFormat().format(value)"
      />
    </VisXYContainer>
  </div>
</template>
