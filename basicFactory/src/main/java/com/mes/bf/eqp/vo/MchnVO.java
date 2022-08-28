package com.mes.bf.eqp.vo;

import java.sql.Date;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("MchnVO")
public class MchnVO {

	private String mchnCode; //설비코드
	private String mchnName; //설비명
	private String vendCdCode;//거래처코드
	private String vendCdNm;	//거래처명
	private String mchnModel;//모델명
	private String mchnImg; //설비사진
	private int mchnPrice;	//금액 
	private Date mchnPrchsDate;	//구매일자
	private Date mchnMnfctDate;	//제작일자
	private String mchnStts;	//설비상태
	private Date mchnInspcDate;	//점검시작일
	private Date inspcEdate;	//점검종료일(최근 점검 날짜)
	private int mchnInspcCycle;	//점검주기
	private String mchnRemk;	//비고
}
