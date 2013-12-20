/**
 * Created with JetBrains WebStorm.
 * User: Jingyuan
 * Date: 13-10-17
 * Time: 下午2:45
 * To change this template use File | Settings | File Templates.
 */
var orderUri = '/RVS/resource/RVS/order/*';
var orderModel = ko.observableArray();
var header = {
    "username": $.cookie("username"),
    "password": $.cookie("password")};

var $selectedeOrderTemplate = {"record": [
    {"primarykey": [
        {"$$": "primarykey"}
    ], "car_name": [
        {"$$": "car_name"}
    ], "car_location": [
        {"$$": "car_location"}
    ], "company": [
        {"$$": "company"}
    ], "company_car_code": [
        {"$$": "company_car_code"}
    ], "fee": [
        {"$$": "fee"}
    ], "status": [
        {"$$": "status"}
    ]}
]};

var selectedPaper = ko.observable($selectedeOrderTemplate);
var currentUri = orderUri;

$(
    function () {
        $.ajax({url: currentUri, success: function (ret) {
            var m = $.z4x(ret).Resources.Order;
            if (m != undefined) {
                console.log(m);
                orderModel(m);
            } else {
                orderModel([]);
            }
        }});
        ko.applyBindings(orderModel);
    }
)


function orderCallback(ret) {
    var m = $.z4x(ret).Resources.Order;
    if (m != undefined) {
        orderModel(m);
    } else {
        orderModel([]);
    }
}

function reload() {
    $.ajax({url: currentUri, success: orderCallback})
}



