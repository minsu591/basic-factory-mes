package com.mes.bf.prod.vo;

import org.apache.ibatis.type.Alias;

import lombok.Data;

//공정
@Data
@Alias("ProcessVO")
public class ProcessVO {
	private Integer processNo;
	private Integer instProdNo;
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
