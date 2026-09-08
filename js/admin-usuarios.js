// ==========================================================
// ADMINISTRACIÓN DE USUARIOS CON BACKEND
// ==========================================================

const API_USUARIOS_ADMIN =
    "http://localhost:3000/api/usuarios";


// ==========================================================
// REGIONES Y COMUNAS
// ==========================================================

const regionesComunas = {

    "Arica y Parinacota": [
        "Arica", "Camarones", "Putre", "General Lagos"
    ],

    "Tarapacá": [
        "Iquique", "Alto Hospicio", "Pozo Almonte", "Pica"
    ],

    "Antofagasta": [
        "Antofagasta", "Calama", "Tocopilla", "Mejillones"
    ],

    "Atacama": [
        "Copiapó", "Caldera", "Vallenar", "Chañaral"
    ],

    "Coquimbo": [
        "La Serena", "Coquimbo", "Ovalle", "Illapel"
    ],

    "Valparaíso": [
        "Valparaíso", "Viña del Mar", "Quilpué",
        "Villa Alemana", "Concón", "San Antonio"
    ],

    "Metropolitana de Santiago": [
        "Santiago", "San Joaquín", "La Florida",
        "La Cisterna", "Maipú", "Puente Alto",
        "Providencia", "Ñuñoa", "Las Condes", "Quilicura"
    ],

    "O'Higgins": [
        "Rancagua", "Machalí", "Rengo",
        "San Fernando", "Santa Cruz"
    ],

    "Maule": [
        "Talca", "Curicó", "Linares",
        "Cauquenes", "Constitución"
    ],

    "Ñuble": [
        "Chillán", "Chillán Viejo", "Bulnes", "San Carlos"
    ],

    "Biobío": [
        "Concepción", "Talcahuano", "San Pedro de la Paz",
        "Chiguayante", "Coronel", "Los Ángeles"
    ],

    "La Araucanía": [
        "Temuco", "Padre Las Casas",
        "Villarrica", "Pucón", "Angol"
    ],

    "Los Ríos": [
        "Valdivia", "La Unión", "Río Bueno", "Panguipulli"
    ],

    "Los Lagos": [
        "Puerto Montt", "Osorno", "Puerto Varas",
        "Castro", "Ancud"
    ],

    "Aysén": [
        "Coyhaique", "Puerto Aysén",
        "Chile Chico", "Cochrane"
    ],

    "Magallanes y Antártica Chilena": [
        "Punta Arenas", "Puerto Natales",
        "Porvenir", "San Gregorio"
    ]
};


// ==========================================================
// FUNCIONES AUXILIARES
// ==========================================================

function normalizarRegion(region) {

    const equivalencias = {
        metropolitana: "Metropolitana de Santiago",
        valparaiso: "Valparaíso",
        ohiggins: "O'Higgins",
        maule: "Maule",
        biobio: "Biobío"
    };

    return equivalencias[region] || region || "";
}


function normalizarRunAdmin(run) {

    return (run || "")
        .replace(/\./g, "")
        .replace(/-/g, "")
        .trim()
        .toUpperCase();
}


function validarCorreoAdmin(correo) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(correo);
}


function validarPasswordAdmin(password) {

    return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/
        .test(password);
}


// ==========================================================
// REGIONES
// ==========================================================

function cargarRegiones(selectRegion) {

    if (!selectRegion) return;

    selectRegion.innerHTML =
        '<option value="">Seleccione una región</option>';

    Object.keys(regionesComunas)
        .forEach(function (region) {

            const opcion =
                document.createElement("option");

            opcion.value = region;
            opcion.textContent = region;

            selectRegion.appendChild(opcion);
        });
}


function cargarComunas(
    selectComuna,
    region,
    seleccionada = ""
) {

    if (!selectComuna) return;

    selectComuna.innerHTML =
        '<option value="">Seleccione una comuna</option>';

    const regionNormalizada =
        normalizarRegion(region);

    if (
        !regionNormalizada ||
        !regionesComunas[regionNormalizada]
    ) {

        selectComuna.disabled = true;
        return;
    }

    selectComuna.disabled = false;

    regionesComunas[regionNormalizada]
        .forEach(function (comuna) {

            const opcion =
                document.createElement("option");

            opcion.value = comuna;
            opcion.textContent = comuna;

            if (comuna === seleccionada) {
                opcion.selected = true;
            }

            selectComuna.appendChild(opcion);
        });
}


// ==========================================================
// LISTAR USUARIOS DESDE BACKEND
// ==========================================================

async function listarUsuariosAdmin() {

    const tablaUsuarios =
        document.getElementById("tabla-usuarios") ||
        document.getElementById("tablaUsuarios");

    if (!tablaUsuarios) return;

    try {

        const respuesta =
            await fetch(API_USUARIOS_ADMIN);

        if (!respuesta.ok) {
            throw new Error("Error al obtener usuarios");
        }

        const usuarios =
            await respuesta.json();

        tablaUsuarios.innerHTML = "";

        const sinUsuarios =
            document.getElementById("sin-usuarios");

        if (usuarios.length === 0) {

            if (sinUsuarios) {

                sinUsuarios.classList.remove("d-none");

            } else {

                tablaUsuarios.innerHTML = `
                    <tr>
                        <td colspan="7"
                            class="text-center text-muted py-4">
                            No hay usuarios registrados.
                        </td>
                    </tr>
                `;
            }

            return;
        }

        if (sinUsuarios) {
            sinUsuarios.classList.add("d-none");
        }

        usuarios.forEach(function (usuario) {

            const fila =
                document.createElement("tr");

            const apellidos =
                usuario.apellidos ||
                usuario.apellido ||
                "";

            const region =
                normalizarRegion(usuario.region);

            const rol =
                usuario.tipoUsuario ||
                usuario.rol ||
                "Cliente";

            fila.innerHTML = `
                <td>
                    <strong>
                        ${usuario.nombre || ""} ${apellidos}
                    </strong>
                </td>

                <td>${usuario.run || ""}</td>

                <td>${usuario.correo || ""}</td>

                <td>${region}</td>

                <td>${usuario.comuna || ""}</td>

                <td>
                    <span class="badge bg-secondary">
                        ${rol}
                    </span>
                </td>

                <td class="text-center">
                    <div class="d-flex flex-wrap justify-content-center gap-2">

                        <a
                            href="usuario-editar.html?id=${usuario.id}"
                            class="btn btn-sm btn-outline-primary">
                            Editar
                        </a>

                        <button
                            type="button"
                            class="btn btn-sm btn-danger"
                            onclick="eliminarUsuario(${usuario.id})">
                            Eliminar
                        </button>

                    </div>
                </td>
            `;

            tablaUsuarios.appendChild(fila);
        });

    } catch (error) {

        console.error(error);

        tablaUsuarios.innerHTML = `
            <tr>
                <td colspan="7"
                    class="text-center text-danger py-4">
                    No se pudo conectar con el servidor.
                </td>
            </tr>
        `;
    }
}


// ==========================================================
// ELIMINAR USUARIO EN BACKEND
// ==========================================================

async function eliminarUsuario(id) {

    const confirmar =
        confirm(
            "¿Estás seguro de que deseas eliminar este usuario?"
        );

    if (!confirmar) return;

    try {

        const respuesta =
            await fetch(
                `${API_USUARIOS_ADMIN}/${id}`,
                {
                    method: "DELETE"
                }
            );

        const datos =
            await respuesta.json();

        if (!respuesta.ok) {

            alert(
                datos.mensaje ||
                "No se pudo eliminar el usuario."
            );

            return;
        }

        alert(
            "Usuario eliminado correctamente."
        );

        listarUsuariosAdmin();

    } catch (error) {

        console.error(error);

        alert(
            "No se pudo conectar con el servidor."
        );
    }
}


// ==========================================================
// NUEVO USUARIO - REGIÓN Y COMUNA
// ==========================================================

const regionNuevo =
    document.getElementById("region");

const comunaNueva =
    document.getElementById("comuna");


if (regionNuevo && comunaNueva) {

    cargarRegiones(regionNuevo);

    comunaNueva.disabled = true;

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
// CREAR USUARIO EN BACKEND
// ==========================================================

const formNuevoUsuario =
    document.getElementById("formNuevoUsuario");


if (formNuevoUsuario) {

    formNuevoUsuario.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const run =
                document.getElementById("run")
                    .value.trim();

            const nombre =
                document.getElementById("nombre")
                    .value.trim();

            const apellidos =
                document.getElementById("apellidos")
                    .value.trim();

            const correo =
                document.getElementById("correo")
                    .value.trim()
                    .toLowerCase();

            const password =
                document.getElementById("password")
                    .value;

            const region =
                document.getElementById("region")
                    .value;

            const comuna =
                document.getElementById("comuna")
                    .value;

            const direccion =
                document.getElementById("direccion")
                    .value.trim();


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


            if (
                typeof validarRun === "function" &&
                !validarRun(run)
            ) {

                alert(
                    "El RUN ingresado no es válido."
                );

                return;
            }


            if (
                nombre.length < 2 ||
                nombre.length > 50
            ) {

                alert(
                    "El nombre debe tener entre 2 y 50 caracteres."
                );

                return;
            }


            if (
                apellidos.length < 2 ||
                apellidos.length > 50
            ) {

                alert(
                    "Los apellidos deben tener entre 2 y 50 caracteres."
                );

                return;
            }


            if (!validarCorreoAdmin(correo)) {

                alert(
                    "Ingresa un correo electrónico válido."
                );

                return;
            }


            if (!validarPasswordAdmin(password)) {

                alert(
                    "La contraseña debe tener al menos 8 caracteres, una letra y un número."
                );

                return;
            }


            const nuevoUsuario = {

                run:
                    normalizarRunAdmin(run),

                nombre:
                    nombre,

                apellidos:
                    apellidos,

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
                    direccion
            };


            try {

                const respuesta =
                    await fetch(
                        API_USUARIOS_ADMIN,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(
                                    nuevoUsuario
                                )
                        }
                    );


                const datos =
                    await respuesta.json();


                if (!respuesta.ok) {

                    alert(
                        datos.mensaje ||
                        "No se pudo crear el usuario."
                    );

                    return;
                }


                alert(
                    "Usuario creado correctamente."
                );


                window.location.href =
                    "usuarios.html";


            } catch (error) {

                console.error(error);

                alert(
                    "No se pudo conectar con el servidor."
                );
            }
        }
    );
}


// ==========================================================
// EDITAR USUARIO DESDE BACKEND
// ==========================================================

const formEditarUsuario =
    document.getElementById("formEditarUsuario");


if (formEditarUsuario) {

    const parametros =
        new URLSearchParams(
            window.location.search
        );

    const idUsuario =
        parametros.get("id");


    async function cargarUsuarioEditar() {

        if (!idUsuario) {

            alert("Usuario no encontrado.");

            window.location.href =
                "usuarios.html";

            return;
        }


        try {

            const respuesta =
                await fetch(
                    `${API_USUARIOS_ADMIN}/${idUsuario}`
                );


            if (!respuesta.ok) {

                alert("Usuario no encontrado.");

                window.location.href =
                    "usuarios.html";

                return;
            }


            const usuario =
                await respuesta.json();


            const runEditar =
                document.getElementById("runEditar");

            const nombreEditar =
                document.getElementById("nombreEditar");

            const apellidosEditar =
                document.getElementById("apellidosEditar");

            const correoEditar =
                document.getElementById("correoEditar");

            const passwordEditar =
                document.getElementById("passwordEditar");

            const regionEditar =
                document.getElementById("regionEditar");

            const comunaEditar =
                document.getElementById("comunaEditar");

            const direccionEditar =
                document.getElementById("direccionEditar");


            runEditar.value =
                usuario.run || "";

            nombreEditar.value =
                usuario.nombre || "";

            apellidosEditar.value =
                usuario.apellidos ||
                usuario.apellido ||
                "";

            correoEditar.value =
                usuario.correo || "";

            passwordEditar.value =
                usuario.password || "";

            direccionEditar.value =
                usuario.direccion || "";


            cargarRegiones(regionEditar);


            const regionUsuario =
                normalizarRegion(
                    usuario.region
                );


            regionEditar.value =
                regionUsuario;


            cargarComunas(
                comunaEditar,
                regionUsuario,
                usuario.comuna || ""
            );


            regionEditar.addEventListener(
                "change",
                function () {

                    cargarComunas(
                        comunaEditar,
                        regionEditar.value
                    );
                }
            );


            formEditarUsuario.addEventListener(
                "submit",
                async function (event) {

                    event.preventDefault();


                    const run =
                        runEditar.value.trim();

                    const nombre =
                        nombreEditar.value.trim();

                    const apellidos =
                        apellidosEditar.value.trim();

                    const correo =
                        correoEditar.value
                            .trim()
                            .toLowerCase();

                    const password =
                        passwordEditar.value;

                    const region =
                        regionEditar.value;

                    const comuna =
                        comunaEditar.value;

                    const direccion =
                        direccionEditar.value.trim();


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


                    if (
                        typeof validarRun === "function" &&
                        !validarRun(run)
                    ) {

                        alert(
                            "El RUN ingresado no es válido."
                        );

                        return;
                    }


                    if (!validarCorreoAdmin(correo)) {

                        alert(
                            "Ingresa un correo electrónico válido."
                        );

                        return;
                    }


                    if (!validarPasswordAdmin(password)) {

                        alert(
                            "La contraseña debe tener al menos 8 caracteres, una letra y un número."
                        );

                        return;
                    }


                    const usuarioActualizado = {

                        run:
                            normalizarRunAdmin(run),

                        nombre:
                            nombre,

                        apellidos:
                            apellidos,

                        correo:
                            correo,

                        password:
                            password,

                        tipoUsuario:
                            usuario.tipoUsuario ||
                            "Cliente",

                        region:
                            region,

                        comuna:
                            comuna,

                        direccion:
                            direccion
                    };


                    try {

                        const respuestaActualizar =
                            await fetch(
                                `${API_USUARIOS_ADMIN}/${idUsuario}`,
                                {
                                    method: "PUT",

                                    headers: {
                                        "Content-Type":
                                            "application/json"
                                    },

                                    body:
                                        JSON.stringify(
                                            usuarioActualizado
                                        )
                                }
                            );


                        const datos =
                            await respuestaActualizar.json();


                        if (!respuestaActualizar.ok) {

                            alert(
                                datos.mensaje ||
                                "No se pudo actualizar el usuario."
                            );

                            return;
                        }


                        // Actualizar sesión si se editó
                        // al usuario actualmente conectado.

                        const usuarioActivo =
                            JSON.parse(
                                localStorage.getItem(
                                    "usuarioActivo"
                                )
                            );


                        if (
                            usuarioActivo &&
                            String(usuarioActivo.id) ===
                            String(idUsuario)
                        ) {

                            localStorage.setItem(
                                "usuarioActivo",
                                JSON.stringify({
                                    id:
                                        datos.id ||
                                        usuario.id,

                                    nombre:
                                        nombre,

                                    apellido:
                                        apellidos,

                                    correo:
                                        correo,

                                    rol:
                                        (
                                            usuarioActualizado
                                                .tipoUsuario
                                                .toLowerCase() ===
                                            "administrador"
                                        )
                                            ? "admin"
                                            : "cliente"
                                })
                            );
                        }


                        alert(
                            "Usuario actualizado correctamente."
                        );


                        window.location.href =
                            "usuarios.html";


                    } catch (error) {

                        console.error(error);

                        alert(
                            "No se pudo conectar con el servidor."
                        );
                    }
                }
            );


        } catch (error) {

            console.error(error);

            alert(
                "No se pudo conectar con el servidor."
            );
        }
    }


    cargarUsuarioEditar();
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