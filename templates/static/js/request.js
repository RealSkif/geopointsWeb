//Слушатель для кнопки Найти
document.getElementById('sendRequestButton').addEventListener('click', function () {
    // validateRadiusInput();
    if (currentPlacemark) {
        var coords = currentPlacemark.geometry.getCoordinates();
        var radius = parseFloat(radiusInput.value);

        if (isNaN(radius) || radius < 1 || radius > 50) {
            alert('Укажите корректный радиус поиска (1 - 50 км)');
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
            alert('Укажите хотя бы одну из опций, пункты ГГС или пункты ГНС');
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
                ggsData = [];
                gnsData = [];
                ggsData = results[0];
                gnsData = results[1];
                // Из map.js вызываем функцию вывода меток на карту
                addPointsToMap(ggsData, gnsData);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
});
