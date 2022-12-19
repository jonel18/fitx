<?php
session_start();
$conn = null;
include 'conn.php';

$sql = "SELECT * from ushtrimet where status = 1 and id=".$_POST['id'];
$result = $conn->query($sql);


if ($result->num_rows > 0) {
    echo json_encode($result->fetch_assoc());
}
else {
    echo json_encode(array("success" => "false"));
}

?>