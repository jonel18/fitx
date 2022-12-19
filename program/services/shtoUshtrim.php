<?php
session_start();
$conn = null;
include 'conn.php';

if ($_FILES['video_u']['name']<>'')
{ // name of the uploaded file
    $foto_name = round(microtime(true) * 1000) . "_" . $_FILES['foto_u']['name'];

    // destination of the file on the server
    $destination_foto = '../ushtrimet/' . $foto_name;

    // the physical file on a temporary uploads directory on the server
    $file_foto = $_FILES['foto_u']['tmp_name'];

    // move the uploaded (temporary) file to the specified destination
    move_uploaded_file($file_foto, $destination_foto);
}
else {
    $foto_name='';
}

if ($_FILES['video_u']['name']<>'')
{ // name of the uploaded file
    $video_name = round(microtime(true) * 1000) . "_" . $_FILES['video_u']['name'];

    // destination of the file on the server
    $destination_video = '../ushtrimet/' . $video_name;

    // the physical file on a temporary uploads directory on the server
    $file_video = $_FILES['video_u']['tmp_name'];

    // move the uploaded (temporary) file to the specified destination
    move_uploaded_file($file_video, $destination_video);
}
else {
    $video_name='';
}

$sql = "INSERT INTO ushtrimet (emri, pershkrimi, foto, video) 
            VALUES ('".$_POST['emri_u']."', '".$_POST['pershkrimi_u']."', '".$foto_name."', '".$video_name."')";


if ($conn->query($sql) === TRUE) {
    echo json_encode(array("status" => "true"));
} else {
    echo json_encode(array("status" => "false"));
}
?>