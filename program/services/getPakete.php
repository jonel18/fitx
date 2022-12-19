<?php
session_start();
$conn = null;
include 'conn.php';

    $sql = "SELECT paketa.id id_paketa, paketa, pesha, gjatesia, aktiv, stervitje, vendi_stervitjes, ore_stervitje, vrap, p_shendetesor, p_synimi, h_shendetesor, alergjite, kafe, gjaku, intoleranca, regjim, personal.*, (select GROUP_CONCAT(komente) from komente where komente.id_pakete=paketa.id) as komente, DATE_FORMAT(personal.timestamp, \"%d %M %Y\") koha_regj, order_id from paketa inner JOIN personal on paketa.id_personal=personal.id where  concat(paketa.id, '_', paketa.paketa)='" .$_POST['id']."'" ;
   // echo $sql;
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        echo json_encode($result->fetch_assoc());
    }
    else {
        echo json_encode(array("success" => "false"));
    }

    
?>