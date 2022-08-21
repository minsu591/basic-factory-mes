package com.mes.bf.sales.vo;

import java.sql.Date;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("slsOrdDtlVO")
public class SlsOrdDtlVO {
	private String slsOrdDtlNo;		 //주문내역번호
	private String slsOrdHdNo;		 //주문번호
	private String finPrdCdCode;	 //완제품코드
	private String finPrdCdName;	 //제품명
	private Date slsOrdDtlDlvDate;	 //납기일자
	private Integer slsOrdDtlVol;	 //주문량
	private Integer slsOrdDtlOutVol; //출고량
	private Integer slsOrdDtlNotOutVol;//미출고량
	private Integer slsOrdDtlPrgCls; //진행구분
}
