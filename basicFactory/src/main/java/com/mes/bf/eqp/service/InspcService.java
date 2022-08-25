package com.mes.bf.eqp.service;

import java.util.List;

import com.mes.bf.eqp.vo.InspcVO;

public interface InspcService {
	
	//설비점검
	
	
	//설비점검조회
	List<InspcVO> listInspc();
	//설비점검상세조회
	List<InspcVO> findListInspc(String inspcSdate, String inspcEdate, String mchnCode);

}
