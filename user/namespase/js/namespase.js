
let fddjs = new FormData();
let name = localStorage.getItem("name");
fddjs.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
window.onload=function(){
    document.querySelector('#images_user').innerHTML =`<a href="http://120.114.142.17/sys/user/namespase/namespase_create.html"
    class="btn btn-outline-success">建立`+`<b class="mx-1">`+name+"</b>"+`課程</a>`;
    namespace_table();
}
function namespace_table(){
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
            var table1 = "";
            let imageuser = "";
            Object.entries(demo.items).forEach(([key, value]) => {
                var creationTimestamp = (`${value.metadata.creationTimestamp}`).replace(/[A-Z]/g, " ");
                if (`${value.metadata.labels.user}` != "undefined" && `${value.metadata.labels.user}` == name) {
                    imageuser=imageuser+`${value.metadata.labels.user}`
                    if ($(window).width() <= 768) {
                        // 當視窗寬度小於767px時執行
                        table1 = table1 + `
                        <div class="card text-center px-0 mb-2">
                          <div class="card-header fs-4">
                          容器: ${value.metadata.name}
                          </div>
                          <div class="card-body">
                            <h5 class="card-title">建立者: ${value.metadata.labels.user}</h5>
                            <button  type="button" class="btn btn-success"  onclick="status_pod('${value.metadata.name}')"><b>查看容器</b></button>
                            <button type="submit" class="btn btn-primary my-1" id="create_container" onclick="namespase_status('${value.metadata.name}')">設定</button>
                            <button  type="button" class="mx-2 btn btn-outline-danger"  onclick="nsdelete('${value.metadata.name}','${value.metadata.labels.user}')"><b>刪除課程</b></button>
                          </div>
                          <div class="card-footer text-muted">
                          建立時間: `+creationTimestamp+`
                          </div>
                        </div>
                        `;
                    } else {
                        let status=""
                        if(`${value.metadata.labels.status}`=="delete"){
                            status=status+`<div>刪除中</div>`
                        }else{
                            status=status+`<button type="submit" class="btn btn-primary my-1" id="create_container" onclick="namespase_status('${value.metadata.name}')">設定</button>
                            <button  type="button" class="mx-2 btn btn-outline-danger"  onclick="nsdelete('${value.metadata.name}','${value.metadata.labels.user}')"><b>刪除課程</b></button>`;
                        }
                        // 當視窗寬度不小於767px時執行
                        table1 = table1 + (`
                        <table class="table border table-bordered text-center" style="width:100%">
                        <thead class="h6 bg-warning bg-gradient  bg-opacity-25 rounded-3 border-2">
    
                                <th scope="col">課程</th>
                                <th scope="col">建立時間</th>
                                <th scope="col">建立者</th>
                                <th scope="col">UUID</th>
                                <th scope="col">詳細</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr class="h4"><th scope="row"  width="10%"> ${value.metadata.name}</th><td>` + creationTimestamp + `</td><td> ${value.metadata.labels.user}
                                </td><td><button  type="button" class="btn btn-success"  onclick="status_pod('${value.metadata.name}')"><b>查看容器</b></button></td><td>
                                `+status+`</td></tr>
                        </tbody>
                    </table>
                        `);
                    }
                }
            });
            
            if(imageuser!=""){
                $('#example').html(table1);
            }
        }
    });

}
/*<button  type="button" class="btn btn-success"  onclick="status_pod('${value.metadata.name}')"></button>*/
function namespase_status(namepase) {
    sessionStorage.setItem("status_pod", namepase);
    window.location = "http://120.114.142.17/sys//user/namespase/namespase_status.html"
    /*
    fddjs.append('namepase', namepase);
    $.ajax({ //kubectll get pods
        type: "post",
        url: 'http://120.114.142.17/sys/user/namespase/prg/kube_namespase.php',
        dataType: "json",
        data: fddjs,
        processData: false,
        //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
        contentType: false,
        success: function (result, status) {
            let demo = JSON.parse(result);
            let table='';
            console.log(demo.metadata.labels);
                document.querySelector('#add_th').innerText = "狀態";
                document.querySelector('#cont_status').innerText = "";
                if (`${demo.metadata.name}` == namepase) {
                    $('#k8s_Modal').modal('show');
                    document.getElementById('k8s_ModalLabel').innerText = "映像檔";
                   // console.log(value.metadata.labels);
                    Object.entries(demo.metadata.labels).forEach(([rekey, revalue]) => {
                        valstr = rekey.indexOf("docker");
                        if (valstr !== -1) {
                            revalue=revalue.replace(/\-/g, "/");
                            revalue=revalue.replace(/\./g, ":");
                            table = table + (`<tr class="h4"><th scope="row"></th><td id="`+rekey+`">`+revalue+`</td><td> 
                             <button type="submit" class="btn btn-danger my-1 fa fa-minus-square" id="create_container" onclick="status_remove('` + namepase + `','`+rekey+`')"></button></td></tr>`);
                        }
                    });
                    table = table + (`<tr class="h4" id="studnet_add_table"><th scope="row"></th><td id="student_add">
                    </td><td><button type="submit" class="btn btn-success my-1 fa fa-plus-square" id="create_container" onclick="status_add('` + namepase + `')"></button></td></tr>`);
                }
            $('#model_example').html(table);
        }
    });*/
}
function status_remove(namepase, images) {
    let images_add=images.replace(/\//g, "-");
    fddjs.append('remove', 'label');
    fddjs.append('namepase', namepase);
    fddjs.append('images', images_add);
    document.getElementById('' + images).innerHTML = `<th scope="row" colspan="2">
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
    let imagestatus =
    `<div class="pt-2 fs-4" id="imagesadd">
    <input class="mx-2" type="radio" name="sex" onclick="imagesadd('defaults','`+namepase+`')" value="yes">defaults
    <input class="mx-2" type="radio" name="sex" onclick="imagesadd('`+ name + `','`+namepase+`')" value="no">` + name + `<p>
</div>`;
document.querySelector('#student_add').innerHTML = imagestatus;
}
function imagesadd(images_user,namepase) {
    fddjs.append('name', images_user);
    $.ajax({ //kubectll get pods
        type: "post",
        url: 'http://120.114.142.17/sys/user/images/prg/images_status.php',
        data: fddjs,
        //  dataType: "json",
        processData: false,
        contentType: false,
        success: function (result, status) {
            let table = "";
            if (result.length == 3) {
                table = "<option selected>未擁有映像檔</option>";
            } else {
                table = `<option value="" class="text-secondary">請選擇要開啟的映像檔</option>`;
                Object.entries(JSON.parse(result)).forEach(([key, value]) => {
                    if (value.name.replace(/\/+\w+\w/gi, '') == images_user.toLowerCase() ) {
                        let str = value.name+":"+value.tag
                        //str = str.replace('10.255.1.254:5000/defaults/', '')
                        table = table + `<option value="` + str + `">` + str + `</option>`;
                    }
                });
            }
            table = `<select class="form-select" aria-label="Default select example" id="select-set" required>` + table + `</select>`;
            document.getElementById('imagesadd').innerHTML = table;
            images_dropdown_status(namepase)
        }
    });
}
function images_dropdown_status(namepase) {
    var select = document.querySelector("#select-set");
    select.addEventListener('change', showValue);
    function showValue(e) {
        revalue=select.value.replace(/\//g, "-");
        revalue=revalue.replace(/\:/g, ".");
        fddjs.append('namepase', namepase);
        fddjs.append('images_name', revalue);
        document.getElementById('imagesadd').innerHTML = `<th scope="row" colspan="2">
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
            url: 'http://120.114.142.17/sys/user/namespase/prg/kube_add_images.php',
            //dataType: "json",
            data: fddjs,
            processData: false,
            //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
            contentType: false,
            success: function (result, status) {
                namespase_status(namepase);
            }
        });
        /*
        let result=`<div class="toast show m-1">
        <div class="toast-header">
          <strong class="me-auto">`+this.value+`</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
        </div>
      </div>`
        let opacity_value = document.getElementById('option_value').innerHTML
        document.getElementById('option_value').innerHTML = opacity_value+result;*/
    }
}
function nsdelete(namepase) {
    let fdelete = new FormData();
    fdelete.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
    fdelete.append('remove', "namespase");
    fdelete.append('namepase', namepase);
    
    $.ajax({ //kubectll get pods
        type: "post",
        url: 'http://120.114.142.17/sys/user/namespase/prg/kube_ns_delete.php',
        //dataType: "json",
        data: fdelete,
        processData: false,
        //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
        contentType: false,
        success: function (result, status) {
            location.reload();
            //namespace_table()
        }
    });
}
function status_pod(namepase) {
    sessionStorage.setItem("status_pod", namepase);
    window.location = "http://120.114.142.17/sys//user/namespase/namespase_container.html"
    /*
    let fdelete = new FormData();
    fdelete.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
    fdelete.append('namepase', namepase);
    $.ajax({ //kubectll get pods
        type: "post",
        url: 'http://120.114.142.17/sys/user/container/prg/kube_namespase_pod.php',
        dataType: "json",
        data: fdelete,
        processData: false,
        //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
        contentType: false,
        success: function (result, status) {
            var demo = JSON.parse(result);
            var table;
            let pod_total = 0;
            Object.entries(demo.items).forEach(([key, value]) => {
                pod_total = pod_total + 1;
                table = table + (`<tr class="h4"><th scope="row"></th><td>
                ${value.metadata.labels.user}</td><td id="${value.status.containerStatuses[0].name}">${value.status.containerStatuses[0].name}</td><td>
                ${value.status.phase}</td></tr>`);
            });
            $('#k8s_Modal').modal('show');
            if( pod_total=="0"){
                document.getElementById('k8s_ModalLabel').innerText = "目前課程內容器數量:" + pod_total + "";
                document.querySelector('#cont_status').innerText = "";
                document.querySelector('#add_th').innerText = "";
                table="";
                $('#model_example').html(table);
            }else{
                document.getElementById('k8s_ModalLabel').innerText = "目前課程內容器數量:" + pod_total + "";
                document.querySelector('#cont_status').innerText = "狀態";
                document.querySelector('#add_th').innerText = "容器";
                $('#model_example').html(table);
            }

        }
    });*/
}