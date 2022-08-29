package com.mes.bf.prod.service;

import java.util.List;

import com.mes.bf.prod.vo.FltyPrcsVO;

public interface FltyPrcsService {
	
	//불량처리
	
	
	//불량처리조회
	List<FltyPrcsVO> listFltyPrcs();
	//불량처리상세조회
	List<FltyPrcsVO> findFltyPrcs(String fltyPrcsSdate, String fltyPrcsEdate, String fltyCode);

}
