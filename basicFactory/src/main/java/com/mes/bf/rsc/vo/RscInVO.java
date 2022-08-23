package com.mes.bf.rsc.vo;

import java.sql.Date;

import lombok.Data;
@Data
public class RscInVO {

	private String rscInCode;
	private Date rscInDate;
	private Date rscInspDate;
	private String rscCdCode;
	private String rscCdName;
	private int rscInVol;
	private String rscLotNo;
	private int rscInspSt;
}
