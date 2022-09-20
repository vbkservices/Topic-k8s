var fddjs = new FormData();
fddjs.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
var student = localStorage.getItem('student');
$(document).ready(function(){
  $(".search").click(function(){
    $('#exampleModal').modal('show');
    document.querySelector('#exampleModalLabel').innerHTML = "系統訊息";
    document.querySelector('.modal-body').innerHTML = "加載中";
    var fddjs = new FormData();
    var obj=$('#searchimages').val()
    fddjs.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
    fddjs.append('objost', obj);
    fddjs.append('down', 'false');
    $.ajax({ //kubectll get pods
      type: "post",
      url: 'http://120.114.142.17/sys/images/prg/images_dow.php',
      data: fddjs,
    //  dataType: "json",
      processData: false,
      //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
      contentType: false,
      success: function (result, status) {
        //  console.log(JSON.parse(result));
          $('#exampleModal').modal('hide');
          var table="";
          var imageslist = JSON.parse(result);
          Object.entries(imageslist).forEach(([key, value]) => {
            if(`${value}` != 'NAME'){
              table = table +`<tr><th scope="row" ">`+`${value}`+`</th><td><button type="button" class="btn btn-secondary download" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick='download(\"`+`${value}`+`\")' >下載</button></td></tr>`;
            }
          });
          $('#imglist').html(table);
      }
      
  });
  });
});
function download(id){
  var fddjs = new FormData();
  var obj=$('#searchimages').val()
  fddjs.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
  fddjs.append('images', id);
  fddjs.append('down', 'true');
  $.ajax({ //kubectll get pods
    type: "post",
    url: 'http://120.114.142.17/sys/images/prg/images_dow.php',
    data: fddjs,
  //  dataType: "json",
    processData: false,
    //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
    contentType: false,
    success: function (result, status) {
      $('#exampleModal').modal('hide');
      window.location.reload();
    }
  });
};
  $(document).ready(function(){
    let myvars=`<div class="modal-title" id="exampleModalLabel"><b>加載中</b>
    <div class="spinner-grow text-dark" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <div class="spinner-grow text-dark" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <div class="spinner-grow text-dark" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <div class="spinner-grow text-dark" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div></div>`;
    document.querySelector('#imagestatus').innerHTML = myvars;
    var fddjs = new FormData();
    fddjs.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
    $.ajax({ //kubectll get pods
        type: "post",
        url: 'http://120.114.142.17/sys/images/prg/images_status.php',
        data: fddjs,
      //  dataType: "json",
        processData: false,
        //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
        contentType: false,
        success: function (result, status) {
          //  console.log(JSON.parse(result));
            var table="";
            Object.entries(JSON.parse(result)).forEach(([key, value]) => {  
              //console.log(value.user)
              if(value.user == "defaults" ){
                var str=value.name
                str=str.replace('10.255.1.254:5000/defaults/', '')
                table = table +`<tr><th scope="row" ">`+str+`</th><td><button type="submit" class="btn btn-danger my-1" onclick="imgdelete('`+value.name+`')">刪除</button></td></tr>`;
              }
            });
            $('.imglistok').html(table);
        }
    });
  });
  function imgdelete(name) {
    $('#exampleModal').modal('show');
    document.querySelector('#exampleModalLabel').innerHTML = "系統訊息";
    document.querySelector('.modal-body').innerHTML = "刪除中";
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