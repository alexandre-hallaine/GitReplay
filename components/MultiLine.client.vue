<script setup lang="ts">
import { VisXYContainer, VisLine, VisBulletLegend, VisAxis } from '@unovis/vue'

const { data } = defineProps<{ data: [number, Record<string, number>][] }>()
const keys = computed(() => (data.length ? Object.keys(data[0][1]) : []))

const x = (d: [number, Record<string, number>]) => d[0]
const y = keys.value.map(k => (d: [number, Record<string, number>]) => d[1][k])
</script>

<template>
  <div>
    <VisBulletLegend
      v-if="keys.length > 1"
      :items="keys.map(key => ({ name: key }))"
    />
    <VisXYContainer :data>
      <VisLine
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
