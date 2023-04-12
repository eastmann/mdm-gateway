<template>
    <div class="main-page">
        <MainSlider v-on:search-button-click="onSearchButtonClick"/>
        <div class="references">
            <ReferenceBox icon-class="ref-box-api" header="Поиск по компаниям и ИП" v-on:icon-click="goToCompanySearch">
                <p>Вы получаете отображение данных по компаниям по всем источникам, что у нас есть!</p>
            </ReferenceBox>
            <ReferenceBox icon-class="ref-box-website" header="Поиск по адресу" v-on:icon-click="goToAddressSearch">
                <p>Вы можете найти интересующий вас адрес, введя его в
                    <a>Поиск</a></p>
            </ReferenceBox>
            <ReferenceBox icon-class="ref-box-pin" header="Поиск по карте" v-on:icon-click="goToMapSearch">
                <p>Если у вас нет списка адресов, но вы знаете, где расположен нужный
                    вам квартал или район, то вы можете выделить его на карте</p>
            </ReferenceBox>
        </div>
    </div>
</template>

<script>
    import ReferenceBox from "./ReferenceBox";
    import MainSlider from "./MainSlider";
    import paths from '../../js/utils/paths'

    export default {
        components: {
            ReferenceBox,
            MainSlider
        },
        methods: {
            onSearchButtonClick(buttonName) {
                switch (buttonName) {
                    case "address-search":
                        this.goToAddressSearch();
                        break;
                    case "map-search":
                        this.goToMapSearch();
                        break;
                    case "company-search":
                        this.goToCompanySearch();
                        break;
                }
            },
            goToAddressSearch() {
                this.$router.push(paths.addressPage());
            },
            goToMapSearch() {
                this.$router.push(paths.mapPage())
            },
            goToCompanySearch() {
                this.$router.push(paths.businessMap())
            }
        }
    }

</script>

<style>
    .main-page {
        height: 1518px;
    }
    .references {
        position: relative;
        padding-top: 89px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }


</style>
