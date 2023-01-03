<?php

header("Access-Control-Allow-Origin: *");
/*
require '../../prg/vendor/autoload.php';

use Medoo\Medoo;*/

require './mysql_config.php';
session_start();
$username=$_POST["username"];
$status=$_POST["status"];

$date=array();
$username_count = $database->count("k8s_userdb", ["username" => "$username"]);

//使用者狀態
if($status=="statususer"){
	if($username_count==1){
		$data_user = $database->select("k8s_userdb", [
			"name",
			"address",
			"remark",
			"year",
			"noidtime",
			"logintime",
			"status",
		], [
			"username" => "$username"
		]);
		if($data_user[0]["status"]==1){
			array_push($date,true,$data_user[0]);
			echo json_encode($date);
		}else{
			array_push($date,false,"帳號尚未認證");
			echo json_encode($date);
		}
	}else{
        array_push($date,false);
		echo json_encode($date);
	}
}




?>