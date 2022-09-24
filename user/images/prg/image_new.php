<?php
//gotty連線機制
header("Access-Control-Allow-Origin: *");
$apikey = $_POST["apikey"];
$key="dic@ksu!2050014&";
$enapikey=openssl_decrypt($apikey,'des-cbc',$key);
if($enapikey == "2727175#356"){
     $name=$_POST["name"]; //確認使用者
     $containername=$_POST["containername"];
     $imagesname=$_POST["imagesname"];
     $imagesuser=$_POST["imagesuser"];
     $name=strtolower("$name");
     /*
     $port=rand(1.1,999.9);
     $port=str_pad($port,3,"0",STR_PAD_LEFT);    
     $port="8".$port;*/
     shell_exec("/shell/imgyml/new_create_images.sh ".$name." ".$containername." ".$imagesname." ".$imagesuser."");
     shell_exec("echo '/shell/imgyml/new_create_images.sh ".$name." ".$containername." ".$imagesname." ".$imagesuser."' > /shell/error.log");
/*
    if($opne == 'true'){
        if(  $status == "open" ){
            shell_exec("export TERM=xterm;/shell/imgyml/dockersh.sh ".$student." ".$containername." ".$images." ".$port." ".$ifimages."");
            exec("echo 'export TERM=xterm;/shell/imgyml/dockersh.sh ".$student." ".$containername." ".$images." ".$port." ".$ifimages."' > /shell/error.log");
            echo "$ports,$student-$containername";
        }elseif( ".$status." != ".$student."){
            echo "開啟";
        }   
    }elseif( $opne == 'false' ){
        
        shell_exec("export TERM=xterm;tmux kill-session -t ".$student."-".$containername."");
        shell_exec("export TERM=xterm;tmux kill-session -t gotty-".$student."-".$containername."-".$closeport."");
        shell_exec("export TERM=xterm;sudo docker stop ".$containername."&&sudo docker rm ".$containername."");
    }*/

}
?>