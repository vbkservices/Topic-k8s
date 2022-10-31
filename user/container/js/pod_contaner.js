let fddjs = new FormData();
let name = localStorage.getItem("name");
fddjs.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
let user = localStorage.getItem("user");
let pod = sessionStorage.getItem("status_pod");
fddjs.append('namepase', pod);
window.onload = function () {
    namespace_pod();
}
function namespace_pod() {
    $.ajax({ //kubectll get pods
        type: "post",
        url: 'http://120.114.142.17/sys/user/container/prg/kube_namespase_pod.php',
        dataType: "json",
        data: fddjs,
        processData: false,
        //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
        contentType: false,
        success: function (result, status) {
            var demo = JSON.parse(result);
            var table="";
            let show = "";
            Object.entries(demo.items).forEach(([key, value]) => {
                table = table + `
                 <li class="nav-item">
                 <a class="nav-link " href="#">`+value.metadata.name+`</a>
                </li>
                `;
            });
            $('.nav-tabs').html(table);
        }
    });
}