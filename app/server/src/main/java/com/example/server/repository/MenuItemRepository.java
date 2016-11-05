package com.example.server.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.server.model.MenuItem;


@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {

	List<MenuItem> findByMenuItemCategoryId(Long id);
	
	List<MenuItem> findByRestaurantId(Long id);
	

}
