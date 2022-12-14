package com.mes.bf.prod.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.mes.bf.common.Criteria;
import com.mes.bf.prod.vo.ColPlanOrdVO;
import com.mes.bf.prod.vo.ColPlanVO;
import com.mes.bf.prod.vo.PlanHdVO;
import com.mes.bf.prod.vo.PlanVO;

public interface PlanService {
	List<PlanHdVO> findPlanInst(String startDate, String endDate, String empId);
	List<ColPlanOrdVO> findMyPlan(String planHdCode);
	List<ColPlanOrdVO> findPlanOrd(Criteria cri);
	
	List<PlanVO> findPlan(String planHdCode);
	//페이징용 count
	Integer findPlanOrdCount(Criteria cri);
	
	//생산지시에서 참고하고 있는 계획인지 아닌지 확인
	List<String> findInInstPlan(String planHdCode);
	
	//plan 헤더 insert
	Integer planHdInsert(PlanHdVO planHdVO);
	//plan insert
	Integer planInsert(PlanVO planVO);
	
	//plan 헤더 delete
	Integer planHdDelete(PlanHdVO headerInfo);
	Integer planDtlDelete(List<String> delList);
	
	//plan update
	Integer planHdUpdate(String priKey, String updCol, String updCont);
	Integer planDtlUpdate(String priKey, String updCol, String updCont);
}
