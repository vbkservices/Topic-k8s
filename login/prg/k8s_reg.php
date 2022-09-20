<?php
header("Access-Control-Allow-Origin: *");
require '../../prg/vendor/autoload.php';
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

$count = $database->count("k8s_userdb", ["username" => "$username"]);
$repassword = $database->count("k8s_userdb", ["password" => "$enpassword"]);
if($count == 1 ){
	if($repassword == 1){
        array_push($date,true,"使用者登入"."student");
        echo json_encode($date);
	}else{
		array_push($date,false,"密碼錯誤");
        echo json_encode($date);
	}
}else if( $count != 1 ){
    $count = $database->count("k8s_userdb", ["name" => "$username"]);
    if( $count == 1 ){
        if($repassword == 1){
            array_push($date,true,"學號登入",);
            echo json_encode($date);
        }else{
            array_push($date,false,"密碼錯誤");
            echo json_encode($date);
        }
    }else{
        array_push($date,false,"未有此帳號");
        echo json_encode($date);
    }
}else{
    array_push($date,false,"未有此帳號");
    echo json_encode($date);
}

?>