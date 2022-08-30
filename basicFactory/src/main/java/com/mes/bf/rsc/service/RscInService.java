package com.mes.bf.rsc.service;

import java.sql.Date;
import java.util.List;

import com.mes.bf.rsc.vo.RscInVO;
import com.mes.bf.rsc.vo.RscInspVO;

public interface RscInService {
	
	//입고 리스트 조회
	List<RscInVO> inList(String rscInCode, String rscCdCode, String rscInSDate, String rscInEDate);
	List<RscInspVO> inspCompList(String rscCdCode, String inspDate);
	
	//입고 등록
	int inInsert(RscInspVO vo);
	
}
