package com.mes.bf.prod.service;

import java.util.List;

import com.mes.bf.cmn.vo.EmpVO;
import com.mes.bf.prod.vo.FindEmpVO;

public interface InstManageService {
	//담당자 검색
	List<FindEmpVO> findEmp();
	//이름으로 검색
	FindEmpVO findEmpName(String empName);
}
