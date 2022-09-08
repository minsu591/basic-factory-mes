package com.mes.bf.rsc.vo;

import java.sql.Date;

import lombok.Data;

@Data
public class RscInspVO {

	private String rscInspCode;
	private Date rscInspDate;
	private String rscOrderCode;
	private String rscOrderDtlNo;
	private String rscCdCode;
	private String rscCdName;
	private String rscCdUnit;
	private int rscInspVol;
	private int rscInferVol;
	private int rscPassVol;
	private int rscInspSt;
	private String empId;
	private String empName;
	private String rscInspRemk;
}
