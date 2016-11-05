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


@Table(name="restaurant")
@Entity
public class Restaurant extends AbstractBaseEntity { 
 
	@Column(name="name"
	)
    private String name;
        
	@Column(name="streetname"
	)
    private String streetName;
        
	@Column(name="streetnumber"
	)
    private int streetNumber;
        
	@Column(name="gpslatitude"
	)
    private double gpsLatitude;
        
	@ManyToOne(fetch=FetchType.LAZY)
    private RestaurantBrand restaurantBrand;
        
	@ManyToOne(fetch=FetchType.LAZY)
    private City city;
        
    @OneToMany(mappedBy="restaurant",cascade=CascadeType.REMOVE)
	private List<MenuItem> menuitemsList = new ArrayList<MenuItem>();
        
	@Column(name="gpslongitude"
	)
    private double gpsLongitude;
        

	public Restaurant() {}

  	public String getName(){
    	return name;
  	}
  
  	public void setName(String name){
       	this.name = name;	
	}
      
  	public String getStreetName(){
    	return streetName;
  	}
  
  	public void setStreetName(String streetName){
       	this.streetName = streetName;	
	}
      
  	public int getStreetNumber(){
    	return streetNumber;
  	}
  
  	public void setStreetNumber(int streetNumber){
       	this.streetNumber = streetNumber;	
	}
      
  	public double getGpsLatitude(){
    	return gpsLatitude;
  	}
  
  	public void setGpsLatitude(double gpsLatitude){
       	this.gpsLatitude = gpsLatitude;	
	}
      
  	public RestaurantBrand getRestaurantBrand(){
    	return restaurantBrand;
  	}
  
  	public void setRestaurantBrand(RestaurantBrand restaurantBrand){
       	this.restaurantBrand = restaurantBrand;	
	}
      
  	public City getCity(){
    	return city;
  	}
  
  	public void setCity(City city){
       	this.city = city;	
	}
      
   	public void addMenuitems(MenuItem menuitems){
		this.menuitemsList.add(menuitems);
		
		if(menuitems.getRestaurant() != this){
			menuitems.setRestaurant(this);
		}
	}
	
	public void removeMenuitems(MenuItem menuitems){
		menuitems.setRestaurant(null);
		menuitemsList.remove(menuitems);
	}
	
  	public double getGpsLongitude(){
    	return gpsLongitude;
  	}
  
  	public void setGpsLongitude(double gpsLongitude){
       	this.gpsLongitude = gpsLongitude;	
	}
      

}




