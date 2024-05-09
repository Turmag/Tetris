<template>
    <div :class="$style.description">
        <div :class="$style.inner">
            Управление:
            <p>Стрелки вниз, влево, вправо - движение фигуры</p>
            <p>Стрелка вверх - поворот фигуры</p>
            <p>Enter или Escape - пауза / продолжить</p>
        </div>
    </div>
</template>

<style lang="scss" module>
    .description {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }

    .inner {
        text-align: left;

        p {
            margin-block: 4px;
        }
    }
</style>
