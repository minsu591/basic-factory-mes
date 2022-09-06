package com.mes.bf.rsc.service;

import java.util.List;

import com.mes.bf.rsc.vo.RscOrderVO;

public interface RscOrderService {
	
	//발주 리스트 조회
	List<RscOrderVO> orderDetailList(String rscOrderCode);
	
	//헤더, 디테일 insert
	Integer orderInsert(RscOrderVO vo);
	Integer orderDtInsert(RscOrderVO vo);
}
