package com.mes.bf.sales.vo;

import org.apache.ibatis.type.Alias;

import com.mes.bf.prod.vo.PlanVO;

import lombok.Data;

@Data
@Alias("slsOrdPlanVO")
public class SlsOrdPlanVO {
	private SlsOrdHdVO slsOrdHdVO;
	private SlsOrdDtlVO slsOrdDtlVO;
	private PlanVO planVO;
}
