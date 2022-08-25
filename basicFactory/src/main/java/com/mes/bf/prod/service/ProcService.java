package com.mes.bf.prod.service;

import java.util.List;

import com.mes.bf.cmn.vo.ProcCodeVO;
import com.mes.bf.eqp.vo.MchnVO;
import com.mes.bf.eqp.vo.VfindMchnVO;
import com.mes.bf.prod.vo.ProcManageVO;
import com.mes.bf.prod.vo.ProcessPerformVO;
import com.mes.bf.prod.vo.ProcessVO;
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

	// 공정테이블 조회
	List<ProcessVO> findProcess(int instProdNo);

	// 제품코드로 설비명,상태조회
	List<MchnVO> selectMchn(String finPrdCdCode);

	// 공정명과 작업번호를 받아서 공정테이블 실적량(생산량) 수정
	void updateProcVol(ProcessVO vo);

	// 공정테이블 불량수정
	void updateFltyVol(ProcessVO vo);

	// 설비 상태 진행중 업데이트
	void updateMchnStts(MchnVO vo);

	// 설비 상태 default, 공정테이블 완료여부업데이트
	void updateMchnSttsdefault(MchnVO vo);

	void updateProcCheck(ProcessVO vo);

	// 공정 실적 테이블 등록
	void InsertProcPerfrom(ProcessPerformVO vo);

}
