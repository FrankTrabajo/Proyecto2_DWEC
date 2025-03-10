
/**
 * Funcion crear el formulario del registro
 */
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
    inputName.required = true;

    //Mensaje de error del nombre
    let errorName = document.createElement('p');
    errorName.id = 'errorName';
    errorName.style.color = 'red';
    errorName.style.display = 'none';

    //Correo eletrónico
    let labelEmail = document.createElement('label'); 
    labelEmail.textContent = "Correo electrónico";
    let inputEmail = document.createElement('input');
    inputEmail.type = 'email';
    inputEmail.name = 'email';
    inputEmail.id = 'email';
    inputEmail.placeholder = "Correo electrónico";
    inputEmail.required = true;

    //Mensaje de error del email
    let errorEmail = document.createElement('p');
    errorEmail.id = 'errorEmail';
    errorEmail.style.color = 'red';
    errorEmail.style.display = 'none';

    //Contraseña
    let labelPassword = document.createElement('label'); 
    labelPassword.textContent = "Contraseña";
    let inputPassword = document.createElement('input');
    inputPassword.type = 'password';
    inputPassword.name = 'password';
    inputPassword.id = 'password';
    inputPassword.placeholder = "Contraseña";
    inputPassword.required = true;

    //Mensaje de error de la contraseña
    let errorPwd = document.createElement('p');
    errorPwd.id = 'errorPwd';
    errorPwd.style.color = 'red';
    errorPwd.style.display = 'none';

    let inputSubmit = document.createElement('input');
    inputSubmit.type = "submit";
    inputSubmit.id = 'submit';
    inputSubmit.value = "Crear usuario";
    inputSubmit.addEventListener('click', function(e){
        e.preventDefault();
        if(validarFormulario()){
            registrar();
        }
    })

    form.appendChild(labelName);
    form.appendChild(inputName);
    form.appendChild(errorName);
    form.appendChild(labelEmail);
    form.appendChild(inputEmail);
    form.appendChild(errorEmail);
    form.appendChild(labelPassword);
    form.appendChild(inputPassword);
    form.appendChild(errorPwd);
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

function validarFormulario(){
    let name = document.getElementById('name').value.trim();
    let email = document.getElementById('email').value.trim();
    let password = document.getElementById('password').value.trim();
    let valido = true;

    let errorName = document.getElementById('errorName');
    if(name.length < 3 || name.length > 20){
        errorName.textContent= 'El nombre tiene q tener entre 3 y 20 caracteres'
        errorName.style.display = 'block';
        valido = false;
    }else{
        errorName.style.display = 'none';
    }

    let errorEmail = document.getElementById('errorEmail');
    let contenidoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!contenidoEmail.test(email)){
        errorEmail.textContent = 'El email es incorrecto';
        errorEmail.style.display = 'block';
        valido = false;
    }else{
        errorEmail.style.display = 'none';
    }

    let errorPwd = document.getElementById('errorPwd');
    if(password.length < 6){
        errorPwd.textContent = 'La contreña debe tener al menos 6 caracteres';
        errorPwd.style.display = 'block';
        valido = false;
    }else{
        errorPwd.style.display = 'none';
    }

    return valido;
}

registerForm();

/**
 * Función para registrar un nuevo usuario
 */
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