const fddjs = new FormData();
fddjs.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
let name = localStorage.getItem("user");

sessionStorage.removeItem("student");
sessionStorage.removeItem("image");
$(document).ready(function () {
    opticon()
});
function opticon(){
    let images_total=''
    if(sessionStorage.getItem('image') != null){
        let student_table='';
        let arr=sessionStorage.getItem('image');
        arr=JSON.parse(arr);
        images_total=arr.length;
    }else{
        images_total=0;
    }
    document.getElementById('namespace_images_total').innerHTML = "<b>目前硬碟數量為:"+images_total+"顆</b>";

    let students_total=''
    if(sessionStorage.getItem('student') != null){
        let student_table='';
        let arr=sessionStorage.getItem('student');
        arr=JSON.parse(arr);
        students_total=arr.length;
    }else{
        students_total=0;
    }
    document.getElementById('namespace_students_total').innerHTML = "<b>目前學生數量為:"+students_total+"人</b>";
}
function add_namespace_students() {
    let table = `<thead>
    <tr>
    <th scope="col"></th>
      <th scope="col">學號</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
  <tr><th scope="row"><a class="button" id="studnet_up"><i class="fa fa-arrow-left"></i></a>
  </th><td id="add_student_res"></td"><td id="add_button"></td"></tr>
  </tbody>
  <tbody id="images">

  </tbody>`

    document.querySelector('table').innerHTML = table;
    document.getElementById("studnet_up").addEventListener("click", add_namespace_students);
    if(sessionStorage.getItem('student') != null){
        let student_table='';
        let arr=sessionStorage.getItem('student');
            Object.entries(JSON.parse(arr)).forEach(([rekey, revalue]) => {
                student_table=`<tr><th scope="row">
                </th><td>`+revalue+`</td><td><i class="	fa fa-remove px-1 text-danger" onclick="remove_namespace_students('`+rekey+`')"></i></tr>`+student_table;
            });
        document.getElementById('images').innerHTML = student_table;
    }
    table = `
  <input class="mx-2" type="radio" name="student1" onclick="add_students('year')" value="yes">學年
  <input class="mx-2" type="radio" name="student1" onclick="add_students('student')" value="no">學號`
    document.getElementById('add_student_res').innerHTML = table;
    document.getElementById("add_button").innerHTML=``;

}
function add_students(value) {
    if(value=="student"){
        document.getElementById("add_button").innerHTML=`<button type="button" class="btn btn-success px-2" onclick="student_status('value')"><i class="fa fa-plus-square-o"></i>新增</button>`;
        document.getElementById("add_student_res").innerHTML=`
        <input type="text" class="form-control" id="value_student" placeholder="請輸入學號">`;
    }else if(value=="year"){
        document.getElementById("add_button").innerHTML=`<button type="button" class="btn btn-success px-2" onclick="student_status('select')"><i class="fa fa-plus-square-o"></i>新增</button>`;
        fddjs.append('status', 'status');
        $.ajax({ //kubectll get pods
            type: "post",
            url: 'http://dic-con.vbfaka.com/sys/user/namespase/prg/kube_add_student.php',
            // dataType: "json",
            data: fddjs,
            processData: false,
            //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
            contentType: false,
            success: function (result, status) {
                let table = "";
                table = `<option value="" class="text-secondary">請選擇要添加的年級</option>`;
                Object.entries(JSON.parse(result)).forEach(([key, value]) => {
                    table = table + `<option value="` + value.year + `">` + value.year + `</option>`;
                });
                table = `<select class="form-select" aria-label="Default select example" id="value_student" required>` + table + `</select>`;
                $("#add_student_res").html(table);
            }
    
        });
    }

}

function remove_namespace_students(total){
    let arr=sessionStorage.getItem('student');
    arr=JSON.parse(arr);
    delete arr[total];
    arr=arr.filter(el => el);
    arr=JSON.stringify(arr);
    sessionStorage.setItem('student',arr);
    opticon();
    add_namespace_students();
}
function student_status(status) {
    let value = document.querySelector("#value_student").value;
    fddjs.append('status', status);
    fddjs.append('value', value);
    $.ajax({ //kubectll get pods
        type: "post",
        url: 'http://dic-con.vbfaka.com/sys/user/namespase/prg/kube_add_student.php',
        data: fddjs,
        dataType: "json",
        processData: false,
        contentType: false,
        success: function (result) {
            if(status=="select"){
                arr=sessionStorage.getItem('student');
                if(arr=="[]"||arr==null){
                    session_student=[];
                    Object.entries(result).forEach(([key, value]) => {
                        session_student.push(value["username"]);
                    });   
                    sessionStorage.setItem('student',JSON.stringify(session_student));
                }else{
                    session_student=JSON.parse(arr);
                    console.log(session_student);
                    Object.entries(result).forEach(([key, value]) => {
                        if(session_student.indexOf(''+value["username"]+'')== -1 ){
                            console.log(session_student.indexOf(''+value["username"]+''));
                            session_student.push(value["username"]);
                        }else{
                            return alert("已新增");
                        }
                    });
                    sessionStorage.setItem('student',JSON.stringify(session_student));
                }

                /*
                student=[];
                student.push(result);
                let arr='';
                arr=sessionStorage.getItem('student');
                arrs="["+sessionStorage.getItem('student')+"]";
                if(arr==null){
                    sessionStorage.setItem('student',student);
                }else{
                    let status="0";
                    Object.entries(JSON.parse(arrs)).forEach(([key, value]) => {
                        if(value[0]==JSON.parse(result)[0]){
                            console.log(value[0]);
                            alert('已有該學生');
                            status="1";
                            return;
                        }
                    });
                    if( status=="0"){
                        student.push(arr);
                        sessionStorage.setItem('student',student);
                    }
                }*/

            }
            
            if(status=="value"){
                if(result[0]==true){
                    arr=sessionStorage.getItem('student');
                    if(arr=="[]"||arr==null){
                        session_student=[];
                        session_student.push(result[1][0]["username"]);
                        sessionStorage.setItem('student',JSON.stringify(session_student));
                    }else{
                        session_student=JSON.parse(arr);
                        if(session_student.indexOf(''+result[1][0]["username"]+'')== -1 ){
                            console.log(session_student.indexOf(''+result[1][0]["username"]+''));
                            session_student.push(result[1][0]["username"]);
                        }else{
                            return alert("已新增");
                        }
                        sessionStorage.setItem('student',JSON.stringify(session_student));
                    }
                    
                    /*else {
      
                    }*/
                    /*
                    if(JSON.parse(arr)[0]==JSON.parse(result)[1][0]["year"]){

                    }else if(JSON.parse(arr)[0]!=JSON.parse(result)[1][0]["year"]){

                    }*/
                }else{
                    alert("該學生不存在");
                }
            }
            add_namespace_students();
            opticon();
        }
    });
}
function add_namespace_images() {
    let images_table = `<thead>
    <tr>
    <th scope="col"></th>
      <th scope="col">硬碟</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
  <tr><th scope="row"><a class="button" id="images_up"><i class="fa fa-arrow-left"></i></a>
  </th><td id="add_student_res"></td"><td id="add_button"></td"></tr>
  </tbody>
  <tbody id="images">

  </tbody>`;
  document.querySelector('table').innerHTML = images_table;
  document.getElementById("images_up").addEventListener("click", add_namespace_images);

    if(sessionStorage.getItem('image') != null){
        let image_arr= sessionStorage.getItem('image');
        let images_table="";
        let array=[];
        Object.entries(JSON.parse(image_arr)).forEach(([key, value]) => {
            if(value!=""){
                images_table=images_table+`<tr><th scope="row">
                </th><td>`+value[1]+`</td><td><i class="fa fa-remove px-1 text-danger" onclick="remove_namespace_images('`+key+`')"></i></tr>`
            }
        });
        document.getElementById('images').innerHTML = images_table;
    }

    document.getElementById('add_student_res').innerHTML = `<input class="mx-2" type="radio" name="sex1" onclick="images_add('defaults')" value="yes">本地倉庫
    <input class="mx-2" type="radio" name="sex1" onclick="images_add('`+ name + `')" value="no">` + name + `的倉庫`;
    document.getElementById("add_button").innerHTML=``;
}
function images_add(images_user) {
    fddjs.append('username', images_user);
    fddjs.append('status', 'radio');
    $.ajax({ //kubectll get pods
      type: "post",
      url: 'http://dic-con.vbfaka.com//sys/user/images/prg/topic_images_status.php',
      data: fddjs,
      //  dataType: "json",
      processData: false,
      contentType: false,
      success: function (result, status) {
        let obj=JSON.parse(result);
        
        let table = "";
        if(JSON.parse(obj)[0]=='true'){
          let obj_var=JSON.parse(obj)[1];
          Object.entries(obj_var).forEach(([key, value]) => {
            if(value.comment==undefined){
                let str = value.name
                table = table + `<option value = "` +value.user+ `.` + str + `:`+value.tag+`" >` + str + `:`+value.tag+`</option> `;
            }else{
                let str = value.name
                table = table + `<option value = "` +value.user+ `.` + str + `:`+value.tag+`" >` + JSON.parse(value.comment)[0] + `:`+value.tag+`</option> `;
            }    
          });
          table = `<select class="form-select" aria - label="Default select example" id="image_sta" required > ` + table + `</select > `;
          document.getElementById('add_student_res').innerHTML = table;
        }else{
          table = `<select class="form-select" aria - label="Default select example"  id="image_sta" required ><option value="fales">未擁有映像檔</option></select > `;
          document.getElementById('add_student_res').innerHTML = table;
        }
        document.getElementById("add_button").innerHTML=`<button type="button" class="btn btn-success px-2" onclick="image_status('value')"><i class="fa fa-plus-square-o"></i>新增</button>`;
      }
    });
}
function remove_namespace_images(total){
    let image_arr= sessionStorage.getItem('image');
    image_arr=JSON.parse(image_arr);
    delete image_arr[total];
    image_arr=image_arr.filter(el => el)
    image_arr=JSON.stringify(image_arr)
    sessionStorage.setItem('image',image_arr)
    add_namespace_images();
    opticon();
}
function image_status(){
    image_arr=[]
    image_arr_group=[]
    let image_value=document.getElementById('image_sta').value
    image_arr_group.push(image_value);
    image_value_if=image_value.split('.') 
    if(image_value_if[0]=="defaults"){
        let image_value=document.getElementById('image_sta').value
        image_arr_group.push(image_value);
    }else{
        let image_text=document.getElementById('image_sta').innerText
        image_arr_group.push(image_text);
    }
    let session=sessionStorage.getItem('image')

    let image_status="0";
    if(session==null ){
        image_arr.push(image_arr_group);
        image_arr=JSON.stringify(image_arr);
        sessionStorage.setItem('image',image_arr)
    }else{
        image_session=JSON.parse(session);
        Object.entries(image_session).forEach(([key, value]) => {
            if(value[0]==image_value){
                alert("硬碟以新增")
                image_status="1";
            }
        });
        if(image_status=="0"){
            image_session=JSON.parse(session);
            image_session.push(image_arr_group);
            image_session=JSON.stringify(image_session);
            sessionStorage.setItem('image',image_session)
            /*
            image_arr.push(image_arr_group);
            image_arr=JSON.stringify(image_arr);
            sessionStorage.setItem('image',image_arr)*/
        }

    }
    opticon();
   add_namespace_images();
}


























//////舊程式碼
function imagesadd2(images_user) {
    fddyaml.append('name', images_user);
    fddjs.append('status', 'load');
    $.ajax({ //kubectll get pods
        type: "post",
        url: 'http://dic-con.vbfaka.com/sys/user/images/prg/topic_images_status.php',
        data: fddyaml,
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
                    if (value.name.replace(/\/+\w+\w/gi, '') == images_user.toLowerCase()) {
                        let str = value.name + ":" + value.tag
                        //str = str.replace('10.255.1.254:5000/defaults/', '')
                        table = table + `<option value="` + str + `">` + str + `</option>`;
                    }
                });
            }
            table = `<select class="form-select" aria-label="Default select example" id="container_image" required>` + table + `</select>`;
            document.getElementById('option_value').innerHTML = table;
            //    images_dropdown_status()
        }
    });
}
function images_dropdown_status() {
    let select = document.querySelector("#select-set");
    select.addEventListener('change', showValue);
    function showValue(e) {
        let values = this.value
        let result = `<div class="toast show m-1">
        <div class="toast-header toast-headers">
          <strong class="me-auto imgstr">`+ values + `</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
        </div>
      </div>`
        $(".toast-header").each(function () {
            let textValues = $(this).children('strong').map(function () {
                return $(this).text();
            }).get();
            if (textValues[0] == values) {
                result = "";
            }
        });
        let opacity_value = document.getElementById('option_value').innerHTML
        document.getElementById('option_value').innerHTML = opacity_value + result;
    }
}

function time(id) {
    /*
    let timefrom = "";
    if (id == "no") {

    }
    document.getElementById('timeadd').innerHTML = timefrom;*/
}
function create_container(result) {
    if (result == "true") {
        let new_container = `
        <h4 class="text-center my-4 "><b>建立容器</b></h4>
    <div class="form-group row  my-2">
        <label for="contianer" class="col-sm-2 col-form-label">容器名</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" id="container_name" placeholder="contianer name">
        </div>
    </div>
    <div class="form-group row my-2 imagestatus2" id="imagestatus">

    </div>`;
        let new_buttom = `<button type="submit" class="btn btn-primary my-1" id="create" onclick="new_create()">建立</button>
    <button type="submit" class="btn btn-primary my-1" id="create_container" onclick="create_container('false')">取消</button>`
        document.getElementById('new_container').innerHTML = new_container;
        document.getElementById('new_button').innerHTML = new_buttom;
    } else {
        let new_buttom = `<button type="submit" class="btn btn-primary my-1" id="create_container" onclick="create_container('true')">需同時部署容器</button>
        <button type="submit" class="btn btn-primary my-1" id="create_namespase" onclick="new_namespase()">直接建立</button>`
        document.getElementById('new_container').innerHTML = "";
        document.getElementById('new_button').innerHTML = new_buttom;
    }
    let imagestatus =`<div class="col-sm-4 pt-2">
        <input class="mx-2" type="radio" name="sex2" onclick="imagesadd2('defaults')" value="yes" >defaults
        <input class="mx-2" type="radio" name="sex2" onclick="imagesadd2('`+ name + `')" value="no">` + name + `<p>
    </div>
    <div class="col-sm-4 pt-2" id="imagesadd2"></div>`;
    document.querySelector('.imagestatus2').innerHTML = imagestatus;
}
/*
function add_students() {
    fddyaml.append('status', 'status');
    $.ajax({ //kubectll get pods
        type: "post",
        url: 'http://dic-con.vbfaka.com/sys/user/namespase/prg/kube_add_student.php',
        // dataType: "json",
        data: fddyaml,
        processData: false,
        //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
        contentType: false,
        success: function (result, status) {
            
            let table = "";
            table = `<option value="" class="text-secondary">請選擇要添加的年級</option>`;
            Object.entries(JSON.parse(result)).forEach(([key, value]) => {
                table = table + `<option value="` +value.year+ `">` + value.year + `</option>`;
                
            });
            table = `<select class="form-select" aria-label="Default select example" id="select-set-student" required>` + table + `</select>`;
            $("#add_students_set").append(table);
             //document.getElementById('add_students').innerHTML = table;
            student_status();
            //document.location.href = "http://dic-con.vbfaka.com/sys/user/namespase/namespase.html";
        }
        
    });
}*/

function new_namespase() {
    let namepase_name = document.getElementById('namepase_name').value;
    let student='';
    let image='';
    if(!namepase_name ){
        $(".invalid-feedback-login").show('fast');
        $(".invalid-feedback-login").text("錯誤: 請輸入課程名");
        stlye_border=`border-color: #dc3545;
        padding-right: calc(1.5em + 0.75rem);
        background-image: url(data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e);
        background-repeat: no-repeat;
        background-position: right calc(0.375em + 0.1875rem) center;
        background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);`
        document.getElementById('namepase_name').style=stlye_border;
        document.getElementById('namepase_name').addEventListener("change",function(){
            document.getElementById('namepase_name').style=``;
            $(".invalid-feedback-login").hide('fast');
        })
    }else{
        $('#k8s_Modal').modal('show');
        arr=sessionStorage.getItem('student');
        
        if(arr!=null){
            arrs=sessionStorage.getItem('student');
            Object.entries(JSON.parse(arrs)).forEach(([key, value]) => {
                student=student+` `+value;
            });
        }
        console.log(student);
        images=sessionStorage.getItem('image');
        if(images!=null){
            Object.entries(JSON.parse(images)).forEach(([key, value]) => {
                image=image+` `+value[0].replace(':', '.')
            });
         }
        fddjs.append('name', name);
        fddjs.append('namepase_name', namepase_name);
        fddjs.append('namepase_student', student);
        fddjs.append('namepase_images', image);
        fddjs.append('namepase_status', $('input[name=sex]:checked').val());
        $.ajax({ //kubectll get pods
            type: "post",
            url: 'http://dic-con.vbfaka.com/sys/user/namespase/prg/kube_ns_create.php',
            // dataType: "json",
            data: fddjs,
            processData: false,
            //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
            contentType: false,
            success: function (result, status) {
                let obj=JSON.parse(result);
                if(obj[1]=="exist"){
                    $(".invalid-feedback-login").show('fast');
                    $(".invalid-feedback-login").text("錯誤: 課程名已存在");
                    stlye_border=`border-color: #dc3545;
                    padding-right: calc(1.5em + 0.75rem);
                    background-image: url(data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e);
                    background-repeat: no-repeat;
                    background-position: right calc(0.375em + 0.1875rem) center;
                    background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);`
                    document.getElementById('namepase_name').style=stlye_border;
                    document.getElementById('namepase_name').addEventListener("change",function(){
                        document.getElementById('namepase_name').style=``;
                        $(".invalid-feedback-login").hide('fast');

                    })
                    setTimeout(function(){
                        $('#k8s_Modal').modal('hide');
                    },1000);
                }else{
                     document.location.href = "http://dic-con.vbfaka.com/sys/user/namespase/namespase.html";
                }
            }
    
        });
    }
}
/*
function new_container() {
    let namepase_name = document.getElementById('namepase_name').value;
    let container_name = document.getElementById('container_name').value;
    let container_image = document.getElementById('container_image').value;
    let container_volume = document.getElementById('container_volume').value;
    let container_cpu = document.getElementById('container_cpu').value;
    let container_memory = document.getElementById('container_memory').value;
    fddyaml.append('name', name);
    fddyaml.append('namepase_name', namepase_name);
    fddyaml.append('container_name', container_name);
    fddyaml.append('container_image', container_image);
    fddyaml.append('container_volume', container_volume);
    fddyaml.append('container_cpu', container_cpu);
    fddyaml.append('container_memory', container_memory);
    $.ajax({ //kubectll get pods
        type: "post",
        url: 'http://dic-con.vbfaka.com/sys/user/namespase/prg/kube_container_create.php',
        // dataType: "json",
        data: fddyaml,
        processData: false,
        //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
        contentType: false,
        success: function (result, status) {
            document.location.href = "http://dic-con.vbfaka.com/sys/user/namespase/namespase.html";
        }
    });
}


function new_create() {
    new_namespase()
    new_container()
}
*/