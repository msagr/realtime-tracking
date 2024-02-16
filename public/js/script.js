const socket = io();

// console.log("Hey");

// navigator is present in window object (inbuilt)
if(navigator.geolocation){
    // to watch position of marker
    navigator.geolocation.watchPosition(
        (position) => {
            let {latitude, longitude} = position.coords;
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
const map = L.map("map").setView([0, 0], 16);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "OpenStreetMap"
}).addTo(map);

const markers = {};

socket.on("receive-location", (data) => {
    const {id, latitude, longitude} = data;
    map.setView([latitude, longitude], 16);
    if(markers[id]){
        markers[id].setLatLng([latitude, longitude]);
    }
    else{
        markers[id] = L.marker([latitude, longitude]).addTo(map);
    }
});

socket.on("user-disconnected", (id) => {
    if(markers[id]){
        map.removeLayer(markers[id]);
        delete markers[id];
    }
})