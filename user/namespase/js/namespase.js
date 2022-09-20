
let fddjs = new FormData();
let name = localStorage.getItem("name");
fddjs.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
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
            var creationTimestamp = (`${value.metadata.creationTimestamp}`).replace(/[A-Z]/g, " ");
            if (`${value.metadata.labels.user}` != "undefined" && `${value.metadata.labels.user}` == name) {
                table1 = table1 + (`<tr class="h4"><th scope="row"></th><td> ${value.metadata.name}</td><td>` + creationTimestamp + `</td><td> ${value.metadata.labels.user}
                        </td><td> <button  type="button" class="btn btn-success"  onclick="status_pod('${value.metadata.name}')"><b>查看容器</b></button></td><td>
                        <button type="submit" class="btn btn-primary my-1" id="create_container" onclick="namespase_status('${value.metadata.name}')">設定</button>
                        <button  type="button" class="mx-2 btn btn-outline-danger"  onclick="nsdelete('${value.metadata.name}','${value.metadata.labels.user}')"><b>刪除課程</b></button></td></tr>`);
            }
            //table1 = table1 + (`<tr class="h5"><th> ${value.metadata.name}</th><td>${value.metadata.creationTimestamp}</td><td> ${value.metadata.uid}</td></tr>`);
        });
        $('#example').html(table1);
    }
});
function namespase_status(namepase) {
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
            var table;
            Object.entries(demo.items).forEach(([key, value]) => {
                if (`${value.metadata.name}` == namepase) {
                    $('#k8s_Modal').modal('show');
                    document.getElementById('k8s_ModalLabel').innerText = "學生";
                    Object.entries(value.metadata.labels).forEach(([rekey, revalue]) => {
                        if (`${rekey}` != "user" && `${rekey}` != "kubernetes.io/metadata.name") {
                            table = table + (`<tr class="h4"><th scope="row"></th><td id="${revalue}">${revalue}</td><td>  <button type="submit" class="btn btn-primary my-1" id="create_container" onclick="status_remove('` + namepase + `','${revalue}')">移除</button></td></tr>`);
                        }
                    });
                    table = table + (`<tr class="h4" id="studnet_add_table"><th scope="row"></th><td> <input type="text" id="student_add" placeholder="學號"></td><td>  <button type="submit" class="btn btn-primary my-1" id="create_container" onclick="status_add('` + namepase + `')">新增</button></td></tr>`);
                }
            });
            $('#model_example').html(table);
        }
    });
}
function status_remove(namepase, student) {
    fddjs.append('remove', 'label');
    fddjs.append('namepase', namepase);
    fddjs.append('student', student);
    document.getElementById(''+student).innerHTML = `<th scope="row" colspan="2">
    <div class="spinner-grow text-dark" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
  <div class="spinner-grow text-dark" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
  <div class="spinner-grow text-dark" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
    </th>`
    $.ajax({ //kubectll get pods
        type: "post",
        url: 'http://120.114.142.17/sys/user/namespase/prg/kube_ns_delete.php',
        //dataType: "json",
        data: fddjs,
        processData: false,
        //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
        contentType: false,
        success: function (result, status) {
            namespase_status(namepase);
        }
    });
}
function status_add(namepase) {
    let student = document.getElementById('student_add').value
    fddjs.append('namepase', namepase);
    fddjs.append('student', student);
    document.getElementById('studnet_add_table').innerHTML = `<th scope="row" colspan="2">
    <div class="spinner-grow text-dark" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
  <div class="spinner-grow text-dark" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
  <div class="spinner-grow text-dark" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
    </th>`
    $.ajax({ //kubectll get pods
        type: "post",
        url: 'http://120.114.142.17/sys/user/namespase/prg/kube_add_student.php',
        //dataType: "json",
        data: fddjs,
        processData: false,
        //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
        contentType: false,
        success: function (result, status) {
            namespase_status(namepase);
        }
    });
}
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