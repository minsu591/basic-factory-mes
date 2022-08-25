package com.mes.bf.eqp.service;

import java.util.List;

import com.mes.bf.eqp.vo.MchnVO;

public interface MchnService {
	
	//설비관리
	
	
	//설비조회
	List<MchnVO> listMchn(String mchnCode);

}
