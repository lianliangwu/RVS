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
	 * will
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
		    //System.out.println("info:into the register action !");
			User user=new User(Utils.HOST+"RVS/resource/RVS/User/_new",null);
			user.GET();
			user.setAttribute("user_email", user_email);
			user.setAttribute("user_password",user_password);
			// ? why
			// answer:the elementUri is the primary key
			// user.setElementUri("RVS/User/"+user_email);
			user.POST();
			// navigate to this page
			sucessResult="<next> system/login.html </next>";
			sucessResult="<success>"+sucessResult+"</success>";
			return SUCCESS;
		}
		catch ( RmpResourceException e) {
			errorResult=DORErrors.getErrorMessageXML(e.getMessage(), e.getCode()).asXML();
			System.out.println("info:register action exception 1!");
			return ERROR;
		}
		catch (Exception e) {
			errorResult=DORErrors.getErrorMessageXML(e.getMessage(), 700).asXML();
			System.out.println("info:register action exception 2!");
			return ERROR;
		}
	}
}
