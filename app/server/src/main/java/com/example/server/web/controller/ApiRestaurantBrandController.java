package com.example.server.web.controller;

import java.util.List;

import com.example.server.model.RestaurantBrand;
import com.example.server.service.RestaurantBrandService;
import com.example.server.support.RestaurantBrandDTOToRestaurantBrand;
import com.example.server.support.RestaurantBrandToRestaurantBrandDTO;
import com.example.server.web.dto.RestaurantBrandDTO;

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
@RequestMapping(value = "/api/restaurantBrandList")
public class ApiRestaurantBrandController {

	@Autowired
	private RestaurantBrandService restaurantBrandService;

	@Autowired
	private RestaurantBrandToRestaurantBrandDTO toDTO;

	@Autowired
	private RestaurantBrandDTOToRestaurantBrand toRestaurantBrand;

	@RequestMapping(method = RequestMethod.GET)
	ResponseEntity<List<RestaurantBrandDTO>> getRestaurantBrandList(
			@RequestParam(value = "name", required = false) String name,
			@RequestParam(value = "page", required = false) Integer page) {

		List<RestaurantBrand> restaurantBrandList;
		int totalItems = 0;
		
		HttpHeaders httpHeaders = new HttpHeaders();
		Page<RestaurantBrand> restaurantBrandListPage;
		
		if(page != null) {
			restaurantBrandListPage = restaurantBrandService.findAll(page);
			totalItems = restaurantBrandService.findAll().size();
			httpHeaders.add("total-items", "" + totalItems);
			restaurantBrandList = restaurantBrandListPage.getContent();
		}
		else {
			restaurantBrandList = restaurantBrandService.findAll();
		}
	
		return new ResponseEntity<>(toDTO.convert(restaurantBrandList), httpHeaders, HttpStatus.OK);
	}
	

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	ResponseEntity<RestaurantBrandDTO> getRestaurantBrand(@PathVariable Long id) {
		RestaurantBrand restaurantBrand = restaurantBrandService.findOne(id);
		if (restaurantBrand == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<>(toDTO.convert(restaurantBrand), HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	ResponseEntity<RestaurantBrandDTO> delete(@PathVariable Long id) {
		RestaurantBrand deleted = restaurantBrandService.remove(id);

		return new ResponseEntity<>(toDTO.convert(deleted), HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.POST, consumes = "application/json")
	public ResponseEntity<RestaurantBrandDTO> add(@RequestBody @Valid RestaurantBrandDTO newRestaurantBrand) {

		RestaurantBrand savedRestaurantBrand = restaurantBrandService.save(toRestaurantBrand
				.convert(newRestaurantBrand));

		return new ResponseEntity<>(toDTO.convert(savedRestaurantBrand), HttpStatus.CREATED);
	}

	@RequestMapping(method = RequestMethod.PUT, value = "/{id}", consumes = "application/json")
	public ResponseEntity<RestaurantBrandDTO> edit(@RequestBody @Valid RestaurantBrandDTO restaurantBrand,
			@PathVariable Long id) {

		if (id != restaurantBrand.getId()) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		RestaurantBrand persisted = restaurantBrandService.save(toRestaurantBrand.convert(restaurantBrand));

		return new ResponseEntity<>(toDTO.convert(persisted), HttpStatus.OK);
	}

}
