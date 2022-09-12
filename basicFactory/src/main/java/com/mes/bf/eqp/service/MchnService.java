package com.mes.bf.eqp.service;

import java.util.List;

import com.mes.bf.eqp.vo.MchnVO;

public interface MchnService {
	
	//설비등록
	int mchnInsert(MchnVO vo);
	//설비 수정
	int mchnUpdate(String prikey, String updCol, String updCont);
	
	
	//설비조회
	List<MchnVO> listMchn(String mchnCode);

}
