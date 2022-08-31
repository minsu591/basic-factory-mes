package com.mes.bf.prod.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.prod.mapper.PlanMapper;
import com.mes.bf.prod.service.PlanService;
import com.mes.bf.prod.vo.ColPlanOrdVO;
import com.mes.bf.prod.vo.ColPlanVO;
import com.mes.bf.prod.vo.PlanHdVO;
import com.mes.bf.prod.vo.PlanVO;

@Service
public class PlanServiceImpl implements PlanService {
	@Autowired PlanMapper mapper;

	@Override
	public List<PlanHdVO> findPlanInst(String startDate, String endDate) {
		return mapper.findPlanInst(startDate, endDate);
	}
	@Override
	public List<ColPlanVO> findMyPlan(String startDate, String endDate, String empId) {
		return mapper.findMyPlan(startDate, endDate, empId);
	}
	@Override
	public List<ColPlanOrdVO> findPlanOrd(String startDate, String endDate, String data) {
		return mapper.findPlanOrd(startDate, endDate, data);
	}
	@Override
	public List<PlanVO> findPlan(String planHdCode) {
		return mapper.findPlan(planHdCode);
	}
	

}
