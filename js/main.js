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
onEachFeature: function (feature, layer) {
    layer.bindPopup(
        "<b>" + feature.properties.name + "</b><br>" +
        "Hours: " + feature.properties.opening_hours
    );
}
}).addTo(map);
    });

// Greenways - line layer
fetch('data/knoxville_greenways_lines.geojson')
fetch('data/knoxville_greenways_lines.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: {
                color: 'purple', 
                weight: 4,
                opacity: 0.8
            },
           onEachFeature: function (feature, layer) {
                layer.bindPopup(feature.properties.name);
            }
        }).addTo(map);
    });

// Parks - polygon layer
fetch('data/knoxville_parks_polygons.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: {
                color: 'darkgreen',      
                weight: 1,               
                fillColor: 'lightgreen', 
                fillOpacity: 0.2         
            },
             onEachFeature: function (feature, layer) {
                layer.bindPopup(feature.properties.name);
            }

        }).addTo(map);
    });