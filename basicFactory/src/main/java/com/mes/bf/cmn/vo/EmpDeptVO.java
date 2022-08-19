package com.mes.bf.cmn.vo;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("empDept")
public class EmpDeptVO {
	private EmpVO empVO;
	private DeptVO deptVO;
}
