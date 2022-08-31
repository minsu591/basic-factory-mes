package com.mes.bf.sales.vo;

import java.util.List;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("slsOrdInsertVO")
public class SlsOrdInsertVO {
	private SlsOrdHdVO slsOrdHdVO;
	private List<SlsOrdDtlVO> slsOrdDtlVO;
}
