// Global variable accessible by other scripts
var trackCoordinates = []; // Array to store track coordinates

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

// Function to handle adding a point to the track

function addPointToTrack(coords) {
    console.log('addPointToTrack called');

    if (trackCreationMode) {
        trackCoordinates.push(coords);

        // Remove the existing track polyline, if any
        window.map.geoObjects.each(function (geoObject) {
            if (geoObject instanceof ymaps.Polyline) {
                window.map.geoObjects.remove(geoObject);
            }
        });

        // Draw the updated track as a polyline
        var polyline = new ymaps.Polyline(trackCoordinates, {}, {
            strokeColor: '#0000FF',
            strokeWidth: 4
        });

        map.geoObjects.add(polyline);
    } else {
        // Rest of your existing code for handling placemarks on click
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

function saveTrackAsKML(coordinates) {
    if (coordinates.length === 0) {
        alert('The track is empty. Please add points to the track first.');
        return;
    }

    // Create a KML file with the track coordinates
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

    // Create a Blob from the KML content
    var blob = new Blob([kml], {type: 'application/vnd.google-earth.kml+xml'});

    // Create a download link and trigger the download
    var downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'Track.kml';
    downloadLink.click();
}
