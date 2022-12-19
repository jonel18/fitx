<?php
session_start();
$conn = null;
include 'conn.php';

function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}


$new_pass=generateRandomString();

$to = $_POST['forgot_email'];
$subject = "Aphrofit.com";
$txt = "<html><body>Pershendetje, <br> Ky eshte nje email automatik. Ju lutem mos iu pergjigjni. <br> Ju kerkuat nje fjalekalim te ri: <br> <br>";
$txt = $txt."<b>Email: </b>".$_POST['forgot_email']." <br> <b>Fjalekalimi: </b> ".$new_pass." <br><br> Ju mund ta ndryshoni fjalekalimin perseri pasi te logoheni ne platforme. <br>";
$txt = $txt."Aphrofit.com </body> </html>";
$headers = "From: info@aphrofit.com";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

$update_sql = "UPDATE personal SET fjalekalimi = '".md5($new_pass)."' WHERE upper(email) = upper('".$_POST['forgot_email']."') and status=1";

if ($conn->query($update_sql) === TRUE) {
    echo json_encode(array("status" => "true"));
    mail($to,$subject,$txt,$headers);
}
?>