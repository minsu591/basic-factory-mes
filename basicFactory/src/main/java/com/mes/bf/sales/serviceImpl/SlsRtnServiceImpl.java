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

}
