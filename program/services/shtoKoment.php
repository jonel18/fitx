<?php
session_start();
$conn = null;
include 'conn.php';

$sql = "INSERT INTO komente (id_personal, id_pakete, komente) 
            VALUES ('".$_POST['id_personal']."', '".$_POST['id_paketa']."', '".$_POST['koment']."')";


if ($conn->query($sql) === TRUE) {
    echo json_encode(array("status" => "true"));
} else {
    echo json_encode(array("status" => "false"));
}
?>