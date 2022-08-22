package com.mes.bf.prod.service;

import java.util.List;

import com.mes.bf.prod.vo.ColPlanVO;

public interface PlanService {
	List<ColPlanVO> findPlan(String planType, String startDate, String endDate);
}
