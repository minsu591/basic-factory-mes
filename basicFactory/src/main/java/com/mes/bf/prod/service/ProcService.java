package com.mes.bf.prod.service;

import java.util.List;

import com.mes.bf.cmn.vo.ProcCodeVO;
import com.mes.bf.eqp.vo.VfindMchnVO;

public interface ProcService {

	// 설비전체조회
	List<VfindMchnVO> findAllMchn();

	// 공정코드전체조회
	List<ProcCodeVO> findAllProcCode();
}
