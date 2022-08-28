package com.mes.bf.sales.service;

import java.util.List;

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
}
