/* =========================================================
   USUARIOS - REGISTRO, LOGIN Y VALIDACIONES
   ========================================================= */


/* =========================================================
   DATOS DE REGIONES Y COMUNAS
   ========================================================= */

const comunasPorRegion = {

    metropolitana: [
        "Santiago",
        "San Joaquín",
        "La Florida",
        "Maipú",
        "Puente Alto",
        "La Cisterna",
        "Providencia",
        "Ñuñoa",
        "Las Condes",
        "Quilicura"
    ],

    valparaiso: [
        "Valparaíso",
        "Viña del Mar",
        "Quilpué",
        "Villa Alemana",
        "Concón",
        "San Antonio"
    ],

    ohiggins: [
        "Rancagua",
        "Machalí",
        "San Fernando",
        "Rengo",
        "Santa Cruz"
    ],

    maule: [
        "Talca",
        "Curicó",
        "Linares",
        "Cauquenes",
        "Constitución"
    ],

    biobio: [
        "Concepción",
        "Talcahuano",
        "San Pedro de la Paz",
        "Chiguayante",
        "Coronel",
        "Los Ángeles"
    ]
};




/* =========================================================
   VALIDAR CORREO
   ========================================================= */

function validarCorreo(correo) {

    const expresion =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return expresion.test(correo);
}


/* =========================================================
   VALIDAR CONTRASEÑA
   ========================================================= */

function validarPassword(password) {

    /*
        Requisitos:

        - mínimo 8 caracteres
        - al menos una letra
        - al menos un número
    */

    const expresion =
        /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

    return expresion.test(password);
}


/* =========================================================
   VALIDAR RUN CHILENO
   ========================================================= */

function validarRun(run) {

    /*
        Quita puntos y guion.
    */

    const runLimpio =
        run
            .replace(/\./g, "")
            .replace(/-/g, "")
            .toUpperCase();


    if (runLimpio.length < 8) {

        return false;
    }


    const cuerpo =
        runLimpio.slice(0, -1);


    const digitoIngresado =
        runLimpio.slice(-1);


    if (!/^\d+$/.test(cuerpo)) {

        return false;
    }


    let suma = 0;

    let multiplicador = 2;


    for (
        let i = cuerpo.length - 1;
        i >= 0;
        i--
    ) {

        suma +=
            Number(cuerpo[i]) *
            multiplicador;


        multiplicador++;


        if (multiplicador > 7) {

            multiplicador = 2;
        }
    }


    const resto =
        11 - (suma % 11);


    let digitoCalculado;


    if (resto === 11) {

        digitoCalculado = "0";

    } else if (resto === 10) {

        digitoCalculado = "K";

    } else {

        digitoCalculado =
            String(resto);
    }


    return (
        digitoCalculado ===
        digitoIngresado
    );
}


/* =========================================================
   FORMATEAR RUN
   ========================================================= */

function formatearRun(run) {

    let valor =
        run
            .replace(/\./g, "")
            .replace(/-/g, "")
            .replace(/[^0-9kK]/g, "")
            .toUpperCase();


    if (valor.length <= 1) {

        return valor;
    }


    const digito =
        valor.slice(-1);


    let cuerpo =
        valor.slice(0, -1);


    cuerpo =
        cuerpo.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            "."
        );


    return cuerpo + "-" + digito;
}


/* =========================================================
   REGIÓN Y COMUNA
   ========================================================= */

const regionSelect =
    document.getElementById(
        "registro-region"
    );


const comunaSelect =
    document.getElementById(
        "registro-comuna"
    );


if (
    regionSelect &&
    comunaSelect
) {

    regionSelect.addEventListener(
        "change",
        function () {

            const regionSeleccionada =
                regionSelect.value;


            /*
                Reiniciar comuna.
            */

            comunaSelect.innerHTML = "";


            if (
                regionSeleccionada === "" ||
                !comunasPorRegion[
                    regionSeleccionada
                ]
            ) {

                comunaSelect.disabled =
                    true;


                const opcion =
                    document.createElement(
                        "option"
                    );


                opcion.value = "";


                opcion.textContent =
                    "Primero selecciona una región";


                comunaSelect.appendChild(
                    opcion
                );


                return;
            }


            /*
                Habilitar comuna.
            */

            comunaSelect.disabled =
                false;


            const opcionInicial =
                document.createElement(
                    "option"
                );


            opcionInicial.value = "";


            opcionInicial.textContent =
                "Selecciona una comuna";


            comunaSelect.appendChild(
                opcionInicial
            );


            comunasPorRegion[
                regionSeleccionada
            ].forEach(
                function (comuna) {

                    const opcion =
                        document.createElement(
                            "option"
                        );


                    opcion.value =
                        comuna;


                    opcion.textContent =
                        comuna;


                    comunaSelect.appendChild(
                        opcion
                    );
                }
            );
        }
    );
}


/* =========================================================
   FORMATO AUTOMÁTICO DEL RUN
   ========================================================= */

const inputRun =
    document.getElementById(
        "registro-run"
    );


if (inputRun) {

    inputRun.addEventListener(
        "input",
        function () {

            inputRun.value =
                formatearRun(
                    inputRun.value
                );
        }
    );
}


/* =========================================================
   API USUARIOS
   ========================================================= */

const API_USUARIOS =
    "http://localhost:3000/api/usuarios";


/* =========================================================
   REGISTRO CON BACKEND
   ========================================================= */

const formRegistro =
    document.getElementById(
        "form-registro"
    );


if (formRegistro) {

    formRegistro.addEventListener(
        "submit",
        async function (evento) {

            evento.preventDefault();


            const nombre =
                document
                    .getElementById(
                        "registro-nombre"
                    )
                    .value
                    .trim();


            const apellido =
                document
                    .getElementById(
                        "registro-apellido"
                    )
                    .value
                    .trim();


            const run =
                document
                    .getElementById(
                        "registro-run"
                    )
                    .value
                    .trim();


            const correo =
                document
                    .getElementById(
                        "registro-correo"
                    )
                    .value
                    .trim()
                    .toLowerCase();


            const password =
                document
                    .getElementById(
                        "registro-password"
                    )
                    .value;


            const passwordConfirmar =
                document
                    .getElementById(
                        "registro-password-confirmar"
                    )
                    .value;


            const region =
                document
                    .getElementById(
                        "registro-region"
                    )
                    .value;


            const comuna =
                document
                    .getElementById(
                        "registro-comuna"
                    )
                    .value;


            const errorNombre =
                document.getElementById(
                    "error-registro-nombre"
                );


            const errorApellido =
                document.getElementById(
                    "error-registro-apellido"
                );


            const errorRun =
                document.getElementById(
                    "error-registro-run"
                );


            const errorCorreo =
                document.getElementById(
                    "error-registro-correo"
                );


            const errorPassword =
                document.getElementById(
                    "error-registro-password"
                );


            const errorPasswordConfirmar =
                document.getElementById(
                    "error-registro-password-confirmar"
                );


            const errorRegion =
                document.getElementById(
                    "error-registro-region"
                );


            const errorComuna =
                document.getElementById(
                    "error-registro-comuna"
                );


            const errorGeneral =
                document.getElementById(
                    "error-registro-general"
                );


            const mensajeExito =
                document.getElementById(
                    "registro-exito"
                );


            errorNombre.textContent = "";
            errorApellido.textContent = "";
            errorRun.textContent = "";
            errorCorreo.textContent = "";
            errorPassword.textContent = "";
            errorPasswordConfirmar.textContent = "";
            errorRegion.textContent = "";
            errorComuna.textContent = "";

            errorGeneral.classList.add(
                "d-none"
            );

            mensajeExito.classList.add(
                "d-none"
            );


            let formularioValido = true;


            if (nombre.length < 2) {

                errorNombre.textContent =
                    "Ingresa un nombre válido.";

                formularioValido = false;
            }


            if (apellido.length < 2) {

                errorApellido.textContent =
                    "Ingresa un apellido válido.";

                formularioValido = false;
            }


            if (!validarRun(run)) {

                errorRun.textContent =
                    "Ingresa un RUN válido.";

                formularioValido = false;
            }


            if (!validarCorreo(correo)) {

                errorCorreo.textContent =
                    "Ingresa un correo válido.";

                formularioValido = false;
            }


            if (!validarPassword(password)) {

                errorPassword.textContent =
                    "La contraseña debe tener al menos 8 caracteres, una letra y un número.";

                formularioValido = false;
            }


            if (
                password !==
                passwordConfirmar
            ) {

                errorPasswordConfirmar.textContent =
                    "Las contraseñas no coinciden.";

                formularioValido = false;
            }


            if (region === "") {

                errorRegion.textContent =
                    "Selecciona una región.";

                formularioValido = false;
            }


            if (comuna === "") {

                errorComuna.textContent =
                    "Selecciona una comuna.";

                formularioValido = false;
            }


            if (!formularioValido) {

                errorGeneral.textContent =
                    "Revisa los datos ingresados.";

                errorGeneral.classList.remove(
                    "d-none"
                );

                return;
            }


            try {

                const respuesta =
                    await fetch(
                        API_USUARIOS,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({
                                    run:
                                        run
                                            .replace(/\./g, "")
                                            .replace(/-/g, "")
                                            .toUpperCase(),

                                    nombre:
                                        nombre,

                                    apellidos:
                                        apellido,

                                    correo:
                                        correo,

                                    password:
                                        password,

                                    tipoUsuario:
                                        "Cliente",

                                    region:
                                        region,

                                    comuna:
                                        comuna,

                                    direccion:
                                        ""
                                })
                        }
                    );


                const datos =
                    await respuesta.json();


                if (!respuesta.ok) {

                    if (
                        datos.mensaje &&
                        datos.mensaje
                            .toLowerCase()
                            .includes("correo")
                    ) {

                        errorCorreo.textContent =
                            datos.mensaje;

                    } else if (
                        datos.mensaje &&
                        datos.mensaje
                            .toLowerCase()
                            .includes("run")
                    ) {

                        errorRun.textContent =
                            datos.mensaje;

                    } else {

                        errorGeneral.textContent =
                            datos.mensaje ||
                            "No fue posible crear la cuenta.";

                        errorGeneral.classList.remove(
                            "d-none"
                        );
                    }

                    return;
                }


                mensajeExito.textContent =
                    "Cuenta creada correctamente.";

                mensajeExito.classList.remove(
                    "d-none"
                );


                formRegistro.reset();


                if (comunaSelect) {

                    comunaSelect.innerHTML = `
                        <option value="">
                            Primero selecciona una región
                        </option>
                    `;

                    comunaSelect.disabled =
                        true;
                }


                setTimeout(
                    function () {

                        window.location.href =
                            "login.html";

                    },
                    1200
                );


            } catch (error) {

                console.error(
                    "Error al registrar usuario:",
                    error
                );


                errorGeneral.textContent =
                    "No se pudo conectar con el servidor.";

                errorGeneral.classList.remove(
                    "d-none"
                );
            }
        }
    );
}


/* =========================================================
   LOGIN CON BACKEND
   ========================================================= */

const formLogin =
    document.getElementById(
        "form-login"
    );


if (formLogin) {

    formLogin.addEventListener(
        "submit",
        async function (evento) {

            evento.preventDefault();


            const correo =
                document
                    .getElementById(
                        "login-correo"
                    )
                    .value
                    .trim()
                    .toLowerCase();


            const password =
                document
                    .getElementById(
                        "login-password"
                    )
                    .value;


            const errorCorreo =
                document.getElementById(
                    "error-login-correo"
                );


            const errorPassword =
                document.getElementById(
                    "error-login-password"
                );


            const errorGeneral =
                document.getElementById(
                    "error-login-general"
                );


            errorCorreo.textContent = "";
            errorPassword.textContent = "";

            errorGeneral.classList.add(
                "d-none"
            );


            let formularioValido = true;


            if (!validarCorreo(correo)) {

                errorCorreo.textContent =
                    "Ingresa un correo válido.";

                formularioValido = false;
            }


            if (password === "") {

                errorPassword.textContent =
                    "Ingresa tu contraseña.";

                formularioValido = false;
            }


            if (!formularioValido) {
                return;
            }


            try {

                const respuesta =
                    await fetch(
                        API_USUARIOS
                    );


                if (!respuesta.ok) {

                    throw new Error(
                        "No fue posible obtener los usuarios"
                    );
                }


                const usuarios =
                    await respuesta.json();


                const usuarioEncontrado =
                    usuarios.find(
                        function (usuario) {

                            return (
                                usuario.correo &&
                                usuario.correo
                                    .toLowerCase() ===
                                    correo &&
                                usuario.password ===
                                    password
                            );
                        }
                    );


                if (!usuarioEncontrado) {

                    errorGeneral.textContent =
                        "Correo o contraseña incorrectos.";

                    errorGeneral.classList.remove(
                        "d-none"
                    );

                    return;
                }


                const esAdministrador =
                    (
                        usuarioEncontrado
                            .tipoUsuario ||
                        ""
                    )
                        .toLowerCase() ===
                    "administrador";


                const usuarioActivo = {

                    id:
                        usuarioEncontrado.id,

                    nombre:
                        usuarioEncontrado.nombre,

                    apellido:
                        usuarioEncontrado.apellidos ||
                        "",

                    correo:
                        usuarioEncontrado.correo,

                    rol:
                        esAdministrador
                            ? "admin"
                            : "cliente"
                };


                /*
                    Aquí sí usamos localStorage,
                    pero solamente para recordar
                    quién inició sesión.
                */

                localStorage.setItem(
                    "usuarioActivo",
                    JSON.stringify(
                        usuarioActivo
                    )
                );


                if (
                    usuarioActivo.rol ===
                    "admin"
                ) {

                    alert(
                        "Inicio de sesión correcto. Bienvenido Administrador."
                    );


                    window.location.href =
                        "admin/index.html";

                } else {

                    alert(
                        "Inicio de sesión correcto. Bienvenido " +
                        usuarioEncontrado.nombre +
                        "."
                    );


                    window.location.href =
                        "index.html";
                }


            } catch (error) {

                console.error(
                    "Error al iniciar sesión:",
                    error
                );


                errorGeneral.textContent =
                    "No se pudo conectar con el servidor.";

                errorGeneral.classList.remove(
                    "d-none"
                );
            }
        }
    );
}