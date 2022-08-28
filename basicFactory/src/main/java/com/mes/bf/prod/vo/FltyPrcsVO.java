package com.mes.bf.prod.vo;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("fltyPrcs")
public class FltyPrcsVO {
	
	private String fltyPrcsNo;		//순서
	private String fltyPrcsDate;	//불량처리일
	private String fltyPrcsRemk;	//불량처리비고
	private String faultyCdCode;	//불량코드
	private String faultyName;		//불량명
	private Integer fltyVol;		//불량량
	private String finPrdCdCode;	//완제품코드
	private String finPrdCdName;	//완제품명
	private String lineCdHdName;	//라인명
	private String procCdName;		//공정명
	private String mchnName;		//설비명

}