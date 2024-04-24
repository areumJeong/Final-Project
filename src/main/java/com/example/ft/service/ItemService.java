package com.example.ft.service;

import java.util.List;

import com.example.ft.entity.Item;
import com.example.ft.entity.ItemOption;
import com.example.ft.entity.ItemTag;

public interface ItemService {
	
	// 순수 아이템
	Item getItemIId(int iid);	
	
	List<Item> getItemList();
	
	List<Item> getSearchItemList(String query);
	
	void insertItem(Item item);	
	
	void updateItem(Item item);	
	
	void deleteItem(int iid);
	
	void saleItem(Item item);
	
	// itemOtion
	List<ItemOption> getItemOptionIId(int iid);

	void optionInsert(ItemOption itemOption);
	
	// itemTag
	List<ItemTag> getItemTagIId(int iid);
	
	void tagInsert(ItemTag itemTag);
}