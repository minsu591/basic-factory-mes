package com.mes.bf.prod.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.eqp.vo.MchnVO;
import com.mes.bf.prod.mapper.PackingMapper;
import com.mes.bf.prod.service.PackingService;
import com.mes.bf.prod.vo.PackingVO;

@Service

public class PackingServiceImpl implements PackingService{

	@Autowired PackingMapper mapper;
	@Override
	public List<PackingVO> findPackingProc() {
		
		return mapper.findPackingProc();
	}
	@Override
	public MchnVO findMchn(String finPrdCdCode) {
		return mapper.findMchn(finPrdCdCode);
	}

}