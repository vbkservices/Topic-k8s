
let fddjs = new FormData();
let name = localStorage.getItem("user");
let iden = localStorage.getItem("iden");
fddjs.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
fddjs.append('name', name);
window.onload = function () {
    if(iden=="teacher"){
        document.getElementById('iden_nav').innerHTML=`
        <nav style="--bs-breadcrumb-divider: '';" aria-label="breadcrumb">
            <ol class="breadcrumb fs-5">
            <li class="breadcrumb-item mx-2">
               <a href="http://dic-con.vbfaka.com/sys/user/namespase/namespase.html"><i class="fa fa-search px-1"></i>查看課程</a></li>
            <li class="breadcrumb-item"><a 
                    href="http://dic-con.vbfaka.com/sys/user/namespase/namespase_create.html"><i class="fa fa-plus-square-o px-1"></i>建立課程</a></li>
            </ol>
        </nav>`;
     /*   vars=`<th scope="col"></th>`;*/
    }else if(iden=="student"){
        document.getElementById('iden_nav').innerHTML=`
        <nav style="--bs-breadcrumb-divider: '';" aria-label="breadcrumb">
        <ol class="breadcrumb fs-5">
        <li class="breadcrumb-item mx-2"><a 
        href="#" id="reset"><i class="fa fa-refresh px-1"></i>更新課程</a></li>
        <li class="breadcrumb-item"></li>
        </ol></nav>`;
        /*vars=``;*/
    }
    document.getElementById('namespace_table').innerHTML=`
    <tr class="fs-4">
    <th scope="col">課程</th>
    <th scope="col">建立時間</th>
    <th scope="col">建立者</th>
    <th scope="col" id="namepase_reset"></th>

    </tr>`;
    document.getElementById('namepase_reset').innerHTML=`<button href="#" class="btn btn-secondary btn-sm fs-6" type="button" id="reset"><i class="fa fa-refresh px-1"></i>更新課程</button>`;
    document.getElementById('reset').addEventListener("click",function(){
        namespace_table();
    })
    namespace_table();
}
function namespace_table() {
    fddjs.append('status', "namespace");
    $.ajax({ //kubectll get pods
        type: "post",
        url: 'http://dic-con.vbfaka.com/sys/user/namespase/prg/kube_namespase.php',
       // dataType: "json",
        data: fddjs,
        processData: false,
        //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
        contentType: false,
        success: function (result, status) {

            var demo = JSON.parse(result);
            console.log(demo);
            /*alert(demo.items[0].metadata);*/
            var table1 = "";
            let imageuser = "";
            
            Object.entries(demo).forEach(([key, value]) => {
                 if(value[3]=='hide'){
                     if(iden=="teacher"){
                        table1 = table1 + (`
                        <tr class="h4 text-secondary"><th scope="row">${value[4]}</th><td><b>${value[2]}</b></td><td><b>${value[1]}</b>
                                </td><td><button  type="button" class="btn btn-success"  onclick="status_pod('${value[0]}')"><b>進入課程</b></button>
                                <button class="btn btn-primary" type="button" onclick="open_office('${value[0]}')">設定</button>     
                                </td></tr>
                        `);
                     }else if(iden=="student"){
                        table1 = table1+``;
                     }
                 }
                 if(value[3]=='show'){
                    if(iden=="teacher"){
                        vars = `<button class="btn btn-primary" type="button" onclick="open_office('${value[0]}')">設定</button></td>`;
                     }else if(iden=="student"){
                        vars =``;
                     }
                    table1 = table1 + (`
                    <tr class="h4"><th scope="row"> ${value[4]}</th><td><b>${value[2]}</b></td><td><b>${value[1]}</b>
                            </td><td><button  type="button" class="btn btn-success"  onclick="status_pod('${value[0]}')"><b>進入課程</b></button>
                            `+vars+`
                            <!--td id="images_delete"></td--></tr>
                    `);
                 }
                 if(value[3]=='delete'){
                    table1 = table1 + (`
                    <tr class="h4"><th scope="row">${value[4]}</th><td><b>${value[2]}</b></td><td><b>${value[1]}</b>
                            </td><td><b>刪除中<div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                          </div></b></td>
                            <!--td id="images_delete"></td--></tr>
                    `);
                    setTimeout(function(){
                        namespace_table();
                    },2500);

                 }

            });
            $('#namespace_status').html(table1);
        }
    });
    var myOffcanvas = document.getElementById('offcanvasBottom')


}

function open_office(namepase){

    var myOffcanvas = document.getElementById('offcanvasBottom')
    var bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas)
    bsOffcanvas.show()
    namespase_status_status(namepase)
    namespase_images_status(namepase);
    namespase_student_status(namepase);
}
function namespase_status_status(namepase){

    fddjs.append('namepase', namepase);
    fddjs.append('status', "namespace_pods");
    $.ajax({ //kubectll get pods
        type: "post",
        url: 'http://dic-con.vbfaka.com/sys/user/namespase/prg/kube_namespase.php',
        dataType: "json",
        data: fddjs,
        processData: false,
        //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
        contentType: false,
        success: function (result, status) {
            let obj=JSON.parse(result);
            let table="";
            table=table+`</p><div class="col-6 text-end"><b>課程名稱:</b></div><div class="col-6 text-start"><b>`+obj["name"]+`</b></div></p>`;
            table=table+`<div class="col-6 text-end"><b>建立者:</b></div><div class="col-6 text-start"><b>`+obj["user"]+`</b></div></p>`;
            table=table+`<div class="col-6 text-end"><b>課程分享:</br>(port號)</b></div><div class="col-6 text-start"><b>`+obj["seeport"]+`</b></div></p>`;
            table=table+`<div class="col-6 text-end"><b>學生名單:</b></div><div class="col-6 text-start"><b>`+obj["student"]+`人</b></div></p>`;
            table=table+`<div class="col-6 text-end"><b>硬碟數量:</b></div><div class="col-6 text-start"><b>`+obj["image"]+`顆</b></div></p>`;
            if(obj["status"]=="show"){
                button=`<div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="checkbox" checked>
                <label class="form-check-label" for="flexSwitchCheckChecked">顯示</label>
                </div>`
            }else if(obj["status"]=="hide"){
                button=`<div class="form-check form-switch">
                <input class="form-check-input" type="checkbox"  id="checkbox">
                <label class="form-check-label" for="flexSwitchCheckChecked">隱藏</label>
                </div>`
            }
            table=table+`<div class="col-6 text-end"><b>課程狀態:</b></div><div class="col-6 text-start"><b>`+button+`</b></div></p>`;
            table=table+`<div class="col-6 text-end"></div><div class="col-6 text-start"><button type="button" class="btn btn-danger" onclick="nsdelete('`+obj["name"]+`','delete')"><b>刪除課程</b></button></div></p>`;
            table=`<div class="row fs-5"><div class="col-12 text-center fs-4  border-bottom border-secondary "><b>課程資訊</b></div>`+table+`</div>`;

            $('#v-pills-class').html(table);
            document.getElementById('checkbox').addEventListener('click',function(){
                namecpase_label_status(namepase,obj["status"])
            })
        }
    });
}
//新增硬碟資訊
function namespase_images_status(namepase){
    fddjs.append('namepase', namepase);
    fddjs.append('status', 'status');
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
            //image 查看
           
            let namespace_table='';
            Object.entries(result).forEach(([rekeys, revalues]) => {
                if(revalues[3]=="show"){
                    status=`<input class="form-check-input" type="checkbox" onclick="image_label_status('`+namepase+`','`+revalues[0]+`.`+revalues[1]+`.`+revalues[2]+`','show')" checked>`
                    image=`<b class="text-dark">`+revalues[4]+`<b/>`
                }else if(revalues[3]=="hide"){
                    status=`<input class="form-check-input" type="checkbox" onclick="image_label_status('`+namepase+`','`+revalues[0]+`.`+revalues[1]+`.`+revalues[2]+`','hide')">`
                    image=`<b class="text-secondary">`+revalues[4]+`<b/>`
                }
                namespace_table=namespace_table+`
                <tr>
                <th scope="row">
                <div class="form-check form-switch">
                  `+status+`
                </div></th>
                <td>`+image+`</td>
                <td><button type="button" class="btn btn-danger px-2" onclick="namespace_action_val('remove','','image','`+namepase+`','`+revalues[0]+`.`+revalues[1]+`:`+revalues[2]+`')"><i class="fa fa-minus mx-1"></i>移除</button></td></tr>`;

            });
            let table = `<thead><tr>
              <th scope="col" colspan="3">硬碟名單</th>
            </tr>
          </thead>
          <tbody>
          <tr><th scope="row"><a class="button" id="image_up"><i class="fa fa-arrow-left"></i></a></th>
          <td id="add_image_res"></td">
          <td id="add_images_button"></td"></tr>
          </tbody>
          <tbody id="images">
          `+namespace_table+`
          </tbody>`
          document.querySelector('#v-pills-imges table').innerHTML = table;
          document.getElementById("image_up").addEventListener("click", function(){
            console.log("123");
            document.getElementById('add_image_res').innerHTML = `
            <input class="mx-2" type="radio" name="sex1" onclick="images_add('defaults','`+namepase+`')" value="yes">本地倉庫
            <input class="mx-2" type="radio" name="sex1" onclick="images_add('`+ name + `','`+namepase+`')" value="no">` + name + `的倉庫`;
            document.getElementById('add_images_button').innerHTML = ``;  
          });
          document.getElementById('add_image_res').innerHTML = `
          <input class="mx-2" type="radio" name="sex1" onclick="images_add('defaults','`+namepase+`')" value="yes">本地倉庫
          <input class="mx-2" type="radio" name="sex1" onclick="images_add('`+ name + `','`+namepase+`')" value="no">` + name + `的倉庫`;
        }
    });
}
//新增硬碟 : 選擇倉庫
function images_add(images_user,namespace) {
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
            let str="";
              if(images_user=="defaults"){
                str = value.name
              }else{
                str = JSON.parse(value.comment)[0];
              }

              table = table + `<option value = "`+value.user+`.` + value.name + `:`+value.tag+`" >` + str + `:`+value.tag+`</option> `;
          });
          table = `<select class="form-select" aria - label="Default select example" id="image_sta" required > ` + table + `</select > `;
          document.getElementById('add_image_res').innerHTML = table;
        }else{
          table = `<select class="form-select" aria - label="Default select example"  id="image_sta" required ><option value="fales">未擁有映像檔</option></select > `;
          document.getElementById('add_image_res').innerHTML = table;
        }
        document.getElementById("add_images_button").innerHTML=`<button type="button" class="btn btn-success px-2" onclick="namespace_action_val('add','`+images_user+`','image','`+namespace+`')"><i class="fa fa-plus-square-o"></i>新增</button>`;
      }
    });
}
//image 顯示/影藏
function image_label_status(namepase,images,status){
    fddjs.append('type', "image");
    fddjs.append('namepase', namepase);
    fddjs.append('value', images);
    fddjs.append('status', status);
    $.ajax({ //kubectll get pods
        type: "post",
        url: 'http://dic-con.vbfaka.com/sys/user/namespase/prg/kube_namespase_action.php',
       // dataType: "json",
        data: fddjs,
        processData: false,
        //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
        contentType: false,
        success: function (result, status) {
            namespase_images_status(namepase)
            //console.log(result);
           // namespase_images_status(namespace)
        }
    });
}
//namespace 顯示/影藏
function namecpase_label_status(namepase,status){
    fddjs.append('type', "namespace");
    fddjs.append('namepase', namepase);
    fddjs.append('status', status);
    $.ajax({ //kubectll get pods
        type: "post",
        url: 'http://dic-con.vbfaka.com/sys/user/namespase/prg/kube_namespase_action.php',
       // dataType: "json",
        data: fddjs,
        processData: false,
        //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
        contentType: false,
        success: function (result, status) {
            namespase_status_status(namepase);
            namespace_table();
        }
    });
}
//namespace image 與 student 移除與新增的操作
//課程學生
function namespase_student_status(namepase){
   fddjs.append('namepase', namepase);
   fddjs.append('status', "status");
   fddjs.append('type', "student");
   $.ajax({ //kubectll get pods
       type: "post",
       url: 'http://dic-con.vbfaka.com/sys/user/namespase/prg/kube_namespase.php',
       dataType: "json",
       data: fddjs,
       processData: false,
       //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
       contentType: false,
       success: function (result, status) {
           //image 查看
           let namespace_table='';
           /** **/
           namespace_table='';
           Object.entries(result).forEach(([rekeys, revalues]) => {
               namespace_table=namespace_table+`
               <tr>
               <th scope="row">`+revalues[0]+`</th>
               <td>`+revalues[1]+`</td>
               <td> <button type="button" class="btn btn-danger px-2" onclick="namespace_action_val('remove','`+revalues[0]+`','student','`+namepase+`')"><i class="fa fa-minus mx-1"></i>移除</button></td></tr>`;
              
           });
           table = `<thead><tr>
           <th scope="col" colspan="3">學生名單</th>
         </tr>
       </thead>
       <tbody>
       <tr><th scope="row"><a class="button" id="student_up"><i class="fa fa-arrow-left"></i></a></th>
       <td id="add_student_res"></td">
       <td id="add_student_button"></td"></tr>
       </tbody>
       <tbody id="images">
       `+namespace_table+`
       </tbody>`
       document.querySelector('#v-pills-student table').innerHTML = table;
       document.getElementById("student_up").addEventListener("click", function(){
        namespase_images_status(namepase);
        table = `<input class="mx-2" type="radio" name="student1" onclick="add_students('year','`+namepase+`')" value="yes">學年
        <input class="mx-2" type="radio" name="student1" onclick="add_students('student','`+namepase+`')" value="no">學號`
        document.getElementById('add_student_res').innerHTML = table;
        document.getElementById('add_student_button').innerHTML = ``; 
      });
         table = `
         <input class="mx-2" type="radio" name="student1" onclick="add_students('year','`+namepase+`')" value="yes">學年
         <input class="mx-2" type="radio" name="student1" onclick="add_students('student','`+namepase+`')" value="no">學號`
       document.getElementById('add_student_res').innerHTML = table;
       }
   });
}
function add_students(value,namepase) {
    if(value=="student"){
        document.getElementById("add_student_button").innerHTML=`<button type="button" class="btn btn-success px-2" onclick="namespace_action_val('add','','student','`+namepase+`','value')"><i class="fa fa-plus-square-o"></i>新增</button>`;
        document.getElementById("add_student_res").innerHTML=`
        <input type="text" class="form-control" id="value_student" placeholder="請輸入學號">`;
    }else if(value=="year"){
        document.getElementById("add_student_button").innerHTML=`<button type="button" class="btn btn-success px-2" onclick="namespace_action_val('add','','student','`+namepase+`','select')"><i class="fa fa-plus-square-o"></i>新增</button>`;
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
                //document.getElementById('add_students').innerHTML = table;
    
                //document.location.href = "http://dic-con.vbfaka.com/sys/user/namespase/namespase.html";
            }
    
        });
    }
}
function namespace_action_val(status,user,type,namespace,value){
    fddjs.append('status', status);
    fddjs.append('type', type);
    fddjs.append('namespace', namespace);
    if(type=="image"){
        //新增images
         if(status=="add"){
             let value = document.querySelector("#image_sta").value;
             fddjs.append('name', user);
             fddjs.append('value', value);
         }
         if(status=="remove"){
             fddjs.append('value', value);
         }
             $.ajax({ //kubectll get pods
                 type: "post",
                 url: 'http://dic-con.vbfaka.com/sys/user/namespase/prg/kube_namespase_action.php',
                // dataType: "json",
                 data: fddjs,
                 processData: false,
                 //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
                 contentType: false,
                 success: function (result, status) {
                     let obj=JSON.parse(result)
                     if(obj[0]==true){
                         if(obj[2]=="image"){
                             if(obj[1]=="add"){
                                 alert("新增成功");
                             }
                             if(obj[1]=="remove"){
                                 alert("移除成功");
                             }
                         }
                     }else if(obj[0]==false){
                         if(obj[1]=="exist"){
                             alert("已有該硬碟");
                         }
                     }
                     namespase_images_status(namespace);

                 }
             });
    }
    if(type=="student"){
        if(status=="add"){
            fddjs.append('data', value);
            value = document.querySelector("#value_student").value;
            fddjs.append('value', value);
        }else if(status=="remove"){
            fddjs.append('value', user);
        }
        $.ajax({ //kubectll get pods
            type: "post",
            url: 'http://dic-con.vbfaka.com/sys/user/namespase/prg/kube_namespase_action.php',
            dataType: "json",
            data: fddjs,
            processData: false,
            //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
            contentType: false,
            success: function (result, status) {
                let acc='新增:\n';
                let err='已新增\n';
                Object.entries(result).forEach(([key, value]) => {
                    value=JSON.parse(value);
                    if(value[0]==true){
                        if(value[1]=="add"){
                            acc=acc+"學生:"+value[3]+"\n";
                        }
                        if(value[1]=="remove"){
                            acc='移除:\n';
                            err=''; 
                            acc=acc+"學生:"+value[3]+"\n";
                        }
                    }else if(value[0]==false){
                        if(value[1]=="exist"){
                            err=err+"學生:"+value[3]+"\n";
                        }
                    }
                });
                alert(acc+"\n"+err);
                namespase_student_status(namespace)
            }
        });
    }
 }


function namespase_status(namepase,status) {
    fddjs.append('type', "namespace");
    fddjs.append('namepase', namepase);
    fddjs.append('status', status);
    $.ajax({ //kubectll get pods
        type: "post",
        url: 'http://dic-con.vbfaka.com/sys/user/namespase/prg/kube_namespase.php',
        dataType: "json",
        data: fddjs,
        processData: false,
        //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
        contentType: false,
        success: function (result, status) {

        }
    });
}

function status_remove(namepase, images) {
    let images_add = images.replace(/\//g, "-");
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
        url: 'http://dic-con.vbfaka.com/sys/user/namespase/prg/kube_ns_delete.php',
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
    <input class="mx-2" type="radio" name="sex" onclick="imagesadd('defaults','`+ namepase + `')" value="yes">defaults
    <input class="mx-2" type="radio" name="sex" onclick="imagesadd('`+ name + `','` + namepase + `')" value="no">` + name + `<p>
</div>`;
    document.querySelector('#student_add').innerHTML = imagestatus;
}
function imagesadd(images_user, namepase) {
    fddjs.append('name', images_user);
    $.ajax({ //kubectll get pods
        type: "post",
        url: 'http://dic-con.vbfaka.com/sys/user/images/prg/images_status.php',
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
                    if (value.name.replace(/\/+\w+\w/gi, '') == images_user.toLowerCase()) {
                        let str = value.name + ":" + value.tag
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
        revalue = select.value.replace(/\//g, "-");
        revalue = revalue.replace(/\:/g, ".");
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
            url: 'http://dic-con.vbfaka.com/sys/user/namespase/prg/kube_add_images.php',
            //dataType: "json",
            data: fddjs,
            processData: false,
            //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
            contentType: false,
            success: function (result, status) {
                var myOffcanvas = document.getElementById('offcanvasBottom')
                var bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas)
                bsOffcanvas.hide();
                namespace_table();
            }
        });
    }
}
function nsdelete(namepase,status) {
    fddjs.append('type', "namespace");
    fddjs.append('namepase', namepase);
    fddjs.append('status', status);
    $.ajax({ //kubectll get pods
        type: "post",
        url: 'http://dic-con.vbfaka.com/sys/user/namespase/prg/kube_namespase_action.php',
        //dataType: "json",
        data: fddjs,
        processData: false,
        //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
        contentType: false,
        success: function (result, status) {
            location.reload();
        }
    });
    namespace_table()
}
function status_pod(namepase) {
    fddjs.append('status', "namespace");
    /*
    $.ajax({ //kubectll get pods
        type: "post",
        url: 'http://dic-con.vbfaka.com/sys/user/namespase/prg/kube_namespase.php',
       // dataType: "json",
        data: fddjs,
        processData: false,
        //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
        contentType: false,
        success: function (result, status) {
          
            var demo = JSON.parse(result);

            /*alert(demo.items[0].metadata);
            var table1 = "";
            let imageuser = "";
            
            Object.entries(demo).forEach(([key, value]) => {
                if(value[0]==namepase){
                    if(value[3]=="show"){
                        window.location = "http://dic-con.vbfaka.com/sys//user/namespase/namespase_container.html"
                    }else{
                        alert("此課程目前無法進入")
                        location.reload();
                    }
                }
            });
        }
    });*/
    sessionStorage.setItem('namepase',namepase)
    window.location = "http://dic-con.vbfaka.com/sys//user/namespase/namespase_container.html"
}