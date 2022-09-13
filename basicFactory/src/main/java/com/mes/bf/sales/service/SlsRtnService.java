package com.mes.bf.sales.service;

import java.util.List;

import com.mes.bf.sales.vo.SlsOutDtlVO;
import com.mes.bf.sales.vo.SlsRtnDtlVO;
import com.mes.bf.sales.vo.SlsRtnHdDtlVO;
import com.mes.bf.sales.vo.SlsRtnHdVO;

public interface SlsRtnService {
	
	//반품내역 전체조회
	List<SlsRtnHdDtlVO> findAllReturn();
	
	//일자, 거래처별 반품조회
	List<SlsRtnHdDtlVO> findReturn(String rtnSdate, String rtnEdate, String prcCls, String vendorName);
	
	//반품관리에서 반품내역 조회 모달
	List<SlsRtnHdVO> returnView(String rtnSdate, String rtnEdate);
	
	//반품관리에서 반품내역 상세조회
	List<SlsRtnHdDtlVO> returnDtlView(String slsRtnHdNo);
	
	//반품 헤더 등록
	void rtnInsertHd(SlsRtnHdVO vo);
	
	//반품 바디 등록
	void rtnInsertDtl(SlsRtnDtlVO vo);
	
	//반품 수정 (기본)
	void rtnUpdate(String priKey, String updCol, String updCont);
	
	//반품 수정 (처리구분을 수정하는 경우 프로시저 실행)
	void callProcRtnDtlUpdate(String priKey, String updCont);
	
	//반품 헤더 삭제
	void rtnHdDelete(String slsRtnHdNo);
	
	//반품 디테일 삭제
	void rtnDelete(SlsRtnDtlVO vo);
	
	//반품 디테일 번호 조회
	List<SlsRtnDtlVO>  rtnDtlNoSelect(SlsRtnDtlVO vo);
}
