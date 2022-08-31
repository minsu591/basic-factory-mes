package com.mes.bf.prod.vo;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("FindRscVO")
public class FindRscVO {

	private String rscCdCode;
	private String rscCdName;
	private Double bomRscUseVol;
	private String rscLotNo;
	private Double rscStock;
	private int inDtlVol;
	private int processNo; //processperfomNo 찾는용
	private String empId;
	
}
