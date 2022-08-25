<?php
//kubernetes pod的狀況
// 以json展示
//exec('', $output, $return_var);
$output = shell_exec('sudo docker inspect 10.255.1.254:5000/ken/rockylinux');
echo json_encode($output);
?>