<?php
session_start();
$conn = null;
include 'conn.php';

$update_sql = "UPDATE ushtrimet set status=0 where id = ".$_POST['ushtrim_id'];

$conn -> query("$update_sql");

if ( $conn -> affected_rows > 0) {
    echo json_encode(array("status" => "true"));
}
else
{
    echo json_encode(array("status" => "false"));

}

?>