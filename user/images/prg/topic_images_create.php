<?php
//kubernetes pod的資源 
// 以json展示
header("Access-Control-Allow-Origin: *");
$apikey = $_POST["apikey"];
$key="dic@ksu!2050014&";
$enapikey=openssl_decrypt($apikey,'des-cbc',$key);

$status = $_POST["status"];
$username = $_POST["username"];
$username=strtolower("$username");

if($enapikey == "2727175#356"){
   require '../../mysql_config.php';
    if($status == 'create'){
         //確認使用者
        $containername=$_POST["containername"];
        $imagesname=$_POST["imagesname"];
        $imagesuser=$_POST["imagesuser"];
        $imagesuser=strtolower("$imagesuser");
        $clientip=$_SERVER["REMOTE_ADDR"];
        $tag=$_POST["tag"];//$_POST["tag"];
        $type=$_POST["type"];

        $docker_gotty=shell_exec("sudo /shell/images/create_gotty_container_swp.sh ".$username." ".$containername." ".$imagesuser."/".$imagesname." ".$clientip." ".$tag." ".$type."");
        shell_exec("echo 'sudo /shell/images/create_gotty_container_swp.sh ".$username." ".$containername." ".$imagesuser."/".$imagesname." ".$clientip." ".$tag."' > /shell/error.log");
       // shell_exec('export TERM=xterm;tmux new -s close_'.$port.' -d /bin/bash -c "sleep 10s && sudo /sbin/iptables -D INPUT -p tcp -s '.$clientip.' -m tcp --dport '.$port.' -j ACCEPT"');
       $output=explode(',',$docker_gotty);
       $output=explode('_',$output[1]);
       shell_exec('export TERM=xterm;tmux new -s close_'.$output[3].' -d /bin/bash -c "sleep 10s && sudo /sbin/iptables -D INPUT -p tcp -s '.$clientip.' -m tcp --dport '.$output[3].' -j ACCEPT"');
       echo $docker_gotty;
       /*
        /shell/imgyml/new_create_images.sh
        $docker_gotty=shell_exec("sudo /shell/imgyml/test_status.sh ".$username."");
        shell_exec("echo 'sudo /shell/imgyml/test_status.sh ".$username."' > /shell/error.log");
        echo $docker_gotty;*/
    }
    if($status == 'imagecreate'){
        //確認使用者
       $containername=$_POST["containername"];
       $imagesname=$_POST["imagesname"];
       $commit=$_POST["image_text"];
       $imageknow=shell_exec("sudo /shell/images/add_new_image.sh ".$username." ".$imagesname." ".$containername." ".$commit."");
       shell_exec('echo "sudo /shell/images/add_new_image.sh '.$username.' '.$imagesname.' '.$containername.' '.$commit.'" > /shell/error.log');
       echo json_encode($imageknow);
    }
    if($status == 'open_conatiner'){
        //確認使用者
       $imagesname=$_POST["imagesname"];
       $imageknow=shell_exec("sudo docker start ".$imagesname."");
       echo json_encode($imageknow);
    }
    if($status == 'delete'){
        $imagesname=$_POST["imagesname"];
        shell_exec("sudo docker rm -f ".$imagesname.";sudo rm -rf /ks-work/k8swork/nfs-pvc/server/".$username."/".$imagesname."");
        $array=[];
        array_push($array,true);
        echo json_encode($array);
   }
   if($status == 'delete_image'){
        $imagesname=$_POST["imagesname"];
        $tag=$_POST["tag"];
        shell_exec("sudo /shell/images/delete_user_image.sh ".$username." ".$imagesname." ".$tag."");
        shell_exec('echo "sudo /shell/images/delete_user_image.sh '.$username.' '.$imagesname.' '.$tag.'" > /shell/error.log');
        $array=[];
        array_push($array,true);
        echo json_encode($array);
    }
   if($status == 'replace_image'){
        $imagesname=$_POST["imagesname"];
        $tag=$_POST["tag"];
        shell_exec("sudo tmux kill-session -t ".$imagesname.";echo 'sudo tmux kill-session -t ".$imagesname."'>/shell/error.log");
        $array=[];
        array_push($array,true);
        echo json_encode($array);
    }
    if($status == 'push_filer'){

        $myfile = $_FILES['product'];
        //上傳路徑
        $path = "/topci/userimages/".$username."/" . $myfile['name']; 
        if(move_uploaded_file($myfile['tmp_name'], $path)){
          echo "上傳成功";
        } else{
          echo "上傳失敗";
        };
     }
     if($status == 'remove_path'){
        $file=$_POST["file"];
        //上傳路徑
        $imageknow=shell_exec("sudo rm -f /topci/userimages/".$username."/".$file."");
        echo "remove";
        
     }
}
?>