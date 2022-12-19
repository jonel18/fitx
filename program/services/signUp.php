<?php
session_start();
$conn = null;
include 'conn.php';
checkEmail($_POST['email'], $conn);

function checkEmail($email, $conn)
{
    $sql = "SELECT id, emri, mbiemri FROM personal WHERE email = '".$email."'" ;
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            echo json_encode(array("status" => "0"));
        }
    } else {
        addUser($conn);
    }
}

function addUser($conn)
{
    $sql = "INSERT INTO personal(email, emri, mbiemri, ditelindja, celular, fjalekalimi, gjinia) 
            VALUES ('".$_POST['email']."', '".$_POST['emri']."', '".$_POST['mbiemri']."', '".$_POST['ditelindja']."', '".$_POST['celular']."', '".md5($_POST['pass'])."', '".$_POST['gjinia']."')";

    if ($conn->query($sql) === TRUE) {
        $last_id = $conn->insert_id;
        echo json_encode(array("status" => "1", "id" => $last_id));
    } else {
        echo json_encode(array("status" => "3"));
    }
    setSessions($last_id);
}

function setSessions($last_id)
{
    $_SESSION['emri'] = $_POST['emri'];
    $_SESSION['mbiemri'] = $_POST['mbiemri'];
    $_SESSION['email'] = $_POST['email'];
    $_SESSION['user_id'] = $last_id;
}
?>