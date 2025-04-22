var map = L.map('map');
window.MAP = map; // Expose map to global scope for debugging

const BTN_LOCATE_ME = document.querySelector("button.locate-me");
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
    map.locate({setView: true});

    // Optional: Handle the locationfound event
    map.on('locationfound', function(e) {
        L.marker(e.latlng).addTo(map)
            .bindPopup("You are here").openPopup();
        L.circle(e.latlng, {radius: e.accuracy / 2}).addTo(map);
    });
}

map.setView([-21.9198, 31.4664], 40);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([51.5, -0.09]).addTo(map);

