// EasyChair source file
// (c) 2010-2013 easychair.org
document.write("<script type='text/javascript' src='../assets/js/jquery.cookie.js'></script>");
var hasCategories = false;
var abstractsAllowed = false;
var nauthors = 1; // number of authors in the form
var attemptId = 0; // for debugging
var clicked = false;

function deleteform(){
	$("#authorForm"+nauthors).remove();
	nauthors--;
	$("#delete"+nauthors).show();
}


function addAuthorForm() {
	try {
		var n = ++nauthors;
		var $containerdiv = $("<div class='container form-submit form-horizontal' style='max-width: 700px' id='authorForm"
				+ n + "'></div>");
		var $legend = $("<legend style='margin-bottom: 0px; padding-top: 20px;font-weight:bold'><div> Author" + n + "<p style='text-align:right'><button type='text'  type='button' class='btn btn-danger  btn-sm' onclick='deleteform()' name='delete"+n+"' id='delete"+n+"'>Delete</button></div></legend>");
		$(".addme").before($containerdiv);
		$containerdiv.append($legend);
		var $container=$("<div class='container' style='padding-top: 20px;'><div>");
		$containerdiv.append($container);

		var $firstname = $("<div class='form-group' style='margin-top:10px'><label class='control-label col-sm-3' for='first_name"
				+ n
				+ "'>First name(*)</label><div class='col-sm-8'><input id='first_name"
				+ n
				+ "' name='first_name"
				+ n
				+ "' type='text' class='form-control'></div></div>");
		var $surname = $("<div class='form-group' style='margin-top:10px'><label class='control-label col-sm-3' for='surname"
				+ n
				+ "'>Last name(*)</label><div class='col-sm-8'><input id='surname"
				+ n
				+ "' name='surname"
				+ n
				+ "' type='text' class='form-control'></div></div>");
		var $email = $("<div class='form-group' style='margin-top:10px'><label class='control-label col-sm-3' for='email"
				+ n
				+ "'>Email(*)</label><div class='col-sm-8'><input id='email"
				+ n
				+ "' name='email"
				+ n
				+ "' type='text' class='form-control'></div></div>");
		var $country = $("<div class='form-group' style='margin-top:10px'><label class='control-label col-sm-3' for='country"
				+ n
				+ "'>Country(*)</label><div class='col-sm-4'><select id='country"
				+ n
				+ "' name='country"
				+ n
				+ "' class='form-control'><option value=''></option><option value='United States'>China</option> <option value='United States'>United States</option> <option value='Canada'>Canada</option> <option value='United States'>Germany</option> <option value='France'>France</option> <option value='Italy'>Italy</option> <option value='Japan'>Japan</option> <option value='Mexico'>Mexico</option> <option value='Spain'>Spain</option> <option value=''>-------------</option> <option value='Afghanistan'>Afghanistan</option> <option value='Albania'>Albania</option> <option value='Algeria'>Algeria</option> <option value='American Samoa'>American Samoa</option> <option value='Andorra'>Andorra</option> <option value='Angola'>Angola</option> <option value='Anguilla'>Anguilla</option> <option value='Antarctica'>Antarctica</option> <option value='Antigua And Barbuda'>Antigua And Barbuda</option> <option value='Argentina'>Argentina</option> <option value='Armenia'>Armenia</option> <option value='Aruba'>Aruba</option> <option value='Australia'>Australia</option> <option value='Austria'>Austria</option> <option value='Azerbaijan'>Azerbaijan</option> <option value='Bahamas'>Bahamas</option> <option value='Bahrain'>Bahrain</option> <option value='Bangladesh'>Bangladesh</option> <option value='Barbados'>Barbados</option> <option value='Belarus'>Belarus</option> <option value='Belgium'>Belgium</option> <option value='Belize'>Belize</option> <option value='Benin'>Benin</option> <option value='Bermuda'>Bermuda</option> <option value='Bhutan'>Bhutan</option> <option value='Bolivia'>Bolivia</option> <option value='Bosnia and Herzegowina'>Bosnia and Herzegowina</option> <option value='Botswana'>Botswana</option> <option value='Bouvet Island'>Bouvet Island</option> <option value='Brazil'>Brazil</option> <option value='British Indian Ocean Territory'>British Indian Ocean Territory</option> <option value='Brunei Darussalam'>Brunei Darussalam</option> <option value='Bulgaria'>Bulgaria</option> <option value='Burkina Faso'>Burkina Faso</option> <option value='Burma'>Burma</option> <option value='Burundi'>Burundi</option> <option value='Cambodia'>Cambodia</option> <option value='Cameroon'>Cameroon</option> <option value='Canada'>Canada</option> <option value='Cape Verde'>Cape Verde</option> <option value='Cayman Islands'>Cayman Islands</option> <option value='Central African Republic'>Central African Republic</option> <option value='Chad'>Chad</option> <option value='Chile'>Chile</option> <option value='China'>China</option> <option value='Christmas Island'>Christmas Island</option> <option value='Cocos (Keeling) Islands'>Cocos (Keeling) Islands</option> <option value='Colombia'>Colombia</option> <option value='Comoros'>Comoros</option> <option value='Congo'>Congo</option> <option value='Congo, the Democratic Republic of the'>Congo, the Democratic Republic of the</option> <option value='Cook Islands'>Cook Islands</option> <option value='Costa Rica'>Costa Rica</option> <option value='Cote d'Ivoire'>Cote d'Ivoire</option> <option value='Croatia'>Croatia</option> <option value='Cuba'>Cuba</option> <option value='Cyprus'>Cyprus</option> <option value='Czech Republic'>Czech Republic</option> <option value='Denmark'>Denmark</option> <option value='Djibouti'>Djibouti</option> <option value='Dominica'>Dominica</option> <option value='Dominican Republic'>Dominican Republic</option> <option value='East Timor'>East Timor</option> <option value='Ecuador'>Ecuador</option> <option value='Egypt'>Egypt</option> <option value='El Salvador'>El Salvador</option> <option value='England'>England</option> <option value='Equatorial Guinea'>Equatorial Guinea</option> <option value='Eritrea'>Eritrea</option> <option value='Espana'>Espana</option> <option value='Estonia'>Estonia</option> <option value='Ethiopia'>Ethiopia</option> <option value='Falkland Islands'>Falkland Islands</option> <option value='Faroe Islands'>Faroe Islands</option> <option value='Fiji'>Fiji</option> <option value='Finland'>Finland</option> <option value='France'>France</option> <option value='French Guiana'>French Guiana</option> <option value='French Polynesia'>French Polynesia</option> <option value='French Southern Territories'>French Southern Territories</option> <option value='Gabon'>Gabon</option> <option value='Gambia'>Gambia</option> <option value='Georgia'>Georgia</option> <option value='Germany'>Germany</option> <option value='Ghana'>Ghana</option> <option value='Gibraltar'>Gibraltar</option> <option value='Great Britain'>Great Britain</option> <option value='Greece'>Greece</option> <option value='Greenland'>Greenland</option> <option value='Grenada'>Grenada</option> <option value='Guadeloupe'>Guadeloupe</option> <option value='Guam'>Guam</option> <option value='Guatemala'>Guatemala</option> <option value='Guinea'>Guinea</option> <option value='Guinea-Bissau'>Guinea-Bissau</option> <option value='Guyana'>Guyana</option> <option value='Haiti'>Haiti</option> <option value='Heard and Mc Donald Islands'>Heard and Mc Donald Islands</option> <option value='Honduras'>Honduras</option> <option value='Hong Kong'>Hong Kong</option> <option value='Hungary'>Hungary</option> <option value='Iceland'>Iceland</option> <option value='India'>India</option> <option value='Indonesia'>Indonesia</option> <option value='Ireland'>Ireland</option> <option value='Israel'>Israel</option> <option value='Italy'>Italy</option> <option value='Iran'>Iran</option> <option value='Iraq'>Iraq</option> <option value='Jamaica'>Jamaica</option> <option value='Japan'>Japan</option> <option value='Jordan'>Jordan</option> <option value='Kazakhstan'>Kazakhstan</option> <option value='Kenya'>Kenya</option> <option value='Kiribati'>Kiribati</option> <option value='Korea, Republic of'>Korea, Republic of</option> <option value='Korea (South)'>Korea (South)</option> <option value='Kuwait'>Kuwait</option> <option value='Kyrgyzstan'>Kyrgyzstan</option> <option value='Lao People's Democratic Republic'>Lao People's Democratic Republic</option> <option value='Latvia'>Latvia</option> <option value='Lebanon'>Lebanon</option> <option value='Lesotho'>Lesotho</option> <option value='Liberia'>Liberia</option> <option value='Liechtenstein'>Liechtenstein</option> <option value='Lithuania'>Lithuania</option> <option value='Luxembourg'>Luxembourg</option> <option value='Macau'>Macau</option> <option value='Macedonia'>Macedonia</option> <option value='Madagascar'>Madagascar</option> <option value='Malawi'>Malawi</option> <option value='Malaysia'>Malaysia</option> <option value='Maldives'>Maldives</option> <option value='Mali'>Mali</option> <option value='Malta'>Malta</option> <option value='Marshall Islands'>Marshall Islands</option> <option value='Martinique'>Martinique</option> <option value='Mauritania'>Mauritania</option> <option value='Mauritius'>Mauritius</option> <option value='Mayotte'>Mayotte</option> <option value='Mexico'>Mexico</option> <option value='Micronesia, Federated States of'>Micronesia, Federated States of</option> <option value='Moldova, Republic of'>Moldova, Republic of</option> <option value='Monaco'>Monaco</option> <option value='Mongolia'>Mongolia</option> <option value='Montserrat'>Montserrat</option> <option value='Morocco'>Morocco</option> <option value='Mozambique'>Mozambique</option> <option value='Myanmar'>Myanmar</option> <option value='Namibia'>Namibia</option> <option value='Nauru'>Nauru</option> <option value='Nepal'>Nepal</option> <option value='Netherlands'>Netherlands</option> <option value='Netherlands Antilles'>Netherlands Antilles</option> <option value='New Caledonia'>New Caledonia</option> <option value='New Zealand'>New Zealand</option> <option value='Nicaragua'>Nicaragua</option> <option value='Niger'>Niger</option> <option value='Nigeria'>Nigeria</option> <option value='Niue'>Niue</option> <option value='Norfolk Island'>Norfolk Island</option> <option value='Northern Ireland'>Northern Ireland</option> <option value='Northern Mariana Islands'>Northern Mariana Islands</option> <option value='Norway'>Norway</option> <option value='Oman'>Oman</option> <option value='Pakistan'>Pakistan</option> <option value='Palau'>Palau</option> <option value='Panama'>Panama</option> <option value='Papua New Guinea'>Papua New Guinea</option> <option value='Paraguay'>Paraguay</option> <option value='Peru'>Peru</option> <option value='Philippines'>Philippines</option> <option value='Pitcairn'>Pitcairn</option> <option value='Poland'>Poland</option> <option value='Portugal'>Portugal</option> <option value='Puerto Rico'>Puerto Rico</option> <option value='Qatar'>Qatar</option> <option value='Reunion'>Reunion</option> <option value='Romania'>Romania</option> <option value='Russia'>Russia</option> <option value='Rwanda'>Rwanda</option> <option value='Saint Kitts and Nevis'>Saint Kitts and Nevis</option> <option value='Saint Lucia'>Saint Lucia</option> <option value='Saint Vincent and the Grenadines'>Saint Vincent and the Grenadines</option> <option value='Samoa (Independent)'>Samoa (Independent)</option> <option value='San Marino'>San Marino</option> <option value='Sao Tome and Principe'>Sao Tome and Principe</option> <option value='Saudi Arabia'>Saudi Arabia</option> <option value='Scotland'>Scotland</option> <option value='Senegal'>Senegal</option> <option value='Serbia and Montenegro'>Serbia and Montenegro</option> <option value='Seychelles'>Seychelles</option> <option value='Sierra Leone'>Sierra Leone</option> <option value='Singapore'>Singapore</option> <option value='Slovakia'>Slovakia</option> <option value='Slovenia'>Slovenia</option> <option value='Solomon Islands'>Solomon Islands</option> <option value='Somalia'>Somalia</option> <option value='South Africa'>South Africa</option> <option value='South Georgia and the South Sandwich Islands'>South Georgia and the South Sandwich Islands</option> <option value='South Korea'>South Korea</option> <option value='Spain'>Spain</option> <option value='Sri Lanka'>Sri Lanka</option> <option value='St. Helena'>St. Helena</option> <option value='St. Pierre and Miquelon'>St. Pierre and Miquelon</option> <option value='Suriname'>Suriname</option> <option value='Svalbard and Jan Mayen Islands'>Svalbard and Jan Mayen Islands</option> <option value='Swaziland'>Swaziland</option> <option value='Sweden'>Sweden</option> <option value='Switzerland'>Switzerland</option> <option value='Taiwan'>Taiwan</option> <option value='Tajikistan'>Tajikistan</option> <option value='Tanzania'>Tanzania</option> <option value='Thailand'>Thailand</option> <option value='Togo'>Togo</option> <option value='Tokelau'>Tokelau</option> <option value='Tonga'>Tonga</option> <option value='Trinidad'>Trinidad</option> <option value='Trinidad and Tobago'>Trinidad and Tobago</option> <option value='Tunisia'>Tunisia</option> <option value='Turkey'>Turkey</option> <option value='Turkmenistan'>Turkmenistan</option> <option value='Turks and Caicos Islands'>Turks and Caicos Islands</option> <option value='Tuvalu'>Tuvalu</option> <option value='Uganda'>Uganda</option> <option value='Ukraine'>Ukraine</option> <option value='United Arab Emirates'>United Arab Emirates</option> <option value='United Kingdom'>United Kingdom</option> <option value='United States'>United States</option> <option value='United States Minor Outlying Islands'>United States Minor Outlying Islands</option> <option value='Uruguay'>Uruguay</option> <option value='Uzbekistan'>Uzbekistan</option> <option value='Vanuatu'>Vanuatu</option> <option value='Vatican City State (Holy See)'>Vatican City State (Holy See)</option> <option value='Venezuela'>Venezuela</option> <option value='Viet Nam'>Viet Nam</option> <option value='Virgin Islands (British)'>Virgin Islands (British)</option> <option value='Virgin Islands (U.S.)'>Virgin Islands (U.S.)</option> <option value='Wales'>Wales</option> <option value='Wallis and Futuna Islands'>Wallis and Futuna Islands</option> <option value='Western Sahara'>Western Sahara</option> <option value='Yemen'>Yemen</option> <option value='Zambia'>Zambia</option> <option value='Zimbabwe'>Zimbabwe</option></select></div></div>");
		var $affiliation = $("<div class='form-group' style='margin-top:10px'><label class='control-label col-sm-3' for='Affiliation"
				+ n
				+ "'>Organization(*)</label><div class='col-sm-8'><input id='Affiliation"
				+ n
				+ "' name='Affiliation"
				+ n
				+ "' type='text' class='form-control' /></div></div>");
		var $url = $("<div class='form-group' style='margin-top:10px'><label class='control-label col-sm-3' for='url"
				+ n
				+ "'>Web Site</label><div class='col-sm-8'><input id='url"
				+ n
				+ "' name='url"
				+ n
				+ "' type='text' class='form-control'/></div></div>");
		var $correspond = $("<div class='form-group' style='margin-top:10px'><label class='control-label col-sm-3' for='corresponding"
				+ n
				+ "'></label><div class='col-sm-8'> <input type='checkbox' name='corresponding"
				+ n
				+ "' id='corresponding"
				+ n
				+ "' value='Corresponding author'> Corresponding author </label></div></div>");
		$container.append($firstname);
		$container.append($surname);
		$container.append($email);
		$container.append($country);
		$container.append($affiliation);
		$container.append($url);
		$container.append($correspond);
		var j=n-1;
		$("#delete"+j).hide();
		if(n>2){
			
		}
		return true;
	} catch (err) {
		logError(err, 'submission_new.addAuthorForm');
	}
} // addAuthorForm

function submitToServer() {
	$("#loadingimg").show(); 
	$("#firstsubmit").attr('disabled',true);
	var author = [];
	var rstr = "";
	for ( var i = 0; i < nauthors; i++) {
		author[i] = new Object();
		var j = i + 1;
		author[i].firstname = $("#first_name" + j).val();
		author[i].surname = $("#surname" + j).val();
		author[i].email = $("#email" + j).val();
		author[i].country = $("#country" + j).val();
		author[i].affiliation = $("#Affiliation" + j).val();
		author[i].url = $("#url" + j).val();

		author[i].order = j;
		if ($("#corresponding" + j)[0].checked) {
			author[i].corresponding = true;
		} else {
			author[i].corresponding = false;
		}
		rstr = rstr + "authors[" + i + "].username=" + author[i].email + "&";
		rstr = rstr + "authors[" + i + "].order=" + author[i].order + "&";
		rstr = rstr + "authors[" + i + "].corresponding="
				+ author[i].corresponding + "&";
		rstr = rstr + "authors[" + i + "].website=" + author[i].url + "&";
		rstr = rstr + "authors[" + i + "].firstname=" + author[i].firstname
				+ "&";
		rstr = rstr + "authors[" + i + "].lastname=" + author[i].surname + "&";
		rstr = rstr + "authors[" + i + "].country=" + author[i].country + "&";
		rstr = rstr + "authors[" + i + "].affiliation=" + author[i].affiliation;
		if (i != nauthors - 1)
			rstr += "&";

	}
	$.ajax( {
		type : "POST", //ajax的方式为post(get方式对传送数据长度有限制)
		url : "RMP-2/struts/PaperSys/FirstSubmission.action?paperID="+paperID, //一般处理程序页面AddUser.ashx(在2中会写出该页面内容)
		dataType : "xml", //数据传回的格式为json
		headers : {
			username : $.cookie("username"),
			password : $.cookie("password")
//					"username" : $.cookie("username"),
//				"password" : $.cookie("password")
		},
		data : rstr, //要传送的数据键值对adduserName为键（方便2中的文件用此名称接受数据）txtuserName为值（要传递的变量，例如用户名）
		success : function(data) { //成功回传值后触发的方法
			if($(data).find("success")!=undefined){
			$(data).find("success").each(function() { //找到根节点
						var nexturl = $(this).children("next").text(); //节点值
						var paperID = $(this).children("PaperID").text(); //节点值
						window.location.href = "" + nexturl;
					});
			}else{
				alert("submit failed");
			}
		},
		error : function(data, status, e) {
			alert("network error");
		}

	})

}

function firstSubmission() { 
	for ( var i = 0; i < nauthors; i++) {
		var j = i + 1;
		var firstname = $("#first_name" + j).val();
		if (firstname.length == 0) {
			alert("please input your firstname in Author " + j + "!");
			$("#first_name" + j)[0].focus();
			return;
		}
		var lastname = $("#surname" + j).val();
		if (lastname.length == 0) {
			alert("please input your lastname in Author " + j + "!");
			$("#surname" + j)[0].focus();
			return;
		}
		var email = $("#email" + j).val();
		if (email
				.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) == -1) {
			alert("Your email is Wrong in Author " + j + "!");
			$("#email" + j)[0].focus();
			return;
		}
		var affiliation = $("#Affiliation" + j).val();
		if (affiliation.length == 0) {
			alert("please input your Organization in Author " + j + "!");
			$("#Affiliation" + j)[0].focus();
			return;
		}

	}

	submitToServer();
}

function secondSubmission() {
	var title = $("#title").val();
	if (title.length == 0) {
		alert("please input your Title!");
		$("#title")[0].focus();
		return;
	}
	var pabstract = $("#abstract").val();
	if (pabstract.length == 0) {
		alert("please input your Abstract!");
		$("#abstract")[0].focus();
		return;
	}

	var keywords = $("#keywords").val();
	if (keywords.length == 0) {
		alert("please input your Keywords!");
		$("#keywords")[0].focus();
		return;
	}
	var Request = new QueryString();
	var PaperID = Request["paperID"];
	$("#loadingimg").show(); 
	$("#secondsubmit").attr('disabled',true);
	$.ajax( {
		type : "POST", //ajax的方式为post(get方式对传送数据长度有限制)
		url : "/RMP-2/struts/PaperSys/SecondSubmission.action", //一般处理程序页面AddUser.ashx(在2中会写出该页面内容)
		dataType : "xml", //数据传回的格式为json
		headers : {
			username : $.cookie("username"),
			password : $.cookie("password")
		},
		data : {
			paperID : PaperID,
			title : $("#title").val(),
			abstracts : $("#abstract").val(),
			keywords : $("#keywords").val(),
			track : $("#category").val()
		}, //要传送的数据键值对adduserName为键（方便2中的文件用此名称接受数据）txtuserName为值（要传递的变量，例如用户名）
		success : function(data) {
			if($(data).find("success")!=undefined){
			$(data).find("success").each(function() { //找到根节点
						var nexturl = $(this).children("next").text(); //节点值
						window.location.href = "" + nexturl;
					});
			}else{
				alert("submit failed");
			}
		},
		error : function(data, status, e) {
			alert("network error");
		}
	})
}
function ajaxFileUpload() {
	var Request = new QueryString();
	var PaperID = Request["paperID"];
	var username='chengxie@sjtu.edu.cn';
	var password='everme';
	$.ajaxFileUpload( {
		type : 'POST',
		url : '/RMP-2/struts/PaperSys/Upload.action?paperID='+PaperID+'&username='+ $.cookie("username")+'&password='+$.cookie("password"),
		secureuri : false,
		fileElementId : 'upload',
		dataType : 'xml',
		success : function(data, status) {
			$(data).find("success").each(function() { //找到根节点
				alert("your paper has been successfully upload!")
						var nexturl = $(this).children("next").text(); //节点值
						window.location.href = "" + nexturl;
					});
		},
		error : function(data, status, e) {
			alert("network error");
		}
	})
	return false;
}

function fourthSubmission(){
	$("#loadingimg").show(); 
	$("#backtohome").attr('disabled',true);
	var Request = new QueryString();
	var PaperID = Request["paperID"];
	$.ajax( {
		type : "POST", //ajax的方式为post(get方式对传送数据长度有限制)
		url : "/RMP-2/struts/PaperSys/FourSubmission.action", //一般处理程序页面AddUser.ashx(在2中会写出该页面内容)
		dataType : "xml", //数据传回的格式为json
		headers : {
			username : $.cookie("username"),
			password : $.cookie("password")
		},
		data : {
			paperID : PaperID,
		}, //要传送的数据键值对adduserName为键（方便2中的文件用此名称接受数据）txtuserName为值（要传递的变量，例如用户名）
		success : function(data) {
			if($(data).find("success")!=undefined){
			$(data).find("success").each(function() { //找到根节点
						var nexturl = $(this).children("next").text(); //节点值
						window.location.href = "" + nexturl;
					});
			}else{
				alert("submit failed");
			}
		},
		error : function(data, status, e) {
			alert("network error");
		}
	})
}

function getQueryString(name) {
	// 如果链接没有参数，或者链接中不存在我们要获取的参数，直接返回空
	if (location.href.indexOf("?") == -1
			|| location.href.indexOf(name + '=') == -1) {
		return '';
	}

	// 获取链接中参数部分
	var queryString = location.href.substring(location.href.indexOf("?") + 1);

	// 分离参数对 ?key=value&key2=value2
	var parameters = queryString.split("&");

	var pos, paraName, paraValue;
	for ( var i = 0; i < parameters.length; i++) {
		// 获取等号位置
		pos = parameters[i].indexOf('=');
		if (pos == -1) {
			continue;
		}

		// 获取name 和 value
		paraName = parameters[i].substring(0, pos);
		paraValue = parameters[i].substring(pos + 1);

		// 如果查询的name等于当前name，就返回当前值，同时，将链接中的+号还原成空格
		if (paraName == name) {
			return unescape(paraValue.replace(/\+/g, " "));
		}
	}
	return '';
};

function QueryString() {
	var name, value, i;
	var str = location.href;
	var num = str.indexOf("?")
	str = str.substr(num + 1);
	var arrtmp = str.split("&");
	for (i = 0; i < arrtmp.length; i++) {
		num = arrtmp[i].indexOf("=");
		if (num > 0) {
			name = arrtmp[i].substring(0, num);
			value = arrtmp[i].substr(num + 1);
			this[name] = value;
		}
	}
}
//--------------------------------------
//调用:

