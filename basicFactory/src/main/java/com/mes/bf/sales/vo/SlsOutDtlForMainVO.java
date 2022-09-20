package com.mes.bf.sales.vo;

import java.sql.Date;

import lombok.Data;

@Data
public class SlsOutDtlForMainVO {
	private Date slsOutHdDate;          //hd 데이트
	private String finPrdCdCode;		//완제품코드
	private String finPrdCdName;		//제품명
	private Integer slsOutDtlVol;		//출고량
}
