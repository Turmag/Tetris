<template>
    <div id="loader-wrapper" class="loader-wrapper">
        <div class="loader">
            <div class="dot-container">
                <div class="dot" />
                <div class="dot" />
                <div class="dot" />  
            </div>
            <div class="dot-container">
                <div class="dot" />
                <div class="dot" />
                <div class="dot" />  
            </div>
            <div class="dot-container">
                <div class="dot" />
                <div class="dot" />
                <div class="dot" />  
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .loader-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 646px;
    }

    .loader,
    .dot-container {
        position: relative;
        width: 100px;
        height: 100px;
    }

    .loader {
        transform-origin: center;
        animation: anirotate 10s linear infinite;
    }

    .dot-container {
        position: absolute;
        border-radius: 50px;
        border: 0 solid #fff;

        &:nth-child(2) {
            transform: rotate(40deg);

            .dot {
                animation-delay: -0.5s;
            }
        }

        &:nth-child(3) {
            transform: rotate(80deg);

            .dot {
                animation-delay: -1s;
            }
        }
    }

    .dot {
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background: #fff;
        transform: translate(0, 0);

        &:nth-child(1) {
            top: 0;
            left: calc(50% - 5px);
            animation: ani1 2s infinite;
        }

        &:nth-child(2) {
            bottom: calc(28% - 5px);
            left: calc(11% - 5px);
            animation: ani2 2s infinite;
        }

        &:nth-child(3) {
            right: calc(11% - 5px);
            bottom: calc(28% - 5px);
            animation: ani3 2s infinite;
        }
    }

    [hidden] {
        display: none;
    }

    @keyframes anirotate {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(-359deg);
        }
    }

    @keyframes ani1 {
        0% {
            transform: translate(0, 0);
        }

        100% {
            transform: translate(-40px, 67px);
        }
    }

    @keyframes ani2 {
        0% {
            transform: translate(0, 0);
        }

        100% {
            transform: translate(77px, 0);
        }
    }

    @keyframes ani3 {
        0% {
            transform: translate(0, 0);
        }

        100% {
            transform: translate(-39px, -67px);
        }
    }

</style>
