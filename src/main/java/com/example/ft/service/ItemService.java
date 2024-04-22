package com.example.ft.service;

import java.util.List;

import com.example.ft.entity.Item;

public interface ItemService {
	
	Item getItemIId(int iid);	
	
	List<Item> getItemList();
	
	List<Item> getSearchItemList(String query);
	
	void insertItem(Item item);	
	
	void updateItem(Item item);	
	
	void deleteItem(int iid);
	
	void saleItem(Item item);
}