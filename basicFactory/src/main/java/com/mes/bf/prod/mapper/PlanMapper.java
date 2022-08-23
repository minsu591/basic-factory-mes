package com.mes.bf.prod.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.prod.vo.ColPlanOrdVO;
import com.mes.bf.prod.vo.ColPlanVO;

@Mapper
public interface PlanMapper {
	//planType이 notDone 이면 미지시 생산계획 출력
	//planType이 all이면 전체 출력
	//planType이 아이디명이면 아이디에 해당하는 담당자가 쓴거만 출력
	List<ColPlanVO> findPlanInst(String startDate, String endDate);
	List<ColPlanVO> findMyPlan(String startDate, String endDate);
	List<ColPlanOrdVO> findPlanOrd(String startDate, String endDate, String vendorCd);
}
