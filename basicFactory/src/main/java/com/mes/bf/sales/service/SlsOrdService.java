package com.mes.bf.sales.service;

import java.util.List;

import com.mes.bf.sales.vo.SlsOrdHdDtlVO;
import com.mes.bf.sales.vo.SlsOrdHdVO;
import com.mes.bf.sales.vo.SlsOrdPlanVO;

public interface SlsOrdService {
	
	//주문내역 전체조회
	List<SlsOrdHdDtlVO> findAllOrder();
	
	//일자, 거래처별 주문조회
	List<SlsOrdHdDtlVO> findOrder(String ordSdate, String ordEdate, String vendorName);
	
	//주문관리에서 주문내역 조회 모달
	List<SlsOrdHdVO> findOrderModal(String ordSdate, String ordEdate);
	
	//주문관리에서 주문내역 상세조회
	List<SlsOrdHdDtlVO> findDtlOrder (String slsOrdHdNo);
	
	//생산계획관리의 미계획 주문내역 조회
	List<SlsOrdPlanVO> findOrderForPlan(String ordSdate, String ordEdate, String ordType);
	
	//주문관리 테이블 등록
	void insertOrder(SlsOrdHdVO vo);
	
}
