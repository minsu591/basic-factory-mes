package com.mes.bf.prod.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.prod.mapper.FltyPrcsMapper;
import com.mes.bf.prod.service.FltyPrcsService;
import com.mes.bf.prod.vo.FltyPrcsVO;

@Service
public class FltyPrcsServiceImpl implements FltyPrcsService{
	
	@Autowired FltyPrcsMapper mapper;

	@Override
	public List<FltyPrcsVO> listFltyPrcs() {
		return mapper.listFltyPrcs();
	}

	@Override
	public List<FltyPrcsVO> findFltyPrcs(String fltyPrcsSdate, String fltyPrcsEdate, String fltyCode) {
		return mapper.findFltyPrcs(fltyPrcsSdate, fltyPrcsEdate, fltyCode);
	}
	
	

}
