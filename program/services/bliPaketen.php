<?php
session_start();
$conn = null;
include 'conn.php';

if ($_FILES['intoleranca']['name']<>'')
{ // name of the uploaded file
    $filename = round(microtime(true) * 1000) . "_" . $_FILES['intoleranca']['name'];

    // destination of the file on the server
    $destination = '../uploads/' . $filename;

    // the physical file on a temporary uploads directory on the server
    $file = $_FILES['intoleranca']['tmp_name'];

    // move the uploaded (temporary) file to the specified destination
    move_uploaded_file($file, $destination);
} 
else {
    $filename='';
}

$sql = "INSERT INTO paketa (id_personal, paketa, pesha, gjatesia, aktiv, stervitje, vendi_stervitjes, ore_stervitje, vrap, p_shendetesor, p_synimi, h_shendetesor, alergjite, kafe, gjaku, regjim, intoleranca, order_id) 
            VALUES ('".$_POST['id']."', '".$_POST['paketa']."', '".$_POST['pesha']."', '".$_POST['gjatesia']."', '".$_POST['aktiv']."', '".$_POST['stervitje']."', '".$_POST['vendi_stervitjes']."', 
            '".$_POST['ore_stervitje']."', '".$_POST['vrap']."', '".$_POST['p_shendetesor']."', '".$_POST['p_synimi']."', '".$_POST['h_shendetesor']."', '".$_POST['alergjite']."', '".$_POST['kafe']."', 
            '".$_POST['gjaku']."', '".$_POST['regjim']."', '".$filename."', '".$_POST['order_id']."')";

$result=$conn->query($sql);
if ($result === TRUE) {
    $last_id = $conn->insert_id;
    if ($_POST['paketa'] == "BOTH")
    {
        $update_sql = "UPDATE personal SET PS_P = ".$last_id.", RU_P =".$last_id." WHERE id = ".$_POST['id'];
    }
    elseif ($_POST['paketa'] == "PS")
    {
        $update_sql = "UPDATE personal SET PS_P = ".$last_id." WHERE id = ".$_POST['id'];
    }
    else
    {
        $update_sql = "UPDATE personal SET RU_P = ".$last_id." WHERE id = ".$_POST['id'];
    }
    if ($conn->query($update_sql) === TRUE) {
        $to = "";
        $subject = "Kerkese e re per pakete";
        $txt = "<html><body>Pershendetje, <br> Ky eshte nje email automatik. Ju lutem mos iu pergjigjni. <br> Ju keni nje kerkese te re per regjim ushqimor ose program stervitor. 
                <br> Per me teper logohuni ne platformen Aphrofit<br> <br>";
        $txt = $txt."Aphrofit.com </body> </html>";
        $headers = "From: info@aphrofit.com"."\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
        mail($to,$subject,$txt,$headers);

        $to = "";
        $subject = "Order Confirmation";
        $txt = "<html><body>Pershendetje, <br> Ky eshte nje email automatik. Ju lutem mos iu pergjigjni. <br> Ju keni nje kerkese te re per regjim ushqimor ose program stervitor. 
                <br> Faleminderit per blerjen ne Aphrofit!
                <br> Order ID: ".$_POST['order_id']." 
                <br> Per me teper logohuni ne platformen Aphrofit<br> <br>";
        $txt = $txt."Aphrofit.com </body> </html>";
        $headers = "From: info@aphrofit.com"."\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
        mail($to,$subject,$txt,$headers);

        $location = "../pages/dashboard.html?profile_id=".$_POST['id'];
        echo json_encode(array("status" => "true"));
        if ($_POST['order_id'] != 0) {
            echo "<script type='text/javascript'>window.top.location='../pages/dashboard.html?profile_id=".$_POST['id']."';</script>";
        }
        exit;
    }

} else {
    echo json_encode(array("status" => "false"));
}
?>