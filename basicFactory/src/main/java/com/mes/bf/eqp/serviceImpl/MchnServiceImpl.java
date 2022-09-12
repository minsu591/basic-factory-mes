package com.mes.bf.eqp.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.eqp.mapper.MchnMapper;
import com.mes.bf.eqp.service.MchnService;
import com.mes.bf.eqp.vo.MchnVO;

@Service
public class MchnServiceImpl implements MchnService {

	@Autowired MchnMapper mapper;

	@Override
	public List<MchnVO> listMchn(String mchnCode) {
		return mapper.listMchn(mchnCode);
	}

	@Override
	public int mchnInsert(MchnVO vo) {
		return mapper.mchnInsert(vo);
	}

	@Override
	public int mchnUpdate(String prikey, String updCol, String updCont) {
		return mapper.mchnUpdate(prikey, updCol, updCont);
	}
	
}
