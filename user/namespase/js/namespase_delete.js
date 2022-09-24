let fddjs = new FormData();
fddjs.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
let name = localStorage.getItem("name");
$.ajax({ //kubectll get pods
    type: "post",
    url: 'http://120.114.142.17/sys/namespase/prg/kube_namespase.php',
    dataType: "json",
    data: fddjs,
    processData: false,
    //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉

    contentType: false,
    success: function (result, status) {
        var demo = JSON.parse(result);
        /*alert(demo.items[0].metadata);*/
        var table1;
        Object.entries(demo.items).forEach(([key, value]) => {
            // console.log(`${key} ${value.metadata.name}`);
            if(value.metadata.name != "kube-system" && value.metadata.name  != "kube-public" && value.metadata.name  != "kube-node-lease"  && `${value.metadata.labels.user}`== name){
                var creationTimestamp = (`${value.metadata.creationTimestamp}`).replace(/[A-Z]/g, " ");
                if(`${value.metadata.labels.user}` != "undefined"){
                    alert(`${value.metadata.labels.status}`);
                    table1 = table1 + (`<tr class="h4"><th scope="row"></th><td> ${value.metadata.name}</td><td>`+ creationTimestamp+`</td>
                    <td> ${value.metadata.labels.user}</td><td><button  type="button" class="btn btn-success"  onclick="status_pod('${value.metadata.name}')">
                    <b>查看容器</b></button><button  type="button" class="mx-2 btn btn-outline-danger"  onclick="nsdelete('${value.metadata.name}','${value.metadata.labels.user}')"><b>刪除課程</b></button></td></tr>`);
                }
            }
           
            //table1 = table1 + (`<tr class="h5"><th> ${value.metadata.name}</th><td>${value.metadata.creationTimestamp}</td><td> ${value.metadata.uid}</td></tr>`);
        });
        $('#example').html(table1);
    }
});
function nsdelete(namepase) {
    let fdelete = new FormData();
    fdelete.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
    fdelete.append('remove',"namespase");
    fdelete.append('namepase',namepase);
    $.ajax({ //kubectll get pods
        type: "post",
        url: 'http://120.114.142.17/sys/user/namespase/prg/kube_ns_delete.php',
        //dataType: "json",
        data: fdelete,
        processData: false,
        //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
        contentType: false,
        success: function (result, status) {
            alert(result);
        }
    });
  }
  function status_pod(namepase){
    let fdelete = new FormData();
    fdelete.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
    fdelete.append('namepase',namepase);
    $.ajax({ //kubectll get pods
        type: "post",
        url: 'http://120.114.142.17/sys/user/container/prg/kube_namespase_pod.php',
        //dataType: "json",
        data: fdelete,
        processData: false,
        //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
        contentType: false,
        success: function (result, status) {
            
            console.log(JSON.parse(result));
        }
    });
  }