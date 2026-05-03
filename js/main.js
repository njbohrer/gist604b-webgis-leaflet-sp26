var map = L.map('map').setView([35.9606, -83.9207], 12);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

L.control.scale().addTo(map);

console.log("main.js is running")//trouble shooting load errors

// Breweries - point layer
fetch('data/Knoxville_Breweries_points.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 6,
                    fillOpacity: 0.8
                });
            }
        }).addTo(map);
    });

// Greenways - line layer
fetch('data/knoxville_greenways_lines.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: {
                weight: 4
            }
        }).addTo(map);
    });

// Parks - polygon layer
fetch('data/knoxville_parks_polygons.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: {
                weight: 1,
                fillOpacity: 0.25
            }
        }).addTo(map);
    });