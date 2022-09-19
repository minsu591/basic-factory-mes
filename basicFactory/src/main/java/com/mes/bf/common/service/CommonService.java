package com.mes.bf.common.service;

import java.util.List;

import com.mes.bf.common.Criteria;
import com.mes.bf.eqp.vo.MchnVO;
import com.mes.bf.sales.vo.SlsOutDtlForMainVO;

public interface CommonService {
	//테이블 행 총 갯수 구하기
	int getMchnTotalCount(Criteria cri);

	// 테이블 조회
	List<MchnVO> findMchn(Criteria cri);
	//일별 완제품 출고량조회
	List<SlsOutDtlForMainVO> findOutFinForMain();
}
