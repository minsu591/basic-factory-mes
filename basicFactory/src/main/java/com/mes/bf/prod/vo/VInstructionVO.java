package com.mes.bf.prod.vo;

import java.sql.Date;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("vinst")
public class VInstructionVO {

	private Date instDate; //지시일자
	private Integer instNo; //지시번호
	private String vendCdNm; //거래처명
	private String finPrdCdCode; //제품코드
	private String finPrdCdName; //제품이름
	private String slsOrdHdNo; //주문코드
	private Date slsOrdDtlDlvDate; //납기일자
	private Integer slsOrdDtlVol; //주문량
	private Integer instProdIndicaVol; //지시량
	private String workScope; //작업구분
	private Date workDate; //작업일자

}
