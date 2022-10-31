<?php
header("Access-Control-Allow-Origin: *");
require '../../../prg/vendor/autoload.php';
use Medoo\Medoo;
$username=$_POST["username"];
$password=$_POST["password"];

$database = new Medoo([	
	'type' => 'mysql',
	'host' => 'localhost',
	'database' => 'k8s_users',
	'username' => 'root',
	'password' => 'dic2727175',
    'charset' => 'utf8'
]);

$date=array();
$key="dic@ksu!2050014&";
$enpassword=openssl_encrypt($password,'des-cbc',$key);

$data=$database->query("select * from `k8s_userdb`")->fetchAll();
foreach ($data as $value) {

        echo  $value['year'] ."\n";
}
//echo json_encode($data);

?> 