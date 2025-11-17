<?php
include("db.php");

$tra_ide = $_POST['tra_ide'];
$tra_cod = $_POST['tra_cod'];
$tra_nom = $_POST['tra_nom'];
$tra_pat = $_POST['tra_pat'];
$tra_mat = $_POST['tra_mat'];

if($tra_ide == "") {
    $sql = "INSERT INTO prueba.trabajador(tra_cod, tra_nom, tra_pat, tra_mat, est_ado)
            VALUES ($tra_cod, '$tra_nom', '$tra_pat', '$tra_mat', 0)";
} else {

    $sql = "UPDATE prueba.trabajador SET
            tra_cod=$tra_cod,
            tra_nom='$tra_nom',
            tra_pat='$tra_pat',
            tra_mat='$tra_mat'
            WHERE tra_ide=$tra_ide";
}

$res = pg_query($con, $sql);

echo json_encode([
    "success" => $res ? true : false
]);
?>
