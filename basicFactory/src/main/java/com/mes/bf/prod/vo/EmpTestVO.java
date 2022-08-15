package com.mes.bf.prod.vo;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("emp")
public class EmpTestVO {

	private String empId;
	private Integer deptNo;
	private String empPw;
	private String empName;
	private String empEmail;
	private String empPhone;
	private String auth;
	
}
