package com.mes.bf.prod.vo;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("VFindProdANdLineVO")
public class VFindProdAndLineVO {

	private String finPrdCdCode;
	private String finPrdCdName;
	private Integer finPrdCdVol;
	private String finPrdCdUnit;
	private String lineCdHdCode;
	private String lineCdHdName;
	
}
