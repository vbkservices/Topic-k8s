<?php
//kubernetes 部署yaml(namespase,pv,pvc,deploy)
// 以json展示
header("Access-Control-Allow-Origin: *");
$apikey = $_POST["apikey"];
$remove = $_POST["remove"];
$namepase = $_POST["namepase"];
$images = $_POST["images"];
//$mypwd="2727175#356";//$_POST["pwd"];
$key="dic@ksu!2050014&";
$enapikey=openssl_decrypt($apikey,'des-cbc',$key);
if($enapikey == "2727175#356"){
    switch ($remove) {
        case 'label':
            echo "刪除";
            shell_exec('sudo kubectl label namespace '.$namepase.' '.$images.'-');
           // shell_exec('echo "sudo kubectl label namespace '.$namepase.' '.$images.'-" > /shell/error.log');
            break;
        case 'container':
            echo "i equals 1";
            break;
        case 'namespase':
            echo "刪除課程";
          //  shell_exec('curl http://127.0.0.1:8001/api/v1/namespaces/'.$namepase.'/pods');
            shell_exec('/shell/namespase/delete_deploy_pod_gotty.sh '.$namepase.'');
            shell_exec('sudo kubectl label namespace '.$namepase.' status-;sudo kubectl label namespace '.$namepase.' status=delete');
           // shell_exec('sudo kubectl delete namespace '.$namepase.' &');
           // shell_exec('echo "/shell/namespase/delete_deploy_pod_gotty.sh '.$namepase.'" > /shell/error.log');
            break;
    }
}
?>