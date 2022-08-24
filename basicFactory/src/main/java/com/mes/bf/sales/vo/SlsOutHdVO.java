package com.mes.bf.sales.vo;

import java.sql.Date;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("slsOutHdVO")
public class SlsOutHdVO {
	private String slsOutHdNo;	//출고번호
	private String slsOrdHdNo;	//주문번호
	private Date slsOutHdDate;	//출고일자
	private String vendCdCode;	//거래처코드
	private String vendCdNm;	//거래처명
	private String empId;		//담당자
	private String empName;		//담당자이름
	private String slsOutHdRemk;//비고
}
