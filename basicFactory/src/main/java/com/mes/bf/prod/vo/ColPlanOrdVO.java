package com.mes.bf.prod.vo;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("colPlanOrd")
public class ColPlanOrdVO {
	PlanVO planVO;
	PlanHdVO planHdVO;
	ColOrdVO colOrdVO;
}
