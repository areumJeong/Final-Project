package com.example.ft.service;

import java.util.List; 

import com.example.ft.entity.Order;

import com.example.ft.entity.OrderItem;

public interface OrderService {
	
	/*
	 * order
	 */
	
	List<Order> getOrderListByEmail(String email);
	
	Order getOrderByOid(int oid);
	
	void insertOrder(Order order);
	
	void deleteOrder(int oid);
	
	/*
	 * orderItem
	 */
	
	List<OrderItem> getOrderItemListByOiid(int oiid);
	
	void insertOrderItemWithOid(OrderItem orderItem);
	
	
	/*
	 * OrderData
	 */
	
	// status 변경하기
	void statusCheckUpdate(String orderId);
	//
//	void insertOrderData(OrderData orderData);
}
