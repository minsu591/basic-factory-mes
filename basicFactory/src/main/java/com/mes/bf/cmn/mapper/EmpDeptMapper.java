package com.mes.bf.cmn.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.cmn.vo.DeptVO;
import com.mes.bf.cmn.vo.EmpDeptVO;

@Mapper
public interface EmpDeptMapper {
	List<EmpDeptVO> listEmpDept(String empId, String empName, String deptNo);
	List<DeptVO> listDept(String deptName);
}
