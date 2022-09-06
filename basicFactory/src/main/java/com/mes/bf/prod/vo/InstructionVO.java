package com.mes.bf.prod.vo;

import java.sql.Date;

import org.apache.ibatis.type.Alias;

import lombok.Data;
//생산지시
@Data
@Alias("instructionVO")
public class InstructionVO {
	private Integer instNo; //생산지시번
	private String empId; //직원아이디 
	private String instName; //생산지시명 
	private Date instDate; //지시작성일자
	private String instRemk; //특기사항 
	private String planHdCode; //생산계획코드 
	
}
