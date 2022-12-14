package com.mes.bf.eqp.service;

import java.util.List;

import com.mes.bf.cmn.vo.NonOpVO;
import com.mes.bf.eqp.vo.FindNonOpHIstoryVO;
import com.mes.bf.eqp.vo.MchnVO;
import com.mes.bf.eqp.vo.NonOpHistoryVO;
import com.mes.bf.eqp.vo.VfindMchnVO;

public interface NonOperationService {
	// 공정구분검색
	List<VfindMchnVO> findMchn(String procCdName);

	// 비가동코드전체 조회
	List<NonOpVO> findNonOp(String nonOpCode, String nonOpName);

	// 설비 비가동 조회
	List<FindNonOpHIstoryVO> findNonOpHistory(String sDate, String eDate, String mchnName, String nonOpCode);

	// 설비상태업데이트
	int startMchnStatusUpdate(String mchnCode);

	// 종료 설비상태업데이트
	int endMchnStatusUpdate(String mchnCode);

	// 입력번호 찾기
	int findInputNo();

	// 설비 비가동 관리 입력
	void insertNonOpHistory(NonOpHistoryVO vo);

	// 비가동 코드 단건 검색
	NonOpVO getNonOpCode(String NonOpCode);
}
