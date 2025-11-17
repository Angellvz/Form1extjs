<?php
include("db.php");
$sql = "SELECT * FROM prueba.trabajador WHERE est_ado =  0 ORDER BY tra_ide";
$res = pg_query($con, $sql);

$data = [];
while($row = pg_fetch_assoc($res)){
    $data[] = $row;
}
echo json_encode([
    "success" => true,
    "data" => $data
]);
?>
