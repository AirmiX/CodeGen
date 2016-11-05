package com.example.server.support;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import com.example.server.model.Restaurant;
import com.example.server.web.dto.RestaurantDTO;

import com.example.server.support.RestaurantBrandToRestaurantBrandDTO;
import com.example.server.support.CityToCityDTO;

@Component
public class RestaurantToRestaurantDTO implements Converter<Restaurant, RestaurantDTO> {

	@Autowired
	private RestaurantBrandToRestaurantBrandDTO toRestaurantBrandDTO;
	@Autowired
	private CityToCityDTO toCityDTO;

	@Override
	public RestaurantDTO convert(Restaurant restaurant) {
		RestaurantDTO dto = new RestaurantDTO();
		
		dto.setId(restaurant.getId());
		dto.setName(restaurant.getName());
		dto.setStreetName(restaurant.getStreetName());
		dto.setStreetNumber(restaurant.getStreetNumber());
		dto.setGpsLatitude(restaurant.getGpsLatitude());
		dto.setRestaurantBrand(toRestaurantBrandDTO.convert(restaurant.getRestaurantBrand()));
		dto.setCity(toCityDTO.convert(restaurant.getCity()));
		dto.setGpsLongitude(restaurant.getGpsLongitude());
		return dto;
	}
	
	public List<RestaurantDTO> convert(List<Restaurant> restaurantList){
		List<RestaurantDTO> restaurantDTOList = new ArrayList<>();
		
		for(Restaurant restaurant : restaurantList){
			restaurantDTOList.add(convert(restaurant));
		}
		
		return restaurantDTOList;
	}
}
