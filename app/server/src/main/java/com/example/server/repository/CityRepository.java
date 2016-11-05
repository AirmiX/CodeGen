package com.example.server.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.server.model.City;


@Repository
public interface CityRepository extends JpaRepository<City, Long> {

	List<City> findByName(String name);
	
	List<City> findByCountryId(Long id);
	

}
