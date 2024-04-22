package com.example.ft.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.json.simple.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONArray;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.ft.entity.Board;
import com.example.ft.entity.Item;
import com.example.ft.service.BoardService;
import com.example.ft.service.ItemService;
import org.springframework.web.bind.annotation.RequestBody;


@Slf4j // log로 값을 출력
@Controller
@RequestMapping("/item")	
@RequiredArgsConstructor
public class ItemController {
	private final ItemService itemService;
	
	@GetMapping("/list")
	public JSONArray list() {
		List<Item> list = itemService.getItemList();
		JSONArray jArr = new JSONArray();
		for(Item item : list) {
			JSONObject jObj = new JSONObject(); 
			jObj.put("iid", item.getIid());
			jObj.put("name", item.getName());
			jObj.put("category", item.getCategory());
			jObj.put("img1", item.getImg1());
			jObj.put("img2", item.getImg2());
			jObj.put("content", item.getContent());
			jObj.put("price", item.getPrice());
			jObj.put("salePrice", item.getSalePrice());
			jObj.put("saleDate", item.getSaleDate());
			jObj.put("regDate", item.getRegDate());
			jObj.put("option", item.getOption());
			jObj.put("count", item.getCount());
			jObj.put("isDeleted", item.getIsDeleted());
			jObj.put("tag", item.getTag());
			jObj.put("totalSta", item.getTotalSta());
			jArr.add(jObj);
		}
		return jArr;
	}
	
	@GetMapping("/search")
	public JSONArray getSearchItemList(String query) {
		List<Item> list = itemService.getSearchItemList(query);
		JSONArray jArr = new JSONArray();
		for(Item item : list) {
			JSONObject jObj = new JSONObject(); 
			jObj.put("iid", item.getIid());
			jObj.put("name", item.getName());
			jObj.put("category", item.getCategory());
			jObj.put("img1", item.getImg1());
			jObj.put("img2", item.getImg2());
			jObj.put("content", item.getContent());
			jObj.put("price", item.getPrice());
			jObj.put("salePrice", item.getSalePrice());
			jObj.put("saleDate", item.getSaleDate());
			jObj.put("regDate", item.getRegDate());
			jObj.put("option", item.getOption());
			jObj.put("count", item.getCount());
			jObj.put("isDeleted", item.getIsDeleted());
			jObj.put("tag", item.getTag());
			jObj.put("totalSta", item.getTotalSta());
			jArr.add(jObj);
		}
		return jArr;
	}
	
	@PostMapping("/insert")
	public String ItemInsert(String name, String category, String img1, String img2,
			 String content, int price, String option, int count, String tag) {
		Item item = Item.builder()
						.name(name).category(category).img1(img1).img2(img2)
						.content(content).price(price).option(option).count(count)
						.tag(tag).build();
		itemService.insertItem(item);
		return null;
	}
	
	@PostMapping("/update")
	public String ItemUpdate(String name, String category, String img1, String img2,
			 String content, int price, String option, int count, String tag, int iid) {
		Item item = Item.builder()
						.name(name).category(category).img1(img1).img2(img2)
						.content(content).price(price).option(option).count(count)
						.tag(tag).iid(iid).build();
		itemService.updateItem(item);
		return null;
	}
	
	@PostMapping("/delete")
	public String ItemDelete(int iid) {
		itemService.deleteItem(iid);
		return null;
	}
	
	@PostMapping("/sale")
	public String saleItem(int salePrice, LocalDateTime saleDate, int iid) {
		Item item = Item.builder()
						.salePrice(salePrice).saleDate(saleDate).iid(iid).build();
		itemService.saleItem(item);
		return null;
	}
	
	
}
