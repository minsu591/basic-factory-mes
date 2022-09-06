package com.mes.bf.sales.vo;

import java.util.List;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("slsOutInsertVO")
public class SlsOutInsertVO {
	private SlsOutHdVO slsOutHdVO;
	private List<SlsOutDtlVO> slsOutDtlVO;
}
