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
	private String rscOrderRemk;
}
