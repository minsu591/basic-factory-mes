package com.mes.bf.sales.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.sales.mapper.SlsRtnMapper;
import com.mes.bf.sales.service.SlsRtnService;
import com.mes.bf.sales.vo.SlsRtnHdDtlVO;

@Service
public class SlsRtnServiceImpl implements SlsRtnService{

	@Autowired SlsRtnMapper mapper;
	
	@Override
	public List<SlsRtnHdDtlVO> findAllReturn() {
		return mapper.findAllReturn();
	}

	@Override
	public List<SlsRtnHdDtlVO> findReturn(String rtnSdate, String rtnEdate, String prcCls, String vendorName) {
		return mapper.findReturn(rtnSdate, rtnEdate, prcCls, vendorName);
	}

}
