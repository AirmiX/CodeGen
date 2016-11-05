package com.example.server.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.server.model.RestaurantBrand;


@Repository
public interface RestaurantBrandRepository extends JpaRepository<RestaurantBrand, Long> {


}
