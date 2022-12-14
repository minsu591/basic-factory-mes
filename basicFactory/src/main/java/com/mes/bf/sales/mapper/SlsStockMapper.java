package com.mes.bf.sales.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.sales.vo.SlsStockVO;

@Mapper
public interface SlsStockMapper {
	List<SlsStockVO> findAllStock();
	List<SlsStockVO> findStock(String prdName, String lotNo, String stockClfy);
	List<SlsStockVO>findOutUpdateStock(String slsOutHdNo, String finPrdCdCode);
}
