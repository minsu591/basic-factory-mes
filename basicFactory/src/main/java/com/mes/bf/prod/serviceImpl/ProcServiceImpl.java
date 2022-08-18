package com.mes.bf.prod.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.prod.mapper.ProcMapper;
import com.mes.bf.prod.service.ProcService;
import com.mes.bf.prod.vo.VfindMchnVO;

@Service
public class ProcServiceImpl implements ProcService {

	@Autowired ProcMapper mapper;
	
	@Override
	public List<VfindMchnVO> findAllMchn() {
		return mapper.findAllMchn();
	}

}
