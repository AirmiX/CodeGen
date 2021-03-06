package com.example.server.web.dto;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class MenuItemCategoryDTO extends AbstractBaseDTO { 

    @Size(min=0, max=30)
    private String name;

	public MenuItemCategoryDTO() {}

	public String getName(){
    	return name;
  	}
  
  	public void setName(String name){
       	this.name = name;	
	}	

}
