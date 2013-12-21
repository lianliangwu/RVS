/*
function addTitle(){
	$(document).ready(function(){ 
		$("body").append("<h1>append to test</h1>");
	})
	
}


function addBody(){
	$(":root").append("<body> <h1> body</h1> </body>");
}

*/

function oerrmess(code){
	switch(code){
		case 230:
			return "You have already registered."
		case 700:
			return "You have already activated your account."
		default:
			return "error"
				
	}
	return errmess;
}


// http://localhost:8080//tuoche/resource/tuoche/user/9773694896263
function tuoche_register(){
	
	$.ajax({
		url:"/RVS/struts/RVS/Register.action?user_email="
			+$("#emailAddress").val()+"&user_password="+$("#password").val(),
		success:function(data) {
		    console.log(data);
			var json = $.z4x(data);
			if(json.success){
				window.location.href="/RVS/system/login.html";
			} else {
				alert("Error Code: Register failed");
			}
		    console.log(json);
		}
	})
}


function login(){
	$.ajax({
		url:"/RVS/resource/RVS/User/?user_email="+$("#emailAddress").val()+"&user_password="+$("#password").val(),
		headers:{
			username:$("#emailAddress").val(),
			password:$("#password").val()
		},
		success:function(data){
			var error=$(data).find("Errors");
			var reason=$(data).find("Reason").val();
            var records = $.z4x(data).Resources.User;
			if(error.length==0 && records != undefined ){
				$.cookie('username', $("#emailAddress").val(),{path:'/'});
				$.cookie('password',$("#password").val(),{path:'/'});
				window.location.href="/RVS/system/main.html";
			}
			else{
				$("#loginerrmess").append("<em style='color:#FF0000'>email or password is wrong</em>");
			}
		}
	})
	
}


function validatelogin(){
	$(document).ready(function(){
		$("#loginForm").validate({
			errorClass: "myerror",
			 submitHandler: function() 
			   {      
			       login();    
			   } ,
			 rules: {
					  emailAddress:{
					  	required :true,
					  	email:true
					  	},
					  password : "required"
			 }
		  });
	});		
}



