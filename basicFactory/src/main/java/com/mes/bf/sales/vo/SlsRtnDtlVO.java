package com.mes.bf.sales.vo;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("slsRtnDtlVO")
public class SlsRtnDtlVO {
	private String slsRtnDtlNo;		//반품내역번호
	private String slsRtnHdNo;		//반품번호
	private String vendCdCode;		//거래처코드
	private String finPrdCdCode;	//완제품코드
	private String fnsPrdStkLotNo;	//완제품LOT번호
	private Integer slsRtnDtlVol;	//반품량
	private Integer slsRtnDtlPrice;	//금액
	private Integer slsRtnDtlPrcCls;//처리구분
	private String slsRtnDtlResn;	//반품사유
}
