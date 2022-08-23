package com.mes.bf.sales.vo;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("slsRtnHdDtlVO")
public class SlsRtnHdDtlVO {
	private SlsRtnHdVO slsRtnHdVO;
	private SlsRtnDtlVO slsRtnDtlVO;
}
