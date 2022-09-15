package com.mes.bf.rsc.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.common.Criteria;
import com.mes.bf.rsc.mapper.RscStockMapper;
import com.mes.bf.rsc.service.RscStockService;
import com.mes.bf.rsc.vo.RscStockVO;

@Service
public class RscStockServiceImpl implements RscStockService{

	@Autowired RscStockMapper rscStockMapper;
	

	@Override
	public List<RscStockVO> StockList(Criteria cri) {
		return rscStockMapper.StockList(cri);
	}

	@Override
	public Integer StockListCount(Criteria cri) {
		return rscStockMapper.StockListCount(cri);
	}

}
