// Obtener el parámetro 'nombre' de la URL
const urlParams = new URLSearchParams(window.location.search);
const nombre = urlParams.get('nombre');

// Mostrar el nombre o usarlo en algún lugar de la página
if (nombre) {
    document.getElementById('nombre-usuario').innerText = `Hola, ${nombre}! Bienvenido al test.`;
}
