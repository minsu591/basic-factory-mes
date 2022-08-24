package com.mes.bf.sales.service;

import java.util.List;

import com.mes.bf.sales.vo.SlsRtnHdDtlVO;

public interface SlsRtnService {
	
	//반품내역 전체조회
	List<SlsRtnHdDtlVO> findAllReturn();
	
	//일자, 거래처별 반품조회
	List<SlsRtnHdDtlVO> findReturn(String rtnSdate, String rtnEdate, String prcCls, String vendorName);
}
