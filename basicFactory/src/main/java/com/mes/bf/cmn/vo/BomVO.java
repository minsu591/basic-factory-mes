package com.mes.bf.cmn.vo;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("BomVO")
public class BomVO {
	private String bomCdCode;
	private String bomCdName;
	private String finPrdCdCode;
	private String lineCdHdCode;
	private int bomCdProdVol;
	private String bomCdUnit;
	private String bomCdUse;
	private String bomCdRemk;
}
