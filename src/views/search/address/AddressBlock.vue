<template>
    <div class="address-block">
        <div class="loading-block" v-if="loadingWidgetShown">
            <p>Загрузка...</p>
        </div>

        <div class="loading-block" v-if="messageWidgetShown">
            <p>{{message}}</p>
        </div>

        <template v-if="orponData != null">
            <div class="ao-block expandable-section" v-if="orponData.ao != null">
                <h1><i class="fa fa-map-marked-alt" />{{orponData.ao.administrativeAddress}}</h1>

                <div class="address-field-block">
                    <DataField caption="Муниципальный адрес" :value="orponData.ao.municipalAddress"/>
                    <DataField caption="Глобальный идентификатор" :value="orponData.ao.globalID"/>
                    <DataField caption="Идентификатор ФИАС" :value="orponData.ao.fias"/>
                    <DataField caption="Кластер НП" :value="orponData.ao.populationClustering"/>
                    <DataField caption="Код КЛАДР" :value="orponData.ao.kladr"/>
                    <DataField caption="Код по ОКАТО" :value="orponData.ao.okato"/>
                    <DataField caption="Код по ОКТМО" :value="orponData.ao.oktmo"/>
                </div>
            </div>

            <div class="house-block" v-if="orponData.house != null">
                <div class="house-data">
                    <div class="house-base-block">
                        <div class="address-description">
                            <h1><i class="fa fa-home" />{{orponData.house.administrativeAddress}}</h1>
                        </div>
                        <div class="icon-block">
                            <div class="icons">
                                <div :class="['action-icon', 'house', {active: houseDataShown}]"
                                     v-on:click="toggleHouseData" title="Данные по адресу"></div>
                                <div :class="['action-icon', 'business', {active: businessDataShown}]"
                                     v-on:click="toggleBusinessData" title="Данные по юридическим лицам"></div>
                                <div :class="['action-icon', 'physical', {active: physicalPersonDataShown}]"
                                     v-on:click="togglePhysicalPersonData" title="Данные по физическим лицам"></div>
                            </div>
                        </div>
                    </div>

                    <transition name="expand">
                        <div v-if="houseDataShown" class="expandable-section">
                            <hr>
                            <h2><i class="header-icon fas fa-map-marker-alt grey" />Данные адреса</h2>

                            <DataField caption="Идентификатор ФИАС" :value="orponData.house.fiasCode"/>

                            <div class="address-field-block">
                                <DataField caption="Муниципальный адрес" :value="orponData.house.municipalAddress"/>
                                <DataField caption="Глобальный идентификатор" :value="orponData.house.globalID"/>
                                <DataField caption="Координаты" :value="coordinatesString(orponData.house.coordinates)"/>
                                <DataField caption="Индекс" :value="orponData.house.postalCode"/>
                                <DataField caption="Тип здания" :value="orponData.house.isResidential"/>
                                <DataField caption="Количество домохозяйств" :value="orponData.house.oktmo"/>
                                <DataField caption="Кадастровый номер" :value="orponData.house.oktmo"/>
                                <DataField caption="Провайдеры в здании" :value="providersString" />
                            </div>

                            <template v-if="estateInfo != null">
                                <h2><i class="header-icon fa fa-building grey" />Данные объекта недвижимости</h2>

                                <div class="address-field-block">
                                    <DataField caption="Частный/не частный сектор" :value="orponData.house.sectorType"/>
                                    <DataField caption="Квартир" :value="estateInfo.flatCount"/>
                                    <DataField caption="Подъездов" :value="estateInfo.porchesCount"/>
                                    <DataField caption="Год постройки" :value="estateInfo.hasOffices"/>
                                    <DataField caption="Площадь" :value="areaString(estateInfo.area)"/>
                                    <DataField caption="Этажность" :value="estateInfo.floorCount"/>
                                    <DataField caption="Кадастровый номер" :hide-on-null="true"
                                               :value="estateInfo.cadastralNumber"/>
                                    <DataField caption="Кадастровая стоимость" :hide-on-null="true"
                                               :value="cadasterPriceString(estateInfo)"/>
                                    <DataField caption="Класс жилья" :value="estateInfo.dwellingType"/>
                                    <DataField caption="Признак новостройки" :value="orponData.house.newBuilding"/>
                                </div>
                            </template>

                            <template v-if="orponData.house.newBuilding && newBuildingInfo != null">
                                <h2><i class="header-icon fa fa-building grey" />Данные новостройки</h2>

                                <div class="address-field-block">
                                    <DataField caption="Тип новостройки" :value="newBuildingInfo.newBuildingType"/>
                                    <DataField caption="Наличие отделки в квартирах"
                                               :value="newBuildingInfo.apartmentDecorating"/>
                                    <DataField caption="Наличие офисов" :value="newBuildingInfo.hasOffices"/>
                                    <DataField caption="Год ввода в эксплуатацию"
                                               :value="newBuildingInfo.deploymentYear"/>
                                    <DataField caption="Наименование" :value="newBuildingInfo.name"/>
                                </div>
                            </template>
                        </div>
                    </transition>

                    <transition name="expand">
                        <div class="business-data expandable-section-big" ref="businessDiv" v-if="businessDataShown">
                            <hr>
                            <h2><i class="header-icon fa fa-briefcase grey" />Данные по юридическим лицам</h2>
                            <h3 class="header-h3">Организации</h3>
                            <div v-if="businessMessage">{{businessMessage}}</div>

                            <div v-for="responseData in companyList" v-bind:key="responseData.inn">
                                <CompanyBlock v-if="responseData != null && isCompany(responseData)" :responseData="responseData"
                                          :house-global-id="houseGlobalId"/>
                            </div>
                            <div v-if="countCompanies === 0 && businessMessage === null">
                                Нет данных по юридическим лицам в здании
                            </div>

                            <h3 class="header-h3">Индивидуальные предприниматели</h3>
                            <div v-for="responseData in entrepreneurList" v-bind:key="responseData.inn">
                                <EntrepreneurBlock v-if="responseData != null && isEntrepreneur(responseData)"  :responseData="responseData"
                                                   :house-global-id="houseGlobalId"/>
                            </div>
                            <div v-if="countEntrepreneurs === 0 && businessMessage === null">
                                Нет данных по индивидуальным предпринимателям в здании
                            </div>
                        </div>
                    </transition>
                    <transition name="expand" >
                        <div class="physical-person-data expandable-section-small" v-if="physicalPersonDataShown">
                            <hr>
                            <h2>Данные по физическим лицам</h2>
                            <p>(Раздел в разработке)</p>
                        </div>
                    </transition>
                </div>

            </div>
        </template>
    </div>
</template>

<script>
    import DataField from '../../../components/datafield/DataField'

    import axios from 'axios';
    import Vue from 'vue';
    import ObjectUtils from "../../../js/utils/object-utils";
    import urls from '../../../js/utils/urls'
    import ExpandBox from "../../../components/layout/ExpandBox";
    import CompanyBlock from "./CompanyBaseInfoBlock";
    import EntrepreneurBlock from "@/views/search/address/EntrepreneurBaseInfoBlock";
    import innUtils from "../../../js/utils/inn-utils"

    let DEFAULT_LOADING_SHOW_DELAY = 300;

    export default {
        name: "AddressBlock",
        props: ["compositeId"],
        components: {
            EntrepreneurBlock,
            CompanyBlock,
            DataField
        },
        watch: {
            compositeId: function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    this.$route.params.compositeId = newVal;
                    this.loadAddress(newVal);
                }
            }
        },
        mounted() {
            if (this.compositeId != null) {
                this.loadAddress(this.compositeId);
            }
        },
        updated() {

        },
        data() {
            return {
                address: null,
                houseDataShown: false,
                physicalPersonDataShown: false,
                businessDataShown: true,
                addressDescription: null,
                addressNotFoundShown: false,
                loadingWidgetShown: true,
                loadingTimer: null,
                messageWidgetShown: true,
                message: '',
                companiesLoaded: false,
                responseDataList: null,
                businessMessage: null
            }
        },
        computed: {
            house() {
                if(this.orponData != null) {
                    return this.orponData.house;
                }
                return null;
            },
            ao() {
                if(this.orponData != null) {
                    return this.orponData.ao;
                }
                return null;
            },
            orponData() {
                if(this.address != null) {
                    return this.address.orponData;
                }
                return null;
            },
            twoGisData() {
                if(this.address != null) {
                    return this.address.twoGisData;
                }
                return null;
            },
            houseGlobalId() {
                if (this.house != null) {
                    return this.house.globalID;
                } else {
                    return null;
                }
            },
            newBuildingInfo() {
                if (this.orponData != null && this.orponData.house != null) {
                    return this.orponData.house.newBuildingInfo;
                }
                return null;
            },
            estateInfo() {
                if (this.orponData != null && this.orponData.house != null && this.orponData.house.estateInfo != null) {
                    return this.orponData.house.estateInfo;
                }
                return null;
            },
            companyList() {
                if(this.responseDataList != null) {
                    return this.responseDataList.filter(r => this.isCompany(r));
                }

                return [];
            },
            entrepreneurList() {
                if(this.responseDataList != null) {
                    return this.responseDataList.filter(r => this.isEntrepreneur(r));
                }

                return [];
            },
            countCompanies() {
                return this.companyList.length;
            },
            countEntrepreneurs() {
                return this.entrepreneurList.length;
            },
            providersString() {
                if(this.twoGisData == null) {
                    return null;
                } else {
                    let providers = new Set();

                    this.twoGisData.filter(el => el.providers != null && Array.isArray(el.providers))
                        .forEach(el => {
                            el.providers.forEach(p => providers.add(p));
                        });

                    return Array.from(providers).join(" | ");
                }
            }
        },
        methods: {
            toggleHouseData() {
                this.houseDataShown = !this.houseDataShown;
            },
            togglePhysicalPersonData() {
                this.physicalPersonDataShown = !this.physicalPersonDataShown;
            },
            toggleBusinessData() {
                this.businessDataShown = !this.businessDataShown;

                if (!this.companiesLoaded) {
                    this.loadCompanies();
                }

            },

            loadCompanies(globalID) {
                if (globalID == null) {
                    if (this.orponData != null && this.orponData.house != null && this.orponData.house.globalID != null) {
                        globalID = this.orponData.house.globalID;
                    } else {
                        return;
                    }
                }

                let url = urls.sparkBusinessInfoByOrponIdUrl(globalID);

                this.businessMessage = "Загрузка данных...";

                let component = this;
                axios.get(url)
                    .then(function (response) {
                        component.responseDataList = response.data;
                        component.companiesLoaded = true;
                        component.businessMessage = null;
                    })
                    .catch(function (e) {
                        component.businessMessage = "Не удалось загрузить информацию по компаниям и ИП";
                    });

            },

            cadasterPriceString(estateInfo) {
                if (estateInfo != null && estateInfo.cadastralPrice != null) {
                    return estateInfo.cadastralPrice.toLocaleString('ru-RU') + " р. "
                }

                return null;
            },

            areaString(estateInfo) {
                if (estateInfo != null && estateInfo.area != null) {
                    return estateInfo.area + " кв. м."
                }
                return null;
            },
            coordinatesString(coordinates) {
                if (coordinates == null || coordinates.latitude == null || coordinates.longitude == null) {
                    return null;
                }
                return `${coordinates.latitude}, ${coordinates.longitude}`;
            },
            showAddress(address) {
                this.clearView();
                this.address = address;

                if (address.orponData != null && address.orponData.house != null) {
                    this.loadCompanies(address.orponData.house.globalID);
                }

            },
            loadAddress(compositeId) {
                let component = this;

                let url = urls.orponAddressDataUrl(compositeId);

                this.showLoading();

                axios.get(url)
                    .then(function (response) {
                        let address = response.data;

                        if (address != null && (address.orponData != null || address.twoGisData != null)) {
                            component.showAddress(address);
                        } else {
                            component.showNotFound(text);
                        }

                    }).catch(function (error) {
                    if (!ObjectUtils.isEmptyObject(error)) {
                        component.showError("Сервис ОР ПОН недоступен");
                    }
                }).finally(function () {
                    component.loadingFinished();
                });
            },


            showLoading() {
                let component = this;

                this.loadingTimer = setTimeout(function () {
                    component.address = null;
                    component.messageWidgetShown = false;
                    component.loadingWidgetShown = true;
                }, DEFAULT_LOADING_SHOW_DELAY);
            },
            loadingFinished() {
                clearTimeout(this.loadingTimer);
                this.loadingWidgetShown = false;
            },
            hideLoading() {
                this.loadingWidgetShown = false;
            },
            showNotFound(text) {
                this.showMessage(`Адрес ${text} не найден`);
            },
            showError(errorMessage) {
                this.showMessage(errorMessage);
            },
            showMessage(message) {
                this.message = message;
                this.address = null;
                this.messageWidgetShown = true;
            },
            clearView() {
                this.loadingWidgetShown = false;
                this.houseDataShown = true;
                this.physicalPersonDataShown = false;
                this.businessDataShown = true;
                this.messageWidgetShown = false;
            },

            isCompany(responseData) {
                return innUtils.isCompanyInn(responseData.inn);
            },

            isEntrepreneur(responseData) {
                return innUtils.isEntrepreneurInn(responseData.inn);
            }
        }
    }
</script>

<style lang="less">
    @import "../../../css/colors";
    @import "../../../css/style";

    .address-block {
        .base-info-block;
    }

    .ao-block, .address-description {
        i {
            margin-right: 10px;
        }

    }

    .icon-block {
        text-align: right;
        align-self: center;
    }

    .house-base-block {
        display: grid;
        grid-template-columns: 80% 20%;
    }

    .action-icon {
        height: 35px;
        width: 35px;
        vertical-align: middle;

        background: #FFFFFF no-repeat;
        background-size: contain;
        display: inline-block;
        margin: 0 5px;
        cursor: pointer;

        &.house {
            background-image: url("../../../assets/img/icons/house_inactive.png");

            &:hover, &.active {
                background-image: url("../../../assets/img/icons/house.png");
            }
        }

        &.physical {
            background-image: url("../../../assets/img/icons/physical_inactive.png");

            &:hover, &.active {
                background-image: url("../../../assets/img/icons/physical.png");
            }
        }

        &.business {
            background-image: url("../../../assets/img/icons/business_inactive.png");

            &:hover, &.active {
                background-image: url("../../../assets/img/icons/business.png");
            }
        }
    }

    .address-header {
        font-size: 20px;
        color: @baseViolet;
        line-height: 35px;
    }

    .address-field {
        display: grid;
        grid-template-columns: 50% 50%;

        .field-header {
            color: @baseViolet;
            text-decoration: underline;
        }
    }

    .address-full-data {
        grid-column-start: 1;
        grid-column-end: 3;

    }

    .address-field-block {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    .expandable-section {
        overflow: hidden;
        max-height: 500px;
    }

    .expandable-section-small {
        overflow: hidden;
        max-height: 300px;
    }

    .expandable-section-big {
        overflow: hidden;
    }

    .header-h3 {
        color: @baseViolet;
    }

</style>