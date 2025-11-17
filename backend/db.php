<!-- Conexion de la bd -->
<?php
$host = "localhost";
$port = "5432";
$dbname = "prueba";
$user = "postgres";
$password = "234567";  

$con = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");

if(!$con){
    die(json_encode(["success" => false, "message" => "Error de conexión"]));
}
?>
