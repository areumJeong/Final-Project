package com.example.ft.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class CartItemRequest {
	private int iid;
	private String email;
	private int ioid;
	private int count;

	public CartItem toCartItem(int price) {
		CartItem cartItem = new CartItem();
		cartItem.setIid(this.iid);
		cartItem.setEmail(this.email);
		cartItem.setCount(this.count);
		cartItem.setPrice(price); // 가격은 서버에서 받아온 값으로 설정
		cartItem.calculateTotalPrice(); // 총 가격 계산
		System.out.println(this.iid);
		return cartItem;
	}
}

// public class CartOption {
//     // cart_option
//     private  int cartOptionId;
//     private int userId;
//     private int iid;
//     private String size;
//     private String color;
// }