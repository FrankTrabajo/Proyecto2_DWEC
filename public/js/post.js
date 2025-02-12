function mostrarNotificacion() {
    if (Notification.permission === 'granted') {
        new Notification("Post creado correctamente", {
            body: '!Nuevo post!'
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


function create() {
    fetch('/post/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
            title: document.getElementById('title').value,
            type: document.getElementById('type').value,
            description: document.getElementById('description').value,
            photo: document.getElementById('photo').value,
            url: document.getElementById('url').value
        })
    })
        .then(message => message.json())
        .then(message => {
            console.log(message);
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
    let inputType = document.createElement('input');
    inputType.type = 'text';
    inputType.name = 'title';
    inputType.id = 'title';

    //Descripcion
    let labelDescription = document.createElement('label');
    labelDescription.textContent = "Tipo de post";
    let textAreaDescription = document.createElement('textArea');
    textAreaDescription.name = 'title';
    textAreaDescription.id = 'title';

    //Foto
    let labelFoto = document.createElement('label');
    labelFoto.textContent = "Tipo de post";
    let inputFoto = document.createElement('input');
    inputFoto.type = 'file';
    inputFoto.name = 'title';
    inputFoto.id = 'title';

    //Url
    let labelUrl = document.createElement('label');
    labelUrl.textContent = "Tipo de post";
    let inputUrl = document.createElement('input');
    inputUrl.type = 'text';
    inputUrl.name = 'title';
    inputUrl.id = 'title';

    //Submit
    let inputSubmit = document.createElement('input');
    inputSubmit.type = "submit";
    inputSubmit.id = 'submit';
    inputSubmit.value = "Crear"
    inputSubmit.addEventListener('click', function(e){
        e.preventDefault();
        create();
    })

    postForm.appendChild(labelTitle);
    postForm.appendChild(inputTitle);

    postForm.appendChild(labelType);
    postForm.appendChild(inputType);

    postForm.appendChild(labelDescription);
    postForm.appendChild(textAreaDescription);

    postForm.appendChild(labelFoto);
    postForm.appendChild(inputFoto);

    postForm.appendChild(labelUrl);
    postForm.appendChild(inputUrl);

    formContainer.appendChild(postForm);

}

createForm();