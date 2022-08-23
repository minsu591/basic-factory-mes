package com.mes.bf.prod.vo;

import java.sql.Date;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("colOrdVO")
public class ColOrdVO {
	private String slsOrdHdNo;	//주문번호
	private Date slsOrdHdDate;	//주문일자
	private String vendCdCode;	//거래처코드
	private String vendCdNm;	//거래처명
	private String finPrdCdCode;	 //완제품코드
	private String finPrdCdName;	 //완제품명
	private Date slsOrdDtlDlvDate;	 //납기일자
	private Integer slsOrdDtlVol;	 //주문량
	private Integer slsOrdDtlPrgCls; //진행구분
}
