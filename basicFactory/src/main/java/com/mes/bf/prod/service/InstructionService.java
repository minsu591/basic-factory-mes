package com.mes.bf.prod.service;

import java.util.List;

import com.mes.bf.cmn.vo.ProductCodeVO;
import com.mes.bf.prod.vo.InstructionVO;

public interface InstructionService {

	public InstructionVO getInst();

	// 완제품코드 전체조회
	List<ProductCodeVO> findAllProduct();

	// 완제품코드,명으로 검색
	ProductCodeVO findProduct(String prdCdCode, String prdCdName);
}
