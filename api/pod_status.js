var fddjs = new FormData();
fddjs.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
$.ajax({ //kubectll get pods
    type: "post",
    url: 'http://120.114.142.17/sys/prg/kube_pod_status.php',
    dataType: "json",
    data: fddjs,
    processData: false,
    //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
    contentType: false,
    success: function (result, status) {
        var status = '<p class="fs-3">'+result[0]+'</p>';
        status=status+'<p class="fs-3">'+result[1]+'</p>';
        status=status+'<p class="fs-3" style="overflow: hidden;white-space: nowrap;text-overflow:ellipsis;">'+result[2]+'</p>';
        status=status+'<p class="fs-3">'+result[3]+'</p>';
        status=status+'<p class="fs-3">'+result[4]+'</p>';
        $('#kube_status').html(status);
    }
});