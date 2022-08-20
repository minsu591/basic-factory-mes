package com.mes.bf.sales.service;

import java.util.List;

import com.mes.bf.sales.vo.SalesOrderHistoryVO;

public interface SlsOrdService {
	
	// 주문내역 전체조회
	List<SalesOrderHistoryVO> findAllOrder();
	
	// 주문내역 일자, 거래처명으로 검색
}
