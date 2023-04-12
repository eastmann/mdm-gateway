<template>
    <div>
        <h1>Поиск по карте</h1>
        <SearchBox v-on:address-found="onAddressFound" v-on:address-not-found="onAddressNotFound"/>
        <div class="second-line">
            <form class="map-filters">
                <label class="form-caption">Показывать:</label>
                <div class="map-option">
                    <input class="rtk-radio" id="buildings" name="object-type" type="radio" checked value="Здания" v-on:click="changeType(TYPE_BUILDINGS)">
                    <label class="rtk-radio-label" for="buildings">Здания</label>
                </div>
                <div class="map-option">
                    <input class="rtk-radio" id="physical" name="object-type" type="radio" value="Физ. лица" disabled>
                    <label class="rtk-radio-label" for="physical">Физ. лица</label>
                </div>
                <div class="map-option">
                    <input class="rtk-radio" id="business" name="object-type" type="radio" value="Юр. лица" v-on:click="changeType(TYPE_BUSINESS)">
                    <label class="rtk-radio-label" for="business">Юр. лица</label>
                </div>
            </form>
            <div id="map-error">
                {{mapError}}
            </div>
            <div class="zoom-caption">
                <i class="fa fa-search-plus search-icon"  v-if="zoomComment"></i>
                <label class="form-caption">{{zoomComment}}</label>
            </div>
        </div>
        <hr class="no-top-margin">
        <div id="map">

        </div>
    </div>
</template>

<script>
    import SearchBox from "../../../components/inputs/search_box/AddressSearchBox";
    import ymaps from 'ymaps';
    import axios from 'axios';
    import urls from '../../../js/utils/urls'
    import mapPosition from '../../../js/current-pos'
    import LayoutCreator from './js/balloon-layout-creator'
    import $ from 'jquery';

    let YANDEX_KEY = '20c68204-318a-4efc-a5a8-2ea2faad5df0';
    let YANDEX_URL = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey='+YANDEX_KEY;

    let YANDEX_MIN_ZOOM = 7;
    let YANDEX_MIN_ZOOM_FOR_DETAIL = 13;
    let YANDEX_MAX_ZOOM = 19;
    let YANDEX_ZOOM_16 = 16;

    let MAP_ERROR_APPEAR_TIME = 200;
    let MAP_ERROR_SHOW_TIME = 5000;
    let MAP_ERROR_DISAPPEAR_TIME = 400;

    var BALLOON_LAYOUT;
    var CLUSTER_BALLOON_LAYOUT;

    export default {
        name: "SeachMap",
        components: {
            SearchBox
        },
        data() {
            return {
                map: null,
                mapObjectManager: null,
                mapError: null,
                mapErrorTimerId: null,
                zoomComment: "",
                TYPE_BUILDINGS: 0,
                TYPE_BUSINESS: 1
            }
        },
        mounted() {
            let vueComp = this;

            ymaps
                .load(YANDEX_URL)
                .then(maps => {
                    const myMap = new maps.Map('map', {
                        center: mapPosition.currentCoordinates,
                        zoom: mapPosition.currentZoom,
                        controls: ["zoomControl"]
                    }, {
                        minZoom: YANDEX_MIN_ZOOM,
                        maxZoom: YANDEX_MAX_ZOOM
                    });
                    this.map = myMap;

                    BALLOON_LAYOUT = LayoutCreator.createBalloonLayout(vueComp, maps);
                    CLUSTER_BALLOON_LAYOUT = LayoutCreator.createClusterBalloonLayout(vueComp, maps);

                    var objectMan = new maps.RemoteObjectManager(urls.getCoordinatesByBbox(this.TYPE_BUILDINGS), {
                        splitRequests: false,
                        gridSize: 64,
                       // clusterIconLayout:"default#pieChart"
                    });
                    vueComp.mapObjectManager = objectMan;

                    // Подписываемся на событие клика по объекту.
                    objectMan.objects.events.add(['click'], onObjectClick);
                    objectMan.clusters.events.add(['click'], onObjectClick);

                    myMap.events.add('boundschange', function(e){
                        if (e.get('newZoom') !== e.get('oldZoom')) {
                            vueComp.setZoomComment(myMap.getZoom());
                        }
                    });

                    objectMan.objects.options.set({
                        'balloonContentLayout': BALLOON_LAYOUT
                    });
                    objectMan.clusters.options.set({
                        'balloonContentLayout': CLUSTER_BALLOON_LAYOUT
                    });

                    myMap.geoObjects.add(objectMan);

                    function onObjectClick (e) {
                        rememberMapPosition();
                        // objectId – идентификатор объекта, на котором произошло событие.
                        let objectId = e.get('objectId');

                        vueComp.showObjectBalloonById(objectId);
                    }
                    function rememberMapPosition() {
                        mapPosition.currentCoordinates = myMap.getCenter();
                        mapPosition.currentZoom = myMap.getZoom();
                    }

                })
                //.catch(error => console.log('Failed to load Yandex Maps', error));
        },
        methods: {
            changeType(newType){
                this.mapObjectManager.setUrlTemplate(urls.getCoordinatesByBbox(newType));
                this.mapObjectManager.reloadData();
            },

            loadCoordinatesBySuggestion(suggestion) {
                let url = urls.coordinatesByCompositeId(suggestion.data.compositeId);
                let address = suggestion.value;

                let component = this;
                axios.get(url)
                    .then(function (response) {
                        let data = response.data;

                        if(data != null && data.features != null
                            && data.features.length != null && data.features.length > 0
                            && data.features[0].geometry != null && data.features[0].geometry.coordinates != null) {

                            let foundCoords = data.features[0];

                            component.mapObjectManager.objects.add(data);
                            component.map.setCenter(foundCoords.geometry.coordinates, YANDEX_ZOOM_16)
                                .then(result => {
                                    component.showObjectBalloonById(foundCoords.id);
                                });
                        } else {
                            component.showMapError(component.coordinatesNotFoundMessage(address));
                        }
                    })
                    .catch(function (e) {
                        component.showMapError(component.coordinatesLoadingErrorMessage(address));
                    });
            },
            onAddressFound(suggestion) {
                if(suggestion.data != null && suggestion.data.house === true) {
                    this.loadCoordinatesBySuggestion(suggestion);
                }
            },
            onAddressNotFound(suggestion) {

            },
            mapZoom(myMap, cluster){
                myMap.setCenter(cluster.geometry.coordinates);
                myMap.setZoom(myMap.getZoom() + 1);
            },
            setZoomComment(zoom){
                if (zoom < YANDEX_MIN_ZOOM_FOR_DETAIL) {
                    this.zoomComment = "Увеличьте масштаб, чтобы увидеть объекты...";
                } else {
                    this.zoomComment = "";
                }
            },
            showObjectBalloonById(objectId) {

                let objectMan = this.mapObjectManager;
                let myMap = this.map;

                var cluster = objectMan.clusters.getById(objectId);

                if(cluster != null) {
                    if(myMap.getZoom() >= YANDEX_MAX_ZOOM) {
                        this.loadAddressClusterData(objectId, cluster);
                    } else {
                        this.mapZoom(myMap, cluster);
                    }
                } else {
                    let mapObj = objectMan.objects.getById(objectId);

                    if (this.hasBalloonData(objectId)) {
                        objectMan.objects.balloon.open(objectId);
                    } else if(mapObj != null) {
                        //mapObj.properties.balloonContent = "Идет загрузка данных...";
                        this.mapObjectManager.objects.balloon.open(objectId);
                    }
                }
            },

            loadAddressClusterData(clusterId, cluster) {
                let pointX = cluster.geometry.coordinates[1];
                let pointY = cluster.geometry.coordinates[0];
                let url = urls.orponAddressDataByCoordinateUrl(pointX, pointY);
                let component = this;
                axios.get(url)
                    .then(function(response) {
                        var addresses = [];
                        response.data.features.forEach(function(data) {
                            let addressObj = {
                                globalID: data.properties.globalID,
                                addressStr: data.properties.addressStr
                            };
                            addresses.push(addressObj);
                        });

                        cluster.properties.addresses = addresses;
                        component.mapObjectManager.clusters.balloon.setData(cluster);

                    }).catch(function(e) {

                    });
            },

            hasBalloonData (objectId) {
                return this.mapObjectManager.objects.getById(objectId).properties.balloonContent;
            },

            coordinatesNotFoundMessage(address) {
                return "Не найдены координаты для адреса "+address;
            },

            coordinatesLoadingErrorMessage(address) {
                return "Не удалось загрузить координаты для адреса "+address;
            },

            showMapError(error) {
                this.mapError = error;

                this.clearMapErrorAnimationIfNeeded();

                let component = this;

                $('#map-error').animate({
                    opacity:1
                }, MAP_ERROR_APPEAR_TIME, function() {
                    component.mapErrorTimerId = setTimeout(function() {
                        $('#map-error').animate({
                            opacity:0
                        }, MAP_ERROR_DISAPPEAR_TIME)
                    }, MAP_ERROR_SHOW_TIME)
                });

            },

            clearMapErrorAnimationIfNeeded() {
                if(this.mapErrorTimerId != null) {
                    clearTimeout(this.mapErrorTimerId);
                }
            }
        }
    }
</script>

<style lang="less">
    @import '../../../css/colors';
    @import "css/balloon-layouts";

    #map {
        margin-top: 25px;
        width: 100%;
        height: 600px;
    }

    .form-caption {
        font-weight: bold;
        margin-right: 20px;
        color: @baseViolet;
    }

    .search-icon {
        margin-right: 5px;
        color: @baseViolet;
    }

    .map-filters {
        margin-top: 15px;
    }

    .map-option {
        display: inline-block;
    }

    .zoom-caption {
        display: inline-block;
        margin-top: 15px;
        margin-right: auto;
    }

    .rtk-radio {
        outline: none;
        margin-top: -4px;
        vertical-align: middle;

        &:checked {
            background-color: red;
        }

    }
    .rtk-radio-label {
        color: @baseViolet;
        margin-right: 20px;
        padding-left: 4px;
    }

    .second-line {
        display: grid;
        grid-template-columns: 1fr auto auto;
    }

    #map-error {
        margin-top: 18px;
        text-align: right;
        color: @errorRed;
        opacity: 0;
        font-size: 12px;
    }

</style>