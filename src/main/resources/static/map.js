var map = null;
var currentPlacemark = null;
var ggsData = [];
var gnsData = [];
var radiusInput = null;
var ggsCheckbox = null;
var gnsCheckbox = null;
var trackCreationMode = false;

ymaps.ready(init);

function init() {
    window.map = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 10,
        controls: ['smallMapDefaultSet']
    });
    map.cursors.push('arrow', 'grab');

    // Считываем значения из полей для радиуса, ггс и гнс
    radiusInput = document.getElementById('radiusInput');
    ggsCheckbox = document.getElementById('ggsCheckbox');
    gnsCheckbox = document.getElementById('gnsCheckbox');

//Слушатель кликов на карте. Ставит на место клика метку, если не активен режим маршрута
    map.events.add('click', function (e) {
        var coords = e.get('coords');
        if (trackCreationMode) {
            addPointToTrack(coords);
        } else {
            if (currentPlacemark) {
                map.geoObjects.remove(currentPlacemark);
            }
            var placemark = new ymaps.Placemark(coords, {}, {
                preset: 'islands#dotIcon',
                draggable: true
            });
            map.geoObjects.add(placemark);
            currentPlacemark = placemark;
        }
    });
}

//функция добавления меток на карту с пунктами, полученными из geopoints
window.addPointsToMap = function (ggsData, gnsData) {
    map.geoObjects.removeAll();

    // Отрисовка пунктов ГГС
    if (ggsData) {
        ggsData.forEach(point => {
            const description = `
            <b>Индекс:</b> ${point.index}<br>
            <b>Тип марки:</b> ${point.mark}<br>
            <b>Тип центра:</b> ${point.centerType}<br>
            <b>Тип опознавательного знака:</b> ${point.sighType}<br>
            <b>Номер региона:</b> ${point.msk}<br>
        `;
            var placemark = new ymaps.Placemark([point.longitude, point.latitude], {
                balloonContentHeader: ' <b>Имя:</b>' + point.name + '<br>',
                balloonContentBody: description
            }, {
                preset: 'islands#blueDotIcon'
            });
            map.geoObjects.add(placemark);
        });
    }

    // Отрисовка пунктов ГНС
    if (gnsData) {
        gnsData.forEach(point => {
            const description = `
            <b>Индекс:</b> ${point.index}<br>
            <b>Тип марки:</b> ${point.mark}<br>
            <b>Тип центра:</b> ${point.centerType}<br>
            <b>Тип опознавательного знака:</b> ${point.sighType}<br>
            <b>Номер региона:</b> ${point.msk}<br>
            <b>Кроки:</b> ${point.maingeographyfeature}<br>
        `;
            var placemark = new ymaps.Placemark([point.longitude, point.latitude], {
                balloonContentHeader: ' <b>Имя:</b>' + point.name + '<br>',
                balloonContentBody: description
            }, {
                preset: 'islands#greenDotIcon'
            });
            map.geoObjects.add(placemark);
        });
    }
}