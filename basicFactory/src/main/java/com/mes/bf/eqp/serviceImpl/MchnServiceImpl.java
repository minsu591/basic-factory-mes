package com.mes.bf.eqp.serviceImpl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.eqp.mapper.MchnMapper;
import com.mes.bf.eqp.service.MchnService;
import com.mes.bf.eqp.vo.MchnVO;

@Service
public class MchnServiceImpl implements MchnService {

	@Autowired MchnMapper mapper;
	
	@Override
	public List<MchnVO> MchnAllList() {
		return mapper.MchnAllList();
	}

	@Override
	public List<MchnVO> findMchn(Map<String, Object> params) {
		return mapper.findMchn(params);
	}

}
