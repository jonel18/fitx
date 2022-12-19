<?php
session_start();
$conn = null;
include 'conn.php';

$sql = "SELECT id, emri text from ushtrimet where status = 1";
$result = $conn->query($sql);

while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

$results = ["results" => $data];

echo json_encode($results);

?>