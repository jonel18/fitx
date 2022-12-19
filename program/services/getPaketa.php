<?php
session_start();
$conn = null;
include 'conn.php';


    $sql = "SELECT paketa.*, 
            (select GROUP_CONCAT(komente) from komente where komente.id_pakete=paketa.id) as komente 
            from paketa where status <> 3 and id_personal= ".$_POST['userId'] ;
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        echo json_encode($result->fetch_assoc());
    }
    else {
        echo json_encode(array("success" => "false"));
    }

?>