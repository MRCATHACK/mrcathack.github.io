<?php $name = $_POST['name'];
$ip = $_SERVER['REMOTE_ADDR']; 
$email = $_POST['email'];
$message = $_POST['message'];
$formcontent="From: $name \n Message: $message";
$recipient = "root@mrcathack.github.io";
$subject = "Contact Form";
$mailheader = "From: $email \r\n";
$file = fopen('rapor.mrcathack', 'a'); 
if ( !file_exists("rapor.mrcathack")) { 
        touch("rapor.mrcathack"); 
fwrite($file, $name." < --- İsim / Mesajı --- > " .$message. "   Emaili: " .$email. "   İp: " .$ip.  "\n\n");
fclose($file); 
echo '';
header("Location: /index.html");
?>
