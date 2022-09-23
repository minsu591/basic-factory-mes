package com.mes.bf.cmn.service;

import java.util.List;

import com.mes.bf.cmn.vo.DeptVO;
import com.mes.bf.cmn.vo.EmpDeptVO;
import com.mes.bf.cmn.vo.EmpVO;

public interface EmpDeptService {
	List<EmpDeptVO> listEmpDept(String empId, String empName, String deptNo);
	List<DeptVO> listDept(String deptName);
	EmpVO findEmp(String empId);
	
	int deptUpdate(String priKey, String updCol, String updCont);
	int deptInsert(String deptName);
	int deptDelete(List<String> delList);
	
	int empUpdate(String priKey, String updCol, String updCont);
	int empInsert(EmpVO emp);
	int empDelete(List<String> delList);
	
}
