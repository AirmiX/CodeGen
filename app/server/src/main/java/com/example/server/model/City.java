package com.example.server.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;


@Table(name="city")
@Entity
public class City extends AbstractBaseEntity { 
 
	@Column(name="name"
	)
    private String name;
        
	@ManyToOne(fetch=FetchType.LAZY)
    private Country country;
        
    @OneToMany(mappedBy="city",cascade=CascadeType.REMOVE)
	private List<Restaurant> restaurantsList = new ArrayList<Restaurant>();
        

	public City() {}

  	public String getName(){
    	return name;
  	}
  
  	public void setName(String name){
       	this.name = name;	
	}
      
  	public Country getCountry(){
    	return country;
  	}
  
  	public void setCountry(Country country){
       	this.country = country;	
	}
      
   	public void addRestaurants(Restaurant restaurants){
		this.restaurantsList.add(restaurants);
		
		if(restaurants.getCity() != this){
			restaurants.setCity(this);
		}
	}
	
	public void removeRestaurants(Restaurant restaurants){
		restaurants.setCity(null);
		restaurantsList.remove(restaurants);
	}
	

}




