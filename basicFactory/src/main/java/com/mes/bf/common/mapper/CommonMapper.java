package com.mes.bf.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.common.Criteria;
import com.mes.bf.eqp.vo.MchnVO;
import com.mes.bf.sales.vo.SlsOutDtlForMainVO;


@Mapper
public interface CommonMapper {

	//테이블 행의 총 갯수 구하기
	int getMchnTotalCount(Criteria cri);
	//테이블 조회 
	List<MchnVO> findMchn(Criteria cri);
	//일별 완제품 출고량조회
	List<SlsOutDtlForMainVO> findOutFinForMain();
	Integer findInstOrd();
	Integer findProcPerf();
	Integer findFinOut();
}
