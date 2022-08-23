package com.mes.bf.sales.vo;

import java.util.Date;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("slsRtnHdVO")
public class SlsRtnHdVO {
	private String slsRtnHdNo;	//반품번호
	private Date slsRtnHdDate;	//반품일자
	private String empId;		//담당자
	private String empName;		//담당자이름
	private String slsRtnHdRemk;//비고
}
