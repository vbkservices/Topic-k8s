function link() {
    if(location.href != "http://120.114.140.112/sys/webtty_create.html"){
        window.location.href='http://120.114.140.112/sys/webtty_create.html';
    }else{
        $("#ifname").html('<iframe frameborder="0" noresize="noresize" src="http://120.114.140.112:8081" frameborder="0" style=" width: 100%; height:100%;"></iframe>');
    }
}
function nolink() {
    $("#ifname").html('<div></div>');
}
function linkon() {
    window.open('http://120.114.140.112:8082/ ', '廣播', config='height=1000,width=1000');
}