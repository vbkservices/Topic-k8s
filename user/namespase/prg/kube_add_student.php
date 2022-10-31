<?php
header("Access-Control-Allow-Origin: *");
require '../../../prg/vendor/autoload.php';
use Medoo\Medoo;
$status=$_POST["status"];
$apikey = $_POST["apikey"];
$year=$_POST["year"];
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
$enapikey=openssl_decrypt($apikey,'des-cbc',$key);

if($enapikey == "2727175#356"){
	if($status== "status"){
		$data=$database->query("select distinct year from `k8s_userdb`")->fetchAll();
		echo json_encode($data) ."\n";
	}

	if($status== "student"){
		$data=$database->query("select distinct name from `k8s_userdb` where year = ".$year."")->fetchAll();
		echo json_encode($data) ."\n";
	}
}
/*
foreach ($data as $value) {
	    echo json_encode($value) ."\n";
}*/
//;

?> 