package com.mes.bf.prod.service;

import java.util.List;

import com.mes.bf.eqp.vo.MchnVO;
import com.mes.bf.prod.vo.PackingVO;
import com.mes.bf.prod.vo.ProcessVO;
import com.mes.bf.sales.vo.SlsInDtlVO;

public interface PackingService {

	// 포장 공정 조회
	List<PackingVO> findPackingProc();

	// 제품코드로 설비명,상태 조회
	MchnVO findMchn(String finPrdCdCode);

	// 완제품 입고내역 등록
	void insertInDtl(SlsInDtlVO vo);

	// 포장 공정 조회
	List<ProcessVO> findProcessPacking(int instProdNo);
}
