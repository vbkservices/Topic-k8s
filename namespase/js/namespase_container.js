let fddjs = new FormData();
fddjs.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
let iden = localStorage.getItem("iden");
let user = localStorage.getItem("user");
let namepase = sessionStorage.getItem("namepase");
fddjs.append('namepase', namepase);
let see_port = '';

window.onload = function () {
    let heght= document.querySelector('body').clientHeight*0.85;
    document.getElementById('namespace_containers').style.height=heght+"px";
    document.getElementById('pod_action').innerHTML = `
    <nav style="--bs-breadcrumb-divider: '';" aria-label="breadcrumb">
    <ol class="breadcrumb m-0">
        <li class="breadcrumb-item px-3"><a
         href="http://dic-con.vbfaka.com/sys/namespase/namespase.html">
         <i class="fa fa-arrow-left"></i><b>上一頁</b></a></li>
         <li class="breadcrumb-item px-3"><a
         href="#" id="resrt">
         <i class="fa fa-refresh"></i><b>更新課程資訊</b></a></li>
    </ol>
    </nav>`
    if(iden=="teacher"){
        document.getElementById('namespace_nav').innerHTML = `
        <nav style="--bs-breadcrumb-divider: '';" aria-label="breadcrumb">
        <ol class="breadcrumb fs-5">
            <li class="breadcrumb-item mx-2">
               <a href="http://dic-con.vbfaka.com/sys/user/namespase/namespase.html"><i class="fa fa-search px-1"></i>查看課程</a></li>
            <li class="breadcrumb-item"><a 
                    href="http://dic-con.vbfaka.com/sys/user/namespase/namespase_create.html"><i class="fa fa-plus-square-o px-1"></i>建立課程</a></li>
        </ol>
        </nav>`
    }else if(iden=="student"){
        document.getElementById('namespace_nav').innerHTML = `
        <nav style="--bs-breadcrumb-divider: '';" aria-label="breadcrumb">
        <ol class="breadcrumb fs-5">
            <li class="breadcrumb-item mx-2"></li>
            <li class="breadcrumb-item"></li>
        </ol>
        </nav>`
    }    
    document.getElementById('resrt').addEventListener("click",function(){
        namespace_pod();
    })
    namespace_pod();
    namespace_my_pod();
}
function namespace_my_pod(){
    fddjs.append('username', user);
    fddjs.append('namepase', namepase);
    fddjs.append('status', "mypod");
    $.ajax({ //kubectll get pods
        type: "post",
        url: 'http://dic-con.vbfaka.com/sys/user/namespase/prg/kube_namespase.php',
        dataType: "json",
        data: fddjs,
        processData: false,
        //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
        contentType: false,
        success: function (result, status) {
            
            if(result!=null){
                if(result[0]){
                    if(result[0][0]=="Pending"){
                        spen=`<div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>`;
                        let table=``;
                        table=table+`</p><div class="col-3 text-end"><b>課程名稱:</b></div><div class="col-9 text-start"><b>`+spen+`</b></div></p>`;
                        table=table+`<div class="col-3 text-end"><b>課程編號:</b></div><div class="col-9 text-start"><b>`+spen+`</b></div></p>`;
                        table=table+`<div class="col-3 text-end"><b>連線參數:</b></div><div class="col-9 text-start"><b>`+spen+`</b></div></p>`;
                        table=table+`<div class="col-3 text-end"><b>狀態:</b></div><div class="col-9 text-start"><b>`+result[0][0]+`</b></div></p>`;
                        table=table+`<div class="col-3 text-end"><b>使用者:</b></div><div class="col-9 text-start"><b>`+spen+`</b></div></p>`;
                        table=table+`<div class="col-3 text-end"><b>啟動時間:</b></div><div class="col-9 text-start"><b>`+spen+`</b></div></p>`;
                        table=`<div class="row fs-6"><div class="col-12 text-center fs-4"><b>個人資訊</b></div>`+table+`</div>`;
                        table=table+`<div class="col-1"></div><div class="card col-9">
                        <div class="card-body text-start">
                          <h5 class="card-title"><b>設備操作:</b>
                          <button class="btn btn-danger mx-2" onclick="close_container('`+result[0][3]+`')">關閉機器</button>
                          </h5></div></div>`;
                        $('#mypod').html(table);
    
                        setTimeout(function(){
                            namespace_my_pod();
                        },3000);
                    }else{
                        if(result[0][6]=="running"){
                            result[0][1]=result[0][1].replace('10.255.1.254:5000/','').replace(/defaults/g,'本地倉庫').replace(/\//g,'-').replace(/\:/g,'-');
                            let table=``;
                            table=table+`</p><div class="col-3 text-end"><b>課程名稱:</b></div><div class="col-9 text-start"><b>`+namepase.replace(/\w+\-/gi,'')+`</br><i class="fa fa-arrow-right mx-2"></i>`+result[0][1]+`</b></div></p>`;
                            table=table+`<div class="col-3 text-end"><b>課程編號:</b></div><div class="col-9 text-start"><b>`+result[0][3]+`</b></div></p>`;
                            table=table+`<div class="col-3 text-end"><b>連線參數:</b></div><div class="col-9 text-start"><b>Post <i class="fa fa-arrow-right mx-2"></i> `+result[0][5]+`</b></div></p>`;
                            table=table+`<div class="col-3 text-end"><b>狀態:</b></div><div class="col-9 text-start"><b>`+result[0][0]+`</b></div></p>`;
                            table=table+`<div class="col-3 text-end"><b>使用者:</b></div><div class="col-9 text-start"><b>`+result[0][2]+`</b></div></p>`;
                            table=table+`<div class="col-3 text-end"><b>啟動時間:</b></div><div class="col-9 text-start"><b>`+result[0][4]+`</b></div></p>`;
                            if(iden=="teacher"){
                                if(result[0][7]=="open"){
                                    button=`<button class="btn btn-danger mx-2" onclick="open_see_pods('open_pod','`+result[0][3]+`')">關閉分享</button>`;
                                }else{
                                    button=`<button class="btn btn-primary mx-2" onclick="open_see_pods('close_pod','`+result[0][3]+`')">分享畫面</button>`;
                                }
                            }else if(iden=="student"){
                                button=``;
                            }
                            table=table+`<div class="col-1"></div><div class="card col-9">
                            <div class="card-body text-start">
                              <h5 class="card-title"><b>設備操作:</b>
                              <button class="btn btn-success mx-2" onclick="open_connect('connect','`+result[0][3]+`')">連線機器</button>
                            `+button+`
                              <button class="btn btn-danger mx-2" onclick="close_container('`+result[0][3]+`')">關閉機器</button>
                              </h5></div></div>`;
                            table=`<div class="row fs-6"><div class="col-12 text-center fs-4"><b>個人資訊</b></div>`+table+`</div>`;
                            namespace_pod();
                            $('#mypod').html(table);
                        }else if(result[0][6]=="delete"){
                            table=`<div class="fs-6"><div class="spinner-border" role="status">
                            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                            <span class="visually-hidden">Loading...</span>
                          </div></div>`;
                            $('#mypod').html(table);
                            setTimeout(function(){
                                namespace_my_pod();
                            },5000);
                        }else{
                            new_model_container(namepase);
                        }
    
                    }
                }else{
                    new_model_container(namepase);
                }
            }

        }
    });
}

function namespace_pod(){
    fddjs.append('namepase', namepase);
    fddjs.append('status', "pod");
    $.ajax({ //kubectll get pods
        type: "post",
        url: 'http://dic-con.vbfaka.com/sys/user/namespase/prg/kube_namespase.php',
        dataType: "json",
        data: fddjs,
        processData: false,
        //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
        contentType: false,
        success: function (result, status) {
            let table='';
            if(result=="false"){
                alert("課程已結束");
                sessionStorage.removeItem("namepase");
                window.location = "http://dic-con.vbfaka.com/sys//user/namespase/namespase.html"
            }else{
                Object.entries(result).forEach(([key, value]) => { 
                    value[1]=value[1].replace('10.255.1.254:5000/','').replace(/defaults/g,'本地倉庫').replace(/\//g,'-').replace(/\:/g,'-');
                    if(value[0]=="Pending"){
                        value[0]=`<div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>`
                    }
                    if(iden=="teacher"){
                        revalue=``;
                    }else if(iden=="student"){
                        if(value[4]=="open"){
                            revalue=`<button type="button" class="btn btn-primary" onclick="open_acc_see('connect','`+value[3]+`')">觀看</button>`
                        }else{
                            revalue=`<button type="button" class="btn btn-secondary" onclick="open_acc_see('connect','`+value[3]+`')" disabled>未開放觀看</button>`
                        }
                    }
                    table = table + `<tr>
                      <th scope="row">`+ namepase.replace(/\w+\-/gi,'') + `<i class="fa fa-arrow-right mx-2"></i>`+value[1]+`</th>
                      <td>`+ value[2] + `</td>
                      <td>`+ value[0] + `</td>
                      <td>`+revalue+`</td>
                    </tr>`;
                });
                $('#table_pod').html(table);
            }
        }
    });
}
function new_model_container(namepase) {
    let table=`<h4 class="text-center modal-title"><b>選擇課程環境</b></h4>
    <div class="form-group row my-2" id="open_contaner">
        <label for="images" class="col-sm-4 col-form-label fs-5 text-end"> <b>選擇課程硬碟:</b></label>
        <div class="col-sm-5 py-2">
           
            <select class="form-control form-control-sm" id="namepace_images_status">

            </select>
            <div class="invalid-feedback text-start invalid-feedback-login">
                錯誤
            </div>
        </div>

        <div class="col-sm-3 text-start" id="model_button">

        </div>
    </div>`
    $('#mypod').html(table);
        document.getElementById('model_button').innerHTML = `<button  type="button" class="btn btn-primary my-2 mx-4" onclick="new_container('` + namepase + `')"><b>建立</b>`;
        fddjs.append('namepase', namepase);
        fddjs.append('status', "status");
        fddjs.append('type', "image");
        $.ajax({ //kubectll get pods
            type: "post",
            url: 'http://dic-con.vbfaka.com/sys/user/namespase/prg/kube_namespase.php',
            dataType: "json",
            data: fddjs,
            processData: false,
            //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
            contentType: false,
            success: function (result, status) {

                    let table=`<option value="false" selected>請選擇要建立的硬碟</option>`;
                    Object.entries(result).forEach(([rekey, revalue]) => {
                    //    console.log(revalue);
                        if(revalue[3]=="show"){
                            table = table + (`<option value="` + revalue[0] + `.` + revalue[1] + `:` + revalue[2] + `">` + revalue[1] + `:` + revalue[2] + `</option>`);
                        }
                    });
                    $('#namepace_images_status').html(table);
            }
        })
    }
    function open_connect(status,contain){
        fddjs.append('namepase', namepase);
        fddjs.append('username', user);
        fddjs.append('contain', contain);
        fddjs.append('status', status);
        fddjs.append('type', 'open');
        $.ajax({ //kubectll get pods
            type: "post",
            url: 'http://dic-con.vbfaka.com/sys/user/namespase/prg/kube_namespase_connect.php',
            dataType: "json",
            data: fddjs,
            processData: false,
            //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
            contentType: false,
            success: function (result, status) {
                let obj=JSON.parse(result)
                console
                if(obj==false){
                    alert("課程已結束");
                    sessionStorage.removeItem("namepase");
                    window.location = "http://dic-con.vbfaka.com/sys//user/namespase/namespase.html"
                }else{
                    if(obj[0]==true || obj[1][0] == true || obj[2][0] == true || obj[3][0] == true){
                        window.open(`http://dic-con.vbfaka.com:`+ obj[3][2]+``);
                    }else{
                        alert("字串:"+obj[0]+"\n容器:"+obj[1][0]+"\n連線:"+obj[2][0]+"\n防火牆:"+obj[3][0])
                    }
                }
            }
        })
    }
    function open_acc_see(status,contain){
        fddjs.append('namepase', namepase);
        fddjs.append('username', user);
        fddjs.append('contain', contain);
        fddjs.append('status', status);
        fddjs.append('type', 'see');
        $.ajax({ //kubectll get pods
            type: "post",
            url: 'http://dic-con.vbfaka.com/sys/user/namespase/prg/kube_namespase_connect.php',
            dataType: "json",
            data: fddjs,
            processData: false,
            //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
            contentType: false,
            success: function (result, status) {
                console.log(result);
                let obj=JSON.parse(result)
                if(obj==false){
                    alert("容器無法連線");
                    namespace_pod();
                    /*
                    sessionStorage.removeItem("namepase");
                    window.location = "http://dic-con.vbfaka.com/sys//user/namespase/namespase.html"*/
                }else{
                    if(obj[1][0]==true){
                        window.open(`http://dic-con.vbfaka.com:`+ obj[0][1]+`/?arg=`+obj[1][1]+``);
                    }else if(obj[1][0]==false){
                        alert("此容器無進行連線");
                    }
                }
            }
        })
    }
    function open_see_pods(status,contain){
        let vars="0";
        if(status=="open_pod"){
            if (confirm('確認要關閉嗎') == true) {
                vars="1";
            } 
        }else if(status="close_pod"){
            if (confirm('確認要開啟嗎') == true) {
                vars="1";
            }
        }
        if(vars=="1"){
            fddjs.append('namepase', namepase);
            fddjs.append('username', user);
            fddjs.append('status', status);
            fddjs.append('type', 'pod');
            fddjs.append('contain', contain);
            $.ajax({ //kubectll get pods
                type: "post",
                url: 'http://dic-con.vbfaka.com/sys/user/namespase/prg/kube_namespase_connect.php',
                dataType: "json",
                data: fddjs,
                processData: false,
                //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
                contentType: false,
                success: function (result, status) {
                    console.log("123");
                    namespace_pod();
                    namespace_my_pod();
                }
            })
        }
    }
    function close_container(contain){
        table=`<div class="fs-6"><div class="spinner-border" role="status">
        <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
        <span class="visually-hidden">Loading...</span>
      </div></div>`;
        $('#mypod').html(table);
        fddjs.append('namepase', namepase);
        fddjs.append('username', user);
        fddjs.append('contain', contain);
        fddjs.append('status', 'close');
        $.ajax({ //kubectll get pods
            type: "post",
            url: 'http://dic-con.vbfaka.com/sys/user/namespase/prg/kube_namespase_connect.php',
            dataType: "json",
            data: fddjs,
            processData: false,
            //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
            contentType: false,
            success: function (result, status) {
                namespace_my_pod();
            }
        })
    }
    /*
    function namepace_images_status(namepase,port) {
        $.ajax({ //kubectll get pods
            type: "post",
            url: 'http://dic-con.vbfaka.com/sys/namespase/prg/kube_namespase.php',
            dataType: "json",
            data: fddjs,
            processData: false,
            //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
            contentType: false,
            success: function (result, status) {
                var demo = JSON.parse(result);
                var table=`<option value="false" selected>請選擇要開啟的映像檔</option>`;
                    if (`${demo.metadata.name}` == namepase) {
                        Object.entries(demo.metadata.labels).forEach(([rekey, revalue]) => {
                            valstr = rekey.indexOf("docker");
                            if (valstr !== -1) {
                                imagesne = rekey.replace(/docker./g, "");
                                imagesne = imagesne.replace(/\-/g, "/");
                                imagesne = imagesne.replace(/\./g, ":");
                                if(revalue=="show"){
                                    table = table + (`<option value="` + imagesne + `">` + imagesne + `</option>`);
                                }
                            }
                        });
                    }

                $('#namepace_images_status').html(table);
            }
        });
        let select = document.querySelector("#namepace_images_status");
        select.addEventListener('change', showValue);
        function showValue(e) {
            let add_volume=`<label for="course" class="col-sm-5 col-form-label">是否要使用過去的資料</label>
            <div class="col-sm-7 pt-2 text-start">
                <input class="mx-2" type="radio" name="vol" onclick="add_volume(true,'create')" value="yes">建立新資料
                <input class="mx-2" type="radio" name="vol" onclick="add_volume(true,'status')" value="yes">是
                <input class="mx-2" type="radio" name="vol" onclick="add_volume(false)" value="no">否<p>
            </div>`
            $('#add_volume').html(add_volume);
        }
    }*/
    /*
    function namespase_status(namepase) {
        $.ajax({ //kubectll get pods
            type: "post",
            url: 'http://dic-con.vbfaka.com/sys/namespase/prg/kube_namespase.php',
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
    }*/
    function new_container() {
        let container_image = document.getElementById('namepace_images_status').value;
       /* fddjs.append('name', name);*/
       if(container_image=="false"){
        $(".invalid-feedback-login").show('fast');
        stlye_border=`border-color: #dc3545;
        color: #dc3545;
        padding-right: calc(1.5em + 0.75rem);
        background-image: url(data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e);
        background-repeat: no-repeat;
        background-position: right calc(0.375em + 0.1875rem) center;
        background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);`
        document.getElementById('namepace_images_status').style=stlye_border;
        document.getElementById('namepace_images_status').addEventListener("click",function(){
            document.getElementById('namepace_images_status').style=``;
            $(".invalid-feedback-login").hide('fast');
        })
        }else{
            table=`<div class="fs-6"><div class="spinner-border" role="status">
            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
            <span class="visually-hidden">Loading...</span>
          </div></div>`;
            $('#mypod').html(table);
            fddjs.append('namepase', namepase);
            fddjs.append('username', user);
            fddjs.append('contain', container_image);
            fddjs.append('status', 'open');
            $.ajax({ //kubectll get pods
                type: "post",
                url: 'http://dic-con.vbfaka.com/sys/user/namespase/prg/kube_namespase_connect.php',
                // dataType: "json",
                data: fddjs,
                processData: false,
                //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
                contentType: false,
                success: function (result, status) {
                    console.log(result)
                        let obj=JSON.parse(result);
                        if(obj[0]==false){
                            alert("課程已結束");
                            sessionStorage.removeItem("namepase");
                            window.location = "http://dic-con.vbfaka.com/sys//user/namespase/namespase.html"
                        }else{
                            document.getElementById('mypod').innerHTML=`<b>等待中</b>`
                            setTimeout(function(){
                                namespace_pod();
                                namespace_my_pod();
                            },1500);

                        }
                  //  
                }
            });
        }    

    }
    /*
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
            url: 'http://dic-con.vbfaka.com/sys/user/container/prg/kube_gotty_container.php',
            // dataType: "json",
            data: fddjs,
            processData: false,
            //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
            contentType: false,
            success: function (result, status) {
                let str=JSON.parse(result)
                //console.log(str);
                window.open("http://dic-con.vbfaka.com:"+str[1]+"", '_blank', 'location=yes,height=1080,width=1920,scrollbars=yes,status=yes');
            }
        });
    }*/
    /*
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
            url: 'http://dic-con.vbfaka.com/sys/user/container/prg/kube_gotty_container.php',
            // dataType: "json",
            data: fddjs,
            processData: false,
            //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
            contentType: false,
            success: function (result, status) {
                let str=JSON.parse(result)
               window.open("http://dic-con.vbfaka.com:"+str[1]+"/?arg="+str[0]+"", '_blank', 'location=yes,height=1080,width=1920,scrollbars=yes,status=yes');
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
            url: 'http://dic-con.vbfaka.com/sys/user/container/prg/kube_see_gotty.php',
            // dataType: "json",
            data: fddjs,
            processData: false,
            //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
            contentType: false,
            success: function (result, status) {
                let xtream = `<iframe frameborder="0" noresize="noresize" src="http://120.114.142.17:` + see_port + `/?arg=` + result + `" frameborder="0" style=" width: 100%; height:100%;"></iframe>`
                $('#xtream').html(xtream);
            }
        });
    }*/
