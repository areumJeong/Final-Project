package com.example.ft.controller;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import org.json.simple.JSONObject;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONArray;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.ft.entity.Item;
import com.example.ft.entity.ItemOption;
import com.example.ft.entity.ItemRequest;
import com.example.ft.entity.ItemTag;
import com.example.ft.service.ItemService;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@Slf4j // log로 값을 출력
@RestController
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
			jObj.put("isDeleted", item.getIsDeleted());
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
			JSONArray jArray = new JSONArray();
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
			jObj.put("isDeleted", item.getIsDeleted());
			jObj.put("totalSta", item.getTotalSta());
			jArr.add(jObj);
		}
		return jArr;
	}
	
	@PostMapping("/insert")
	public String ItemInsert(@RequestBody ItemRequest itemRequest) {
	    Item item = Item.builder()
	            .name(itemRequest.getName()).category(itemRequest.getCategory())
	            .img1(itemRequest.getImg1()).img2(itemRequest.getImg2())
	            .img3(itemRequest.getImg3()).content(itemRequest.getContent())
	            .price(itemRequest.getPrice())
	            .build();
	    itemService.insertItem(item);
	    String[] option = itemRequest.getOption();
	    int[] count = itemRequest.getCount();
	    String[] tag = itemRequest.getTag();
	    
	    for (int i = 0; i < option.length; i++) {
	        ItemOption itemOption = ItemOption.builder()
	                .iid(item.getIid()).option(option[i]).count(count[i])
	                .build();
	        itemService.optionInsert(itemOption);
	    }
	    for (int i = 0; i < tag.length; i++) {
	        ItemTag itemTag = ItemTag.builder()
	                .iid(item.getIid()).tag(tag[i])
	                .build();
	        itemService.tagInsert(itemTag);
	    }

	    return "Success";
	}

	
	@PostMapping("/update")
	public String ItemUpdate(String name, String category, String img1, String img2,
			 String content, int price, int iid) {
		Item item = Item.builder()
						.name(name).category(category).img1(img1).img2(img2)
						.content(content).price(price).iid(iid).build();
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