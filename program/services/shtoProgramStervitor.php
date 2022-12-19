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

$update_sql = "UPDATE personal SET PS_A=PS_P, PS_P = 0  WHERE id = ".$_POST['id_personal'];
if ($conn->query($update_sql) === TRUE) {
    $email_sql = "SELECT email FROM personal WHERE id = ".$_POST['id_personal'];
    $email_result = $conn->query($email_sql);
    //echo "$sql";

    if ($email_result->num_rows > 0) {
        while($row = $email_result->fetch_assoc()) {
            $email="";
            $to = $email;
            $subject = "Program Stervitor";
            $txt = "<html><body>Pershendetje, <br> Ky eshte nje email automatik. Ju lutem mos iu pergjigjni. <br> Programi juaj stervitor eshte gati. 
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