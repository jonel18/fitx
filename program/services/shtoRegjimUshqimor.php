<?php
session_start();
$conn = null;
include 'conn.php';
if (isset($_POST['has_foto']))
{
    if ($_FILES['regjimi_foto']['name']<>'')
    { // name of the uploaded file
        $filename = round(microtime(true) * 1000) . "_" . $_FILES['regjimi_foto']['name'];

        // destination of the file on the server
        $destination = '../regjimiUshqimorFoto/' . $filename;

        // the physical file on a temporary uploads directory on the server
        $file = $_FILES['regjimi_foto']['tmp_name'];

        // move the uploaded (temporary) file to the specified destination
        move_uploaded_file($file, $destination);
    }
    else {
        $filename='';
    }
    $sql = "INSERT INTO regjim_ushqimor(id_personal, id_paketa, foto) 
        VALUES (" . $_POST['id_personal'] . ", " . $_POST['id_paketa'] . ", '".$filename."')";

    if ($conn->query($sql) === TRUE) {
        //echo json_encode(array("status" => "true"));
    } else {
        // echo json_encode(array("status" => "false"));
    }
}
else {
    for ($i = 1; $i < 15; $i++) {
        for ($j = 1; $j <= $_POST['day_' . $i]; $j++) {
            $sql = "INSERT INTO regjim_ushqimor(id_personal, id_paketa, ora, pershkrim, dita, nr) 
        VALUES (" . $_POST['id_personal'] . ", " . $_POST['id_paketa'] . ", '" . $_POST['ora_' . $i . '_' . $j] . "', '" . $_POST['per_' . $i . '_' . $j] . "', " . $i . ", " . $j . ")";

            if ($conn->query($sql) === TRUE) {
                //echo json_encode(array("status" => "true"));
            } else {
                // echo json_encode(array("status" => "false"));
            }
        }
    }
}

$update_sql = "UPDATE personal SET RU_A = RU_P, RU_P = 0 WHERE id = ".$_POST['id_personal'];
if ($conn->query($update_sql) === TRUE) {
    $email_sql = "SELECT email FROM personal WHERE id = ".$_POST['id_personal'];
    $email_result = $conn->query($email_sql);
    //echo "$sql";

    if ($email_result->num_rows > 0) {
        while($row = $email_result->fetch_assoc()) {
            $email="";
            $to = $email;
            $subject = "Regjim Ushqimor";
            $txt = "<html><body>Pershendetje, <br> Ky eshte nje email automatik. Ju lutem mos iu pergjigjni. <br> Regjimi juaj ushqimor eshte gati. 
                <br> Per me teper logohuni ne platformen Aphrofit<br> <br>";
            $txt = $txt."Aphrofit.com </body> </html>";
            $headers = "From: info@aphrofit.com"."\r\n";
            $headers .= "MIME-Version: 1.0\r\n";
            $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
            mail($to,$subject,$txt,$headers);
        }
    }
    echo json_encode(array("status" => "true"));
}
?>