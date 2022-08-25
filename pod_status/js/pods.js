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
        var table;
        var tables;
        Object.entries(demo.items).forEach(([key, value]) => {
            var label1 = "";
            Object.entries(value.metadata.labels).forEach(([key1, value1]) => {
                var label2 = "";
                label2 = label2 + `${value1}` + '</button>' + '</p>';
                label1 = label1 + '<button class="btn fs-5 btn-secondary " aria-disabled="true">' + `${key1}` + ' : ' + label2;
            });
            var DateDiff = function (sDate1, sDate2) { // sDate1 和 sDate2 是 2016-06-18 格式
                var oDate1 = new Date(sDate1);
                var oDate2 = new Date(sDate2);
                var iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); // 把相差的毫秒數轉換為天數
                return iDays;
            };
            if (value.metadata.namespace != "kube-system" && value.metadata.namespace != "kube-public") {
                var creationTimestamp = (`${value.metadata.creationTimestamp}`).replace(/[A-Z]/g, " ");
                var GetDateDiff1 = DateDiff(creationTimestamp, new Date()) + 'd';
                table = table + `<tr><th scope="row"> ${value.metadata.name}</th><td>` + label1 + `</td><td> ${value.status.phase}</td><td> ${value.spec.containers[0].image}</td>><td>` + GetDateDiff1 + `</td><td> ${value.metadata.namespace}</td></tr>`;
            }else{
                var creationTimestamp = (`${value.metadata.creationTimestamp}`).replace(/[A-Z]/g, " ");
                var GetDateDiff1 = DateDiff(creationTimestamp, new Date()) + 'd';
                tables = tables + `<tr><th scope="row"> ${value.metadata.name}</th><td>` + label1 + `</td><td> ${value.status.phase}</td><td> ${value.spec.containers[0].image}</td>><td>` + GetDateDiff1 + `</td><td> ${value.metadata.namespace}</td></tr>`;
            }
        });

        $('#example').html(table);
        $('#kubepod').html(tables);
    }
});