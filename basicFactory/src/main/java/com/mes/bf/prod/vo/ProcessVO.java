package com.mes.bf.prod.vo;

import lombok.Data;

//공정
@Data
public class ProcessVO {
	private Integer processNo;
	private Integer instProdNo;
	private Integer processOrder;
	private String procCdCode;
	private String mchnCode;
	private Integer inDtlVol;
	private Integer totalProdVol;
	private Integer fltyVol;
	private String completionStatus;
	private String processRemk;
	private Integer virResult;
	private Integer nonResult; 
}
