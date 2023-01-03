$(function () {
    $('.logo').text('Dashboard')
    $('.nav1').text('首頁')
    $('.nav2').text('集群')
    var nodes = '<ul class="list-group list-group-flush">';
    nodes = nodes + '<li class="list-group-item"><a class="btn btn-dark py-1" href="master.html">master</a></li>';
    nodes = nodes + '<li class="list-group-item"><a class="btn btn-dark py-1"  href="node1.html">node1</a></li>';
    nodes = nodes + '<li class="list-group-item"><a class="btn btn-dark py-1" href="node2.html" >node2</a></li>';
    $('#node').html(nodes)

    $('.nav3').text('課程')
    var nodes = '<ul class="list-group list-group-flush">';
    nodes = nodes + '<li class="list-group-item"><a class="btn btn-dark py-1" href="namespase.html">查看課程</a></li>';
    nodes = nodes + '<li class="list-group-item"><a class="btn btn-dark py-1" href="namespase_create.html">部屬課程</a></li>';
    nodes = nodes + '<li class="list-group-item"><a class="btn btn-dark py-1" href="namespase_delete.html">刪除課程</a></li>';
    $('#namespase').html(nodes)

    $('.nav4').text('連線')
    var web = '<ul class="list-group list-group-flush">';
    web = web + '<li class="list-group-item"><a class="btn btn-dark " href="webtty_create.html">連線測試</a></li>';
    web = web + '<li class="list-group-item"><a class="btn btn-dark " href="webtty_status.html">連線狀況</a></li>';
    $('#webconntion').html(web)
  
    $('.nav5').text('下載硬碟')
    var nodes = '<ul class="list-group list-group-flush">';
    nodes = nodes + '<li class="list-group-item"><a class="btn btn-dark py-1" href="teacher_pod.html">教師容器</a></li>';
    nodes = nodes + '<li class="list-group-item"><a class="btn btn-dark py-1" href="student_pod.html">學生容器</a></li>';
    nodes = nodes + '<li class="list-group-item"><a class="btn btn-dark py-1">特權容器</a></li>';
    $('#pod').html(nodes)

    $('.nav6').text('身分更改')
    var nodes = '<ul class="list-group list-group-flush">';
    nodes = nodes + '<li class="list-group-item"><a class="btn btn-dark py-1" href="teacher_pod.html">教師容器</a></li>';
    nodes = nodes + '<li class="list-group-item"><a class="btn btn-dark py-1" href="student_pod.html">學生容器</a></li>';
    nodes = nodes + '<li class="list-group-item"><a class="btn btn-dark py-1">特權容器</a></li>';
    $('#pod').html(nodes)
    //$('.left-sm').html(li)


    $('.nav7').text('登出')
});