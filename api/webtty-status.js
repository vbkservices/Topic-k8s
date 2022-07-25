var fddjs = new FormData();
fddjs.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
$.ajax({ //kubectll get pods
    type: "post",
    url: 'http://120.114.142.17/sys/prg/kube_gotty_list.php',
    dataType: "json",
    data: fddjs,
    processData: false,
    //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
    contentType: false,
    success: function (result, status) {
        if (result) {
            var table="";
            Object.entries(result).forEach(([key, value]) => {
                table = table + '<tr><th scope="row">' + (`${key}`) + '</th><td>' + 'webtty-k8smaster' + '</td></tr>';
            });

        }
        table = table + '<tr><th colspan="5" scope="row"></th></tr>';
        $('#example').html(table);
    }
});