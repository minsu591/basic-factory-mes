package com.mes.bf.sales.vo;

import java.sql.Date;

import lombok.Data;

@Data
public class SlsOutDtlForMainVO {
	
	private String finPrdCdCode;		//완제품코드
	private String finPrdCdName;		//제품명
	private Integer slsOutDtlVol;		//출고량
	private Integer rank;
}
