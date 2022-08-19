package com.mes.bf.sales.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.sales.vo.SalesOrderHistoryVO;

@Mapper
public interface SlsOrdMapper {
	List<SalesOrderHistoryVO> findAllOrder();
}
