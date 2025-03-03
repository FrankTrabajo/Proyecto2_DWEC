function mostrarNotificacion(message) {
    if (Notification.permission === 'granted') {
        new Notification("Post creado", {
            body: 'Nuevo post creado'
        });
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification("Post creado correctamente", {
                    body: '!Nuevo post!'
                });
            }
        });
    } 
}


function create(postForm) {
    let formData = new FormData(postForm);
    fetch('/api/post/', {
        method: 'POST',
        credentials: "include",
        body: formData
        // body: JSON.stringify({
        //     title: document.getElementById('title').value,
        //     type: document.getElementById('type').value,
        //     description: document.getElementById('description').value,
        //     photo: document.getElementById('photo').value,
        // })
    })
        .then(message => message.json())
        .then(message => {
            console.log(message.message);
            mostrarNotificacion();

        })
        .catch(err => console.error(err));
}

function createForm(){
    let formContainer = document.getElementById('form-container');
    let h1 = document.createElement('h1');
    h1.textContent = "Formulario nuevo post";

    let postForm = document.getElementById('post-form');
    postForm.enctype = "multipart/form-data";
    postForm.method = 'POST';


    //Titulo
    let labelTitle = document.createElement('label');
    labelTitle.textContent = "Titulo del post: ";
    let inputTitle = document.createElement('input');
    inputTitle.type = 'text';
    inputTitle.name = 'title';
    inputTitle.id = 'title';

    //Tipo
    let labelType = document.createElement('label');
    labelType.textContent = "Tipo de post";
    let selectType = document.createElement('select');
    selectType.name = 'type';
    selectType.id = 'type';
    
    let options = ['Montaña', 'Playa', 'Lago', 'Ciudad', 'Rio'];
    options.forEach(optionText => {
        let option = document.createElement('option');
        option.value = optionText;
        option.textContent = optionText;
        selectType.appendChild(option);
    })

    //Descripcion
    let labelDescription = document.createElement('label');
    labelDescription.textContent = "Descripcion de post";
    let textAreaDescription = document.createElement('textArea');
    textAreaDescription.name = 'description';
    textAreaDescription.id = 'description';

    //Foto
    let labelFoto = document.createElement('label');
    labelFoto.textContent = "Foto de post";
    let inputFoto = document.createElement('input');
    inputFoto.type = 'file';
    inputFoto.name = 'photo';
    inputFoto.id = 'photo';

    //Submit
    let inputSubmit = document.createElement('input');
    inputSubmit.type = "submit";
    inputSubmit.id = 'submit';
    inputSubmit.value = "Crear"
    inputSubmit.addEventListener('click', function(e){
        e.preventDefault();
        create(postForm);
        window.location.href = '/';
    });

    postForm.appendChild(labelTitle);
    postForm.appendChild(inputTitle);

    postForm.appendChild(labelType);
    postForm.appendChild(selectType);

    postForm.appendChild(labelDescription);
    postForm.appendChild(textAreaDescription);

    postForm.appendChild(labelFoto);
    postForm.appendChild(inputFoto);

    postForm.appendChild(inputSubmit);

    formContainer.appendChild(postForm);

}

createForm();

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

let coordenadas = null;
let lat, long;
function cargarMapa() {
    try {
        map = L.map('map').setView([LATITUD_MADRID,LONGITUD_MADRID], ZOOM_PREDETERMINADO);
     
        map.on('click', function(e){
            lat = e.latlng.lat;
            long = e.latlng.lng;
            
            pintarUbicacionExtra(e.latlng);
        });


        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        return true;
    } catch (error) {
        return false;
    }
  
}
function pintarUbicacionExtra(coords){
    if(coordenadas){
        map.removeLayer(coordenadas);
    }

    coordenadas = L.marker(coords)
    .addTo(map);

    console.log(coords);
}


function cargarLibrerias() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
    link.crossOrigin="";
    document.head.appendChild(link);

    // Crear e insertar el script de Leaflet
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
    script.crossOrigin="";
    script.onload = () => {
        cargarMapa();
    }
    document.head.appendChild(script);
}

document.addEventListener("DOMContentLoaded", function () { 
    ///compruebo si tengo conexion a una red
    if(navigator.onLine){
       cargarLibrerias();
    }else{
        agregarNotificacion("ERROR:no se han cargado correctamente las librerias");
    }
});


