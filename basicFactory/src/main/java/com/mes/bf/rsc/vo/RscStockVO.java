package com.mes.bf.rsc.vo;

import lombok.Data;

@Data
public class RscStockVO {
	private String rscCdCode;
	private String rscCdName;
	private String rscCdClfy;
	private int rscInVol;
	private int rscOutVol;
	private int rscStock;
	private int rscStockUse;
}
