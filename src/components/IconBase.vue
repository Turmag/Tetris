<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="width"
        :height="height"
        :viewBox="`0 0 ${viewBoxWidth || width} ${viewBoxHeight || height}`"
        :style="`min-width: ${width}px`"
        role="presentation"
    >
        <g :fill="color">
            <slot />
        </g>
    </svg>
</template>

<script setup lang="ts">
interface Props {
    width?: string | number;
    height?: string | number;
    viewBoxWidth?: string | number;
    viewBoxHeight?: string | number;
    color?: string;
}

withDefaults(defineProps<Props>(), {
    width: 18,
    height: 18,
    viewBoxWidth: 0,
    viewBoxHeight: 0,
    color: 'currentColor',
});
</script>
