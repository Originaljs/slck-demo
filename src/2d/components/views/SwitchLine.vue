<template>
    <component :is="line ? ProductionLine : ThirdPage"></component>
</template>

<script lang="ts" setup>
import ThirdPage from './ThirdPage.vue';
import ProductionLine from './ProductionLine.vue';
const props = defineProps({
    line: Boolean
})

</script>