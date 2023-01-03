<?php

header("Access-Control-Allow-Origin: *");
/*
require '../../prg/vendor/autoload.php';

use Medoo\Medoo;*/

require './mysql_config.php';

$name=$_POST["name"];
$username=$_POST["username"];
$password=$_POST["password"];
$address=$_POST["email"];
$year=$_POST["year"];
$status=$_POST["status"];
$remark="student";

$key="dic@ksu!2050014&";
$enpassword=openssl_encrypt($password,'des-cbc',$key);
$username=strtolower("$username");
$date=array();

$username_count = $database->count("k8s_userdb", ["username" => "$username"]);
$remail = $database->count("k8s_userdb", ["address" => "$address"]);
$user_pass = $database->count("k8s_userdb", ["username" => "$username","password" => "$enpassword"]);
//註冊
if($status=="reg"){
	$login_arr=array();
	if($username_count == 0 ){
		if($remail == 0){
			$date=array();
			date_default_timezone_set('Asia/Taipei');
			//$datetime=date("Y-m-d H:i:s");
		   //$database->query("INSERT INTO `k8s_userdb`(`id`,`name`,`username`, `password`,`address`,`year`,`remark`,`logintime`) VALUES (null,'".$name."','".$username."','".$enpassword."','".$address."','".$year."','".$remark."','".$datetime."');");
		   //shell_exec("sudo mkdir /topci/userimages/".$username."");   
			array_push($date,true,"帳號已建立");
			array_push($login_arr,$date);
		}
	}
	if($username_count >= 1){
		$date=array();
		array_push($date,false,"k8s_user","學號已註冊");
		array_push($login_arr,$date);
	}
	if($remail >= 1){
		$date=array();
		array_push($date,false,"k8s_mail","已有此電子郵件");
		array_push($login_arr,$date);
	}
	echo json_encode($login_arr);
}
//登入
if($status=="log"){
	if($user_pass == 1 ){
		date_default_timezone_set('Asia/Taipei');
        $datetime=date("Y-m-d H:i:s");
		$data = $database->update("k8s_userdb", [
			"status" => 1,
			"noidtime" => "$datetime"
		], [
			"username" => "$username"
		]);
		
		$remarknow = $database->select("k8s_userdb", [
			"remark"
		], [
			"username" => "$username"
		]);
		$remarknow=$remarknow[0]["remark"];
		array_push($date,true,"使用者登入","$username","$remarknow");
		echo json_encode($date);

	}else{
		array_push($date,false,"帳號或密碼錯誤");
		echo json_encode($date);
	}
}
//修改
if($status=="set"){
	if($username_count == 1 ){
		$data = $database->update("k8s_userdb", [
			"name" => "$name",
			"username" => "$username",
			"password" =>"$enpassword",
			"address" => "$address",
			"year" => "$year",
		], [
			"username" => "$username"
		]);
		array_push($date,true);
		echo json_encode($date);

	}else{
		array_push($date,false);
		echo json_encode($date);
	}
}
 if($status=="loginout"){
	if($username_count == 1 ){
		$data = $database->update("k8s_userdb", [
			"status" => 0
		], [
			"username" => "$username"
		]);
		array_push($date,true);
		echo json_encode($date);
	}else{
		array_push($date,false);
		echo json_encode($date);
	}
 }

?>