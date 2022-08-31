package com.mes.bf.prod.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.cmn.vo.FaultyCodeVO;
import com.mes.bf.prod.vo.FltyPrcsVO;

@Mapper
public interface FltyPrcsMapper {
	
	//불량처리목록
	List<FltyPrcsVO> findlistFltyPrcs(String fltyPrcsSdate, String fltyPrcsEdate);
	//생산중불량조회
	List<FltyPrcsVO> findProcFlty();
	//불량코드 조회
	List<FaultyCodeVO> findFltyCode(String faultyCode);
	
	//불량처리조회
	List<FltyPrcsVO> listFltyPrcs();
	//불량처리상세조회
	List<FltyPrcsVO> findFltyPrcs(String fltyPrcsSdate, String fltyPrcsEdate, String finPrdCdCode);

}
