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
import org.springframework.web.bind.annotation.PathVariable;
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
	
	@GetMapping("/detail/{iid}")
	public JSONObject getItemDetail(@PathVariable int iid) {
		Item item = itemService.getItemIId(iid);
		JSONObject jItem = new JSONObject();
		jItem.put("iid", item.getIid());
		jItem.put("name", item.getName());
		jItem.put("category", item.getCategory());
		jItem.put("img1", item.getImg1());
		jItem.put("img2", item.getImg2());
		jItem.put("content", item.getContent());
		jItem.put("price", item.getPrice());
		jItem.put("salePrice", item.getSalePrice());
		jItem.put("saleDate", item.getSaleDate());
		jItem.put("regDate", item.getRegDate());
		jItem.put("isDeleted", item.getIsDeleted());
		jItem.put("totalSta", item.getTotalSta());
		
		List<ItemOption> itemOptionlist = itemService.getItemOptionIId(iid);
		JSONArray jArrOption = new JSONArray();
		for(ItemOption option : itemOptionlist) {
			JSONObject jObj = new JSONObject(); 
			jObj.put("ioid", option.getIoid());
			jObj.put("iid", option.getIid());
			jObj.put("option", option.getOption());
			jObj.put("count", option.getCount());
			jObj.put("isDeleted", option.getIsDeleted());
			jArrOption.add(jObj);
		}
		
		List<ItemTag> itemTaglist = itemService.getItemTagIId(iid);
		JSONArray jArrTag = new JSONArray();
		for(ItemTag tag : itemTaglist) {
			JSONObject jObj = new JSONObject(); 
			jObj.put("itid", tag.getItid());
			jObj.put("iid", tag.getIid());
			jObj.put("tag", tag.getTag());
			jObj.put("isDeleted", tag.getIsDeleted());
			jArrTag.add(jObj);
		}
		
		JSONObject response = new JSONObject();
	    response.put("item", jItem);
	    response.put("options", jArrOption);
	    response.put("tags", jArrTag);
	    
		return response;
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