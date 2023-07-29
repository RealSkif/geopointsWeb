//Слушатель для кнопки Найти
document.getElementById('sendRequestButton').addEventListener('click', function () {
    if (currentPlacemark) {
        var coords = currentPlacemark.geometry.getCoordinates();
        var radius = parseFloat(radiusInput.value);

        if (isNaN(radius)) {
            alert('Please enter a valid radius.');
            return;
        }

        var apiEndpoints = [];
        if (ggsCheckbox.checked) {
            apiEndpoints.push('http://localhost:8081/ggs');
        }
        if (gnsCheckbox.checked) {
            apiEndpoints.push('http://localhost:8081/gns');
        }

        if (apiEndpoints.length === 0) {
            alert('Please select at least one option (GGS or GNS).');
            return;
        }
        // Отправка запроса на geopoints
        var requests = apiEndpoints.map(endpoint => {
            var data = {
                "x": coords[0].toFixed(6), "y": coords[1].toFixed(6), "radius": radius.toFixed(6)
            };
            return fetch(endpoint, {
                method: 'POST', headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify(data)
            }).then(response => response.json());
        });
        Promise.all(requests)
            .then(results => {
                ggsData = results[0];
                gnsData = results[1];
                // Из map.js вызаем функцию вывода меток на карту
                addPointsToMap(ggsData, gnsData);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
});
