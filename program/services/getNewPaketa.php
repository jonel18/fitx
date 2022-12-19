<?php
session_start();
$conn=null;
include 'conn.php';


$sql = "SELECT paketa.id, paketa.id_personal, personal.emri, personal.mbiemri, personal.email, paketa.paketa, paketa.timestamp, paketa.paketa as emer_pakete
        FROM paketa, personal where paketa.id_personal=personal.id and (personal.PS_P=paketa.id or personal.RU_P=paketa.id)" ;
$result = mysqli_query($conn, $sql);


while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

$results = ["sEcho" => 1,
    "iTotalRecords" => count($data),
    "iTotalDisplayRecords" => count($data),
    "aaData" => $data];

echo json_encode($results);
?>