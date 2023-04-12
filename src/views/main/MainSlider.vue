<template>
    <div class="slider">
        <div :class="['slider-arrow', 'left-arrow', {active : hasSlidesToTheLeft}]" id="left-arrow" v-on:click="goToLeftSlide"></div>
        <div class="slides">
            <transition :name="animationName">
                <div v-if="slideShown === 'address-search'" class="slide slide-address-search" key="address-search">
                    <div>
                        <h1 class="slide-header">Поиск по адресу</h1>
                        <div class="slide-text">
                            <p>Вы можете найти интересующий вас адрес, введя его в <a class="slide1-ref">Поиск</a> или отправив
                                нам файл с адресами</p>
                            <p>До 100 адресов обработаем бесплатно!</p>
                        </div>
                        <div class="rtk-button slide-button" v-on:click="onAddressSearchClick()">Искать</div>
                    </div>
                </div>
                <div v-if="slideShown === 'map-search'" class="slide slide-map-search" key="map-search">
                    <h1 class="slide-header">Поиск по карте</h1>
                    <div class="slide-text">
                        <p>Если у вас нет списка адресов, но вы знаете, где расположен нужный вам
                        квартал или район, то вы можете выделить его на карте, и мы пришлем вам
                        список адресов из этого района с описанием</p>
                    </div>
                    <div class="rtk-button slide-button" v-on:click="onMapSearchClick()">Искать</div>
                </div>
                <div v-if="slideShown === 'business-search'" class="slide slide-business-search" key="business-search">
                    <h1 class="slide-header">Поиск компаний и ИП</h1>
                    <div class="slide-text">
                        <p>Вы можете найти информацию по компаниям и ИП, введя известные данные (ИНН, название)
                            в строку поиска</p>
                    </div>
                    <div class="rtk-button slide-button" v-on:click="onCompanySearchClick()">Искать</div>
                </div>
            </transition>
        </div>
        <div :class="['slider-arrow', 'right-arrow', {active : hasSlidesToTheRight}]" id="right-arrow" v-on:click="goToRightSlide"></div>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default {
        name: "Slider",
        data() {
            return {
                slides: ['business-search', 'address-search', 'map-search'],
                currentSlideIndex: 0,
                animationName: 'slide-right'
            }
        },
        computed: {
            slideShown() {
                return this.slides[this.currentSlideIndex]
            },
            hasSlidesToTheLeft() {
                return this.currentSlideIndex > 0;
            },
            hasSlidesToTheRight() {
                let maxIndex = this.slides.length - 1;
                return this.currentSlideIndex < maxIndex;
            }
        },
        methods: {
            onAddressSearchClick() {
                this.$emit('search-button-click', "address-search");
            },
            onMapSearchClick() {
                this.$emit('search-button-click', "map-search");
            },
            onCompanySearchClick() {
                this.$emit('search-button-click', "company-search");
            },
            goToLeftSlide() {
                this.animationName = 'slide-left';

                let component = this;
                Vue.nextTick(function () {
                    if(component.currentSlideIndex > 0) {
                        component.currentSlideIndex --;
                    }
                });
            },
            goToRightSlide() {
                this.animationName = 'slide-right';

                let component = this;
                Vue.nextTick(function () {
                    let maxIndex = component.slides.length - 1;
                    if(component.currentSlideIndex < maxIndex) {
                        component.currentSlideIndex ++;
                    }
                });
            }
        }
    }
</script>

<style lang="less">
    @import "../../css/colors";

    .slider {
        position: relative;
        height: 681px;
        margin-top: 55px;
        width: 1395px;
    }
    .slider p {

    }
    .slide-header {
        height: 34px;
        color: @baseViolet;
        font-size: 40px;
        font-weight: 700;
        text-transform: uppercase;
        padding-top: 118px;
        margin: 0;
    }
    .slide-text {
        margin-top: 55px;
        width: 600px;
    }

    .slide-text p {
        margin-top: 20px;
    }

    .slides {
        overflow: hidden;
        position: relative;
        height: 100%;
    }

    .slide {
        height: 681px;
        position: absolute;
        width: 100%;
        background-size: contain;
    }
    .slide-address-search {
        background: url("../../assets/img/main_slider/background_computers.png") right top no-repeat;
    }
    .slide-map-search {
        background: url("../../assets/img/main_slider/background_computers.png") right top no-repeat;
        background-position-y: 50px;
    }
    .slide-business-search {
        background: url("../../assets/img/main_slider/background_computers.png") right top no-repeat;
    }

    .slide-text {
        color: #273a64;
        font-size: 20px;
        font-weight: 700;
    }
    .slide-button {
        margin-top: 103px;
    }

    .slider-arrow {
        width: 30px;
        height: 50px;
        position: absolute;
        top: calc(50% - 25px);

        opacity: 0.5;

        &.active {
            cursor: pointer;
            opacity: 1 !important;
        }
    }
    .left-arrow {
        background: url("../../assets/img/arrow-left.png") no-repeat;
        left: -235px;
    }

    .right-arrow {
        background: url("../../assets/img/arrow-right.png") no-repeat;
        right: -30px;
    }

    .slide-left-leave-active,
    .slide-left-enter-active {
        transition: 0.7s;
    }
    .slide-left-enter {
        transform: translate(-100%, 0);
    }
    .slide-left-leave-to {
        transform: translate(100%, 0);
    }

    .slide-right-leave-active,
    .slide-right-enter-active {
        transition: 0.7s;
    }
    .slide-right-enter {
        transform: translate(100%, 0);
    }
    .slide-right-leave-to {
        transform: translate(-100%, 0);
    }

</style>