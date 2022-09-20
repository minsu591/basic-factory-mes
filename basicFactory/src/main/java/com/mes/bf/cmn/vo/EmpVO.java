package com.mes.bf.cmn.vo;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("emp")
public class EmpVO {

	private String empId;
	private int deptNo;
	private String deptName;
	private String deptLinkCode;
	private String empPw;
	private String empName;
	private String empEmail;
	private String empPhone;
	private String empAuth;
	private String empPos;
	private String empRemk;
	
	
}
