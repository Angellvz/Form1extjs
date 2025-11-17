<?php
include("db.php");

$tra_ide = $_POST['tra_ide'];

$sql = "UPDATE prueba.trabajador SET est_ado = 1 WHERE tra_ide = $tra_ide";

$res = pg_query($con, $sql);

echo json_encode([
    "success" => $res ? true : false
]);
?>
