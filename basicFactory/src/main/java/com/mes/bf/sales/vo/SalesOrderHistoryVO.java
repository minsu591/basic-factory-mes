package com.mes.bf.sales.vo;

import java.util.Date;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("ordHist")
public class SalesOrderHistoryVO {
	private Date slsOrdHdDate;	   	//주문일자
	private String slsOrdHdNo;	   	//주문번호
	private String vendCdNm;	   	//거래처명
	private String finPrdCdCode;   	//제품코드
	private String finPrdCdName;   	//제품명
	private Date slsOrdDtlDlvDate; 	//납기일자
	private Integer slsOrdDtlVol;  	//주문량
	private Integer slsOrdDtlOutVol;//출고량
	private Integer slsNonOutDtlVol;//미출고량
	private String empId;			//담당자
	private String slsOrdHdRemk;   	//비고
}
