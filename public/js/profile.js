/**
 * Funcion para crear la estructura del profile
 */
function profileForm() {
    let header = document.createElement("header");
    document.body.appendChild(header);
    let profileIndex = document.createElement("div");
    profileIndex.className = "profileIndex";
    header.appendChild(profileIndex);
    let infoUser = document.createElement("div");
    infoUser.className = "infoUser";
    profileIndex.appendChild(infoUser);
    let userProfile = document.createElement("img");
    userProfile.id = "userProfile";
    userProfile.src = "uploads/userDefault.png";
    infoUser.appendChild(userProfile);
    let userNombre = document.createElement("h2");
    userNombre.id = "userNombre";

    userNombre.textContent = "Hola";
    infoUser.appendChild(userNombre);

    let volverIndex = document.createElement("button");
    volverIndex.id = "volverIndex";
    volverIndex.textContent = "Volver al Índice";
    profileIndex.appendChild(volverIndex);
    let main = document.createElement("main");
    main.id = "main";
    document.body.appendChild(main);
    let userPosts = document.createElement("div");
    userPosts.id = "userPosts";
    main.appendChild(userPosts);
    volverIndex.addEventListener('click', () => {
        window.location.href = '/';
    });
}


/**
 * Funcion para cargar la información del usuario
 * @param {string} userId 
 */
function cargarUserInfo(userId) {
    fetch(`/api/user/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar la información del usuario');
            }
            return response.json();
        })
        .then(data => {
            const userProfile = document.getElementById('userProfile');
            const userNombre = document.getElementById('userNombre');

            userProfile.href = 'uploads/userDefault.png';
            userNombre.textContent = data['name'];
        })
        .catch(err => {
            console.error('Error al cargar la info del usuario:', err);
        });
}

/**
 * Funcion para cargar los posts del usuario
 * @param {string} userId 
 */
function cargarPostsUser(userId) {
    fetch(`/api/user/${userId}/posts`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los posts del usuario');
            }
            return response.json();
        })
        .then(data => {
            pintarPostsUser(data);
        })
        .catch(err => {
            console.error('Error al cargar los posts del usuario:', err);
        });
}

/**
 * Funcion para pintar los posts del usuario
 * @param {Array} datos 
 */
function pintarPostsUser(datos) {
    const userPosts = document.getElementById('userPosts');
    userPosts.innerHTML = '';

    datos.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';

        if (post.photo) {
            postDiv.innerHTML = `
                <p>${post.title}</p>
                <p>${post.description}</p>
                <img src="${post.photo}" alt="${post.title}"/>
                <br>
            `;
        } else {
            postDiv.innerHTML = `
                <p>${post.title}</p>
                <p>${post.description}</p>
                <br>
            `;
        }

        userPosts.appendChild(postDiv);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    profileForm();
    obtenerId();
    cargarPostsUser();
});
