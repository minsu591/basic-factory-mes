package com.mes.bf.cmn.vo;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("prodCode")
public class ProductCodeVO {

	private String finPrdCdCode;
	private String finPrdCdName;
	private int finPrdCdVol;
	private String finPrdCdUnit;
	private String finPrdCdUse;
	private int finPrdCdPrice;
	private String finPrdCdRemk;
	private String empId;
	
}
