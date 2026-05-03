var map = L.map('map').setView([35.9606, -83.9207], 12);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

L.control.scale().addTo(map);

// Load breweries point GeoJSON
fetch('data/Knoxville_Breweries_points.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data).addTo(map);
    });

// Load greenways line GeoJSON
fetch('data/knoxville_greenways_lines.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data).addTo(map);
    });

// Load parks polygon GeoJSON
fetch('data/knoxville_parks_polygons.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data).addTo(map);
    });