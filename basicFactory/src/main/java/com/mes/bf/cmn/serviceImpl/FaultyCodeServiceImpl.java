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
	
	

}
