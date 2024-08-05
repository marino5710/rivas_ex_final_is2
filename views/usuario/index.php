<?php include_once '../../includes/header.php' ?>

<h1>VALIDACIONES</h1>

<div class="row justify-content-center">
    <div class="row m-3">
        <div class="col m-3">
            <h1>Información del Usuario de GitHub</h1>
            <input type="text" id="usuario" placeholder="Ingresa el nombre de usuario de GitHub" />
            <button name="usuario" id="obtenerUsuarioBtn">Obtener Usuario</button>
            <div id="info-usuario"></div>
        </div>
    </div>
    <div class="row m-3">
        <div class="col m-3">
            <h1>Información del País</h1>
            <input type="text" id="nombre_pais" placeholder="Ingresa el nombre del país" />
            <button name="usuario" id="obtenerPaisBtn">Obtener Pais</button>
            <div id="info-pais"></div>
        </div>
    </div>
    <div class="row">
        <br>
    </div>




    <h1 class="text-center">FORMULARIO DE USUARIOS</h1>
    <div class="row justify-content-center">
        <form class="border bg-light shadow rounded p-2" id="usuarioForm">
            <div class="row">
                <div class="col">
                    <label for="usuario">USUARIO DE GITHUB</label>
                    <input type="text" name="usuario_nombre" id="usuario_nombre" class="form-control" readonly required>
                </div>
                <div class="col">
                    <label for="usuario_codigo_pais">CODIGO DEL PAIS</label>
                    <input type="text" name="usuario_codigo_pais" id="usuario_codigo_pais" class="form-control" readonly
                        required>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <label for="usuario_telefono">TELEFONO</label>
                    <input type="number" name="usuario_telefono" id="usuario_telefono" class="form-control" required>
                </div>
                <div class="col">
                    <label for="usuario_correo">CORREO</label>
                    <input type="email" name="usuario_correo" id="usuario_correo" class="form-control" required>
                </div>
            </div>
            <div class="row m-3">
            </div>
            <div class="row justify-content-center mb-3">
                <div class="col">
                    <button type="submit" id="btnGuardar" class="btn btn-success w-100">Guardar</button>
                </div>
                <div class="col">
                    <button type="button" id="btnBuscar" class="btn btn-info w-100">Buscar</button>
                </div>
            </div>
        </form>
    </div>
    <div class="row justify-content-center m-5">
        <div class="col-lg-12 table-responsive m-5">
            <h1 class="text-center">Listado de Usuarios</h1>
            <table class="table table-bordered table-hover" id="tablaUsuarios">
                <thead>
                    <tr>
                        <th>NO.</th>
                        <th>USUARIO GITHUB</th>
                        <th>CODIGO DEL PAIS</th>
                        <th>TELEFONO</th>
                        <th>CORREO</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="5">NO HAY USUARIOS DISPONIBLES</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <script defer src="/rivas_ex_final_is2/src/js/funciones.js"></script>
    <script defer src="/rivas_ex_final_is2/src/js/usuarios/index.js"></script>

    <?php include_once '../../includes/footer.php' ?>