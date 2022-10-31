<?php
header("Access-Control-Allow-Origin: *");
require '../../prg/vendor/autoload.php';
use Medoo\Medoo;
$name=$_POST["name"];
$username=$_POST["username"];
$password=$_POST["password"];
$address=$_POST["email"];
$remark="student";

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
$count = $database->count("k8s_userdb", ["name" => "$name"]);
$remail = $database->count("k8s_userdb", ["address" => "$address"]);
if($count == 0 ){
	if($remail == 0){
       $database->query("INSERT INTO `k8s_userdb`(`id`,`name`,`username`, `password`, `address`,`remark`) VALUES (null,'".$name."','".$username."','".$enpassword."','".$address."','".$remark."');");
        array_push($date,true,"帳號已建立");
        echo json_encode($date);
	}else{
		array_push($date,false,"k8s_mail","已有此電子郵件");
        echo json_encode($date);
	}
}else{
	array_push($date,false,"k8s_name","使用者名稱已存在");
    echo json_encode($date);
}

?>