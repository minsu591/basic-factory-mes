package com.mes.bf.prod.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.mes.bf.common.Criteria;
import com.mes.bf.prod.mapper.PlanMapper;
import com.mes.bf.prod.service.PlanService;
import com.mes.bf.prod.vo.ColPlanOrdVO;
import com.mes.bf.prod.vo.PlanHdVO;
import com.mes.bf.prod.vo.PlanVO;

@Service
public class PlanServiceImpl implements PlanService {
	@Autowired PlanMapper mapper;

	@Override
	public List<PlanHdVO> findPlanInst(String startDate, String endDate, String empId) {
		return mapper.findPlanInst(startDate, endDate, empId);
	}
	@Override
	public List<ColPlanOrdVO> findMyPlan(String planHdCode) {
		return mapper.findMyPlan(planHdCode);
	}
	@Override
	public List<ColPlanOrdVO> findPlanOrd(Criteria cri) {
		return mapper.findPlanOrd(cri);
	}
	@Override
	public List<PlanVO> findPlan(String planHdCode) {
		return mapper.findPlan(planHdCode);
	}
	@Override
	public Integer planHdInsert(PlanHdVO planHdVO) {
		return mapper.planHdInsert(planHdVO);
	}
	@Override
	public Integer planInsert(PlanVO planVO) {
		return mapper.planInsert(planVO);
	}
	@Override
	public Integer planHdDelete(PlanHdVO headerInfo) {
		return mapper.planHdDelete(headerInfo);
	}
	@Override
	public Integer planDtlDelete(List<String> delList) {
		return mapper.planDtlDelete(delList);
	}
	@Override
	public Integer planHdUpdate(String priKey, String updCol, String updCont) {
		return mapper.planHdUpdate(priKey, updCol, updCont);
	}
	@Override
	public Integer planDtlUpdate(String priKey, String updCol, String updCont) {
		return mapper.planDtlUpdate(priKey, updCol, updCont);
	}
	@Override
	public Integer findPlanOrdCount(Criteria cri) {
		return mapper.findPlanOrdCount(cri);
	}
	@Override
	public List<String> findInInstPlan(String planHdCode) {
		return mapper.findInInstPlan(planHdCode);
	}

	
	

}
