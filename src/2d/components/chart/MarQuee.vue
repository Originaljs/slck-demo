<template>
    <div class="marquee_wrapper">
        <div>
            <slot name="thead"></slot>
        </div>
        <div class="scroll_table" ref="scroll">
            <slot name="tbody"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { MarQuee } from '@/2d/unitls/marquee'
import { ref, onUpdated,onMounted } from 'vue'
const scroll = ref(null)
const lamp :any = ref(null)
onMounted(()=>{
    lamp.value =  new MarQuee(scroll.value as any, 50)
})
onUpdated(() => {
    lamp.value.Refresh()
})
</script>

<style scoped lang="less">
.marquee_wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.scroll_table {
    
    width: 100%;
    flex: 1;
    position: relative;
    overflow: hidden;
}

.scroll_table .table_wrapper {
    width: 100%;
    position: absolute;
    margin: 0;
    top: 0;
}

.scroll_table::-webkit-scrollbar {
    display: none;
}
</style>