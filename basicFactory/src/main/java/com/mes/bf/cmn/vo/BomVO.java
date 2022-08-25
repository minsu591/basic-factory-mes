package com.mes.bf.cmn.vo;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("bom")
public class BomVO {
	private String bomCdCode;
	private String bomCdName;
	private String finPrdCdCode;
	private String finPrdCdName;
	private String lineCdHdCode;
	private String lineCdHdName;
	private int bomCdProdVol;
	private String bomCdUnit;
	private String bomCdUse;
	private String bomCdRemk;
}
