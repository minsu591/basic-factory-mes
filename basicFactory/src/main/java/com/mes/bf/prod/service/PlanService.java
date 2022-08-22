package com.mes.bf.prod.service;

import java.util.List;

import com.mes.bf.prod.vo.ColPlanOrdVO;
import com.mes.bf.prod.vo.ColPlanVO;

public interface PlanService {
	List<ColPlanVO> findPlanInst(String startDate, String endDate);
	List<ColPlanOrdVO> findPlanOrd(String startDate, String endDate, String vendorCd);
}
