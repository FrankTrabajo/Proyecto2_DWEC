/**
 * Funcion para crear la estructura del profile
 */
function profileForm(data) {
    let header = document.getElementById('profileHeader');

    let profileIndex = document.createElement("div");
    profileIndex.className = "profileIndex";

    let infoUser = document.createElement("div");
    infoUser.className = "infoUser";

    profileIndex.appendChild(infoUser);
    let userProfile = document.createElement("img");
    userProfile.id = "userProfile";
    userProfile.src = "uploads/userDefault.png";
    
    let userNombre = document.createElement("h2");
    userNombre.id = "userNombre";
    userNombre.textContent = data.name;
    
    let buttonCrearPost = document.createElement('button');
    buttonCrearPost.id = "volverIndex";
    buttonCrearPost.textContent = "Crear nuevo post";
    buttonCrearPost.addEventListener('click', function() {
        window.location.href = "/create_post";
    });

    let volverIndex = document.createElement("button");
    volverIndex.id = "volverIndex";
    volverIndex.textContent = "Volver";
    volverIndex.addEventListener('click', () => {
        window.location.href = '/';
    });

    infoUser.appendChild(userProfile);
    infoUser.appendChild(userNombre);
    profileIndex.appendChild(infoUser);
    profileIndex.appendChild(buttonCrearPost);
    profileIndex.appendChild(volverIndex);
    header.appendChild(profileIndex);
    
}

function obtenerPosts(userId){

    fetch("/api/post/")
    .then(response => response.json())
    .then(data => {
        for(let post of data){
            if(post.owner === userId){
                pintarPOST(post);
            }
        }
    })
    .catch(err => console.error(err));


}

/**
 * Función para pintar los posts en el contenedor
 * @param {Obj} datos 
 */
function pintarPOST(datos){
    if(datos != null){
        let divPosts = document.getElementById("postContainer");

        let postDiv = document.createElement('div');
        postDiv.classList.add('post');

        let pTitle = document.createElement('h3');
        pTitle.textContent = datos.title;

        let pDescription = document.createElement('p');
        pDescription.textContent = datos.description;

        let imgPost = document.createElement('img');
        imgPost.src = datos.photo;

        let buttonModificar = document.createElement('button');
        buttonModificar.textContent = "Modificar post";
        buttonModificar.addEventListener('click', function (){
            window.location.href = `/post/update?id=${datos._id}`;
        });



        postDiv.appendChild(pTitle);
        postDiv.appendChild(pDescription);
        postDiv.appendChild(imgPost);
        postDiv.appendChild(buttonModificar);
        divPosts.appendChild(postDiv);
    }
}

function redirectMod(idPost){

}



/**
 * Funcion para obtener el id del usuario a través de la URL
 * @returns Retorna el ID del usuario
 */
function idFromUrl(){
    let searchParams = window.location.search;
    let datosURL = searchParams.split('?');
    datosURL = searchParams.split('userId=');
    let userId = datosURL[1];
    return userId;
}
/**
 * Funcion llamada fetch para obtener los datos del usuario logueado.
 */
function obtainUser(){
    let userId = idFromUrl();
    fetch(`/user/${userId}`)
    .then(response => response.json())
    .then(data => {
        profileForm(data);
        obtenerPosts(data._id);
        
    })
    .catch(err => console.error(err));
}

/**
 * Funcion para manejar la autenticación del usuario
 */
function checkAuth(){
    fetch("/check-auth", { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            if (data.logueado) {
                obtainUser();
            } else {
                window.location.href='/';
            }
        })
        .catch(err => console.error('Error al verificar la autenticación:', err));
}

document.addEventListener('DOMContentLoaded', checkAuth);


 
