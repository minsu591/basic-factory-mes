package com.mes.bf.prod.vo;

import java.sql.Date;

import lombok.Data;

//공정실적
@Data
public class ProcessPerformVO {

	private Integer processPerformNo;
	private Integer processNo;
	private Integer prodVol;
	private Integer fity_vol;
	private Date workStartTime;
	private Date workEndTime;
	private String perfomeRemk;
	private String workerName;
	
	
}
