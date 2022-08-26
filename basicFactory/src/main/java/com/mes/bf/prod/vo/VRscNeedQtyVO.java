package com.mes.bf.prod.vo;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("VRscNeedQtyVO") //라인별 자재 소요 예상량
public class VRscNeedQtyVO {
	
	
	private String rscCdCode;
	private String rscCdName;
	private int rscStock;
	private String rscCdUnit;
	private double rscUseVol;
	private String lineCdHdName;

}
