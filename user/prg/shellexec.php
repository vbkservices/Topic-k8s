<?php
header("Access-Control-Allow-Origin: *");
$output = shell_exec('curl http://localhost:8001/apis/metrics.k8s.io/v1beta1/nodes');
echo $output;
?>
