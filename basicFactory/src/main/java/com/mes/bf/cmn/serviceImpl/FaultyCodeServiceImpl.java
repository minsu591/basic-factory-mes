package com.mes.bf.cmn.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.cmn.mapper.FaultyCodeMapper;
import com.mes.bf.cmn.service.FaultyCodeService;
import com.mes.bf.cmn.vo.FaultyCodeVO;

@Service
public class FaultyCodeServiceImpl implements FaultyCodeService{
	
	@Autowired FaultyCodeMapper mapper;

	@Override
	public List<FaultyCodeVO> listFltyCode(String faultyName) {
		return mapper.listFltyCode(faultyName);
	}

	@Override
	public int faultyDelete(List<String> delList) {
		return mapper.faultyDelete(delList);
	}

	@Override
	public int faultyUpdate(String priKey, String updCol, String updCont) {
		return mapper.faultyUpdate(priKey, updCol, updCont);
	}

	@Override
	public int faultyInsert(FaultyCodeVO vo) {
		return mapper.faultyInsert(vo);
	}
	
	

}
