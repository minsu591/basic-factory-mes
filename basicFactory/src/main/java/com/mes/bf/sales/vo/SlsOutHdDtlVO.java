package com.mes.bf.sales.vo;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("outHdDtl")
public class SlsOutHdDtlVO {
	private SlsOutHdVO slsOutHdVO;
	private SlsOutDtlVO slsOutDtlVO;
	private SlsOrdDtlVO slsOrdDtlVO;
}
