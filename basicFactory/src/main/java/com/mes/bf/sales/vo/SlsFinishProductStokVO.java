package com.mes.bf.sales.vo;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("slsFinishProductStokVO")
public class SlsFinishProductStokVO {
	private String fnsPrdStkLotNo;	//완제품LOT번호
	private String finPrdCdCode;	//완제품코드
	private String slsInDtlNo;		//입고번호
	private Integer fnsPrdStkInVol;	//입고량
	private Integer fnsPrdStkVol;	//재고량
	private Integer fnsPrdStkSt;	//상태
}
