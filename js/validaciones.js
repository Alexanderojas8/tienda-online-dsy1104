const formularioContacto = document.getElementById("form-contacto");

if (formularioContacto) {

    formularioContacto.addEventListener("submit", function(event) {

        event.preventDefault();

        limpiarErroresContacto();

        let formularioValido = true;

        const nombre =
            document.getElementById("contacto-nombre").value.trim();

        const correo =
            document.getElementById("contacto-correo").value.trim();

        const comentario =
            document.getElementById("contacto-comentario").value.trim();


        // VALIDAR NOMBRE
        if (nombre === "") {

            mostrarErrorContacto(
                "error-contacto-nombre",
                "El nombre es obligatorio."
            );

            formularioValido = false;

        } else if (nombre.length > 100) {

            mostrarErrorContacto(
                "error-contacto-nombre",
                "El nombre no puede superar los 100 caracteres."
            );

            formularioValido = false;
        }


        // VALIDAR CORREO
        if (correo !== "") {

            const dominiosPermitidos = [
                "@duoc.cl",
                "@profesor.duoc.cl",
                "@gmail.com"
            ];

            const correoPermitido = dominiosPermitidos.some(
                function(dominio) {
                    return correo.endsWith(dominio);
                }
            );

            if (correo.length > 100) {

                mostrarErrorContacto(
                    "error-contacto-correo",
                    "El correo no puede superar los 100 caracteres."
                );

                formularioValido = false;

            } else if (!correoPermitido) {

                mostrarErrorContacto(
                    "error-contacto-correo",
                    "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com."
                );

                formularioValido = false;
            }
        }


        // VALIDAR COMENTARIO
        if (comentario === "") {

            mostrarErrorContacto(
                "error-contacto-comentario",
                "El comentario es obligatorio."
            );

            formularioValido = false;

        } else if (comentario.length > 500) {

            mostrarErrorContacto(
                "error-contacto-comentario",
                "El comentario no puede superar los 500 caracteres."
            );

            formularioValido = false;
        }


        // SI TODO ESTÁ CORRECTO
        if (formularioValido) {

            alert("Mensaje enviado correctamente.");

            formularioContacto.reset();
        }

    });
}


function mostrarErrorContacto(idElemento, mensaje) {

    const elemento = document.getElementById(idElemento);

    if (elemento) {
        elemento.textContent = mensaje;
    }
}


function limpiarErroresContacto() {

    const errores =
        document.querySelectorAll("#form-contacto .error");

    errores.forEach(function(error) {
        error.textContent = "";
    });
}