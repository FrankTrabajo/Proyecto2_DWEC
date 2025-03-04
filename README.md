# 🌍 Proyecto2_DWEC - Blog de Sitios

## 📌 Descripcion

**Proyecto1_DWEC** es una aplicacion web de tipo blog. Donde los usuarios pueden compartir sus experiencias de viaje, creando post y subiendo fotos y las ubicaciones de estos lugares

----

## 🎯 Funcionalidades.

### 🎫 **Modos de acceso**
    💠 **Cliente sin loguear**
    - Puede ver los posts publicados.
    - Puede usar el mapa con las ubicaciones de los demás usuarios.
    - ❌ No puede crear ni modificar posts.

    💠 **Cliente logueado**
    - Puede ver los posts publicados.
    - Puede usar el mapa interactivo.
    - ✔️ Puede crear y modificar sus propios posts.

    💠 **Usuario administrador**
    - Accede a su propia pagina `/admin-dashboard`.
    - Puede gestionar usuarios (activar/desactivar cuentas).
    - Puede eliminar posts de otros usuarios
    - *❕Los usuarios nunca se eliminan, solo se desactivan.*

----

### 🗺️ **Interaccion con el mapa**

- El mapa muestra las ubicaciones obtenidas de una API externa junto con las ubicaciones creadas por los usuarios



----

### 🚀 **Instalacion y Configuracion**

👾 **Usando git hub**
    -1- Clonar el repositorio -1-
    https://github.com/FrankTrabajo/Proyecto2_DWEC.git
    cd proyecto2_dwec

    ⭕ Instalaciones ⭕

    npm install

    -->📦 Tecnologias usadas 📦<--

    📍 Express -> npm install express
    📍 MongoDB -> npm install mongoose
    📍 Bcrypt -> npm install bcryptjs
    📍 Dotenv -> npm install dotenv
    📍 CookieParser -> npm install cookie-parser
    📍 JsonWebToken -> npm install jsonwebtoken
    📍 Express-fileupload -> npm install express-fileupload.
