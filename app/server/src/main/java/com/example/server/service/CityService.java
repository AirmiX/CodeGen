package com.example.server.service;

import com.example.server.model.City;
import java.util.List;

public interface CityService extends CrudService<City> {
	
	List<City> findByName(String name);
	
	List<City> findByCountryId(Long id);
	
}
