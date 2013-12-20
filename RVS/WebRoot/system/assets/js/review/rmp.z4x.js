/**
 * Created with JetBrains WebStorm.
 * User: Jingyuan
 * Date: 13-10-26
 * Time: 下午1:34
 */

$.extend({
    z4x: function (s) {
        var dom;
        if (typeof(s) == "object") {
            dom = s;
        } else if (typeof(s) == "string") {
            if (window.ActiveXObject) {
                dom = new ActiveXObject("Microsoft.XmlDom");
                dom.async = "false";
                dom.loadXML(s);
            } else {
                dom = new DOMParser().parseFromString(s, "text/xml");
            }
        }
        var _dig = function (ele) {
            var oo = {};

            var elen = ele.childNodes.length;
            if (elen == 0) return oo;

            var tem;
            for (var i = 0; i < elen; i++) {
                if (ele.childNodes[i].nodeName == "record") {
                    var rlen = ele.childNodes[i].childNodes.length;
                    for (var j = 0; j < rlen; j++) {
                        if (ele.childNodes[i].childNodes[j].childNodes[0] != undefined) {
                            oo["$"+ele.childNodes[i].childNodes[j].nodeName] = ele.childNodes[i].childNodes[j].childNodes[0].nodeValue;
                        } else {
                            oo["$"+ele.childNodes[i].childNodes[j].nodeName] = "";
                        }
                    }
                } else {
                    tem = oo[ele.childNodes[i].nodeName];
                    if (typeof(tem) == "undefined") {
                        if (ele.childNodes[i].childNodes.length == 0) {
                            if (ele.childNodes[i].nodeName == "#text" || ele.childNodes[i].nodeName == "#cdata-section") {
                                oo["$$"] = ele.childNodes[i].nodeValue;
                            } else {
                                oo[ele.childNodes[i].nodeName] = [_dig(ele.childNodes[i])];
                            }
                        } else {
                            oo[ele.childNodes[i].nodeName] = [_dig(ele.childNodes[i])];
                        }
                    } else {
                        tem[tem.length] = _dig(ele.childNodes[i]);
                        oo[ele.childNodes[i].nodeName] = tem;
                    }
                }
            }
            return oo;
        };

        var oo = {};
        oo[dom.documentElement.nodeName] = _dig(dom.documentElement);
        return oo;
    }
});
