<?php
session_start();
$conn=null;
include 'conn.php';


$sql = "SELECT personal.*, DATE_FORMAT(timestamp, \"%d %M %Y\") koha_regj FROM personal where role=2 and status=1";
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