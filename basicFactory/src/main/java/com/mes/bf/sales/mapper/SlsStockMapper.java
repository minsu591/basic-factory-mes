package com.mes.bf.sales.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.sales.vo.SlsStockVO;

@Mapper
public interface SlsStockMapper {
	List<SlsStockVO> findAllStock();
	List<SlsStockVO> findStock(String prdCdCode, String PrdStkLotNo);
}
