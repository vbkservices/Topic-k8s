let fddjs = new FormData();
let username = localStorage.getItem('user');
fddjs.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
fddjs.append('username', username);

$(document).ready(function () {

    document.querySelector(".card").style.height = document.querySelector("body").clientHeight * 0.8 + "px";
    document.querySelector("#images_status").style.width = document.querySelector("body").clientWidth * 0.9 + "px";
    document.querySelector(".card-image").style.height = document.querySelector("body").clientHeight*0.5 + "px";
    document.querySelector("#use_images").innerHTML="<b>"+username+"的倉庫</b>"
    
   /* images_container()*/
    images_status()
    images_radio()
});



function images_status() {
    fddjs.append('status', 'load_image');
    $.ajax({
        type: "post",
        url: 'http://dic-con.vbfaka.com/sys/user/images/prg/topic_images_status.php',
        data: fddjs,
        //dataType: "json",
        processData: false,
        contentType: false,
        success: function (result, status) {
            
            let obj=JSON.parse(result);
            
            let table=``;

            Object.entries(obj).forEach(([key, value]) => {
                size=value[5]/1000000
                size=Math.round(size)  
                value[6]=JSON.parse(value[6]);
                created=value[4].replace('.',' ')
                table=table+`<tr>
                <th scope="col">`+value[6][0]+`</th>
                <th scope="col">`+value[3]+`</th>
                <th scope="col">`+size+`MB</th>
                <th scope="col">`+created+`</th>
                <th scope="col"><button type="button" class="btn btn-danger" onclick="images_cmd_delete('`+ value[0] + `','`+ value[3] + `')"><i class="fa fa-trash text-light px-1"></i>刪除</button></th>
              </tr>`
              });
              document.querySelector('#images_status_table').innerHTML = table;

        }
    });
}
function images_radio() {
    fddjs.append('username', 'defaults');
    fddjs.append('status', 'radio');
    $.ajax({ //kubectll get pods
      type: "post",
      url: 'http://dic-con.vbfaka.com//sys/user/images/prg/topic_images_status.php',
      data: fddjs,
      dataType: "json",
      processData: false,
      contentType: false,
      success: function (result, status) {
        let obj=JSON.parse(result);
        table=``;
        Object.entries(obj[1]).forEach(([key, value]) => {
            size=value["size"]/1000000
            size=Math.round(size) 
        
            table=table+`<tr>
            <th scope="col">`+value["name"]+`</th>
            <th scope="col">`+value["tag"]+`</th>
            <th scope="col">`+size+`MB</th>
          </tr>`
          });
          document.querySelector('#load_images_status_table').innerHTML = table;
      }
    });
  }

//images的操作做介面
function images_cmd() {
   /* document.querySelector('#images_cmd_header').innerHTML = ``;*/
   
    document.querySelector('#images_cmd_body').innerHTML = `
    <div class="card px-0 border-0">
    <div class="card-header m-0 fs-5 border-dark text-center" >
     <b>硬碟:` + images_name + `</b>
    </div>
    <div class="card-body text-center border-0">
    <button type="button" class="btn btn-danger" onclick="images_cmd_delete('`+ images_name + `','`+ tag + `')"><i class="fa fa-bitbucket text-light px-1"></i>刪除</button>
  </div>
  <div class="card-body text-center border-0" id="replace_image">
  
   </div>
  <div>`;
    document.querySelector('#images_cmd_commit').innerHTML = ` 
    <div class="card px-0 border-0">
    <div class="card-header m-0 fs-5 border-dark text-center ">
     <b>容器訊息</b>
    </div>
    <div class="card-body text-center border-0">
    <b class="px-2">`+commit+`</b>
  </div><div>`
}
/*
function images_cmd_replace(images_name, tag) {
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
            let obj = JSON.parse(result);
            let table = ``;
            Object.entries(obj).forEach(([key, value]) => {
                if(value["search"]==true){
                    user=value.user.split('_')
                    user_value=value.user.replace(/\//g,"")
                    table = table + `<option value = "` + user_value + `" > ` + user[2] + `</option> `;
                }
            });
            table = `<label for="select" class="form-label fs-5"><b>選擇要覆蓋的環境 :</b></label>
            <select class="form-select" aria - label="Default select example" id="contuser" required > ` + table + `</select ><p/>
            <button type="button" class="btn btn-secondary mt-4" onclick="images_replace('`+ images_name + `','`+ tag + `')">確定</button>`;
            document.querySelector('#replace_image').innerHTML = table;
        }
    });
};*/
function images_replace(images_name, tag) {
    fddjs.append('imagesname', images_name);
    fddjs.append('tag', tag);
    fddjs.append('status', 'replace_image');
    $.ajax({
        type: "post",
        //url: 'http://dic-con.vbfaka.com/sys/user/images/prg/topic_images_create.php',
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
function images_cmd_delete(images_name, tag) {
    fddjs.append('username', username);
    fddjs.append('imagesname', images_name);
    fddjs.append('tag', tag);
    fddjs.append('status', 'delete_image');
    $.ajax({
        type: "post",
        url: 'http://dic-con.vbfaka.com/sys/user/images/prg/topic_images_create.php',
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