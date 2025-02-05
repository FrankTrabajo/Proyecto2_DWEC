const popup = document.getElementById("popup"); 
const popupContent = popup.querySelector(".popup-content")
const LONGITUD_MADRID = -3.703790;
const LATITUD_MADRID = 40.416775;
const ZOOM_PREDETERMINADO = 13;
const UBICACION = "https://overpass-api.de/api/interpreter?data=[out:json];node[\"historic\"=\"monument\"](around:5000,40.416775,-3.703790);out;";
const RESTO_UBICACIONES= `https://cdn-icons-png.flaticon.com/512/252/252025.png`;
const mapContainer = document.getElementById("map");
let map = null;

function mostrarPopup(infoHTML) {
    popupContent.innerHTML = infoHTML; // Insertar contenido en el popup
    popup.style.display = "flex"; // Mostrar popup
}

function cargarMapa() {
    try {
        map = L.map('map').setView([LATITUD_MADRID,LONGITUD_MADRID], ZOOM_PREDETERMINADO);
       
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        return true;
    } catch (error) {
        return false;
    }
  
}






function cargarLibrerias() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
    link.crossOrigin="";
    link.onerror = () => {
        agregarNotificacion("ERROR: libreria de estilos no cargado");
    }
    document.head.appendChild(link);

    // Crear e insertar el script de Leaflet
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
    script.crossOrigin="";
    script.onload = () => {
        if(cargarMapa()){
            cargarDatos();
        }
    }
    document.head.appendChild(script);
}

function pintarUbicacion(coords,icono, titulo) {
    const iconoPersonalizado = L.icon({
        iconUrl: icono,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });
    let marcador = L.marker(coords,{
        icon: iconoPersonalizado
    })
    .bindPopup()
    .addTo(map);

    marcador.on("mouseover", function(){
        titulo
    });

    marcador.on("click", function(){
        mostrarPopup(titulo);
    })

    
}


function cargarDatos(){
    const xhr = new XMLHttpRequest();
    xhr.open("GET" , UBICACION , true);
    xhr.responseType = "text";
    xhr.onload = function(){
        switch(xhr.status){
            case 200:
                console.log(JSON.parse(xhr.response)['elements']);
                let ubicaciones = JSON.parse(xhr.response)['elements'];

                ubicaciones.forEach(element => {
                    pintarUbicacion([element['lat'],element['lon']], RESTO_UBICACIONES,element['tags']['name']);
                });

                break;
            default:
                break;
        }
    };

    xhr.send();
}

document.addEventListener("DOMContentLoaded", function () { 
    ///compruebo si tengo conexion a una red
    if(navigator.onLine){
       cargarLibrerias();
    }else{
        agregarNotificacion("ERROR:no se han cargado correctamente las librerias");
    }
});