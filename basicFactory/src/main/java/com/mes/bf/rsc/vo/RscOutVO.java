package com.mes.bf.rsc.vo;

import java.sql.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class RscOutVO {

	private String rscOutCode;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Date rscOutDate;
	private String processPerfomNo;
	private String rscCdCode;
	private String rscCdName;
	private String rscLotNo;
	private int rscOutVol;
	private int rscOutCls;
	private String rscOutResn;
	private String empId;
	private String empName;
	private String vendCdCode;
	private String vendCdNm;
	private int rscStock;
	
	private int processNo;
	private String finPrdCdCode;
	
}
