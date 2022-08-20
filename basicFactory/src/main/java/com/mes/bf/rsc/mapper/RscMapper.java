package com.mes.bf.rsc.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.rsc.vo.RscStockVO;

@Mapper
public interface RscMapper {


	//재고
	List<RscStockVO> StockList();
}
