package com.mes.bf.prod.vo;

import org.apache.ibatis.type.Alias;

import com.mes.bf.cmn.vo.DeptVO;
import com.mes.bf.cmn.vo.EmpVO;

import lombok.Data;

@Data
@Alias("findemp")
public class FindEmpVO {

	private EmpVO empvo;
	private DeptVO deptvo;
	
}
