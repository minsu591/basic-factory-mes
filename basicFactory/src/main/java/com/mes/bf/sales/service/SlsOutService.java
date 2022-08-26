package com.mes.bf.sales.service;

import java.util.List;

import com.mes.bf.sales.vo.SlsOrdHdDtlVO;
import com.mes.bf.sales.vo.SlsOutDtlVO;
import com.mes.bf.sales.vo.SlsOutHdDtlVO;

public interface SlsOutService {
	//출고내역 전체조회
	List<SlsOutHdDtlVO> findAllOut();
	
	//일자, 거래처별 출고조회
	List<SlsOutHdDtlVO> findOut(String outSdate, String outEdate, String vendorName);
	
	//미출고 주문내역 조회
	List<SlsOrdHdDtlVO> findNotOut(String ordSdate, String ordEdate);
	
	//출고관리에서 주문상세 조회
	List<SlsOutDtlVO> findNotOutDtl(String slsOrdHdNo);
}
