<?php
session_start();
$conn = null;
include 'conn.php';

for($i=1; $i < 15; $i++)
{
    for($j=1; $j <= $_POST['day_'.$i]; $j++) {
        $sql = "INSERT INTO programi_stervitor(id_personal, id_paketa, id_ushtrim, reps, koha, sete, pesha, dita, nr) 
        VALUES (".$_POST['id_personal'].", ".$_POST['id_paketa'].", '".$_POST['ush_'.$i.'_'.$j]."', 
        '".$_POST['rep_'.$i.'_'.$j]."', '".$_POST['koh_'.$i.'_'.$j]."', '".$_POST['set_'.$i.'_'.$j]."', 
        '".$_POST['pesh_'.$i.'_'.$j]."', ".$i.", ".$j.")";

        if ($conn->query($sql) === TRUE) {
            //echo json_encode(array("status" => "true"));
        } else {
           // echo json_encode(array("status" => "false"));
        }
    }
}

echo json_encode(array("status" => "true"));
?>