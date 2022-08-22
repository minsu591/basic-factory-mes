package com.mes.bf.rsc.vo;

import java.sql.Date;

import lombok.Data;

@Data
public class RscOutVO {

	private String rscOutCode;
	private Date rscOutDate;
	private String processPerformNo;
	private String rscCdCode;
	private String rscCdName;
	private String rscLotNo;
	private int rscOutVol;
	private int rscOutCls;
	private String empId;
	
	//해당내용 erd 및 테이블에 존재x 확인필
	private String vendCdCode;
	private String vendCdNm;
	private String rscOutRemk;
	
}
