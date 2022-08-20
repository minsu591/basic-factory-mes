package com.mes.bf.rsc.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.rsc.mapper.RscMapper;
import com.mes.bf.rsc.service.RscService;
import com.mes.bf.rsc.vo.RscStockVO;

@Service
public class RscServiceImpl implements RscService{

	@Autowired RscMapper rscMapper;
	
	@Override
	public List<RscStockVO> StockList() {
		return rscMapper.StockList();
	}

}
