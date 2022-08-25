
$(document).ready(function(){
  $(".search").click(function(){
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
          var table="";
          var imageslist = JSON.parse(result);
          Object.entries(imageslist).forEach(([key, value]) => {
            if(`${value}` != 'NAME'){
              table = table +`<tr><th scope="row" ">`+`${value}`+`</th><td><button type="button" class="btn btn-secondary download"  onclick='download(\"`+`${value}`+`\")' >下載</button></td></tr>`;
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
      window.location.reload();
    }
  });
};
  $(document).ready(function(){
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
              console.log(value.user)
              if(value.user == "defaults" ){
                table = table +`<tr><th scope="row" ">`+`${value.name}`+`</th><td><button type="button" class="btn btn-secondary download" >已下載</button></td></tr>`;
              }
            });
            $('.imglistok').html(table);
        }
    });
  });