<?php
session_start();
$conn = null;
include 'conn.php';

$sql = "SELECT r.id, r.id_personal, r.id_paketa, r.ora, r.pershkrim, r.koha_regj, r.dita, r.nr, case when foto is null then 0 else foto end foto 
        FROM regjim_ushqimor r WHERE id_personal=".$_POST['id_personal']." and id_paketa = ".$_POST['id_paketa']." and  r.status=1 order by dita, nr";
$result = $conn->query($sql);

while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

$results = $data;

echo json_encode($results);


?>