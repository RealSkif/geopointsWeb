ymaps.ready(init);

function init() {
    var map = new ymaps.Map("map", {
        center: [55.76, 37.64], // Change these coordinates to your desired location
        zoom: 10 // Adjust the zoom level as needed
    });

    var currentPlacemark = null;
    var pointsData = []; // Variable to store the fetched points

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
        console.log(currentPlacemark)
    });

    // Function to add the points to the map
    function addPointsToMap() {
        // Remove existing placemarks from the map
        map.geoObjects.removeAll();

        pointsData.forEach(point => {
            const description = `
            <b>Имя:</b> ${point.name}<br>
            <b>Индекс:</b> ${point.index}<br>
            <b>Тип марки:</b> ${point.mark}<br>      
        `;
            var placemark = new ymaps.Placemark([point.longitude, point.latitude], {}, {
                balloonContent: description // Set the description as the balloon content
            }, {
                preset: 'islands#dotIcon'
            });

            placemark.events.add('click', function (e) {
                // Open the balloon on click to display the details
                e.get('target').balloon.open();
            });
            map.geoObjects.add(placemark);
        });
    }

    // Add click event handler for the button
    document.getElementById('sendRequestButton').addEventListener('click', function () {
        if (currentPlacemark) {
            var coords = currentPlacemark.geometry.getCoordinates();
            var data = {
                "x": coords[0].toFixed(6), // Take x-coordinate from the placemark
                "y": coords[1].toFixed(6), // Take y-coordinate from the placemark
                "radius": "10"
            };

            // Send HTTP request with the JSON data to http://localhost:8081/gns
            fetch('http://localhost:8081/gns', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => {
                    // Store the fetched points in the variable
                    pointsData = data;

                    // Add the fetched points to the map
                    addPointsToMap();
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    });

    // // Fetch the initial list of points from the server and place them on the map
    // fetch('http://localhost:8081/gns', {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         // Store the fetched points in the variable
    //         pointsData = data;
    //
    //         // Add the fetched points to the map
    //         addPointsToMap();
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //     });
}
