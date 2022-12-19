<?php
session_start();
$conn = null;
include 'conn.php';

$update_sql = "UPDATE personal SET fjalekalimi = '".md5($_POST['pass_ri'])."' 
               WHERE id =".$_POST['id']." and status=1 and fjalekalimi = '".md5($_POST['pass_vjeter'])."'";

//cho $update_sql;

// Perform queries and print out affected rows
$conn -> query("$update_sql");

if ( $conn -> affected_rows > 0) {
    echo json_encode(array("status" => "true"));
} 
elseif ($_POST['pass_vjeter'] == $_POST['pass_ri'])
{
    echo json_encode(array("status" => "false", "error" => "Fjalekalimi i ri eshte i njejte me te vjetrin!"));

}
else {
    echo json_encode(array("status" => "false", "error" => "Fjalekalimi i vjeter  nuk perputhet!"));
}

?>