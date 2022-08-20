package com.mes.bf.cmn.vo;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("nonOpVO")
public class NonOpVO {
	private String nonOpCode;
	private String nonOpName;
	private String nonOpRsn;
	private String nonOpRemk;
}
