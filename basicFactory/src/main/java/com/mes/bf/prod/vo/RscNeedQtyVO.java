package com.mes.bf.prod.vo;

import lombok.Data;
//공정 자재 소요 예상량
@Data
public class RscNeedQtyVO {
	private Integer instProdNo;
	private String procCdCode;
	private String rscCdCode;
	private Integer oneTimeNeedQty;
	private Integer rscNeedQty;
	private String rscCdUnit;
	
}
