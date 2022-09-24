let fddjs = new FormData();
let name = localStorage.getItem('name');
fddjs.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
fddjs.append('name', name);
$(document).ready(function(){
  $('#exampleModal').modal( {backdrop: 'static', keyboard: false});
  document.querySelector('#images_card_heade').innerHTML = "<b>"+name+"</b>的映像檔";
  document.querySelector('#images_card_body').innerHTML = "<b>系統正在讀取資料<b/>";
  images_status()
});
function images_status(){
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
        if(result.length==3){
          document.querySelector('#images_card_body').innerHTML = `<h5 class="card-title">未有製作的映像檔</h5>
          <a href="./images_create.html" class="btn btn-primary">Go images</a>`;
        }else{
          var table="";
          Object.entries(JSON.parse(result)).forEach(([key, value]) => {  
                  let name = value.name.replace('10.255.1.254:5000/', '')
                  let time = value.date.replace(/[A-Z]/g, " ")
                  time = time.replace(/\.+\w+\w/gi, '');
                  size_mb = String(Number(value.size)/1000000).replace(/\.+\w+\w/gi, '') + "MB";
                  table= table +`
                  <div class="col-xl-2 col-lg-5 col-10 mx-2 mt-4">
                  <div class="card text-center  border-primary ">
                  <div class="card-header fs-5 bg-primary text-white">
                        <b>`+name+`</b>
                  </div>
                  <div class="card-body">
                    <h5 class="card-title">建立者:`+value.user+`</h5></p>
                    <p class="card-text">容量:`+size_mb+`</br>作業系統:`+value.os+`</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                  </div>
                  <div class="card-footer text-muted">
                      建立時間:</br>`+time+`
                  </div>
                </div>
                  </div>
                  `;
          });
        }
        $('#imagesuser').html(table);
    }
});
}
function imgdelete(name) {
  fddjs.append('student', student);
  fddjs.append('containername', name);
  $.ajax({
    type: "post",
    url: 'http://120.114.142.17/sys/images/prg/images_delete.php',
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