<?php
    $output = 'docker_4080c018_4080c018_linux_202210252058,docker_gotty_4080c018_7249,status';
    $output=explode(',',$output);
    $output=explode('_',$output[1]);
    //var_dump();
    echo $output[3];
?>