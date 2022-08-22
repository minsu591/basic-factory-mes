package com.mes.bf.prod.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.prod.mapper.PlanMapper;
import com.mes.bf.prod.service.PlanService;
import com.mes.bf.prod.vo.ColPlanVO;

@Service
public class PlanServiceImpl implements PlanService {
	@Autowired PlanMapper mapper;
	@Override
	public List<ColPlanVO> findPlan(String planType, String startDate, String endDate) {
		return mapper.findPlan(planType, startDate, endDate);
	}

}
