package com.example.ft.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.ft.dao.BoardDao;
import com.example.ft.dao.ItemDao;
import com.example.ft.entity.Board;
import com.example.ft.entity.Item;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService{
	private final ItemDao itemDao;
	
	@Override
	public Item getItemIId(int iid) {
		return itemDao.getItemIid(iid);
	}

	@Override
	public List<Item> getItemList() {
		return itemDao.getItemList();
	}

	@Override
	public List<Item> getSearchItemList(String query) {
		query = query.replace("'", "''");
		query = "'%" + query + "%'";
		return itemDao.getSearchItemList(query);
	}

	@Override
	public void insertItem(Item item) {
		itemDao.insertItem(item);
	}

	@Override
	public void updateItem(Item item) {
		itemDao.updateItem(item);	
	}

	@Override
	public void deleteItem(int iid) {
		itemDao.deleteItem(iid);
	}

	@Override
	public void saleItem(Item item) {
		itemDao.saleItem(item);
	}

}
