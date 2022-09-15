package com.mes.bf.rsc.service;

import java.util.List;

import com.mes.bf.common.Criteria;
import com.mes.bf.rsc.vo.RscStockVO;

public interface RscStockService {

	//재고
	List<RscStockVO> StockList(Criteria cri);
	Integer StockListCount(Criteria cri);
	
}
