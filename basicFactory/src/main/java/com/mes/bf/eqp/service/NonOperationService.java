package com.mes.bf.eqp.service;

import java.util.List;

import com.mes.bf.eqp.vo.VfindMchnVO;

public interface NonOperationService {
	// 공정구분검색
	List<VfindMchnVO> findMchn(String procCdName);
}
