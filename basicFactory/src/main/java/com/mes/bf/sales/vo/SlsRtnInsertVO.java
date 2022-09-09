package com.mes.bf.sales.vo;

import java.util.List;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("slsRtnInsertVO")
public class SlsRtnInsertVO {
	private SlsRtnHdVO slsRtnHdVO;
	private List<SlsRtnDtlVO> slsRtnDtlVO;
}
