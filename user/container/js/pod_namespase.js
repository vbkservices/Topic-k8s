let fddjs = new FormData();
let name = localStorage.getItem("name");
fddjs.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
window.onload=function(){
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
            var table1="";
            Object.entries(demo.items).forEach(([key, value]) => {
                // console.log(`${key} ${value.metadata.name}`);
                var creationTimestamp = (`${value.metadata.creationTimestamp}`).replace(/[A-Z]/g, " ");
                if (`${value.metadata.labels.user}` != "undefined" && `${value.metadata.labels.user}` == name) {
                    table1 = table1 +`<div class="accordion-item">
                    <h2 class="accordion-header" id="flush-${value.metadata.name}">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${value.metadata.name}" aria-expanded="false" aria-controls="flush-${value.metadata.name}">
                     課程: <b  id="namepase_name_${value.metadata.name}">${value.metadata.name}</b>
                      </button>
                    </h2>
                    <div id="flush-collapse${value.metadata.name}" class="accordion-collapse collapse" aria-labelledby="flush-${value.metadata.name}" data-bs-parent="#accordionFlushExample">
                       
                        <div class="accordion-body my-0"> <button  type="button" class="btn btn-primary my-2" onclick="new_model_container('${value.metadata.name}')"><b>新增容器</b></button></div>
                        <div class="accordion-body" id="${value.metadata.name}_body">沒有容器</div>
                    </div>
                  </div>`
                  $('#accordionFlushExample').html(table1);
                    status_pod(`${value.metadata.name}`,`${value.metadata.labels.seeport}`);
                }
            });
        }
    });
}
  function status_pod(namepase,see_port){
    let fdelete = new FormData();
    fdelete.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
    fdelete.append('namepase',namepase);
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
            var table=``;
            let pod_total=0;
            Object.entries(demo.items).forEach(([key, value]) => {
                console.log();
                table = table + `<div class="card border-secondary mb-3" >
                <div class="card-header">容器</div>
                <div class="card-body text-secondary">
                  <h5 class="card-title">${value.status.containerStatuses[0].name}</h5>
                  <span class="card-text"><button type="submit" class="btn btn-primary my-1" id="create_container" onclick="gotty_status('`+name+`','${value.metadata.name}','${value.metadata.namespace}','${value.spec.containers[0].image}','${value.metadata.labels.port}')">連線</button>
                  <button type="submit" class="btn btn-primary my-1" id="create_container" onclick="gotty_see_status('`+name+`','${value.metadata.name}','${value.metadata.namespace}','${value.spec.containers[0].image}','`+see_port+`')">觀看</button></span>
                </div>
              </div>`;
            });
            namepase=namepase+`_body`
            if(table!=""){
                document.getElementById(''+namepase).innerHTML=table;
            }
        }
    });
  }
  function new_model_container(namepase){
    $('#exampleModal').modal( {backdrop: 'static', keyboard: false});
    document.getElementById('model_button').innerHTML=`<button  type="button" class="btn btn-primary my-2 mx-4" onclick="new_container('`+namepase+`')"><b>建立</b>
    <button type="button" class="btn btn-primary my-2"data-bs-dismiss="modal"><b>取消</b></button>`;
    $('#exampleModal').modal('show');
}
  function new_container(namepase){
    let container_name=document.getElementById('container_name').value;
    let container_image=document.getElementById('container_image').value;
    let container_volume=document.getElementById('container_volume').value;
    let container_cpu=document.getElementById('container_cpu').value;
    let container_memory=document.getElementById('container_memory').value;
    fddjs.append('name',name);
    fddjs.append('namepase_name',namepase);
    fddjs.append('container_name',container_name);
    fddjs.append('container_image', container_image);
    fddjs.append('container_volume',container_volume);
    fddjs.append('container_cpu', container_cpu);
    fddjs.append('container_memory',container_memory);
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
            alert(result);
        }
    });
}  
function gotty_status(user,pod_name,namepase,image,port){
    fddjs.append('name',user);
    fddjs.append('pod_name',pod_name);
    fddjs.append('namepase',namepase);
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
            gotty_test(port)
        }
    });
}
function gotty_see_status(user,pod_name,namepase,image,port){
    fddjs.append('name',user);
    fddjs.append('pod_name',pod_name);
    fddjs.append('namepase',namepase);
    fddjs.append('image', image);
    fddjs.append('port', port);
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
            let xtream=`<iframe frameborder="0" noresize="noresize" src="http://120.114.142.17:`+port+`/?arg=`+result+`" frameborder="0" style=" width: 100%; height:100%;"></iframe>`
            $('#xtream').html(xtream);
          //  alert(result);
           // gotty_test(port)
        }
    });
}
function gotty_test(port){
    let xtream=`<iframe frameborder="0" noresize="noresize" src="http://120.114.142.17:`+port+`" frameborder="0" style=" width: 100%; height:100%;"></iframe>`
    $('#xtream').html(xtream);
}