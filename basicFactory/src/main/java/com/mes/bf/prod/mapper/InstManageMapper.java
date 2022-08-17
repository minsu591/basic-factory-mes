package com.mes.bf.prod.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.cmn.vo.ProductCodeVO;
import com.mes.bf.prod.vo.FindEmpVO;

@Mapper
public interface InstManageMapper {

	//담당자 검색
	List<FindEmpVO> findEmp();
	//이름으로 검색
	FindEmpVO findEmpName(String empName);
	
	//완제품코드 검색
	ProductCodeVO findProdName(String ProdCode);
	
}
