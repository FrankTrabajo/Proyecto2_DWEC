function loginForm(){
    let formContainer = document.getElementById('form-container');
    let h1Login = document.createElement('h1');
    h1Login.textContent = "Login";
    formContainer.appendChild(h1Login);
    let form = document.getElementById('login-form');
    let labelEmail = document.createElement('label'); 
    labelEmail.textContent = "Correo electrónico";
    let inputEmail = document.createElement('input');
    inputEmail.type = 'email';
    inputEmail.name = 'email';
    inputEmail.id = 'email';
    inputEmail.placeholder = "Correo electrónico";

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
    inputSubmit.addEventListener('click', function(e){
        e.preventDefault();
        loginUser();
    })

    form.appendChild(labelEmail);
    form.appendChild(inputEmail);
    form.appendChild(labelPassword);
    form.appendChild(inputPassword);
    form.appendChild(inputSubmit);

    formContainer.appendChild(form);

    let p = document.createElement('p');
    let pError = document.createElement('p');
    pError.classList.add('hide');
    pError.id="pError";
    let a = document.createElement('a');
    p.textContent = '¿Aún no tienes cuenta?';
    a.textContent = 'Registrarse';
    a.href = '/register';
    p.appendChild(a);
    formContainer.appendChild(pError);
    formContainer.appendChild(p);

}


loginForm();


function loginUser(){

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const pError = document.getElementById('pError');
    if(!email || !password){
        pError.classList.add('error');
        pError.classList.remove('hide');
        pError.textContent = "Todos los campos son obligatorios";
    }

    fetch("/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email, password
        })
    })
    .then(message => message.json())
    .then(data => {
        alert(data.message + data.user);
        window.location.href = '/';

        
    })
    .catch(err => console.error(err));

}