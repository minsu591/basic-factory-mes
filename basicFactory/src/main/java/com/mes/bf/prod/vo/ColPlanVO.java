package com.mes.bf.prod.vo;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("colPlan")
public class ColPlanVO {
	PlanHdVO planHdVO;
	PlanVO planVO;
}
