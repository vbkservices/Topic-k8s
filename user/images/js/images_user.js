var fddjs = new FormData();
fddjs.append('apikey', 'kqzt+7MNF0nJFf+3uB8tRw==');
var student = localStorage.getItem('student');
$(document).ready(function(){
  $('#exampleModal').modal('show');
  document.querySelector('#exampleModalLabel').innerHTML = "加載中";
  document.querySelector('.modal-body').innerHTML = "<b>系統正在讀取資料<b/>";
});

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
        //alert(result);
        $('#exampleModal').modal('hide');
        var table="";
        Object.entries(JSON.parse(result)).forEach(([key, value]) => {  
                 table= table +`
                <div class="col-xl-2 col-lg-5 col-10 mx-2 mt-4">
                    <div class="card text-center rounded-3 shadow" style="width: 100%;">
                    <div class="card-body">
                    <h5 class="card-title">`+value.name+`</h5>
                  </div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">建立者:`+value.user+`</li>
                    <li class="list-group-item">建立者:</br>`+value.date+`</li>
                    <li class="list-group-item">容量:`+value.size+`</li>
                    <li class="list-group-item">作業系統:`+value.os+`</li>
                    <button type="submit" class="btn btn-danger my-1" onclick="imgdelete('`+value.name+`')">刪除</button>
                  </ul>
                    </div>
                </div>
                `;
        });
        $('#imagesuser').html(table);
        $('#exampleModal').modal('hide');
    }
});
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