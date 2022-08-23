package com.mes.bf.eqp.service;

import java.util.List;
import java.util.Map;

import com.mes.bf.eqp.vo.MchnVO;

public interface MchnService {
	
	//설비 조회
	List<MchnVO> MchnAllList();
	
	//설비 코드별 조회
	List<MchnVO> findMchn(Map<String, Object> params);

}
