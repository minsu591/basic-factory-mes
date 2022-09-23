package com.mes.bf.cmn.vo;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("dept")
public class DeptVO {
	private int deptNo;
	private String deptName;
	private String deptLinkCode;
	
}
