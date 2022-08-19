package com.mes.bf.prod.service;

import java.util.List;

import com.mes.bf.cmn.vo.FinProdCodeVO;
import com.mes.bf.prod.vo.InstructionVO;

public interface InstructionService {

	public InstructionVO getInst();

	// 완제품코드 전체조회
	List<FinProdCodeVO> findAllProduct();

	// 완제품코드,명으로 검색
	FinProdCodeVO findProduct(String prdCdCode, String prdCdName);
}
