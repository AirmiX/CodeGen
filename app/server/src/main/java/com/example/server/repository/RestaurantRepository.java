package com.example.server.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.server.model.Restaurant;


@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

	List<Restaurant> findByName(String name);
	
	List<Restaurant> findByRestaurantBrandId(Long id);
	
	List<Restaurant> findByCityId(Long id);
	

}
