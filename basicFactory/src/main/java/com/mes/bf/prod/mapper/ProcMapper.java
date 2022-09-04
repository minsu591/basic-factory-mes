package com.mes.bf.prod.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.cmn.vo.ProcCodeVO;
import com.mes.bf.eqp.vo.MchnVO;
import com.mes.bf.eqp.vo.VfindMchnVO;
import com.mes.bf.prod.vo.FindRscVO;
import com.mes.bf.prod.vo.InstructionDetailVO;
import com.mes.bf.prod.vo.ProcManageVO;
import com.mes.bf.prod.vo.ProcessPerformVO;
import com.mes.bf.prod.vo.ProcessVO;
import com.mes.bf.prod.vo.ProdRscOutVO;
import com.mes.bf.prod.vo.VFindProcPerformVO;
import com.mes.bf.rsc.vo.RscOutVO;

@Mapper
public interface ProcMapper {

	// 설비 조회
	List<VfindMchnVO> findMchn(String mchnCode, String mchnName);

	// 공정명 조회
	List<ProcCodeVO> findProcCode(String procCdCode, String procCdName);

	// 공정실적 조회
	List<VFindProcPerformVO> findProcPerform(String workSdate, String workEdate, String procCdName, String mchnName,
			String empId);

	// 공정실적관리 테이블 조회
	List<ProcManageVO> findProcManage(String finPrdCdName, String workDate);

	// 공정테이블 조회
	List<ProcessVO> findProcess(int instProdNo);

	// 제품코드로 설비명,상태조회
	List<MchnVO> selectMchn(String finPrdCdCode);

	// 공정테이블 실적량(생산량) 수정
	void updateProcVol(ProcessVO vo);

	// 공정테이블 불량수정
	//void updateFltyVol(ProcessVO vo);

	// 설비 상태 진행중 업데이트
	void updateMchnStts(MchnVO vo);

	// 지시 상태  업데이트
	void updateWorkScope(InstructionDetailVO vo);

	// 설비 상태 공정테이블 완료여부 달성률업데이트
	void updateProcCheck(ProcessVO vo);

	void updateachieRate(ProcessVO vo);

	// 공정 실적 테이블 등록
	void insertProcPerform(ProcessPerformVO vo);

	// 공정 완료 후 다음공정 입고량 업데이트
	void updateProcInDtlVol(ProcessVO vo);

	// 공정 실적테이블 단건 검색
	ProcessPerformVO getProcPerform(int processNo);

	// 재고 사용량, 수량 검색
	List<FindRscVO> findRscVO(String finPrdCdCode);

	// 자재 사용량 출고내역 등록
	void insertRscOut(ProdRscOutVO vo);
	
	// 실적량 -> 기실적량 업데이트 
	void updateVirResult(ProcessVO vo);
	
	//공정테이블 작업종료시간포함 데이터 업데이트
	void updateProcPerform(ProcessPerformVO vo);
}
