package com.mes.bf.prod.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.cmn.vo.ProductCodeVO;
import com.mes.bf.prod.vo.FindEmpVO;
import com.mes.bf.prod.vo.InstructionVO;

@Mapper
public interface InstructionMapper {

	 InstructionVO getInst();
	
	//완제품코드 전체조회
	 List<ProductCodeVO> findAllProduct();
	//완제품코드,명으로 검색
	 ProductCodeVO findProduct(String prdCdCode,String prdCdName);
}
