

function registerForm(){
    //nombre, email y password

    let formContainer = document.getElementById('form-container');
    let h1Register = document.createElement('h1');
    h1Register.textContent = "Crear nueva cuenta";
    formContainer.appendChild(h1Register);

    let form = document.getElementById('register-form');
    let labelName = document.createElement('label');
    labelName.textContent = "Nombre de usuario";
    //Nombre de usuario
    let inputName = document.createElement('input');
    inputName.type = 'text';
    inputName.name = 'name';
    inputName.id = 'name';
    inputName.placeholder = 'Nombre de ususario';

    //Correo eletrónico
    let labelEmail = document.createElement('label'); 
    labelEmail.textContent = "Correo electrónico";
    let inputEmail = document.createElement('input');
    inputEmail.type = 'email';
    inputEmail.name = 'email';
    inputEmail.id = 'email';
    inputEmail.placeholder = "Correo electrónico";

    //Contraseña
    let labelPassword = document.createElement('label'); 
    labelPassword.textContent = "Contraseña";
    let inputPassword = document.createElement('input');
    inputPassword.type = 'password';
    inputPassword.name = 'password';
    inputPassword.id = 'password';
    inputPassword.placeholder = "Contraseña";

    let inputSubmit = document.createElement('input');
    inputSubmit.type = "submit";
    inputSubmit.id = 'submit';
    inputSubmit.value = "Crear usuario";
    inputSubmit.addEventListener('click', function(e){
        e.preventDefault();
        registrar();
    })

    form.appendChild(labelName);
    form.appendChild(inputName);
    form.appendChild(labelEmail);
    form.appendChild(inputEmail);
    form.appendChild(labelPassword);
    form.appendChild(inputPassword);
    form.appendChild(inputSubmit);

    formContainer.appendChild(form);

    let p = document.createElement('p');
    let a = document.createElement('a');
    p.textContent = '¿Ya tienes cuenta?';
    a.textContent = 'Iniciar sesión';
    a.href = '/login';
    p.appendChild(a);
    formContainer.appendChild(p);
}

registerForm();


function registrar() {
    // Aqui tenemos que llamar al evento de crear usuario
    fetch("/user/", {
        method: 'POST',
        headers: { "Content-Type": "application/json " },
        body: JSON.stringify({
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        })
    })
    .then(message => message.json())
    .then(data => {
        console.log(data);
        window.location.href = '/login';
    })
    .catch(err => console.error("Ha habido un error",err));
}