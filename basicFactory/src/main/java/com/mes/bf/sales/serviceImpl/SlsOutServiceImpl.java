package com.mes.bf.sales.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.sales.mapper.SlsOutMapper;
import com.mes.bf.sales.service.SlsOutService;
import com.mes.bf.sales.vo.SlsOutHdDtlVO;

@Service
public class SlsOutServiceImpl implements SlsOutService {

	@Autowired SlsOutMapper mapper;
	
	@Override
	public List<SlsOutHdDtlVO> findAllOut() {
		return mapper.findAllOut();
	}

	@Override
	public List<SlsOutHdDtlVO> findOut(String ordSdate, String ordEdate, String vendorName) {
		return mapper.findOut(ordSdate, ordEdate, vendorName);
	}
}
