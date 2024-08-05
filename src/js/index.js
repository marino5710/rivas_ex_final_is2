const btnGuardar = document.getElementById('btnGuardar')
const btnModificar = document.getElementById('btnModificar')
const btnEliminar = document.getElementById('btnEliminar')
const btnBuscar = document.getElementById('btnBuscar')
const btnCancelar = document.getElementById('btnCancelar')
const btnLimpiar = document.getElementById('btnLimpiar')
const tablaClientes = document.getElementById('tablaClientes')
const formulario = document.querySelector('form')

btnModificar.parentElement.style.display = 'none'
btnCancelar.parentElement.style.display = 'none'

const getClientes = async (alerta = 'si') => {
    const empresa = formulario.cli_nombre_empresa.value.trim()
    const contacto = formulario.cli_nombre_contacto.value.trim()
    const telefono = formulario.cli_telefono.value.trim()
    const correo = formulario.cli_correo.value.trim()
    const direccion = formulario.cli_direccion.value.trim()
    const tipo = formulario.cli_tipo.value.trim()
    const url = `/RIVAS_SEGURIDAD/controllers/clientes/index.php?cli_nombre_empresa=${empresa}&cli_nombre_contacto=${contacto}&cli_telefono=${telefono}&cli_correo=${correo}&cli_direccion=${direccion}&cli_tipo=${tipo}`
    const config = {
        method: 'GET'
    }

    try {
        const respuesta = await fetch(url, config);
        const data = await respuesta.json();
        console.log(data);

        tablaClientes.tBodies[0].innerHTML = ''
        const fragment = document.createDocumentFragment()
        let contador = 1;

        if (respuesta.status == 200) {

            if(alerta == 'si'){

                Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    icon: "success",
                    title: 'Clientes Encontrados',
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                }).fire();
            }

            if (data.length > 0) {
                data.forEach(cliente => {
                    const tr = document.createElement('tr')
                    const celda1 = document.createElement('td')
                    const celda2 = document.createElement('td')
                    const celda3 = document.createElement('td')
                    const celda4 = document.createElement('td')
                    const celda5 = document.createElement('td')
                    const celda6 = document.createElement('td')
                    const celda7 = document.createElement('td')
                    const celda8 = document.createElement('td')
                    const celda9 = document.createElement('td')
                    const buttonModificar = document.createElement('button')
                    const buttonEliminar = document.createElement('button')

                    celda1.innerText = contador;
                    celda2.innerText = cliente.cli_nombre_empresa;
                    celda3.innerText = cliente.cli_nombre_contacto;
                    celda4.innerText = cliente.cli_telefono;
                    celda5.innerText = cliente.cli_correo;
                    celda6.innerText = cliente.cli_direccion;
                    celda7.innerText = cliente.cli_tipo;

                    buttonModificar.textContent = 'Modificar'
                    buttonModificar.classList.add('btn', 'btn-warning', 'w-100')
                    buttonModificar.addEventListener('click', () => llenardatos(cliente))


                    buttonEliminar.textContent = 'Eliminar';
                    buttonEliminar.classList.add('btn', 'btn-danger', 'w-100');
                    buttonEliminar.addEventListener('click', () => eliminarCliente(cliente.cli_id));

                    celda8.appendChild(buttonModificar)
                    celda9.appendChild(buttonEliminar)

                    tr.appendChild(celda1)
                    tr.appendChild(celda2)
                    tr.appendChild(celda3)
                    tr.appendChild(celda4)
                    tr.appendChild(celda5)
                    tr.appendChild(celda6)
                    tr.appendChild(celda7)
                    tr.appendChild(celda8)
                    tr.appendChild(celda9)
                    fragment.appendChild(tr);

                    contador++
                });

            } else {
                const tr = document.createElement('tr')
                const td = document.createElement('td')
                td.innerText = 'No hay Empleado Disponibles'
                td.colSpan = 9;

                tr.appendChild(td)
                fragment.appendChild(tr)
            }
        } else {
            console.log('NO FUCCIA');
        }

        tablaClientes.tBodies[0].appendChild(fragment)
    } catch (error) {
        console.log(error);
    }
}



const guardarCliente = async (e) => {
    e.preventDefault();
    btnGuardar.disabled = true;
    const url = '/RIVAS_SEGURIDAD/controllers/clientes/index.php'
    const formData = new FormData(formulario)
    formData.append('tipo', 1)
    formData.delete('cli_id')
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
            getClientes(alerta = 'si');
            formulario.reset();
        } else {
            console.log(detalle);
        }

    } catch (error) {
        console.log(error);
    }
    btnGuardar.disabled = false;
}

const llenardatos = (cliente) => {
    formulario.cli_id = cliente.cli_id
    formulario.cli_nombre_empresa.value = cliente.cli_nombre_empresa
    formulario.cli_nombre_contacto.value = cliente.cli_nombre_contacto
    formulario.cli_telefono.value = cliente.cli_telefono
    formulario.cli_correo.value = cliente.cli_correo
    formulario.cli_direccion.value = cliente.cli_direccion
    formulario.cli_tipo.value = cliente.cli_tipo
    btnGuardar.parentElement.style.display = 'none'
    btnBuscar.parentElement.style.display = 'none'
    btnLimpiar.parentElement.style.display = 'none'
    btnModificar.parentElement.style.display = ''
    btnCancelar.parentElement.style.display = ''
}


    formulario.cli_id = ''
    formulario.cli_nombre_empresa.value = ''
    formulario.cli_nombre_contacto.value = ''
    formulario.cli_telefono.value = ''
    formulario.cli_correo.value = ''
    formulario.cli_direccion.value = ''
    formulario.cli_tipo.value = ''

const cancelar = () => {
    formulario.cli_id = ''
    formulario.cli_nombre_empresa.value = ''
    formulario.cli_nombre_contacto.value = ''
    formulario.cli_telefono.value = ''
    formulario.cli_correo.value = ''
    formulario.cli_direccion.value = ''
    formulario.cli_tipo.value = ''
    btnGuardar.parentElement.style.display = ''
    btnBuscar.parentElement.style.display = ''
    btnLimpiar.parentElement.style.display = ''
    btnModificar.parentElement.style.display = 'none'
    btnCancelar.parentElement.style.display = 'none'
}

const modificar = async (e) => {
    e.preventDefault();
    btnModificar.disabled = true;
    const url = '/RIVAS_SEGURIDAD/controllers/clientes/index.php';
    const formData = new FormData(formulario);
    formData.append('tipo', 2);
    formData.append('cli_id', formulario.cli_id);
    const config = {
        method: 'POST',
        body: formData
    };

    try {
        console.log('Enviando datos:', ...formData.entries());
        const respuesta = await fetch(url, config);
        const data = await respuesta.json();
        console.log('Respuesta recibida:', data);
        const { mensaje, codigo, detalle } = data;
        if (respuesta.ok && codigo === 1) {
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
            formulario.reset()
            getClientes(alerta = 'no');
            btnBuscar.parentElement.style.display = ''
            btnGuardar.parentElement.style.display = ''
            btnLimpiar.parentElement.style.display = ''
            btnModificar.parentElement.style.display = 'none'
            btnCancelar.parentElement.style.display = 'none'

        } else {
            console.log('Error:', detalle);
            Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                icon: "error",
                title: 'Error al guardar',
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            }).fire();
        }
    } catch (error) {
        console.log('Error de conexión:', error);
        Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: "error",
            title: 'Error de conexión',
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        }).fire();
    }

    btnModificar.disabled = false;
    btnCancelar.disabled = false;


}


const eliminarCliente = async (cli_id) => {
    
    const url = '/RIVAS_SEGURIDAD/controllers/clientes/index.php';
    const formData = new FormData();
    formData.append('cli_id', cli_id);
    formData.append('tipo', 3);
    const config = {
        method: 'POST',
        body: formData
    };

    try {
        const respuesta = await fetch(url, config);
        const data = await respuesta.json();
        console.log('Respuesta recibida:', data);
        const { mensaje, codigo } = data;
        if (respuesta.ok && codigo === 1) {
            Swal.mixin({
                toast: true,
                position: "top-start",
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
            getClientes(alerta = 'no');
        } else {
            Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                icon: "error",
                title: 'Error al eliminar',
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            }).fire();
        }
    } catch (error) {
        console.log('Error de conexión:', error);
        Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: "error",
            title: 'Error de conexión',
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        }).fire();
    }
}


formulario.addEventListener('submit', guardarCliente)
btnBuscar.addEventListener('click', getClientes)
btnModificar.addEventListener('click', modificar)
btnCancelar.addEventListener('click', cancelar)
