package com.mes.bf.eqp.service;

import java.util.List;

import com.mes.bf.eqp.vo.MchnVO;

public interface MchnService {
	
	List<MchnVO> findMchnName(String mchnName);
	int mchnInsert(MchnVO vo);
	int mchnUpdate(String prikey, String updCol, String updCont);
	int mchnDelete(List<String> delList);
	
	//설비조회
	List<MchnVO> listMchn(String mchnName);

}
