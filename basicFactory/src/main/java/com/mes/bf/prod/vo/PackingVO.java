package com.mes.bf.prod.vo;

import java.sql.Date;

import org.apache.ibatis.type.Alias;

import lombok.Data;
@Data
@Alias("PackingVO")
public class PackingVO {
	private Integer instProdNo;
	private String finPrdCdCode;
	private Integer instNo;
	private Integer instProdIndicaVol;
	private String workScope;
	private Date workDate;
	private String finPrdCdName;
	private Integer processNo;
	private Integer processOrder;
	private String procCdCode;
	private String procCdName;
	private String mchnCode;
	private String mchnName;
	private Integer inDtlVol;
	private Integer totalProdVol;
	private Integer fltyVol;
	private String completionStatus;
	private String processRemk;
	private Integer virResult;
	private Integer nonResult; 
	private Integer achieRate;
}
