package com.mes.bf.prod.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.prod.mapper.InstructionMapper;
import com.mes.bf.prod.service.InstructionService;
import com.mes.bf.prod.vo.InstructionVO;

@Service 
public class InstructionServiceImpl implements InstructionService {

	InstructionMapper instmapper;
	
	@Override
	public InstructionVO getInst() {
		return instmapper.getInst();
	}

}
