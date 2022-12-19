<?php
session_start();
$conn=null;
include 'conn.php';
checkCredentials($conn);


function checkCredentials($conn)
{
    $sql = "SELECT id, emri, mbiemri, role FROM personal WHERE upper(email) = upper('".$_POST['email']."') and fjalekalimi = '".md5($_POST['pass'])."'" ;
    $result = $conn->query($sql);

    //echo "$sql";

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            setSessions($row['emri'], $row['mbiemri'], $row['id']);
            admin($row['role'], $row['id']);
        }
    } else {
        echo json_encode(array("success" => "false"));
    }
}


function admin($roli, $id)
{
    if ($roli == "1") {
        echo json_encode(array("admin" => "true", "trainer" => "false", "success" => "true"));
    }
    else if ($roli == "3") {
        echo json_encode(array("admin" => "false", "trainer" => "true", "success" => "true"));
    }
    else
    {
        echo json_encode(array("admin" => "false", "trainer" => "false", "success" => "true", "id" => $id));
    }

}

function setSessions($emri, $mbiemri, $id)
{
    $_SESSION['email'] = $_POST['email'];
    $_SESSION['emri'] = $emri;
    $_SESSION['mbiemri'] = $mbiemri;
    $_SESSION['user_id'] = $id;
}
?>