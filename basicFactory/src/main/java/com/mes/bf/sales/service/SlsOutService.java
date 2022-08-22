package com.mes.bf.sales.service;

import java.util.List;

import com.mes.bf.sales.vo.SlsOutHdDtlVO;

public interface SlsOutService {
	//주문내역 전체조회
	List<SlsOutHdDtlVO> findAllOut();
	
	//일자, 거래처별 주문조회
	List<SlsOutHdDtlVO> findOut(String ordSdate, String ordEdate, String vendorName);
}
