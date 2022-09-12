package com.mes.bf.prod.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.mes.bf.prod.vo.ColPlanOrdVO;
import com.mes.bf.prod.vo.PlanHdVO;
import com.mes.bf.prod.vo.PlanVO;

@Mapper
public interface PlanMapper {
	List<PlanHdVO> findPlanInst(String startDate, String endDate, String empId);
	//planType이 head일 때 생산계획헤더 출력, null일 때 생산계획 세부 내역 출력
	List<ColPlanOrdVO> findMyPlan(String planHdCode);
	
	List<ColPlanOrdVO> findPlanOrd(String startDate, String endDate, String data);
	List<PlanVO> findPlan(String planHdCode);
	
	
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
