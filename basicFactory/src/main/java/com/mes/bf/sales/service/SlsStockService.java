package com.mes.bf.sales.service;

import java.util.List;

import com.mes.bf.sales.vo.SlsStockVO;

public interface SlsStockService {

	//완제품재고 전체조회
	List<SlsStockVO> findAllStock();
	
	//제품별, LOT번호별 조회
	List<SlsStockVO> findStock(String prdName, String lotNo);
	
	//완제품 출고 수정 시 재고 조건 조회
	List<SlsStockVO>findOutUpdateStock(String slsOutHdNo, String finPrdCdCode);
}
