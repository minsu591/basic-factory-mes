package com.mes.bf.prod.service;

import java.util.List;

import com.mes.bf.prod.vo.ColPlanOrdVO;
import com.mes.bf.prod.vo.ColPlanVO;
import com.mes.bf.prod.vo.PlanHdVO;
import com.mes.bf.prod.vo.PlanVO;

public interface PlanService {
	List<PlanHdVO> findPlanInst(String startDate, String endDate);
	List<ColPlanVO> findMyPlan(String startDate, String endDate, String empId);
	List<ColPlanOrdVO> findPlanOrd(String startDate, String endDate, String data);
	List<PlanVO> findPlan(String planHdCode);
	
	//plan 헤더 insert
	Integer planHdInsert(PlanHdVO planHdVO);
	//plan insert
	Integer planInsert(PlanVO planVO);
	
	//plan 헤더 delete
	Integer planHdDelete(String planHdCode);
	Integer planDtlDelete(String planIdx);
	
	//plan update
	Integer planHdUpdate(String priKey, String updCol, String updCont);
	Integer planDtlUpdate(String priKey, String updCol, String updCont);
}
