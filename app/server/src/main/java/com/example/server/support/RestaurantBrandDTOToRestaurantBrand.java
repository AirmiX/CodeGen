package com.example.server.support;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import com.example.server.model.RestaurantBrand;
import com.example.server.service.RestaurantBrandService;
import com.example.server.web.dto.RestaurantBrandDTO;

import com.example.server.support.SellerDTOToSeller;

@Component
public class RestaurantBrandDTOToRestaurantBrand
	implements Converter<RestaurantBrandDTO, RestaurantBrand> {
	
	@Autowired
	private SellerDTOToSeller toSeller;
	
	@Autowired
	RestaurantBrandService restaurantBrandService;

	@Override
	public RestaurantBrand convert(RestaurantBrandDTO dto) {
		RestaurantBrand restaurantBrand = new RestaurantBrand();
		
		if(dto.getId()!=null){
			restaurantBrand = restaurantBrandService.findOne(dto.getId());
			
			if(restaurantBrand == null){
				throw new IllegalStateException("Tried to "
						+ "modify a non-existant restaurantBrand");
			}
		}
		
		restaurantBrand.setId(dto.getId());
		
	    restaurantBrand.setName(dto.getName());
		restaurantBrand.setSeller(toSeller.convert(dto.getSeller()));
		
		
		return restaurantBrand;
	}
	
	public List<RestaurantBrand> convert (List<RestaurantBrandDTO> restaurantBrandDTOList){
		List<RestaurantBrand> restaurantBrandList = new ArrayList<>();
		
		for(RestaurantBrandDTO dto : restaurantBrandDTOList){
			restaurantBrandList.add(convert(dto));
		}
		
		return restaurantBrandList;
	}

}