let fddjs = new FormData();
let name = localStorage.getItem('name');
let open = localStorage.getItem('open');
fddjs.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
fddjs.append('name', name);
window.onload = function () {
  images_reglist();
}
function images_reglist() {
  $.ajax({
    type: "post",
    url: 'http://120.114.142.17/sys/user/images/prg/image_loacl.php',
    data: fddjs,
    //dataType: "json",
    processData: false,
    contentType: false,
    success: function (result, status) {
      let table = ``;
      if (result.replace(/\s*/g, "") != "無資料") {
        Object.entries(JSON.parse(result)).forEach(([key, value]) => {
          let images = value.RepoTags[0].replace(/10.255.1.254:5000\//g, " ")
          let time = value.Created.replace(/[A-Z]/g, " ")
          time = time.replace(/\.+\w+\w/gi, '');
          images_name=images.replace(/\:+\w+\w/g, "").replace(/\s*/g, "")
          images_tag=images.replace(/\w+\/+\w+\:/g, "").replace(/\s*/g, "")
          // let imagename=value.name+":"+value.tag
          let containername_image=images_name.replace("/", "_")
         let containername="docker_"+name+"_"+containername_image.replace(/\s*/g, "")
          table = table + `
            <div class="col-12" >
                     <div class="card text-center m-2 border-primary ">
                     <div class="card-header fs-5 bg-primary text-white">
                           <b>`+ images_name + `</b>
                     </div>
                     <div class="card-body">
                       <h5 class="card-title">版本:`+ images_tag + `</h5></p>
                       <p class="card-text">作業系統:` + value.Os + `</p>
                       <p class="card-text row  justify-content-center">
                       <a href="#" class="btn btn-primary col-3 mx-2" onclick="edit_image('`+images_name.replace('/', '_')+`','`+images_name+`','`+images_tag+`')">編輯</a>
                       <a href="#" class="btn btn-outline-success mx-2 col-3" onclick="save_image('`+images_name+`','`+containername+`','`+images_tag+`')">保存</a>
                       <a href="#" class="btn btn-outline-danger mx-2 col-3" onclick="delete_image('`+images_name+`','`+images_tag+`')">刪除</a>
                       <p class="card-text mt-2"><a href="#" class="btn btn-primary  col-12" onclick="read_image('`+images_name+`')">寫入指令</a></p>
                       <p class="card-text mt-2"><a href="#" class="btn btn-primary  col-12"onclick="push_image('`+images_name+`','`+containername+`','`+images_tag+`')">上傳映像檔</a></p>
                       </p>
                     </div>
                     <div class="card-footer text-muted">
                         建立時間:</br>`+ time + `
                     </div >
                   </div ></div > `;
        });
      }
      if ($(window).width() <= 1024) {
        document.querySelector('#container_load_none').innerHTML = table;
      } else {
        document.querySelector('#container_load').innerHTML = table;
      }
    }
  });
}


function new_images_from() {
  let xtream = ` <div class="card  " >
  <div class="card-header text-center">
      <h2><b>建立映像檔環境</b></h2>
  </div>
  <div class="card-body border border-dark text-start">
      <div class="row justify-content-md-center">
          <div class="col-md-6">
              <form class="needs-validation">
                  <div class="mb-3">
                      <label for="containername" class="form-label fs-3">環境名</label>
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
  rodde_images()
}
function rodde_images() {
  let rodde_image = `<label for= "exampleInputPassword1"
  class= "form-label me-5" > 選擇使用的映像檔</label >
  <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" onclick="images_set('defaults')" value="defaults" required>
      <label class="form-check-label" for="inlineRadio1">預設</label>
    </div>
    
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" onclick="images_set('`+ name + `')" value="` + name + `" required>
      <label class="form-check-label" for="inlineRadio2">`+ name + `</label>
    </div>
      `;
  document.getElementById('rodde_images').innerHTML = rodde_image;
}

function images_set(images_user) {
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
        table = `<option value = "" class="text-secondary" > 請選擇要開啟的映像檔</option > `;
        Object.entries(JSON.parse(result)).forEach(([key, value]) => {
          if (value.name.replace(/\/+\w+\w/gi, '') == images_user.toLowerCase()) {
            let str = value.name
            table = table + `<option value = "` + str + `" > ` + str + `</option > `;
          }
        });
      }
      table = `
        <select class="form-select" aria - label="Default select example" required > ` + table + `</select > `;
      document.getElementById('images').innerHTML = table;
    }
  });
}

function imgcreate() {
  event.preventDefault();
  let containername = $('#containername').val();
  let imagesname = $('select').val();
  let imagesuser = $("[name='inlineRadioOptions']:checked").val()
  const forms = document.querySelector(".needs-validation");
  if (forms.checkValidity() == false) {
    forms.classList.add('was-validated');
  } else if (forms.checkValidity() == true) {
    $('#exampleModa2').modal('show');
    fddjs.append('name', name);
    fddjs.append('containername', containername);
    fddjs.append('imagesname', imagesname);
    fddjs.append('imagesuser', imagesuser);
    $.ajax({ //kubectll get pods
      type: "post",
      url: 'http://120.114.142.17/sys/user/images/prg/image_new.php',
      data: fddjs,
      //  dataType: "json",
      processData: false,
      //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
      contentType: false,
      success: function (result, status) {
        $('#exampleModa2').modal('hide');
        images_reglist()
      }
    });
  }
};
function edit_image(containername, imagesname, tag) {
  fddjs.append('name', name);
  fddjs.append('containername', containername);
  fddjs.append('imagesname', imagesname);
  fddjs.append('tag', tag);
  $.ajax({
    type: "post",
    url: 'http://120.114.142.17/sys/user/images/prg/image_gotty.php',
    data: fddjs,
    //  dataType: "json",
    processData: false,
    contentType: false,
    success: function (result, status) {
      result = result.split(',')
      result_gotty = result[1].split('_');
      port = result_gotty[result_gotty.length - 1]
      gotty_images(port, result[0]);
    }
  });
}
function gotty_images(port, gotty_images) {
  let xtream = `<iframe frameborder = "0" noresize = "noresize" src = "http://120.114.142.17:` + port + `/?arg=` + gotty_images + `" frameborder = "0" style = " width: 100%; height:100%;" ></iframe > `
  $('#xtream').html(xtream);
}
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
        url: 'http://120.114.142.17/sys/user/images/prg/images_save.php',
        data: fddjs,
        //  dataType: "json",
        processData: false,
        contentType: false,
        success: function (result, status) {
       //   images_reglist();
          $('#exampleModal').modal('hide');
        }
      });
      /*
      if (confirm('要進行儲存嗎') == true) {

      } else {
        if (confirm('要儲存為最新版本嗎') == true) {
          fddjs.append('tag', tag);
          fddjs.append('new_tag', 'new');
          $.ajax({
            type: "post",
            url: 'http://120.114.142.17/sys/user/images/prg/images_save.php',
            data: fddjs,
            //  dataType: "json",
            processData: false,
            contentType: false,
            success: function (result, status) {
              alert('儲存');
              images_reglist()
            }
          });
        }*/
      }
    }
  }
  /*

*/
function push_image(imagename, containername, tag) {
  fddjs.append('name', name);
  fddjs.append('containername', containername);
  fddjs.append('imagename', imagename);
  fddjs.append('tag', tag);
  $.ajax({
    type: "post",
    url: 'http://120.114.142.17/sys/user/images/prg/images_push.php',
    data: fddjs,
    //  dataType: "json",
    processData: false,
    contentType: false,
    success: function (result, status) {
       if( result.replace(/\s*/g,"")=="alrexy"){
            alert('你尚未儲存')
       }else{
            alert('上傳成功')
       }
      images_reglist()
    }
  });
}

function delete_image(image, tag) {
  fddjs.append('name', name);
  fddjs.append('image', image);
  fddjs.append('container', image.replace(/\//gi, '_'));
  //alert(image.replace(/\//gi,'-'))
  fddjs.append('tag', tag);
  $.ajax({
    type: "post",
    url: 'http://120.114.142.17/sys/user/images/prg/images_remove.php',
    data: fddjs,
    //  dataType: "json",
    processData: false,
    contentType: false,
    success: function (results, status) {
      alert(results);
      images_reglist()
    }
  });
}