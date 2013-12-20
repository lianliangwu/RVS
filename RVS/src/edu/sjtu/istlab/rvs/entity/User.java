package edu.sjtu.istlab.rvs.entity;

import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.List;

import org.dom4j.Element;

import edu.sjtu.istlab.rvs.util.Utils;


/**
 * 
 * @author Eric Shieh
 * 
 * 2013-10-13
 *
 */
@SuppressWarnings("unchecked")
public class User extends AbstractEntity{
	
	public User(String uri,Element root) throws MalformedURLException, UnsupportedEncodingException{
		super(uri, root);	
	}

/*	public List<Paper> getPapers() throws MalformedURLException, UnsupportedEncodingException{	
		List<Element> userHasPapers=currentElement.elements("UserHasPaper");
		List<Paper> result=new ArrayList<Paper>();
		for (Element userHasPaper : userHasPapers) {
			Element temp=userHasPaper.element("Paper");
			if (temp!=null) {
				String tempUriS=Utils.HOST+"RMP-2/resource/"+temp.attributeValue("uri");
				result.add(new Paper(tempUriS,temp));
			}
		}
		return result;	
	}*/
	
}
