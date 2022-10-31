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
     $clientip=$_SERVER["REMOTE_ADDR"];
     $tag=$_POST["tag"];
     $name=strtolower("$name");

     $docker_gotty=shell_exec("sudo /shell/imgyml/create_gotty_container.sh ".$name." ".$containername." ".$imagesname." ".$clientip." ".$tag."");
     shell_exec("echo 'sudo /shell/imgyml/create_gotty_container.sh  ".$name." ".$containername." ".$imagesname." ".$clientip." ".$tag."' > /shell/error.log");
    // shell_exec('export TERM=xterm;tmux new -s close_'.$port.' -d /bin/bash -c "sleep 10s && sudo /sbin/iptables -D INPUT -p tcp -s '.$clientip.' -m tcp --dport '.$port.' -j ACCEPT"');
    $output=explode(',',$docker_gotty);
    $output=explode('_',$output[1]);
    shell_exec('export TERM=xterm;tmux new -s close_'.$output[3].' -d /bin/bash -c "sleep 10s && sudo /sbin/iptables -D INPUT -p tcp -s '.$clientip.' -m tcp --dport '.$output[3].' -j ACCEPT"');
    echo $docker_gotty;
}
?>