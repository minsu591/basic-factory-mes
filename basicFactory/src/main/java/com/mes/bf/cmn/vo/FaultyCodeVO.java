package com.mes.bf.cmn.vo;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("fltyCode")
public class FaultyCodeVO {
	
	private String faultyCdCode;
	private String faultyName;
	private String faultyRemk;
	
}
