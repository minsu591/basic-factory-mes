package com.mes.bf.cmn.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.cmn.mapper.NonOpMapper;
import com.mes.bf.cmn.service.NonOpService;
import com.mes.bf.cmn.vo.NonOpVO;

@Service
public class NonOpServiceImpl implements NonOpService {
	
	@Autowired NonOpMapper mapper;

	@Override
	public List<NonOpVO> listNonOp(String nonOpName) {
		return mapper.listNonOp(nonOpName);
	}

	@Override
	public int nonOpDelete(List<String> delList) {
		return mapper.nonOpDelete(delList);
	}

	@Override
	public int nonOpUpdate(String priKey, String updCol, String updCont) {
		return mapper.nonOpUpdate(priKey, updCol, updCont);
	}

	@Override
	public int nonOpInsert(NonOpVO vo) {
		return mapper.nonOpInsert(vo);
	}
	
}
