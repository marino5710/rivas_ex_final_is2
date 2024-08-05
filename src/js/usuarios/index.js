function obtenerUsuario() {
    const nombreUsuario = document.getElementById('usuario').value.trim();
    if (!nombreUsuario) {
        alert('Por favor ingresa un nombre de usuario de GitHub');
        return;
    }
    const url = `https://api.github.com/users/${nombreUsuario}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            if (datos.message === 'No encontrado') {
                document.getElementById('info-usuario').innerHTML = `<p>Usuario no encontrado.</p>`;
                return;
            }
            document.getElementById('info-usuario').innerHTML = `
                <h2>${datos.login}</h2>
            `;
            document.getElementById('usuario_nombre').value = datos.login;
        })
        .catch(error => {
            console.error('Error al obtener información del usuario de GitHub:', error);
        });
}

function obtenerPais() {
    const nombrePais = document.getElementById('nombre_pais').value.trim();
    if (!nombrePais) {
        alert('Por favor ingresa un nombre de país');
        return;
    }
    const url = `https://restcountries.com/v3.1/name/${nombrePais}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            if (datos.status === 404) {
                document.getElementById('info-pais').innerHTML = `<p>País no encontrado.</p>`;
                return;
            }
            const pais = datos[0];
            const codigoTelefono = pais.idd.root + (pais.idd.suffixes ? pais.idd.suffixes[0] : ''); // Código de teléfono
            document.getElementById('info-pais').innerHTML = `
                <p>Código de teléfono: ${codigoTelefono}</p>
                <img src="${pais.flags.png}" alt="Bandera de ${pais.name.common}" width="100" />
            `;
            document.getElementById('usuario_codigo_pais').value = codigoTelefono;
        })
        .catch(error => {
            console.error('Error al obtener datos del país:', error);
            document.getElementById('info-pais').innerHTML = `<p>Error al obtener datos del país.</p>`;
        });
}

document.getElementById('obtenerUsuarioBtn').addEventListener('click', obtenerUsuario);
document.getElementById('obtenerPaisBtn').addEventListener('click', obtenerPais);



const btnGuardar = document.getElementById('btnGuardar');
const btnBuscar = document.getElementById('btnBuscar');
const tablaUsuarios = document.getElementById('tablaUsuarios');
const formulario = document.querySelector('form');

btnGuardar.parentElement.style.display = '';
btnBuscar.parentElement.style.display = '';

const getUsuarios = async (alerta = 'si') => {
    const nombre = formulario.usuario_nombre.value.trim();
    const codigo = formulario.usuario_codigo_pais.value.trim();
    const telefono = formulario.usuario_telefono.value.trim();
    const correo = formulario.usuario_correo.value.trim();
    const url = `/rivas_ex_final_is2/controllers/usuario/index.php?usuario_nombre=${nombre}&usuario_codigo_pais=${codigo}&usuario_telefono=${telefono}&usuario_correo=${correo}`;
    const config = {
        method: 'GET'
    };

    try {
        const respuesta = await fetch(url, config);
        const data = await respuesta.json();
        console.log(data);

        tablaUsuarios.tBodies[0].innerHTML = '';
        const fragment = document.createDocumentFragment();
        let contador = 1;

        if (respuesta.status === 200) {
            if (alerta === 'si') {
                Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    icon: "success",
                    title: 'Usuarios Encontrados',
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                }).fire();
            }

            if (data.length > 0) {
                data.forEach(usuario => {
                    const tr = document.createElement('tr');
                    const celda1 = document.createElement('td');
                    const celda2 = document.createElement('td');
                    const celda3 = document.createElement('td');
                    const celda4 = document.createElement('td');
                    const celda5 = document.createElement('td');

                    celda1.innerText = contador;
                    celda2.innerText = usuario.usuario_nombre;
                    celda3.innerText = usuario.usuario_codigo_pais;
                    celda4.innerText = usuario.usuario_telefono;
                    celda5.innerText = usuario.usuario_correo;

                    tr.appendChild(celda1);
                    tr.appendChild(celda2);
                    tr.appendChild(celda3);
                    tr.appendChild(celda4);
                    tr.appendChild(celda5);
                    fragment.appendChild(tr);

                    contador++;
                });
            } else {
                const tr = document.createElement('tr');
                const td = document.createElement('td');
                td.innerText = 'No hay Usuarios Disponibles';
                td.colSpan = 5;

                tr.appendChild(td);
                fragment.appendChild(tr);
            }
        } else {
            console.log('NO FUCCIA');
        }

        tablaUsuarios.tBodies[0].appendChild(fragment);
    } catch (error) {
        console.log(error);
    }
}


const guardarUsuario = async (e) => {
    e.preventDefault();
    btnGuardar.disabled = true;
    const url = '/rivas_ex_final_is2/controllers/usuario/index.php'
    const formData = new FormData(formulario)
    formData.append('tipo', 1)
    formData.delete('usuario_id')
    const config = {
        method: 'POST',
        body: formData
    }

    try {
        const respuesta = await fetch(url, config);
        const data = await respuesta.json();
        const { mensaje, codigo, detalle } = data
        Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: "success",
            title: mensaje,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        }).fire();
        // alert(mensaje)

        if (codigo == 1 && respuesta.status == 200) {
            getUsuarios(alerta = 'si');
            formulario.reset();
        } else {
            console.log(detalle);
        }

    } catch (error) {
        console.log(error);
    }
    btnGuardar.disabled = false;
}

formulario.addEventListener('submit', guardarUsuario);
btnBuscar.addEventListener('click', getUsuarios);