<?php
/*header("Access-Control-Allow-Origin: *");*/
require 'prg/vendor/autoload.php';
use Medoo\Medoo;

$database = new Medoo([	
	'type' => 'mysql',
	'host' => 'localhost',
	'database' => 'k8s_users',
	'username' => 'root',
	'password' => 'dic2727175',
    'charset' => 'utf8'
]);
?>