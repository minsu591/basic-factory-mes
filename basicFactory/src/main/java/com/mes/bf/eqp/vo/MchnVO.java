package com.mes.bf.eqp.vo;

import java.sql.Date;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("MchnVO")
public class MchnVO {

	private String mchnCode; //설비코드
	private String mchnName; //설비이름
	private String vend_cd_code;//거래처코드
	private String mchn_model;//모델명
	private String mchn_img; //설비사진
	private int mchn_price;//금액 
	private Date mchn_prchs_date;//구매일자
	private Date mchn_mnfct_date;//제작일자
	private String mchn_stts;//설비상태
	private Date mchn_inspc_date;//점검일
	private int mchn_inspc_cycle;//점검주기
	private String mchn_remk;//비고
}
