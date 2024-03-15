<?php
//gotty連線機制
header("Access-Control-Allow-Origin: *");
$apikey = $_POST["apikey"];
$key="dic@ksu!2050014&";
$enapikey=openssl_decrypt($apikey,'des-cbc',$key);
if($enapikey == "2727175#356"){
     $student=$_POST["student"]; //確認使用者
     $containername=$_POST["containername"];
     $images=$_POST["images"];
     $ifimages=$_POST["ifimages"];
     $status="open";
     $opne=$_POST["opne"];
     $closeport=$_POST["port"];

     $port=rand(1.1,999.9);
     $port=str_pad($port,3,"0",STR_PAD_LEFT);    
     $ports="8".$port;
     $clientip=$_SERVER["REMOTE_ADDR"];

    if($opne == 'true'){
        if(  $status == "open" ){
            shell_exec("export TERM=xterm;/shell/imgyml/dockersh.sh ".$student." ".$containername." ".$images." ".$port." ".$ifimages." ".$clientip."");
            exec("echo 'export TERM=xterm;/shell/imgyml/dockersh.sh ".$student." ".$containername." ".$images." ".$port." ".$ifimages." ".$clientip."' > /shell/error.log");
            echo "$ports,$student-$containername";
        }elseif( ".$status." != ".$student."){
            echo "開啟";
        }   
    }elseif( $opne == 'false' ){
        shell_exec("export TERM=xterm;tmux kill-session -t ".$student."-".$containername."");
        shell_exec("export TERM=xterm;tmux kill-session -t gotty-".$student."-".$containername."-".$closeport."");
        shell_exec("export TERM=xterm;sudo docker stop ".$containername."&&sudo docker rm ".$containername."");
        shell_exec("sudo /sbin/iptables -D INPUT -p tcp -s ${clientip} -m tcp --dport $closeport -j ACCEPT");
    }

}
?>