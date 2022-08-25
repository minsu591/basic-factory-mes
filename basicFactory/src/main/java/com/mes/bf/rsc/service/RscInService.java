package com.mes.bf.rsc.service;

import java.util.List;

import com.mes.bf.rsc.vo.RscInVO;
import com.mes.bf.rsc.vo.RscInspVO;

public interface RscInService {
	
	//입고 리스트 조회
	List<RscInVO> inList();
	List<RscInspVO> inspCompList();
	
	//입고 등록
	int inInsert(RscInspVO vo);
	
}
