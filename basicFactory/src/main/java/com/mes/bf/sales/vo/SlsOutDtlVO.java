package com.mes.bf.sales.vo;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("slsOutDtlVO")
public class SlsOutDtlVO {
	private String slsOutDtlNo;			//출고내역번호
	private String slsOutHdNo;			//출고번호
	private String finPrdCdCode;		//완제품코드
	private String finPrdCdName;		//제품명
	private String fnsPrdStkLotNo;		//완제품Lot번호
	private Integer slsOrdDtlVol;		//주문량
	private Integer slsOutDtlPrvsVol;	//기출고량
	private Integer slsOutDtlVol;		//출고량
	private Integer slsOrdDtlNotOutVol; //미출고량
	private Integer finPrdCdPrice;		//단가
	private Integer slsOutDtlPrice; 	//금액

}