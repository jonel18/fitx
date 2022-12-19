<?php
session_start();
$conn = null;
include 'conn.php';

   /* $sql = "SELECT personal.*, (select COUNT(*) from paketa where personal.id=paketa.id_personal and paketa.status=1) paketa_pritje,
            (select COUNT(*) from paketa where personal.id=paketa.id_personal and paketa.status=2) paketa_aktive,
            (SELECT GROUP_CONCAT(paketa) from paketa where personal.id=paketa.id_personal and paketa.status in (1,2)) em_paketa
            FROM personal WHERE id = ".$_POST['userId'] ;*/
    $sql = "SELECT personal.*, DATE_FORMAT(timestamp, \"%d %M %Y\") koha_regj FROM personal WHERE id = ".$_POST['userId'] ;
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        echo json_encode($result->fetch_assoc());
    }

    
?>