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
        window.location.href = '/new_site';
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