let fddjs = new FormData();
let name = localStorage.getItem('name');
fddjs.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
fddjs.append('name', name);
$(document).ready(function(){
  $('#exampleModal').modal( {backdrop: 'static', keyboard: false});
  document.querySelector('#images_card_heade').innerHTML = `<button type="button" class="btn btn-outline-dark" disabled><b>`+name+`</b>的映像檔</button>`;
  document.querySelector('#images_card_body').innerHTML = "<b>系統正在讀取資料<b/>";
  document.querySelector('#images_local_heade').innerHTML = `
  <div class="btn-group" role="group" aria-label="Basic example">
  <button type="button" class="btn btn-outline-dark" disabled>未上傳的映像檔</button>
  <a href="http://120.114.142.17/sys/user/images/images_create.html" type="button" class="btn btn-success">建立映像檔</button>
</div>`;
  document.querySelector('#images_local_body').innerHTML = "<b>系統正在讀取資料<b/>";
  images_status()
  images_local_status()
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
          document.querySelector('#images_card_body').innerHTML = `
          <h5 class="card-title">未有上傳的映像檔</h5>`;
        }else{
          var table="";
          Object.entries(JSON.parse(result)).forEach(([key, value]) => {  
            let images_user_status=JSON.parse(value.status);
            create_name=value.name.replace(/\/+\w+\w/gi, '');
            let time = images_user_status.created.replace(/[A-Z]/g, " ")
            time = time.replace(/\.+\w+\w/gi, '');
            let imagename=value.name+":"+value.tag
            let containername="docker_"+name+"_"+value.name.replace("/", "_")
            table = table + `
                      <div class="col-xxl-3 col-xl-3 col-sm-6 col-12">
                      <div class="card text-center m-2 border-primary ">
                      <div class="card-header fs-5 bg-primary text-white">
                            <b>`+ value.name + `</b>
                      </div>
                      <div class="card-body">
                        <h5 class="card-title">版本:`+ value.tag + `</h5></p>
                        <p class="card-text">作業系統:` + images_user_status.os + `</p>
                        <p class="card-text row  justify-content-center">

                        <p class="card-text mt-2"><a href="#" class="btn btn-danger  col-12" onclick="imgdelete('`+value.name+`','`+value.tag+`')"">刪除</a></p>
                        </p>
                      </div>
                      <div class="card-footer text-muted">
                          建立時間:</br>`+ time + `
                      </div>
                    </div></div>`;
          });
        }
        $('#images_card_body').html(table);
    }
});
}
function images_local_status(){
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
                     <div class="col-xxl-6 col-xl-6 col-sm-6 col-12">
                     <div class="card text-center m-2 border-primary ">
                     <div class="card-header fs-5 bg-primary text-white">
                           <b>`+ images_name + `</b>
                     </div>
                     <div class="card-body">
                       <h5 class="card-title">版本:`+ images_tag + `</h5></p>
                       <p class="card-text">作業系統:` + value.Os + `</p>
                       <p class="card-text row  justify-content-center">
                       <p class="card-text mt-2"><a href="#" class="btn btn-primary  col-12"onclick="push_image('`+images_name+`','`+containername+`','`+images_tag+`')">上傳映像檔</a></p>
                       </p>
                     </div>
                     <div class="card-footer text-muted">
                         建立時間:</br>`+ time + `
                     </div>
                   </div></div>`;
        });
      }else{
        table = table +` <h5 class="card-title">未有上傳的映像檔</h5>`;
      }
      
      if ($(window).width() <= 1024 && table != " ") {
        document.querySelector('#images_local_body').innerHTML = table;
      } else {
        document.querySelector('#images_local_body').innerHTML = table;
      }
    }
  });
}
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
      alert('上傳');
  //    images_reglist()
    }
  });
}
function imgdelete(image,tag) {
  fddjs.append('image', image);
  fddjs.append('tag', tag);
  $.ajax({
    type: "post",
    url: 'http://120.114.142.17/sys/user/images/prg/images_delete.php',
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