let fddjs = new FormData();
let name = localStorage.getItem('name');
let open = localStorage.getItem('open');
fddjs.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
fddjs.append('name', name);
$.ajax({
  type: "post",
  url: 'http://120.114.142.17/sys/user/images/prg/images_status.php',
  data: fddjs,
  //  dataType: "json",
  processData: false,
  contentType: false,
  success: function (result, status) {
    //  console.log(JSON.parse(result));
    //alert(result.length);
    if (result.length == 3) {
      document.querySelector('#container_load').innerHTML = `
      <div><button type="submit" class="btn btn-dark my-1"
      onclick="new_images_from()">建立映像檔環境</button></div>`;
    } else {
      var table = "";
      Object.entries(JSON.parse(result)).forEach(([key, value]) => {
        let name = value.name.replace('10.255.1.254:5000/', '')
        let time = value.date.replace(/[A-Z]/g, " ")
        time = time.replace(/\.+\w+\w/gi, '');
        size_mb = String(Number(value.size) / 1000000).replace(/\.+\w+\w/gi, '') + "MB";
        table = table + `
                  <div class="col-12">
                  <div class="card text-center  border-primary ">
                  <div class="card-header fs-5 bg-primary text-white">
                        <b>`+ name + `</b>
                  </div>
                  <div class="card-body">
                    <h5 class="card-title">建立者:`+ value.user + `</h5></p>
                    <p class="card-text">容量:`+ size_mb + `</br>作業系統:` + value.os + `</p>
                    <a href="#" class="btn btn-primary" onclick="edit_image('`+value.name+`')">編輯</a>
                    <a href="#" class="btn btn-primary" onclick="delete_image('`+value.name+`')">刪除</a>
                    <a href="#" class="btn btn-primary" onclick="read_image('`+value.name+`')">寫入指令</a>
                  </div>
                  <div class="card-footer text-muted">
                      建立時間:</br>`+ time + `
                  </div>
                </div>
                  </div>
                  `;
      });
    }
    if ($(window).width() <= 1024) {
      document.querySelector('#container_load_none').innerHTML =table;
    }else{
      document.querySelector('#container_load').innerHTML =table;
    }
  }
});

function new_images_from() {
  let xtream = ` <div class="card  ">
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
                  <div class="mb-0" id="rodde_images">

                  </div>

                  <div class="mb-3" id="images">

                  </div>
                  <button type="submit" class="btn btn-primary" onclick="imgcreate()">建立環境</button>
              </form>
          </div>
      </div>
  </div>
</div>`;
  $('#xtream').html(xtream);
  rodde_images()
}
function rodde_images() {
  let rodde_image = `<label for="exampleInputPassword1"
  class="form-label me-5">選擇使用的映像檔</label>
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
  fddjs.append('images_user', images_user);
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
          if (value.user == images_user) {
            let str = value.name
            str = str.replace('10.255.1.254:5000/defaults/', '')
            table = table + `<option value="` + str + `">` + str + `</option>`;
          }
        });
      }
      table = `
      <select class="form-select" aria-label="Default select example" required>` + table + `</select>`;
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

      }
    });
  }

  /*
  const re = /\w+\/+/gi;
  let ifimagesname = imagesname.replace(re, '');
  ifimagesname = ifimagesname.replace(/\:+\w+\w/gi, '');
  let regExp = /^[\d|a-zA-Z]+$/;*/
  /*
  if(containername && regExp.test(containername) ){
    fddjs.append('student', student);
    fddjs.append('containername', containername);
    fddjs.append('images', imagesname);
    fddjs.append('images', imagesname);
    fddjs.append('ifimages', ifimagesname);
    fddjs.append('opne', 'true');
    $.ajax({ //kubectll get pods
      type: "post",
      url: 'http://120.114.142.17/sys/images/prg/images_tmux.php',
      data: fddjs,
      //  dataType: "json",
      processData: false,
      //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
      contentType: false,
      success: function (result, status) {
        let podstatus=result.split(',')
        if(result.length != "1" ){
          localStorage.setItem('open','true');
          localStorage.setItem('port',podstatus[0]);
          localStorage.setItem('container',podstatus[1]);
          window.location.reload();
        }else{
          localStorage.setItem('open','false');
        }
      }
    });
  }else{
    alert("名字未填寫或輸入中文");
  }*/
};
  /*
function images_set(images_user) {
fddjs.append('images_user', images_user);
$.ajax({ //kubectll get pods
type: "post",
url: 'http://120.114.142.17/sys/user/images/prg/images_status.php',
data: fddjs,
//  dataType: "json",
processData: false,
contentType: false,
success: function (result, status) {
  var table = "<option>選擇</option>";
  Object.entries(JSON.parse(result)).forEach(([key, value]) => {
    if (value.user == "defaults") {
      let str = value.name
      str = str.replace('10.255.1.254:5000/defaults/', '')
      table = table + `<option value="` + str + `">` + str + `</option>`;
    }
  });
  $('#images').append(table);

  table = `<div>以選擇的映像檔<div id="option_value"></div></div></p><select id="select">`+ table + `</select>`;
  document.getElementById('images').innerHTML = table;
  images_dropdown_status()
}
});

}
function images_dropdown_status() {
var select = document.querySelector("#select");
select.addEventListener('change', showValue);
function showValue(e) {
let opacity_value =document.getElementById('option_value').innerText
document.getElementById('option_value').innerHTML = opacity_value+this.value+",";
// console.log(this.value);
}
}
function new_images_container() {

$('#xtream').html(xtream);
}*/