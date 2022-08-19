package com.mes.bf.eqp.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.eqp.mapper.NonOperationMapper;
import com.mes.bf.eqp.service.NonOperationService;
import com.mes.bf.eqp.vo.VfindMchnVO;

@Service
public class NonOperationServiceImpl implements NonOperationService {

	@Autowired NonOperationMapper mapper;
	@Override
	public List<VfindMchnVO> findMchn(String procCdName) {
		
		return mapper.findMchn(procCdName);
	}

}
