package com.mes.bf.cmn.service;

import java.util.List;

import com.mes.bf.cmn.vo.DeptVO;
import com.mes.bf.cmn.vo.EmpDeptVO;

public interface EmpDeptService {
	List<EmpDeptVO> listEmpDept(String empId, String empName, String deptNo);
	List<DeptVO> listDept(String deptName);
	
	int deptUpdate(String priKey, String updCol, String updCont);
	int deptInsert(String deptName);
	int deptDelete(List<String> delList);

}
