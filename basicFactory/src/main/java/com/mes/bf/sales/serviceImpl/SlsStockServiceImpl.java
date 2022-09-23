package com.mes.bf.sales.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.sales.mapper.SlsStockMapper;
import com.mes.bf.sales.service.SlsStockService;
import com.mes.bf.sales.vo.SlsStockVO;

@Service
public class SlsStockServiceImpl implements SlsStockService{

	@Autowired SlsStockMapper mapper;

	@Override
	public List<SlsStockVO> findAllStock() {
		return mapper.findAllStock();
	}

	@Override
	public List<SlsStockVO> findStock(String prdName, String lotNo, String stockClfy) {
		return mapper.findStock(prdName, lotNo, stockClfy);
	}

	@Override
	public List<SlsStockVO> findOutUpdateStock(String slsOutHdNo, String finPrdCdCode) {
		return mapper.findOutUpdateStock(slsOutHdNo, finPrdCdCode);
	}
}
