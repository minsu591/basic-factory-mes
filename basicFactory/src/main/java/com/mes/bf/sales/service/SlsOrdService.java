package com.mes.bf.sales.service;

import java.util.List;
import java.util.Map;

import com.mes.bf.sales.vo.SlsOrdHdDtlVO;

public interface SlsOrdService {
	
	//주문내역 전체조회
	List<SlsOrdHdDtlVO> findAllOrder();
	
	//일자, 거래처별 주문조회
	List<SlsOrdHdDtlVO> findOrder(Map<String, Object> params);
}
