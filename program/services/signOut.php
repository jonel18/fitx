<?php
session_start();
unset($_SESSION['emri']);
unset($_SESSION['mbiemri']);
unset($_SESSION['email']);
session_destroy();