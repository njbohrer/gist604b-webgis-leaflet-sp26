var map = L.map('map').setView([35.9606, -83.9207], 12);

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CartoDB',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);

L.control.scale().addTo(map);

console.log("main.js is running")//trouble shooting load errors

fetch('data/Knoxville_Breweries_points.geojson')
    .then(response => response.json())
    .then(data => {
       L.geoJSON(data, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
            radius: 6,
            color: 'darkred',
            weight: 2,
            fillColor: 'red',
            fillOpacity: 0.4
        });
    },
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
                fillOpacity: 0.35
            }
        }).addTo(map);
    });