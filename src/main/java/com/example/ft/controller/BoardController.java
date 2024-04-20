package com.example.ft.controller;

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
import com.example.ft.service.BoardService;


@Slf4j // log로 값을 출력
@Controller
@RequestMapping("/board")	// localhost:8090/ft/board
@RequiredArgsConstructor
public class BoardController {
	private final BoardService boardService;
	
	@GetMapping("/list")
	public JSONArray list(String btype) {
		List<Board> list = boardService.getBoardList(btype);
		if(btype.equals("reveiw")) {
			
		}
		JSONArray jArr = new JSONArray();
		for(Board board : list) {
			JSONObject jObj = new JSONObject(); 
			jObj.put("bid", board.getBid());
			jObj.put("iID", board.getIID());
			jObj.put("email", board.getEmail());
			jObj.put("btype", board.getBtype());
			jObj.put("bcate", board.getBcate());
			jObj.put("title", board.getTitle());
			jObj.put("bdate", board.getBdate());
			jObj.put("content", board.getContent());
			jObj.put("img", board.getImg());
			jArr.add(jObj);
		}
		return jArr;
	}
	
	@PostMapping("/insert")
	public String boardInsert(int iId, String email, String btype, String bcate,
			 String title, String content, String img) {
		Board board = Board.builder()
						.iID(iId).email(email).btype(btype).bcate(bcate)
						.title(title).content(content).img(img).build();
		boardService.insertBoard(board);
		if(btype.equals("reveiw")) {
			
		}	
		return "등록되었습니다.";
	}
	
	
}
