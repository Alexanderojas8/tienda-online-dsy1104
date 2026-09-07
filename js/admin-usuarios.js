// ==========================================================
// ADMINISTRACIÓN DE USUARIOS
// ==========================================================


// ==========================================================
// REGIONES Y COMUNAS
// ==========================================================

const regionesComunas = {

    "Arica y Parinacota": [
        "Arica",
        "Camarones",
        "Putre",
        "General Lagos"
    ],

    "Tarapacá": [
        "Iquique",
        "Alto Hospicio",
        "Pozo Almonte",
        "Pica"
    ],

    "Antofagasta": [
        "Antofagasta",
        "Calama",
        "Tocopilla",
        "Mejillones"
    ],

    "Atacama": [
        "Copiapó",
        "Caldera",
        "Vallenar",
        "Chañaral"
    ],

    "Coquimbo": [
        "La Serena",
        "Coquimbo",
        "Ovalle",
        "Illapel"
    ],

    "Valparaíso": [
        "Valparaíso",
        "Viña del Mar",
        "Quilpué",
        "Villa Alemana",
        "Concón",
        "San Antonio"
    ],

    "Metropolitana de Santiago": [
        "Santiago",
        "San Joaquín",
        "La Florida",
        "La Cisterna",
        "Maipú",
        "Puente Alto",
        "Providencia",
        "Ñuñoa",
        "Las Condes",
        "Quilicura"
    ],

    "O'Higgins": [
        "Rancagua",
        "Machalí",
        "Rengo",
        "San Fernando",
        "Santa Cruz"
    ],

    "Maule": [
        "Talca",
        "Curicó",
        "Linares",
        "Cauquenes",
        "Constitución"
    ],

    "Ñuble": [
        "Chillán",
        "Chillán Viejo",
        "Bulnes",
        "San Carlos"
    ],

    "Biobío": [
        "Concepción",
        "Talcahuano",
        "San Pedro de la Paz",
        "Chiguayante",
        "Coronel",
        "Los Ángeles"
    ],

    "La Araucanía": [
        "Temuco",
        "Padre Las Casas",
        "Villarrica",
        "Pucón",
        "Angol"
    ],

    "Los Ríos": [
        "Valdivia",
        "La Unión",
        "Río Bueno",
        "Panguipulli"
    ],

    "Los Lagos": [
        "Puerto Montt",
        "Osorno",
        "Puerto Varas",
        "Castro",
        "Ancud"
    ],

    "Aysén": [
        "Coyhaique",
        "Puerto Aysén",
        "Chile Chico",
        "Cochrane"
    ],

    "Magallanes y Antártica Chilena": [
        "Punta Arenas",
        "Puerto Natales",
        "Porvenir",
        "San Gregorio"
    ]
};


// ==========================================================
// CONVERTIR REGIONES ANTIGUAS
// ==========================================================

function normalizarRegion(region) {

    if (!region) {
        return "";
    }

    const equivalencias = {

        metropolitana:
            "Metropolitana de Santiago",

        valparaiso:
            "Valparaíso",

        ohiggins:
            "O'Higgins",

        maule:
            "Maule",

        biobio:
            "Biobío"

    };


    return equivalencias[region] || region;
}


// ==========================================================
// NORMALIZAR RUN
// ==========================================================

function normalizarRunAdmin(run) {

    return (run || "")
        .replace(/\./g, "")
        .replace(/-/g, "")
        .trim()
        .toUpperCase();
}


// ==========================================================
// VALIDAR CORREO
// ==========================================================

function validarCorreoAdmin(correo) {

    const expresion =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return expresion.test(correo);
}


// ==========================================================
// VALIDAR CONTRASEÑA
// ==========================================================

function validarPasswordAdmin(password) {

    // Mínimo 8 caracteres,
    // al menos una letra y un número.

    const expresion =
        /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

    return expresion.test(password);
}


// ==========================================================
// CARGAR REGIONES
// ==========================================================

function cargarRegiones(selectRegion) {

    if (!selectRegion) {
        return;
    }


    selectRegion.innerHTML = `
        <option value="">
            Seleccione una región
        </option>
    `;


    Object.keys(
        regionesComunas
    ).forEach(
        function (nombreRegion) {

            const opcion =
                document.createElement(
                    "option"
                );

            opcion.value =
                nombreRegion;

            opcion.textContent =
                nombreRegion;

            selectRegion.appendChild(
                opcion
            );
        }
    );
}


// ==========================================================
// CARGAR COMUNAS
// ==========================================================

function cargarComunas(
    selectComuna,
    nombreRegion,
    comunaSeleccionada = ""
) {

    if (!selectComuna) {
        return;
    }


    selectComuna.innerHTML = `
        <option value="">
            Seleccione una comuna
        </option>
    `;


    const regionNormalizada =
        normalizarRegion(
            nombreRegion
        );


    if (
        !regionNormalizada ||
        !regionesComunas[
            regionNormalizada
        ]
    ) {

        selectComuna.disabled = true;

        return;
    }


    selectComuna.disabled = false;


    regionesComunas[
        regionNormalizada
    ].forEach(
        function (nombreComuna) {

            const opcion =
                document.createElement(
                    "option"
                );


            opcion.value =
                nombreComuna;

            opcion.textContent =
                nombreComuna;


            if (
                nombreComuna ===
                comunaSeleccionada
            ) {

                opcion.selected =
                    true;
            }


            selectComuna.appendChild(
                opcion
            );
        }
    );
}


// ==========================================================
// OBTENER USUARIOS
// ==========================================================

function obtenerUsuarios() {

    return (
        JSON.parse(
            localStorage.getItem(
                "usuarios"
            )
        ) || []
    );
}


// ==========================================================
// GUARDAR USUARIOS
// ==========================================================

function guardarUsuarios(
    usuarios
) {

    localStorage.setItem(
        "usuarios",
        JSON.stringify(
            usuarios
        )
    );
}


// ==========================================================
// LISTAR USUARIOS
// ==========================================================

function listarUsuariosAdmin() {

    // Compatible con ambos nombres utilizados anteriormente.

    const tablaUsuarios =
        document.getElementById(
            "tabla-usuarios"
        ) ||
        document.getElementById(
            "tablaUsuarios"
        );


    if (!tablaUsuarios) {
        return;
    }


    const usuarios =
        obtenerUsuarios();


    tablaUsuarios.innerHTML = "";


    const sinUsuarios =
        document.getElementById(
            "sin-usuarios"
        );


    if (
        usuarios.length === 0
    ) {

        if (sinUsuarios) {

            sinUsuarios
                .classList
                .remove("d-none");

        } else {

            tablaUsuarios.innerHTML = `

                <tr>

                    <td
                        colspan="7"
                        class="text-center text-muted py-4">

                        No hay usuarios registrados.

                    </td>

                </tr>
            `;
        }

        return;
    }


    if (sinUsuarios) {

        sinUsuarios
            .classList
            .add("d-none");
    }


    usuarios.forEach(
        function (
            usuario,
            index
        ) {

            const fila =
                document.createElement(
                    "tr"
                );


            // Usuarios antiguos:
            // apellidos
            //
            // Usuarios nuevos:
            // apellido

            const apellido =
                usuario.apellido ||
                usuario.apellidos ||
                "";


            const region =
                normalizarRegion(
                    usuario.region
                );


            fila.innerHTML = `

                <td>

                    <strong>
                        ${usuario.nombre || ""}
                        ${apellido}
                    </strong>

                </td>


                <td>
                    ${usuario.run || ""}
                </td>


                <td>
                    ${usuario.correo || ""}
                </td>


                <td>
                    ${region}
                </td>


                <td>
                    ${usuario.comuna || ""}
                </td>


                <td>

                    <span class="badge bg-secondary">

                        ${usuario.rol || "cliente"}

                    </span>

                </td>


                <td class="text-center">

                    <div
                        class="d-flex flex-wrap
                               justify-content-center
                               gap-2">

                        <a
                            href="usuario-editar.html?id=${index}"
                            class="btn btn-sm btn-outline-primary">

                            Editar

                        </a>


                        <button
                            type="button"
                            class="btn btn-sm btn-danger"
                            onclick="eliminarUsuario(${index})">

                            Eliminar

                        </button>

                    </div>

                </td>
            `;


            tablaUsuarios.appendChild(
                fila
            );
        }
    );
}


// ==========================================================
// ELIMINAR USUARIO
// ==========================================================

function eliminarUsuario(index) {

    const confirmar =
        confirm(
            "¿Estás seguro de que deseas eliminar este usuario?"
        );


    if (!confirmar) {
        return;
    }


    const usuarios =
        obtenerUsuarios();


    if (
        index < 0 ||
        index >= usuarios.length
    ) {

        alert(
            "Usuario no encontrado."
        );

        return;
    }


    usuarios.splice(
        index,
        1
    );


    guardarUsuarios(
        usuarios
    );


    alert(
        "Usuario eliminado correctamente."
    );


    listarUsuariosAdmin();
}


// ==========================================================
// NUEVO USUARIO
// REGIÓN Y COMUNA
// ==========================================================

const regionNuevo =
    document.getElementById(
        "region"
    );


const comunaNueva =
    document.getElementById(
        "comuna"
    );


if (
    regionNuevo &&
    comunaNueva
) {

    cargarRegiones(
        regionNuevo
    );


    comunaNueva.disabled =
        true;


    regionNuevo.addEventListener(
        "change",
        function () {

            cargarComunas(
                comunaNueva,
                regionNuevo.value
            );
        }
    );
}


// ==========================================================
// CREAR NUEVO USUARIO
// ==========================================================

const formNuevoUsuario =
    document.getElementById(
        "formNuevoUsuario"
    );


if (formNuevoUsuario) {

    formNuevoUsuario.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const run =
                document
                    .getElementById(
                        "run"
                    )
                    .value
                    .trim();


            const nombre =
                document
                    .getElementById(
                        "nombre"
                    )
                    .value
                    .trim();


            const apellidos =
                document
                    .getElementById(
                        "apellidos"
                    )
                    .value
                    .trim();


            const correo =
                document
                    .getElementById(
                        "correo"
                    )
                    .value
                    .trim()
                    .toLowerCase();


            const password =
                document
                    .getElementById(
                        "password"
                    )
                    .value;


            const region =
                document
                    .getElementById(
                        "region"
                    )
                    .value;


            const comuna =
                document
                    .getElementById(
                        "comuna"
                    )
                    .value;


            const direccion =
                document
                    .getElementById(
                        "direccion"
                    )
                    .value
                    .trim();


            // ==============================================
            // CAMPOS OBLIGATORIOS
            // ==============================================

            if (
                !run ||
                !nombre ||
                !apellidos ||
                !correo ||
                !password ||
                !region ||
                !comuna ||
                !direccion
            ) {

                alert(
                    "Debes completar todos los campos."
                );

                return;
            }


            // ==============================================
            // RUN
            // ==============================================

            if (
                typeof validarRun ===
                    "function" &&
                !validarRun(run)
            ) {

                alert(
                    "El RUN ingresado no es válido."
                );

                return;
            }


            // ==============================================
            // NOMBRE
            // ==============================================

            if (
                nombre.length < 2 ||
                nombre.length > 50
            ) {

                alert(
                    "El nombre debe tener entre 2 y 50 caracteres."
                );

                return;
            }


            // ==============================================
            // APELLIDOS
            // ==============================================

            if (
                apellidos.length < 2 ||
                apellidos.length > 50
            ) {

                alert(
                    "Los apellidos deben tener entre 2 y 50 caracteres."
                );

                return;
            }


            // ==============================================
            // CORREO
            // ==============================================

            if (
                !validarCorreoAdmin(
                    correo
                )
            ) {

                alert(
                    "Ingresa un correo electrónico válido."
                );

                return;
            }


            // ==============================================
            // CONTRASEÑA
            // ==============================================

            if (
                !validarPasswordAdmin(
                    password
                )
            ) {

                alert(
                    "La contraseña debe tener al menos 8 caracteres, una letra y un número."
                );

                return;
            }


            const usuarios =
                obtenerUsuarios();


            const runNormalizado =
                normalizarRunAdmin(
                    run
                );


            // ==============================================
            // RUN DUPLICADO
            // ==============================================

            const runExiste =
                usuarios.some(
                    function (usuario) {

                        return (
                            normalizarRunAdmin(
                                usuario.run
                            ) ===
                            runNormalizado
                        );
                    }
                );


            if (runExiste) {

                alert(
                    "Ya existe un usuario con ese RUN."
                );

                return;
            }


            // ==============================================
            // CORREO DUPLICADO
            // ==============================================

            const correoExiste =
                usuarios.some(
                    function (usuario) {

                        return (
                            (
                                usuario.correo ||
                                ""
                            )
                                .toLowerCase() ===
                            correo
                        );
                    }
                );


            if (correoExiste) {

                alert(
                    "Ya existe un usuario con ese correo."
                );

                return;
            }


            // ==============================================
            // CREAR USUARIO
            // ==============================================

            const nuevoUsuario = {

                id:
                    Date.now(),

                run:
                    runNormalizado,

                nombre:
                    nombre,

                apellido:
                    apellidos,

                correo:
                    correo,

                password:
                    password,

                region:
                    region,

                comuna:
                    comuna,

                direccion:
                    direccion,

                rol:
                    "cliente"
            };


            usuarios.push(
                nuevoUsuario
            );


            guardarUsuarios(
                usuarios
            );


            alert(
                "Usuario creado correctamente."
            );


            window.location.href =
                "usuarios.html";
        }
    );
}


// ==========================================================
// EDITAR USUARIO
// ==========================================================

const formEditarUsuario =
    document.getElementById(
        "formEditarUsuario"
    );


if (formEditarUsuario) {

    const parametros =
        new URLSearchParams(
            window.location.search
        );


    const indexUsuario =
        Number(
            parametros.get("id")
        );


    const usuarios =
        obtenerUsuarios();


    // ======================================================
    // VALIDAR ÍNDICE
    // ======================================================

    if (
        !Number.isInteger(
            indexUsuario
        ) ||
        indexUsuario < 0 ||
        indexUsuario >=
            usuarios.length
    ) {

        alert(
            "Usuario no encontrado."
        );


        window.location.href =
            "usuarios.html";

    } else {


        const usuario =
            usuarios[
                indexUsuario
            ];


        // ==================================================
        // ELEMENTOS DEL FORMULARIO
        // ==================================================

        const runEditar =
            document.getElementById(
                "runEditar"
            );


        const nombreEditar =
            document.getElementById(
                "nombreEditar"
            );


        const apellidosEditar =
            document.getElementById(
                "apellidosEditar"
            );


        const correoEditar =
            document.getElementById(
                "correoEditar"
            );


        const passwordEditar =
            document.getElementById(
                "passwordEditar"
            );


        const regionEditar =
            document.getElementById(
                "regionEditar"
            );


        const comunaEditar =
            document.getElementById(
                "comunaEditar"
            );


        const direccionEditar =
            document.getElementById(
                "direccionEditar"
            );


        // ==================================================
        // CARGAR DATOS DEL USUARIO
        // ==================================================

        runEditar.value =
            usuario.run || "";


        nombreEditar.value =
            usuario.nombre || "";


        apellidosEditar.value =
            usuario.apellido ||
            usuario.apellidos ||
            "";


        correoEditar.value =
            usuario.correo || "";


        passwordEditar.value =
            usuario.password || "";


        direccionEditar.value =
            usuario.direccion || "";


        // ==================================================
        // CARGAR REGIONES
        // ==================================================

        cargarRegiones(
            regionEditar
        );


        const regionUsuario =
            normalizarRegion(
                usuario.region
            );


        regionEditar.value =
            regionUsuario;


        // ==================================================
        // CARGAR COMUNA ACTUAL
        // ==================================================

        cargarComunas(
            comunaEditar,
            regionUsuario,
            usuario.comuna || ""
        );


        // ==================================================
        // CAMBIAR COMUNAS AL CAMBIAR REGIÓN
        // ==================================================

        regionEditar.addEventListener(
            "change",
            function () {

                cargarComunas(
                    comunaEditar,
                    regionEditar.value
                );
            }
        );


        // ==================================================
        // GUARDAR CAMBIOS
        // ==================================================

        formEditarUsuario.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const run =
                    runEditar
                        .value
                        .trim();


                const nombre =
                    nombreEditar
                        .value
                        .trim();


                const apellidos =
                    apellidosEditar
                        .value
                        .trim();


                const correo =
                    correoEditar
                        .value
                        .trim()
                        .toLowerCase();


                const password =
                    passwordEditar
                        .value;


                const region =
                    regionEditar
                        .value;


                const comuna =
                    comunaEditar
                        .value;


                const direccion =
                    direccionEditar
                        .value
                        .trim();


                // ==========================================
                // CAMPOS OBLIGATORIOS
                // ==========================================

                if (
                    !run ||
                    !nombre ||
                    !apellidos ||
                    !correo ||
                    !password ||
                    !region ||
                    !comuna ||
                    !direccion
                ) {

                    alert(
                        "Debes completar todos los campos."
                    );

                    return;
                }


                // ==========================================
                // RUN
                // ==========================================

                if (
                    typeof validarRun ===
                        "function" &&
                    !validarRun(run)
                ) {

                    alert(
                        "El RUN ingresado no es válido."
                    );

                    return;
                }


                // ==========================================
                // NOMBRE
                // ==========================================

                if (
                    nombre.length < 2 ||
                    nombre.length > 50
                ) {

                    alert(
                        "El nombre debe tener entre 2 y 50 caracteres."
                    );

                    return;
                }


                // ==========================================
                // APELLIDOS
                // ==========================================

                if (
                    apellidos.length < 2 ||
                    apellidos.length > 50
                ) {

                    alert(
                        "Los apellidos deben tener entre 2 y 50 caracteres."
                    );

                    return;
                }


                // ==========================================
                // CORREO
                // ==========================================

                if (
                    !validarCorreoAdmin(
                        correo
                    )
                ) {

                    alert(
                        "Ingresa un correo electrónico válido."
                    );

                    return;
                }


                // ==========================================
                // CONTRASEÑA
                // ==========================================

                if (
                    !validarPasswordAdmin(
                        password
                    )
                ) {

                    alert(
                        "La contraseña debe tener al menos 8 caracteres, una letra y un número."
                    );

                    return;
                }


                const runNormalizado =
                    normalizarRunAdmin(
                        run
                    );


                // ==========================================
                // RUN DUPLICADO
                // ==========================================

                const runExiste =
                    usuarios.some(
                        function (
                            otroUsuario,
                            index
                        ) {

                            return (
                                index !==
                                    indexUsuario &&
                                normalizarRunAdmin(
                                    otroUsuario.run
                                ) ===
                                    runNormalizado
                            );
                        }
                    );


                if (runExiste) {

                    alert(
                        "Ya existe otro usuario con ese RUN."
                    );

                    return;
                }


                // ==========================================
                // CORREO DUPLICADO
                // ==========================================

                const correoExiste =
                    usuarios.some(
                        function (
                            otroUsuario,
                            index
                        ) {

                            return (
                                index !==
                                    indexUsuario &&
                                (
                                    otroUsuario.correo ||
                                    ""
                                )
                                    .toLowerCase() ===
                                    correo
                            );
                        }
                    );


                if (correoExiste) {

                    alert(
                        "Ya existe otro usuario con ese correo."
                    );

                    return;
                }


                // ==========================================
                // ACTUALIZAR USUARIO
                // ==========================================

                const usuarioActualizado = {

                    id:
                        usuario.id ||
                        Date.now(),

                    run:
                        runNormalizado,

                    nombre:
                        nombre,

                    apellido:
                        apellidos,

                    correo:
                        correo,

                    password:
                        password,

                    region:
                        region,

                    comuna:
                        comuna,

                    direccion:
                        direccion,

                    rol:
                        usuario.rol ||
                        "cliente"
                };


                usuarios[
                    indexUsuario
                ] =
                    usuarioActualizado;


                guardarUsuarios(
                    usuarios
                );


                // ==========================================
                // ACTUALIZAR USUARIO ACTIVO
                // ==========================================

                const usuarioActivo =
                    JSON.parse(
                        localStorage.getItem(
                            "usuarioActivo"
                        )
                    );


                if (usuarioActivo) {

                    const mismoUsuario =
                        (
                            usuarioActivo.id &&
                            usuario.id &&
                            usuarioActivo.id ===
                                usuario.id
                        ) ||
                        (
                            usuarioActivo.correo ===
                            usuario.correo
                        );


                    if (mismoUsuario) {

                        const nuevoUsuarioActivo = {

                            id:
                                usuarioActualizado.id,

                            nombre:
                                usuarioActualizado.nombre,

                            apellido:
                                usuarioActualizado.apellido,

                            correo:
                                usuarioActualizado.correo,

                            rol:
                                usuarioActualizado.rol
                        };


                        localStorage.setItem(
                            "usuarioActivo",
                            JSON.stringify(
                                nuevoUsuarioActivo
                            )
                        );
                    }
                }


                alert(
                    "Usuario actualizado correctamente."
                );


                window.location.href =
                    "usuarios.html";
            }
        );
    }
}


// ==========================================================
// INICIAR LISTADO
// ==========================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        listarUsuariosAdmin();

    }
);