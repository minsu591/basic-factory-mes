package com.mes.bf.rsc.vo;

import java.sql.Date;

import lombok.Data;

@Data
public class RscOrderVO {

	private Date rscOrderDate;
	private String rscOrderCode;
	private String rscOrderTitle;
	private String rscCdCode;
	private String rscCdName;
	private String rscCdUnit;
	private int rscOrderVol;
	private int rscOrderArv;
	private int rscOrderPrc;
	private int rscOrderSt;
	private String empId;
	private String rscOrderDtlRemk;
	private String rscOrderDtlNo;
	private String rscOrderRemk;
	private String vendCdCode;
	private String vendCdNm;
	private int unarvVol; //발주수량-도착수량 : 미도착수량
}
