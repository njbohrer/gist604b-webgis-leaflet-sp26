var map = L.map('map').setView([35.9606, -83.9207], 12);
var breweriesGroup = L.layerGroup();
var greenwaysGroup = L.layerGroup();
var parksGroup = L.layerGroup();

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
}).addTo(breweriesGroup);
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
        }).addTo(greenwaysGroup);
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

        }).addTo(parksGroup);
    });


// Legend
var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend');

    div.innerHTML =
        "<h4>Legend</h4>" +
        "<div><span class='legend-point'></span> Breweries</div>" +
        "<div><span class='legend-line'></span> Greenways</div>" +
        "<div><span class='legend-box'></span> Parks</div>";

    return div;
};

legend.addTo(map);

// Add layer groups to map
breweriesGroup.addTo(map);
greenwaysGroup.addTo(map);
parksGroup.addTo(map);

// Layer control
var overlayMaps = {
    "Breweries": breweriesGroup,
    "Greenways": greenwaysGroup,
    "Parks": parksGroup
};

L.control.layers(null, overlayMaps).addTo(map);