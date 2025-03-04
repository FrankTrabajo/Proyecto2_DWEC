function indexForm() {
    let header = document.querySelector("header");
    let barraDeArriba = document.createElement("div");
    barraDeArriba.className = "barra-de-arriba";
    let botonesDiv = document.querySelector(".botones");

    //Creamos el boton que nos lleve a nuestro usuario
    let userButton = document.createElement("a");
    userButton.id = 'profile';
    userButton.addEventListener('click', function() {
        obtenerId();
    });
    let userImg = document.createElement("img");
    userImg.src = "uploads/userDefault.png";
    userButton.appendChild(userImg);
    botonesDiv.appendChild(userButton);

    //Creamos el boton que nos lleve a la creación de un post y lugar
    let crearButton = document.createElement("a");
    crearButton.href = "/create_post";
    crearButton.id = "crearButton";
    let crearInput = document.createElement("input");
    crearInput.type = "button";
    crearInput.value = "Crear";
    crearButton.appendChild(crearInput);
    botonesDiv.appendChild(crearButton);

    //Creamos el boton que nos lleve al mapa
    let mapaButton = document.createElement("a");
    mapaButton.href = "/mapa";
    let mapaInput = document.createElement("input");
    mapaInput.type = "button";
    mapaInput.value = "Mapa";
    mapaButton.appendChild(mapaInput);
    botonesDiv.appendChild(mapaButton);

    //Creamos el boton de login
    let loginButton = document.createElement("button");
    loginButton.id = "loginbutton";
    let loginLink = document.createElement("a");
    loginLink.href = "/login";
    loginLink.textContent = "Iniciar sesión";
    loginButton.appendChild(loginLink);
    botonesDiv.appendChild(loginButton);

    //Creamos el boton de registrarse
    let registerButton = document.createElement("button");
    registerButton.id = "registerbutton";
    let registerLink = document.createElement("a");
    registerLink.href = "/register";
    registerLink.textContent = "Registrarse";
    registerButton.appendChild(registerLink);
    botonesDiv.appendChild(registerButton);

    //Creamos el boton de cierre de sesion
    let logoutButton = document.createElement("button");
    logoutButton.id = "logoutbutton";
    logoutButton.textContent = "Cerrar sesión";
    botonesDiv.appendChild(logoutButton);

    //Creamos la barra de busqueda
    let buscarDiv = document.querySelector(".buscar");

    let buscarInput = document.createElement("input");
    buscarInput.type = "text";
    buscarInput.placeholder = "Buscar lugares";
    buscarDiv.appendChild(buscarInput);

    let lupaImg = document.createElement("img");
    lupaImg.src = "uploads/search.png";
    buscarDiv.appendChild(lupaImg);

    let main = document.getElementById("main");
    let asideDiv = document.querySelector(".aside");
    let postContainer = document.getElementById("postContainer");
}

/**
 * Funcion para cargar y mostrar los posts
 */
function cargarPosts() {
    fetch("/api/post/", { method: "GET" })
        .then(response => response.json())
        .then(datos => {
            console.log(datos);
            pintarPOST(datos);
            mostrarTipo(datos);
        })
        .catch(err => console.error(err));
}

/**
 * Función para pintar los posts en el contenedor
 * @param {Obj} datos 
 */
function pintarPOST(datos){
    if(datos != null){
        let main = document.getElementById("postContainer");
        main.innerHTML = '';

        for(let i in datos){
            if (datos[i]['photo'] != null){
                main.innerHTML += `
                    <div id="dp" class="${datos[i]['type']} dp">
                        <p>${datos[i]['title']}</p>
                        <p>${datos[i]['description']}</p>
                        <img src="${datos[i]['photo']}"/>
                        <br>
                    </div>
                `;
            }else{
                main.innerHTML += `
                    <div id="dp" class="${datos[i]['type']} dp">
                        <p>${datos[i]['title']}</p>
                        <p>${datos[i]['description']}</p>
                        <br>
                    </div>
                `;
            }
        }
    }
}

// Función para mostrar los tipos de posts en el aside
function mostrarTipo(data){
    let tipos = new Set();

    for(let dato of data){
        if (dato.type) {
            tipos.add(dato.type);
        }
    }

    let divAside = document.getElementById('aside');
    let ul = document.createElement('ul');

    let litTodos = document.createElement('li');
    litTodos.textContent = "Todos los posts";
    litTodos.addEventListener('click', function () {
        filtrar('todos');
    });
    ul.appendChild(litTodos);

    for(let tipo of tipos){
        let li = document.createElement('li');
        li.textContent = tipo;
        li.addEventListener('click', function () {
            filtrar(tipo);
        });
        ul.appendChild(li);
    }

    divAside.appendChild(ul);
}

/**
 * Funcion para filtrar los posts por tipo
 * @param {*} tipoDePost 
 */
function filtrar(tipoDePost){
    let tiposPost = document.getElementsByClassName('dp');
    for(let i = 0; i < tiposPost.length; i++){
        if(tiposPost[i].classList.contains(tipoDePost) || tipoDePost == 'todos'){
            tiposPost[i].style.display = "block";
        }else{
            tiposPost[i].style.display = "none";
        }
    }
}

/**
 * Funcion para manejar la autenticación del usuario
 */
function checkAuth(){
    fetch("/check-auth", { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            if (data.logueado) {
                document.getElementById('loginbutton').style.display = 'none';
                document.getElementById('registerbutton').style.display = 'none';
                document.getElementById('logoutbutton').style.display = 'inline-block';
                document.getElementById('crearButton').style.display = 'inline-block';
                document.getElementById('profile').style.display = 'inline-block';
            } else {
                document.getElementById('loginbutton').style.display = 'inline-block';
                document.getElementById('registerbutton').style.display = 'inline-block';
                document.getElementById('logoutbutton').style.display = 'none';
                document.getElementById('crearButton').style.display = 'none';
                document.getElementById('profile').style.display = 'none';
            }
        })
        .catch(err => console.error('Error al verificar la autenticación:', err));
}

/**
 * Funcion para cerrar sesión
 */
function logout() {
    fetch('/user/logout', {
        method: 'POST',
        credentials: 'same-origin'
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Sesion cerrada') {
                window.location.href = '/login';
            } else {
                alert('Error al cerrar sesión');
            }
        })
        .catch(err => console.error('Error en el logout:', err));
}

//Obtenemos la id del usuario
function obtenerId(){
    fetch('/get-id-user', {
        method: 'GET',
        credentials: 'same-origin'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener el id');
        }
        return response.json();
    })
    .then(data => {
        let userId = data.userId;
        window.location.href = `/profile?userId=${userId}`;
    })
    .catch(err => {
        console.error('Error al obtener el ID del usuario:', err);
    });
}

// Cargamos los posts al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    indexForm();
    checkAuth();
    document.getElementById('logoutbutton').addEventListener('click', logout);
    cargarPosts();
});