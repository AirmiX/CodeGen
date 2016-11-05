package com.example.server.support;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import com.example.server.model.City;
import com.example.server.web.dto.CityDTO;

import com.example.server.support.CountryToCountryDTO;

@Component
public class CityToCityDTO implements Converter<City, CityDTO> {

	@Autowired
	private CountryToCountryDTO toCountryDTO;

	@Override
	public CityDTO convert(City city) {
		CityDTO dto = new CityDTO();
		
		dto.setId(city.getId());
		dto.setName(city.getName());
		dto.setCountry(toCountryDTO.convert(city.getCountry()));
		return dto;
	}
	
	public List<CityDTO> convert(List<City> cityList){
		List<CityDTO> cityDTOList = new ArrayList<>();
		
		for(City city : cityList){
			cityDTOList.add(convert(city));
		}
		
		return cityDTOList;
	}
}
