package com.mes.bf.eqp.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.cmn.vo.NonOpVO;
import com.mes.bf.eqp.vo.FindNonOpHIstoryVO;
import com.mes.bf.eqp.vo.NonOpHistoryVO;
import com.mes.bf.eqp.vo.VfindMchnVO;

@Mapper
public interface NonOperationMapper {

	// 공정구분검색
	List<VfindMchnVO> findMchn(String procCdName);

	// 비가동코드 조회
	List<NonOpVO> findNonOp(String nonOpCode, String nonOpName);

	// 설비 비가동 조회
	List<FindNonOpHIstoryVO> findNonOpHistory(String sDate, String eDate, String mchnName,String nonOpCode);
	
	//시작 설비상태업데이트
	int startMchnStatusUpdate(String mchnCode);
	
	//종료 설비상태업데이트 
	int endMchnStatusUpdate(String mchnCode);
	
	//입력번호 찾기
	int findInputNo();
	
	//설비 비가동 관리 입력
	void insertNonOpHistory(NonOpHistoryVO vo);
	
}
