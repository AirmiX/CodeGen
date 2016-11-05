package com.example.server.service;

import com.example.server.model.Restaurant;
import java.util.List;

public interface RestaurantService extends CrudService<Restaurant> {
	
	List<Restaurant> findByName(String name);
	
	List<Restaurant> findByRestaurantBrandId(Long id);
	
	List<Restaurant> findByCityId(Long id);
	
}
