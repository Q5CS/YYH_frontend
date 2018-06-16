"use strict";

// 检测图片加载
checkComplete();
var ok = false;

function checkComplete() {
    setTimeout(function () {
        var complete = true;
        $("img").each(function () {
            if (!this.complete) {
                complete = false;
                return false;
            }
        });
        if (complete || ok) {
            console.log('所有图片已加载完成！');
            loaded();
        } else {
            checkComplete();
        }
    }, 50);
}
// 5 秒强行加载
setTimeout(() => {
    if (ok) return;
    console.log('force load！');
    loaded();
}, 5000);

function loaded() {
    $('body').addClass('loaded');
    switchTo('#map');
    $('img[usemap]').rwdImageMaps();
    ok = true;
}

var s = {};

$('.navbar .nav').click(function () {
    switchTo($(this).attr('goto'));
});

function switchTo(target) {
    $('section').each(function () {
        $(this).removeClass('active');
    });
    $(target).addClass('active');
}

function openModal(id) {
    console.log(id);
    if (!s[id]) {
        alert("该摊位暂未上传信息");
        return;
    }
    var res = s[id];
    $(".modal-title").html(res.title);
    $(".modal-body .content").html(res.content);
    $('#map-modal').modal();
}

$("#map-modal").on('hidden.bs.modal', function (e) {
    $(".modal-body .content").html("");
});

$("#Map area").click(function () {
    var sid = $(this).attr("sid");
    openModal(sid);
});

$(document).ready(function (e) {
    checkComplete();
});

// 先把摊位信息弄下来
$.ajax({
    type: "GET",
    url: "https://yyh2018.qz5z.ren/admin/main/getall",
    dataType: "json",
    success: function (res) {
        res.forEach(ele => {
            s[ele.sid] = {
                "title": ele.title,
                "content": ele.content
            };
        });
        console.log(s);
    }
});