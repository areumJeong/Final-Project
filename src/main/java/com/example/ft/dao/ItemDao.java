package com.example.ft.dao;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.example.ft.entity.Item;

@Mapper
public interface ItemDao {
	
	@Select("select * from item where iId=#{iid} and isDeleted=0")
	Item getItemIid(int iid);

	@Select("select * from item where isDeleted=0 order by regDate desc")
	List<Item> getItemList();
	
	@Select("select * from item WHERE CONCAT(name, category, content, option, tag) LIKE ${query} AND isDeleted=0 order by regDate desc")
	List<Item> getSearchItemList(String query);
	
	@Insert("insert into item values (default, #{name}, #{category}, #{img1}, #{img2},"
			+ " #{content}, #{price}, default, default, default, #{option}, #{count}, default,"
			+ " #{tag}, default)")
	void insertItem(Item item);
	
	@Update("update item set name=#{name}, category=#{category}, img1=#{img1}, img2=#{img2},"
			+ " content=#{content}, price=#{price}, option=#{option}, count=#{count}, "
			+ " tag=#{tag} where iid=#{iid}")
	void updateItem(Item item);	
	
	@Update("update item set isDeleted=1 where iid=#{iid}")
	void deleteItem(int iid);
	
	@Update("update item set salePrice=#{salePrice}, saleDate=#{saleDate} where iid=#{iid}")
	void saleItem(Item item);
}