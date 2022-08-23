package com.mes.bf.prod.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.prod.mapper.PlanMapper;
import com.mes.bf.prod.service.PlanService;
import com.mes.bf.prod.vo.ColPlanOrdVO;
import com.mes.bf.prod.vo.ColPlanVO;

@Service
public class PlanServiceImpl implements PlanService {
	@Autowired PlanMapper mapper;

	@Override
	public List<ColPlanVO> findPlanInst(String startDate, String endDate) {
		return mapper.findPlanInst(startDate, endDate);
	}
	@Override
	public List<ColPlanVO> findMyPlan(String startDate, String endDate) {
		return mapper.findMyPlan(startDate, endDate);
	}
	@Override
	public List<ColPlanOrdVO> findPlanOrd(String startDate, String endDate, String vendorCd) {
		return mapper.findPlanOrd(startDate, endDate, vendorCd);
	}
	

}
