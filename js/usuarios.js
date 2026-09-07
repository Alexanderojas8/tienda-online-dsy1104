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
   CREAR ADMINISTRADOR INICIAL
   ========================================================= */

/*
    IMPORTANTE:
    Esto es solamente para el proyecto académico.

    En un sistema real, un administrador NO debería
    crearse con una contraseña escrita directamente
    en JavaScript.
*/

function asegurarAdministrador() {

    const usuarios =
        JSON.parse(
            localStorage.getItem("usuarios")
        ) || [];


    const administradorExiste =
        usuarios.some(
            function (usuario) {

                return (
                    usuario.correo &&
                    usuario.correo.toLowerCase() ===
                    "admin@duoc.cl"
                );
            }
        );


    if (!administradorExiste) {

        const administrador = {

            id: "admin-principal",

            nombre: "Administrador",

            apellido: "Tienda",

            run: "111111111",

            correo: "admin@duoc.cl",

            password: "Admin123",

            region: "metropolitana",

            comuna: "Santiago",

            direccion: "Administración",

            rol: "admin"
        };


        usuarios.push(
            administrador
        );


        localStorage.setItem(
            "usuarios",
            JSON.stringify(usuarios)
        );
    }
}


/*
    Se ejecuta automáticamente
    cuando usuarios.js se carga.
*/

asegurarAdministrador();


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
   REGISTRO
   ========================================================= */

const formRegistro =
    document.getElementById(
        "form-registro"
    );


if (formRegistro) {

    formRegistro.addEventListener(
        "submit",
        function (evento) {

            evento.preventDefault();


            /* =====================================
               CAMPOS
            ====================================== */

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


            /* =====================================
               ELEMENTOS DE ERROR
            ====================================== */

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


            /* LIMPIAR MENSAJES */

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


            let formularioValido =
                true;


            /* =====================================
               VALIDAR NOMBRE
            ====================================== */

            if (nombre.length < 2) {

                errorNombre.textContent =
                    "Ingresa un nombre válido.";

                formularioValido =
                    false;
            }


            /* =====================================
               VALIDAR APELLIDO
            ====================================== */

            if (apellido.length < 2) {

                errorApellido.textContent =
                    "Ingresa un apellido válido.";

                formularioValido =
                    false;
            }


            /* =====================================
               VALIDAR RUN
            ====================================== */

            if (!validarRun(run)) {

                errorRun.textContent =
                    "Ingresa un RUN válido.";

                formularioValido =
                    false;
            }


            /* =====================================
               VALIDAR CORREO
            ====================================== */

            if (!validarCorreo(correo)) {

                errorCorreo.textContent =
                    "Ingresa un correo válido.";

                formularioValido =
                    false;
            }


            /* =====================================
               VALIDAR CONTRASEÑA
            ====================================== */

            if (!validarPassword(password)) {

                errorPassword.textContent =
                    "La contraseña debe tener al menos 8 caracteres, una letra y un número.";

                formularioValido =
                    false;
            }


            /* =====================================
               CONFIRMAR CONTRASEÑA
            ====================================== */

            if (
                password !==
                passwordConfirmar
            ) {

                errorPasswordConfirmar.textContent =
                    "Las contraseñas no coinciden.";

                formularioValido =
                    false;
            }


            /* =====================================
               VALIDAR REGIÓN
            ====================================== */

            if (region === "") {

                errorRegion.textContent =
                    "Selecciona una región.";

                formularioValido =
                    false;
            }


            /* =====================================
               VALIDAR COMUNA
            ====================================== */

            if (comuna === "") {

                errorComuna.textContent =
                    "Selecciona una comuna.";

                formularioValido =
                    false;
            }


            if (!formularioValido) {

                errorGeneral.textContent =
                    "Revisa los datos ingresados.";

                errorGeneral.classList.remove(
                    "d-none"
                );


                return;
            }


            /* =====================================
               LEER USUARIOS EXISTENTES
            ====================================== */

            const usuarios =
                JSON.parse(
                    localStorage.getItem(
                        "usuarios"
                    )
                ) || [];


            /* =====================================
               EVITAR CORREOS REPETIDOS
            ====================================== */

            const correoExiste =
                usuarios.some(
                    function (usuario) {

                        return (
                            usuario.correo &&
                            usuario.correo.toLowerCase() ===
                            correo
                        );
                    }
                );


            if (correoExiste) {

                errorCorreo.textContent =
                    "Este correo ya está registrado.";

                return;
            }


            /* =====================================
               EVITAR RUN REPETIDO
            ====================================== */

            const runLimpio =
                run
                    .replace(/\./g, "")
                    .replace(/-/g, "")
                    .toUpperCase();


            const runExiste =
                usuarios.some(
                    function (usuario) {

                        const runUsuario =
                            (
                                usuario.run ||
                                ""
                            )
                                .replace(/\./g, "")
                                .replace(/-/g, "")
                                .toUpperCase();


                        return (
                            runUsuario ===
                            runLimpio
                        );
                    }
                );


            if (runExiste) {

                errorRun.textContent =
                    "Este RUN ya está registrado.";

                return;
            }


            /* =====================================
               CREAR USUARIO
            ====================================== */

            const nuevoUsuario = {

                id:
                    Date.now(),

                nombre:
                    nombre,

                apellido:
                    apellido,

                run:
                    run,

                correo:
                    correo,

                password:
                    password,

                region:
                    region,

                comuna:
                    comuna,

                rol:
                    "cliente"
            };


            usuarios.push(
                nuevoUsuario
            );


            localStorage.setItem(
                "usuarios",
                JSON.stringify(
                    usuarios
                )
            );


            /* =====================================
               ÉXITO
            ====================================== */

            mensajeExito.classList.remove(
                "d-none"
            );


            formRegistro.reset();


            comunaSelect.innerHTML = `

                <option value="">

                    Primero selecciona una región

                </option>
            `;


            comunaSelect.disabled =
                true;


            /* IR AL LOGIN */

            setTimeout(
                function () {

                    window.location.href =
                        "login.html";

                },
                1200
            );
        }
    );
}


/* =========================================================
   LOGIN
   ========================================================= */

const formLogin =
    document.getElementById(
        "form-login"
    );


if (formLogin) {

    formLogin.addEventListener(
        "submit",
        function (evento) {

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


            let formularioValido =
                true;


            /* VALIDAR CORREO */

            if (!validarCorreo(correo)) {

                errorCorreo.textContent =
                    "Ingresa un correo válido.";

                formularioValido =
                    false;
            }


            /* VALIDAR CONTRASEÑA */

            if (password === "") {

                errorPassword.textContent =
                    "Ingresa tu contraseña.";

                formularioValido =
                    false;
            }


            if (!formularioValido) {

                return;
            }


            /* =====================================
               USUARIOS
            ====================================== */

            const usuarios =
                JSON.parse(
                    localStorage.getItem(
                        "usuarios"
                    )
                ) || [];


            /* =====================================
               BUSCAR USUARIO
            ====================================== */

            const usuarioEncontrado =
                usuarios.find(
                    function (usuario) {

                        return (
                            usuario.correo &&
                            usuario.correo.toLowerCase() ===
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


            /* =====================================
               GUARDAR USUARIO ACTIVO
            ====================================== */

            const usuarioActivo = {

                id:
                    usuarioEncontrado.id,

                nombre:
                    usuarioEncontrado.nombre,

                apellido:
                    usuarioEncontrado.apellido ||
                    usuarioEncontrado.apellidos ||
                    "",

                correo:
                    usuarioEncontrado.correo,

                rol:
                    usuarioEncontrado.rol ||
                    "cliente"
            };


            localStorage.setItem(
                "usuarioActivo",
                JSON.stringify(
                    usuarioActivo
                )
            );


            /* =====================================
               REDIRECCIÓN SEGÚN ROL
            ====================================== */

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
        }
    );
}