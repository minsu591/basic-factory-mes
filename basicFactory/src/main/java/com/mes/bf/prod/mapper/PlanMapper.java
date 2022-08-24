package com.mes.bf.prod.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.prod.vo.ColPlanOrdVO;
import com.mes.bf.prod.vo.ColPlanVO;

@Mapper
public interface PlanMapper {
	List<ColPlanVO> findPlanInst(String startDate, String endDate);
	//planType이 head일 때 생산계획헤더 출력, null일 때 생산계획 세부 내역 출력
	List<ColPlanVO> findMyPlan(String startDate, String endDate, String empId);
	List<ColPlanOrdVO> findPlanOrd(String startDate, String endDate, String data);
}
