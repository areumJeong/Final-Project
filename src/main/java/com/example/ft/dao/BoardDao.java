package com.example.ft.dao;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.example.ft.entity.Board;

@Mapper
public interface BoardDao {
	
	@Select("select * from board where bid=#{bid} and isDeleted=0")
	Board getBoardByBid(int bid);

	@Select("select * from board where isDeleted=0 and btype=#{btype} order by bdate desc")
	List<Board> getBoardList(String btype);
	
	@Insert("insert into board values (default, #{iId}, #{email}, #{btype}, #{bcate},"
			+ " #{title}, default, #{content}, #{img}, default)")
	void insertBoard(Board board);
	
	@Update("update board set iId=#{iId}, btype=#{btype}, bcate=#{bcate}, title=#{title},"
			+ " content=#{content}, img=#{img} where bid=#{bid}")
	void updateBoard(Board board);
	
	@Update("update board set isDeleted=1 where bid=#{bid}")
	void deletedBoard(int bid);

}
