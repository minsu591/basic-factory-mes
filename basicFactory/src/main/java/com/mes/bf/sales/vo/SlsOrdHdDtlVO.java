package com.mes.bf.sales.vo;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("ordHdDtl")
public class SlsOrdHdDtlVO {
	private SlsOrdHdVO slsOrdHdVO;
	private SlsOrdDtlVO slsOrdDtlVO;
}
