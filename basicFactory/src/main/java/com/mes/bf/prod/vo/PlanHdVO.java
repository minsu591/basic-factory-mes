package com.mes.bf.prod.vo;

import java.sql.Date;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("planHdVO")
public class PlanHdVO {
	private String planHdCode;
	private String planHdName;
	private String slsOrdHdNo;
	private String empId;
	private Date planHdDate;
	private String planHdRemk;
}
