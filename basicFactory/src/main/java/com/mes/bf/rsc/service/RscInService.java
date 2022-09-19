package com.mes.bf.rsc.service;

import java.sql.Date;
import java.util.List;

import com.mes.bf.common.Criteria;
import com.mes.bf.rsc.vo.RscInVO;
import com.mes.bf.rsc.vo.RscInspVO;

public interface RscInService {
	
	//입고 리스트 조회
	List<RscInVO> inList(Criteria cri);
	Integer inListCount(Criteria cri);
	List<RscInspVO> inspCompList(Criteria cri);
	Integer inspCompListCount(Criteria cri);
	
	//입고 등록
	int inInsert(RscInspVO vo);
	
}
