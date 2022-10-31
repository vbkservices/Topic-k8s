
let fddjs = new FormData();
let name = localStorage.getItem("name");
fddjs.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
let pod = sessionStorage.getItem("status_pod");
window.onload = function () {
    document.querySelector('#images_user').innerHTML = `
    <div class="btn-group" role="group" aria-label="Basic example">
    <button type="button" class="btn btn-outline-dark disabled" ><b>課程:` + pod + `</b></button>
    <a type="button" class="btn btn-outline-secondary" href="http://120.114.142.17/sys/user/namespase/namespase.html"><b>上一頁</b></a>
  </div>`;
    namespase_status(pod);
    student_status(pod);
    status(pod);
}
/*<button  type="button" class="btn btn-success"  onclick="status_pod('${value.metadata.name}')"></button>*/
function namespase_status(namepase) {
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
            let table = '';
            if (`${demo.metadata.name}` == namepase) {
                document.getElementById('k8s_ModalLabel').innerText = "映像檔";
                // console.log(value.metadata.labels);
                Object.entries(demo.metadata.labels).forEach(([rekey, revalue]) => {
                    valstr = rekey.indexOf("docker");
                    if (valstr !== -1) {
                        imagesne = rekey.replace(/docker./g, "");
                        imagesne = imagesne.replace(/\-/g, "/");
                        imagesne = imagesne.replace(/\./g, ":");
                        if(revalue=="show"){
                            table = table + (`<tr class="h4"><th scope="row"></th><td id="` + rekey + `">` + imagesne + `</td><td> 
                            <button type="submit" class="btn btn-danger my-1 mx-1 fa fa-minus-square" id="create_container" onclick="status_remove('` + namepase + `','` + rekey + `')"></button>
                            <button type="submit" class="btn btn-danger my-1 mx-1" onclick="status_switch('` + namepase + `','` + rekey + `','hide')">隱藏</button></td></tr>`);
                        }else if(revalue=="hide"){
                            table = table + (`<tr class="h4"><th scope="row"></th><td id="` + rekey + `">` + imagesne + `</td><td> 
                            <button type="submit" class="btn btn-danger my-1 mx-1 fa fa-minus-square" id="create_container" onclick="status_remove('` + namepase + `','` + rekey + `')"></button>
                            <button type="submit" class="btn btn-info my-1 mx-1" onclick="status_switch('` + namepase + `','` + rekey + `','show')">顯示</button></td></tr>`);
                        }

                    }
                });
                table = table + (`<tr class="h6" id="studnet_add_table"><th scope="row"></th><td id="status_add">
                    </td><td><button type="submit" class="btn btn-success my-1 mx-3 fa fa-plus-square" id="create_container" onclick="status_add('` + namepase + `')"></button></td></tr>`);
            }
            $('#example').html(table);
        }
    });
}
function status_add() {
    let status_add = `
    <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" onclick="status_set('defaults')" value="defaults" required>
        <label class="form-check-label" for="inlineRadio1">預設</label>
      </div>
      
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" onclick="status_set('`+ name + `')" value="` + name + `" required>
        <label class="form-check-label" for="inlineRadio2">`+ name + `</label>
      </div>
        `;
    document.getElementById('status_add').innerHTML = status_add;
  }
function status_set(images_user) {
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
                    if (value.name.replace(/\/+\w+\w/gi, '') == images_user.toLowerCase()) {
                        let str = value.name+":"+value.tag
                        //str = str.replace('10.255.1.254:5000/defaults/', '')
                        table = table + `<option value="` +str+ `">` + str + `</option>`;
                    }
                });
            }
            table = `<select class="form-select" aria-label="Default select example" id="select-set" required>` + table + `</select>`;
            document.getElementById('status_add').innerHTML = table;
            images_dropdown_status(pod)
        }
    });
}

function student_status(namepase) {
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
            let table = '';
            let add_table = '';
            if (`${demo.metadata.name}` == namepase) {
                Object.entries(demo.metadata.labels).forEach(([rekey, revalue]) => {
                    valstr = rekey.indexOf("student");
                    if (valstr !== -1) {
                        revalue = revalue.replace(/\-/g, "/");
                        revalue = revalue.replace(/\./g, ":");
                        table = table + (`<tr class="h4"><th scope="row"></th><td id="` + rekey + `">` + revalue + `</td><td> 
                             <button type="submit" class="btn btn-danger my-1 fa fa-minus-square" id="create_container" onclick="student_remove('` + namepase + `','` + rekey + `')"></button></td></tr>`);
                    }
                });
                add_table = (`<tr class="h4" id="studnet_add_table"><th scope="row"></th><td id="student_add">
                    </td><td><button type="submit" class="btn btn-success my-1" id="create_container" onclick="student_add('` + namepase + `','student')">新增學生</button></td></tr>`);
                add_table = (`<tr class="h4" id="studnet_add_table"><th scope="row"></th><td id="student_add">
                    </td><td><button type="submit" class="btn btn-success my-1" id="create_container" onclick="student_add('` + namepase + `','studnets')">新增學生們</button></td></tr>`);
            }
            $('#example1').html(table);
            $('#add_students').html(add_table);
        }
    });
}

function student_add(namepase,test) {
    if(test=="student"){
        let imagestatus =
        `<div class="pt-2 fs-4" id="imagesadd">
    <input class="mx-2" type="radio" name="sex" onclick="imagesadd('defaults','`+ namepase + `')" value="yes">defaults
    <input class="mx-2" type="radio" name="sex" onclick="imagesadd('`+ name + `','` + namepase + `')" value="no">` + name + `<p>
</div>`;
    }else{
        let imagestatus =
        `<div class="pt-2 fs-4" id="imagesadd">
    <input class="mx-2" type="radio" name="sex" onclick="imagesadd('defaults','`+ namepase + `')" value="yes">defaults
    <input class="mx-2" type="radio" name="sex" onclick="imagesadd('`+ name + `','` + namepase + `')" value="no">` + name + `<p>
</div>`;
    }
    document.querySelector('#student_add').innerHTML = imagestatus;
}
function status(namepase) {
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
            let table = '';
            if (`${demo.metadata.name}` == namepase) {
                Object.entries(demo.metadata.labels).forEach(([rekey, revalue]) => {
                    valstr = rekey.indexOf("status");
                    if (valstr !== -1) {
                        if (revalue == "running") {
                            table = table + (`<tr class="h4"><th scope="row"></th><td id="` + rekey + `">` + "開放中" + `</td><td> </td></tr>`);
                        }
                    }
                });
            }
            $('#example2').html(table);
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

function student_add() {
    fddjs.append('status', 'status');
    $.ajax({ //kubectll get pods
        type: "post",
        url: 'http://120.114.142.17/sys/user/namespase/prg/kube_add_student.php',
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
            table = `<select class="form-select" aria-label="Default select example" id="select-set-student" required>` + table + `</select>`;
            $("#add_students1").append(table);
            student_add_new();
        }
    });
}
function student_add_new() {
    let select = document.querySelector("#select-set-student");
    select.addEventListener('change', showValue);
    function showValue(e) {
        let values = this.value
        $(".dropdown").each(function () {
            let textValues = $(this).children('button').map(function () {
                return $(this).text();
            }).get();
            console.log(values);
            //    console.log(textValues[0].replace(/\s*/g,""));

            if (textValues[0].replace(/\s*/g, "") != values) {

            }
        });

        fddjs.append('status', 'student');
        fddjs.append('year', values);

        $.ajax({ //kubectll get pods
            type: "post",
            url: 'http://120.114.142.17/sys/user/namespase/prg/kube_add_student.php',
            data: fddjs,
            //  dataType: "json",
            processData: false,
            contentType: false,
            success: function (result, status) {
                let table = "";
                Object.entries(JSON.parse(result)).forEach(([key, value]) => {
                    table = table + `
                <li >
                <div class="toast shadow-none show p-0">
                    <div class="toast-header toast-head">
                      <strong class="me-auto meun">`+ value.name + `</strong>
                      <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
                    </div>
                  </div>
              </li>
                `;
                });
                let enresult = `
            <div class="dropdown col-sm-1">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              `+ values + `
            </button>
    
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            `+ table + `
            </ul>
          </div>`
                //let opacity_student = document.getElementById('option_value').innerHTML
                //document.getElementById('add_students').innerHTML = enresult;
                $("#select-set-student").remove();
                $("#add_students").append(result);
            }
        });
        //document.getElementById('option_value').innerHTML = opacity_value+result;

    }
}
function images_dropdown_status(namepase) {
    var select = document.querySelector("#select-set");
    select.addEventListener('change', showValue);
    function showValue(e) {
        revalue = select.value.replace(/\//g, "-");
        revalue = revalue.replace(/\:/g, ".");
        fddjs.append('namepase', namepase);
        fddjs.append('images_name', revalue);
        fddjs.append('status', 'lable');
        document.getElementById('status_add').innerHTML = `<th scope="row" colspan="2">
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
    }
}
function status_switch(namepase,images_name,status) {
    fddjs.append('namepase', namepase);
    fddjs.append('images_name', images_name);
    fddjs.append('status', 'switch');
    fddjs.append('status_images', status);
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
        }
    });
}
function status_pod(namepase) {
    sessionStorage.setItem("status_pod", namepase);
    window.location = "http://120.114.142.17/sys//user/namespase/namespase_container.html"
}