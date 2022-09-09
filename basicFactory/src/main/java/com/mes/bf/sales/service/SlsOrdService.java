package com.mes.bf.sales.service;

import java.util.List;

import com.mes.bf.sales.vo.SlsOrdDtlVO;
import com.mes.bf.sales.vo.SlsOrdHdDtlVO;
import com.mes.bf.sales.vo.SlsOrdHdVO;

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
	List<SlsOrdHdVO> findOrderForPlan(String ordSdate, String ordEdate);
	
	//생산계획관리의 미계획 주문내역 상세 조회
	List<SlsOrdDtlVO> findOrderForPlanDtl(String slsOrdHdNo);
	
	//주문관리 수정
	void orderUpdate(String priKey, String updCol, String updCont);
	
	//주문관리 헤더 삭제
	void orderHdDelete(String slsOrdHdNo);
	
	//주문관리 바디 삭제
	void orderDelete(List<String> delList);
	
	//주문관리 헤더등록
	void orderInsertHd(SlsOrdHdVO vo);
	
	//주문관리 바디등록(신규등록)
	void orderInsertDtl(SlsOrdDtlVO ordDtlVO);
	
	//주문관리 바디등록(기존 주문내역 추가등록)
	void orderDtlAddInsert(SlsOrdDtlVO vo);
}
