package com.mes.bf.rsc.vo;

import java.sql.Date;

import lombok.Data;

@Data
public class RscReturnVO {

	private String rscReturnCode;
	private Date rscReturnDate;
	private String rscCdCode;
	private String rscCdName;
	private int rscReturnVol;
	private String rscCdUnit;
	private int rscReturnPrc;
	private String rscReturnResn;
	private String empName;
	private String rscReturnRemk;
}
