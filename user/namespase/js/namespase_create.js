const fddyaml = new FormData();
fddyaml.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
let name = localStorage.getItem("name");
$(document).ready(function () {
    $("#yaml").click(function () {
        var fddyaml = new FormData();
        fddyaml.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
        fddyaml.append('course', $('#course').val());
        fddyaml.append('contianername', $('#contianername').val());
        fddyaml.append('images', $('#images').val());
        fddyaml.append('cpu', $('#cpu').val());
        fddyaml.append('memory', $('#memory').val());
        fddyaml.append('volume', $('#volume').val());
        $.ajax({ //kubectll get pods
            type: "post",
            url: 'http://120.114.142.17/sys/namespase/prg/kube_ns_create.php',
            // dataType: "json",
            data: fddyaml,
            processData: false,
            //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
            contentType: false,
            success: function (result, status) {
                alert("ok");
            }
        });
    });
});
function time(id){
    let timefrom="";
       if(id=="no"){
            timefrom=`
            
            <label for="timetmsdir" class="col-sm-2 col-form-label">你希望於</label>

            <div class="col-sm-4 pt-2">
                <input type="datetime-local" id="meeting-time" name="meeting-time"
                    value="2018-06-12T19:30" min="2018-06-07T00:00" max="2018-06-14T00:00">
            </div>
            <div class="col-sm-1 pt-2">
                    至
            </div>
            <div class="col-sm-4 pt-2">
                <input type="datetime-local" id="meeting-time" name="meeting-time"
                    value="2018-06-12T19:30" min="2018-06-07T00:00" max="2018-06-14T00:00">
            </div>
            `;
       }
       document.getElementById('timeadd').innerHTML=timefrom;
}
function create_container(result){
    if(result=="true"){
        let new_container=`
        <h1 class="text-center my-4 "><b>建立容器</b></h1>
    <div class="form-group row  my-2">
        <label for="contianer" class="col-sm-2 col-form-label">容器名</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" id="container_name" placeholder="contianer name">
        </div>
    </div>
    <div class="form-group row my-2">
        <label for="images" class="col-sm-2 col-form-label">選擇映像檔</label>
        <div class="col-sm-10 py-2">
            <select class="form-control form-control-sm" id="container_image">
                <option value="rockylinux" selected>預設(rockylinux)</option>
                <option value="rockylinux" >rockylinux</option>
                <option value="mysql">mysql</option>
                <option value="httpd">httpd</option>
            </select>
        </div>
    </div>
    <div id="httpifname">
        <div class="form-group row my-2">
            <label for="images" class="col-sm-2 col-form-label">容量</label>
            <div class="col-sm-4 py-2">
                <select class="form-control form-control-sm" id="container_volume">
                    <option value="0.5">0.5</option>
                </select>
            </div>
        </div>
        <div class="form-group row my-2 ">
            <label for="cpu" class="col-sm-2 col-form-label">cpu</label>
            <div class="col-sm-4 py-2">
                <select class="form-control form-control-sm" id="container_cpu">
                    <option value="0.5">0.5</option>
                </select>
            </div>
            <label for="memory" class="col-sm-2 col-form-label">memory</label>
            <div class="col-sm-4 py-2">
                <select class="form-control form-control-sm" id="container_memory">
                    <option value="0.5">0.5</option>
                </select>
            </div>
        </div>
    </div>`;
    let new_buttom=`<button type="submit" class="btn btn-primary my-1" id="create" onclick="new_create()">建立</button>
    <button type="submit" class="btn btn-primary my-1" id="create_container" onclick="create_container('false')">取消</button>`
    document.getElementById('new_container').innerHTML=new_container;
    document.getElementById('new_button').innerHTML=new_buttom;
    }else{
        let new_buttom=`<button type="submit" class="btn btn-primary my-1" id="create_container" onclick="create_container('true')">需同時部署容器</button>
        <button type="submit" class="btn btn-primary my-1" id="create_namespase" onclick="new_namespase()">直接建立</button>`
        document.getElementById('new_container').innerHTML="";
        document.getElementById('new_button').innerHTML=new_buttom;
    }
}
function new_namespase(){
    let namepase_name=document.getElementById('namepase_name').value;
    let namepase_student=document.getElementById('namepase_student').value;
    let new_namepase_student = namepase_student.replace(/\n/gi,' ');
    fddyaml.append('name',name);
    fddyaml.append('namepase_name',namepase_name);
    fddyaml.append('namepase_student', new_namepase_student);
    $.ajax({ //kubectll get pods
        type: "post",
        url: 'http://120.114.142.17/sys/user/namespase/prg/kube_ns_create.php',
        // dataType: "json",
        data: fddyaml,
        processData: false,
        //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
        contentType: false,
        success: function (result, status) {
            alert(result);
        }
    });
}
function new_container(){
    let namepase_name=document.getElementById('namepase_name').value;
    let container_name=document.getElementById('container_name').value;
    let container_image=document.getElementById('container_image').value;
    let container_volume=document.getElementById('container_volume').value;
    let container_cpu=document.getElementById('container_cpu').value;
    let container_memory=document.getElementById('container_memory').value;
    fddyaml.append('namepase_name',namepase_name);
    fddyaml.append('container_name',container_name);
    fddyaml.append('container_image', container_image);
    fddyaml.append('container_volume',container_volume);
    fddyaml.append('container_cpu', container_cpu);
    fddyaml.append('container_memory',container_memory);
    $.ajax({ //kubectll get pods
        type: "post",
        url: 'http://120.114.142.17/sys/user/namespase/prg/kube_container_create.php',
        // dataType: "json",
        data: fddyaml,
        processData: false,
        //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
        contentType: false,
        success: function (result, status) {
            alert(result);
        }
    });
}

function new_create(){
    new_namespase()
    new_container()
}
