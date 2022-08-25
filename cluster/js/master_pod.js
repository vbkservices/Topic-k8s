var fddjs = new FormData();
fddjs.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
$.ajax({ //kubectll get pods
    type: "post",
    url: 'http://120.114.142.17/sys/cluster/prg/kube_pod.php',
    dataType: "json",
    data: fddjs,
    processData: false,
    //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
    contentType: false,
    success: function (result, status) {
        var demo = JSON.parse(result);
        /*alert(demo.items[0].metadata);*/
        var table;
        Object.entries(demo.items).forEach(([key, value]) => {
            if(value.spec.nodeName == "k8smaster"){
                 var creationTimestamp = (`${value.metadata.creationTimestamp}`).replace(/[A-Z]/g, " ");
                 table = table +'<tr><th scope="row"></th><td> '+(`${value.metadata.name}`)+'</td><td>'+creationTimestamp+'</td><td> '+(`${value.spec.nodeName}`)+'</td></tr>';
            }
        });
        $('#example').html(table);
    }
});