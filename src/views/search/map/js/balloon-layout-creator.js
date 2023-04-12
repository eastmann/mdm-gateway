import * as $ from 'jquery'
import paths from '../../../../js/utils/paths'

/**
 * Функция-построитель макетов для всплывающих "балунов" при клике на объект  на карте
 * @constructor
 */
function BalloonLayoutCreator() {

    /**
     * Макет всплывающего балуна для одиночного адреса
     * @see https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/templateLayoutFactory-docpage/
     */
    this.createBalloonLayout = function(vueComponent, ymaps) {
        var balloonLayout = ymaps.templateLayoutFactory.createClass(
            `<div class="address-balloon">
                <div class="balloon-header">{{properties.addressStr}}</div>
                <div class="balloon-content">
                    <div class="balloon-field">
                        <div class="balloon-caption">Глобальный идентификатор:</div>
                        <div class="balloon-value">{{properties.globalID}}</div>
                    </div>
                    <a class="balloon-href" id="balloon-href">Перейти к адресу</a>
                </div>
            </div>` ,
            {
                /*
                 * В функции build сначала вызываем родительский метод, затем вызываем дополнительные хэндлеры
                 */
                build: function () {
                    balloonLayout.superclass.build.call(this);

                    let properties = this.getData().object.properties;

                    let hrefHandler = function() {
                        let path = paths.addressByCompositeId(properties.globalID, properties.addressStr);
                        vueComponent.$router.push(path);
                    };

                    $('#balloon-href').click(hrefHandler);
                },

                /*
                 * В функции clear сначала удаляем хэндлеры, затем вызываем родительский метод
                 */
                clear: function () {
                    $('#balloon-href').unbind('click');

                    balloonLayout.superclass.clear.call(this);
                }

            }
        );
        return balloonLayout;
    };

    /**
     * Макет всплывающего балуна для кластера адресов
     * @see https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/templateLayoutFactory-docpage/
     */
    this.createClusterBalloonLayout = function(vueComponent, ymaps) {
        var balloonLayout = ymaps.templateLayoutFactory.createClass(
            `<div class="address-cluster-balloon">
                <div class="balloon-header">Этим координатам соответствуют записи:</div>
                <ul>
                {% for address in properties.addresses %}
                    <li>
                        <a class="balloon-href" id="balloon-href-{{address.globalID}}">{{address.addressStr}}</a>
                    </li>
                {% endfor %}
                </ul>
            </div>` ,
            {
                // Переопределяем функцию build, чтобы при создании макета начинать
                // слушать событие click на кнопке-счетчике.
                build: function () {
                    // Сначала вызываем метод build родительского класса.
                    balloonLayout.superclass.build.call(this);

                    let addressData = this.getAddressData();
                    addressData.forEach(this.setHrefClickHandler);
                },

                setHrefClickHandler(address) {
                    if(address != null && address.globalID != null) {
                        var hrefId = clusterHrefId(address.globalID);
                        var hrefHandler = function() {
                            let path = paths.addressByCompositeId(address.globalID, address.addressStr);
                            vueComponent.$router.push(path);
                        };
                        $(hrefId).click(hrefHandler);
                    }
                },

                removeHrefClickHandler(address) {
                    if(address != null && address.globalID != null) {
                        var hrefId = clusterHrefId(address.globalID);
                        $(hrefId).unbind('click')
                    }
                },

                clear: function () {
                    let addressData = this.getAddressData();
                    addressData.forEach(this.removeHrefClickHandler);

                    balloonLayout.superclass.clear.call(this);
                },

                getAddressData() {
                    if(this.getData() != null && this.getData().object != null && this.getData().object.properties != null
                        && this.getData().object.properties.addresses != null) {

                        return this.getData().object.properties.addresses;
                    }
                    return [];
                }
            }


        );

        return balloonLayout;
    };

    /**
     * Функция, создающая id элемента ссылки в балуне кластера по gid адреса
     */
    function clusterHrefId(gid) {
        return '#balloon-href-'+gid;
    }


}



export default new BalloonLayoutCreator();