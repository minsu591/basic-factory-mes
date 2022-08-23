package com.mes.bf.cmn.vo;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("RscCodeVO")
public class RscCodeVO {
	
	private String rscCdCode;	//자재코드
	private String rscCdName;	//자재명
	private String rscCdUnit;	//단위
	private String rscCdClfy;	//자재분류
	private String rscCdUse;	//사용여부
	
}
