
// Links for the earthquake and tectonic plate geoJSON files
var quakesLink = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
var platesLink = "static/data/PB2002_boundaries.json";

// Function to set color based on quake magnitude
function chooseColour(value) {
    if (value >5) {
        return "#e16a86";
    } else if (value >4) {
        return "#a29048";
    } else if (value >3) {
        return "#01aa5a";
    } else if (value >2) {
        return "#00a6c9";
    } else if (value > 1) {
        return "#b775e1"
    } else {
        return "#85cff2";
    };
};

// Function to set colors for the legend
function legendColour(value) {
    switch(value) {
        case '< 1.0':
            return "#85cff2"
        case '1.0 - 2.0':
            return "#b775e1"
        case '2.0 - 3.0':
            return "#00a6c9"
        case '3.0 - 4.0':
            return "#01aa5a"
        case '4.0 - 5.0':
            return "#a29048"
        case '> 5.0':
            return "#e16a86"
    };
};

// Function to set marker size based on quake magnitude
function chooseSize(value) {
    return value**2.5
}

// Function to format the quake location string to Title Case
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to convert the time in milliseconds to more standard date format
function datetime_convert(date) {
    converted = new Date(date)
    var hour = converted.getHours();
    if (hour <10) { hour = '0' + hour.toString().slice(-2)} // add a zero in front if hours < 10
    var min = converted.getMinutes();     
    if (min <10) { min = '0' + min.toString().slice(-2)} // add a zero in front if min < 10
    var month = converted.getMonth() + 1;
    var day = converted.getDate();
    var year = converted.getFullYear();
    return (day + "/" + month + "/" + year +  "\n" + " at " + hour + ":" + min);
}   

// Function to generate the circle markers 
function generateMarker(radius, color, classTitle) {
    const cssStyle = `
      width: ${radius}px;
      height: ${radius}px;
      border-width: 10px;
      background: ${color};
      color: ${color};
      opacity: 0.6;
      box-shadow: 0 0 0 ${color};
    `
    // If magnitude >5 class is 'pulse', otherwise class is 'no-pulse'
    return L.divIcon({
      html: `<span style="${cssStyle}" class="${classTitle}"/>`,
      className: '',
    })
  }

   
// EARTHQUAKE LAYER
// First created as an empty layer with data set to null, will be filled once GeoJSON loaded 
var quakeLayer = L.geoJson(null, {
    pointToLayer: function(feature, latlng) {              
        
        // Create a pulsating animation if the magnitude is >5.0 (styled with css)
        if (feature.properties.mag > 5.0) {
            var pulsatingIcon = generateMarker(chooseSize(feature.properties.mag), chooseColour(feature.properties.mag), "pulse");
            return L.marker(latlng, {icon: pulsatingIcon})
        } else {
            var normalIcon = generateMarker(chooseSize(feature.properties.mag), chooseColour(feature.properties.mag), "no-pulse");          
            return L.marker(latlng, {icon: normalIcon})
        }

    },
    // Bind the pop-up to each marker
    onEachFeature: function(feature, layer) {
        layer.bindPopup(`<div class="pop-up">
                        <h3><strong>${datetime_convert(feature.properties.time)}</strong></h4>
                        <h4><strong>${capitalizeFirstLetter(feature.properties.place)}</strong></h4> <hr>
                        Lat: ${feature.geometry.coordinates[1].toFixed(3)} <br> 
                        Lon:  ${feature.geometry.coordinates[0].toFixed(3)}<br> 
                        Magnitude: ${feature.properties.mag}
                        </div>`)                      
    },
});


// Function to create an array of coordinates from JSON file. used for heatmap
coordinates = []
function getCoordinates(data) {
    coordinates.push([data.geometry.coordinates[1], data.geometry.coordinates[0]])
}


// Load the GeoJSON data load into the quakeLayer 
d3.json(quakesLink).then(function(data)  {
    quakeLayer.addData(data).addTo(myMap)
    
    // call the getCoordinates function to pull coordinates for heatmap
    L.geoJson(data, {
        onEachFeature: getCoordinates
    })
});    


// HEAT MAP LAYER
// Create the heatmap layer with the coordinates aray
var heatLayer = L.heatLayer(coordinates, {
    radius: 50,
    blur: 20,
    max: 0.2,
});



// TECTONIC PLATE LAYER
// First created as an empty layer with data set to null, will be filled once GeoJSON loaded 
var plateLayer = L.geoJson(null, {
    style: {color: "#db9d86",
            fillOpacity: 0,
            weight: 3} 
})

// Load the GeoJSON data into the plateLayer
d3.json(platesLink).then(function(data)  {
    plateLayer.addData(data).addTo(myMap)
});    



// DEFINE THE TILE LAYERS
// first define layer properties
var layerProperties = {"url" : "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
                        "attribution" : "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
                        "zoom": 18 }

// Light Map
var lightMap = L.tileLayer(layerProperties.url, {
attribution: layerProperties.attribution,
maxZoom: layerProperties.zoom,
id: "light-v10",
accessToken: API_KEY
});

// Outdoor Map
var outdoorMap = L.tileLayer(layerProperties.url, {
    attribution: layerProperties.attribution,
    maxZoom: layerProperties.zoom,
    id: "outdoors-v11",
    accessToken: API_KEY
});

// Dark Map
var darkMap = L.tileLayer(layerProperties.url, {
    attribution: layerProperties.attribution,
    maxZoom: layerProperties.zoom,
    id: "dark-v10",
    accessToken: API_KEY
});

// Satellite Map
var satelliteMap = L.tileLayer(layerProperties.url, {
    attribution: layerProperties.attribution,
    maxZoom: layerProperties.zoom,
    id: "satellite-v9",
    accessToken: API_KEY
});

// Create BASE and OVERLAYS 
var baseMaps = {
"Light Map": lightMap,
"Dark Map": darkMap,
"Outdoor Map": outdoorMap,
"Satellite Map": satelliteMap
};

// Overlays that may be toggled on or off
var overlayMaps = {
"Earthquakes": quakeLayer,
"Fault Lines": plateLayer,
"Heatmap": heatLayer
};

// CREATE THE MAP
var myMap = L.map("map", {
    center: [28.5994, -8.6731],
    zoom: 3,
    layers: [lightMap, quakeLayer],
});

// Pass map layers into layer control and add layer control to map
L.control.layers(baseMaps, overlayMaps).addTo(myMap);


// LEGEND
// Create the legend div at the bottom right of screen
var legend = L.control({ position: "bottomright" });
legend.onAdd = function() {

    var div = L.DomUtil.create("div", "info legend");
    labels = ['<Strong>Earthquake Size</strong>']
    categories = ['> 5.0', '4.0 - 5.0', '3.0 - 4.0', '2.0 - 3.0', '1.0 - 2.0', '< 1.0']

    div.innerHTML += labels[0]  + '<hr>'
    for (var i=0; i<categories.length; i++) {
        div.innerHTML += '<i class="leg" style="background:' + legendColour(categories[i]) + '"></i>' + categories[i] + "<br>";
    }
    return div;
};
legend.addTo(myMap)



