package com.mes.bf.prod.service;

import java.util.List;

import com.mes.bf.cmn.vo.FinProdCodeVO;
import com.mes.bf.prod.vo.FindEmpVO;

public interface InstManageService {
	// 담당자 검색
	List<FindEmpVO> findEmp();

	// 이름으로 검색
	FindEmpVO findEmpName(String empName);

	// 완제품코드 검색
	FinProdCodeVO findProdName(String ProdCode);
}
