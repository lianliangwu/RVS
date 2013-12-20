package edu.sjtu.istlab.rvs.entity;

import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;

import org.dom4j.Element;

import edu.sjtu.istlab.rmp.resource.client.ClientXMLResource;
import edu.sjtu.istlab.rmp.rest.entity.exception.RmpResourceException;

/**
 * 
 * @author Eric Shieh
 * 
 * 2013-10-13
 *
 */
public abstract class AbstractEntity extends ClientXMLResource{
	
	public AbstractEntity(String URI, Element content) throws MalformedURLException, UnsupportedEncodingException {
		super(URI, content);
	}
	
	public String getAttribute(String name) throws RmpResourceException{
		if (currentElement.element("record")==null) {
			throw new RmpResourceException(" the attribute "+name+" is not exist!", 400);
		}
		if(currentElement.element("record").element(name)!=null){
			return currentElement.element("record").element(name).getText();
		}else {
			throw new RmpResourceException(" the attribute "+name+" is not exist!", 400);
		}	 
	}
	
	public void setAttribute(String name, String value) throws RmpResourceException{
		if (currentElement.element("record")==null) {
			throw new RmpResourceException(" the attribute "+name+" is not exist!", 400);
		}
		if(currentElement.element("record").element(name)!=null){
			currentElement.element("record").element(name).setText(value);
		}else {
			throw new RmpResourceException(" the attribute "+name+" is not exist!", 400);
		}	
	}
	
	@SuppressWarnings("deprecation")
	public void setElementUri(String uri){
		currentElement.setAttributeValue("uri", uri);
	}

}
