package com.mes.bf.sales.service;

import java.util.List;

import com.mes.bf.sales.vo.SlsOrdHdDtlVO;
import com.mes.bf.sales.vo.SlsOutDtlVO;
import com.mes.bf.sales.vo.SlsOutHdDtlVO;
import com.mes.bf.sales.vo.SlsOutHdVO;

public interface SlsOutService {
	//출고내역 전체조회
	List<SlsOutHdDtlVO> findAllOut();
	
	//일자, 거래처별 출고조회
	List<SlsOutHdDtlVO> findOut(String outSdate, String outEdate, String vendorName);
	
	//미출고 주문내역 조회
	List<SlsOrdHdDtlVO> findNotOut(String ordSdate, String ordEdate);
	
	//출고관리에서 주문상세 조회
	List<SlsOutHdDtlVO> findNotOutDtl(String slsOrdHdNo);
	
	//출고관리에서 출고조회 모달
	List<SlsOutHdVO> outView(String outSdate, String outEdate);
	
	//출고관리에서 출고내역 상세조회(중복 제품 합쳐서)
	List<SlsOutDtlVO> outDtlView(String slsOutHdNo);
	
	//출고관리 헤더등록
	void outInsertHd(SlsOutHdVO vo);
	
	//출고관리 바디등록
	void outInsertDtl(SlsOutDtlVO vo);
	
	//출고관리 수정
	void outUpdate(String slsOutDtlNo ,String slsOutDtlVol);
	
	//출고관리 헤더 삭제
	void outHdDelete(SlsOutHdVO vo);
	
	//출고관리 출고내역번호 조회(프로시저 실행 용도)
	List<SlsOutDtlVO> outDtlNoSelect(SlsOutDtlVO vo);
	
	//출고디테일 삭제 프로시저
	void callProcOutDtlDel(String slsOutDtlNo);	
	
	//반품관리에서 출고내역 상세조회(중복 제품 모두)
	List<SlsOutDtlVO> outDtlViewToReturn(String slsOutHdNo);
	
	//주문관리에서 출고내역 조회
	int checkOrder(String slsOrdHdNo);
}
