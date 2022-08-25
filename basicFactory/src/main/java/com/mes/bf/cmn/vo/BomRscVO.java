package com.mes.bf.cmn.vo;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("bomRsc")
public class BomRscVO {
	private String bomCdCode;
	private String lineCdCode;
	private String lineCd;
	private String rscCdCode;
	private String rscCdName;
	private Double bomRscUseVol;
	private String bomRscUnit;
}
