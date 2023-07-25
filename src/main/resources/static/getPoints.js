// getPoints.js

ymaps.ready(function() {
    var map = new ymaps.Map("map", {
        center: [55.76, 37.64], // Change these coordinates to your desired location
        zoom: 10 // Adjust the zoom level as needed
    });

    // Fetch the list of points from the server
    fetch('http://localhost:8081/getPoints')
        .then(response => response.json())
        .then(data => {
            // Iterate through the list of points and add placemarks to the map
            data.forEach(point => {
                var placemark = new ymaps.Placemark([point.x, point.y], {}, {
                    preset: 'islands#dotIcon'
                });
                map.geoObjects.add(placemark);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
