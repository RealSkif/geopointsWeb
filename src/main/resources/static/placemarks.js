//Слушатель кнопки очистки карты
document.getElementById('clearPlacemarksButton').addEventListener('click', function () {
    map.geoObjects.removeAll();
    currentPlacemark = null;
});

//Слушатель кнопки
document.getElementById('savePlacemarksButton').addEventListener('click', function () {
    savePlacemarksAsKML();
});

//Слушатель сохранения пунктов
function savePlacemarksAsKML() {
    //собираем все пункты в один массив
    var placemarks = [];
    if (ggsData) {
        placemarks.push(...ggsData);
    }
    if (gnsData) {
        placemarks.push(...gnsData);
    }

    if (placemarks.length === 0) {
        alert('There are no placemarks to save.');
        return;
    }

    // собираем kml файл
    var kml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<kml xmlns="http://www.opengis.net/kml/2.2">\n' +
        '  <Document>\n';

    placemarks.forEach((placemark, index) => {
        const name = placemark.name;
        const description = `Индекс: ${placemark.index}, марка: ${placemark.mark}, тип центра: ${placemark.centerType}, оп. знак: ${placemark.sighType}, МСК ${placemark.msk}, ${placemark.maingeographyfeature ? `кроки: ${placemark.maingeographyfeature}` : ''}`;
        const latitude = placemark.latitude.toFixed(6);
        const longitude = placemark.longitude.toFixed(6);

        kml +=
            '    <Placemark>\n' +
            `      <name>${name}</name>\n` +
            `      <description>${description}</description>` +
            `      <Point>\n` +
            `      <coordinates>${latitude},${longitude}</coordinates>\n` +
            '      </Point>\n' +
            '    </Placemark>\n';
    });

    kml +=
        '  </Document>\n' +
        '</kml>';

    // Создаем блоб с kml
    var blob = new Blob([kml], {type: 'application/vnd.google-earth.kml+xml'});

    // кидаем на загрузку
    var downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'Placemarks.kml';
    downloadLink.click();
}
