package com.mes.bf.sales.vo;

import java.sql.Date;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("slsInDtlVO")
public class SlsInDtlVO {
	private String slsInDtlNo;	//입고번호
	private int processPerformNo; //공정실적번호
	private Date slsInDtlDate; //입고일자
	private String finPrdCdCode; //완제품코드
	private int slsInDtlVol; //입고량
	private String slsInDtlRemk; //비고

	private int processNo;
}
