<template>
    <div :class="$style.main">
        <Loader v-if="isLoading" />
        <div v-show="!isLoading" id="root" />
        <Description />
    </div>
</template>

<script setup lang="ts">
import {
    ref, watch, onMounted, 
} from 'vue';
import Game from '@/shared/Game';
import View from '@/shared/View';
import Controller from '@/shared/Controller';
import Loader from '@/components/Loader.vue';
import Description from '@/components/main/Description.vue';
import { mainStore } from '@/store';

const store = mainStore();

const isLoading = ref(true);

watch(
    () => store.isLoadedData,
    () => isLoading.value = false,
);

onMounted(() => {
    const root = document.querySelector<HTMLDivElement>('#root') as HTMLElement;
    const game = new Game();
    const view = new View(root, 640, 640, 22, 12);
    new Controller(game, view);
});
</script>

<style lang="scss" module>
    canvas {
        border: 1px solid black;
    }

    .main {
        width: 100%;
        text-align: center;
    }
</style>
