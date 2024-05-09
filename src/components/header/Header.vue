<template>
    <header :class="$style.header">
        <h1 :class="$style.title">
            <span>Т</span><span>Е</span><span>Т</span><span>Р</span><span>И</span><span>С</span>
        </h1>
    </header>
</template>


<style lang="scss" module>
    .header {
        display: flex;
        justify-content: center;
        gap: 16px;
        min-height: 60px;
    }

    $colors: (
        color1: red,
        color2: orange,
        color3: yellow,
        color4: green,
        color5: blue,
        color6: purple,
    );

    .title {
        text-align: center;
        font-size: 40px;

        @each $key, $color in $colors {
            /* stylelint-disable-next-line scss/no-global-function-names */
            $index: index($colors, ($key $color));
            span:nth-child(#{$index}) {
                color: $color;
            }
        }
    }
</style>
