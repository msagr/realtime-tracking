const socket = io();

// console.log("Hey");

// navigator is present in window object (inbuilt)
if(navigator.geolocation){
    // to watch position of marker
    navigator.geolocation.watchPosition(
        (position) => {
            const {latitude, longitude} = position.coords;
            socket.emit("send-location", {latitude, longitude});
        },
        // error
        (error) => {
            console.error(error);
        },
        // settings
        {
            enableHighAccuracy: true,
            timeout: 5000, // it will check position every 5 seconds
            maximumAge: 0, // no saved data
        }
    );
}

// from leaflet
const map = L.map("map").setView([0, 0], 10);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "OpenStreetMap"
}).addTo(map);