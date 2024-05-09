<template>
    <footer :class="$style.footer">
        <div :class="$style.iconWrapper" @click="toggleSound">
            <IconBase
                :class="$style.icon"
                width="20"
                height="20"
                viewBoxWidth="32"
                viewBoxHeight="32"
                style="min-width: 15px;"
            >
                <Sound v-if="store.isSoundOn" />
                <SoundOff v-else />
            </IconBase>
        </div>
    </footer>
</template>

<script setup lang="ts">
import IconBase from '@/components/IconBase.vue';
import Sound from '@/assets/icons/Sound.vue';
import SoundOff from '@/assets/icons/SoundOff.vue';
import { onMounted } from 'vue';
import { mainStore } from '@/store';

const store = mainStore();
const audio = new Audio(new URL('@/assets/music/Arcadia - Tetris.mp3', import.meta.url).href);

const toggleSound = () => {
    store.isSoundOn = !store.isSoundOn;
    if(store.isSoundOn) audio.play();
    else audio.pause();
};

onMounted(() => {
    audio.volume = 0.5;
    audio.loop = true;
});
</script>

<style lang="scss" module>
    .footer {
        position: absolute;
        bottom: 0;
        left: 0;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 100%;
        height: 50px;
        padding-right: 10px;
    }

    .iconWrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        margin-right: 10px;
        margin-bottom: 20px;
        border-radius: 20px;
        border: 2px solid #999;
        transition: 0.3s ease;
        cursor: pointer;
        user-select: none;
    }

    .icon {
        color: #999;
    }
</style>
