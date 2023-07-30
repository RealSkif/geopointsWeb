var trackCoordinates = [];

// Слушатель кнопки "проложить маршрут"
document.getElementById('addTrackButton').addEventListener('click', function () {
    trackCreationMode = !trackCreationMode;
});

// Слушатель кнопки "сохранить маршрут"
document.getElementById('saveTrackButton').addEventListener('click', function () {
    saveTrackAsKML(trackCoordinates);
});

// Слушатель кнопки "очистить маршрут"
document.getElementById('clearTrackButton').addEventListener('click', function () {
    trackCoordinates = [];
    map.geoObjects.each(function (geoObject) {
        if (geoObject instanceof ymaps.Polyline) {
            map.geoObjects.remove(geoObject);
        }
    });
    trackCreationMode = false;
});

// Функция добавления точек в маршрут
function addPointToTrack(coords) {
    if (trackCreationMode) {
        trackCoordinates.push(coords);

        // Удаляем предыдуший маршрут, если он существует
        window.map.geoObjects.each(function (geoObject) {
            if (geoObject instanceof ymaps.Polyline) {
                window.map.geoObjects.remove(geoObject);
            }
        });

        // Создаем маршрут в виде полилинии
        var polyline = new ymaps.Polyline(trackCoordinates, {}, {
            strokeColor: '#0000FF',
            strokeWidth: 4
        });

        map.geoObjects.add(polyline);
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
}
// Функция сохранения маршрута в kml
function saveTrackAsKML(coordinates) {
    if (coordinates.length === 0) {
        alert('Маршрут пустой. Для сохранения маршрут должен быть проложен');
        return;
    }

    var kml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<kml xmlns="http://www.opengis.net/kml/2.2">\n' +
        '  <Document>\n' +
        '    <name>Track.kml</name>\n' +
        '    <Placemark>\n' +
        '      <LineString>\n' +
        '        <coordinates>\n';

    for (var i = 0; i < coordinates.length; i++) {
        kml += '          ' + coordinates[i][0].toFixed(6) + ',' + coordinates[i][1].toFixed(6) + '\n';
    }

    kml += '        </coordinates>\n' +
        '      </LineString>\n' +
        '    </Placemark>\n' +
        '  </Document>\n' +
        '</kml>';

    // Создаем блоб из kml
    var blob = new Blob([kml], {type: 'application/vnd.google-earth.kml+xml'});

    // Отправляем блоб на скачку
    var downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'Track.kml';
    downloadLink.click();
}
