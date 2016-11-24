$(document).ready(function() {
  
    sendAjax();
});

function isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
}

function nanoReplace(template, data) {
    return template.replace(/\{([\w\.]*)\}/g, function(str, key) {
        var keys = key.split("."),
            v = data[keys.shift()];
        for (var i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
        return (typeof v !== "undefined" && v !== null) ? v : "";
    });
}

function sendAjax() {


    var mobile = $.fn.cookie('mobile');
    if (!mobile) {
        showInputView();
        return;
    }
    $.get("/api/getOrder?mobile=" + mobile,
        function(jsonstr) { //成功后的回调函数,返回的数据放在data参数里  


            var json = JSON.parse(jsonstr);
            if (json.code == 0) {
                fillViewByData(json.data);
            } else {
                showInputView();
            }


        },
        function(xhr, type) { //失败 

            $("body").append("加载异常！");

        }
    );
};

function showInputView() {
    var inputMobileView = $("#template-input-mobile").html();
    $("#input-mobile").show();

};

function saveMobile() {
    var mobile = $("#inputMobile").val();

    console.log('saveMobile' + mobile);
    $.fn.cookie('mobile', mobile);
    sendAjax();
};

function fillViewByData(orderData) {
    $("#input-mobile").hide();

    //today
    fillUserInfo(orderData);


};

function fillUserInfo(orderData) {

    var order = {};
    order.name = orderData.name;
    order.mobile = orderData.mobile;
    order.address = orderData.address;

    var tempTemplate = $("#template-order-header").html();

    $("#order-header").html(nanoReplace(tempTemplate, { "order": order }));

};
