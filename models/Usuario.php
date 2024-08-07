<?php
require_once 'Conexion.php';

class Usuarios extends Conexion
{
    public $usuario_id;
    public $usuario_nombre;
    public $usuario_codigo_pais;
    public $usuario_telefono;
    public $usuario_correo;



    public function __construct($args = [])
    {
        $this->usuario_id = $args['usuario_id'] ?? NULL;
        $this->usuario_nombre = $args['usuario_nombre'] ?? '';
        $this->usuario_codigo_pais = $args['usuario_codigo_pais'] ?? '';
        $this->usuario_telefono = $args['usuario_telefono'] ?? '';
        $this->usuario_correo = $args['usuario_correo'] ?? '';

    }

    // INSERTAR
    public function guardar()
    {
        $sql = "INSERT INTO usuarios (usuario_nombre, usuario_codigo_pais, usuario_telefono, usuario_correo) values ('$this->usuario_nombre', '$this->usuario_codigo_pais', '$this->usuario_telefono', '$this->usuario_correo')";
        $resultado = $this->ejecutar($sql);
        return $resultado;
    }



    public function buscar()
    {

        $sql = "SELECT * FROM usuarios ";
        

        if ($this->usuario_nombre != '') {
            $sql .= " and usuario_nombre like '%$this->usuario_nombre%' ";
        }

        if ($this->usuario_codigo_pais != '') {
            $sql .= " and usuario_codigo_pais like '%$this->usuario_codigo_pais%' ";
        }

        if ($this->usuario_telefono != '') {
            $sql .= " and usuario_telefono like '%$this->usuario_telefono%' ";
        }

        if ($this->usuario_correo != '') {
            $sql .= " and usuario_correo like '%$this->usuario_correo%' ";
        }

        $resultado = self::servir($sql);
        return $resultado;
    }

}