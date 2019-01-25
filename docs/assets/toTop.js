var top=document.getElementById("toTop")
var settled=document.getElementsByClassName("settled")
window.onscroll=function(){
    if(document.documentElement.scrollTop >= 500){ // 页面指定了DTD，即指定了DOCTYPE时，使用document.documentElement，没有指定时用document.body
        settled[0].style.display='flex'
    }else{
        settled[0].style.display='none'
    }
}
top.onclick = function(){
    (function smoothscroll(){
        var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo (0,currentScroll - (currentScroll/5));
        }
    })();
}