const fddyaml = new FormData();
fddyaml.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
let name = localStorage.getItem("name");
$(document).ready(function () {
    let imagestatus =
        `<label for="course" class="col-sm-2 col-form-label">映像檔</label>
    <div class="col-sm-3 pt-2 text-start">
        <input class="mx-2" type="radio" name="sex1" onclick="imagesadd('defaults')" value="yes">defaults
        <input class="mx-2" type="radio" name="sex1" onclick="imagesadd('`+ name + `')" value="no">` + name + `<p>
    </div>
    <div class="col-sm-4 pt-2" id="imagesadd"></div>`;
    document.querySelector('.imagestatus').innerHTML = imagestatus;
});
function imagesadd(images_user) {
    fddyaml.append('name', images_user);
    $.ajax({ //kubectll get pods
        type: "post",
        url: 'http://120.114.142.17/sys/user/images/prg/images_status.php',
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
                        let str = value.name+":"+value.tag
                        //str = str.replace('10.255.1.254:5000/defaults/', '')
                        table = table + `<option value="` +str+ `">` + str + `</option>`;
                    }
                });
            }
            table = `<select class="form-select" aria-label="Default select example" id="select-set" required>` + table + `</select>`;
            document.getElementById('imagesadd').innerHTML = table;
            images_dropdown_status()
        }
    });
}
function imagesadd2(images_user) {
    fddyaml.append('name', images_user);
    $.ajax({ //kubectll get pods
        type: "post",
        url: 'http://120.114.142.17/sys/user/images/prg/images_status.php',
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
                        let str = value.name+":"+value.tag
                        //str = str.replace('10.255.1.254:5000/defaults/', '')
                        table = table + `<option value="` + str + `">` + str + `</option>`;
                    }
                });
            }
            table = `<select class="form-select" aria-label="Default select example" id="container_image" required>` + table + `</select>`;
            document.getElementById('imagesadd2').innerHTML = table;
        //    images_dropdown_status()
        }
    });
}
function student_add(){

}
function images_dropdown_status() {
    let select = document.querySelector("#select-set");
    select.addEventListener('change', showValue);
    function showValue(e) {
        let values=this.value
        let result=`<div class="toast show m-1">
        <div class="toast-header toast-headers">
          <strong class="me-auto imgstr">`+values+`</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
        </div>
      </div>`
        $(".toast-header").each(function(){
            let textValues = $(this).children('strong').map(function() {
                return $(this).text();
              }).get();
              if(textValues[0]==values){
                result="";
              }
          });
        let opacity_value = document.getElementById('option_value').innerHTML
        document.getElementById('option_value').innerHTML = opacity_value+result;
    }
}
function time(id) {
    let timefrom = "";
    if (id == "no") {
        timefrom = `
            
            <label for="timetmsdir" class="col-sm-2 col-form-label">你希望於</label>

            <div class="col-sm-3 pt-2 fs-5">
                <input type="datetime-local" id="meeting-time" name="meeting-time"
                    value="2018-06-12T19:30" min="2018-06-07T00:00" max="2018-06-14T00:00">
            </div>

            <label for="timetmsdir" class="col-sm-2 col-form-label">結束於</label>
            <div class="col-sm-3 pt-2 fs-5">
                <input type="datetime-local" id="meeting-time" name="meeting-time"
                    value="2022-06-12T19:30" min="2022-06-07T00:00" max="2100-01-01T00:00">
            </div>
            `;
    }
    document.getElementById('timeadd').innerHTML = timefrom;
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
    let imagestatus =
        `<label for="course" class="col-sm-2 col-form-label">映像檔</label>
    <div class="col-sm-4 pt-2">
        <input class="mx-2" type="radio" name="sex2" onclick="imagesadd2('defaults')" value="yes">defaults
        <input class="mx-2" type="radio" name="sex2" onclick="imagesadd2('`+ name + `')" value="no">` + name + `<p>
    </div>
    <div class="col-sm-4 pt-2" id="imagesadd2"></div>`;
    document.querySelector('.imagestatus2').innerHTML = imagestatus;
}

function add_students() {
    fddyaml.append('status', 'status');
    $.ajax({ //kubectll get pods
        type: "post",
        url: 'http://120.114.142.17/sys/user/namespase/prg/kube_add_student.php',
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
            $("#add_students").append(table);
       //    document.getElementById('add_students').innerHTML = table;
            student_status();
            //document.location.href = "http://120.114.142.17/sys/user/namespase/namespase.html";
        }
        
    });
}
function student_status() {
    let select = document.querySelector("#select-set-student");
    select.addEventListener('change', showValue);
    function showValue(e) {
        let values=this.value
        $(".dropdown").each(function(){
            let textValues = $(this).children('button').map(function() {
                return $(this).text();
              }).get();
              console.log(values);
          //    console.log(textValues[0].replace(/\s*/g,""));
              
              if(textValues[0].replace(/\s*/g,"")!=values){

              }
          });

        fddyaml.append('status', 'student');
        fddyaml.append('year', values);
 
      $.ajax({ //kubectll get pods
        type: "post",
        url: 'http://120.114.142.17/sys/user/namespase/prg/kube_add_student.php',
        data: fddyaml,
        //  dataType: "json",
        processData: false,
        contentType: false,
        success: function (result, status) {
            let table="";
            Object.entries(JSON.parse(result)).forEach(([key, value]) => {
                table = table + `
                <li >
                <div class="toast shadow-none show p-0">
                    <div class="toast-header toast-head">
                      <strong class="me-auto meun">`+value.name+`</strong>
                      <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
                    </div>
                  </div>
              </li>
                `;
            });
            let enresult=`
            <div class="dropdown col-sm-1">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              `+values+`
            </button>
    
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            `+table+`
            </ul>
          </div>`
          //let opacity_student = document.getElementById('option_value').innerHTML
          //document.getElementById('add_students').innerHTML = enresult;
          $("#select-set-student").remove();
          $("#add_students").append(enresult);
        }
    });
        //document.getElementById('option_value').innerHTML = opacity_value+result;
        
    }
}
function new_namespase() {
    let namepase_name = document.getElementById('namepase_name').value;
 //   let namepase_student = document.getElementById('namepase_student').value;
 //   let new_namepase_student = namepase_student.replace(/\n/gi, ' ');
    let str="";
    let student="";
    $(".toast-headers").each(function(){
        var textValues = $(this).children('.imgstr').map(function() {
            return $(this).text();
          }).get();
          str=str+textValues[0].replace(/\//gi, '-')+" "
          str=str.replace(/\:/gi, '.')
      });

      $(".toast-head").each(function(){
        let texts = $(this).children('.meun').map(function() {
            return $(this).text();
          }).get();
          student=student+" "+texts
      });
    fddyaml.append('name', name);
    fddyaml.append('namepase_name', namepase_name);
    fddyaml.append('namepase_student', student);
    fddyaml.append('namepase_images', str);
    $.ajax({ //kubectll get pods
        type: "post",
        url: 'http://120.114.142.17/sys/user/namespase/prg/kube_ns_create.php',
        // dataType: "json",
        data: fddyaml,
        processData: false,
        //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
        contentType: false,
        
        success: function (result, status) {
            document.location.href = "http://120.114.142.17/sys/user/namespase/namespase.html";
        }
        
    });
}
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
        url: 'http://120.114.142.17/sys/user/namespase/prg/kube_container_create.php',
        // dataType: "json",
        data: fddyaml,
        processData: false,
        //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
        contentType: false,
        success: function (result, status) {
            document.location.href = "http://120.114.142.17/sys/user/namespase/namespase.html";
        }
    });
}


function new_create() {
    new_namespase()
    new_container()
}
