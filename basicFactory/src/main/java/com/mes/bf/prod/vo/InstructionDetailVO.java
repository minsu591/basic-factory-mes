package com.mes.bf.prod.vo;

import java.sql.Date;

import lombok.Data;
//생산지시상세 
@Data
public class InstructionDetailVO {

	private Integer instProdNo;
	private String finPrdCdCode;
	private Integer instNo;
	private Integer instProdIndicaVol;
	private String workScope;
	private Date workDate;
	
}
