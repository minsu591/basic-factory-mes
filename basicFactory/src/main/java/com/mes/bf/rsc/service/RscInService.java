package com.mes.bf.rsc.service;

import java.util.List;

import com.mes.bf.rsc.vo.RscInVO;
import com.mes.bf.rsc.vo.RscInspVO;

public interface RscInService {
	List<RscInVO> inList();
	List<RscInspVO> inspCompList();
	
	int inInsert(RscInspVO vo);
}
