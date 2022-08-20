package com.mes.bf.eqp.service;

import java.util.List;

import com.mes.bf.cmn.vo.NonOpVO;
import com.mes.bf.eqp.vo.FindNonOpHIstoryVO;
import com.mes.bf.eqp.vo.VfindMchnVO;

public interface NonOperationService {
	// 공정구분검색
	List<VfindMchnVO> findMchn(String procCdName);

	// 비가동코드전체 조회
	List<NonOpVO> findNonOp(String nonOpCode, String nonOpName);

	// 설비 비가동 조회
	List<FindNonOpHIstoryVO> findAllNonOpHistory();
}
