package com.mes.bf.prod.service;

import java.util.List;

import com.mes.bf.prod.vo.FindEmpVO;

public interface InstManageService {
	//담당자 검색
	List<FindEmpVO> findEmp();
}