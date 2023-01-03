var fddjs = new FormData();
fddjs.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
var student = localStorage.getItem('student');
$(document).ready(function(){
  download_status()
  $(".search").click(function(){
     event.preventDefault();
     $('#imglist').html(`<tr><th scope="row" class="text-center" colspan="2"><div class="spinner-border" role="status">
     <span class="visually-hidden">Loading...</span>
   </div></th></tr>`);
    /*
    $('#exampleModal').modal('show');
    document.querySelector('#exampleModalLabel').innerHTML = "系統訊息";
    document.querySelector('.modal-body').innerHTML = "加載中";*/
    var fddjs = new FormData();
    var obj=$('#searchimages').val()
    fddjs.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
    fddjs.append('objost', obj);
    fddjs.append('status', 'search');
    $.ajax({ //kubectll get pods
      type: "post",
      url: 'http://dic-con.vbfaka.com/sys/images/prg/images_dow.php',
      data: fddjs,
    //  dataType: "json",
      processData: false,
      //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
      contentType: false,
      success: function (result, status) {
        //  console.log(JSON.parse(result));
       /*   $('#exampleModal').modal('hide');*/
          var table=``;
          var imageslist = JSON.parse(result);
          Object.entries(imageslist).forEach(([key, value]) => {
            if(imageslist[1]!=undefined){
              if(`${value}` != 'NAME'){
                table = table +`<tr><th scope="row">`+`${value}`+`</th><td><button type="button" class="btn btn-secondary download" onclick='download(\"`+`${value}`+`\")' >下載</button></td></tr>`;
              }
            }else{
              table = `<tr><th scope="row" class="text-center" colspan="2">查無資料</th></tr>`;
            }
          });
          $('#imglist').html(table);
      }
      
  });
  });
  
});
function download(id){
  var obj=$('#searchimages').val()
  fddjs.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
  if(id=="download"){
    fddjs.append('images',$('#images_name').val());
  }else{
    fddjs.append('images',id);
  }
  fddjs.append('status', 'download');
  $.ajax({ //kubectll get pods
    type: "post",
    url: 'http://dic-con.vbfaka.com/sys/images/prg/images_dow.php',
    data: fddjs,
  //  dataType: "json",
    processData: false,
    //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
    contentType: false,
    
    success: function (result, status) {
        let odj=JSON.parse(result);
        if(odj[0]==false)
        {
          alert(odj[1]);
        }
        else if(odj[0]==true){
          download_join(id);
        }
    }
  });

};

function download_join(id){
  var obj=$('#searchimages').val()
  fddjs.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
  fddjs.append('images', id);
  fddjs.append('status', 'download_join');
  $.ajax({ //kubectll get pods
    type: "post",
    url: 'http://dic-con.vbfaka.com/sys/images/prg/images_dow.php',
    data: fddjs,
  //  dataType: "json",
    processData: false,
    //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
    contentType: false,
    /*
    success: function (result, status) {
      console.log(result);
      $('#exampleModal').modal('hide');
      window.location.reload();
    }*/
  });
  window.setTimeout(( () =>   download_status() ), 1000);
};
function download_status(){
  fddjs.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
  fddjs.append('status', 'download_status');
  $.ajax({ //kubectll get pods
    type: "post",
    url: 'http://dic-con.vbfaka.com/sys/images/prg/images_dow.php',
    data: fddjs,
  //  dataType: "json",
    processData: false,
    //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
    contentType: false,
    
    success: function (result, status) {
      let odj=JSON.parse(result);
      let table;
      Object.entries(odj).forEach(([key, value]) => {  
        if(value["imagestatus"]=="true"){
          table = table +`<tr><th scope="row" ">`+value["imagenamne"]+`</th><td><button type="submit" class="btn btn-danger my-1" onclick="imgdelete('`+value["imagenamne"]+`')">刪除</button></td></tr>`;
        }else if(value["imagestatus"]=="ready"){
          let math = Math.floor(Math.random()*50);
          table = table +`<tr><th scope="row" ">`+value["imagenamne"]+`</th><td id=`+math+`><b><div class="spinner-border" role="status"><span class="visually-hidden">下載中...</span></div></b></td></tr>`;
          img_status(value["imagenamne"],math);}
          else if(value["imagestatus"]=="delete"){
            download_status();
          }else if(value["imagestatus"]=="false"){
          table = table +`<tr><th scope="row" ">`+value["imagenamne"]+`</th><td><b>下載失敗</b></br><button type="submit" class="btn btn-danger my-1" onclick="imgdelete('`+value["imagenamne"]+`')">刪除</button></td></tr>`;
        }
      });
      $('.imglistok').html(table);
    }
  });
}
function img_status(image,math){
  fddjs.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
  fddjs.append('images', image);
  fddjs.append('status', 'img_status');
  $.ajax({ //kubectll get pods
    type: "post",
    url: 'http://dic-con.vbfaka.com/sys/images/prg/images_dow.php',
    data: fddjs,
  //  dataType: "json",
    processData: false,
    //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
    contentType: false,
    success: function (result, status) {
        let odj=JSON.parse(result);
          if(odj[0]["imagestatus"]=="ready"){
            window.setTimeout(( () =>   img_status(image,math) ), 2000);
          }else if(odj[0]["imagestatus"]=="true"){
            $('#'+math).html(`<button type="submit" class="btn btn-danger my-1" onclick="imgdelete('`+image+`')">刪除</button>`);
          }else{
            $('#'+math).html(`<b>下載失敗</b><button type="submit" class="btn btn-danger my-1" onclick="imgdelete('`+image+`')">刪除</button>`);
          }
        console.log(odj);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      window.location();
    }
  });
}

  function imgdelete(imagename) {
    /*$('#exampleModal').modal('show');
    document.querySelector('#exampleModalLabel').innerHTML = "系統訊息";
    document.querySelector('.modal-body').innerHTML = "刪除中";*/
    fddjs.append('images', imagename);
    fddjs.append('status', 'imgdelete');
    $.ajax({
      type: "post",
      url: 'http://dic-con.vbfaka.com/sys/images/prg/images_dow.php',
      data: fddjs,
      //  dataType: "json",
      processData: false,
      //將原本不是xml時會自動將所發送的data轉成字串(String)的功能關掉
      contentType: false,
    });
    download_status();
  };