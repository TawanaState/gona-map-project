import { setupLayers } from "./layers.js";


var map = L.map('map');
window.MAP = map; // Expose map to global scope for debugging

const BTN_LOCATE_ME = document.querySelector("button.btn-locate-me");
BTN_LOCATE_ME.onclick = (e) => {
    /*if (!navigator.geolocation) {
        alert("GEO location not supported by your browser.");
    } else {
        navigator.geolocation.getCurrentPosition((success) => {
            const { latitude, longitude } = success.coords;
            map.setView([latitude, longitude], 13);
            marker.setLatLng([latitude, longitude]);
            L.circle([latitude, longitude], {
                color: '#1c352b',
                fillColor: '#448169',
                fillOpacity: 0.5,
                radius: 10
            }).addTo(map).bindPopup("You are here").openPopup();
        }, (error) => {
            console.error(error);
            alert("Unable to retrieve your location. Please check your browser settings.");
        }, {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 5000
        });
    }*/

    // Get the user's location and center the map
    map.locate({setView: true, watch:true, enableHighAccuracy: true});

    // Optional: Handle the locationfound event
    map.on('locationfound', function(e) {
        L.marker(e.latlng).addTo(map)
            .bindPopup("You are here").openPopup();
        L.circle(e.latlng, {radius: e.accuracy / 2}).addTo(map);
    });
}

map.setView([-21.9198, 31.4664], 15); // Set initial view to Zimbabwe
setupLayers()
//L.tileLayer(Layers[1].url, Layers[1].options).addTo(map);


