let fddjs = new FormData();
let username = localStorage.getItem('user');
let open = localStorage.getItem('open');
fddjs.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
window.onload = function () {
  document.querySelector(".card").style.height=document.querySelector("body").clientHeight*0.80+"px";
  document.querySelector("#images_status").style.width=document.querySelector("body").clientWidth*0.85+"px";
  document.querySelector('#user_image').innerHTML=`<label for="user_imges"
  class= "form-label me-5 mt-2 fs-5"><b>請選擇硬碟倉庫</b></label ></br>
  <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" onclick="images_radio('defaults')" value="defaults" required>
      <label class="form-check-label" for="inlineRadio1">本地硬碟倉庫</label>
  </div></br>
  <div class="form-check form-check-inline" >
    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" onclick="images_radio('`+ username + `')" value="` + username + `" required>
    <label class="form-check-label" for="inlineRadio2">`+ username + `硬碟倉庫</label>
  </div>`;
  const fileUploader = document.querySelector('#file-uploader');
  status_path_file() 
  images_reglist();
}
function images_reglist() {
  fddjs.append('username', username);
  fddjs.append('status', 'load');
  $.ajax({
    type: "post",
    url: 'http://dic-con.vbfaka.com//sys/user/images/prg/topic_images_status.php',
    data: fddjs,
    //dataType: "json",
    processData: false,
    contentType: false,
    success: function (result, status) {
   let obj=JSON.parse(result);
   let table = ``;
    if(obj[0]==undefined){
      table=`<tr><th scope="col" class="text-center" colspan="8">未有編輯的環境</th></tr>`;
    }else{
      Object.entries(obj).forEach(([key, value]) => {
        user=value["user"].split('_');
        value["user"]=value["user"].replace(/\//g,"");
        /**/
        images=value["image"]
        /*硬幹 待修改*/
        if(images!=null){
          images_if=images.replace(/\:+\w+\w/,"");
          if(images_if=="null"){
            images=value["imges"].replace(/10.255.1.254:5000\//g,"");
            images=images.replace(/defaults/g,"本地倉庫");
          }
        }
        time=Date.parse('2022-12-6 20:08:00')-Date.parse(''+value["time"]+'')
        time=Date.parse(''+value["time"]+'')+7000;
        time=new Date(time).toLocaleString();
  
        if(value["status"]=="running"){
            status=`<b style="color:green">編輯中</b><i class="fa fa-check-circle-o" style="color:green"></i>`;
            vars=`<th scope="col"><button type="button" class="btn btn-primary" onclick="open_gotty('`+value["user"]+`')">編輯</button></th>
            <th scope="col"><button type="button" class="btn btn-link" onclick="open_push_madel('`+value["user"]+`')"><i class="fa fa-arrow-circle-up" >上傳</button></th>
            <th scope="col"><!--button type="button" class="btn btn-success" onclick="edit_image('`+value["user"]+`')">指令</button-->`;
        }else{
          status=`<b class="text-danger">關閉<i class="	fa fa-remove px-1 "></i></b>`;
          vars=`<th scope="col" colspan="2"><button type="button" class="btn btn-primary" onclick="open_image_container('`+value["user"]+`')"><b>開啟</b></button></th><th scope="col">`
        }
        
        table=table+`<tr>
        <th scope="col">`+value["name"]+`</th>
        <th scope="col" >`+status+`</th>
        <th scope="col">`+images+`</th>
        <th scope="col">`+time+`</th>
          `+vars+`
        <button type="button" class="btn btn-danger" onclick="delete_image('`+value["user"]+`')">刪除</button></th>
      </tr>`
      });
    }
    document.querySelector('#images_status_table').innerHTML = table;
  
    }
  });
}
function status_path_file() {
  fddjs.append('username', username);
  fddjs.append("status", "status_path")
  $.ajax({
    type: "post",
    url: 'http://dic-con.vbfaka.com//sys/user/images/prg/topic_images_status.php',
    data: fddjs,
    processData: false,
    contentType: false,
    success: function (results, status) {
       let obj=JSON.parse(results);
       let table='';
       Object.entries(obj).forEach(([key, value]) => {
         if(value!=""){
          table=table+`<b class="mx">`+value+`</b><button class="btn btn-links btn-sm text-danger" onclick="file_remove('`+value+`')">移除</button></br>`;
         }
       })
       document.getElementById('file_status').innerHTML=table;
      }
  })
}
/** */

function new_images_from() {
  let xtream = ` <div class="card  " >
  <div class="card-header text-center">
      <h2><b>建立硬碟環境</b></h2>
  </div>
  <div class="card-body border border-dark text-start">
      <div class="row justify-content-md-center">
          <div class="col-md-6">
              <form class="needs-validation">
                  <div class="mb-3">
                      <label for="containername" class="form-label fs-3">硬碟名稱</label>
                      <input type="text" class="form-control"
                          id="containername" aria-describedby="emailHelp" pattern="^[A-Za-z]{3,}$" required>
                      <div id="emailHelp" class="form-text">該欄位名稱將會是映像檔名字</div>
                      <div class="invalid-feedback">
                      Please provide a valid city.
                    </div>
                  </div>
                  <div class="mb-0" id="rodde_images"></div>
                  <div class="mb-3" id="images"> </div>
                  <button type="submit" class="btn btn-primary" onclick="imgcreate()">建立環境</button>
              </form>
          </div>
      </div>
  </div>
</div > `;
  $('#xtream').html(xtream);
}


function images_radio(images_user) {
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
          if(images_user=="defaults"){
            let str = value.name;
            table = table + `<option value = "` + str + `:`+value.tag+`" >` + str + `:`+value.tag+`</option> `;
          }else{
            let str = JSON.parse(value.comment);
            table = table + `<option value = "` + value.name + `:`+value.tag+`" >` + str[0] + `:`+value.tag+`</option> `;
          }
        });
        table = `<select class="form-select" aria - label="Default select example" required > ` + table + `</select > `;
        document.getElementById('reg_images').innerHTML = table;
      }else{
        table = `<select class="form-select" aria - label="Default select example" required ><option value="fales">未擁有映像檔</option></select > `;
        document.getElementById('reg_images').innerHTML = table;
      }
    }
  });
}

function imgcreate() {
  event.preventDefault();
  const forms = document.querySelector(".needs-validation");
  if (forms.checkValidity() == false) {
    forms.classList.add('was-validated');
  } else if (forms.checkValidity() == true) {
    let containername = $('#containername').val();
    let images = $('select').val().split(':');
    let imagesname = images[0];
    let imagesuser = $("[name='inlineRadioOptions']:checked").val()
    let tag = images[1];
      fddjs.append('username', username);
      fddjs.append('containername', containername);
      fddjs.append('imagesname', imagesname);
      fddjs.append('imagesuser', imagesuser);
      fddjs.append('tag', tag);
      fddjs.append('status', 'create');
      fddjs.append('type', 'create');
      $.ajax({ //kubectll get pods
        type: "post",
        url: 'http://dic-con.vbfaka.com/sys/user/images/prg/topic_images_create.php',
        data: fddjs,
        //  dataType: "json",
        processData: false,
        //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
        contentType: false,
        success: function (result, status) {
          document.querySelector('#images_status_table').innerHTML =`<tr>
            <th scope="col" class="text-center" colspan="6">等待中</th></tr>`;
          setTimeout(function(){
            images_reglist();
            new_images_from()
          },1500);
        }
      });

  }
};

function open_push_madel(images) {
  $('#exampleModal').modal('show');
  document.getElementById('push_button').innerHTML = 
  `<button type="button" class="btn btn-primary" onclick="push_image('`+images+`')">上傳</button>
  <button type="button" class="btn btn-danger" id="close_madel">關閉</button>`;
  document.getElementById('close_madel').addEventListener('click',function(){
    $('#exampleModal').modal('hide');
  })
}

function open_gotty(gotty_images) {
  fddjs.append('username', username);
  fddjs.append('imagesname', gotty_images);
  fddjs.append('status', 'open');
  $.ajax({
    type: "post",
    url: 'http://dic-con.vbfaka.com//sys/user/images/prg/topic_images_status.php',
    data: fddjs,
    //  dataType: "json",
    processData: false,
    contentType: false,
    success: function (result, status) {
      let obj=JSON.parse(result)
      obj=JSON.parse(obj)
      obj=obj[0].split('_')
      window.open(`http://dic-con.vbfaka.com:`+obj[3]+`/?arg=` + gotty_images +``);
    }
  });

}
/*
function save_image(imagename, containername, tag) {
  $('#exampleModal').modal('show');
  let select = document.querySelector("#res_image");
  select.addEventListener('click', showValue);
  function showValue(e) {
    event.preventDefault();
    let res=$("input[type=radio]:checked").val();
    const form = document.querySelector(".needvalidation");
    if (form.checkValidity() == false) {
      form.classList.add('was-validated');
    } else if (form.checkValidity() == true) {
      fddjs.append('name', name);
      fddjs.append('containername', containername);
      fddjs.append('imagename', imagename);
      fddjs.append('tag', tag);
      fddjs.append('new_tag', res);
      event.preventDefault();
      $.ajax({
        type: "post",
        url: 'http://dic-con.vbfaka.com/sys/user/images/prg/images_save.php',
        data: fddjs,
        //  dataType: "json",
        processData: false,
        contentType: false,
        success: function (result, status) {
          images_reglist();
          $('#exampleModal').modal('hide');
        }
      });
      }
    }
  }*/
function push_image(containername) {
  event.preventDefault();
  const forms = document.querySelector(".form-model");
  if (forms.checkValidity() == false) {
    forms.classList.add('was-validated');
  } else if (forms.checkValidity() == true) {
    document.getElementById('push_button').innerHTML = 
    `<b>上傳中</b>`;
    let imagename = $('#image_name').val();
    let image_text = $('textarea').val();
      fddjs.append('username', username);
      fddjs.append('containername', containername);
      fddjs.append('imagesname', imagename);
      fddjs.append('image_text', image_text);
      fddjs.append('status', 'imagecreate');
      $.ajax({ //kubectll get pods
        type: "post",
        url: 'http://dic-con.vbfaka.com/sys/user/images/prg/topic_images_create.php',
        data: fddjs,
        //  dataType: "json",
        processData: false,
        //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
        contentType: false,
        success: function (result, status) {
        //  location.reload();
       // console.log(result);
         // images_reglist();
          $('#exampleModal').modal('hide');
          setTimeout(function(){
            window.location = "http://dic-con.vbfaka.com/sys/user/images/images.html"
          },1000);
        }
      });

  }
}
function open_image_container(gotty_container) {
  fddjs.append('imagesname', gotty_container);
  fddjs.append('status', 'open_conatiner');
  console.log(gotty_container);
  $.ajax({
    type: "post",
    url: 'http://dic-con.vbfaka.com/sys/user/images/prg/topic_images_create.php',
    data: fddjs,
    //  dataType: "json",
    processData: false,
    contentType: false,
    success: function (results, status) {
      images_reglist();
    }
  });
}
function delete_image(gotty_container) {
  fddjs.append('imagesname', gotty_container);
  fddjs.append('status', 'delete');
  
  $.ajax({
    type: "post",
    url: 'http://dic-con.vbfaka.com/sys/user/images/prg/topic_images_create.php',
    data: fddjs,
    //  dataType: "json",
    processData: false,
    contentType: false,
    success: function (results, status) {
        let obj=JSON.parse(results);
        if(obj[0]=true){
          images_reglist();
        }
    }
  });
}
function push_filer(){
  /*console.log(document.getElementById('file-uploader').files[0]); */
  fddjs.append("product", document.getElementById('file-uploader').files[0])
  fddjs.append("status", "push_filer")
  $.ajax({
    type: "post",
    url: 'http://dic-con.vbfaka.com/sys/user/images/prg/topic_images_create.php',
    data: fddjs,
    processData: false,
    contentType: false,
    success: function (results, status) {
      status_path_file() 
      }
  })
}
function file_remove(file) {
  fddjs.append('username', username);
  fddjs.append('file', file);
  fddjs.append("status", "remove_path")
  $.ajax({
    type: "post",
    url: 'http://dic-con.vbfaka.com/sys/user/images/prg/topic_images_create.php',
    data: fddjs,
    processData: false,
    contentType: false,
    success: function (results, status) {
      status_path_file() 
      }
  })
}