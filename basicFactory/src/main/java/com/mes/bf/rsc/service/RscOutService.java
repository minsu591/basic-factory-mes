package com.mes.bf.rsc.service;

import java.util.List;

import com.mes.bf.common.Criteria;
import com.mes.bf.rsc.vo.RscOutVO;

public interface RscOutService {
	//조회페이지 출력
	List<RscOutVO> normalOutList(Criteria cri);
	List<RscOutVO> exceptOutList(Criteria cri);
	Integer outNListCount(Criteria cri);
	Integer outEListCount(Criteria cri);
	
	RscOutVO exceptOut(String rscOutCode);
	
	int OutInsert(RscOutVO vo);
	int OutUpdate(RscOutVO vo);
}
