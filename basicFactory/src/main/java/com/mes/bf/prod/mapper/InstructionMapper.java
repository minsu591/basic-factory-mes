package com.mes.bf.prod.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.cmn.vo.FinProdCodeVO;
import com.mes.bf.prod.vo.InstructionVO;

@Mapper
public interface InstructionMapper {

	 InstructionVO getInst();
	
	//완제품코드 전체조회
	 List<FinProdCodeVO> findAllProduct();
	//완제품코드,명으로 검색
	 FinProdCodeVO findProduct(String prdCdCode,String prdCdName);
}
