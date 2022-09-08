package com.mes.bf.eqp.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.eqp.mapper.InspcMapper;
import com.mes.bf.eqp.service.InspcService;
import com.mes.bf.eqp.vo.InspcVO;

@Service
public class InspcServiceImpl implements InspcService{
	
	@Autowired InspcMapper mapper;

	@Override
	public List<InspcVO> findInspcList(String inspcSdate, String inspcEdate) {
		return mapper.findInspcList(inspcSdate, inspcEdate);
	}
	
	@Override
	public List<InspcVO> findNxtDate() {
		return mapper.findNxtDate();
	}
	
	@Override
	public List<InspcVO> listInspc() {
		return mapper.listInspc();
	}

	@Override
	public List<InspcVO> findListInspc(String inspcSdate, String inspcEdate, String mchnCode) {
		return mapper.findListInspc(inspcSdate, inspcEdate, mchnCode);
	}



}
