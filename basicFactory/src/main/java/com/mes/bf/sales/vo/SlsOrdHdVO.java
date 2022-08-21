package com.mes.bf.sales.vo;

import java.sql.Date;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("slsOrdHdVO")
public class SlsOrdHdVO {
	private String slsOrdHdNo;	//주문번호
	private Date slsOrdHdDate;	//주문일자
	private String vendCdCode;	//거래처코드
	private String vendCdNm;	//거래처명
	private String empId;		//담당자
	private String empName;		//담당자이름
	private String slsOrdHdRemk;//비고
}
