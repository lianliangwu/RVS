package edu.sjtu.istlab.rvs.action;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import com.opensymphony.xwork2.ActionSupport;
import edu.sjtu.istlab.rmp.rest.entity.exception.RmpResourceException;
import edu.sjtu.istlab.rmp.rest.server.errors.DORErrors;
import edu.sjtu.istlab.rvs.util.Utils;
import edu.sjtu.istlab.rvs.entity.User;

/**
 * struts/tuoche/Register.action
 *
 */
public class Register extends ActionSupport{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -6100171461681948886L;
	private String user_email="";
	private String user_password="";
	private String sucessResult;
	private String errorResult;
	
	public String getSucessResult() {
		return sucessResult;
	}

	public String getErrorResult() {
		return errorResult;
	}
	
	@Override
	public String execute() {
		HttpServletRequest request=ServletActionContext.getRequest();
		user_email=request.getParameter("user_email");
		user_password=request.getParameter("user_password");
		if (user_email==null || user_password==null) {
			errorResult=DORErrors.getErrorMessageXML("need username and password", 700).asXML();
			return ERROR;
		}
		try {
			User user=new User(Utils.HOST+"/tuoche/resource/TuoChe/User/_new",null);
/*			user.GET();
			user.setAttribute("user_email", user_email);
			user.setAttribute("user_password",user_password);
			user.setElementUri("PaperSys/User/"+user_email);
			user.POST();
			return SUCCESS;*/
		    // this is temp-test for action
			return user.GET().asXML();
		}
		catch ( RmpResourceException e) {
			errorResult=DORErrors.getErrorMessageXML(e.getMessage(), e.getCode()).asXML();
			return ERROR;
		}
		catch (Exception e) {
			errorResult=DORErrors.getErrorMessageXML(e.getMessage(), 700).asXML();
			return ERROR;
		}
	}
}
