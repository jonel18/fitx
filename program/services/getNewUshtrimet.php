<?php
session_start();
$conn=null;
include 'conn.php';


$sql = "SELECT u.id, u.emri, u.pershkrimi, case when u.foto <>'' then concat('<a href=\"../ushtrimet/', u.foto, '\">Shiko Foton </a>') 
else '' end as foto, case when u.video <>'' then concat('<a href=\"../ushtrimet/', u.video, '\">Shiko Videon </a>') else '' end as video 
FROM ushtrimet u where status=1";
$result = mysqli_query($conn, $sql);


while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

$results = ["sEcho" => 1,
    "iTotalRecords" => count($data),
    "iTotalDisplayRecords" => count($data),
    "aaData" => $data];

echo json_encode($results);
?>