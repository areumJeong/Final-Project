package com.example.ft.controller;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.Arrays;
import java.util.List;

import org.json.simple.JSONObject;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONArray;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.ft.entity.Item;
import com.example.ft.entity.ItemOption;
import com.example.ft.entity.ItemRequest;
import com.example.ft.entity.ItemTag;
import com.example.ft.entity.SaleData;
import com.example.ft.entity.Wish;
import com.example.ft.service.ItemService;
import com.example.ft.service.WishService;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@Slf4j // log로 값을 출력
@RestController
@RequestMapping("/wish")	
@RequiredArgsConstructor
public class WishController {
	private final ItemService itemService;
	private final WishService wishService;
	
	@PostMapping("/click")
	public int click(@RequestBody Wish wishJson) {
		Wish wish = wishService.getWish(wishJson.getIid(), wishJson.getEmail());
		int value = 0;
		if (wish == null) {
			Wish wishData = Wish.builder().email(wishJson.getEmail()).iid(wishJson.getIid())
								.value(1).build();
			wishService.insertWish(wishData);
			value = 1;
		} else {
			value = wishService.toggleWish(wish);
		}
		return value;
	}
	
}