/**
 * Created with JetBrains WebStorm.
 * User: Jingyuan
 * Date: 13-10-17
 * Time: 下午2:45
 * To change this template use File | Settings | File Templates.
 */
var paperUri = '/RMP-2/resource/PaperSys/paper/?status>3&status<9';
var reviewUri = '/RMP-2/resource/PaperSys/review/';
var editorUri = '/RMP-2/struts/PaperSys/GetUser.action?roleName=Editor';
var assignUri = '/RMP-2/struts/PaperSys/ReviewAssignment.action';
var decideUri = '/RMP-2/struts/PaperSys/ReviewDesicion.action';
var paperModel = ko.observableArray();
var editorModel = ko.observableArray();
var reviewModel = ko.observableArray();
var header = {
    "username": $.cookie("username"),
    "password": $.cookie("password")};
var selectedEditors = ko.observableArray();
var $selectedePaperTemplate = {"record": [
    {"primarykey": [
        {"$$": "primarykey"}
    ], "title": [
        {"$$": "test"}
    ], "abstract": [
        {"$$": "abstract"}
    ], "track": [
        {"$$": "track"}
    ], "keywords": [
        {"$$": "keywords"}
    ], "time": [
        {"$$": "time"}
    ], "status": [
        {"$$": "status"}
    ]}
]};
var tracks = [
    {s: 'web_mining', t: 'Web Mining'},
    {s: 'service_composition', t: 'Service Composition'}
];

var paperStatus = [
    {s: 'UnAssigned', c: 4, t: 'Need Assignment', m: 1},
    {s: 'Reviewing', c: 5, t: 'Reviewing', m: 0 },
    {s: 'Reviewed', c: 6, t: 'Under-determined', m: 1},
    {s: 'Accepted', c: 7, t: 'Accepted', m: 0 },
    {s: 'Rejected', c: 8, t: 'Rejected', m: 0 }
];
var selectedPaper = ko.observable($selectedePaperTemplate);
var currentUri = paperUri;

$(
    function () {
        $.ajax({url: currentUri, success: function (ret) {
            var m = $.z4x(ret).Resources.Paper;
            if (m != undefined) {
                paperModel(m);
            } else {
                paperModel([]);
            }
            var ac = 0;
            var dc = 0;
            for (var i in m) {
                if (m[i].$status === '4') {
                    ac++;
                } else if (m[i].$status === '6') {
                    dc++;
                }
            }
            $('#UnAssignedCount').html(ac);
            $('#ReviewedCount').html(dc);
        }});
        $.ajax({url: editorUri, headers: header, success: editorCallback});
        ko.applyBindings(viewModel);
    }
)

function editorCallback(ret) {
    var m = $.z4x(ret).Resources.User;
    if (m != undefined) {
        editorModel(m);
    } else {
        editorModel([]);
    }
}

function paperCallback(ret) {
    var m = $.z4x(ret).Resources.Paper;
    if (m != undefined) {
        paperModel(m);
    } else {
        paperModel([]);
    }
}

function reviewCallback(ret) {
    var m = $.z4x(ret).Resources.Review;
    if (m != undefined) {
        reviewModel(m);
    } else {
        reviewModel([]);
    }
}

function reload() {
    $.ajax({url: currentUri, success: paperCallback})
}
function getContent(k, v) {
    currentUri = paperUri + '&' + k + '=' + v;
    reload();
}

function changeActive(id) {
    $('#sidebar li').removeClass('active');
    $('#' + id).addClass('active');
}

function getUnassigned() {
    changeActive('unassigned');
    getContent('Status', 'unassigned');
}

function format(field) {
    if (field === undefined || field === '') {
        return 'unknown';
    }
    return field;
}

function assign() {
    var eds = [];
    $('#assignModal input:checked').each(function () {
        eds.push($(this).attr('value'));
        $(this).removeAttr('checked');
    });
    if (eds.length < 1) {
        return;
    }
    var data = "PaperID=" + selectedPaper().$primarykey;
    for (var i in eds) {
        data += "&EditorID[" + i + "]=" + eds[i];
    }
    $('#assignButton').button('loading');
    $.ajax({type: 'POST', url: assignUri, headers: header, data: data, success: function (ret) {
        var result = $.z4x(ret);
        if (result.success != undefined) {
            $('#assignModal').modal('hide');
            reload();
            var $c = $('#UnAssignedCount');
            $c.html( parseInt($c.text()) - 1);
            $('#assignButton').button('reset');
        }
    }});
}

function decide() {
    var decision = $("#decideModal input[name='optionsRadios']:checked").val();
    var paperID = selectedPaper().$primarykey;
    $('#decideButton').button('loading');
    $.ajax({type: 'GET', url: decideUri, headers: header, data: {paperID: paperID, operation: decision}, success: function (ret) {
        var result = $.z4x(ret);
        if (result.success != undefined) {
            $('#decideModal').modal('hide');
            reload();
            var $c = $('#ReviewedCount');
            $c.html( parseInt($c.text()) - 1);
            $('#decideButton').button('reset');
        }
    }});
}

function formatStatus(status) {
    for (var i in paperStatus) {
        if (parseInt(status) === paperStatus[i].c) {
            return paperStatus[i].t;
        }
    }
    return "Invalid status";
}

function formatTime(time) {
    var d = new Date();
    d.setTime(time);
    return d.format("yyyy-MM-dd");
}

var viewModel = {
    assign: function (e) {
        selectedPaper(e);
        $('#assignModal').modal('show');
    },
    all: function () {
        changeActive("all");
        $.get(paperUri, paperCallback);
    },
    track: function (e) {
        changeActive(e.s);
        getContent('track', e.t);
    },
    status: function (e) {
        changeActive(e.s);
        getContent('status', e.c);
    },
    decide: function (e) {
        selectedPaper(e);
        $.ajax({type: 'GET', url: reviewUri, headers: header, data: {paperID: selectedPaper().$primarykey}, success: reviewCallback});
        $('#decideModal').modal('show');
    }
}

Date.prototype.format = function (format) //author: meizz
{
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
            RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}


