<?php
session_start();
$conn = null;
include 'conn.php';

$update_sql = "UPDATE paketa set status=3 where id = ".$_POST['id'];

$conn -> query("$update_sql");

if ( $conn -> affected_rows > 0) {
    echo json_encode(array("status" => "true"));
    $update_profile= "UPDATE personal set ".$_POST['paketa']."_A=0 where id=".$_POST['profile_id'];
    $conn -> query("$update_profile");
}
else
{
    echo json_encode(array("status" => "false"));

}
?>