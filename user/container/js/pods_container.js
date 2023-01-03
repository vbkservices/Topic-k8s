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
    <a type="button" class="btn btn-outline-secondary" href="http://120.114.142.17/sys/user/container/"><b>上一頁</b></a>
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
            let results = JSON.parse(result)
            see_port = see_port+results.metadata.labels.seeport;
            let see_teacher ="";
            if(results.metadata.labels['see.teacher']!=undefined){
                see_teacher = see_teacher+results.metadata.labels.user+"_"+results.metadata.labels['kubernetes.io/metadata.name']+"_"+results.metadata.labels['see.teacher'];
            }else{
                see_teacher = see_teacher+"undefined";
            }
            namespace_pod(see_port,see_teacher);
        }
    });
}
function namespace_pod(see_port,see_teacher) {
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
                if (user == "student") {
                   if (value.metadata.labels.user == name) {
                       show = `<button type="button" class="btn btn-primary my-1" id="create_container" onclick="gotty_status('` + value.metadata.labels.user + `','${value.metadata.name}','${value.metadata.namespace}','${value.spec.containers[0].image}','${value.metadata.labels.port}','` + see_port + `','` + see_teacher + `')">連線</button>`;
                       table = table + `
                       <tr>
                       <th scope="row">`+ value.metadata.name + `</th>
                       <td><i class="fa fa-home"></i>`+ value.metadata.labels.user + `</td>
                       <td>`+ value.status.phase + `<span class="badge rounded-pill bg-success mx-1"><i class="fa fa-cloud"></i></span></td>
                       
                       <td>`+ show + `</td>
                       <td>`+ value.metadata.name + `</td>
                     </tr>
                       `;
   
                   }
               }
           });
            Object.entries(demo.items).forEach(([key, value]) => {
                 if (user == "student") {
                    if (value.metadata.labels.user != name) {
                        show = `<button type="button" class="btn btn-outline-primary my-1" id="create_container" onclick="gotty_see_status('` + name + `','` + value.metadata.labels.user + `','${value.metadata.name}','${value.metadata.namespace}','${value.spec.containers[0].image}','${value.metadata.labels.port}','` + see_port + `','` + see_teacher + `')">觀看</button>`;
                        table = table + `
                        <tr>
                        <th scope="row">`+ value.metadata.name + `</th>
                        <td>`+ value.metadata.labels.user + `</td>
                        <td>`+ value.status.phase + `<span class="badge rounded-pill bg-success mx-1"><i class="fa fa-cloud"></i></span>
                        </td>
                        
                        <td>`+ show + `</td>
                        <td>`+ value.metadata.name + `</td>
                      </tr>
                        `;
                    }
                }

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
                    if (`${demo.metadata.name}` == namepase) {
                        Object.entries(demo.metadata.labels).forEach(([rekey, revalue]) => {
                            valstr = rekey.indexOf("docker");
                            if (valstr !== -1) {
                                imagesne = rekey.replace(/docker./g, "");
                                imagesne = imagesne.replace(/\-/g, "/");
                                imagesne = imagesne.replace(/\./g, ":");
                                if(revalue=="show"){
                                    table = table + (`<option value="` + imagesne + `" selected>` + imagesne + `</option>`);
                                }
                            }
                        });
                    }
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
        let container_volume = "1";
        let container_cpu = "1";
        let container_memory = "1";
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
                window.location.href = window.location.href;
                //alert(result);
            }
        });
    }
    function gotty_status(user, pod_name, namepase, image, port, see_port,see_teacher) {
        fddjs.append('name', user);
        fddjs.append('user', name);
        fddjs.append('pod_name', pod_name);
        fddjs.append('namepase', namepase);
        fddjs.append('image', image);
        fddjs.append('port', port);
        fddjs.append('see_port', see_port);
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
                console.log(str);
              if(str[0]==null){
                window.open("http://120.114.142.17:"+str[1]+"", '_blank', 'location=yes,height=1080,width=1920,scrollbars=yes,status=yes');
              }else{
                window.open("http://120.114.142.17:"+str[1]+"/?arg="+str[0]+"", '_blank', 'location=yes,height=1080,width=1920,scrollbars=yes,status=yes');
              }           
            }
        });
    }
    function gotty_see_status(name, user, pod_name, namepase, image, port, see_port,see_teacher) {
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
              //  console.log(str);
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
            success: function (result, status) {
                namespace_pod();
            }
        });
    }
