package com.mes.bf.rsc.vo;

import java.sql.Date;

import lombok.Data;

@Data
public class RscInspVO {

	private String rscInspCode;
	private Date rscInspDate;
	private String rscCdCode;
	private String rscCdName;
	private int rscInspVol;
	private int rscInferVol;
	private int rscPassVol;
	private int rscInspSt;
	private String empId;
	private String rscInspRemk;
}
