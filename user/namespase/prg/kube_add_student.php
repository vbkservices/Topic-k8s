<?php
header("Access-Control-Allow-Origin: *");
require '../../../prg/vendor/autoload.php';
use Medoo\Medoo;
$status=$_POST["status"];
$apikey = $_POST["apikey"];
$value=$_POST["value"];
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

	if($status== "select"){
		$data=$database->query("select distinct username from `k8s_userdb` where year = ".$value."")->fetchAll();
		echo json_encode($data) ."\n";
	}

	if($status== "value"){
		$username_count = $database->count("k8s_userdb", ["username" => "$value"]);
		if($username_count=="1"){
			$data_user = $database->select("k8s_userdb", [
				"username",
				"remark",
				"year",
			], [
				"username" => "$value"
			]);
			array_push($date,true,$data_user);
		}else{
			array_push($date,false);
		}

		echo json_encode($date) ."\n";
	}
}
/*
foreach ($data as $value) {
	    echo json_encode($value) ."\n";
}*/
//;

?> 