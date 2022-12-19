<?php
session_start();
$_SESSION['id']=session_id();
if (isset($_SESSION['emri']) &&  isset($_SESSION['mbiemri']) && isset($_SESSION['email']) && isset($_SESSION['user_id']) )
    {echo json_encode($_SESSION);}
else {
    echo json_encode(array("status" => "unset"));
}