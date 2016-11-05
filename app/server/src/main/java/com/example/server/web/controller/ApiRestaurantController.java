package com.example.server.web.controller;

import java.util.List;

import com.example.server.model.Restaurant;
import com.example.server.service.RestaurantService;
import com.example.server.support.RestaurantDTOToRestaurant;
import com.example.server.support.RestaurantToRestaurantDTO;
import com.example.server.web.dto.RestaurantDTO;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/restaurantList")
public class ApiRestaurantController {

	@Autowired
	private RestaurantService restaurantService;

	@Autowired
	private RestaurantToRestaurantDTO toDTO;

	@Autowired
	private RestaurantDTOToRestaurant toRestaurant;

	@RequestMapping(method = RequestMethod.GET)
	ResponseEntity<List<RestaurantDTO>> getRestaurantList(
			@RequestParam(value = "name", required = false) String name,
			@RequestParam(value = "page", required = false) Integer page) {

		List<Restaurant> restaurantList;
		int totalItems = 0;
		
		HttpHeaders httpHeaders = new HttpHeaders();
		Page<Restaurant> restaurantListPage;
		
		if(page != null) {
			restaurantListPage = restaurantService.findAll(page);
			totalItems = restaurantService.findAll().size();
			httpHeaders.add("total-items", "" + totalItems);
			restaurantList = restaurantListPage.getContent();
		}
		else {
			restaurantList = restaurantService.findAll();
		}
	
		return new ResponseEntity<>(toDTO.convert(restaurantList), httpHeaders, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/filterByRestaurantBrand/{id}", method = RequestMethod.GET)
		ResponseEntity<List<RestaurantDTO>> getRestaurantListByRestaurantBrand(@PathVariable Long id) {

		List<Restaurant> restaurantList;
		
		restaurantList = restaurantService.findByRestaurantBrandId(id);
			
		return new ResponseEntity<>(toDTO.convert(restaurantList), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/filterByCity/{id}", method = RequestMethod.GET)
		ResponseEntity<List<RestaurantDTO>> getRestaurantListByCity(@PathVariable Long id) {

		List<Restaurant> restaurantList;
		
		restaurantList = restaurantService.findByCityId(id);
			
		return new ResponseEntity<>(toDTO.convert(restaurantList), HttpStatus.OK);
	}
	

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	ResponseEntity<RestaurantDTO> getRestaurant(@PathVariable Long id) {
		Restaurant restaurant = restaurantService.findOne(id);
		if (restaurant == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<>(toDTO.convert(restaurant), HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	ResponseEntity<RestaurantDTO> delete(@PathVariable Long id) {
		Restaurant deleted = restaurantService.remove(id);

		return new ResponseEntity<>(toDTO.convert(deleted), HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.POST, consumes = "application/json")
	public ResponseEntity<RestaurantDTO> add(@RequestBody @Valid RestaurantDTO newRestaurant) {

		Restaurant savedRestaurant = restaurantService.save(toRestaurant
				.convert(newRestaurant));

		return new ResponseEntity<>(toDTO.convert(savedRestaurant), HttpStatus.CREATED);
	}

	@RequestMapping(method = RequestMethod.PUT, value = "/{id}", consumes = "application/json")
	public ResponseEntity<RestaurantDTO> edit(@RequestBody @Valid RestaurantDTO restaurant,
			@PathVariable Long id) {

		if (id != restaurant.getId()) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		Restaurant persisted = restaurantService.save(toRestaurant.convert(restaurant));

		return new ResponseEntity<>(toDTO.convert(persisted), HttpStatus.OK);
	}

}
