let fddjs = new FormData();
fddjs.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
let name = localStorage.getItem("name");
let user = localStorage.getItem("user");
let pod = sessionStorage.getItem("status_pod");
fddjs.append('namepase', pod);
let see_port = '';
window.onload = function () {
    document.querySelector('#images_user').innerHTML = `
    <div class="btn-group" role="group" aria-label="Basic example">
    <button type="button" class="btn btn-outline-dark disabled" ><b>課程:` + pod + `</b></button>
    <a type="button" class="btn btn-outline-secondary" href="http://120.114.142.17/sys/user/namespase/namespase.html"><b>上一頁</b></a>
    <button type="button" class="btn btn-success" onclick="new_model_container('`+pod+`')"><b>建立課程容器</b></button>
  </div>`;
    $.ajax({ //kubectll get pods
        type: "post",
        url: 'http://120.114.142.17/sys/user/namespase/prg/kube_namespase.php',
        dataType: "json",
        data: fddjs,
        processData: false,
        //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
        contentType: false,
        success: function (result, status) {
            let port = JSON.parse(result)
            see_port = port.metadata.labels.seeport;
            namespace_pod(see_port );
        }
    });
}
function namespace_pod(see_port ) {
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
            var table;
            let show = "";
            Object.entries(demo.items).forEach(([key, value]) => {
                console.log(value);
                if (user == "teacher") {
                    if (value.metadata.labels.user == name) {
                        show=`
                        <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-primary my-1" id="create_container" onclick="gotty_status('` + value.metadata.labels.user + `','${value.metadata.name}','${value.metadata.namespace}','${value.spec.containers[0].image}','${value.metadata.labels.port}')">連線</button>
                        <button type="button" class="btn  btn-outline-primary my-1" id="create_container" onclick="open_see_teacher('` + name + `','` + value.metadata.labels.user + `','${value.metadata.name}','${value.metadata.namespace}','${value.spec.containers[0].image}','${value.metadata.labels.port}','` + see_port + `')">廣播</button>
                        </div>
                        `;
                        // <button type="button" class="btn btn-primary my-2" onclick="open_see_teacher()"><b>廣播</b></button>
                    } else {
                        show = `<button type="button" class="btn  btn-outline-primary my-1" id="create_container" onclick="gotty_see_status('` + name + `','` + value.metadata.labels.user + `','${value.metadata.name}','${value.metadata.namespace}','${value.spec.containers[0].image}','${value.metadata.labels.port}','` + see_port + `')">觀看</button>`
                    }
                } else if (user == "student") {
                    if (value.metadata.labels.user == name) {
                        show = `<button type="button" class="btn btn-info my-1" id="create_container" onclick="gotty_status('` + value.metadata.labels.user + `','${value.metadata.name}','${value.metadata.namespace}','${value.spec.containers[0].image}','${value.metadata.labels.port}')">連線</button>`;
                    } else {
                        show = `<button type="button" class="btn btn-primary my-1" id="create_container" onclick="gotty_see_status('` + name + `','` + value.metadata.labels.user + `','${value.metadata.name}','${value.metadata.namespace}','${value.spec.containers[0].image}','${value.metadata.labels.port}','` + see_port + `')">觀看</button>`
                    }
                }
                table = table + `
                <tr>
                <th scope="row">`+ value.metadata.name + `</th>
                <td>`+ value.metadata.labels.user + `</td>
                <td>`+ value.status.phase + `<span class="badge rounded-pill bg-success mx-1"><i class="fa fa-cloud"></i></span></td>
                
                <td>`+ show + `</td>
                <td>`+ value.metadata.name + `</td>
              </tr>
                `;
            });
            $('#table_pod').html(table);

        }
    });
}
    function new_model_container(namepase) {
        $('#exampleModal').modal({ backdrop: 'static', keyboard: false });
        document.getElementById('model_button').innerHTML = `<button  type="button" class="btn btn-primary my-2 mx-4" onclick="new_container('` + namepase + `')"><b>建立</b>
        <button type="button" class="btn btn-primary my-2"data-bs-dismiss="modal"><b>取消</b></button>`;
        $('#exampleModal').modal('show');
        namepace_images_status(namepase)
    }
    function namepace_images_status(namepase) {
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
                        Object.entries(value.metadata.labels).forEach(([rekey, revalue]) => {
                            valstr = rekey.indexOf("docker");
                            if (valstr !== -1) {
                                revalue = revalue.replace(/\-/g, "/");
                                table = table + (`<option value="` + revalue + `" selected>` + revalue + `</option>`);
                            }
                        });
                    }
                });
                $('#namepace_images_status').html(table);
            }
        });
    }
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
                var table = "";
                Object.entries(demo.items).forEach(([key, value]) => {
                    document.querySelector('#add_th').innerText = "狀態";
                    document.querySelector('#cont_status').innerText = "";
                    if (`${value.metadata.name}` == namepase) {
                        $('#k8s_Modal').modal('show');
                        document.getElementById('k8s_ModalLabel').innerText = "映像檔";
                        // console.log(value.metadata.labels);
                        Object.entries(value.metadata.labels).forEach(([rekey, revalue]) => {
                            valstr = rekey.indexOf("docker");
                            if (valstr !== -1) {
                                revalue = revalue.replace(/\-/g, "/");
                                table = table + (`<tr class="h4"><th scope="row"></th><td id="` + rekey + `">` + revalue + `</td><td> 
                                 <button type="submit" class="btn btn-danger my-1 fa fa-minus-square" id="create_container" onclick="status_remove('` + namepase + `','` + rekey + `')"></button></td></tr>`);
                            }
                        });
                    }
                });
                $('#model_example').html(table);
            }
        });
    }
    function new_container(namepase) {
        let container_name = document.getElementById('container_name').value;
        let container_image = document.getElementById('namepace_images_status').value;
        container_image = container_image.replace(/\./g, ":");
        //console.log(container_image)
        let container_volume = document.getElementById('container_volume').value;
        let container_cpu = document.getElementById('container_cpu').value;
        let container_memory = document.getElementById('container_memory').value;
        fddjs.append('name', name);
        fddjs.append('namepase_name', namepase);
        fddjs.append('container_name', container_name);
        fddjs.append('container_image', container_image);
        fddjs.append('container_volume', container_volume);
        fddjs.append('container_cpu', container_cpu);
        fddjs.append('container_memory', container_memory);
        $.ajax({ //kubectll get pods
            type: "post",
            url: 'http://120.114.142.17/sys/user/namespase/prg/kube_container_create.php',
            // dataType: "json",
            data: fddjs,
            processData: false,
            //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
            contentType: false,
            success: function (result, status) {
                $('#exampleModal').modal('hide');
                //alert(result);
            }
        });
    }
    function gotty_status(user, pod_name, namepase, image, port) {
        fddjs.append('name', user);
        fddjs.append('user', name);
        fddjs.append('pod_name', pod_name);
        fddjs.append('namepase', namepase);
        fddjs.append('image', image);
        fddjs.append('port', port);
        fddjs.append('status', 'create');
        $.ajax({ //kubectll get pods
            type: "post",
            url: 'http://120.114.142.17/sys/user/container/prg/kube_gotty_container.php',
            // dataType: "json",
            data: fddjs,
            processData: false,
            //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
            contentType: false,
            success: function (result, status) {
                let str=JSON.parse(result)
                //console.log(result);
                window.open("http://120.114.142.17:"+str[1]+"", '_blank', 'location=yes,height=1080,width=1920,scrollbars=yes,status=yes');
            }
        });
    }
    
    function gotty_see_status(name, user, pod_name, namepase, image, port, see_port) {
        fddjs.append('name', user);
        fddjs.append('user', name);
        fddjs.append('pod_name', pod_name);
        fddjs.append('namepase', namepase);
        fddjs.append('image', image);
        fddjs.append('port', port);
        fddjs.append('see_port', see_port);
        fddjs.append('status', 'see');
        $.ajax({ //kubectll get pods
            type: "post",
            url: 'http://120.114.142.17/sys/user/container/prg/kube_gotty_container.php',
            // dataType: "json",
            data: fddjs,
            processData: false,
            //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
            contentType: false,
            success: function (result, status) {
                let str=JSON.parse(result)
               window.open("http://120.114.142.17:"+str[1]+"/?arg="+str[0]+"", '_blank', 'location=yes,height=1080,width=1920,scrollbars=yes,status=yes');
            }
        });
    }
    function open_see_teacher(name, user, pod_name, namepase, image, port, see_port) {
        fddjs.append('user', name);
        fddjs.append('pod_name', pod_name);
        fddjs.append('namepase', namepase);
        fddjs.append('image', image);
        fddjs.append('port', port);
        fddjs.append('see_port', see_port);
        $.ajax({ //kubectll get pods
            type: "post",
            url: 'http://120.114.142.17/sys/user/container/prg/kube_see_gotty.php',
            // dataType: "json",
            data: fddjs,
            processData: false,
            //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
            contentType: false,
           /* success: function (result, status) {
                let xtream = `<iframe frameborder="0" noresize="noresize" src="http://120.114.142.17:` + see_port + `/?arg=` + result + `" frameborder="0" style=" width: 100%; height:100%;"></iframe>`
                $('#xtream').html(xtream);
            }*/
        });
    }
