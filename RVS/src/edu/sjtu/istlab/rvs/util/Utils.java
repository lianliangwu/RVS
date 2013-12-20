package edu.sjtu.istlab.rvs.util;

import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.util.List;
import org.dom4j.Element;

import edu.sjtu.istlab.rvs.entity.User;
//import edu.sjtu.istlab.tuoche.entity.UserList;
import edu.sjtu.istlab.rmp.rest.entity.exception.RmpResourceException;

public class Utils {
	
	public static final String HOST="http://localhost:8080/";
	
	public static final String CONFIG="01";

	public static Boolean isError(Element root){
		if (root.getQName().getName().equalsIgnoreCase("Errors")) {
			return true;
		}
		return false;	
	}
}
