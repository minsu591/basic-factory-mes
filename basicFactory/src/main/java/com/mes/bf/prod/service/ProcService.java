package com.mes.bf.prod.service;

import java.util.List;

import com.mes.bf.cmn.vo.ProcCodeVO;
import com.mes.bf.eqp.vo.VfindMchnVO;
import com.mes.bf.prod.vo.ProcManageVO;
import com.mes.bf.prod.vo.VFindProcPerformVO;

public interface ProcService {

	// 설비전체조회
	List<VfindMchnVO> findMchn(String mchnCode, String mchnName);

	// 공정명 조회
	List<ProcCodeVO> findProcCode(String procCdCode, String procCdName);

	// 공정실적 전체조회
	List<VFindProcPerformVO> findProcPerform(String workSdate, String workEdate, String procCdName, String mchnName,
			String empId);

	// 공정실적관리 테이블 조회
	List<ProcManageVO> findProcManage();
}
