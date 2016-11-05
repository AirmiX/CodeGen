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


@Table(name="restaurantbrand")
@Entity
public class RestaurantBrand extends AbstractBaseEntity { 
 
	@Column(name="name"
	, unique=true)
    private String name;
        
    @OneToMany(mappedBy="restaurantBrand",cascade=CascadeType.REMOVE)
	private List<Restaurant> restaurantsList = new ArrayList<Restaurant>();
        
	@ManyToOne(fetch=FetchType.LAZY)
    private Seller seller;
        
	@Column(name="admincomment"
	)
    private String adminComment;
        

	public RestaurantBrand() {}

  	public String getName(){
    	return name;
  	}
  
  	public void setName(String name){
       	this.name = name;	
	}
      
   	public void addRestaurants(Restaurant restaurants){
		this.restaurantsList.add(restaurants);
		
		if(restaurants.getRestaurantBrand() != this){
			restaurants.setRestaurantBrand(this);
		}
	}
	
	public void removeRestaurants(Restaurant restaurants){
		restaurants.setRestaurantBrand(null);
		restaurantsList.remove(restaurants);
	}
	
  	public Seller getSeller(){
    	return seller;
  	}
  
  	public void setSeller(Seller seller){
       	this.seller = seller;	
	}
      
  	public String getAdminComment(){
    	return adminComment;
  	}
  
  	public void setAdminComment(String adminComment){
       	this.adminComment = adminComment;	
	}
      

}




