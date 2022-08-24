package com.mes.bf.prod.vo;

import java.sql.Date;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("ProcManageVO") //공정실적관리 테이블
public class ProcManageVO {

	private int instNo;
	private int instProdNo;
	private Date workDate;
	private String finPrdCdCode;
	private String finPrdCdName;
	private int instProdIndicaVol;
	private int virResult;
	private int nonResult;
	private String workScope;
	
	
}
