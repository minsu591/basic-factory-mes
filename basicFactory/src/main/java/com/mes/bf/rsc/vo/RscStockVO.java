package com.mes.bf.rsc.vo;

import lombok.Data;

@Data
public class RscStockVO {
	private String rscCdCode;
	private String rscCdName;
	private String rscCdClfy;
	private String rscLotNo;
	private int rscInVol;
	private int rscOutVol;
	private int rscStock;
	private String rscCdUnit;
	private int rscStockSt;
	private int rscOrderPrc;
}
