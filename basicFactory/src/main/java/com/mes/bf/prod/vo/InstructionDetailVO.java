package com.mes.bf.prod.vo;

import java.sql.Date;

import org.apache.ibatis.type.Alias;

import lombok.Data;
//생산지시상세 
@Data
@Alias("InstructionDetailVO")
public class InstructionDetailVO {
	private Integer instProdNo;
	private String finPrdCdCode;
	private Integer instNo;
	private Integer instProdIndicaVol;
	private String workScope;
	private Date workDate;
	
}
