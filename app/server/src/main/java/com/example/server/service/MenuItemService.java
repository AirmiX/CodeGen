package com.example.server.service;

import com.example.server.model.MenuItem;
import java.util.List;

public interface MenuItemService extends CrudService<MenuItem> {
	
	List<MenuItem> findByMenuItemCategoryId(Long id);
	
	List<MenuItem> findByRestaurantId(Long id);
	
}
