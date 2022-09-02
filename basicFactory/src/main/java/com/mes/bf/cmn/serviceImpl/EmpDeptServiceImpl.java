package com.mes.bf.cmn.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.cmn.mapper.EmpDeptMapper;
import com.mes.bf.cmn.service.EmpDeptService;
import com.mes.bf.cmn.vo.DeptVO;
import com.mes.bf.cmn.vo.EmpDeptVO;

@Service
public class EmpDeptServiceImpl implements EmpDeptService {
	
	@Autowired EmpDeptMapper mapper;
	
	@Override
	public List<EmpDeptVO> listEmpDept(String empId, String empName, String deptNo) {
		return mapper.listEmpDept(empId, empName, deptNo);
	}

	@Override
	public List<DeptVO> listDept(String deptName) {
		return mapper.listDept(deptName);
	}

	@Override
	public int deptUpdate(String priKey, String updCol, String updCont) {
		return mapper.deptUpdate(priKey, updCol, updCont);
	}

	@Override
	public int deptInsert(String deptName) {
		return mapper.deptInsert(deptName);
	}


	@Override
	public int deptDelete(List<String> delList) {
		return mapper.deptDelete(delList);
	}


}
