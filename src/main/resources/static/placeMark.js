// placeMark.js

var currentPlacemark = null;

ymaps.ready(function() {
    var map = new ymaps.Map("map", {
        center: [55.76, 37.64], // Change these coordinates to your desired location
        zoom: 10 // Adjust the zoom level as needed
    });

    map.events.add('click', function (e) {
        var coords = e.get('coords');

        if (currentPlacemark) {
            map.geoObjects.remove(currentPlacemark);
        }

        var placemark = new ymaps.Placemark(coords, {}, {
            preset: 'islands#dotIcon',
            draggable: true
        });

        map.geoObjects.add(placemark);
        currentPlacemark = placemark;
    });

    // Add click event handler for the button
    document.getElementById('sendRequestButton').addEventListener('click', function () {
        if (currentPlacemark) {
            var coords = currentPlacemark.geometry.getCoordinates();
            var data = {
                "x": coords[0].toFixed(6), // Take x-coordinate from the placemark
                "y": coords[1].toFixed(6), // Take y-coordinate from the placemark
                "radius": "10"
            };

            // Send HTTP request with the JSON data
            fetch('http://localhost:8081/gns', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.text())
                .then(responseText => {
                    // Display the response in the container
                    document.getElementById('responseContainer').textContent = responseText;
                })
                .catch(error => {
                    console.error('Error:', error);
                    document.getElementById('responseContainer').textContent = 'An error occurred.';
                });
        }
    });
});
