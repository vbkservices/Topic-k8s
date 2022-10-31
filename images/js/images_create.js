const fddjs = new FormData();
fddjs.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
localStorage.setItem('student','4080c017');
const student = localStorage.getItem('student');
const open = localStorage.getItem('open');
const xhr = new XMLHttpRequest();
//var containername = localStorage.getItem('containername');
$.ajax({
  type: "post",
  url: 'http://120.114.142.17/sys/images/prg/images_status.php',
  data: fddjs,
  //  dataType: "json",
  processData: false,
  contentType: false,
  success: function (result, status) {
    //  console.log(JSON.parse(result));
    var table = "";
    Object.entries(JSON.parse(result)).forEach(([key, value]) => {
      if (value.user == "defaults") {
        let str=value.name
        str=str.replace('10.255.1.254:5000/defaults/', '')
        table = table + `<option value="` + str + `">` + str + `</option>`;
      }
    });
    $('#images').append(table);
  }
});
  $.ajax({ 
    type: "post",
    url: 'http://120.114.142.17/sys/images/prg/tmux_status.php',
    data: fddjs,
    //dataType: "json",
    processData: false,
    //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
    contentType: false,
    success: function (result, status) {
      let xtream="";
      if(result.length != "1" ){
        Object.entries(result.split(' ')).forEach(([key, value]) => {
          let gottyvalue = value.replace('\n', '');
           gottyvalue=gottyvalue.split('-')
            xtream=xtream+`<div class="col-12">
            <div class="card">
            <div class="card-body">
              <h5 class="card-title">容器:<b id="cardcontanier">`+gottyvalue[2]+`</b></h5></p>
              <p class="card-text">建立者:<b id="carduser">`+gottyvalue[1]+`</b></br>
              <p class="card-text">port:<b id="cardport">`+gottyvalue[3]+`</b></p>
              <button type="submit" class="btn btn-primary my-1" onclick="imgcreate()">開始終端機畫面</button></p>
              <button type="submit" class="btn btn-primary my-1" data-bs-toggle="modal" data-bs-target="#exampleModal"  onclick="imgpush('`+gottyvalue[2]+`')">上傳</button>
              <button type="submit" class="btn btn-primary my-1" onclick="imgclose('`+gottyvalue[1]+`','`+gottyvalue[2]+`','`+gottyvalue[3]+`')">關閉</button>
              <button type="submit" class="btn btn-primary my-1" onclick="imgvim('`+gottyvalue[2]+`')">其他</button>
            </div>
          </div>
            </div>`
        });
      }else{
        xtream=xtream+`<div class="col-12">
        <div class="card">
        <div class="card-body">
          <h5 class="card-title">尚未部署容器</h5></p>
        </div>
      </div>
        </div>`
      }
      $('#containerlist').html(xtream);
    }
  });
  $(document).ready(function(){
    if( open == "true" ){
      let port = localStorage.getItem('port');
      let container = localStorage.getItem('container');
      let xtream=`<iframe frameborder="0" noresize="noresize" src="http://120.114.142.17:`+port+`" frameborder="0" style=" width: 100%; height:100%;"></iframe>`
      $('#xtream').html(xtream);
    }
  });
  function imgcreate() {
    let containername = $('#containername').val()
    let imagesname = $('#images').val()
    const re = /\w+\/+/gi;
    let ifimagesname = imagesname.replace(re, '');
    ifimagesname = ifimagesname.replace(/\:+\w+\w/gi, '');
    let regExp = /^[\d|a-zA-Z]+$/;
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
    }
  };

function imgpush(name) {
  fddjs.append('student', student);
  fddjs.append('containername', name);
  $.ajax({
    type: "post",
    url: 'http://120.114.142.17/sys/images/prg/images_push.php',
    data: fddjs,
    //  dataType: "json",
    processData: false,
    //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
    contentType: false,
    success: function (result, status) {
      window.location.reload();
    }
  });
};
function imgclose(user,name,port) {
  fddjs.append('student', student);
  fddjs.append('containername', name);
  fddjs.append('port', port);
  fddjs.append('opne', 'false');
  $.ajax({
    type: "post",
    url: 'http://120.114.142.17/sys/images/prg/images_tmux.php',
    data: fddjs,
    //  dataType: "json",
    processData: false,
    //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
    contentType: false,
    success: function (result, status) {
      localStorage.setItem('open','false');
      localStorage.setItem('port','');
      window.location.reload();
    }
  });
};
$(document).ready(function(){
  let select = document.querySelector("#images");
  select.addEventListener("change", selectFun);
  function selectFun() {
      const switchValue = select.options[select.selectedIndex].value;
      let re = /\w+\/+/gi;
      let newstr = switchValue.replace(re, '');
      let swvalue = newstr.replace(/\:+\w+\w/gi, '');
      switch (swvalue) {
        case "httpd":
          var http=`<div class="form-group row my-2">
          <label for="course" class="col-sm-12 col-form-label">名字</label></p>
          <div class="col-sm-12 py-2">
              <input type="text" class="form-control" id="containername" placeholder="images name">
          </div>
            </div>`;
  $('#imagcreate').html(http)
          break;
        case "mariadb":
          var http=`<div class="form-group row my-2">
      <label for="images" class="col-sm-12 col-form-label">容量</label>
      <div class="col-sm-12 py-2">
          <select class="form-control form-control-sm" id="volume">
              <option value="1" selected>1</option>
              <option value="0.5">0.5</option>
          </select>
      </div>
            </div>`;
  $('#imagcreate').html(http)
          break;
        case "phpmyadmin":
          var http=`<div class="form-group row my-2">
      <label for="images" class="col-sm-12 col-form-label">容量</label>
      <div class="col-sm-12 py-2">
          <select class="form-control form-control-sm" id="volume">
              <option value="1" selected>1</option>
              <option value="0.5">0.5</option>
          </select>
      </div>
            </div>`;
  $('#imagcreate').html(http)
          break;
        default:
          var http=``;
          $('#imagcreate').html(http)
          return;
      }
    }
});
function imgvim(text){
  let imgbash  = `
  <nav>
  <div class="nav nav-tabs" id="nav-tab" role="tablist">
    <button class="nav-link active" id="img-bash-tab" data-bs-toggle="tab" data-bs-target="#img-bash" type="button" role="tab" aria-controls="img-bash" aria-selected="true">手寫</button>
    <button class="nav-link" id="img-defaults-tab" data-bs-toggle="tab" data-bs-target="#img-defaults" type="button" role="tab" aria-controls="img-defaults" aria-selected="false">預設服務</button>
  </div>
</nav>
<div class="tab-content" id="nav-tabContent" >
  <div class="tab-pane fade show active" id="img-bash" role="tabpanel" aria-labelledby="img-bash-tab">
      <div class="md-form ">
      <textarea class="md-textarea form-control" rows="15%" id="textarea"  placeholder="將開機啟動服務指令寫入"></textarea>
      <button type="submit" class="btn btn-primary my-1" onclick="imgvimpsuh('`+text+`')">送出</button>
      <button type="submit" class="btn btn-primary my-1" onclick="imgvimpsuh('false')">關閉視窗</button>
      </div>
  </div>
  <div class="tab-pane fade" id="img-defaults" role="tabpanel" aria-labelledby="img-defaults">
  <div class="form-check  h5">
  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
  <label class="form-check-label" for="flexCheckDefault">
    httpd
  </label>
</div>
<div class="form-check h5">
  <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked">
  <label class="form-check-label" for="flexCheckChecked">
    mysql
  </label>
</div>
<button type="submit" class="btn btn-primary my-1" onclick="imgvimpsuh('`+text+`')">送出</button>
<button type="submit" class="btn btn-primary my-1" onclick="imgvimpsuh('false')">關閉視窗</button>
  </div>
</div>`
  document.querySelector('.imgbash').innerHTML = imgbash;
};
function imgvimpsuh(imgtext){
  if(imgtext != "false"){
    fddjs.append('text',document.querySelector('#textarea').value);
    fddjs.append('imgtext',imgtext);
    $.ajax({
      type: "post",
      url: 'http://120.114.142.17/sys/images/prg/test.php',
      data: fddjs,
      //  dataType: "json",
      processData: false,
      contentType: false,
      success: function (result, status) {
        alert("成功送出")
        document.querySelector('.imgbash').innerHTML = " ";
      }
    });
  }else{
    document.querySelector('.imgbash').innerHTML = " ";
  }
}