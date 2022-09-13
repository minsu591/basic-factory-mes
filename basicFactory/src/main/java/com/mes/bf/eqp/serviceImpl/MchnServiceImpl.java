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
	public List<MchnVO> findMchnName(String mchnName) {
		return mapper.findMchnName(mchnName);
	}

	@Override
	public int mchnInsert(MchnVO vo) {
		return mapper.mchnInsert(vo);
	}

	@Override
	public int mchnUpdate(String prikey, String updCol, String updCont) {
		return mapper.mchnUpdate(prikey, updCol, updCont);
	}

	@Override
	public int mchnDelete(List<String> delList) {
		return mapper.mchnDelete(delList);
	}

	@Override
	public List<MchnVO> listMchn(String mchnName) {
		return mapper.listMchn(mchnName);
	}

	
	
}
