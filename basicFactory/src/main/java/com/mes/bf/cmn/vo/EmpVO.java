package com.mes.bf.cmn.vo;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("emp")
public class EmpVO {

	private String empId;
	private int deptNo;
	private String empPw;
	private String empName;
	private String empEmail;
	private String phone;
	private String empAuth;
	
	
}
