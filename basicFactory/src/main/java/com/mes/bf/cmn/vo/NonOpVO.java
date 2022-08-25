package com.mes.bf.cmn.vo;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("nonOp")
public class NonOpVO {
	
	private String nonOpCode;	//비가동코드
	private String nonOpName;	//비가동명
	//private String nonOpRsn;
	private String nonOpRemk;	//비고
	
}
