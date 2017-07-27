<?php
$encoded_data = $_POST['mydata'];
$imgName_data = $_POST['imgname'];
$binary_data = base64_decode( $encoded_data );

 // save to server (beware of permissions)
$result = file_put_contents( "img/".$imgName_data, $binary_data );
if (!$result) die("Could not save image!  Check file permissions.");
?>