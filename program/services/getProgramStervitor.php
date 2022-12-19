<?php
session_start();
$conn = null;
include 'conn.php';

$sql = "SELECT p.id, p.id_personal, p.id_paketa, p.reps, p.koha, p.sete, p.pesha, p.koha_regj, p.dita, p.nr, u.id id_ushtrim, u.emri, u.pershkrimi, u.foto, u.video 
        FROM programi_stervitor p left join ushtrimet u on p.id_ushtrim=u.id WHERE id_personal=".$_POST['id_personal']." and id_paketa = ".$_POST['id_paketa']." and  p.status=1 order by dita, nr";
$result = $conn->query($sql);

while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}
 
$results = $data;

echo json_encode($results);

?>