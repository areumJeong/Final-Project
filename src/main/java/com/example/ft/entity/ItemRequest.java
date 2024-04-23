package com.example.ft.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ItemRequest {
	private String name;
    private String category;
    private String img1;
    private String img2;
    private String img3;
    private String content;
    private int price;
    private String[] option;
    private int[] count;
    private String[] tag;
}