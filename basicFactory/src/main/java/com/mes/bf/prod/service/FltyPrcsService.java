package com.mes.bf.prod.service;

import java.util.List;

import com.mes.bf.cmn.vo.FaultyCodeVO;
import com.mes.bf.prod.vo.FindProcFltyVO;
import com.mes.bf.prod.vo.FltyPrcsVO;

public interface FltyPrcsService {
	
	//불량처리목록
	List<FltyPrcsVO> findlistFltyPrcs(String fltyPrcsSdate, String fltyPrcsEdate);
	//생산불량
	List<FindProcFltyVO> procFlty();
	//불량세부처리 신규등록
	int fltyPrcsInsert(FltyPrcsVO vo);
	//불량세부처리 수정
	int fltyPrcsUpdate(String prikey, String updCol, String updCont);
	
	//불량코드 조회
	List<FaultyCodeVO> findFltyCode(String faultyCode);
	
	
	//불량처리조회
	List<FltyPrcsVO> listFltyPrcs();
	//불량처리상세조회
	List<FltyPrcsVO> findFltyPrcs(String fltyPrcsSdate, String fltyPrcsEdate, String finPrdCdName);

}
